---
title: MicroSim Standards and Packaging
description: Master the complete MicroSim packaging standard including directory structure, Dublin Core metadata, quality scoring, iframe embedding, responsive testing, and the standardization checklist for deploying interactive infographics in intelligent textbooks.
generated_by: claude skill chapter-content-generator
date: 2026-03-14 11:03:57
version: 0.05
---

# MicroSim Standards and Packaging

## Summary

This chapter covers the complete MicroSim packaging standard for deploying interactive infographics within intelligent textbooks. You will learn the directory structure conventions, the main.html entry point, Dublin Core metadata in metadata.json, YAML frontmatter for index.md documentation pages, iframe embedding patterns, quality scoring rubrics, and the standardization checklist. The chapter also covers shared libraries, template MicroSims, responsive testing, color consistency, font scaling, and the reusable overlay schema.

## Concepts Covered

This chapter covers the following 31 concepts from the learning graph:

1. MicroSim Directory
2. main.html File
3. index.md File
4. Dublin Core Metadata
5. metadata.json File
6. YAML Frontmatter
7. Title Metadata
8. Description Metadata
9. Quality Score
10. Social Preview Image
11. Open Graph Tags
12. Display Iframe
13. Copy-Paste Iframe
14. Fullscreen Link Button
15. p5.js Editor Link
16. MicroSim Quality Rubric
17. Standardization Checklist
18. Aliceblue Drawing Region
19. White Control Region
20. Silver Border
21. postMessage API
22. Iframe Height Reporting
23. gh-deploy Command
24. Quality Assurance
25. Shared Library
26. Template MicroSim
27. Infographic Portfolio
28. Width-Responsive Testing
29. Color Consistency
30. Font Size Scaling
31. Reusable Overlay Schema

## Prerequisites

This chapter builds on concepts from:

- [Chapter 1: Foundations of Interactive Infographics](../01-foundations-of-interactive-infographics/index.md)
- [Chapter 6: Web Fundamentals: Structure, Style, and Data](../06-web-fundamentals-structure-style-and-data/index.md)
- [Chapter 9: Overlayment Interactive Patterns](../09-overlayment-interactive-patterns/index.md)

---

!!! mascot-welcome "Let's Make It Visual!"
    <img src="../../img/mascot/welcome.png" class="mascot-admonition-img" alt="Percy welcomes you">
    Welcome to the chapter that brings everything together into a professional, deployable package! You have learned to build interactive infographics — now you will learn to package them with proper metadata, quality standards, and embedding patterns so they work seamlessly inside intelligent textbooks. Standards might sound dry, but they are what make your work scalable, shareable, and sustainable. Let's spread some knowledge!

## Learning Objectives

By the end of this chapter, you will be able to:

- **Construct** a complete MicroSim directory with all required files (main.html, index.md, metadata.json) following packaging conventions (Bloom: Apply)
- **Explain** the role of Dublin Core metadata, YAML frontmatter, and Open Graph tags in making MicroSims discoverable and shareable (Bloom: Understand)
- **Apply** the MicroSim quality rubric to score an infographic and identify areas for improvement (Bloom: Apply)
- **Evaluate** a MicroSim against the standardization checklist to determine deployment readiness (Bloom: Evaluate)
- **Design** a responsive MicroSim layout with consistent color scheme, font scaling, and iframe height reporting (Bloom: Create)

## Introduction

Throughout this course, you have been building increasingly sophisticated interactive infographics — from simple labeled diagrams to complex polygon overlays, from p5.js canvas animations to D3.js data-driven charts. Each of these creations is valuable on its own, but their true power emerges when they are packaged consistently, embedded reliably, and deployed at scale within intelligent textbooks.

MicroSim standards are the conventions that make this possible. Just as a shipping container standardized global trade by ensuring that any container fits on any ship, train, or truck, MicroSim packaging standards ensure that any interactive infographic fits seamlessly into any MkDocs Material intelligent textbook. The standards cover file organization, metadata formats, visual consistency, embedding patterns, and quality measurement — everything needed to move from "it works on my machine" to "it works everywhere, for everyone."

This chapter presents the complete MicroSim packaging standard in a practical, workflow-oriented sequence. You will start with directory structure and file conventions, move through metadata and embedding patterns, and finish with quality assurance tools that help you evaluate and refine your work.

## The MicroSim Directory Structure

A **MicroSim directory** is a self-contained folder that holds all files for a single interactive infographic. Every MicroSim in an intelligent textbook follows the same directory structure, making it immediately clear where to find code, documentation, and metadata.

The standard directory structure:

```
docs/sims/my-infographic/
├── main.html          # The interactive infographic (entry point)
├── index.md           # Documentation page for MkDocs
├── metadata.json      # Dublin Core metadata
├── sketch.js          # JavaScript code (if separate from main.html)
├── style.css          # Custom styles (if needed)
├── overlay.json       # Overlay configuration (for overlay types)
└── img/               # Images used by the infographic
    └── diagram.png
```

### The main.html File

The **main.html file** is the core entry point for every MicroSim. This is the file loaded by the iframe when the infographic is embedded in a textbook page. The name `main.html` (not `index.html`) is a deliberate convention that prevents conflicts with MkDocs, which generates its own `index.html` from the `index.md` documentation file.

A minimal main.html follows this structure:

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>My Infographic</title>
    <style>
        body { margin: 0; font-family: Arial, sans-serif; }
    </style>
</head>
<body style="background: aliceblue;">
    <div id="canvas-container"></div>
    <div id="controls" style="background: white; border-top: 1px solid silver; padding: 8px;">
        <!-- Control elements here -->
    </div>
    <script src="https://cdn.jsdelivr.net/npm/p5@1.9.0/lib/p5.min.js"></script>
    <script src="sketch.js"></script>
</body>
</html>
```

### The index.md File

The **index.md file** serves as the MkDocs documentation page for the MicroSim. It contains human-readable information about the infographic, including its purpose, usage instructions, lesson plan suggestions, and an embedded preview. The index.md file is what appears in the textbook's navigation when readers browse to the MicroSim's page.

### YAML Frontmatter

**YAML frontmatter** is a block of metadata at the top of the index.md file, enclosed in triple dashes. It provides **title metadata** and **description metadata** that MkDocs uses for page titles, search indexing, and — critically — **Open Graph tags** that control how your page appears when shared on social media and messaging platforms.

#### Open Graph Standards in Frontmatter

The [Open Graph protocol](https://ogp.me/) defines a set of `<meta>` tags that social platforms read to generate link previews. MkDocs Material automatically maps your YAML frontmatter fields to Open Graph `<meta>` tags in the rendered HTML, so getting your frontmatter right means your MicroSim pages look professional everywhere they are shared.

**Title metadata (`og:title`):**

- **Recommended length:** 40–60 characters (optimal for most platforms)
- **Maximum before truncation:** 88 characters on Facebook, 70 characters on Twitter/X, ~60 characters on LinkedIn
- **Best practice:** Lead with the most descriptive words. Avoid generic prefixes like "MicroSim:" — the platform already shows your site name. Make it specific enough that a reader can decide whether to click from the title alone.

**Description metadata (`og:description`):**

- **Recommended length:** 120–158 characters (the sweet spot across platforms)
- **Maximum before truncation:** 200 characters on Facebook, 200 characters on Twitter/X, ~300 characters on LinkedIn
- **Best practice:** Describe what the learner will *do* with the MicroSim, not just what it contains. Use active verbs: "Explore," "Build," "Compare," "Drag and drop." Include one or two key terms that a searcher might use.

A well-crafted frontmatter block:

```yaml
---
title: Cell Biology Interactive Diagram
description: Explore cell organelles with hover-activated descriptions, labeled callout points, and a quiz mode that tests your knowledge of mitochondria, ribosomes, and more.
image: img/preview.png
---
```

#### Additional Open Graph Fields

MkDocs Material supports several additional frontmatter fields that map to Open Graph tags:

| Frontmatter Field | Open Graph Tag | Purpose |
|-------------------|----------------|---------|
| `title` | `og:title` | Page title in link previews |
| `description` | `og:description` | Summary text below the title |
| `image` | `og:image` | Preview image (see next section) |

The `og:type` is automatically set to `"website"` and the `og:url` is generated from the page's canonical URL. You do not need to set these manually.

!!! mascot-tip "Percy's Tip"
    <img src="../../img/mascot/tip.png" class="mascot-admonition-img" alt="Percy shares a tip">
    Write your title and description *before* building the MicroSim. This forces you to articulate the learning objective in plain language — which often improves the design of the infographic itself. If you cannot describe it in 150 characters, the MicroSim might be trying to do too much.

## Dublin Core Metadata and the metadata.json File

**Dublin Core metadata** is an internationally recognized standard (ISO 15836) for describing digital resources. It defines 15 core elements that apply to virtually any digital object, making it ideal for cataloging MicroSim infographics.

The **metadata.json file** stores Dublin Core metadata for each MicroSim in a structured, machine-readable format:

```json
{
    "dc:title": "Cell Biology Interactive Diagram",
    "dc:description": "Interactive infographic showing major organelles of an animal cell with hover-activated descriptions.",
    "dc:creator": "Jane Smith",
    "dc:date": "2026-03-14",
    "dc:subject": ["biology", "cell structure", "organelles"],
    "dc:type": "InteractiveResource",
    "dc:format": "text/html",
    "dc:language": "en",
    "dc:rights": "CC BY 4.0",
    "dc:source": "Original",
    "microsim:library": "p5.js",
    "microsim:version": "1.0.0",
    "microsim:quality_score": 85,
    "microsim:visualization_type": "overlay-type2"
}
```

The Dublin Core fields provide standardized discoverability, while the `microsim:` prefixed fields add domain-specific metadata for MicroSim management (library used, quality score, visualization type).

| Dublin Core Element | Purpose | Example Value |
|--------------------|---------|---------------|
| `dc:title` | Human-readable name | "Cell Biology Interactive Diagram" |
| `dc:description` | What the MicroSim does | "Interactive infographic showing..." |
| `dc:creator` | Author name | "Jane Smith" |
| `dc:date` | Creation or last update date | "2026-03-14" |
| `dc:subject` | Topic keywords (array) | ["biology", "cell structure"] |
| `dc:type` | Resource type | "InteractiveResource" |
| `dc:format` | Technical format | "text/html" |
| `dc:language` | Content language | "en" |
| `dc:rights` | License | "CC BY 4.0" |

!!! mascot-thinking "Key Insight"
    <img src="../../img/mascot/thinking.png" class="mascot-admonition-img" alt="Percy is thinking">
    Dublin Core metadata serves two audiences. For humans, it makes MicroSims searchable and describable. For AI agents and automation tools, it provides structured data that enables intelligent operations — like finding all MicroSims about "cell biology" or all MicroSims using "p5.js" with "overlay-type2" visualization.

## Social Sharing: Open Graph Images for Link Previews

When an instructor pastes a MicroSim URL into a meeting chat — Zoom, Microsoft Teams, Google Chat, Slack, LinkedIn, or Facebook — the platform fetches the page's Open Graph metadata and renders a **link preview card**. A well-configured preview shows the MicroSim's title, description, and a representative screenshot, giving students an immediate visual preview of the infographic being discussed in class. A poorly configured preview shows a generic placeholder or nothing at all, losing a valuable opportunity to engage learners before they even click.

### Social Preview Image Standards

The **social preview image** (`og:image`) is the single most impactful Open Graph element. It is the large visual that dominates the link preview card on every platform. Getting the image size and aspect ratio right ensures your MicroSim preview renders correctly across all major platforms.

#### Required Image Specifications

| Specification | Recommended Value | Why |
|--------------|-------------------|-----|
| **Dimensions** | **1200 × 630 pixels** | The universal standard; renders correctly on all major platforms |
| **Aspect ratio** | **1.91:1** | Facebook, LinkedIn, Slack, Teams, and Twitter/X all optimize for this ratio |
| **Minimum size** | 600 × 315 pixels | Below this, some platforms will not display the image at all |
| **Maximum file size** | Under 5 MB (target under 1 MB) | Large images cause slow preview rendering or timeout failures |
| **Format** | PNG for screenshots, JPEG for photos | PNG preserves sharp text and UI elements; JPEG for photographic content |
| **Color space** | sRGB | Non-sRGB images may render with shifted colors on some platforms |

#### Platform-Specific Rendering Behavior

Different platforms crop and display the `og:image` differently. The 1200 × 630 standard works across all of them, but understanding the differences helps you compose better preview images:

| Platform | Display Size | Crop Behavior | Notes |
|----------|-------------|---------------|-------|
| **Slack** | ~360 × 189 px (displayed) | Center-crops to 1.91:1 | Shows title + description below image |
| **Microsoft Teams** | ~360 × 189 px | Center-crops to 1.91:1 | Very similar to Slack rendering |
| **Zoom Chat** | ~300 × 157 px | Center-crops to 1.91:1 | Smaller display; keep key content centered |
| **LinkedIn** | ~520 × 272 px | Center-crops to 1.91:1 | Larger display; more detail visible |
| **Facebook** | ~500 × 261 px | Center-crops to 1.91:1 | Shows title overlay on image in some views |
| **Twitter/X** | ~506 × 265 px | Center-crops to 1.91:1 | "Summary with large image" card type |
| **Google Chat** | ~400 × 209 px | Center-crops to 1.91:1 | Renders inline in conversation |
| **iMessage** | Variable width | Center-crops to 1.91:1 | Full-width in message bubbles |

#### Composing an Effective Preview Image

Because all platforms center-crop, place the most important visual content in the **center 80%** of the image. Avoid placing critical labels, titles, or interactive elements near the edges where they may be cropped.

A good MicroSim preview image should:

- Show the infographic in an **active state** — with data displayed, a region highlighted, or a tooltip visible — not a blank canvas or loading screen
- Include the **MicroSim title** as text overlay in the upper portion of the image so viewers can read it even when the platform's text fields are truncated
- Use the **aliceblue background** so the preview is visually consistent with the live MicroSim
- Have **sufficient contrast** for readability at small sizes (remember, the image may be displayed as small as 300px wide)
- Be a **real screenshot** of the working MicroSim, not a mockup or placeholder

#### Creating Preview Images

The simplest approach is to take a browser screenshot of the MicroSim at the correct dimensions:

1. Open `main.html` in the browser
2. Set the browser window to approximately 1200px wide
3. Use the browser's screenshot tool or a screen capture utility
4. Crop to exactly 1200 × 630 pixels, centering on the most visually informative area
5. Save as PNG in the MicroSim directory as `img/preview.png`

For automated screenshot generation at scale, tools like Playwright or Puppeteer can capture screenshots of every MicroSim in a portfolio with consistent dimensions.

### Overriding MkDocs Material Social Cards with Local Images

MkDocs Material includes a **Social Cards plugin** (`social` plugin) that automatically generates preview images with the page title and site branding. These auto-generated cards are useful as a default, but for MicroSim pages, a **screenshot of the actual infographic** is far more compelling than a text-only card.

To override the auto-generated social card with your own custom preview image, use the `image` property in the page's YAML frontmatter. In MkDocs Material, the `meta` frontmatter key allows you to set custom Open Graph tags that override the defaults:

```yaml
---
title: Cell Biology Interactive Diagram
description: Explore cell organelles with hover-activated descriptions and a quiz mode that tests your knowledge of mitochondria, ribosomes, and more.
image: img/preview.png
---
```

When the `image` field is set in the frontmatter, MkDocs Material uses your local image file as the `og:image` instead of the auto-generated social card. The path is relative to the page's directory.

If the Social Cards plugin is enabled in `mkdocs.yml`, the override hierarchy is:

1. **Page-level `image` frontmatter** — highest priority; uses your custom screenshot
2. **Auto-generated social card** — fallback if no page-level image is set
3. **Site-level default** — configured in `mkdocs.yml` under `extra` if no other image exists

!!! mascot-warning "Common Mistake"
    <img src="../../img/mascot/warning.png" class="mascot-admonition-img" alt="Percy warns you">
    Forgetting to set the `image` frontmatter on MicroSim pages is one of the most common packaging oversights. Without it, shared links show a generic text card instead of your beautiful infographic. Always capture a preview screenshot and reference it in the frontmatter — it takes 30 seconds and dramatically improves how your MicroSims appear when instructors share them in class chats.

### Social Media Override Plugin

Often, the priority of having a local image in the `imgage` or `og:image` field
may not be used by the mkdocs material social plugin. To get around this problem,
we have created another plugin called the `social_override` plugin.  This plugin
guarantees that a local image in the YML frontmatter will override the social
card generated by the social plugin.  An installer for this plugin is available
in the `book-installer` skill located in the [Claude Skills repo](https://github.com/dmccreary/claude-skills/skills/book-installer).

It is our hope that a future version of mkdocs-material will fix this issue.
See the [Mkdocs Material](https://github.com/squidfunk/mkdocs-material) issues
for an update.

### Testing Your Open Graph Tags

Before deploying, verify that your Open Graph tags render correctly. After running `mkdocs gh-deploy`, you can test your live URLs with these platform-specific tools:

- **Facebook Sharing Debugger** — shows exactly what Facebook will display and lets you clear cached previews
- **Twitter/X Card Validator** — previews the card format and flags missing tags
- **LinkedIn Post Inspector** — previews the link card and refreshes cached metadata
- **Slack** — simply paste the URL into a Slack message to yourself; Slack renders previews in real time

For local testing before deployment, view the page source in your browser and search for `og:image` to confirm the meta tag points to your custom preview image rather than the default social card.

## Embedding MicroSims in Textbook Pages

Embedding is how MicroSim infographics appear within textbook chapter pages. The MicroSim packaging standard defines three embedding mechanisms, each serving a different purpose.

### Display Iframe

The **display iframe** is the primary embedding mechanism — an `<iframe>` element in the chapter's markdown that loads the MicroSim's main.html:

```html
<iframe src="../../sims/cell-biology/main.html" width="100%" height="500px" scrolling="no"></iframe>
```

Key rules for display iframes:

- Never add a `style` attribute to the iframe (styles are governed by `extra.css`)
- Always include `scrolling="no"` to prevent scroll hijacking
- Use `width="100%"` for responsive width
- Set an initial `height` that matches the MicroSim's expected height

### Copy-Paste Iframe

The **copy-paste iframe** is a secondary embed code designed for use outside the textbook — in blog posts, LMS pages, or other websites. It includes the full absolute URL and self-contained styling:

```html
<iframe src="https://textbook.example.com/sims/cell-biology/main.html"
        width="100%" height="500px" style="border: 1px solid silver;"
        scrolling="no"></iframe>
```

A copy-paste iframe code snippet is typically included in the MicroSim's index.md documentation page so that educators can easily embed the infographic in their own materials.

### Fullscreen Link Button

The **fullscreen link button** is a markdown link placed immediately after the display iframe that opens the MicroSim in a full browser tab:

```markdown
[View Cell Biology Diagram Fullscreen](../../sims/cell-biology/main.html)
```

This provides students with an uncluttered, full-screen view of the infographic — useful for complex MicroSims that benefit from more screen space, for presentations, and for accessibility (screen readers and assistive technologies work better with a full page than an iframe).

### p5.js Editor Link

The **p5.js editor link** opens the MicroSim's code in the online p5.js web editor, allowing students to view, modify, and experiment with the JavaScript code. This supports the learning objective of understanding how infographics are built, not just using them:

```markdown
[Edit in p5.js Editor](https://editor.p5js.org/?source=https://textbook.example.com/sims/cell-biology/sketch.js)
```

## The Visual Layout Standard

Visual consistency across all MicroSims in a textbook creates a professional, cohesive experience. The MicroSim standard defines three visual elements that every infographic should use.

### Aliceblue Drawing Region

The **aliceblue drawing region** is the primary canvas area where the infographic's visual content is rendered. The background color `aliceblue` (hex `#F0F8FF`, RGB 240, 248, 255) was chosen for its soft, neutral appearance that provides sufficient contrast for colored visual elements without the harshness of pure white.

### White Control Region

The **white control region** is the area below the drawing canvas that contains interactive controls — sliders, buttons, dropdowns, and text inputs. The white background (`#FFFFFF`) visually separates controls from the drawing area, creating a clear two-zone layout.

### Silver Border

The **silver border** (1px solid `silver`, hex `#C0C0C0`) provides a subtle visual boundary between the drawing region and the control region, and around the MicroSim's outer edge when embedded in a textbook page.

Together, these three elements create the signature MicroSim visual identity:

```
┌──────────────────────────────────┐
│                                  │
│     Aliceblue Drawing Region     │
│     (interactive canvas)         │
│                                  │
├──────────────────────────────────┤  ← Silver border
│     White Control Region         │
│     [Slider] [Button] [Select]   │
└──────────────────────────────────┘
```

### Color Consistency

**Color consistency** means using the same color palette across all MicroSims in a textbook. The standard defines:

- Drawing background: `aliceblue` (#F0F8FF)
- Control background: `white` (#FFFFFF)
- Border: `silver` (#C0C0C0)
- Primary accent: the textbook's theme color (e.g., blue #4A90D9)
- Secondary accent: the textbook's accent color (e.g., orange #FF6600)
- Text: dark gray (#333333)

### Font Size Scaling

**Font size scaling** ensures that text labels, titles, and descriptions within the MicroSim remain readable across different canvas sizes. The standard approach is to calculate font sizes as a proportion of the canvas width:

```javascript
let baseFontSize = max(12, width * 0.02);  // 2% of canvas width, minimum 12px
let titleFontSize = baseFontSize * 1.5;
let labelFontSize = baseFontSize;
let smallFontSize = baseFontSize * 0.8;
```

This ensures that a MicroSim displayed at 600px wide has appropriately smaller text than one displayed at 1200px wide, maintaining readability at both extremes.

#### Diagram: MicroSim Visual Standards Explorer

<iframe src="../../sims/microsim-visual-standards/main.html" width="100%" height="550px" scrolling="no"></iframe>

<details markdown="1">
<summary>MicroSim Visual Standards Explorer</summary>
Type: microsim
**sim-id:** microsim-visual-standards<br/>
**Library:** p5.js<br/>
**Status:** Specified

**Bloom Level:** Understand (L2)
**Bloom Verb:** Explain
**Learning Objective:** Explain the MicroSim visual layout standard by interacting with an annotated example that highlights the aliceblue drawing region, white control region, silver border, color consistency, and font size scaling.

**Instructional Rationale:** An annotated interactive example is appropriate because the Understand objective requires learners to see each visual standard element identified and explained in context. Hovering over each labeled region provides just-in-time definitions.

**Canvas Layout:**
- Drawing area (aliceblue): a sample infographic with 4 labeled regions
- Control area (white, silver border): sample slider and button controls
- Annotation overlay: labeled arrows pointing to each standard element

**Visual Elements:**
- A working sample MicroSim (simple bar chart with 4 bars) displayed at full standard
- Annotation arrows pointing to:
  1. "Aliceblue Drawing Region (#F0F8FF)" → the canvas background
  2. "White Control Region (#FFFFFF)" → the controls area
  3. "Silver Border (1px solid #C0C0C0)" → the dividing line
  4. "Font Size Scaling" → text labels that resize with the canvas
  5. "Color Consistency" → the bar colors matching the textbook theme
- Hovering over an annotation arrow highlights the corresponding element and shows a tooltip with its specification

**Interactive Controls:**
- Slider: "Canvas Width" (range 400–1000px, default 700px) — resizes the sample MicroSim to demonstrate responsive behavior and font scaling
- Toggle: "Show Annotations" (default on) — shows/hides the annotation arrows
- Toggle: "Show Hex Values" — displays the hex color value inside each colored region
- The sample bar chart is functional (hovering bars shows values) to demonstrate that the standard does not interfere with interactivity

**Behavior:**
- Resizing the canvas width visually demonstrates font scaling (text gets proportionally larger/smaller)
- Annotations reposition as the canvas resizes
- Responsive to window resize

**Default Parameters:**
- Canvas Width: 700px
- Show Annotations: on
- Show Hex Values: off
- Canvas width: responsive
- Canvas height: 500px

Implementation: p5.js with annotated MicroSim rendering
</details>

## Iframe Height Reporting with postMessage

### The postMessage API

The **postMessage API** is a browser mechanism for safe communication between an iframe and its parent page, even across different origins. For MicroSim packaging, postMessage serves a critical purpose: **iframe height reporting**.

### Iframe Height Reporting

**Iframe height reporting** solves a fundamental embedding problem: the parent page does not know how tall the MicroSim content is, and setting a fixed iframe height either wastes space (too tall) or clips content (too short). The solution is for the MicroSim to measure its own height and report it to the parent page:

```javascript
// Inside the MicroSim (main.html)
function reportHeight() {
    let height = document.body.scrollHeight;
    window.parent.postMessage({
        type: 'microsim-resize',
        height: height
    }, '*');
}

// Call after setup and on window resize
window.addEventListener('load', reportHeight);
window.addEventListener('resize', reportHeight);
```

The parent page's JavaScript (loaded via `extra.js` in MkDocs) listens for these messages and adjusts the iframe height accordingly:

```javascript
// In the parent page (extra.js)
window.addEventListener('message', function(event) {
    if (event.data && event.data.type === 'microsim-resize') {
        let iframes = document.querySelectorAll('iframe');
        for (let iframe of iframes) {
            if (iframe.contentWindow === event.source) {
                iframe.style.height = event.data.height + 'px';
            }
        }
    }
});
```

This mechanism ensures that every MicroSim occupies exactly the space it needs, regardless of its content height, control count, or responsive layout configuration.

## Quality Assurance: Rubric and Checklist

Consistent quality across a textbook's MicroSim portfolio requires objective measurement tools. The MicroSim standard provides two complementary instruments: a scoring rubric for quality assessment and a checklist for deployment readiness.

### MicroSim Quality Rubric

The **MicroSim quality rubric** is a 100-point scoring system that evaluates a MicroSim across multiple dimensions. The **quality score** produced by the rubric provides a single number that summarizes the overall quality of the infographic.

| Category | Max Points | What It Measures |
|----------|-----------|-----------------|
| Functionality | 25 | Does the infographic work correctly? Are interactions responsive? |
| Visual Design | 20 | Color consistency, layout, typography, use of standard regions |
| Educational Value | 20 | Learning objective clarity, concept coverage, engagement |
| Metadata | 15 | Dublin Core completeness, YAML frontmatter, Open Graph tags |
| Responsiveness | 10 | Width-responsive behavior, font scaling, mobile compatibility |
| Code Quality | 10 | Clean code, no console errors, proper event handling |

A quality score of **85 or above** indicates a MicroSim ready for production deployment. Scores between **70-84** indicate a functional MicroSim that would benefit from refinement. Scores below **70** suggest significant issues that should be addressed before deployment.

### Standardization Checklist

The **standardization checklist** is a binary (pass/fail) list of requirements that every MicroSim must meet before deployment. Unlike the rubric (which allows partial credit), the checklist items are non-negotiable:

- [ ] `main.html` file exists and loads without errors
- [ ] `index.md` file exists with YAML frontmatter (title and description)
- [ ] `metadata.json` file exists with all required Dublin Core fields
- [ ] Background color is aliceblue (#F0F8FF)
- [ ] Control region has white background and silver border
- [ ] `scrolling="no"` on all iframe embeds
- [ ] No `style` attribute on iframe elements
- [ ] postMessage height reporting implemented
- [ ] Responsive to window resize events
- [ ] No JavaScript console errors
- [ ] Library versions pinned in CDN URLs
- [ ] Fullscreen link provided after iframe embed

#### Diagram: MicroSim Quality Scorer

<iframe src="../../sims/microsim-quality-scorer/main.html" width="100%" height="600px" scrolling="no"></iframe>

<details markdown="1">
<summary>MicroSim Quality Scorer</summary>
Type: microsim
**sim-id:** microsim-quality-scorer<br/>
**Library:** p5.js<br/>
**Status:** Specified

**Bloom Level:** Evaluate (L5)
**Bloom Verb:** Assess
**Learning Objective:** Assess the quality of a MicroSim by scoring it against the quality rubric across six categories, producing a total quality score, and identifying specific areas for improvement.

**Instructional Rationale:** A guided scoring tool is appropriate because the Evaluate objective requires learners to apply the rubric criteria to concrete examples. Scoring a sample MicroSim (or their own work) builds evaluative judgment and familiarity with quality standards.

**Canvas Layout:**
- Left panel (aliceblue, 55% width): a preview of a sample MicroSim being scored
- Right panel (white, silver border, 45% width): scoring interface with sliders for each category

**Visual Elements:**
- Left: an embedded preview of a sample MicroSim (a simple bar chart) with annotations highlighting issues to evaluate (e.g., missing silver border, incorrect background color, no height reporting)
- Right: six scoring sliders, one per rubric category:
  - Functionality (0-25)
  - Visual Design (0-20)
  - Educational Value (0-20)
  - Metadata (0-15)
  - Responsiveness (0-10)
  - Code Quality (0-10)
- Below the sliders: total score display (large number, color-coded: green ≥85, yellow 70-84, red <70)
- A "Findings" text area that auto-populates with feedback based on the scores (e.g., "Visual Design: Score 12/20 — Consider using aliceblue background and silver borders for MicroSim standard compliance")

**Interactive Controls:**
- 6 sliders for scoring each category
- Dropdown: "Sample MicroSim" with 3 options:
  - "Good Example" (expected score ~90)
  - "Needs Work" (expected score ~72)
  - "Poor Example" (expected score ~45)
- Selecting a sample loads a different preview with different issues visible
- Button: "Reset Scores" — clears all sliders to 0
- Button: "Copy Report" — copies the scores and findings as formatted text

**Behavior:**
- Moving any slider updates the total score in real time
- The total score changes color based on the threshold
- The Findings area updates dynamically based on slider positions
- Responsive to window resize; panels stack vertically on narrow screens

**Default Parameters:**
- Sample: "Good Example"
- All sliders at 0 initially (user must evaluate)
- Canvas width: responsive
- Canvas height: 550px

Implementation: p5.js with slider-based scoring and dynamic feedback generation
</details>

## Deployment with gh-deploy

The **gh-deploy command** (`mkdocs gh-deploy`) builds the MkDocs site and pushes it to the `gh-pages` branch of the GitHub repository, making the textbook (and all embedded MicroSims) publicly accessible via GitHub Pages.

The deployment workflow:

1. Run `mkdocs build` to verify the site builds without errors
2. Review the built site locally with `mkdocs serve`
3. Run `mkdocs gh-deploy` to build and push to GitHub Pages
4. Verify the deployed site at the GitHub Pages URL

The gh-deploy command handles the entire deployment pipeline — building HTML from markdown, copying MicroSim directories to the output, and pushing to the hosting branch. Every MicroSim in the `docs/sims/` directory is automatically included in the deployment because MkDocs copies all non-markdown files to the built site.

## Shared Libraries and Templates

### Shared Libraries

A **shared library** is a JavaScript file used by multiple MicroSims — most commonly the overlay diagram driver (`overlay-diagram.js`) or a custom utility library for common operations (color management, responsive layout helpers, analytics integration). Shared libraries are stored in a common directory (e.g., `docs/sims/lib/`) and referenced from each MicroSim's main.html:

```html
<script src="../lib/overlay-diagram.js"></script>
```

The advantage of shared libraries is that bug fixes and improvements propagate to every MicroSim that uses them. The trade-off is a dependency: if the shared library changes its API, all dependent MicroSims must be updated.

### Template MicroSims

A **template MicroSim** is a starter package that provides the standard directory structure, boilerplate HTML, CSS, and JavaScript, and placeholder content that a designer fills in to create a new infographic. Templates dramatically accelerate MicroSim creation by eliminating repetitive setup work:

```
docs/sims/_templates/
├── p5js-basic/           # Template for p5.js canvas MicroSims
│   ├── main.html
│   ├── index.md
│   ├── metadata.json
│   └── sketch.js
├── chartjs-basic/        # Template for Chart.js chart MicroSims
├── overlay-type1/        # Template for Type 1 rectangular overlays
├── overlay-type2/        # Template for Type 2 polygon overlays
└── vis-network-basic/    # Template for vis-network graph MicroSims
```

Each template includes all standard elements (aliceblue background, white controls, silver border, postMessage height reporting, metadata.json with placeholder values) so that the designer starts from a compliant baseline.

### Reusable Overlay Schema

The **reusable overlay schema** is a JSON Schema document that defines the valid structure for overlay JSON configuration files across all four overlay types. The schema enables automated validation: before deploying an overlay MicroSim, a validation script checks the overlay.json against the schema and reports any structural errors (missing fields, wrong data types, coordinates outside 0-1 range).

## Width-Responsive Testing

**Width-responsive testing** is the process of verifying that a MicroSim displays correctly across a range of viewport widths. Because MicroSims are embedded in MkDocs content areas that vary from approximately 600px to 900px wide (and may be viewed on mobile devices at narrower widths), every MicroSim must be tested at multiple sizes.

A systematic testing protocol:

| Test Width | Simulates | What to Check |
|-----------|-----------|---------------|
| 360px | Mobile phone | Controls usable, text readable, no horizontal overflow |
| 600px | Narrow content area | Layout intact, labels not truncated |
| 768px | Tablet / medium area | Standard layout, proper spacing |
| 900px | Standard content area | Full layout, all features visible |
| 1200px | Wide content area | No excessive whitespace, proportional scaling |

Testing can be performed using the browser's responsive design mode (DevTools → Toggle Device Toolbar) or by resizing the browser window while viewing the MicroSim's main.html directly.

### The Infographic Portfolio

An **infographic portfolio** is a collection of all MicroSims in a textbook, organized and cataloged for easy browsing, quality tracking, and maintenance. The portfolio typically takes the form of a summary page listing each MicroSim with its title, quality score, library, and links to the documentation page and fullscreen view.

A well-maintained portfolio serves multiple purposes:

- **Quality tracking** — At a glance, identify which MicroSims need attention (low quality scores)
- **Content planning** — See which topics and visualization types are covered, and where gaps exist
- **Reuse** — Find existing MicroSims that can be adapted for new chapters
- **Showcase** — Demonstrate the breadth of interactive content to stakeholders and adopters

#### Diagram: MicroSim Directory Structure Explorer

<iframe src="../../sims/microsim-directory-explorer/main.html" width="100%" height="550px" scrolling="no"></iframe>

<details markdown="1">
<summary>MicroSim Directory Structure Explorer</summary>
Type: infographic
**sim-id:** microsim-directory-explorer<br/>
**Library:** p5.js<br/>
**Status:** Specified

**Bloom Level:** Remember (L1)
**Bloom Verb:** Identify
**Learning Objective:** Identify the required files in a MicroSim directory and recall the purpose of each file (main.html, index.md, metadata.json, sketch.js) in the MicroSim packaging standard.

**Instructional Rationale:** An interactive file tree with hover-to-reveal descriptions supports the Remember objective by creating file-name-to-purpose associations through repeated retrieval practice. The quiz mode reinforces memorization.

**Canvas Layout:**
- Main area (aliceblue): interactive file tree visualization
- Right info panel (white, silver border, 35% width): file details

**Visual Elements:**
- A visual file tree showing a complete MicroSim directory:
  - 📁 cell-biology/ (root folder)
    - 📄 main.html
    - 📄 index.md
    - 📄 metadata.json
    - 📄 sketch.js
    - 📄 style.css
    - 📄 overlay.json
    - 📁 img/
      - 🖼️ diagram.png
      - 🖼️ preview.png
- Each file/folder is clickable; selecting one highlights it and displays details in the right panel
- File icons are color-coded by type (HTML=orange, MD=blue, JSON=green, JS=yellow, CSS=purple, images=red)

**Interactive Controls:**
- Click a file to select it and read: filename, purpose, required/optional status, and a 3-line example of its contents
- Toggle: "Show File Sizes" — displays approximate file sizes next to each file
- Button: "Quiz Mode" — hides file descriptions; user clicks a file and selects its purpose from 4 multiple-choice options; score tracked
- Button: "Show All" — expands all folders and shows descriptions inline

**Behavior:**
- Clicking a folder expands/collapses it with animation
- Selected file has a blue highlight
- Quiz Mode provides immediate correct/incorrect feedback with the correct answer shown
- Responsive to window resize; file tree and info panel stack on narrow screens

**Default Parameters:**
- All folders expanded
- No file selected initially
- Quiz Mode: off
- Canvas width: responsive
- Canvas height: 500px

Implementation: p5.js with interactive tree rendering
</details>

## Finding Similar MicroSims: Faceted Search and Embeddings

As your infographic portfolio grows — and as you begin creating MicroSims with the help of AI agents and AI Skills — one of the most valuable capabilities is the ability to **find similar MicroSims** that can serve as proven templates for new work. Rather than starting from scratch, a designer or AI agent can locate an existing MicroSim that closely matches the desired outcome and use it as a starting point, dramatically improving both quality and speed.

The [Search MicroSims](https://dmccreary.github.io/search-microsims/) project provides both interactive faceted search demos and tools for creating multiple types of embeddings optimized for MicroSim discovery. This section explores why finding similar MicroSims is important and how two distinct similarity dimensions — topic similarity and technical similarity — combine to produce better results.

### Two Dimensions of MicroSim Similarity

The key insight is that **finding a MicroSim about a similar topic is fundamentally different from finding a MicroSim that uses a similar JavaScript library and visualization type** — and both dimensions matter when generating new high-quality MicroSims.

**Topic/Subject similarity** answers the question: "What other MicroSims teach related concepts?" A MicroSim about cell mitosis is topically similar to one about cell meiosis, even if they use completely different JavaScript libraries and visualization approaches. Topic embeddings are generated from the `dc:subject` keywords, the `dc:title`, and the `dc:description` fields in metadata.json.

**Technical/Structural similarity** answers the question: "What other MicroSims use the same library and visualization pattern?" A p5.js overlay-type2 MicroSim about cell biology is technically similar to a p5.js overlay-type2 MicroSim about engine components, even though they cover entirely different subjects. Technical embeddings are generated from the `microsim:library`, `microsim:visualization_type`, and code structure features.

| Similarity Dimension | What It Captures | Generated From | Use Case |
|---------------------|-----------------|----------------|----------|
| Topic/Subject | Conceptual relatedness | dc:subject, dc:title, dc:description | Find MicroSims about related educational topics |
| Technical/Structural | Implementation similarity | Library, visualization type, code patterns | Find proven templates for a given technical approach |

### Why Both Dimensions Matter for AI-Assisted Generation

When an AI agent (such as a Claude Code skill) needs to generate a new MicroSim, the best results come from combining both similarity dimensions:

1. **Find topically similar MicroSims** to understand the educational context — what concepts are typically visualized together, what labels and descriptions work well, and what learning objectives are appropriate
2. **Find technically similar MicroSims** to use as implementation templates — proven code patterns, tested responsive layouts, and working event handling for the chosen library and visualization type

For example, if you need a new p5.js overlay-type2 MicroSim about the human respiratory system:

- **Topic search** finds existing MicroSims about anatomy, biology, and organ systems — providing good examples of labels, descriptions, and educational approaches
- **Technical search** finds existing p5.js overlay-type2 MicroSims — providing working code templates with proper polygon hit detection, hover highlights, and infobox rendering

The intersection of these two searches gives the AI agent the best possible starting context for generating a high-quality MicroSim.

### Faceted Search for MicroSim Discovery

Faceted search provides a structured browsing interface with filters for multiple metadata dimensions simultaneously. The [Search MicroSims](https://dmccreary.github.io/search-microsims/) site demonstrates how faceted search enables designers and AI agents to quickly narrow a large portfolio to the most relevant examples:

- **Subject facet** — Filter by topic area (biology, physics, history, computer science)
- **Library facet** — Filter by JavaScript library (p5.js, D3.js, Chart.js, vis-network, Leaflet)
- **Visualization type facet** — Filter by pattern (overlay-type1, bar-chart, network-graph, timeline)
- **Quality score facet** — Filter by minimum quality score (show only MicroSims scoring 85+)
- **Bloom level facet** — Filter by target Bloom's Taxonomy level

Faceted search is complementary to embedding-based similarity search. Facets provide exact categorical filtering ("show me all p5.js overlay MicroSims"), while embeddings provide fuzzy similarity matching ("show me MicroSims most similar to this description"). Together, they create a powerful discovery system that scales as your portfolio grows from dozens to hundreds or thousands of MicroSims.

!!! mascot-thinking "Key Insight"
    <img src="../../img/mascot/thinking.png" class="mascot-admonition-img" alt="Percy is thinking">
    As your MicroSim portfolio grows, the ability to find similar existing MicroSims becomes one of your most powerful quality levers. An AI agent that can search both by topic and by technical approach will consistently generate better MicroSims than one that starts from scratch — because it builds on patterns that have already been tested, refined, and proven to work.

## Summary

!!! mascot-celebration "Excellent Work!"
    <img src="../../img/mascot/celebration.png" class="mascot-admonition-img" alt="Percy celebrates">
    You now have a complete understanding of the MicroSim packaging standard — from directory structure to metadata to quality scoring to deployment! These standards are what transform individual infographic experiments into a professional, scalable portfolio of interactive learning content. Every standard you follow makes your next MicroSim easier to create, easier to maintain, and easier to share. Display it with style!

In this chapter, you learned that:

- The **MicroSim directory** follows a standard structure with the **main.html file** as the entry point (not index.html), the **index.md file** for MkDocs documentation with **YAML frontmatter** containing **title metadata** and **description metadata**, and the **metadata.json file** with **Dublin Core metadata**
- **Social preview images** and **Open Graph tags** control how MicroSim pages appear when shared on social media
- The **display iframe** embeds MicroSims in chapter pages (with `scrolling="no"` and no `style` attribute), the **copy-paste iframe** provides standalone embed code, the **fullscreen link button** opens a full-page view, and the **p5.js editor link** enables code exploration
- The visual layout standard specifies an **aliceblue drawing region**, **white control region**, and **silver border** for consistent appearance, with **color consistency** and **font size scaling** ensuring professional quality across sizes
- The **postMessage API** enables **iframe height reporting** so MicroSims automatically communicate their height to the parent page
- The **MicroSim quality rubric** produces a **quality score** (0-100) across six categories, while the **standardization checklist** provides binary pass/fail deployment criteria, together forming the **quality assurance** system
- The **gh-deploy command** builds and publishes the textbook to GitHub Pages
- **Shared libraries** reduce duplication, **template MicroSims** accelerate creation, the **reusable overlay schema** validates overlay JSON files, and **width-responsive testing** verifies behavior across screen sizes
- The **infographic portfolio** catalogs all MicroSims for quality tracking, content planning, and reuse
- **Faceted search** and **embeddings** enable finding similar MicroSims along two dimensions — topic/subject similarity and technical/structural similarity — which is essential for AI-assisted generation of new high-quality MicroSims based on proven working templates

## References

- [Dublin Core Metadata Initiative](https://www.dublincore.org/specifications/dublin-core/)
- [Wikipedia: Dublin Core](https://en.wikipedia.org/wiki/Dublin_Core)
- [Open Graph Protocol](https://ogp.me/)
- [Wikipedia: Open Graph Protocol](https://en.wikipedia.org/wiki/Facebook_Platform#Open_Graph_protocol)
- [MDN Web Docs: postMessage](https://developer.mozilla.org/en-US/docs/Web/API/Window/postMessage)
- [MkDocs Material — Social Cards](https://squidfunk.github.io/mkdocs-material/setup/setting-up-social-cards/)
- [MkDocs — Deploying with GitHub Pages](https://www.mkdocs.org/user-guide/deploying-your-docs/)
- [JSON Schema Specification](https://json-schema.org/specification)
- [Search MicroSims — Faceted Search and Embeddings](https://dmccreary.github.io/search-microsims/)
- [Wikipedia: Faceted Search](https://en.wikipedia.org/wiki/Faceted_search)
