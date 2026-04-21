# Workspace Maintenance Workflow

> **[SYSTEM PROMPT]**
> This file dictates how to maintain the Agentic Workspace (`.agents/`).

## Principles
1. **DRY (Don't Repeat Yourself)**: The `.agents/` structure is the single source of truth for the AI's operational rules.
2. **No Human Docs**: The human `docs/` folder has been fully deprecated and removed. All architectural and operational knowledge resides directly in the `.agents/` structure as System Prompts and Agent Rules.

## Updating Rules
If the architecture of the project changes (e.g., adding a new tool, moving directories):
1. **Locate the specific Instruction**: Update the relevant `.agents/instructions/` file. Do NOT create duplicate files.
2. **Update the Prompt**: Ensure the new rules are stated as strict commands (`DO NOT`, `MUST`, etc.) for future agent sessions to understand.
3. **No Redundancy**: Do not add information to `README.md` if it belongs in an Agent Instruction. `README.md` should just point to `.agents/README.md` or `AI.md` for AI context.
