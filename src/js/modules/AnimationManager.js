/**
 * AnimationManager - Handles all terminal animations and effects
 */
export class AnimationManager {
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
