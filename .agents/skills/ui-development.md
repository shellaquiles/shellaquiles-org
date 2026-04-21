# UI Development Workflow

> **[SYSTEM PROMPT]**
> When asked to create or modify UI components, you must adhere strictly to this operational skill.

## Component Creation Algorithm
1. **HTML Modification**: Add the required markup in `index.html`. Add appropriate semantic classes following the project's styling pattern.
2. **CSS Styling**:
   - Create or edit the relevant CSS module in `src/css/modules/` (e.g., `_my-component.css`).
   - If creating a new file, YOU MUST import it inside `src/css/main.css`.
   - Never use inline styles. Always use existing variables from `src/css/utils/_variables.css`.
3. **JS Logic**:
   - If the component requires interactivity, create or update a class in `src/js/modules/`.
   - Ensure the new logic is hooked up inside `src/js/main.js` or via the `EventManager.js`.
4. **Validation Hook**:
   - Execute `.agents/hooks/pre-flight-check.sh` to guarantee that CSS and JS builds succeed before completing the task.
