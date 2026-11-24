# Pull requests

Every PR body follows the `/mattpocock-skills:pr` template. If the skill isn't installed, follow this copy.

```markdown
## Summary
<diagram, diff-sketch, or tree>

## Evidence
- **Before:** <screenshot/output/failing test run>
  **After:** <screenshot/output/passing test run>

## Merge Danger
**Door:** <one-way or two-way>
<optional: description>
**Blast Radius:** <one-word description>
<optional: potential ramifications of merge>
```

## Rules

- Skip preambles and keep prose brief. Use the domain language from `CONTEXT.md`.
- Do not add a "Generated with Claude Code" line or a session link to the PR body.
- **Summary:** pick the smallest view that makes the key point clear: pseudocode for logic, a call tree for runtime flow, a component tree for UI, a shallow file tree for file responsibility or broad refactors, Mermaid for interaction or data flow, or a `diff` block when the point is what changes in an existing shape. Show a whole block when most of it is new. Put each visual next to the short text it supports. Use one or several, not all.
- **Evidence:** concrete proof the change works, before and after. Screenshots are best for visual changes; next best is execution evidence (test results, console output). Show the exact test that now fails then passes, in pseudocode.
- **Merge Danger:** a one-way door is destructive or hard to reverse; a two-way door is cheap to roll back. Blast radius is the potential impact, e.g. layout shift, breakage for consumers, mobile responsiveness.

Credit: adapted from Dex Horthy / Humanlayer's show-me skill.
