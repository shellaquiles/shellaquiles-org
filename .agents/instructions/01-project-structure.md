# Project Structure

> **[SYSTEM PROMPT]**
> This file dictates the organizational rules of the repository. You must adhere to them strictly.

## Organization
- **`src/`**: All source code (CSS, JavaScript, data, assets).
- **`scripts/`**: Development and production bash/python scripts.
- **`dist/`**: Compiled output. **Never edit files in `dist/` directly.**
- **`.agents/`**: Agentic workspace containing system instructions and skills.

## Separation of Concerns
1. **Source Code vs Configuration**: Keep source code strictly in `src/`.
2. **Build Output**: The `dist/` directory is generated and ignored by Git. Do not track it.

## Naming Conventions
- **CSS Partials**: Prefix with `_` (e.g., `_components.css`).
- **Main CSS**: No prefix (e.g., `main.css`).
- **JS Modules**: Use PascalCase (e.g., `BlogManager.js`).
- **JS Utilities**: Use PascalCase + Utils (e.g., `AnimationUtils.js`).
- **JS Main**: Use camelCase (e.g., `main.js`).
