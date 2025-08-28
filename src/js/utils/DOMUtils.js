/**
 * DOMUtils - Utility functions for DOM manipulation
 */

/**
 * Smooth scroll to element
 */
export function smoothScrollTo(element, options = {}) {
    const defaultOptions = {
        behavior: 'smooth',
        block: 'start',
        inline: 'nearest'
    };

    element.scrollIntoView({ ...defaultOptions, ...options });
}

/**
 * Smooth scroll to element by selector
 */
export function smoothScrollToSelector(selector, options = {}) {
    const element = document.querySelector(selector);
    if (element) {
        smoothScrollTo(element, options);
    }
}

/**
 * Add CSS class to element
 */
export function addClass(element, className) {
    if (element && element.classList) {
        element.classList.add(className);
    }
}

/**
 * Remove CSS class from element
 */
export function removeClass(element, className) {
    if (element && element.classList) {
        element.classList.remove(className);
    }
}

/**
 * Toggle CSS class on element
 */
export function toggleClass(element, className) {
    if (element && element.classList) {
        element.classList.toggle(className);
    }
}

/**
 * Check if element has CSS class
 */
export function hasClass(element, className) {
    return element && element.classList && element.classList.contains(className);
}

/**
 * Get element by selector with error handling
 */
export function getElement(selector) {
    const element = document.querySelector(selector);
    if (!element) {
        console.warn(`Element not found: ${selector}`);
    }
    return element;
}

/**
 * Get all elements by selector
 */
export function getAllElements(selector) {
    return Array.from(document.querySelectorAll(selector));
}

/**
 * Create element with attributes
 */
export function createElement(tag, attributes = {}, textContent = '') {
    const element = document.createElement(tag);

    // Set attributes
    Object.entries(attributes).forEach(([key, value]) => {
        element.setAttribute(key, value);
    });

    // Set text content
    if (textContent) {
        element.textContent = textContent;
    }

    return element;
}

/**
 * Remove element safely
 */
export function removeElement(element) {
    if (element && element.parentNode) {
        element.parentNode.removeChild(element);
    }
}

/**
 * Wait for DOM element to be available
 */
export function waitForElement(selector, timeout = 5000) {
    return new Promise((resolve, reject) => {
        const element = document.querySelector(selector);
        if (element) {
            resolve(element);
            return;
        }

        const observer = new MutationObserver((mutations, obs) => {
            const element = document.querySelector(selector);
            if (element) {
                obs.disconnect();
                resolve(element);
            }
        });

        observer.observe(document.body, {
            childList: true,
            subtree: true
        });

        // Timeout fallback
        setTimeout(() => {
            observer.disconnect();
            reject(new Error(`Element ${selector} not found within ${timeout}ms`));
        }, timeout);
    });
}
