# Architecture

How the Agentcraft site is built. Decided in [Decide the technical architecture](https://github.com/mc2068/AgentCraft/issues/11). Goals from the owner: **scale easily** and **stay easy to maintain**. Terms are defined in [CONTEXT.md](../../CONTEXT.md); content files follow [content-model.md](content-model.md).

## Shape

One Next.js app (App Router, TypeScript strict), deployed on Vercel.

```
app/            routes: home, track, goal, lesson, capability map, skip check, case study
components/     React UI: chat, Guide panel, Worlds, field notes, design system
engine/         replay engine: plain TypeScript, no React, no DOM
content/        Lessons, Replay scripts, capabilities.yaml, skip-check.yaml
lib/content/    content loader + schemas
lib/progress/   ProgressStore interface + browser implementation
lib/analytics/  typed track() + PostHog loader (analytics-and-feedback.md)
styles/         design tokens (Sage Slate, fonts)
tests/          Playwright end-to-end tests
scripts/take/   take runner: records and re-takes Session replays (recording.md)
.claude/        project skills, hooks and the lesson-reviewer subagent (proof-of-mastery.md)
.github/        CI workflows, Claude lesson review, PR template
```

## Serving: static first

Every page is generated at build time (static generation). Vercel serves the output from its CDN, so traffic growth does not need servers or code changes. The only client-side code is the interactive parts: the replay player, the Capability map and the Skip check. See [ADR 0004](../adr/0004-static-site-own-content-loader.md).

## Content pipeline

`lib/content` reads `content/` at build time, parses MDX frontmatter and YAML, validates everything with schemas (Zod), resolves Capability ids, and returns typed data to the routes. Any validation error fails the build. No third-party content framework.

## Replay engine

`engine/` runs a Replay script. It is a pure state machine with a small interface:

```ts
type ReplayState = {
  log: Entry[];            // what has happened so far (messages, tool cards, feedback, rejoin markers)
  pending: Pending | null; // the Learner's current turn or permission request, if any
  world: string;           // current World state name
  guide: string | null;    // the Guide's current line
  done: boolean;
  calls: Grade[];          // the Learner's graded calls, for the field notes
};

start(script: ReplayScript): ReplayState
choose(state, optionIndex): ReplayState   // pick a suggested reply or permission answer
type(state, text): ReplayState            // free-typed reply, judged by the script's word rules
advance(state): ReplayState               // move past non-interactive steps
```

The React layer only renders `ReplayState` and handles timing (typing indicator, delays, reduced motion). Because the engine has no UI, every Replay script can be played end to end in unit tests. See [ADR 0005](../adr/0005-framework-free-replay-engine.md).

## Worlds

One React component per World (`folder`, `spreadsheet`, `document`, `webpage`). Each takes the Lesson's `start` data and the current state name and draws it. Adding a World means adding one component and its state list to the schema.

## Progress and future accounts

```ts
interface ProgressStore {
  getCapabilities(): Promise<string[]>;
  completeLesson(lessonId: string, calls: Grade[]): Promise<void>;
  getLessonResult(lessonId: string): Promise<LessonResult | null>;
  passSkipCheck(capabilityIds: string[]): Promise<void>;
}
```

v1 ships one implementation backed by `localStorage` (with a safe fallback when storage is unavailable). Accounts later = a second implementation, no page changes. See [ADR 0006](../adr/0006-progress-behind-progressstore.md).

## Styling

Tailwind CSS. Sage Slate colours, Hanken Grotesk and Newsreader are design tokens defined once in `styles/`. shadcn/ui provides accessible primitives (tabs, dialogs, buttons), restyled with the tokens.

## Search

Pagefind builds a static search index after the site build; search runs in the browser with no server.

## Quality

- TypeScript strict, ESLint, Prettier.
- Vitest: engine tests, content validation tests, and a test that plays every Replay script's real path.
- Playwright: one end-to-end test that plays a full Lesson in a real browser, on desktop and phone sizes.
- Accessibility, Lighthouse, code-size and contrast checks: see [accessibility-and-performance.md](accessibility-and-performance.md#checks).
- GitHub Actions runs all checks on every pull request; Vercel builds a preview per pull request; `main` deploys to production.

## Not decided here

The freshness job is still in the map's "Not yet specified" section. Analytics and feedback are in [analytics-and-feedback.md](analytics-and-feedback.md). Accessibility and performance targets are in [accessibility-and-performance.md](accessibility-and-performance.md).
