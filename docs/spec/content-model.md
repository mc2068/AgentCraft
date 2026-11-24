# Content model

How Agentcraft stores Lessons. Decided in [Define the lesson content model](https://github.com/mc2068/AgentCraft/issues/10). Terms are defined in [CONTEXT.md](../../CONTEXT.md). A complete worked example lives in [`examples/content/`](examples/content/).

## Layout

```
content/
  capabilities.yaml            # every Capability, defined once
  skip-check.yaml              # Skip check questions, each tied to a Capability
  foundations/                 # one folder per Track
    01-tidy-a-messy-folder/    # one folder per Goal, numbered for order
      goal.yaml                # Goal title, Persona(s), order
      02-sort-and-rename/      # one folder per Lesson, numbered for order
        lesson.mdx             # frontmatter + short text around the replay
        replay.yaml            # the Replay script
        take/                  # the Take behind it and saved docs copies; see recording.md (ignored by the loader)
  advanced/
    ...
```

## `lesson.mdx` frontmatter

| Field | Type | Notes |
|---|---|---|
| `title` | string | Shown as the Lesson heading |
| `track` | `foundations` \| `advanced` | Must match the folder |
| `goal` | string | Goal folder id |
| `order` | number | Position within the Goal |
| `lens` | `desktop` \| `terminal` | One Lens per Track in v1 (ADR 0002) |
| `capability` | string | Id from `capabilities.yaml` |
| `minutes` | number | Estimated time |
| `verified` | `{ version, date }` | The Verification stamp; written by the take runner, not by hand ([recording.md](recording.md)) |
| `docs` | URL list | Claude Code docs pages this Lesson depends on; used by the Freshness check ([freshness.md](freshness.md)) |
| `watch` | string list, optional | Watch words: commands, settings or feature words the Lesson teaches; the Freshness check looks for them in the Claude Code changelog |
| `status` | `draft` \| `published` | Drafts are not built into the site |

The MDX body is short: optional intro and outro text. The Session replay, field notes and Hands-on exercise are rendered from `replay.yaml` and the frontmatter.

## `replay.yaml`: the Replay script

Top level:

- `world`: which Live view this Lesson uses, one of `folder`, `spreadsheet`, `document`, `webpage` (v1). Plus `start`: the World's starting data.
- `steps`: an ordered list. Each step is exactly one of:

| Step | Fields | What happens |
|---|---|---|
| `guide` | text | The Guide (Wren) speaks in the side panel |
| `you` | `ask`, `real`, `options`, `typed`, `fallback` | The Learner's turn (a Decision pause). Or just `auto`: a scripted human message the Learner doesn't choose |
| `claude` | text | Claude replies, with a typing indicator |
| `tool` | `name`, `text` | Claude uses a tool; shown as a tool card |
| `permission` | `text`, `real`, `options` | Claude asks permission; the Learner answers (a Decision pause) |
| `world` | state name | The Live view moves to a named state |
| `end` | `takeaways`, `exercise` | Field notes and the Hands-on exercise |

A `you` or `permission` option has `text`, `grade` (`good` \| `ok` \| `risk`), `feedback` (the Steering note), and optionally `claude`: the in-character Claude reply for an Off-script reply. If an option's `text` differs from `real`, the player shows "back to the real session" and the real human's message before continuing.

`typed` rules judge free-typed replies, checked in order; the first match wins:

```yaml
typed:
  - any: [delete, remove]      # matches if any word appears
    grade: risk
    feedback: Deleting is the hardest thing to undo.
    claude: Before I delete anything, can we sort first?
  - all: [folder]              # matches if every word appears
    any: [sort, tidy, type]
    grade: good
    feedback: Clear Goal. Nice.
fallback:                      # when no rule matches
  grade: ok
  feedback: Say which folder and how you want it sorted.
  claude: Sure. Which folder, and how should I sort it?
```

Word lists, not code: matching is case-insensitive on whole words.

## Worlds (Live view types)

Each World is a component that draws named states. The Replay script only names them.

| World | States it understands (v1) |
|---|---|
| `folder` | `unseen`, `looked`, `planned`, `flagged`, `moved`, `rewound` |
| `spreadsheet` | `unseen`, `looked`, `questioned`, `checked`, `charted` |
| `document` | `blank`, `drafted`, `styled`, `reviewed` |
| `webpage` | `blank`, `built`, `previewed`, `improved` |

New Worlds are added only when a Goal needs one.

## Capabilities and Skip check

`capabilities.yaml` holds an id and a "You can now…" sentence per Capability. Lessons and Skip check questions reference Capabilities by id only.

## Validation

All content files are validated against a schema at build time. A missing Capability id, an unknown World state, a `you` step without `real`, or an option without `grade` fails the build. So does any text that matches a secret pattern (see [recording.md](recording.md#cleaning)).
