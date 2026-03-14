---
title: Web Fundamentals: Structure, Style, and Data
description: Master the core web technologies for building interactive infographics including HTML structure, CSS styling, data formats, coordinate geometry, responsive design, and iframe security.
generated_by: claude skill chapter-content-generator
date: 2026-03-14 10:20:37
version: 0.05
---

# Web Fundamentals: Structure, Style, and Data

## Summary

This chapter covers the core web technologies you need to build interactive infographics. You will learn HTML document structure, CSS styling for layout and appearance, and JSON/CSV data formats for driving dynamic content. The chapter also covers Canvas and SVG graphics elements, DOM manipulation, coordinate systems and geometry concepts (bounding boxes, hit detection, polygon testing), and iframe security policies. These building blocks are essential for everything that follows in the technical chapters.

## Concepts Covered

This chapter covers the following 32 concepts from the learning graph:

1. HTML Structure
2. CSS Styling
3. JSON Format
4. JSON Schema
5. CSV Format
6. Canvas Element
7. SVG Element
8. DOM Manipulation
9. Coordinate System
10. Pixel Coordinates
11. Relative Coordinates
12. Bounding Box
13. Hit Detection
14. Point-in-Polygon Test
15. Convex Polygon
16. Concave Polygon
17. Bezier Curve
18. Aspect Ratio
19. Viewport
20. Breakpoint
21. Media Query
22. Touch Event
23. Mouse Event
24. Pointer Device
25. CDN Script Loading
26. Module Import
27. Cross-Origin Resource
28. Content Security Policy
29. Embed Code
30. Sandbox Attribute
31. Same-Origin Policy
32. Cross-Origin Messaging

## Prerequisites

This chapter builds on concepts from:

- [Chapter 1: Foundations of Interactive Infographics](../01-foundations-of-interactive-infographics/index.md)

---

!!! mascot-welcome "Let's Make It Visual!"
    <img src="../../img/mascot/welcome.png" class="mascot-admonition-img" alt="Percy welcomes you">
    Welcome to the toolkit chapter! Every great infographic is built on a foundation of web technologies — HTML for structure, CSS for style, JavaScript for interaction, and data formats that drive dynamic content. By the end of this chapter, you will have a confident grasp of every building block you need to create professional interactive infographics. Let's spread some knowledge!

## Learning Objectives

By the end of this chapter, you will be able to:

- **Explain** how HTML, CSS, and DOM manipulation work together to create interactive web content (Bloom: Understand)
- **Distinguish** between Canvas and SVG graphics elements and select the appropriate one for a given infographic type (Bloom: Analyze)
- **Apply** coordinate systems, bounding boxes, and hit detection algorithms to make infographic regions interactive (Bloom: Apply)
- **Construct** responsive layouts using viewports, breakpoints, and media queries (Bloom: Apply)
- **Evaluate** iframe security policies to safely embed infographic content across origins (Bloom: Evaluate)

## Introduction

Building interactive infographics requires fluency in a set of core web technologies that work together like instruments in an orchestra. HTML provides the structural skeleton — the elements that hold your content. CSS controls the visual presentation — colors, layout, spacing, and responsive behavior. JavaScript brings everything to life through DOM manipulation, event handling, and dynamic data loading. And data formats like JSON and CSV provide the fuel that drives data-driven infographics.

This chapter is designed as a practical reference that you will return to throughout the course. Rather than exhaustive coverage of web development, it focuses specifically on the concepts most relevant to infographic creation: how to draw graphics on screen, how to detect user interactions with specific regions of a diagram, how to make layouts adapt to different screen sizes, and how to safely embed infographic content in textbook pages. Each section builds on the previous one, so by the end you will see how all these pieces fit together into a coherent development workflow.

If you have built web pages before, some of this material will feel familiar — and you can move through it quickly. If web technologies are new to you, take heart: the subset of HTML, CSS, and JavaScript needed for infographic creation is manageable, and the interactive examples throughout this chapter will help you build confidence rapidly.

## HTML Structure: The Skeleton of Every Infographic

**HTML (HyperText Markup Language)** provides the structural foundation for all web content, including interactive infographics. An HTML document is a tree of nested elements, each defined by opening and closing tags. For infographic development, you need to understand a focused set of elements that serve as containers for graphics, controls, and text.

The essential HTML elements for infographic work include:

- `<div>` — A generic container for grouping content and applying styles
- `<canvas>` — A drawing surface for pixel-based graphics (used by p5.js)
- `<svg>` — A container for vector-based graphics (used by D3.js)
- `<iframe>` — An embedded frame for loading external content (how infographics appear in textbooks)
- `<script>` — A container for JavaScript code or a reference to an external script file
- `<link>` — A reference to an external CSS stylesheet
- `<input>`, `<select>`, `<button>` — Form controls for user interaction (sliders, dropdowns, buttons)

A minimal infographic HTML file follows this structure:

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>My Infographic</title>
    <link rel="stylesheet" href="style.css">
</head>
<body style="background: aliceblue;">
    <div id="canvas-container"></div>
    <div id="controls"></div>
    <script src="https://cdn.jsdelivr.net/npm/p5@1.9.0/lib/p5.min.js"></script>
    <script src="sketch.js"></script>
</body>
</html>
```

Notice the `<meta name="viewport">` tag — this is critical for responsive infographics and will be discussed in detail later in this chapter. The `background: aliceblue` on the body element is a MicroSim standard that provides visual consistency across all infographics in an intelligent textbook.

## CSS Styling: Controlling Appearance and Layout

**CSS (Cascading Style Sheets)** controls how HTML elements are displayed on screen. For infographic development, CSS handles layout positioning, color schemes, typography, spacing, and — crucially — responsive behavior that adapts the infographic to different screen sizes.

CSS rules consist of selectors (which elements to style) and declarations (what styles to apply):

```css
#canvas-container {
    width: 100%;
    max-width: 900px;
    margin: 0 auto;
    border: 1px solid silver;
}
```

The most important CSS concepts for infographic work are:

| CSS Concept | What It Controls | Infographic Use |
|-------------|-----------------|-----------------|
| `width`, `height` | Element dimensions | Canvas and container sizing |
| `margin`, `padding` | Spacing | Layout between drawing area and controls |
| `display: flex` | Flexible layout | Side-by-side panels (drawing + controls) |
| `position` | Element placement | Overlay positioning for tooltips and infoboxes |
| `border` | Visual boundaries | Silver borders around drawing and control regions |
| `background` | Background color | Aliceblue for drawing area, white for controls |
| `@media` queries | Responsive rules | Adapting layout at different screen widths |

CSS is "cascading" because styles can be inherited, overridden, and combined from multiple sources. In MicroSim development, styles flow from the MkDocs Material theme, through the site's `extra.css`, and finally to styles specific to each infographic.

## DOM Manipulation: Making Pages Dynamic

The **Document Object Model (DOM)** is the browser's in-memory representation of an HTML document as a tree of objects. **DOM manipulation** is the process of using JavaScript to read, modify, add, or remove elements from this tree — which is how infographics respond to user actions and display dynamic content.

Key DOM manipulation operations include:

- **Selecting elements:** `document.getElementById('info-panel')` or `document.querySelector('.tooltip')`
- **Changing content:** `element.textContent = 'New label'` or `element.innerHTML = '<strong>Bold text</strong>'`
- **Modifying styles:** `element.style.backgroundColor = 'yellow'`
- **Creating elements:** `document.createElement('div')` followed by `parent.appendChild(newElement)`
- **Removing elements:** `element.remove()` or `parent.removeChild(element)`

For infographic development, DOM manipulation is most commonly used to update infoboxes, toggle visibility of labels, and dynamically create control elements like sliders and buttons. Libraries like p5.js and D3.js abstract much of the low-level DOM manipulation, but understanding the underlying mechanism helps you debug issues and extend library behavior when needed.

!!! mascot-thinking "Key Insight"
    <img src="../../img/mascot/thinking.png" class="mascot-admonition-img" alt="Percy is thinking">
    When building infographics, you rarely manipulate the DOM directly for graphics rendering — that is what Canvas and SVG are for. DOM manipulation shines for updating text labels, infoboxes, and control panels that surround your graphic. Think of DOM as the "frame" and Canvas/SVG as the "painting."

## Graphics Elements: Canvas and SVG

Web browsers provide two fundamentally different approaches to rendering graphics, and choosing the right one has a significant impact on your infographic's capabilities and performance.

### The Canvas Element

The **Canvas element** (`<canvas>`) provides a pixel-based drawing surface. You draw on it using JavaScript commands that place pixels directly — lines, rectangles, circles, images, and text. Once drawn, the pixels have no individual identity; the canvas is essentially a bitmap image that your code paints programmatically.

Canvas is the foundation for **p5.js**, the primary library used in this course for interactive infographics. Key characteristics of Canvas:

- **Fast rendering** of many visual elements (hundreds or thousands of shapes)
- **Pixel-level control** over every aspect of the drawing
- **Animation-friendly** through a draw loop that repaints the canvas every frame
- **No built-in interactivity** — you must calculate which region the user clicked by checking coordinates yourself (hit detection)

### The SVG Element

The **SVG element** (`<svg>`) provides a vector-based drawing surface. Each shape you draw is a distinct DOM element — a `<circle>`, `<rect>`, `<path>`, or `<text>` — that the browser tracks individually. This means SVG elements can have their own event listeners, CSS styles, and animations.

SVG is the foundation for **D3.js** and is ideal for infographics where individual elements need to respond independently to user interaction. Key characteristics of SVG:

- **Resolution-independent** — scales perfectly to any size without pixelation
- **Built-in interactivity** — each shape is a DOM element that can receive click and hover events directly
- **Styleable with CSS** — SVG elements respond to CSS rules just like HTML elements
- **Performance limits** — slows down with very large numbers of elements (thousands) because each is a DOM node

| Feature | Canvas | SVG |
|---------|--------|-----|
| Rendering model | Pixel (raster) | Vector (DOM nodes) |
| Performance with many elements | Excellent | Degrades |
| Resolution independence | No (can appear blurry) | Yes (always crisp) |
| Built-in event handling per shape | No (manual hit detection) | Yes (DOM events) |
| Primary library in this course | p5.js | D3.js |
| Best for | Animations, simulations, games | Data visualizations, interactive diagrams |

#### Diagram: Canvas vs SVG Rendering Comparison

<iframe src="../../sims/canvas-vs-svg/main.html" width="100%" height="500px" scrolling="no"></iframe>

<details markdown="1">
<summary>Canvas vs SVG Rendering Comparison</summary>
Type: microsim
**sim-id:** canvas-vs-svg<br/>
**Library:** p5.js<br/>
**Status:** Specified

**Bloom Level:** Understand (L2)
**Bloom Verb:** Compare
**Learning Objective:** Compare the Canvas and SVG rendering models by observing how each handles drawing, scaling, and interaction with the same set of shapes.

**Instructional Rationale:** Side-by-side comparison with step-through is appropriate because the Understand objective requires learners to see the concrete differences between two rendering approaches. Showing identical shapes rendered both ways makes the abstract distinction tangible.

**Canvas Layout:**
- Left panel (50% width): Canvas-rendered shapes on aliceblue background
- Right panel (50% width): SVG-rendered shapes on aliceblue background
- Bottom control area (white, silver border): step-through controls and info text

**Visual Elements:**
- Both panels display the same set of 5 shapes: a circle, a rectangle, a triangle, a line, and a text label
- Each shape is drawn in a distinct color (blue, orange, green, red, purple)

**Data Visibility Requirements:**
- Stage 1 ("Drawing"): Both panels render shapes; info text explains that Canvas uses pixel commands while SVG creates DOM nodes
- Stage 2 ("Scaling"): Both panels zoom in 2x; Canvas shows pixelation while SVG remains crisp; info text explains resolution independence
- Stage 3 ("Interaction"): User can hover over shapes; SVG shapes highlight individually with a tooltip showing the element tag name; Canvas side shows no per-shape response; info text explains DOM-based vs manual hit detection
- Stage 4 ("Performance"): Both panels render 500 small circles; frame rate counters displayed; info text explains Canvas performance advantage with many elements

**Interactive Controls:**
- "Next Stage" / "Previous Stage" buttons
- Stage indicator ("Stage 2 of 4")
- Info panel explaining current demonstration

**Behavior:**
- Responsive to window resize; both panels scale proportionally
- Stage transitions are smooth

**Default Parameters:**
- Start at Stage 1
- Canvas width: responsive (50% each panel)
- Canvas height: 400px per panel

Implementation: Left panel uses p5.js Canvas mode; right panel uses inline SVG with JavaScript
</details>

## Data Formats: JSON and CSV

Interactive infographics are often **data-driven** — the content they display comes from structured data files rather than being hardcoded. Two data formats dominate web-based infographic development: JSON and CSV.

### JSON Format

**JSON (JavaScript Object Notation)** is a lightweight, human-readable data format that maps naturally to JavaScript objects and arrays. JSON is the primary data format for infographic configuration because it supports nested structures, which are essential for describing complex visual layouts.

```json
{
    "title": "Cell Biology Diagram",
    "regions": [
        {
            "id": "nucleus",
            "label": "Nucleus",
            "x": 200,
            "y": 150,
            "width": 100,
            "height": 80,
            "description": "Contains DNA and controls cell activities"
        },
        {
            "id": "mitochondria",
            "label": "Mitochondria",
            "x": 350,
            "y": 200,
            "width": 90,
            "height": 50,
            "description": "Powerhouse of the cell; produces ATP"
        }
    ]
}
```

JSON supports six data types: strings, numbers, booleans, null, arrays (ordered lists), and objects (key-value pairs). Every overlay configuration file in this course uses JSON to define interactive regions, labels, and descriptions.

### JSON Schema

A **JSON Schema** is a separate JSON document that defines the expected structure, data types, and constraints for another JSON file. Think of it as a "contract" that specifies what valid data looks like. For infographic development, JSON Schema is valuable because it:

- Documents the expected format for overlay configuration files
- Enables automated validation — a script can check whether your data file conforms to the schema before the infographic loads
- Provides auto-completion support in code editors

### CSV Format

**CSV (Comma-Separated Values)** is a plain-text tabular format where each row is a line and columns are separated by commas. CSV is ideal for data that naturally fits a table structure — statistical datasets, survey results, or any list of records with uniform fields.

```csv
Region,Population,GDP,Literacy
North America,369000000,24800,99
Europe,447000000,17100,99
Asia,4600000000,31600,86
Africa,1400000000,2900,67
```

CSV files are easy to create in any spreadsheet application and are the standard input format for Chart.js and D3.js visualizations. While JSON handles nested, hierarchical data well, CSV excels at flat, tabular data with many rows.

| Format | Structure | Best For | Editing Tool |
|--------|-----------|----------|-------------|
| JSON | Nested objects and arrays | Configuration, overlay definitions, hierarchical data | Text editor |
| CSV | Flat rows and columns | Tabular datasets, chart data, bulk records | Spreadsheet or text editor |

## Coordinate Systems and Geometry

Understanding coordinate systems is fundamental to placing and detecting interactions with visual elements in your infographics. Every pixel on screen has a position, and your code needs to translate between user actions (clicks, hovers) and the visual elements they target.

### Coordinate Systems

A **coordinate system** defines how positions are specified on a drawing surface. Web graphics use a coordinate system where the origin (0, 0) is at the **top-left corner**, with the x-axis increasing to the right and the y-axis increasing downward. This is the opposite of the mathematical convention where y increases upward.

### Pixel Coordinates

**Pixel coordinates** specify positions as absolute pixel counts from the origin. A point at (300, 200) is 300 pixels from the left edge and 200 pixels from the top edge. Pixel coordinates are straightforward but create a problem: an element at pixel position (500, 300) will be in a different relative location on a 600px-wide canvas versus a 1200px-wide canvas.

### Relative Coordinates

**Relative coordinates** solve this problem by expressing positions as fractions or percentages of the canvas dimensions. A point at relative position (0.5, 0.4) is always at the horizontal center and 40% of the way down, regardless of canvas size. Converting between pixel and relative coordinates is straightforward:

\[ x_{pixel} = x_{relative} \times canvasWidth \]
\[ y_{pixel} = y_{relative} \times canvasHeight \]

Using relative coordinates is essential for **width-responsive infographics** that must adapt to different container widths (600px to 1400px) in intelligent textbook layouts.

#### Diagram: Coordinate System Explorer

<iframe src="../../sims/coordinate-explorer/main.html" width="100%" height="500px" scrolling="no"></iframe>

<details markdown="1">
<summary>Coordinate System Explorer</summary>
Type: microsim
**sim-id:** coordinate-explorer<br/>
**Library:** p5.js<br/>
**Status:** Specified

**Bloom Level:** Apply (L3)
**Bloom Verb:** Use
**Learning Objective:** Use pixel and relative coordinate systems to place elements on a canvas, and convert between the two systems by observing how mouse position maps to both coordinate types simultaneously.

**Instructional Rationale:** Interactive parameter exploration is appropriate because the Apply objective requires learners to actively work with coordinate systems, not just read about them. Real-time coordinate display as the mouse moves provides immediate, concrete feedback that builds fluency.

**Canvas Layout:**
- Drawing area (aliceblue, 100% width): a canvas with a visible grid overlay
- Bottom panel (white, silver border): coordinate readout and controls

**Visual Elements:**
- Canvas with a light gray grid (50px spacing in pixel mode, 10% spacing in relative mode)
- Axis labels along left edge (Y) and top edge (X)
- Origin marker (0,0) at top-left with a small red dot
- Crosshair cursor that follows the mouse
- A coordinate readout near the cursor showing both pixel and relative values
- Three pre-placed colored shapes (circle, square, triangle) with their coordinates displayed

**Interactive Controls:**
- Toggle: "Show Pixel Grid" / "Show Relative Grid" — switches grid labels between pixel values (0, 50, 100...) and relative values (0.0, 0.1, 0.2...)
- Toggle: "Snap to Grid" — snaps cursor to nearest grid intersection
- Readout display showing: "Pixel: (283, 147) | Relative: (0.47, 0.29)"
- Button: "Place Marker" — drops a numbered marker at the current cursor position
- Button: "Clear Markers"

**Behavior:**
- As the mouse moves, the crosshair and coordinate readout update in real time
- Both pixel and relative coordinates are always displayed simultaneously
- Resizing the window changes pixel coordinates of placed markers but preserves their relative coordinates (markers reposition to maintain proportional placement)
- The grid redraws on resize to demonstrate how pixel grids change but relative grids remain stable

**Default Parameters:**
- Start in pixel grid mode
- Snap to Grid off
- Canvas width: responsive
- Canvas height: 400px

Implementation: p5.js with real-time coordinate tracking and resize event handling
</details>

### Bounding Boxes and Hit Detection

A **bounding box** is the smallest axis-aligned rectangle that completely encloses a visual element. For a circle centered at (200, 150) with radius 40, the bounding box extends from (160, 110) to (240, 190). Bounding boxes are the simplest and most computationally efficient tool for **hit detection** — determining whether a user's click or hover falls within a particular region.

**Hit detection** is the process of determining which visual element (if any) the user is interacting with. For rectangular regions, hit detection is a simple bounds check:

```javascript
function isInsideRect(mouseX, mouseY, x, y, width, height) {
    return mouseX >= x && mouseX <= x + width &&
           mouseY >= y && mouseY <= y + height;
}
```

This function returns `true` if the mouse position falls within the rectangle defined by its top-left corner (x, y) and dimensions (width, height). For interactive infographics with non-overlapping rectangular regions (Type 1 overlay pattern), this is all the hit detection you need.

### Point-in-Polygon Test

For irregular shapes — the polygon overlay regions used in Type 2 infographic patterns — simple bounding box checks are insufficient. A **point-in-polygon test** determines whether a point lies inside an arbitrary polygon by casting a ray from the point and counting how many times it crosses the polygon's edges. If the crossing count is odd, the point is inside; if even, it is outside. This is known as the **ray casting algorithm**.

The algorithm works correctly for both **convex polygons** (where all interior angles are less than 180 degrees — like a regular hexagon) and **concave polygons** (where at least one interior angle exceeds 180 degrees — like an L-shape or a star).

| Shape Type | Hit Detection Method | Performance | Accuracy |
|------------|---------------------|-------------|----------|
| Rectangle | Bounds check (x, y, width, height) | Very fast | Exact |
| Circle | Distance from center < radius | Very fast | Exact |
| Convex polygon | Ray casting or separating axis | Fast | Exact |
| Concave polygon | Ray casting | Fast | Exact |
| Complex path | Ray casting with curve sampling | Moderate | Approximate |

### Bezier Curves

A **Bezier curve** is a mathematically defined smooth curve specified by control points. In infographic development, Bezier curves create smooth, organic shapes for region boundaries, decorative elements, and arrow paths in causal loop diagrams. Quadratic Bezier curves use three control points (start, control, end), while cubic Bezier curves use four (start, two controls, end).

Both Canvas and SVG support Bezier curves natively. In p5.js, you draw a Bezier curve with `bezier(x1, y1, cx1, cy1, cx2, cy2, x2, y2)`, and in SVG, the `<path>` element uses the `C` command for cubic curves.

#### Diagram: Hit Detection Playground

<iframe src="../../sims/hit-detection-playground/main.html" width="100%" height="550px" scrolling="no"></iframe>

<details markdown="1">
<summary>Hit Detection Playground</summary>
Type: microsim
**sim-id:** hit-detection-playground<br/>
**Library:** p5.js<br/>
**Status:** Specified

**Bloom Level:** Apply (L3)
**Bloom Verb:** Implement
**Learning Objective:** Implement hit detection for rectangles, circles, and polygons by testing mouse positions against different region types and observing which algorithm correctly identifies the target region.

**Instructional Rationale:** Hands-on experimentation is appropriate because the Apply objective requires learners to see hit detection in action across different shape types. Moving the mouse over various shapes and seeing real-time algorithm output builds practical understanding of when to use each approach.

**Canvas Layout:**
- Drawing area (aliceblue): displays shapes with hit detection zones
- Right panel (white, silver border, 200px): algorithm output and info

**Visual Elements:**
- 6 shapes arranged on the canvas, each with a label:
  1. A rectangle (blue outline)
  2. A circle (green outline)
  3. A convex hexagon (orange outline)
  4. A concave L-shaped polygon (purple outline)
  5. A triangle (red outline)
  6. A shape bounded by Bezier curves (teal outline)
- When the mouse is inside a shape, the shape fills with a semi-transparent version of its outline color
- Right panel shows:
  - Current mouse coordinates
  - "Inside: [shape name]" or "Inside: none"
  - Algorithm used: "Bounds check" / "Distance test" / "Ray casting"
  - Number of edge crossings (for polygon shapes)

**Interactive Controls:**
- Toggle: "Show Bounding Boxes" — draws the bounding box around each shape in dashed gray
- Toggle: "Show Ray" — visualizes the horizontal ray cast from the mouse position (for polygon hit detection), with crossing points marked as red dots
- Dropdown: "Test Mode" with options:
  - "Bounding Box Only" — uses only bounding box for all shapes (demonstrates false positives on non-rectangular shapes)
  - "Precise Detection" — uses the correct algorithm for each shape type
- The visual difference between bounding-box-only and precise detection demonstrates why different algorithms are needed

**Behavior:**
- Hit detection runs every frame as the mouse moves
- In "Bounding Box Only" mode, irregular shapes highlight even when the mouse is in the bounding box but outside the actual shape (the false positive is visually apparent)
- In "Precise Detection" mode, shapes only highlight when the mouse is truly inside
- Responsive to window resize; shapes reposition proportionally

**Default Parameters:**
- Test Mode: Precise Detection
- Show Bounding Boxes: off
- Show Ray: off
- Canvas width: responsive
- Canvas height: 450px

Implementation: p5.js with bounding box, distance, and ray-casting algorithms
</details>

## Responsive Design: Viewports, Breakpoints, and Media Queries

Interactive infographics in intelligent textbooks must display correctly on screens ranging from narrow mobile devices (around 360px wide) to wide desktop monitors (1400px or more). Responsive design is the set of techniques that makes this adaptation possible.

### Aspect Ratio

The **aspect ratio** of an infographic is the relationship between its width and height, expressed as a ratio (e.g., 16:9) or a decimal (e.g., 1.78). Maintaining a consistent aspect ratio ensures that your infographic does not appear stretched or compressed at different sizes. For MicroSim infographics, a common approach is to fix the aspect ratio and let the width fill the available container, calculating the height proportionally.

### Viewport

The **viewport** is the visible area of a web page in the browser window. On desktop browsers, the viewport is simply the browser window size. On mobile devices, the viewport can differ from the physical screen size unless the `<meta name="viewport">` tag is present. This tag is essential for responsive infographics:

```html
<meta name="viewport" content="width=device-width, initial-scale=1.0">
```

Without this tag, mobile browsers may render the page at a desktop-like width and then zoom out, making infographic controls too small to use.

### Breakpoints and Media Queries

A **breakpoint** is a specific viewport width at which the layout changes. A **media query** is a CSS rule that applies styles only when the viewport meets certain conditions — typically a minimum or maximum width.

```css
/* Default: single-column layout */
#infographic-container {
    display: flex;
    flex-direction: column;
}

/* At 768px and above: side-by-side layout */
@media (min-width: 768px) {
    #infographic-container {
        flex-direction: row;
    }
}
```

Common breakpoints for infographic development:

| Breakpoint | Target Devices | Layout Approach |
|------------|---------------|-----------------|
| < 600px | Mobile phones | Single column, stacked controls |
| 600px – 899px | Tablets, narrow browsers | Compact side-by-side or stacked |
| 900px – 1200px | Laptops, standard desktops | Full side-by-side layout |
| > 1200px | Wide desktops | Full layout with optional margins |

For MicroSim infographics embedded in MkDocs Material textbooks, the content area typically ranges from 600px to about 900px wide. Designing for this range first, then gracefully handling narrower and wider extremes, is an effective strategy.

## Input Events: Pointer Devices, Mouse, and Touch

Making infographics interactive requires responding to user input. The browser provides events for three categories of input that infographic developers need to handle.

### Pointer Devices

A **pointer device** is any input device that can point to a specific position on screen. This includes mice, trackpads, touchscreens, and styluses. Modern browsers provide a unified **Pointer Events API** that normalizes these different input types into a single set of events.

### Mouse Events

**Mouse events** fire when the user interacts with a mouse or trackpad:

- `mousedown` / `mouseup` — Button pressed / released
- `mousemove` — Cursor position changed
- `click` — Button pressed and released on the same element
- `mouseenter` / `mouseleave` — Cursor entered / left an element's bounds (no bubbling)
- `mouseover` / `mouseout` — Similar but with event bubbling through parent elements

For infographic hover effects (tooltip display, region highlighting), `mousemove` combined with hit detection is the standard approach. In p5.js, the global `mouseX` and `mouseY` variables provide the current cursor position on every frame.

### Touch Events

**Touch events** fire on touchscreen devices and differ from mouse events in important ways:

- `touchstart` / `touchend` — Finger makes / breaks contact with screen
- `touchmove` — Finger moves while in contact
- Touch events provide a `touches` array because multiple fingers can touch simultaneously
- There is no equivalent of `mouseover` — touchscreens cannot detect a finger hovering above the surface

For infographic development, the practical implication is that hover-based interactions (tooltips that appear when the cursor passes over a region) must have a touch-friendly alternative — typically converting hover behavior to tap-to-toggle on touch devices. The p5.js library handles much of this normalization, mapping touch events to `mousePressed()` and `mouseReleased()` callbacks.

!!! mascot-tip "Percy's Tip"
    <img src="../../img/mascot/tip.png" class="mascot-admonition-img" alt="Percy shares a tip">
    When designing infographic interactions, always test on a touch device. A common mistake is building a hover-only interaction that works beautifully with a mouse but is completely inaccessible on tablets and phones. Use click/tap as the primary interaction, with hover as an enhancement.

## Loading External Resources: CDN and Modules

Interactive infographics depend on external JavaScript libraries (p5.js, D3.js, Chart.js) and sometimes external stylesheets or data files. There are two primary mechanisms for loading these resources.

### CDN Script Loading

A **CDN (Content Delivery Network)** hosts commonly used libraries on globally distributed servers, so your infographic can load them quickly from a nearby location. **CDN script loading** is the most common approach for MicroSim infographics:

```html
<script src="https://cdn.jsdelivr.net/npm/p5@1.9.0/lib/p5.min.js"></script>
```

CDN loading offers several advantages for infographic development:

- No need to download and bundle libraries locally
- Users likely have the library cached from other sites
- Version pinning (the `@1.9.0` in the URL) ensures consistent behavior
- Automatic fallback to geographically close servers for fast loading

### Module Import

**Module import** is a newer JavaScript mechanism that allows you to load code as ES modules using the `import` statement:

```html
<script type="module">
    import { Chart } from 'https://cdn.jsdelivr.net/npm/chart.js@4.4.0/+esm';
</script>
```

Module imports provide better code organization through explicit dependency declarations and scoped variables. However, for most MicroSim infographics, traditional CDN script loading is simpler and more widely compatible. Module imports become valuable when building larger, multi-file infographic projects.

## Iframe Security: Embedding Infographics Safely

In intelligent textbooks, infographics are embedded using `<iframe>` elements that load the infographic's `main.html` file. This embedding model introduces security considerations that every infographic developer should understand.

### Embed Code

**Embed code** is the HTML snippet used to place an infographic within a textbook page. The standard embed code for MicroSim infographics follows this pattern:

```html
<iframe src="../../sims/my-infographic/main.html"
        width="100%" height="500px" scrolling="no"></iframe>
```

The `scrolling="no"` attribute prevents the iframe from showing its own scrollbar, which avoids scroll-hijacking problems where scrolling the infographic accidentally scrolls the parent page.

### Same-Origin Policy

The **same-origin policy** is a fundamental browser security mechanism that prevents JavaScript in one origin (domain + protocol + port) from accessing resources in another origin. Two URLs have the same origin only if their protocol (http/https), domain, and port all match.

For infographic embedding, the same-origin policy means that JavaScript inside an iframe cannot directly access the parent page's DOM if they come from different origins. This is generally a good thing — it prevents malicious embedded content from modifying the textbook page.

### Cross-Origin Resources and CORS

A **cross-origin resource** is any file loaded from a different origin than the page requesting it. When your infographic loads a library from a CDN or fetches data from an external API, those are cross-origin requests. The browser enforces **CORS (Cross-Origin Resource Sharing)** headers to control which cross-origin requests are permitted.

CDN-hosted libraries include CORS headers that allow any page to load them, so CDN script loading works seamlessly. However, if your infographic tries to fetch data from a custom API, that API must include appropriate CORS headers or the request will be blocked.

### Cross-Origin Messaging

**Cross-origin messaging** is a safe, controlled mechanism for communication between an iframe and its parent page, even when they have different origins. The `postMessage` API allows one-way message passing:

```javascript
// Inside the infographic (iframe)
window.parent.postMessage({
    type: 'microsim-resize',
    height: document.body.scrollHeight
}, '*');
```

```javascript
// In the parent page
window.addEventListener('message', function(event) {
    if (event.data.type === 'microsim-resize') {
        iframe.style.height = event.data.height + 'px';
    }
});
```

This mechanism is how MicroSim infographics report their height to the parent textbook page for automatic iframe resizing. It is also used for xAPI event reporting (covered in a later chapter).

### Sandbox Attribute

The **sandbox attribute** on an `<iframe>` restricts what the embedded content can do. By default, a sandboxed iframe cannot run scripts, submit forms, or navigate the parent page. Permissions are granted by adding tokens:

```html
<iframe src="infographic.html" sandbox="allow-scripts allow-same-origin"></iframe>
```

Common sandbox tokens for infographic embedding:

- `allow-scripts` — Permits JavaScript execution (required for interactive infographics)
- `allow-same-origin` — Treats the iframe content as same-origin (needed for local storage and some API calls)
- `allow-popups` — Permits opening new windows (used for fullscreen links)

### Content Security Policy

A **Content Security Policy (CSP)** is an HTTP header or `<meta>` tag that specifies which sources of content (scripts, styles, images, fonts) a page is allowed to load. CSP is a defense-in-depth measure against cross-site scripting (XSS) attacks.

For infographic developers, CSP primarily matters when deploying to hosting environments that enforce strict policies. A CSP that blocks inline scripts (`script-src 'self'`) would prevent p5.js sketches that include inline JavaScript. Understanding CSP helps you diagnose "why isn't my script loading?" issues that are otherwise baffling.

| Security Mechanism | What It Controls | Infographic Impact |
|-------------------|-----------------|-------------------|
| Same-Origin Policy | DOM access between origins | Prevents iframe-parent DOM access |
| CORS | Cross-origin HTTP requests | Affects external data loading |
| Cross-Origin Messaging | iframe-parent communication | Enables height reporting and xAPI |
| Sandbox Attribute | iframe capabilities | Restricts or permits script execution |
| Content Security Policy | Allowed content sources | May block CDN scripts or inline code |

#### Diagram: Iframe Security Model

<iframe src="../../sims/iframe-security-model/main.html" width="100%" height="550px" scrolling="no"></iframe>

<details markdown="1">
<summary>Iframe Security Model</summary>
Type: infographic
**sim-id:** iframe-security-model<br/>
**Library:** p5.js<br/>
**Status:** Specified

**Bloom Level:** Understand (L2)
**Bloom Verb:** Explain
**Learning Objective:** Explain how the browser's iframe security mechanisms (same-origin policy, CORS, postMessage, sandbox, CSP) interact to control what embedded infographic content can and cannot do.

**Instructional Rationale:** Step-through with concrete scenarios is appropriate because the Understand objective requires learners to grasp multiple interacting security mechanisms. Each stage shows a specific scenario (e.g., "infographic tries to read parent DOM" → blocked by same-origin policy) with a visual pass/fail indicator, making abstract policies concrete.

**Canvas Layout:**
- Drawing area (aliceblue): visual representation of parent page and embedded iframe
- Bottom panel (white, silver border): scenario selector and explanation

**Visual Elements:**
- A large rectangle representing the "Parent Page (MkDocs Textbook)" at origin `textbook.edu`
- Inside it, a smaller rectangle representing the "Iframe (Infographic)" at origin `textbook.edu/sims/`
- Arrows between the two representing different types of communication attempts
- Each arrow is color-coded: green = allowed, red = blocked, yellow = conditional
- Security mechanism labels appear on relevant barriers between the two rectangles
- A shield icon next to each security mechanism

**Data Visibility Requirements:**
- Scenario 1 ("Same-Origin Access"): Arrow from iframe to parent labeled "Read parent DOM" — GREEN (same origin, allowed). Explanation: same-origin policy permits access because both are on textbook.edu
- Scenario 2 ("Cross-Origin DOM Access"): Origin of iframe changes to `cdn.example.com`. Arrow from iframe to parent labeled "Read parent DOM" — RED (blocked). Explanation: same-origin policy blocks DOM access across origins
- Scenario 3 ("postMessage"): Arrow from iframe to parent labeled "Send height message" — GREEN. Explanation: postMessage is designed for safe cross-origin communication
- Scenario 4 ("CDN Script Loading"): Arrow from external CDN to iframe labeled "Load p5.js" — GREEN with CORS badge. Explanation: CDN includes CORS headers allowing any origin
- Scenario 5 ("Sandbox Restrictions"): Iframe gets a "sandbox" border. Arrows for "Run scripts" (RED without allow-scripts, GREEN with it). Explanation: sandbox attribute fine-tunes iframe capabilities

**Interactive Controls:**
- Dropdown: scenario selector (5 scenarios)
- Or "Next Scenario" / "Previous Scenario" buttons
- Info panel with detailed explanation of current scenario

**Behavior:**
- Switching scenarios animates the arrows and updates colors/labels
- Shield icons pulse when they are the active security mechanism for the current scenario
- Responsive to window resize

**Default Parameters:**
- Start at Scenario 1
- Canvas width: responsive
- Canvas height: 500px

Implementation: p5.js with animated scenario transitions
</details>

## Putting It All Together: How Web Fundamentals Support Infographic Development

Now that you have explored each building block individually, it is worth stepping back to see how they combine in a typical infographic development workflow:

1. **HTML Structure** provides the document skeleton: a `<canvas>` or `<svg>` element for graphics, `<div>` containers for controls and infoboxes, and `<script>` tags for code
2. **CSS Styling** controls the visual layout: aliceblue backgrounds, silver borders, responsive flex layouts with media queries and breakpoints
3. **DOM Manipulation** updates dynamic content: changing infobox text when a user hovers, showing/hiding labels, creating controls programmatically
4. **Canvas or SVG** renders the actual graphics: shapes, colors, text, and images that form the visual content of the infographic
5. **JSON/CSV Data** drives the content: overlay configurations, chart datasets, and label definitions loaded from external files
6. **Coordinate Systems** map user actions to visual elements: converting mouse positions to canvas coordinates, applying hit detection algorithms
7. **Event Handling** captures user input: mouse moves, clicks, and touch events that trigger visual responses
8. **CDN Loading** brings in libraries: p5.js, D3.js, Chart.js, and other tools loaded from fast, reliable CDN servers
9. **Iframe Embedding** integrates the infographic into the textbook page, with postMessage communication for height reporting and security policies that keep everything safe

#### Diagram: Web Fundamentals Architecture Overview

<iframe src="../../sims/web-fundamentals-architecture/main.html" width="100%" height="550px" scrolling="no"></iframe>

<details markdown="1">
<summary>Web Fundamentals Architecture Overview</summary>
Type: diagram
**sim-id:** web-fundamentals-architecture<br/>
**Library:** p5.js<br/>
**Status:** Specified

**Bloom Level:** Analyze (L4)
**Bloom Verb:** Organize
**Learning Objective:** Organize the web fundamentals covered in this chapter into a layered architecture diagram, showing how HTML, CSS, JavaScript, data formats, and security mechanisms relate to each other in the context of infographic development.

**Instructional Rationale:** An interactive layered architecture diagram is appropriate because the Analyze objective requires learners to see how individual technologies organize into a coherent system. Hovering over each layer reveals its role and connections to other layers, building a mental model of the full stack.

**Canvas Layout:**
- Drawing area (aliceblue): layered architecture diagram
- Info panel (right side, white, silver border, 250px): details about the hovered layer

**Visual Elements:**
- 5 horizontal layers stacked vertically (bottom to top):
  1. **Security Layer** (bottom, gray): Same-Origin Policy, CORS, CSP, Sandbox
  2. **Data Layer** (blue): JSON, CSV, JSON Schema
  3. **Structure & Style Layer** (green): HTML Structure, CSS Styling, DOM Manipulation
  4. **Graphics Layer** (orange): Canvas, SVG, Coordinate Systems, Hit Detection, Bezier Curves
  5. **Interaction Layer** (top, red): Mouse Events, Touch Events, Pointer Devices
- Vertical arrows connecting the layers showing data flow
- The iframe boundary is shown as a dashed border around layers 2-5, with the Security Layer straddling the boundary
- Each layer shows its key technologies as labeled boxes within the layer

**Interactive Controls:**
- Hover over any layer to highlight it and display its description in the info panel
- Hover over any technology box within a layer to see a tooltip with a one-sentence definition
- Click a layer to "expand" it, showing all its sub-components in more detail
- Button: "Collapse All" — returns to the overview

**Behavior:**
- Hovering a layer dims other layers to 50% opacity
- The info panel shows: layer name, purpose, key technologies, and how it connects to adjacent layers
- Clicking to expand shows internal relationships within the layer (e.g., in the Graphics layer: Canvas → Coordinate System → Hit Detection → Bounding Box / Point-in-Polygon)
- Responsive to window resize

**Default Parameters:**
- All layers visible, none expanded
- Canvas width: responsive
- Canvas height: 500px

Implementation: p5.js with layered interactive diagram
</details>

!!! mascot-warning "Common Mistake"
    <img src="../../img/mascot/warning.png" class="mascot-admonition-img" alt="Percy warns you">
    A common mistake when starting infographic development is trying to learn every web technology in depth before building anything. You do not need to master CSS Grid, advanced DOM APIs, or the full SVG specification. Focus on the subset covered in this chapter — it is specifically tuned for infographic work — and learn additional details as specific projects require them.

## Summary

!!! mascot-celebration "Excellent Work!"
    <img src="../../img/mascot/celebration.png" class="mascot-admonition-img" alt="Percy celebrates">
    You now have a solid foundation in every web technology that powers interactive infographics! From HTML structure to iframe security, these building blocks will serve you throughout every technical chapter ahead. The best part? You do not need to memorize all of this — use this chapter as a reference whenever you need to look something up. Display it with style!

In this chapter, you learned that:

- **HTML structure** provides the document skeleton with elements like `<canvas>`, `<svg>`, `<div>`, and `<iframe>` for organizing infographic content
- **CSS styling** controls layout, colors, borders, and responsive behavior through selectors, properties, and media queries
- **DOM manipulation** enables dynamic content updates by reading and modifying the browser's in-memory document tree
- **Canvas** renders pixel-based graphics (ideal for animations and simulations via p5.js), while **SVG** renders vector-based graphics (ideal for data visualizations via D3.js)
- **JSON** and **CSV** are the two primary data formats for driving infographic content, with **JSON Schema** providing validation contracts
- **Coordinate systems** use a top-left origin with y increasing downward; **pixel coordinates** are absolute, while **relative coordinates** adapt to container size
- **Bounding boxes** provide fast rectangular hit detection; **point-in-polygon tests** (ray casting) handle arbitrary shapes including **convex** and **concave polygons**
- **Bezier curves** create smooth, mathematically defined curves for organic shapes and arrow paths
- **Viewports**, **breakpoints**, and **media queries** work together to create responsive layouts that adapt to any screen size, with the **aspect ratio** preserved for consistent proportions
- **Mouse events**, **touch events**, and the unified **pointer device** API capture user interactions, with touch requiring tap-to-toggle alternatives for hover-based features
- **CDN script loading** is the standard method for including libraries like p5.js, with **module imports** available for more complex projects
- The **same-origin policy**, **CORS**, **cross-origin messaging** (postMessage), **sandbox attributes**, and **Content Security Policy** collectively ensure that embedded infographics operate safely within the textbook's security boundaries
- **Embed code** with `scrolling="no"` prevents scroll hijacking in iframe-embedded infographics

## References

- [MDN Web Docs: HTML Basics](https://developer.mozilla.org/en-US/docs/Learn/Getting_started_with_the_web/HTML_basics)
- [MDN Web Docs: CSS Basics](https://developer.mozilla.org/en-US/docs/Learn/Getting_started_with_the_web/CSS_basics)
- [MDN Web Docs: Canvas API](https://developer.mozilla.org/en-US/docs/Web/API/Canvas_API)
- [MDN Web Docs: SVG Tutorial](https://developer.mozilla.org/en-US/docs/Web/SVG/Tutorial)
- [MDN Web Docs: Document Object Model](https://developer.mozilla.org/en-US/docs/Web/API/Document_Object_Model)
- [Wikipedia: JSON](https://en.wikipedia.org/wiki/JSON)
- [Wikipedia: Comma-Separated Values](https://en.wikipedia.org/wiki/Comma-separated_values)
- [Wikipedia: Point in Polygon](https://en.wikipedia.org/wiki/Point_in_polygon)
- [Wikipedia: Bezier Curve](https://en.wikipedia.org/wiki/B%C3%A9zier_curve)
- [MDN Web Docs: Content Security Policy](https://developer.mozilla.org/en-US/docs/Web/HTTP/CSP)
