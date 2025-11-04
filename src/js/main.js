/**
 * Main entry point for Shellaquiles Terminal
 * Initializes the terminal and sets up console functionality
 */

import { Terminal } from './modules/Terminal.js';
import { BlogManager } from './modules/BlogManager.js';
import { addCSSAnimations } from './utils/AnimationUtils.js';

// Global terminal instance
let terminal;
let blogManager;

/**
 * Initialize the terminal when DOM is loaded
 */
document.addEventListener('DOMContentLoaded', () => {
    // Add CSS animations
    addCSSAnimations();

    // Initialize terminal
    terminal = new Terminal();

    // Initialize blog manager
    blogManager = new BlogManager();

    // Setup console welcome message
    setupConsoleWelcome();

    // Setup navigation links after a short delay to ensure DOM is ready
    setTimeout(() => {
        blogManager.setupNavigationLinks();
    }, 100);

    // Expose to global scope for debugging
    window.shellaquilesTerminal = terminal;
    window.shellaquilesBlog = blogManager;
});

/**
 * Setup console welcome message and overrides
 */
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

    // Override console.log for fun
    const originalLog = console.log;
    console.log = function(...args) {
        if (args[0] && typeof args[0] === 'string' && args[0].includes('shellaquiles')) {
            originalLog.apply(console, ['%c' + args[0], 'color: #00ff00; font-weight: bold;']);
        } else {
            originalLog.apply(console, args);
        }
    };

    // Add some fun console commands
    setupConsoleCommands();
}

/**
 * Setup fun console commands
 */
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

/**
 * Cleanup function for page unload
 */
window.addEventListener('beforeunload', () => {
    if (terminal) {
        terminal.destroy();
    }
});

/**
 * Export terminal for external use
 */
export { terminal };
