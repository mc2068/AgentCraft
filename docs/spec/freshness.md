# Freshness: when a Lesson needs a Re-take

How Agentcraft notices that a Lesson may be out of date and how its Re-take gets started. Decided in [Decide when Lessons need a Re-take](https://github.com/mc2068/AgentCraft/issues/19). Terms are defined in [CONTEXT.md](../../CONTEXT.md). What a Re-take *does* is in [recording.md](recording.md#re-takes-keeping-a-lesson-current). See [ADR 0009](../adr/0009-weekly-freshness-check-flags-owner-starts-retake.md).

## The short version

1. A **Freshness check** runs every Monday in GitHub Actions (and by hand when needed).
2. It flags a Lesson when **a docs page it depends on changed**, **a Claude Code update mentions one of its Watch words**, or **its Verification stamp is more than 90 days old**.
3. Each flagged Lesson gets **one GitHub issue** saying why. Nothing is re-recorded on its own.
4. The owner adds the **`retake` label** to that issue. GitHub Actions runs `take redo` and opens a **draft pull request** with the diff. The owner reviews and merges.

Claude Code ships about 27 releases a month (research 002), so re-taking on every release would cost too much plan usage and review time. The check is cheap (it only downloads text); the Re-take is the expensive part, so a person decides when it runs.

## What flags a Lesson

| Signal | How it is checked | Example reason in the issue |
|---|---|---|
| **Docs page changed** | For each URL in the Lesson's `docs` list, download the page's Markdown version (the same URL with `.md`, which the docs serve as `text/markdown`). Compare it with the copy saved when the Lesson was last verified. Blank-line and whitespace changes are ignored. | `desktop` docs page changed (diff below) |
| **Watch word in a Claude Code update** | Read `CHANGELOG.md` from `anthropics/claude-code`. Take every line from versions newer than the Lesson's `verified.version`. Flag if any line mentions one of the Lesson's `watch` words (case-insensitive, whole word). | 2.1.335: "Renamed `/rewind` to …" matches `/rewind` |
| **Stamp too old** | `verified.date` is more than **90 days** before today. One rule for every Lesson; the two signals above catch fast-moving Lessons sooner. | Last verified 2026-08-01 (115 days ago) |

A page that has moved (redirect) or disappeared (404) also flags the Lesson.

### Watch words

A new optional `lesson.mdx` frontmatter field, `watch`: a short list of command names, setting names or feature words the Lesson teaches.

```yaml
watch:
  - /rewind
  - checkpoint
  - permission mode
```

`/author-replay` suggests them from the Take (every slash command, setting and tool name the human or Claude uses); the owner trims the list. A published Lesson with no `watch` words is allowed but `check-lesson` warns about it.

### Saved docs copies

The check needs something to compare against. When a Re-take (or a first Take) is committed, the runner also saves the Markdown of each `docs` page:

```
content/.../02-sort-and-rename/
  take/
    docs/                  # Markdown of each `docs` page as it was at the last Re-take
      desktop.md
      checkpointing.md
```

The content loader ignores `take/` as before. These copies are committed so the issue can show a real diff and the check stays a pure "compare two files" step.

## What the check does

`scripts/freshness/check.ts`, run with `npm run freshness`:

1. Load every `published` Lesson's `verified`, `docs` and `watch` (through `lib/content`, so the rules match the site).
2. Download the docs pages and the changelog once each.
3. Work out the reasons per Lesson.
4. For each Lesson with reasons, **open or update one issue**:
   - title: `Re-take: <Lesson title>`
   - labels: `freshness`, plus the Lesson id in the body for matching
   - body: each reason, with the docs diff (trimmed to 80 lines) or the matching changelog lines
   - if the issue already exists and is open, update its body; never open a second one
5. Write a short run summary to the Actions log (Lessons checked, flagged, unchanged).

The check never edits `content/` and never runs Claude. It needs only the default `GITHUB_TOKEN` with `issues: write`.

When a Re-take pull request that names the issue (`Closes #n`) is merged, the issue closes, and the next check compares against the new copies and the new stamp.

## Starting a Re-take

Adding the `retake` label to a freshness issue (or to a `lesson-feedback` issue, once the owner has looked at it) starts `.github/workflows/retake.yml`:

1. Install the current Claude Code and read the Lesson id from the issue.
2. Run `take redo <lesson>` (recording.md) with the owner's plan token, the same secret the lesson review uses.
3. Save the new docs copies.
4. Push a branch `retake/<lesson-id>` and open a **draft** pull request that `Closes #n`. The body follows the PR template and lists: the recording diff, the Decision pauses whose Claude reply changed, and the old and new Verification stamp.
5. Remove the `retake` label so it can be added again later.

Only the owner can add labels, so only the owner can spend plan usage. The owner can still run `take redo` on their own computer instead; the result is the same.

If `take redo` fails (Claude Code errors, a permission request the `take.yaml` has no answer for), the workflow comments on the issue with the error and opens no pull request.

## What Learners see

Nothing new. Every Lesson already shows its Verification stamp ("Checked with Claude Code 2.1.330 on 20 Nov 2026"). There is no "may be out of date" banner: it would need the site to know about open issues, which breaks the static-first rule, and the stamp's date already tells the Learner how fresh the Lesson is.

## Feedback is read by a person

👎 votes and "Suggest a fix" issues (`lesson-feedback` label, see [analytics-and-feedback.md](analytics-and-feedback.md#feedback)) never start a Re-take by themselves. The owner reads them in the monthly look and adds `retake` when a Re-take is the right fix.

## Workflows

```
.github/workflows/
  freshness.yml   schedule: Mondays 06:00 UTC; also workflow_dispatch. Runs `npm run freshness`.
  retake.yml      on: issues labeled `retake`. Runs `take redo`, opens a draft PR.
scripts/freshness/
  check.ts        the check above
  docs.ts         download + normalise a docs page, diff against the saved copy
  changelog.ts    parse CHANGELOG.md into { version, lines[] } and match Watch words
```

`docs.ts` and `changelog.ts` have unit tests with fixture files, like `clean.ts`.

## Not in v1

Re-taking on its own without the owner, a public "freshness" page, watching Desktop app release notes separately from `CHANGELOG.md`, and Slack or email alerts (GitHub issue notifications are enough).
