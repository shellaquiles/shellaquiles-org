/**
 * Shellaquiles Terminal Script - JavaScript Combinado
 * Generado automáticamente desde módulos ES6
 */

/* ===== ANIMATION MANAGER ===== */
/**
 * AnimationManager - Handles all terminal animations and effects
 */
class AnimationManager {
    constructor() {
        this.typingSpeed = 50;
        this.animationIntervals = [];
    }

    /**
     * Start all terminal animations
     */
    startTerminalAnimation() {
        this.animatePrompts();
        this.animateSections();
        this.addTypingEffect();
    }

    /**
     * Animate command prompts appearing
     */
    animatePrompts() {
        const prompts = document.querySelectorAll('.prompt');
        const outputs = document.querySelectorAll('.output');

        prompts.forEach((prompt, index) => {
            setTimeout(() => {
                prompt.style.opacity = '1';
                prompt.style.transform = 'translateX(0)';

                // Show corresponding output
                if (outputs[index]) {
                    setTimeout(() => {
                        outputs[index].style.opacity = '1';
                        outputs[index].style.transform = 'translateY(0)';
                    }, 500);
                }
            }, index * 800);
        });
    }

    /**
     * Animate sections appearing
     */
    animateSections() {
        const sections = document.querySelectorAll('.section, .nodos-grid, .cta');

        sections.forEach((section, index) => {
            setTimeout(() => {
                section.style.opacity = '1';
                section.style.transform = 'translateY(0)';
            }, (6 + index) * 800); // 6 commands + index
        });
    }

    /**
     * Add typing effect to command texts
     */
    addTypingEffect() {
        const commandTexts = document.querySelectorAll('.command-text');

        commandTexts.forEach((text, index) => {
            const originalText = text.textContent;
            text.textContent = '';

            setTimeout(() => {
                this.typeText(text, originalText, 0);
            }, index * 800);
        });
    }

    /**
     * Type text character by character
     */
    typeText(element, text, index) {
        if (index < text.length) {
            element.textContent += text.charAt(index);
            setTimeout(() => {
                this.typeText(element, text, index + 1);
            }, this.typingSpeed);
        }
    }

    /**
     * Setup scroll effects and intersection observer
     */
    setupScrollEffects() {
        this.setupParallaxEffect();
        this.setupIntersectionObserver();
    }

    /**
     * Setup parallax effect for background
     */
    setupParallaxEffect() {
        window.addEventListener('scroll', () => {
            const scrolled = window.pageYOffset;
            const parallax = document.querySelector('.terminal::before');
            if (parallax) {
                const speed = scrolled * 0.5;
                parallax.style.transform = `translateY(${speed}px)`;
            }
        });
    }

    /**
     * Setup intersection observer for reveal animations
     */
    setupIntersectionObserver() {
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('revealed');
                }
            });
        }, observerOptions);

        document.querySelectorAll('.nodo, .proyecto, .section').forEach(el => {
            observer.observe(el);
        });
    }

    /**
     * Setup terminal cursor blinking effect
     */
    setupTerminalCursor() {
        const interval = setInterval(() => {
            const cursors = document.querySelectorAll('.cursor');
            cursors.forEach(cursor => {
                cursor.style.opacity = cursor.style.opacity === '0' ? '1' : '0';
            });
        }, 500);

        this.animationIntervals.push(interval);
    }

    /**
     * Add glow effect to elements on hover
     */
    addGlowEffect(element) {
        element.style.boxShadow = '0 0 20px rgba(0, 255, 0, 0.6)';
        element.style.transform = 'scale(1.05)';
    }

    /**
     * Remove glow effect from elements
     */
    removeGlowEffect(element) {
        element.style.boxShadow = '';
        element.style.transform = '';
    }

    /**
     * Add click effect to buttons
     */
    addClickEffect(btn) {
        btn.style.transform = 'scale(0.95)';
        setTimeout(() => {
            btn.style.transform = '';
        }, 150);
    }

    /**
     * Cleanup all animation intervals
     */
    destroy() {
        this.animationIntervals.forEach(interval => {
            clearInterval(interval);
        });
        this.animationIntervals = [];
    }
}

/* ===== NOTIFICATION SYSTEM ===== */
/**
 * NotificationSystem - Handles all notifications and user feedback
 */
class NotificationSystem {
    constructor() {
        this.notifications = [];
    }

    /**
     * Show a notification to the user
     */
    showNotification(message, type = 'info') {
        const notification = this.createNotificationElement(message, type);
        document.body.appendChild(notification);

        this.animateNotification(notification);
        this.notifications.push(notification);
    }

    /**
     * Create notification element
     */
    createNotificationElement(message, type) {
        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        notification.textContent = message;

        Object.assign(notification.style, {
            position: 'fixed',
            top: '20px',
            right: '20px',
            background: type === 'success' ? '#00ff00' : '#ffffff',
            color: type === 'success' ? '#000' : '#000',
            padding: '15px 20px',
            borderRadius: '5px',
            fontFamily: 'Courier New, monospace',
            fontWeight: 'bold',
            zIndex: '1000',
            transform: 'translateX(100%)',
            transition: 'transform 0.3s ease',
            boxShadow: '0 5px 15px rgba(0,0,0,0.3)'
        });

        return notification;
    }

    /**
     * Animate notification in and out
     */
    animateNotification(notification) {
        // Animate in
        setTimeout(() => {
            notification.style.transform = 'translateX(0)';
        }, 100);

        // Remove after 3 seconds
        setTimeout(() => {
            notification.style.transform = 'translateX(100%)';
            setTimeout(() => {
                if (notification.parentNode) {
                    document.body.removeChild(notification);
                    // Remove from notifications array
                    const index = this.notifications.indexOf(notification);
                    if (index > -1) {
                        this.notifications.splice(index, 1);
                    }
                }
            }, 300);
        }, 3000);
    }

    /**
     * Clear all notifications
     */
    clearAll() {
        this.notifications.forEach(notification => {
            if (notification.parentNode) {
                document.body.removeChild(notification);
            }
        });
        this.notifications = [];
    }

    /**
     * Show success notification
     */
    success(message) {
        this.showNotification(message, 'success');
    }

    /**
     * Show info notification
     */
    info(message) {
        this.showNotification(message, 'info');
    }

    /**
     * Show error notification
     */
    error(message) {
        this.showNotification(message, 'error');
    }
}

/* ===== KONAMI CODE ===== */
/**
 * KonamiCode - Handles the Konami Code easter egg
 */
class KonamiCode {
    constructor(terminal) {
        this.terminal = terminal;
        this.konamiCode = [];
        this.konamiSequence = [38, 38, 40, 40, 37, 39, 37, 39, 66, 65]; // ↑↑↓↓←→←→BA
        this.isActive = false;
        this.init();
    }

    /**
     * Initialize Konami Code detection
     */
    init() {
        document.addEventListener('keydown', (e) => {
            this.handleKeyPress(e);
        });
    }

    /**
     * Handle key press events
     */
    handleKeyPress(e) {
        this.konamiCode.push(e.keyCode);

        if (this.konamiCode.length > this.konamiSequence.length) {
            this.konamiCode.shift();
        }

        if (this.checkKonamiCode()) {
            this.activateEasterEgg();
        }
    }

    /**
     * Check if Konami Code sequence is complete
     */
    checkKonamiCode() {
        return this.konamiCode.join(',') === this.konamiSequence.join(',');
    }

    /**
     * Activate the easter egg
     */
    activateEasterEgg() {
        if (this.isActive) return; // Prevent multiple activations

        this.isActive = true;
        this.terminal.notificationSystem.showNotification(
            '¡Konami Code activado! shellaquiles.org es más que código...',
            'success'
        );

        // Add rainbow effect
        this.addRainbowEffect();

        // Reset after 5 seconds
        setTimeout(() => {
            this.removeRainbowEffect();
            this.isActive = false;
        }, 5000);
    }

    /**
     * Add rainbow effect to the page
     */
    addRainbowEffect() {
        document.body.style.animation = 'rainbow 2s infinite';
    }

    /**
     * Remove rainbow effect from the page
     */
    removeRainbowEffect() {
        document.body.style.animation = '';
    }

    /**
     * Reset Konami Code sequence
     */
    reset() {
        this.konamiCode = [];
        this.isActive = false;
    }

    /**
     * Get current Konami Code progress
     */
    getProgress() {
        return this.konamiCode.length;
    }

    /**
     * Check if Konami Code is partially complete
     */
    isPartiallyComplete() {
        const partialSequence = this.konamiSequence.slice(0, this.konamiCode.length);
        return this.konamiCode.join(',') === partialSequence.join(',');
    }
}

/* ===== EVENT MANAGER ===== */
/**
 * EventManager - Handles all event listeners and user interactions
 */
class EventManager {
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

/* ===== TERMINAL MAIN CLASS ===== */
/**
 * Terminal - Main class that orchestrates all terminal functionality
 */
import { AnimationManager } from './AnimationManager.js';
import { EventManager } from './EventManager.js';
import { KonamiCode } from './KonamiCode.js';
import { NotificationSystem } from './NotificationSystem.js';

class Terminal {
    constructor() {
        this.currentCommand = 0;
        this.commands = [
            'cat manifiesto.txt',
            'ls nodos/',
            'ls proyectos/',
            './participar.sh',
            './ejecutar.sh',
            'exit'
        ];

        // Initialize modules
        this.animationManager = new AnimationManager();
        this.notificationSystem = new NotificationSystem();
        this.eventManager = new EventManager(this);
        this.konamiCode = new KonamiCode(this);

        this.init();
    }

    /**
     * Initialize the terminal
     */
    init() {
        this.eventManager.setupEventListeners();
        this.animationManager.startTerminalAnimation();
        this.animationManager.setupScrollEffects();
        this.animationManager.setupTerminalCursor();
    }

    /**
     * Simulate terminal command execution
     */
    simulateCommand() {
        if (this.currentCommand < this.commands.length) {
            const command = this.commands[this.currentCommand];
            this.executeCommand(command);
            this.currentCommand++;
        }
    }

    /**
     * Execute a terminal command
     */
    executeCommand(command) {
        console.log(`Executing: ${command}`);
        this.notificationSystem.showNotification(`Comando ejecutado: ${command}`, 'success');
    }

    /**
     * Get current command index
     */
    getCurrentCommandIndex() {
        return this.currentCommand;
    }

    /**
     * Get total commands count
     */
    getTotalCommands() {
        return this.commands.length;
    }

    /**
     * Reset command execution
     */
    resetCommands() {
        this.currentCommand = 0;
    }

    /**
     * Add a new command
     */
    addCommand(command) {
        this.commands.push(command);
    }

    /**
     * Remove a command by index
     */
    removeCommand(index) {
        if (index >= 0 && index < this.commands.length) {
            this.commands.splice(index, 1);
        }
    }

    /**
     * Get all commands
     */
    getCommands() {
        return [...this.commands];
    }

    /**
     * Cleanup and destroy the terminal
     */
    destroy() {
        this.animationManager.destroy();
        this.notificationSystem.clearAll();
        this.konamiCode.reset();

        // Clear any remaining event listeners
        // Note: In a production app, you'd want to store references to event listeners
        // and remove them properly
    }
}

/* ===== ANIMATION UTILS ===== */
/**
 * AnimationUtils - Utility functions for animations and effects
 */

/**
 * Add CSS animation styles to document head
 */
function addCSSAnimations() {
    const style = document.createElement('style');
    style.textContent = `
        @keyframes rainbow {
            0% { filter: hue-rotate(0deg); }
            100% { filter: hue-rotate(360deg); }
        }

        @keyframes slideIn {
            from {
                opacity: 0;
                transform: translateY(30px);
            }
            to {
                opacity: 1;
                transform: translateY(0);
            }
        }

        @keyframes fadeIn {
            from {
                opacity: 0;
            }
            to {
                opacity: 1;
            }
        }

        @keyframes slideInLeft {
            from {
                opacity: 0;
                transform: translateX(-30px);
            }
            to {
                opacity: 1;
                transform: translateX(0);
            }
        }

        .revealed {
            animation: slideIn 0.6s ease-out forwards;
        }

        .nodo, .proyecto, .section {
            opacity: 0;
            transform: translateY(30px);
            transition: all 0.6s ease;
        }

        .prompt {
            opacity: 0;
            transform: translateX(-30px);
            transition: all 0.6s ease;
        }

        .output {
            opacity: 0;
            transform: translateY(20px);
            transition: all 0.6s ease;
        }

        .fade-in {
            animation: fadeIn 0.5s ease-in forwards;
        }

        .slide-in-left {
            animation: slideInLeft 0.5s ease-out forwards;
        }
    `;
    document.head.appendChild(style);
}

/**
 * Animate element with CSS class
 */
function animateElement(element, animationClass, duration = 500) {
    if (!element) return;

    element.classList.add(animationClass);

    setTimeout(() => {
        element.classList.remove(animationClass);
    }, duration);
}

/**
 * Fade in element
 */
function fadeIn(element, duration = 500) {
    if (!element) return;

    element.style.opacity = '0';
    element.style.transition = `opacity ${duration}ms ease`;

    // Trigger reflow
    element.offsetHeight;

    element.style.opacity = '1';
}

/**
 * Fade out element
 */
function fadeOut(element, duration = 500) {
    if (!element) return;

    element.style.transition = `opacity ${duration}ms ease`;
    element.style.opacity = '0';

    setTimeout(() => {
        if (element.parentNode) {
            element.parentNode.removeChild(element);
        }
    }, duration);
}

/**
 * Slide element in from left
 */
function slideInLeft(element, duration = 500) {
    if (!element) return;

    element.style.transform = 'translateX(-100%)';
    element.style.transition = `transform ${duration}ms ease`;

    // Trigger reflow
    element.offsetHeight;

    element.style.transform = 'translateX(0)';
}

/**
 * Slide element out to right
 */
function slideOutRight(element, duration = 500) {
    if (!element) return;

    element.style.transition = `transform ${duration}ms ease`;
    element.style.transform = 'translateX(100%)';

    setTimeout(() => {
        if (element.parentNode) {
            element.parentNode.removeChild(element);
        }
    }, duration);
}

/**
 * Scale element with bounce effect
 */
function scaleWithBounce(element, scale = 1.1, duration = 300) {
    if (!element) return;

    const originalTransform = element.style.transform;

    element.style.transition = `transform ${duration}ms cubic-bezier(0.68, -0.55, 0.265, 1.55)`;
    element.style.transform = `scale(${scale})`;

    setTimeout(() => {
        element.style.transform = originalTransform;
        element.style.transition = '';
    }, duration);
}

/**
 * Add glow effect to element
 */
function addGlowEffect(element, color = 'rgba(0, 255, 0, 0.6)', intensity = 20) {
    if (!element) return;

    element.style.boxShadow = `0 0 ${intensity}px ${color}`;
    element.style.transform = 'scale(1.05)';
}

/**
 * Remove glow effect from element
 */
function removeGlowEffect(element) {
    if (!element) return;

    element.style.boxShadow = '';
    element.style.transform = '';
}

/**
 * Create typing effect on element
 */
function typeText(element, text, speed = 50) {
    if (!element || !text) return Promise.resolve();

    return new Promise((resolve) => {
        element.textContent = '';
        let index = 0;

        function type() {
            if (index < text.length) {
                element.textContent += text.charAt(index);
                index++;
                setTimeout(type, speed);
            } else {
                resolve();
            }
        }

        type();
    });
}

/**
 * Debounce function calls
 */
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

/**
 * Throttle function calls
 */
function throttle(func, limit) {
    let inThrottle;
    return function() {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}

/* ===== INITIALIZATION ===== */

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    // Add CSS animations
    addCSSAnimations();
    
    // Initialize terminal
    const terminal = new Terminal();
    
    // Setup console welcome message
    setupConsoleWelcome();
    
    // Expose terminal to global scope for debugging
    window.shellaquilesTerminal = terminal;
});

function setupConsoleWelcome() {
    console.log(`
    shellaquiles.org Terminal v1.0.0
    
    Comandos disponibles:
    - help: Muestra esta ayuda
    - about: Información sobre shellaquiles.org
    - contact: Información de contacto
    - clear: Limpia la consola
    
    ¡Bienvenido a la Comunidad de Comunidades!
    `);
    
    // Add some fun console commands
    setupConsoleCommands();
}

function setupConsoleCommands() {
    // Override console.clear to show a fun message
    const originalClear = console.clear;
    console.clear = function() {
        console.log('%c¡Terminal limpiada! 🚀', 'color: #00ff00; font-size: 16px; font-weight: bold;');
        originalClear.apply(console);
    };
    
    // Add custom console methods
    console.shellaquiles = function() {
        console.log(`
        %c
        ╔══════════════════════════════════════════════════════════════╗
        ║                    SHELLAQUILES.ORG                          ║
        ║                                                              ║
        ║  Comunidad de Comunidades Tech en México                    ║
        ║                                                              ║
        ║  🚀 Ejecutando ideas colectivas                            ║
        ║  🌟 Mezclando tecnología, cultura libre y creatividad      ║
        ║  🤝 Transformando el ecosistema tech del país              ║
        ║                                                              ║
        ╚══════════════════════════════════════════════════════════════╝
        `, 'color: #00ff00; font-family: monospace; font-size: 12px;');
    };
    
    console.help = function() {
        console.log(`
        %cComandos disponibles:
        
        console.shellaquiles() - Información sobre el proyecto
        console.help() - Muestra esta ayuda
        console.clear() - Limpia la consola
        
        Terminal API:
        window.shellaquilesTerminal.getCommands() - Lista de comandos
        window.shellaquilesTerminal.simulateCommand() - Ejecutar comando
        window.shellaquilesTerminal.resetCommands() - Reiniciar comandos
        `, 'color: #00ff00; font-family: monospace;');
    };
    
    // Show help on first load
    setTimeout(() => {
        console.help();
    }, 1000);
}

// Cleanup function for page unload
window.addEventListener('beforeunload', () => {
    if (window.shellaquilesTerminal) {
        window.shellaquilesTerminal.destroy();
    }
});
