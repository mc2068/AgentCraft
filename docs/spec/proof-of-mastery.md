# How the repo proves Claude Code mastery

What the public repo and the site show an interviewer, and how. Decided in [Design how the repo proves Claude Code mastery](https://github.com/mc2068/AgentCraft/issues/12). Terms are defined in [CONTEXT.md](../../CONTEXT.md).

## The story

> I planned, built and maintain a real product with Claude Code, and you can follow every step.

An interviewer should see *how the owner works with Claude Code*, not a list of features. Every artifact links to the next one: the map (issue #1) leads to the tickets, the tickets to the decisions (`docs/adr/`, `docs/spec/`), the decisions to the pull requests, and the pull requests to the live site.

## Rule: every Claude Code feature does a real job

Nothing goes in the repo just to show a feature. Each item below exists because building or maintaining Agentcraft needs it.

| Feature | In the repo | The job it does |
|---|---|---|
| CLAUDE.md + glossary | `CLAUDE.md`, `CONTEXT.md`, `docs/agents/` | Short, real project rules and the shared vocabulary |
| Skill | `.claude/skills/author-replay/` | Drafts a Replay script's extras from a Take ([recording.md](recording.md)) |
| Skill | `.claude/skills/new-lesson/` | Creates a Lesson folder from its Goal: `lesson.mdx` frontmatter, an empty `replay.yaml`, `take/take.yaml` and a Starting folder |
| Skill | `.claude/skills/check-lesson/` | Before a Lesson goes live: schema check, plays every path of its Replay script through the engine, runs the secret check, then asks the lesson reviewer |
| Hook | `PostToolUse` on `*.ts`, `*.tsx` | Type-checks and lints the edited file right after each edit |
| Hook | `PostToolUse` on `content/**` | Validates the edited Lesson against the content schema |
| Hook | `PreToolUse` on `**/take/recording.json` | Blocks hand edits: recordings only come from the take runner |
| Subagent | `.claude/agents/lesson-reviewer.md` | Read-only reviewer: plain words, the calm mentor tone, brand rules (no Anthropic logos, colours or Claude likeness), and Claude Code facts checked against the Lesson's `docs` links |
| MCP | `scripts/take/permission-tool.ts` | The take runner's permission tool is an MCP tool (`--permission-prompt-tool`) |
| GitHub Actions + Claude | `.github/workflows/lesson-review.yml` | Claude reviews every pull request that touches `content/`, using the lesson reviewer's rules, and comments on it |

The Action runs with a token from the owner's own Claude plan, stored as a repository secret.

## Showing the owner's judgment

The question every interviewer has is "did Claude just do everything?" The answer is visible in three places:

1. **Decision records.** `docs/adr/` and the map's "Decisions so far" record each choice and its trade-off.
2. **Pull requests.** The PR template (`.github/pull_request_template.md`) has three short sections: *What Claude did*, *What I changed and why*, *How I checked it*.
3. **The case study** (below) tells the moments where the owner changed direction.

## How work happens from the build phase on

- Every change starts from a ticket and lands through a pull request. Nothing is pushed straight to `main`.
- CI (GitHub Actions) runs type check, lint, unit tests, Playwright and content validation on every PR; `main` is protected and needs green checks.
- Claude's help stays visible: commits made with Claude Code keep their `Co-Authored-By` line. Being open about it is part of the proof.

## The case study page: "How Agentcraft was built"

A page at `/how-it-was-built`, linked from the footer and the README. Written as a short story, in the same calm voice as the Lessons:

1. **The problem.** Learning Claude Code is hard for non-developers, and existing sites look alike (research 001).
2. **The method.** The map, the grilling questions, the prototype rounds, then the spec. Links to the issues.
3. **Moments the owner changed direction.**
   - Non-developers first, which reversed the developer-first plan.
   - The rename to Agentcraft, after checking the trademark rules.
   - "I want to feel in the conversation", which led to the Learner playing the human's seat.
   - Calm colours, which led to the Sage Slate palette.
4. **The Claude Code setup.** The table above, with links to the real files.
5. **Numbers.** Tickets, pull requests, ADRs, Lessons, and average hours per Lesson. A small script writes them to `content/about/numbers.yaml` before each release, so the build never calls GitHub.
6. **What I'd do differently.** Written by the owner at launch.

It includes **one Session replay of a real moment from building Agentcraft**: a Take recorded during the build, where the owner runs `/author-replay` on a Lesson and corrects its draft. Visitors play the owner's seat, using the same player as the Lessons. The case study's files live in `content/about/` and follow the normal content model.

## README

The README is the first thing an interviewer opens. It starts with:

1. One line on what Agentcraft is, plus the not-affiliated note.
2. The live site link.
3. **How this was built**: a 30-second version of the case study, with links to the map, `docs/spec/`, `docs/adr/`, `.claude/` and the case study page.

Until launch, it links to the map and the specs instead of the live site.

## Repo layout for visitors

Everything lives on `main`:

- `docs/research/`: the research notes (moved from the `research/charting` branch). The owner's reference images are not kept, so no Anthropic artwork is in the repo.
- `prototypes/`: the throwaway prototypes (moved from `prototype/replay-player`), kept as a record of the design rounds and never built into the site.
