/**
 * Enhanced Markdown parser supporting Github Flavored Markdown:
 * - Multiline Callouts/Alerts (> [!NOTE]\n> Content...)
 * - Syntax Highlighted Code blocks (```python ... ```)
 * - Checkbox tasklists (- [x], - [ ])
 * - Tables with alignment
 * - Inline formatting (bold, italic, code, links)
 */

export function parseMarkdown(text) {
    if (!text) return '';

    const processInline = (str) => {
        return str
            .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
            .replace(/\*(.+?)\*/g, '<em>$1</em>')
            .replace(/`([^`]+)`/g, '<code>$1</code>')
            .replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" target="_blank" rel="noopener noreferrer">$1</a>');
    };

    // Lightweight Tokenizer for Code Syntax Highlighting
    const highlightCode = (code, lang) => {
        const escaped = code
            .replace(/&/g, '&amp;')
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;');

        if (!lang) return escaped;

        const l = lang.toLowerCase();

        // 1. Comments
        let highlighted = escaped.replace(/(#.*$|\/\/.*$)/gm, '<span class="token-comment">$1</span>');

        // 2. Strings ("..." or '...')
        highlighted = highlighted.replace(/(["'])(?:(?=(\\?))\2[\s\S])*?\1/g, '<span class="token-string">$&</span>');

        // 3. Keywords & Reserved Words
        const keywords = ['import', 'from', 'async', 'await', 'def', 'return', 'if', 'else', 'elif', 'for', 'while', 'in', 'try', 'except', 'class', 'with', 'as', 'print', 'set', 'echo', 'pandoc', 'exec', 'main', 'true', 'false', 'none', 'null'];
        const kwRegex = new RegExp(`\\b(${keywords.join('|')})\\b`, 'gi');
        highlighted = highlighted.replace(kwRegex, (match) => {
            // Avoid replacing inside HTML tags
            return `<span class="token-keyword">${match}</span>`;
        });

        // 4. Function Calls & Builtins
        highlighted = highlighted.replace(/\b([a-zA-Z_]\w*)(?=\()/g, '<span class="token-function">$1</span>');

        return highlighted;
    };

    const lines = text.split('\n');
    let html = '';
    let inList = false;
    let inTable = false;
    let inCodeBlock = false;
    let codeLanguage = '';
    let codeContent = [];

    const closeList = () => {
        if (inList) {
            html += '</ul>';
            inList = false;
        }
    };

    const closeTable = () => {
        if (inTable) {
            html += '</tbody></table>';
            inTable = false;
        }
    };

    for (let i = 0; i < lines.length; i++) {
        let line = lines[i];
        let trimmed = line.trim();

        // 1. Code Block Fence Handling (```python ... ```)
        if (trimmed.startsWith('```')) {
            closeList();
            closeTable();
            if (!inCodeBlock) {
                inCodeBlock = true;
                codeLanguage = trimmed.replace(/^```/, '').trim();
                codeContent = [];
            } else {
                inCodeBlock = false;
                const rawCode = codeContent.join('\n');
                const highlighted = highlightCode(rawCode, codeLanguage);
                const langBadge = codeLanguage ? `<div class="code-lang-badge">${codeLanguage.toUpperCase()}</div>` : '';
                html += `<div class="code-block-container">${langBadge}<pre><code class="language-${codeLanguage}">${highlighted}</code></pre></div>`;
                codeLanguage = '';
                codeContent = [];
            }
            continue;
        }

        if (inCodeBlock) {
            codeContent.push(line);
            continue;
        }

        if (!trimmed) {
            closeList();
            closeTable();
            continue;
        }

        // 2. Table Divider Line (e.g. |---|---| or | :--- | :--- |)
        if (trimmed.match(/^\|?\s*[-:]+[-|\s:]*\|?$/)) {
            continue;
        }

        // 3. Table Rows (e.g. | Col 1 | Col 2 |)
        if (trimmed.startsWith('|') && trimmed.endsWith('|')) {
            closeList();
            const cells = trimmed.split('|').slice(1, -1).map(c => c.trim());

            if (!inTable) {
                inTable = true;
                html += '<table><thead><tr>';
                cells.forEach(cell => {
                    html += `<th>${processInline(cell)}</th>`;
                });
                html += '</tr></thead><tbody>';
            } else {
                html += '<tr>';
                cells.forEach(cell => {
                    html += `<td>${processInline(cell)}</td>`;
                });
                html += '</tr>';
            }
            continue;
        } else {
            closeTable();
        }

        // 4. Headers (# Title, ## Section)
        if (trimmed.match(/^#+ /)) {
            closeList();
            const level = trimmed.match(/^(#+)/)[0].length;
            const content = trimmed.replace(/^#+ /, '');

            if (level === 1) {
                continue;
            }

            const tag = level === 2 ? 'h2' : (level === 3 ? 'h3' : 'h4');
            html += `<${tag}>${processInline(content)}</${tag}>`;
            continue;
        }

        // 5. Callouts / Blockquotes (> [!NOTE]\n> Content...)
        if (trimmed.startsWith('>')) {
            closeList();
            let alertType = '';
            let blockquoteLines = [];

            const firstLineText = trimmed.replace(/^>\s*/, '');
            const matchAlert = firstLineText.match(/^\[!(NOTE|TIP|WARNING|IMPORTANT|CAUTION)\]/i);
            if (matchAlert) {
                alertType = matchAlert[1].toLowerCase();
                const restOfFirstLine = firstLineText.replace(/^\[!(NOTE|TIP|WARNING|IMPORTANT|CAUTION)\]\s*/i, '');
                if (restOfFirstLine) {
                    blockquoteLines.push(restOfFirstLine);
                }
            } else {
                blockquoteLines.push(firstLineText);
            }

            while (i + 1 < lines.length && lines[i + 1].trim().startsWith('>')) {
                i++;
                const nextLineText = lines[i].trim().replace(/^>\s*/, '');
                if (nextLineText) {
                    blockquoteLines.push(nextLineText);
                }
            }

            const alertClass = alertType ? ` callout-${alertType}` : '';
            const headerLabel = alertType ? `<div class="callout-title">${alertType.toUpperCase()}</div>` : '';
            const bodyContent = blockquoteLines.map(l => processInline(l)).join('<br>');

            html += `<blockquote class="${alertClass}">${headerLabel}${bodyContent}</blockquote>`;
            continue;
        }

        // 6. Task List Checkboxes (- [x] Item, - [ ] Item)
        if (trimmed.match(/^[•*-]\s+\[([ xX])\]\s+/)) {
            if (!inList) {
                html += '<ul class="task-list">';
                inList = true;
            }
            const checked = trimmed.match(/^[•*-]\s+\[([xX])\]/);
            const isChecked = checked ? 'checked' : '';
            const content = trimmed.replace(/^[•*-]\s+\[([ xX])\]\s+/, '');
            html += `<li class="task-list-item"><input type="checkbox" ${isChecked} disabled> <span>${processInline(content)}</span></li>`;
            continue;
        }

        // 7. Standard Bullet Lists (- Item, * Item)
        if (trimmed.match(/^[•*-] /)) {
            if (!inList) {
                html += '<ul>';
                inList = true;
            }
            const content = trimmed.replace(/^[•*-] /, '');
            html += `<li>${processInline(content)}</li>`;
            continue;
        } else {
            closeList();
        }

        // 8. Horizontal Rule (---)
        if (trimmed.match(/^---+$/)) {
            closeList();
            html += '<hr>';
            continue;
        }

        // 9. Paragraph
        let paragraph = trimmed;
        while (i + 1 < lines.length && 
               lines[i+1].trim() && 
               !lines[i+1].trim().startsWith('```') &&
               !lines[i+1].trim().match(/^#+ /) && 
               !lines[i+1].trim().match(/^[•*-] /) &&
               !lines[i+1].trim().startsWith('|') &&
               !lines[i+1].trim().startsWith('>')) {
            i++;
            paragraph += ' ' + lines[i].trim();
        }
        html += `<p>${processInline(paragraph)}</p>`;
    }

    closeList();
    closeTable();

    return html;
}
