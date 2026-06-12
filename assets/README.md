# Assets

This directory is reserved for visual assets: diagrams, screenshots, and exported images for the SuccessOS AI project.

## Planned Assets

| File | Description | Status |
|------|-------------|--------|
| `architecture-diagram.png` | System architecture diagram (exported from diagrams/architecture.md) | Pending |
| `signal-to-action-loop.png` | Signal-to-action loop visual | Pending |
| `agent-autonomy-levels.png` | Agent autonomy levels diagram | Pending |
| `screenshot-dashboard.png` | Prototype dashboard screenshot | Pending |
| `screenshot-account-detail.png` | Prototype account detail screenshot | Pending |
| `screenshot-actions.png` | Prototype actions panel screenshot | Pending |
| `screenshot-feature-impact.png` | Prototype feature impact screenshot | Pending |

## Usage

Reference these assets in README files and documentation using relative paths:

```markdown
![Architecture](../assets/architecture-diagram.png)
```

## Export Instructions

Mermaid diagrams can be exported as PNG using:
- The Mermaid Live Editor (mermaid.live)
- VS Code with the Mermaid extension
- The `mermaid-cli` package: `npx mmdc -i diagram.md -o output.png`
