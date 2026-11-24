# 002: Claude Code feature inventory (as of 2026-11-23)

**Question.** What is Claude Code's full current feature set, from primary sources? For each feature: a one-line description, the docs URL, whether it is beginner or advanced, how fast it changes, and what a non-developer could use it for. The answer feeds the curriculum and the plan for keeping lessons current.

**Sources used.** All are first-party:

- The docs at `code.claude.com/docs`. The old `docs.claude.com/en/docs/claude-code/*` URLs now return a 301 redirect to `code.claude.com/docs/en/*`. The machine-readable index is https://code.claude.com/docs/llms.txt (about 205 pages per language).
- The docs changelog page, https://code.claude.com/docs/en/changelog. It says it is "generated from the CHANGELOG.md on GitHub".
- `anthropics/claude-code` `CHANGELOG.md`, fetched raw from https://raw.githubusercontent.com/anthropics/claude-code/main/CHANGELOG.md. It matches the docs page: both list 446 versions, and both have **2.1.330 as the latest, dated 2026-11-20**.
- The Agent SDK changelogs (`anthropics/claude-agent-sdk-typescript`, `anthropics/claude-agent-sdk-python`).

Everything was fetched on 2026-11-23. Unless a claim cites another URL, it comes from the docs page linked in its row.

**Caveat on volatility numbers.** The "churn" figures come from a keyword count over changelog bullet lines (method in the appendix). They show relative change activity. They do not measure breaking changes. Where the changelog records an actual rename, removal or deprecation, the row says so explicitly.

---

## 1. Headline findings

1. **Releases are extremely frequent.**
   - 446 versions shipped between 0.2.21 (2025-04-02) and 2.1.330 (2026-11-20).
   - The pace is 26 to 28 releases a month through 2026, and 74 releases in the last 90 days (about 6 a week).
   - 55% of all changelog lines ever written were added in the last 90 days.
   - Any lesson that quotes exact UI text, flags, model names or defaults will go stale within weeks.
2. **The core mental model is stable. The edges are not.**
   - These have kept the same basic shape since mid-2025: CLAUDE.md, the agentic loop, permissions and plan mode, MCP, hooks, subagents, and `-p` headless mode.
   - Defaults, names and surrounding product surfaces change constantly. Recent examples:
     - **Auto mode became the default permission mode** in v2.1.283 (2026-09-25).
     - Custom slash commands were **merged into skills** in v2.1.3 (2026-01-09).
     - The `/agents` wizard was **removed** in v2.1.198 (2026-07-01).
     - `ultraplan` was **removed** in v2.1.222 (2026-08-04).
     - `/simplify` was **renamed** to `/code-review` in v2.1.147 (2026-05-21). `/simplify` now exists again as a separate cleanup skill.
     - "Routines" were renamed to **cloud scheduled tasks**.
     - "Extra usage" was renamed to **usage credits** in v2.1.144.
3. **Models are the most volatile topic.**
   - The `opus` alias has pointed at Opus 4.6/4.7, then Opus 4.8 (v2.1.154, 2026-05-28), then Opus 5 (v2.1.219, 2026-07-24), then Opus 5.5 (v2.1.280, 2026-09-22).
   - `sonnet` moved to Sonnet 5.5 (v2.1.284) and `haiku` to Haiku 5.5 (v2.1.293).
   - A new top tier, **Fable**, appeared. `fable` now means Fable 5.2 (v2.1.321, 2026-11-09).
   - The default model on subscription plans is now Opus 5.5.
   - Teach aliases, not version numbers.
4. **The newest and least settled areas** are:
   - mods (since about v2.1.287, 2026-10-01)
   - cloud sessions, Projects and scheduled tasks
   - artifacts
   - agent view, agent teams and dynamic workflows
   - Code Review and ultrareview
   - the VS Code extension and Desktop
   - fast mode and Code Mode

   Several of these are labelled *research preview*, *public beta* or *experimental* in the docs (section 4).
5. **The product is now explicitly multi-surface.** It runs in the CLI, Desktop (the Code tab), VS Code, JetBrains, the web, mobile, Slack and CI.
   - Many features need a **claude.ai subscription** (Pro, Max, Ultra, Team or Enterprise) rather than an API key: cloud sessions, mobile, Desktop, Remote Control, Chrome, computer use, artifacts, voice, scheduled cloud tasks and Code Review. See https://code.claude.com/docs/en/feature-availability.
   - This matters for which audience can follow which lesson.
6. **The docs now cover first-time terminal users and non-coding work.**
   - There is a terminal guide for new users (https://code.claude.com/docs/en/terminal-guide).
   - The Desktop app works without a terminal.
   - Output styles include a "non-engineering role" use.
   - The prompt library is "tagged by task and role", drawing on how Anthropic's legal, marketing, design and data teams use it.
   - Non-developers are a supported audience, not a hack.

---

## 2. Feature inventory

Legend:

- **Level.** B = beginner (first week); I = intermediate; A = advanced, admin or builder.
- **Concept.** Is the mental model stable? Stable, Settling, or New.
- **Churn.** How often the details change: Low, Med, High or Very high. It is based on changelog activity over the last 90 days and recorded renames or removals (appendix).
- **Non-dev.** A realistic use for someone who does not write code, or "-" if there isn't one.

### 2.1 Install, sign-in and surfaces

| Feature | One-line description | Docs | Level | Concept / Churn | Non-dev use |
|---|---|---|---|---|---|
| CLI install | Native installer: `curl -fsSL https://claude.ai/install.sh \| bash` on macOS, Linux and WSL; `irm https://claude.ai/install.ps1 \| iex` on Windows; plus Homebrew (`claude-code` stable or `claude-code@latest`), WinGet, apt, dnf and apk. Native installs auto-update; package managers don't by default. Needs macOS 13+, Windows 10 1809+, Ubuntu 20.04+, Debian 10+ or Alpine 3.19+, and 4 GB RAM. | https://code.claude.com/docs/en/quickstart, https://code.claude.com/docs/en/setup | B | Stable / Low | Yes, with the terminal guide (https://code.claude.com/docs/en/terminal-guide) |
| Authentication and plans | Sign in with a claude.ai subscription (Pro, Max, Ultra, Team or Enterprise), a Claude Console API account, or a cloud provider (Bedrock, Google Cloud, Microsoft Foundry, Claude Platform on AWS). The auth method decides which features exist. | https://code.claude.com/docs/en/authentication, https://code.claude.com/docs/en/feature-availability | B | Settling / Med. New providers and gateway options keep arriving, e.g. Enterprise Admin Console sign-in in 2.1.330. | Yes. Choosing a plan is the first decision. |
| Desktop app (Code tab) | The Claude Desktop app's **Code** tab: a GUI for local sessions with parallel sessions in git isolation, a diff viewer, app preview, an integrated terminal and editor, computer use and scheduled tasks. Runs on macOS and Windows; Linux is in beta. The same app hosts chat and Cowork. | https://code.claude.com/docs/en/desktop-quickstart, https://code.claude.com/docs/en/desktop | B | Settling / High (about 80% of Desktop-related changelog lines are from the last 90 days) | **Best entry point**: no terminal, visual diffs, previews |
| Web (cloud sessions) | Sessions at claude.ai/code that run on Anthropic-managed VMs (or self-hosted runners), clone a GitHub repo, push a branch, and keep running after you disconnect. `--cloud` and `--teleport` move sessions between the cloud and the terminal. | https://code.claude.com/docs/en/web-quickstart, https://code.claude.com/docs/en/claude-code-on-the-web | B/I | Settling / Very high | Yes: "fix this on our site repo" from a browser, review the PR |
| Projects | One ongoing conversation at claude.ai/code or in Desktop where Claude starts parallel "threads" (cloud sessions) for a stream of tasks and reports back. **Public beta** on Pro, Max and Ultra. | https://code.claude.com/docs/en/claude-projects | I | New / Very high | Yes: hand off a backlog of small tasks |
| Mobile | The Claude iOS and Android app acts as a *client*: start or monitor cloud sessions and Projects, or steer local sessions via Remote Control. No code runs on the phone. | https://code.claude.com/docs/en/mobile | B | Settling / High | Yes: approve and monitor on the go |
| Remote Control | Drive a session that is running on your own machine (CLI, Desktop or VS Code) from claude.ai/code or the mobile app. Start it with `claude remote-control` or `/remote-control`. | https://code.claude.com/docs/en/remote-control | I | Settling / High (first in the changelog around v2.1.53, 2026-02) | Maybe |
| VS Code extension | Native panel with inline diffs, @-mentions, plan review and a mode selector. Also installs in Cursor and other VS Code forks via Open VSX. | https://code.claude.com/docs/en/vs-code | B | Settling / Very high (539 `[VSCode]` lines in the last 90 days) | Limited |
| JetBrains plugin | Plugin for IntelliJ, PyCharm, WebStorm and other JetBrains IDEs. It runs the CLI in the IDE terminal, with a diff viewer and selection sharing. | https://code.claude.com/docs/en/jetbrains | B | Stable / Low | - |
| Chrome integration | Uses the Claude in Chrome extension from the CLI or VS Code to test web apps, read console logs, fill forms and scrape pages, using your logged-in browser. | https://code.claude.com/docs/en/chrome | I | Settling / Med-High | Yes: form filling, data extraction (with care) |
| Computer use (CLI/Desktop) | Claude opens apps, clicks, types and sees the screen. **Research preview**: macOS only (in the CLI), Pro, Max and Ultra only, and not in `-p`. | https://code.claude.com/docs/en/computer-use | A | New / High | Yes, but preview-grade |
| Slack / Claude Tag | Mention `@Claude` in Slack to start a cloud session and get a PR back. The per-user version needs Pro, Max or Ultra. **Claude Tag** is the Team/Enterprise shared identity. | https://code.claude.com/docs/en/slack, https://code.claude.com/docs/en/claude-tag | I | New / High | Yes: turn a bug report in chat into a PR |
| Voice dictation | Speak prompts in the CLI (hold-to-record or tap-to-record). Needs a claude.ai account. | https://code.claude.com/docs/en/voice-dictation | B | Settling / Med | Yes |
| Terminal UI | Fullscreen renderer, themes, Vim mode, keybindings, accessibility and screen-reader support. | https://code.claude.com/docs/en/terminal-config, https://code.claude.com/docs/en/fullscreen, https://code.claude.com/docs/en/accessibility, https://code.claude.com/docs/en/keybindings | B/I | Stable / Med. `/vim` was removed in v2.1.92 in favour of `/config`; `/tui` appeared later. | Accessibility page matters |

### 2.2 Core usage

| Feature | One-line description | Docs | Level | Concept / Churn | Non-dev use |
|---|---|---|---|---|---|
| Agentic loop and built-in tools | Claude plans, then calls tools (Read, Edit, Write, Bash/PowerShell, Grep, Glob, WebFetch, WebSearch, Agent, LSP, Task*, Cron*, and others; about 50 are listed) in a loop until the task is done. | https://code.claude.com/docs/en/how-claude-code-works, https://code.claude.com/docs/en/tools-reference | B | Stable / Med (tools get added and removed, e.g. TaskOutput removed in v2.1.277) | Yes: the core concept |
| Context window and compaction | Context fills up; `/context` visualises it, and `/compact` and auto-compact summarise. Prompt caching explains why switching model mid-session is slow. | https://code.claude.com/docs/en/context-window, https://code.claude.com/docs/en/prompt-caching | B/I | Stable / Med | Yes: "why did it forget?" |
| Sessions | `--continue`, `--resume`, `/resume`, naming, `/branch` (renamed from `/fork` in v2.1.77), exporting transcripts. | https://code.claude.com/docs/en/sessions | B | Stable / Med | Yes |
| Checkpointing / rewind | Edits are captured automatically before each prompt. `/rewind` (or `/undo`) rolls back code and/or conversation. | https://code.claude.com/docs/en/checkpointing | B | Stable / Med | **Yes: the safety net that makes experimenting OK** |
| Best practices and prompt library | Official prompting guidance ("describe the outcome", "give it a way to check its work"), plus copy-paste prompts tagged by task and role. | https://code.claude.com/docs/en/best-practices, https://code.claude.com/docs/en/prompt-library, https://code.claude.com/docs/en/common-workflows | B | Stable / Low | **Yes** |
| `/powerup` | Built-in interactive lessons with animated demos that teach Claude Code features. | https://code.claude.com/docs/en/commands | B | New / ? | Yes. It is also a "competitor" or complement to an external course. |
| Worktrees | Isolate parallel sessions in separate git worktrees (`--worktree`, `.worktreeinclude`). | https://code.claude.com/docs/en/worktrees | I/A | Stable / Med | - |

### 2.3 CLAUDE.md and memory

| Feature | One-line description | Docs | Level | Concept / Churn | Non-dev use |
|---|---|---|---|---|---|
| CLAUDE.md | Markdown instructions loaded every session. There are managed, user (`~/.claude/CLAUDE.md`), project and nested scopes, and `@path` imports. `/init` generates one and `/memory` edits it. The docs recommend keeping it under about 200 lines. | https://code.claude.com/docs/en/memory | **B** | **Stable** / Low-Med (43 changelog lines in the last 90 days) | **Yes: "house rules" for any folder of documents** |
| AGENTS.md support | Claude can read a repo's `AGENTS.md` in place of CLAUDE.md, so one file can be shared with other coding tools. | https://code.claude.com/docs/en/memory#agents-md | B/I | New-ish / Med | - |
| `.claude/rules/` | Modular, optionally path-scoped rule files with frontmatter. | https://code.claude.com/docs/en/memory#organize-rules-with-claude/rules/ | I | Settling / Med | Maybe |
| Auto memory | Claude writes its own notes (`MEMORY.md`, per repo; the first 200 lines or 25 KB load) from your corrections. Toggle it via `/memory`. Subagents can have their own memory. | https://code.claude.com/docs/en/memory#auto-memory | B/I | Settling / Med | Yes |
| `.claude` directory map | An interactive explainer of every file Claude Code reads from `.claude/` and `~/.claude/`. | https://code.claude.com/docs/en/claude-directory | I | Settling / Med | - |

### 2.4 Slash commands and skills

| Feature | One-line description | Docs | Level | Concept / Churn | Non-dev use |
|---|---|---|---|---|---|
| Built-in commands | 121 entries in the commands table (built-ins plus bundled skills and workflows), e.g. `/init`, `/model`, `/effort`, `/plan`, `/compact`, `/context`, `/usage`, `/rewind`, `/doctor`, `/mcp`, `/plugin`, `/config`, `/resume`, `/code-review`, `/loop`, `/goal`, `/schedule`. | https://code.claude.com/docs/en/commands | B | Stable concept / **Very high** (commands renamed, aliased or removed often; see section 3) | Yes, for about 10 core ones |
| Skills (incl. custom commands) | A `SKILL.md` folder with instructions and optional scripts. Claude loads it when relevant, or you run `/skill-name`. It follows the open Agent Skills standard (agentskills.io). Old `.claude/commands/*.md` still work: commands were **merged into skills** in v2.1.3. Skills support frontmatter, `context: fork`, arguments, dynamic context injection, and skills synced from claude.ai. | https://code.claude.com/docs/en/skills | **B to create, I/A to master** | Settling / High (Skills were added in v2.0.20, 2025-10; 187 skill lines in the last 90 days) | **Yes: package a repeatable procedure (report, checklist, write-up) as `/my-task`** |
| Bundled skills and workflows | Prompt-based built-ins such as `/doctor`, `/code-review`, `/batch`, `/debug`, `/loop`, `/claude-api`, `/verify`, `/design`, `/slides`, `/deep-research` (a workflow). Turn them off with `disableBundledSkills`. | https://code.claude.com/docs/en/skills#bundled-skills | B/I | New / Very high | **Yes: `/slides`, `/design`, `/deep-research`** |
| Output styles | Change Claude's role, tone or format. Built-ins: Default, Proactive, Concise, Explanatory, Learning. You can also write custom ones. *History:* deprecated in v2.0.30 (2025-10), later revived. Concise was added in v2.1.237 and `/output-style` came back in v2.1.269. | https://code.claude.com/docs/en/output-styles | B | **Unstable history** / Low recently | **Yes: the "Learning" and "Explanatory" styles, or a non-engineering role** |
| Status line | A custom status bar script showing context use, cost and git state. | https://code.claude.com/docs/en/statusline | I | Stable / Low-Med | - |

### 2.5 Subagents and parallel work

| Feature | One-line description | Docs | Level | Concept / Churn | Non-dev use |
|---|---|---|---|---|---|
| Subagents | Specialised workers with their own context window, system prompt, tools, model and permissions, defined in `.claude/agents/*.md`. Built-ins include Explore and Plan. They return a summary. **The `/agents` wizard was removed in v2.1.198**: ask Claude to create the agent, or edit the file yourself. | https://code.claude.com/docs/en/sub-agents | I | Stable concept / High (custom subagents were added in v1.0.60, 2025-07-24; the authoring UX changed) | Maybe: a "researcher" agent that reads many files |
| Forked subagents | `/subtask`: a background subagent that inherits the full conversation. | https://code.claude.com/docs/en/sub-agents#fork-the-current-conversation | I | New / High | - |
| Agent view | `claude agents`: dispatch and monitor many background sessions from one screen. **Research preview.** | https://code.claude.com/docs/en/agent-view | A | New / High | - |
| Agent teams | A lead coordinates teammate sessions through a shared task list and messages. **Experimental, disabled by default** (env flag). | https://code.claude.com/docs/en/agent-teams | A | New / High | - |
| Dynamic workflows | Claude writes a JS script that orchestrates many subagents and cross-checks results, e.g. for audits or big migrations. The trigger keyword was renamed `workflow` to `ultracode` in v2.1.160. | https://code.claude.com/docs/en/workflows | A | New / High | Indirectly, via `/deep-research` |
| Cross-session messaging | Sessions list and message each other locally, across machines, or in the cloud. | https://code.claude.com/docs/en/cross-session-messaging | A | New / ? | - |
| Overview: choosing an approach | Compares subagents, agent view, agent teams, workflows and Projects. | https://code.claude.com/docs/en/agents | I | New / High | - |

### 2.6 Hooks, automation and scheduling

| Feature | One-line description | Docs | Level | Concept / Churn | Non-dev use |
|---|---|---|---|---|---|
| Hooks | Deterministic handlers on lifecycle events, configured in settings. There are 33 events, e.g. PreToolUse, PostToolUse, UserPromptSubmit, Stop, SessionStart, Notification and PermissionRequest. Handler types: shell command, HTTP, MCP tool, prompt (model-judged) or agent. They can block, modify or inject context. | https://code.claude.com/docs/en/hooks-guide, https://code.claude.com/docs/en/hooks | I (notification hook) / A (policy hooks) | Stable concept / High (hooks have existed since about v1.0.38, 2025-06; 322 lines in the last 90 days, with new events and types regularly) | Yes: "ping me when Claude needs me" (the docs' own first example) |
| `/loop` and session cron | Re-run a prompt on an interval while the session is open. Since v2.1.330 these run for up to 30 days (previously 7). | https://code.claude.com/docs/en/scheduled-tasks | I | New / High | Yes: polling or reminders |
| Desktop scheduled tasks | Recurring local tasks in Desktop. The docs give "morning briefings" as an example. | https://code.claude.com/docs/en/desktop-scheduled-tasks | B/I | New / High | **Yes** |
| Cloud scheduled tasks (formerly "routines") | A saved prompt, repos and connectors that run on a schedule, through an API POST, or on GitHub events. **Research preview.** `/schedule`. | https://code.claude.com/docs/en/routines | I | New / Very high (renamed) | Yes: weekly report generation |
| `/goal` | Set a completion condition, and Claude keeps taking turns until a model judges it met. Added in v2.1.139 (2026-05-11). | https://code.claude.com/docs/en/goal | I | New / Med | Yes |
| Channels | An MCP server pushes events (Telegram, Discord, webhooks, CI) into a running session. **Research preview.** | https://code.claude.com/docs/en/channels | A | New / High | - |
| Deep links | `claude-cli://` URLs open a session in a given repo with a given prompt. | https://code.claude.com/docs/en/deep-links | A | New / ? | - |

### 2.7 MCP, plugins, marketplaces and mods

| Feature | One-line description | Docs | Level | Concept / Churn | Non-dev use |
|---|---|---|---|---|---|
| MCP servers | Connect external tools and data over the Model Context Protocol. Transports: HTTP, SSE, stdio and WebSocket. Scopes: local, project (`.mcp.json`) and user. Managed with `claude mcp add`, `/mcp`, OAuth and tool search. claude.ai connectors load when you sign in with a subscription. | https://code.claude.com/docs/en/mcp-quickstart, https://code.claude.com/docs/en/mcp | I (adding one) / A (building one) | Stable concept / High (331 lines in the last 90 days; new runtime, MCP tasks in public beta) | **Yes: connect Notion, Google Drive, Linear, Slack, etc.** |
| Plugins | An installable bundle (`.claude-plugin/plugin.json`) of skills, agents, hooks, MCP servers and a hooks module. Skills are namespaced (`/plugin:skill`). Install with `/plugin` or `claude plugin install x@marketplace`. Install scopes, dependencies and evals (`claude plugin eval`). "Plugin System Released" in v2.0.12 (2025-10-09). | https://code.claude.com/docs/en/plugins/overview, https://code.claude.com/docs/en/plugins/install, https://code.claude.com/docs/en/plugins/create | B (install) / A (author) | Settling / **Very high** (461 lines in the last 90 days) | **Yes: install a ready-made kit** |
| Marketplaces | Catalogs defined by `.claude-plugin/marketplace.json`. Anthropic runs two: **`claude-plugins-official`** (auto-added on first interactive run) and **`claude-community`**, plus topic marketplaces such as `anthropics/skills` and `anthropics/knowledge-work-plugins`. The old `claude-code-plugins` marketplace in `anthropics/claude-code` is **deprecated**. | https://code.claude.com/docs/en/plugins/anthropic-marketplaces, https://code.claude.com/docs/en/plugins/create-marketplace | I | Settling / High | Yes: `knowledge-work-plugins` is aimed at non-coding work |
| Code intelligence (LSP) plugins | Language-server plugins give Claude type errors and symbol navigation. | https://code.claude.com/docs/en/plugins/code-intelligence | I | Settling / Med | - |
| Mods | A plugin with a JS/TS "hooks module" that runs *inside* Claude Code. It can draw panes and bands, restyle the UI, intercept tool calls, and add instant commands. Works in the CLI, Desktop and VS Code. Some built-ins are mods (`/diff`, "easel" charts from v2.1.330). | https://code.claude.com/docs/en/plugins/mods/overview | A | **New** (about v2.1.287, 2026-10-01) / **Very high** | No. Most volatile area; avoid in early lessons. |
| Plugin security and trust | How to judge a plugin or mod before installing it. They run with your permissions. | https://code.claude.com/docs/en/plugins/security | B/I | Stable / Low | **Yes: an essential safety lesson** |

### 2.8 Permissions, safety and settings

| Feature | One-line description | Docs | Level | Concept / Churn | Non-dev use |
|---|---|---|---|---|---|
| Permission modes | Six modes, cycled with Shift+Tab: `default` (Manual), `acceptEdits`, `plan`, `auto`, `dontAsk`, `bypassPermissions`. In **auto**, a classifier model reviews actions; it has been the built-in starting mode for terminal and VS Code since **v2.1.283 (2026-09-25)**. `-p` and the SDK still start in `default`. | https://code.claude.com/docs/en/permission-modes | **B** | Stable concept / **High** (auto mode's default status and rules change often) | **Yes: crucial for trust** |
| Plan mode | Claude researches and proposes a plan, and edits are blocked until you approve it. `/plan [task]`. | https://code.claude.com/docs/en/permission-modes#analyze-before-you-edit-with-plan-mode | **B** | Stable / Med (`ultraplan` removed in v2.1.222) | **Yes: "show me what you'd do first"** |
| Auto mode configuration | Admins and users tell the classifier which repos, buckets and domains are trusted, and set allow and hard-deny rules. | https://code.claude.com/docs/en/auto-mode-config | A | New / High | - |
| Permission rules | Allow, ask and deny rules such as `Bash(npm test)` and `Tool(param:value)`. Deny always wins. Some actions (critical `rm`, AskUserQuestion) are never auto-approved. | https://code.claude.com/docs/en/permissions | I | Stable / Med-High | Partial |
| Sandboxing | A built-in Bash sandbox (Seatbelt on macOS; bubblewrap on Linux and WSL2; not native Windows) restricts filesystem and network access. Also covers containers, VMs and dev containers. | https://code.claude.com/docs/en/sandboxing, https://code.claude.com/docs/en/sandbox-environments | A | Settling / High | - |
| Settings | JSON in four scopes plus managed: user `~/.claude/settings.json`, shared project `.claude/settings.json`, local `.claude/settings.local.json`, and managed (file, MDM or server-delivered). `/config` and `/config key=value`. There is a full key reference. | https://code.claude.com/docs/en/settings, https://code.claude.com/docs/en/settings-reference | I | Stable structure / **High** (keys added often; 424 settings lines in the last 90 days) | Light: `/config` only |
| Security and data | Safeguards, data usage, ZDR, HIPAA setup. | https://code.claude.com/docs/en/security, https://code.claude.com/docs/en/data-usage | B (overview) | Stable / Low | **Yes: "what can it see or do?"** |
| Admin and enterprise | Managed settings, server-managed settings, managed MCP, gateways (Claude apps gateway), Bedrock, Google Cloud, Foundry, network config, analytics, OpenTelemetry. | https://code.claude.com/docs/en/admin-setup, https://code.claude.com/docs/en/third-party-integrations | A | Settling / High | - |

### 2.9 Headless, SDK and CI

| Feature | One-line description | Docs | Level | Concept / Churn | Non-dev use |
|---|---|---|---|---|---|
| Headless mode (`claude -p`) | Run non-interactively for scripts and CI, with `--output-format json/stream-json`, `--allowedTools`, `--permission-mode`, and `--bare` for fast startup. | https://code.claude.com/docs/en/headless, https://code.claude.com/docs/en/cli-reference | A | Stable / Med | - |
| Agent SDK (Python / TypeScript) | Claude Code's agent loop, tools, hooks, subagents, MCP, sessions, skills and plugins as a library. Renamed from "Claude Code SDK" to "Claude Agent SDK" in v2.0.0 (2025-09-29). The TS SDK version tracks the CLI (0.3.330 matches 2.1.330); Python is at 0.2.178. Third parties may not offer claude.ai login in SDK products unless approved. | https://code.claude.com/docs/en/agent-sdk/overview | A | Settling / High (e.g. the TS "V2 session API" was removed) | - |
| GitHub Actions | `anthropics/claude-code-action@v1`: `@claude` in issues and PRs, automated tasks, issue-to-PR. Quick setup with `/install-github-app`. Also works through Bedrock, Google Cloud or Foundry. | https://code.claude.com/docs/en/github-actions, https://code.claude.com/docs/en/github-actions-cloud-providers | I/A | Stable (v1) / Med | Maybe: `@claude` in an issue comment |
| GitLab CI/CD | The same pattern for GitLab. | https://code.claude.com/docs/en/gitlab-ci-cd | A | Stable / Low | - |
| Code Review (managed) | Automatic PR reviews through the Claude GitHub App, tuned with `REVIEW.md`. **Team and Enterprise only**, billed through usage credits. | https://code.claude.com/docs/en/code-review | I | New (about 2026) / High | - |
| `/code-review` (local) and ultrareview | Local review of a branch or PR at an effort level (`--fix`, `--comment`). `/code-review ultra` is a cloud multi-agent review (**research preview**). | https://code.claude.com/docs/en/code-review-local, https://code.claude.com/docs/en/ultrareview | I | New / High (`/simplify` renamed to `/code-review` in v2.1.147) | - |
| Security scanning plugins | `security-guidance` (self-review while writing) and the Claude Security plugin (codebase scan). | https://code.claude.com/docs/en/security-guidance, https://code.claude.com/docs/en/claude-security | I | New / ? | - |
| Artifacts | Publish session output as a live, private, shareable web page on claude.ai, e.g. dashboards, timelines or reports. Pro, Max, Ultra, Team and Enterprise. | https://code.claude.com/docs/en/artifacts | B/I | New / Very high | **Yes: turn analysis into a shareable page** |

### 2.10 Models, cost and usage

| Feature | One-line description | Docs | Level | Concept / Churn | Non-dev use |
|---|---|---|---|---|---|
| Model selection | `/model` and `--model` with aliases: `default`, `best`, `fable`, `opus`, `sonnet`, `haiku`, `opus[1m]`, `sonnet[1m]`, `opusplan`. The default on subscriptions and the API is **Opus 5.5**. Fable 5.2 is the top tier; it is never the default and may bill to usage credits. Aliases resolve differently per provider. | https://code.claude.com/docs/en/model-config | B | **Volatile**: aliases re-pointed 9+ times in 2026 (version history table) | Yes: "which brain?" |
| Effort and thinking | `/effort` with `low`, `medium`, `high`, `xhigh`, `max` (support varies by model). `ultrathink` for one-off deep reasoning. Extended context (1M). | https://code.claude.com/docs/en/model-config#adjust-effort-level | I | Settling / High | Light |
| Fast mode | `/fast` gives faster Opus and Fable output at higher price. GA on Fable 5.2 and Opus 5.5. Opus 4.8 fast mode is **deprecated and removed 2026-11-30**. | https://code.claude.com/docs/en/fast-mode | I | Volatile / High | - |
| Advisor tool / Code Mode | Advisor: pairs the main model with a stronger advisor model (experimental). Code Mode: Claude writes JS that batches tool calls (**experimental**). | https://code.claude.com/docs/en/advisor, https://code.claude.com/docs/en/code-mode | A | New / ? | - |
| `/usage` (`/cost`, `/stats`) | Session cost (estimated at list price), plan usage bars, a breakdown of what counts against limits, and prompt-cache stats. `/usage-credits` buys or requests overage. | https://code.claude.com/docs/en/costs | **B** | Settling / Med-High (renames: "extra usage" became "usage credits") | **Yes: "am I about to hit my limit?"** |
| Cost guidance | Docs figures for enterprise deployments: about $13 per developer per active day and $150 to $250 per developer per month, with 90% of users under $30 per active day. Advice: manage context, choose models, use subagents, move CLAUDE.md content into skills. | https://code.claude.com/docs/en/costs | B/I | Stable / Low | Yes |
| Team analytics and OTel | Usage dashboard (contribution metrics in **public beta**) and OpenTelemetry export. | https://code.claude.com/docs/en/analytics, https://code.claude.com/docs/en/monitoring-usage | A | Settling / Med | Managers |
| `/insights` and `/team-onboarding` | An HTML report on your own usage patterns, and a generated onboarding guide built from 30 days of usage. | https://code.claude.com/docs/en/commands | B/I | New / ? | Yes |

---

## 3. Recent renames, removals and deprecations

Each row is a lesson that would have broken. Source: `CHANGELOG.md` "Removed/Renamed/Deprecated" bullets, with version dates from the changelog.

| Version (date) | Change |
|---|---|
| 2.0.0 (2025-09-29) | Claude Code SDK renamed **Claude Agent SDK** |
| 2.0.30 (2025-10-30) | Output styles deprecated. Later reversed: Concise added in v2.1.237, `/output-style` re-added in v2.1.269. |
| 2.1.3 (2026-01-09) | Slash commands and skills merged |
| 2.1.68 (2026-03-04) | Opus 4 and 4.1 removed from the first-party API |
| 2.1.73 (2026-03-11) | `/output-style` deprecated in favour of `/config` (later re-added) |
| 2.1.77 (2026-03-17) | `/fork` renamed `/branch`. `/fork` returned in VS Code in 2.1.330. |
| 2.1.92 (2026-04-04) | `/vim` removed (use `/config`) |
| 2.1.144 (2026-05-19) | "Extra usage" became **usage credits** (`/usage-credits`) |
| 2.1.147 (2026-05-21) | `/simplify` renamed `/code-review` |
| 2.1.160 (2026-06-02) | Workflow trigger keyword changed from `workflow` to `ultracode` |
| 2.1.198 (2026-07-01) | `/agents` wizard removed |
| 2.1.222 (2026-08-04) | `ultraplan` removed |
| 2.1.277 (2026-09-18) | TaskOutput tool removed |
| 2.1.283 (2026-09-25) | Auto mode became the built-in starting permission mode |
| 2.1.316 (2026-10-31) | Fast mode on Opus 4.8 deprecated; removal on 2026-11-30 |
| 2.1.323 (2026-11-12) | `subagentStatusLine` setting removed; plugin `agent` setting deprecated |
| Docs (current) | "Routines" became "cloud scheduled tasks". The `claude-code-plugins` marketplace is deprecated. The standalone Claude Design site closes by 2026-12-14. Dispatch "isn't available to new users". |

---

## 4. Preview, beta and experimental labels in the docs (2026-11-23)

These are the least stable topics. Label them in lessons and re-check them often.

- **Research preview:**
  - computer use
  - agent view
  - cloud scheduled tasks
  - channels
  - ultrareview
  - fast mode on Opus 5 and Opus 4.8
- **Public beta:**
  - Projects
  - Claude Tag
  - MCP tasks
  - analytics contribution metrics
- **Experimental:**
  - agent teams (off by default)
  - Code Mode
  - the advisor tool
  - some hooks, sandbox and MCP sub-features
- **Beta:** Desktop on Linux.

---

## 5. What a non-developer can realistically use

Based on the features above and Anthropic's own guidance (terminal guide, prompt library "tagged by task and role", output styles for "a non-engineering role", Desktop scheduled "morning briefings"):

- **Desktop Code tab, or the web or mobile.** These are GUI entry points with no terminal. Web and mobile need a GitHub repo, and Desktop works on any local folder.
- **A folder-of-files workflow.**
  - Point Claude at a folder of documents or CSVs.
  - Use CLAUDE.md for house rules.
  - Use `/rewind` as an undo safety net.
  - Use plan mode for "show me first".
- **Skills as saved procedures.** Turn a repeated checklist (weekly report, content review) into `/my-skill`. Bundled `/slides`, `/design` and `/deep-research` are directly useful.
- **MCP connectors.** Connect Notion, Google Drive, Slack and similar tools so Claude can read and act on them.
- **Artifacts.** Turn analysis into a shareable interactive page.
- **Scheduled tasks.** Desktop or cloud tasks for recurring briefings or reports.
- **Output styles.** Explanatory or Learning to understand what Claude did. Concise for brevity.
- **Slack `@Claude`.** File a request from chat and get a PR back. This is for people adjacent to engineering, such as PMs and designers.
- **Safety literacy.** Permission modes (and what auto mode does), plugin and mod trust, `/usage` limits.

Realistically out of scope for non-developers: hooks beyond a notification hook, the SDK and `-p`, sandbox configuration, mods, agent teams, workflows, CI, and enterprise admin.

---

## 6. Suggested grouping into learning modules (a starting point, not a curriculum)

1. **Orientation.** What Claude Code is; the agentic loop; picking a surface (Desktop, web, CLI, IDE); plans and sign-in. *Stable core with volatile plan details.*
2. **First session.** Install or open Desktop; first prompts; reading diffs; `/rewind`; plan mode; permission modes including auto; `/usage`. *Beginner, all audiences.*
3. **Teaching Claude your project.** CLAUDE.md, `/init`, rules, auto memory, AGENTS.md, output styles. *Beginner. Most stable module.*
4. **Working effectively.** Prompting best practices, context and `/compact`, sessions and resume, models and effort (taught via aliases), cost hygiene. *Beginner to intermediate. The model section is volatile.*
5. **Reusable workflows with skills.** Using bundled skills; writing your first SKILL.md; arguments; when to use a skill, CLAUDE.md or a subagent. *Beginner to intermediate, all audiences.*
6. **Connecting tools.** MCP quickstart, claude.ai connectors, Chrome, artifacts. *Intermediate, high non-dev value.*
7. **Plugins and marketplaces.** Install from `claude-plugins-official`; trust and security; packaging your own setup. *Install is beginner; authoring is advanced. Volatile.*
8. **Delegation and parallelism.** Subagents, `/subtask`, worktrees, background tasks, `/goal`; then agent view, agent teams, workflows and Projects as "preview" sidebars. *Intermediate to advanced. Volatile.*
9. **Automation and guardrails.** Hooks (start with notifications), permission rules, sandboxing, `/loop` and scheduled tasks. *Intermediate to advanced.*
10. **Claude Code everywhere.** Cloud sessions, teleport, mobile and Remote Control, Slack. *Intermediate. Very volatile.*
11. **Code review and CI.** `/code-review`, GitHub Actions, Code Review (Team), GitLab. *Developer track.*
12. **Building on Claude Code.** `claude -p`, the Agent SDK, plugin and mod authoring, channels. *Advanced developer track.*
13. **Teams and admin (optional track).** Settings scopes, managed settings, auto-mode config, providers and gateways, analytics and OTel.

**Freshness plan this implies:**

- Tie each lesson to the docs page(s) it depends on, and to a "last verified against CLI version" stamp.
- Watch `CHANGELOG.md` and the docs `llms.txt` index for diffs.
- Give modules 1 to 5 a slow review cycle. Modules 6 to 12, and anything quoting model names, defaults or command names, need frequent review.
- Teach concepts and aliases (`opus`, `sonnet`) rather than versions.
- Flag research-preview features in the lesson UI.

---

## Appendix: method and raw numbers

- **Release cadence.** Parsed the changelog version and date headers. There were 446 versions.
  - Releases per month: Apr 2025: 27, Jul 2025: 23, Oct 2025: 20, Jan 2026: 26, Apr 2026: 26, Jul 2026: 22, Oct 2026: 26, Nov 1 to 20 2026: 12.
  - 74 releases from 2026-08-23 to 2026-11-20.
- **Churn.** Regex keyword counts over changelog bullet lines, all time versus the last 90 days. Of 10,322 total lines, 5,680 (55%) are from the last 90 days. A topic above 55% is accelerating.

| Topic regex bucket | All-time lines | Last 90 days | Share recent |
|---|---|---|---|
| CLAUDE.md / memory | 74 | 43 | 58% |
| Skills | 341 | 187 | 55% |
| Subagents/agents (broad) | 1032 | 509 | 49% |
| Hooks | 502 | 322 | 64% |
| MCP | 622 | 331 | 53% |
| Plugins/marketplace | 719 | 461 | 64% |
| Mods | 152 | 152 | 100% |
| Permissions/modes | 789 | 470 | 60% |
| Sandbox | 214 | 143 | 67% |
| Settings | 601 | 424 | 71% |
| SDK/headless | 418 | 248 | 59% |
| GitHub Actions / code review | 100 | 70 | 70% |
| VS Code | 672 | 539 | 80% |
| JetBrains | 13 | 7 | 54% |
| Desktop | 207 | 165 | 80% |
| Web/cloud sessions | 318 | 291 | 92% |
| Remote Control / mobile | 334 | 202 | 60% |
| Models | 672 | 373 | 55% |
| Cost/usage/tokens | 546 | 285 | 52% |
| Scheduled / `/loop` / routines | 167 | 141 | 84% |
| Artifacts | 119 | 112 | 94% |
| Checkpoint/rewind | 54 | 42 | 78% |
| Output styles | 18 | 8 | 44% |
| Status line | 56 | 27 | 48% |

The counts are approximate. The regexes are broad: "agents" catches many unrelated lines, and "artifact" catches a few rendering-artifact fixes. The changelog's earliest entries (April 2025) also understate how old some features are, such as MCP and CLAUDE.md, which predate the changelog's start.

- **Not verified.**
  - Plan prices: see claude.com/pricing, which was not fetched.
  - Agent SDK and `claude-code-action` release dates: the GitHub API was blocked in this session. Only the raw CHANGELOG files were read.
  - Anthropic blog and news posts: not consulted. Only docs and changelogs were used.
