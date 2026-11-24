# Homepage and lesson page prototype (issue #8)

Throwaway. One HTML file, Sage Slate palette, Hanken Grotesk + Newsreader. Switch variants with the bar, the arrow keys, or the hash.

- `#home-goals`: **A Start with a goal.** Plain promise, goal cards with the Capability each gives, how a lesson works, Capability map preview, Advanced teaser, paid-plan note.
- `#home-play`: **B Play the first minute.** The hero *is* the first Decision pause of lesson 2: pick a reply, get Claude's answer and Wren's Steering note, then continue into the lesson.
- `#home-guide`: **C Field guide.** Editorial: big serif promise, a table of contents (Part one Foundations, Part two Advanced), Wren and the plan note in the margin, Verification stamp up front.
- `#lesson-focus`: **L1 One column.** Title, Verification stamp, "After this lesson" Capability line, short intro, the replay behind a "Take the human's seat" cover, then field notes, Try it yourself, next lesson.
- `#lesson-rail`: **L2 With a goal rail.** Same content plus a sticky side rail: the Goal's lessons, the Capability it gives, and in-lesson links.

The replay itself is the locked player from `prototypes/replay-player/`; "Play the replay" opens it.

Styling is plain CSS with tokens, written the way Tailwind + shadcn/ui would compose it (cards, buttons, pills), to confirm that base.

## Round 2: combined direction with motion (`round2.html`)

Built after research note 010. One page with two views (`#home`, `#lesson`):

- **Home:** B's playable first Decision pause is the hero (pick or type a reply), then persona doors that highlight matching goals, A's goal cards with Capability lines, how a lesson works, the Capability map, C's serif voice, Wren's quote, the plan note and the Advanced teaser.
- **Lesson:** the L2 goal rail folds away while the replay plays (L1 below 1100 px). "Continue this lesson" from the hero carries your first reply into the lesson.
- **Signature moments working:** bubbles arriving with a typing indicator, staggered options, a docked permission card, Wren's sprite reactions (talk, nod, tilt, hat tip) with CSS `steps()`, highlighted reply plus Steering note, folder tiles sorting themselves into folders (FLIP with the Web Animations API), the "Skill gained" check drawing in, field notes unlocking, the Capability map filling once when you return home, a goal-card → lesson title morph (View Transitions), step dots stretching into a pill, a reading-progress line (scroll-driven CSS), and press feedback on buttons.
- **Calm mode** (nav switch or bar) and `prefers-reduced-motion` turn movement into short fades and remove the typing delay.

Plain CSS + Web Animations here; the real build would use Motion for React inside the replay island (note 010, section 4.4).
