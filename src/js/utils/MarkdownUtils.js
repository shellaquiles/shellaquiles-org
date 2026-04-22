/**
 * Simple markdown parser utility
 */

export function parseMarkdown(text) {
    if (!text) return '';

    const processInline = (str) => {
        return str
            .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
            .replace(/`([^`]+)`/g, '<code>$1</code>')
            .replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" target="_blank" rel="noopener noreferrer">$1</a>');
    };

    const lines = text.split('\n');
    let html = '';
    let inList = false;

    for (let i = 0; i < lines.length; i++) {
        let line = lines[i].trim();
        if (!line) {
            if (inList) {
                html += '</ul>';
                inList = false;
            }
            continue;
        }

        // Headers
        if (line.match(/^#+ /)) {
            if (inList) {
                html += '</ul>';
                inList = false;
            }
            const level = line.match(/^(#+)/)[0].length;
            const content = line.replace(/^#+ /, '');
            const tag = level <= 3 ? `h${level + 1}` : 'h4';
            html += `<${tag}>${processInline(content)}</${tag}>`;
            continue;
        }

        // Lists
        if (line.match(/^[•*-] /)) {
            if (!inList) {
                html += '<ul>';
                inList = true;
            }
            const content = line.replace(/^[•*-] /, '');
            html += `<li>${processInline(content)}</li>`;
            continue;
        }

        // Horizontal Rule
        if (line.match(/^---+$/)) {
            if (inList) {
                html += '</ul>';
                inList = false;
            }
            html += '<hr class="post-separator">';
            continue;
        }

        // Paragraph (or continuation of a paragraph)
        if (inList) {
            html += '</ul>';
            inList = false;
        }
        
        // Peek next line to see if it's a continuation
        let paragraph = line;
        while (i + 1 < lines.length && 
               lines[i+1].trim() && 
               !lines[i+1].trim().match(/^#+ /) && 
               !lines[i+1].trim().match(/^[•*-] /)) {
            i++;
            paragraph += ' ' + lines[i].trim();
        }
        html += `<p>${processInline(paragraph)}</p>`;
    }

    if (inList) html += '</ul>';

    return html;
}
