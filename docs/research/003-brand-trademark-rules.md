# 003: Anthropic brand and trademark rules for an unofficial Claude Code educational site

Researched 2026-11-23. All primary sources were fetched that day. This is not legal advice. Where Anthropic's own documents say nothing, this note says so and does not fill the gap with a guess. A few points rest on general trademark law, and those are marked **[general law, not an Anthropic source]**.

## TL;DR

- **No public Anthropic document gives an unofficial third-party site permission to use its marks.** The Trademark Guidelines are written as permission-only: "You may only use our trademarks as specifically permitted by us and only in materials we approve beforehand." [S1] The Consumer Terms require "prior written permission" to use "our name, logos, or other trademarks in connection with products or services other than the Services" [S2]. Strictly read, the documents give no free licence.
- **"Claude Code" in a product, site, or company name is the riskiest choice.** Anthropic's most specific statement says you "can't use the Claude Code or Anthropic names or logos as part of your own product, feature, or company name, in your own logo, or in a way that suggests Anthropic built, endorses, or is partnered with your product" [S3]. The Agent SDK branding rules also list "Claude Code" as **not permitted** [S4]. Both rules are written for commercial integrators, not education sites, but they show where Anthropic draws the line.
- **Plain-text mentions that only describe the product are fine.** Examples: "a free course about Claude Code" or "learn to use Claude Code". Anthropic itself allows "accurately say, in plain text" about Claude Code [S3]. **[general law, not an Anthropic source]** Nominative fair use in the US protects naming a product to talk about it.
- **Logos, the spark mark, and look-alike branding: don't use them.** No public document licenses the logo to non-partners. The only place Anthropic publishes the Claude logo file for third parties limits it to one OAuth button [S7]. The partner licence to show Anthropic marks exists only inside the Claude Partner Network [S8].
- **Use a clear disclaimer.** No Anthropic source gives disclaimer wording. Every community site checked uses one, and the usual form is: "Not affiliated with, endorsed by, or sponsored by Anthropic. Claude and Claude Code are trademarks of Anthropic, PBC."
- **There is real enforcement.** In January 2026 Anthropic emailed the project "Clawdbot" (a sound-alike of "Claude") and asked it to change its name. The project became Moltbot, then OpenClaw [S12, S13].

## 1. Primary sources and what they say

### S1. Anthropic Trademark Guidelines (effective Aug 1, 2024)
https://www.anthropic.com/legal/trademark-guidelines. The CMS metadata shows the page was last updated 2026-10-20, but the effective date shown is still Aug 1, 2024.

Verbatim key points:
- Scope: "Our trademarks include our names, logos, brand elements, and anything we use to identify our goods and services." Brand elements are included, so a look-alike colour and type treatment is arguably covered.
- "You may only use our trademarks as specifically permitted by us and only in materials we approve beforehand. We may terminate permission to use our trademarks at any time."
- "We will supply an image (or images) of the trademark(s) for your use … No alterations of our trademarks (changes to color, font, proportion, or otherwise) are permitted." So recolouring or redrawing the spark is not allowed even with permission.
- "You may not use our trademarks in a manner that implies Anthropic's sponsorship or endorsement, or a relationship or affiliation with Anthropic, except as we expressly authorize."
- "You may not use our trademarks in any manner that could diminish or damage the reputation of Anthropic …"
- Placement rules: no background that interferes with readability; keep "reasonable space"; "**Do not use a trademark symbol with the trademarks.**" Note that some community sites write "Claude™" anyway, against this rule.
- "If you have an existing business relationship with Anthropic and want to use our trademarks … please email marketing@anthropic.com."

The guidelines do not mention domains, site names, education, fan or community use, screenshots, colours as such, or fonts.

### S2. Consumer Terms of Service (effective Oct 8, 2025): "Use of our brand"
https://www.anthropic.com/legal/consumer-terms
> "You may not, without our prior written permission, use our name, logos, or other trademarks in connection with products or services other than the Services, or in any other way that implies our affiliation, endorsement, or sponsorship. To seek permission, please email us at marketing@anthropic.com."

This binds you as a Claude user on a Free, Pro, Max, or Ultra plan. A free website is arguably a "service". The clause does not separate naming a product to talk about it from branding with it.

### S3. Claude Code docs: Legal and compliance, "Using the Claude Code name and logo"
https://code.claude.com/docs/en/legal-and-compliance
> "You can accurately say, in plain text, that your product has Claude Code preinstalled or that it runs Claude Code. But you can't use the Claude Code or Anthropic names or logos as part of your own product, feature, or company name, in your own logo, or in a way that suggests Anthropic built, endorses, or is partnered with your product. Any other use of Anthropic's names or logos is governed by our Trademark Guidelines and requires our written permission."

The context is companies that preinstall or run Claude Code. Even so, it is Anthropic's only first-party statement about the "Claude Code" name in another party's name, and it says **no**.

### S4. Agent SDK overview: "Branding guidelines"
https://code.claude.com/docs/en/agent-sdk/overview
- Allowed: "Claude Agent"; "Claude" inside a menu already labelled "Agents"; "{YourAgentName} Powered by Claude".
- **Not permitted: "Claude Code" or "Claude Code Agent"; "Claude Code-branded ASCII art or visual elements that mimic Claude Code".**
- "Your product should maintain its own branding and not appear to be Claude Code or any Anthropic product."

This tells you how Anthropic thinks: "Claude Code" is kept for Anthropic's own product, and so is Claude Code's look, including the terminal ASCII art and mascot.

### S5. Usage Policy (effective Nov 12, 2026)
https://www.anthropic.com/legal/aup
Nothing in it is specific to trademarks. Two lines matter if the site uses Claude to write content:
- Do not "impersonate real individuals or entities … to falsely attribute content or mislead audiences about its origin".
- Do not "manipulate the sources from which search engines or AI systems draw answers by seeding them with content that misrepresents its origin, authorship, or independence".

So do not make the site look like Anthropic's own documentation.

### S6. Commercial Terms (effective Jun 17, 2025)
https://www.anthropic.com/legal/commercial-terms
The only branding clause is §G Publicity, and it runs the other way: Anthropic may use the customer's name. The terms grant no trademark licence. The Claude Code repo LICENSE reads: "© Anthropic PBC. All rights reserved. Use is subject to Anthropic's Commercial Terms of Service."

### S7. Claude Platform docs: "Branding samples" (OAuth apps, beta)
https://platform.claude.com/docs/en/manage-claude/oauth-apps/branding-samples
This is the only first-party page found that gives third parties the **Claude spark logo** as an SVG (fill `#D97757`). Its only stated purpose is a "Link your Claude organization" button for Linked billing. It is not a general licence to use the logo.

### S8. Claude Partner Network Agreement (effective Jun 3, 2026)
https://www.anthropic.com/legal/cpna
Participants get "a … non-exclusive … license to display Anthropic Trademarks" that applies "solely in connection with your participation in the Program", under the "Anthropic Brand & Trademark Guidelines" and a "Partner Program Guide". The Partner Program Guide is not public. **Partner badges and logo rights exist only for enrolled partners.** No public badge programme for individuals was found.

### S9. "Built with Claude": no public badge
"Built with Claude" appears only as contest rules (support.claude.com articles 12003471 and 12450131) and as a "Submit your build" page (article 15485501). That page says Anthropic keeps "all of our rights in our intellectual property, like the name 'Claude'" and "we don't transfer any ownership or rights to you". **No public "Built with Claude" or "Powered by Claude" badge artwork or rules were found.** The phrase "{Name} Powered by Claude" is allowed only as text, for Agent SDK integrators [S4].

### S10. Press kit
https://www.anthropic.com/press-kit returns a 307 redirect to a ZIP file on assets.claude.com, linked from the newsroom as "Download press kit". The proxy blocked the download, so **its contents and any usage terms inside it were not checked.** The kit is aimed at press. Nothing on the newsroom page says that downloading it gives non-press users any rights.

### S11. Brand colours and fonts (Anthropic's own published values)
- `anthropics/skills`, `skills/brand-guidelines/SKILL.md` (Apache-2.0) lists Anthropic's brand palette: Dark `#141413`, Light `#faf9f5`, Mid Gray `#b0aea5`, Light Gray `#e8e6dc`, Orange `#d97757`, Blue `#6a9bcc`, Green `#788c5d`. It gives the fonts as Poppins for headings and Lora for body text. The licence's §6 says: "This License does not grant permission to use the trade names, trademarks, service marks, or product names of the Licensor." Publishing the values is not permission to adopt the brand.
- anthropic.com currently loads its own webfonts, **Anthropic Sans, Anthropic Serif and Anthropic Mono**, from `/_next/static/media/`. I found no public licence for them, so don't copy or embed them.
- No source says anything about colours or fonts on their own. Under S1, "brand elements" count as trademarks and alterations are banned. **[general law, not an Anthropic source]** A single colour or a generic open font is rarely protectable by itself. The risk comes from the **overall look**: terracotta `#d97757` with a spark-like asterisk on cream `#faf9f5` reads as Anthropic trade dress.

### S12. Trademark registrations (aggregator data, not checked on USPTO TSDR)
- CLAUDE word mark: US Reg. No. 7645254, registered Jan 7, 2025 (serial 97790228), class 42 (AI SaaS). Source: trademarkregistration.app/Trademark/Details/97790228.
- Justia's list of Anthropic, PBC marks shows CLAUDE (a new filing, 50044812, Aug 2026), ANTHROPIC, A\, CLAUDE MYTHOS, CLAUDE CORPS, KEEP THINKING, and four "Image Trademark" filings, probably logo marks. **No "CLAUDE CODE" filing appears.** Source: trademarks.justia.com/owners/anthropic-pbc-6131993. Even without its own filing, "Claude Code" contains the registered CLAUDE mark and has common-law use.

### S13. Enforcement example (secondary sources)
In January 2026 Anthropic sent "a polite email asking for a name change (trademark stuff)" to the project Clawdbot. The project's own docs describe it that way, as quoted by It's FOSS (itsfoss.com/news/clawdbot-fiasco-explained). The project renamed to Moltbot and then OpenClaw (TechCrunch, 2026-01-30; Business Today; alternativeto.net). This shows Anthropic acts even against sound-alike names on free, open-source community projects.

## 2. Topics no primary source covers

Anthropic's documents do not address any of the following:
- **Domains** that contain "claude" (for example `claudecodeacademy.com`). No rule either way. **[general law, not an Anthropic source]** A domain made from someone else's mark plus a generic word is a classic source of UDRP or cybersquatting complaints, and it is the hardest name to change later.
- **Educational, fan, community, or nonprofit use.** There is no carve-out. "Free" and "unofficial" do not change the written rules.
- **Screenshots of the product.** No policy covers them. The docs and repo are "© Anthropic PBC. All rights reserved." [S3 footer, S6]. Claude Code's welcome screen includes Claude Code-branded ASCII art and the mascot, which S4 forbids imitating in products. **[general law, not an Anthropic source]** Screenshots used for commentary or teaching are commonly treated as fair use. Your own terminal sessions are lower risk than copied marketing images.
- **Disclaimer wording.** None is prescribed.
- **Copying the docs text.** No licence was found. The docs are all rights reserved, so link to them and write your own explanations.

## 3. How existing community sites name and present themselves

These are observed practice, not permission. Some may simply not have been challenged yet.

| Site | Name pattern | Disclaimer (verbatim) | Logo |
|---|---|---|---|
| ClaudeLog (claudelog.com) | Coined compound "Claude"+word | "This site is not affiliated with, endorsed by, or sponsored by Anthropic." "Claude and Anthropic are trademarks of Anthropic, PBC. This is an independent developer project." | Own star graphic. Unclear whether it resembles the spark. |
| Claude Code Club (claudecodeclub.org) | "Claude Code" + generic word | "Independent fan club. Not affiliated with Anthropic." "Claude and Claude Code are named here only to describe what we teach." | Own "C" mark |
| Claude CLI (claudecli.org) | "Claude" + generic word | "Independent community resource — not affiliated with, endorsed by, or sponsored by Anthropic." "Claude™ is a trademark of Anthropic PBC." (S1 says not to use ™) | — |
| Clawdipedia (clawdipedia.cc) | Pun on the mascot name, avoids "Claude" | "It is not made by or tied to Anthropic. 'Claude' and 'Claude Code' name the product the site describes." | — |
| awesome-claude-code (GitHub) | "awesome-" list + product name, descriptive | — | — |
| opcode (formerly "Claudia", a Claude Code GUI) | Renamed to a name with no Claude reference. The reason was not found in primary sources. | "This project is not affiliated with, endorsed by, or sponsored by Anthropic. Claude is a trademark of Anthropic, PBC." | Own |
| Moltbot / OpenClaw (formerly Clawdbot) | Forced away from a Claude sound-alike [S13] | — | — |

The pattern: sites with "Claude" in the name exist and have not been visibly challenged. Separately, at least one high-profile project was asked to rename even though its name was only a sound-alike. Every site checked uses its own logo and an "independent / not affiliated" disclaimer.

## 4. Do / Don't

**Do**
- Use a name of your own that contains no Claude or Anthropic mark. Mention Claude Code in the tagline and body text ("an unofficial guide to Claude Code").
- Refer to the product by its correct name in plain text, as often as the teaching needs [S3].
- Put a clear disclaimer in the header or hero area **and** the footer, for example: "Unofficial and independent. Not affiliated with, endorsed by, or sponsored by Anthropic, PBC. Claude and Claude Code are trademarks of Anthropic, PBC."
- Design your own logo, palette, and type, so the site cannot be mistaken for anthropic.com, claude.com, or code.claude.com [S1, S4, S5].
- Use screenshots of your own terminal sessions with captions, cropped to the teaching point. Link to the official docs instead of copying them.
- If you want to use the name or logo anyway, ask in writing at marketing@anthropic.com [S1, S2]. Only written permission removes the risk.

**Don't**
- Don't put "Claude Code" or "Anthropic" in the site name, your logo, or your handle [S3, S4].
- Don't use the Claude spark, the Anthropic A\ mark, the Claude wordmark, or any redrawn or recoloured version, including in a favicon [S1, S7, S8].
- Don't copy Claude Code's ASCII art or mascot as branding [S4].
- Don't copy the brand trade dress (terracotta `#d97757` + cream `#faf9f5` + asterisk + Anthropic's fonts). Don't embed Anthropic Sans, Serif or Mono [S1, S11].
- Don't call the site "official", "certified", or "partner", and don't show a "Built with Claude" or partner badge. No public badge exists, and partner badges require the CPNA [S8, S9].
- Don't use "Claude™" or "Claude®" in your own branding. S1 says "Do not use a trademark symbol with the trademarks." A plain-text trademark attribution sentence is fine.
- Don't use a sound-alike name such as "Clawd…" or "Claudia…" in the hope that it is safer [S13].
- Don't copy the docs text wholesale. It is all rights reserved.

## 5. Risk rating for candidate naming patterns

Risk means how likely Anthropic is to object or ask for a rename, and how costly that would be. Domains are rated with their names.

| Pattern | Example | Risk | Why |
|---|---|---|---|
| Product name + institutional word implying authority | "Claude Code Academy", "Claude Code University", `claudecodeacademy.com` | **High** | Uses "Claude Code" as part of the site's own name, which S3 rules out. "Academy" suggests an official training body, so the endorsement concern applies too [S1, S2]. The domain makes a rename expensive. |
| Product name + generic word | "Claude Code Guide", "Claude Code Club", `claudecode.guide` | **High / Medium-High** | Same S3 problem. Several community sites use this pattern without visible trouble, but nothing permits it, and you would be relying on Anthropic choosing not to act. |
| "Claude"-prefixed coined word | "ClaudeLog", "ClaudeCraft" | **Medium-High** | Contains the registered CLAUDE mark [S12]. One community site has survived with this pattern, but Anthropic has policed even near-matches [S13]. |
| Sound-alike or pun on the mark or mascot | "Clawd School", "Claudia Learns" | **Medium-High** | This is exactly what Anthropic acted on with Clawdbot [S13]. |
| Own brand + descriptive "for/about Claude Code" tagline | "Terminal Dojo: an unofficial guide to Claude Code", `terminaldojo.dev` | **Low** | The mark appears only in plain text that describes the product, which S3 allows ("accurately say, in plain text"). **[general law, not an Anthropic source]** This is the classic nominative fair use pattern. |
| Own brand with no product reference in the name or domain, product named only in body text | "Prompt & Pipe" with Claude Code lessons | **Lowest** | No mark in the name. Just keep the disclaimer and your own visual identity. |
| Any name with "Official", "Certified", or "Partner", or an Anthropic or Claude logo | — | **Very High** | Directly implies endorsement [S1, S2, S8]. |

**Recommendation for a portfolio project:** pick an original brand and domain. Say "an unofficial guide to Claude Code" in the tagline and meta description; you get most of the SEO value from body text and headings anyway. Add the disclaimer, design your own logo and palette, and use your own screenshots. If you strongly want "Claude Code" in the name, email marketing@anthropic.com first and keep the reply.

## Sources

- S1 Anthropic Trademark Guidelines: https://www.anthropic.com/legal/trademark-guidelines
- S2 Consumer Terms: https://www.anthropic.com/legal/consumer-terms
- S3 Claude Code Legal and compliance: https://code.claude.com/docs/en/legal-and-compliance
- S4 Agent SDK overview, Branding guidelines: https://code.claude.com/docs/en/agent-sdk/overview
- S5 Usage Policy: https://www.anthropic.com/legal/aup
- S6 Commercial Terms: https://www.anthropic.com/legal/commercial-terms ; Claude Code LICENSE: https://raw.githubusercontent.com/anthropics/claude-code/main/LICENSE.md
- S7 Branding samples (OAuth): https://platform.claude.com/docs/en/manage-claude/oauth-apps/branding-samples
- S8 Claude Partner Network Agreement: https://www.anthropic.com/legal/cpna
- S9 Submit your build: https://support.claude.com/en/articles/15485501-submit-your-build-how-it-works-and-what-you-re-agreeing-to ; Built with Claude contest rules: https://support.claude.com/en/articles/12003471-built-with-claude-contest-official-rules
- S10 Press kit (redirects to ZIP, not inspected): https://www.anthropic.com/press-kit
- S11 Brand-guidelines skill: https://github.com/anthropics/skills/tree/main/skills/brand-guidelines
- S12 CLAUDE registration: https://trademarkregistration.app/Trademark/Details/97790228 ; Anthropic owner list: https://trademarks.justia.com/owners/anthropic-pbc-6131993
- S13 Clawdbot rename: https://itsfoss.com/news/clawdbot-fiasco-explained ; https://techcrunch.com/2026/01/30/openclaws-ai-assistants-are-now-building-their-own-social-network ; https://alternativeto.net/news/2026/1/trending-open-source-ai-agent-clawdbot-rebrands-to-moltbot-after-pressure-from-anthropic
- Community sites: https://www.claudelog.com ; https://www.claudecodeclub.org/ ; https://www.claudecli.org/ ; https://github.com/xsyetopz/claude-code-docs (clawdipedia.cc) ; https://github.com/hesreallyhim/awesome-claude-code ; https://github.com/winfunc/opcode
