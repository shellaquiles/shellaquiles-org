#!/bin/bash

# Script para combinar todos los módulos JavaScript en un solo archivo
# Esto resuelve el problema de ES6 Modules con archivos locales

echo "Combinando módulos JavaScript..."

# Crear el archivo combinado
cat > src/js/script-combined.js << 'EOF'
/**
 * Shellaquiles Terminal Script - JavaScript Combinado
 * Generado automáticamente desde módulos ES6
 */

EOF

# Agregar AnimationManager (sin export)
echo "/* ===== ANIMATION MANAGER ===== */" >> src/js/script-combined.js
sed 's/export class/class/g' src/js/modules/AnimationManager.js >> src/js/script-combined.js
echo "" >> src/js/script-combined.js

# Agregar NotificationSystem (sin export)
echo "/* ===== NOTIFICATION SYSTEM ===== */" >> src/js/script-combined.js
sed 's/export class/class/g' src/js/modules/NotificationSystem.js >> src/js/script-combined.js
echo "" >> src/js/script-combined.js

# Agregar KonamiCode (sin export)
echo "/* ===== KONAMI CODE ===== */" >> src/js/script-combined.js
sed 's/export class/class/g' src/js/modules/KonamiCode.js >> src/js/script-combined.js
echo "" >> src/js/script-combined.js

# Agregar EventManager (sin export)
echo "/* ===== EVENT MANAGER ===== */" >> src/js/script-combined.js
sed 's/export class/class/g' src/js/modules/EventManager.js >> src/js/script-combined.js
echo "" >> src/js/script-combined.js

# Agregar Terminal (sin export)
echo "/* ===== TERMINAL MAIN CLASS ===== */" >> src/js/script-combined.js
sed 's/export class/class/g' src/js/modules/Terminal.js >> src/js/script-combined.js
echo "" >> src/js/script-combined.js

# Agregar utilidades (sin export)
echo "/* ===== ANIMATION UTILS ===== */" >> src/js/script-combined.js
sed 's/export function/function/g' src/js/utils/AnimationUtils.js >> src/js/script-combined.js
echo "" >> src/js/script-combined.js

# Agregar inicialización
echo "/* ===== INITIALIZATION ===== */" >> src/js/script-combined.js
cat << 'INIT_EOF' >> src/js/script-combined.js

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    // Add CSS animations
    addCSSAnimations();

    // Initialize terminal
    const terminal = new Terminal();

    // Setup console welcome message
    setupConsoleWelcome();

    // Expose terminal to global scope for debugging
    window.shellaquilesTerminal = terminal;
});

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

    // Add some fun console commands
    setupConsoleCommands();
}

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

// Cleanup function for page unload
window.addEventListener('beforeunload', () => {
    if (window.shellaquilesTerminal) {
        window.shellaquilesTerminal.destroy();
    }
});
INIT_EOF

echo "JavaScript combinado creado en: src/js/script-combined.js"
echo "Archivo generado exitosamente!"
