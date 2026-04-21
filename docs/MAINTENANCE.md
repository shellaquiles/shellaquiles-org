# Mantenimiento de Documentación

## Principio DRY (Don't Repeat Yourself)

Cada tema tiene una única fuente de verdad. Si encuentras información duplicada en múltiples lugares, algo está mal.

## Fuentes Únicas de Verdad

### Convenciones y Principios del Proyecto
- **Fuente única**: `docs/project/STRUCTURE.md`
- **NO duplicar** convenciones en otros lugares

### Instalación y Desarrollo
- **Fuente única**: `docs/guides/PRUEBA-LOCAL.md`
- **NO duplicar** comandos de instalación o desarrollo en README.md

### Sistema de Blog
- **Fuente única**: `docs/guides/BLOG.md`
- **NO duplicar** estructura de posts, formato Markdown, o comandos en otros lugares

### Sistema de Build y Scripts
- **Fuente única**: `docs/guides/BUILD-SYSTEM.md`
- **NO duplicar** comandos npm, configuración de build, o despliegue en otros lugares

### Arquitectura CSS
- **Fuente única**: `docs/reference/CSS-ARCHITECTURE.md`
- **NO duplicar** detalles técnicos de CSS en otros documentos

### Arquitectura JavaScript
- **Fuente única**: `docs/reference/JS-ARCHITECTURE.md`
- **NO duplicar** detalles técnicos de JavaScript en otros documentos

## Roles de Cada Documento

### `README.md` (raíz)
**Propósito**: Página de inicio del proyecto

Contiene:
- Qué es el proyecto
- Características principales
- Referencias a documentación específica

No contiene:
- Detalles técnicos
- Comandos específicos
- Estructura de archivos

### `docs/README.md`
**Propósito**: Índice de toda la documentación

Contiene:
- Lista de todos los documentos
- Descripción breve de cada uno
- Enlaces a documentos específicos

### `docs/guides/*.md`
**Propósito**: Guías prácticas paso a paso

Contiene:
- Instrucciones detalladas
- Comandos específicos
- Ejemplos prácticos
- Troubleshooting

### `docs/reference/*.md`
**Propósito**: Referencia técnica detallada

Contiene:
- Arquitectura técnica
- Detalles de implementación
- Mejores prácticas

### `docs/project/*.md`
**Propósito**: Documentación sobre el proyecto

Contiene:
- Estructura del proyecto
- Organización de archivos
- Convenciones y principios

## Cómo Actualizar Documentación

Sigue estos pasos:

1. Identifica la fuente única de verdad para ese tema
2. Actualiza SOLO ese archivo
3. Verifica que no haya duplicaciones en otros archivos
4. Si hay duplicaciones, elimínalas y reemplázalas con referencias

### Ejemplo: Actualizar comandos npm

**Incorrecto**: Actualizar comandos en README.md, BUILD-SYSTEM.md, y PRUEBA-LOCAL.md

**Correcto**: Actualizar SOLO en `docs/guides/BUILD-SYSTEM.md`, y referenciar desde otros lugares

### Ejemplo: Cambiar estructura de posts

**Incorrecto**: Actualizar estructura en README.md, BLOG.md, y STRUCTURE.md

**Correcto**: Actualizar SOLO en `docs/guides/BLOG.md`, y referenciar desde otros lugares

## Red Flags

Si encuentras la misma información en múltiples lugares:
- Mismo comando en 2+ lugares
- Misma estructura en 2+ lugares
- Misma información en 2+ lugares

**Solución**: Elimina las duplicaciones y crea una referencia a la fuente única.

## Checklist de Mantenimiento

Antes de agregar nueva información:

- [ ] ¿Ya existe esta información en otro lugar?
- [ ] Si existe, ¿cuál es la fuente única de verdad?
- [ ] ¿Debo actualizar la fuente única o crear una nueva?
- [ ] Si creo nueva información, ¿dónde debería ir según su propósito?
- [ ] ¿Hay referencias cruzadas necesarias?

## Estructura Ideal

```
README.md (raíz)
  └─ Referencias a → docs/

docs/
  ├─ README.md (índice)
  │   └─ Referencias a → guides/, reference/, project/
  │
  ├─ guides/ (fuentes únicas de guías prácticas)
  │   ├─ PRUEBA-LOCAL.md (instalación y desarrollo)
  │   ├─ BLOG.md (sistema de blog)
  │   └─ BUILD-SYSTEM.md (build y scripts)
  │
  ├─ reference/ (fuentes únicas de referencia técnica)
  │   ├─ CSS-ARCHITECTURE.md
  │   └─ JS-ARCHITECTURE.md
  │
  └─ project/ (fuentes únicas de documentación del proyecto)
      └─ STRUCTURE.md
```

## Beneficios

- **Mantenimiento fácil**: Solo actualizas un lugar
- **Sin contradicciones**: Una sola fuente de verdad
- **Claridad**: Cada documento tiene un propósito claro
- **Escalabilidad**: Fácil agregar nueva documentación

---

**Regla de oro**: Si tienes que actualizar la misma información en más de un lugar, estás haciendo algo mal. Busca la fuente única y actualiza solo esa.
