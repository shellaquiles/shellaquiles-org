# Cómo probar el blog localmente

## Pasos rápidos

### 1. Instalar dependencias (solo la primera vez)
```bash
npm install
```

### 2. Copiar archivos necesarios y hacer build
```bash
npm run copy
npm run build:dev
```

### 3. Iniciar servidor de desarrollo
```bash
npm run serve:dev
```

### 4. Abrir en el navegador
Abre tu navegador en:
- **Home**: http://localhost:8000/
- **Blog**: http://localhost:8000/blog
- **Post individual**: http://localhost:8000/blog/bienvenida-shellaquiles

## Comando todo-en-uno

Para desarrollo con watch automático (recomendado):
```bash
npm run dev
```

Este comando:
1. Copia archivos necesarios (HTML, posts.json)
2. Compila CSS y JS en modo desarrollo
3. Inicia el servidor en http://localhost:8000

## Estructura de archivos

Cuando ejecutes los comandos, se creará:
```
dist/
├── index.html              # HTML principal
├── css/
│   └── styles.css          # CSS compilado
├── js/
│   └── script.js           # JavaScript compilado
└── src/
    └── data/
        └── posts.json      # Posts del blog
```

## Navegación

- **Click en "Inicio"** → Página principal
- **Click en "Blog"** → Lista de posts
- **Click en cualquier post** → Ver post completo
- **Usa el botón "← Volver al blog"** → Regresar a la lista

## Agregar nuevos posts

Ver la guía completa en [BLOG.md](BLOG.md) para agregar posts.

Los posts se almacenan como:
- **Metadata**: `src/data/posts.json`
- **Contenido**: `src/data/posts/[slug].md`

Luego ejecuta `npm run copy` y recarga la página en el navegador.

## Troubleshooting

### El blog no aparece
- Verifica que `dist/src/data/posts.json` existe
- Abre la consola del navegador (F12) para ver errores
- Asegúrate de estar en `/blog` no en `/blog/`

### Los estilos no se cargan
```bash
npm run build:css:dev
```

### El JavaScript no funciona
```bash
npm run build:js:dev
```

### Limpiar y empezar de nuevo
```bash
npm run clean
npm run copy
npm run build:dev
npm run serve:dev
```
