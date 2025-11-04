# Estructura del Proyecto

Principios de organización y convenciones del proyecto Shellaquiles.org.

## Organización General

El proyecto se organiza en:
- **`src/`** - Código fuente (CSS, JavaScript, datos, assets)
- **`docs/`** - Documentación organizada por categorías
- **`scripts/`** - Scripts de desarrollo y producción
- **`dist/`** - Archivos compilados (generado, no versionado)

## Principios de Organización

### 1. Separación de Concerns

- **Código fuente** separado de configuración
- **Documentación** organizada por propósito
- **Scripts** en directorio dedicado
- **Build output** en directorio separado (ignorado por Git)

### 2. Modularidad

- **CSS**: Organizado en módulos y utilidades
- **JavaScript**: Módulos por funcionalidad
- **Documentación**: Organizada por categorías

### 3. Escalabilidad

- **Estructura preparada** para crecer
- **Categorías claras** para agregar nueva documentación
- **Módulos independientes** para agregar funcionalidad

### 4. Convenciones

- **Archivos CSS**: Prefijo `_` para partials (ej: `_components.css`)
- **Módulos JS**: PascalCase para clases (ej: `BlogManager.js`)
- **Utilidades**: Sufijo `Utils` (ej: `AnimationUtils.js`)
- **Documentación**: Markdown en `docs/` organizado por categorías

## Convenciones de Nomenclatura

### Archivos CSS

- **Partials**: Prefijo `_` (ej: `_components.css`)
- **Main**: Sin prefijo (ej: `main.css`)

### Archivos JavaScript

- **Módulos**: PascalCase (ej: `BlogManager.js`)
- **Utilidades**: PascalCase + Utils (ej: `AnimationUtils.js`)
- **Main**: camelCase (ej: `main.js`)

### Documentación

- **Guías**: Nombres descriptivos (ej: `BLOG.md`)
- **Proyecto**: Nombres descriptivos (ej: `STRUCTURE.md`)
- **README**: `README.md` en cada directorio importante

## Principios de Diseño

1. **Separación de Concerns**: Cada tipo de archivo en su lugar
2. **Modularidad**: Código organizado en módulos
3. **Documentación**: Organizada por propósito
4. **Escalabilidad**: Estructura preparada para crecer
5. **Convenciones**: Nomenclatura consistente

---

**Nota**: Para ver la estructura de archivos del proyecto, usa `tree` o explora el repositorio directamente.
