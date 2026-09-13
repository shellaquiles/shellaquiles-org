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

import mermaid from 'mermaid';
import { createIcons, icons } from 'lucide';

// Configure marked options
marked.setOptions({
    gfm: true,
    breaks: true,
});

mermaid.initialize({
    startOnLoad: false,
    theme: 'dark',
    securityLevel: 'loose',
    fontFamily: 'inherit'
});

export async function renderMermaid(containerElement) {
    const root = containerElement || document;
    const elements = root.querySelectorAll('.mermaid');
    if (elements.length > 0) {
        try {
            await mermaid.run({
                nodes: Array.from(elements)
            });
        } catch (e) {
            console.error('Error rendering Mermaid diagram:', e);
        }
    }
}

export function renderLucideIcons(containerElement) {
    const root = containerElement || document;
    try {
        createIcons({
            icons,
            nameAttr: 'data-lucide',
            attrs: {
                class: 'lucide-icon inline-icon',
                width: '16',
                height: '16',
                'stroke-width': '2'
            }
        });
    } catch (e) {
        console.error('Error rendering Lucide icons:', e);
    }
}

// Custom renderer for GFM Callouts and Code blocks with syntax highlighting
const renderer = new marked.Renderer();

// Custom code block renderer with PrismJS & Mermaid support
renderer.code = function({ text, lang }) {
    const language = lang || 'text';

    if (language === 'mermaid') {
        return `<div class="mermaid-container" style="display:flex; justify-content:center; margin: 1.5rem 0; overflow-x:auto; background: rgba(0,0,0,0.2); padding: 1rem; border-radius: 6px; border: 1px solid var(--border-color, #333);"><div class="mermaid">${text}</div></div>`;
    }

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
    let rawText = text.trim();

    // Check for GFM Alert syntax in the raw text
    const matchAlert = rawText.match(/^<p>\s*\[!(NOTE|TIP|WARNING|IMPORTANT|CAUTION)\]\s*<br\s*\/?>?/i) ||
                       rawText.match(/^<p>\s*\[!(NOTE|TIP|WARNING|IMPORTANT|CAUTION)\]\s*/i) ||
                       rawText.match(/^\[!(NOTE|TIP|WARNING|IMPORTANT|CAUTION)\]/i);

    if (matchAlert) {
        alertType = matchAlert[1].toLowerCase();
        rawText = rawText.replace(/^<p>\s*\[!(NOTE|TIP|WARNING|IMPORTANT|CAUTION)\]\s*<br\s*\/?>?/i, '<p>')
                         .replace(/^<p>\s*\[!(NOTE|TIP|WARNING|IMPORTANT|CAUTION)\]\s*/i, '<p>')
                         .replace(/^\[!(NOTE|TIP|WARNING|IMPORTANT|CAUTION)\]\s*/i, '');
    }

    // Clean up empty tags if any
    if (rawText.startsWith('<p>') && rawText.endsWith('</p>')) {
        const inner = rawText.slice(3, -4).trim();
        rawText = `<p>${marked.parseInline(inner)}</p>`;
    } else {
        rawText = marked.parseInline(rawText);
    }

    const alertClass = alertType ? ` callout-${alertType}` : '';
    const headerLabel = alertType ? `<div class="callout-title">${alertType.toUpperCase()}</div>` : '';

    return `<blockquote class="${alertClass}">${headerLabel}${rawText}</blockquote>`;
};

// Custom task list item renderer
renderer.listitem = function({ text, task, checked }) {
    const content = marked.parseInline(text);
    if (task) {
        const isChecked = checked ? 'checked' : '';
        return `<li class="task-list-item"><input type="checkbox" ${isChecked} disabled> <span>${content}</span></li>`;
    }
    return `<li>${content}</li>`;
};

marked.use({ renderer });

export function parseMarkdown(text) {
    if (!text) return '';
    try {
        // Strip YAML Frontmatter (--- ... ---) if present at the beginning of the file
        const cleanText = text.replace(/^---\r?\n[\s\S]*?\r?\n---\r?\n/, '');
        return marked.parse(cleanText);
    } catch (e) {
        console.error('Error parsing markdown:', e);
        return text;
    }
}
