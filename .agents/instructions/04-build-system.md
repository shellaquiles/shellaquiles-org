# Build System Constraints

> **[SYSTEM PROMPT]**
> This project uses a custom Webpack and PostCSS pipeline. You must strictly use the predefined NPM scripts.

## Core Scripts
- **Development**: `npm run dev` (Runs both CSS/JS build in watch mode AND serves the site on `localhost:8000`).
- **Production Build**: `npm run build:prod` (Compiles and minifies assets to `dist/`).
- **Copy Static Assets**: `npm run copy` (Copies HTML and data like `posts.json` into `dist/`).

## Agentic Rules
1. **Never mutate build tools directly**: Do not modify `webpack.config.js` or `postcss.config.js` unless requested.
2. **Never edit `dist/` directly**: The `dist/` folder is auto-generated. If you need to make a persistent change, make it in `src/` and run `npm run copy` or the appropriate build command.
