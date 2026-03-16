---
title: Advanced Visualization and Design Principles
description: Master advanced visualization techniques including data visualization fundamentals, Gestalt principles, accessibility requirements, and specialized interaction patterns like scrollytelling, drill-down navigation, and decision trees for professional-quality interactive infographics.
generated_by: claude skill chapter-content-generator
date: 2026-03-14 18:03:11
version: 0.05
---

# Advanced Visualization and Design Principles

## Summary

This chapter covers advanced visualization techniques and design principles that elevate interactive infographics from functional to professional. You will learn data visualization fundamentals, visual encoding strategies, color palette design, and Gestalt principles (proximity, contrast, alignment, repetition). The chapter covers accessibility requirements (ARIA attributes, keyboard navigation, screen reader support, high contrast mode) and advanced interaction patterns including scrollytelling, step reveal, zoom-and-pan, drill-down navigation, and specialized diagram types like journey maps, decision trees, and layered infographics.

## Concepts Covered

This chapter covers the following 37 concepts from the learning graph:

1. Data Visualization
2. Information Design
3. Visual Encoding
4. Color Palette
5. Tooltip
6. Hover Highlight
7. Click Feedback
8. Visual Hierarchy
9. Gestalt Principles
10. Proximity Principle
11. Contrast Principle
12. Alignment Principle
13. Repetition Principle
14. Image Compression
15. PNG Format
16. WebP Format
17. Alt Text
18. Semantic HTML
19. ARIA Attribute
20. Keyboard Navigation
21. Tab Order
22. Screen Reader Support
23. High Contrast Mode
24. Before-After Diagram
25. Side-by-Side Comparison
26. Decision Tree Diagram
27. Mind Map
28. Journey Map
29. Roadmap Diagram
30. Annotated Screenshot
31. Layered Infographic
32. Scrollytelling
33. Step Reveal
34. Zoom and Pan
35. Drill Down
36. Breadcrumb Navigation
37. Legend Design

## Prerequisites

This chapter builds on concepts from:

- [Chapter 1: Foundations of Interactive Infographics](../01-foundations-of-interactive-infographics/index.md)
- [Chapter 6: Web Fundamentals: Structure, Style, and Data](../06-web-fundamentals-structure-style-and-data/index.md)
- [Chapter 7: Web Fundamentals: JavaScript and Responsive Design](../07-web-fundamentals-javascript-and-responsive-design/index.md)
- [Chapter 8: JavaScript Visualization Libraries](../08-javascript-visualization-libraries/index.md)

---

!!! mascot-welcome "Let's Make It Visual!"
    <img src="../../img/mascot/welcome.png" class="mascot-admonition-img" alt="Percy welcomes you">
    Welcome to one of the most rewarding chapters in this course! Everything you have built so far — overlay patterns, MicroSim packages, JavaScript libraries — has given you a solid technical foundation. Now you will learn the *design principles* that transform competent implementations into truly compelling learning experiences. From Gestalt psychology to accessibility engineering, from scrollytelling to drill-down navigation, this chapter equips you to create infographics that are not just functional but genuinely beautiful, inclusive, and engaging. Let's make it visual!

## Learning Objectives

By the end of this chapter, you will be able to:

- **Explain** how data visualization, information design, and visual encoding work together to communicate meaning through interactive infographics (Bloom: Understand)
- **Apply** the four Gestalt principles (proximity, contrast, alignment, repetition) to improve the visual clarity and organization of infographic layouts (Bloom: Apply)
- **Implement** accessibility features including ARIA attributes, keyboard navigation, tab order, screen reader support, and high contrast mode in MicroSim infographics (Bloom: Apply)
- **Analyze** when to use specialized diagram types (decision trees, journey maps, mind maps, before-after diagrams) based on the content structure and learning objective (Bloom: Analyze)
- **Design** advanced interaction patterns including scrollytelling, step reveal, zoom-and-pan, and drill-down navigation with breadcrumb trails for complex educational content (Bloom: Create)

## Introduction

Throughout this course, you have been steadily building your capabilities — from understanding what interactive infographics are, through mastering overlay patterns and JavaScript libraries, to packaging professional MicroSims. Each chapter has added tools to your toolkit. This chapter brings those tools together under the guidance of proven design principles that have been refined by decades of research in visual perception, information architecture, and human-computer interaction.

The difference between a good infographic and a great one often comes down to design decisions that seem subtle but have outsized impact on learning outcomes. Placing related elements close together (proximity), using contrast to draw attention to key data points, aligning elements on a consistent grid, and repeating visual patterns to create coherence — these Gestalt principles are not abstract theory. They are practical tools that make your infographics easier to understand, faster to scan, and more memorable for students.

This chapter also addresses two areas that are increasingly important in educational technology: accessibility and advanced interaction patterns. Accessibility ensures that every student can benefit from your infographics, regardless of visual ability, motor skill, or assistive technology use. Advanced interaction patterns — scrollytelling, drill-down navigation, layered infographics — enable you to present complex, multi-layered content in ways that reduce cognitive load and keep students engaged. Together, these principles and patterns represent the professional standard for interactive educational content.

## Data Visualization and Information Design

### Data Visualization

**Data visualization** is the practice of representing data graphically to reveal patterns, trends, relationships, and outliers that would be difficult to detect in raw numbers or text. For interactive infographics, data visualization goes beyond static charts — it encompasses interactive elements that let students explore data by hovering, filtering, zooming, and selecting subsets of information.

Effective data visualization answers a question. Before creating any visualization, the designer should be able to articulate: *What will the student understand after interacting with this graphic that they did not understand before?* This question-first approach prevents the common mistake of creating visually impressive graphics that fail to communicate a clear message.

The core principle of data visualization is that **visual representations leverage the human visual system's parallel processing capabilities**. A student can detect a pattern in a well-designed scatter plot in seconds — the same pattern might take minutes to identify in a table of numbers. Interactive infographics amplify this advantage by allowing students to query the visualization through direct manipulation.

### Information Design

**Information design** is the broader discipline of organizing and presenting information so that it is easy to understand and use. While data visualization focuses specifically on quantitative data, information design encompasses all types of information — processes, relationships, hierarchies, sequences, and spatial arrangements. Information design asks: *How should this content be structured and presented so that the audience can find, understand, and act on it?*

For instructional designers creating interactive infographics, information design provides the strategic framework within which specific visualization and interaction decisions are made.

| Discipline | Focus | Primary Question | Output |
|-----------|-------|-----------------|--------|
| **Data Visualization** | Quantitative data | What patterns exist in the data? | Charts, graphs, plots |
| **Information Design** | All information types | How should content be organized for understanding? | Diagrams, layouts, navigation systems |
| **Visual Encoding** | Mapping data to visuals | Which visual properties represent which data dimensions? | Color, size, position, shape mappings |

### Visual Encoding

**Visual encoding** is the systematic mapping of data attributes to visual properties. Every data visualization uses visual encoding, whether the designer is conscious of it or not. The key visual channels available for encoding data include:

- **Position** — the most accurate channel for quantitative data (bar heights, scatter plot coordinates)
- **Length** — comparing magnitudes (bar chart lengths)
- **Color hue** — categorical distinctions (red for errors, green for success)
- **Color saturation/brightness** — intensity or magnitude within a category
- **Size/area** — relative magnitudes (bubble charts)
- **Shape** — categorical distinctions (circles vs. squares for different node types)
- **Angle** — proportions (pie charts, though position is generally more accurate)
- **Texture/pattern** — secondary categorical distinctions

The effectiveness of visual encoding channels has been studied extensively. Position and length are the most accurately perceived channels — students can compare bar heights with remarkable precision. Color hue is excellent for categorical distinctions but poor for quantitative comparisons. Area and angle are the least accurately perceived — which is why pie charts, though popular, are often less effective than bar charts for the same data.

!!! mascot-thinking "Key Insight"
    <img src="../../img/mascot/thinking.png" class="mascot-admonition-img" alt="Percy is thinking">
    When designing an interactive infographic, choose your visual encoding channels deliberately. Map the most important data dimension to position (the most accurate channel), use color hue for categories, and reserve size for secondary comparisons. This single design decision — matching encoding channel accuracy to data importance — dramatically improves how quickly and correctly students interpret your visualizations.

#### Diagram: Visual Encoding Channel Explorer

<iframe src="../../sims/visual-encoding-explorer/main.html" width="100%" height="550px" scrolling="no"></iframe>

<details markdown="1">
<summary>Visual Encoding Channel Explorer</summary>
Type: microsim
**sim-id:** visual-encoding-explorer<br/>
**Library:** p5.js<br/>
**Status:** Specified

**Bloom Level:** Understand (L2)
**Bloom Verb:** Compare
**Learning Objective:** Compare the effectiveness of different visual encoding channels (position, length, color, size, shape, angle) by viewing the same dataset rendered through each channel, identifying which encodings make patterns easiest to detect.

**Instructional Rationale:** A side-by-side comparison of encoding channels using the same dataset is appropriate because the Understand objective requires learners to distinguish between channels and explain why some are more effective. Seeing the same data through different encodings builds intuition about channel accuracy.

**Canvas Layout:**
- Main area (aliceblue): a grid of 6 small visualizations, each showing the same 8-item dataset encoded differently
- Below (white, silver border): description panel and controls

**Visual Elements:**
- 6 visualization panels arranged in a 3x2 grid:
  1. "Position" — vertical dot plot with items placed at different heights
  2. "Length" — horizontal bar chart
  3. "Color Saturation" — identical rectangles with varying blue saturation
  4. "Size" — circles of varying radii
  5. "Angle" — pie chart with 8 slices
  6. "Shape + Color Hue" — 8 items using different shapes and hues for two categorical dimensions
- Each panel has a title label and an "Accuracy Rating" badge (Excellent, Good, Fair, Poor)
- A dataset indicator showing the 8 data values being encoded
- Hovering over any encoded element shows the actual data value as a tooltip

**Interactive Controls:**
- Button: "Randomize Data" — generates a new random dataset and re-renders all 6 panels
- Button: "Quiz Me" — hides data values and asks the student to rank items by magnitude using each encoding, then reveals correct answers
- Dropdown: "Dataset" — choose from: Random, Nearly Equal Values, Wide Range, Two Clusters
- Toggle: "Show Values" (default on) — shows/hides the actual numeric values on each panel

**Behavior:**
- All 6 panels always show the same dataset for direct comparison
- "Randomize Data" smoothly transitions to new values
- "Quiz Me" mode highlights one panel at a time and asks "Which item is largest?" — tracks accuracy per channel
- Responsive to window resize; panels reflow to 2x3 or 1x6 on narrow screens

**Default Parameters:**
- Dataset: Random (8 values between 10 and 100)
- Show Values: on
- Canvas width: responsive
- Canvas height: 500px

Implementation: p5.js with multi-panel rendering and shared dataset state
</details>

## Color Palette and Visual Hierarchy

### Color Palette

A **color palette** is a curated set of colors used consistently throughout an infographic to convey meaning, create visual unity, and guide attention. In interactive infographics, color serves multiple purposes simultaneously: it encodes data categories, indicates interactive states (default, hover, selected, disabled), establishes visual hierarchy, and creates aesthetic appeal.

Designing an effective color palette for educational infographics requires balancing several considerations:

- **Semantic meaning**: Use colors that align with conventional expectations (red for warnings, green for success, blue for information)
- **Sufficient contrast**: Adjacent elements must have enough contrast to be distinguishable, including for users with color vision deficiency
- **Limited palette size**: Research suggests 5-7 distinct colors is the maximum for reliable categorical distinction
- **Interactive state variation**: Each color needs lighter and darker variants for hover, selected, and disabled states
- **Consistency with MicroSim standards**: The aliceblue drawing region and white control region establish a baseline that your palette must complement

| Palette Type | Best For | Example Colors | Considerations |
|-------------|---------|---------------|----------------|
| **Sequential** | Ordered data (low to high) | Light blue → Dark blue | Single hue, varying saturation |
| **Diverging** | Data with a meaningful midpoint | Red ← White → Blue | Two hues diverging from neutral |
| **Categorical** | Distinct groups | Red, Blue, Green, Orange, Purple | Maximum perceptual distance between hues |
| **Semantic** | Meaningful categories | Red=error, Green=success, Yellow=warning | Leverage cultural conventions |

### Visual Hierarchy

**Visual hierarchy** is the arrangement of design elements in order of importance, guiding the viewer's eye through the content in a deliberate sequence. In interactive infographics, visual hierarchy determines what students notice first, second, and third — and this sequence should align with the intended learning progression.

Visual hierarchy is established through the strategic use of:

- **Size**: Larger elements attract attention before smaller ones
- **Color contrast**: High-contrast elements draw the eye before low-contrast ones
- **Position**: Top-left elements are seen first in left-to-right reading cultures
- **Weight**: Bold or filled elements take precedence over thin or outlined ones
- **Whitespace**: Isolated elements surrounded by space draw more attention
- **Motion**: In interactive infographics, animated elements capture attention (use sparingly to avoid distraction)

Effective visual hierarchy in educational infographics follows the principle of **progressive disclosure** — presenting the most important information prominently and allowing students to discover additional detail through interaction. The title, key data point, and primary message should be immediately visible. Supporting details, explanations, and edge cases should be accessible through hover, click, or drill-down interactions.

### Legend Design

**Legend design** encompasses the visual conventions used to explain the meaning of colors, shapes, sizes, and other encodings in a visualization. A well-designed legend is essential for any infographic that uses visual encoding — without it, students must guess what the visual properties mean.

Effective legend design principles:

- **Proximity**: Place the legend close to the visualization it describes, not in a distant corner
- **Direct labeling**: When possible, label elements directly instead of using a separate legend (reduces the need for eye movement between legend and data)
- **Ordering**: Match the order of items in the legend to their visual order in the chart
- **Interactive legends**: In interactive infographics, clicking a legend item can filter or highlight the corresponding data series — this transforms the legend from a passive reference into an active exploration tool
- **Minimal footprint**: Legends should explain without competing for attention with the data

## Interaction Design Patterns

### Tooltips

A **tooltip** is a small information panel that appears when the user hovers over (or taps on) an element in the infographic. Tooltips are the workhorse of interactive infographic design — they provide contextual detail without cluttering the visual display. Every interactive region in an overlay infographic uses tooltips to display descriptions, and every data point in a chart can reveal its precise value through a tooltip.

Tooltip design best practices:

- **Appear near the pointer**: Position the tooltip close to the element being inspected, but never covering it
- **Respond quickly**: Tooltips should appear within 200-300 milliseconds of hover — fast enough to feel responsive, slow enough to avoid flickering during casual mouse movement
- **Contain structured content**: Use a consistent format (label, value, description) so students know what to expect
- **Dismiss cleanly**: Tooltips should disappear immediately when the pointer leaves the element

### Hover Highlight

**Hover highlight** is the visual change that occurs when a user positions their pointer over an interactive element. The highlight provides critical feedback — it tells the student that an element is interactive and clickable. Without hover highlights, students may not discover interactive features at all.

Common hover highlight techniques include:

- **Color change**: Shifting the element to a brighter or contrasting color
- **Opacity change**: Dimming non-hovered elements while keeping the hovered element at full opacity
- **Border emphasis**: Adding or thickening a border around the hovered element
- **Scale increase**: Slightly enlarging the hovered element (subtle — typically 105-110%)
- **Shadow addition**: Adding a drop shadow to create a "lifted" appearance

### Click Feedback

**Click feedback** confirms that the student's click action was registered and produced a result. In interactive infographics, click feedback might include selecting a region (highlighting it persistently), opening a detail panel, navigating to a related view, or toggling a state. The key principle is that every clickable element must produce a visible response — otherwise students experience uncertainty about whether the interface is working.

#### Diagram: Interaction Feedback Patterns Demo

<iframe src="../../sims/interaction-feedback-demo/main.html" width="100%" height="500px" scrolling="no"></iframe>

<details markdown="1">
<summary>Interaction Feedback Patterns Demo</summary>
Type: microsim
**sim-id:** interaction-feedback-demo<br/>
**Library:** p5.js<br/>
**Status:** Specified

**Bloom Level:** Apply (L3)
**Bloom Verb:** Demonstrate
**Learning Objective:** Demonstrate the three primary interaction feedback patterns (tooltip, hover highlight, click feedback) by interacting with sample elements and observing the visual responses, then adjusting feedback parameters to understand their effect on user experience.

**Instructional Rationale:** A hands-on parameter exploration is appropriate because the Apply objective requires learners to use interaction patterns in practice. Adjusting feedback timing, colors, and effects builds practical understanding of how design parameters affect user experience.

**Canvas Layout:**
- Main area (aliceblue): 6 interactive sample elements (colored rectangles with labels) arranged in two rows of 3
- Below (white, silver border): control panel with parameter sliders and a feedback log

**Visual Elements:**
- 6 labeled interactive rectangles representing infographic regions:
  1. "Tooltip" — demonstrates tooltip appearance on hover
  2. "Color Change" — demonstrates hover color shift
  3. "Opacity Dim" — demonstrates dimming non-hovered elements
  4. "Border Glow" — demonstrates border emphasis on hover
  5. "Scale Up" — demonstrates slight enlargement on hover
  6. "Click Select" — demonstrates persistent selection with click feedback
- A "Feedback Log" text area at the bottom showing timestamped interaction events ("Hovered Region 1 at 2.3s", "Clicked Region 6 at 4.1s")
- Each element displays a small icon indicating its feedback type

**Interactive Controls:**
- Slider: "Tooltip Delay" (0ms to 1000ms, default 200ms) — controls how quickly tooltips appear
- Slider: "Highlight Opacity" (0.1 to 1.0, default 0.3) — controls the dimming level for non-hovered elements
- Slider: "Scale Factor" (1.0 to 1.3, default 1.1) — controls how much elements enlarge on hover
- Color picker: "Hover Color" (default: gold) — changes the hover highlight color
- Button: "Clear Log" — clears the feedback log
- Toggle: "Show Timing" (default off) — displays millisecond timing for each feedback event

**Behavior:**
- Each rectangle demonstrates its specific feedback pattern when hovered or clicked
- Adjusting sliders immediately changes the feedback behavior for all elements
- The feedback log records every interaction with timestamps
- All 6 feedback patterns can be experienced and compared side by side
- Responsive to window resize; elements reflow to 3x2 or 2x3 on narrow screens

**Default Parameters:**
- Tooltip Delay: 200ms
- Highlight Opacity: 0.3
- Scale Factor: 1.1
- Hover Color: gold (#FFD700)
- Canvas width: responsive
- Canvas height: 450px

Implementation: p5.js with multiple feedback pattern implementations and parameter controls
</details>

## Gestalt Principles for Infographic Design

The **Gestalt principles** are a set of perceptual organization rules discovered by early 20th-century psychologists that describe how the human visual system groups and interprets visual elements. These principles are not just academic curiosities — they are practical design tools that directly determine whether an infographic communicates clearly or creates confusion. When you apply Gestalt principles intentionally, your infographics become easier to scan, faster to understand, and more memorable.

Four Gestalt principles are particularly powerful for interactive infographic design:

### Proximity Principle

The **proximity principle** states that elements placed close together are perceived as belonging to a group. This is one of the most powerful and frequently used Gestalt principles in infographic design. By controlling the spacing between elements, you control how students perceive groupings — without needing explicit borders, labels, or connecting lines.

In practice, the proximity principle means:

- **Related labels and data** should be placed close to the visual elements they describe
- **Distinct sections** of an infographic should be separated by visible whitespace
- **Control panels** should group related controls (all color controls together, all timing controls together)
- **Legend items** should be spaced to match the visual groupings they represent

### Contrast Principle

The **contrast principle** states that elements that differ visually from their surroundings attract attention and are perceived as distinct or important. Contrast can be achieved through differences in color, size, weight, shape, or any other visual property. In infographic design, contrast is the primary mechanism for establishing visual hierarchy — the most important elements should have the highest contrast with their background.

Effective use of contrast in interactive infographics:

- **Active vs. inactive states**: Selected elements should contrast strongly with unselected ones
- **Data emphasis**: Key data points or outliers can be highlighted with contrasting color
- **Interactive affordance**: Clickable elements should contrast with non-interactive background elements
- **Error indication**: Validation errors or warnings use high-contrast colors (red, orange) to draw immediate attention

### Alignment Principle

The **alignment principle** states that elements arranged along a common axis or edge are perceived as related and orderly. Alignment creates visual structure that guides the eye along clean paths through the infographic. Even small misalignments can create a subtle sense of disorder that undermines the professionalism of a design.

For interactive infographics, alignment applies to:

- **Grid-based layouts**: Aligning elements to a consistent grid ensures visual order
- **Label positioning**: Labels should align consistently (all left-aligned, or all centered, or all right-aligned)
- **Control panels**: Form elements (sliders, buttons, dropdowns) should align vertically and horizontally
- **Data elements**: Chart axes, bar positions, and data labels should follow strict alignment rules

### Repetition Principle

The **repetition principle** states that repeating visual patterns throughout a design creates coherence and reinforces relationships between similar elements. In interactive infographics, repetition means using the same colors, fonts, spacing, and interaction patterns consistently across all elements of the same type.

Repetition creates predictability, and predictability reduces cognitive load. When a student learns that blue rectangles are clickable regions and orange circles are data points in one section of an infographic, encountering the same patterns in a different section requires no additional learning — the visual language carries forward automatically.

!!! mascot-thinking "Key Insight"
    <img src="../../img/mascot/thinking.png" class="mascot-admonition-img" alt="Percy is thinking">
    The four Gestalt principles work together as a design system, not as isolated rules. Proximity groups related elements, contrast highlights the most important ones, alignment creates visual order, and repetition builds coherent patterns. When you apply all four principles together, your infographic develops a visual language that students can learn quickly and navigate confidently. Think of Gestalt principles as the grammar of visual communication.

#### Diagram: Gestalt Principles Interactive Playground

<iframe src="../../sims/gestalt-principles-playground/main.html" height="660" scrolling="no"></iframe>

<details markdown="1">
<summary>Gestalt Principles Interactive Playground</summary>
Type: microsim
**sim-id:** gestalt-principles-playground<br/>
**Library:** p5.js<br/>
**Status:** Specified

**Bloom Level:** Apply (L3)
**Bloom Verb:** Apply
**Learning Objective:** Apply the four Gestalt principles (proximity, contrast, alignment, repetition) to a set of visual elements by adjusting design parameters and observing how each principle changes the perceived grouping, hierarchy, and organization of the layout.

**Instructional Rationale:** A parameter exploration sandbox is appropriate because the Apply objective requires learners to manipulate design variables and observe their effects. Adjusting spacing, contrast, alignment, and repetition in real time builds practical design intuition.

**Canvas Layout:**
- Main area (aliceblue): a canvas containing 16 colored rectangles arranged in a 4x4 grid, representing infographic elements
- Below (white, silver border): four control sections, one for each Gestalt principle

**Visual Elements:**
- 16 rectangles in a 4x4 layout, initially uniformly spaced and colored
- Elements are divided into 4 logical groups (rows or clusters) that become visible or invisible depending on parameter settings
- A "Before/After" indicator showing the current state vs. the default state
- Labels above each group when grouping is visible

**Interactive Controls:**
- **Proximity section:**
  - Slider: "Group Spacing" (0px to 60px, default 10px) — controls the gap between the 4 groups; higher values make groups visually distinct
  - Slider: "Item Spacing" (2px to 30px, default 10px) — controls spacing within groups
- **Contrast section:**
  - Slider: "Emphasis Level" (0 to 100, default 0) — increases color contrast for group 1 elements (simulating "most important" data)
  - Toggle: "Highlight Active" (default off) — makes one group brighter and dims others
- **Alignment section:**
  - Toggle: "Snap to Grid" (default off) — when on, aligns all elements to a strict grid; when off, elements are slightly offset
  - Slider: "Misalignment" (0 to 15px, default 5px) — controls random offset when grid snapping is off
- **Repetition section:**
  - Toggle: "Consistent Shapes" (default off) — when on, each group uses a distinct consistent shape (circles, squares, triangles, diamonds); when off, shapes are random
  - Toggle: "Consistent Colors" (default off) — when on, each group gets a consistent color; when off, colors are random
- Button: "Reset All" — returns all parameters to defaults
- Button: "Apply All Principles" — sets all parameters to optimal values simultaneously

**Behavior:**
- Adjusting any slider or toggle immediately updates the canvas
- "Apply All Principles" animates a transition from the default (chaotic) state to the optimized (organized) state over 2 seconds
- When all principles are applied, the 4 groups are clearly distinguishable by spacing, color, alignment, and shape
- When all principles are at default, the 16 elements appear as a uniform, disorganized collection
- Responsive to window resize

**Default Parameters:**
- All sliders at middle/default values (no strong grouping visible)
- All toggles off
- Canvas width: responsive
- Canvas height: 550px

Implementation: p5.js with real-time parameter-driven layout rendering
</details>

## Image Optimization for Web Delivery

When interactive infographics use base images — photographs, illustrations, or AI-generated artwork — those images must be optimized for web delivery. Unoptimized images slow page load times, consume bandwidth, and create poor experiences on mobile devices. Understanding image formats and compression techniques ensures your MicroSims load quickly and display crisply.

### Image Compression

**Image compression** reduces the file size of images by removing redundant or imperceptible data. There are two fundamental approaches:

- **Lossless compression**: Reduces file size without any quality loss. The decompressed image is pixel-identical to the original. Used when every detail matters (diagrams, text-heavy images, screenshots).
- **Lossy compression**: Achieves much smaller file sizes by discarding data that is less perceptible to the human eye. Used for photographs and illustrations where slight quality reduction is acceptable.

For interactive infographic base images, the choice between lossless and lossy compression depends on the image content:

| Image Type | Recommended Compression | Reason |
|-----------|------------------------|--------|
| Diagrams with sharp lines and text | Lossless (PNG) | Lossy compression creates artifacts around sharp edges |
| Photographs | Lossy (WebP or JPEG) | Photographs tolerate quality reduction well |
| AI-generated illustrations | Lossy (WebP) | Usually photographic in quality; WebP offers best size/quality ratio |
| Screenshots with UI elements | Lossless (PNG) | Text and UI edges need pixel-perfect rendering |
| Icons and simple graphics | Lossless (PNG or SVG) | Few colors; lossless compression is very efficient |

### PNG Format

The **PNG (Portable Network Graphics) format** is a lossless image format widely used for diagrams, screenshots, and graphics that require transparency. PNG excels at images with large areas of uniform color, sharp edges, and text — exactly the characteristics of most infographic base images.

Key PNG characteristics:

- Supports full alpha transparency (variable opacity per pixel)
- Lossless — no quality degradation on save/re-save
- Excellent for images with fewer than 256 colors (PNG-8) or full color (PNG-24/32)
- Larger file sizes than lossy formats for photographic content
- Universally supported by all web browsers

### WebP Format

The **WebP format** is a modern image format developed by Google that supports both lossless and lossy compression with significantly smaller file sizes than PNG or JPEG at equivalent quality. WebP has become the preferred format for web-optimized images because it offers the best balance of quality, file size, and feature support.

WebP advantages for interactive infographics:

- **25-35% smaller** than equivalent JPEG at the same visual quality
- **26% smaller** than equivalent PNG for lossless compression
- Supports animation (alternative to GIF with smaller file sizes)
- Supports alpha transparency (like PNG)
- Supported by all modern browsers (Chrome, Firefox, Safari, Edge)

For MicroSim base images, WebP is increasingly the best default choice. When you generate base images using AI tools (Chapter 12), save them as WebP for optimal web performance. Use PNG only when you need guaranteed lossless quality for diagrams with precise lines and text.

## Accessibility: Building Infographics for Everyone

Accessibility is not an optional enhancement — it is a professional requirement and, in many educational contexts, a legal obligation. Creating accessible interactive infographics means ensuring that students with visual impairments, motor disabilities, cognitive differences, and those using assistive technologies can fully participate in the learning experience. The good news is that accessible design almost always produces better design for everyone.

### Alt Text

**Alt text** (alternative text) is a text description attached to an image element that is read aloud by screen readers and displayed when images fail to load. For interactive infographics, alt text serves as the textual equivalent of the visual content — it should describe what the infographic shows and what the key takeaway is.

Effective alt text for infographics:

- **Describe the content, not the appearance**: "Bar chart showing student test scores improving from 65% to 89% over six weeks" is better than "A blue and orange bar chart"
- **Include key data points**: If the visualization communicates specific values, include them
- **Keep it concise**: 1-2 sentences for simple graphics, 3-4 for complex ones
- **Avoid redundancy**: Do not start with "Image of..." or "Picture showing..." — screen readers already announce the element as an image

### Semantic HTML

**Semantic HTML** uses HTML elements that convey meaning about the content they contain, rather than just its appearance. Using semantic elements like `<figure>`, `<figcaption>`, `<nav>`, `<main>`, and `<section>` helps assistive technologies understand the structure of your content and navigate it efficiently.

For MicroSim infographics, semantic HTML practices include:

- Wrapping infographic iframes in `<figure>` with `<figcaption>` for descriptions
- Using `<button>` for clickable controls (not `<div>` with click handlers)
- Structuring control panels with `<fieldset>` and `<legend>` for grouped controls
- Using `<label>` elements for all form inputs (sliders, dropdowns, checkboxes)

### ARIA Attributes

**ARIA (Accessible Rich Internet Applications) attributes** extend HTML to provide additional information to assistive technologies about dynamic, interactive content. Since interactive infographics use JavaScript to create behaviors that standard HTML does not describe, ARIA attributes bridge the gap between what the screen reader can see in the HTML and what the student actually experiences.

Essential ARIA attributes for interactive infographics:

- `aria-label`: Provides an accessible name for elements without visible text labels
- `aria-describedby`: Points to an element containing a longer description
- `aria-live="polite"`: Announces dynamic content changes (tooltip text, selected region names) to screen readers without interrupting the current reading
- `role="img"`: Identifies the canvas element as an image for assistive technologies
- `aria-hidden="true"`: Hides decorative elements from screen readers

### Keyboard Navigation and Tab Order

**Keyboard navigation** enables students to interact with infographics using only the keyboard — no mouse or touchscreen required. This is essential for users with motor disabilities and is also preferred by many power users. **Tab order** defines the sequence in which interactive elements receive focus when the student presses the Tab key.

Implementing keyboard navigation in MicroSim infographics:

- All interactive regions should be focusable (add `tabindex="0"` to interactive elements)
- Tab order should follow a logical sequence (left to right, top to bottom, or matching the visual flow)
- Focus indicators must be visible — use a clear outline or highlight on the focused element
- Pressing Enter or Space on a focused region should trigger the same action as clicking
- Escape should close any open tooltips, panels, or modal displays

### Screen Reader Support

**Screen reader support** ensures that the content and interactions of an infographic are communicated through audio descriptions. For canvas-based MicroSims (p5.js), screen reader support requires additional effort because the canvas is a single bitmap that screen readers cannot parse — all content must be communicated through ARIA attributes, live regions, and off-screen text.

Practical screen reader support strategies:

- Provide a text summary of the infographic content in an `aria-label` on the canvas container
- Use `aria-live` regions to announce state changes (e.g., "Selected region: Mitochondria. The mitochondria is the primary site of ATP production through cellular respiration.")
- Include a "Text Description" toggle that shows a structured text version of the infographic content
- Test with actual screen readers (VoiceOver on macOS, NVDA on Windows) — automated accessibility checkers cannot evaluate the quality of dynamic ARIA announcements

### High Contrast Mode

**High contrast mode** is an alternative color scheme that increases the contrast ratio between foreground and background elements, making content readable for users with low vision or those using displays in bright environments. Supporting high contrast mode in MicroSims means providing an alternative color palette that meets WCAG AA contrast requirements (minimum 4.5:1 ratio for normal text, 3:1 for large text).

!!! mascot-encourage "You've Got This!"
    <img src="../../img/mascot/encouraging.png" class="mascot-admonition-img" alt="Percy encourages you">
    Accessibility can feel overwhelming at first — ARIA attributes, tab order, screen readers, contrast ratios — there are many technical details to learn. But here is the encouraging truth: you do not need to implement perfect accessibility on day one. Start with alt text and keyboard navigation, then add ARIA attributes, then test with screen readers. Each improvement you make opens your infographic to more students. Accessibility is a practice, not a destination.

#### Diagram: Accessibility Audit Checklist

<iframe src="../../sims/accessibility-audit-checklist/main.html" width="100%" height="550px" scrolling="no"></iframe>

<details markdown="1">
<summary>Accessibility Audit Checklist</summary>
Type: microsim
**sim-id:** accessibility-audit-checklist<br/>
**Library:** p5.js<br/>
**Status:** Specified

**Bloom Level:** Evaluate (L5)
**Bloom Verb:** Assess
**Learning Objective:** Assess the accessibility compliance of a sample MicroSim by systematically evaluating it against a structured checklist covering alt text, semantic HTML, ARIA attributes, keyboard navigation, tab order, screen reader support, and high contrast mode, producing a compliance score with specific improvement recommendations.

**Instructional Rationale:** A structured evaluation checklist with a sample MicroSim to test is appropriate because the Evaluate objective requires learners to apply accessibility criteria systematically. Testing against a real sample (with intentional accessibility gaps) teaches the audit process through practice.

**Canvas Layout:**
- Left panel (aliceblue, 50% width): an embedded sample MicroSim (a simple overlay infographic) with intentional accessibility issues
- Right panel (white, silver border, 50% width): accessibility audit checklist with scoring

**Visual Elements:**
- Left panel contains a functional but accessibility-imperfect MicroSim:
  - A labeled diagram with 4 interactive regions
  - Intentional issues: missing alt text on the canvas, no keyboard navigation, hover highlights but no focus indicators, tooltips not announced to screen readers, insufficient color contrast on two labels
- Right panel contains a checklist organized by category:
  - **Alt Text** (2 items): Image alt text present? Describes content not appearance?
  - **Semantic HTML** (2 items): Uses appropriate elements? Labels on all controls?
  - **ARIA Attributes** (3 items): aria-label on canvas? aria-live for updates? Decorative elements hidden?
  - **Keyboard Navigation** (3 items): All regions focusable? Logical tab order? Enter/Space triggers click?
  - **Screen Reader Support** (2 items): State changes announced? Text description available?
  - **High Contrast Mode** (2 items): Contrast ratio ≥ 4.5:1? Toggle for high contrast?
- Each item has three states: Pass (green check), Fail (red X), Not Tested (gray circle)
- Running score: "Accessibility Score: X/14"
- A "Recommendations" panel that auto-populates when items are marked as Fail

**Interactive Controls:**
- Click each checklist item to cycle through Pass/Fail/Not Tested
- The sample MicroSim is fully interactive for testing (hover, attempt keyboard navigation)
- Button: "Reveal Issues" — highlights all accessibility problems with red annotations
- Button: "Show Fixed Version" — replaces the sample with an accessible version for comparison
- Button: "Reset Audit" — clears all checklist marks
- Button: "Export Report" — copies findings as formatted markdown

**Behavior:**
- Marking items as Pass/Fail updates the score in real time
- Failed items generate specific recommendations (e.g., "Add role='img' and aria-label to the canvas element describing the diagram content")
- "Show Fixed Version" loads an improved version with all accessibility features implemented, allowing direct comparison
- Responsive: panels stack vertically on narrow screens

**Default Parameters:**
- All items: Not Tested
- Sample: default MicroSim with accessibility issues
- Canvas width: responsive
- Canvas height: 500px

Implementation: p5.js with embedded sample MicroSim and checklist scoring system
</details>

## Specialized Diagram Types

Interactive infographics encompass a rich variety of diagram types, each suited to particular content structures and learning objectives. The diagram types in this section go beyond basic charts and overlays — they represent specialized visual formats that address specific communication needs in educational content.

### Before-After Diagram

A **before-after diagram** presents two states of the same system, concept, or process side by side, emphasizing what changed and why. Before-after diagrams are exceptionally effective for teaching transformation processes, improvement results, and cause-effect relationships because the visual comparison leverages the human brain's natural ability to detect differences.

Use before-after diagrams when you want students to understand:

- The impact of applying a technique (before optimization vs. after)
- Historical changes (how a city, technology, or process evolved)
- The effect of a design decision (layout before applying Gestalt principles vs. after)

### Side-by-Side Comparison

A **side-by-side comparison** places two or more alternatives next to each other with consistent dimensions, making similarities and differences immediately apparent. Unlike before-after diagrams (which show temporal change), side-by-side comparisons show alternatives that exist simultaneously.

Side-by-side comparisons are ideal for:

- Comparing competing technologies or approaches
- Showing correct vs. incorrect implementations
- Displaying variations of the same concept across contexts

### Decision Tree Diagram

A **decision tree diagram** guides the viewer through a series of binary or multiple-choice decisions, arriving at a recommendation or conclusion based on the path taken. Decision trees are powerful educational tools because they transform complex decision-making processes into a visual, step-by-step format that students can follow and internalize.

For interactive infographics, decision trees benefit enormously from interactivity — students can click through the tree, exploring different paths and seeing different outcomes. This active exploration builds deeper understanding than passively reading a static diagram.

#### Diagram: Infographic Type Decision Tree

<iframe src="../../sims/infographic-type-decision-tree/main.html" width="100%" height="600px" scrolling="no"></iframe>

<details markdown="1">
<summary>Infographic Type Decision Tree</summary>
Type: microsim
**sim-id:** infographic-type-decision-tree<br/>
**Library:** p5.js<br/>
**Status:** Specified

**Bloom Level:** Analyze (L4)
**Bloom Verb:** Differentiate
**Learning Objective:** Differentiate between infographic types (overlay, chart, network graph, timeline, mind map, decision tree, journey map) by navigating a decision tree that asks questions about the content structure, data type, and learning objective, arriving at a recommended infographic type with rationale.

**Instructional Rationale:** An interactive decision tree is appropriate because the Analyze objective requires learners to identify structural characteristics of their content and match them to infographic types. Navigating the tree forces explicit reasoning about content properties.

**Canvas Layout:**
- Main area (aliceblue): a tree structure with decision nodes and recommendation leaf nodes
- Below (white, silver border): detail panel showing the current question, selected answer, and recommendation

**Visual Elements:**
- A tree structure with 7 decision nodes and 10 recommendation leaf nodes:
  - Root: "What is the primary structure of your content?"
    - "Spatial/Regional" → "Does the content have an underlying image?" → Yes: "Overlay Infographic" / No: "Geographic Map"
    - "Sequential/Temporal" → "Is it a process or a timeline?" → Process: "Flowchart/Process Diagram" / Timeline: "Timeline Infographic"
    - "Hierarchical/Networked" → "How many connections per item?" → Few (tree): "Mind Map" / Many (graph): "Network Graph"
    - "Comparative" → "How many items being compared?" → 2: "Before-After or Side-by-Side" / 3+: "Chart (Bar/Radar)"
    - "Decision/Conditional" → "Decision Tree Diagram"
    - "Narrative/Journey" → "Journey Map"
- Each node is a rounded rectangle; decision nodes are blue, recommendation nodes are green
- The current path is highlighted with thicker, darker edges
- Unvisited paths are shown at reduced opacity
- Each recommendation node displays a small thumbnail preview of that infographic type

**Interactive Controls:**
- Click answer options at each decision node to navigate down the tree
- Button: "Start Over" — returns to the root node
- Button: "Show Full Tree" — reveals the entire tree structure at once
- Toggle: "Show Examples" (default off) — displays example use cases alongside each recommendation
- Hover over any node to see a tooltip with additional context

**Behavior:**
- Clicking an answer animates the path to the next node with a smooth transition
- The detail panel updates to show the current question and available options
- Reaching a recommendation node displays: infographic type name, brief description, 2-3 example use cases, and a link to the relevant chapter section
- "Show Full Tree" renders all paths simultaneously for overview
- Responsive: tree layout adjusts to available width

**Default Parameters:**
- Tree starts at root node
- Show Examples: off
- Canvas width: responsive
- Canvas height: 550px

Implementation: p5.js with tree data structure and animated path navigation
</details>

### Mind Map

A **mind map** is a radial diagram that starts with a central concept and branches outward through related ideas, creating a visual representation of conceptual relationships. Mind maps are particularly effective for brainstorming, showing topic coverage, and helping students see how concepts connect to a central theme. Interactive mind maps allow students to expand and collapse branches, focusing on the areas most relevant to their learning needs.

### Journey Map

A **journey map** traces a person's experience through a process or system over time, documenting the steps, emotions, touchpoints, and pain points along the way. In educational contexts, journey maps are used to visualize learning paths, user workflows, or historical narratives. The sequential, human-centered nature of journey maps makes them excellent for building empathy and understanding complex processes from the user's perspective.

### Roadmap Diagram

A **roadmap diagram** presents a planned sequence of milestones, deliverables, or phases over time. Unlike timelines (which record past events), roadmaps are forward-looking — they communicate a plan or strategy. Roadmap diagrams are useful in educational settings for showing course progressions, curriculum development plans, or technology adoption strategies.

### Annotated Screenshot

An **annotated screenshot** is a captured screen image with overlay labels, arrows, callout boxes, or numbered indicators highlighting specific features or areas. Annotated screenshots are the simplest form of interactive infographic and are widely used in software documentation, tutorials, and how-to guides. When made interactive, hovering over each annotation reveals additional detail about the highlighted feature.

### Layered Infographic

A **layered infographic** presents multiple levels of information stacked on top of each other, with each layer revealing additional detail or a different perspective on the same subject. Layers can be toggled on and off, faded in and out, or revealed sequentially. This format is ideal for content that has natural hierarchical depth — for example, showing a geographic map at different scales, or a system architecture at different levels of abstraction.

| Diagram Type | Best For | Content Structure | Interaction Style |
|-------------|---------|-------------------|-------------------|
| **Before-After** | Showing change or impact | Two temporal states | Slider or toggle between states |
| **Side-by-Side** | Comparing alternatives | Parallel structures | Hover to highlight differences |
| **Decision Tree** | Guiding choices | Branching logic | Click to navigate paths |
| **Mind Map** | Showing concept relationships | Radial hierarchy | Click to expand/collapse branches |
| **Journey Map** | Tracing experiences | Sequential with emotions | Scroll or step through stages |
| **Roadmap** | Communicating plans | Sequential milestones | Hover for milestone details |
| **Annotated Screenshot** | Explaining interfaces | Spatial with callouts | Hover/click numbered indicators |
| **Layered Infographic** | Multi-level content | Stacked perspectives | Toggle layers on/off |

## Advanced Interaction Patterns

The interaction patterns covered so far — tooltips, hover highlights, click feedback — are the building blocks of interactivity. The patterns in this section combine those building blocks into sophisticated interaction experiences that enable students to explore complex, multi-layered content at their own pace.

### Scrollytelling

**Scrollytelling** is an interaction pattern where content transforms or reveals as the student scrolls down the page. Instead of a static infographic that shows everything at once, scrollytelling progressively reveals information, guiding the student through a narrative sequence. As the student scrolls, elements animate into view, labels appear, data transitions between states, and explanatory text aligns with the current visual state.

Scrollytelling is particularly effective for:

- Long-form educational narratives with visual accompaniment
- Data stories where the visualization changes as the story progresses
- Step-by-step explanations of complex processes
- Revealing cause-effect chains one link at a time

The key design principle for scrollytelling is **synchronization** — the visual transitions must align precisely with the scroll position so that text and visuals tell the same story at the same moment.

### Step Reveal

**Step reveal** is a simplified version of scrollytelling where content is revealed one discrete step at a time through button clicks (Next/Previous) rather than continuous scrolling. Step reveal gives students explicit control over pacing and is easier to implement than full scrollytelling because it uses discrete states rather than continuous scroll-position interpolation.

Step reveal is ideal for:

- Tutorials and guided walkthroughs
- Building complex diagrams one component at a time
- Explaining multi-step algorithms or processes
- Presenting information where each step requires comprehension before proceeding

### Zoom and Pan

**Zoom and pan** enables students to navigate large or detailed infographics by magnifying areas of interest and moving the viewport across the content. This pattern is essential for infographics that contain more detail than can be displayed clearly at a single zoom level — geographic maps, detailed architectural diagrams, and dense network visualizations.

Zoom and pan implementation considerations:

- **Scroll wheel or pinch** for zooming (with minimum and maximum zoom limits)
- **Click-and-drag** for panning the viewport
- **Zoom level indicator** showing the current magnification
- **Minimap** showing the overall infographic with a viewport rectangle indicating the current view
- **Reset button** to return to the default view
- **Level-of-detail rendering**: Show more labels, annotations, or data points as the student zooms in

### Drill Down

**Drill down** is an interaction pattern where clicking on an element navigates to a more detailed view of that element's content. Unlike zoom (which magnifies the same view), drill down transitions to a completely different view focused on the selected element. This pattern is common in hierarchical data — clicking a country on a world map might drill down to show that country's regions, and clicking a region might drill down to show its cities.

### Breadcrumb Navigation

**Breadcrumb navigation** is a secondary navigation element that shows the path from the top-level view to the current view, enabling students to understand where they are in a hierarchical structure and navigate back to any previous level. Breadcrumbs are essential companions to drill-down interactions — without breadcrumbs, students can become disoriented after several levels of drill-down.

A typical breadcrumb trail for a geographic drill-down might look like:

**World** > **North America** > **United States** > **California**

Each level in the breadcrumb is clickable, allowing the student to jump back to any higher level without retracing each step.

#### Diagram: Advanced Interaction Pattern Showcase

<iframe src="../../sims/advanced-interaction-showcase/main.html" width="100%" height="600px" scrolling="no"></iframe>

<details markdown="1">
<summary>Advanced Interaction Pattern Showcase</summary>
Type: microsim
**sim-id:** advanced-interaction-showcase<br/>
**Library:** p5.js<br/>
**Status:** Specified

**Bloom Level:** Analyze (L4)
**Bloom Verb:** Compare
**Learning Objective:** Compare four advanced interaction patterns (scrollytelling, step reveal, zoom-and-pan, drill-down with breadcrumbs) by experiencing each pattern applied to the same dataset, identifying the strengths and trade-offs of each approach for different content types.

**Instructional Rationale:** Experiencing the same content through four different interaction patterns is appropriate because the Analyze objective requires learners to compare approaches and identify when each is most effective. Side-by-side experience reveals the trade-offs that theoretical descriptions cannot convey.

**Canvas Layout:**
- Main area (aliceblue): a tabbed interface with 4 tabs, each demonstrating one interaction pattern using the same sample content (a 5-stage process: "How a Bill Becomes a Law")
- Below (white, silver border): comparison panel with pros/cons for the currently selected pattern

**Visual Elements:**
- **Tab 1: "Step Reveal"** — The 5-stage process shown as a horizontal flow; clicking "Next" reveals one stage at a time with an animated transition. A progress indicator shows "Stage 3 of 5"
- **Tab 2: "Scrollytelling"** — The 5 stages are revealed as the student scrolls within the panel; each stage's visual content transforms as scroll position changes
- **Tab 3: "Zoom & Pan"** — All 5 stages are shown in a large detailed diagram; the student zooms into each stage for detail and pans between them. A minimap in the corner shows the overall view
- **Tab 4: "Drill Down"** — The 5 stages are shown as clickable summary cards; clicking a card drills into a detailed view with breadcrumb navigation ("Overview > Stage 3: Committee Review")
- Each tab uses consistent visual language (same colors, fonts, icons) so that only the interaction pattern differs
- The comparison panel below updates to show: Pattern name, Best for, Limitations, Implementation complexity

**Interactive Controls:**
- Tab buttons to switch between the 4 patterns
- Each tab has its own internal controls:
  - Step Reveal: Next/Previous buttons, Jump to Stage dropdown
  - Scrollytelling: Scroll within the panel
  - Zoom & Pan: Mouse wheel to zoom, drag to pan, "Reset View" button
  - Drill Down: Click cards to drill in, click breadcrumbs to navigate back
- Toggle: "Show Pattern Comparison" (default off) — displays a side-by-side summary table of all 4 patterns

**Behavior:**
- Switching tabs preserves the position/state of each tab
- All 4 tabs show the same 5-stage content so the student can experience how each pattern handles identical information differently
- The comparison panel updates with contextual information for each tab
- Responsive: tabs remain functional at narrower widths

**Default Parameters:**
- Tab 1 (Step Reveal) selected
- Stage 1 visible
- Show Pattern Comparison: off
- Canvas width: responsive
- Canvas height: 550px

Implementation: p5.js with tabbed interface and four distinct interaction pattern implementations
</details>

!!! mascot-warning "Common Mistake"
    <img src="../../img/mascot/warning.png" class="mascot-admonition-img" alt="Percy warns you">
    A common mistake is choosing the most visually impressive interaction pattern instead of the one that best serves the learning objective. Scrollytelling looks dramatic, but it is overkill for a simple three-step process — step reveal would be clearer and easier to implement. Zoom-and-pan is powerful for detailed maps, but it adds unnecessary complexity to a small diagram with six elements. Always ask: "What does the student need to do with this content?" and let that answer guide your pattern selection.

## Putting It All Together: Design Principles in Practice

The principles and patterns covered in this chapter are most powerful when applied together. A well-designed interactive infographic uses:

- **Visual encoding** to map the most important data to the most perceptible channels
- **Color palettes** to create visual unity and convey meaning
- **Gestalt principles** to organize elements into coherent groups
- **Interaction patterns** (tooltips, hover highlights, click feedback) for responsive feedback
- **Accessibility features** to ensure universal access
- **Appropriate diagram types** matched to the content structure
- **Advanced interaction patterns** when content complexity demands them
- **Legend design** to explain visual conventions clearly

The optimistic reality is that you already have the technical skills to implement all of these patterns. The overlay patterns from Chapter 9, the JavaScript libraries from Chapter 8, and the MicroSim packaging from Chapter 10 provide the implementation foundation. This chapter has given you the design vocabulary and decision frameworks to use those tools with intention, clarity, and professional polish.

#### Diagram: Design Principles Synthesis Dashboard

<iframe src="../../sims/design-principles-dashboard/main.html" width="100%" height="600px" scrolling="no"></iframe>

<details markdown="1">
<summary>Design Principles Synthesis Dashboard</summary>
Type: microsim
**sim-id:** design-principles-dashboard<br/>
**Library:** p5.js<br/>
**Status:** Specified

**Bloom Level:** Create (L6)
**Bloom Verb:** Design
**Learning Objective:** Design an interactive infographic layout by selecting and combining design principles (visual encoding, Gestalt principles, color palette, interaction pattern, accessibility features) and evaluating the result against a quality rubric, producing a principled design specification.

**Instructional Rationale:** A design sandbox with integrated quality evaluation is appropriate because the Create objective requires learners to synthesize multiple design principles into a coherent whole. Building a layout and receiving automated feedback teaches design judgment through iteration.

**Canvas Layout:**
- Left panel (aliceblue, 60% width): a live preview canvas showing a sample infographic layout that updates as the student selects design options
- Right panel (white, silver border, 40% width): design configuration controls and quality score

**Visual Elements:**
- Left panel shows a sample infographic with 8 data elements that change appearance based on selected design options:
  - Elements are initially unstyled (uniform gray rectangles, no grouping, no hierarchy)
  - As the student makes design choices, the preview updates in real time
- Right panel contains 5 configuration sections:
  1. **Visual Encoding**: dropdown to select primary encoding (Position, Length, Color, Size) and secondary encoding
  2. **Gestalt Principles**: sliders for Proximity (spacing), Contrast (emphasis level), checkboxes for Alignment (grid snap) and Repetition (consistent styles)
  3. **Color Palette**: radio buttons for palette type (Sequential, Diverging, Categorical, Semantic), with a 5-color preview strip
  4. **Interaction Pattern**: radio buttons (Tooltip only, Hover + Click, Step Reveal, Drill Down)
  5. **Accessibility**: checkboxes (Alt text, Keyboard nav, ARIA labels, High contrast mode)
- A "Design Quality Score" at the top of the right panel (0-100) that updates based on how many principles are applied correctly
- A "Design Notes" area that provides specific feedback ("Consider: your primary encoding uses Color, but Position would be more accurate for this quantitative data")

**Interactive Controls:**
- All configuration controls update the preview immediately
- Button: "Auto-Optimize" — sets all controls to recommended values with animated transitions
- Button: "Reset to Unstyled" — returns to the initial unstyled state
- Button: "Export Specification" — copies a text description of the current design choices
- Toggle: "Show Quality Breakdown" — expands the score into sub-scores for each category

**Behavior:**
- Every control change immediately updates both the preview and the quality score
- Quality score rewards: appropriate encoding match, applied Gestalt principles, accessible color choices, implemented accessibility features, appropriate interaction pattern
- "Design Notes" provides actionable guidance, not just scores
- The preview demonstrates how the same 8 data elements look dramatically different when principles are applied well vs. poorly
- Responsive: panels stack vertically on narrow screens

**Default Parameters:**
- All options at defaults (unstyled preview, low quality score)
- Design Quality Score starts at 15/100 (baseline for having content at all)
- Canvas width: responsive
- Canvas height: 550px

Implementation: p5.js with real-time preview rendering and quality scoring algorithm
</details>

## Summary

!!! mascot-celebration "Excellent Work!"
    <img src="../../img/mascot/celebration.png" class="mascot-admonition-img" alt="Percy celebrates">
    You have now mastered the design principles and advanced patterns that distinguish professional interactive infographics from basic implementations. Every concept in this chapter — from visual encoding to Gestalt principles, from accessibility to scrollytelling — gives you another dimension of quality to bring to your work. The most exciting part? These principles are cumulative. Every infographic you create from this point forward benefits from this design knowledge, and the results will be noticeably more polished, more accessible, and more engaging. Display it with style!

In this chapter, you learned that:

- **Data visualization** reveals patterns through graphical representation, **information design** organizes all types of content for understanding, and **visual encoding** maps data attributes to visual channels (position, length, color, size, shape) with varying effectiveness
- **Color palettes** should be curated for semantic meaning, sufficient contrast, limited palette size, and interactive state variation, while **visual hierarchy** guides the viewer's eye through deliberate size, contrast, position, and whitespace decisions
- **Tooltips**, **hover highlights**, and **click feedback** are the fundamental interaction patterns that make infographics responsive and discoverable — every interactive element needs visible feedback
- **Legend design** transforms passive references into active exploration tools through proximity, direct labeling, and interactive filtering
- The four **Gestalt principles** — **proximity** (spacing controls grouping), **contrast** (difference attracts attention), **alignment** (common axes create order), and **repetition** (consistent patterns build coherence) — are practical design tools that directly improve infographic clarity
- **Image compression** reduces file sizes for web delivery, with **PNG format** best for lossless diagrams and text, and **WebP format** offering superior compression for most web images
- Accessibility features — **alt text**, **semantic HTML**, **ARIA attributes**, **keyboard navigation**, **tab order**, **screen reader support**, and **high contrast mode** — ensure that every student can benefit from your infographics regardless of ability
- Eight specialized diagram types (**before-after**, **side-by-side comparison**, **decision tree**, **mind map**, **journey map**, **roadmap**, **annotated screenshot**, **layered infographic**) each address specific content structures and learning objectives
- Advanced interaction patterns — **scrollytelling** (scroll-driven narrative), **step reveal** (discrete progression), **zoom and pan** (spatial navigation), **drill down** (hierarchical exploration), and **breadcrumb navigation** (orientation in hierarchies) — enable complex, multi-layered content to be presented without overwhelming students

## References

- [Wikipedia: Data Visualization](https://en.wikipedia.org/wiki/Data_and_information_visualization)
- [Wikipedia: Information Design](https://en.wikipedia.org/wiki/Information_design)
- [Wikipedia: Gestalt Psychology](https://en.wikipedia.org/wiki/Gestalt_psychology)
- [Wikipedia: Visual Hierarchy](https://en.wikipedia.org/wiki/Visual_hierarchy)
- [Wikipedia: Color Theory](https://en.wikipedia.org/wiki/Color_theory)
- [Wikipedia: Web Accessibility](https://en.wikipedia.org/wiki/Web_accessibility)
- [Wikipedia: WAI-ARIA](https://en.wikipedia.org/wiki/WAI-ARIA)
- [Wikipedia: Scrollytelling](https://en.wikipedia.org/wiki/Scrollytelling)
- [Wikipedia: Decision Tree](https://en.wikipedia.org/wiki/Decision_tree)
- [MDN Web Docs: ARIA](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA)
