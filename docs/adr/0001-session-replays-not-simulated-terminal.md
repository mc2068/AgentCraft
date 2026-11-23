# Session replays, not a simulated terminal

Most competing Claude Code learning sites use a fake terminal simulator as their main interactivity. We decided not to: simulators teach keystrokes, can't show what matters (Claude reading files, planning, asking permission), and make us look like everyone else. Interactivity instead comes from Session replays of real sessions (the signature experience, with Steering notes and Decision pauses), Hands-on exercises run in the Learner's own Claude Code, and a few Explorables. This reverses an earlier charting decision to build simulated-terminal exercises.

## Consequences

- We need a way to capture, clean and maintain real session recordings.
- Hands-on exercises assume the Learner has Claude Code access, so Lessons must still teach something to a Learner who only watches the replay.
