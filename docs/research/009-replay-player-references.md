# 009: Visual references for the Session replay player and the guide character

Researched 2026-11-23. This note collects references for five areas: replay players, margin notes, Decision pauses, guide characters and light editorial style. It then proposes three design directions. Each reference shows whether I **opened** the page (claims come from its text) or only **saw it in search results** (title and URL only, with no visual claims). I could not see images on any page, so this note makes no claims about colours or layouts that the source text doesn't state. Hex values in the three directions are my own proposals, not taken from any source.

## Access log (what worked and what didn't)

| Source | Result |
|---|---|
| **Mobbin** | Two pages opened: the glossary page (`/glossary/tooltip`) and the blog. The screen gallery (`/explore/web/screens/...`) failed with a client error, which is most likely the login wall. |
| **Dribbble** | Search with `allowed_domains: dribbble.com` returns shot titles and URLs. Opening any shot or tag page returned an empty body, because the pages render with JavaScript. **I saw no Dribbble visuals.** |
| **Pinterest** | Search returns pin titles. Opening a pin or board fails with `robots_disallowed`. **I saw no Pinterest visuals.** |
| **Behance** | Search returns project titles. Opening a project fails with a client error. |
| **godly.website** | Now redirects to `recent.design`. The gallery opened, but nothing on it was about education or learning. |
| **Refero** | Only the page metadata loaded ("tens of thousands of screenshots"). The gallery itself is not readable. |
| **Awwwards** | Site pages opened and show the palette hex values. The two learning-adjacent entries I found were weak matches, so I mention them only briefly. |
| **land-book** | Search returned only template-marketplace noise. Nothing usable. |
| **Thumbnail downloads** | **Not possible.** Every `curl` from this sandbox, including to `cdn.dribbble.com` and `example.com`, failed with `CONNECT tunnel failed, response 403` from the egress proxy. `refs/` has no new images. The two existing images in `refs/` are the owner's, and I only read them. |

The product docs, design blogs and case studies below were opened and read, so most of the useful evidence comes from them. The gallery sites mostly could not be opened.

## TL;DR

- **The replay should be event-based, not video.** Scrimba, Khan Academy talk-throughs and Storyteller all replay recorded editor events instead of pixels. Because they do, the learner can pause, inspect and branch at any moment. That matches a Claude Code transcript, where each turn, edit, tool call and permission prompt is already a discrete event. [R4, R5, R6]
- **Decision pauses already exist as a player primitive.** asciinema has timeline markers drawn as dots on the progress bar, jumps between them with `[` and `]`, and a `pauseOnMarkers` option. Storyteller "pauses on comments by default". Copy both: markers for Steering notes, and markers that stop playback for Decision pauses. [R3, R6]
- **Evidence supports "predict, then reveal".** The Distill review of interactive articles reports that predicting before seeing the answer improves self-explanation and recall. It also reports better comprehension with stepped (slideshow) layouts than with scrolling. NYT's *You Draw It* and Brilliant's "question before procedure" are the standard examples. [D1, D3, D4]
- **Brilliant's Koji sets the best current pattern for when a guide speaks.** Koji speaks at the start of every page and points out "what changed… before you try". It never gives the answer. Muting it also hides its bubbles, except for brief correct/incorrect feedback. Brilliant gave Koji a face because students did not want a "generic sparkle button". [G2]
- **Clippy and Mico show what to avoid and what to allow.** Clippy failed because it interrupted without "interpersonal intelligence". Mico is on by default only in voice mode and can be turned off. So the guide should speak at stable moments, stay quiet while the learner scrubs or works, and have a visible off switch. [G4, G5]
- **Margin notes should display by default, have no numbers, and collapse on mobile.** Gwern's survey and Kyle Diaz's margin-notes approach agree on this. Ink & Switch's style guide shows how to attach an aside to a block and nudge it up or down. [M2, M3, M4]
- **Palette caution:** the owner's reference image (beige bubble, brown and orange buttons) sits close to Anthropic's cream `#faf9f5` and terracotta `#d97757`, which note 003 flags as trade dress. Keep the *shape* of that reference (bubble, dot stepper, Next button, pixel character) and move the colours away from cream and orange.

---

## 1. Replay, timeline, scrubber and step-through players

**R1. PostHog session replay** (opened): https://posthog.com/docs/session-replay/how-to-watch-recordings
- **Good:** Controls can float over the recording and show on hover, or be pinned below it. The choice is remembered. An Activity panel lists every event, holding `alt` gives 1 ms fine seeking, and timestamps can show as relative or absolute time. There is a keyboard shortcut for almost everything: C comment, X clip, T cinema mode, F fullscreen. "Skip inactivity" sits in the overflow menu, not in the main controls.
- **Borrow:** Make "pinned controls" the default for learners, because non-developers shouldn't have to hover to find Play. Offer a "cinema mode" that hides the margin notes. Turn idle gaps into a one-tap "skip waiting" setting, so a session where Claude thinks for 40 seconds doesn't drag.

**R2. LogRocket session replay** (opened): https://docs.logrocket.com/docs/session-replay
- **Good:** The time bar works as an activity-density strip: "White represents no activity", and darker shading means more interaction. Events appear as coloured ticks (red lines for errors, purple for tab switches). "Clicking on an event timeline entry will set the current Video Time to that event's time." The list then centres on the nearest event and shows its title in bold.
- **Borrow:** Shade the scrubber by density so the learner can see where things happen. Give each event type its own tick colour (edit, tool call, permission prompt, human message). Make the event list and the playhead two-way: clicking a list row seeks, and playback highlights the current row in bold.

**R3. asciinema player, markers** (opened): https://docs.asciinema.org/manual/player/markers/
- **Good:** "The player displays markers as dots inside the progress bar". Hovering shows the time and label, and clicking seeks. `[` and `]` jump to the previous or next marker. The `pauseOnMarkers` option turns markers into breakpoints.
- **Borrow:** This is the closest thing to a ready-made Decision pause. Steering notes become labelled dots, and Decision pauses become breakpoint dots that halt playback. The `[ ]` keys are worth keeping. asciinema is also a terminal player, and the brief rules out a dark terminal look, so copy the mechanics and not the visual style.

**R4. Scrimba interactive screencasts** (opened interview): https://survivejs.com/blog/scrimba-interview/
- **Good:** "We record the underlying events instead of pixels". Files are about "1% file size of video", the content is searchable, and "you can pause and edit the code at any given time."
- **Borrow:** Store each session as an event log and render it live instead of as video. Text stays crisp and searchable, notes can point at exact events, and a later "try it yourself" fork becomes possible.

**R5. Khan Academy programming talk-throughs** (opened): https://blog.khanacademy.org/our-design-guidelines-for-teaching-programming/
- **Good:** Audio plus a recorded live editor. The student can "pause at any point to experiment with the code" and save a "spinoff".
- **Borrow:** A strong precedent for "pause, poke at it, resume" with a narrated recording. It also suggests an optional voice-over track for the guide later.

**R6. Storyteller / Playback Press code playbacks** (opened): https://www.freecodecamp.org/news/storyteller-a-medium-for-guiding-others-through-code/ · options: https://markm208.github.io/storyteller/options.html
- **Good:** The author pins comments to "important points in the evolution of the code", and "the playback only moves forward when the viewer is ready." Comment points pause playback by default, and the viewer can turn that off. Recent changes are highlighted, "blue for inserts and red for deletes". A "code" and "blog" mode toggle handles small screens. Speed changes in 25 ms steps with `shift+↑/↓`.
- **Borrow:** This is the nearest existing product to the Session replay. Copy the default pause at note points with a "don't stop for notes" toggle for repeat viewers. Copy the insert and delete highlighting for file edits. Copy the narrow-screen switch between the transcript and the notes.

**R7. Learn Git Branching** (opened README): https://github.com/pcottle/learnGitBranching
- **Good:** The commit tree visibly updates after each command. `undo` and `reset` work everywhere. Levels sit in tabs by topic, an intro dialog appears on launch, and a "git golf" count compares your command count to the minimum.
- **Borrow:** Always offer "undo" and "start over" in the player. Show one visual state panel, such as the file tree or a "what changed" view, that updates with each step. That way the effect of each step is visible, not only described.

**R8. Svelte interactive tutorial** (opened): https://svelte.dev/tutorial/svelte/welcome-to-svelte
- **Good:** Prose and editor sit side by side, with a breadcrumb ("Basic Svelte / Introduction / Welcome to Svelte"). Previous and Next go at the bottom with the next lesson's title. A **solve** button in the top right is disabled when the step has no exercise.
- **Borrow:** Name the next step ("Next: Claude asks for permission") instead of a bare arrow. A "show me what happened" button can work like **solve** during Decision pauses.

**R9. Descript, "edit like a doc"** (opened): https://help.descript.com/getting-started/edit-like-a-doc
- **Good:** The transcript "isn't just a reference — it's directly linked to your media". Moving text moves the media, and inline notes don't break the alignment.
- **Borrow:** **The transcript itself is the timeline.** For non-developers, a readable chat transcript that highlights as playback moves is easier than a multi-track editor. Clicking any turn should seek there. A thin scrubber can sit underneath for people who prefer scrubbing.

**R10. Git History (pomber)** (README and a dev.to post opened, not the app UI): https://github.com/pomber/git-history · https://dev.to/nickytonline/git-history-20nh
- **Good:** "Slide through the history and see previous changes elegantly slide in." Neither source describes the controls in any more detail.
- **Borrow:** Animate file edits between states, with lines sliding in and out, instead of jumping cuts. It works best when the learner scrubs back and forth over one edit.

**R11. Emil Kowalski's course platform** (opened): https://emilkowal.ski/ui/how-i-built-my-course-platform
- **Good:** Radix **sand** scale, light and dark, with one "buttery yellow" accent (`#F8C819` in the player). Inter for text and Commit Mono for code. Interactive demos carry **Replay** and Copy buttons.
- **Borrow:** A neutral-scale background with one bright accent is a good light, editorial base that isn't cream and terracotta. Every embedded mini-demo should have a small "Replay" button.

**Gallery references (search results only, not opened, no visual claims):**
- Dribbble tag "session replay": https://dribbble.com/tags/session_replay
- Dribbble tag "session playback": https://dribbble.com/tags/session_playback
- Dribbble shot "Interactive timeline" (Amelia Marschall): https://dribbble.com/shots/4992726-Interactive-timeline
- Dribbble collection "Progress + Steps + Path + Timelines" (bruno cirilo): https://dribbble.com/bcirilo/collections/3946413-Progress-Steps-Path-Timelines
- img.ly, "Designing a timeline for mobile video editing" (not opened): https://img.ly/blog/designing-a-timeline-for-mobile-video-editing.md

## 2. Margin notes and annotation layouts

**M1. Tufte CSS** (GitHub README opened): https://github.com/edwardtufte/tufte-css
- **Good:** The README describes "extensive sidenotes", automatic numbering, "sidenote toggling on small screens" and the bundled ET Book font. It doesn't give widths or colours.
- **Borrow:** The idea of a wide margin column as a first-class part of the page. Use it for Steering notes beside the transcript.

**M2. Gwern, "Sidenotes in Web Design"** (opened): https://gwern.net/sidenote
- **Good:** It surveys the implementations: Tufte-CSS floats (fast, no JS, but notes can overlap), `sidenotes.js` (runtime layout that avoids overlap) and `<aside>` layouts. It argues sidenotes should show by default because hiding them behind clicks "defeat[s] much of the point". Narrow screens should fall back to pop-ins, popups or slide-up panels.
- **Borrow:** Show Steering notes by default on desktop. On mobile, use a slide-up panel tied to the current step. Steering notes will vary in length and cluster around busy moments, so plan on runtime layout that avoids overlap.

**M3. Ink & Switch essay style guide** (opened): https://www.inkandswitch.com/article-style-guide/
- **Good:** Asides "automatically float into a position nearby the previous block". `.move-up-num` (1–25 lines) adjusts placement, and `.callout` puts an aside inline when margin space is short ("Use this class sparingly"). Figcaptions align top-right of the figure.
- **Borrow:** Anchor each note to an event block, with manual nudges and an inline fallback. This is a simple authoring model for the person writing the replays.

**M4. Kyle Diaz, "Forget Sidenotes, Use Margin Notes"** (opened): https://kylediaz.github.io/sidenote-css/
- **Good:** Margin notes drop the numbers, because the markers interrupt reading, and are written to stand alone. It uses a CSS grid with a main column and a side column, and on mobile the asides are wrapped in `<details>`.
- **Borrow:** Write Steering notes without footnote numbers and make each one readable on its own. Tie them to events with a hairline or a highlight instead of a superscript.

**M5. Genius annotations** (Wikipedia opened): https://en.wikipedia.org/wiki/Rapgenius
- **Good:** Annotated lines are highlighted in grey, and clicking one opens the note. Annotations by verified artists are "highlighted in yellow, rather than the usual gray."
- **Borrow:** Highlight colour can say who is speaking. Give one highlight colour to "why the human steered" and a different one to "why Claude did that", so learners can tell the two kinds of note apart at a glance.

**M6. GitHub pull-request diff comments** (opened): https://github.blog/2011-02-07-pull-request-diff-comments/
- **Good:** Comments are anchored to diff lines and "keep their proper position" after later pushes. In the Discussion view they are "interleaved chronologically" with "a small diff excerpt for context."
- **Borrow:** Show a note in two places. In the margin it sits beside the event. In a "notes only" reading view it lists in time order with a small excerpt of the event. That view doubles as a recap at the end of the replay.

**Gallery references (search results only, not opened):**
- Dribbble "Sidebar comments system" (Aristotelis Kasomoulis): https://dribbble.com/shots/24520731-Sidebar-comments-system
- Dribbble "Annotation UI" (Tarun B): https://dribbble.com/shots/4317554-Annotation-UI
- Mobbin web screens "Draw / Annotate" (blocked, client error): https://mobbin.com/explore/web/screens/draw-annotate

## 3. "What would you do?" decision and quiz moments

**D1. NYT Upshot, *You Draw It*** (described in FlowingData, opened): https://flowingdata.com/2015/05/28/compare-your-curve-to-reality-for-income-percentile-versus-college-attendance/
- **Good:** "Draw a curve on a blank chart, and then compare your guess to reality and other readers' guesses." Short bullet points then tell you how you did.
- **Borrow:** The reveal should show three things: the learner's choice, what actually happened in the session, and optionally how other learners chose. Follow it with a two- or three-line explanation.

**D2. Nicky Case, explorable-explanation patterns** (opened): https://blog.ncase.me/explorable-explanations-4-more-design-patterns/ · https://blog.ncase.me/how-i-make-an-explorable-explanation/
- **Good:** In "Place Your Bets!", the page "first makes you draw what *you* think", and the mismatch with reality is what makes the point land. "Role Play" suits questions with "no right answers" but still "right questions". The process advice is to start with a question and climb "step by step".
- **Borrow:** Use two kinds of Decision pause. A **bet** asks "what will Claude do next?" and has a right answer. A **role play** asks "you're the human: approve this permission or not?" and has no single right answer; the reveal shows what the person chose and why.

**D3. Distill, "Communicating with Interactive Articles" (2020)** (opened): https://distill.pub/2020/communicating-with-interactive-articles/
- **Good:** It reviews the evidence. "Only after readers make their prediction are they shown the actual data" improves self-explanation and recall. Showing other readers' predictions was "not shown to necessarily be effective". Comprehension was "better in slideshow layouts than in vertical scroll-based layouts". It also warns that "not everything needs to be interactive."
- **Borrow:** Prefer stepping through the replay over scroll-driven playback. Keep Decision pauses rare and important; two or three per replay is a reasonable starting point to test. Treat the "other learners chose…" stat as optional, since the evidence for it is weak.

**D4. Brilliant, "how Brilliant teaches"** (opened): https://brilliant.org/resources/choosing-brilliant/how-brilliant-teaches-math/
- **Good:** Brilliant "often asks a question before presenting a procedure". Feedback comes "while the learner's reasoning is still fresh", and support fades as the learner progresses: hints and visuals are removed in later practice.
- **Borrow:** Give lots of guide help at the first Decision pause in a replay and less at later ones. Add a "replay without hints" mode for review.

**D5. Storyteller pause-on-comment** (see R6). This is the playback mechanism a Decision pause needs: playback "only moves forward when the viewer is ready."

**Gallery references (search results only, not opened):**
- Dribbble tag "quiz-ui": https://dribbble.com/tags/quiz-ui
- Dribbble tag "multiple-choice": https://dribbble.com/tags/multiple-choice
- Dribbble "Questions & Answers App" (Purrweb): https://dribbble.com/shots/14795926-Questions-Answers-App

## 4. Guide characters and mascot onboarding

**G0. The owner's own reference** (an image the owner shared in the planning chat; not kept in the repo)
- **What it shows:** A pixel-art character ("Hi, I'm Moufida! 👋 Tap me anytime to move on — let's take a look together.") stands under a rounded speech bubble. The bubble has a close ×, a 7-step dot indicator with the current step drawn as a longer pill, and a filled **Next ›** button. The bubble and buttons are beige, brown and orange.
- **Borrow:** The structure: bubble above the character, a dismiss ×, a pill-style dot stepper, one primary action, and "tap the character to advance".
- **Change:** The colours. Beige plus orange and brown is close to Anthropic's cream and terracotta (note 003, S11).

**G1. Duolingo characters, animated in Rive** (opened): https://blog.duolingo.com/world-character-visemes · onboarding write-up: https://goodux.appcues.com/blog/duolingo-user-onboarding
- **Good:** A Rive **State Machine** blends body states with separate mouth states. Each character has 20+ mouth shapes (visemes, one per speech sound), driven by timing data, not video. Idle behaviour includes "head nods, blinking, and eyebrow movement". When the learner clicks a word the character says it, and after a challenge the character reacts to right or wrong. In onboarding, Duo greets the learner, waves, and appears again at the sign-up moment.
- **Borrow:** Build the guide as a small state machine: idle (blink, small bob), talk (simple mouth flaps), point (toward the transcript or a note), react-good, react-hmm, and hide. Rive suits a vector character. A pixel character only needs a few sprite frames per state. Either way, the character should react *after* a Decision pause reveal.

**G2. Brilliant's Koji tutor** (opened): https://brilliant.org/help/features/how-does-koji-work/ · https://blog.brilliant.org/a-world-class-tutor-in-every-home/ · Rive case study: https://rive.app/blog/how-brilliant-org-motivates-learners-with-rive-animations
- **Good:**
  - Koji speaks "at the start of every lesson page", doesn't read the instructions aloud, and points out "what changed from the last problem and what's worth paying attention to before you try".
  - It can highlight part of the screen, annotate a graph or ask a smaller question.
  - It "never, ever just hands you the answer."
  - Muting Koji also hides its speech bubbles, except for brief correct/incorrect feedback.
  - The team explored "over 500 icons" and nearly dropped the character for fear a "cute mascot" would seem unserious. Students wanted a character, not a "generic sparkle button".
- **Borrow:** This is the clearest rulebook for when the guide speaks.
  - Speak at the start of each chapter of the replay and at each Decision pause, and say what to watch for.
  - Point at the transcript (a highlight or an arrow) instead of retelling it.
  - Never reveal the answer before the learner commits.
  - One mute control quiets the guide everywhere.

**G3. Headspace: Ebb the AI companion, and the 2024 identity** (opened): https://www.figma.com/blog/headspace-ebb-ai-companion/ · https://itsnicethat.com/articles/italic-studio-headspace-graphic-design-project-250424
- **Good:** Ebb is a "friendly blob" with a gradient identity, animated like a lava lamp so it feels "supportive, but gives you space". It is tuned to feel "like it's listening, but not too happy". One guideline was "Always make the AI visible". The 2024 identity widened the character's faces to show "a range of emotions beyond a smile" and uses a typeface that can "flex from playful to clinical".
- **Borrow:** Give the guide a *calm* resting state and a small set of expressions, including "hmm" and "careful", not only cheerful. The guide is a narrator *about* an AI session, not the AI itself. It needs a clearly different look from the "Claude" turns in the transcript so learners never confuse the two.

**G4. Microsoft Copilot "Mico"** (opened): https://techcrunch.com/2025/10/23/microsofts-mico-is-a-clippy-for-the-ai-era
- **Good:** Mico is an "expressive blob" that "listens, reacts, and even changes colors". It is on by default **only in voice mode**, and users can turn it off. Tapping it several times turns it into Clippy, an Easter egg.
- **Borrow:** Make the guide on by default in "guided" mode and off in a "just the replay" mode. A small Easter egg on repeated taps is an optional bit of fun.

**G5. Clippy, the anti-pattern** (Microsoft Research abstract opened): https://www.microsoft.com/en-us/research/?p=701935
- **Good:** It explains the failure. Clippy "lacks interpersonal intelligence" and "serves as a disruptive mediator between its user and the world". It also failed at "knowing its limits."
- **Borrow:** Never pop up while the learner is scrubbing, typing an answer or reading a note. Never guess at what the learner is "trying to do". Only appear at moments the author wrote in advance.

**G6. Notion Faces and the Roman Muradov illustration style** (opened): https://buck.co/work/notion-faces
- **Good:** Every part is hand-drawn in the in-house art director's style, aiming for "the full spectrum of personality" and not realism.
- **Borrow:** This is evidence that a single-ink, editorial character style can carry a whole brand. It is an alternative to pixel art if the pixel look reads too much like a game. Don't copy Notion's style itself.

**G7. Mobbin, "The long onboarding: a study of 1,460 flows"** (opened): https://mobbin.com/blog/the-long-onboarding-a-study-of-1-460-flows
- **Good:**
  - "A progress bar is a promise: there is an end to this". It should appear by screen 2 or 3.
  - Monzo names its steps.
  - BitePal puts a cartoon raccoon mid-flow and asks the user to name it.
  - Only about 8% of apps have a tutorial.
  - Headspace has the user breathe before showing any features.
- **Borrow:** The dot stepper in the guide's bubble is that promise, so show it from the first bubble. Naming each chapter on the scrubber, as Monzo names its steps, helps too.

**G8. Mobbin tooltip glossary** (opened): https://mobbin.com/glossary/tooltip
- **Good:** It says when to use tooltips (brief contextual help, onboarding) and when not to (tasks that need full attention, or information everyone must see). It notes that overlays force the user to interact.
- **Borrow:** Use the guide bubble for orientation. Put the Decision pause itself in the main canvas as a proper card, not in a tooltip.

**Gallery references (search results only, not opened, no visual claims):**
- Dribbble "Onboarding Mascots" (Noah Jacobus): https://dribbble.com/shots/2781684-Onboarding-Mascots
- Dribbble "Pixel Art Character Exploration" (Afiq Samat): https://dribbble.com/shots/11223775-Pixel-Art-Character-Exploration
- Dribbble "Onboarding Characters" (Bürocratik): https://dribbble.com/shots/2675619-Onboarding-Characters
- Dribbble tag "guided-onboarding": https://dribbble.com/tags/guided-onboarding
- Pinterest "Onboarding Tooltip by Oleg Frolov": https://www.pinterest.com/pin/onboarding-tooltip-by-oleg-frolov--10203536643160078/
- Pinterest board "63 Mascot UX ideas": https://br.pinterest.com/wang0388/mascot-ux/
- Pinterest "Onboarding Mascot Animation [Video]": https://www.pinterest.com/pin/524247212896191483/

## 5. Light editorial learning-site styles

**E1. Ink & Switch essays** (see M3). Research essays with figures, wide blocks and margin asides. The style guide doesn't state fonts or colours, so I can't describe them. **Borrow:** the essay-with-asides structure for each lesson page around the replay.

**E2. Josh W. Comeau** (opened): https://www.joshwcomeau.com/blog/whimsical-animations
- **Good:** Short "boop" motion that plays and settles back. Sounds are tied to actions, use several samples so they feel "a bit less robotic", and are silent for continuous effects. The footer has a "Disable sounds" option. He stresses novelty over stock confetti.
- **Borrow:** Give the guide small, quick motions instead of constant looping. If it gets sounds, add a site-wide "sounds off" switch. Celebrate a good Decision-pause answer with a specific, small reaction, not confetti.

**E3. Emil Kowalski's course** (see R11). Sand neutrals, one yellow accent, Inter and Commit Mono, and a sidebar plus wide main column once code arrives. **Borrow:** the restraint.

**E4. Svelte tutorial** (see R8). A neutral, docs-like split view. **Borrow:** the layout logic, not the brand.

**E5. Headspace identity** (see G3). A lead colour with a supporting palette chosen to avoid the "dreary sea of blues and greys". **Borrow:** a small supporting palette where each colour means something, such as event types or note types.

**E6. Field Museum rapid colour field guides** (opened): https://fieldguides.fieldmuseum.org/field-guide-instructions
- **Good:** Printed plates with fixed photo crops and a strict type ladder: supra-title 13–15 pt bold, title 18–20 pt bold, species caption blocks at 8–9 pt in "a tiny space". There is a legend for symbols and a credits block.
- **Borrow:** This is a literal source for the "field guide" mood. Show each event as a specimen card with a small caption block (type, time, tool), use a legend for event icons, and keep a strict type ladder.

**E7. Maggie Appleton** (opened, text only): https://maggieappleton.com/
- **Good:** Content is sorted by kind (Essays, Notes, Patterns, Smidgeons) with relative dates. She calls her work "visual essays", but the text didn't describe the visual style.
- **Borrow:** Typed content shelves (Replays, Notes, Patterns) for the site's index.

**E8. Awwwards "Learning by Design"** (opened, very little content): https://www.awwwards.com/sites/learning-by-design
- **Good:** Listed colours are `#2172B9` (blue) and `#F05227` (orange-red).
- **Borrow:** Only a weak signal that blue plus a warm accent reads as "learning". Not a strong reference.

**Gallery references (search results only, not opened):**
- Dribbble collection "Field Guide" (mmeazzo): https://dribbble.com/mmeazzo/collections/6875906-Field-Guide
- Dribbble collection "Editorial" (zuzaszczepanik): https://dribbble.com/zuzaszczepanik/collections/6814351-Editorial
- Behance "The Field Museum's Website Design": https://www.behance.net/gallery/65381415/The-Field-Museums-Website-Design

---

## Patterns that recur across the references

1. **Event log, not video** [R4, R5, R6]. Render the session live from recorded events.
2. **Two-way link between list and playhead** [R2, R9]. Clicking a transcript row seeks, and playback highlights the current row.
3. **Markers on the scrubber, some of them breakpoints** [R3, R6]. Steering notes appear as dots, and Decision pauses as dots that stop playback.
4. **Notes visible by default, anchored to blocks, collapsing on mobile** [M2, M3, M4].
5. **Who-said-it colour coding** [M5]. Human-steering notes and Claude-reasoning notes get different highlight colours.
6. **Predict, then reveal with a short explanation** [D1, D2, D3, D4]. Use few pauses and keep them meaningful.
7. **The guide speaks at authored moments only** [G2, G5]: chapter start, Decision pause, and the reaction after a reveal. It stays quiet during scrubbing and reading. One mute hides the bubbles [G2]. A plain-replay mode turns the guide off [G4].
8. **The guide is a state machine with a calm idle** [G1, G3]: idle, talk, point, react-good, react-hmm, hide.
9. **The step indicator is a promise** [G7, G0]: dots from the first bubble, with named chapters on the scrubber.

---

## Three design directions

The hex values below are proposals for comparison. None come from a source. Each palette avoids cream `#faf9f5` with terracotta `#d97757`, and avoids Anthropic's fonts (Poppins and Lora, per note 003, S11).

### Direction A: "Field Notebook"

**Description.** The replay is a page from a naturalist's notebook. The transcript runs down the main column as a readable document, and the transcript *is* the timeline, as in Descript. Each event is a "specimen" block with a tiny caption line (type · time · tool), as on Field Museum plates. A wide right margin holds Steering notes as unnumbered, always-visible margin notes anchored to their block, as in Ink & Switch and Tufte. Two highlight inks mark who is speaking: yellow for "the human steered" and blue for "Claude acted". A slim scrubber along the bottom shows density shading and marker dots, and Decision pauses are breakpoint dots that stop playback. A Decision pause turns the next block into a blank "your call" card with two or three hand-ruled options. On reveal, the real block fades in beside the learner's pick.

**Palette and type mood.** Cool paper, not cream: off-white with a faint green tint `#F4F6F2` and white cards `#FFFFFF`. Pine-ink text `#1F2A24`. Field green `#2E6B4F` for structure, highlighter yellow `#F4DC5A` for human-steering notes, and survey blue `#3D6FB6` for Claude-action notes. Red pencil `#C23B3B` only for Decision-pause markers. Use a bookish serif for the transcript and notes (for example Newsreader or Source Serif 4), small caps for caption labels, and a plain mono for code (for example IBM Plex Mono). The look should be quiet and well typeset, with hairline rules.

**Guide behaviour.** A small pixel-art "ranger" or field-researcher character in the owner's reference format (bubble, × button, pill-dot stepper, **Next ›**), recoloured to the palette above.
- **Where it lives:** in the margin gutter at the current chapter, not over the content.
- **When it talks:** like Koji, it speaks once at each chapter start ("Watch what the human does when Claude asks to run tests"), points with a small arrow at the relevant block, and then goes idle, blinking and doing the occasional notebook flip.
- **At Decision pauses:** it walks to the pause card, asks the question, waits, and gives a one-line reaction after the reveal.
- **What hides it:** it hides while the learner scrubs and comes back when playback settles. One mute hides all bubbles. "Read without guide" removes it entirely.

**Supported by:** R3, R6, R9, M1–M5, D1–D3, G0, G2, G5, G7, E1, E6.

**Trade-offs.** Most on-brief for "light, editorial, field guide", and the cheapest to animate (a few sprite frames). The risk is feeling static, so it depends on good motion for edits (R10) and highlight inks.

### Direction B: "Edit Bay (light)"

**Description.** The replay looks like a light-mode video editor. A multi-track timeline runs along the bottom with one lane per actor or type: **You**, **Claude**, **Files**, **Tools**, **Permissions**. Each event is a coloured clip, as in LogRocket and PostHog. Above the timeline sits a stage that shows the current moment: a chat bubble, a file diff with insert and delete highlighting (Storyteller), or a permission dialog. Steering notes are marker flags above the tracks. They open in a right-hand inspector panel that also works as a "notes only" chronological view, like GitHub's Discussion view. Decision pauses are red breakpoint flags. Playback stops there, the stage greys out, and a choice card slides up. The `[ ]` keys jump between markers, and speed and skip-waiting controls sit in the pinned control bar.

**Palette and type mood.** Studio white `#FFFFFF` on a cool grey frame `#EEF0F3`, graphite text `#20242B`. Track colours: human cobalt `#2F5BEA`, Claude teal `#139C8F`, files violet `#7657E8`, tools slate `#5B6B7F`, permissions mustard `#D9A400`. Breakpoints in signal red `#E0413A`. Use a crisp grotesk for the interface (for example Inter or Instrument Sans), tabular numbers for timecodes, and a mono for code. The mood is precise, tool-like and confident, like a light editing suite.

**Guide behaviour.** The guide rides the playhead as a small pixel character ("the assistant editor") perched on the scrubber line.
- **While playing:** it walks along with the playhead and is quiet.
- **At a marker flag:** it stops, and a speech bubble opens upward with stepper and Next. Next resumes playback.
- **At a Decision pause:** it sits on the flag and holds up a "?" sign until the learner answers, then reacts.
- **When scrubbing:** dragging the scrubber makes the character "hold on" with a small wobble and stay silent.
- **Off switch:** a "guide" toggle in the control bar follows Mico's rule (on in Guided mode, off in Free play).

**Supported by:** R1, R2, R3, R6, R10, M6, D3, D5, G1, G4, G5.

**Trade-offs.** It shows the *structure* of a Claude Code session (who did what, and when) better than any other direction. It may intimidate non-developers, though, and it is the furthest from "editorial". It needs a simplified mobile layout, for example collapsing the tracks into a single density bar.

### Direction C: "Trail Cards"

**Description.** The replay is a stepped story, not a scrubbed timeline, because Distill reports better comprehension for slideshow layouts. Each step is a large card showing one moment: a chat turn, an edit, a tool call or a permission prompt. A Steering note sits on the card's side flap, like a sticky note. Progress is a trail map across the top with named chapters, and you can tap any stop to jump there. Decision pauses are full-card "Your turn" moments in Nicky Case's two kinds: **bet** ("What will Claude do next?") and **role play** ("You're the human. Approve or deny?"). The reveal flips the card to show what really happened, a two-line why, and optionally how other learners chose. A compact "film strip" scrubber is available for people who want to skim.

**Palette and type mood.** Bright and friendly but still light and clean. Sky-wash background `#EEF5FB`, white cards, ink `#1E2B3A`. Meadow green `#2FA35A` for "right call", sky blue `#3F8FE0` for structure, sun yellow `#FFC83D` for highlights, berry `#C8457F` for "not quite". Use a rounded humanist sans for headings (for example Nunito Sans or Rubik), a readable sans for body text, and a mono for code. The mood is closer to Brilliant and Duolingo than to a journal.

**Guide behaviour.** A fully animated character, made in Rive or as a detailed pixel sprite sheet, with the state machine from G1.
- **Default role:** it opens each card the way Koji opens each page: "Notice Claude hasn't touched any files yet."
- **At a Decision pause:** it leans in and waits. After the reveal it reacts with a celebrate, "hmm" or "close one" pose, with simple mouth flaps if voice is added later.
- **Fading:** it fades its help over the course (Brilliant's support fading). It is chatty in Replay 1 and mostly quiet by Replay 5.
- **Controls:** sounds follow Josh Comeau's rules (short, action-tied, with an off switch), and one mute hides all bubbles except brief right/wrong feedback (Koji).

**Supported by:** D1–D4, G1, G2, G3, G7, R7, R8, E2.

**Trade-offs.** The best direction for engagement and for first-time non-developers, and the strongest home for the guide. It needs the most animation work and is the easiest to tip into "gamified kids' app". It also loses some of the feel of a real, continuous session.

### How the directions compare

| | A: Field Notebook | B: Edit Bay | C: Trail Cards |
|---|---|---|---|
| Fits "light editorial field guide" | Strong | Weak to medium | Medium |
| Shows the session's structure | Medium | Strong | Weak to medium |
| Friendly for non-developers | Strong | Medium | Strong |
| Guide prominence | Margin companion | Rides the playhead | Co-star |
| Animation cost | Low (a few sprite frames) | Medium | High (Rive state machine) |

My recommendation: use **A** as the base. Borrow B's coloured event ticks and marker flags for the scrubber, and C's bet and role-play Decision-pause card. This combination fits the brief best and keeps the guide character's cost low.

## Open questions

- Should the guide character be pixel art (the owner's reference) or a single-ink editorial illustration (G6)? Pixel art is cheaper to animate but reads as a game.
- Should Decision pauses show "how other learners chose"? Distill reports weak evidence for recall, and it needs a backend.
- Mobile: should Steering notes be a slide-up panel (Gwern) or `<details>` inline blocks (Kyle Diaz)? This needs a prototype.
- The owner should confirm the move away from the reference image's beige and orange.

## Sources

Opened and read:
- PostHog docs, how to watch recordings: https://posthog.com/docs/session-replay/how-to-watch-recordings
- LogRocket docs, session replay: https://docs.logrocket.com/docs/session-replay
- asciinema player markers: https://docs.asciinema.org/manual/player/markers/
- Scrimba interview (SurviveJS): https://survivejs.com/blog/scrimba-interview/
- Khan Academy talk-throughs: https://blog.khanacademy.org/our-design-guidelines-for-teaching-programming/
- Storyteller (freeCodeCamp): https://www.freecodecamp.org/news/storyteller-a-medium-for-guiding-others-through-code/
- Storyteller playback options: https://markm208.github.io/storyteller/options.html
- Playback Press about page: https://playbackpress.com/about
- Learn Git Branching README: https://github.com/pcottle/learnGitBranching
- Svelte tutorial: https://svelte.dev/tutorial/svelte/welcome-to-svelte
- Descript, edit like a doc: https://help.descript.com/getting-started/edit-like-a-doc
- Git History README: https://github.com/pomber/git-history
- Git History on dev.to: https://dev.to/nickytonline/git-history-20nh
- Emil Kowalski's course platform: https://emilkowal.ski/ui/how-i-built-my-course-platform
- Tufte CSS: https://github.com/edwardtufte/tufte-css
- Gwern on sidenotes: https://gwern.net/sidenote
- Ink & Switch essay style guide: https://www.inkandswitch.com/article-style-guide/
- Kyle Diaz on margin notes: https://kylediaz.github.io/sidenote-css/
- Genius (Wikipedia): https://en.wikipedia.org/wiki/Rapgenius
- GitHub pull-request diff comments: https://github.blog/2011-02-07-pull-request-diff-comments/
- FlowingData on *You Draw It*: https://flowingdata.com/2015/05/28/compare-your-curve-to-reality-for-income-percentile-versus-college-attendance/
- Nicky Case, design patterns: https://blog.ncase.me/explorable-explanations-4-more-design-patterns/
- Nicky Case, process: https://blog.ncase.me/how-i-make-an-explorable-explanation/
- Distill, interactive articles: https://distill.pub/2020/communicating-with-interactive-articles/
- Brilliant, how it teaches: https://brilliant.org/resources/choosing-brilliant/how-brilliant-teaches-math/
- Brilliant, how Koji works: https://brilliant.org/help/features/how-does-koji-work/
- Brilliant blog, Koji launch: https://blog.brilliant.org/a-world-class-tutor-in-every-home/
- Rive blog, Brilliant: https://rive.app/blog/how-brilliant-org-motivates-learners-with-rive-animations
- ustwo, Brilliant case study: https://ustwo.com/work/brilliant
- Duolingo, character visemes: https://blog.duolingo.com/world-character-visemes
- Duolingo, teaching method: https://blog.duolingo.com/duolingo-teaching-method/
- Appcues GoodUX, Duolingo onboarding: https://goodux.appcues.com/blog/duolingo-user-onboarding
- Figma blog, Headspace Ebb: https://www.figma.com/blog/headspace-ebb-ai-companion/
- It's Nice That, Headspace identity: https://itsnicethat.com/articles/italic-studio-headspace-graphic-design-project-250424
- TechCrunch, Mico: https://techcrunch.com/2025/10/23/microsofts-mico-is-a-clippy-for-the-ai-era
- Microsoft Research, Clippy: https://www.microsoft.com/en-us/research/?p=701935
- BUCK, Notion Faces: https://buck.co/work/notion-faces
- Mobbin onboarding study: https://mobbin.com/blog/the-long-onboarding-a-study-of-1-460-flows
- Mobbin tooltip glossary: https://mobbin.com/glossary/tooltip
- Josh Comeau, whimsical animations: https://www.joshwcomeau.com/blog/whimsical-animations
- Field Museum field-guide instructions: https://fieldguides.fieldmuseum.org/field-guide-instructions
- Maggie Appleton: https://maggieappleton.com/
- Awwwards, Learning by Design: https://www.awwwards.com/sites/learning-by-design
- recent.design (formerly godly.website): https://recent.design/

Search results only (not opened): all Dribbble, Pinterest and Behance URLs listed in the gallery blocks above.
