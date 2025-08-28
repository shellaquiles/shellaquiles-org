/**
 * KonamiCode - Handles the Konami Code easter egg
 */
export class KonamiCode {
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
