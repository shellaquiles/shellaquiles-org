import { AnimationManager } from './AnimationManager.js';
import { EventManager } from './EventManager.js';
import { KonamiCode } from './KonamiCode.js';
import { NotificationSystem } from './NotificationSystem.js';
import { parseMarkdown } from '../utils/MarkdownUtils.js';

export class Terminal {
    constructor() {
        this.currentCommand = 0;
        this.commands = [
            'cat manifiesto.txt',
            'ls proyectos/',
            'ls blog/',
            'cat filosofia.txt',
            'ls organizacion/',
            'ls aliados/',
            'finger pixelead0',
            'cat valores.txt',
            './participar.sh',
            'ls /ofrendas',
            'exit'
        ];
        this.contentCache = {};

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
    async init() {
        this.eventManager.setupEventListeners();
        this.animationManager.startTerminalAnimation();
        this.animationManager.setupScrollEffects();
        this.animationManager.setupTerminalCursor();
        await this.preloadContent();
        this.injectContentToDOM();
    }

    /**
     * Preload command content from external files
     */
    async preloadContent() {
        const files = {
            'manifiesto.txt': 'manifiesto.txt',
            'proyectos/': 'proyectos.txt',
            'blog/': 'blog.txt',
            'filosofia.txt': 'filosofia.txt',
            'organizacion/': 'organizacion.txt',
            'aliados/': 'aliados.txt',
            'pixelead0': 'pixelead0.txt',
            'valores.txt': 'valores.txt',
            'participar.sh': 'participar.txt',
            '/ofrendas': 'ofrendas.txt',
            'exit': 'exit.txt'
        };

        for (const [key, filename] of Object.entries(files)) {
            try {
                const response = await fetch(`/src/data/terminal/${filename}`);
                if (response.ok) {
                    this.contentCache[key] = await response.text();
                }
            } catch (e) {
                console.warn(`Could not load content for ${filename}`);
            }
        }
    }

    /**
     * Inject loaded content into the DOM sections
     */
    injectContentToDOM() {
        const mapping = {
            'manifiesto.txt': 'section-manifiesto',
            'proyectos/': 'section-proyectos',
            'blog/': 'section-blog',
            'filosofia.txt': 'section-filosofia',
            'organizacion/': 'section-organizacion',
            'aliados/': 'section-aliados',
            'pixelead0': 'section-pixelead0',
            'valores.txt': 'section-valores',
            'participar.sh': 'section-participar',
            '/ofrendas': 'section-ofrendas'
        };

        for (const [key, elementId] of Object.entries(mapping)) {
            const content = this.contentCache[key];
            const element = document.getElementById(elementId);
            if (content && element) {
                element.innerHTML = parseMarkdown(content);
            }
        }

        // Re-setup navigation links if necessary (since we might have added new links)
        if (window.shellaquilesBlog) {
            window.shellaquilesBlog.setupNavigationLinks();
        }
    }

    /**
     * Simulate terminal command execution
     * @param {string} [commandName] - Optional specific command to run
     */
    simulateCommand(commandName) {
        let command = '';
        
        if (commandName) {
            const found = this.commands.find(cmd => cmd.includes(commandName));
            if (found) {
                command = found;
                this.currentCommand = this.commands.indexOf(found) + 1;
            } else {
                return `❌ Error: Comando "${commandName}" no encontrado.`;
            }
        } else if (this.currentCommand < this.commands.length) {
            command = this.commands[this.currentCommand];
            this.currentCommand++;
        } else {
            return "🏁 Fin de la secuencia. Usa resetCommands() para reiniciar.";
        }

        return this.executeCommand(command);
    }

    /**
     * Execute a terminal command
     */
    executeCommand(command) {
        console.log(`%cExecuting: ${command}`, 'color: #00ff00; font-style: italic;');
        this.notificationSystem.showNotification(`Comando ejecutado: ${command}`, 'success');
        
        // Find content in cache
        const key = Object.keys(this.contentCache).find(k => command.includes(k));
        const content = this.contentCache[key] || `Ejecutado con éxito.`;
        
        console.log(`%c${content}`, 'color: #aaa;');
        
        return content;
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
        return "🔄 Secuencia reiniciada.";
    }

    /**
     * Add a new command
     */
    addCommand(command) {
        this.commands.push(command);
        return `➕ Comando "${command}" añadido.`;
    }

    /**
     * Remove a command by index
     */
    removeCommand(index) {
        if (index >= 0 && index < this.commands.length) {
            const removed = this.commands.splice(index, 1);
            return `🗑️ Comando "${removed}" eliminado.`;
        }
        return "❌ Índice fuera de rango.";
    }

    /**
     * Get all commands formatted as a table
     */
    getCommands() {
        const commandList = this.commands.map((cmd, index) => ({
            id: index,
            comando: cmd,
            estado: index < this.currentCommand ? '✓ ejecutado' : (index === this.currentCommand ? '→ siguiente' : ' pendiente')
        }));
        console.log('%c📋 Lista de comandos:', 'color: #00ff00; font-weight: bold;');
        console.table(commandList);
        return commandList.map(c => `${c.id}: ${c.comando}`).join('\n');
    }

    /**
     * Get current status of the terminal simulation
     */
    status() {
        const progress = Math.round((this.currentCommand / this.commands.length) * 100);
        const bar = '#'.repeat(Math.floor(progress/10)) + ' '.repeat(10-Math.floor(progress/10));
        
        const output = `📊 Progreso: [${bar}] ${progress}% (${this.currentCommand}/${this.commands.length})`;
        console.log(`%c${output}`, 'color: #00ff00; font-weight: bold;');
        
        return output;
    }

    /**
     * Alias for simulateCommand
     */
    next(cmd) {
        return this.simulateCommand(cmd);
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
