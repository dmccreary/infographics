---
title: Presentation Slide Art Diagrams
description: A comprehensive survey of SmartArt-style diagram types used in presentations and educational materials, from list and process diagrams to cycles, hierarchies, relationships, pyramids, funnels, and picture layouts.
generated_by: claude skill chapter-content-generator
date: 2026-03-13 18:25:50
version: 0.05
---

# Presentation Slide Art Diagrams

## Summary

This chapter surveys the full range of SmartArt-style diagram types commonly found in presentation software and educational materials. You will explore list diagrams, process flows, cycle diagrams, hierarchies, relationship diagrams, pyramids, funnels, matrices, and picture-based layouts. Understanding these standard diagram patterns gives you a vocabulary of visual templates that can be transformed into interactive infographics for intelligent textbooks.

## Concepts Covered

This chapter covers the following 30 concepts from the learning graph:

1. List Diagram
2. Block List
3. Bullet List
4. Picture List
5. Grid List
6. Process Diagram
7. Process Arrows
8. Chevron Process
9. Timeline Diagram
10. Gear Process
11. Step Up Process
12. Cycle Diagram
13. Basic Cycle
14. Radial Cycle
15. Gear Cycle
16. Nested Cycle
17. Continuous Cycle
18. Hierarchy Diagram
19. Organization Chart
20. Table Hierarchy
21. Labeled Hierarchy
22. Relationship Diagram
23. Venn Diagram
24. Target Diagram
25. Radial Diagram
26. Matrix Diagram
27. Pyramid Diagram
28. Funnel Diagram
29. Picture Diagram
30. SmartArt Categories

## Prerequisites

This chapter builds on concepts from:

- [Chapter 1: Foundations of Interactive Infographics](../01-foundations-of-interactive-infographics/index.md)
- [Chapter 2: Infographic Taxonomy and Classification](../02-infographic-taxonomy-and-classification/index.md)

---

!!! mascot-welcome "Let's Make It Visual!"
    <img src="../../img/mascot/welcome.png" class="mascot-admonition-img" alt="Percy welcomes you">
    Welcome back, designers! This chapter is your visual vocabulary builder.
    We're going to tour every major diagram type you've seen in presentation
    slides — and learn how to make each one interactive. Let's spread some knowledge!

## From Static Slides to Interactive Infographics

If you have ever opened PowerPoint, Google Slides, or Keynote and clicked the "SmartArt" or "Diagram" button, you have already encountered the diagram types covered in this chapter. Presentation software organizes these diagrams into categories — lists, processes, cycles, hierarchies, relationships, pyramids, matrices, and picture layouts — and offers dozens of pre-built templates within each category.

These **SmartArt categories** represent a well-established visual vocabulary. Millions of educators, business professionals, and students use them daily to communicate ideas in slides. The patterns are instantly recognizable: a set of chevron arrows means "this is a process," a circle of connected nodes means "this is a cycle," and a tree structure means "this is a hierarchy."

For interactive infographic designers, this shared vocabulary is a powerful starting point. Every static SmartArt diagram can be transformed into an interactive infographic by adding hover-activated descriptions, click-to-expand details, animated transitions between states, or quiz modes that test comprehension. The visual pattern stays familiar — what changes is the depth of engagement.

This chapter surveys all eight SmartArt categories and their subtypes. For each, you will learn what information structure it represents, when to use it, and how it can be enhanced with interactivity.

| SmartArt Category | What It Shows | Subtypes Covered |
|-------------------|--------------|-----------------|
| **List** | Collections of items, no implied order | Block, Bullet, Picture, Grid |
| **Process** | Sequential steps with direction | Arrows, Chevron, Timeline, Gear, Step Up |
| **Cycle** | Repeating or continuous processes | Basic, Radial, Gear, Nested, Continuous |
| **Hierarchy** | Parent-child relationships | Org Chart, Table, Labeled |
| **Relationship** | Connections and overlaps between items | Venn, Target, Radial, Matrix |
| **Pyramid** | Layered importance or quantity | Pyramid, Funnel |
| **Picture** | Image-centric layouts | Picture Diagram |

#### Diagram: SmartArt Category Gallery

<iframe src="../../sims/smartart-category-gallery/main.html" width="100%" height="550px" scrolling="no"></iframe>

<details markdown="1">
<summary>SmartArt Category Gallery</summary>
Type: diagram
**sim-id:** smartart-category-gallery<br/>
**Library:** p5.js<br/>
**Status:** Specified

**Bloom Level:** Remember (L1)
**Bloom Verb:** Identify
**Learning Objective:** Identify the eight SmartArt categories by their visual thumbnail and name, building recognition of the standard diagram vocabulary.

Instructional Rationale: A visual gallery with miniature renderings of each category provides instant pattern recognition. Clicking a category reveals its definition and subtypes, connecting the visual to the vocabulary without overwhelming the initial view.

Visual elements:
- Eight thumbnail cards arranged in a 4x2 grid (responsive: 2x4 on narrow screens)
- Each card contains:
  - A miniature visual representation of the category drawn with p5.js shapes:
    - List: Four horizontal bars stacked vertically
    - Process: Three boxes connected by right-pointing arrows
    - Cycle: Four nodes in a circle with clockwise arrows
    - Hierarchy: A tree with root and two levels of children
    - Relationship: Three overlapping circles (Venn)
    - Pyramid: A triangle divided into horizontal layers
    - Matrix: A 2x2 grid of colored squares
    - Picture: A rectangle with a small image icon and text lines
  - The category name below each thumbnail
- A detail panel below the grid showing the selected category's description and list of subtypes
- Default state: "Click a category to explore its diagram types."

Color scheme:
- List: blue (#4285F4)
- Process: orange (#FB8C00)
- Cycle: green (#34A853)
- Hierarchy: purple (#8E44AD)
- Relationship: teal (#00897B)
- Pyramid: red (#E53935)
- Matrix: indigo (#3F51B5)
- Picture: amber (#FFB300)

Interactive features:
- Hover over a card to highlight its border and show the category name as tooltip
- Click a card to select it and populate the detail panel with description + subtypes
- Click again or click another card to change selection

Canvas layout: Width-responsive, aliceblue background, minimum 600px width
</details>

## List Diagrams

A **list diagram** displays a collection of items without implying any particular order, sequence, or hierarchy. Lists are the simplest and most common diagram type — and also the most underestimated. When designed well, a list diagram makes a set of items scannable, memorable, and visually engaging in ways that plain bullet points cannot.

List diagrams are appropriate when:

- You need to present a set of features, characteristics, or components
- The items are of equal importance (no implied ranking)
- You want visual distinctness without implying relationships between items

### Block List

A **block list** presents each item as a distinct rectangular block, typically with a bold heading and a brief description. Blocks are usually arranged vertically or in a grid. The visual weight of each block signals that every item deserves equal attention.

Block lists are effective for feature overviews, chapter summaries, and glossary-style layouts where each item has a title and a short explanation. In an interactive context, each block can expand on click to reveal additional detail.

### Bullet List

A **bullet list** is the most familiar diagram type — a vertical stack of items preceded by bullet markers. While visually simple, bullet lists gain interactivity when each bullet becomes a clickable element that reveals a definition, example, or related image.

The key design consideration for interactive bullet lists is progressive disclosure: show the bullet text by default, and reveal deeper content on interaction. This pattern works well for vocabulary lists, requirement enumerations, and checklists.

### Picture List

A **picture list** pairs each item with a representative image or icon. The image provides a visual anchor that aids recognition and recall. Picture lists are particularly effective in educational contexts where visual association strengthens memory — for example, a list of laboratory equipment where each item's icon helps students recognize it in the lab.

### Grid List

A **grid list** arranges items in a two-dimensional matrix of equal-sized cells, typically 2×2, 3×3, or 4×4. Unlike a table (which implies rows and columns with meaning), a grid list is simply a space-efficient arrangement of items that wraps to fill available width.

Grid lists are ideal when you have many items of similar importance and want to maximize screen real estate. In interactive infographics, grid cells can highlight on hover and expand on click to show detail.

| List Subtype | Visual Pattern | Best For | Interactive Enhancement |
|-------------|---------------|----------|----------------------|
| Block List | Rectangular blocks with titles | Feature overviews, summaries | Click to expand details |
| Bullet List | Vertical stack with markers | Vocabulary, requirements | Click to reveal definitions |
| Picture List | Items paired with icons/images | Equipment, vocabulary with visuals | Hover for description, click for detail |
| Grid List | 2D grid of equal cells | Large item sets, catalogs | Hover highlight, click to expand |

## Process Diagrams

A **process diagram** represents a sequence of steps that must be followed in order. Unlike list diagrams, process diagrams carry directional information — arrows, chevrons, or visual flow indicate which step comes first and which comes next. Process diagrams map to the **linear format** from the taxonomy in Chapter 2.

Process diagrams are appropriate when:

- The content has a defined starting point and endpoint
- Steps must be performed in sequence
- You want to show how inputs transform into outputs through a series of stages

### Process Arrows

**Process arrows** are the simplest process diagram: a horizontal or vertical sequence of boxes connected by arrows. Each box represents a step, and each arrow represents the transition from one step to the next. Process arrows are the default choice for any sequential workflow that is straightforward and has no branching.

### Chevron Process

A **chevron process** replaces boxes and arrows with interlocking chevron shapes — pointed arrows that nest into each other. The visual effect is a strong sense of forward momentum. Chevron processes are widely used in business presentations for sales pipelines, project phases, and decision funnels.

The interlocking shape also communicates that each stage feeds directly into the next, with no gaps. This makes chevrons particularly effective for processes where the output of one stage is the input of the next.

### Timeline Diagram

A **timeline diagram** is a specialized process diagram where the horizontal axis represents time. Events or milestones are placed at their chronological positions along the axis. Timelines can be linear (a single line from past to future) or branching (multiple parallel tracks showing concurrent events).

Timelines are essential for historical content, project planning, and any subject where temporal sequence matters. Interactive timelines add tremendous value — hovering over an event reveals details, and zooming allows navigation across different time scales.

### Gear Process

A **gear process** uses interlocking gear icons to represent stages that drive each other mechanically. The visual metaphor communicates that each stage's output powers the next stage's input — a stronger claim than simple arrows. Gear processes are effective for mechanical systems, manufacturing processes, and any workflow where the interdependence of stages is the key message.

### Step Up Process

A **step up process** arranges stages as ascending steps — like a staircase going upward from left to right. The ascending visual metaphor communicates progressive improvement, increasing complexity, or growing capability. Step up processes are widely used for maturity models, skill progression ladders, and leveled frameworks.

!!! mascot-thinking "Key Insight"
    <img src="../../img/mascot/thinking.png" class="mascot-admonition-img" alt="Percy is thinking">
    The visual metaphor of your process diagram communicates as much as
    the content itself. Arrows suggest simple sequence, chevrons suggest
    momentum, gears suggest mechanical interdependence, and steps suggest
    progressive growth. Choose the metaphor that matches your message.

| Process Subtype | Visual Metaphor | Best For | Interactive Enhancement |
|----------------|----------------|----------|----------------------|
| Process Arrows | Boxes → Arrows → Boxes | Simple sequential workflows | Step-through animation |
| Chevron Process | Interlocking pointed shapes | Pipelines, phases with momentum | Hover for stage details |
| Timeline Diagram | Horizontal time axis with events | Historical content, project plans | Zoom, hover for event details |
| Gear Process | Interlocking gear icons | Mechanically interdependent stages | Click to see input/output |
| Step Up Process | Ascending staircase | Maturity models, skill ladders | Click a step to see requirements |

#### Diagram: Process Diagram Variants

<iframe src="../../sims/process-diagram-variants/main.html" width="100%" height="550px" scrolling="no"></iframe>

<details markdown="1">
<summary>Process Diagram Variants</summary>
Type: diagram
**sim-id:** process-diagram-variants<br/>
**Library:** p5.js<br/>
**Status:** Specified

**Bloom Level:** Understand (L2)
**Bloom Verb:** Compare
**Learning Objective:** Compare the five process diagram subtypes by viewing their visual renderings side by side and explaining how each visual metaphor communicates a different relationship between stages.

Instructional Rationale: Placing all five process subtypes side by side allows learners to directly compare their visual structures. Clicking a subtype reveals its definition and use cases, making the comparison active rather than passive.

Visual elements:
- Five miniature process diagrams arranged horizontally (or 2 rows on narrow screens):
  1. Process Arrows: 3 blue boxes connected by gray arrows, left to right
  2. Chevron Process: 4 interlocking orange chevron shapes
  3. Timeline: A horizontal gray line with 4 circular event markers above and below it, dates underneath
  4. Gear Process: 3 interlocking green gear icons
  5. Step Up: 4 ascending rectangular steps in purple, staircase going upper right
- Each diagram is labeled with its subtype name
- Below, a detail panel shows the selected subtype's description, best use cases, and an example scenario
- Default: "Click a diagram type to learn when to use it."

Interactive features:
- Hover highlights the diagram thumbnail with a glowing border
- Click selects a subtype and populates the detail panel
- The detail panel includes: Name, Visual Metaphor, Best For, Example Scenario

Canvas layout: Width-responsive, aliceblue background, minimum 600px
Color scheme: Blue (arrows), orange (chevron), teal (timeline), green (gear), purple (step up)
</details>

## Cycle Diagrams

A **cycle diagram** represents a process that repeats — there is no final step because the sequence loops back to the beginning. Cycle diagrams map to the **circular format** from the taxonomy in Chapter 2. They are essential for any content involving feedback, iteration, or natural cycles.

Cycle diagrams are appropriate when:

- A process repeats continuously (e.g., the water cycle, agile sprints)
- The emphasis is on the *return* to the starting point
- No single step is more important than the others

### Basic Cycle

A **basic cycle** is the simplest circular diagram: nodes arranged in a circle with arrows pointing clockwise from each node to the next. The last node connects back to the first, completing the loop. Basic cycles are used for any repeating process with distinct, equally weighted stages.

Examples include the Plan-Do-Check-Act (PDCA) cycle, the scientific method (observe → hypothesize → experiment → analyze → repeat), and biological cycles like the Krebs cycle.

#### Example: The AI Flywheel

The AI Flywheel is a classic basic cycle infographic. It arranges four equally weighted stages — **Data**, **Model**, **Prediction**, and **Feedback** — in a circle with clockwise arrows connecting each stage to the next. No single stage dominates; the power of the diagram comes from showing that the last stage (Feedback) loops back to the first (Data), creating a self-reinforcing process. This is exactly the structural pattern that makes basic cycles effective: the viewer immediately understands that the process repeats and that each revolution strengthens the system.

#### Diagram: The AI Flywheel

<iframe src="../../sims/ai-flywheel/main.html" height="470" width="100%" scrolling="no"></iframe>

[View AI Flywheel Fullscreen](../../sims/ai-flywheel/main.html)

Hover over each node to see how data feeds into model training, models generate predictions, predictions produce user feedback, and feedback provides new data — completing the cycle. Notice that the diagram uses four distinct colors to visually separate the stages while the uniform circular layout communicates that all four stages carry equal weight in the process.

### Radial Cycle

A **radial cycle** combines the circular and radial formats: a central hub connected to peripheral nodes that also connect to each other in sequence. The central hub represents the core concept or driver that powers the cycle. Radial cycles are effective when one concept is central to the repeating process.

### Gear Cycle

A **gear cycle** uses interlocking gear icons arranged in a circle. Like the gear process, the visual metaphor emphasizes mechanical interdependence — but in a cycle, the gears turn each other continuously. Gear cycles are effective for mechanical systems, supply chains, and any process where each stage both depends on and drives its neighbors.

### Nested Cycle

A **nested cycle** places one cycle inside another — concentric rings where the inner cycle operates within the context of the outer cycle. Nested cycles are effective for showing multiple levels of iteration, such as daily sprints nested within weekly releases nested within quarterly roadmaps.

### Continuous Cycle

A **continuous cycle** uses a single flowing path — often a Möbius strip or infinity symbol — rather than discrete nodes. The visual effect emphasizes that the process is truly continuous, with no distinct stopping points. Continuous cycles work well for abstract concepts like continuous improvement, lifelong learning, or perpetual feedback.

| Cycle Subtype | Visual Pattern | Key Message | Example |
|--------------|---------------|-------------|---------|
| Basic Cycle | Nodes in a circle with arrows | Equal stages, repeating process | PDCA cycle |
| Radial Cycle | Hub + peripheral nodes in circle | One central driver | Customer feedback driving product iteration |
| Gear Cycle | Interlocking gears in a circle | Mechanical interdependence | Supply chain stages |
| Nested Cycle | Concentric circles | Multi-level iteration | Sprint → Release → Roadmap |
| Continuous Cycle | Flowing loop (Möbius, infinity) | Truly continuous, no discrete stops | Continuous improvement |

#### Diagram: Interactive Cycle Builder

<iframe src="../../sims/interactive-cycle-builder/main.html" width="100%" height="600px" scrolling="no"></iframe>

<details markdown="1">
<summary>Interactive Cycle Builder</summary>
Type: microsim
**sim-id:** interactive-cycle-builder<br/>
**Library:** p5.js<br/>
**Status:** Specified

**Bloom Level:** Apply (L3)
**Bloom Verb:** Construct
**Learning Objective:** Construct a basic cycle diagram by adding labeled nodes and connecting them in sequence, demonstrating understanding of cycle structure.

Instructional Rationale: An Apply-level activity requires learners to use their knowledge of cycle diagrams to build one. By adding nodes and labels interactively, learners internalize the structural rules (circular layout, directional arrows, return to start) through direct manipulation.

Visual elements:
- A circular drawing area where nodes appear around an invisible circle
- A text input field at the bottom for entering node labels
- An "Add Node" button that places the next node at the correct position on the circle
- Nodes appear as colored circles with the entered label text inside
- Arrows automatically connect each node to the next in clockwise order
- When 3+ nodes exist, a dashed arrow connects the last node back to the first, completing the cycle
- A "Clear" button resets the diagram
- A counter showing "Nodes: 4 of 8 max"

Default state:
- Empty circle outline with instruction text: "Type a label and click Add Node to build your cycle diagram."
- Pre-populated example labels appear as placeholder text in the input: "Plan", "Do", "Check", "Act"

Interactive features:
- Type a label in the text input and press Enter or click "Add Node"
- Nodes appear sequentially around the circle at equally-spaced positions
- Hover over a node to see it highlighted
- Click a node to select it and edit its label
- Maximum 8 nodes (enough for most cycle diagrams)
- Arrows animate into place when a new node is added

Canvas layout: Width-responsive, aliceblue drawing region (500px height), white control region with input field and buttons (50px)
Color scheme: Blue nodes, orange arrows, green completion arrow (last-to-first)
</details>

## Hierarchy Diagrams

A **hierarchy diagram** represents parent-child relationships where elements are organized in levels of increasing specificity or decreasing authority. Hierarchy diagrams map to the **hierarchical format** from the taxonomy in Chapter 2.

Hierarchy diagrams are appropriate when:

- Elements have clear reporting, containment, or classification relationships
- There is a single root element at the top
- Each element belongs to exactly one parent (a tree, not a graph)

### Organization Chart

An **organization chart** is the most familiar hierarchy diagram — a tree showing people, roles, or departments and their reporting relationships. The CEO sits at the top, vice presidents on the next level, directors below them, and so on. Organization charts are used in any context with formal authority structures.

Interactive organization charts add significant value: clicking a node reveals the person's title, responsibilities, and contact information. Expand/collapse controls allow navigation through large organizations without overwhelming the viewer.

### Table Hierarchy

A **table hierarchy** combines the tree structure of a hierarchy with the tabular layout of a spreadsheet. Each level of the hierarchy is represented as a row or column in a table, with indentation or grouping showing parent-child relationships. Table hierarchies are effective when each node has multiple attributes that need to be visible simultaneously.

For example, a course curriculum hierarchy might show departments (level 1), programs (level 2), and courses (level 3), with columns for credit hours, enrollment, and instructor for each entry.

### Labeled Hierarchy

A **labeled hierarchy** adds descriptive annotations to the connections between levels. Where a standard hierarchy shows only the parent-child relationship, a labeled hierarchy explains *what kind* of relationship exists. For example, a biological classification might label the levels as Kingdom → Phylum → Class → Order → Family → Genus → Species.

Labeled hierarchies are particularly valuable in educational contexts because the labels teach the vocabulary of the classification system itself — not just the items being classified.

## Relationship Diagrams

A **relationship diagram** shows how items connect, overlap, or relate to each other without implying hierarchy or sequence. Relationship diagrams are the most diverse category, encompassing set overlaps, concentric targets, radial connections, and two-dimensional matrices.

### Venn Diagram

<iframe src="../../sims/microsim-uniqueness/main.html" width="100%" height="460px" scrolling="no"></iframe>
[Run the MicroSim Uniqueness Fullscreen](../../sims/microsim-uniqueness/main.html)

A **Venn diagram** uses overlapping circles to show the relationships between sets. Items in the overlap regions belong to multiple sets simultaneously. Venn diagrams are effective for comparing 2-4 categories and highlighting what they share.

Interactive Venn diagrams become powerful learning tools when learners can click on overlap regions to see specific examples of items that belong to multiple categories. For instance, a Venn diagram comparing "Educational Infographics" and "Analytical Infographics" might show "Data-driven concept explanations" in the overlap.

### Target Diagram

A **target diagram** uses concentric circles — like an archery target — to show importance, priority, or proximity to a central concept. The innermost circle represents the most important or most central element, and each outer ring represents decreasingly important elements.

Target diagrams are effective for stakeholder analysis (core team at center, peripheral stakeholders in outer rings), priority frameworks, and any concept where proximity to a center carries meaning.

### Radial Diagram

A **radial diagram** places one concept at the center and connects it to surrounding concepts with spokes. Unlike a radial cycle (which also connects the outer nodes to each other), a radial diagram only shows hub-to-spoke connections. Radial diagrams are effective for showing the components, features, or aspects of a central concept.

### Matrix Diagram

A **matrix diagram** organizes items along two dimensions, creating a grid where each cell represents the intersection of a row value and a column value. The most familiar example is the 2×2 priority matrix (urgent/not urgent × important/not important), but matrices can be any size.

Interactive matrix diagrams become particularly powerful when each cell can be clicked to reveal details, examples, or recommendations specific to that intersection. A design decision matrix might have "Audience Type" on one axis and "Content Complexity" on the other, with each cell containing recommended diagram types.

| Relationship Subtype | Visual Pattern | Best For | Interactive Enhancement |
|---------------------|---------------|----------|----------------------|
| Venn Diagram | Overlapping circles | Set comparisons, shared attributes | Click overlaps for examples |
| Target Diagram | Concentric rings | Priority, centrality, proximity | Hover rings for descriptions |
| Radial Diagram | Hub with spokes | Components of a central concept | Click spokes for details |
| Matrix Diagram | 2D grid | Two-dimensional classification | Click cells for recommendations |

!!! mascot-thinking "Key Insight"
    <img src="../../img/mascot/thinking.png" class="mascot-admonition-img" alt="Percy is thinking">
    A matrix diagram is one of the most powerful interactive patterns
    because it combines two classification dimensions into a single view.
    In Chapter 2 we discussed multi-dimensional classification — a matrix
    diagram is the visual embodiment of that concept.

#### Diagram: Relationship Diagram Explorer

<iframe src="../../sims/relationship-diagram-explorer/main.html" width="100%" height="550px" scrolling="no"></iframe>

<details markdown="1">
<summary>Relationship Diagram Explorer</summary>
Type: diagram
**sim-id:** relationship-diagram-explorer<br/>
**Library:** p5.js<br/>
**Status:** Specified

**Bloom Level:** Understand (L2)
**Bloom Verb:** Distinguish
**Learning Objective:** Distinguish between the four relationship diagram subtypes (Venn, Target, Radial, Matrix) by examining their visual structures and identifying which information patterns each represents.

Instructional Rationale: Learners often confuse relationship subtypes because they all show "connections." Presenting all four rendered side by side with interactive exploration forces learners to identify the structural differences — overlapping sets vs. concentric rings vs. hub-and-spoke vs. grid.

Visual elements:
- Four diagram thumbnails arranged in a 2x2 grid:
  1. Venn: Three overlapping colored circles (blue, green, orange) with labels "A", "B", "C" and overlap regions shaded
  2. Target: Four concentric circles (red center, orange, yellow, light gray outer) with labels "Core", "Inner", "Middle", "Outer"
  3. Radial: A central teal circle labeled "Hub" with 5 gray circles connected by lines
  4. Matrix: A 3x3 grid with colored cells, row and column headers
- Below the grid, a detail panel showing:
  - Subtype name and description
  - "Shows:" — what information structure it represents
  - "Best for:" — recommended use cases
  - "Interactive pattern:" — how to add interactivity
- Default: "Click a diagram to learn about its information pattern."

Interactive features:
- Hover over a thumbnail to see its name tooltip and border highlight
- Click a thumbnail to select it and display details below
- Within each thumbnail, subtle hover effects show the interactive potential (e.g., Venn overlap regions highlight on hover)

Canvas layout: Width-responsive, aliceblue background, minimum 600px
Color scheme: Venn (blue/green/orange), Target (red-to-gray gradient), Radial (teal hub, gray spokes), Matrix (indigo cells)
</details>

## Pyramid and Funnel Diagrams

Pyramids and funnels are closely related — both use a tapered shape to communicate that quantity or breadth changes across levels. The direction of the taper determines the message.

### Pyramid Diagram

A **pyramid diagram** uses a triangle divided into horizontal layers, with the widest layer at the bottom and the narrowest at the top. Pyramids communicate that each level builds on the one below it and that higher levels are narrower, rarer, or more advanced.

The most famous pyramid in education is Bloom's Taxonomy, where "Remember" forms the wide base and "Create" sits at the narrow apex. Other examples include Maslow's hierarchy of needs, the food pyramid, and organizational authority structures.

Interactive pyramids gain power when each layer can be clicked to reveal its definition, examples, and relationship to adjacent layers. For Bloom's Taxonomy, clicking the "Analyze" layer might show sample verbs (compare, differentiate, examine) and example learning objectives at that level.

### Funnel Diagram

A **funnel diagram** inverts the pyramid — the wide opening is at the top and the narrow output is at the bottom. Funnels communicate that quantity decreases through filtering, selection, or conversion at each stage. The classic example is the sales funnel: many leads enter at the top, fewer become qualified prospects, fewer still become opportunities, and only some convert to customers.

In educational contexts, funnels can represent assessment funnels (many students attempt → fewer pass → fewer achieve mastery), research funnels (many sources → filtered by relevance → critically evaluated → cited), and content curation workflows.

| Diagram Type | Taper Direction | Key Message | Classic Example |
|-------------|----------------|-------------|-----------------|
| Pyramid | Wide bottom, narrow top | Higher levels are rarer/more advanced | Bloom's Taxonomy |
| Funnel | Wide top, narrow bottom | Quantity decreases through stages | Sales funnel |

## Picture Diagrams

A **picture diagram** uses images — photographs, illustrations, or icons — as the primary visual elements, with text playing a supporting role. Where other diagram types use geometric shapes (boxes, circles, arrows) to carry meaning, picture diagrams rely on the communicative power of imagery.

Picture diagrams are especially effective when:

- The subject matter has strong visual associations (anatomy, geography, architecture)
- The audience is visually oriented or has limited reading proficiency
- Recognition and recall are key learning objectives
- The diagram needs to feel less abstract and more concrete

In the interactive infographic context, picture diagrams are the foundation of the overlayment patterns you will learn in Chapter 6. The animal cell diagram from Chapter 1 is a picture diagram — a photograph or illustration of a cell with interactive overlay regions that respond to hover and click events.

Interactive picture diagrams combine the immediate recognition of imagery with the depth of on-demand text, creating a learning experience that is simultaneously intuitive and information-rich.

## Choosing the Right Diagram Type

With eight categories and over two dozen subtypes, selecting the right diagram type can feel overwhelming. The following decision framework maps your content's information structure to the best-fit diagram category.

| Your Information Structure | Best Category | Recommended Subtype |
|---------------------------|--------------|-------------------|
| A set of items with no order | List | Block (few items), Grid (many items) |
| Steps in sequence | Process | Arrows (simple), Chevron (momentum), Timeline (dates) |
| A repeating process | Cycle | Basic (equal stages), Nested (multi-level) |
| Parent-child relationships | Hierarchy | Org Chart (people), Table (data), Labeled (classification) |
| Overlapping categories | Relationship | Venn (2-4 sets) |
| Priority or centrality | Relationship | Target (concentric) |
| Components of a concept | Relationship | Radial (hub-and-spoke) |
| Two-dimensional classification | Relationship | Matrix (grid) |
| Layered levels building upward | Pyramid | Pyramid |
| Filtering or narrowing | Funnel | Funnel |
| Image-centric content | Picture | Picture Diagram |

!!! mascot-tip "Percy's Tip"
    <img src="../../img/mascot/tip.png" class="mascot-admonition-img" alt="Percy shares a tip">
    When in doubt, start with the simplest subtype in the matching category.
    You can always add complexity later, but starting complex often leads
    to cluttered, confusing diagrams. A basic cycle is better than a gear
    cycle if the mechanical metaphor doesn't add meaning.

#### Diagram: Diagram Type Decision Tool

<iframe src="../../sims/diagram-type-decision-tool/main.html" width="100%" height="600px" scrolling="no"></iframe>

<details markdown="1">
<summary>Diagram Type Decision Tool</summary>
Type: microsim
**sim-id:** diagram-type-decision-tool<br/>
**Library:** p5.js<br/>
**Status:** Specified

**Bloom Level:** Apply (L3)
**Bloom Verb:** Use
**Learning Objective:** Use the diagram type decision framework to select the best SmartArt category and subtype for a given content scenario.

Instructional Rationale: An Apply-level decision tool presents learners with content scenarios and asks them to select the best diagram type. This bridges the gap between knowing diagram types in the abstract and applying that knowledge to real design decisions.

Visual elements:
- A scenario panel at the top showing a content design scenario (3-4 sentences describing the information to be visualized)
- A two-step selection area below:
  - Step 1: "Select Category" — eight category buttons in a row (List, Process, Cycle, Hierarchy, Relationship, Pyramid, Funnel, Picture), each with a small icon
  - Step 2: "Select Subtype" — appears after Step 1, showing only the subtypes for the selected category
- A "Check" button that evaluates the selection
- A feedback panel showing:
  - Correct: Green check with "Excellent! [Explanation of why this is the best choice]"
  - Incorrect: Orange message with "Consider: [Hint about the information structure] Try again!"
- A score and progress tracker: "Scenario 3 of 8 — Score: 2/2"

Interactive features:
- Click a category button to select it (highlighted state) — subtypes appear
- Click a subtype button to refine the selection
- Click "Check" to evaluate
- Click "Next" to advance to the next scenario
- 8 scenarios loaded from data.json

Data (store in data.json):
- Array of scenario objects with: description, correctCategory, correctSubtype, explanation, hint
- Example: "A biology teacher wants to show how the four stages of mitosis follow each other in an unbroken sequence that repeats with every cell division." → Cycle, Basic Cycle

Canvas layout: Width-responsive, aliceblue background, minimum 600px width
Color scheme: Category buttons match the gallery colors; feedback uses green (correct) and orange (try again)
</details>

## Transforming Static Diagrams into Interactive Infographics

Every diagram type in this chapter can be enhanced with interactivity. The transformation follows a consistent pattern:

1. **Start with the static layout** — the spatial arrangement that communicates the information structure
2. **Add hover behavior** — tooltips or highlights that provide additional context without cluttering the default view
3. **Add click behavior** — expanded detail panels, zoom effects, or navigation to related content
4. **Add progressive disclosure** — show the simplest view by default, reveal complexity on demand
5. **Consider quiz mode** — transform the informational diagram into an assessment where learners must identify, label, or classify elements

This transformation pattern applies regardless of the specific diagram type. A process arrow diagram and a Venn diagram have very different spatial layouts, but both can follow the same interactive enhancement progression: static → hover → click → progressive disclosure → quiz.

In Chapter 6, you will learn the specific overlay patterns (rectangular regions, polygon regions, callout points) that implement these interactions. In Chapter 7, you will learn the JavaScript libraries that render them. For now, the key insight is that every static SmartArt pattern is a starting point, not an endpoint.

!!! mascot-warning "Common Mistake"
    <img src="../../img/mascot/warning.png" class="mascot-admonition-img" alt="Percy warns you">
    Don't add interactivity for its own sake. Every hover, click, and
    animation should serve the learning objective. A gear cycle that
    animates spinning gears looks impressive but teaches nothing if the
    animation doesn't reveal how stages depend on each other.

#### Diagram: SmartArt Category Matching Quiz

<iframe src="../../sims/smartart-category-quiz/main.html" width="100%" height="550px" scrolling="no"></iframe>

<details markdown="1">
<summary>SmartArt Category Matching Quiz</summary>
Type: microsim
**sim-id:** smartart-category-quiz<br/>
**Library:** p5.js<br/>
**Status:** Specified

**Bloom Level:** Remember (L1)
**Bloom Verb:** Identify
**Learning Objective:** Identify the correct SmartArt category for a given diagram description by matching descriptions to category names.

Instructional Rationale: A matching quiz at the Remember level reinforces the vocabulary introduced throughout the chapter. By presenting brief descriptions and asking learners to select the correct category, this MicroSim tests recognition of the eight SmartArt categories and their defining characteristics.

Visual elements:
- A description card at the top showing a brief characterization of a diagram type (1-2 sentences)
- Eight category buttons arranged in two rows of four below the card:
  - Row 1: List, Process, Cycle, Hierarchy
  - Row 2: Relationship, Pyramid, Funnel, Picture
  - Each button has the category name and a small icon matching the gallery
- Feedback area below buttons showing correct/incorrect with brief explanation
- Score tracker: "8 of 12 correct"
- Progress bar showing completion

Data (store in data.json):
- 12 description-category pairs
- Example: "A triangle divided into horizontal layers where the base is the broadest and the top is the narrowest, showing that higher levels are rarer." → Pyramid
- Example: "Items arranged in a circle with arrows pointing clockwise from each item to the next, looping back to the start." → Cycle
- Example: "A central concept connected by spokes to five surrounding concepts." → Relationship (Radial Diagram)

Interactive features:
- Click a category button to submit answer
- Immediate feedback with correct answer highlighted in green
- If wrong, the selected button flashes red and the correct one highlights green
- Auto-advance to next question after 2 seconds
- Final score screen with percentage and option to retry

Canvas layout: Width-responsive, aliceblue background, minimum 600px width
Color scheme: Category buttons use the same color scheme as the gallery for consistency
</details>

## Summary and Key Takeaways

!!! mascot-celebration "Excellent Work!"
    <img src="../../img/mascot/celebration.png" class="mascot-admonition-img" alt="Percy celebrates">
    You've just completed your tour of every major SmartArt diagram
    category! You now have a visual vocabulary of over two dozen diagram
    patterns — and you know how to transform each one from a static slide
    element into an interactive learning experience. Display it with style!

In this chapter you explored the eight **SmartArt categories** and their subtypes:

1. **List Diagrams** — Block, Bullet, Picture, and Grid lists for unordered collections
2. **Process Diagrams** — Arrows, Chevron, Timeline, Gear, and Step Up processes for sequential workflows
3. **Cycle Diagrams** — Basic, Radial, Gear, Nested, and Continuous cycles for repeating processes
4. **Hierarchy Diagrams** — Organization Chart, Table, and Labeled hierarchies for parent-child structures
5. **Relationship Diagrams** — Venn, Target, Radial, and Matrix diagrams for connections and overlaps
6. **Pyramid Diagrams** — Layered structures building from broad base to narrow apex
7. **Funnel Diagrams** — Tapering structures showing filtering or conversion
8. **Picture Diagrams** — Image-centric layouts that become the foundation for overlay-based infographics

Each of these patterns is a starting point for interactive infographic design. In the chapters ahead, you will learn the visual problem-solving frameworks (Chapter 4) that help you select diagrams for specific communication goals, the overlay patterns (Chapter 6) that implement interactivity, and the JavaScript libraries (Chapter 7) that render them in the browser.

## References

- Microsoft Support. "Learn about SmartArt Graphics." — Official documentation for SmartArt categories and subtypes.
- Duarte, N. (2008). *slide:ology: The Art and Science of Creating Great Presentations*. O'Reilly Media. — Comprehensive guide to visual communication in presentations, including diagram type selection.
- Reynolds, G. (2011). *Presentation Zen Design*. New Riders. — Principles of visual simplicity and clarity in diagram design.
- Roam, D. (2008). *The Back of the Napkin*. Portfolio. — Visual problem-solving frameworks referenced in Chapter 4, with foundations in diagram selection.
- Few, S. (2004). *Show Me the Numbers*. Analytics Press. — Guidelines for choosing appropriate chart and diagram types based on data structure.
