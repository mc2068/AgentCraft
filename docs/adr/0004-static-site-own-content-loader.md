# Static site with our own content loader

Every page is generated at build time and served from Vercel's CDN, so Agentcraft scales with traffic without servers. Content is read by a small loader of our own (Zod schemas over MDX frontmatter and YAML) instead of a content framework or a headless CMS: content frameworks in this space have been abandoned before, a CMS adds cost and a second place to edit, and our content needs custom validation (Replay scripts, Capability ids) anyway.

## Consequences

- Publishing a Lesson means a pull request and a deploy. That is intended: every content change gets review and CI.
- If live features arrive later (accounts), they are added as dynamic routes or server functions beside the static pages, not by converting the site.
