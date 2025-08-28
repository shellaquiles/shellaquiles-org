/**
 * Terminal - Main class that orchestrates all terminal functionality
 */
import { AnimationManager } from './AnimationManager.js';
import { EventManager } from './EventManager.js';
import { KonamiCode } from './KonamiCode.js';
import { NotificationSystem } from './NotificationSystem.js';

export class Terminal {
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
    init() {
        this.eventManager.setupEventListeners();
        this.animationManager.startTerminalAnimation();
        this.animationManager.setupScrollEffects();
        this.animationManager.setupTerminalCursor();
    }

    /**
     * Simulate terminal command execution
     */
    simulateCommand() {
        if (this.currentCommand < this.commands.length) {
            const command = this.commands[this.currentCommand];
            this.executeCommand(command);
            this.currentCommand++;
        }
    }

    /**
     * Execute a terminal command
     */
    executeCommand(command) {
        console.log(`Executing: ${command}`);
        this.notificationSystem.showNotification(`Comando ejecutado: ${command}`, 'success');
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
    }

    /**
     * Add a new command
     */
    addCommand(command) {
        this.commands.push(command);
    }

    /**
     * Remove a command by index
     */
    removeCommand(index) {
        if (index >= 0 && index < this.commands.length) {
            this.commands.splice(index, 1);
        }
    }

    /**
     * Get all commands
     */
    getCommands() {
        return [...this.commands];
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
