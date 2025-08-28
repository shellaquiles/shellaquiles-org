# �� Shellaquiles Web - Comunidad de Comunidades

## 🚀 Descripción

Landing page con estilo terminal para shellaquiles.org, presentando el manifiesto ultra-compacto y la estructura de "Comunidad de Comunidades" de manera interactiva y visualmente atractiva.

## ✨ Características

- **Diseño Terminal**: Interfaz inspirada en terminales de comandos
- **Animaciones**: Efectos de escritura, fade-in y hover interactivos
- **Responsive**: Optimizado para móviles y desktop
- **Interactivo**: Botones funcionales y efectos visuales
- **Easter Eggs**: Konami code y comandos de consola

## 🛠️ Tecnologías

- HTML5 semántico
- CSS3 con variables CSS y animaciones
- JavaScript ES6+ con clases y módulos
- Diseño responsive con CSS Grid y Flexbox

## 📁 Estructura del Proyecto

```
shellaquiles-org/
├── index.html          # Página principal
├── styles.css          # Estilos y animaciones
├── script.js           # Funcionalidad interactiva
├── MANIFIESTO-COMPACTO.md  # Versión ultra-compacta
├── README.md           # Manifiesto completo
└── web-README.md       # Este archivo
```

## 🎨 Componentes Principales

### 1. Header Terminal
- Título principal con emoji
- Subtítulo descriptivo
- Estilo terminal con bordes verdes

### 2. Manifiesto Compacto
- Versión ultra-compacta del manifiesto
- Formato de comando `cat manifiesto.txt`
- Destacado del nombre "Shellaquiles"

### 3. Nodos de la Comunidad
- Grid de tipos de comunidades
- Efectos hover con glow verde
- Animaciones de entrada escalonadas

### 4. Proyectos en Curso
- Lista de 3 proyectos principales
- Efectos hover y transiciones
- Información clara y concisa

### 5. Participación
- 3 botones de acción principales
- Estilo terminal con hover effects
- Funcionalidad de notificaciones

### 6. CTA Final
- Email de contacto destacado
- Referencia al README completo
- Efectos visuales especiales

## 🚀 Instalación y Uso

### Opción 1: Servidor Local
```bash
# Con Python 3
python3 -m http.server 8000

# Con Node.js
npx serve .

# Con PHP
php -S localhost:8000
```

### Opción 2: GitHub Pages
1. Subir a repositorio GitHub
2. Activar GitHub Pages en Settings
3. Acceder a `https://username.github.io/repo-name`

### Opción 3: Servidor Web
- Subir archivos a cualquier servidor web
- Funciona en Apache, Nginx, etc.

## 🎯 Personalización

### Colores
Los colores se pueden modificar en `styles.css`:
```css
:root {
    --terminal-green: #00ff00;
    --terminal-red: #ff0000;
    --terminal-white: #ffffff;
    --terminal-black: #0a0a0a;
}
```

### Contenido
- **Nodos**: Modificar en `index.html` sección `.nodos-grid`
- **Proyectos**: Actualizar en sección `.proyecto`
- **Email**: Cambiar en `.email` dentro de `.cta`

### Animaciones
- Velocidad de escritura en `script.js` línea 8
- Timing de animaciones en `script.js` línea 67

## 📱 Responsive Design

- **Desktop**: Grid de 3+ columnas para nodos
- **Tablet**: Grid de 2 columnas
- **Mobile**: Grid de 1 columna, botones full-width

## 🎮 Interactividad

### Comandos de Consola
- Presionar `Enter` simula comandos
- Ver comandos en consola del navegador
- Easter egg con Konami code (↑↑↓↓←→←→BA)

### Efectos Visuales
- Hover en nodos con glow effect
- Click en botones con feedback visual
- Scroll con parallax sutil
- Notificaciones tipo toast

## 🔧 Mantenimiento

### Actualizar Contenido
1. Editar `index.html` para cambios estructurales
2. Modificar `styles.css` para cambios visuales
3. Ajustar `script.js` para funcionalidad

### Agregar Nuevos Nodos
```html
<div class="nodo">🆕 Nuevo Nodo</div>
```

### Agregar Nuevos Proyectos
```html
<div class="proyecto">
    🆕 <strong>Nuevo Proyecto</strong> - Descripción
</div>
```

## 🌟 Características Avanzadas

- **Intersection Observer**: Animaciones al hacer scroll
- **CSS Variables**: Sistema de colores centralizado
- **ES6 Classes**: Código JavaScript modular
- **CSS Grid**: Layout responsive moderno
- **CSS Animations**: Transiciones suaves y atractivas

## 📊 Performance

- CSS y JS separados para mejor caching
- Animaciones optimizadas con `transform` y `opacity`
- Lazy loading de efectos visuales
- Código minificado recomendado para producción

## 🚀 Próximas Mejoras

- [ ] Modo oscuro/claro
- [ ] Más easter eggs
- [ ] Integración con APIs
- [ ] PWA capabilities
- [ ] Internacionalización
- [ ] Analytics integrado

## 📞 Soporte

Para dudas o sugerencias sobre la web:
- **Email**: comunidad@shellaquiles.org
- **Issues**: Crear issue en el repositorio
- **Contribuciones**: Pull requests bienvenidos

---

**¡Juntos creamos el ecosistema tech más grande e integrado del país!** 🚀🇲🇽
