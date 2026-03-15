---
title: Interactive Infographic Taxonomy and Classification
description: A comprehensive classification system for organizing interactive infographic types by purpose, structural format, visual complexity, audience, and content domain.
generated_by: claude skill chapter-content-generator
date: 2026-03-13 18:19:25
version: 0.05
---

# Interactive Infographic Taxonomy and Classification

## Summary

This chapter provides a comprehensive classification system for organizing infographic types. You will learn to categorize infographics by their primary purpose (educational, analytical, persuasive, promotional), structural format (linear, hierarchical, comparative, circular), visual complexity, and target audience. This taxonomy gives you a shared vocabulary for discussing infographic design choices and helps you select the right approach for any educational context.

## Concepts Covered

This chapter covers the following 15 concepts from the learning graph:

1. Infographic Taxonomy
2. Educational Infographic
3. Analytical Infographic
4. Persuasive Infographic
5. Promotional Infographic
6. Linear Format
7. Hierarchical Format
8. Comparative Format
9. Circular Format
10. Radial Format
11. Minimalist Infographic
12. Detailed Infographic
13. Visual Complexity
14. Audience Targeting
15. Content Domain

## Prerequisites

This chapter builds on concepts from:

- [Chapter 1: Foundations of Interactive Infographics](../01-foundations-of-interactive-infographics/index.md)

---

!!! mascot-welcome "Let's Make It Visual!"
    <img src="../../img/mascot/welcome.png" class="mascot-admonition-img" alt="Percy welcomes you">
    Welcome back, designers! In this chapter, we'll build a classification
    system that gives you the vocabulary to talk about any infographic with
    precision. Think of it as your field guide to the infographic kingdom.
    Let's spread some knowledge!

## Why Classify Infographics?

In Chapter 1 you learned what interactive infographics are and how they transform passive reading into active exploration. But when you sit down to design an infographic for a biology lesson, a business report, or a statistics dashboard, the first question you face is: *what kind of infographic should I create?*

Without a shared taxonomy, design conversations stall. One person says "I need a diagram" and another imagines a flowchart while a third pictures a network graph. A classification system solves this problem by giving you a precise vocabulary — a set of categories organized along clear dimensions — so that every member of a design team can communicate unambiguously about what they intend to build.

A well-constructed taxonomy also functions as a decision tool. When you know the purpose of your infographic (to educate, to analyze, to persuade, or to promote), the structural format it should take, how complex it needs to be, and who will be reading it, you have already eliminated most of the wrong choices. The taxonomy narrows an overwhelming design space down to a manageable set of candidates.

## Interactive Infographic Taxonomy: The Big Picture

An **interactive infographic taxonomy** is a hierarchical classification system that organizes interactive infographic types along multiple independent dimensions. Each dimension captures a different design decision, and the dimensions are orthogonal — meaning you can combine any value on one dimension with any value on another. A single infographic might be *educational* in purpose, *hierarchical* in format, *detailed* in visual complexity, targeted at *professional* audiences, and grounded in the *science* content domain.

The five dimensions of our taxonomy are:

| Dimension | Question It Answers | Values |
|-----------|-------------------|--------|
| **Purpose** | *Why* does this interactive infographic exist? | Educational, Analytical, Persuasive, Promotional |
| **Structural Format** | *How* is the interactive information organized spatially? | Linear, Hierarchical, Comparative, Circular, Radial |
| **Visual Complexity** | *How much* detail is presented at once? | Minimalist, Detailed |
| **Audience** | *Who* is the intended reader? | General Public, Professional/Technical, Stakeholder-Specific |
| **Content Domain** | *What subject area* does it serve? | Science, Business, Technology, Education, Health, etc. |

These five dimensions form the foundation of interactive infographic taxonomy. In the sections that follow, we explore each dimension in depth, beginning with purpose — the most important design decision you will make.

#### Diagram: Interactive Infographic Taxonomy Tree

<iframe src="../../sims/infographic-taxonomy-tree/main.html" width="100%" height="1100px" scrolling="no"></iframe>

<details markdown="1">
<summary>Interactive Infographic Taxonomy Tree</summary>
Type: diagram
**sim-id:** infographic-taxonomy-tree<br/>
**Library:** vis-network<br/>
**Status:** Specified

**Bloom Level:** Understand (L2)
**Bloom Verb:** Classify
**Learning Objective:** Classify infographics by navigating the five dimensions of the taxonomy and understanding how each dimension contributes to design decisions.

Instructional Rationale: A hierarchical tree visualization lets learners see the full taxonomy at a glance and explore each branch interactively. Hovering over a node reveals its definition, reinforcing the vocabulary without cluttering the initial view.

Visual elements:
- A central root node labeled "Infographic Taxonomy" at the top
- Five branch nodes representing the five dimensions: Purpose, Structural Format, Visual Complexity, Audience, Content Domain
- Leaf nodes under each branch showing the specific values (e.g., Educational, Analytical, Persuasive, Promotional under Purpose)
- Color-coded branches: blue for Purpose, orange for Structural Format, green for Visual Complexity, purple for Audience, teal for Content Domain
- Node size reflects number of children

Interactive features:
- Hover over any node to see a brief definition in a tooltip
- Click a branch node to expand or collapse its children
- Click a leaf node to highlight it and show a detailed description in an infobox panel below the graph
- Physics-based layout with hierarchical top-down direction

Canvas layout: Width-responsive, aliceblue background, minimum 600px width
Color scheme: Blue primary, orange accent, matching book theme
Implementation: vis-network with hierarchical layout, direction: UD (up-down)
</details>

## Classification by Purpose

The purpose dimension answers the most fundamental question: *why does this infographic exist?* Every infographic you create should serve one primary purpose, even though it may have secondary goals. Clarity of purpose drives every subsequent design decision — from the data you include to the interactivity you add.

### Educational Infographics

An **educational infographic** exists to teach. Its primary goal is to help learners acquire new knowledge, build mental models, or practice skills. Educational infographics prioritize clarity over persuasion, accuracy over aesthetics, and exploration over brevity.

In the context of intelligent textbooks, educational infographics are the dominant type. The animal cell diagram from Chapter 1, with its hover-activated infoboxes and quiz mode, is a classic educational infographic. Other examples include:

- A labeled diagram of a circuit board where hovering reveals each component's function
- A step-through visualization of a sorting algorithm that shows each swap
- A concept map linking key terms in a history chapter with clickable definitions

Educational infographics often align with specific levels of Bloom's Taxonomy. A flashcard-style MicroSim targets the *Remember* level, while a parameter exploration simulation targets *Apply* or *Analyze*. When designing an educational infographic, always begin by identifying the learning objective and its Bloom level.

### Analytical Infographics

An **analytical infographic** exists to reveal patterns, trends, and relationships in data. Where educational infographics teach concepts, analytical infographics help readers *understand what the data says*. They are the visual equivalent of a research findings section — presenting evidence and letting the reader draw conclusions.

Analytical infographics are common in data science, business intelligence, and scientific research contexts. Examples include:

- A multi-line chart showing enrollment trends across five years
- A scatter plot revealing the correlation between study time and exam scores
- A heatmap of student interaction data showing which sections of a textbook receive the most engagement

The defining characteristic of an analytical infographic is that it foregrounds the data. The design choices — axis scales, color palettes, aggregation levels — are all in service of making the data's story legible. Interactivity in analytical infographics often takes the form of filtering, zooming, and tooltips that reveal exact values on hover.

### Persuasive Infographics

A **persuasive infographic** exists to argue a point. It presents information selectively and designs the visual flow to lead the reader toward a specific conclusion. Persuasive infographics are common in advocacy, policy communication, and proposal contexts.

Consider a university proposing a new interactive textbook initiative. A persuasive infographic might show declining student satisfaction scores alongside rising textbook costs, then present the proposed solution with projected improvement metrics. The data is real, but the selection, sequencing, and visual emphasis all serve the argument.

Persuasive infographics use several techniques that distinguish them from educational or analytical types:

| Technique | How It Works | Example |
|-----------|-------------|---------|
| Selective emphasis | Highlights data that supports the argument | Bolding the 40% improvement statistic |
| Visual contrast | Makes the desired option look better | Green for the proposed approach, gray for alternatives |
| Narrative flow | Arranges information as a story: problem → evidence → solution | Left-to-right progression from pain point to recommendation |
| Call to action | Ends with a clear next step | "Adopt MicroSim standards by Fall 2027" |

!!! mascot-thinking "Key Insight"
    <img src="../../img/mascot/thinking.png" class="mascot-admonition-img" alt="Percy is thinking">
    Persuasive infographics are powerful but require ethical responsibility.
    The same design techniques that make an argument compelling can also
    mislead. Always ensure the underlying data is accurate, even when the
    presentation is selective.

### Promotional Infographics

A **promotional infographic** exists to market a product, service, or brand. Unlike persuasive infographics that argue for a position, promotional infographics aim to generate awareness, interest, and action toward a specific offering.

In educational technology, promotional infographics are used for conference presentations, grant proposals, and platform marketing. Examples include:

- A feature comparison showing how an intelligent textbook platform compares to competitors
- A visual summary of a course's learning outcomes designed for social media sharing
- An infographic announcing a new MicroSim library with key statistics and sample screenshots

Promotional infographics share some techniques with persuasive ones — selective emphasis, visual contrast, and calls to action — but their tone is typically more commercial. In an educational context, you are most likely to encounter promotional infographics when communicating the value of interactive content to administrators, funders, or institutional decision-makers.

### Choosing the Right Purpose

Most interactive infographics you create for intelligent textbooks will be educational. However, understanding all four purpose types helps you recognize when a different approach is appropriate. The following decision guide can help:

| Your Goal | Primary Purpose | Example |
|-----------|----------------|---------|
| Help students learn a concept | Educational | Interactive cell diagram with quiz mode |
| Reveal patterns in student data | Analytical | Engagement heatmap dashboard |
| Advocate for adopting a new tool | Persuasive | Cost-benefit comparison with narrative flow |
| Market your course or platform | Promotional | Feature highlights for a conference poster |

#### Diagram: Purpose Classification Sorter

<iframe src="../../sims/purpose-classification-sorter/main.html" width="100%" height="405px" scrolling="no"></iframe>

<details markdown="1">
<summary>Purpose Classification Sorter</summary>
Type: microsim
**sim-id:** purpose-classification-sorter<br/>
**Library:** p5.js<br/>
**Status:** Specified

**Bloom Level:** Understand (L2)
**Bloom Verb:** Classify
**Learning Objective:** Classify example infographic descriptions into the correct purpose category (Educational, Analytical, Persuasive, Promotional).

Instructional Rationale: A classification activity requires learners to read a scenario, identify purpose-related cues, and make a judgment — directly exercising the "classify" verb at the Understand level. Immediate feedback with explanations reinforces correct mental models.

Visual elements:
- A scenario card at the top displaying a brief description of an infographic (2-3 sentences)
- Four colored category bins at the bottom, one per purpose type:
  - Educational (blue) — "Teach a concept"
  - Analytical (orange) — "Reveal data patterns"
  - Persuasive (green) — "Argue a point"
  - Promotional (purple) — "Market a product"
- A feedback area below the bins showing "Correct!" or "Not quite — here's why..." with a brief explanation
- A score tracker in the top-right: "3 of 8 correct"
- A progress bar showing how many scenarios the learner has completed

Interactive features:
- Click a category bin to classify the current scenario
- After selection, feedback appears explaining why the answer is correct or incorrect
- Click "Next" button to advance to the next scenario
- 8-10 scenarios loaded from a data.json file

Data (store in data.json):
- Array of scenario objects, each with: description, correctCategory, explanation
- Example scenario: "A university creates a visual showing declining student satisfaction scores alongside rising textbook costs, then presents their new interactive textbook initiative as the solution." → Persuasive

Canvas layout: Width-responsive, aliceblue background drawing region, white control region
Color scheme: Blue primary, orange accent
</details>

## Classification by Structural Format

The structural format dimension describes how information is organized spatially within the infographic. Format is independent of purpose — an educational infographic can be linear or hierarchical, and an analytical infographic can be comparative or circular. Choosing the right format depends on the *structure of the information itself*.

### Linear Format

A **linear format** organizes information along a single axis — typically left-to-right or top-to-bottom. The reader progresses through the content in a sequential order, much like reading a sentence or following a timeline.

Linear formats are ideal for content that has a natural sequence: steps in a process, events in chronological order, or stages of development. Examples include:

- A step-by-step workflow for creating a MicroSim
- A timeline of the evolution of infographic design tools
- A numbered procedure for configuring an overlay.json file

The strength of linear format is its predictability. Readers know exactly where to look next, and the spatial arrangement reinforces the logical order of the content. The limitation is that linear formats struggle with branching, parallel, or cyclical relationships.

### Hierarchical Format

A **hierarchical format** organizes information in a tree structure where elements have parent-child relationships. The reader starts at the root and navigates downward through increasingly specific detail. Organization charts, classification trees, and directory structures are all hierarchical formats.

The infographic taxonomy itself is a hierarchical structure — a root concept (Infographic Taxonomy) branches into five dimensions, each of which branches into specific values. Hierarchical formats are powerful when you need to show:

- Categories and subcategories
- Organizational structures with reporting relationships
- Taxonomic classifications with increasing specificity
- File system or navigation structures

One design consideration for hierarchical infographics is depth. A hierarchy with two levels is easy to comprehend at a glance. A hierarchy with six levels requires progressive disclosure — interactive expand/collapse behavior — to remain usable.

### Comparative Format

A **comparative format** places two or more items side by side, highlighting their similarities and differences. The reader's eye moves back and forth between the items, comparing corresponding attributes.

Comparative formats are among the most useful in educational contexts because comparison is a fundamental cognitive operation for building understanding. Examples include:

- A two-column table comparing static and interactive infographics
- A Venn diagram showing overlap between persuasive and promotional infographics
- A side-by-side before-and-after view of a redesigned infographic

Effective comparative infographics align the attributes being compared so that differences are spatially adjacent. If you are comparing three JavaScript libraries, place their feature rows in the same vertical position across all three columns so the reader can scan horizontally.

| Attribute | Linear | Hierarchical | Comparative |
|-----------|--------|-------------|-------------|
| Best for | Sequences, processes | Categories, trees | Similarities/differences |
| Reader movement | Forward along one axis | Downward through levels | Back-and-forth between items |
| Interactive pattern | Step-through, scroll | Expand/collapse | Toggle, highlight |
| Risk | Monotony if too long | Information overload if too deep | Oversimplification if attributes are limited |

### Circular Format

A **circular format** arranges elements in a loop, emphasizing that the process or relationship has no clear beginning or end. Cycle diagrams, pie charts, and clock-face layouts are all circular formats.

Circular formats are ideal for:

- Biological cycles (water cycle, cell cycle, carbon cycle)
- Business cycles (plan-do-check-act, agile sprints)
- Feedback loops in systems thinking
- Proportional data where parts sum to a whole

The psychological effect of a circular layout is important: it signals continuity and return. When learners see information arranged in a circle, they intuitively understand that the process repeats. This makes circular formats particularly effective for content that involves feedback, iteration, or cyclical patterns.

### Radial Format

A **radial format** extends the circular concept by placing a central element at the hub with spokes connecting to surrounding elements. Where a circular format emphasizes the loop, a radial format emphasizes the *center and its connections*.

Radial formats are effective for:

- Concept maps with a central theme and related subtopics
- Stakeholder maps showing a project at the center and stakeholders around it
- Feature overviews with a product at the center and capabilities radiating outward
- Mind maps for brainstorming and organizing ideas

The key distinction between circular and radial is directionality. In a circular format, elements connect to their neighbors in the loop. In a radial format, every element connects back to the center. This makes radial formats ideal when one concept is central and all others depend on or relate to it.

!!! mascot-thinking "Key Insight"
    <img src="../../img/mascot/thinking.png" class="mascot-admonition-img" alt="Percy is thinking">
    When choosing between circular and radial, ask: "Is there a center?"
    If one concept is clearly more important than the others, use radial.
    If all concepts are equally important and connect in sequence, use circular.

#### Diagram: Structural Format Gallery

<iframe src="../../sims/structural-format-gallery/main.html" width="100%" height="550px" scrolling="no"></iframe>

<details markdown="1">
<summary>Structural Format Gallery</summary>
Type: diagram
**sim-id:** structural-format-gallery<br/>
**Library:** p5.js<br/>
**Status:** Specified

**Bloom Level:** Understand (L2)
**Bloom Verb:** Compare
**Learning Objective:** Compare the five structural formats (linear, hierarchical, comparative, circular, radial) by viewing visual examples and identifying the distinguishing characteristics of each.

Instructional Rationale: Seeing all five formats rendered as small visual thumbnails side by side allows learners to compare their spatial layouts directly. Clicking a format reveals its definition and best-use cases in an infobox, connecting the visual pattern to its appropriate context.

Visual elements:
- Five miniature infographic thumbnails arranged horizontally across the top of the canvas:
  1. Linear: A horizontal row of 4 connected boxes with arrows (labeled "A → B → C → D")
  2. Hierarchical: A tree with a root node and two levels of children
  3. Comparative: Two columns side by side with aligned rows
  4. Circular: Four nodes arranged in a circle with clockwise arrows
  5. Radial: A central node with 5 spokes connecting to outer nodes
- Each thumbnail is drawn in a 120x120 box with a colored border matching the format type
- Below the thumbnails, a larger infobox area (full width) shows the name, description, best-use cases, and example for the currently selected format
- Default state: Show instructional text "Click a format above to learn more about it."

Color scheme:
- Linear: blue (#4285F4)
- Hierarchical: orange (#FB8C00)
- Comparative: green (#34A853)
- Circular: purple (#8E44AD)
- Radial: teal (#00897B)

Interactive features:
- Hover over a thumbnail to highlight its border and show the format name as a tooltip
- Click a thumbnail to select it and display detailed information in the infobox below
- Click again to deselect and return to the default instruction text
- The selected thumbnail gets a thicker border and subtle shadow

Canvas layout: Width-responsive, aliceblue background, minimum 600px width
Thumbnails resize proportionally based on canvas width
</details>

## Classification by Visual Complexity

The visual complexity dimension describes how much information is presented simultaneously. This is not about the total amount of information in the infographic — a detailed infographic might contain no more data than a minimalist one — but about how much of it is visible at any given moment.

### Minimalist Infographics

A **minimalist infographic** presents only the essential information, using white space, clean typography, and a limited color palette to focus the reader's attention on a single message. Minimalist designs are effective for:

- Executive summaries where decision-makers need key metrics at a glance
- Social media sharing where the infographic must communicate in seconds
- Introductory content where overwhelming detail would discourage beginners
- Mobile screens where space is severely constrained

A minimalist version of the infographic taxonomy might show only the five dimension names in a clean layout, without any subcategories. The reader grasps the big picture immediately.

### Detailed Infographics

A **detailed infographic** presents rich, multi-layered information with multiple data series, annotations, and visual elements. Detailed designs are appropriate when:

- The audience has domain expertise and expects depth
- The content requires nuance that cannot be reduced to headlines
- Interactive features like progressive disclosure manage the complexity
- The infographic serves as a reference that readers return to repeatedly

A detailed version of the infographic taxonomy would show all five dimensions with their subcategories, examples, cross-references, and interactive drill-down into each category. The challenge with detailed infographics is preventing cognitive overload — a risk we manage through visual hierarchy, progressive disclosure, and thoughtful use of color.

### Visual Complexity as a Spectrum

In practice, visual complexity is not a binary choice between minimalist and detailed. It is a spectrum, and the right position on that spectrum depends on the intersection of audience expertise, content density, and available screen space.

| Factor | Favors Minimalist | Favors Detailed |
|--------|------------------|-----------------|
| Audience expertise | Novice, general public | Expert, specialist |
| Available time | Seconds (social media, dashboard) | Minutes (study, reference) |
| Content density | Few key messages | Many interrelated data points |
| Screen size | Mobile, embedded widget | Desktop, fullscreen |
| Interactivity | Limited or none | Progressive disclosure available |

A powerful strategy is to design a detailed infographic with a minimalist default view. The infographic initially presents only the essential information (minimalist), and the reader can hover, click, or expand to reveal additional detail (detailed). This approach serves both novice and expert audiences with a single artifact — and it is one of the core strengths of interactive infographics over static ones.

## Classification by Audience

The audience targeting dimension recognizes that the same information may need to be presented differently depending on who is reading it. Audience affects vocabulary, visual density, interaction patterns, and assumed background knowledge.

### General Public

Infographics for the general public assume no specialized knowledge. They use everyday language, familiar metaphors, and visually intuitive layouts. A museum exhibit, a public health poster, or an introductory educational resource targets this audience. General public infographics favor minimalist complexity, strong visual hierarchy, and large text.

### Professional/Technical Audiences

Infographics for professional or technical audiences assume domain knowledge and use industry-standard terminology. A network architecture diagram for IT professionals, a statistical summary for data scientists, or a circuit diagram for electrical engineers all serve technical audiences. These infographics can be more detailed and can rely on conventions (such as UML notation or statistical chart types) that the audience already understands.

### Stakeholder-Specific Audiences

Stakeholder-specific infographics are designed for a particular group with defined interests and decision-making authority. A budget visualization for a school board, a project timeline for a grant funder, or a curriculum map for department chairs all target specific stakeholders. These infographics emphasize the information most relevant to that stakeholder's concerns and decision criteria.

#### Diagram: Audience Adaptation Comparison

<iframe src="../../sims/audience-adaptation-comparison/main.html" width="100%" height="500px" scrolling="no"></iframe>

<details markdown="1">
<summary>Audience Adaptation Comparison</summary>
Type: diagram
**sim-id:** audience-adaptation-comparison<br/>
**Library:** p5.js<br/>
**Status:** Specified

**Bloom Level:** Understand (L2)
**Bloom Verb:** Compare
**Learning Objective:** Compare how the same dataset is presented differently for three audience types (general public, professional, stakeholder) and explain why the differences exist.

Instructional Rationale: Showing three versions of the same information — adapted for different audiences — makes the concept of audience targeting concrete and immediately visible. Learners can toggle between versions to see how vocabulary, complexity, and emphasis shift.

Visual elements:
- A topic label at the top: "Topic: Student Engagement with Interactive Infographics"
- Three side-by-side panels, each showing the same data adapted for a different audience:
  1. General Public panel (blue border): Large bold percentage "78% of students prefer interactive content", simple bar chart with 2 bars, minimal text
  2. Professional panel (orange border): Detailed bar chart with 5 metrics, axis labels with statistical notation, technical vocabulary like "engagement rate" and "completion ratio"
  3. Stakeholder panel (green border): Budget-focused view with cost-per-student data, ROI projection, action-oriented heading "Recommended: Expand interactive content"
- Below the panels, an infobox showing a brief explanation of the design choices for the currently selected panel

Interactive features:
- Click a panel to select it and display the design rationale in the infobox below
- Hover over a panel to highlight its border
- Default state: All three panels visible with instruction "Click a panel to see why it was designed this way."

Canvas layout: Width-responsive, aliceblue background, three panels divide evenly across available width
Color scheme: Blue, orange, green for the three audience types
</details>

## Classification by Content Domain

The content domain dimension describes the subject area an infographic serves. While the taxonomy categories above (purpose, format, complexity, audience) are about *how* you design, the content domain is about *what* you are visualizing. Different subject areas bring different conventions, data types, and reader expectations.

Common content domains for interactive infographics include:

- **Science**: Anatomical diagrams, chemical processes, ecosystem models, experimental results
- **Business**: Organizational charts, process workflows, financial dashboards, strategic frameworks
- **Technology**: System architecture diagrams, network topologies, code execution flows, API documentation
- **Education**: Concept maps, learning progressions, Bloom's Taxonomy visualizations, curriculum alignments
- **Health**: Patient journey maps, symptom decision trees, public health statistics, medical procedures
- **History**: Timelines, geographic migration maps, cause-and-effect chains, comparative era analyses
- **Mathematics**: Function plots, geometric constructions, proof structures, statistical distributions

Content domain influences your choice of visual conventions. A science audience expects labeled diagrams with precise terminology. A business audience expects charts with clear legends and executive summaries. A technology audience expects system diagrams following established notation (boxes for services, cylinders for databases, arrows for data flow).

!!! mascot-tip "Percy's Tip"
    <img src="../../img/mascot/tip.png" class="mascot-admonition-img" alt="Percy shares a tip">
    When designing for a new content domain, start by collecting 5-10
    examples of existing infographics in that domain. Look for recurring
    visual conventions — color codes, shapes, layout patterns — and adopt
    them. Your readers already know these conventions, so leveraging them
    reduces cognitive load.

## Putting It All Together: Multi-Dimensional Classification

In practice, every infographic you design occupies a position along all five dimensions simultaneously. The power of the taxonomy is that it gives you a structured way to describe that position and compare it to alternatives.

Consider two infographics about the water cycle:

| Dimension | Infographic A | Infographic B |
|-----------|--------------|--------------|
| Purpose | Educational | Analytical |
| Format | Circular | Comparative |
| Complexity | Minimalist | Detailed |
| Audience | General Public | Professional (Hydrologists) |
| Domain | Science | Science |

Infographic A might be a clean, circular diagram with labeled stages (evaporation → condensation → precipitation → collection) designed for a middle school science textbook. Infographic B might be a detailed side-by-side comparison of water cycle measurements across three climate zones, with interactive filtering by season, designed for a research publication.

Both are about the water cycle. But they serve different purposes, use different formats, and target different audiences. The taxonomy makes these differences explicit and helps you make deliberate design choices rather than defaulting to "whatever looks nice."

#### Diagram: Multi-Dimensional Classification Explorer

<iframe src="../../sims/multi-dimensional-classifier/main.html" width="100%" height="600px" scrolling="no"></iframe>

<details markdown="1">
<summary>Multi-Dimensional Classification Explorer</summary>
Type: microsim
**sim-id:** multi-dimensional-classifier<br/>
**Library:** p5.js<br/>
**Status:** Specified

**Bloom Level:** Apply (L3)
**Bloom Verb:** Apply
**Learning Objective:** Apply the five-dimension taxonomy to classify real-world infographic examples by selecting the correct value on each dimension.

Instructional Rationale: An Apply-level activity requires learners to use the taxonomy on novel examples. By presenting real infographic descriptions and asking learners to select values on each dimension, this MicroSim bridges the gap between memorizing categories and actually using them for design decisions.

Visual elements:
- A scenario panel at the top describing a real-world infographic (3-4 sentences)
- Five horizontal rows below, one per taxonomy dimension:
  - Each row has a dimension label on the left and clickable option buttons on the right
  - Purpose row: [Educational] [Analytical] [Persuasive] [Promotional]
  - Format row: [Linear] [Hierarchical] [Comparative] [Circular] [Radial]
  - Complexity row: [Minimalist] [Detailed]
  - Audience row: [General Public] [Professional] [Stakeholder]
  - Domain row: [Science] [Business] [Technology] [Education] [Health] [History]
- A "Check Answer" button at the bottom
- A feedback panel showing correctness for each dimension with brief explanations
- A score tracker: "Scenario 2 of 6"

Interactive features:
- Click an option in each row to select it (highlighted state)
- Click "Check Answer" to see which dimensions were classified correctly (green check or red X per row)
- Each incorrect answer shows a brief explanation of the correct choice
- Click "Next Scenario" to advance
- 6 scenarios loaded from a data.json file

Data (store in data.json):
- Array of scenario objects with: description, correctPurpose, correctFormat, correctComplexity, correctAudience, correctDomain, explanations (one per dimension)
- Example: "A museum creates a large touchscreen display showing the human digestive system. Visitors tap on each organ to see a 3D animation of its function and read a short description written in everyday language." → Educational, Linear, Detailed, General Public, Science

Canvas layout: Width-responsive, aliceblue drawing region, white control region below
Color scheme: Blue primary, orange accent
</details>

## Common Classification Mistakes

As you begin applying the taxonomy, watch for these common errors:

!!! mascot-warning "Common Mistake"
    <img src="../../img/mascot/warning.png" class="mascot-admonition-img" alt="Percy warns you">
    Don't confuse **purpose** with **format**. A hierarchical diagram can be
    educational, analytical, persuasive, or promotional — the tree structure
    doesn't determine the intent. Always classify purpose and format independently.

**Confusing persuasive with educational.** If the infographic presents balanced information and lets the reader draw their own conclusion, it is educational. If it selects data and arranges the visual flow to lead the reader toward a specific conclusion, it is persuasive. The test is: *does the design have an agenda?*

**Assuming complexity equals quality.** A minimalist infographic is not inferior to a detailed one. The right complexity level depends on the audience, the screen context, and the purpose. A detailed infographic on a mobile screen is a poor design choice, regardless of how much data it contains.

**Neglecting audience adaptation.** The most common failure in infographic design is creating a single version and assuming it works for all audiences. A diagram designed for domain experts will confuse novices, and a simplified version designed for the general public will bore specialists. When possible, design multiple complexity levels or use progressive disclosure to serve both.

**Treating content domain as decoration.** Content domain is not just about choosing "science-y" colors or "business-y" fonts. It is about following the visual conventions that your audience expects. A chemistry infographic should use standard element symbols. A project management infographic should use Gantt chart conventions. Domain conventions reduce cognitive load because readers already know how to interpret them.

## Summary and Key Takeaways

!!! mascot-celebration "Excellent Work!"
    <img src="../../img/mascot/celebration.png" class="mascot-admonition-img" alt="Percy celebrates">
    You now have a complete vocabulary for classifying any infographic you
    encounter. With five dimensions in your toolkit — purpose, format,
    complexity, audience, and domain — you can make deliberate, informed
    design decisions. Display it with style!

In this chapter you learned to classify infographics along five independent dimensions:

1. **Purpose** — Educational, Analytical, Persuasive, Promotional
2. **Structural Format** — Linear, Hierarchical, Comparative, Circular, Radial
3. **Visual Complexity** — Minimalist to Detailed (a spectrum, not a binary)
4. **Audience Targeting** — General Public, Professional/Technical, Stakeholder-Specific
5. **Content Domain** — The subject area with its own visual conventions

These five dimensions form a decision framework you will use throughout the rest of this course. In Chapter 3, you will apply this taxonomy to the specific category of presentation slide art infographics, seeing how list diagrams, process diagrams, cycle diagrams, and hierarchy diagrams map to the structural formats you learned here.

## References

- Smiciklas, M. (2012). *The Power of Infographics*. Que Publishing. — Foundational text on infographic design principles and classification.
- Krum, R. (2013). *Cool Infographics*. Wiley. — Practical guide covering infographic types and design strategies.
- Lankow, J., Ritchie, J., & Crooks, R. (2012). *Infographics: The Power of Visual Storytelling*. Wiley. — Covers the spectrum from informational to persuasive infographic design.
- Few, S. (2012). *Show Me the Numbers*. Analytics Press. — Authoritative guide on quantitative data visualization and audience-appropriate design.
- Tufte, E. (2001). *The Visual Display of Quantitative Information*. Graphics Press. — Classic text on data visualization principles including information density and visual complexity.
