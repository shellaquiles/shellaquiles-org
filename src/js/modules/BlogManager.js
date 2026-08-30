import { parseMarkdown as utilParseMarkdown, renderMermaid, renderLucideIcons } from '../utils/MarkdownUtils.js';

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

        const terminal = document.querySelector('.container, .terminal');
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
        const terminal = document.querySelector('.container, .terminal');
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
        const terminal = document.querySelector('.container, .terminal');
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
        renderLucideIcons(blogContainer);

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

        const terminal = document.querySelector('.container, .terminal');
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
            await renderMermaid(blogContainer);
            renderLucideIcons(blogContainer);
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
        const terminal = document.querySelector('.container, .terminal');
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
    /**
     * Render blog list HTML (Estilo Editorial Cron-Quiles)
     */
    renderBlogListHTML() {
        if (this.posts.length === 0) {
            return `
                <div class="blog-header-section">
                    <div class="hero-badge">// BLOG & ARTÍCULOS</div>
                    <h1 class="hero-title">Blog de Shellaquiles</h1>
                    <p class="hero-desc">No hay artículos publicados todavía.</p>
                </div>
            `;
        }

        const postsHTML = this.posts.map(post => {
            const { day, monthYear } = this.formatDateParts(post.date);
            const categoryBadge = post.category ? `<span class="badge badge-accent">${post.category.toUpperCase()}</span>` : '';
            const author = post.author ? `<span class="post-author">// por ${post.author}</span>` : '';
            const tagsHTML = (post.tags || []).map(tag => `<span class="post-tag">#${tag}</span>`).join('');

            return `
                <article class="post-card" data-slug="${post.slug}">
                    <!-- Columna lateral: Fecha -->
                    <div class="post-date-block">
                        <span class="post-day">${day}</span>
                        <span class="post-month-year">${monthYear}</span>
                    </div>

                    <!-- Contenido Central -->
                    <div class="post-main">
                        <div class="post-meta-row">
                            ${categoryBadge}
                            ${author}
                        </div>

                        <h2 class="post-title">
                            <a href="/blog/${post.slug}" data-navigate="/blog/${post.slug}">${post.title}</a>
                        </h2>

                        <p class="post-summary">
                            ${post.excerpt || ''}
                        </p>

                        <div class="post-tags">
                            ${tagsHTML}
                        </div>
                    </div>

                    <!-- Botón de Acción Técnico -->
                    <div class="post-action">
                        <a href="/blog/${post.slug}" class="btn btn-outline" data-navigate="/blog/${post.slug}">Leer artículo <i data-lucide="arrow-up-right"></i></a>
                    </div>
                </article>
            `;
        }).join('');

        return `
            <div class="blog-header-section">
                <div class="hero-badge">// BLOG & ARTÍCULOS</div>
                <h1 class="hero-title">Artículos, Cátedras & Novedades</h1>
                <p class="hero-desc">Publicaciones técnicas, reflexiones de arquitectura y guías del ecosistema open source en México.</p>
            </div>
            <div class="blog-list">
                ${postsHTML}
            </div>
        `;
    }

    /**
     * Helper to split date into day and month/year
     */
    formatDateParts(dateString) {
        const date = new Date(dateString);
        const day = String(date.getDate()).padStart(2, '0');
        const months = ['ENE', 'FEB', 'MAR', 'ABR', 'MAY', 'JUN', 'JUL', 'AGO', 'SEP', 'OCT', 'NOV', 'DIC'];
        const month = months[date.getMonth()] || 'MES';
        const year = date.getFullYear();
        return {
            day,
            monthYear: `${month} / ${year}`
        };
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
        const { day, monthYear } = this.formatDateParts(post.date);

        if (!markdownContent) {
            return `
                <main class="blog-post-view">
                    <div class="post-control-bar">
                        <a href="/blog" class="btn-back" data-navigate="/blog"><i data-lucide="arrow-left"></i> VOLVER AL BLOG</a>
                        <div class="meta-right">
                            <span class="badge badge-accent">${(post.category || 'ARTÍCULO').toUpperCase()}</span>
                            <span style="color: var(--text-muted); margin-left: 0.5rem;">${day} ${monthYear}</span>
                        </div>
                    </div>
                    <article class="article-sheet">
                        <h1>${post.title}</h1>
                        <p style="color: var(--text-muted);">Error al cargar el contenido del artículo.</p>
                    </article>
                </main>
            `;
        }

        // Convert markdown content to HTML using updated single-sheet parser
        const content = this.parseMarkdown(markdownContent);
        const tagsHTML = (post.tags || []).map(tag => `<span class="post-tag">#${tag}</span>`).join('');

        return `
            <main class="blog-post-view">
                <!-- Barra de control de utilidades -->
                <div class="post-control-bar">
                    <a href="/blog" class="btn-back" data-navigate="/blog"><i data-lucide="arrow-left"></i> VOLVER AL BLOG</a>
                    <div class="meta-right">
                        <span class="badge badge-accent">${(post.category || 'ARTÍCULO').toUpperCase()}</span>
                        <span style="color: var(--text-muted); margin-left: 0.5rem;">${day} ${monthYear}</span>
                    </div>
                </div>

                <!-- Hoja única de lectura continua (780px) -->
                <article class="article-sheet">
                    <header class="article-header">
                        <div class="hero-badge">// ARTÍCULO TÉCNICO // por ${post.author || '@pixelead0'}</div>
                        <h1>${post.title}</h1>
                        ${post.excerpt ? `<p style="color: var(--text-muted); font-size: 0.95rem; line-height: 1.5; margin-top: 0.2rem;">${post.excerpt}</p>` : ''}
                        <div class="post-tags-row" style="margin-top: 0.75rem;">
                            ${tagsHTML}
                        </div>
                    </header>

                    <div class="article-body">
                        ${content}
                    </div>
                </article>

                <div class="post-footer-nav" style="margin-top: 1.25rem;">
                    <a href="/blog" class="btn btn-outline" data-navigate="/blog"><i data-lucide="arrow-left"></i> Volver al Blog</a>
                </div>
            </main>
        `;
    }

    /**
     * Parse simple markdown-like syntax to HTML using shared utility
     */
    parseMarkdown(text) {
        return utilParseMarkdown(text);
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
            document.addEventListener('click', (e) => {
                const link = e.target.closest('a');
                if (!link) return;

                const href = link.getAttribute('href');
                const navigatePath = link.getAttribute('data-navigate');

                // Si es un hash link (#proyectos, #manifiesto)
                if (href && href.startsWith('#')) {
                    const targetId = href.substring(1);
                    const targetEl = document.getElementById(targetId);
                    
                    // Si estamos en la vista de blog y se clica un hash, volver al home primero
                    if (this.currentView !== 'home') {
                        e.preventDefault();
                        this.navigate('/');
                        setTimeout(() => {
                            const el = document.getElementById(targetId);
                            if (el) el.scrollIntoView({ behavior: 'smooth' });
                        }, 100);
                        return;
                    }

                    if (targetEl) {
                        e.preventDefault();
                        targetEl.scrollIntoView({ behavior: 'smooth' });
                        // Actualizar hash en URL sin recarga
                        history.pushState(null, '', href);
                    }
                    return;
                }

                // Si tiene data-navigate o es una ruta interna (/ o /blog)
                if (navigatePath || (href && (href === '/' || href.startsWith('/blog')))) {
                    const path = navigatePath || href;
                    if (path) {
                        e.preventDefault();
                        this.navigate(path);
                    }
                }
            }, true); // Use capture phase
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
