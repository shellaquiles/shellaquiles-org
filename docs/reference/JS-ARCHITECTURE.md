# JavaScript Architecture - Shellaquiles Terminal Theme

## Arquitectura Modular JavaScript

Sistema JavaScript modular y escalable usando **Webpack** para bundling automático y **Babel** para transpilación ES6+.

## Estructura de Módulos

```
src/js/
├── main.js                  # Punto de entrada principal
├── modules/                 # Funcionalidades principales
│   ├── Terminal.js         # Clase principal del terminal
│   ├── AnimationManager.js # Gestor de animaciones
│   ├── EventManager.js     # Gestor de eventos
│   ├── NotificationSystem.js # Sistema de notificaciones
│   └── KonamiCode.js       # Easter egg del Konami Code
└── utils/                   # Utilidades y helpers
    ├── DOMUtils.js         # Utilidades para manipulación del DOM
    └── AnimationUtils.js   # Utilidades para animaciones
```

## Sistema de Build

Ver [docs/guides/BUILD-SYSTEM.md](../guides/BUILD-SYSTEM.md) para detalles completos del sistema de build.

### **Comandos Rápidos**
```bash
# Desarrollo
npm run build:js:dev

# Producción
npm run build:js:prod
```

## Módulos Principales

### **`main.js` - Punto de Entrada**
```javascript
import { Terminal } from './modules/Terminal.js';

// Inicializar terminal cuando DOM esté listo
document.addEventListener('DOMContentLoaded', () => {
    const terminal = new Terminal();
    terminal.init();
});
```

### **`Terminal.js` - Clase Principal**
```javascript
export class Terminal {
    constructor() {
        this.animationManager = new AnimationManager();
        this.eventManager = new EventManager();
        this.notificationSystem = new NotificationSystem();
        this.konamiCode = new KonamiCode();
    }

    init() {
        this.animationManager.init();
        this.eventManager.init();
        this.notificationSystem.init();
        this.konamiCode.init();
    }
}
```

### **`AnimationManager.js` - Gestor de Animaciones**
```javascript
export class AnimationManager {
    init() {
        this.setupScrollAnimations();
        this.setupHoverEffects();
        this.setupTerminalEffects();
    }

    setupScrollAnimations() {
        // Animaciones basadas en scroll
    }
}
```

### **`EventManager.js` - Gestor de Eventos**
```javascript
export class EventManager {
    init() {
        this.setupButtonEvents();
        this.setupNodoEvents();
        this.setupKeyboardEvents();
    }
}
```

## Características ES6+

### **Import/Export de Módulos**
```javascript
// Exportar clase
export class Terminal {
    // ...
}

// Importar módulo
import { Terminal } from './modules/Terminal.js';
```

### **Clases ES6**
```javascript
export class AnimationManager {
    constructor() {
        this.animations = new Map();
    }

    addAnimation(name, config) {
        this.animations.set(name, config);
    }
}
```

### **Arrow Functions**
```javascript
this.setupButtonEvents = () => {
    document.querySelectorAll('.btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            this.handleButtonClick(e);
        });
    });
};
```

### **Template Literals**
```javascript
showNotification(message, type = 'info') {
    const notification = `
        <div class="notification notification-${type}">
            <span>${message}</span>
            <button class="close-btn">×</button>
        </div>
    `;
    this.container.insertAdjacentHTML('beforeend', notification);
}
```

## Sistema de Animaciones

### **Animaciones CSS + JavaScript**
```javascript
class AnimationManager {
    setupScrollAnimations() {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('revealed');
                }
            });
        });

        document.querySelectorAll('.nodo, .proyecto').forEach(el => {
            observer.observe(el);
        });
    }
}
```

### **Efectos Hover**
```javascript
setupHoverEffects() {
    document.querySelectorAll('.nodo').forEach(nodo => {
        nodo.addEventListener('mouseenter', () => {
            this.addHoverEffect(nodo);
        });
    });
}
```

## Easter Eggs y Funcionalidades

### **Konami Code**
```javascript
export class KonamiCode {
    constructor() {
        this.sequence = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'KeyB', 'KeyA'];
        this.currentIndex = 0;
    }

    init() {
        document.addEventListener('keydown', (e) => {
            this.handleKeyPress(e);
        });
    }

    handleKeyPress(e) {
        if (e.code === this.sequence[this.currentIndex]) {
            this.currentIndex++;
            if (this.currentIndex === this.sequence.length) {
                this.activateEasterEgg();
                this.currentIndex = 0;
            }
        } else {
            this.currentIndex = 0;
        }
    }
}
```

## Responsive y Accesibilidad

### **Eventos Touch**
```javascript
setupTouchEvents() {
    if ('ontouchstart' in window) {
        document.querySelectorAll('.nodo').forEach(nodo => {
            nodo.addEventListener('touchstart', (e) => {
                this.handleTouchStart(e);
            });
        });
    }
}
```

### **Navegación por Teclado**
```javascript
setupKeyboardEvents() {
    document.addEventListener('keydown', (e) => {
        switch(e.key) {
            case 'Tab':
                this.handleTabNavigation(e);
                break;
            case 'Enter':
                this.handleEnterKey(e);
                break;
        }
    });
}
```

## Comandos de Desarrollo

Ver [docs/guides/BUILD-SYSTEM.md](../guides/BUILD-SYSTEM.md) para todos los comandos disponibles.

**Comandos JavaScript específicos:**
```bash
npm run build:js:dev    # Desarrollo (con watch)
npm run build:js:prod   # Producción (minificado)
```

## Output del Build

### **Desarrollo**
- `dist/js/script.js` - JavaScript legible y comentado
- Tamaño: ~99KB
- Líneas: ~146
- Source maps habilitados

### **Producción**
- `dist/js/script.min.js` - JavaScript minificado
- Tamaño: ~45KB (optimizado)
- Sin comentarios, listo para producción

## Debugging y Desarrollo

### **Console Logs**
```javascript
// Agregar logs para debugging
console.log('Terminal initialized:', this);
console.log('Animation config:', animationConfig);
```

### **Source Maps**
Webpack genera source maps en desarrollo para debugging fácil:
- Mapea código compilado al código fuente original
- Permite debugging en DevTools del navegador

### **Hot Reload (Desarrollo)**
```bash
npm run build:js:dev
# Webpack watch mode - recompila automáticamente
```

## Mejores Prácticas

1. **Usar ES6 Modules** para organización del código
2. **Mantener clases pequeñas** y con responsabilidad única
3. **Usar variables CSS** para valores de animación
4. **Implementar error handling** en métodos críticos
5. **Documentar métodos públicos** con JSDoc

## Próximos Pasos

- [ ] Implementar TypeScript para mejor tipado
- [ ] Agregar tests unitarios con Jest
- [ ] Implementar lazy loading para módulos
- [ ] Agregar PWA capabilities
- [ ] Implementar service worker para offline
