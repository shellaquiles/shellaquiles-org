# Agentic Workspace

This directory contains the necessary structure and guidelines for AI assistants operating within the Shellaquiles.org project. It serves as a central hub for context, workflows, and prompts, ensuring that AI-driven operations are consistent, reliable, and strictly adhere to the project's architectural principles.

## Directory Structure

- **`instructions/`**: Contains core documentation acting as system instructions for the AI, routing it to the appropriate context files.
- **`skills/`**: Specific, localized instructions or "skills" that the AI needs to accomplish recurring tasks (e.g., adding a blog post, terminal management).
- **`workflows/`**: Step-by-step procedures for complex multi-stage tasks.
- **`prompts/`**: Reusable prompts| Blog Management | `/.agents/skills/blog-management/SKILL.md` | Post creation and blog updates |
| Terminal Management | `/.agents/skills/terminal-management/SKILL.md` | Browser console CLI and content sync |
- **`custom_agents/`**: Configurations for specialized agents.
- **`mcp/`**: Machine-to-Machine Communication Protocols and related configuration.
- **`hooks/`**: Automated scripts or verification tasks that agents can run to assert correctness (e.g., specific linters, checks).

## Usage

AI models must always start by reading `AI.md` at the project root, which acts as the main dispatcher, routing the AI to the relevant resources within this directory or `docs/`.
