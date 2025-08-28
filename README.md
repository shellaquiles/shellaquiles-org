# Shellaquiles.org

**Comunidad de Comunidades tech en México**

## 🚀 **¿Qué es?**

Comunidad de comunidades tech en México que ejecuta ideas colectivas mezclando tecnología, cultura libre y creatividad.

## 🏗️ **Arquitectura del Proyecto**

### **Estructura Modular**
```
src/
├── css/                    # Módulos CSS
│   ├── modules/           # Componentes específicos
│   ├── utils/             # Variables y estilos base
│   └── main.css           # Punto de entrada CSS
├── js/                     # Módulos JavaScript
│   ├── modules/            # Funcionalidades principales
│   ├── utils/              # Utilidades y helpers
│   └── main.js             # Punto de entrada JS
└── assets/                 # Recursos estáticos
```

### **Sistema de Build**
- **PostCSS**: Procesamiento y bundling de CSS
- **Webpack**: Bundling y transpilación de JavaScript
- **Babel**: Transpilación de ES6+ a JavaScript compatible

## 🛠️ **Instalación y Desarrollo**

### **Requisitos**
- Node.js >= 16.0.0
- NPM >= 8.0.0

### **Instalación**
```bash
# Clonar repositorio
git clone <repository-url>
cd shellaquiles-org

# Instalar dependencias
npm install
```

### **Comandos de Desarrollo**
```bash
# Desarrollo completo (CSS + JS + servidor)
npm run dev

# Solo build de CSS
npm run build:css:dev

# Solo build de JavaScript
npm run build:js:dev

# Build de producción
npm run build:prod

# Servidor de desarrollo
npm run serve:dev

# Limpiar build
npm run clean

# Deploy completo
npm run deploy
```

## 🎨 **Características**

- **Terminal UI**: Interfaz estilo línea de comandos
- **Responsive Design**: Adaptable a todos los dispositivos
- **Modular**: Arquitectura escalable y mantenible
- **Moderno**: ES6+, CSS Variables, PostCSS
- **Performance**: Bundling optimizado para producción

## 🌐 **Cómo Funciona**

1. **CSS Modular**: Variables centralizadas, componentes reutilizables
2. **JavaScript Modular**: Clases ES6, manejo de eventos, animaciones
3. **Build Automatizado**: PostCSS + Webpack para archivos optimizados
4. **Desarrollo Local**: Servidor HTTP para testing

## 📁 **Archivos de Build**

Los archivos finales se generan en `dist/`:
- `dist/css/styles.css` - CSS combinado y optimizado
- `dist/js/script.js` - JavaScript transpilado y optimizado

## 🤝 **Contribuir**

1. Fork del repositorio
2. Crear rama para tu feature (`git checkout -b feature/nueva-funcionalidad`)
3. Commit de tus cambios (`git commit -am 'Agregar nueva funcionalidad'`)
4. Push a la rama (`git push origin feature/nueva-funcionalidad`)
5. Crear Pull Request

## 📄 **Licencia**

MIT License - ver [LICENSE](LICENSE) para detalles.

## 📞 **Contacto**

- **Email**: comunidad@shellaquiles.org
- **Sitio**: [shellaquiles.org](https://shellaquiles.org)

---

**¡Solos llegamos lejos, pero unidos transformamos todo!** 🚀
