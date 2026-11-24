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

## Round 3: pixel world + agent journey (`round3.html`)

The owner asked to combine two ThreeUI landing pages: "Agentic" (a pixel-art landscape hero, interactive product panels, then a story) and "Agent AI" (a dark page where an intent prompt becomes a five-phase agent journey, then products, use cases, FAQ and community). The pages themselves were blocked from this session, so this is built from ThreeUI's own descriptions of them, with original code and art. No ThreeUI code is copied.

- **Hero:** a Sage Slate pixel landscape drawn with Canvas 2D (hills, pines, a ranger cabin with smoke, drifting clouds, birds, Wren waving), slight parallax on mouse move. A "What do you want Claude to help with?" prompt plus example chips.
- **One request, five steps:** a dark section. Your request (or an example) becomes Ask, Look, Plan, Decide, Act and check, with Wren walking the trail between steps and a small visual per step for your goal (folder, spreadsheet, page or document).
- **Inside every lesson:** four tabbed panels (Session replay, Live view, Wren, Skills).
- Goals with persona filters, Advanced, "Built in the open" with counters, FAQ with smooth open, a pixel ground strip in the footer.
- No three.js: 0 kB of libraries. The world pauses off-screen and freezes in Calm mode or reduced motion.

## Round 4: real 3D, desktop first (`round4.html`)

The owner wanted real 3D ("attractive, premium and unique") and said most learners will use a computer, so desktop comes first. This round keeps round 3's page and replaces the hero with a three.js voxel island. It borrows ideas, not code or art, from the two ThreeUI pages once they could be loaded: time of day, paper grain, hand-drawn underlines and seals from "Agentic"; huge stacked statement type, labels pinned to the 3D object and a scroll-driven five-phase story from "Agent AI".

- **Hero island:** a floating Sage Slate island with pines, a cabin, a lantern, a voxel Wren and 24 file cubes. Ask for something (or pick a chip) and the files arrange themselves into folders, a bar chart, a page or a document, with a "Task completed" card over Wren. Drag to turn it, click Wren, "Mess it up" to reset.
- **Time of day:** Morning, Day, Dusk and Night, set from the visitor's clock. The light, the sky and the page behind the island change; at night the windows and the lantern glow and stars come out.
- **Pinned labels:** Your files, Wren, Undo and Permission labels follow points on the island as it turns.
- **Ask. Decide. Check.:** a large statement that lights up word by word.
- **Five steps on the island:** a pinned section at night. Scrolling walks through Ask, Look (a light passes over the files), Plan (outlines show where each file will go), Decide (Claude waits for you) and Act and check (the files move). The camera moves closer on the files for the middle steps. The step tabs can be clicked.
- **Cost:** three.js r187, tree-shaken and inlined, about 142 kB gzipped. Each island renders only while on screen. Phones get a lighter version (no shadows, no idle motion, no labels), and Calm mode or reduced motion makes every change instant.
- Source for the island: `island-src/island.js` (bundled with esbuild as an IIFE named `AgentIsland`).
