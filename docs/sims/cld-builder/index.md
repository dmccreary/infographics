---
title: Interactive CLD Builder
description: Construct a causal loop diagram by placing variables, drawing causal links with polarity indicators, and identifying the resulting loop types.
quality_score: 0
image: /sims/cld-builder/cld-builder.png
social:
   cards: false
---
# Interactive CLD Builder

<iframe src="main.html" height="640" scrolling="no"></iframe>

[Run the CLD Builder Fullscreen](./main.html){ .md-button .md-button--primary }

## Sample iframe reference

```html
<iframe
   src="https://dmccreary.github.io/infographics/sims/cld-builder/main.html"
   width="100%" height="640" scrolling="no">
</iframe>
```

## About This MicroSim

This builder tool lets learners construct causal loop diagrams from scratch. Variables are placed by clicking on the canvas, causal links are drawn between variables with positive (+) or negative (−) polarity, and the Identify Loops function analyzes the diagram to classify each closed loop as Reinforcing (R) or Balancing (B).

### How It Works

1. **Add Variable** mode: click the canvas to place a variable node
2. **Add Link** mode: click a source variable, then a target variable to draw a causal arrow
3. **Select/Move** mode: drag variables to reposition, double-click to rename or delete
4. **Identify Loops**: analyzes all paths and classifies each closed loop

A loop with an even number of negative links (including zero) is **Reinforcing** — it amplifies change. A loop with an odd number of negative links is **Balancing** — it resists change.

## Lesson Plan

### Learning Objective

Construct a causal loop diagram by placing variables, drawing causal links with polarity indicators, and identifying the resulting loop types.

### Activities

1. Click **Load Example** to see a pre-built 4-variable reinforcing loop. Click **Identify Loops** to classify it.
2. Click **Clear All** and build your own CLD about a topic you know (e.g., exercise → fitness → health).
3. Try creating a balancing loop by using at least one negative (−) link.
4. Build a diagram with both reinforcing and balancing loops and use Identify Loops to verify.

## References

- [Causal Loop Diagram - Wikipedia](https://en.wikipedia.org/wiki/Causal_loop_diagram) — Notation, examples, and applications of CLDs in systems thinking.
- [The Fifth Discipline by Peter Senge](https://en.wikipedia.org/wiki/The_Fifth_Discipline) — The foundational text on systems thinking and feedback loops in organizations.
