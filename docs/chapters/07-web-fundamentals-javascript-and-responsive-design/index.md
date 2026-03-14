---
title: Web Fundamentals: JavaScript and Responsive Design
description: Deepen your JavaScript skills with modern syntax, animation loops, state management, design patterns, browser debugging, and responsive layout strategies for interactive infographics.
generated_by: claude skill chapter-content-generator
date: 2026-03-14 10:32:29
version: 0.05
---

# Web Fundamentals: JavaScript and Responsive Design

## Summary

This chapter deepens your JavaScript knowledge and introduces responsive design patterns essential for building infographics that work across screen sizes. You will learn modern JavaScript features (arrow functions, destructuring, template literals, array methods), animation loops, state management, and design patterns (observer, factory, configuration objects). The chapter also covers responsive breakpoints, mobile-first design, browser debugging tools, error handling, and progressive enhancement strategies.

## Concepts Covered

This chapter covers the following 32 concepts from the learning graph:

1. JavaScript Fundamentals
2. Animation Loop
3. Frame Rate
4. State Management
5. Global Variable
6. Callback Function
7. Arrow Function
8. Template Literal
9. Destructuring
10. Spread Operator
11. Array Methods
12. Object Literal
13. Version Pinning
14. Local Development Server
15. Browser Developer Tools
16. Console Logging
17. Network Tab Debugging
18. Performance Profiling
19. Responsive Breakpoints
20. Mobile-First Design
21. Desktop Layout
22. Tablet Layout
23. Design Pattern
24. Observer Pattern
25. Factory Pattern
26. Configuration Object
27. Default Parameters
28. Error Handling
29. Graceful Degradation
30. Progressive Enhancement
31. Feature Detection
32. Polyfill

## Prerequisites

This chapter builds on concepts from:

- [Chapter 6: Web Fundamentals: Structure, Style, and Data](../06-web-fundamentals-structure-style-and-data/index.md)

---

!!! mascot-welcome "Let's Make It Visual!"
    <img src="../../img/mascot/welcome.png" class="mascot-admonition-img" alt="Percy welcomes you">
    Welcome to the chapter that turns you from a web reader into a web builder! JavaScript is the engine that makes infographics come alive — it draws shapes, responds to clicks, animates transitions, and adapts layouts to any screen. By the end of this chapter, you will have the practical JavaScript fluency and responsive design skills to build infographics with confidence. Let's spread some knowledge!

## Learning Objectives

By the end of this chapter, you will be able to:

- **Apply** modern JavaScript features (arrow functions, destructuring, template literals, array methods) to write concise, readable infographic code (Bloom: Apply)
- **Explain** how animation loops, frame rates, and state management work together to produce smooth interactive graphics (Bloom: Understand)
- **Implement** design patterns (observer, factory, configuration object) to structure infographic code for maintainability (Bloom: Apply)
- **Use** browser developer tools to debug, profile, and optimize infographic performance (Bloom: Apply)
- **Design** responsive layouts using mobile-first strategies, breakpoints, and progressive enhancement (Bloom: Create)

## Introduction

In the previous chapter, you learned the structural foundations of web development — HTML for structure, CSS for style, and data formats for content. This chapter takes the next step: JavaScript, the programming language that transforms static web pages into dynamic, interactive experiences. Every slider adjustment, hover tooltip, animated transition, and data-driven visualization in your infographics is powered by JavaScript.

This chapter is organized in three major sections. First, you will build fluency in **JavaScript fundamentals and modern syntax** — the language features that make infographic code concise and expressive. Second, you will learn **animation, state management, and design patterns** — the architectural techniques that keep complex infographic code organized as it grows. Third, you will master **debugging tools and responsive design** — the practical skills that ensure your infographics work correctly and look great on every device.

If you have some programming experience, you will find that JavaScript's syntax is approachable and its ecosystem is remarkably rich. If JavaScript is new to you, take heart: the subset needed for infographic development is focused and well-defined, and the interactive examples in this chapter will help you build skills through hands-on experimentation.

## JavaScript Fundamentals

**JavaScript** is the programming language of the web. It runs in every modern browser without any installation or compilation step, which makes it the natural choice for interactive infographics embedded in intelligent textbooks. JavaScript is dynamically typed, supports both object-oriented and functional programming styles, and has an enormous ecosystem of libraries (p5.js, D3.js, Chart.js) built specifically for visualization.

The essential JavaScript concepts for infographic development include:

- **Variables and data types** — storing numbers, strings, booleans, arrays, and objects
- **Functions** — reusable blocks of code that accept parameters and return values
- **Control flow** — `if/else` statements, `for` loops, and `switch` statements
- **Event handling** — responding to user actions like clicks and mouse movements
- **DOM interaction** — reading and modifying the web page (covered in Chapter 6)

This section focuses on the modern JavaScript features introduced in ES6 and later that make infographic code significantly cleaner and more expressive.

### Global Variables and State Management

A **global variable** is a variable declared in the outermost scope of your program, accessible from any function. In p5.js infographics, global variables are the standard way to store **state** — the current values that determine what is displayed on screen. For example, a MicroSim might use global variables to track the selected mode, the current slider value, and whether a tooltip is visible.

**State management** is the discipline of organizing, updating, and reading these variables in a consistent, predictable way. Poor state management — scattered global variables modified from many different functions — is the single most common source of bugs in interactive infographics.

Effective state management strategies:

- **Group related state into objects** rather than using many individual global variables
- **Update state in one place** (typically in event handlers or the draw loop) rather than from scattered locations
- **Read state to render** — the draw function reads current state and renders accordingly, creating a clean separation between logic and display

```javascript
// Poor state management: scattered globals
let selectedRegion = null;
let tooltipVisible = false;
let tooltipX = 0;
let tooltipY = 0;
let tooltipText = '';

// Better state management: grouped into an object
let state = {
    selectedRegion: null,
    tooltip: { visible: false, x: 0, y: 0, text: '' }
};
```

### Object Literals

An **object literal** is a JavaScript value that groups related data into key-value pairs enclosed in curly braces. Object literals are the backbone of infographic configuration — every region definition, color scheme, and layout parameter is typically expressed as an object:

```javascript
let region = {
    id: 'nucleus',
    label: 'Nucleus',
    x: 200,
    y: 150,
    width: 100,
    height: 80,
    color: '#4A90D9'
};
```

Objects can be nested to represent hierarchical data, and their properties are accessed with dot notation (`region.label`) or bracket notation (`region['label']`).

### Callback Functions and Arrow Functions

A **callback function** is a function passed as an argument to another function, to be called later when a specific event occurs. Callbacks are fundamental to JavaScript's event-driven architecture. When you write `canvas.mousePressed(handleClick)`, the function `handleClick` is a callback that the system invokes when a mouse press event fires.

An **arrow function** is a concise syntax for writing functions, introduced in ES6:

```javascript
// Traditional function
function double(x) {
    return x * 2;
}

// Arrow function (same behavior)
const double = (x) => x * 2;

// Arrow function with multiple statements
const processRegion = (region) => {
    let scaledX = region.x * scaleFactor;
    let scaledY = region.y * scaleFactor;
    return { ...region, x: scaledX, y: scaledY };
};
```

Arrow functions are especially valuable in infographic code because they keep array transformations and event handlers compact and readable.

### Template Literals

A **template literal** is a string enclosed in backticks (`` ` ``) that supports embedded expressions and multi-line content. Template literals eliminate the awkward string concatenation that makes tooltip and label code hard to read:

```javascript
// String concatenation (hard to read)
let label = 'Region: ' + region.name + ' (' + region.x + ', ' + region.y + ')';

// Template literal (much clearer)
let label = `Region: ${region.name} (${region.x}, ${region.y})`;

// Multi-line template literal (great for HTML generation)
let infobox = `
    <div class="infobox">
        <h3>${region.label}</h3>
        <p>${region.description}</p>
    </div>
`;
```

### Destructuring and Spread Operator

**Destructuring** is a syntax that extracts values from objects or arrays into individual variables in a single statement:

```javascript
// Object destructuring
const { label, x, y, width, height } = region;

// Array destructuring
const [first, second, ...rest] = dataPoints;
```

The **spread operator** (`...`) expands an object or array into its individual elements. It is invaluable for creating modified copies of state without mutating the original:

```javascript
// Copy an object with one property changed
let updatedRegion = { ...region, color: '#FF6600' };

// Merge two arrays
let allRegions = [...headerRegions, ...bodyRegions];

// Copy an array with an additional element
let updatedHistory = [...history, newEntry];
```

### Default Parameters

**Default parameters** allow function parameters to have fallback values when no argument is provided. This is particularly useful for infographic configuration functions where many parameters are optional:

```javascript
function createTooltip(text, x = 0, y = 0, bgColor = '#333', textColor = '#fff') {
    // x, y, bgColor, and textColor use defaults if not specified
    return { text, x, y, bgColor, textColor };
}

// Uses all defaults except text
createTooltip('Hello');

// Overrides position but keeps default colors
createTooltip('Hello', 100, 200);
```

### Array Methods

**Array methods** are built-in functions that transform, filter, and reduce arrays without writing explicit loops. They produce cleaner, more declarative code that expresses *what* you want rather than *how* to compute it:

| Method | Purpose | Example |
|--------|---------|---------|
| `map()` | Transform each element | `regions.map(r => r.label)` → array of labels |
| `filter()` | Keep elements matching a condition | `regions.filter(r => r.visible)` → only visible regions |
| `find()` | Get first element matching a condition | `regions.find(r => r.id === 'nucleus')` → single region |
| `reduce()` | Accumulate into a single value | `values.reduce((sum, v) => sum + v, 0)` → total |
| `forEach()` | Execute side effects for each element | `regions.forEach(r => drawRegion(r))` |
| `some()` | Test if any element matches | `regions.some(r => r.hovered)` → true/false |
| `every()` | Test if all elements match | `regions.every(r => r.valid)` → true/false |

Array methods chain naturally, creating expressive data processing pipelines:

```javascript
// Find all visible regions, scale their positions, and extract labels
let visibleLabels = regions
    .filter(r => r.visible)
    .map(r => ({ ...r, x: r.x * scale, y: r.y * scale }))
    .map(r => r.label);
```

#### Diagram: JavaScript Modern Syntax Playground

<iframe src="../../sims/js-syntax-playground/main.html" width="100%" height="550px" scrolling="no"></iframe>

<details markdown="1">
<summary>JavaScript Modern Syntax Playground</summary>
Type: microsim
**sim-id:** js-syntax-playground<br/>
**Library:** p5.js<br/>
**Status:** Specified

**Bloom Level:** Apply (L3)
**Bloom Verb:** Use
**Learning Objective:** Use modern JavaScript features (arrow functions, template literals, destructuring, spread operator, array methods) by selecting a feature, viewing a before/after code comparison, and running the code interactively to observe the output.

**Instructional Rationale:** Interactive code exploration with before/after comparisons is appropriate because the Apply objective requires learners to practice using new syntax features. Seeing traditional and modern approaches side-by-side, then running both, builds fluency and preference for cleaner modern patterns.

**Canvas Layout:**
- Top section (aliceblue, 60% height): two side-by-side code panels ("Traditional" and "Modern")
- Bottom section (white, silver border, 40% height): output display and feature selector

**Visual Elements:**
- Left code panel: "Traditional JS" — shows the classic way to accomplish a task (e.g., string concatenation, for-loop, function keyword)
- Right code panel: "Modern JS" — shows the equivalent using modern syntax (e.g., template literal, array.map, arrow function)
- Both panels syntax-highlighted with matching color scheme
- Output area: shows the result of executing the modern version
- A visual indicator (green check) showing both versions produce identical output

**Interactive Controls:**
- Dropdown: "Select Feature" with options:
  - "Arrow Functions" — traditional function vs arrow function
  - "Template Literals" — string concatenation vs backtick interpolation
  - "Destructuring" — multiple property access vs destructured assignment
  - "Spread Operator" — Object.assign / concat vs spread
  - "Array Methods" — for-loop with push vs map/filter chain
  - "Default Parameters" — manual checks vs default syntax
- Button: "Run Both" — executes both versions and displays their outputs
- Button: "Next Feature" — cycles to the next feature
- Each feature uses infographic-relevant example data (regions, colors, labels)

**Behavior:**
- Selecting a feature updates both code panels and the output area
- "Run Both" animates execution (brief highlight of each line) and displays outputs side-by-side
- A small "Characters saved" counter shows how much shorter the modern version is
- Responsive to window resize; code panels stack vertically on narrow screens

**Default Parameters:**
- Start with "Arrow Functions"
- Canvas width: responsive
- Canvas height: 500px

Implementation: p5.js with pre-stored code examples rendered as styled text
</details>

## Animation Loops and Frame Rate

Interactive infographics often include animated elements — transitions, pulsing highlights, moving particles, or smoothly updating charts. Understanding animation loops and frame rate is essential for creating smooth, performant animations.

### Animation Loop

An **animation loop** is a function that the browser calls repeatedly to update and redraw the screen. In p5.js, this is the `draw()` function, which executes continuously (by default, 60 times per second). Each execution of the loop is called a **frame**.

The standard p5.js animation pattern:

```javascript
function setup() {
    createCanvas(800, 500);
}

function draw() {
    background(240, 248, 255); // aliceblue - clears the canvas each frame

    // Read current state
    // Calculate positions and styles
    // Draw all visual elements
}
```

The key insight is that `draw()` repaints the entire canvas from scratch every frame. This "clear and redraw" approach is simple and reliable: you never need to track what changed — you just render the current state every time.

### Frame Rate

The **frame rate** is the number of times the animation loop executes per second, measured in frames per second (fps). A frame rate of 60 fps means the screen updates every \( \frac{1}{60} \approx 16.7 \) milliseconds. For most infographic animations, 30 fps is visually smooth, and even 15 fps can be acceptable for slow transitions.

In p5.js, you control frame rate with `frameRate(30)` in `setup()`. Lower frame rates reduce CPU usage, which matters for complex infographics that might run alongside other content on the same page. The built-in variable `frameCount` tracks the total number of frames since the sketch started, which is useful for time-based animations.

| Frame Rate | Update Interval | Use Case |
|------------|----------------|----------|
| 60 fps | 16.7 ms | Smooth animation, games, fast interaction |
| 30 fps | 33.3 ms | Standard infographic animations |
| 15 fps | 66.7 ms | Slow transitions, battery-sensitive devices |
| 1 fps | 1000 ms | Dashboard-style periodic updates |

!!! mascot-thinking "Key Insight"
    <img src="../../img/mascot/thinking.png" class="mascot-admonition-img" alt="Percy is thinking">
    Not every infographic needs animation. If your infographic only changes in response to user clicks (not continuous movement), consider using `noLoop()` in p5.js and calling `redraw()` only when state changes. This eliminates unnecessary CPU usage — your infographic sits dormant until the user interacts.

## Design Patterns for Infographic Code

A **design pattern** is a reusable solution to a commonly occurring problem in software design. As your infographics grow in complexity — from simple labeled diagrams to multi-region interactive overlays — design patterns help you organize code so that it remains readable, testable, and maintainable.

### Configuration Object Pattern

The **configuration object** pattern centralizes all adjustable parameters into a single object, separating configuration from logic. This is the most immediately useful pattern for infographic development because it makes infographics easy to customize without modifying core code:

```javascript
const config = {
    canvas: { width: 800, height: 500 },
    colors: {
        background: '#F0F8FF',
        regionDefault: '#4A90D9',
        regionHover: '#FF6600',
        text: '#333333'
    },
    regions: [
        { id: 'nucleus', label: 'Nucleus', x: 0.25, y: 0.30, w: 0.15, h: 0.16 },
        { id: 'membrane', label: 'Cell Membrane', x: 0.10, y: 0.10, w: 0.80, h: 0.80 }
    ],
    tooltip: { offsetX: 10, offsetY: 20, maxWidth: 200 }
};
```

With this pattern, changing colors, adding regions, or adjusting layout is a matter of editing the configuration object — the drawing and interaction code remains untouched.

### Observer Pattern

The **observer pattern** establishes a one-to-many relationship where a change in one object automatically notifies and updates all dependent objects. In infographic terms, when the user selects a region, multiple parts of the interface need to respond: the region highlights, the infobox updates, and an analytics event fires.

```javascript
class EventBus {
    constructor() {
        this.listeners = {};
    }

    on(event, callback) {
        if (!this.listeners[event]) this.listeners[event] = [];
        this.listeners[event].push(callback);
    }

    emit(event, data) {
        (this.listeners[event] || []).forEach(cb => cb(data));
    }
}

const bus = new EventBus();

// Multiple components listen for the same event
bus.on('regionSelected', (region) => highlightRegion(region));
bus.on('regionSelected', (region) => updateInfobox(region));
bus.on('regionSelected', (region) => logAnalyticsEvent(region));

// When a region is clicked, all listeners respond
bus.emit('regionSelected', { id: 'nucleus', label: 'Nucleus' });
```

The observer pattern decouples the code that detects user interaction from the code that responds to it, making each piece independently testable and replaceable.

### Factory Pattern

The **factory pattern** provides a centralized function for creating objects of a particular type, encapsulating the creation logic so that calling code does not need to know the details:

```javascript
function createRegion(id, label, x, y, w, h, description) {
    return {
        id,
        label,
        x, y, w, h,
        description,
        hovered: false,
        selected: false,
        draw(canvas) { /* rendering logic */ },
        containsPoint(mx, my) { /* hit detection logic */ }
    };
}

// Create regions from data
let regions = data.map(d => createRegion(d.id, d.label, d.x, d.y, d.w, d.h, d.desc));
```

The factory pattern is especially valuable when loading region definitions from JSON: the factory transforms raw data objects into fully functional region objects with methods for drawing and hit detection.

| Pattern | Problem It Solves | Infographic Use Case |
|---------|------------------|---------------------|
| Configuration Object | Hardcoded values scattered through code | Centralize colors, dimensions, region data |
| Observer | Tight coupling between event source and handlers | Decouple click detection from infobox, highlighting, analytics |
| Factory | Repetitive object creation logic | Generate region objects from JSON data |

#### Diagram: Design Patterns in Infographic Architecture

<iframe src="../../sims/design-patterns-infographic/main.html" width="100%" height="550px" scrolling="no"></iframe>

<details markdown="1">
<summary>Design Patterns in Infographic Architecture</summary>
Type: infographic
**sim-id:** design-patterns-infographic<br/>
**Library:** p5.js<br/>
**Status:** Specified

**Bloom Level:** Analyze (L4)
**Bloom Verb:** Differentiate
**Learning Objective:** Differentiate between the Configuration Object, Observer, and Factory design patterns by examining how each one structures the data flow and component relationships within an interactive infographic.

**Instructional Rationale:** An interactive architecture diagram with selectable patterns is appropriate because the Analyze objective requires learners to compare structural approaches. Showing how the same infographic's code is organized differently under each pattern builds analytical understanding of when to apply each one.

**Canvas Layout:**
- Main area (aliceblue, 70% width): architecture diagram showing components and data flow
- Right panel (white, silver border, 30% width): pattern description and code snippet

**Visual Elements:**
- Architecture diagram with labeled boxes representing infographic components:
  - "Config / Data" (blue)
  - "Event Detection" (green)
  - "Region Renderer" (orange)
  - "Infobox Manager" (purple)
  - "Analytics Logger" (red)
- Arrows between components showing data flow and dependencies
- The arrow styles and component groupings change based on the selected pattern:
  - **Configuration Object:** Shows a central "Config" box with arrows radiating out to all other components; emphasizes centralized data
  - **Observer:** Shows "Event Detection" emitting events to an "Event Bus" which fans out to Renderer, Infobox, and Analytics; emphasizes decoupled communication
  - **Factory:** Shows a "Region Factory" box that creates Region objects consumed by the Renderer; emphasizes object creation

**Interactive Controls:**
- Three clickable tabs: "Configuration Object" | "Observer" | "Factory"
- Selecting a tab rearranges the architecture diagram with animated transitions
- Hovering over any component box shows a tooltip with its responsibility
- Hovering over any arrow shows a tooltip with what data flows through it
- Right panel updates with: pattern name, one-paragraph description, 10-line code snippet, and "Best for:" bullet points

**Behavior:**
- Switching patterns animates components moving to new positions and arrows redrawing
- The currently selected pattern tab is highlighted
- Responsive to window resize

**Default Parameters:**
- Start with "Configuration Object" selected
- Canvas width: responsive
- Canvas height: 500px

Implementation: p5.js with animated component diagram
</details>

## Browser Developer Tools

**Browser developer tools** (DevTools) are built into every modern browser and provide indispensable capabilities for debugging, profiling, and optimizing interactive infographics. Learning to use DevTools effectively will save you hours of frustration and help you build better infographics faster.

### Console Logging

**Console logging** is the simplest and most frequently used debugging technique. The `console` object provides several methods for outputting information to the browser's console panel:

```javascript
console.log('Region clicked:', region.id);          // General information
console.warn('Region has no description:', region);  // Warning (yellow)
console.error('Failed to load overlay data');        // Error (red)
console.table(regions);                              // Tabular display of array/object
console.time('render');                              // Start a timer
// ... rendering code ...
console.timeEnd('render');                           // Stop timer, print elapsed
```

For infographic debugging, `console.log` inside event handlers and the draw loop reveals the current state of variables, which regions are being hit-detected, and what data is being rendered. Use `console.table` to inspect arrays of region objects — it displays them in a readable table format.

### Network Tab Debugging

The **Network tab** in DevTools shows every HTTP request the page makes — script files, stylesheets, images, JSON data, and font files. For infographic development, the Network tab answers critical questions:

- Did the p5.js library load from the CDN, or did the request fail?
- Is the overlay JSON file loading correctly, or is there a 404 error?
- How large are the assets, and are any unexpectedly slow to load?
- Are CORS headers preventing a cross-origin data request?

Each request in the Network tab shows the URL, HTTP status code, file size, and load time. Filtering by type (JS, XHR, Img) helps you focus on the relevant requests.

### Performance Profiling

**Performance profiling** measures how long different parts of your code take to execute, helping you identify bottlenecks that cause janky animations or slow interactions. The Performance tab in DevTools records a timeline of all browser activity — JavaScript execution, layout calculations, painting, and compositing.

For infographic optimization, performance profiling reveals:

- Whether the draw loop is executing within its frame budget (16.7ms for 60fps)
- Which functions consume the most CPU time
- Whether hit detection across many regions is causing performance issues
- Whether layout recalculations (reflows) are triggered unnecessarily

A practical workflow: record 2-3 seconds of interaction, then examine the flame chart to find functions that take more than a few milliseconds per frame.

#### Diagram: Browser DevTools Navigator

<iframe src="../../sims/devtools-navigator/main.html" width="100%" height="550px" scrolling="no"></iframe>

<details markdown="1">
<summary>Browser DevTools Navigator</summary>
Type: infographic
**sim-id:** devtools-navigator<br/>
**Library:** p5.js<br/>
**Status:** Specified

**Bloom Level:** Remember (L1)
**Bloom Verb:** Identify
**Learning Objective:** Identify the key panels of browser developer tools (Console, Network, Performance, Elements) and recall what debugging information each panel provides for infographic development.

**Instructional Rationale:** A labeled interactive diagram with hover-to-reveal details is appropriate because the Remember objective requires learners to associate each DevTools panel with its purpose. Hover interactions reinforce name-to-function associations through repeated retrieval practice.

**Canvas Layout:**
- Drawing area (aliceblue): a stylized representation of a browser DevTools window with labeled tab panels
- Bottom info panel (white, silver border): description of the currently hovered tab

**Visual Elements:**
- A simulated browser DevTools window with four tabs across the top:
  - "Console" (blue tab)
  - "Network" (green tab)
  - "Performance" (orange tab)
  - "Elements" (purple tab)
- Below the tabs: a preview area showing a representative screenshot/mockup of what each panel looks like
- Console preview: shows colored log lines (white, yellow, red)
- Network preview: shows a waterfall chart of requests
- Performance preview: shows a flame chart timeline
- Elements preview: shows a DOM tree with highlighted element

**Interactive Controls:**
- Hovering over a tab highlights it and updates the preview and info panel
- Clicking a tab "selects" it (stays active until another is clicked)
- Info panel shows: panel name, keyboard shortcut, 3-4 bullet points describing infographic-relevant uses
- A "Quiz Mode" toggle that hides panel names and asks the user to identify each panel by its preview

**Behavior:**
- Smooth transitions between panel previews
- Quiz Mode: panels shown without labels; clicking a panel reveals its name with correct/incorrect feedback
- Responsive to window resize

**Default Parameters:**
- Start with Console tab selected
- Quiz Mode: off
- Canvas width: responsive
- Canvas height: 500px

Implementation: p5.js with stylized DevTools mockup
</details>

## Version Pinning and Local Development

### Version Pinning

**Version pinning** is the practice of specifying an exact version number when loading a library from a CDN, ensuring that your infographic always uses the same tested version:

```html
<!-- Pinned to exact version (recommended) -->
<script src="https://cdn.jsdelivr.net/npm/p5@1.9.0/lib/p5.min.js"></script>

<!-- Unpinned - loads latest (risky) -->
<script src="https://cdn.jsdelivr.net/npm/p5/lib/p5.min.js"></script>
```

Without version pinning, a library update could introduce breaking changes that silently break your infographic. Version pinning is especially important for educational content that may be deployed for months or years — students should see the same behavior regardless of when they access the textbook.

### Local Development Server

A **local development server** is a lightweight web server that runs on your computer, serving your infographic files over HTTP. A local server is necessary because:

- Browsers restrict file:// access to local files for security reasons (same-origin policy)
- JSON data loading via `fetch()` or `loadJSON()` requires HTTP, not file://
- Hot-reloading servers automatically refresh the browser when you save changes

For MkDocs-based intelligent textbooks, `mkdocs serve` provides a local development server at `http://127.0.0.1:8000` that watches for file changes and reloads automatically. For standalone infographic development, Python's built-in server (`python -m http.server 8000`) or Node.js alternatives (`npx serve`) are quick options.

## Responsive Design for Infographics

Responsive design ensures that infographics adapt gracefully to different screen sizes — from mobile phones (360px wide) to wide desktop monitors (1400px+). In intelligent textbooks, infographics are embedded in iframes within the MkDocs content area, which typically ranges from 600px to 900px wide. Your infographics must look good across this range and handle narrower or wider extremes.

### Mobile-First Design

**Mobile-first design** is a strategy that starts with the smallest screen layout and progressively adds complexity for larger screens. For infographic development, this means:

1. Design the core visualization for a narrow viewport first (~360px)
2. Ensure all essential information is visible without horizontal scrolling
3. Add side-by-side panels, larger labels, and enhanced interactions as width increases

The advantage of mobile-first is that it forces you to prioritize the most important visual elements. If your infographic works well on a small screen, it will work beautifully on a larger one.

### Responsive Breakpoints and Layouts

**Responsive breakpoints** are the specific viewport widths where your layout changes. Unlike the general breakpoints introduced in Chapter 6, this section focuses on how to implement breakpoint-driven layout changes in JavaScript for canvas-based infographics.

In p5.js, responsive layout is implemented by checking `windowWidth` and adjusting the layout accordingly:

```javascript
function getLayout() {
    if (windowWidth < 600) {
        return { columns: 1, controlsBelow: true, fontSize: 12 };  // Mobile
    } else if (windowWidth < 900) {
        return { columns: 1, controlsBelow: true, fontSize: 14 };  // Tablet
    } else {
        return { columns: 2, controlsBelow: false, fontSize: 16 }; // Desktop
    }
}

function windowResized() {
    resizeCanvas(windowWidth, calculateHeight());
    // Layout recalculates automatically on next draw() call
}
```

The three layout tiers map to common device categories:

- **Mobile layout** (< 600px): Single column, controls stacked below the drawing area, smaller font sizes, simplified visual elements
- **Tablet layout** (600px – 899px): Single column with more generous spacing, medium font sizes, full visual elements
- **Desktop layout** (900px+): Optional side-by-side panels (drawing area + control panel), larger fonts, enhanced interactions

| Layout Tier | Width Range | Columns | Controls Position | Font Scaling |
|------------|-------------|---------|-------------------|-------------|
| Mobile | < 600px | 1 | Below drawing | 0.75x |
| Tablet | 600–899px | 1 | Below drawing | 0.875x |
| Desktop | 900px+ | 1 or 2 | Side or below | 1.0x |

#### Diagram: Responsive Layout Simulator

<iframe src="../../sims/responsive-layout-sim/main.html" width="100%" height="550px" scrolling="no"></iframe>

<details markdown="1">
<summary>Responsive Layout Simulator</summary>
Type: microsim
**sim-id:** responsive-layout-sim<br/>
**Library:** p5.js<br/>
**Status:** Specified

**Bloom Level:** Apply (L3)
**Bloom Verb:** Demonstrate
**Learning Objective:** Demonstrate how an infographic layout adapts to different viewport widths by adjusting a simulated viewport slider and observing how breakpoints trigger layout changes between mobile, tablet, and desktop configurations.

**Instructional Rationale:** Interactive slider-driven exploration is appropriate because the Apply objective requires learners to see breakpoint-triggered layout changes in action. Controlling the viewport width directly makes the abstract concept of responsive breakpoints tangible and memorable.

**Canvas Layout:**
- Drawing area (aliceblue): contains a simulated infographic preview that responds to the viewport slider
- Control area (white, silver border): viewport width slider and layout info

**Visual Elements:**
- A simulated browser frame (gray border with rounded top corners) containing a miniature infographic with:
  - A drawing area (light blue rectangle)
  - A control panel (white rectangle with two simulated sliders and a button)
  - Three labeled regions within the drawing area
  - An infobox
- The browser frame width changes as the user drags the viewport slider
- Breakpoint markers on the slider track at 600px and 900px, labeled "Mobile | Tablet | Desktop"
- Current layout description: "Layout: Desktop (2 columns)" or "Layout: Mobile (stacked)"
- Animated transitions as components rearrange when crossing a breakpoint

**Interactive Controls:**
- Slider: "Viewport Width" (range 320–1400px, default 900px)
- The simulated infographic rearranges in real-time as the slider moves:
  - Below 600px: drawing area and controls stack vertically, regions shrink, font sizes decrease
  - 600–899px: still stacked but with more spacing and larger elements
  - 900px+: controls move to the right side panel, full-size elements
- Info panel shows: current width in pixels, active breakpoint tier, layout description
- Checkbox: "Show Breakpoint Lines" — overlays vertical dashed lines at 600px and 900px on the simulated viewport

**Behavior:**
- Smooth animation as the layout rearranges when crossing breakpoints
- The viewport slider physically resizes the simulated browser frame
- Labels and font sizes scale proportionally
- The actual MicroSim canvas is always full-width (responsive to the real window); only the simulated infographic inside it changes

**Default Parameters:**
- Viewport Width: 900px
- Show Breakpoint Lines: on
- Canvas width: responsive
- Canvas height: 500px

Implementation: p5.js with simulated viewport and breakpoint detection
</details>

## Error Handling and Resilience

Robust infographics need to handle unexpected situations gracefully — missing data files, unsupported browser features, or network failures. This section covers the strategies that keep your infographic functional even when things go wrong.

### Error Handling

**Error handling** in JavaScript uses `try/catch` blocks to intercept runtime errors and respond appropriately rather than crashing:

```javascript
async function loadOverlayData(url) {
    try {
        let response = await fetch(url);
        if (!response.ok) throw new Error(`HTTP ${response.status}`);
        let data = await response.json();
        return data;
    } catch (error) {
        console.error('Failed to load overlay data:', error);
        return getDefaultOverlayData(); // Fallback to embedded defaults
    }
}
```

For infographic development, the most important errors to handle are:

- **Data loading failures** — JSON or CSV files that fail to load (network error, wrong path)
- **Invalid data** — Data files that load but contain unexpected values or missing fields
- **Canvas/rendering errors** — Drawing operations that fail on certain browsers

### Progressive Enhancement and Graceful Degradation

**Progressive enhancement** and **graceful degradation** are complementary strategies for handling varying browser capabilities:

- **Progressive enhancement** starts with a baseline experience that works everywhere, then adds advanced features for capable browsers. Example: start with a static labeled diagram, then enhance with hover interactions and animations if JavaScript and Canvas are available.

- **Graceful degradation** starts with the full-featured experience and provides fallbacks when features are unavailable. Example: build the full interactive infographic, but display a static image if the Canvas API is not supported.

For modern infographic development, progressive enhancement is generally preferred because it ensures that the core educational content is always accessible, even if the interactive elements fail to load.

### Feature Detection and Polyfills

**Feature detection** is the practice of checking whether a browser supports a specific API before using it, rather than assuming capabilities based on the browser name:

```javascript
// Feature detection (good)
if ('IntersectionObserver' in window) {
    // Use IntersectionObserver for lazy loading
} else {
    // Fall back to scroll event listener
}

// Browser sniffing (bad - fragile and unreliable)
if (navigator.userAgent.includes('Chrome')) {
    // Assume Chrome supports everything
}
```

A **polyfill** is a piece of code that provides missing functionality in older browsers. Polyfills implement standard APIs using available features, so your code can use modern APIs without worrying about browser support:

```javascript
// Polyfill for Array.prototype.includes (older browsers)
if (!Array.prototype.includes) {
    Array.prototype.includes = function(item) {
        return this.indexOf(item) !== -1;
    };
}
```

In practice, polyfills are rarely needed for infographic development because the target audience (educational institutions) typically uses modern browsers. However, understanding the concept helps you make informed decisions about which JavaScript features are safe to use.

| Strategy | Approach | Starting Point | When to Use |
|----------|----------|---------------|-------------|
| Progressive Enhancement | Build up from baseline | Minimal (static content) | Diverse audience, accessibility priority |
| Graceful Degradation | Fall back from full | Full-featured | Known modern audience, complex features |
| Feature Detection | Test before using | N/A (technique) | Any time you use a newer API |
| Polyfill | Add missing features | N/A (technique) | Supporting older browsers for specific APIs |

!!! mascot-warning "Common Mistake"
    <img src="../../img/mascot/warning.png" class="mascot-admonition-img" alt="Percy warns you">
    A common mistake is spending days ensuring compatibility with ancient browsers that your audience does not use. Check your analytics first. If 98% of your textbook's visitors use modern browsers (Chrome, Firefox, Safari, Edge — all recent versions), focus your effort on great interactive experiences rather than polyfills for Internet Explorer.

## Putting It All Together

The JavaScript skills and responsive design patterns from this chapter combine into a practical development workflow for interactive infographics:

1. **Start with a configuration object** that defines all visual parameters, region data, and layout settings
2. **Use modern syntax** (arrow functions, destructuring, template literals, array methods) for clean, readable code
3. **Structure interactions with the observer pattern** so that click/hover detection, visual updates, and analytics logging are decoupled
4. **Create region objects with a factory function** that transforms raw JSON data into drawable, interactive objects with hit detection
5. **Implement the animation loop** with appropriate frame rate, using `noLoop()` and `redraw()` for non-animated infographics
6. **Add responsive breakpoints** that adapt the layout for mobile, tablet, and desktop viewports
7. **Handle errors gracefully** with try/catch, fallback data, and feature detection
8. **Debug with DevTools** — console logging for state inspection, network tab for asset loading, performance profiling for animation optimization

#### Diagram: Infographic Development Workflow

<iframe src="../../sims/infographic-dev-workflow/main.html" width="100%" height="500px" scrolling="no"></iframe>

<details markdown="1">
<summary>Infographic Development Workflow</summary>
Type: workflow
**sim-id:** infographic-dev-workflow<br/>
**Library:** p5.js<br/>
**Status:** Specified

**Bloom Level:** Understand (L2)
**Bloom Verb:** Summarize
**Learning Objective:** Summarize the end-to-end infographic development workflow by tracing the sequence from configuration setup through responsive deployment, identifying which JavaScript concepts and design patterns apply at each stage.

**Instructional Rationale:** A step-through workflow diagram with hover details is appropriate because the Understand objective requires learners to see how the individual concepts from this chapter fit together in a coherent development process. The workflow structure provides organizational scaffolding.

**Canvas Layout:**
- Drawing area (aliceblue): horizontal workflow diagram with 8 connected steps
- Bottom panel (white, silver border): step details and concept tags

**Visual Elements:**
- 8 workflow steps arranged left-to-right (wrapping to a second row on narrow screens):
  1. "Define Config" (blue box) — Configuration Object pattern
  2. "Load Data" (blue box) — JSON/fetch, error handling
  3. "Create Regions" (green box) — Factory pattern, destructuring
  4. "Setup Canvas" (green box) — p5.js setup, responsive sizing
  5. "Draw Loop" (orange box) — Animation loop, frame rate, state management
  6. "Handle Events" (orange box) — Observer pattern, callbacks, touch/mouse
  7. "Adapt Layout" (purple box) — Breakpoints, mobile-first, progressive enhancement
  8. "Debug & Profile" (red box) — Console, Network, Performance
- Arrows connecting sequential steps
- Each step box contains a small icon representing its concept

**Interactive Controls:**
- Hovering over a step highlights it and displays in the bottom panel:
  - Step name and description (2-3 sentences)
  - Related concepts from this chapter (as colored tags)
  - A 3-5 line code snippet showing the key pattern
- Clicking a step "expands" it to show sub-steps
- Button: "Play Walkthrough" — auto-advances through steps with narration in the info panel

**Behavior:**
- Steps highlight sequentially during walkthrough mode (2 seconds per step)
- Hovering overrides the walkthrough on the current step
- Responsive: steps wrap to multiple rows on narrow viewports
- Responsive to window resize

**Default Parameters:**
- No step selected initially
- Walkthrough mode: off
- Canvas width: responsive
- Canvas height: 450px

Implementation: p5.js with step-based workflow and hover interaction
</details>

## Summary

!!! mascot-celebration "Excellent Work!"
    <img src="../../img/mascot/celebration.png" class="mascot-admonition-img" alt="Percy celebrates">
    You now have a complete JavaScript and responsive design toolkit for building interactive infographics! From modern syntax that makes your code elegant, to design patterns that keep it organized, to debugging tools that help you fix issues fast — you are ready to tackle real infographic projects with confidence. Display it with style!

In this chapter, you learned that:

- **JavaScript fundamentals** include variables, functions, control flow, and event handling — the core language features that power every interactive infographic
- **Global variables** store infographic state, and **state management** organizes these variables into coherent, grouped objects for predictable behavior
- **Object literals** group related data into key-value pairs, forming the foundation of infographic configuration
- **Callback functions** enable event-driven programming, and **arrow functions** provide concise syntax for writing them
- **Template literals** simplify string building with embedded expressions, while **destructuring** and the **spread operator** provide clean syntax for extracting and copying data
- **Default parameters** give function arguments fallback values, reducing boilerplate in configuration functions
- **Array methods** (`map`, `filter`, `find`, `reduce`) replace explicit loops with expressive, chainable data transformations
- **Animation loops** repaint the canvas every frame, and **frame rate** controls how often this happens — with `noLoop()`/`redraw()` available for non-animated infographics
- **Design patterns** solve recurring architectural problems: **configuration objects** centralize parameters, the **observer pattern** decouples event sources from handlers, and the **factory pattern** standardizes object creation from data
- **Version pinning** locks library versions for reliable long-term behavior, and a **local development server** is required for proper file loading during development
- **Browser developer tools** provide **console logging** for state inspection, **network tab debugging** for asset loading verification, and **performance profiling** for animation optimization
- **Responsive breakpoints** trigger layout changes at specific viewport widths, with **mobile-first design** ensuring the core experience works on small screens before enhancing for **tablet** and **desktop layouts**
- **Error handling** with try/catch provides resilience, **progressive enhancement** builds up from a baseline, **graceful degradation** falls back from full features, **feature detection** checks capabilities before using them, and **polyfills** add missing APIs for older browsers

## References

- [MDN Web Docs: JavaScript Guide](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide)
- [MDN Web Docs: Arrow Functions](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/Arrow_functions)
- [MDN Web Docs: Template Literals](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Template_literals)
- [MDN Web Docs: Destructuring Assignment](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Destructuring_assignment)
- [MDN Web Docs: Array Methods](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array)
- [Wikipedia: Observer Pattern](https://en.wikipedia.org/wiki/Observer_pattern)
- [Wikipedia: Factory Method Pattern](https://en.wikipedia.org/wiki/Factory_method_pattern)
- [MDN Web Docs: Chrome DevTools](https://developer.chrome.com/docs/devtools/)
- [MDN Web Docs: Responsive Design](https://developer.mozilla.org/en-US/docs/Learn/CSS/CSS_layout/Responsive_Design)
- [Wikipedia: Progressive Enhancement](https://en.wikipedia.org/wiki/Progressive_enhancement)
