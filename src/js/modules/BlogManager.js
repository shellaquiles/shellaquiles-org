/**
 * BlogManager - Handles blog posts, routing, and content management
 */

export class BlogManager {
    constructor() {
        this.posts = [];
        this.currentPost = null;
        this.currentView = 'home'; // 'home', 'blog', 'post'
        this.navigationSetup = false; // Flag to track if navigation is already set up
        this.isRendering = false; // Flag to prevent multiple simultaneous renders
        this.init();
    }

    /**
     * Initialize the blog manager
     */
    async init() {
        await this.loadPosts();
        this.setupRouting();
        // Wait for DOM to be fully ready before rendering
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', () => {
                this.renderCurrentView();
            });
        } else {
            // DOM already ready
            setTimeout(() => {
                this.renderCurrentView();
            }, 100);
        }
    }

    /**
     * Load posts from JSON file
     */
    async loadPosts() {
        // Try different paths for development and production
        const paths = [
            '/src/data/posts.json',
            '/dist/src/data/posts.json'
        ];

        for (const path of paths) {
            try {
                const response = await fetch(path);
                if (response.ok) {
                    this.posts = await response.json();
                    // Sort by date (newest first)
                    this.posts.sort((a, b) => new Date(b.date) - new Date(a.date));
                    return;
                }
            } catch (error) {
                // Try next path
                continue;
            }
        }

        // If all paths failed, log error and use empty array
        console.error('Error loading posts: Could not find posts.json in any expected location');
        this.posts = [];
    }

    /**
     * Setup routing using History API
     */
    setupRouting() {
        // Handle browser back/forward
        window.addEventListener('popstate', () => {
            this.renderCurrentView();
        });

        // Handle initial route
        this.handleRoute(window.location.pathname);
    }

    /**
     * Handle route changes
     */
    handleRoute(path) {
        if (path === '/' || path === '/index.html' || path === '') {
            this.currentView = 'home';
            this.currentPost = null;
        } else if (path === '/blog' || path === '/blog/') {
            this.currentView = 'blog';
            this.currentPost = null;
        } else if (path.startsWith('/blog/')) {
            const slug = path.replace('/blog/', '').replace('/', '');
            this.currentPost = this.posts.find(p => p.slug === slug);
            this.currentView = this.currentPost ? 'post' : '404';
        } else {
            this.currentView = '404';
        }
    }

    /**
     * Navigate to a route
     */
    navigate(path) {
        // Prevent navigation if already rendering
        if (this.isRendering) {
            return;
        }

        window.history.pushState({}, '', path);
        this.handleRoute(path);
        this.renderCurrentView();
        this.updateActiveNavLink();
    }

    /**
     * Render current view based on route
     */
    renderCurrentView() {
        // Prevent multiple simultaneous renders
        if (this.isRendering) {
            return;
        }

        this.isRendering = true;
        const path = window.location.pathname;
        this.handleRoute(path);

        const terminal = document.querySelector('.terminal');
        if (!terminal) {
            this.isRendering = false;
            setTimeout(() => this.renderCurrentView(), 100);
            return;
        }

        try {
            switch (this.currentView) {
                case 'home':
                    this.showHome();
                    break;
                case 'blog':
                    this.showBlogList();
                    break;
                case 'post':
                    this.showPost(this.currentPost);
                    break;
                case '404':
                    this.show404();
                    break;
            }
        } finally {
            // Always reset rendering flag after a short delay
            setTimeout(() => {
                this.isRendering = false;
            }, 50);
        }
    }

    /**
     * Show home page (original content)
     */
    showHome() {
        const terminal = document.querySelector('.terminal');
        if (!terminal) return;

        // Check if home content exists
        const homeContent = document.querySelector('.home-content');
        if (homeContent) {
            // Show home content, hide blog content
            homeContent.style.display = 'block';
            const blogContent = document.querySelector('.blog-content');
            if (blogContent) blogContent.style.display = 'none';
            return;
        }

        // If no home content exists, terminal should show original content
        // This means the original HTML is still there
    }

    /**
     * Show blog list
     */
    showBlogList() {
        const terminal = document.querySelector('.terminal');
        if (!terminal) {
            return;
        }

        // Hide home content
        const homeContent = document.querySelector('.home-content');
        if (homeContent) {
            homeContent.style.display = 'none';
        }

        // Get or create blog container
        let blogContainer = document.querySelector('.blog-content');
        if (!blogContainer) {
            blogContainer = document.createElement('div');
            blogContainer.className = 'blog-content';
            terminal.appendChild(blogContainer);
        }

        // Force visibility - remove inline style and set explicitly
        blogContainer.removeAttribute('style');
        blogContainer.style.display = 'block';
        blogContainer.style.visibility = 'visible';
        blogContainer.style.opacity = '1';
        blogContainer.style.setProperty('opacity', '1', 'important');

        // Render blog list
        const html = this.renderBlogListHTML();
        blogContainer.innerHTML = html;

        // Force opacity on all output elements inside blog-content
        const outputs = blogContainer.querySelectorAll('.output');
        outputs.forEach(output => {
            output.style.setProperty('opacity', '1', 'important');
            output.style.setProperty('transform', 'none', 'important');
        });

        // Setup navigation after DOM update
        requestAnimationFrame(() => {
            this.setupNavigationLinks();
            // Double-check visibility after setup - ensure it's visible
            const container = document.querySelector('.blog-content');
            if (container) {
                container.style.setProperty('opacity', '1', 'important');
                container.style.setProperty('display', 'block', 'important');
                container.style.setProperty('visibility', 'visible', 'important');

                // Force opacity on all output elements
                const allOutputs = container.querySelectorAll('.output');
                allOutputs.forEach(output => {
                    output.style.setProperty('opacity', '1', 'important');
                    output.style.setProperty('transform', 'none', 'important');
                });
            }
        });
    }

    /**
     * Show individual post
     */
    async showPost(post) {
        if (!post) {
            this.show404();
            return;
        }

        const terminal = document.querySelector('.terminal');
        if (!terminal) return;

        // Hide home content
        const homeContent = document.querySelector('.home-content');
        if (homeContent) homeContent.style.display = 'none';

        // Get or create blog container
        let blogContainer = document.querySelector('.blog-content');
        if (!blogContainer) {
            blogContainer = document.createElement('div');
            blogContainer.className = 'blog-content';
            terminal.appendChild(blogContainer);
        }

        // Force visibility
        blogContainer.style.display = 'block';
        blogContainer.style.visibility = 'visible';
        blogContainer.style.opacity = '1';

        // Show loading state
        blogContainer.innerHTML = `
            <div class="prompt">
                <span class="cursor">$</span>
                <span class="command-text">cat posts/${post.slug}.md</span>
            </div>
            <div class="output blog-post">
                <p>Cargando contenido...</p>
            </div>
        `;

        // Load and render post content
        try {
            const html = await this.renderPostHTML(post);
            blogContainer.innerHTML = html;
        } catch (error) {
            console.error('Error loading post content:', error);
            blogContainer.innerHTML = `
                <div class="prompt">
                    <span class="cursor">$</span>
                    <span class="command-text">cat posts/${post.slug}.md</span>
                </div>
                <div class="output blog-post">
                    <article class="post-content">
                        <header class="post-header-single">
                            <h1>${post.title}</h1>
                        </header>
                        <div class="post-body">
                            <p>Error al cargar el contenido del post.</p>
                        </div>
                        <footer class="post-footer">
                            <a href="/blog" class="btn primary-btn" data-navigate="/blog">← Volver al blog</a>
                        </footer>
                    </article>
                </div>
            `;
        }

        // Setup navigation after DOM update
        requestAnimationFrame(() => {
            this.setupNavigationLinks();
            // Double-check visibility after setup
            const container = document.querySelector('.blog-content');
            if (container) {
                container.style.display = 'block';
                container.style.visibility = 'visible';
            }
        });
    }

    /**
     * Show 404 page
     */
    show404() {
        const terminal = document.querySelector('.terminal');
        if (!terminal) return;

        let blogContainer = document.querySelector('.blog-content');
        if (!blogContainer) {
            blogContainer = document.createElement('div');
            blogContainer.className = 'blog-content';
            terminal.appendChild(blogContainer);
        }

        blogContainer.style.display = 'block';
        blogContainer.style.visibility = 'visible';

        blogContainer.innerHTML = `
            <div class="prompt">
                <span class="cursor">$</span>
                <span class="command-text">cat error.txt</span>
            </div>
            <div class="output">
                <h2>404 - Post no encontrado</h2>
                <p>El post que buscas no existe.</p>
                <p><a href="/blog" class="btn primary-btn" data-navigate="/blog">Volver al blog</a></p>
            </div>
        `;

        // Setup navigation after DOM update
        requestAnimationFrame(() => {
            this.setupNavigationLinks();
        });
    }

    /**
     * Render blog list HTML
     */
    renderBlogListHTML() {
        if (this.posts.length === 0) {
            return `
                <div class="prompt">
                    <span class="cursor">$</span>
                    <span class="command-text">ls posts/</span>
                </div>
                <div class="output">
                    <h2>Blog</h2>
                    <p>No hay posts disponibles aún.</p>
                </div>
            `;
        }

        const postsHTML = this.posts.map(post => `
            <article class="blog-post-preview" data-slug="${post.slug}">
                <div class="post-header">
                    <h3><a href="/blog/${post.slug}" data-navigate="/blog/${post.slug}">${post.title}</a></h3>
                    <div class="post-meta">
                        <span class="post-date">${this.formatDate(post.date)}</span>
                        <span class="post-author">por ${post.author}</span>
                        <span class="post-category">${post.category}</span>
                    </div>
                </div>
                <div class="post-excerpt">
                    ${post.excerpt}
                </div>
                <div class="post-tags">
                    ${post.tags.map(tag => `<span class="tag">#${tag}</span>`).join('')}
                </div>
                <a href="/blog/${post.slug}" class="btn read-more-btn" data-navigate="/blog/${post.slug}">Leer más →</a>
            </article>
        `).join('');

        return `
            <div class="prompt">
                <span class="cursor">$</span>
                <span class="command-text">ls posts/</span>
            </div>
            <div class="output blog-list">
                <h2>Blog de Shellaquiles</h2>
                <p>Articulos, tutoriales y noticias de la comunidad tech más inclusiva de México.</p>
                <div class="posts-container">
                    ${postsHTML}
                </div>
            </div>
        `;
    }

    /**
     * Load post content from Markdown file
     */
    async loadPostContent(slug) {
        const paths = [
            `/src/data/posts/${slug}.md`,
            `/dist/src/data/posts/${slug}.md`
        ];

        for (const path of paths) {
            try {
                const response = await fetch(path);
                if (response.ok) {
                    return await response.text();
                }
            } catch (error) {
                // Try next path
                continue;
            }
        }

        console.error(`Error loading post content for ${slug}: Could not find ${slug}.md`);
        return null;
    }

    /**
     * Render post HTML
     */
    async renderPostHTML(post) {
        // Load content from Markdown file
        const markdownContent = await this.loadPostContent(post.slug);

        if (!markdownContent) {
            return `
                <div class="prompt">
                    <span class="cursor">$</span>
                    <span class="command-text">cat posts/${post.slug}.md</span>
                </div>
                <div class="output blog-post">
                    <article class="post-content">
                        <header class="post-header-single">
                            <h1>${post.title}</h1>
                            <div class="post-meta">
                                <span class="post-date">${this.formatDate(post.date)}</span>
                                <span class="post-author">por ${post.author}</span>
                                <span class="post-category">${post.category}</span>
                            </div>
                        </header>
                        <div class="post-body">
                            <p>Error: No se pudo cargar el contenido del post.</p>
                        </div>
                        <footer class="post-footer">
                            <a href="/blog" class="btn primary-btn" data-navigate="/blog">← Volver al blog</a>
                        </footer>
                    </article>
                </div>
            `;
        }

        // Convert markdown content to HTML
        const content = this.parseMarkdown(markdownContent);

        return `
            <div class="prompt">
                <span class="cursor">$</span>
                <span class="command-text">cat posts/${post.slug}.md</span>
            </div>
            <div class="output blog-post">
                <article class="post-content">
                    <header class="post-header-single">
                        <h1>${post.title}</h1>
                        <div class="post-meta">
                            <span class="post-date">${this.formatDate(post.date)}</span>
                            <span class="post-author">por ${post.author}</span>
                            <span class="post-category">${post.category}</span>
                        </div>
                        <div class="post-tags">
                            ${post.tags.map(tag => `<span class="tag">#${tag}</span>`).join('')}
                        </div>
                    </header>
                    <div class="post-body">
                        ${content}
                    </div>
                    <footer class="post-footer">
                        <a href="/blog" class="btn primary-btn" data-navigate="/blog">← Volver al blog</a>
                    </footer>
                </article>
            </div>
        `;
    }

    /**
     * Parse simple markdown-like syntax to HTML
     */
    parseMarkdown(text) {
        if (!text) return '';

        let html = text;

        // Code blocks ```lang\ncode\n``` (do this first to avoid processing code)
        html = html.replace(/```(\w+)?\n([\s\S]*?)```/g, '<pre><code>$2</code></pre>');

        // Split by double newlines to process paragraphs separately
        const blocks = html.split(/\n\n+/);

        // Process each block
        html = blocks.map(block => {
            block = block.trim();
            if (!block) return '';

            // Skip if already a code block
            if (block.startsWith('<pre>')) {
                return block;
            }

            // Horizontal rules (separators) ---
            if (block.match(/^---+$/)) {
                return '<hr class="post-separator">';
            }

            // Tables - Markdown tables (| col1 | col2 |)
            if (block.includes('|') && block.includes('---')) {
                const lines = block.split('\n').filter(line => line.trim());
                if (lines.length >= 2) {
                    const headerLine = lines[0];
                    const separatorLine = lines[1];

                    // Check if it's a table (has | and separator with ---)
                    if (separatorLine.includes('---') && headerLine.includes('|')) {
                        const headers = headerLine.split('|').map(h => h.trim()).filter(h => h);
                        const rows = lines.slice(2).filter(line => line.includes('|'));

                        let tableHTML = '<table>\n<thead>\n<tr>\n';
                        headers.forEach(header => {
                            // Process inline formatting in headers
                            let headerText = header.replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>');
                            headerText = headerText.replace(/`([^`]+)`/g, '<code>$1</code>');
                            tableHTML += `<th>${headerText}</th>\n`;
                        });
                        tableHTML += '</tr>\n</thead>\n<tbody>\n';

                        rows.forEach(row => {
                            const cells = row.split('|').map(c => c.trim()).filter(c => c);
                            if (cells.length > 0) {
                                tableHTML += '<tr>\n';
                                cells.forEach(cell => {
                                    // Process inline formatting in cells
                                    let cellText = cell.replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>');
                                    cellText = cellText.replace(/`([^`]+)`/g, '<code>$1</code>');
                                    cellText = cellText.replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" target="_blank" rel="noopener noreferrer">$1</a>');
                                    tableHTML += `<td>${cellText}</td>\n`;
                                });
                                tableHTML += '</tr>\n';
                            }
                        });

                        tableHTML += '</tbody>\n</table>';
                        return tableHTML;
                    }
                }
            }

            // Headers ## Header (must be at start of line)
            if (block.match(/^### /)) {
                return block.replace(/^### (.+)$/gm, '<h3>$1</h3>');
            }
            if (block.match(/^## /)) {
                return block.replace(/^## (.+)$/gm, '<h2>$1</h2>');
            }

            // Lists - item (process list items)
            if (block.match(/^- /)) {
                const listItems = block.split(/\n/).map(line => {
                    if (line.trim().startsWith('- ')) {
                        let item = line.replace(/^- (.+)$/, '$1');
                        // Process inline formatting
                        item = item.replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>');
                        item = item.replace(/`([^`]+)`/g, '<code>$1</code>');
                        item = item.replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" target="_blank" rel="noopener noreferrer">$1</a>');
                        return `<li>${item}</li>`;
                    }
                    return line;
                }).join('');
                return `<ul>${listItems}</ul>`;
            }

            // Regular paragraph
            // Process inline formatting
            block = block.replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>');
            block = block.replace(/`([^`]+)`/g, '<code>$1</code>');
            block = block.replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" target="_blank" rel="noopener noreferrer">$1</a>');

            return `<p>${block}</p>`;
        }).join('');

        return html;
    }

    /**
     * Format date for display
     */
    formatDate(dateString) {
        const date = new Date(dateString);
        const options = { year: 'numeric', month: 'long', day: 'numeric' };
        return date.toLocaleDateString('es-MX', options);
    }

    /**
     * Setup navigation links (handle clicks)
     * Uses event delegation to avoid duplicate listeners
     */
    setupNavigationLinks() {
        // Only setup navigation listener once
        if (!this.navigationSetup) {
            // Use event delegation on the document
            // This way we don't need to remove/add listeners each time
            document.addEventListener('click', (e) => {
                const link = e.target.closest('[data-navigate]');
                if (link) {
                    e.preventDefault();
                    const path = link.getAttribute('data-navigate') || link.getAttribute('href');
                    if (path) {
                        this.navigate(path);
                    }
                }
            }, true); // Use capture phase to catch events early
            this.navigationSetup = true;
        }

        // Update active nav link
        this.updateActiveNavLink();
    }

    /**
     * Update active navigation link
     */
    updateActiveNavLink() {
        const currentPath = window.location.pathname;
        document.querySelectorAll('.nav-link').forEach(link => {
            const linkPath = link.getAttribute('data-navigate') || link.getAttribute('href');
            if ((currentPath === '/' || currentPath === '/index.html' || currentPath === '') && (linkPath === '/' || linkPath === '')) {
                link.classList.add('active');
            } else if (currentPath.startsWith('/blog') && linkPath === '/blog') {
                link.classList.add('active');
            } else {
                link.classList.remove('active');
            }
        });
    }

    /**
     * Get all posts
     */
    getPosts() {
        return [...this.posts];
    }

    /**
     * Get post by slug
     */
    getPostBySlug(slug) {
        return this.posts.find(p => p.slug === slug);
    }

    /**
     * Get posts by category
     */
    getPostsByCategory(category) {
        return this.posts.filter(p => p.category === category);
    }

    /**
     * Get posts by tag
     */
    getPostsByTag(tag) {
        return this.posts.filter(p => p.tags.includes(tag));
    }
}
