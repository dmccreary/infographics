---
title: Coordinate System Explorer
description: Use pixel and relative coordinate systems to place elements on a canvas, converting between both systems in real time.
quality_score: 0
image: /sims/coordinate-explorer/coordinate-explorer.png
social:
   cards: false
---
# Coordinate System Explorer

<iframe src="main.html" height="480" scrolling="no"></iframe>

[Run the Coordinate Explorer Fullscreen](./main.html){ .md-button .md-button--primary }

## Sample iframe reference

```html
<iframe
   src="https://dmccreary.github.io/infographics/sims/coordinate-explorer/main.html"
   width="100%" height="480" scrolling="no">
</iframe>
```

## About This MicroSim

Understanding coordinate systems is essential for placing elements precisely in interactive infographics. This explorer shows both pixel coordinates and relative (0.0-1.0) coordinates simultaneously as you move your mouse across the canvas. Toggle between grid types, snap to grid intersections, and place numbered markers to build fluency with both coordinate systems.

## Lesson Plan

### Learning Objective

Use pixel and relative coordinate systems to place elements on a canvas, and convert between the two systems by observing how mouse position maps to both coordinate types simultaneously.

### Activities

1. Move your mouse across the canvas and observe the coordinate readout updating in real time.
2. Switch between pixel grid and relative grid — notice how the grid labels change.
3. Enable "Snap to Grid" and try placing markers at specific grid intersections.
4. Resize the browser window and observe: pixel coordinates of the default shapes change, but their relative coordinates stay the same.

## References

- [Canvas Coordinate System - MDN](https://developer.mozilla.org/en-US/docs/Web/API/Canvas_API/Tutorial/Drawing_shapes) — How the HTML Canvas coordinate system works.
