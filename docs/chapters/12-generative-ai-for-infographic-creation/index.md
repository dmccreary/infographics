---
title: Generative AI for Infographic Creation
description: Learn how generative AI tools accelerate interactive infographic creation through text-to-image generation, AI-assisted overlay and code generation, prompt engineering, quality review workflows, and no-code/low-code approaches for educators.
generated_by: claude skill chapter-content-generator
date: 2026-03-14 17:49:15
version: 0.05
---

# Generative AI for Infographic Creation

## Summary

This chapter explores how generative AI tools accelerate every stage of interactive infographic creation. You will learn to use text-to-image LLMs for generating base illustrations, AI-assisted overlay and code generation, prompt engineering strategies for consistent results, and quality review processes for AI-generated content. The chapter walks through the complete AI-assisted workflow from concept description to deployable MicroSim, including no-code and low-code approaches that make professional infographics accessible to educators without deep programming expertise.

## Concepts Covered

This chapter covers the following 11 concepts from the learning graph:

1. Text-to-Image LLM
2. Base Image Generation
3. AI Overlay Generation
4. AI Code Generation
5. AI-Assisted Workflow
6. Prompt Engineering
7. AI Quality Review
8. Editorial Control
9. Concept to MicroSim
10. No-Code Tool
11. Low-Code Tool

## Prerequisites

This chapter builds on concepts from:

- [Chapter 8: JavaScript Visualization Libraries](../08-javascript-visualization-libraries/index.md)
- [Chapter 9: Overlayment Interactive Patterns](../09-overlayment-interactive-patterns/index.md)
- [Chapter 10: MicroSim Standards and Packaging](../10-microsim-standards-and-packaging/index.md)

---

!!! mascot-welcome "Let's Make It Visual!"
    <img src="../../img/mascot/welcome.png" class="mascot-admonition-img" alt="Percy welcomes you">
    Welcome to one of the most exciting chapters in this course! Generative AI has fundamentally changed the economics of interactive infographic creation. What once required a team of graphic designers, JavaScript developers, and instructional designers can now be accomplished by a single educator with a well-crafted prompt. This chapter shows you how to harness these tools effectively — not as a replacement for design judgment, but as a powerful amplifier of your creative vision. Let's make it visual!

## Learning Objectives

By the end of this chapter, you will be able to:

- **Explain** how generative AI tools contribute to each stage of infographic creation, from base image generation through overlay configuration to code generation (Bloom: Understand)
- **Apply** prompt engineering techniques to generate consistent, high-quality base illustrations and overlay configurations for MicroSim infographics (Bloom: Apply)
- **Construct** a complete interactive MicroSim using the AI-assisted workflow, from concept description to deployable package (Bloom: Apply)
- **Evaluate** AI-generated infographic content against quality standards and apply editorial control to ensure accuracy and pedagogical effectiveness (Bloom: Evaluate)
- **Design** an AI-assisted infographic creation workflow that combines no-code and low-code tools with manual refinement for optimal results (Bloom: Create)

## Introduction

Throughout this course, you have been learning to build interactive infographics by hand — writing overlay JSON files, coding p5.js sketches, configuring metadata, and testing responsive layouts. These skills are essential because they give you deep understanding of how every component works. But in professional practice, creating infographics entirely by hand is slow. A single Type 2 polygon overlay with eight regions might take two hours to define all the vertex coordinates, write the descriptions, and test the interactions. Multiply that by the dozens or hundreds of infographics needed for a complete intelligent textbook, and the timeline becomes impractical for most educators.

Generative AI changes this equation dramatically. Large language models (LLMs) can generate overlay JSON configurations from natural language descriptions in seconds. Text-to-image models can produce base illustrations tailored to specific educational contexts. Code generation tools can scaffold entire MicroSim packages from a specification. The result is that the bottleneck shifts from *production* to *design judgment* — deciding what to build, how to structure the learning experience, and whether the AI-generated output meets your quality standards.

This chapter presents the generative AI toolkit for infographic creation in a practical, workflow-oriented sequence. You will start with the foundational concepts (what these AI tools actually do), progress through the specific generation techniques (images, overlays, code), learn the critical quality review and editorial control practices, and finish with the complete end-to-end workflow that transforms a concept description into a deployable MicroSim.

## Prompt Engineering: The Foundation Skill

**Prompt engineering** is the practice of crafting input text (prompts) that guide a generative AI model to produce desired outputs. In the context of infographic creation, prompt engineering is the skill that determines whether the AI produces a usable, high-quality result on the first attempt or requires multiple rounds of revision.

Effective prompt engineering for infographic creation follows a consistent structure:

1. **Context**: What is the educational setting and audience?
2. **Specification**: What exactly should the output contain?
3. **Constraints**: What standards, formats, or limitations apply?
4. **Examples**: What does a good result look like?

For example, a prompt for generating an overlay JSON file might be structured as:

```
Context: I am creating an interactive infographic for a college-level biology
textbook about animal cell organelles.

Specification: Generate an overlay JSON file for a Type 2 polygon overlay with
6 regions covering: nucleus, mitochondria, endoplasmic reticulum, Golgi apparatus,
cell membrane, and ribosomes. Each region needs an id, label, description (2-3
sentences at college reading level), and polygon geometry with 6-10 vertex points
using relative coordinates (0.0 to 1.0).

Constraints: Use the overlay JSON format from Chapter 9 with geometry type
"polygon". All coordinates must be between 0.0 and 1.0. Regions should not
overlap. Descriptions should be scientifically accurate.

Example: See the mitochondria region example from Chapter 9:
{"id": "mitochondria", "label": "Mitochondria", "description": "The powerhouse
of the cell...", "geometry": {"type": "polygon", "points": [[0.55, 0.35], ...]}}
```

| Prompt Component | Purpose | Common Mistakes |
|-----------------|---------|-----------------|
| **Context** | Grounds the AI in the right domain and audience | Too vague ("make an infographic") or missing entirely |
| **Specification** | Defines exactly what to produce | Underspecified (no format details) or overspecified (pixel-level positioning) |
| **Constraints** | Sets boundaries for acceptable output | Forgetting format standards (relative coordinates, JSON structure) |
| **Examples** | Shows the AI what success looks like | No examples, or examples that contradict the specification |

The quality of prompt engineering directly determines how much **editorial control** is needed downstream. A well-engineered prompt produces output that requires minor adjustments. A vague prompt produces output that requires extensive rework — sometimes more work than writing the content from scratch.

!!! mascot-thinking "Key Insight"
    <img src="../../img/mascot/thinking.png" class="mascot-admonition-img" alt="Percy is thinking">
    Prompt engineering is not a workaround for limited AI capabilities — it is a design skill in its own right. The best prompts encode the same instructional design thinking you would apply if building the infographic manually: clear learning objectives, appropriate reading level, consistent visual standards, and measurable quality criteria. The AI just executes faster.

## Base Image Generation with Text-to-Image LLMs

### Text-to-Image LLMs

A **text-to-image LLM** is a generative AI model that produces images from natural language descriptions. Models such as DALL-E, Midjourney, Stable Diffusion, and Adobe Firefly can generate illustrations, diagrams, photographs, and artistic renderings from text prompts. For infographic creation, text-to-image models serve a specific role: producing the **base illustration** that will be overlaid with interactive regions.

### Base Image Generation

**Base image generation** is the process of using a text-to-image LLM to create the underlying visual content for an overlayment infographic. Instead of hiring an illustrator or searching stock image libraries, you describe the diagram you need and the AI generates it.

Effective base image prompts for infographic use follow specific patterns:

- **Clean, labeled diagrams**: "A clean, flat-design diagram of a four-stroke engine showing the intake, compression, combustion, and exhaust stages. Each stage is clearly separated. White background, no text labels, professional technical illustration style."
- **Educational illustrations**: "A colorful, simplified cross-section of an animal cell showing the nucleus, mitochondria, endoplasmic reticulum, Golgi apparatus, cell membrane, and ribosomes. Each organelle is distinctly colored and clearly bounded. Flat design, educational textbook style."
- **Architectural diagrams**: "A clean block diagram showing a three-tier web application architecture with a client browser layer, application server layer, and database layer. Each tier is a distinct colored rectangle. Arrows show data flow between tiers. Professional, minimalist style."

Key considerations for base image generation:

- **Request no text labels**: AI-generated text in images is often distorted or misspelled. Plan to add labels through the overlay layer instead.
- **Specify clean boundaries**: Regions that will become interactive overlays need clear visual boundaries so polygon vertices can be defined precisely.
- **Use flat design styles**: Flat, minimalist illustrations work better as overlay backgrounds than photorealistic or heavily textured images because interactive highlights remain visible.
- **Request consistent aspect ratios**: Specify dimensions that match your MicroSim canvas layout (e.g., "landscape orientation, approximately 4:3 aspect ratio").

| Image Characteristic | Good for Overlays | Bad for Overlays |
|---------------------|-------------------|-----------------|
| Flat design, solid colors | Clear region boundaries | Gradients obscure highlights |
| No embedded text | Labels added via overlay | AI text is often garbled |
| Distinct component shapes | Polygon vertices easy to define | Overlapping shapes confuse hit detection |
| White or neutral background | Consistent with aliceblue standard | Busy backgrounds compete with highlights |
| High resolution (1200px+) | Sharp at all display sizes | Low-res images pixelate when embedded |

#### Diagram: AI Image Generation Prompt Builder

<iframe src="../../sims/ai-image-prompt-builder/main.html" width="100%" height="600px" scrolling="no"></iframe>

<details markdown="1">
<summary>AI Image Generation Prompt Builder</summary>
Type: microsim
**sim-id:** ai-image-prompt-builder<br/>
**Library:** p5.js<br/>
**Status:** Specified

**Bloom Level:** Apply (L3)
**Bloom Verb:** Construct
**Learning Objective:** Construct effective text-to-image prompts for base illustration generation by selecting components from structured categories (subject, style, composition, constraints) and observing how each component affects the assembled prompt.

**Instructional Rationale:** A guided prompt builder with component selection is appropriate because the Apply objective requires learners to use prompt engineering principles in a structured way. Building prompts from categorized components teaches the underlying structure while producing usable outputs.

**Canvas Layout:**
- Left panel (aliceblue, 55% width): prompt builder interface with categorized dropdown selectors and a live prompt preview
- Right panel (white, silver border, 45% width): three sample "before and after" image pairs showing the effect of prompt quality on output

**Visual Elements:**
- Left panel contains four sections, each with a dropdown and a text input:
  1. "Subject" — dropdown with preset subjects (Cell Biology, Engine, Solar System, Computer Architecture) plus a custom text input
  2. "Visual Style" — dropdown: Flat Design, Technical Illustration, Watercolor, Photorealistic, Minimalist Line Art
  3. "Composition" — dropdown: Labeled Cross-Section, Exploded View, Block Diagram, Side-by-Side, Bird's Eye View
  4. "Overlay Constraints" — checkboxes: "No embedded text", "Clear region boundaries", "Neutral background", "High contrast colors", "Landscape orientation"
- Below the selectors: a "Generated Prompt" text area showing the assembled prompt in real time as selections change
- A "Copy Prompt" button that copies the assembled prompt to the clipboard
- Right panel shows 3 image pairs:
  - Pair 1: "Vague Prompt" image (messy, unclear) vs. "Structured Prompt" image (clean, overlay-ready)
  - Pair 2: "With Text" image (garbled labels) vs. "No Text" image (clean for overlay labeling)
  - Pair 3: "Busy Background" image vs. "Neutral Background" image
- Each pair has a brief caption explaining the improvement

**Interactive Controls:**
- Dropdowns and checkboxes for prompt component selection
- Custom text input for subject (overrides dropdown if filled)
- Button: "Copy Prompt" — copies to clipboard with confirmation toast
- Button: "Reset to Defaults" — clears all selections
- Toggle: "Show Prompt Tips" — reveals 2-3 tips for each section explaining why the options matter

**Behavior:**
- Changing any selector immediately updates the "Generated Prompt" text area
- The prompt assembles components in a consistent order: subject → style → composition → constraints
- Checking more constraint boxes adds additional clauses to the prompt
- Tips appear as inline text below each selector when toggled on
- Responsive to window resize; panels stack vertically on narrow screens

**Default Parameters:**
- Subject: Cell Biology
- Visual Style: Flat Design
- Composition: Labeled Cross-Section
- Overlay Constraints: "No embedded text" and "Clear region boundaries" checked
- Show Prompt Tips: off
- Canvas width: responsive
- Canvas height: 550px

Implementation: p5.js with dynamic text assembly and categorized selector UI
</details>

## AI Overlay Generation

**AI overlay generation** is the process of using an LLM to produce the overlay JSON configuration file for an interactive infographic. Given a description of the image content and the desired interactive regions, the LLM generates a structured JSON file with region IDs, labels, descriptions, and geometry coordinates.

This is one of the highest-impact AI applications in the infographic creation workflow because defining overlay regions manually — especially Type 2 polygon regions with multiple vertices — is the most time-consuming step. An LLM can generate a complete overlay JSON in seconds, with descriptions written at the appropriate reading level and coordinates that approximate the correct positions.

The AI overlay generation process:

1. **Describe the image**: Tell the LLM what the base image shows and where key features are located
2. **Specify the overlay type**: Request Type 1 (rectangular), Type 2 (polygon), Type 3 (callout), or Type 4 (floating label) format
3. **Define the regions**: List the features that should become interactive regions
4. **Set content parameters**: Specify reading level, description length, and terminology for the infobox text
5. **Request the JSON**: Ask for output in the exact overlay JSON format used by the overlay diagram driver

A typical prompt for AI overlay generation:

```
Generate an overlay JSON file for a Type 1 rectangular overlay of a
computer motherboard diagram. The image is 800x600 pixels.

Create 8 non-overlapping rectangular regions for:
1. CPU socket (center-left area)
2. RAM slots (upper-right area)
3. GPU slot (lower-center area)
4. Chipset (center area)
5. SATA connectors (right edge)
6. Power connector (upper-left corner)
7. I/O panel (left edge)
8. BIOS chip (lower-right area)

Requirements:
- Use relative coordinates (0.0 to 1.0)
- Each region: id, label, description (2-3 sentences, college level)
- Regions must not overlap
- Follow the overlay JSON format: {"image": "...", "regions": [...]}
```

The AI-generated JSON will typically need adjustment — coordinates may not precisely match your specific image, and descriptions may need fact-checking. But starting from an AI-generated draft is dramatically faster than starting from scratch.

## AI Code Generation

**AI code generation** is the use of LLMs to produce the JavaScript, HTML, and CSS code that implements an interactive infographic. This includes generating:

- The `main.html` file with proper structure, CDN library imports, and canvas setup
- The `sketch.js` file with p5.js drawing logic, event handlers, and responsive layout
- Control panel code with sliders, buttons, and toggles
- PostMessage height reporting for iframe embedding
- The complete MicroSim directory structure with metadata.json

Modern code-generation LLMs (Claude, GPT-4, Codex) can produce functional MicroSim code from detailed specifications. The key is providing specifications that include all the information the LLM needs:

- Canvas dimensions and layout (drawing region + control region)
- Visual elements with colors, positions, and sizes
- Interactive behaviors (hover, click, drag responses)
- Control elements with parameter ranges and defaults
- Responsive design requirements
- The MicroSim packaging standards (aliceblue background, white controls, silver border)

| Generation Target | AI Capability | Human Review Focus |
|------------------|---------------|-------------------|
| HTML structure | Excellent — standard boilerplate | Verify CDN versions, meta tags |
| CSS styling | Good — may need visual fine-tuning | Check responsive behavior at edge cases |
| p5.js drawing code | Good — correct patterns, may have geometry errors | Test with real data, check visual accuracy |
| Event handling | Good — standard patterns | Test edge cases (rapid clicking, touch events) |
| Overlay JSON | Good — structure correct, coordinates approximate | Calibrate positions against actual image |
| metadata.json | Excellent — follows Dublin Core schema | Verify factual accuracy of descriptions |
| Responsive layout | Moderate — may miss edge cases | Test at 360px, 600px, 900px, 1200px widths |

!!! mascot-tip "Percy's Tip"
    <img src="../../img/mascot/tip.png" class="mascot-admonition-img" alt="Percy shares a tip">
    When using AI code generation for MicroSims, always include the MicroSim packaging standards in your prompt: aliceblue drawing region, white control region, silver border, postMessage height reporting, and responsive window resize handling. LLMs follow explicit constraints reliably — but they will not apply standards they do not know about.

## No-Code and Low-Code Approaches

### No-Code Tools

A **no-code tool** enables educators to create interactive infographics without writing any code. No-code approaches use visual editors, drag-and-drop interfaces, and configuration forms to define infographic behavior. In the context of AI-assisted infographic creation, a no-code workflow might look like:

1. Describe the infographic in natural language
2. An AI agent generates all files (main.html, overlay.json, metadata.json)
3. The educator reviews the output in a browser preview
4. Adjustments are made through a visual editor (dragging regions, editing text in forms)
5. The final package is exported as a standard MicroSim directory

No-code tools are ideal for educators who understand instructional design but do not have JavaScript programming experience. The trade-off is flexibility — no-code tools can only produce infographic types that the tool supports.

### Low-Code Tools

A **low-code tool** provides a middle ground between full manual coding and no-code generation. Low-code approaches give the educator a working MicroSim generated by AI, which they then customize by editing small amounts of code — changing colors in a CSS file, adjusting coordinates in a JSON file, or modifying labels in a configuration object.

The template MicroSims from Chapter 10 are a form of low-code tool: the boilerplate is provided, and the educator fills in content-specific details. Combined with AI generation, the low-code workflow becomes:

1. AI generates a complete MicroSim from a specification
2. The educator tests it in a browser
3. Minor adjustments are made by editing JSON, CSS, or small JavaScript snippets
4. The package passes the standardization checklist

| Approach | Technical Skill Required | Flexibility | Speed | Best For |
|----------|------------------------|-------------|-------|----------|
| **Full code** | Advanced JavaScript | Unlimited | Slow | Novel interaction types, complex visualizations |
| **Low-code** | Basic JSON/CSS editing | High | Fast | Customizing AI-generated or template MicroSims |
| **No-code** | None (natural language only) | Moderate | Fastest | Standard overlay types, rapid prototyping |

The trend in educational technology is clearly toward lowering the barrier to entry. As AI tools improve, the no-code and low-code approaches will handle an increasing percentage of infographic creation needs, freeing educators to focus on instructional design rather than implementation details.

## The Concept-to-MicroSim Workflow

**Concept to MicroSim** describes the complete AI-assisted workflow that transforms a concept description into a deployable interactive MicroSim. This is the end-to-end process that ties together all the AI generation techniques covered in this chapter.

The workflow has five stages:

### Stage 1: Concept Definition

Start with a clear description of the educational concept and the learning objective. This is where instructional design skills matter most — the AI cannot determine *what* to teach, only *how* to implement what you specify.

```
Concept: The four-stroke engine cycle
Learning Objective: Students will identify and sequence the four
strokes (intake, compression, combustion, exhaust) and explain
the energy transformation at each stage.
Bloom Level: Understand (L2)
Target Audience: College-level mechanical engineering students
```

### Stage 2: Base Image Generation

Use a text-to-image LLM to generate the base illustration, applying the prompt engineering techniques from earlier in this chapter.

### Stage 3: Overlay and Code Generation

Use an LLM to generate the overlay JSON configuration and the MicroSim code. Provide the image description, overlay type selection, region definitions, and MicroSim packaging standards as context.

### Stage 4: Quality Review and Editorial Control

This is the critical human-in-the-loop stage. **AI quality review** is the systematic process of evaluating AI-generated content against defined standards before deployment. **Editorial control** is the human authority to accept, modify, or reject AI-generated content.

Quality review checks for AI-generated infographics:

- **Factual accuracy**: Are descriptions scientifically, historically, or technically correct?
- **Pedagogical appropriateness**: Does the content match the target reading level and learning objective?
- **Visual correctness**: Do overlay regions align with the actual image features?
- **Code functionality**: Does the MicroSim load without errors and respond to interactions correctly?
- **Standards compliance**: Does the package pass the MicroSim standardization checklist?
- **Accessibility**: Are labels readable, colors distinguishable, and interactions keyboard-accessible?

### Stage 5: Deployment

Package the reviewed MicroSim following the standards from Chapter 10 and deploy with `mkdocs gh-deploy`.

#### Diagram: Concept-to-MicroSim Workflow

<iframe src="../../sims/concept-to-microsim-workflow/main.html" width="100%" height="600px" scrolling="no"></iframe>

<details markdown="1">
<summary>Concept-to-MicroSim Workflow</summary>
Type: workflow
**sim-id:** concept-to-microsim-workflow<br/>
**Library:** p5.js<br/>
**Status:** Specified

**Bloom Level:** Understand (L2)
**Bloom Verb:** Describe
**Learning Objective:** Describe the five stages of the concept-to-MicroSim AI-assisted workflow and explain what happens at each stage, including where human judgment is required versus where AI handles execution.

**Instructional Rationale:** A step-through workflow with hover-to-reveal details and a human/AI indicator is appropriate because the Understand objective requires learners to trace the complete process and distinguish between automated and human-driven stages. Seeing the full pipeline from concept to deployment builds a coherent mental model of the AI-assisted workflow.

**Canvas Layout:**
- Main area (aliceblue): a horizontal pipeline diagram with 5 stages connected by arrows
- Below (white, silver border): detail panel for the selected stage

**Visual Elements:**
- 5 stages displayed as large rounded rectangles in a horizontal flow:
  1. "Concept Definition" (purple, icon: lightbulb) — tagged "HUMAN"
  2. "Base Image Generation" (blue, icon: image) — tagged "AI + HUMAN REVIEW"
  3. "Overlay & Code Generation" (green, icon: code brackets) — tagged "AI + HUMAN REVIEW"
  4. "Quality Review" (orange, icon: checkmark) — tagged "HUMAN"
  5. "Deployment" (teal, icon: rocket) — tagged "AUTOMATED"
- Each stage has a small badge showing "HUMAN", "AI", or "AI + HUMAN REVIEW" to indicate who drives that stage
- Arrows between stages include small labels:
  - Stage 1→2: "Learning objective + description"
  - Stage 2→3: "Base illustration file"
  - Stage 3→4: "Complete MicroSim package"
  - Stage 4→5: "Approved MicroSim"
- Clicking a stage shows in the detail panel:
  - Stage description (3-4 sentences)
  - Inputs: what this stage receives
  - Outputs: what this stage produces
  - Tools used (e.g., "DALL-E, Midjourney, or Stable Diffusion")
  - Time estimate (e.g., "2-5 minutes with AI, 1-2 hours without")
  - Common pitfalls at this stage
- A "Time Comparison" bar at the bottom shows estimated time for AI-assisted vs. manual workflow for each stage

**Interactive Controls:**
- Click any stage to select it and view details
- Button: "Animate Flow" — sequentially highlights stages with 3-second transitions, showing the pipeline in motion
- Toggle: "Show Time Comparison" (default off) — reveals the time comparison bars below each stage
- Toggle: "Show AI/Human Tags" (default on) — shows/hides the HUMAN/AI badges
- Button: "Reset" — deselects all stages

**Behavior:**
- Clicking a stage smoothly transitions the detail panel content
- "Animate Flow" mode pauses on each stage, briefly showing its detail before advancing
- The time comparison shows dramatic differences (e.g., Stage 3: "5 minutes AI-assisted" vs. "3 hours manual")
- Responsive to window resize; stages wrap to 2-3 rows on narrow screens

**Default Parameters:**
- No stage selected initially
- Show AI/Human Tags: on
- Show Time Comparison: off
- Canvas width: responsive
- Canvas height: 550px

Implementation: p5.js with workflow rendering and stage-detail interaction
</details>

## AI Quality Review and Editorial Control

**AI quality review** deserves special emphasis because it is the step that determines whether AI-generated infographics are educational assets or sources of misinformation. AI models can produce plausible-looking content that contains factual errors, pedagogical missteps, or subtle misalignments with the intended learning objective.

**Editorial control** is the principle that a qualified human — the instructional designer or subject matter expert — has final authority over all content that reaches students. AI is a production tool, not a decision-maker. The human editor:

- **Verifies factual accuracy** of all descriptions, labels, and data
- **Checks pedagogical alignment** between the content and the learning objective
- **Tests functionality** by interacting with every region, control, and display element
- **Validates accessibility** by checking keyboard navigation, color contrast, and screen reader behavior
- **Applies the quality rubric** from Chapter 10 to score the MicroSim
- **Makes the deploy/revise decision** based on whether the MicroSim meets the minimum quality threshold (85/100)

A practical editorial control workflow for AI-generated infographics:

1. **First pass — automated checks**: Run the standardization checklist (file structure, metadata completeness, no console errors)
2. **Second pass — content review**: Read every description for accuracy, clarity, and reading level appropriateness
3. **Third pass — interaction testing**: Hover over every region, click every control, test at three viewport widths
4. **Fourth pass — pedagogical review**: Does the infographic achieve its stated learning objective? Would a student learn the right things from interacting with it?

| Review Dimension | What AI Gets Right | What AI Gets Wrong |
|-----------------|-------------------|-------------------|
| **Structure** | JSON format, file organization, metadata schema | Occasionally missing fields or using outdated formats |
| **Descriptions** | Fluent prose, appropriate length, good vocabulary | Subtle factual errors, oversimplifications, hallucinated details |
| **Coordinates** | Correct format (0.0-1.0 relative), reasonable layout | Positions often need calibration against the actual image |
| **Code** | Correct syntax, standard patterns, proper imports | Edge case bugs, responsive issues at extreme widths |
| **Pedagogy** | Follows specified Bloom level | May not connect to prior/subsequent concepts optimally |

!!! mascot-warning "Common Mistake"
    <img src="../../img/mascot/warning.png" class="mascot-admonition-img" alt="Percy warns you">
    The most dangerous AI-generated content is content that is *almost* correct. A description of the mitochondria that says "generates ATP through cellular respiration" is correct, but one that says "generates ATP through photosynthesis" is plausible-sounding and wrong. Always verify AI-generated educational content against authoritative sources — the time saved in generation is wasted if students learn incorrect information.

#### Diagram: AI Quality Review Dashboard

<iframe src="../../sims/ai-quality-review-dashboard/main.html" width="100%" height="600px" scrolling="no"></iframe>

<details markdown="1">
<summary>AI Quality Review Dashboard</summary>
Type: microsim
**sim-id:** ai-quality-review-dashboard<br/>
**Library:** p5.js<br/>
**Status:** Specified

**Bloom Level:** Evaluate (L5)
**Bloom Verb:** Assess
**Learning Objective:** Assess the quality of an AI-generated MicroSim by systematically reviewing its content, functionality, and pedagogical alignment using a structured review checklist, producing a quality score and identifying specific areas for revision.

**Instructional Rationale:** A structured review dashboard with checklist scoring is appropriate because the Evaluate objective requires learners to apply quality criteria systematically. Reviewing a pre-built sample MicroSim (with intentionally planted issues) teaches the editorial control workflow through practice.

**Canvas Layout:**
- Left panel (aliceblue, 50% width): embedded preview of a sample AI-generated MicroSim (a simple overlay infographic with several intentional quality issues)
- Right panel (white, silver border, 50% width): review checklist with scoring

**Visual Elements:**
- Left panel: a functional but imperfect sample MicroSim embedded as a mini preview:
  - A cell biology overlay infographic with 5 regions
  - Intentional issues planted for the reviewer to find:
    1. One description contains a factual error ("chloroplasts generate ATP" in an animal cell)
    2. One region's coordinates are misaligned (highlight does not match the visual feature)
    3. The metadata.json is missing the dc:rights field
    4. Font size does not scale on resize
    5. One infobox description is too advanced for the stated reading level
- Right panel: a checklist organized by review category:
  - Factual Accuracy (3 items)
  - Visual Alignment (2 items)
  - Metadata Completeness (3 items)
  - Responsiveness (2 items)
  - Pedagogical Fit (2 items)
- Each checklist item has three states: Pass (green check), Fail (red X), Not Reviewed (gray circle)
- A running score at the top: "Quality Score: 72/100" that updates as items are marked
- A "Findings" text area that auto-populates with specific feedback for each failed item

**Interactive Controls:**
- Click each checklist item to cycle through Pass/Fail/Not Reviewed
- The sample MicroSim in the left panel is fully interactive (hover to test overlay regions)
- Button: "Reveal Issues" — highlights all 5 planted issues with red annotations in the sample MicroSim
- Button: "Reset Review" — clears all checklist marks
- Button: "Export Report" — copies the findings as formatted markdown text
- Dropdown: "Sample MicroSim" with 3 options:
  - "Cell Biology (5 issues)" — default
  - "Engine Diagram (3 issues)" — fewer issues, higher base quality
  - "Network Architecture (7 issues)" — many issues, low base quality

**Behavior:**
- Marking checklist items as Pass/Fail updates the quality score in real time
- Failed items generate specific feedback in the Findings area (e.g., "Factual Error: Region 3 description mentions chloroplasts in an animal cell — chloroplasts are found only in plant cells")
- "Reveal Issues" annotates the sample with numbered red circles at each issue location
- Switching sample MicroSims resets the checklist and loads a new review
- Responsive: panels stack vertically on narrow screens

**Default Parameters:**
- Sample: "Cell Biology (5 issues)"
- All items: Not Reviewed
- Canvas width: responsive
- Canvas height: 550px

Implementation: p5.js with embedded MicroSim preview and checklist scoring system
</details>

## The Future of AI-Assisted Infographic Creation

The AI tools available today represent the early stages of a transformative shift in educational content creation. Several trends point toward an increasingly powerful AI-assisted future:

- **Multimodal generation**: Models that simultaneously generate images and interactive code from a single prompt, eliminating the separate image → overlay → code pipeline
- **Iterative refinement**: AI agents that can receive feedback ("move the nucleus label to the left") and modify the infographic in real time, operating as a collaborative design partner
- **Automated quality assurance**: AI models that can review other AI-generated content for factual accuracy, reading level compliance, and accessibility, reducing the human review burden
- **Personalized infographics**: AI that generates variations of the same infographic tailored to individual learners' knowledge gaps, as identified by the knowledge graph and learning path analytics
- **Voice-driven creation**: Educators describing infographics verbally and receiving interactive MicroSims in return, making the creation process as natural as conversation

The instructional designer's role evolves in this future — from hands-on builder to creative director and quality curator. The fundamental skills covered in this course (overlay patterns, MicroSim standards, learning science principles, quality rubrics) become even more important in an AI-assisted world, because they define what "good" looks like. An educator who understands cognitive load theory, Bloom's Taxonomy, and the MicroSim packaging standard can leverage AI tools far more effectively than one who does not.

#### Diagram: AI-Assisted Workflow Evolution Timeline

<iframe src="../../sims/ai-workflow-evolution/main.html" width="100%" height="500px" scrolling="no"></iframe>

<details markdown="1">
<summary>AI-Assisted Workflow Evolution Timeline</summary>
Type: timeline
**sim-id:** ai-workflow-evolution<br/>
**Library:** p5.js<br/>
**Status:** Specified

**Bloom Level:** Analyze (L4)
**Bloom Verb:** Examine
**Learning Objective:** Examine the evolution of AI-assisted infographic creation from early template-based tools through current LLM-powered generation to projected future capabilities, identifying how each advancement changes the educator's role.

**Instructional Rationale:** An interactive timeline is appropriate because the Analyze objective requires learners to trace a progression and identify how changes at each stage reshape the creation workflow. Hovering over each era reveals the specific tools, capabilities, and role shifts.

**Canvas Layout:**
- Main area (aliceblue): horizontal timeline with 5 era markers spanning 2015-2030
- Below (white, silver border): detail panel for the selected era

**Visual Elements:**
- A horizontal timeline with labeled eras:
  1. "Template Era" (2015-2019) — purple marker
  2. "Early AI Assistance" (2019-2022) — blue marker
  3. "LLM-Powered Generation" (2022-2025) — green marker
  4. "Multimodal AI Agents" (2025-2027) — orange marker (current era highlighted)
  5. "Autonomous AI Curriculum Design" (2027-2030+) — teal marker (projected)
- Each marker is a circle on the timeline with a short label above
- A vertical "We Are Here" indicator at the current date (2026)
- Clicking an era shows in the detail panel:
  - Tools available in that era
  - What the educator does vs. what the tool does
  - Time to create one interactive infographic
  - Example output quality
  - Key limitation of that era

**Interactive Controls:**
- Click any era marker to select it and view details
- Button: "Animate Timeline" — scrolls through eras left to right with 3-second pauses
- Toggle: "Show Role Comparison" — displays a "Human Effort vs. AI Effort" stacked bar for each era
- Hover over the timeline line between eras to see the transition event (e.g., "GPT-4 released, enabling reliable code generation")

**Behavior:**
- Clicking an era highlights it and scrolls the detail panel
- The "We Are Here" marker pulses gently to draw attention
- Role comparison bars show human effort decreasing and AI effort increasing across eras
- Responsive: timeline wraps vertically on narrow screens

**Default Parameters:**
- "LLM-Powered Generation" era selected by default (closest to "We Are Here")
- Show Role Comparison: off
- Canvas width: responsive
- Canvas height: 450px

Implementation: p5.js with horizontal timeline rendering and era detail interaction
</details>

## Summary

!!! mascot-celebration "Excellent Work!"
    <img src="../../img/mascot/celebration.png" class="mascot-admonition-img" alt="Percy celebrates">
    You now have the complete toolkit for AI-assisted infographic creation! From prompt engineering to base image generation, from overlay JSON drafting to code scaffolding, and from quality review to editorial control — you can leverage generative AI to create interactive MicroSims at a pace that was unimaginable just a few years ago. The key insight is that AI is your most productive collaborator when you bring strong design judgment and clear quality standards to the partnership. Let's spread some knowledge!

In this chapter, you learned that:

- **Prompt engineering** is the foundational skill for AI-assisted creation, using structured prompts with context, specification, constraints, and examples to guide AI models toward high-quality outputs
- **Text-to-image LLMs** generate base illustrations for overlayment infographics, and effective prompts request flat design, no embedded text, clear region boundaries, and consistent aspect ratios for optimal **base image generation**
- **AI overlay generation** produces overlay JSON configuration files from natural language descriptions, dramatically accelerating the most time-consuming step of infographic creation — though coordinates typically require calibration against the actual image
- **AI code generation** scaffolds complete MicroSim packages (HTML, JavaScript, CSS, metadata) from detailed specifications, following MicroSim packaging standards when explicitly included in the prompt
- The **AI-assisted workflow** for **concept to MicroSim** follows five stages: concept definition (human), base image generation (AI + review), overlay and code generation (AI + review), quality review (human), and deployment (automated)
- **AI quality review** and **editorial control** are essential human-in-the-loop processes that verify factual accuracy, pedagogical alignment, visual correctness, and standards compliance before AI-generated content reaches students
- **No-code tools** enable educators to create infographics entirely through natural language and visual editors, while **low-code tools** provide AI-generated starting points that educators customize with minimal code editing — both approaches lower the barrier to entry for interactive content creation

## References

- [Wikipedia: Generative Artificial Intelligence](https://en.wikipedia.org/wiki/Generative_artificial_intelligence)
- [Wikipedia: Text-to-Image Model](https://en.wikipedia.org/wiki/Text-to-image_model)
- [Wikipedia: Prompt Engineering](https://en.wikipedia.org/wiki/Prompt_engineering)
- [Wikipedia: Low-Code Development Platform](https://en.wikipedia.org/wiki/Low-code_development_platform)
- [Wikipedia: No-Code Development Platform](https://en.wikipedia.org/wiki/No-code_development_platform)
- [OpenAI DALL-E Documentation](https://platform.openai.com/docs/guides/images)
- [Anthropic Claude Documentation](https://docs.anthropic.com/)
- [MDN Web Docs: JavaScript Guide](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide)
- [p5.js Reference](https://p5js.org/reference/)
- [Wikipedia: Human-in-the-Loop](https://en.wikipedia.org/wiki/Human-in-the-loop)
