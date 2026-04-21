# Deployment Protocol

> **[SYSTEM PROMPT]**
> Follow this exact protocol when tasked with preparing the project for release/deployment.

## Production Release Algorithm
1. **Validation**: Run the pre-flight check to guarantee code stability:
   ```bash
   bash .agents/hooks/pre-flight-check.sh
   ```
2. **Production Build**: Execute the specific production commands. This ensures files are minified, sourcemaps are stripped, and caching headers/optimizations are generated.
   ```bash
   npm run prepare-production
   ```
   *If `prepare-production` fails or is absent, fallback to `npm run deploy` which cleans, builds prod, and copies files.*
3. **Verification**: Verify that `dist/css/styles.min.css` and `dist/js/script.min.js` were correctly generated.
4. **Commit Phase**: Ensure all source files (`src/`, `index.html`) are staged and committed to Git with a descriptive message. (Note: Never force commit `dist/` if it's in `.gitignore`, the deployment usually occurs via the build action or copying `dist/` contents to a deployment branch/server).
