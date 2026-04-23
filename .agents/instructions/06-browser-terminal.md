# Instrucción 06: La Terminal del Navegador

## Contexto
Shellaquiles.org no es una landing page estática tradicional; es un entorno interactivo basado en una terminal de consola simulada. El contenido visual de la página se "descubre" y se inyecta dinámicamente a medida que se ejecutan comandos en la consola del navegador.

## Objetivos del Agente
- Mantener la paridad absoluta entre el contenido CLI y el contenido visual (DOM).
- Asegurar que todos los comandos globales (`about`, `help`, `ls`, etc.) funcionen correctamente.
- Verificar que el objeto `shell` sea accesible y funcional en el entorno de producción.

## Estructura Técnica
### 1. Inicialización (`main.js`)
El sistema utiliza `Object.defineProperty` con `getters` para permitir que el usuario escriba comandos como palabras simples (ej: `help`) sin necesidad de llamar a la función (`help()`).

### 2. Sincronización de Contenido
Cada vez que se ejecuta un comando que devuelve un archivo (ej: `cat filosofia.txt`), el motor:
1. Lee el archivo desde `/src/data/terminal/`.
2. Lo procesa con `MarkdownUtils.js`.
3. Busca el ID de sección correspondiente en el HTML.
4. Inyecta el resultado con una animación de entrada.

## Comandos Críticos
- `shell.next()`: Es el comando principal para avanzar en la lectura del sitio. Inyecta la siguiente sección de contenido.
- `shell.getCommands()`: Devuelve el array de comandos internos que componen la "secuencia de navegación" del sitio.

## Mantenimiento
Si necesitas agregar una nueva sección o proyecto al sitio:
1. **Contenido Visual**: Crea o actualiza el archivo `.txt` en `src/data/terminal/`.
2. **Sincronización CLI**: Si es un proyecto principal ("La Gran Obra"), asegúrate de actualizar la lista hardcodeada en la función `about()` dentro de `src/js/main.js` para mantener la paridad entre lo que se ve en la web y lo que devuelve la consola.
3. **Mapeo de Comandos**: Si es una sección nueva, agrega el comando correspondiente al array `commands` en `Terminal.js`.
4. **Contenedor DOM**: Crea un contenedor con un ID único (`section-NOMBRE`) en `index.html`.
5. **Inyección**: Mapea el comando al ID en `Terminal.js` dentro del método `injectContentToDOM`.

¡Hacia la perfección técnica!
