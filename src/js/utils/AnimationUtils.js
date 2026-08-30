/**
 * AnimationUtils - Utility functions for animations and effects
 */

/**
 * Add CSS animation styles to document head
 */
export function addCSSAnimations() {
    const style = document.createElement('style');
    style.textContent = `
        @keyframes fadeIn {
            from {
                opacity: 0;
                transform: translateY(8px);
            }
            to {
                opacity: 1;
                transform: translateY(0);
            }
        }

        .editorial-card {
            animation: fadeIn 0.4s ease-out forwards;
        }

        .fade-in {
            animation: fadeIn 0.4s ease-in forwards;
        }
    `;
    document.head.appendChild(style);
}

/**
 * Animate element with CSS class
 */
export function animateElement(element, animationClass, duration = 400) {
    if (!element) return;
    element.classList.add(animationClass);
    setTimeout(() => {
        element.classList.remove(animationClass);
    }, duration);
}

/**
 * Fade in element
 */
export function fadeIn(element, duration = 400) {
    if (!element) return;
    element.style.opacity = '0';
    element.style.transition = `opacity ${duration}ms ease`;
    element.offsetHeight;
    element.style.opacity = '1';
}

/**
 * Fade out element
 */
export function fadeOut(element, duration = 400) {
    if (!element) return;
    element.style.transition = `opacity ${duration}ms ease`;
    element.style.opacity = '0';
    setTimeout(() => {
        if (element.parentNode) {
            element.parentNode.removeChild(element);
        }
    }, duration);
}
