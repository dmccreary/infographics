---
title: Canvas vs SVG
description: Interactive MicroSim comparing Canvas (raster) and SVG (vector) rendering models across four stages — drawing, scaling, interaction, and performance.
image: /sims/canvas-vs-svg/canvas-vs-svg.png
og:image: /sims/canvas-vs-svg/canvas-vs-svg.png
twitter:image: /sims/canvas-vs-svg/canvas-vs-svg.png
social:
   cards: false
---

# Canvas vs SVG

<iframe src="main.html" height="500" width="100%" scrolling="no"></iframe>

[Run the Canvas vs SVG MicroSim Fullscreen](./main.html){ .md-button .md-button--primary }

## About This MicroSim

This interactive simulation walks learners through four key differences between the HTML Canvas API and Scalable Vector Graphics (SVG). Each stage illustrates one dimension of the comparison — drawing model, scaling behavior, interaction capabilities, and rendering performance — using side-by-side visual panels.

Use the **Next** and **Previous** buttons below the canvas to step through the four stages. On Stage 3 (Interaction), hover your mouse over the shapes on the SVG side to see native event handling in action.

## Stages

| Stage | Title | What It Shows |
|-------|-------|---------------|
| 1 | Drawing | Canvas draws pixels with no object memory; SVG creates persistent DOM nodes for each shape |
| 2 | Scaling | Canvas produces blocky artifacts when zoomed; SVG re-renders crisply at any scale |
| 3 | Interaction | Canvas requires manual hit-testing; SVG shapes respond natively to hover and click events |
| 4 | Performance | Canvas handles thousands of shapes efficiently; SVG slows down because each shape is a DOM node |

## When to Use Each

| Factor | Choose Canvas | Choose SVG |
|--------|--------------|------------|
| Shape count | High (>1000 shapes, particles) | Low to moderate (<500 shapes) |
| Interactivity | Pixel-level effects, custom hit detection | Per-element events, CSS styling, accessibility |
| Scaling needs | Fixed resolution is acceptable | Must look crisp on retina and when zoomed |
| Animation style | Frame-based redrawing (games, simulations) | Declarative transitions (CSS or SMIL) |
| Accessibility | Requires extra ARIA work | DOM nodes are accessible by default |

## Lesson Plan

### Grade Level

Undergraduate / Professional Development

### Duration

15-20 minutes

### Prerequisites

Basic understanding of HTML elements and the difference between raster and vector images. Familiarity with the browser DOM is helpful but not required.

### Learning Objective

Compare the Canvas and SVG rendering models by observing how each handles drawing, scaling, and interaction.

### Activities

1. **Guided Walkthrough** (8 min): Instructor projects the MicroSim and steps through all four stages. At each stage, pause and ask students to predict what will happen before revealing the behavior.
2. **Hands-On Exploration** (5 min): Students open the MicroSim on their own devices. On Stage 3, they hover over shapes and observe the difference in interactivity. On Stage 4, they note the performance labels.
3. **Comparison Table** (5 min): Students fill in a blank comparison table (Canvas vs SVG) using what they learned from the four stages. Compare answers with a partner.

### Assessment

Students can correctly identify at least three differences between Canvas and SVG rendering and explain when each technology is the better choice for an interactive infographic project.

## References

1. [MDN — Canvas API](https://developer.mozilla.org/en-US/docs/Web/API/Canvas_API)
2. [MDN — SVG: Scalable Vector Graphics](https://developer.mozilla.org/en-US/docs/Web/SVG)
3. [Chapter 6: Web Fundamentals](../../chapters/06-web-fundamentals/index.md)
