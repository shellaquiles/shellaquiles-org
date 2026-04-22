# Skill: Terminal Management (Browser Console CLI)

Este skill define la arquitectura, comandos y el funcionamiento del ecosistema de la terminal interactiva dentro de la consola del navegador de Shellaquiles.org. 
El logo oficial en texto es `{{ shellaquiles.org }}` con el siguiente esquema de color: `shell` (verde), `aquiles` (blanco/gris) y `.org` (rosa/rojo).

## Arquitectura de la Terminal

La terminal no es solo visual; está integrada directamente en el entorno de ejecución de JavaScript del navegador mediante el objeto global `shell` y una serie de "getters" que permiten ejecutar comandos sin necesidad de paréntesis.

### Componentes Clave:
- **`Terminal.js`**: El motor principal. Maneja la secuencia de comandos, la carga de contenido dinámico (`src/data/terminal/*.txt`) y la inyección en el DOM mediante un sistema de pre-carga (`preloadContent`).
- **`main.js`**: Punto de entrada que inicializa el sistema y registra las funciones globales. Utiliza `Object.defineProperty` para crear interfaces tipo CLI.
- **`MarkdownUtils.js`**: Parser de línea por línea que transforma los archivos `.txt` en HTML. Soporta negritas (`**`), código en línea (`` ` ``), encabezados (`#`, `##`, `###`) y listas (`-`).
- **`EventManager.js`**: Gestiona las interacciones del teclado y otros eventos globales para asegurar que la terminal responda a la mística del entorno.

---

## 🛠️ API de la Terminal (Consola del Navegador)

### Comandos de Usuario (Nivel 1)
Estos comandos están diseñados para ser amigables y mofarse del usuario o guiarlo con mística. Se pueden ejecutar simplemente escribiendo el nombre en la consola.

| Comando | Función | Descripción |
|---------|---------|-------------|
| `about` | `about()` | Muestra el banner ASCII y la filosofía básica. |
| `help` | `help()` | Lista todos los comandos disponibles. |
| `contact` | `contact()` | Muestra los canales oficiales de comunicación. |
| `clear` | `clear()` | Limpia la consola y muestra un mensaje de reinicio. |
| `shellaquiles` | `about()` | Alias para el banner principal. |

### Terminal API (Nivel 2 - Avanzado)
Para interactuar con el sistema de inyección dinámica de la página. El objeto principal es `shell` (alias de `window.shellaquilesTerminal`).

| Comando / Propiedad | Función | Uso |
|---------------------|---------|-----|
| `ls` | `shell.getCommands()` | Lista todos los comandos internos disponibles en la secuencia. |
| `status` | `shell.status()` | Muestra el progreso actual de la secuencia de lectura. |
| `next` | `shell.next(cmd)` | Ejecuta el siguiente comando en la lista o uno específico por nombre. |
| `shell.resetCommands()` | N/A | Reinicia la secuencia de inyección de contenido. |

---

## 📄 Gestión de Contenido Dinámico

Todo el contenido de la landing page y de la terminal reside en `src/data/terminal/`. 

### Mapeo de Inyección al DOM:
El sistema mapea automáticamente la salida de ciertos comandos a secciones específicas del `index.html` mediante sus IDs:

| Comando | ID del Elemento DOM | Archivo de Origen |
|---------|---------------------|-------------------|
| `cat manifiesto.txt` | `section-manifiesto` | `manifiesto.txt` |
| `ls proyectos/` | `section-proyectos` | `proyectos.txt` |
| `ls blog/` | `section-blog` | `blog.txt` |
| `cat filosofia.txt` | `section-filosofia` | `filosofia.txt` |
| `finger pixelead0` | `section-pixelead0` | `pixelead0.txt` |
| `cat valores.txt` | `section-valores` | `valores.txt` |
| `./participar.sh` | `section-participar` | `participar.txt` |
| `ls /ofrendas` | `section-ofrendas` | `ofrendas.txt` |
| `ls organizacion/` | `section-organizacion` | `organizacion.txt` |
| `ls aliados/` | `section-aliados` | `aliados.txt` |

---

## ⚡ Lógica Avanzada (Bajo el Capó)

### Getters de Consola
Para emular una terminal real donde no se usan paréntesis para comandos simples, `main.js` utiliza un patrón de `getters`:

```javascript
Object.defineProperty(window, 'help', {
    get: function() {
        return help(); // Ejecuta la función al simplemente escribir 'help'
    }
});
```

### El Objeto `shell`
El objeto `shell` es el puente entre el usuario y la instancia de la clase `Terminal`. 
- `shell.next()`: No solo inyecta texto, sino que realiza una petición `fetch` al archivo correspondiente y activa las animaciones CSS definidas en `AnimationUtils.js`.
- `shell.status()`: Devuelve un objeto con el comando actual, el índice de la secuencia y el progreso porcentual.

## 📜 Reglas para Agentes (Mantenimiento)

1. **Sincronización**: Al modificar un archivo en `src/data/terminal/`, siempre ejecuta `npm run copy` para que los cambios se reflejen en la carpeta `dist/`.
2. **Formato**: Los archivos `.txt` deben seguir el estándar de Markdown soportado por `MarkdownUtils.js` (H1, H2, H3, Listas, Negritas, Código en línea).
3. **Estilo**: Sigue siempre las directrices de `writer.md` (Excelencia técnica, devoción estratégica, sin emoticonos).
4. **Prueba**: Después de cualquier cambio, abre la consola del navegador y ejecuta `shell.next()` para verificar que la inyección dinámica funciona correctamente.

¡Código limpio para todos!
