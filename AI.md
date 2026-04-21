# Shellaquiles.org AI Dispatcher (Agentic Workspace)

> **[CRITICAL SYSTEM PROMPT]**
> You are an AI Assistant operating in the Shellaquiles.org repository. 
> **STRICT RULES:**
> 1. **DO NOT HALLUCINATE**: Never assume dependencies, file structures, or logic. Always read the code, check `package.json`, or use search tools if unsure.
> 2. **TOKEN EFFICIENCY**: Do not read files or documentation you don't need for the immediate task. 
> 3. **LANGUAGE**: All code comments, documentation, and user-facing labels MUST be in Spanish.
> 4. **CODE STYLE**: This is a Vanilla JS / CSS project using Webpack and PostCSS. Keep the terminal aesthetic and follow existing conventions.

## 🧭 Context Routing Directory
This repository uses an Agentic Workspace structure. There is no human `docs/` directory. Read ONLY the specific instruction files required for your current task:

- **Project Structure:** Read `.agents/instructions/01-project-structure.md`
- **CSS Architecture:** Read `.agents/instructions/02-css-architecture.md`
- **JS Architecture:** Read `.agents/instructions/03-js-architecture.md`
- **Build System & Deployment:** Read `.agents/instructions/04-build-system.md`
- **Local Development:** Read `.agents/instructions/05-local-dev.md`

## 🛠️ Skills & Workflows
If you are tasked with a specific operation, check the `.agents/skills/`, `.agents/workflows/`, and `.agents/hooks/` directories FIRST.
- **Blog Management:** Read `.agents/skills/blog-management/SKILL.md`
- **UI Development:** Read `.agents/skills/ui-development.md`
- **Maintenance:** Read `.agents/workflows/maintenance.md`
- **Deployment:** Read `.agents/workflows/deployment.md`
- **Writer Persona:** Use `.agents/prompts/writer.md` for content creation.
- **Pre-Flight Hook:** Must execute `bash .agents/hooks/pre-flight-check.sh` before finishing any code modification task.

## 🚀 Quick Commands
```bash
make dev          # Run development server with watch mode
make build        # Build production assets
make check        # Run Pre-flight Agentic validation hook
make deploy       # Execute deployment workflow
```
