# CLAUDE.md

## Build Process

Use `mkdocs build` to check the `mkdocs.yml` file is valid.

Use `mkdocs gh-deploy` to publish the website to GitHub pages.

Assume the user is running `mkdocs serve` in a separate shell.

## Configuration (`mkdocs.yml`)

Key settings:
- Theme: MkDocs Material, primary color `blue`, accent color `orange`
- No `navigation.tabs` — this book uses side navigation only (never add `navigation.tabs`)
- Social plugin enabled (requires Cairo system library)

## Learning Graph Data (`docs/learning-graph/`)

Two canonical data files drive the interactive graph viewer:
- `learning-graph.csv` — edges as `from,to` concept pairs
- `learning-graph.json` — vis-network format with `nodes`, `edges`, and `metadata` elements

Supporting analysis pages (Python scripts in same directory): `analyze-graph.py`, `csv-to-json.py`, `taxonomy-distribution.py`, `add-taxonomy.py`, `validate-learning-graph.py`.

## Token Efficiency: Prefer Serial Over Parallel Processing

These skills target teachers on the **Claude Pro plan**, which has a **five-hour
budget of only ~200K tokens**. Teachers are **not sensitive to run times** — a task
that takes 3 minutes instead of 1 minute is fine, but a task that burns 84K tokens
instead of 48K means they can do fewer tasks before hitting their ceiling.

Always default to serial processing (one Task agent) unless the user explicitly
requests speed or parallel execution. Each parallel Task agent costs ~12K tokens
in startup overhead (system prompt + tool descriptions). Four parallel agents waste
~36K tokens on overhead alone — that's 18% of a Pro user's entire five-hour budget
spent on nothing but agent startups.

Before launching parallel agents, ask: "Does the user need this faster, or cheaper?"
The answer for teachers is almost always cheaper.

---

## Learning Mascot: Percy the Peacock

### Character Overview

- **Name**: Percy the Peacock
- **Species**: Peacock
- **Personality**: Creative and expressive when introducing visual concepts; encouraging and supportive when material gets complex
- **Catchphrases**: "Let's make it visual!", "Display it with style!", "Let's spread some knowledge!"
- **Visual**: Stylish royal blue peacock with orange-gold tail feather accents, small round designer glasses, stylus tucked behind one wing, data-visualization motifs woven into tail feather eye-spots

### Voice Characteristics

- Uses clear, design-oriented language appropriate for instructional designers and educators
- Frames infographic creation as a creative design process ("Let's make it visual!", "Display it with style!")
- Normalizes difficulty: "Causal loop diagrams can feel overwhelming at first — that's completely normal"
- Celebrates connections between concepts: "Notice how this overlay pattern builds on what we learned about JSON configuration"
- Refers to students as "designers" or "visual thinkers"
- Signature phrases: "Let's make it visual!", "Display it with style!", "Let's spread some knowledge!"

### Placement Rules

| Context | Admonition Type | Frequency |
|---------|----------------|-----------|
| General note / sidebar | `mascot-neutral` | As needed |
| Chapter opening | `mascot-welcome` | Every chapter (required) |
| Major concept introduction | `mascot-thinking` | 2-3 per chapter |
| Design tip / workflow shortcut | `mascot-tip` | As needed |
| Common design mistake | `mascot-warning` | As needed |
| End of major section | `mascot-celebration` | 1 per chapter |
| Difficult content (e.g., polygon overlays, xAPI) | `mascot-encourage` | Where students typically struggle |

### Do's

- Use Percy to introduce new topics warmly at chapter openings
- Include a catchphrase in the welcome admonition
- Keep Percy's dialogue brief: 1-4 sentences maximum
- Use `mascot-thinking` for key architectural insights and design patterns
- Use `mascot-warning` for the most common infographic design mistakes

### Don'ts

- Do **not** use Percy more than **5-6 times per chapter**
- Do **not** stack Percy admonitions back-to-back
- Do **not** use Percy purely decoratively (every appearance must add value)
- Do **not** change Percy's personality or voice between chapters
- Do **not** use Percy for routine content that needs no special emphasis

### Admonition Syntax Reference

```markdown
!!! mascot-neutral "A Note from Percy"
    <img src="../../img/mascot/neutral.png" class="mascot-admonition-img" alt="Percy notes">
    General notes, sidebars, or any context without a specific tone.

!!! mascot-welcome "Let's Make It Visual!"
    <img src="../../img/mascot/welcome.png" class="mascot-admonition-img" alt="Percy welcomes you">
    Welcome text here. Always include a catchphrase in the welcome.

!!! mascot-thinking "Key Insight"
    <img src="../../img/mascot/thinking.png" class="mascot-admonition-img" alt="Percy is thinking">
    A critical design pattern or architectural insight.

!!! mascot-tip "Percy's Tip"
    <img src="../../img/mascot/tip.png" class="mascot-admonition-img" alt="Percy shares a tip">
    A workflow shortcut, design best practice, or tool recommendation.

!!! mascot-warning "Common Mistake"
    <img src="../../img/mascot/warning.png" class="mascot-admonition-img" alt="Percy warns you">
    A frequent design error or misconception.

!!! mascot-celebration "Excellent Work!"
    <img src="../../img/mascot/celebration.png" class="mascot-admonition-img" alt="Percy celebrates">
    Acknowledgment of completing a difficult section or mastering a concept.

!!! mascot-encourage "You've Got This!"
    <img src="../../img/mascot/encouraging.png" class="mascot-admonition-img" alt="Percy encourages you">
    Encouragement before or during a challenging section.
```

Image paths are relative to the rendered page depth — use `../../img/mascot/` from pages two levels deep (e.g., `docs/chapters/01-introduction/`), or `../img/mascot/` from one level deep (e.g., `docs/learning-graph/`).

---

## Content Generation Architecture

### Content Layer (`docs/`)

- `docs/index.md` — Home page with cover image (`img/cover.png`), Open Graph metadata in frontmatter
- `docs/course-description.md` — The authoritative source document; all learning graph concepts derive from it
- `docs/learning-graph/` — Learning graph data and analysis pages
- `docs/img/mascot/` — 7 Percy PNG files (transparent background, ≤100 KB each)
- `docs/css/extra.css` — Layout, iframe, and `.prompt` admonition copy-button styles
- `docs/css/mascot.css` — All 7 mascot admonition color styles + `.mascot-admonition-img` float rule
- `docs/js/extra.js` — Copy-button logic for `.admonition.prompt` blocks + iframe auto-resize via postMessage

### CSS Architecture

Two CSS files are loaded in order:
1. `extra.css` — structural styles (logo sizing, iframes, `.prompt` admonition copy button)
2. `mascot.css` — all 7 mascot admonition variants + shared image float rules

**Mascot CSS pattern:**
- Each admonition type gets its own `border-color` + `background-color` block
- A single global rule `[class*="mascot-"] > .admonition-title::before { display: none }` removes all icons
- `.mascot-admonition-img` uses `float: left; margin: 0 0.5em 0 0` to place the image left of text
- `--mascot-size: 90px` controls image size in admonitions

### Mascot Images

7 PNG files at `docs/img/mascot/`:
`neutral.png`, `welcome.png`, `thinking.png`, `tip.png`, `warning.png`, `celebration.png`, `encouraging.png`

- Format: PNG with transparent background
- Target: 1024x1024 px generated, trimmed, displayed at 90x90 px via CSS variable
- Generation prompts: `docs/prompts/04-mascot.md`

---

## Chapter Content Guidelines

### Target Audience

All chapter content is written for **instructional designers, educational technologists, and teachers** at the **college reading level**. Assume readers:
- Have basic HTML and CSS familiarity
- Are comfortable working with a text editor and file system
- Understand educational design principles
- Do **not** have advanced programming experience (introduce JavaScript concepts as needed)

### Writing Style

- Use clear, professional language with a practical, hands-on tone
- Frame infographic creation as a design activity, not pure programming
- Connect concepts to real educational use cases ("When building a chapter on cell biology, you might use a polygon overlay to...")
- Include concrete examples from multiple subject areas (science, history, math, business) to show versatility
- Use American English spelling (color, center, analyze)

### Chapter Structure

Every chapter should follow this structure:

1. **Percy Welcome Admonition** — `mascot-welcome` with a catchphrase and 2-3 sentence preview
2. **Learning Objectives** — 3-5 objectives aligned to Bloom's Taxonomy levels from the course description
3. **Introduction** — 2-3 paragraphs contextualizing the topic within the infographic design workflow
4. **Core Concept Sections** — Each major concept gets its own `##` heading with:
    - Explanation with visual examples
    - Code snippets where relevant (HTML, JavaScript, JSON)
    - `mascot-thinking` admonition for key architectural insights
5. **Practical Examples** — Embedded MicroSim iframes demonstrating the concepts
6. **Common Pitfalls** — `mascot-warning` admonition for frequent mistakes
7. **Summary** — `mascot-celebration` admonition acknowledging progress
8. **References** — Links to relevant documentation and resources

### Diagrams in Chapters — Always Use MicroSim Iframes

Every interactive diagram in a chapter **must** be an interactive MicroSim, not a static image or a `<details>` placeholder block.

**Decision rule:**

| Content | Action |
|---------|--------|
| Interactive infographic examples | MicroSim (interactive) |
| Overlay pattern demonstrations | MicroSim (interactive) |
| Causal loop diagrams | MicroSim (interactive) |
| Network/graph visualizations | MicroSim (interactive) |
| Data-driven charts and plots | MicroSim (interactive) |
| Simple comparison tables or text lists | Markdown table — no sim needed |
| Conceptual relationships (2-4 items) | Prose or bullet list — no sim needed |

### Embedding a MicroSim in a Chapter

```markdown
## Overlay Pattern Demo

<iframe src="../../sims/overlay-demo/main.html" height="600" width="100%" scrolling="no"></iframe>

[View Overlay Pattern Demo Fullscreen](../../sims/overlay-demo/main.html)

The interactive demo above shows how rectangular overlay regions respond to
hover and click events. Try hovering over each labeled region to see the
infobox appear below the diagram.
```

Rules for iframe embeds in chapters:
- Never add a `style` attribute to the `<iframe>` element. The styles around an iframe are governed by the central `docs/css/extra.css`
- Always include `scrolling="no"` to avoid scroll hijacking
- Add a `[View {NAME} Fullscreen](...)` link immediately after the iframe
- Write 2-4 sentences of prose around the iframe — do not just drop the iframe with no context

### MicroSim Standards

- The interactive HTML file in every MicroSim folder must be named `main.html` — never `index.html`
- The MkDocs page file remains `index.md`
- All MicroSims must use `background: aliceblue` on the `<body>` element for visual consistency
- Width-responsive design: aliceblue drawing region above white control region with silver borders
- Include Dublin Core metadata in `metadata.json` for every MicroSim
- Every MicroSim should send a height message to the parent for auto-resize:
  `window.parent.postMessage({type: 'microsim-resize', height: height}, '*');`

### JavaScript Visualization Libraries

When creating new MicroSims, select the appropriate library:

| Library | Best For |
|---------|----------|
| **p5.js** | Custom drawing, interactive canvas, animation |
| **D3.js** | Data-driven document manipulation, complex SVG |
| **Chart.js** | Standard chart types (bar, line, pie, radar) |
| **vis-network** | Network and graph visualizations |
| **Leaflet** | Geographic and map-based infographics |
| **Mermaid** | Flowcharts and sequence diagrams from text |

### Updating the Site Navigation

When finished creating a new chapter or MicroSim, add it to the `nav` section in `mkdocs.yml`.
