# CSS Architecture - Shellaquiles Terminal Theme

## Arquitectura Modular CSS

Sistema CSS modular y escalable usando **PostCSS** para bundling automático.

## Estructura de Módulos

```
src/css/
├── main.css                 # Punto de entrada principal
├── modules/                 # Componentes específicos
│   ├── _terminal.css       # Estilos del terminal principal
│   ├── _logo.css           # Estilos del logo HTML
│   ├── _components.css     # Componentes reutilizables
│   ├── _animations.css     # Animaciones y keyframes
│   └── _responsive.css     # Media queries y responsive
└── utils/                   # Utilidades y base
    ├── _variables.css      # Variables CSS centralizadas
    └── _base.css           # Reset y estilos base
```

## Sistema de Build

Ver [docs/guides/BUILD-SYSTEM.md](../guides/BUILD-SYSTEM.md) para detalles completos del sistema de build.

### **Comandos Rápidos**
```bash
# Desarrollo
npm run build:css:dev

# Producción
npm run build:css:prod
```

## Variables CSS (Design Tokens)

### **Colores del Terminal**
```css
:root {
    --terminal-green: #00ff00;
    --terminal-red: #ff0000;
    --terminal-white: #ffffff;
    --terminal-black: #0a0a0a;
    --terminal-dark: #1a1a1a;
}
```

### **Colores del Logo**
```css
:root {
    --logo-bg: #0F1217;
    --logo-arrows: #19F38E;
    --logo-shell: #22C55E;
    --logo-aquiles: #E5E7EB;
    --logo-tld: #F43F5E;
}
```

### **Espaciado y Tipografía**
```css
:root {
    --spacing-xs: 5px;
    --spacing-sm: 10px;
    --spacing-md: 15px;
    --spacing-lg: 20px;
    --spacing-xl: 30px;

    --font-family-mono: 'Courier New', 'Monaco', 'Menlo', monospace;
    --font-family-logo: "JetBrains Mono", "Fira Code", monospace;
}
```

## Cómo Funciona

### **1. Importación Modular**
```css
/* main.css */
@import "utils/variables.css";
@import "utils/base.css";
@import "modules/terminal.css";
@import "modules/logo.css";
@import "modules/components.css";
@import "modules/animations.css";
@import "modules/responsive.css";
```

### **2. PostCSS Procesa**
- Resuelve todos los `@import`
- Combina en un solo archivo
- Aplica plugins de optimización
- Genera `dist/css/styles.css`

### **3. Resultado Final**
- **Un solo archivo CSS** funcional
- **Sin duplicación** de código
- **Optimizado** para producción
- **Compatible** con todos los navegadores

## Sistema Responsive

### **Breakpoints**
```css
/* Mobile First */
@media (min-width: 480px) { /* Small devices */ }
@media (min-width: 768px) { /* Medium devices */ }
@media (min-width: 1024px) { /* Large devices */ }
@media (min-width: 1200px) { /* Extra large devices */ }
```

### **Grid Adaptativo**
```css
.nodos-grid {
    display: grid;
    grid-template-columns: 1fr; /* Mobile: 1 columna */
}

@media (min-width: 768px) {
    .nodos-grid {
        grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    }
}
```

## Animaciones y Efectos

### **Transiciones**
```css
.nodo {
    transition: all var(--transition-normal);
}

:root {
    --transition-normal: 0.3s ease;
}
```

### **Keyframes**
```css
@keyframes fadeIn {
    from { opacity: 0; transform: translateY(20px); }
    to { opacity: 1; transform: translateY(0); }
}
```

## Comandos de Desarrollo

Ver [docs/guides/BUILD-SYSTEM.md](../guides/BUILD-SYSTEM.md) para todos los comandos disponibles.

**Comandos CSS específicos:**
```bash
npm run build:css:dev    # Desarrollo (con watch)
npm run build:css:prod   # Producción (minificado)
```

## Output del Build

### **Desarrollo**
- `dist/css/styles.css` - CSS legible y comentado
- Tamaño: ~16KB
- Líneas: ~872

### **Producción**
- `dist/css/styles.min.css` - CSS minificado
- Tamaño: ~12KB (optimizado)
- Sin comentarios, listo para producción

## Debugging y Desarrollo

### **Inspeccionar Variables**
```css
/* Agregar temporalmente para debug */
.debug {
    border: 2px solid var(--terminal-red);
    background: rgba(255, 0, 0, 0.1);
}
```

### **Logs del Build**
```bash
npm run build:css:dev
# PostCSS procesará y mostrará:
# ✓ src/css/main.css → dist/css/styles.css
```

## Mejores Prácticas

1. **Usar variables CSS** para valores reutilizables
2. **Mantener módulos pequeños** y enfocados
3. **Seguir convención de nombres** con guiones bajos
4. **Documentar variables** en `_variables.css`
5. **Usar PostCSS** para bundling automático
