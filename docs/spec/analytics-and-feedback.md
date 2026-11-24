# Analytics and feedback

What Agentcraft measures about visitors and Learners, with which tool, how real-visitor speed is tracked, and how Learners give feedback. Decided in [Decide analytics and feedback](https://github.com/mc2068/AgentCraft/issues/17). Terms are defined in [CONTEXT.md](../../CONTEXT.md); the stack is in [architecture.md](architecture.md); speed targets are in [accessibility-and-performance.md](accessibility-and-performance.md). See [ADR 0008](../adr/0008-posthog-cookieless-behind-track.md).

## Tool

**PostHog Cloud, free plan, EU region** (`https://eu.i.posthog.com`), using `posthog-js` in the browser. No server code: the site stays fully static.

Free plan facts this relies on (checked 2026-11-24 on posthog.com): 1M events a month shared by page views, custom events and Web Vitals events; 1 project; 1-year retention; events over the limit are dropped, never billed.

## Privacy

- **Cookieless:** `cookieless_mode: 'always'`. PostHog stores nothing in cookies, `localStorage` or `sessionStorage`, so the site shows **no cookie banner**. "Enable cookieless tracking" must also be turned on in the PostHog project settings, or events are ignored.
- **No people:** `person_profiles: 'never'`; never call `identify()` or `alias()`. A visitor counts as a new visitor each day.
- **Never what a Learner types.** No Off-script reply text, no Skip check answers, no names or emails. Events carry only ids, step numbers and yes/no values (enforced by the event types below).
- **Do Not Track is respected** (`respect_dnt: true`).
- **Off:** session recording, autocapture (clicks and inputs), heatmaps, surveys, feature flags.
- A short plain-English **`/privacy` page** lists what is collected, what is not, and that it is stored by PostHog in the EU. Linked from the footer.

## What we measure

### Comes with PostHog

Page views (on every route change), where visitors came from, country, device and browser.

### Learner events

A fixed list. Adding one means adding it to the type in `lib/analytics` and to this table.

| Event | When | Properties |
|---|---|---|
| `lesson_started` | The Learner plays the first step of a Session replay | `lessonId` |
| `lesson_finished` | The Session replay reaches its end (field notes shown) | `lessonId`, `offScriptCount` |
| `replay_left` | The page is left while a Session replay is part-way through | `lessonId`, `step` |
| `off_script_reply` | The Learner sends an Off-script reply | `lessonId`, `step` |
| `exercise_prompt_copied` | The Learner copies a Hands-on exercise prompt | `lessonId` |
| `skip_check_finished` | The Skip check is submitted | `passed` |
| `calm_mode_on` | The Learner turns Calm mode on from the header | none |
| `case_study_repo_click` | The "see the GitHub repo" link on the Case study is clicked | none |
| `lesson_feedback` | The Learner answers "Was this helpful?" | `lessonId`, `helpful` (true/false) |

`replay_left` is sent on `pagehide` with the beacon transport so it is not lost.

### Real-visitor speed (field Core Web Vitals)

PostHog's **Web Vitals autocapture** (turned on in the project settings, `capture_performance` left on for web vitals, network timing off). Its Web Vitals tab shows LCP, INP and CLS separately per page against the same thresholds as our spec (LCP ≤ 2.5 s, INP ≤ 200 ms, CLS ≤ 0.1). No sampling: PostHog says these add about 30% on top of page views, well inside the free plan.

## Feedback

- **"Was this helpful?"** with 👍 and 👎 at the end of every Lesson, after the field notes. Our own small button that sends `lesson_feedback` once per Lesson visit. (PostHog surveys are off: they don't work in cookieless mode.)
- **"Suggest a fix"** link beside it, opening a pre-filled GitHub issue for that Lesson (title and Lesson id filled in, label `lesson-feedback`).
- No feedback form or inbox of our own. General discussion goes to GitHub Discussions (unchanged).

## How it's built

```
lib/analytics/
  events.ts     the AnalyticsEvent union (the table above), the only events that can be sent
  index.ts      track(event): queues events until PostHog has loaded, then sends them
  posthog.ts    loads and starts posthog-js (dynamic import)
```

```ts
type AnalyticsEvent =
  | { name: 'lesson_started'; lessonId: string }
  | { name: 'lesson_finished'; lessonId: string; offScriptCount: number }
  | { name: 'replay_left'; lessonId: string; step: number }
  | { name: 'off_script_reply'; lessonId: string; step: number }
  | { name: 'exercise_prompt_copied'; lessonId: string }
  | { name: 'skip_check_finished'; passed: boolean }
  | { name: 'calm_mode_on' }
  | { name: 'case_study_repo_click' }
  | { name: 'lesson_feedback'; lessonId: string; helpful: boolean };

function track(event: AnalyticsEvent): void;
```

- Every part of the site calls `track()`; nothing imports `posthog-js` directly. Swapping the tool means changing `lib/analytics` only.
- The replay engine stays free of analytics: the React layer calls `track()` when `ReplayState` changes.
- **Off everywhere except production:** `track()` does nothing unless `NEXT_PUBLIC_VERCEL_ENV` is `production` and `NEXT_PUBLIC_POSTHOG_TOKEN` is set. Local runs, preview builds, Playwright and Vitest never send events.
- Config:

```ts
posthog.init(process.env.NEXT_PUBLIC_POSTHOG_TOKEN, {
  api_host: 'https://eu.i.posthog.com',
  cookieless_mode: 'always',
  person_profiles: 'never',
  respect_dnt: true,
  autocapture: false,
  disable_session_recording: true,
  disable_surveys: true,
  capture_pageview: 'history_change',
});
```

## Loading and budget

- `posthog-js` is loaded **after first paint, when the browser is idle** (`requestIdleCallback`), as its own chunk. It is never part of a route's first-load JS.
- Budget: **analytics chunk ≤ 135 kB gzipped**, checked by size-limit with the other budgets. Measured: `posthog-js` 1.454.2 bundled and minified = 130 kB gzipped.
- Fallback if Lighthouse scores fall below target because of it: switch `lib/analytics/posthog.ts` to `posthog-js-lite` plus the `web-vitals` library (measured 27 kB gzipped together), sending the three speed numbers as our own event. Nothing outside `lib/analytics` changes.

## Using the numbers

- The owner looks at PostHog **once a month**: Web Vitals tab, Lesson start-to-finish rate, where Learners leave replays, and 👎 Lessons.
- If a speed number is past its target at the 75th percentile, open an issue to fix it.
- Analytics never blocks a pull request; the checks in [accessibility-and-performance.md](accessibility-and-performance.md#checks) do that.

## Setup steps (owner, once)

1. Create a PostHog Cloud account in the **EU** region and one project.
2. In project settings: turn on cookieless tracking and Web Vitals autocapture; leave session replay, autocapture and heatmaps off.
3. Add `NEXT_PUBLIC_POSTHOG_TOKEN` to the Vercel project (Production only).

## Not in v1

PostHog's reverse proxy (to get past ad blockers), dashboards shared publicly, A/B tests, session replays.
