# Session replays are recorded through a take runner, not copied from saved sessions

Every Take is recorded by our own script, which sends the owner's human messages to Claude Code one turn at a time with `claude -p --output-format stream-json` and saves the owner's inputs in `take.yaml`. We do not record in an ordinary interactive session and import Claude Code's saved session files: their format is internal and changes between versions, and an interactive session can't be replayed. We accept that a Take feels less natural to record and that we maintain a small tool. In return, every Lesson can be re-recorded with one command on the same Starting folder, Off-script replies can be real (branched from snapshots of the session), and the Verification stamp is set by the tool rather than by hand.

## Considered options

- **Record interactively, import the saved session file.** Most natural to record, but it depends on an internal format and can't be repeated, so every update means re-recording and re-authoring by hand.
- **Write sessions by hand.** Cheapest, but then replays are no longer real sessions, which goes against ADR 0001.
