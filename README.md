# 🚀 shellaquiles.org

**Comunidad de Comunidades** - Landing page con estilo terminal para conectar ecosistemas tech en México.

## ✨ Características

- **Diseño Terminal** - Interfaz inspirada en terminales de comandos
- **Logo HTML** - Logo personalizado renderizado nativamente
- **Responsive** - Optimizado para todos los dispositivos
- **Sin Dependencias** - HTML, CSS y JavaScript puro
- **Estilo Auténtico** - Sin emojis, solo texto y símbolos ASCII

## 🏗️ Estructura del Proyecto

```
shellaquiles-org/
├── 📁 src/                    # Código fuente
│   ├── 📁 css/               # Estilos
│   │   └── styles.css        # Tema terminal principal
│   ├── 📁 js/                # JavaScript
│   │   └── script.js         # Funcionalidad interactiva
│   └── 📁 images/            # Imágenes y assets
│       └── logo_shellaquiles.svg
├── 📁 docs/                   # Documentación
│   ├── web-README.md         # Guía técnica de la web
│   └── MANIFIESTO-COMPACTO.md # Versión ultra-compacta
├── 📁 dist/                   # Build de producción
├── 📄 index.html              # Página principal
├── 📄 package.json            # Configuración del proyecto
├── 📄 project.config.js       # Configuración de build
├── 📄 .gitignore             # Archivos ignorados por Git
└── 📄 README.md               # Este archivo
```

## 🚀 Inicio Rápido

### Desarrollo Local
```bash
# Clonar el repositorio
git clone <repository-url>
cd shellaquiles-org

# Instalar dependencias (opcional)
npm install

# Iniciar servidor de desarrollo
npm run dev
# o
python3 -m http.server 8000
```

### Build de Producción
```bash
# Construir para producción
npm run build

# Servir build de producción
npm run serve:prod
```

## 🎨 Componentes

### Logo HTML
- **Fondo oscuro** con esquinas redondeadas
- **Texto "{{ shellaquiles.org }}"** con colores diferenciados
- **Kaomoji "¯\_(ツ)_/¯"** en naranja
- **Flechas "»»»"** con glow verde

### Manifiesto
- **Versión ultra-compacta** del manifiesto
- **Preguntas en negrita** para mejor legibilidad
- **Formato terminal** auténtico

### Nodos y Proyectos
- **Grid responsive** de tipos de comunidades
- **Proyectos propios** de Shellaquiles
- **Contenido honesto** sobre el estado actual

## 🛠️ Scripts Disponibles

```bash
npm run dev          # Servidor de desarrollo
npm run build        # Build completo para producción
npm run build:dev    # Build sin minificación
npm run serve        # Servir archivos de desarrollo
npm run serve:prod   # Servir build de producción
npm run clean        # Limpiar directorio dist
npm run deploy       # Build y preparar para despliegue
```

## 🌐 Despliegue

### GitHub Pages
1. Subir a repositorio GitHub
2. Activar GitHub Pages en Settings
3. Configurar source como `/docs` o `/root`

### Servidor Web
- Subir contenido de `/dist` a cualquier hosting
- Compatible con Apache, Nginx, etc.

### Netlify/Vercel
- Conectar repositorio
- Build command: `npm run build`
- Publish directory: `dist`

## 🎯 Tecnologías

- **HTML5** - Estructura semántica
- **CSS3** - Variables CSS, Grid, Flexbox, Animaciones
- **JavaScript ES6+** - Clases, Módulos, ES6 Features
- **Responsive Design** - Mobile-first approach
- **Terminal Theme** - Colores y tipografía auténtica

## 📱 Responsive

- **Desktop**: Grid de 3+ columnas
- **Tablet**: Grid de 2 columnas
- **Mobile**: Grid de 1 columna, botones full-width

## 🔧 Personalización

### Colores
Modificar en `src/css/styles.css`:
```css
:root {
    --terminal-green: #00ff00;
    --terminal-red: #ff0000;
    --terminal-white: #ffffff;
    --terminal-black: #0a0a0a;
}
```

### Contenido
- **Nodos**: `index.html` sección `.nodos-grid`
- **Proyectos**: `index.html` sección `.proyecto`
- **Email**: `index.html` clase `.email`

## 📊 Performance

- **CSS y JS separados** para mejor caching
- **Animaciones optimizadas** con transform/opacity
- **Lazy loading** de efectos visuales
- **Sin dependencias externas** para mejor velocidad

## 🤝 Contribuir

1. Fork el proyecto
2. Crear rama para feature (`git checkout -b feature/AmazingFeature`)
3. Commit cambios (`git commit -m 'Add AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abrir Pull Request

## 📄 Licencia

Este proyecto está bajo la Licencia MIT - ver el archivo [LICENSE](LICENSE) para detalles.

## 📞 Contacto

- **Email**: comunidad@shellaquiles.org
- **Proyecto**: [GitHub Issues](https://github.com/username/shellaquiles-org/issues)

---

**¡Juntos creamos el ecosistema tech más grande e integrado del país!** 🚀🇲🇽
