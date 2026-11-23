# PROTOTYPE: Session replay player (throwaway)

Answers: what should the Session replay player and the guide look like? (Issue #9)

Open `index.html` in a browser. Switch variants with the floating bar or the left/right arrow keys; step the replay with `,` and `.`.

- `#field-notebook`: A, transcript as timeline, Steering notes in the margin, scrubber at the foot.
- `#edit-bay`: B, monitor + inspector over a light multi-lane timeline; the guide rides the playhead.
- `#trail-cards`: C, chapter trail map over one big card; Decision pause flips to reveal what happened.

The guide is an original pixel ranger with a placeholder name ("Wren"). The session is sample content.

## Round 2 (`round2.html`)

Mohamed asked for another round, with one of them developing the Field Notebook further.

- `#notebook`: A+, Field Notebook developed: chapter tabs, numbered figures, specimen charts of what Claude found and moved, a real-looking permission prompt, "your call vs what the human did" reveal, and an end recap with the Capability and a copyable Hands-on exercise prompt.
- `#over-the-shoulder`: D, the recreated Desktop app chat on the left and the Downloads folder on the right, visibly changing (files coloured once Claude looks, tax files flagged, files moved into folders, photos rewound). The Decision pause happens on the permission prompt itself.
- `#storyboard`: E, the session as comic panels revealed one at a time, with Wren narrating the Steering notes in caption strips.

## Round 3 (`round3.html`)

Mohamed's feedback on rounds 1-2: the learner should feel *in* the conversation, not watching it. In round 3 the learner plays the human's part of the real session: pick a suggested reply or write your own, Claude answers (with typing), and the permission prompt is answered by the learner. Free-text replies get simple keyword feedback (no API). After a non-real choice, the session continues the way the real human played it.

- `#your-seat`: F, chat in the middle, Wren coaches from a side panel (a strip above the composer on phones).
- `#group-chat`: G, Wren is a third participant in the chat, setting up each of your turns and reacting to your replies inline.

## Final combined direction (`final.html`)

Recommended by Claude and approved for a final prototype by Mohamed: F "Your seat" + D's live folder view + A+'s field-notes ending. Off-script answers get one in-character Claude reply, then a "back to the real session" divider and the real human's message (dashed) before the session continues. Desktop: chat + side panel (coach above folder). Phone: Coach | Your folder tabs above the composer, with a dot when the folder changes.

## Colour exploration (`colours.html`)

For issue #7: the locked final player in four palettes (Field Guide, Survey Map, Daylight, Ink & Lime). Switch with the bar or arrow keys. File-type colours in the Live view stay fixed.

## Calm palettes (`colours2.html`)

Mohamed asked for calm, eye-friendly colours from Coolors: Sage Slate, Fern, Harbor, Mist (each links to its Coolors palette). File-type tiles muted to match.
