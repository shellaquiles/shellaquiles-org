# JS Architecture

> **[SYSTEM PROMPT]**
> This project uses Vanilla JavaScript (ES6+) bundled with Webpack. **Do NOT use React, Vue, Svelte, or jQuery.**

## Architecture
Entry point: `src/js/main.js`

Directory structure:
- `modules/`: Core feature classes (e.g., `Terminal.js`, `AnimationManager.js`).
- `utils/`: Helpers (e.g., `DOMUtils.js`).

## Implementation Rules
1. **ES6+**: Use `export class`, arrow functions, template literals, and modern JS features.
2. **Object-Oriented**: Encapsulate functionality inside classes.
3. **Initialization**: Classes should have an `init()` method called from `main.js` on `DOMContentLoaded`.
4. **DOM Manipulation**: Keep DOM manipulation clean and use querySelector/querySelectorAll. Do not mutate state randomly; centralize event listeners in an `EventManager` or equivalent.
5. **No Frameworks**: All UI updates must be done with Vanilla JS DOM APIs.
