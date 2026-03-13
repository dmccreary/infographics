---
title: Event handling data flow
description: Interactive Mermaid diagram that explains how events are detected, mapped to interactive regions, and used to refresh the display in a MicroSim.
quality_score: 0
---
# Event handling data flow

<iframe src="main.html" height="520px" width="100%" scrolling="no"></iframe>

[View Event handling data flow fullscreen](./main.html){ .md-button .md-button--primary }

## Overview

This MicroSim pairs a compact top-down Mermaid flowchart with an infobox that
explains the three-step event pipeline powering every interactive infographic:
**detect the event, identify the responsible region, and update the display**.
Hovering reveals quick tooltips and clicking a step locks a detailed narrative in
the infobox so students can explain the interaction lifecycle.

## Workflow steps

1. **Event detected** – The browser normalizes user gestures into events and the
   MicroSim queues them for deterministic handling.
2. **Region identified** – Hit-testing checks registered regions, resolves
   overlapping layers, and hands control to the correct component.
3. **Display updated** – The owning region mutates its state, redraws visuals,
   and synchronizes instructions so learners see instant feedback.

## How to use

1. Hover over a step to read the summary tooltip and remember the color coding
   (blue = events, orange = processing, green = output).
2. Click a step to load the full explanation with concrete examples in the
   infobox on the right.
3. Click outside the nodes to reset the infobox and walk through the flow again
   with another type of user action in mind.

## Learning objective

Explain the three-step event handling pattern (detect event, identify region,
and update display) that drives all interactive infographics.

## References

- [MDN: Introduction to events](https://developer.mozilla.org/en-US/docs/Learn/JavaScript/Building_blocks/Events)
- [Mermaid.js flowcharts](https://mermaid.js.org/syntax/flowchart.html)
