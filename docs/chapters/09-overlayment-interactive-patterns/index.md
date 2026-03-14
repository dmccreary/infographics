---
title: Overlayment Interactive Patterns
description: Master the four overlayment interactive infographic patterns — rectangular regions, complex polygons, callout-to-edge labels, and floating labels — along with the overlay JSON format, shared driver, and edit mode.
generated_by: claude skill chapter-content-generator
date: 2026-03-14 10:50:22
version: 0.05
---

# Overlayment Interactive Patterns

## Summary

This chapter details the four overlayment interactive infographic patterns that transform static images into interactive learning experiences. You will learn to create Type 1 rectangular region overlays, Type 2 complex polygon overlays, Type 3 callout-to-edge labels with numbered indicators, and Type 4 floating labels with draggable positioning. The chapter covers the overlay JSON file format, the shared overlay diagram driver, and the edit mode for calibrating overlay positions.

## Concepts Covered

This chapter covers the following 20 concepts from the learning graph:

1. Overlayment Pattern
2. Overlay JSON File
3. Overlay Diagram Driver
4. Type 1 Rectangular
5. Non-Overlapping Regions
6. Rectangular Region
7. Region Extent Highlight
8. Type 2 Complex Polygon
9. Polygon Region
10. Multi-Edge Overlay
11. Polygon Edge Point
12. Type 3 Callout to Edge
13. Callout Point
14. Edge-Aligned Label
15. Numbered Indicator
16. Show Numbers Toggle
17. Type 4 Floating Label
18. Floating Label
19. Draggable Positioning
20. Edit Mode

## Prerequisites

This chapter builds on concepts from:

- [Chapter 1: Foundations of Interactive Infographics](../01-foundations-of-interactive-infographics/index.md)
- [Chapter 6: Web Fundamentals: Structure, Style, and Data](../06-web-fundamentals-structure-style-and-data/index.md)
- [Chapter 7: Web Fundamentals: JavaScript and Responsive Design](../07-web-fundamentals-javascript-and-responsive-design/index.md)

---

!!! mascot-welcome "Let's Make It Visual!"
    <img src="../../img/mascot/welcome.png" class="mascot-admonition-img" alt="Percy welcomes you">
    Welcome to the chapter that turns ordinary images into extraordinary interactive learning experiences! The overlayment patterns you are about to learn are the signature technique of this course — they let you take any diagram, photograph, or illustration and add hover regions, click interactions, infoboxes, and labeled callouts. By the end, you will have four powerful patterns in your toolkit, each suited to a different type of visual content. Let's make it visual!

## Learning Objectives

By the end of this chapter, you will be able to:

- **Explain** the overlayment pattern concept and how it separates image content from interaction logic (Bloom: Understand)
- **Construct** a Type 1 rectangular overlay with non-overlapping regions, hover highlights, and infoboxes (Bloom: Apply)
- **Implement** a Type 2 complex polygon overlay with multi-edge regions for irregular shapes (Bloom: Apply)
- **Distinguish** between the four overlay types and select the appropriate one for a given image and use case (Bloom: Analyze)
- **Create** a Type 4 floating label overlay with draggable positioning and edit mode for calibration (Bloom: Create)

## Introduction

Imagine you have a beautifully detailed diagram of a cell, an engine, a historical map, or a software architecture. The image itself is rich with information, but it is static — students can only look at it. What if hovering over the nucleus revealed a description of DNA replication? What if clicking on the combustion chamber opened an explanation of the four-stroke cycle? What if numbered callouts around a circuit board linked to detailed component specifications?

This is exactly what **overlayment patterns** achieve. An overlayment interactive infographic takes an existing image and adds an invisible layer of interactive regions on top of it. When students hover over or click these regions, the infographic responds with highlights, infoboxes, labels, and descriptions. The image itself remains unchanged — all the interactivity comes from the overlay layer, defined in a JSON configuration file and rendered by a shared JavaScript driver.

This separation of concerns — image content in one file, interaction definitions in another, rendering logic in a shared driver — is what makes overlayment patterns so practical for instructional designers. You can reuse the same driver across hundreds of infographics, and updating an image or changing the interactive regions requires editing only the relevant file, not rewriting code.

This chapter presents the four overlay types in order of increasing complexity. Each type builds on the concepts from the previous one, so by the time you reach Type 4, you will have a thorough understanding of how all the pieces fit together.

## The Overlayment Pattern Architecture

An **overlayment pattern** is an interactive infographic technique that layers transparent interactive regions over a static background image. The pattern consists of three components working together:

1. **Background image** — The visual content (diagram, photo, illustration) displayed at full size
2. **Overlay JSON file** — A data file that defines the interactive regions, their positions, labels, and descriptions
3. **Overlay diagram driver** — A shared JavaScript file that reads the JSON, draws the overlay regions, handles user events, and displays infoboxes

This architecture provides several advantages for educational content:

- **Reusability** — The same driver JavaScript works for any image; only the JSON changes
- **Maintainability** — Update labels or descriptions by editing JSON, without touching code
- **Scalability** — Add new regions or modify existing ones without rebuilding the infographic
- **Consistency** — Every overlay infographic in the textbook behaves identically because they share the same driver
- **AI-assisted creation** — Generative AI can produce overlay JSON files from image descriptions, dramatically accelerating content creation

### The Overlay JSON File

The **overlay JSON file** is the data backbone of every overlayment infographic. It defines the image source, the interactive regions, and the content displayed when users interact with each region. The JSON structure varies slightly by overlay type, but all types share common fields:

```json
{
    "image": "diagram.png",
    "title": "Cell Biology Diagram",
    "width": 800,
    "height": 600,
    "regions": [
        {
            "id": "region-1",
            "label": "Region Name",
            "description": "Detailed description shown in the infobox.",
            "geometry": { }
        }
    ]
}
```

The `geometry` field varies by overlay type: rectangular coordinates for Type 1, polygon point arrays for Type 2, callout coordinates for Types 3 and 4.

### The Overlay Diagram Driver

The **overlay diagram driver** is a shared JavaScript library (`overlay-diagram.js`) that provides the rendering and interaction logic for all four overlay types. The driver:

- Loads the background image and the overlay JSON configuration
- Draws transparent interactive regions on top of the image
- Detects hover and click events using hit detection (bounding boxes for rectangles, ray casting for polygons)
- Displays region highlights, labels, and infoboxes in response to user interaction
- Reports height to the parent iframe for auto-resizing via `postMessage`
- Adapts to window resizes for responsive behavior

Because the driver is shared, improvements to interaction handling, accessibility, or visual styling benefit every overlay infographic in the textbook simultaneously.

| Component | File | Role | Changes Per Infographic |
|-----------|------|------|------------------------|
| Background image | `diagram.png` | Visual content | Different for each |
| Overlay JSON | `overlay.json` | Region definitions, labels, descriptions | Different for each |
| Overlay driver | `overlay-diagram.js` | Rendering, events, infobox display | Shared (same for all) |
| HTML wrapper | `main.html` | Loads image, JSON, and driver | Minimal changes |

## Type 1: Rectangular Region Overlay

The **Type 1 rectangular** overlay is the simplest and most common overlay pattern. It divides the image into **non-overlapping rectangular regions**, each defined by a position (x, y) and dimensions (width, height). When the user hovers over a region, the **region extent highlight** — a semi-transparent colored rectangle — appears over that area, and an infobox displays the region's label and description.

### Non-Overlapping Regions

**Non-overlapping regions** means that no two rectangular regions share any pixels. This constraint simplifies hit detection (only one region can be active at a time) and prevents visual confusion when highlights overlap. When designing a Type 1 overlay, you partition the image into distinct rectangular zones, each covering a meaningful area of the diagram.

### Rectangular Region Definition

A **rectangular region** is defined by four values in the overlay JSON:

```json
{
    "id": "nucleus",
    "label": "Nucleus",
    "description": "The nucleus contains DNA and controls cell activities. It is surrounded by a double membrane called the nuclear envelope.",
    "geometry": {
        "type": "rect",
        "x": 0.25,
        "y": 0.20,
        "width": 0.20,
        "height": 0.25
    }
}
```

Note that coordinates are specified as **relative values** (0.0 to 1.0) rather than pixel values. This ensures the overlay regions scale correctly when the infographic is displayed at different sizes — essential for width-responsive design.

### Region Extent Highlight

The **region extent highlight** is the visual feedback that appears when a user hovers over a rectangular region. Typically implemented as a semi-transparent rectangle (e.g., `rgba(255, 102, 0, 0.3)` for a warm orange glow), the highlight shows the user exactly which area they are interacting with and provides a clear visual connection between the cursor position and the infobox content.

Type 1 overlays are ideal for:

- Diagrams with clearly defined rectangular sections (organizational charts, floor plans, grid layouts)
- Screenshots of software interfaces where each UI element occupies a rectangular area
- Any image that can be meaningfully partitioned into non-overlapping rectangular zones

#### Diagram: Type 1 Rectangular Overlay Demo

<iframe src="../../sims/type1-rectangular-overlay/main.html" width="100%" height="550px" scrolling="no"></iframe>

<details markdown="1">
<summary>Type 1 Rectangular Overlay Demo</summary>
Type: microsim
**sim-id:** type1-rectangular-overlay<br/>
**Library:** p5.js<br/>
**Status:** Specified

**Bloom Level:** Apply (L3)
**Bloom Verb:** Construct
**Learning Objective:** Construct a Type 1 rectangular overlay by hovering over non-overlapping rectangular regions on a sample diagram and observing how region extent highlights and infoboxes respond to user interaction.

**Instructional Rationale:** Interactive demonstration with a working overlay is appropriate because the Apply objective requires learners to see and interact with a complete Type 1 implementation. Experiencing the hover-highlight-infobox cycle firsthand builds practical understanding of how the pattern works.

**Canvas Layout:**
- Main drawing area (aliceblue): background diagram image with transparent rectangular overlay regions
- Infobox panel (below image, white background, silver border): displays label and description of hovered region

**Visual Elements:**
- A sample diagram image (e.g., a simplified computer architecture with 6 labeled blocks: CPU, RAM, Storage, GPU, Network, Power Supply)
- 6 non-overlapping rectangular regions drawn as invisible areas over each block
- On hover: a semi-transparent orange rectangle (region extent highlight) appears over the hovered region
- The region's label appears in bold above the highlight
- The infobox panel below shows: region label (h3), description text (paragraph), and the region's relative coordinates for educational transparency
- Non-hovered regions show thin dashed outlines (toggleable)

**Interactive Controls:**
- Toggle: "Show Region Outlines" (default on) — shows dashed borders around all regions for learning purposes; in production this would be off
- Toggle: "Show Coordinates" — displays the relative (x, y, w, h) values inside each region
- Dropdown: "Highlight Color" — choose from Orange, Blue, Green, Purple highlight colors
- The JSON configuration is displayed in a collapsible panel below the infobox for reference

**Behavior:**
- Hovering over a region smoothly fades in the highlight and updates the infobox
- Moving the cursor off all regions clears the highlight and shows "Hover over a region to learn more" in the infobox
- Only one region can be highlighted at a time (non-overlapping guarantee)
- Responsive to window resize; regions reposition based on relative coordinates

**Default Parameters:**
- Show Region Outlines: on
- Show Coordinates: off
- Highlight Color: Orange
- Canvas width: responsive
- Canvas height: 500px (image area) + infobox below

Implementation: p5.js with background image loading and rectangular hit detection
</details>

## Type 2: Complex Polygon Overlay

The **Type 2 complex polygon** overlay extends the rectangular pattern to support irregular shapes. Instead of axis-aligned rectangles, each region is defined as a **polygon region** — a closed shape specified by an ordered list of vertex coordinates. This enables overlays on images where the meaningful areas are not rectangular: anatomical diagrams, geographic regions, organic shapes, and mechanical components with curved or angled boundaries.

### Polygon Regions and Edge Points

A **polygon region** is defined by an array of **polygon edge points** — the vertices that form the boundary of the region. Each edge point is specified as a relative (x, y) coordinate:

```json
{
    "id": "mitochondria",
    "label": "Mitochondria",
    "description": "The powerhouse of the cell. Mitochondria generate ATP through cellular respiration.",
    "geometry": {
        "type": "polygon",
        "points": [
            [0.55, 0.35], [0.70, 0.30], [0.75, 0.40],
            [0.72, 0.52], [0.60, 0.55], [0.52, 0.45]
        ]
    }
}
```

The polygon is automatically closed by connecting the last point back to the first. The points must be specified in order (clockwise or counterclockwise) to form a valid polygon.

### Multi-Edge Overlay

A **multi-edge overlay** is a Type 2 overlay that contains multiple polygon regions, potentially with complex, non-rectangular boundaries that fit tightly around irregular shapes in the image. Hit detection for polygon regions uses the ray casting algorithm (point-in-polygon test) covered in Chapter 6, which correctly handles both convex and concave polygons.

The key advantage of Type 2 over Type 1 is precision: polygon regions can follow the actual contours of shapes in the diagram rather than approximating them with rectangles. This precision matters when:

- Regions are adjacent and non-rectangular (body organs, map territories)
- Rectangular approximations would overlap significantly
- Visual accuracy is important for educational credibility (anatomy, biology, geography)

| Feature | Type 1 (Rectangular) | Type 2 (Polygon) |
|---------|---------------------|-------------------|
| Region shape | Axis-aligned rectangles | Arbitrary polygons |
| Hit detection | Bounding box check | Ray casting algorithm |
| Setup complexity | Low (4 values per region) | Medium (N vertex pairs per region) |
| Precision | Approximate | Exact boundary matching |
| Best for | Grid layouts, screenshots, block diagrams | Anatomical diagrams, maps, organic shapes |

!!! mascot-thinking "Key Insight"
    <img src="../../img/mascot/thinking.png" class="mascot-admonition-img" alt="Percy is thinking">
    When deciding between Type 1 and Type 2, ask yourself: "Would rectangular regions overlap or leave significant gaps?" If the answer is yes, use polygon regions. If the image has a natural grid structure where rectangles fit cleanly, Type 1 is simpler and perfectly adequate.

#### Diagram: Type 2 Polygon Overlay Demo

<iframe src="../../sims/type2-polygon-overlay/main.html" width="100%" height="550px" scrolling="no"></iframe>

<details markdown="1">
<summary>Type 2 Polygon Overlay Demo</summary>
Type: microsim
**sim-id:** type2-polygon-overlay<br/>
**Library:** p5.js<br/>
**Status:** Specified

**Bloom Level:** Apply (L3)
**Bloom Verb:** Implement
**Learning Objective:** Implement a Type 2 complex polygon overlay by interacting with irregular polygon regions on an anatomical diagram and observing how the ray casting hit detection correctly identifies the hovered region even for concave shapes.

**Instructional Rationale:** Interactive demonstration with visible hit detection is appropriate because the Apply objective requires learners to see polygon overlays in action. Showing the ray casting algorithm's behavior (with an optional visual trace) connects the geometric concepts from Chapter 6 to their practical application.

**Canvas Layout:**
- Main drawing area (aliceblue): background image (simplified cell diagram) with polygon overlay regions
- Infobox panel (below, white, silver border): label and description of hovered region

**Visual Elements:**
- A simplified cell biology diagram with 5 irregularly shaped organelles:
  1. Cell Membrane (large elliptical polygon, outer boundary)
  2. Nucleus (roughly circular polygon, center)
  3. Mitochondria (bean-shaped polygon, right side)
  4. Endoplasmic Reticulum (irregular wavy polygon, upper area)
  5. Golgi Apparatus (curved stack polygon, lower left)
- Each polygon region outlined with a thin colored border (unique color per region)
- On hover: the polygon fills with a semi-transparent version of its border color
- Vertex points shown as small dots when "Show Vertices" is enabled
- The infobox shows label, description, and the number of edge points defining the region

**Interactive Controls:**
- Toggle: "Show Polygon Outlines" (default on) — shows colored borders around all polygon regions
- Toggle: "Show Vertices" (default off) — displays the individual polygon edge points as small dots
- Toggle: "Show Ray Cast" (default off) — visualizes the horizontal ray from the cursor position, showing intersection points with polygon edges as red dots, and the crossing count
- The overlay JSON for the current diagram is displayed in a collapsible panel

**Behavior:**
- Hovering over a polygon region fills it with color and updates the infobox
- With "Show Ray Cast" enabled, a horizontal line extends from the cursor to the right edge, with red dots at every edge crossing; the crossing count (odd = inside, even = outside) is displayed
- Moving between adjacent polygons smoothly transitions the highlight
- Responsive to window resize; polygon vertices reposition based on relative coordinates

**Default Parameters:**
- Show Polygon Outlines: on
- Show Vertices: off
- Show Ray Cast: off
- Canvas width: responsive
- Canvas height: 500px + infobox

Implementation: p5.js with polygon rendering and ray casting hit detection
</details>

## Type 3: Callout to Edge Labels

The **Type 3 callout to edge** overlay takes a different approach from Types 1 and 2. Instead of highlighting regions of the image, it places **callout points** at specific locations and connects them to **edge-aligned labels** positioned along the edges of the diagram. This pattern is familiar from technical illustrations, museum exhibit labels, and anatomy textbook diagrams where numbered indicators point to specific features.

### Callout Points and Edge-Aligned Labels

A **callout point** is a specific (x, y) coordinate on the image that marks a point of interest. A thin line extends from the callout point to an **edge-aligned label** — a text label positioned along the left, right, top, or bottom edge of the diagram. This spatial separation keeps the labels readable without obscuring the image content.

```json
{
    "id": "spark-plug",
    "label": "Spark Plug",
    "description": "Ignites the air-fuel mixture in the combustion chamber.",
    "geometry": {
        "type": "callout",
        "point": [0.35, 0.22],
        "edge": "right",
        "edgePosition": 0.15
    }
}
```

### Numbered Indicators

A **numbered indicator** is a small circle containing a number, placed at the callout point on the image. Numbers provide a clear visual reference: students can scan the numbers on the image and find the corresponding label at the edge. The numbered indicator serves as the interactive target — hovering or clicking the number reveals the full description.

### Show Numbers Toggle

The **show numbers toggle** is a UI control that turns the numbered indicators on and off. When numbers are hidden, only the callout points (small dots) remain visible, creating a cleaner visual that students can use to test their knowledge — "Can I identify each component without the numbers?" This toggle supports self-assessment and formative evaluation.

Type 3 overlays are ideal for:

- Technical illustrations with many small components (engines, circuit boards, tools)
- Anatomical diagrams where labeling each part inline would clutter the image
- Any image where precise point identification matters more than area selection

#### Diagram: Type 3 Callout to Edge Demo

<iframe src="../../sims/type3-callout-overlay/main.html" width="100%" height="550px" scrolling="no"></iframe>

<details markdown="1">
<summary>Type 3 Callout to Edge Demo</summary>
Type: microsim
**sim-id:** type3-callout-overlay<br/>
**Library:** p5.js<br/>
**Status:** Specified

**Bloom Level:** Analyze (L4)
**Bloom Verb:** Differentiate
**Learning Objective:** Differentiate between edge-aligned label placement strategies (left, right, top, bottom) by interacting with a Type 3 callout overlay and observing how numbered indicators, leader lines, and edge labels work together to identify components without obscuring the image.

**Instructional Rationale:** Interactive exploration of a labeled diagram is appropriate because the Analyze objective requires learners to understand the relationship between callout points, leader lines, and edge labels. The show/hide numbers toggle adds a self-assessment dimension.

**Canvas Layout:**
- Main drawing area (aliceblue): background image with callout points, leader lines, and edge labels
- Infobox panel (below, white, silver border): description of the selected callout

**Visual Elements:**
- A sample technical illustration (e.g., a simplified bicycle with 8 labeled components)
- 8 callout points on the image, each with:
  - A numbered circle (numbered indicator) at the callout point
  - A thin leader line from the callout point to the diagram edge
  - An edge-aligned label at the end of the leader line
- Labels distributed across all four edges (2 on left, 2 on right, 2 on top, 2 on bottom) to demonstrate edge positioning
- On hover over a number or label: the leader line thickens, the number and label highlight in orange, and the infobox shows the full description
- On click: the callout stays selected (highlighted) until another is clicked or the background is clicked

**Interactive Controls:**
- Toggle: "Show Numbers" (default on) — shows/hides the numbered indicators on the image
- Toggle: "Show Leader Lines" (default on) — shows/hides the thin lines connecting points to labels
- Toggle: "Quiz Mode" (default off) — hides all labels; clicking a numbered indicator reveals the label one at a time; tracks how many the user identified correctly
- Dropdown: "Label Style" — choose from "Text Only", "Text + Number", "Number Only"

**Behavior:**
- Hovering over a numbered indicator or its edge label highlights both and the connecting line
- In Quiz Mode: clicking a number reveals its label with a slide-in animation; a score counter tracks progress (e.g., "5 of 8 identified")
- Leader lines route cleanly, avoiding crossing each other where possible
- Responsive to window resize; callout points and edge labels reposition proportionally

**Default Parameters:**
- Show Numbers: on
- Show Leader Lines: on
- Quiz Mode: off
- Label Style: Text + Number
- Canvas width: responsive
- Canvas height: 500px + infobox

Implementation: p5.js with callout point, leader line, and edge label rendering
</details>

## Type 4: Floating Labels with Draggable Positioning

The **Type 4 floating label** overlay is the most flexible pattern. Instead of aligning labels to diagram edges, it places **floating labels** at arbitrary positions near their associated callout points. The key innovation of Type 4 is **draggable positioning** — in **edit mode**, the infographic designer can drag labels to the optimal position, and the final coordinates are saved back to the overlay JSON file.

### Floating Labels

A **floating label** is a text label positioned freely on the diagram, connected to its callout point by a thin leader line. Unlike edge-aligned labels (Type 3), floating labels can be placed wherever they are most readable — next to the feature they describe, in an open area of the image, or grouped with related labels.

```json
{
    "id": "alternator",
    "label": "Alternator",
    "description": "Converts mechanical energy to electrical energy to charge the battery.",
    "geometry": {
        "type": "floating",
        "point": [0.40, 0.55],
        "labelPosition": [0.55, 0.48]
    }
}
```

The `point` field specifies the callout location on the image, and the `labelPosition` field specifies where the floating label is displayed. The separation between these two coordinates is what gives Type 4 its flexibility.

### Draggable Positioning and Edit Mode

**Draggable positioning** allows the designer to reposition floating labels by clicking and dragging them in the browser. This is enabled through **edit mode** — a special mode activated by a toggle or keyboard shortcut that makes all labels draggable.

In edit mode:

- Labels display drag handles (small squares at the corners)
- Clicking and dragging a label moves it to a new position
- Leader lines update in real time as labels move
- A "Save Positions" button exports the updated coordinates as JSON that can be pasted into the overlay configuration file
- A coordinate readout shows the current relative position of the dragged label

Edit mode is a powerful workflow tool because it separates the initial layout (which can be automated by AI or calculated programmatically) from the fine-tuning (which benefits from human visual judgment). A designer can start with AI-generated label positions and then drag a few labels to avoid overlaps or improve readability.

| Feature | Type 3 (Callout to Edge) | Type 4 (Floating Label) |
|---------|------------------------|------------------------|
| Label position | Fixed to diagram edge | Freely positioned anywhere |
| Leader line | Callout point → edge | Callout point → floating label |
| Repositioning | Change edge and position in JSON | Drag interactively in edit mode |
| Setup effort | Medium (assign edge positions) | Low initial, then drag to refine |
| Best for | Clean, formal technical diagrams | Dense diagrams needing flexible placement |

!!! mascot-encourage "You've Got This!"
    <img src="../../img/mascot/encouraging.png" class="mascot-admonition-img" alt="Percy encourages you">
    Edit mode might sound complex, but it is actually the most intuitive part of the overlay workflow. Instead of calculating coordinates in a JSON file, you simply drag labels where they look best. It is a visual design tool built right into the infographic itself.

#### Diagram: Type 4 Floating Label with Edit Mode Demo

<iframe src="../../sims/type4-floating-overlay/main.html" width="100%" height="600px" scrolling="no"></iframe>

<details markdown="1">
<summary>Type 4 Floating Label with Edit Mode Demo</summary>
Type: microsim
**sim-id:** type4-floating-overlay<br/>
**Library:** p5.js<br/>
**Status:** Specified

**Bloom Level:** Create (L6)
**Bloom Verb:** Design
**Learning Objective:** Design a Type 4 floating label overlay by activating edit mode, dragging labels to optimal positions on a sample diagram, and exporting the resulting coordinate configuration as JSON.

**Instructional Rationale:** A hands-on builder with drag-and-drop is appropriate for the Create-level objective because learners must produce an original label layout by applying visual design judgment. The edit mode experience directly mirrors the real workflow for creating Type 4 overlays.

**Canvas Layout:**
- Main drawing area (aliceblue): background image with callout points and floating labels
- Control bar (top, white, silver border): edit mode toggle, save button, coordinate display
- Infobox panel (below, white, silver border): description of selected callout (view mode) or coordinate readout (edit mode)

**Visual Elements:**
- A sample diagram (e.g., a simplified solar system or a building floor plan) with 6 labeled features
- 6 callout points (small colored dots) on the image
- 6 floating labels connected to their callout points by thin leader lines
- In view mode: hovering a label or callout point highlights both and shows the infobox
- In edit mode:
  - Labels display drag handles (small orange squares at corners)
  - The currently dragged label has a dashed border and a coordinate readout nearby
  - Leader lines stretch in real time as labels are dragged
  - A subtle grid overlay appears (toggleable) to assist with alignment
  - Non-dragged labels have a slight opacity reduction to focus attention on the active label

**Interactive Controls:**
- Toggle: "Edit Mode" (default off) — switches between view mode (normal hover/click interaction) and edit mode (drag to reposition)
- Button: "Save Positions" (only in edit mode) — copies the current label coordinates to the clipboard as formatted JSON
- Button: "Reset Positions" (only in edit mode) — returns all labels to their original positions
- Toggle: "Show Grid" (only in edit mode, default off) — displays an alignment grid
- Coordinate display (top bar): shows "Label: Alternator | Position: (0.55, 0.48)" for the currently dragged label
- In view mode: standard hover-to-highlight and click-for-infobox behavior

**Behavior:**
- Switching to edit mode adds drag handles to all labels and disables the infobox
- Dragging a label updates its position in real time; the leader line stretches smoothly
- "Save Positions" generates a formatted JSON snippet showing all label positions:
  ```
  {"id": "alternator", "labelPosition": [0.55, 0.48]},
  {"id": "battery", "labelPosition": [0.30, 0.72]},
  ...
  ```
- Switching back to view mode hides drag handles and re-enables hover/click interaction with the updated positions
- Responsive to window resize; all positions are stored as relative coordinates and recomputed on resize

**Default Parameters:**
- Edit Mode: off (starts in view mode)
- Labels at initial programmatically-assigned positions (slightly offset from callout points)
- Canvas width: responsive
- Canvas height: 550px + infobox

Implementation: p5.js with drag-and-drop label management and JSON export
</details>

## Choosing the Right Overlay Type

Selecting the appropriate overlay type for a given image is an important design decision. The four types form a progression from simple to flexible:

| Decision Factor | Type 1 | Type 2 | Type 3 | Type 4 |
|----------------|--------|--------|--------|--------|
| **Image structure** | Grid or block layout | Irregular, organic shapes | Precise point features | Dense, complex diagrams |
| **Number of regions** | 4-12 | 3-8 | 5-20+ | 5-15 |
| **Region shape** | Rectangles only | Any polygon | Points (no area) | Points with labels |
| **Label placement** | In infobox | In infobox | Along diagram edges | Freely positioned |
| **Interactive feedback** | Rectangle highlight | Polygon fill | Leader line + number | Leader line + floating text |
| **Setup complexity** | Low | Medium | Medium | Medium (with easy refinement) |
| **Calibration method** | Set x, y, w, h values | Define polygon vertices | Set callout + edge positions | Drag labels in edit mode |

A practical selection guide:

1. **Can the image be cleanly divided into rectangles?** → **Type 1**
2. **Do regions have irregular boundaries that rectangles cannot approximate?** → **Type 2**
3. **Are you labeling specific points rather than areas?** → **Type 3** or **Type 4**
4. **Do labels need to be placed in specific positions for readability?** → **Type 4**
5. **Do you want a formal, technical look with edge-aligned labels?** → **Type 3**

#### Diagram: Overlay Type Comparison Side-by-Side

<iframe src="../../sims/overlay-type-comparison/main.html" width="100%" height="550px" scrolling="no"></iframe>

<details markdown="1">
<summary>Overlay Type Comparison Side-by-Side</summary>
Type: infographic
**sim-id:** overlay-type-comparison<br/>
**Library:** p5.js<br/>
**Status:** Specified

**Bloom Level:** Evaluate (L5)
**Bloom Verb:** Assess
**Learning Objective:** Assess which overlay type is most appropriate for a given image by viewing the same diagram rendered with all four overlay types side-by-side and evaluating the trade-offs in clarity, precision, and readability.

**Instructional Rationale:** Side-by-side comparison with the same base image is appropriate for the Evaluate objective because learners must judge which overlay approach best serves a given visual context. Seeing all four types applied to identical content highlights the practical differences.

**Canvas Layout:**
- 2×2 grid of panels (aliceblue backgrounds): each panel shows the same diagram with a different overlay type
- Bottom info panel (white, silver border): description of the currently selected type

**Visual Elements:**
- A single diagram (e.g., a simplified engine or microscope) duplicated in 4 panels:
  - Top-left: Type 1 (rectangular regions with orange highlights)
  - Top-right: Type 2 (polygon regions with colored fills)
  - Bottom-left: Type 3 (numbered callout points with edge labels)
  - Bottom-right: Type 4 (floating labels with leader lines)
- Each panel labeled with its type number and name
- A blue highlight border around the currently selected panel
- The info panel shows: type name, strengths, weaknesses, and "Best for:" description

**Interactive Controls:**
- Click a panel to select it and read details in the info panel
- Each panel is individually interactive:
  - Type 1 panel: hover to see rectangular highlights
  - Type 2 panel: hover to see polygon fills
  - Type 3 panel: hover to see callout highlights
  - Type 4 panel: hover to see floating label highlights
- Toggle: "Highlight Active Only" — dims the 3 non-selected panels to 40% opacity for focused comparison
- Dropdown: "Scenario" — switches the base diagram to a different example (Cell Biology, Engine, Software Architecture), showing how overlay type suitability changes with the image

**Behavior:**
- All four panels respond to hover independently
- Selecting a different scenario loads a new base image and different overlay configurations in all four panels
- The info panel updates with type-specific commentary for the current scenario (e.g., "For this cell diagram, Type 2 provides the best precision because organelle shapes are irregular")
- Responsive: panels stack 2×1 or 1×1 on narrow viewports

**Default Parameters:**
- Scenario: Engine diagram
- Highlight Active Only: off
- Canvas width: responsive
- Canvas height: 500px + info panel

Implementation: p5.js with four independent overlay renderers sharing a common image
</details>

## The Overlay Creation Workflow

Creating an overlayment infographic follows a consistent workflow regardless of overlay type:

1. **Select or create the background image** — Choose a diagram, photo, or illustration. Ensure it is high quality and clearly shows the features you want to make interactive.

2. **Choose the overlay type** — Based on the image structure and your educational goals, select Type 1, 2, 3, or 4.

3. **Define regions in the overlay JSON** — Write the initial JSON configuration with region IDs, labels, descriptions, and geometry. For Type 4, use approximate positions initially.

4. **Test with the overlay driver** — Load the infographic in a browser and verify that regions are correctly positioned, hover interactions work, and infobox content is accurate.

5. **Calibrate positions** — For Types 1-3, adjust coordinates in the JSON file. For Type 4, use edit mode to drag labels to optimal positions, then save the updated coordinates.

6. **Package as a MicroSim** — Place the files in the standard MicroSim directory structure (`main.html`, `overlay.json`, `diagram.png`) with metadata.

!!! mascot-warning "Common Mistake"
    <img src="../../img/mascot/warning.png" class="mascot-admonition-img" alt="Percy warns you">
    The most common overlay mistake is using pixel coordinates instead of relative coordinates. Pixel coordinates break when the infographic is displayed at a different size. Always specify positions as values between 0.0 and 1.0 (fractions of the image width and height), and let the overlay driver convert to pixels at render time.

## Summary

!!! mascot-celebration "Excellent Work!"
    <img src="../../img/mascot/celebration.png" class="mascot-admonition-img" alt="Percy celebrates">
    You now have four powerful overlay patterns in your infographic toolkit! From simple rectangular regions to freely positioned floating labels with drag-to-calibrate edit mode, you can transform any static image into an interactive learning experience. The overlayment architecture — separating images, data, and driver code — makes these infographics maintainable, reusable, and ready for AI-assisted creation. Display it with style!

In this chapter, you learned that:

- The **overlayment pattern** layers transparent interactive regions over a static background image, with three components: the image, the **overlay JSON file** (region definitions), and the **overlay diagram driver** (shared rendering and interaction logic)
- **Type 1 rectangular** overlays use **non-overlapping rectangular regions** with simple bounding box hit detection and **region extent highlights** — ideal for grid-structured diagrams
- **Type 2 complex polygon** overlays define **polygon regions** using arrays of **polygon edge points**, enabling **multi-edge overlays** that precisely match irregular shapes using ray casting hit detection
- **Type 3 callout to edge** overlays place **callout points** on specific image features, connected by leader lines to **edge-aligned labels** along the diagram borders, with **numbered indicators** that support a **show numbers toggle** for self-assessment
- **Type 4 floating label** overlays position **floating labels** freely near their callout points, with **draggable positioning** enabled through **edit mode** for intuitive visual calibration
- The overlay JSON file uses relative coordinates (0.0 to 1.0) for width-responsive behavior
- The shared overlay diagram driver provides consistent interaction, rendering, and iframe height reporting across all overlay infographics
- Overlay type selection depends on image structure, region shape requirements, label placement needs, and desired interaction style

## References

- [Wikipedia: Image Map](https://en.wikipedia.org/wiki/Image_map)
- [Wikipedia: Point in Polygon](https://en.wikipedia.org/wiki/Point_in_polygon)
- [MDN Web Docs: Canvas API — Drawing Shapes](https://developer.mozilla.org/en-US/docs/Web/API/Canvas_API/Tutorial/Drawing_shapes)
- [MDN Web Docs: Pointer Events](https://developer.mozilla.org/en-US/docs/Web/API/Pointer_events)
- [p5.js Reference — loadImage](https://p5js.org/reference/p5/loadImage/)
- [JSON Schema — Specification](https://json-schema.org/)
- [Nielsen Norman Group: Interactive Data Visualization](https://www.nngroup.com/articles/data-visualization-interaction/)
- [Wikipedia: Overlay (programming)](https://en.wikipedia.org/wiki/Overlay_(programming))
- [MDN Web Docs: Drag and Drop API](https://developer.mozilla.org/en-US/docs/Web/API/HTML_Drag_and_Drop_API)
- [Gestalt Principles of Visual Perception](https://en.wikipedia.org/wiki/Gestalt_psychology#Pr%C3%A4gnanz)
