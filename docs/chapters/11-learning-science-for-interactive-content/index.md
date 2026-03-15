---
title: Learning Science for Interactive Content
description: Connect interactive infographic design to research-based learning science, including cognitive load theory, dual coding, Mayer's multimedia principles, Bloom's Taxonomy, scaffolding, formative assessment, and knowledge graph-based learning paths.
generated_by: claude skill chapter-content-generator
date: 2026-03-14 17:43:49
version: 0.05
---

# Learning Science for Interactive Content

## Summary

This chapter connects interactive infographic design to research-based learning science principles. You will learn cognitive load theory and how to manage intrinsic, extraneous, and germane load in your designs. The chapter covers dual coding theory, Mayer's multimedia learning principles (signaling, segmenting, spatial contiguity), Bloom's Taxonomy levels for writing learning objectives, scaffolding strategies, formative assessment, and how knowledge graphs and learning paths structure educational content.

## Concepts Covered

This chapter covers the following 21 concepts from the learning graph:

1. Cognitive Load Theory
2. Dual Coding Theory
3. Multimedia Learning
4. Mayer's Principles
5. Signaling Principle
6. Segmenting Principle
7. Spatial Contiguity
8. Learning Objective
9. Bloom's Taxonomy
10. Remember Level
11. Understand Level
12. Apply Level
13. Analyze Level
14. Evaluate Level
15. Create Level
16. Formative Assessment
17. Scaffolding
18. Knowledge Graph
19. Learning Path
20. Concept Dependency
21. Prerequisite Knowledge

## Prerequisites

This chapter builds on concepts from:

- [Chapter 1: Foundations of Interactive Infographics](../01-foundations-of-interactive-infographics/index.md)
- [Chapter 2: Infographic Taxonomy and Classification](../02-infographic-taxonomy-and-classification/index.md)

---

!!! mascot-welcome "Let's Make It Visual!"
    <img src="../../img/mascot/welcome.png" class="mascot-admonition-img" alt="Percy welcomes you">
    Welcome to the chapter where design meets science! Everything you have built so far — interactive overlays, responsive layouts, JavaScript-driven visualizations — becomes dramatically more effective when grounded in how the human brain actually learns. The principles in this chapter will transform you from someone who makes interactive infographics into someone who makes interactive infographics that *teach*. Let's spread some knowledge!

## Learning Objectives

By the end of this chapter, you will be able to:

- **Explain** cognitive load theory and distinguish between intrinsic, extraneous, and germane cognitive load in the context of infographic design (Bloom: Understand)
- **Apply** Mayer's multimedia learning principles — signaling, segmenting, and spatial contiguity — to evaluate and improve an existing interactive infographic (Bloom: Apply)
- **Construct** measurable learning objectives at each of the six Bloom's Taxonomy levels using appropriate action verbs (Bloom: Apply)
- **Analyze** a knowledge graph to identify concept dependencies, prerequisite knowledge, and optimal learning paths through educational content (Bloom: Analyze)
- **Design** a scaffolded interactive infographic sequence that manages cognitive load while progressively building student competence (Bloom: Create)

## Introduction

You have spent the previous chapters learning how to build interactive infographics — choosing the right overlay type, selecting the best JavaScript library, packaging MicroSims with metadata and quality standards. These are the craft skills of infographic creation. But craft alone does not guarantee learning. A beautifully rendered, technically flawless interactive diagram can still fail as an educational tool if it overwhelms students with too much information, presents content in the wrong order, or provides no way for learners to check their understanding.

This is where learning science enters the picture. Decades of research in cognitive psychology, educational psychology, and instructional design have produced well-tested principles about how people learn from visual and interactive media. These principles are not abstract theory — they translate directly into concrete design decisions about how many elements to show at once, where to place labels relative to diagrams, how to sequence content from simple to complex, and how to build in checkpoints where students can assess their own progress.

The good news is that the MicroSim architecture you have already learned is naturally aligned with many of these principles. Interactive infographics with hover-activated infoboxes follow the signaling principle. Overlay types that reveal information progressively follow the segmenting principle. The entire intelligent textbook framework, with its learning graph and concept dependencies, is an implementation of scaffolded learning paths. This chapter makes those connections explicit, giving you the theoretical vocabulary and evidence-based guidelines to make every design decision with confidence.

## Cognitive Load Theory

**Cognitive load theory** (CLT), developed by John Sweller in the 1980s, is one of the most influential frameworks in instructional design. The central insight is straightforward: human working memory has a limited capacity, and learning happens most effectively when instructional materials are designed to work within those limits rather than against them.

Working memory can hold approximately 4-7 chunks of information simultaneously. When an instructional experience demands more processing than working memory can handle, learning degrades — students may feel confused, frustrated, or simply unable to make sense of the material. CLT identifies three types of cognitive load that compete for working memory resources:

| Load Type | Definition | Designer's Goal | Infographic Example |
|-----------|-----------|-----------------|---------------------|
| **Intrinsic** | Complexity inherent in the material itself | Cannot eliminate, but can manage through sequencing | A polygon overlay with 12 regions has higher intrinsic load than one with 4 regions |
| **Extraneous** | Load caused by poor instructional design | Minimize aggressively | Placing labels far from their corresponding diagram regions forces visual search |
| **Germane** | Load dedicated to building mental models and schemas | Maximize through good design | An interactive comparison that asks students to predict which overlay type fits best |

**Intrinsic load** depends on the complexity of the content and the learner's prior knowledge. You cannot reduce the inherent complexity of polygon hit detection — it requires understanding coordinates, vertices, and the ray casting algorithm. However, you can manage intrinsic load by presenting these concepts in a carefully sequenced order (coordinates first, then vertices, then the algorithm), which is exactly what the concept dependency structure in the learning graph achieves.

**Extraneous load** is the villain of instructional design — unnecessary cognitive processing caused by confusing layouts, irrelevant decorations, inconsistent navigation, or poor information architecture. Every pixel of screen space consumed by non-instructional content (gratuitous animation, decorative images, cluttered controls) adds extraneous load. The MicroSim visual standard — aliceblue drawing region, white control region, silver border — directly combats extraneous load by providing a predictable, consistent visual framework that students learn once and then stop noticing.

**Germane load** is the productive cognitive effort that leads to actual learning — the mental work of connecting new information to existing knowledge, building schemas, and constructing understanding. Well-designed interactive infographics maximize germane load by requiring students to actively process information: hovering to reveal, clicking to explore, dragging to arrange, predicting before seeing the answer.

!!! mascot-thinking "Key Insight"
    <img src="../../img/mascot/thinking.png" class="mascot-admonition-img" alt="Percy is thinking">
    The goal is not to minimize total cognitive load — it is to minimize *extraneous* load so that more of the learner's limited working memory is available for *germane* processing. An interactive infographic that feels "easy" might not be teaching much. The sweet spot is an experience that feels challenging but manageable.

#### Diagram: Cognitive Load Balance Explorer

<iframe src="../../sims/cognitive-load-explorer/main.html" width="100%" height="550px" scrolling="no"></iframe>

<details markdown="1">
<summary>Cognitive Load Balance Explorer</summary>
Type: microsim
**sim-id:** cognitive-load-explorer<br/>
**Library:** p5.js<br/>
**Status:** Specified

**Bloom Level:** Understand (L2)
**Bloom Verb:** Explain
**Learning Objective:** Explain how the three types of cognitive load (intrinsic, extraneous, germane) compete for limited working memory capacity, and how design decisions shift the balance between them.

**Instructional Rationale:** An interactive stacked bar visualization is appropriate because the Understand objective requires learners to see how three components share a fixed total capacity. Adjusting design parameters and observing the resulting load redistribution builds an intuitive understanding of the trade-offs.

**Canvas Layout:**
- Main area (aliceblue, 65% width): a horizontal stacked bar showing three load types filling a fixed-width "working memory capacity" bar, plus a sample infographic preview that changes appearance based on slider settings
- Right panel (white, silver border, 35% width): three sliders and explanatory text

**Visual Elements:**
- A horizontal bar labeled "Working Memory Capacity" at the top, divided into three colored segments:
  - Red segment: Extraneous Load
  - Blue segment: Intrinsic Load
  - Green segment: Germane Load
- The bar has a fixed total width representing 100% capacity
- Below the bar: a small sample infographic that visually changes based on the slider settings:
  - High extraneous load: labels far from regions, decorative borders, inconsistent colors
  - Low extraneous load: labels adjacent to regions, clean layout, consistent colors
  - High germane load: prediction prompts, hover-to-reveal descriptions, quiz elements
- A "Learning Effectiveness" meter (0-100%) that increases as germane load increases and extraneous load decreases
- When total load exceeds capacity (bar overflows), a red "OVERLOAD" warning appears and the effectiveness meter drops to near zero

**Interactive Controls:**
- Slider: "Content Complexity" (1-10, default 5) — adjusts intrinsic load (blue segment grows/shrinks)
- Slider: "Design Quality" (1-10, default 5) — adjusts extraneous load inversely (higher quality = less extraneous load)
- Slider: "Interactivity Level" (1-10, default 5) — adjusts germane load (more interactivity = more germane load)
- Dropdown: "Scenario" with 3 presets:
  - "Cluttered Static Diagram" (low complexity, high extraneous, low germane)
  - "Clean Interactive MicroSim" (medium complexity, low extraneous, high germane)
  - "Complex Unscaffolded" (high complexity, medium extraneous, low germane)
- Each scenario sets the sliders to illustrative values

**Behavior:**
- Moving any slider updates the stacked bar in real time
- The sample infographic preview morphs to reflect the current settings
- If total load exceeds capacity, the overflow region pulses red
- The effectiveness meter animates smoothly as values change
- Responsive to window resize; bar and preview scale proportionally

**Default Parameters:**
- Content Complexity: 5
- Design Quality: 5
- Interactivity Level: 5
- Canvas width: responsive
- Canvas height: 500px

Implementation: p5.js with stacked bar rendering and dynamic sample preview
</details>

## Dual Coding Theory

**Dual coding theory**, proposed by Allan Paivio in the 1970s, states that human cognition operates through two distinct but interconnected processing channels: a **verbal channel** (for language, text, and speech) and a **visual channel** (for images, spatial information, and diagrams). When information is presented through both channels simultaneously, learners form two complementary mental representations that are more robust and easier to recall than either one alone.

For interactive infographic designers, dual coding theory provides a powerful mandate: **always pair visual representations with verbal explanations**. A diagram without labels forces learners to rely solely on visual processing. A text description without a diagram forces learners to construct a mental image on their own. But a labeled interactive diagram — where hovering over a visual element reveals a text description — engages both channels and creates stronger memory traces.

The overlayment patterns from Chapter 9 are natural implementations of dual coding:

- **Type 1 rectangular overlays**: Visual regions (spatial channel) paired with infobox text (verbal channel)
- **Type 3 callout labels**: Visual indicators on the diagram connected to text labels at the edges
- **Type 4 floating labels**: Text positioned near visual features, maintaining spatial proximity between the two channels

The key design implication is that text and images should work *together*, not independently. An infographic where the text describes one thing and the image shows another creates what Mayer calls a "split-attention effect" — the learner must mentally integrate two misaligned sources, increasing extraneous load.

## Multimedia Learning and Mayer's Principles

**Multimedia learning** is the field of research that studies how people learn from words and pictures presented together. Richard Mayer's research program, spanning over 30 years and hundreds of experiments, has produced a set of evidence-based principles that directly inform interactive infographic design. These are collectively known as **Mayer's principles**.

Three of Mayer's principles are particularly relevant to the overlayment and MicroSim patterns used throughout this course:

### The Signaling Principle

The **signaling principle** states that people learn better when cues are added to highlight the organization and essential content of the material. Signals include:

- Headings and labels that organize information hierarchically
- Bold or colored text that draws attention to key terms
- Visual highlights (color changes, borders, arrows) that indicate where to look
- Hover-activated highlights that signal which region is currently active

In an interactive infographic, the **region extent highlight** (the semi-transparent colored rectangle that appears when hovering over a Type 1 overlay region) is a direct implementation of the signaling principle. It tells the learner, "This is the region you are exploring right now," reducing the cognitive effort required to connect the visual region to its description in the infobox.

Numbered indicators in Type 3 callout overlays are another form of signaling — they impose an organizational structure on what might otherwise be an overwhelming collection of labeled points.

### The Segmenting Principle

The **segmenting principle** states that people learn better when complex information is presented in learner-paced segments rather than as a continuous stream. Breaking content into manageable chunks allows learners to process each segment before moving on, preventing working memory overload.

Interactive infographics naturally implement segmenting in several ways:

- **Hover-to-reveal**: Each region's description is hidden until the student hovers, effectively segmenting the content into one-region-at-a-time chunks
- **Progressive disclosure**: Collapsible sections, click-to-expand panels, and quiz modes that reveal information incrementally
- **Step-through controls**: MicroSims with "Next" and "Previous" buttons that let learners advance at their own pace
- **Chapters and sections**: The textbook structure itself segments the full curriculum into digestible units

| Segmenting Strategy | Implementation in MicroSims | Cognitive Benefit |
|--------------------|----------------------------|-------------------|
| Hover-to-reveal | Overlay infoboxes appear one at a time | Prevents information overload from all descriptions visible simultaneously |
| Progressive disclosure | Collapsible details blocks, quiz mode | Learner controls depth of exploration |
| Step-through | Next/Previous buttons in simulations | Learner controls pacing |
| Layered complexity | Simple view first, toggle for advanced details | Manages intrinsic load by starting simple |

### The Spatial Contiguity Principle

The **spatial contiguity** principle states that people learn better when corresponding words and pictures are presented near each other rather than far apart on the page or screen. When text and its associated image are separated, learners must visually search for the connection, consuming working memory resources on navigation rather than learning.

This principle has direct implications for overlay design:

- **Type 4 floating labels** are superior to footnotes or separate legend tables because labels are positioned near their corresponding image features
- **Infoboxes should appear adjacent to the highlighted region**, not in a fixed sidebar far from the interaction point
- **Tooltips** (small text popups near the cursor) provide the closest possible spatial contiguity between the visual element and its verbal description

The MicroSim design standard of placing the control region directly below the drawing region (rather than in a separate panel or popup window) follows the spatial contiguity principle — controls and the canvas they affect are always visible together.

!!! mascot-tip "Percy's Tip"
    <img src="../../img/mascot/tip.png" class="mascot-admonition-img" alt="Percy shares a tip">
    When designing infobox positioning for overlay infographics, place the infobox as close to the highlighted region as possible. If the infobox must be in a fixed location (e.g., below the diagram), use a visual connector — a thin line or arrow — from the highlighted region to the infobox to maintain spatial contiguity.

#### Diagram: Mayer's Principles Interactive Comparison

<iframe src="../../sims/mayers-principles-comparison/main.html" width="100%" height="600px" scrolling="no"></iframe>

<details markdown="1">
<summary>Mayer's Principles Interactive Comparison</summary>
Type: microsim
**sim-id:** mayers-principles-comparison<br/>
**Library:** p5.js<br/>
**Status:** Specified

**Bloom Level:** Apply (L3)
**Bloom Verb:** Apply
**Learning Objective:** Apply Mayer's signaling, segmenting, and spatial contiguity principles by toggling each principle on and off in a sample infographic and observing how design quality changes.

**Instructional Rationale:** A toggle-based before/after comparison is appropriate because the Apply objective requires learners to see each principle in action on a concrete example. Toggling principles independently isolates their individual effects, building practical design judgment.

**Canvas Layout:**
- Main area (aliceblue): a sample interactive infographic (simplified anatomy diagram with 6 labeled regions) that dynamically changes based on principle toggles
- Control bar (white, silver border, below): three toggle switches and a "Design Quality Score" display

**Visual Elements:**
- A sample anatomy diagram (simple human body outline with 6 organ regions) rendered in the main area
- The diagram displays differently based on which principles are enabled:
  - **Signaling OFF**: All 6 regions visible simultaneously with no hover highlights, uniform gray borders, no numbered indicators
  - **Signaling ON**: Hover highlights in distinct colors per region, numbered indicators, bold labels on hover
  - **Segmenting OFF**: All 6 descriptions visible simultaneously in a dense text block below the diagram
  - **Segmenting ON**: Descriptions hidden; hover reveals one description at a time in an infobox
  - **Spatial Contiguity OFF**: Descriptions appear in a fixed sidebar on the far right, disconnected from regions
  - **Spatial Contiguity ON**: Infobox appears adjacent to the hovered region with a connecting arrow
- A "Design Quality Score" (0-100) that increases as more principles are enabled:
  - All OFF: 25/100 (red)
  - 1 enabled: 50/100 (yellow)
  - 2 enabled: 75/100 (yellow-green)
  - All ON: 95/100 (green)
- Brief text annotation for each toggle explaining what changed

**Interactive Controls:**
- Toggle: "Signaling" (default OFF) — enables/disables hover highlights and numbered indicators
- Toggle: "Segmenting" (default OFF) — switches between all-at-once text and hover-to-reveal
- Toggle: "Spatial Contiguity" (default OFF) — switches infobox between far sidebar and adjacent placement
- Button: "Best Practice" — enables all three toggles simultaneously
- Button: "Reset" — disables all three toggles
- The sample diagram is fully interactive (hover to explore regions) regardless of toggle state, so learners can feel the difference

**Behavior:**
- Toggling a principle immediately updates the diagram's visual presentation
- The Design Quality Score animates smoothly when toggles change
- Hovering over a region always triggers interaction, but the quality of that interaction varies based on active principles
- Responsive to window resize; diagram and controls scale proportionally

**Default Parameters:**
- All three toggles: OFF (so learners start with the "poor design" version and improve it)
- Canvas width: responsive
- Canvas height: 550px

Implementation: p5.js with conditional rendering based on toggle state
</details>

## Learning Objectives and Bloom's Taxonomy

A **learning objective** is a specific, measurable statement of what a student will be able to do after completing an instructional experience. Well-written learning objectives are the foundation of effective infographic design because they answer the critical question: "What should the student be able to do after interacting with this MicroSim?"

Without a clear learning objective, an interactive infographic is just a pretty toy. With one, it becomes a purposeful teaching instrument that can be evaluated for effectiveness.

### Bloom's Taxonomy: Six Levels of Cognitive Complexity

**Bloom's Taxonomy** (revised 2001 by Anderson and Krathwohl) organizes cognitive processes into six hierarchical levels, from simple recall to complex creation. Each level represents a qualitatively different type of thinking, and each has associated action verbs that make learning objectives measurable.

| Level | Name | Description | Action Verbs | MicroSim Pattern |
|-------|------|-------------|-------------|-----------------|
| L1 | **Remember** | Recall facts, terms, and basic concepts | List, define, recall, identify, name | Flashcards, label-the-diagram, matching pairs |
| L2 | **Understand** | Explain ideas, summarize, interpret | Explain, summarize, classify, compare | Step-through with worked examples, concept matcher |
| L3 | **Apply** | Use knowledge to solve problems in new situations | Construct, implement, use, calculate | Parameter explorer, interactive calculator, scenario simulator |
| L4 | **Analyze** | Break down information to understand structure and relationships | Differentiate, compare, examine, organize | Network graph explorer, cause-effect mapper, data pattern finder |
| L5 | **Evaluate** | Make judgments based on criteria | Judge, critique, assess, justify | Classification sorter, error detector, rubric rater |
| L6 | **Create** | Produce new or original work | Design, construct, develop, compose | Model editor, diagram builder, synthesis canvas |

### The Six Levels in Detail

The **Remember level** (L1) involves recalling previously learned information without necessarily understanding it. A student at this level can name the four overlay types but might not be able to explain when to use each one. MicroSims targeting Remember typically use flashcard, matching, or label-identification patterns — low interactivity, focused on recognition and retrieval.

The **Understand level** (L2) requires students to demonstrate comprehension by explaining, summarizing, or interpreting. A student at this level can explain *why* Type 2 polygon overlays use ray casting for hit detection. MicroSims targeting Understand use step-through demonstrations with concrete data, concept comparisons, and prediction-before-reveal interactions.

The **Apply level** (L3) asks students to use what they have learned in new situations. A student at this level can take an unfamiliar diagram and construct an overlay JSON file for it. MicroSims targeting Apply provide parameter exploration, guided problem-solving, and hands-on construction tools.

The **Analyze level** (L4) requires students to break down complex information to understand its structure. A student at this level can examine a learning graph and identify which concepts depend on which prerequisites. MicroSims targeting Analyze use network graph explorers, side-by-side comparisons, and pattern-finding visualizations.

The **Evaluate level** (L5) asks students to make judgments using defined criteria. A student at this level can assess a MicroSim against the quality rubric and recommend specific improvements. MicroSims targeting Evaluate use classification sorters, error detectors, and rubric-based scoring tools.

The **Create level** (L6) is the highest cognitive level, requiring students to produce original work. A student at this level can design a new interactive infographic from scratch — selecting the overlay type, writing the JSON configuration, and implementing the JavaScript. MicroSims targeting Create provide open-ended builders, editors, and design canvases.

### Writing Effective Learning Objectives

A well-written learning objective follows the **ABCD** format:

- **A**udience: Who is the learner?
- **B**ehavior: What observable action will they perform? (Use a Bloom verb)
- **C**ondition: Under what circumstances?
- **D**egree: How well or to what standard?

For example: "Given a diagram of a mechanical system (**C**ondition), the student (**A**udience) will **construct** (**B**ehavior — Apply/L3) an overlay JSON file with at least 6 non-overlapping rectangular regions that correctly map to the diagram components, scoring 85 or above on the quality rubric (**D**egree)."

Every MicroSim specification in this textbook includes a learning objective with a Bloom level and verb. This is not just documentation — it is a design constraint that determines the type of interactivity the MicroSim should provide.

#### Diagram: Bloom's Taxonomy MicroSim Matcher

<iframe src="../../sims/blooms-microsim-matcher/main.html" width="100%" height="600px" scrolling="no"></iframe>

<details markdown="1">
<summary>Bloom's Taxonomy MicroSim Matcher</summary>
Type: microsim
**sim-id:** blooms-microsim-matcher<br/>
**Library:** p5.js<br/>
**Status:** Specified

**Bloom Level:** Analyze (L4)
**Bloom Verb:** Differentiate
**Learning Objective:** Differentiate between the six Bloom's Taxonomy levels by matching learning objectives to the correct level and selecting the most appropriate MicroSim interaction pattern for each.

**Instructional Rationale:** A matching exercise with feedback is appropriate because the Analyze objective requires learners to examine learning objectives, identify their cognitive level, and connect that level to an appropriate interaction pattern. The two-stage matching (objective → level, level → pattern) builds analytical skills through practice.

**Canvas Layout:**
- Left panel (aliceblue, 50% width): a learning objective card displayed prominently with a multiple-choice selector for Bloom level
- Right panel (white, silver border, 50% width): six Bloom level cards arranged vertically, each showing the level name, description, and 2-3 recommended MicroSim patterns

**Visual Elements:**
- Left panel: a card showing a sample learning objective in large text (e.g., "Students will **list** the four overlay types and **define** each one")
- Below the card: 6 clickable buttons labeled L1-Remember through L6-Create
- After selecting a level: a second set of buttons showing 3 MicroSim pattern options (e.g., "Flashcard Quiz", "Parameter Explorer", "Model Editor") — only one is the best match for the selected Bloom level
- Right panel: a persistent reference showing all 6 levels with their verbs and recommended patterns, with the currently selected level highlighted
- A progress tracker at the top: "Question 3 of 10 | Score: 2/2"
- Immediate feedback: correct answers flash green with a brief explanation; incorrect answers flash red with guidance

**Interactive Controls:**
- Click a Bloom level button to classify the objective (Stage 1)
- Click a MicroSim pattern to select the best match (Stage 2)
- Button: "Next Objective" — advances to the next learning objective card
- Button: "Show Hint" — reveals the key verb in the objective highlighted in yellow
- Button: "Reset Quiz" — starts over with a fresh set of 10 objectives
- Toggle: "Show Reference Panel" (default on) — shows/hides the Bloom level reference on the right

**Behavior:**
- 10 sample learning objectives drawn from various chapters of this textbook
- Objectives are presented in random order
- Stage 1 (classify level) must be answered before Stage 2 (select pattern) appears
- Score is tracked across all 10 questions with a final summary showing strengths and areas for review
- Responsive: panels stack vertically on narrow screens

**Default Parameters:**
- Question 1 of 10 displayed
- Reference panel visible
- Canvas width: responsive
- Canvas height: 550px

Implementation: p5.js with card-based quiz UI and two-stage matching logic
</details>

## Formative Assessment in Interactive Infographics

**Formative assessment** is the process of monitoring student learning during instruction to provide ongoing feedback that improves both teaching and learning. Unlike summative assessment (final exams, grades), formative assessment is low-stakes, frequent, and designed to guide the learner rather than judge them.

Interactive infographics are uniquely positioned to embed formative assessment directly into the learning experience:

- **Quiz modes** in overlay infographics hide labels and ask students to identify regions, providing immediate correct/incorrect feedback
- **Prediction prompts** in MicroSims ask students to predict an outcome before revealing the answer ("What will happen when you increase the slider to 8?")
- **Self-check toggles** (like the "Show Numbers" toggle in Type 3 callout overlays) let students test their knowledge by hiding information they should be able to recall
- **Drag-and-drop sorting** activities embedded in infographics let students classify concepts and receive instant feedback

The key principle is that formative assessment should feel like part of the learning experience, not a separate test. When a student hovers over an overlay region to check whether they correctly identified the mitochondria, they are simultaneously learning and assessing — the boundary between instruction and assessment dissolves.

| Formative Assessment Strategy | MicroSim Implementation | Learning Benefit |
|------------------------------|------------------------|-----------------|
| Recall check | Hide labels → student identifies from memory | Strengthens retrieval (Remember/L1) |
| Prediction | "What happens next?" prompt before revealing | Builds mental models (Understand/L2) |
| Application challenge | Give new scenario, ask student to apply concept | Transfers knowledge (Apply/L3) |
| Comparison task | Side-by-side, ask "which is better and why?" | Develops analytical thinking (Analyze/L4) |
| Evaluation rubric | Score a sample against criteria | Builds judgment (Evaluate/L5) |

!!! mascot-encourage "You've Got This!"
    <img src="../../img/mascot/encouraging.png" class="mascot-admonition-img" alt="Percy encourages you">
    If formative assessment feels intimidating to design, remember that you have already been doing it. Every overlay infographic with a quiz mode, every MicroSim with a prediction prompt, and every toggle that hides information is a formative assessment tool. This section just gives you the vocabulary and framework to do it more intentionally.

## Scaffolding: Building Toward Independence

**Scaffolding** is an instructional strategy that provides temporary support structures to help learners accomplish tasks they could not yet complete independently. As the learner develops competence, the scaffolds are gradually removed — a process called "fading" — until the learner can perform the task without assistance.

The metaphor comes from construction: scaffolding surrounds a building during construction, supporting workers and materials, and is removed once the building can stand on its own. In education, scaffolding supports the learner's cognitive processes during skill development.

Scaffolding strategies in interactive infographics include:

1. **Worked examples first**: Show a completed overlay JSON file with annotations explaining each field before asking students to write their own
2. **Progressive complexity**: Start with a Type 1 overlay (4 rectangular regions) before advancing to Type 2 (polygon regions with 8+ vertices)
3. **Hints and guides**: Provide toggleable hint overlays that show where regions should be placed, fading as the student gains confidence
4. **Partial completion**: Provide a partially completed JSON file and ask students to fill in the missing fields
5. **Template scaffolds**: Template MicroSims (from Chapter 10) that provide the file structure, boilerplate code, and standard visual elements, allowing students to focus on the content-specific aspects

The chapter structure of this entire textbook is a scaffolding strategy. Chapter 1 introduces the concept of interactive infographics. Chapter 6 covers web fundamentals. Chapter 8 introduces JavaScript libraries. Chapter 9 presents overlay patterns. Each chapter adds new concepts while relying on the scaffolding of prior chapters. The learning graph makes these dependencies explicit, ensuring that students encounter concepts in an order that provides appropriate scaffolding at each stage.

## Knowledge Graphs, Concept Dependencies, and Learning Paths

### Knowledge Graphs

A **knowledge graph** is a structured representation of concepts and the relationships between them. In the context of an intelligent textbook, the knowledge graph maps every concept to its prerequisites, its taxonomy category, and its position in the overall curriculum. The learning graph CSV file used throughout this course is an implementation of a knowledge graph — each row defines a concept, its dependencies, and its taxonomy ID.

Knowledge graphs serve multiple purposes in educational design:

- **Curriculum mapping**: Visualizing which concepts depend on which others reveals the natural structure of the subject
- **Gap identification**: If a student struggles with concept X, the knowledge graph shows which prerequisite concepts (Y, Z) might need reinforcement
- **Adaptive learning**: AI systems can use the knowledge graph to recommend personalized learning paths based on a student's current mastery level
- **Content validation**: Checking that every concept in the graph appears in at least one chapter ensures complete coverage

### Concept Dependencies

A **concept dependency** is a directed relationship indicating that one concept must be understood before another can be meaningfully learned. In the learning graph, dependencies are expressed as "from → to" pairs where the "from" concept is a prerequisite for the "to" concept.

For example, the concept "Polygon Region" (ID 106) depends on "Region" (ID 14) and "Pixel Coordinates" (ID 236). A student who does not understand what a region is or how pixel coordinates work will struggle to understand polygon regions — the intrinsic cognitive load will be unmanageable because the prerequisite schemas are not yet in place.

**Prerequisite knowledge** is the set of concepts and skills that a learner must already possess before engaging with new material. The concept dependency structure in the learning graph formalizes prerequisite knowledge into a machine-readable format that can be used by:

- **Authors**: To sequence chapter content appropriately
- **Students**: To understand what they need to review before starting a new chapter
- **AI agents**: To generate personalized study plans and identify knowledge gaps

### Learning Paths

A **learning path** is an ordered sequence of concepts and activities that guides a student from their current knowledge state to a desired learning outcome. A learning path respects concept dependencies — it never presents a concept before its prerequisites have been covered.

The simplest learning path is a **topological sort** of the knowledge graph: an ordering of all concepts such that every concept appears after all of its prerequisites. But optimal learning paths consider additional factors:

- **Learner's current state**: Skip concepts the student already knows
- **Difficulty pacing**: Alternate between challenging new concepts and reinforcing familiar ones
- **Engagement**: Intersperse interactive MicroSims between text-heavy sections
- **Assessment checkpoints**: Place formative assessments after clusters of related concepts

#### Diagram: Knowledge Graph Learning Path Explorer

<iframe src="../../sims/learning-path-explorer/main.html" width="100%" height="600px" scrolling="no"></iframe>

<details markdown="1">
<summary>Knowledge Graph Learning Path Explorer</summary>
Type: graph-model
**sim-id:** learning-path-explorer<br/>
**Library:** vis-network<br/>
**Status:** Specified

**Bloom Level:** Analyze (L4)
**Bloom Verb:** Examine
**Learning Objective:** Examine a knowledge graph to identify concept dependencies, prerequisite knowledge chains, and optimal learning paths through a subset of the course curriculum.

**Instructional Rationale:** An interactive network graph is appropriate because the Analyze objective requires learners to trace dependency chains, identify bottleneck concepts, and understand how graph structure determines learning sequence. Direct manipulation of the graph (clicking nodes, tracing paths) builds structural understanding that text alone cannot convey.

**Canvas Layout:**
- Main area (aliceblue, 70% width): vis-network interactive graph showing concepts as nodes and dependencies as directed edges
- Right panel (white, silver border, 30% width): selected concept details and learning path display

**Visual Elements:**
- 25-30 nodes from the learning graph, representing a subset of the course concepts (e.g., the OVRLY taxonomy group: overlay pattern concepts)
- Nodes color-coded by taxonomy:
  - Blue: WEBFD (web fundamentals)
  - Green: OVRLY (overlayment patterns)
  - Orange: MSIM (MicroSim standards)
  - Purple: LEARN (learning science)
- Node size proportional to the number of outgoing dependencies (concepts that depend on this one) — larger nodes are "gateway" concepts
- Directed edges (arrows) from prerequisite to dependent concept
- When a node is selected:
  - All prerequisite nodes highlight in yellow
  - All dependent nodes highlight in light green
  - The prerequisite chain (all ancestors) is traced with thick yellow edges
  - The dependency chain (all descendants) is traced with thick green edges
- Right panel shows:
  - Selected concept name and taxonomy
  - Direct prerequisites (immediate parents)
  - Direct dependents (immediate children)
  - "Learning Path to Here" — the ordered sequence of prerequisites needed to reach this concept
  - "Unlocks" — concepts that become available after mastering this one

**Interactive Controls:**
- Click a node to select it and see its dependency details
- Double-click a node to "mark as mastered" (turns gold) — dependents whose prerequisites are all mastered turn from gray to colored, showing what is now "unlocked"
- Button: "Show Topological Order" — animates the nodes into a left-to-right topological sort layout, visually showing the required learning sequence
- Button: "Show Clusters" — rearranges nodes into taxonomy-based clusters
- Button: "Reset" — clears all mastery marks and returns to force-directed layout
- Slider: "Zoom" — adjusts graph zoom level
- Toggle: "Show Edge Labels" — displays "requires" on dependency edges

**Behavior:**
- Force-directed layout by default for intuitive cluster visualization
- Clicking a node triggers smooth animation highlighting prerequisite and dependent chains
- Marking nodes as mastered progressively "unlocks" the graph, demonstrating how learning paths work
- The "Learning Path to Here" in the right panel updates in real time as mastery marks change
- Responsive to window resize; graph and panel adjust proportionally
- Pan and zoom via mouse drag and scroll wheel

**Default Parameters:**
- No nodes mastered initially
- Force-directed layout
- Edge labels: hidden
- Canvas width: responsive
- Canvas height: 550px

Implementation: vis-network with custom node coloring, path highlighting, and mastery tracking
</details>

## Putting It All Together: Design Principles for Effective Interactive Infographics

The learning science principles covered in this chapter converge into a practical design framework for creating interactive infographics that genuinely teach. Here is how the principles connect to concrete design decisions:

| Design Decision | Learning Science Principle | Practical Guideline |
|----------------|--------------------------|---------------------|
| How many elements to show at once? | Cognitive Load Theory (intrinsic load) | Start with 3-5 elements; add complexity progressively |
| Where to place labels? | Spatial Contiguity | Adjacent to the visual element, not in a distant sidebar |
| How to indicate active regions? | Signaling Principle | Use hover highlights, numbered indicators, color changes |
| How much to reveal at a time? | Segmenting Principle | Hover-to-reveal, progressive disclosure, step-through |
| What interaction type to use? | Bloom's Taxonomy level | Match interaction pattern to the target cognitive level |
| How to check understanding? | Formative Assessment | Quiz modes, prediction prompts, self-check toggles |
| What order to present concepts? | Concept Dependencies, Scaffolding | Simple to complex, prerequisites before dependents |
| How to support struggling learners? | Scaffolding | Hints, worked examples, templates, partial completion |

!!! mascot-warning "Common Mistake"
    <img src="../../img/mascot/warning.png" class="mascot-admonition-img" alt="Percy warns you">
    The most common learning science mistake in infographic design is conflating visual impressiveness with educational effectiveness. A MicroSim with smooth animations, particle effects, and dynamic color transitions may look stunning in a demo, but if it does not serve a learning objective at an appropriate Bloom level, it is adding extraneous cognitive load. Always start with the learning objective and work backward to the visual design — never the other way around.

#### Diagram: Infographic Design Principles Workflow

<iframe src="../../sims/design-principles-workflow/main.html" width="100%" height="550px" scrolling="no"></iframe>

<details markdown="1">
<summary>Infographic Design Principles Workflow</summary>
Type: workflow
**sim-id:** design-principles-workflow<br/>
**Library:** p5.js<br/>
**Status:** Specified

**Bloom Level:** Create (L6)
**Bloom Verb:** Design
**Learning Objective:** Design an effective interactive infographic by following a structured workflow that applies learning science principles at each stage, from learning objective definition through formative assessment integration.

**Instructional Rationale:** A step-through workflow diagram with hover-to-reveal details is appropriate because the Create objective requires learners to synthesize multiple principles into a coherent design process. The workflow provides a reusable mental model for approaching any new infographic project.

**Canvas Layout:**
- Main area (aliceblue): a horizontal flowchart with 6 numbered stages connected by arrows
- Below main area (white, silver border): detail panel showing the expanded description of the currently selected stage

**Visual Elements:**
- 6 stages displayed as large rounded rectangles connected by forward arrows:
  1. "Define Learning Objective" (purple) — Bloom level + verb + measurable behavior
  2. "Select Interaction Pattern" (blue) — Match Bloom level to MicroSim pattern
  3. "Manage Cognitive Load" (red) — Minimize extraneous, manage intrinsic, maximize germane
  4. "Apply Mayer's Principles" (green) — Signaling, segmenting, spatial contiguity
  5. "Build with Scaffolding" (orange) — Templates, worked examples, progressive complexity
  6. "Embed Formative Assessment" (teal) — Quiz modes, predictions, self-checks
- Each stage has a small icon representing its theme
- Clicking a stage highlights it with a thick border and displays its details below:
  - 3-4 bullet points of specific design actions
  - A concrete example from this textbook's infographics
  - A "Check: Is this done?" question for self-assessment
- An animated arrow traces the flow from left to right when the user clicks "Animate Workflow"
- Stages that have been clicked are marked with a green checkmark

**Interactive Controls:**
- Click any stage to select it and read details
- Button: "Animate Workflow" — sequentially highlights each stage with a 2-second delay, showing the flow
- Button: "Reset" — clears all checkmarks
- Toggle: "Show Connections" (default on) — shows/hides connecting arrows between stages
- Each stage's detail panel includes a "Mark Complete" button that adds a checkmark to track progress

**Behavior:**
- Clicking a stage smoothly scrolls the detail panel to show that stage's information
- The "Animate Workflow" mode pauses on each stage, displaying its details before advancing
- All 6 stages must be marked complete to trigger a "Workflow Complete!" celebration message
- Responsive to window resize; stages wrap to 2 rows on narrow screens

**Default Parameters:**
- No stage selected initially
- Show Connections: on
- Canvas width: responsive
- Canvas height: 500px

Implementation: p5.js with flowchart rendering and stage-detail interaction
</details>

## Summary

!!! mascot-celebration "Excellent Work!"
    <img src="../../img/mascot/celebration.png" class="mascot-admonition-img" alt="Percy celebrates">
    You now have the learning science foundation to make every interactive infographic a genuine teaching instrument! These principles — cognitive load management, dual coding, Mayer's multimedia guidelines, Bloom's Taxonomy, scaffolding, and formative assessment — are what separate decorative visualizations from transformative learning experiences. Your infographics will not just look great; they will teach effectively. Display it with style!

In this chapter, you learned that:

- **Cognitive load theory** identifies three types of cognitive load — intrinsic (material complexity), extraneous (poor design), and germane (productive learning effort) — and effective infographic design minimizes extraneous load to maximize germane processing
- **Dual coding theory** demonstrates that presenting information through both verbal and visual channels simultaneously creates stronger, more retrievable memory traces, validating the core overlay pattern of pairing images with text descriptions
- **Multimedia learning** research by Mayer has produced evidence-based principles including the **signaling principle** (add cues to highlight key content), the **segmenting principle** (present information in learner-paced chunks), and the **spatial contiguity** principle (place corresponding words and pictures near each other)
- A **learning objective** specifies what a student will be able to do, and **Bloom's Taxonomy** provides six hierarchical levels — **Remember** (L1), **Understand** (L2), **Apply** (L3), **Analyze** (L4), **Evaluate** (L5), and **Create** (L6) — each with specific action verbs and corresponding MicroSim interaction patterns
- **Formative assessment** monitors learning during instruction through low-stakes, embedded activities like quiz modes, prediction prompts, and self-check toggles that provide immediate feedback
- **Scaffolding** provides temporary support (worked examples, templates, progressive complexity) that is gradually removed as learners develop competence
- A **knowledge graph** represents concepts and their **concept dependencies**, enabling the identification of **prerequisite knowledge** and the construction of optimal **learning paths** that respect the required sequencing of the curriculum

## References

- [Wikipedia: Cognitive Load Theory](https://en.wikipedia.org/wiki/Cognitive_load)
- [Wikipedia: Dual-Coding Theory](https://en.wikipedia.org/wiki/Dual-coding_theory)
- [Wikipedia: Multimedia Learning](https://en.wikipedia.org/wiki/Multimedia_learning)
- [Wikipedia: Bloom's Taxonomy](https://en.wikipedia.org/wiki/Bloom%27s_taxonomy)
- [Anderson, L. W. & Krathwohl, D. R. (2001). A Taxonomy for Learning, Teaching, and Assessing](https://en.wikipedia.org/wiki/Bloom%27s_taxonomy#Revised_taxonomy_(2001))
- [Mayer, R. E. (2009). Multimedia Learning. Cambridge University Press](https://en.wikipedia.org/wiki/Multimedia_learning#Mayer's_cognitive_theory_of_multimedia_learning)
- [Wikipedia: Instructional Scaffolding](https://en.wikipedia.org/wiki/Instructional_scaffolding)
- [Wikipedia: Formative Assessment](https://en.wikipedia.org/wiki/Formative_assessment)
- [Wikipedia: Knowledge Graph](https://en.wikipedia.org/wiki/Knowledge_graph)
- [Sweller, J. (1988). Cognitive Load During Problem Solving: Effects on Learning](https://en.wikipedia.org/wiki/Cognitive_load#History)
