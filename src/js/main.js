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
    %c🐚 shellaquiles.org Terminal v1.1.0%c

    ¡Bienvenido a la Comunidad de Comunidades!

    Comandos disponibles (puedes escribirlos directamente):
    - %chelp()%c: Muestra esta ayuda
    - %cabout()%c: Información sobre shellaquiles.org
    - %ccontact()%c: Información de contacto
    - %cclear()%c: Limpia la consola

    Ejecuta %cabout()%c para comenzar.
    `,
        'color: #00ff00; font-weight: bold; font-size: 14px;', 'color: inherit;',
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
        ║                    SHELLAQUILES.ORG                          ║
        ║                                                              ║
        ║  Comunidad de Comunidades Tech en México                    ║
        ║  Dictador Benévolo: @pixelead0                              ║
        ║                                                              ║
        ║  🚀 Proyectos Activos:                                      ║
        ║  • Pyquiles al Pastor: Python con sabor mexicano            ║
        ║  • Cron-Quiles: Agregador de eventos de la comunidad        ║
        ║  • Bits de Conocimiento: Sesiones de aprendizaje            ║
        ║                                                              ║
        ║  🤝 Nuestra Filosofía:                                      ║
        ║  Menos burocracia, más ejecución. Software Libre y          ║
        ║  crecimiento técnico en comunidad.                          ║
        ╚══════════════════════════════════════════════════════════════╝
        `, 'color: #00ff00; font-family: monospace; font-size: 12px;');
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

    const registerCommand = (key, cmdFn) => {
        Object.defineProperty(window, key, {
            get: function () {
                const result = cmdFn();
                const f = function (arg) { return cmdFn(arg); };
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
