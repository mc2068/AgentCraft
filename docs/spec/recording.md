# Recording Session replays

How the real sessions behind Session replays are recorded, cleaned, turned into Replay scripts and kept current. Decided in [Decide how Session replays are recorded and kept current](https://github.com/mc2068/AgentCraft/issues/14). Terms are defined in [CONTEXT.md](../../CONTEXT.md). Replay scripts follow [content-model.md](content-model.md). The main trade-off is recorded in [ADR 0007](../adr/0007-replays-recorded-through-a-take-runner.md).

## The short version

1. The owner records every **Take** on a fake **Starting folder** kept in the repo.
2. A small **take runner** script sends each human message to Claude Code, answers permission requests as told, and saves a cleaned recording.
3. A project skill, `/author-replay`, drafts the Replay script's extras. The owner reviews and edits them.
4. Off-script replies are real: the runner branches the session at that turn and keeps Claude's answer.
5. A **Re-take** plays the same human messages again on a fresh copy of the Starting folder and shows what changed.

Target cost: about 2 hours of the owner's time per Lesson (about 20 minutes recording, about an hour reviewing drafts). For 21 Lessons, that is about 40 hours.

## Files

Each Lesson folder gains a `take/` folder. The content loader ignores it; only the tools in `scripts/take/` read it.

```
content/foundations/01-tidy-a-messy-folder/02-sort-and-rename/
  lesson.mdx
  replay.yaml
  take/
    take.yaml          # the owner's inputs: setup, human turns, permission answers
    start/             # the Starting folder: fake files only, committed
    recording.json     # the cleaned recording, written by the runner, committed

.takes/                # raw output and per-turn snapshots, gitignored, never committed
```

`take.yaml` (sample in [`examples/content/.../take/take.yaml`](examples/content/foundations/01-tidy-a-messy-folder/02-sort-and-rename/take/take.yaml)):

| Field | Notes |
|---|---|
| `shown_as` | The path the Learner sees for the Starting folder, such as `~/Downloads`. Real paths are replaced with it. |
| `setup.model` | `default` or an alias. Never a pinned version number. |
| `setup.permission_mode` | The mode a new Learner with this Lesson's Lens starts in. |
| `turns` | One entry per human turn: `say` (the message) and `answers`: the permission answers during that turn, in order. Each is `allow`, `deny`, or `deny: <message>` (deny and tell Claude what to do instead). |

## Recording a Take

`take record <lesson>` copies `take/start/` into a fresh temporary folder, then loops:

1. The runner asks the owner for the next human message in the terminal (or reads it from `take.yaml` when it already exists).
2. It sends the message with `claude -p --resume <session> --output-format stream-json`, with the setup from `take.yaml`. The `stream-json` output is the format Claude Code documents for scripts. Its saved session files are not used, because the [sessions docs](https://code.claude.com/docs/en/sessions) call their format internal and say it changes between versions.
3. Permission requests go to a tiny permission tool (`--permission-prompt-tool`). The tool records each request and answers it from the turn's `answers`, or asks the owner and saves the answer.
4. Before each human turn, the runner saves a snapshot of the session file and the folder in `.takes/`. Off-script replies branch from these snapshots.
5. The runner writes the human turn to `take.yaml`, cleans the output, and appends it to `recording.json`.

The runner records the Claude Code version (`claude --version`) and the date in `recording.json`. Those become the Lesson's Verification stamp, so nobody types them by hand.

Takes use the setup a new Learner gets. When a Lesson teaches a permission mode, the switch happens inside the recorded session, so the Learner sees it. Both Lenses use this one pipeline, because the Learner sees the replay in Agentcraft's own player, not in a terminal or desktop window.

## Cleaning

The runner cleans everything before writing `recording.json`:

- the real working path becomes `shown_as`
- the machine's username, home path and host name are removed
- email addresses are replaced with `you@example.com`
- anything matching a key or token pattern (Anthropic, GitHub, AWS, generic `key=`/`token=` values) is replaced with `[removed]`

The Starting folder holds fake files only, so there should be nothing private to remove. Cleaning is the safety net. The content loader runs the same pattern check over all of `content/` at build time, and a match fails the build.

## Authoring the extras: `/author-replay`

A project skill in `.claude/skills/author-replay/` reads `recording.json` and drafts or updates `replay.yaml`:

- the `you`, `claude`, `tool` and `permission` steps, with `real` set to what was actually said
- 2 to 3 suggested replies per Decision pause, each with a `grade` and a Steering note
- `typed` word rules and a `fallback` for free-typed replies
- Guide lines and `world` states
- the field notes and the Hands-on exercise

The owner reviews and edits the draft. The skill only drafts and never publishes: the Lesson stays `status: draft` until the owner changes it.

## Off-script replies

`take offscript <lesson>` runs after the extras exist. For each option whose `text` differs from `real` (and the `fallback`), it:

1. copies the snapshot taken before that human turn into a throwaway folder
2. runs `claude -p --resume <snapshot> --fork-session` with the option text, with the tools that change files turned off
3. keeps Claude's first reply, cleaned, as the option's `claude`

When the real reply is too long to trim to one message, the owner writes a short one in the same voice. The `claude` field is free text either way, so the player does not know or care which it is.

## Re-takes: keeping a Lesson current

`take redo <lesson>` plays every `say` and `answers` from `take.yaml` again, on a fresh copy of the Starting folder, with the current Claude Code. Then it:

1. writes a new `recording.json` and shows the diff against the old one
2. re-runs the off-script branches
3. keeps every authored extra. Extras belong to human turns, so they survive. The runner lists the Decision pauses whose following Claude reply changed, and `/author-replay` re-drafts only those
4. updates the Verification stamp from the new run

The owner reviews the diff and the flagged pauses, then commits.

Deciding *when* a Lesson needs a Re-take is still open (the map's "Freshness automation" item). It will likely use each Lesson's `docs` links and Verification stamp age. This spec only defines what a Re-take does.

## Tools in the repo

```
scripts/take/                  take runner (TypeScript, run with `npm run take -- <command>`)
  record.ts  offscript.ts  redo.ts  clean.ts  permission-tool.ts
.claude/skills/author-replay/  the drafting skill
```

`clean.ts` and the parsing of `stream-json` have unit tests with fixture recordings, like the engine.
