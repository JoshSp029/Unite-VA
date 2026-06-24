# Unite-VA — United Virtual Airlines Website

A fully static marketing and pilot recruitment website for **United Virtual Airlines (UAL)**, a virtual airline operating on the [IVAO](https://ivao.aero/) network.

Built as a client project and used as a personal learning exercise in web development with AI pair programming assistance via [Claude Code](https://claude.ai/code).

---

## Live Features

- **Hero section** with animated star canvas and network affiliation badges
- **Live flight map** — the team's real-time flights embedded from the [NewSky](https://newsky.app/) network
- **Fleet showcase** — 11 aircraft cards with real photos and hover zoom
- **Stats bar** with animated counters triggered on scroll
- **Pilot registration form** wired to [Web3Forms](https://web3forms.com/) for real email delivery (no backend needed)
- **IVAO partner banner** — official affiliation display
- **GDPR privacy modal** — triggered from the footer Privacy link, with scroll lock and Escape/overlay dismiss
- **Pilot Manual page** (`manual.html`) — separate page with full airline procedures
- **Scroll reveal animations** via IntersectionObserver
- **Responsive navbar** with mobile hamburger menu and active-section highlighting

## Tech Stack

| Layer | Technology |
|---|---|
| Structure | HTML5 (semantic) |
| Styles | CSS3 — custom properties, Grid, Flexbox, animations |
| Interactivity | Vanilla JavaScript (ES2020+) |
| Map | NewSky public live map (iframe embed) |
| Form backend | Web3Forms API |
| Hosting | Static — no build tools, no frameworks |

## Project Structure

```
Unite-VA/
├── index.html          # Main page
├── manual.html         # Pilot manual page
├── css/
│   └── style.css       # All styles (~2,200 lines)
├── js/
│   └── script.js       # All interactivity
└── images/
    ├── ua-logo.png
    ├── logos/          # IVAO and partner logos
    └── planes/         # Fleet aircraft photos
```

## Development Notes

This project was my **first web development project built with the help of an AI coding agent** (Claude Code by Anthropic). The workflow involved:

- Describing requirements and client change requests in natural language
- Iterating on design and layout decisions conversationally
- Having the AI handle repetitive tasks (bulk find/replace, asset localization, CSS debugging)
- Reviewing and approving every change before it was applied

It was a practical introduction to how AI-assisted development works in a real client context — not just code generation, but architecture decisions, debugging, and asset management.

## Key Implementation Highlights

- **No build pipeline** — the entire site is HTML/CSS/JS files served directly; fast to deploy anywhere
- **All assets are local** — no hotlinked external images (except the live IVAO pilot status API which is intentionally dynamic)
- **GDPR modal** — built without any library; pure JS + CSS with body scroll lock
- **Live flight map** — the NewSky public live map embedded via iframe, showing the team's real-time network activity
- **Form submission** — async fetch to Web3Forms with client-side validation and error states

## Client

**United Virtual Airlines (UAL)** — affiliated with [IVAO United States](https://us.ivao.aero/).
