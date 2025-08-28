/**
 * EventManager - Handles all event listeners and user interactions
 */
export class EventManager {
    constructor(terminal) {
        this.terminal = terminal;
        this.animationManager = terminal.animationManager;
    }

    /**
     * Setup all event listeners
     */
    setupEventListeners() {
        this.setupSmoothScrolling();
        this.setupTerminalInput();
        this.setupEmailCopy();
        this.setupNodoEffects();
        this.setupButtonInteractions();
    }

    /**
     * Setup smooth scrolling for anchor links
     */
    setupSmoothScrolling() {
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', (e) => {
                e.preventDefault();
                const target = document.querySelector(anchor.getAttribute('href'));
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            });
        });
    }

    /**
     * Setup terminal input simulation
     */
    setupTerminalInput() {
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Enter') {
                this.terminal.simulateCommand();
            }
        });
    }

    /**
     * Setup email copy functionality
     */
    setupEmailCopy() {
        const emailElement = document.querySelector('.email');
        if (emailElement) {
            emailElement.addEventListener('click', () => {
                this.copyToClipboard(emailElement.textContent);
                this.terminal.notificationSystem.showNotification('Email copiado al portapapeles!', 'success');
            });
        }
    }

    /**
     * Setup nodo hover effects
     */
    setupNodoEffects() {
        document.querySelectorAll('.nodo').forEach(nodo => {
            nodo.addEventListener('mouseenter', () => {
                this.animationManager.addGlowEffect(nodo);
            });

            nodo.addEventListener('mouseleave', () => {
                this.animationManager.removeGlowEffect(nodo);
            });
        });
    }

    /**
     * Setup button interactions
     */
    setupButtonInteractions() {
        document.querySelectorAll('.btn').forEach(btn => {
            // Skip external links (Telegram, GitHub, etc.)
            if (btn.href && (btn.href.startsWith('http://') || btn.href.startsWith('https://'))) {
                return; // Don't intercept external links
            }

            btn.addEventListener('click', (e) => {
                e.preventDefault();
                this.handleButtonClick(btn);
            });
        });
    }

    /**
     * Handle button click events
     */
    handleButtonClick(btn) {
        const action = btn.textContent.toLowerCase();
        const actions = {
            'proponer taller': '¡Excelente idea! Te contactaremos para coordinar el taller.',
            'abrir espacio': '¡Gracias por abrir tu espacio! Será un nodo más en la comunidad.',
            'unirme como voluntario': '¡Bienvenido al equipo! Tu ayuda es invaluable.'
        };

        const message = actions[action] || '¡Gracias por tu interés! Te contactaremos pronto.';
        this.terminal.notificationSystem.showNotification(message, 'info');

        // Add click effect
        this.animationManager.addClickEffect(btn);
    }

    /**
     * Copy text to clipboard
     */
    copyToClipboard(text) {
        if (navigator.clipboard) {
            navigator.clipboard.writeText(text);
        } else {
            // Fallback for older browsers
            const textArea = document.createElement('textarea');
            textArea.value = text;
            document.body.appendChild(textArea);
            textArea.select();
            document.execCommand('copy');
            document.body.removeChild(textArea);
        }
    }
}
