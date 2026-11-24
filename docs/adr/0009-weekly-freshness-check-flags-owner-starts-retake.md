# A weekly check flags stale Lessons; the owner starts each Re-take

A scheduled GitHub Action checks every published Lesson once a week and opens one issue per Lesson that may be out of date: when a docs page in its `docs` list changed, when a Claude Code changelog line since its verified version mentions one of its Watch words, or when its Verification stamp is more than 90 days old. It never re-records on its own. The owner adds a `retake` label to start a Re-take in Actions, which opens a draft pull request. We chose this over re-taking on every Claude Code release or on every flag because Claude Code ships about 27 releases a month and a Re-take uses the owner's Claude plan and needs the owner's review anyway. The cost is that a flagged Lesson stays as it is until the owner acts; the Verification stamp on the page keeps that honest. Details in `docs/spec/freshness.md`.

## Considered options

- **Re-take every Lesson on each release.** Always current, but far too much plan usage and review for ~27 releases a month.
- **Re-take automatically when flagged.** Less work for the owner, but spends plan usage without a person deciding, and false alarms (a typo fixed on a docs page) would each cost a full Re-take.
- **Age only.** Simplest, but misses a renamed command for up to 90 days.
