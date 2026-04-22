/**
 * Main entry point for Shellaquiles Terminal
 * Initializes the terminal and sets up console functionality
 */

import { BlogManager } from './modules/BlogManager.js';
import { Terminal } from './modules/Terminal.js';
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
    %c{{ %cshell%caquiles%c.org %c}} %cTerminal v1.1.0%c

    ¡Bienvenido a la Comunidad de Comunidades!

    Comandos disponibles (puedes escribirlos directamente):
    - %chelp()%c: Muestra esta ayuda
    - %cabout()%c: Información sobre shellaquiles.org
    - %ccontact()%c: Información de contacto
    - %cclear()%c: Limpia la consola

    Ejecuta %cabout()%c para comenzar.
    `,
        'color: #9CA3AF; font-weight: bold;', 'color: #22C55E; font-weight: bold;', 'color: #E5E7EB; font-weight: bold;', 'color: #F43F5E; font-weight: bold;', 'color: #9CA3AF; font-weight: bold;', 'color: #888;', 'color: inherit;',
        'color: #00ff00; font-weight: bold;', 'color: inherit;',
        'color: #00ff00; font-weight: bold;', 'color: inherit;',
        'color: #00ff00; font-weight: bold;', 'color: inherit;',
        'color: #00ff00; font-weight: bold;', 'color: inherit;',
        'color: #00ff00; font-weight: bold;', 'color: inherit;'
    );

    // Setup global and console commands
    setupConsoleCommands();
}

/**
 * Setup fun console commands
 */
function setupConsoleCommands() {
    // Define the about function
    const about = function () {
        console.log(`
        %c
        ╔══════════════════════════════════════════════════════════════╗
        ║                                                              ║
        ║                    %c{{ %cshell%caquiles%c.org %c}}%c                    ║
        ║                                                              ║
        ║  Comunidad de Comunidades Tech en México                     ║
        ║  Guía Supremo: @pixelead0                                    ║
        ║                                                              ║
        ║  LA GRAN OBRA (Proyectos Activos):                           ║
        ║  - Pyquiles al Pastor: Cátedra de Sabiduría sobre Python     ║
        ║  - Cron-Quiles: Agregador Estratégico de Eventos             ║
        ║  - Bits de Conocimiento: Sesiones de Absorción Técnica       ║
        ║                                                              ║
        ║  FILOSOFÍA DE EJECUCIÓN:                                     ║
        ║  Menos burocracia, más ejecución de hierro.                  ║
        ║  Hacia la iluminación digital y el bien común.              ║
        ╚══════════════════════════════════════════════════════════════╝
        `, 
        'color: #00ff00; font-family: monospace; font-size: 12px;',
        'color: #9CA3AF; font-weight: bold;', 'color: #22C55E; font-weight: bold;', 'color: #E5E7EB; font-weight: bold;', 'color: #F43F5E; font-weight: bold;', 'color: #9CA3AF; font-weight: bold;', 'color: #00ff00; font-family: monospace;'
        );
        return "Información cargada correctamente.";
    };

    // Define the contact function
    const contact = function () {
        console.log(`
        %c📬 Contacto Shellaquiles:

        Email:    comunidad@shellaquiles.org
        Telegram: https://t.me/shellaquiles
        GitHub:   https://github.com/shellaquiles

        ¡Únete a la conversación!
        `, 'color: #00ff00; font-weight: bold;');
        return "Medios de contacto listados.";
    };

    // Define the help function
    const help = function () {
        console.log(`
        %cComandos disponibles:

        %cabout()%c      - Información sobre el proyecto
        %ccontact()%c    - Medios de contacto
        %cclear()%c      - Limpia la consola
        %chelp()%c        - Muestra esta ayuda
        %cshellaquiles()%c - El logo sagrado del Líder Supremo

        %cTerminal API (puedes usar alias cortos):%c
        %cls%c o %cshell.getCommands()%c     - Lista de comandos
        %cstatus%c o %cshell.status()%c      - Ver progreso
        %cnext%c o %cshell.next("cmd")%c     - Ejecutar siguiente o uno específico
        %cshell.resetCommands()%c           - Reiniciar secuencia
        `,
            'color: #00ff00; font-weight: bold;',
            'color: #00ff00;', 'color: inherit;', 'color: #00ff00;', 'color: inherit;',
            'color: #00ff00;', 'color: inherit;', 'color: #00ff00;', 'color: inherit;',
            'color: #00ff00;', 'color: inherit;', 'color: #00ff00;', 'color: inherit;',
            'color: #00ff00;', 'color: inherit;'
        );
        return "Ayuda desplegada.";
    };

    // Override console.clear to show a fun message
    const originalClear = console.clear;
    const clear = function () {
        originalClear.apply(console);
        console.log('%c¡Terminal limpiada! 🚀', 'color: #00ff00; font-size: 16px; font-weight: bold;');
        return "Consola reiniciada.";
    };

    // Add custom console methods
    console.shellaquiles = about;
    console.about = about;
    console.contact = contact;
    console.help = help;
    console.clear = clear;

    const logLogo = () => {
        console.log(`%c{{ %cshell%caquiles%c.org %c}}`,
            'color: #9CA3AF; font-weight: bold;',
            'color: #22C55E; font-weight: bold;',
            'color: #E5E7EB; font-weight: bold;',
            'color: #F43F5E; font-weight: bold;',
            'color: #9CA3AF; font-weight: bold;'
        );
    };

    const registerCommand = (key, cmdFn) => {
        Object.defineProperty(window, key, {
            get: function () {
                logLogo();
                const result = cmdFn();
                const f = function (arg) { 
                    logLogo();
                    return cmdFn(arg); 
                };
                f.toString = function () { return result; };
                return f;
            },
            configurable: true
        });
    };

    // Expose to window with getters for direct usage (typing 'about' instead of 'about()')
    const commands = {
        about: about,
        contact: contact,
        help: help,
        clear: clear,
        shellaquiles: about
    };

    Object.keys(commands).forEach(key => registerCommand(key, commands[key]));

    // Terminal API Short Aliases
    window.shell = terminal;

    // Add getters for terminal API too
    const terminalCommands = {
        ls: () => terminal.getCommands(),
        next: (cmd) => terminal.next(cmd),
        status: () => terminal.status()
    };

    Object.keys(terminalCommands).forEach(key => registerCommand(key, terminalCommands[key]));

    // Show help on first load with a slight delay
    setTimeout(() => {
        console.log('%cEscribe %chelp%c para ver lo que puedes hacer.', 'color: #888;', 'color: #00ff00;', 'color: #888;');
    }, 2000);
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
