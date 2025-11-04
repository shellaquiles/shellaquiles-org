# Sistema de Build - Shellaquiles.org

## Resumen del Sistema

Sistema de build profesional que combina **PostCSS** para CSS y **Webpack** para JavaScript, eliminando la duplicación de código y manteniendo la arquitectura modular.

## Arquitectura del Build

### **Flujo de Build**
```
src/                    # Código fuente modular
├── css/               # Módulos CSS
│   ├── main.css      # Punto de entrada CSS
│   ├── modules/      # Componentes CSS
│   └── utils/        # Utilidades CSS
├── js/                # Módulos JavaScript
│   ├── main.js       # Punto de entrada JS
│   ├── modules/      # Funcionalidades JS
│   └── utils/        # Utilidades JS
└── assets/            # Recursos estáticos

    ↓ Build Process

dist/                   # Archivos de producción
├── css/
│   └── styles.css     # CSS combinado y optimizado
└── js/
    └── script.js      # JS transpilado y optimizado
```

## CSS Build con PostCSS

### **Pipeline PostCSS**
```bash
src/css/main.css → PostCSS → dist/css/styles.css
```

### **Plugins Utilizados**
- **postcss-import**: Resuelve `@import` automáticamente
- **postcss-nested**: Soporte para anidamiento CSS
- **autoprefixer**: Agrega prefijos de navegador
- **cssnano**: Minificación para producción

### **Configuración PostCSS**
```javascript
// postcss.config.js
module.exports = {
  plugins: [
    require('postcss-import'),
    require('postcss-nested'),
    require('autoprefixer'),
    process.env.NODE_ENV === 'production' ? require('cssnano') : null
  ].filter(Boolean)
}
```

### **Comandos CSS**
```bash
# Desarrollo (con watch)
npm run build:css:dev

# Producción (minificado)
npm run build:css:prod
```

## JavaScript Build con Webpack

### **Pipeline Webpack**
```bash
src/js/main.js → Webpack + Babel → dist/js/script.js
```

### **Configuración Webpack**
```javascript
// webpack.config.js
module.exports = {
  entry: './src/js/main.js',
  output: {
    path: path.resolve(__dirname, 'dist/js'),
    filename: isProduction ? 'script.min.js' : 'script.js'
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        use: 'babel-loader'
      }
    ]
  }
}
```

### **Babel Transpilación**
```json
// .babelrc
{
  "presets": [
    ["@babel/preset-env", {
      "targets": { "browsers": ["> 1%", "last 2 versions"] }
    }]
  ]
}
```

### **Comandos JavaScript**
```bash
# Desarrollo (con watch)
npm run build:js:dev

# Producción (minificado)
npm run build:js:prod
```

## Comandos de Build Completos

### **Desarrollo**
```bash
# Build completo en desarrollo
npm run build:dev

# Build CSS + JS + servidor
npm run dev
```

### **Producción**
```bash
# Preparar para producción (compila, minifica, genera .htaccess)
npm run prepare-production

# O solo compilar sin preparar archivos
npm run build:prod
```

### **Utilidades**
```bash
# Limpiar build
npm run clean

# Copiar archivos estáticos
npm run copy

# Linting
npm run lint
```

## Output del Build

### **Archivos Generados**
```
dist/
├── css/
│   ├── styles.css          # Desarrollo: 16KB, 872 líneas
│   └── styles.min.css      # Producción: 12KB, minificado
└── js/
    ├── script.js           # Desarrollo: 99KB, 146 líneas
    └── script.min.js       # Producción: 45KB, minificado
```

### **Optimizaciones Aplicadas**
- **CSS**: Variables resueltas, prefijos automáticos, minificación
- **JavaScript**: ES6+ transpilado, tree-shaking, minificación
- **Performance**: Archivos optimizados para producción

## Configuración del Proyecto

### **package.json Scripts**
```json
{
  "scripts": {
    "dev": "npm run build:dev && npm run serve:dev",
    "build:dev": "npm run build:css:dev && npm run build:js:dev",
    "build:prod": "npm run build:css:prod && npm run build:js:prod",
    "build:css:dev": "postcss src/css/main.css -o dist/css/styles.css --watch",
    "build:css:prod": "postcss src/css/main.css -o dist/css/styles.min.css --env production",
    "build:js:dev": "webpack --mode development --watch",
    "build:js:prod": "webpack --mode production"
  }
}
```

### **Dependencias de Desarrollo**
```json
{
  "devDependencies": {
    "postcss": "^8.4.31",
    "postcss-cli": "^10.1.0",
    "postcss-import": "^15.1.0",
    "postcss-nested": "^6.0.1",
    "autoprefixer": "^10.4.16",
    "cssnano": "^6.0.1",
    "webpack": "^5.89.0",
    "webpack-cli": "^5.1.4",
    "babel-loader": "^9.1.3",
    "@babel/core": "^7.23.5",
    "@babel/preset-env": "^7.23.5"
  }
}
```

## Desarrollo Local

### **Servidor de Desarrollo**
```bash
# Iniciar servidor
npm run serve:dev

# URL: http://localhost:8000
```

### **Watch Mode**
```bash
# CSS con watch automático
npm run build:css:dev

# JavaScript con watch automático
npm run build:js:dev

# Build completo con watch
npm run dev
```

## Deploy y Producción

### **Build de Producción**
```bash
# Generar archivos optimizados
npm run build:prod

# Resultado en dist/
```

### **Estructura de Deploy**
```
dist/
├── index.html              # HTML principal
├── css/
│   └── styles.min.css      # CSS minificado
├── js/
│   └── script.min.js       # JS minificado
└── assets/                 # Recursos estáticos
```

### **Hosting Compatible**
- **GitHub Pages**: Subir contenido de `dist/`
- **Netlify/Vercel**: Build command: `npm run prepare-production`
- **Servidor Web (Apache)**: Subir contenido de `dist/` (`.htaccess` incluido)
- **Otros servidores**: Configurar SPA routing según la plataforma

## Debugging y Troubleshooting

### **Problemas Comunes**

#### **CSS no se carga**
```bash
# Verificar que PostCSS generó el archivo
ls -la dist/css/

# Rebuild CSS
npm run build:css:dev
```

#### **JavaScript no funciona**
```bash
# Verificar que Webpack generó el archivo
ls -la dist/js/

# Rebuild JavaScript
npm run build:js:dev
```

#### **Módulos no se resuelven**
```bash
# Verificar imports en main.js
cat src/js/main.js

# Verificar estructura de archivos
tree src/js/
```

### **Logs del Build**
```bash
# CSS build logs
npm run build:css:dev

# JavaScript build logs
npm run build:js:dev

# Build completo
npm run build:dev
```

## Ventajas del Sistema

- **Sin duplicación** de código
- **Build automático** con PostCSS + Webpack
- **Arquitectura modular** mantenida
- **Optimización automática** para producción
- **Desarrollo eficiente** con watch mode

## Próximos Pasos

- [ ] Implementar CSS Modules para scoping
- [ ] Agregar PostCSS plugins para CSS Grid
- [ ] Implementar code splitting con Webpack
- [ ] Agregar análisis de bundle size
- [ ] Implementar cache busting automático
