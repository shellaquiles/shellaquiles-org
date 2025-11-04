# CSS - Estilos Modulares

Sistema CSS modular organizado por componentes.

## Estructura

```
css/
├── main.css           # Punto de entrada principal
├── modules/           # Componentes CSS
│   ├── _terminal.css
│   ├── _logo.css
│   ├── _components.css
│   ├── _animations.css
│   └── _responsive.css
└── utils/             # Utilidades CSS
    ├── _variables.css
    └── _base.css
```

## Documentación Completa

Para documentación detallada sobre la arquitectura CSS, ver:
**[docs/reference/CSS-ARCHITECTURE.md](../../docs/reference/CSS-ARCHITECTURE.md)**

## Build

```bash
# Desarrollo
npm run build:css:dev

# Producción
npm run build:css:prod
```
