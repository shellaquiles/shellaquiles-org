// Shellaquiles Terminal Script
class ShellaquilesTerminal {
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
        this.typingSpeed = 50;
        this.init();
    }

    init() {
        this.setupEventListeners();
        this.startTerminalAnimation();
        this.setupScrollEffects();
        this.setupInteractiveElements();
    }

    setupEventListeners() {
        // Smooth scrolling for anchor links
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                e.preventDefault();
                const target = document.querySelector(this.getAttribute('href'));
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            });
        });

        // Terminal input simulation
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Enter') {
                this.simulateCommand();
            }
        });

        // Add click to copy functionality for email
        const emailElement = document.querySelector('.email');
        if (emailElement) {
            emailElement.addEventListener('click', () => {
                this.copyToClipboard(emailElement.textContent);
                this.showNotification('Email copiado al portapapeles!', 'success');
            });
        }
    }

    startTerminalAnimation() {
        // Animate commands appearing one by one
        const prompts = document.querySelectorAll('.prompt');
        const outputs = document.querySelectorAll('.output');
        const sections = document.querySelectorAll('.section, .nodos-grid, .cta');

        // Stagger the appearance of elements
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

        // Animate sections
        sections.forEach((section, index) => {
            setTimeout(() => {
                section.style.opacity = '1';
                section.style.transform = 'translateY(0)';
            }, (prompts.length + index) * 800);
        });

        // Add typing effect to commands
        this.addTypingEffect();
    }

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

    typeText(element, text, index) {
        if (index < text.length) {
            element.textContent += text.charAt(index);
            setTimeout(() => {
                this.typeText(element, text, index + 1);
            }, this.typingSpeed);
        }
    }

    setupScrollEffects() {
        // Parallax effect for background
        window.addEventListener('scroll', () => {
            const scrolled = window.pageYOffset;
            const parallax = document.querySelector('.terminal::before');
            if (parallax) {
                const speed = scrolled * 0.5;
                parallax.style.transform = `translateY(${speed}px)`;
            }
        });

        // Reveal elements on scroll
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

    setupInteractiveElements() {
        // Nodos hover effects
        document.querySelectorAll('.nodo').forEach(nodo => {
            nodo.addEventListener('mouseenter', () => {
                this.addGlowEffect(nodo);
            });

            nodo.addEventListener('mouseleave', () => {
                this.removeGlowEffect(nodo);
            });
        });

        // Button interactions
        document.querySelectorAll('.btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.preventDefault();
                this.handleButtonClick(btn);
            });
        });

        // Add terminal cursor effect
        this.setupTerminalCursor();
    }

    addGlowEffect(element) {
        element.style.boxShadow = '0 0 20px rgba(0, 255, 0, 0.6)';
        element.style.transform = 'scale(1.05)';
    }

    removeGlowEffect(element) {
        element.style.boxShadow = '';
        element.style.transform = '';
    }

    handleButtonClick(btn) {
        const action = btn.textContent.toLowerCase();
        const actions = {
            '💡 proponer taller': '¡Excelente idea! Te contactaremos para coordinar el taller.',
            '🏢 abrir espacio': '¡Gracias por abrir tu espacio! Será un nodo más en la comunidad.',
            '🤝 unirme como voluntario': '¡Bienvenido al equipo! Tu ayuda es invaluable.'
        };

        const message = actions[action] || '¡Gracias por tu interés! Te contactaremos pronto.';
        this.showNotification(message, 'info');

        // Add click effect
        btn.style.transform = 'scale(0.95)';
        setTimeout(() => {
            btn.style.transform = '';
        }, 150);
    }

    setupTerminalCursor() {
        // Create blinking cursor effect
        const cursors = document.querySelectorAll('.cursor');
        setInterval(() => {
            cursors.forEach(cursor => {
                cursor.style.opacity = cursor.style.opacity === '0' ? '1' : '0';
            });
        }, 500);
    }

    simulateCommand() {
        if (this.currentCommand < this.commands.length) {
            const command = this.commands[this.currentCommand];
            this.executeCommand(command);
            this.currentCommand++;
        }
    }

    executeCommand(command) {
        console.log(`Executing: ${command}`);
        // Add visual feedback for command execution
        this.showNotification(`Comando ejecutado: ${command}`, 'success');
    }

    showNotification(message, type = 'info') {
        // Create notification element
        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        notification.textContent = message;

        // Style the notification
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

        document.body.appendChild(notification);

        // Animate in
        setTimeout(() => {
            notification.style.transform = 'translateX(0)';
        }, 100);

        // Remove after 3 seconds
        setTimeout(() => {
            notification.style.transform = 'translateX(100%)';
            setTimeout(() => {
                document.body.removeChild(notification);
            }, 300);
        }, 3000);
    }

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

    // Easter egg: Konami code
    setupKonamiCode() {
        let konamiCode = [];
        const konamiSequence = [38, 38, 40, 40, 37, 39, 37, 39, 66, 65]; // ↑↑↓↓←→←→BA

        document.addEventListener('keydown', (e) => {
            konamiCode.push(e.keyCode);
            if (konamiCode.length > konamiSequence.length) {
                konamiCode.shift();
            }

            if (konamiCode.join(',') === konamiSequence.join(',')) {
                this.activateEasterEgg();
            }
        });
    }

    activateEasterEgg() {
        this.showNotification('¡Konami Code activado! shellaquiles.org es más que código...', 'success');

        // Add some fun effects
        document.body.style.animation = 'rainbow 2s infinite';

        setTimeout(() => {
            document.body.style.animation = '';
        }, 5000);
    }
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    const terminal = new ShellaquilesTerminal();

    // Add some CSS animations
    const style = document.createElement('style');
    style.textContent = `
        @keyframes rainbow {
            0% { filter: hue-rotate(0deg); }
            100% { filter: hue-rotate(360deg); }
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
    `;
    document.head.appendChild(style);
});

// Add some fun terminal commands
window.addEventListener('load', () => {
            console.log(`
    shellaquiles.org Terminal v1.0.0

    Comandos disponibles:
    - help: Muestra esta ayuda
    - about: Información sobre shellaquiles.org
    - contact: Información de contacto
    - clear: Limpia la consola

    ¡Bienvenido a la Comunidad de Comunidades!
    `);

    // Override console.log for fun
    const originalLog = console.log;
    console.log = function(...args) {
        if (args[0] && typeof args[0] === 'string' && args[0].includes('Shellaquiles')) {
            originalLog.apply(console, ['%c' + args[0], 'color: #00ff00; font-weight: bold;']);
        } else {
            originalLog.apply(console, args);
        }
    };
});
