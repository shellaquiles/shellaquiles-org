/**
 * Standard Markdown parsing using `marked` + GFM extension & PrismJS syntax highlighting
 */
import { marked } from 'marked';
import Prism from 'prismjs';

// Import common Prism syntax languages if needed
import 'prismjs/components/prism-python';
import 'prismjs/components/prism-bash';
import 'prismjs/components/prism-json';
import 'prismjs/components/prism-javascript';
import 'prismjs/components/prism-css';
import 'prismjs/components/prism-markup'; // HTML

// Configure marked options
marked.setOptions({
    gfm: true,
    breaks: true,
});

// Custom renderer for GFM Callouts and Code blocks with syntax highlighting
const renderer = new marked.Renderer();

// Custom code block renderer with PrismJS
renderer.code = function({ text, lang }) {
    const language = lang || 'text';
    let highlighted = text;

    if (Prism.languages[language]) {
        try {
            highlighted = Prism.highlight(text, Prism.languages[language], language);
        } catch (e) {
            highlighted = text.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
        }
    } else {
        highlighted = text.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
    }

    const langBadge = language ? `<div class="code-lang-badge">${language.toUpperCase()}</div>` : '';
    return `<div class="code-block-container">${langBadge}<pre><code class="language-${language}">${highlighted}</code></pre></div>`;
};

// Custom blockquote renderer for GFM Callouts (> [!NOTE], > [!TIP], etc.)
renderer.blockquote = function({ text }) {
    let alertType = '';
    let content = text.trim();

    // Check for GFM Alert syntax in the raw HTML text
    const matchAlert = content.match(/^<p>\s*\[!(NOTE|TIP|WARNING|IMPORTANT|CAUTION)\]\s*<br\s*\/?>?/i) ||
                       content.match(/^\[!(NOTE|TIP|WARNING|IMPORTANT|CAUTION)\]/i);

    if (matchAlert) {
        alertType = matchAlert[1].toLowerCase();
        content = content.replace(/^<p>\s*\[!(NOTE|TIP|WARNING|IMPORTANT|CAUTION)\]\s*<br\s*\/?>?/i, '<p>')
                         .replace(/^\[!(NOTE|TIP|WARNING|IMPORTANT|CAUTION)\]\s*/i, '');
    }

    const alertClass = alertType ? ` callout-${alertType}` : '';
    const headerLabel = alertType ? `<div class="callout-title">${alertType.toUpperCase()}</div>` : '';

    return `<blockquote class="${alertClass}">${headerLabel}${content}</blockquote>`;
};

// Custom task list item renderer
renderer.listitem = function({ text, task, checked }) {
    if (task) {
        const isChecked = checked ? 'checked' : '';
        return `<li class="task-list-item"><input type="checkbox" ${isChecked} disabled> <span>${text}</span></li>`;
    }
    return `<li>${text}</li>`;
};

marked.use({ renderer });

export function parseMarkdown(text) {
    if (!text) return '';
    try {
        return marked.parse(text);
    } catch (e) {
        console.error('Error parsing markdown:', e);
        return text;
    }
}
