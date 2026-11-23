# 001: Competitor analysis of sites that teach Claude Code and AI coding

- **Date:** 2026-11-23
- **Question:** Which websites, courses and docs already teach Claude Code (and close neighbours such as Cursor, Copilot and vibe coding for non-developers)? How are they built and designed? What gaps and differentiation opportunities does that leave for a free, unofficial Next.js learning site?
- **Method:** WebSearch (standard, then one extended pass) and WebFetch of each site's own page, plus one raw-HTML inspection of the official docs. Each claim is cited to the page it came from (see the Sources list at the end).

> **Caveat on visual design.** WebFetch returns page text and metadata, not screenshots, and the sandbox proxy blocked raw HTML downloads for every site except code.claude.com. So the visual notes below come from three things: `theme-color` and other meta tags, the CSS tokens in the official docs' HTML, and the structure described in each page's text. They are **not** from looking at the rendered page. Before making final design decisions, someone should look at the top 5 sites in a real browser.

---

## 1. Landscape at a glance

| # | Site | Owner | Audience | Format | Price | Freshness |
|---|---|---|---|---|---|---|
| 1 | Claude Code docs (code.claude.com/docs) | Anthropic | Developers, admins, some beginners | Reference docs (Mintlify), ~205 pages, 11 translations | Free | Live, current |
| 2 | Claude Academy: Claude Code 101 | Anthropic | New and experienced developers | Readings plus quizzes, ~2 h (also on Coursera) | Free | Coursera says updated Sep 2026 |
| 3 | Claude Academy: Claude Code in Action | Anthropic | Developers past their first prompts | 9 lessons, 1 h, quiz, badge | Free | Rewritten in 2026 |
| 4 | DeepLearning.AI: Claude Code, a Highly Agentic Coding Assistant | DeepLearning.AI with Anthropic | Intermediate developers | ~1h50m video, labs for Pro users | Free (labs are Pro) | 2025 to 2026 |
| 5 | Claude Code for Everyone (ccforeveryone.com) | Carl Vellotti (independent) | Non-technical people | Taught **inside** Claude Code, with a docs-style companion site | Free (needs Claude Pro) | 2026, mentions Cowork |
| 6 | From Zero to Claude Code (zero2claude.dev) | Itay Shmool (independent) | Complete beginners | 147 to 151 gamified browser lessons over 14 levels | Free | Launched mid-2026 |
| 7 | Learn Claude Code (claude.nagdy.me) | Ahmed Nagdy (independent) | Beginner to advanced developers | 12 modules, terminal simulators, config builder | Free | v1.33.8, has a changelog |
| 8 | Claude Code Academy (claudecodeacademy.com) | Curtis Cornell (independent) | Developers | 40 lessons, simulations, XP, streaks, certificate | $99 one-time | Reviewed 2026-11-14 |
| 9 | ClaudeLog (claudelog.com) | Independent | Power users | Docusaurus knowledge base and blog | Free, ad slots | Updated Nov 2026 |
| 10 | Claude Code Ultimate Guide (cc.bruniaux.com) | Florian Bruniaux | Beginners to CTOs | Huge open reference: 25K+ lines, 473 quiz questions | Free | "New identity" Nov 2026 |
| 11 | claude-howto (GitHub, luongnv89) | Independent | All levels | Markdown, Mermaid diagrams, templates | Free (MIT) | ~42k stars, updated Jul 2026 |
| 12 | awesome-claude-code (GitHub, hesreallyhim) | Community | All levels | Curated README list | Free | Active |
| 13 | Real Python Claude Code cheat sheet | Real Python | Developers | Web page plus PDF | Free | Mentions v2.1.28x |
| 14 | Claude Help Center cheat sheet | Anthropic | New users | 3 tables (terms, commands, keys) | Free | Aug 2026 |
| 15 | AI Hero: Claude Code for Real Engineers | Matt Pocock | Senior engineers | Workshops and a live cohort | $795 cohort | 2026 cohort, now waitlist |
| 16 | freeCodeCamp Claude Code courses | freeCodeCamp / ExamPro | Beginner to advanced developers | Long YouTube videos (1.5 h and 12h44m) | Free | Aug 2026 |
| 17 | Cursor Learn (cursor.com/learn) | Cursor | Developers new to AI | 13 text lessons in 2 tracks | Free | Current |
| 18 | GitHub Copilot Fundamentals (MS Learn) and Copilot app for Beginners (GitHub) | Microsoft / GitHub | Developers, students | MS Learn modules and badges; open-source chapters | Free | Updated Oct 2026; course from Sep 2026 |
| 19 | Vibe coding courses (DataCamp Replit, Coursera/Scrimba, ZTM, Udemy) | Various | Non-technical founders, beginners | Video or browser courses | Mostly paid subscriptions | 2026 |
| 20 | Claude Code for Everyone briefing doc (lpcode808.github.io) | Independent | Non-programmers | Single long page with slideshow mode | Free | Jan 2026 (aging) |

The list is padded out by a long tail of Udemy and Coursera titles (Frank Kane, Code with Mosh at $249, Vanderbilt on Coursera, IndyDevDan's Tactical Agentic Coding at $599), Substack beginner guides, Maven live lessons ("Claude Code 101: No Terminal Required") and B2B enablement pages (Seibert Group). [S16][S17][S22][S23]

---

## 2. Profiles

### 2.1 Official Claude Code docs: code.claude.com/docs

- **Audience:** Mostly developers and admins. There are also beginner-facing pages: a terminal guide linked from the install step, a Desktop quickstart, a glossary, a prompt library tagged by role, and a Champion kit for internal advocates. [S1][S2]
- **Structure:** About 205 English pages in 8 groups: Getting started (~46), Build (~22), Plugins (~31), Administration (~37), Configuration (~27), Reference (~9), Agent SDK (~32) and Resources. It is translated into 11 languages, and an `llms.txt` index is provided for agents. [S2]
- **Visual design (from CSS tokens):**
  - Built on **Mintlify**, using **Anthropic Sans** (with Styrene and Paper Mono present) and Inter as a fallback.
  - The light background is warm off-white `rgb(253 253 247)`, the dark background is `rgb(9 9 11)`, and the primary colour is near-black.
  - The brand accent is terracotta (`--accent-brand: hsl(15 63% 60%)`, about #D97757). [S3]
- **UX patterns:**
  - Install steps sit in surface tabs (Terminal, VS Code, Desktop, Web, JetBrains), and code blocks have copy buttons.
  - A "What I want to do → Best option" table helps readers pick a feature.
  - The callouts help beginners, for example: "If you see `The token '&&' is not a valid…` you're in PowerShell".
  - There is an **interactive context-window simulation** page. [S1][S4]
- **Strengths:** Authoritative and always current. It covers every surface, including desktop, web, mobile and Slack, and it is translated. It already contains one interactive explainer.
- **Weaknesses:** It is reference-first, with no learning path, progress or practice. It is huge, and the jargon is dense for non-developers. Scrimba calls it "best for lookup, not learning". [S16]
- **Up to date?** Yes. It is the source of truth and documents features such as routines, `/loop`, Remote Control and Dispatch. [S1]

### 2.2 Claude Academy: Claude Code 101 and Claude Code in Action (academy.claude.com, Skilljar, Coursera)

- **Audience:**
  - 101 is for "developers who are either new to software engineering" and engineers new to agents. It needs basic editor and command-line skills plus a paid plan or an API key.
  - In Action is for developers who already use Claude Code and want longer, unsupervised, team-wide workflows. [S5][S6][S7]
- **Structure:**
  - 101 has 4 modules: What is Claude Code, Your first prompt, Daily workflows, and Customizing. That is 12 readings plus quizzes in about 2 h. Its Coursera listing has 7,285 enrolled, a 4.5★ rating, and was updated September 2026. [S6]
  - In Action has 9 lessons in 4 groups (Steer, Configure, Automate, Verify and share), about 1 h, one quiz and a completion badge. [S7]
- **Academy homepage:**
  - The hero asks "What do you want to learn?". Below it are product cards (Claude, Cowork, Code, Tag, Platform) and AI Fluency courses.
  - Collections are organised by audience (work, personal, higher education, K-12, nonprofits, small business) and by type. [S8]
- **UX:** Course pages show a stats line (lessons, duration, quiz, badge) with "Start course" and "Sign in to save progress" buttons, then What you'll learn, Who it's for and Before you start. [S7] The legacy Skilljar pages showed duplicated text and "rate limit" errors when fetched. [S5]
- **Strengths:** Official, free, short, and a badge or credential. The Academy is clearly segmented by audience.
- **Weaknesses:**
  - There is **no Claude Code course for non-developers**: both courses assume the command line.
  - Courses are short and quiz-based, with no hands-on simulation.
  - Third-party listings already describe them wrongly. Fast.io still says "21 lessons, 3 hours" for In Action. [S17]
- **Up to date?** Yes. In Action was "moved and rewritten" in 2026. [S16]

### 2.3 DeepLearning.AI: "Claude Code: A Highly Agentic Coding Assistant"

- **Audience:** Intermediate developers.
- **Format:** About 1h50m and 10 video lessons with a graded assignment. Free users watch the videos; Pro adds hands-on labs and quizzes. [S9][S17]
- **Design and UX:** The usual DeepLearning.AI player layout of video plus notebook, rated 4.6★.
- **Strengths:** A credible instructor brand and project-based lessons.
- **Weaknesses:** Video ages fast while Claude Code changes weekly. Hands-on labs are paywalled, and the course is aimed at developers only.

### 2.4 Claude Code for Everyone: ccforeveryone.com (and ccforpms.com)

- **Audience:** Non-technical people: writers, marketers, analysts, researchers and founders. A sister course covers PMs. [S10][S16]
- **Structure:**
  - Module 0 is setup.
  - Module 1, Fundamentals (~3 h, 8 lessons), covers the visual workspace, @files, agents, sub-agents, CLAUDE.md and commands.
  - Module 2, Vibe Coding (~1 to 2 h), covers plan, build, GitHub and deploying to Vercel.
  - There are also mini lessons, a Cowork guide, role guides, a cheat sheet, plain-English concepts, limits and pricing, and connector guides for Notion, Gmail and Drive. [S10]
- **Signature UX:**
  - **The course runs inside Claude Code.** Install the desktop app, paste a prompt that fetches the course, then type `/start-1-1`.
  - The website is only a companion, laid out as left sidebar, content and "On this page". It has search, a light/dark toggle and a "next lesson" link. [S10]
- **Visual design:** Dark default (theme-color #111). It uses screenshots of the desktop app's Code tab and an embedded video that the site itself flags as outdated. [S10]
- **Strengths:** The best answer so far for non-developers. It uses the desktop app rather than the terminal, has you learn by doing on real files, and pairs that with role guides.
- **Weaknesses:**
  - The website itself is a plain docs template with little visual identity.
  - It needs a $20/month plan before you can learn anything.
  - It has no progress tracking that the page shows, and its video is outdated by its own admission.
  - The licence is CC BY-NC-ND.
- **Up to date?** Yes, it covers Cowork and connectors.

### 2.5 From Zero to Claude Code: zero2claude.dev

- **Audience:** Complete beginners such as designers, marketers, writers, students and career switchers. [S11]
- **Structure:** 147 lessons in 14 levels (151 according to the site's own meta). The order is: computers → terminal → files → Git/GitHub → how software works → HTTP/APIs → Node.js → Claude Code → Skills → MCP → CLAUDE.md/memory → advanced → junior developer patterns → a final multiplayer tic-tac-toe project. [S11][S12]
- **UX:**
  - Game-like, with personalised onboarding, a progress dashboard, **streaks and 16 badges**.
  - There are 10 activity formats: terminal simulator, file-tree puzzles, matching, fill-in-the-blank and others.
  - It has 7 languages, a forum, and AI-assisted bug reports that open PRs. Lighthouse scores are near-perfect. [S11]
- **Visual design:** Dark (theme-color #09090B, black-translucent status bar). [S12]
- **Strengths:** It is the most complete "zero background" path and the most interactive. It is free and translated.
- **Weaknesses:**
  - It is **a CS bootcamp first**. Claude Code arrives at level 8, after roughly 90 lessons on terminal, Git and Node.
  - It reinforces the idea that you must learn to code before using Claude Code.
  - It uses the generic gamification kit (streaks and badges).
  - From level 8 on it needs a paid plan and a local install.
- **Up to date?** Yes, launched in 2026.

### 2.6 Learn Claude Code: claude.nagdy.me

- **Audience:** Developers from beginner to plugin author. It promises no setup and no API key. [S13]
- **Structure:**
  - 12 modules with level and duration chips, for example Getting Started (20 min) and Memory & CLAUDE.md (45 min).
  - Supporting tools: a Playground, Config Builder, Cheat Sheet, Feature Index, mods list, feedback tracker and changelog.
  - Available in English and Arabic. [S13]
- **UX:**
  - **Terminal simulators** let you practise slash commands, hooks and skills in the browser.
  - A **Config Builder** generates CLAUDE.md, hooks, agents, MCP and plugin config from forms.
  - Each module ends with a quiz that explains wrong answers.
  - Onboarding offers "Find your level" or "Jump in", and the homepage has an auto-playing terminal welcome.
  - A ⌘K command palette and a filterable feature index. [S13]
- **Visual design:** Terminal or command-line themed. The hero is followed by feature cards and a grid of module cards.
- **Strengths:** Very practical for developers. The config builder is a genuinely useful tool, and the site is versioned with a changelog.
- **Weaknesses:**
  - The curriculum is ordered by feature (inspired by claude-howto), not by the user's goals.
  - No progress tracking is mentioned.
  - The terminal-first look excludes non-developers.
- **Up to date?** Yes, at v1.33.8.

### 2.7 Claude Code Academy: claudecodeacademy.com (paid)

- **Audience:** Developers with some terminal comfort. [S14]
- **Structure:** 40 lessons in 9 units (~8 h). It has 166 quiz questions plus a 125-question final exam and a certificate. [S14]
- **UX:**
  - Replayable terminal simulations, drag-to-order puzzles, flashcards and type-the-command drills.
  - **XP, daily streaks and 10 badges**, with a dashboard.
  - Progress is saved without an account; signing in syncs it across devices. [S14]
- **Visual design:** Dark (#1F1E1D, close to Claude's own warm dark). It uses terminal mockups, Claude-style glyphs (✻ ❯ ⟳) and a text logo. [S14]
- **Business:** 3 free lessons, then $99 lifetime ($129 list, with a Black Friday sale until 11/29). [S14]
- **Strengths:** A polished drill-and-practice loop and a certificate.
- **Weaknesses:**
  - Paywalled.
  - Its glyphs and colours borrow Claude's own visual language, so it reads as "official-adjacent".
  - It is for developers only.
- **Up to date?** Yes, reviewed 2026-11-14.

### 2.8 ClaudeLog: claudelog.com

- **Audience:** Power users who want tips and "mechanics". [S15]
- **Structure:** A Docusaurus site.
  - Mechanics are grouped under Foundation (Plan Mode, Rewind, "CLAUDE.md Supremacy"), Agents, Performance and Development.
  - Other sections: Install, Tutorial, Configuration, Pricing, News, Changelog, CLAUDE.md Vault, MCPs and FAQs. [S15]
- **UX:** Sidebar, table of contents and breadcrumbs, next/prev links, DocSearch, a newsletter, and a "Live Users" counter (which showed 0). [S15]
- **Monetisation:** Paid logo and link slots ("Your Logo ($25)"), plus sponsor logos. [S15]
- **Strengths:** A personal voice, frequent updates and deep tips.
- **Weaknesses:**
  - A stock Docusaurus look.
  - Ad slots inside the content.
  - Inconsistent "last updated" dates on the same page (Sep 3 versus 11/11/2026).
  - Nothing for non-developers.

### 2.9 Claude Code Ultimate Guide: cc.bruniaux.com

- **Audience:** Beginners through CTOs and security staff, with role pages for PMs, tech leads, CTOs and security practitioners. [S18]
- **Structure:** The site is split into Start (9 pages), Build (17), Scale (12), Security (7), Resources (16) and the full Guide. The numbers are large:
  - 25K+ lines of guide text
  - 278 templates
  - 473 quiz questions
  - 243 CVE records
  - 58 recap cards
  - 53 diagrams
  - PDF and EPUB editions, RSS, and an MCP server for searching the guide from Claude Code
  - ~5.9k GitHub stars [S18]
- **UX:** Mega-menu, ⌘K search with section filters, a quiz, and numbered section headers in card layouts. It uses an orange Claude logo. [S18]
- **Strengths:** The most comprehensive reference available. It goes deep on security and governance, and it is very fresh (rebranded Nov 2026).
- **Weaknesses:** It overwhelms beginners. It is a "biggest number wins" encyclopedia whose scale is the product.

### 2.10 claude-howto (GitHub, luongnv89; site at luongnv.com/claude-howto)

- **Audience:** All levels. The guided path takes 11 to 13 hours. [S19]
- **Structure:** 10 numbered feature modules: slash commands → memory → skills → subagents → MCP → hooks → plugins → checkpoints → advanced → CLI. Mermaid diagrams explain the internals, and there are copy-paste templates and in-Claude quizzes (`/lesson-quiz`). It is translated into ja, uk, vi and zh. [S19]
- **Traction:** ~42k stars and 5.3k forks. [S20] It directly inspired claude.nagdy.me. [S13]
- **Strengths:** Visual diagrams and ready-to-use templates.
- **Weaknesses:**
  - It is a GitHub README, so its presentation is limited.
  - It is feature-ordered.
  - It was updated in July 2026 for v2.1.206, so it lags the current 2.1.28x line. [S19][S21]

### 2.11 awesome-claude-code (GitHub, hesreallyhim)

- **Format:** About 18 sections, including Start Here, From Anthropic, Docs and Learning, Security, Agent Orchestration, Skills, Memory, Status Lines and Design/UI. Every entry has a short blurb and a row of shields.io badges. There is a "Recently Added" graphic and an SVG ticker. [S24]
- **Strengths:** The community's index of record.
- **Weaknesses:** The blurbs are promotional ("the undisputed champion"). There is no learning path, and it is useless for non-developers. Many mirror sites (trackawesomelist, context-awesome and others) re-skin the same list. [S24]

### 2.12 Cheat sheets: Real Python, Claude Help Center, Linuxize and others

- **Real Python:**
  - A web page plus a 2-page PDF bonus.
  - Covers install, headless/CI, slash commands, keys, CLAUDE.md, permissions, settings, hooks, skills, subagents, MCP and the workflow loop.
  - Laid out as compact tables and code blocks, with heavy upsell callouts. It mentions v2.1.277 and v2.1.283. [S21]
- **Claude Help Center (official, Aug 2026):** Three tables: 13 terms, about 29 slash commands and 10 shortcuts, with advice to "keep it open or printed in your first weeks". [S25]
- **Others:** Many more on dev.to, GitHub, a Raycast extension and Linuxize PDFs. [S26]
- **Pattern:** Every cheat sheet is a static table that goes stale within weeks, and none adapts to the user's surface (desktop, terminal or IDE) or operating system.

### 2.13 AI Hero (Matt Pocock): aihero.dev

- **Format:**
  - Workshops such as "Getting To Know Claude Code", with 7 lessons: sessions, prompting in the terminal, IDE, going forwards and backwards in time, bash, and permissions.
  - A paid two-week cohort ($795), now waitlist-only.
  - Office hours and agent-friendly files in the footer. [S27][S16][S17]
- **Design:** A clean text column with a numbered lesson list, a theme toggle and search.
- **Strengths:** Engineering rigour and a trusted instructor.
- **Weaknesses:** Aimed at senior engineers, expensive, and only open in cohort windows.

### 2.14 YouTube-first: freeCodeCamp and creator channels

- **freeCodeCamp:**
  - A Claude Code full course (~1.5 h, Aug 2026) covers native install, VS Code, `/goal`, skills, MCP, GitHub and deploy. [S28]
  - ExamPro's "Claude Code Essentials" runs 12h44m in 44 chapters. [S17]
- **Creator channels:** IndyDevDan (advanced hooks and MCP), Anthropic's official channel, Fireship, Matthew Berman, Corbin Brown and Nick Saraev. None of them has a companion learning site. [S29][S17]
- **Strengths:** Free, and you can watch a real person work.
- **Weaknesses:** Long and hard to search. They go stale with every release, and there is no practice or progress.

### 2.15 Neighbour: Cursor Learn (cursor.com/learn)

- **Audience:** Developers who want to understand AI before they pay. The patterns "apply to any AI model or product". [S30]
- **Structure:** Two tracks.
  - AI Foundations (6 lessons): how models work, hallucination, tokens and pricing, context, tool calling, agents.
  - Coding Agents (7 lessons): working with agents, codebase, features, bugs, review/testing, customising, putting it together. [S30]
- **UX:**
  - Text-only lessons with analogies.
  - A left sidebar with numbered lessons and a ⌘K command palette.
  - A "You've completed this chapter" message with a **Keep learning** button.
  - A skip link. [S30]
- **Visual design:** Dark warm near-black (#14120b), in Cursor's docs chrome. [S30]
- **Strengths:** Calm, concise and concept-first. It is the best-written "how agents think" primer, and it is tool-agnostic.
- **Weaknesses:** No interactivity, visuals or practice, and nothing for non-developers.

### 2.16 Neighbour: GitHub Copilot (Microsoft Learn path, and "Copilot app for Beginners")

- **Microsoft Learn path:** "GitHub Copilot Fundamentals Part 1" has 9 modules, starting with Responsible AI and running through prompt engineering, Spaces, across-environments and unit tests.
  - Each module is a card with a badge and an "Add to plan" button.
  - Metadata shows level, role and product, and themes include high contrast. Last updated 2026-10-28. [S31]
- **Copilot app for Beginners (Sep 2026, open-source on GitHub):** [S32]
  - Chapter 00 (setup) plus 7 hands-on chapters, all on **one sample app** (`book-app-web`).
  - Every chapter follows the same template: why it matters, **a running real-world analogy (a recording studio)**, concepts, exercises, takeaways and an assignment.
  - A glossary, with terms explained on first use.
- **Strengths:** One sample project and one running metaphor make the course coherent. MS Learn's enterprise plumbing (badges, plans, achievements) works well.
- **Weaknesses:** MS Learn pages look like corporate docs. The beginners course is a GitHub repo, so presentation is limited.

### 2.17 Neighbour: vibe coding courses for non-developers

DataCamp ranked these in July 2026. [S33]

| Course | Price | Format |
|---|---|---|
| DataCamp "Vibe Coding with Replit" (top pick) | ~$25/month | Browser, 2 to 3 h, ship a Typeform clone |
| Coursera/Scrimba Vibe Coding Specialization | Free to audit | Multi-course |
| Zero to Mastery "Learn Vibe Coding" | Subscription | Video |
| DeepLearning.AI "AI Prompting for Everyone" | Free | Video |
| Udemy "Complete Vibe Coding for Non-Coders" | $15 to $85 | 15 to 20 h |
| Great Learning | Free | Video |

- **Other examples:** Maven's free "Claude Code 101: No Terminal Required" live Zoom lesson (316 enrolled, sells a 2-day Launchpad) [S22] and claudecourse.dev (free, 26 lessons, you build the course platform itself and deploy it to Vercel). [S34]
- **Pattern:** Video-heavy and tool-locked (Replit, Lovable, Cursor), usually behind a subscription. They pitch "ship an app in a weekend" but say little about safety, cost or keeping the result maintainable.

### 2.18 Single-page briefing: lpcode808.github.io/Claude-Code-101

- **Audience:** Non-programmers and vibe coders.
- **Format:** One long page with a collapsible, searchable sidebar.
  - A **slideshow mode** (press `S`, arrow keys) and keyboard shortcuts (T, ⌘K, ⌘/).
  - Jargon tables, numbered footnotes that cite sources, and a GitHub Pages deploy guide.
- **Freshness:** Last updated January 2026, so it is already ageing. [S35]
- **Worth borrowing:** The **presentable** mode (slides), which suits a champion teaching colleagues, and the footnotes that cite sources.

---

## 3. Best-in-class learning UX outside AI (inspiration)

| Site | Pattern worth stealing | Source |
|---|---|---|
| **Svelte tutorial** (svelte.dev/tutorial) | Prose and a live editor side by side, with a show text / show editor toggle on mobile. A **Solve** button reveals the answer and is disabled on lessons without exercises, with "use sparingly" advice. Lessons in 4 parts with "you are here" and prev/next. "Edit this page on GitHub". | [S36] |
| **react.dev/learn** | A "You will learn" outcomes box at the top, then progressive examples on one running mental model. Sandboxes have Reload, Clear and Fork, and long code is collapsed behind "Show more". **Paired step-by-step diagrams with captions, in light and dark variants.** A second-person, reassuring tone. | [S37] |
| **Learn Git Branching** | A terminal paired with a **live visualisation of the state it changes** (the commit graph), plus a goal state to match and a level picker. *The page's details came from general knowledge; the fetched shell only confirmed the terminal panel and "interactive Git visualization".* | [S38] |
| **Josh W. Comeau** | Whimsy as craft: 3D mascot, playful copy, spring animations, **sound effects with a "disable sounds" toggle**, and theme-aware illustrations. Interactive explainers for Flexbox, Grid and SVG paths. | [S39] |
| **Boot.dev** | A Socratic AI tutor ("Boots") that asks rather than tells. A "write some code (it takes 2 minutes)" demo before signup. A linear curriculum removes the "what next?" problem. A fantasy theme, XP and guilds. | [S40] |
| **Execute Program** | "Learn it. Code it. **Remember it.**" Spaced-repetition review of earlier lessons. *The fetched page was metadata only.* | [S41] |
| **Stripe docs** (general knowledge, not fetched) | A global language or SDK switcher rewrites every code sample. Three-column layout with sticky code. | — |

Takeaways for us:

1. Show the **state change** (Git Branching).
2. Show **one mental model, step by step** (React).
3. Show a **solve or escape hatch** (Svelte).
4. Hold a **persistent switcher** that rewrites content for the reader (Stripe).
5. Use **craft details** such as sound, motion and illustration (Comeau).
6. Use **retention** through spaced review (Execute Program).

---

## 4. Synthesis

### 4.1 Overused patterns to avoid (or use only deliberately)

1. **The dark near-black terminal look.** Zero2claude (#09090B), Claude Code Academy (#1F1E1D), ccforeveryone (#111), Cursor (#14120b) and Scrimba (dark) all use it, with terminal mockups in the hero. It signals "for hackers" and pushes non-developers away. [S10][S12][S14][S30]
2. **Borrowing Claude's own brand.** Terracotta orange, the ✻ glyph and a warm cream or warm-black surface (the official docs use cream `253 253 247` plus terracotta, with Anthropic Sans). Copycats look official-adjacent. That is a trust and legal risk for an unofficial site, and it makes them indistinguishable from one another. [S3][S14][S18]
3. **The feature-taxonomy curriculum.** Slash commands → memory/CLAUDE.md → skills → subagents → MCP → hooks → plugins. The same order appears in claude-howto, claude.nagdy.me, Academy 101 module 4, Real Python and ClaudeLog. It mirrors the docs and not the learner's goals. [S6][S13][S19][S21]
4. **Generic gamification:** XP, streaks, badges, leaderboards and "Find your level" quizzes (zero2claude, Claude Code Academy, Boot.dev). These are table stakes and bring no differentiation. [S11][S14][S40]
5. **Fake terminal simulators** as the main form of interactivity (nagdy, zero2claude, Claude Code Academy). They teach keystrokes, not judgement. They also can't show what matters most: Claude reading files, planning and asking permission.
6. **"Ultimate / Complete / Bible" encyclopedias that compete on volume.** The 25K-line guide with 473 quiz questions is the extreme case. Volume is not learnability. [S18]
7. **Stock docs chrome:** Docusaurus or Mintlify with sidebar, content and table of contents, plus ⌘K. It is fine as plumbing but anonymous as identity. [S10][S15]
8. **Monetisation clutter:** ad and sponsor slots in the content, newsletter walls, PDF email gates and upsell callouts. [S15][S21]
9. **Long video courses** that go stale within one release cycle. [S28][S17]

### 4.2 Unmet gaps

1. **A non-developer path that does not detour through computer science.** Zero2claude spends ~90 lessons on terminal, Git and Node before Claude Code. Academy courses assume the command line. Only ccforeveryone starts from the desktop app, and its website is a bare companion. [S6][S10][S11]
2. **Teaching that adapts to the user's surface.** Claude Code now runs in the terminal, VS Code, JetBrains, Desktop, Web, mobile and Slack. [S1] Every course picks one surface, usually the terminal. No learning site rewrites its lessons for the reader's surface and operating system.
3. **Visual mental models of how the agent behaves:** the agent loop, the context window filling, permissions, subagents and compaction. The official docs have exactly one interactive simulation (the context window). Everyone else uses static Mermaid diagrams or fake terminals. [S2][S19]
4. **Judgement, trust and safety for non-developers:** checking Claude's work, reading a diff, undo and rewind, permissions, secrets, and what things cost. These are deep for experts (the Ultimate Guide's security section [S18]) and nearly absent for beginners. The vibe coding courses skip them. [S33]
5. **Freshness you can see.**
   - Stale facts are everywhere: Fast.io still describes the old 21-lesson In Action course, ClaudeLog shows conflicting update dates, and claude-howto is pinned to v2.1.206. [S15][S17][S19]
   - Nobody shows *"verified against Claude Code vX on date"* on each lesson.
   - Nobody shows what changed in a lesson since your last visit.
6. **Real sessions shown as worked examples.** Lessons show invented terminal output, not annotated real transcripts that explain *why* Claude did something and where the human steered.
7. **Outcome-first entry points** ("I want to clean up a spreadsheet", "build my portfolio site", "automate a weekly report"). Prompt libraries tagged by role exist in the docs [S2], but no course is organised around outcomes.
8. **A low barrier to learning.** Most hands-on courses need a $20/month plan (ccforeveryone, zero2claude from level 8) or are paywalled ($99 to $795). Little can be learned or tried before paying. [S10][S11][S14][S17]
9. **Content for champions and teachers.** The official Champion kit exists [S2], and lpcode808 has a slideshow mode [S35]. Otherwise there is no polished way to present a lesson to a team.

### 4.3 Differentiation opportunities (design and UX)

1. **A persistent "my setup" switcher (the Stripe pattern for Claude Code).**
   - On first visit, ask two questions: where you'll use Claude Code (Desktop app, Web, VS Code, Terminal) and your operating system.
   - Every lesson, screenshot, shortcut and cheat sheet then rewrites itself for that setup, and the setup chip stays in the header.
   - This directly solves gap 2, and no competitor does it.
2. **Explorable explanations instead of fake terminals.**
   - A small set of high-craft interactive diagrams in the Ciechanowski, React or Learn Git Branching style.
   - Topics: the agent loop (read → plan → act → verify), a context window that fills and compacts as you scrub, a permission-modes dial, subagents fanning out, CLAUDE.md layering.
   - Show the *state* changing, not keystrokes. This builds on the one official interactive page and goes much further. [S2][S37][S38]
3. **Annotated real sessions ("session replays").**
   - Each lesson centres on a replayable transcript of a real Claude Code session, scrubbable step by step.
   - Margin notes explain the human's steering moves and Claude's choices.
   - A "what would you do here?" pause turns it into a judgement exercise.
4. **Outcome-first wayfinding, with features learned on the way.**
   - Enter by goal and role ("I'm a marketer who wants…"), not by feature.
   - Show a **map of capabilities you've unlocked** instead of XP and streaks, for example "You can now: hand off a multi-file change and review the diff".
   - Features such as CLAUDE.md, skills and MCP are introduced only when a goal needs them. This avoids the taxonomy curriculum (4.1 #3).
5. **Visible freshness as a brand promise.**
   - Each lesson carries a "Verified with Claude Code 2.1.x · 12 Nov 2026" stamp and a small "what changed" diff since your last visit.
   - Add a public changelog, and check automatically against the official docs' `llms.txt` to flag lessons that may be stale.
   - This turns the ecosystem's biggest weakness into our signature. [S2]
6. **A distinctive, light, editorial visual identity that is clearly not Anthropic's.**
   - Avoid black terminals, terracotta and ✻ glyphs.
   - Use a print or field-guide feel: a strong serif or grotesk pairing, generous whitespace, one unusual accent colour, and custom diagrammatic illustration (fitting a "wayfinding" or map metaphor).
   - Code and terminal appear only as small, well-labelled specimens.
   - Add craft touches such as motion with `prefers-reduced-motion`, optional sound, and light/dark artwork. [S39]
   - It should look unlike every competitor and avoid looking official.
7. **"Bring it into Claude Code" bridges.**
   - Every exercise ends with a one-click copyable prompt, or a `claude-cli://` deep link (which the docs support [S2]).
   - The learner runs the exercise in their own Claude Code, then comes back to compare against an annotated reference result.
   - This combines ccforeveryone's "learn inside the tool" with a website's polish, and needs no fake simulator.
8. **Free, accountless and calm.**
   - Progress lives in `localStorage`, with optional export or sync later.
   - No email gates, ads or upsells.
   - Spaced-repetition "refresher cards" (the Execute Program pattern) instead of streak guilt.
   - A **Present mode** turns any lesson into slides for champions teaching a team. [S35][S41]

---

## 5. Open questions for the owner

- Should we target the Desktop app or Web as the *default* surface for non-developers, with the terminal as the "developer lens"? This decides how screenshots are produced and how often they need refreshing.
- What is the brand stance on resemblance to Anthropic? Recommendation: a clear "unofficial" label and no Claude colours or glyphs.
- How should real session transcripts for replays be sourced (licensing and privacy), and how often should they be refreshed?

---

## Sources

- [S1] Claude Code docs, Overview: https://code.claude.com/docs/en/overview
- [S2] Claude Code docs, llms.txt index: https://code.claude.com/docs/llms.txt
- [S3] Raw HTML and CSS tokens of https://code.claude.com/docs/en/overview (Mintlify, Anthropic Sans, `--accent-brand: 15 63.1% 59.6%`, `--background-light: 253 253 247`), inspected 2026-11-23
- [S4] Context-window simulation: https://code.claude.com/docs/en/context-window.md
- [S5] Claude Code 101 (Skilljar): https://anthropic.skilljar.com/claude-code-101
- [S6] Claude Code 101 (Coursera): https://www.coursera.org/learn/claude-code-101
- [S7] Claude Code in Action: https://academy.claude.com/courses/claude-code-in-action
- [S8] Claude Academy home: https://academy.claude.com/ (anthropic.com/learn redirects here)
- [S9] DeepLearning.AI course: https://www.deeplearning.ai/alpha/short-courses/claude-code-a-highly-agentic-coding-assistant
- [S10] Claude Code for Everyone: https://ccforeveryone.com
- [S11] Article on From Zero to Claude Code: https://justbeingresourceful.com/2026/05/29/from-zero-to-claude-code-the-free-147-lesson-course-that-takes-beginners-to-shipping-real-projects/
- [S12] zero2claude.dev metadata: https://zero2claude.dev
- [S13] Learn Claude Code: https://claude.nagdy.me/
- [S14] Claude Code Academy: https://www.claudecodeacademy.com/
- [S15] ClaudeLog: https://www.claudelog.com
- [S16] Scrimba, "Best Claude Code Tutorials and Courses in 2026": https://scrimba.com/articles/best-claude-code-tutorials-and-courses-in-2026/
- [S17] Fast.io, "7 Best Claude Code Courses": https://fast.io/resources/claude-code-course-guide/
- [S18] Claude Code Ultimate Guide: https://cc.bruniaux.com/
- [S19] claude-howto (fork mirror of luongnv89): https://github.com/jack-github/claude-howto
- [S20] OSSInsight, luongnv89/claude-howto: https://ossinsight.io/analyze/luongnv89/claude-howto
- [S21] Real Python cheat sheet: https://realpython.com/cheatsheets/claude-code/
- [S22] Maven, "Claude Code 101: No Terminal Required": https://maven.com/p/535bf9
- [S23] Seibert Group, Claude Code for non-developers: https://agents.seibert.group/knowledge/non-developers
- [S24] awesome-claude-code README: https://raw.githubusercontent.com/hesreallyhim/awesome-claude-code/HEAD/README.md
- [S25] Claude Help Center cheatsheet: https://support.claude.com/en/articles/14553413-claude-code-cheatsheet
- [S26] Search results for Claude Code cheat sheets (Linuxize, GitHub, dev.to, Raycast), 2026-11-23
- [S27] AI Hero workshop: https://www.aihero.dev/workshops/claude-code~p9j8f
- [S28] freeCodeCamp Claude Code full course: https://www.freecodecamp.org/news/claude-code-full-course/
- [S29] "Claude Code YouTube channels worth your time in 2026": https://rentierdigital.xyz/blog/best-claude-code-youtube-channels-2026
- [S30] Cursor Learn: https://cursor.com/learn
- [S31] MS Learn, GitHub Copilot Fundamentals: https://learn.microsoft.com/en-us/training/paths/copilot
- [S32] Microsoft dev blog, "GitHub Copilot app for Beginners": https://developer.microsoft.com/blog/github-copilot-app-for-beginners/
- [S33] DataCamp, best vibe coding courses for non-technical founders: https://www.datacamp.com/blog/best-vibe-coding-course-for-non-technical-founders
- [S34] Claude Course: https://claudecourse.dev/
- [S35] Claude Code for Everyone briefing doc: https://lpcode808.github.io/Claude-Code-101
- [S36] Svelte tutorial: https://svelte.dev/tutorial
- [S37] React, Learn: https://react.dev/learn
- [S38] Learn Git Branching: https://learngitbranching.js.org/
- [S39] Josh W. Comeau: https://www.joshwcomeau.com/
- [S40] Boot.dev: https://www.boot.dev/
- [S41] Execute Program: https://www.executeprogram.com/
