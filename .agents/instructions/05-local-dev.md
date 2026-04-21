# Local Development & Validation

> **[SYSTEM PROMPT]**
> When asked to validate your changes locally, follow these steps.

## Server Execution
1. Ensure dependencies are installed (run `npm install` if `node_modules` is missing).
2. Execute `npm run dev`. This will run the Python server internally at `localhost:8000` and start the watch process.
3. The blog will be available at `http://localhost:8000/blog`.

## Validation Rules
- **CSS Changes**: Ensure `npm run build:css:dev` has run successfully.
- **JS Changes**: Ensure `npm run build:js:dev` has run successfully.
- **Data/HTML Changes**: Run `npm run copy` to sync `posts.json` and `.md` files to `dist/`.
- If a post does not show up, explicitly verify `src/data/posts.json` has valid JSON syntax.
