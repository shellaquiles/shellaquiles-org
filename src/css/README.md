# CSS Modular Architecture

## 📁 **Estructura de Módulos CSS**

```
src/css/
├── modules/           # Módulos de estilos específicos
│   ├── _terminal.css      # Estilos base del terminal
│   ├── _logo.css          # Estilos del logo HTML
│   ├── _components.css    # Componentes reutilizables
│   ├── _animations.css    # Animaciones y keyframes
│   └── _responsive.css    # Media queries y responsive
├── utils/            # Utilidades CSS
│   ├── _variables.css     # Variables CSS (custom properties)
│   ├── _base.css          # Reset y estilos base
│   └── README.md          # Esta documentación
├── main.css          # Archivo principal que importa todo
└── README.md         # Esta documentación
```

## 🚀 **Módulos CSS**

### **Utils (Utilidades)**

#### **`_variables.css`**
- **Responsabilidad**: Definir todas las variables CSS (design tokens)
- **Contenido**: Colores, espaciados, tipografía, sombras, transiciones
- **Uso**: Referenciadas en todos los otros módulos

#### **`_base.css`**
- **Responsabilidad**: Reset CSS y estilos base de elementos HTML
- **Contenido**: Reset, tipografía base, enlaces, formularios, scrollbar
- **Uso**: Estilos fundamentales que se aplican a toda la página

### **Modules (Módulos)**

#### **`_terminal.css`**
- **Responsabilidad**: Estilos base del terminal y layout principal
- **Contenido**: Container del terminal, header, prompts, outputs, secciones
- **Características**: Layout principal y estructura del terminal

#### **`_logo.css`**
- **Responsabilidad**: Estilos del logo HTML personalizado
- **Contenido**: Logo container, card, arrows, text, shrug, efectos hover
- **Características**: Logo completamente en HTML/CSS con animaciones

#### **`_components.css`**
- **Responsabilidad**: Componentes reutilizables de la UI
- **Contenido**: Grid de nodos, proyectos, botones, CTA, email
- **Características**: Componentes modulares y reutilizables

#### **`_animations.css`**
- **Responsabilidad**: Todas las animaciones y keyframes
- **Contenido**: Cursor blink, typewriter, fadeIn, slideIn, rotate, rainbow
- **Características**: Animaciones centralizadas y reutilizables

#### **`_responsive.css`**
- **Responsabilidad**: Diseño responsive y media queries
- **Contenido**: Breakpoints para tablet, mobile, extra small, print
- **Características**: Mobile-first approach con breakpoints específicos

## 🔧 **Sistema de Variables CSS**

### **Colores del Terminal**
```css
:root {
    --terminal-green: #00ff00;
    --terminal-red: #ff0000;
    --terminal-white: #ffffff;
    --terminal-black: #0a0a0a;
    --terminal-dark: #1a1a1a;
    --terminal-gray: #666666;
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
    --logo-shrug: #F59E0B;
}
```

### **Sistema de Espaciado**
```css
:root {
    --spacing-xs: 5px;
    --spacing-sm: 10px;
    --spacing-md: 15px;
    --spacing-lg: 20px;
    --spacing-xl: 30px;
    --spacing-xxl: 40px;
    --spacing-xxxl: 50px;
}
```

### **Breakpoints Responsive**
```css
:root {
    --breakpoint-sm: 480px;
    --breakpoint-md: 768px;
    --breakpoint-lg: 1024px;
    --breakpoint-xl: 1200px;
}
```

## 📱 **Sistema Responsive**

### **Mobile-First Approach**
- **Base**: Estilos para dispositivos móviles
- **Tablet**: `@media (max-width: 768px)`
- **Desktop**: `@media (max-width: 1024px)`
- **Extra Small**: `@media (max-width: 360px)`

### **Breakpoints Principales**
- **480px**: Mobile portrait
- **768px**: Mobile landscape y tablets
- **1024px**: Tablets y desktop pequeño
- **1200px**: Desktop completo

## 🎨 **Sistema de Animaciones**

### **Keyframes Disponibles**
- `blink`: Parpadeo del cursor
- `fadeIn`: Aparecer con fade
- `slideIn`: Deslizar desde la izquierda
- `rotate`: Rotación para efectos CTA
- `rainbow`: Efecto arcoíris para Konami Code

### **Clases de Animación**
- `.fade-in`: Aplicar fadeIn
- `.slide-in-left`: Aplicar slideIn
- `.revealed`: Para efectos de scroll

## 🔄 **Orden de Importación**

El archivo `main.css` importa los módulos en este orden específico:

1. **Variables** - Define design tokens
2. **Base** - Reset y estilos fundamentales
3. **Terminal** - Layout principal
4. **Logo** - Componente del logo
5. **Components** - Componentes UI
6. **Animations** - Efectos y keyframes
7. **Responsive** - Media queries

Este orden asegura:
- Variables disponibles para todos los módulos
- Reset aplicado antes de estilos específicos
- Responsive design sobrescriba estilos base

## 🛠️ **Uso y Mantenimiento**

### **Agregar Nuevos Estilos**
1. Identificar el módulo apropiado
2. Agregar estilos usando variables CSS
3. Seguir la convención de nomenclatura

### **Modificar Variables**
1. Editar `_variables.css`
2. Los cambios se propagan automáticamente
3. Mantener consistencia en todo el proyecto

### **Agregar Nuevos Módulos**
1. Crear archivo `_nuevo-modulo.css`
2. Agregar `@import` en `main.css`
3. Documentar en este README

## 🎯 **Ventajas de la Modularización CSS**

1. **Organización**: Cada componente tiene sus estilos separados
2. **Mantenibilidad**: Fácil encontrar y modificar estilos específicos
3. **Reutilización**: Módulos que se pueden usar en otros proyectos
4. **Colaboración**: Diferentes desarrolladores pueden trabajar en estilos separados
5. **Performance**: Posibilidad de cargar solo los estilos necesarios
6. **Consistencia**: Variables CSS centralizadas para diseño coherente

## 🔮 **Próximos Pasos**

- [ ] Implementar CSS Modules con PostCSS
- [ ] Agregar sistema de temas (dark/light mode)
- [ ] Implementar CSS-in-JS para componentes dinámicos
- [ ] Agregar sistema de grid CSS personalizado
- [ ] Implementar sistema de iconos SVG
- [ ] Agregar animaciones CSS más avanzadas
