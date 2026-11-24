# Accessibility and performance

The accessibility and speed targets every Agentcraft page must meet, and the checks that enforce them. Decided in [Set accessibility and performance budgets](https://github.com/mc2068/AgentCraft/issues/15). Terms are defined in [CONTEXT.md](../../CONTEXT.md); the stack is in [architecture.md](architecture.md); motion rules come from [research 010](../research/010-homepage-lesson-page-and-motion.md).

## Accessibility

### Target

**WCAG 2.2 level AA on every page.** No exceptions for the homepage or the Player.

### Keyboard

- Everything works without a mouse, in a sensible tab order, with a visible focus ring.
- The Player keeps its keys: space (play/pause), arrow keys, `[` and `]` (previous/next step). Keyboard actions are never animated (research 010, section 5.2).
- The 3D island's canvas never takes focus. Every real control on it (the request box, its buttons, the five story steps) is a normal HTML control you can tab to.
- Anything done by clicking or dragging the Guide (Wren) also has a plain button that does the same thing.
- Opening a dialog or the permission card moves focus into it; closing it returns focus to where the Learner was.

### Screen readers

- The 3D island canvas is `aria-hidden`. Beside it, one short visually hidden sentence says what the scene shows.
- The five-step homepage story is real headings and text in the page. The 3D only illustrates it, so nothing is lost when it is hidden.
- In a Session replay, new chat messages, Steering notes and Live view changes are announced through a polite live region, one at a time, never interrupting the reader.
- Pinned 3D labels are duplicated as real text, not read twice (the 3D copies are `aria-hidden`).

### Colour contrast

- All four time-of-day themes (Morning, Day, Dusk, Night) pass AA: **4.5:1** for body text, **3:1** for large text, controls, focus rings and icons.
- Labels pinned over the 3D scene sit on a solid card, so their contrast never depends on what is behind them.
- A unit test checks every text/background token pair in all four themes (see [Checks](#checks)).

### Calm mode

- Calm mode lives in the **site header**, works on every page, and is remembered in the browser.
- It starts **on** when the system asks for less motion (`prefers-reduced-motion: reduce`); the Learner can still change it.
- With Calm mode on: all transitions are instant or short fades (≤ 150 ms opacity or colour only), the Player's typing delay is off, Wren stops blinking, the island holds still, and the 560vh scroll-pinned story becomes normal sections with no pinning.

## Performance

### Core Web Vitals

Google's "good" thresholds, at the 75th percentile, on both a mid-range laptop and a mid-range phone:

| Metric | Target |
|---|---|
| LCP (main content shown) | ≤ 2.5 s |
| INP (response to a click or key) | ≤ 200 ms |
| CLS (layout shift) | ≤ 0.1 |

The homepage LCP element is the headline text, never the 3D island.

### Lighthouse (mobile profile)

| Page type | Minimum performance score | Accessibility score |
|---|---|---|
| Text pages (Goal, Track, Case study) | 90 | 100 |
| Lesson page | 90 | 100 |
| Homepage | 80 | 100 |

### JavaScript budgets

First-load JS per route, gzipped:

| Route | Budget |
|---|---|
| Text pages | ≤ 120 kB |
| Lesson page | ≤ 200 kB, of which motion ≤ 35 kB |
| Homepage, before the island | ≤ 120 kB |
| Homepage island chunk (three.js + scene) | ≤ 170 kB extra, loaded after the page shows |
| Analytics chunk (PostHog), every route | ≤ 135 kB extra, loaded when the browser is idle after the page shows ([analytics-and-feedback.md](analytics-and-feedback.md#loading-and-budget)) |

### When the 3D island loads

- Only after first paint, when the browser is idle (`requestIdleCallback`) and the island is on screen (`IntersectionObserver`). It renders only while on screen.
- A **still picture of the island** is always in the page first, at a fixed size, so nothing shifts when the 3D swaps in.
- The still picture stays (no three.js download) when WebGL is unavailable, Save-Data is on, or the connection is very slow (`effectiveType` of `slow-2g`, `2g` or `3g`).
- Phones get the lite island. Calm mode keeps the island but holds it still.

### Fonts

- Self-hosted with `next/font`, Latin subset only, about two weights per family (Hanken Grotesk and Newsreader).
- A size-adjusted fallback font is matched to each, so text does not jump when the real font arrives.
- Total font download **≤ 100 kB**.

## Checks

Every pull request runs these in GitHub Actions. Any failure blocks the merge.

| Check | Tool | Fails when |
|---|---|---|
| Accessibility scan | axe via Playwright, one page per page type, in Day and Night themes | Any "serious" or "critical" violation |
| Lighthouse | Lighthouse CI on the homepage, one Lesson and one text page (mobile profile) | Any score below the tables above |
| Code size | size-limit (or Next build stats) per route | Any route over its JS budget, or fonts over 100 kB |
| Keyboard path | Playwright plays one full Lesson using only the keyboard | The Lesson cannot be finished |
| Contrast | Vitest test over the colour tokens of all four themes | Any pair below its AA ratio |

Before launch, and after any big change to the Player or homepage, the owner does one manual pass with a real screen reader (VoiceOver) using a short written checklist kept in `docs/`.

Real-user speed data (field Core Web Vitals) comes from PostHog's Web Vitals autocapture: see [analytics-and-feedback.md](analytics-and-feedback.md#real-visitor-speed-field-core-web-vitals).
