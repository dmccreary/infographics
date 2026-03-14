---
title: Visual Problem-Solving Frameworks
description: Structured frameworks for deciding which visual to create, including Dan Roam's six frameworks, the Six W's, and the SQVID drawing style selector.
generated_by: claude skill chapter-content-generator
date: 2026-03-13 20:35:47
version: 0.05
---

# Visual Problem-Solving Frameworks

## Summary

This chapter introduces structured frameworks for deciding which type of visual to create for a given communication challenge. You will learn Dan Roam's six visual frameworks from "The Back of the Napkin" (portrait, chart, map, timeline, flowchart, and multi-variable plot), the Six W's framework for matching question types to visual types, and the SQVID framework for choosing between drawing styles such as simple vs. elaborate and qualitative vs. quantitative. These frameworks provide a systematic approach to visual problem solving.

## Concepts Covered

This chapter covers the following 15 concepts from the learning graph:

1. Dan Roam Framework
2. Portrait Drawing
3. Chart Drawing
4. Map Drawing
5. Timeline Drawing
6. Flowchart Drawing
7. Multi-Variable Plot
8. Six W's Framework
9. SQVID Framework
10. Simple vs Elaborate
11. Qualitative vs Quantitative
12. Vision vs Execution
13. Individual vs Comparison
14. Delta vs Status Quo
15. Visual Problem Solving

## Prerequisites

This chapter builds on concepts from:

- [Chapter 1: Foundations of Interactive Infographics](../01-foundations-of-interactive-infographics/index.md)
- [Chapter 2: Infographic Taxonomy and Classification](../02-infographic-taxonomy-and-classification/index.md)

---

!!! mascot-welcome "Let's Make It Visual!"
    <img src="../../img/mascot/welcome.png" class="mascot-admonition-img" alt="Percy welcomes you">
    Welcome back, designers! This chapter hands you a superpower: the ability
    to look at any communication challenge and know exactly which visual to
    reach for. No more guessing — just clear, proven frameworks. Let's make
    it visual!

## The Power of Visual Problem Solving

Here is the great news: you do not need to be an artist to think visually. **Visual problem solving** is not about drawing skill — it is about choosing the right type of picture to clarify the right kind of problem. And that choice can be made systematically.

In Chapters 2 and 3, you built a vocabulary of infographic types and diagram patterns. You now know *what* visual options exist. This chapter answers the next question: *which one should I use?* The answer depends not on personal taste but on the structure of the problem you are trying to solve. Different questions demand different visuals, and the frameworks in this chapter give you a reliable method for matching question to visual, every time.

The approach comes primarily from Dan Roam's influential book *The Back of the Napkin* (2008), which demonstrated that anyone — regardless of artistic background — can use simple drawings to solve complex problems. Roam's insight was that there are only six fundamental types of pictures, and each one maps to a specific type of question. Once you learn the mapping, visual problem solving becomes as natural as choosing the right tool from a well-organized toolbox.

This chapter covers three interconnected frameworks:

1. **The Six W's Framework** — maps question types (who, what, how much, where, when, how) to visual types
2. **Dan Roam's Six Visual Frameworks** — the six fundamental picture types
3. **The SQVID Framework** — five style dimensions for refining how you draw your chosen visual

Together, these frameworks form a complete decision system: the Six W's tell you *what* to draw, the six visual frameworks show you *how* to draw it, and the SQVID refines *the style* of your drawing.

## The Six W's Framework: Matching Questions to Visuals

The **Six W's Framework** is the entry point to visual problem solving. It starts with a beautifully simple observation: every communication challenge begins with a question, and every question falls into one of six categories. Each category maps to exactly one type of visual.

| Question Type | What You Are Asking | Visual Type |
|--------------|-------------------|-------------|
| **Who / What** | What does it look like? Who is involved? | Portrait |
| **How Much** | How do the quantities compare? | Chart |
| **Where** | Where are things located relative to each other? | Map |
| **When** | What happened first? What comes next? | Timeline |
| **How** | How does this process work? | Flowchart |
| **Why** | How do multiple variables interact? | Multi-Variable Plot |

This mapping is powerful because it is exhaustive. Any question you can ask falls into one of these six categories, which means any problem you need to visualize has a clear starting point. You never have to stare at a blank canvas wondering what to draw — you simply identify the question and the framework points you to the answer.

The six question types also form a natural progression from simple to complex:

- **Who/What** is the simplest — just show what something looks like
- **How Much** adds quantitative comparison
- **Where** adds spatial relationships
- **When** adds temporal sequence
- **How** adds process logic and decision branching
- **Why** combines multiple variables to explain causality

This progression means that more complex problems often require layered visuals. A comprehensive explanation of climate change might start with a portrait (what does the greenhouse effect look like?), add a chart (how much has temperature increased?), include a map (where are the most affected regions?), incorporate a timeline (when did emissions accelerate?), layer in a flowchart (how does the carbon cycle work?), and culminate in a multi-variable plot (why do certain policies produce better outcomes?).

!!! mascot-thinking "Key Insight"
    <img src="../../img/mascot/thinking.png" class="mascot-admonition-img" alt="Percy is thinking">
    The Six W's framework is not just a diagram selection tool — it is
    a thinking tool. When you struggle to explain something, ask yourself:
    "Which W am I really trying to answer?" The question type will guide
    you to the visual that makes your explanation clear.

#### Diagram: Six W's Visual Matcher

<iframe src="../../sims/six-ws-visual-matcher/main.html" width="100%" height="550px" scrolling="no"></iframe>

<details markdown="1">
<summary>Six W's Visual Matcher</summary>
Type: diagram
**sim-id:** six-ws-visual-matcher<br/>
**Library:** p5.js<br/>
**Status:** Specified

**Bloom Level:** Understand (L2)
**Bloom Verb:** Explain
**Learning Objective:** Explain the mapping between each of the Six W question types and its corresponding visual type by interacting with a visual reference card.

Instructional Rationale: A static table can show the mapping, but an interactive version lets learners click on each question type to see its visual rendered as a miniature example alongside a real-world scenario. This connects the abstract framework to concrete practice.

Visual elements:
- Six horizontal rows, one per question type, arranged vertically on the left third of the canvas
- Each row shows: the W question (e.g., "Who / What"), an arrow, and a label for the visual type (e.g., "Portrait")
- The right two-thirds of the canvas is an info panel that changes based on selection
- When a row is selected, the info panel shows:
  - A miniature rendering of the visual type (e.g., a small portrait sketch for Who/What, a bar chart for How Much)
  - A real-world example: "A biology teacher wants to show students what a mitochondrion looks like → Portrait drawing with labeled parts"
  - The question type's position on the simple-to-complex scale (1-6 dots)
- Default state: All six rows visible, info panel shows "Click a question type to see its visual match and a real-world example."

Color scheme:
- Who/What: blue (#4285F4)
- How Much: orange (#FB8C00)
- Where: green (#34A853)
- When: purple (#8E44AD)
- How: teal (#00897B)
- Why: red (#E53935)

Interactive features:
- Click a row to select it and populate the info panel
- Hover over a row to highlight it
- Selected row gets a filled background; others stay outlined

Canvas layout: Width-responsive, aliceblue background, minimum 600px width
</details>

## Dan Roam's Six Visual Frameworks

Now that the Six W's tell you which question type you are facing, the **Dan Roam Framework** gives you the six fundamental picture types to answer those questions. Each framework is a visual template — a basic structure that you can adapt and elaborate for any subject matter.

### Portrait Drawing

A **portrait drawing** answers the question "Who or what is this?" It shows what something looks like — its form, components, and visual identity. Portraits range from simple stick figures to detailed technical illustrations, but their purpose is always the same: to make the subject *recognizable*.

In educational infographics, portrait drawings serve as the foundation for labeled diagrams. The animal cell diagram from Chapter 1 is a portrait — it shows what a cell looks like, with interactive overlays that reveal the identity and function of each organelle. Other examples include:

- A portrait of a computer motherboard with labeled components
- A portrait of a historical figure with biographical details on hover
- A portrait of a building's floor plan with room labels

Portrait drawings are the most intuitive visual type because they mirror how we naturally see the world. When you show someone a picture and they say "I see what that is," you have created a successful portrait.

### Chart Drawing

A **chart drawing** answers the question "How much?" It represents quantities visually, using length, area, position, or color to encode numerical values. Charts are the workhorses of data visualization — bar charts, line charts, pie charts, scatter plots, and their many variants all belong to this category.

Charts excel at making comparisons visible. When a biology teacher wants to show that mitochondria produce 36 ATP molecules per glucose molecule while glycolysis produces only 2, a bar chart makes the 18:1 ratio instantly apparent in a way that the numbers alone cannot.

Interactive charts add filtering, tooltips with exact values, and the ability to toggle data series — transforming static comparison into dynamic exploration.

### Map Drawing

A **map drawing** answers the question "Where?" It shows spatial relationships — how things are positioned relative to each other, whether on a geographic map, a floor plan, a network topology, or a conceptual landscape.

Maps are essential whenever location or spatial arrangement carries meaning. A geographic map of disease spread, a network diagram of server infrastructure, or a seating chart for a classroom all use the map framework. The key insight is that "map" does not mean only geographic maps — any visual that shows relative position is a map drawing.

Interactive maps are among the most powerful educational tools because spatial exploration is inherently engaging. Learners can zoom, pan, and click to discover information embedded in the spatial layout.

### Timeline Drawing

A **timeline drawing** answers the question "When?" It shows events arranged along a temporal axis, making sequence, duration, and simultaneity visible. Timelines can be linear (a single horizontal line) or branching (multiple parallel tracks showing concurrent developments).

Timelines are indispensable for history, project management, scientific processes, and any subject where understanding *the order* of events is essential to understanding the content itself. An interactive timeline that lets learners zoom from decades to individual months, with hoverable event details, turns a static chronology into an explorable narrative.

### Flowchart Drawing

A **flowchart drawing** answers the question "How?" It shows a process — a sequence of steps with decision points, branches, and loops. Where a timeline shows *when* things happen, a flowchart shows *how* they happen, including the logic that determines which path to take.

Flowcharts are essential for algorithms, procedures, decision trees, and any process with conditional branching. In educational infographics, interactive flowcharts let learners step through a process, making choices at decision points and seeing the consequences — a powerful way to build procedural understanding.

### Multi-Variable Plot

A **multi-variable plot** answers the most complex question: "Why?" It shows how multiple variables interact, revealing correlations, clusters, and causal relationships that no single-variable chart can capture. Scatter plots with color-coded categories, bubble charts where size represents a third variable, and radar charts comparing entities across multiple dimensions are all multi-variable plots.

Multi-variable plots are the most cognitively demanding visual type, but they are also the most powerful for explaining complex phenomena. When a researcher wants to show why certain schools outperform others, a multi-variable plot revealing the interaction between funding, class size, teacher experience, and student outcomes can illuminate patterns that no simpler visual could reveal.

| Visual Framework | Question | Structure | Example |
|-----------------|----------|-----------|---------|
| Portrait | Who / What? | Form and identity | Labeled anatomy diagram |
| Chart | How Much? | Quantities and comparison | Bar chart of enrollment by year |
| Map | Where? | Spatial relationships | Campus layout with building functions |
| Timeline | When? | Temporal sequence | History of computing milestones |
| Flowchart | How? | Process with decisions | Student registration workflow |
| Multi-Variable Plot | Why? | Variable interactions | Scatter plot of study hours vs. GPA by major |

#### Diagram: Six Frameworks Interactive Gallery

<iframe src="../../sims/six-frameworks-gallery/main.html" width="100%" height="600px" scrolling="no"></iframe>

<details markdown="1">
<summary>Six Frameworks Interactive Gallery</summary>
Type: diagram
**sim-id:** six-frameworks-gallery<br/>
**Library:** p5.js<br/>
**Status:** Specified

**Bloom Level:** Understand (L2)
**Bloom Verb:** Compare
**Learning Objective:** Compare the six visual frameworks by examining rendered examples of each and explaining when each is most appropriate.

Instructional Rationale: Seeing all six frameworks rendered as concrete miniature examples — not just described in text — helps learners build visual recognition of each type. The interactive detail panel connects each visual to its question type and provides a worked example showing the framework applied to a real educational scenario.

Visual elements:
- Six visual thumbnails arranged in a 3x2 grid (responsive: 2x3 on narrow screens):
  1. Portrait: A simple labeled outline of a person or object with callout lines to parts
  2. Chart: A bar chart with 4 colored bars at different heights, with axis labels
  3. Map: A schematic map with 5 location dots connected by dashed lines
  4. Timeline: A horizontal line with 4 event markers alternating above and below
  5. Flowchart: 3 process boxes connected by arrows with 1 diamond decision point
  6. Multi-Variable Plot: A scatter plot with dots in 3 colors and a trend line
- Each thumbnail has a colored border and the framework name below
- Below the grid, a detail panel showing:
  - Framework name and question type
  - "What it shows:" — one-sentence description
  - "Best for:" — 3-4 use cases
  - "Interactive enhancement:" — how to add interactivity
  - "Educational example:" — a specific scenario from a real course
- Default: "Click a framework to explore it."

Color scheme:
- Portrait: blue, Chart: orange, Map: green, Timeline: purple, Flowchart: teal, Multi-Variable: red

Interactive features:
- Hover to highlight a thumbnail's border
- Click to select and populate the detail panel
- The selected thumbnail gets a drop shadow and thicker border

Canvas layout: Width-responsive, aliceblue background, minimum 600px width
</details>

## The SQVID Framework: Refining Your Visual Style

Once the Six W's and the six frameworks have told you *what* to draw, the **SQVID Framework** helps you decide *how* to draw it. SQVID stands for five dimensions of visual style, each presented as a spectrum between two poles. By choosing a position on each dimension, you refine the style of your visual to match your audience, purpose, and context.

The five SQVID dimensions are:

| Dimension | Left Pole | Right Pole | Question It Answers |
|-----------|-----------|-----------|-------------------|
| **S** | Simple | Elaborate | How much detail should I include? |
| **Q** | Qualitative | Quantitative | Should I show concepts or numbers? |
| **V** | Vision | Execution | Am I showing the dream or the plan? |
| **I** | Individual | Comparison | Am I showing one thing or contrasting several? |
| **D** | Delta | Status Quo | Am I showing change or current state? |

Each dimension is independent — you can combine any position on one dimension with any position on another. A single infographic might be simple, quantitative, execution-focused, comparative, and delta-showing. The SQVID gives you a systematic way to articulate these style choices rather than making them unconsciously.

### Simple vs Elaborate

The **simple vs elaborate** dimension controls the amount of visual detail. A simple visual includes only the essential elements — a stick figure, a basic bar chart, a three-box flowchart. An elaborate visual includes rich detail — a realistic illustration, a multi-series chart with annotations, a swimlane workflow with dozens of steps.

The right choice depends on your audience and purpose:

- **Simple** when you need instant comprehension, when the audience is unfamiliar with the subject, or when the visual supports a verbal explanation
- **Elaborate** when the audience needs detail to make decisions, when the visual must stand alone without narration, or when precision matters more than speed

In interactive infographics, you can elegantly bridge this spectrum: start simple and let the learner elaborate through progressive disclosure. A minimalist overview becomes a detailed exploration through hover and click interactions.

### Qualitative vs Quantitative

The **qualitative vs quantitative** dimension determines whether your visual emphasizes concepts and relationships or precise numerical data. A qualitative visual might show that "Product A is growing faster than Product B" through thicker arrows or larger shapes. A quantitative visual would show the exact growth rates on labeled axes.

- **Qualitative** when the pattern or relationship matters more than exact numbers, when the audience thinks in concepts rather than data, or when you are brainstorming
- **Quantitative** when decisions depend on precise values, when the audience expects data-driven evidence, or when you need to support a specific claim

### Vision vs Execution

The **vision vs execution** dimension distinguishes between an aspirational view of the future and a concrete implementation plan. A vision visual shows what the world *could* look like — it inspires, motivates, and generates excitement. An execution visual shows the specific steps, resources, and timelines needed to get there.

- **Vision** when you are pitching an idea, motivating a team, or establishing goals
- **Execution** when you are planning a project, assigning tasks, or tracking progress

This dimension is particularly relevant in educational contexts. A course overview might use a vision visual ("By the end of this course, you will be able to create interactive infographics like this...") while a chapter plan uses an execution visual ("This week, complete these three exercises...").

### Individual vs Comparison

The **individual vs comparison** dimension determines whether your visual focuses on one subject or places multiple subjects side by side. An individual visual dives deep into a single entity — its components, behavior, or evolution over time. A comparison visual places two or more entities next to each other to highlight similarities and differences.

- **Individual** when you want depth, when the subject is complex enough to fill the visual on its own, or when you are teaching about a specific thing
- **Comparison** when the key insight comes from differences between items, when the audience needs to make a choice, or when you want to highlight what makes something unique

### Delta vs Status Quo

The **delta vs status quo** dimension determines whether your visual emphasizes change or the current state. A status quo visual captures a snapshot — how things are right now. A delta visual shows transformation — how things have changed, are changing, or should change.

- **Status quo** when you need to establish a baseline, document current conditions, or create a reference
- **Delta** when the story is about change, when you want to motivate action, or when you are comparing before and after

!!! mascot-thinking "Key Insight"
    <img src="../../img/mascot/thinking.png" class="mascot-admonition-img" alt="Percy is thinking">
    The SQVID dimensions are not right-or-wrong choices — they are dials
    you can turn. The same data might be presented as simple/qualitative/vision
    for a leadership audience and elaborate/quantitative/execution for a
    project team. Knowing the SQVID lets you adapt deliberately.

#### Diagram: SQVID Style Selector

<iframe src="../../sims/sqvid-style-selector/main.html" width="100%" height="600px" scrolling="no"></iframe>

<details markdown="1">
<summary>SQVID Style Selector</summary>
Type: microsim
**sim-id:** sqvid-style-selector<br/>
**Library:** p5.js<br/>
**Status:** Specified

**Bloom Level:** Apply (L3)
**Bloom Verb:** Apply
**Learning Objective:** Apply the SQVID framework by adjusting five style sliders and observing how the combination of settings produces different visual styles appropriate for different audiences and purposes.

Instructional Rationale: The SQVID is best understood through direct manipulation. By moving sliders and seeing the resulting visual style change in real time, learners internalize how each dimension affects the final product. This Apply-level interaction bridges the gap between knowing the five dimensions and actually using them in design decisions.

Visual elements:
- Five horizontal sliders in the left half of the canvas, one per SQVID dimension:
  - S: Simple ←→ Elaborate
  - Q: Qualitative ←→ Quantitative
  - V: Vision ←→ Execution
  - I: Individual ←→ Comparison
  - D: Delta ←→ Status Quo
- Each slider has a label showing the current pole selections (e.g., "Simple" or "Elaborate")
- The right half of the canvas shows a preview area that renders a miniature infographic whose style changes based on slider positions:
  - Simple + Qualitative: A sketch-like diagram with loose shapes and no numbers
  - Elaborate + Quantitative: A detailed chart with precise axis labels and data points
  - Vision: Bright, aspirational colors with forward-looking labels
  - Execution: Structured layout with task boxes and deadlines
  - Individual: Single entity in the center
  - Comparison: Two entities side by side
  - Delta: Before/after with an arrow showing change
  - Status Quo: Single snapshot with "Current State" label
- Below the preview, a text panel describes the current combination: "This style is best suited for: [audience/purpose description]"

Interactive features:
- Drag any slider to change the SQVID setting
- The preview updates in real time as sliders move
- The audience description updates to match the current combination
- A "Randomize" button generates a random SQVID combination for exploration
- A "Reset" button returns all sliders to center positions

Canvas layout: Width-responsive, aliceblue drawing region (550px height), white control region with Reset/Randomize buttons (40px)
Color scheme: Blue primary, orange accent; preview colors shift between warm (vision) and cool (execution)
</details>

## Putting the Frameworks Together

The three frameworks in this chapter form a complete decision pipeline for visual problem solving:

1. **Identify the question** → Use the Six W's to determine which W you are answering
2. **Select the visual type** → Use Dan Roam's six frameworks to choose the matching picture type
3. **Refine the style** → Use SQVID to set the five style dimensions for your audience and purpose

This three-step process works for any communication challenge, from a quick whiteboard sketch to a polished interactive infographic. The frameworks do not constrain your creativity — they channel it. By eliminating the "what should I draw?" paralysis, they free you to focus on making your visual clear, compelling, and engaging.

Consider a practical example. An instructional designer needs to explain how a new adaptive learning system works to three different audiences:

| Audience | Question Type (W) | Visual Framework | SQVID Settings |
|----------|-------------------|-----------------|----------------|
| University leadership | Why should we adopt this? | Multi-Variable Plot | Simple, Qualitative, Vision, Comparison, Delta |
| Faculty | How does it work? | Flowchart | Elaborate, Qualitative, Execution, Individual, Status Quo |
| Students | What will it look like? | Portrait | Simple, Qualitative, Vision, Individual, Status Quo |

The same subject — an adaptive learning system — produces three entirely different visuals because the question, audience, and style requirements are different. The frameworks make these differences explicit and deliberate, rather than accidental.

#### Diagram: Framework Decision Pipeline

<iframe src="../../sims/framework-decision-pipeline/main.html" width="100%" height="550px" scrolling="no"></iframe>

<details markdown="1">
<summary>Framework Decision Pipeline</summary>
Type: diagram
**sim-id:** framework-decision-pipeline<br/>
**Library:** p5.js<br/>
**Status:** Specified

**Bloom Level:** Analyze (L4)
**Bloom Verb:** Examine
**Learning Objective:** Examine how the three frameworks (Six W's, Six Frameworks, SQVID) connect as a decision pipeline by tracing a communication scenario through all three stages.

Instructional Rationale: An Analyze-level activity requires learners to see the relationships between the three frameworks. By presenting scenarios and asking learners to trace the decision through all three stages, this MicroSim builds understanding of how the frameworks compose into a complete visual problem-solving method.

Visual elements:
- A three-stage horizontal pipeline at the top:
  - Stage 1: "Identify the W" (blue box) — shows the six W questions as clickable options
  - Stage 2: "Select the Framework" (orange box) — shows the matching visual type (auto-selected based on Stage 1, but can be overridden)
  - Stage 3: "Set SQVID" (green box) — shows five mini-sliders
- Arrows connecting the three stages left to right
- Below the pipeline, a scenario panel with a communication challenge description
- At the bottom, a result panel showing: "For this scenario, the recommended visual is a [framework] drawn in a [SQVID description] style."
- A "New Scenario" button loads the next challenge from data.json

Interactive features:
- Read the scenario, then click one of the six W options in Stage 1
- Stage 2 auto-highlights the matching framework (learner can override if they disagree)
- In Stage 3, adjust the five SQVID mini-sliders
- Click "Check" to see the recommended answer with explanation
- 6 scenarios in data.json covering all six question types

Data (store in data.json):
- Array of scenario objects with: description, correctW, correctFramework, recommendedSQVID (object with 5 values), explanation
- Example: "A chemistry teacher wants to show students what happens when sodium is dropped into water — the molecular rearrangement step by step." → How, Flowchart, {S: Elaborate, Q: Qualitative, V: Execution, I: Individual, D: Delta}

Canvas layout: Width-responsive, aliceblue background, minimum 600px width
Color scheme: Blue (Stage 1), orange (Stage 2), green (Stage 3)
</details>

## Applying the Frameworks to Interactive Infographic Design

These frameworks are not just academic tools — they have immediate practical value for every interactive infographic you design. Here is how each framework maps to the design decisions you will make throughout the rest of this course:

**The Six W's** help you choose the *type* of MicroSim:

- Who/What → Overlay-based infographics with labeled regions (Chapter 6)
- How Much → Chart.js visualizations (Chapter 7)
- Where → Leaflet map-based infographics (Chapter 7)
- When → vis-timeline visualizations (Chapter 7)
- How → Flowchart and workflow diagrams (Chapters 3 and 7)
- Why → Multi-variable visualizations with vis-network or Plotly (Chapter 7)

**Dan Roam's Six Frameworks** guide your *visual architecture* — the fundamental spatial layout of your infographic.

**The SQVID** helps you calibrate the *style* for your specific audience and purpose — the same data visualized as a simple, qualitative, vision-oriented graphic for executives and as an elaborate, quantitative, execution-oriented graphic for analysts.

!!! mascot-tip "Percy's Tip"
    <img src="../../img/mascot/tip.png" class="mascot-admonition-img" alt="Percy shares a tip">
    Keep a SQVID checklist in your design process. Before starting any
    infographic, write down your five SQVID choices. This takes 30 seconds
    and prevents the common mistake of designing for yourself instead of
    your audience.

#### Diagram: Visual Framework Matching Quiz

<iframe src="../../sims/visual-framework-quiz/main.html" width="100%" height="550px" scrolling="no"></iframe>

<details markdown="1">
<summary>Visual Framework Matching Quiz</summary>
Type: microsim
**sim-id:** visual-framework-quiz<br/>
**Library:** p5.js<br/>
**Status:** Specified

**Bloom Level:** Apply (L3)
**Bloom Verb:** Use
**Learning Objective:** Use the Six W's and Dan Roam's six visual frameworks to select the correct visual type for a given communication scenario.

Instructional Rationale: An Apply-level quiz presents novel scenarios that the learner has not seen before and asks them to apply the framework. This tests transfer — can the learner use the Six W's mapping on new problems, not just recall the table?

Visual elements:
- A scenario card at the top describing a communication challenge (3-4 sentences)
- Two selection rows below:
  - Row 1 "What W?": Six buttons — Who/What, How Much, Where, When, How, Why
  - Row 2 "What Visual?": Six buttons — Portrait, Chart, Map, Timeline, Flowchart, Multi-Variable Plot
- A "Check Answer" button
- Feedback panel showing:
  - Both selections evaluated independently (green check or red X)
  - Explanation of the correct answer
  - Connection between the W and the visual type
- Score tracker: "Scenario 4 of 8 — Score: 3/3"

Data (store in data.json):
- 8 scenario objects with: description, correctW, correctFramework, explanation
- Example: "A public health official wants to show how vaccination rates have risen and fallen across different decades." → When, Timeline
- Example: "A startup CEO wants to demonstrate why their product outperforms competitors across customer satisfaction, price, and feature completeness." → Why, Multi-Variable Plot

Interactive features:
- Click one button in each row, then click "Check Answer"
- Immediate visual feedback per row
- Auto-advance after 2 seconds or click "Next"
- Final score screen with option to retry

Canvas layout: Width-responsive, aliceblue background, minimum 600px width
Color scheme: Row 1 buttons match the Six W's colors; Row 2 buttons match the framework colors from the gallery
</details>

## Common Mistakes and How to Avoid Them

As you begin applying these frameworks, watch for a few common pitfalls that trip up even experienced designers:

!!! mascot-warning "Common Mistake"
    <img src="../../img/mascot/warning.png" class="mascot-admonition-img" alt="Percy warns you">
    Don't skip the "identify the W" step. The most common design mistake
    is jumping straight to a favorite visual type without first asking what
    question you are answering. A beautiful flowchart is useless if the
    audience is actually asking "how much?"

**Using a chart when you need a portrait.** When someone asks "What does this system look like?" they want a portrait — a visual of the thing itself. Showing them a bar chart of system metrics answers a different question entirely. Always match the visual to the question.

**Making everything elaborate.** Simplicity is a feature, not a limitation. An elaborate visual takes longer to create, longer to comprehend, and introduces more opportunities for confusion. Start simple. Only add detail when your audience needs it and your interactive features can manage the complexity through progressive disclosure.

**Ignoring the delta dimension.** Many infographics show the status quo when the audience actually cares about change. If your stakeholder asks "How are we doing?" they usually mean "How have we improved?" — that is a delta question. Show the change, not just the current state.

**Mixing too many W's in one visual.** A single infographic that tries to answer "what does it look like, how much does it cost, where is it deployed, and how does it work" will be cluttered and confusing. Each visual should answer one primary W question. If you need to answer multiple questions, create multiple visuals — or use interactive tabs to separate them.

## Summary and Key Takeaways

!!! mascot-celebration "Excellent Work!"
    <img src="../../img/mascot/celebration.png" class="mascot-admonition-img" alt="Percy celebrates">
    You now have three powerful frameworks in your design toolkit. The next
    time someone says "I need a visual for this," you will know exactly
    which questions to ask and which picture to draw. That confidence is
    a game-changer. Display it with style!

In this chapter you learned three interconnected frameworks for **visual problem solving**:

1. **The Six W's Framework** — maps six question types (Who/What, How Much, Where, When, How, Why) to six visual types, giving you a systematic starting point for any communication challenge

2. **Dan Roam's Six Visual Frameworks** — the six fundamental picture types:
    - **Portrait Drawing** — shows what something looks like
    - **Chart Drawing** — compares quantities
    - **Map Drawing** — shows spatial relationships
    - **Timeline Drawing** — shows temporal sequence
    - **Flowchart Drawing** — shows process logic
    - **Multi-Variable Plot** — reveals how multiple variables interact

3. **The SQVID Framework** — five style dimensions for refining your visual:
    - **Simple vs Elaborate** — how much detail to include
    - **Qualitative vs Quantitative** — concepts or numbers
    - **Vision vs Execution** — aspiration or implementation
    - **Individual vs Comparison** — one subject or several
    - **Delta vs Status Quo** — change or current state

Together, these frameworks form a complete decision pipeline: identify the question (Six W's) → select the visual (Six Frameworks) → refine the style (SQVID). In the chapters ahead, you will put these frameworks into practice — Chapter 5 introduces causal loop diagrams (a powerful "Why" visual), and Chapters 6-7 teach the overlay patterns and JavaScript libraries that bring your framework choices to life as interactive infographics.

## References

- Roam, D. (2008). *The Back of the Napkin: Solving Problems and Selling Ideas with Pictures*. Portfolio. — The primary source for the Six W's, six visual frameworks, and SQVID framework.
- Roam, D. (2011). *Blah Blah Blah: What to Do When Words Don't Work*. Portfolio. — Extends the visual problem-solving approach with the Vivid Grammar framework.
- Duarte, N. (2010). *Resonate: Present Visual Stories that Transform Audiences*. Wiley. — Complementary approach to visual storytelling with emphasis on audience engagement.
- Tufte, E. (2001). *The Visual Display of Quantitative Information*. Graphics Press. — Foundational principles for quantitative visual design, relevant to the Chart and Multi-Variable frameworks.
- Cairo, A. (2012). *The Functional Art: An Introduction to Information Graphics and Visualization*. New Riders. — Bridges the gap between artistic design and functional data visualization.
