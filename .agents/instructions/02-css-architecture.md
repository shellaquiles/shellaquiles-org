# CSS Architecture

> **[SYSTEM PROMPT]**
> You must adhere strictly to the Vanilla CSS / PostCSS architecture. **Do NOT use TailwindCSS, Bootstrap, or any inline styles.**

## Architecture
The project uses modular CSS bundled via PostCSS.
Entry point: `src/css/main.css`

Directory structure:
- `modules/`: Component-specific styles (e.g., `_terminal.css`, `_components.css`).
- `utils/`: Base styles and variables (e.g., `_variables.css`, `_base.css`).

## Design Tokens (Variables)
Always use the predefined CSS variables located in `utils/_variables.css`.
- Terminal colors: `--terminal-green`, `--terminal-red`, `--terminal-black`, etc.
- Spacing: `--spacing-sm`, `--spacing-md`, etc.

## CSS Rules
1. **Modular Imports**: If you create a new CSS file, you must import it in `main.css` using `@import "modules/your-module.css";`.
2. **Naming**: Use BEM-like class naming conventions with hyphens.
3. **Responsive**: Use `min-width` media queries (Mobile First approach). Do not use max-width unless necessary.
4. **Animations**: Keep keyframes in `_animations.css`. Use CSS transitions over JS animations when possible.
