# The replay engine has no UI framework

The logic that plays a Session replay lives in `engine/` as plain TypeScript with no React or DOM: it takes a Replay script and the Learner's actions and returns the next state. The React layer only draws that state and handles timing. We chose this so every Replay script can be played end to end in fast unit tests, so redesigns never touch the logic, and so the engine could later power other surfaces (an embed, a slide mode) unchanged.
