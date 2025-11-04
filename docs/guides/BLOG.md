# Guía del Sistema de Blog

Esta guía explica cómo usar y mantener el sistema de blog integrado en Shellaquiles.org.

## Características

- **Routing SPA**: Navegación sin recargar la página
- **Posts en Markdown**: Contenido separado en archivos `.md` individuales
- **Metadata en JSON**: Información del post en `posts.json`
- **Markdown Básico**: Formato de contenido simple y mantenible
- **Diseño Terminal**: Consistente con el tema del sitio

## Estructura de Archivos

```
src/data/
├── posts.json              # Metadata de todos los posts
└── posts/                  # Contenido en Markdown
    ├── bienvenida-shellaquiles.md
    └── bits-de-conocimiento.md
```

## Agregar Nuevos Posts

### Paso 1: Crear el archivo Markdown

Crea un nuevo archivo en `src/data/posts/` con el nombre `[slug].md`:

```bash
# Ejemplo
src/data/posts/mi-nuevo-post.md
```

### Paso 2: Escribir el contenido en Markdown

Escribe el contenido del post en Markdown:

```markdown
Este es el **contenido** de mi nuevo post.

## Sección 1

Puedo usar negrita, `código inline`, y [links](https://ejemplo.com).

### Listas

- Item 1
- Item 2
- Item 3

### Bloques de código

```javascript
const hello = 'Shellaquiles';
console.log(hello);
```
```

### Paso 3: Agregar metadata en `posts.json`

Abre `src/data/posts.json` y agrega un nuevo objeto al array (al inicio para que aparezca primero):

```json
{
  "id": "mi-nuevo-post",
  "title": "Mi Nuevo Post",
  "slug": "mi-nuevo-post",
  "date": "2024-03-20",
  "author": "Tu Nombre",
  "category": "Tutorial",
  "tags": ["javascript", "tutorial", "web"],
  "excerpt": "Este es un resumen corto que aparece en la lista de posts."
}
```

**Importante**: El `slug` debe coincidir con el nombre del archivo Markdown (sin la extensión `.md`).

### Ejemplo Completo

**Archivo**: `src/data/posts/mi-primer-post.md`
```markdown
## Introducción

Este es el contenido completo del post.

**Puedes usar negrita** y `código inline`.

### Listas

- Item 1
- Item 2

### Código

```javascript
const hello = 'Shellaquiles';
console.log(hello);
```
```

**Metadata en `posts.json`**:
```json
{
  "id": "mi-primer-post",
  "title": "Mi Primer Post",
  "slug": "mi-primer-post",
  "date": "2024-03-20",
  "author": "Juan Pérez",
  "category": "Tutorial",
  "tags": ["javascript", "tutorial"],
  "excerpt": "Este es un ejemplo de cómo crear tu primer post."
}
```

## Formato Markdown Soportado

### Negrita

```markdown
**texto en negrita**
```

### Código Inline

```markdown
`código inline`
```

### Links

```markdown
[Texto del link](https://url.com)
```

### Headers

```markdown
## Header H2
### Header H3
```

### Listas

```markdown
- Item 1
- Item 2
- Item 3
```

### Bloques de Código

````markdown
```javascript
const code = 'here';
```
````

## Actualizar Posts Existentes

### Para editar el contenido

1. Edita el archivo Markdown en `src/data/posts/[slug].md`
2. Guarda el archivo
3. Ejecuta `npm run copy` para copiar el archivo a `dist/`
4. Recarga la página en el navegador

### Para editar metadata

1. Edita `src/data/posts.json`
2. Modifica el objeto del post
3. Guarda el archivo
4. Ejecuta `npm run copy`
5. Recarga la página

## Organización

### Categorías Recomendadas

- **Comunidad**: Eventos, anuncios, noticias generales
- **Eventos**: Meetups, talleres, eventos próximos
- **Talleres**: Tutoriales, guías prácticas
- **Tutorial**: Tutoriales técnicos
- **Noticias**: Noticias de la comunidad

### Tags Recomendados

Usa tags relevantes como:
- `javascript`, `python`, `rust`, `go` (lenguajes)
- `tutorial`, `evento`, `meetup` (tipo de contenido)
- `web`, `devops`, `ia`, `blockchain` (tecnologías)

## Flujo de Trabajo

### Para Agregar un Post

1. Crea el archivo Markdown en `src/data/posts/[slug].md`
2. Escribe el contenido en Markdown
3. Agrega la metadata en `src/data/posts.json`
4. Ejecuta `npm run copy` para copiar los archivos a `dist/`
5. Recarga la página en el navegador

### Para Editar un Post

**Contenido:**
1. Edita el archivo Markdown en `src/data/posts/[slug].md`
2. Guarda el archivo
3. Ejecuta `npm run copy`
4. Recarga la página

**Metadata:**
1. Edita `src/data/posts.json`
2. Modifica el objeto del post
3. Guarda el archivo
4. Ejecuta `npm run copy`
5. Recarga la página

### Para Eliminar un Post

1. Elimina el archivo Markdown en `src/data/posts/[slug].md`
2. Elimina el objeto del post de `src/data/posts.json`
3. Ejecuta `npm run copy`
4. Recarga la página

## URLs de Posts

Los posts son accesibles en:
```
http://localhost:8000/blog/[slug]
```

Donde `[slug]` es el valor del campo `slug` en el JSON y el nombre del archivo Markdown.

Ejemplo:
- Slug: `mi-primer-post`
- Archivo: `src/data/posts/mi-primer-post.md`
- URL: `http://localhost:8000/blog/mi-primer-post`

## Estilos Personalizados

Los estilos del blog están en `src/css/modules/_components.css` bajo la sección `/* Blog Styles */`.

Puedes personalizar:
- Colores
- Espaciado
- Tipografía
- Animaciones

## Troubleshooting

### El post no aparece

1. Verifica que el JSON sea válido (usa un validador JSON)
2. Verifica que el `slug` en `posts.json` coincida con el nombre del archivo `.md`
3. Asegúrate de que el archivo Markdown exista en `src/data/posts/`
4. Verifica que ejecutaste `npm run copy`
5. Recarga la página con Ctrl+F5

### El contenido no se muestra correctamente

1. Verifica que el archivo Markdown exista y tenga el nombre correcto
2. Verifica que el markdown esté bien formateado
3. Revisa la consola del navegador (F12) para errores
4. Verifica que el `slug` en `posts.json` coincida con el nombre del archivo

### La fecha no se muestra

1. Verifica que el formato de fecha sea `YYYY-MM-DD`
2. Ejemplo correcto: `2024-03-20`
3. Ejemplo incorrecto: `03/20/2024`

### Error 404 al cargar el post

1. Verifica que el archivo Markdown exista en `src/data/posts/[slug].md`
2. Verifica que ejecutaste `npm run copy` para copiar el archivo a `dist/`
3. Verifica que el archivo esté en `dist/src/data/posts/[slug].md`

## Tips

- **Orden**: Los posts se ordenan por fecha (más recientes primero)
- **Slugs**: Usa slugs únicos y descriptivos. El slug debe ser el mismo en el JSON y el nombre del archivo
- **Excerpts**: Mantén los excerpts cortos (1-2 líneas)
- **Tags**: Usa tags consistentes para facilitar la navegación futura
- **Categorías**: Mantén un número limitado de categorías para mejor organización
- **Nombres de archivos**: Usa solo letras minúsculas, números y guiones en los nombres de archivos

## Ventajas de esta Estructura

- **Mantenible**: Contenido separado del código
- **Escalable**: Fácil agregar muchos posts sin hacer el JSON enorme
- **Editable**: Puedes editar Markdown en cualquier editor
- **Versionable**: Git puede trackear cambios en archivos individuales fácilmente
- **Organizado**: Cada post tiene su propio archivo

## Mejoras Futuras

Posibles mejoras que se pueden implementar:

- Búsqueda de posts
- Filtrado por categoría/tag
- Paginación
- RSS feed
- Comentarios
- Vista previa de posts
- Editor visual de markdown
- Frontmatter en Markdown (metadata en el archivo)

---

¿Preguntas? Abre un issue en el repositorio o contacta a la comunidad.
