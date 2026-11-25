# hmr-card

One player for every HMR card (pop-up scripted walkthrough). Standard: `/mnt/project-files/hmr/demo-standard.md` (sections 2 to 5, checklist in section 7). Nothing autoplays. Nothing loads until a button is pressed.

## Add a card to any HMR site

1. Copy this folder (`hmr-card/`) next to the page, or anywhere on the site.
2. Add one script tag: `<script src="hmr-card/hmr-card.js" defer></script>`
3. Add one attribute to any button or link: `<button data-hmr-card="reply">Watch</button>`

The scenario is read from `cards/<id>.json` next to the script, or from an inline `<script type="application/json" data-hmr-scenario="reply">...</script>` (inline wins). Open `test.html` to try all six.

API (all optional): `HMRCard.open(id, openerElement)`, `HMRCard.close()`, `HMRCard.registerScreen(name, function (root, api) {...})`. A screen fills `root` and marks targets with `data-t="name"`; `api.later(fn, ms)` is a timer the player can cancel on Pause.

## Scenario schema `hmr-card/1`

```json
{ "schema": "hmr-card/1", "id": "reply", "title": "...", "intro": "text on the Begin screen",
  "frame": "16:9", "screen": "dashboard", "cast": ["mom"], "level": 0, "media": null,
  "steps": [ { "say": "caption", "act": [["click","tab:inbox"]], "hold": "read", "free": false } ],
  "licence": "cards/reply.licence.json" }
```

- `say`: caption, one or two short sentences. Step 1 must say the data is made up or that nothing is sent.
- `hold`: `"read"` (default, 60 ms per character, minimum 1.8 s) or a number of ms.
- `free`: true on the last step lets the viewer click around the screen afterwards.
- `act` verbs, targets are names, never CSS selectors: `["click", t]`, `["move", t]`, `["type", t, text]` (appends), `["pick", t, value]`, `["show", t]`, `["hide", t]`, `["wait", ms]`.
- Dashboard targets: `tab:today|inbox|work|agenda|journey|closer`, `today.list`, `inbox.reply0..2`, `inbox|work|agenda|closer` + `.draft|.mic|.send`, `work.metrics`, `agenda.cal`, `agenda.trip`, `journey.cols|compare|go|tut`, `closer.kid|bare|signal|read|opt0..2`.
- `frame`: `16:9` (default), `4:5`, `1:1`. At 480px wide and below the stage is always 4:5.
- `media`, `cast`, `level`: reserved for Tier 2 and the character rules; the player ignores them.

Every card needs `cards/<id>.licence.json` (one line per asset). No log, no publish.

## Before publishing

Run the section 7 checklist of the standard. Keep the player under 30 KB and each scenario under 20 KB.
