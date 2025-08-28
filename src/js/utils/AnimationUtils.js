/**
 * AnimationUtils - Utility functions for animations and effects
 */

/**
 * Add CSS animation styles to document head
 */
export function addCSSAnimations() {
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
export function animateElement(element, animationClass, duration = 500) {
    if (!element) return;

    element.classList.add(animationClass);

    setTimeout(() => {
        element.classList.remove(animationClass);
    }, duration);
}

/**
 * Fade in element
 */
export function fadeIn(element, duration = 500) {
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
export function fadeOut(element, duration = 500) {
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
export function slideInLeft(element, duration = 500) {
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
export function slideOutRight(element, duration = 500) {
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
export function scaleWithBounce(element, scale = 1.1, duration = 300) {
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
export function addGlowEffect(element, color = 'rgba(0, 255, 0, 0.6)', intensity = 20) {
    if (!element) return;

    element.style.boxShadow = `0 0 ${intensity}px ${color}`;
    element.style.transform = 'scale(1.05)';
}

/**
 * Remove glow effect from element
 */
export function removeGlowEffect(element) {
    if (!element) return;

    element.style.boxShadow = '';
    element.style.transform = '';
}

/**
 * Create typing effect on element
 */
export function typeText(element, text, speed = 50) {
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
export function debounce(func, wait) {
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
export function throttle(func, limit) {
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
