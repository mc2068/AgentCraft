# Homepage and lesson page prototype (issue #8)

Throwaway. One HTML file, Sage Slate palette, Hanken Grotesk + Newsreader. Switch variants with the bar, the arrow keys, or the hash.

- `#home-goals`: **A Start with a goal.** Plain promise, goal cards with the Capability each gives, how a lesson works, Capability map preview, Advanced teaser, paid-plan note.
- `#home-play`: **B Play the first minute.** The hero *is* the first Decision pause of lesson 2: pick a reply, get Claude's answer and Wren's Steering note, then continue into the lesson.
- `#home-guide`: **C Field guide.** Editorial: big serif promise, a table of contents (Part one Foundations, Part two Advanced), Wren and the plan note in the margin, Verification stamp up front.
- `#lesson-focus`: **L1 One column.** Title, Verification stamp, "After this lesson" Capability line, short intro, the replay behind a "Take the human's seat" cover, then field notes, Try it yourself, next lesson.
- `#lesson-rail`: **L2 With a goal rail.** Same content plus a sticky side rail: the Goal's lessons, the Capability it gives, and in-lesson links.

The replay itself is the locked player from `prototypes/replay-player/`; "Play the replay" opens it.

Styling is plain CSS with tokens, written the way Tailwind + shadcn/ui would compose it (cards, buttons, pills), to confirm that base.
