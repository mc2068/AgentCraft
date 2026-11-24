# 010: Homepage, lesson page and motion

Researched 2026-11-24. Follows note 009 (replay player references) and note 001 (competitors). Each reference says whether I **opened** the page (claims come from its text) or saw it **only in search results**. The fetch tool gives me page text, not pixels, so I can't watch motion on any site. Claims about motion come from what a page or its makers write, not from watching it. Terms (Learner, Goal, Session replay, Wren, Live view, Decision pause, Capability, Capability map, Verification stamp) follow [CONTEXT.md](../../CONTEXT.md).

## Question

What do the best homepages and lesson pages that fit Agentcraft look like, and what makes them good? Which motion tools from the owner's list (and threeui.com) should we use? What motion should Agentcraft have, and which prototype direction (A, B, C, L1, L2) does the evidence support?

## Summary

- **Let the homepage show a real lesson, not just describe one.** NN/g says "specifics beat abstractions" and to "reveal content through examples". Emil Kowalski's course page puts live demos right in the page. Our version of that is the first Decision pause in the hero (direction **B**). [N1, N2, R6]
- **Combine B, A and C on the homepage.** Use B's playable hero, then A's goal cards and Capability lines, with C's calm serif voice and Verification stamp. Don't pick only one.
- **For the lesson page, use L2 on wide screens and L1 on phones.** While the replay is playing, the goal rail folds away so the chat and Live view get the width.
- **Make motion explain things, not decorate them.** Nearly every source says the same: keep motion short (about 100–300 ms), use ease-out, animate only `transform` and `opacity`, don't animate things people do many times a day, and honour reduced motion. [N3, K1, K2, W3]
- **Motion stack: CSS first, plus small Motion for React only inside the replay player.** Add React's `<ViewTransition>` for the goal-card → lesson move. Budget: about 0 KB of motion JS on content pages and at most 35 KB in the replay island. [M1–M4]
- **Of the 7 tools, only two help the live site: Emil Kowalski's skills (for reviewing) and Motion (as the library).** HyperFrames, Remotion and Motion Canvas make videos, so they suit a launch or Case study video, not the site UI. Skip Blender skills. Use DesignBookmark Motion only for ideas, and check each component's licence.
- **Skip the 3D hero for v1.** ThreeUI is a real, partly MIT-licensed Three.js catalogue. But a bare three.js scene is about 118–125 kB gzipped, its style is glossy and loud, and Pro costs money. A 3D scene would also clash with pixel-art Wren and the "calm" brief. If the owner still wants 3D later, one lazy-loaded scene below the fold is the most I'd allow. [T1–T4]
- **Twelve signature moments** (section 5.4) carry the brand: bubbles arriving, Wren reacting, the permission card, folder tiles sorting themselves, the Capability unlock, and so on. Each comes with a technique and a reduced-motion fallback.
- **To stay unique, avoid** the dark terminal look, a Duolingo-style streak and XP layer, an auto-playing terminal hero, and stock docs chrome. Competitors already use all four (note 001).
- **Gallery sites were mostly blocked.** Mobbin screens, Dribbble shots, X and Khan Academy returned no content. Most evidence comes from the live sites, docs and research articles that did open.

---

## Access log

| Source | Result |
|---|---|
| **Mobbin** | Search found Brilliant web screens ("Brilliant Web Science Learning Path", "Brilliant Web Answer Selection"…) and a "Web Lesson Design" category. Every screen page failed with a client error, most likely the login wall. **No Mobbin visuals seen.** |
| **Dribbble** | Search returns shot titles. Shot and tag pages return an empty body (JS-rendered). **No Dribbble visuals seen.** |
| **X (x.com)** | `robots_disallowed`. I could not read Meng To's post, so I took the tool list from the brief. |
| **Pinterest** | Not retried. Note 009 found it blocked by `robots_disallowed`. |
| **Duolingo, Scrimba, Execute Program homepages, Khan Academy** | Metadata only (JS-rendered). I used other primary pages about them instead. |
| **ncase.me/trust** | Only "loading…" came back. |
| **GitHub API (`gh`)** | Not enabled for these repos in this session. I read licences from README pages and LICENSE files instead. |
| **Opened fine** | Brilliant, Linear, Vercel, Raycast, Exercism, Apple, Arc, ciechanow.ski, Josh Comeau's course pages, animations.dev, aiforui.dev, DesignBookmark, ThreeUI, all tool repos and docs, NN/g, Baymard, W3C, web.dev, Chrome, MDN, Next.js, Laws of UX. |

---

## 1. Reference homepages and lesson pages

"Competitor overlap" marks patterns that note 001 found competitors already using. Borrow those carefully, or not at all.

### Learning products

**H1. Brilliant** (opened): https://brilliant.org/
- **What it does:** Hero "Your personal tutor for math and coding", then two persona doors: "I'm a learner" and "I'm a parent or teacher". It introduces its tutor character Koji early ("Meet Koji, your personal tutor"), and the closing CTA is "Get started". The only demo media is a looping algebra clip. The page itself has no clickable demo. [R1]
- **Borrow:** Two persona doors right under the headline. Ours would be "I work in documents and spreadsheets" and "I want to build a site or tool", plus a quiet "I already code →" link to the Skip check. Introduce Wren by name near the top, the way Koji is.
- **Avoid:** Trust-badge walls, duplicated testimonial grids and a long subject-tab catalogue. We are free and unofficial, so heavy "accredited" proof would look odd.
- **Mobbin:** Search lists Brilliant web screens such as "Completion Continue", "Answer Selection" and "Science Learning Path" (search results only, could not open). [G1]

**H2. Execute Program** (homepage metadata only. Lesson design taken from Andy Matuschak's notes, opened): https://notes.andymatuschak.org/Execute_Program
- **What it does:** "Execute Program's lessons unfurl their prose in response to reader interaction." Lessons are "quite short", and every prompt is something you run. [R2]
- **Borrow:** This is the closest existing match to our Session replay. Text arrives as the Learner acts, and nothing is passive. Keep lessons short, as our 10–15 minutes already does.
- **Avoid:** Its strict gating ("don't unlock until you've … reviewed their prerequisites") would fight our "start with any Goal" promise.

**H3. Josh W. Comeau's courses** (opened): https://www.joyofreact.com/ · https://css-for-js.dev/ · https://whimsy.joshwcomeau.com/
- **What they do:** One plain headline ("Stop wrestling with CSS."), an honest problem statement ("Learning React is hard."), then curriculum, projects, a bio and an FAQ. The React course has a blob mascot in the hero with light toggles. The courses mix text, short captioned videos, mini-games and exercises, and the platform is described as keyboard-navigable. The Whimsy course promises "accessible experiences that don't trigger motion sensitivities". [R3]
- **Borrow:** A mascot that does one small, optional, playful thing. Wren could tip its hat when tapped. Name the Learner's real frustration plainly. Captions on all media.
- **Avoid:** Long sales-page length and logo walls. We are not selling anything.
- His blog build uses React Spring (19.4 kB) plus a dynamically imported Framer Motion (44.6 kB). He calls running both "indulgent". [R4]

**H4. animations.dev (Emil Kowalski)** (opened): https://animations.dev/
- **What it does:** Hero question "How do you craft animations that feel right?" The landing page itself has small live demos: an "Add toast" button, a "Feedback" popover, "Open Drawer". [R6]
- **Borrow:** Prove the product inside the page. One small working piece beats three paragraphs. For us that piece is a real Decision pause.
- **Avoid:** Using its yellow-accent look (already noted in 009).

**H5. Exercism** (opened): https://exercism.org/
- **What it does:** Headline "Get really good at programming.", two CTAs ("Sign up for free", "Explore languages"), a "not-for-profit" note, and a learn → practise → mentoring loop described as "Learn by doing." [R7]
- **Borrow:** Say early that it is free and independent (ours: "unofficial, free, no account"). Explain the learning loop in three plain steps, as prototype A's "How a lesson works" already does.
- **Avoid:** Big number counters ("8,970 exercises"). Agentcraft wins on care, not volume. Note 001 §4.1 #6 warns against competing on volume.

**H6. Bartosz Ciechanowski, "Moon"** (opened): https://ciechanow.ski/
- **What it does:** A long essay with many small interactive figures. You drag to rotate, sliders control time and size, buttons switch views, text links jump a figure to a preset view, and the text says when a figure exaggerates. [R8]
- **Borrow:** The model for future Explorables: one idea per figure, controlled by the Learner, and text that links into the figure. "Exaggerated for clarity" labels fit our honesty tone.
- **Avoid:** Lots of heavy WebGL figures on one page. Our lesson already has one heavy interactive part, the replay.

**H7. Duolingo** (homepage metadata only: "Learn a language for free"). Note 009 G1 covers its Rive character system.
- **Borrow:** A character state machine (idle, talk, react) for Wren.
- **Avoid (competitor overlap):** Streaks, XP and badges. Zero2claude and Claude Code Academy already use them (001 §2.5, §2.7). CONTEXT.md bans streaks too.

**H8. Scrimba** (homepage metadata only). Note 009 R4 covers its "record events, not pixels" approach.
- **Avoid (competitor overlap):** The dark code-editor look (001 §4.1 #1).

**H9. Khan Academy** (blocked, metadata only). Note 009 R5 covers its talk-throughs. No new homepage claims.

### Product homepages known for craft

**H10. Linear** (opened): https://linear.app/ · design refresh: https://linear.app/now/behind-the-latest-design-refresh
- **What it does:** Headline "The product development system for teams and agents." The page is a sequence of numbered "Fig 0.1–0.3" cards, each section showing a real product mockup (issue view, roadmap, agent chat, review lists). The March 2026 refresh had these rules: "Don't compete for attention you haven't earned", "Structure should be felt not seen", and a move to "a warmer gray … less saturated". [P1, P2]
- **Borrow:** The rules more than the look. Soften dividers, make side panels quieter than the main work area, and show the product UI itself as the illustration. Its "Fig." labels fit our field-guide voice (prototype C).
- **Avoid (competitor overlap):** Dark gradient hero styling. Cursor and zero2claude already look like this.

**H11. Vercel** (opened): https://vercel.com/
- **What it does:** H1 "Agentic Infrastructure" with cycling phrases, two CTAs ("Deploy now", "Talk to sales"), customer proof, and a "Paste to your agent" option. [P3]
- **Borrow:** "Paste to your agent" matches our Hands-on exercise. Every lesson ends with a one-click copyable prompt.
- **Avoid:** A cycling headline. NN/g says not to animate "the logo, tagline, or main headline". [N1]

**H12. Raycast** (opened): https://www.raycast.com/
- **What it does:** "Your shortcut to everything.", a big keyboard graphic with four labelled qualities ("Fast.", "Ergonomic.", "Personal.", "Reliable."), a chat mockup for AI, and "Take the short way." as the closing CTA. [P4]
- **Borrow:** Four one-word promises with one-line proof. Ours could be "Real.", "Yours.", "Checked.", "Free." Raycast is also Emil's go-to example of never animating keyboard actions. [K1]
- **Avoid:** A keyboard hero signals "for developers". It would put off Knowledge workers.

**H13. Apple, AirPods Pro** (opened): https://www.apple.com/airpods-pro/
- **What it does:** A long product story told in short headed sections ("Get the highlights.", "Take a closer look."). Many images come in `startframe`/`endframe` pairs, which suggests frame-sequence animation. That is my inference from filenames. It also has a "Watch the film" link and a "View in your space" AR model. [P5]
- **Borrow:** Short, confident section headlines and one idea per section.
- **Avoid:** Heavy scroll-linked frame sequences. NN/g found scrolljacking "leads to more user pain than benefits" and that it is worse on mobile. [N4]

**H14. Arc** (opened): https://arc.net/
- The homepage is now "A farewell to Arc … sunsetting on December 22, 2026." [P6] **Don't use Arc as a live reference.** Its old motion-heavy site is gone.

**H15. Stripe docs quickstart** (opened, text only): https://docs.stripe.com/payments/quickstart
- The text version shows step-by-step prose and code, plus an "agent skills" banner. I couldn't see the layout, so I make no layout claims. Note 001 records Stripe's language switcher from general knowledge only.
- **Avoid (competitor overlap):** Docs chrome (sidebar, content, "On this page"). ccforeveryone, Cursor Learn and the official docs all use it (001 §4.1 #7).

### Component and gallery references

**H16. DesignBookmark Motion** (opened): https://designbookmark.com/motion. See section 4.1. Its AI-themed components (Kokonut UI "Tool approval", "Agent steps", "Thinking text", "Typewriter", SmoothUI "Scrubber") are close to our permission card, thinking indicator and replay scrubber. [C1]

**H17. Dribbble (search results only, not opened, no visual claims):** "Learn30 – Learning Platform Landing Page", "Online Learning Platform Landing Page", tag "interactive-learning". [G2]

### Competitor resemblance in short

| Pattern | Who already uses it (note 001) | Our stance |
|---|---|---|
| Dark terminal hero, terminal mockups | zero2claude, Claude Code Academy, ccforeveryone, Cursor, Scrimba | Avoid |
| Auto-playing terminal welcome on the homepage | claude.nagdy.me | Avoid. Our hero waits for the Learner. |
| Streaks, XP, badges (Duolingo pattern) | zero2claude, Claude Code Academy, Boot.dev | Avoid. Use the Capability map instead. |
| Docs chrome (sidebar + "On this page") | ccforeveryone, Cursor Learn, official docs | Only as plumbing (L2 rail), never as the look |
| Persona doors and a named tutor character (Brilliant) | No Claude Code site in note 001 (Boot.dev, outside that group, has its tutor "Boots") | **Use.** It's free ground. |
| A real interactive moment on the landing page (animations.dev), lessons that unfold as you act (Execute Program) | None of them. nagdy's hero is an auto-playing terminal. | **Use.** It's our signature. |

---

## 2. What the best homepage does

A checklist for Agentcraft. Each line has its source.

1. **Say what it is in one plain sentence, above the fold.** NN/g says to start with a tagline that "summarizes what the site or company does". Users spend about 57% of viewing time above the fold and 74% in the first two screens. [N2, N5]
2. **Show real content, not claims.** "Specifics beat abstractions." Use "Thoughtfully curated content examples". For us that means a real Decision pause and real Goal titles. [N1, N2]
3. **Give clear starting points for the top 1–4 tasks.** [N2] Ours are: start lesson 1, pick a Goal, skip ahead (Skip check), and see your Capability map.
4. **Speak to both Personas by name, without making them pick a "mode".** Brilliant's two doors are the model. [R1] Goal cards carry a small "Good for: documents / building" tag. Prototype A already has a `.for` line for this.
5. **Never animate the headline, tagline or logo. Avoid auto-forwarding carousels and autoplay video.** [N1] Baymard found carousels have usability issues on 46% of sites that use them, and says to avoid auto-rotation on mobile. [N6]
6. **Anything that moves on its own for more than 5 seconds needs a pause control.** This is WCAG 2.2.2. A looping hero replay would need one. A hero that waits for the Learner does not. [W1]
7. **Hit the Core Web Vitals on phones.** LCP ≤ 2.5 s, INP ≤ 200 ms and CLS ≤ 0.1, measured at the 75th percentile. [W2] The headline text, not the interactive widget, should be the LCP element. Give the widget a fixed height so it can't shift the page.
8. **Answer feedback within about 400 ms** (Doherty threshold). The first click in the hero must respond at once, even before the engine has fully loaded. [L3]
9. **Say "unofficial, free, no account" early, with the paid-plan note nearby.** Exercism states its not-for-profit status right after the hero. [R7] Our brand rules (note 003) require "unofficial" anyway.
10. **Use specific graphics, not stock art.** NN/g says "Users often dismiss graphics as ads" and asks for meaningful images. [N2] Wren and real Live view tiles do this job.
11. **No scrolljacking and no horizontal-scroll sections.** [N4]
12. **End on a strong, quiet close (peak-end rule).** The last section repeats the one main CTA. [L1]

**Knowledge worker:** Plain words, no terminal, and a Goal they recognise (a folder, a report, a spreadsheet) in the first screen. **Aspiring builder:** A Goal that produces a site or tool, with a visible result in the Live view (web page World). **Developer:** One quiet link ("I already use it: skip ahead") and an "Advanced track" teaser low on the page. Prototype A already has this.

## 3. What the best lesson page does

1. **State the outcome first.** The "After this lesson: you can…" Capability line goes above the replay. Mayer's *pre-training* principle says to introduce key terms and goals before the main content. [E1] react.dev's "You will learn" box does the same (001 §3).
2. **Keep the page to one job. Cut decoration.** Mayer's *coherence* principle: keep only content that serves the learning goal. [E1]
3. **Put words next to the thing they explain.** *Spatial contiguity* means Steering notes sit beside the chat turn they refer to, and Live view changes happen in the same beat as the chat turn (*temporal contiguity*). [E1]
4. **Split the lesson into short segments with a visible end.** *Segmenting* plus the goal-gradient effect: "Clear progress indicators help encourage users to complete tasks." Show the replay's step dots and "Lesson 2 of 3". [E1, L2]
5. **Ask before you show.** Decision pauses come before the reveal (009 D3, Distill). Keep them few.
6. **Signal what matters with one accent.** *Signalling*: highlight the file that just changed and the option you picked. Use colour and weight, not big motion. [E1]
7. **End on a peak.** The "You can now…" moment and the Capability map update are the end of the lesson. Make them the warmest beat on the page, without confetti. [L1]
8. **Use in-page links only if the page is long.** NN/g says a table of contents is "most valuable for long-form content". Our lessons are short, so the L2 rail's "In this lesson" list is enough. [N7]
9. **Keep a stable layout during the replay.** No content jumps when Claude's message arrives (CLS), and the composer stays where it is.
10. **Hands-on exercise: one copy button, then compare.** This is the Vercel "Paste to your agent" pattern. [P3]

---

## 4. Motion tools

### 4.1 The seven tools from Meng To's list

| # | Tool | What it is | Licence | Fits a Next.js static site's UI? | Verdict |
|---|---|---|---|---|---|
| 1 | **HyperFrames** (HeyGen) | Writes video as HTML. "The renderer seeks each frame in headless Chrome and encodes the result with FFmpeg." It ships 9 agent skills and needs Node 22+ and FFmpeg. [T5] | Apache 2.0, "no per-render fees" [T5] | No. Its output is MP4. It also has a `/slideshow` skill. | **Marketing or Case study video.** Good for a 30–60 s launch clip made from our own HTML replay UI. |
| 2 | **Emil Kowalski's skills** (aiforui.dev) | 19–20 agent skills: `emil-design-eng`, `animate`, `review-animations`, `remove-animations`, `animation-performance`, `find-animation-opportunities` and more. [T6, T7] | MIT (repo) [T7] | **Yes.** It guides how we write CSS and Motion code and doesn't add any runtime. | **Use for UI.** Run `review-animations` on each replay-player PR. Its STANDARDS file is the basis of section 5. |
| 3 | **DesignBookmark Motion** | A gallery of live animated components with "Copy for Claude" and "Copy for Codex" buttons. Many come from Kokonut UI and SmoothUI. [C1] | **No licence for the components.** The terms grant none and point you to "the original provider". [C2] Kokonut's page says "free, open-source" but names no licence. SmoothUI shows no licence on the page. [C3, C4] | Partly. The Kokonut and SmoothUI pieces use React + Tailwind + `motion` + the shadcn CLI, which is our stack. [C3, C4] | **Ideas only.** Look at "Tool approval", "Agent steps", "Thinking text" and "Scrubber". Only copy code after checking the source repo's licence. |
| 4 | **Remotion skills** | 12 agent skills for Remotion ("videos made in React"). `@remotion/player` can embed a composition in a React app. [T8, T9] | Skills repo: no licence stated on the README. Remotion itself is free for individuals and teams of up to 3 people, and bigger companies need a Company License. [T10] | Possible through the Player, but that is video-style playback, not UI. | **Marketing video only.** It works for a solo owner under the free licence. HyperFrames is simpler if we already have HTML. |
| 5 | **Blender skills** (EL4CTEO) | "22 skills covering the full 3D pipeline". Needs Blender 5.2+, and Blender MCP is optional. [T11] | MIT [T11] | No. It makes 3D assets and renders. | **Skip.** Wren is 2D pixel art, and we don't plan any 3D. |
| 6 | **Motion** (formerly Framer Motion) | An animation library for JS, React and Vue with "springs, layout transitions, scroll-linked effects". It also has a free `/motion` agent skill and an MCP server. [M1] | MIT ("Copyright (c) 2024 Motion B.V.") [M2] | **Yes.** It is the standard React choice for layout and exit animations. | **Use for UI, inside the replay island only** (sizes in 4.3 and 4.4). |
| 7 | **Motion Canvas** | "A TypeScript library that uses generators to program animations" plus an editor. Made for vector explainers synced to voice-over. Exports through FFmpeg and has a live presentation mode. [T12, T13, T14] | MIT [T12] | Weak. There is a `player` custom element, but it is made for authoring video. | **Explainer video only.** A possible choice for a narrated "how the agent loop works" film. Not for the site's Explorables, which should be real interactive React. |

### 4.2 threeui.com

- **What it is:** "copy-ready Three.js components, complete website templates, WebGL backgrounds". The catalogue includes chrome and glass buttons, 3D product assets, terrain and globe backgrounds, and full landing pages. Some use GSAP ScrollTrigger, Lenis and UnrealBloom. [T1] It is by Meng To (repo `MengTo/threeui`).
- **Tech:** React + Vite + Three.js, published as `@designcodeio/threeui`. One source says React Three Fiber is used, but the README doesn't mention it. [T2, T3]
- **Licence and price:** Community code is MIT. Thumbnails and previews served from threeui.com are *not* MIT. "Pro implementation source is deliberately not published to npm." [T2] The pricing page today: **Pro $199/year or $299 lifetime**. [T4] An August 2026 article quoted $99 and $199 sale prices, so prices change. [T15]
- **Cost:** Any Three.js scene needs the three.js runtime. A forum post measured a minimal scene (camera, renderer, one box) at **117.77 kB gzipped in r180 and 125.03 kB in r181**. [T16] That is before shaders, models, fonts or bloom passes, and about four times our whole motion budget.
- **Fit with a calm site:** Poor. The style is glossy (chrome, glass, bloom, scroll-driven 3D), which is the opposite of the Sage Slate brief and of NN/g's "don't animate crucial elements". A 3D scene also sits badly next to a 2D pixel-art Wren. Neither the README nor the site mentions reduced-motion support. [T2]
- **Verdict: skip for v1.** If the owner wants one 3D moment later:
  - Put it **below the fold** (for example a small pixel-voxel "ranger station" on the Capability map page), never in the LCP area.
  - Load it only with `IntersectionObserver` plus a dynamic import.
  - Never load it when `prefers-reduced-motion: reduce` is on, when the device has no fine pointer (`hover: none`), or when Save-Data is on. `navigator.deviceMemory` is non-standard with "Limited availability", so use it only as a hint. [W5]
  - Always ship a static image fallback.
  - Use Community MIT components only, or build our own scene.

### 4.3 Platform-native options

- **CSS transitions and keyframes:** No JS, and they can run on the compositor if you animate only `transform` and `opacity`. [W3] Use `steps()` for the pixel sprite. It has been Baseline across browsers since 2015. [W6] This should cover about 80% of our motion.
- **View Transitions API:** Same-document view transitions became Baseline on 14 Oct 2025 (Firefox 144). [W7] Cross-document support: Chrome 126+, Safari 18.2+, Firefox 144+ partial, about 89.6% of users. [W8] In Next.js, React's `<ViewTransition>` gives shared-element morphs on `<Link>` navigations. The Next guide (updated 2026-11-18) says it works "in the App Router with no configuration" with React 19.3. The older API page (Next 16.2.3, April 2026) still calls the `experimental.viewTransition` flag "not recommended for production". [M3, M4] **Unsure:** check this against the Next version we pin. Unsupported browsers just switch pages instantly, so the risk is low. Its guide has a ready reduced-motion block. Back and Forward buttons don't animate. [M4]
- **Scroll-driven animations (`animation-timeline: scroll()/view()`):** Chrome 115, Firefox 159, Safari 26. They run "off the main thread". [W4] Use them only for small extras such as a lesson reading-progress hairline, and never for scrolljacking. [N4]
- **Motion for React:** The full `motion` component is about 43 kb. `m` + `LazyMotion` is "just over 5kb", plus `domAnimation` (+24 kb: animations, variants, exit, tap and hover) or `domMax` (+38 kb: adds drag and **layout animations**). `useAnimate` mini is 3.3 kb. [M5] `MotionConfig reducedMotion="user"` automatically turns off transform and layout animations but keeps opacity. [M6]

### 4.4 Recommended motion stack and budget

| Layer | Use | Budget (as the docs state sizes) |
|---|---|---|
| CSS tokens + transitions + keyframes | Buttons, cards, bubbles, notes, Wren sprite, stamps | 0 KB JS |
| React `<ViewTransition>` (with CSS fallback) | Goal card → lesson header; lesson → next lesson | 0 KB extra (part of React) |
| Motion for React: `m` + `LazyMotion` + `domAnimation`, loaded only in the replay player island | Exit animations, permission card, choice stagger | about 5 + 24 kb |
| Folder-tile sorting | Write our own FLIP with WAAPI (about 1 kb), **or** move up to `domMax` (+14 kb over `domAnimation`) if FLIP gets fiddly | Decide in the prototype |
| Nothing on content-only pages | Goal, Track and Case study text pages | 0 KB motion JS |
| No three.js, GSAP, Lottie or Rive in v1 | n/a | 0 |

Hard limit: **≤ 35 kb of motion JS per route, and 0 on the homepage before the first interaction.** The hero's first state renders as static HTML. The engine and Motion load on first interaction or idle.

---

## 5. Motion principles for Agentcraft

**Character:** calm, quick and kind. Motion explains *what changed* and *what to look at*. It never performs.

### 5.1 Tokens

| Token | Value | Use | Source |
|---|---|---|---|
| `--dur-press` | 120 ms | Button `:active` scale .97 | K2 (100–160 ms), N3 (~100 ms) |
| `--dur-small` | 180 ms | Bubble in, note in, tooltip | K2 (125–200 ms) |
| `--dur-medium` | 260 ms | Permission card, drawers, mobile notes sheet | K2 (200–500 ms), N3 (200–300 ms) |
| `--dur-move` | 400 ms | Tile sorting, page morph | M4 (400 ms morph), N3 (400 ms only for large movement) |
| `--dur-exit` | about 70% of the enter time | All exits | N3 (exits shorter than enters), M4 (150 ms exit) |
| `--stagger` | 40 ms, at most 6 items | Choice options, tiles | K2 (30–80 ms) |
| `--ease-out` | `cubic-bezier(0.23, 1, 0.32, 1)` | Anything entering | K2 |
| `--ease-in-out` | `cubic-bezier(0.77, 0, 0.175, 1)` | Things moving on screen (tiles) | K2 |
| `--ease-drawer` | `cubic-bezier(0.32, 0.72, 0, 1)` | Permission card, sheets | K2 |
| Spring (Motion) | `{ type: "spring", duration: 0.5, bounce: 0.15 }` | Wren's hop only | K2 (bounce 0.1–0.3, mostly avoid) |

Rules from the sources: never use `ease-in` for UI. [K2] Never start from `scale(0)`; start at 0.95–0.97. [K2] Animate only `transform` and `opacity` (plus `clip-path` and colour). [K2, W3] Movement is 4–12 px, never across the screen. Wrap hover effects in `@media (hover: hover) and (pointer: fine)`. [K2]

### 5.2 What never animates

- Headline, tagline, logo and nav. [N1]
- Body text while someone reads it, and the replay transcript after it has arrived.
- Keyboard-driven actions in the player (`[`, `]`, space, arrow keys) and anything the Learner does dozens of times, such as next step and scrubbing. [K1, K2]
- Scroll speed or direction: no scrolljacking, parallax or smooth-scroll libraries. [N4]
- Anything that loops forever. The one exception is Wren's blink every few seconds, and it stops under reduced motion. Nothing that autoplays for more than 5 s without a pause control. [W1]
- No confetti, shaking for wrong answers, bounce on chat bubbles or celebratory sounds by default.

### 5.3 Reduced motion and low-end devices

- **`prefers-reduced-motion: reduce` means less motion, not zero.** Remove movement (translate, scale, layout, morph) and keep short opacity and colour changes (≤ 150 ms). [K2, M6] WCAG 2.3.3 gives a page-flip example that turns off under this setting. [W9]
- Motion: wrap the player in `<MotionConfig reducedMotion="user">`. [M6] View Transitions: use the `animation-duration: 0s` block from the Next guide, or swap the morph for a crossfade. [M4]
- **The replay must be fully usable with zero animation.** The typing indicator becomes static "Claude is replying…" text, and step timing still follows the engine.
- Also add a **"Calm mode" toggle** in the player's settings next to the Wren mute. It does the same as reduced motion and also turns off the typing delay. WCAG 2.3.3 shows a site-wide control as an example. [W9]
- **Low-end phones:** no feature needs the GPU beyond transforms. FLIP tile sorting is capped at 24 tiles, and beyond that the World crossfades instead.

### 5.4 Signature moments

| # | Moment | What the Learner sees | Technique | Reduced motion |
|---|---|---|---|---|
| 1 | **Hero replay (homepage B)** | The first Decision pause is already on screen as static HTML. Picking a reply makes Claude's answer arrive, then Wren's Steering note, then the Live view's first change. It plays once and waits. Nothing loops. | Static first state (SSR). The engine plus Motion load on first pointer or focus. CSS for the bubbles. | Instant swaps with a short fade |
| 2 | **Chat bubble arrives** | Fades up 8 px. The Learner's own bubble appears at once (it's their action). Claude's has a short typing indicator first. | CSS `@keyframes` on mount, `--dur-small`, `--ease-out`. Typing dots pulse in opacity only. | Opacity only, no dots |
| 3 | **Decision pause options** | Options stagger in (40 ms). The picked option settles into the transcript as the Learner's bubble, and the others fade out. | Motion `AnimatePresence` exit plus stagger (`domAnimation`) | Instant, the picked option is highlighted |
| 4 | **Permission card** | Rises from the composer area as a docked card (not a modal). Focus moves to it, and Allow / Deny buttons press at scale .97. | Motion or CSS transform with `--ease-drawer`, `--dur-medium`. Kokonut "Tool approval" as visual reference only. | Fade in place |
| 5 | **Wren reacts** | After a reveal: a nod (good call), a head-tilt (different call), or tipping the hat (lesson done). 3–4 pixel frames, once. Idle is a blink only. | Sprite sheet + CSS `steps(n)`. States follow 009 G1 (idle, talk, point, react-good, react-hmm). | Single still frame per state, no blink |
| 6 | **Steering note appears** | The note fades in beside the chat (bottom sheet on phones). The chat turn it refers to gets a soft highlight that fades over 600 ms. | CSS. The highlight is a `background-color` transition, which counts as colour, not motion. | The highlight stays, no fade-up |
| 7 | **Live view: folder tiles sort themselves** | When Claude moves files, tiles glide from "Downloads" into their new folders in a short stagger, and folder counts tick up. | FLIP: measure → invert → play with WAAPI, `--dur-move`, `--ease-in-out`. Or Motion `layout` with `domMax`. | Crossfade between the before and after states |
| 8 | **File renamed or edited** | The old name strikes out, the new name fades in, and a dot marks "changed". | CSS. `clip-path` reveal on the new name. | Instant swap with the dot |
| 9 | **Capability unlocked (end of lesson)** | "You can now…" card. A check mark draws in, Wren tips the hat, and the Capability's dot on a mini map fills. This is the lesson's peak-end moment. [L1] | SVG `stroke-dashoffset` (400 ms) + sprite | Check is shown already drawn |
| 10 | **Capability map visit** | Only *newly* gained Capabilities fill, once, in Journey order. Older ones are static. | CSS, triggered by a "seen" flag in ProgressStore | Already filled |
| 11 | **Goal card → lesson** | The card's title and Capability line morph into the lesson header. The site header stays still. | React `<ViewTransition name=…>` with `share="morph"`, 400 ms, header anchored. [M4] | Instant navigation |
| 12 | **Replay step dots and scrubber** | The current dot stretches into a pill (009 G0). Decision-pause markers stay still. | CSS `width` via `transform: scaleX` | Colour change only |

The press feedback on every button (scale .97, 120 ms) is global and isn't listed as a moment.

---

## 6. Recommendation

### Homepage: B first, then A, in C's voice

- **Hero = B** ("Learn Claude Code by taking the human's seat."), playable at once. This is the "reveal content through examples" principle in its strongest form [N1]. animations.dev puts live demos on its landing page, and Execute Program builds its lessons this way [R6, R2]. No Claude Code competitor does it, and nagdy's hero is an auto-playing terminal (001 §2.6).
- **Below the hero = A.** The goal cards with "Good for" persona tags and their Capability lines, "How a lesson works" in three steps, the Capability map preview and the Advanced teaser. These are the top-task entry points NN/g asks for. [N2]
- **Voice and trust = C.** Newsreader serif headings, the "field guide" tone, the Verification stamp near the top, and Wren's "Claude can get this wrong. Here's how you check." line. Drop C's table-of-contents layout as the homepage body. It is fine for the Track page.
- **Fallback:** if the hero widget can't meet LCP or INP on a mid-range phone, the hero becomes A's static chat preview (already in prototype A) with "Play this →".

### Lesson page: L2 on desktop, L1 on phone, focus while playing

- At 1100 px and wider, show the L2 goal rail (the Goal's lessons, "This goal gives you", "In this lesson"). It holds the Goal context and the goal gradient. [L2]
- When the Learner starts the replay, the rail folds away and the chat plus Live view take the full width. Use a CSS grid change, not a big slide. Under 1100 px, show L1.
- Keep L1's order: title, Verification stamp, "After this lesson" Capability, intro, replay, field notes, Try it yourself, next lesson. It follows pre-training → segments → peak at the end. [E1]

### What to change in the next prototype round

1. Combine the homepage as described: B hero, A body, C typography and stamp. Make the hero's first state static HTML, and measure LCP and INP on a throttled phone profile.
2. Add the two persona doors (or "Good for" tags) under the hero, plus a quiet "I already code →" link to the Skip check.
3. Make one Live view World (folder) do moment 7, tiles sorting with FLIP, so we can judge whether it feels calm at 400 ms.
4. Build Wren's sprite states (idle blink, talk, nod, tilt, hat-tip) as a `steps()` sheet, and wire nod and tilt to the reveal.
5. Turn the permission request into a docked card (moment 4) and check keyboard focus order.
6. Add a goal-card → lesson-header morph with `<ViewTransition>` and confirm the reduced-motion and unsupported-browser fallbacks.
7. Put the motion tokens (5.1) into `styles/` as CSS variables, so Tailwind and Motion share one source.
8. Add a "Calm mode" toggle next to the Wren mute, and test the full replay with reduced motion on.
9. Run Emil Kowalski's `review-animations` skill on the prototype and record what it blocks.
10. Don't add ThreeUI, three.js, GSAP or scroll-linked hero effects.

---

## Sources

**Learning and product references**
- [R1] Brilliant homepage (opened): https://brilliant.org/
- [R2] Andy Matuschak, Execute Program notes (opened): https://notes.andymatuschak.org/Execute_Program · Execute Program (metadata only): https://www.executeprogram.com/
- [R3] Josh W. Comeau courses (opened): https://www.joyofreact.com/ · https://css-for-js.dev/ · https://whimsy.joshwcomeau.com/
- [R4] Josh W. Comeau, "How I built my blog" (opened): https://www.joshwcomeau.com/blog/how-i-built-my-blog-v2/
- [R6] animations.dev (opened): https://animations.dev/
- [R7] Exercism (opened): https://exercism.org/
- [R8] Bartosz Ciechanowski (opened): https://ciechanow.ski/
- Duolingo, Scrimba, Khan Academy homepages (metadata only): https://www.duolingo.com/ · https://scrimba.com/ · https://www.khanacademy.org/
- Nicky Case, The Evolution of Trust (did not render): https://ncase.me/trust/
- [P1] Linear homepage (opened): https://linear.app/
- [P2] Linear, "Behind the latest design refresh" (opened): https://linear.app/now/behind-the-latest-design-refresh
- [P3] Vercel homepage (opened): https://vercel.com/
- [P4] Raycast homepage (opened): https://www.raycast.com/
- [P5] Apple AirPods Pro (opened): https://www.apple.com/airpods-pro/
- [P6] Arc (opened): https://arc.net/
- Stripe docs quickstart (opened, text only): https://docs.stripe.com/payments/quickstart

**Galleries (search results only, not opened unless stated)**
- [G1] Mobbin, Brilliant web screens (client error on open): https://mobbin.com/explore/screens/18bb1898-faed-48e8-abef-bba674b22db3 · https://mobbin.com/explore/screens/cabea814-0ece-49d6-b20e-b199f231b018 · https://mobbin.com/explore/screens/9899d235-188f-44ab-b4ca-f9fa35faa016 · "Web Lesson Design" (client error): https://mobbin.com/explore/web/screens/class-lesson-detail
- [G2] Dribbble (empty body on open): https://dribbble.com/shots/11932092-Learn30-Learning-Platform-Landing-Page · https://dribbble.com/shots/17447756-Online-Learning-Platform-Landing-Page · https://dribbble.com/tags/interactive-learning
- X, Meng To (robots_disallowed): https://x.com/MengTo

**Components**
- [C1] DesignBookmark Motion (opened): https://designbookmark.com/motion
- [C2] DesignBookmark terms (opened): https://designbookmark.com/terms
- [C3] Kokonut UI, AI Tool Approval (opened): https://kokonutui.com/docs/ai/ai-tool-approval
- [C4] SmoothUI, Scrubber (opened): https://smoothui.dev/docs/components/scrubber

**Motion tools**
- [T1] ThreeUI browse (opened): https://threeui.com/browse?sort=recent
- [T2] ThreeUI repo README (opened): https://github.com/MengTo/threeui
- [T3] DeepWiki on ThreeUI (opened, secondary): https://deepwiki.com/MengTo/threeui
- [T4] ThreeUI pricing (opened): https://threeui.com/pricing
- [T5] HyperFrames repo (opened): https://github.com/heygen-com/hyperframes
- [T6] aiforui.dev skills (opened): https://aiforui.dev/skills
- [T7] emilkowalski/skills repo (opened): https://github.com/emilkowalski/skills
- [T8] remotion-dev/skills repo (opened): https://github.com/remotion-dev/skills
- [T9] Remotion Player docs (opened): https://www.remotion.dev/docs/player
- [T10] Remotion licence FAQ (opened): https://www.remotion.dev/docs/license/faq.md
- [T11] EL4CTEO/blender-skills repo (opened): https://github.com/EL4CTEO/blender-skills · AlphaSignal news (opened): https://alphasignal.ai/news/open-source-blender-skills-packs-22-pro-workflows-into-ai-coding-agents
- [T12] Motion Canvas repo (opened): https://github.com/motion-canvas/motion-canvas
- [T13] Motion Canvas video rendering (opened): https://motioncanvas.io/docs/rendering/video/
- [T14] Motion Canvas presentation mode (opened): https://motioncanvas.io/docs/presentation/
- [T15] AIPostHub ThreeUI guide, Aug 2026 (opened, secondary): https://www.aiposthub.com/threeui-threejs-3d-components-guide/
- [T16] three.js forum, minimal scene size r180→r181 (opened): https://discourse.threejs.org/t/8kb-gzipped-size-increase-in-0-181-0-recommendation-on-tooling-to-analyze-package-size/87880
- [M1] Motion repo README (opened): https://github.com/motiondivision/motion
- [M2] Motion LICENSE (opened): https://github.com/motiondivision/motion/blob/main/LICENSE.md
- [M3] Next.js `viewTransition` config (opened): https://nextjs.org/docs/app/api-reference/config/next-config-js/viewTransition
- [M4] Next.js guide, designing view transitions (opened): https://nextjs.org/docs/app/guides/view-transitions
- [M5] Motion, reduce bundle size (opened): https://motion.dev/docs/react-reduce-bundle-size
- [M6] Motion, accessibility (opened): https://motion.dev/docs/react-accessibility

**Evidence on homepages, lessons and motion**
- [N1] NN/g, Homepage design: 5 fundamental principles (opened): https://nngroup.com/articles/homepage-design-principles/
- [N2] NN/g, Top 10 guidelines for homepage usability (opened): https://www.nngroup.com/articles/top-ten-guidelines-for-homepage-usability/
- [N3] NN/g, Executing UX animations: duration (opened): https://www.nngroup.com/articles/animation-duration/
- [N4] NN/g, Scrolljacking 101 (opened): https://www.nngroup.com/articles/scrolljacking-101/
- [N5] NN/g, Scrolling and attention (opened): https://www.nngroup.com/articles/scrolling-and-attention/
- [N6] Baymard, homepage carousels (opened): https://baymard.com/blog/homepage-carousel
- [N7] NN/g, In-page links (opened): https://www.nngroup.com/articles/in-page-links-content-navigation/
- [K1] Emil Kowalski, "Great animations" (opened): https://emilkowal.ski/ui/great-animations
- [K2] Emil Kowalski, review-animations STANDARDS.md (opened): https://raw.githubusercontent.com/emilkowalski/skills/main/skills/review-animations/STANDARDS.md
- [L1] Laws of UX, Peak-end rule (opened): https://lawsofux.com/peak-end-rule/
- [L2] Laws of UX, Goal-gradient effect (opened): https://lawsofux.com/goal-gradient-effect/
- [L3] Laws of UX, Doherty threshold (opened): https://lawsofux.com/doherty-threshold/
- [E1] Raspberry Pi Foundation, Mayer's principles (opened): https://www.raspberrypi.org/blog/how-to-design-and-present-clear-computing-lessons-mayers-principles/
- [W1] W3C, Understanding SC 2.2.2 Pause, Stop, Hide (opened): https://www.w3.org/WAI/WCAG22/Understanding/pause-stop-hide.html
- [W2] web.dev, Core Web Vitals (opened): https://web.dev/articles/vitals
- [W3] web.dev, high-performance animations guide (opened): https://web.dev/articles/animations-guide
- [W4] Chrome for Developers, scroll-driven animations (opened): https://developer.chrome.com/docs/css-ui/scroll-driven-animations
- [W5] MDN, `navigator.deviceMemory` (opened): https://developer.mozilla.org/en-US/docs/Web/API/Navigator/deviceMemory
- [W6] MDN, `steps()` (opened): https://developer.mozilla.org/en-US/docs/Web/CSS/easing-function/steps
- [W7] web.dev, same-document view transitions Baseline (opened): https://web.dev/blog/same-document-view-transitions-are-now-baseline-newly-available
- [W8] caniuse, cross-document view transitions (opened): https://caniuse.com/cross-document-view-transitions
- [W9] W3C, Understanding SC 2.3.3 Animation from Interactions (opened): https://www.w3.org/WAI/WCAG22/Understanding/animation-from-interactions.html

**Internal**
- Note 001, competitor analysis: [001-competitor-analysis.md](001-competitor-analysis.md)
- Note 009, replay player references: [009-replay-player-references.md](009-replay-player-references.md)
- Prototype: [prototypes/site/index.html](../../prototypes/site/index.html)
