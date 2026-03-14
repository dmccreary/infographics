---
title: JavaScript Visualization Libraries
description: Explore the five major JavaScript visualization libraries for interactive infographics — p5.js, D3.js, Chart.js, vis-network, and Leaflet — along with chart types, selection criteria, and dashboard layout strategies.
generated_by: claude skill chapter-content-generator
date: 2026-03-14 10:42:15
version: 0.05
---

# JavaScript Visualization Libraries

## Summary

This chapter explores the five major JavaScript visualization libraries used to build interactive infographics: p5.js for custom canvas drawing, D3.js for data-driven document manipulation, Chart.js for standard chart types, vis-network for network graphs, and Leaflet for geographic maps. You will learn the strengths of each library, study specific chart types (bar, line, pie, scatter, treemap, Sankey, chord diagrams, and more), and develop criteria for selecting the right library for any infographic requirement.

## Concepts Covered

This chapter covers the following 34 concepts from the learning graph:

1. p5.js Library
2. p5.js Setup Function
3. p5.js Draw Function
4. createCanvas
5. p5.js Event Handling
6. D3.js Library
7. Data-Driven Documents
8. D3 Selection
9. D3 Data Binding
10. Chart.js Library
11. Chart Type Selection
12. Bar Chart
13. Line Chart
14. Pie Chart
15. vis-network Library
16. Network Graph
17. Node
18. Edge
19. Leaflet Library
20. Geographic Infographic
21. Map Tile Layer
22. Library Selection
23. Stacked Bar Chart
24. Scatter Plot
25. Histogram
26. Area Chart
27. Donut Chart
28. Treemap Diagram
29. Sankey Diagram
30. Chord Diagram
31. Word Cloud
32. Gauge Chart
33. Sparkline
34. Dashboard Layout

## Prerequisites

This chapter builds on concepts from:

- [Chapter 6: Web Fundamentals: Structure, Style, and Data](../06-web-fundamentals-structure-style-and-data/index.md)
- [Chapter 7: Web Fundamentals: JavaScript and Responsive Design](../07-web-fundamentals-javascript-and-responsive-design/index.md)

---

!!! mascot-welcome "Let's Make It Visual!"
    <img src="../../img/mascot/welcome.png" class="mascot-admonition-img" alt="Percy welcomes you">
    Welcome to the chapter where your infographic toolkit truly expands! You are about to explore five powerful JavaScript libraries — each one a specialist in a different type of visualization. By the end, you will know exactly which library to reach for when you need a custom animation, a data-driven chart, a network graph, or an interactive map. Let's spread some knowledge!

## Learning Objectives

By the end of this chapter, you will be able to:

- **Explain** the architecture and rendering model of each of the five major visualization libraries (Bloom: Understand)
- **Construct** basic visualizations using p5.js, Chart.js, and vis-network (Bloom: Apply)
- **Distinguish** between chart types and identify which best communicates a given data story (Bloom: Analyze)
- **Evaluate** which JavaScript library is the best match for a specific infographic requirement (Bloom: Evaluate)
- **Design** a dashboard layout that combines multiple chart types into a coherent visual narrative (Bloom: Create)

## Introduction

In Chapters 6 and 7, you built a solid foundation in web technologies and JavaScript. Now it is time to put that foundation to work with the visualization libraries that transform code into compelling interactive graphics. Each library in this chapter was designed with a specific visualization philosophy, and understanding those philosophies is the key to choosing the right tool for every infographic you build.

The five libraries you will explore represent a spectrum from total creative freedom to structured convenience:

- **p5.js** gives you a blank canvas and pixel-level control — ideal for custom infographics, animations, and MicroSims
- **D3.js** binds data directly to DOM elements — powerful for bespoke data visualizations where every detail is tailored
- **Chart.js** provides ready-made chart types with minimal configuration — perfect for standard bar, line, and pie charts
- **vis-network** specializes in node-and-edge graph visualization — the natural choice for relationship diagrams and learning graphs
- **Leaflet** renders interactive maps with tile layers — essential for geographic infographics

No single library is "best" — each excels in its domain. The skill you will develop in this chapter is **library selection**: matching the right tool to each visualization requirement.

## p5.js: Creative Canvas Drawing

The **p5.js library** is a JavaScript framework for creative coding that provides an intuitive, artist-friendly API for drawing on the HTML Canvas element. Originally inspired by the Processing language, p5.js is the primary library used in this course for custom interactive infographics and MicroSims because it offers the best balance of creative freedom and ease of learning.

### The Setup and Draw Pattern

Every p5.js sketch follows a two-function pattern:

The **p5.js setup function** (`setup()`) runs once when the sketch starts. It is where you create the canvas, set initial parameters, and load data:

```javascript
function setup() {
    createCanvas(800, 500); // width=800px and height=500px
    background('aliceblue'); // aliceblue is the standard our books use to signal an interactive iframe
    frameRate(30);
}
```

The **createCanvas** function creates the drawing surface with specified width and height in pixels. For responsive infographics, you typically pass `windowWidth` as the width and calculate height based on the desired aspect ratio.

The **p5.js draw function** (`draw()`) runs continuously — by default 60 times per second — creating the animation loop. Each call to `draw()` repaints the entire canvas:

```javascript
function draw() {
    background('aliceblue'); // Clear canvas each frame

    // Draw all the regions in the canvas
    for (let region of regions) {
        fill(region.hovered ? '#FF6600' : '#4A90D9');
        rect(region.x, region.y, region.w, region.h, 5);
        fill('#333');
        text(region.label, region.x + 10, region.y + 20);
    }
}
```

### p5.js Event Handling

**p5.js event handling** uses global callback functions that p5.js invokes automatically when user input occurs:

- `mousePressed()` — Called when any mouse button is pressed
- `mouseReleased()` — Called when a mouse button is released
- `mouseMoved()` — Called when the mouse moves (without a button pressed)
- `mouseDragged()` — Called when the mouse moves with a button pressed
- `keyPressed()` — Called when a key is pressed
- `windowResized()` — Called when the browser window changes size

The global variables `mouseX` and `mouseY` always contain the current cursor position relative to the canvas, making hit detection straightforward:

```javascript
function mousePressed() {
    for (let region of regions) {
        if (mouseX > region.x && mouseX < region.x + region.w &&
            mouseY > region.y && mouseY < region.y + region.h) {
            selectRegion(region);
        }
    }
}
```

p5.js is the ideal choice when you need:

- Custom shapes, animations, or visual effects
- Full creative control over every pixel
- Interactive simulations with sliders and buttons (using p5.js built-in functions)
- Canvas-based MicroSims that follow the MicroSim standard `aliceblue` drawing region above a `white` control layout 

## D3.js: Data-Driven Document Manipulation

The **D3.js library** (short for **Data-Driven Documents**) takes a fundamentally different approach from p5.js. Instead of drawing pixels on a canvas, D3.js creates and directly manipulates SVG or HTML elements in the DOM, binding data directly to visual elements.

Because D3 directly generates SVG, you have detailed control for drawing on the canvas, however you can't always use CSS to change your SVG placement.

This data-first philosophy makes D3.js extraordinarily powerful for creating visualizations where the shape, size, position, and color of every element is determined by data.  If you
have a complex set of data you want to visualized, both D3 and ChartJS are good libraries
to consider using.

### D3 Selection

A **D3 selection** is a set of DOM elements that D3 operates on. Selections are created using CSS-selector syntax and form the foundation of every D3 operation:

```javascript
// Select a single element
d3.select('#chart-container')

// Select all elements matching a selector
d3.selectAll('circle')

// Chain operations on a selection
d3.selectAll('rect')
    .attr('fill', 'steelblue')
    .attr('height', d => yScale(d.value));
```

### D3 Data Binding

**D3 data binding** is the core innovation of D3.js. The `.data()` method joins an array of data values to a selection of DOM elements, creating a correspondence between data and visual representation:

```javascript
let bars = d3.select('#chart')
    .selectAll('rect')
    .data(dataset);

// Enter: create new elements for new data
bars.enter()
    .append('rect')
    .attr('x', (d, i) => i * barWidth)
    .attr('y', d => height - yScale(d.value))
    .attr('width', barWidth - 1)
    .attr('height', d => yScale(d.value))
    .attr('fill', 'steelblue');

// Update: modify existing elements for changed data
bars.attr('height', d => yScale(d.value));

// Exit: remove elements for removed data
bars.exit().remove();
```

The enter-update-exit pattern is what makes D3 visualizations truly data-driven — add data and new visual elements appear; remove data and they disappear; change data and the visualization updates smoothly.

D3.js is the ideal choice when you need:

- Highly customized, bespoke data visualizations
- Smooth animated transitions between data states
- Complex chart types not available in Chart.js (Sankey, chord, treemap)
- SVG-based output with resolution independence

!!! mascot-thinking "Key Insight"
    <img src="../../img/mascot/thinking.png" class="mascot-admonition-img" alt="Percy is thinking">
    p5.js and D3.js represent two philosophies: p5.js says "I will draw what I want on a canvas," while D3.js says "I will bind data to elements and let the data drive the visuals." Neither is better — they solve different problems. When your visualization is data-centric and needs smooth transitions, reach for D3. When you need creative freedom and custom interactions, reach for p5.js.

## Chart.js: Standard Chart Types Made Easy

The **Chart.js library** provides beautiful, responsive charts with minimal configuration. Where D3.js gives you granular control over every SVG element, Chart.js gives you complete chart types — bar, line, pie, scatter, and more — that you configure with a simple JavaScript object.

### Creating a Chart

The core pattern is straightforward: create a canvas element, instantiate a Chart object with a type and data configuration:

```javascript
const ctx = document.getElementById('myChart').getContext('2d');
const chart = new Chart(ctx, {
    type: 'bar',
    data: {
        labels: ['Q1', 'Q2', 'Q3', 'Q4'],
        datasets: [{
            label: 'Revenue ($K)',
            data: [120, 190, 150, 210],
            backgroundColor: ['#4A90D9', '#FF6600', '#50C878', '#FFD700']
        }]
    },
    options: {
        responsive: true,
        plugins: { legend: { position: 'top' } }
    }
});
```

### Chart Type Selection

**Chart type selection** is the process of matching your data and communication goal to the most effective chart format. This is one of the most important skills in infographic design — the wrong chart type can obscure insights, while the right one makes them instantly clear.

The standard chart types available in Chart.js, along with the specialized types available through D3.js, form a comprehensive visualization vocabulary:

#### Core Chart Types (Chart.js)

| Chart Type | Best For | Data Shape | Example Use |
|------------|----------|-----------|-------------|
| **Bar Chart** | Comparing categories | Categories × values | Library usage by subject area |
| **Stacked Bar Chart** | Comparing categories with composition | Categories × multiple series | Student scores by topic and difficulty |
| **Line Chart** | Trends over time | Sequential × values | Quiz scores across a semester |
| **Area Chart** | Trends with volume emphasis | Sequential × values | Cumulative student enrollment |
| **Pie Chart** | Parts of a whole (≤7 segments) | Categories × proportions | Distribution of infographic types |
| **Donut Chart** | Parts of a whole with center metric | Categories × proportions | Completion rate with percentage in center |
| **Scatter Plot** | Relationship between two variables | X values × Y values | Study hours vs. exam scores |
| **Histogram** | Distribution of a single variable | Binned frequency counts | Distribution of page load times |

#### Advanced Chart Types (D3.js)

| Chart Type | Best For | Data Shape | Example Use |
|------------|----------|-----------|-------------|
| **Treemap Diagram** | Hierarchical proportions | Nested categories × values | Course content by chapter and topic |
| **Sankey Diagram** | Flow quantities between stages | Source → destination × volume | Student progression through course modules |
| **Chord Diagram** | Bilateral relationships | Matrix of inter-group flows | Concept cross-references between chapters |
| **Word Cloud** | Term frequency | Words × frequency counts | Most common terms in student essays |
| **Gauge Chart** | Single metric against a target | Current value × max value | MicroSim quality score |
| **Sparkline** | Compact trend indicator | Sequential mini-series | Inline engagement trend per chapter |

!!! mascot-tip "Percy's Tip"
    <img src="../../img/mascot/tip.png" class="mascot-admonition-img" alt="Percy shares a tip">
    When in doubt about chart type, start by asking: "Am I comparing categories, showing a trend over time, revealing proportions, or exploring relationships?" That question alone narrows your options to 2-3 chart types. Then choose the simplest one that communicates your insight clearly.

#### Diagram: Chart Type Selection Guide

<iframe src="../../sims/chart-type-selector/main.html" width="100%" height="550px" scrolling="no"></iframe>

<details markdown="1">
<summary>Chart Type Selection Guide</summary>
Type: microsim
**sim-id:** chart-type-selector<br/>
**Library:** p5.js<br/>
**Status:** Specified

**Bloom Level:** Analyze (L4)
**Bloom Verb:** Differentiate
**Learning Objective:** Differentiate between chart types by answering guided questions about data characteristics and communication goals, then seeing which chart type best matches the scenario.

**Instructional Rationale:** A decision-tree interaction is appropriate because the Analyze objective requires learners to break down their visualization needs into structured criteria. Walking through the decision tree for multiple scenarios builds the analytical habit of matching data to chart type.

**Canvas Layout:**
- Main area (aliceblue, 65% width): interactive decision tree or flowchart
- Right panel (white, silver border, 35% width): chart preview and description

**Visual Elements:**
- A decision tree with 4-5 branching questions:
  1. "What is your goal?" → Compare | Trend | Proportion | Relationship | Distribution
  2. Branch-specific follow-ups (e.g., "How many categories?" for Compare; "How many series?" for Trend)
  3. Terminal nodes showing the recommended chart type with a small preview icon
- The currently active question is highlighted in blue
- Previously answered questions show the selected path in green
- Right panel shows: a thumbnail preview of the recommended chart type, its name, a 2-sentence description, and the library that implements it (Chart.js or D3.js)

**Interactive Controls:**
- Click to select an answer at each decision point
- The tree animates to reveal the next question
- Button: "Reset" — returns to the first question
- Button: "Try a Scenario" — loads a pre-built scenario (e.g., "Show student scores by subject" → Bar Chart; "Show how students flow through modules" → Sankey Diagram)
- 5 pre-built scenarios available via dropdown

**Behavior:**
- Decision tree branches based on selections; non-selected branches fade to gray
- Reaching a terminal node highlights the recommended chart type in the right panel with an animated preview
- "Try a Scenario" auto-fills the decision tree with a brief animation
- Responsive to window resize; decision tree scales and right panel stacks below on narrow screens

**Default Parameters:**
- Start at the first question
- No scenario loaded
- Canvas width: responsive
- Canvas height: 500px

Implementation: p5.js with decision tree data structure and chart preview thumbnails
</details>

## vis-network: Network and Graph Visualization

The **vis-network library** specializes in rendering interactive **network graphs** — diagrams composed of **nodes** (points) and **edges** (connections between points). Network graphs are essential for visualizing relationships, dependencies, hierarchies, and flows in educational content.

### Nodes and Edges

A **node** represents an entity in the network — a concept, a person, a system component, or any discrete item. Each node has an identifier, a label, and optional visual properties (shape, color, size, icon).

An **edge** represents a relationship between two nodes. Edges connect a source node to a target node and can be directed (arrows) or undirected (lines). Edges can also carry labels, colors, and width values that encode relationship properties.

```javascript
let nodes = new vis.DataSet([
    { id: 1, label: 'HTML', shape: 'box', color: '#4A90D9' },
    { id: 2, label: 'CSS', shape: 'box', color: '#50C878' },
    { id: 3, label: 'JavaScript', shape: 'box', color: '#FF6600' },
    { id: 4, label: 'p5.js', shape: 'ellipse', color: '#FFD700' }
]);

let edges = new vis.DataSet([
    { from: 1, to: 3, label: 'structures' },
    { from: 2, to: 3, label: 'styles' },
    { from: 3, to: 4, label: 'extends', arrows: 'to' }
]);

let network = new vis.Network(container, { nodes, edges }, options);
```

vis-network provides interactive features out of the box:

- **Drag nodes** to rearrange the layout
- **Zoom and pan** with mouse wheel and drag
- **Click and hover events** for showing details about nodes and edges
- **Physics simulation** that arranges nodes using force-directed algorithms
- **Clustering** for managing large graphs by collapsing groups of nodes

vis-network is the ideal choice when you need:

- Concept dependency graphs (like the learning graph for this textbook)
- Organization charts and hierarchies
- System architecture diagrams with interactive exploration
- Any visualization where relationships between entities are the primary focus

#### Diagram: Interactive Learning Graph Explorer

<iframe src="../../sims/learning-graph-explorer/main.html" width="100%" height="550px" scrolling="no"></iframe>

<details markdown="1">
<summary>Interactive Learning Graph Explorer</summary>
Type: graph-model
**sim-id:** learning-graph-explorer<br/>
**Library:** vis-network<br/>
**Status:** Specified

**Bloom Level:** Analyze (L4)
**Bloom Verb:** Examine
**Learning Objective:** Examine the dependency relationships between JavaScript visualization library concepts by navigating an interactive network graph, identifying prerequisite chains and concept clusters.

**Instructional Rationale:** Interactive graph exploration is appropriate because the Analyze objective requires learners to trace relationships and identify structural patterns. Clicking nodes to reveal prerequisites and dependents builds understanding of how concepts interconnect.

**Canvas Layout:**
- Main graph area (aliceblue, 75% width): vis-network graph display
- Right info panel (white, silver border, 25% width): node details

**Visual Elements:**
- Nodes representing the 34 concepts from this chapter, grouped by library:
  - p5.js nodes (blue): p5.js Library, Setup Function, Draw Function, createCanvas, Event Handling
  - D3.js nodes (orange): D3.js Library, Data-Driven Documents, D3 Selection, D3 Data Binding
  - Chart.js nodes (green): Chart.js Library, Chart Type Selection, Bar Chart, Line Chart, Pie Chart, Stacked Bar, Scatter Plot, Histogram, Area Chart, Donut Chart
  - vis-network nodes (purple): vis-network Library, Network Graph, Node, Edge
  - Leaflet nodes (red): Leaflet Library, Geographic Infographic, Map Tile Layer
  - Advanced D3 chart nodes (teal): Treemap, Sankey, Chord, Word Cloud, Gauge, Sparkline
  - Cross-cutting nodes (gray): Library Selection, Dashboard Layout
- Edges showing dependency relationships from the learning graph CSV
- Node size proportional to the number of connections (degree)

**Interactive Controls:**
- Click a node to select it; info panel shows: concept name, library, description, prerequisites (incoming edges), dependents (outgoing edges)
- Double-click a node to highlight its full prerequisite chain (all ancestors) in yellow
- Dropdown: "Layout" with options: Force-directed (default), Hierarchical (top-down), Clustered (by library)
- Checkbox: "Show Edge Labels" (default off)
- Search box: type a concept name to highlight it in the graph
- Button: "Reset View" — resets zoom and deselects all

**Behavior:**
- Physics simulation arranges nodes; dragging a node pins it in place
- Selecting a node dims unconnected nodes to 30% opacity
- Hierarchical layout shows prerequisite chains flowing top-to-bottom
- Clustered layout groups nodes by library with visible group boundaries
- Responsive to window resize; graph recenters

**Default Parameters:**
- Layout: Force-directed
- All nodes visible
- Canvas width: responsive
- Canvas height: 500px

Implementation: vis-network with custom node colors per library group
</details>

## Leaflet: Geographic and Map-Based Infographics

The **Leaflet library** is a lightweight JavaScript library for creating interactive maps. **Geographic infographics** — visualizations that present data in a spatial context — are among the most engaging infographic types because humans are naturally oriented to geographic thinking.

### Map Tile Layers

A **map tile layer** is a set of pre-rendered map image tiles (typically 256×256 pixels) served from a tile server. Leaflet loads tiles on demand as the user pans and zooms, assembling them into a seamless map. The most common tile provider is OpenStreetMap, but satellite imagery, terrain maps, and stylized tiles are also available:

```javascript
let map = L.map('map-container').setView([44.9778, -93.2650], 12);

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '© OpenStreetMap contributors'
}).addTo(map);

// Add a marker with a popup
L.marker([44.9778, -93.2650])
    .addTo(map)
    .bindPopup('<b>Minneapolis</b><br>University of Minnesota');
```

Leaflet supports markers, polygons, circles, popups, and custom overlays that make it possible to build rich geographic infographics showing:

- School district boundaries with demographic data
- Historical event locations with timeline integration
- Scientific data collection sites with measurement overlays
- Trade routes and migration patterns with animated movement arrows

Leaflet is the ideal choice when your data has a geographic component and spatial context enhances understanding.

## The Complete Library Comparison

Understanding when to use each library is one of the most practical skills this chapter teaches. The following table provides a comprehensive comparison:

| Criterion | p5.js | D3.js | Chart.js | vis-network | Leaflet |
|-----------|-------|-------|----------|-------------|---------|
| **Rendering** | Canvas (pixels) | SVG (DOM) | Canvas | Canvas + DOM | DOM + tiles |
| **Learning curve** | Gentle | Steep | Very gentle | Moderate | Gentle |
| **Creative freedom** | Maximum | High | Limited to chart types | Limited to graphs | Limited to maps |
| **Built-in chart types** | None | None (build from primitives) | 8+ standard types | Network only | Map only |
| **Animation** | Native (draw loop) | Transitions API | Built-in animations | Physics simulation | Pan/zoom |
| **Data binding** | Manual | Core feature | Declarative config | DataSet objects | GeoJSON layers |
| **Best for** | Custom infographics, MicroSims | Bespoke data viz | Standard charts | Relationship diagrams | Geographic data |
| **CDN size** | ~800 KB | ~260 KB | ~200 KB | ~450 KB | ~170 KB |

### Library Selection Decision Framework

**Library selection** is the process of matching an infographic requirement to the best library. Use this decision framework:

1. **Does the infographic show geographic data?** → **Leaflet**
2. **Does it show relationships between entities (nodes and edges)?** → **vis-network**
3. **Is it a standard chart type (bar, line, pie, scatter)?** → **Chart.js**
4. **Does it need highly customized, data-driven SVG elements?** → **D3.js**
5. **Does it need custom drawing, animation, or simulation?** → **p5.js**
6. **Is it a complex chart type (Sankey, chord, treemap)?** → **D3.js**
7. **Is it a dashboard combining multiple chart types?** → **Chart.js** (for individual charts) + custom layout

If multiple libraries could work, prefer the simpler option. Chart.js is faster to implement than D3.js for standard charts. p5.js is more approachable than D3.js for custom visualizations. Only reach for D3.js when you need its unique strengths: data binding, enter-update-exit, or advanced chart types.

#### Diagram: Library Selection Flowchart

<iframe src="../../sims/library-selection-flowchart/main.html" width="100%" height="500px" scrolling="no"></iframe>

<details markdown="1">
<summary>Library Selection Flowchart</summary>
Type: workflow
**sim-id:** library-selection-flowchart<br/>
**Library:** p5.js<br/>
**Status:** Specified

**Bloom Level:** Evaluate (L5)
**Bloom Verb:** Assess
**Learning Objective:** Assess which JavaScript visualization library is the best match for a given infographic requirement by working through a structured decision flowchart and evaluating the trade-offs between libraries.

**Instructional Rationale:** A decision flowchart with scenario testing is appropriate because the Evaluate objective requires learners to make justified selection decisions. Walking through the flowchart with concrete scenarios builds the evaluative skill of matching tools to requirements.

**Canvas Layout:**
- Drawing area (aliceblue): flowchart with decision diamonds and library outcome boxes
- Bottom panel (white, silver border): scenario loader and result explanation

**Visual Elements:**
- A flowchart starting from "What type of infographic?" at the top
- Decision diamonds (yellow) with yes/no branches:
  - "Geographic data?" → Yes: Leaflet (red terminal)
  - "Network/relationships?" → Yes: vis-network (purple terminal)
  - "Standard chart type?" → Yes: Chart.js (green terminal)
  - "Custom visualization or simulation?" → Yes: p5.js (blue terminal)
  - "Complex data-driven chart?" → Yes: D3.js (orange terminal)
- Terminal boxes colored by library, showing the library logo/icon and name
- The active decision diamond pulses gently
- Arrows connecting decisions, with the selected path highlighted in green

**Interactive Controls:**
- Click yes/no at each decision point to follow the flowchart
- Button: "Load Scenario" with dropdown of 6 scenarios:
  1. "Bar chart comparing student scores" → Chart.js
  2. "Animated physics simulation" → p5.js
  3. "Concept dependency graph" → vis-network
  4. "World map of university locations" → Leaflet
  5. "Sankey diagram of student flow" → D3.js
  6. "Dashboard with 4 charts" → Chart.js + layout
- Loading a scenario auto-navigates the flowchart with animation
- Bottom panel shows: selected library name, 2-sentence justification, alternative library and why it is less suitable
- Button: "Reset"

**Behavior:**
- Non-selected branches fade to gray as decisions are made
- Terminal boxes expand when reached, showing key strengths
- Responsive to window resize; flowchart scales proportionally

**Default Parameters:**
- Start at first decision
- No scenario loaded
- Canvas width: responsive
- Canvas height: 450px

Implementation: p5.js with animated flowchart and scenario data
</details>

## Specialized Chart Types in Depth

Beyond the standard bar, line, and pie charts, several specialized chart types are particularly valuable for educational infographics. Understanding when and how to use them expands your visual vocabulary significantly.

### Treemap Diagrams

A **treemap diagram** displays hierarchical data as nested rectangles, where the area of each rectangle is proportional to a quantitative value. Treemaps are excellent for showing how a whole is divided into parts at multiple levels of hierarchy — for example, how a textbook's word count is distributed across chapters, sections, and topics.

### Sankey Diagrams

A **Sankey diagram** visualizes flows between stages, with the width of each flow proportional to its quantity. Sankey diagrams are powerful for showing student progression through course modules (how many students moved from Module 1 to Module 2, how many dropped out), resource allocation, or any process where quantities split and merge between stages.

### Chord Diagrams

A **chord diagram** displays bilateral relationships between groups arranged in a circle. Chords connect groups, with chord thickness indicating the strength of the relationship. Chord diagrams are ideal for showing concept cross-references between chapters, student transfer patterns between departments, or any matrix of inter-group connections.

### Word Clouds

A **word cloud** displays words sized proportionally to their frequency or importance. While word clouds have limited analytical precision (exact comparisons are difficult), they provide an engaging overview of dominant themes. In educational contexts, word clouds can visualize vocabulary emphasis in course materials or term frequency in student responses.

### Gauge Charts and Sparklines

A **gauge chart** displays a single metric against a target, resembling a speedometer dial. Gauges are effective for showing MicroSim quality scores, course completion rates, or any single value that has a defined range and target.

A **sparkline** is a tiny, word-sized chart embedded inline with text or within a table cell. Sparklines show trends without the overhead of axis labels and legends. In educational dashboards, sparklines can show engagement trends for each chapter, giving instructors an at-a-glance view of student activity patterns.

| Chart Type | Library | Complexity | Educational Use |
|------------|---------|-----------|-----------------|
| Treemap | D3.js | Medium | Content distribution by chapter/topic |
| Sankey | D3.js | High | Student flow through modules |
| Chord | D3.js | High | Cross-chapter concept connections |
| Word Cloud | D3.js (d3-cloud) | Low | Term frequency analysis |
| Gauge | Chart.js (plugin) or p5.js | Low | Quality scores, completion rates |
| Sparkline | Chart.js or inline SVG | Low | Compact trend indicators in tables |

#### Diagram: Chart Type Gallery

<iframe src="../../sims/chart-type-gallery/main.html" width="100%" height="600px" scrolling="no"></iframe>

<details markdown="1">
<summary>Chart Type Gallery</summary>
Type: infographic
**sim-id:** chart-type-gallery<br/>
**Library:** Chart.js<br/>
**Status:** Specified

**Bloom Level:** Remember (L1)
**Bloom Verb:** Identify
**Learning Objective:** Identify the 14 chart types covered in this chapter by viewing example renderings and recalling which data characteristics each chart type communicates best.

**Instructional Rationale:** A visual gallery with hover-to-reveal descriptions supports the Remember objective by creating strong visual-name associations. Repeated viewing of chart examples alongside their names and use cases builds recognition fluency.

**Canvas Layout:**
- Main gallery area (aliceblue): 4×4 grid of chart thumbnails (14 charts + 2 blank slots)
- Bottom info panel (white, silver border): details about the selected chart

**Visual Elements:**
- 14 chart thumbnails arranged in a responsive grid:
  Row 1: Bar Chart, Stacked Bar Chart, Line Chart, Area Chart
  Row 2: Pie Chart, Donut Chart, Scatter Plot, Histogram
  Row 3: Treemap, Sankey, Chord, Word Cloud
  Row 4: Gauge, Sparkline (smaller, inline-style display)
- Each thumbnail is a miniature rendered chart with sample data (using Chart.js for standard types, p5.js-drawn approximations for D3 types)
- Chart name label below each thumbnail
- Selected chart has a blue highlight border

**Interactive Controls:**
- Click a chart thumbnail to select it; info panel shows:
  - Chart name and library
  - "Best for:" one-line description
  - "Data shape:" description of expected input format
  - "Example:" a concrete educational use case
  - "Tip:" one sentence on when NOT to use this chart type
- Button: "Quiz Mode" — hides chart names; user clicks a thumbnail and types the chart name; correct/incorrect feedback displayed
- Filter buttons across the top: "All" | "Chart.js" | "D3.js" | "Other"

**Behavior:**
- Thumbnails render with actual chart libraries where possible for visual fidelity
- Grid layout is responsive: 4 columns on desktop, 3 on tablet, 2 on mobile
- Quiz Mode tracks correct/incorrect count and displays score
- Smooth highlight transition on selection
- Responsive to window resize

**Default Parameters:**
- All charts visible
- Quiz Mode: off
- Canvas width: responsive
- Canvas height: 550px

Implementation: Chart.js for standard chart thumbnails, p5.js canvas for D3-type approximations, CSS grid for responsive layout
</details>

## Dashboard Layout

A **dashboard layout** combines multiple charts, metrics, and visual elements into a single cohesive view. Dashboards are particularly valuable in educational contexts for:

- **Instructor dashboards** showing student engagement across chapters
- **Course overview pages** summarizing content metrics, completion rates, and quality scores
- **Analytics panels** displaying interaction data from MicroSim infographics

Effective dashboard design follows these principles:

- **Place the most important metric prominently** — typically top-left or full-width at the top
- **Group related charts together** using visual proximity and consistent color schemes
- **Use sparklines and gauge charts for compact metrics** that do not need full-size charts
- **Limit to 4-6 visual elements** per dashboard view to avoid cognitive overload
- **Maintain consistent formatting** — same fonts, color palettes, and border styles across all charts

A typical educational dashboard layout might include:

1. A **gauge chart** showing overall course completion rate (top center)
2. A **bar chart** comparing engagement across chapters (top row)
3. A **line chart** showing enrollment trends over time (middle row, left)
4. A **pie chart** showing distribution of infographic types used (middle row, right)
5. A **table with sparklines** showing per-chapter engagement trends (bottom)

```css
.dashboard {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 16px;
    padding: 16px;
}
.dashboard .full-width { grid-column: 1 / -1; }
.dashboard .chart-card {
    background: white;
    border: 1px solid silver;
    border-radius: 8px;
    padding: 16px;
}
```

!!! mascot-warning "Common Mistake"
    <img src="../../img/mascot/warning.png" class="mascot-admonition-img" alt="Percy warns you">
    The most common dashboard mistake is cramming too many charts into a single view. If your dashboard has more than 6 visual elements, your users will not know where to look first. Prioritize ruthlessly: show the 4-5 most actionable metrics and provide drill-down links for everything else.

#### Diagram: Educational Dashboard Builder

<iframe src="../../sims/dashboard-builder/main.html" width="100%" height="600px" scrolling="no"></iframe>

<details markdown="1">
<summary>Educational Dashboard Builder</summary>
Type: microsim
**sim-id:** dashboard-builder<br/>
**Library:** p5.js<br/>
**Status:** Specified

**Bloom Level:** Create (L6)
**Bloom Verb:** Design
**Learning Objective:** Design an educational dashboard layout by selecting chart types, arranging them in a grid, and configuring each chart's data source to create a coherent visual overview of course metrics.

**Instructional Rationale:** A drag-and-drop builder is appropriate for the Create-level objective because learners must synthesize their understanding of chart types, layout principles, and educational context into an original dashboard design. Building a dashboard from scratch requires integrating multiple concepts from this chapter.

**Canvas Layout:**
- Left palette (white, 20% width): available chart type cards to drag
- Main grid area (aliceblue, 60% width): 3×2 dashboard grid where charts are placed
- Right panel (white, silver border, 20% width): configuration for the selected chart cell

**Visual Elements:**
- Left palette: 8 draggable chart type cards (Bar, Line, Pie, Donut, Gauge, Sparkline Table, Scatter, Area) with small icons
- Main grid: 6 cells (3 columns × 2 rows), each showing either a placeholder "Drop chart here" or a rendered mini-chart
- Each placed chart renders with sample educational data (enrollment numbers, completion rates, quiz scores)
- Right panel (when a cell is selected): chart title input, data source dropdown (Enrollment, Engagement, Scores, Completion, Quality), color scheme selector (Blue, Orange, Green, Mixed)

**Interactive Controls:**
- Drag a chart type from the palette and drop it into a grid cell
- Click a filled cell to select it and configure in the right panel
- Double-click a filled cell to remove the chart
- Button: "Load Template" — fills the grid with a pre-designed dashboard
- Button: "Clear All" — empties the grid
- Toggle: "Full-width top row" — merges the two top cells into one full-width chart (common for bar/line overview charts)

**Behavior:**
- Dropping a chart type into a cell renders a miniature version with sample data
- Changing the data source in the right panel updates the chart's data and labels
- The dashboard preview updates in real-time as charts are placed and configured
- Responsive: on narrow screens, the palette and config panel stack above and below the grid

**Default Parameters:**
- Empty grid on load
- "Load Template" creates: top-left: Line (Enrollment), top-right: Gauge (Completion), bottom-left: Bar (Engagement), bottom-center: Pie (Quality), bottom-right: Sparkline Table (Scores)
- Canvas width: responsive
- Canvas height: 550px

Implementation: p5.js with drag-and-drop, mini chart rendering using Chart.js-style algorithms
</details>

## Putting It All Together

The five libraries and the chart types you have learned form a comprehensive toolkit for building any type of interactive infographic. Here is how they map to common educational infographic needs:

| Educational Need | Recommended Library | Chart/Visualization Type |
|-----------------|--------------------|-----------------------|
| Student scores by topic | Chart.js | Bar or Stacked Bar Chart |
| Enrollment trends | Chart.js | Line or Area Chart |
| Content distribution | Chart.js or D3.js | Pie, Donut, or Treemap |
| Concept dependencies | vis-network | Network Graph |
| Student flow through curriculum | D3.js | Sankey Diagram |
| Campus or field site locations | Leaflet | Geographic Map with markers |
| Custom simulation or overlay | p5.js | Canvas-based MicroSim |
| Cross-chapter concept links | D3.js | Chord Diagram |
| At-a-glance metrics | Chart.js / p5.js | Gauge and Sparkline |
| Multi-metric overview | Multiple | Dashboard Layout |

## Summary

!!! mascot-celebration "Excellent Work!"
    <img src="../../img/mascot/celebration.png" class="mascot-admonition-img" alt="Percy celebrates">
    You now command five powerful visualization libraries and a vocabulary of 14+ chart types! Whether you need a custom animation, a data-driven chart, a network graph, or an interactive map, you know exactly which tool to reach for and why. This is the chapter that transforms you from a web developer into an infographic designer. Display it with style!

In this chapter, you learned that:

- The **p5.js library** provides creative canvas drawing through a **setup function** (runs once to initialize), **draw function** (runs continuously for animation), **createCanvas** (creates the drawing surface), and **p5.js event handling** (callback functions for mouse, keyboard, and window events)
- The **D3.js library** implements **data-driven documents** through **D3 selections** (CSS-selector-based element access) and **D3 data binding** (the enter-update-exit pattern that joins data to visual elements)
- The **Chart.js library** provides ready-made **chart type selection** with **bar charts**, **line charts**, **pie charts**, and their variants (**stacked bar charts**, **area charts**, **donut charts**, **scatter plots**, **histograms**)
- The **vis-network library** renders interactive **network graphs** composed of **nodes** (entities) and **edges** (relationships), with built-in physics, drag, zoom, and hover capabilities
- The **Leaflet library** creates **geographic infographics** using **map tile layers** loaded from OpenStreetMap or other providers, with markers, polygons, and popups
- Advanced chart types include **treemap diagrams** (hierarchical proportions), **Sankey diagrams** (flow quantities), **chord diagrams** (bilateral relationships), **word clouds** (term frequency), **gauge charts** (single metrics), and **sparklines** (compact inline trends)
- **Library selection** follows a structured decision framework: geographic → Leaflet; network → vis-network; standard chart → Chart.js; bespoke data viz → D3.js; custom/simulation → p5.js
- **Dashboard layout** combines multiple chart types into a cohesive view, following principles of prioritization, grouping, and limiting visual elements to 4-6 per view

## References

- [p5.js Reference](https://p5js.org/reference/)
- [D3.js Documentation](https://d3js.org/)
- [Chart.js Documentation](https://www.chartjs.org/docs/)
- [vis-network Documentation](https://visjs.github.io/vis-network/docs/network/)
- [Leaflet Documentation](https://leafletjs.com/reference.html)
- [Wikipedia: Sankey Diagram](https://en.wikipedia.org/wiki/Sankey_diagram)
- [Wikipedia: Treemapping](https://en.wikipedia.org/wiki/Treemapping)
- [Wikipedia: Chord Diagram](https://en.wikipedia.org/wiki/Chord_diagram_(information_visualization))
- [Wikipedia: Sparkline](https://en.wikipedia.org/wiki/Sparkline)
- [From Data to Viz — Chart Selection Guide](https://www.data-to-viz.com/)
