# JavaScript - Módulos ES6+

Sistema JavaScript modular organizado por funcionalidad.

## Estructura

```
js/
├── main.js            # Punto de entrada principal
├── modules/           # Módulos principales
│   ├── Terminal.js
│   ├── BlogManager.js
│   ├── AnimationManager.js
│   ├── EventManager.js
│   ├── NotificationSystem.js
│   └── KonamiCode.js
└── utils/             # Utilidades
    ├── DOMUtils.js
    └── AnimationUtils.js
```

## Documentación Completa

Para documentación detallada sobre la arquitectura JavaScript, ver:
**[docs/reference/JS-ARCHITECTURE.md](../../docs/reference/JS-ARCHITECTURE.md)**

## Build

```bash
# Desarrollo
npm run build:js:dev

# Producción
npm run build:js:prod
```
