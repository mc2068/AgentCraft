# Session replays, not a simulated terminal

Most competing Claude Code learning sites use a fake terminal simulator as their main interactivity. We decided not to: simulators teach keystrokes, can't show what matters (Claude reading files, planning, asking permission), and make us look like everyone else. Interactivity instead comes from Session replays of real sessions, which the Learner plays from the human's seat (they write or pick the human's messages, answer Claude's permission requests, and get one in-character Claude reply when they go off-script before the replay rejoins the real session), Hands-on exercises run in the Learner's own Claude Code, and a few Explorables. This reverses an earlier charting decision to build simulated-terminal exercises.

## Consequences

- We need a way to capture, clean and maintain real session recordings.
- Learners need a paid claude.ai plan to follow along: Agentcraft teaches using Claude Code, so Hands-on exercises are core, not optional. The plan requirement is stated up front on the homepage and in the first Lesson.
- Each Session replay needs more than a transcript: suggested replies per human turn, an in-character Claude reply for each off-script option, keyword checks for free-typed replies, Guide feedback, and Live view states. Prototyped in issue #9 (`prototype/replay-player` branch, `final.html`).
