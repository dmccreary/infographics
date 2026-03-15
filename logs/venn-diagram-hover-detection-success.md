# Venn Diagram Hover Detection Fix

**Date:** 2026-03-15
**Status:** Success
**User Satisfaction:** Very happy

## Task

Add hover highlight (3px stroke) to the MicroSim Uniqueness Venn diagram
(`docs/sims/microsim-uniqueness/microsim-uniqueness.js`) so that ellipse
borders thicken when their region is hovered.

## Problem Found

After the initial implementation, hover detection was inconsistent depending
on the direction the mouse entered a circle. Two bugs were identified:

1. **Missing translate offset:** The ellipses are drawn inside a
   `translate(0, 30)` block, shifting them 30px down. The hit detection
   compared raw `mouseY` against un-shifted circle centers, causing a
   30px vertical misalignment.

2. **Circular detection on elliptical shapes:** The ellipses are drawn
   as `ellipse(x, y, radius * 2.5, radius * 2)` (wider than tall), but
   hit detection used `dist()` against a circle of `radius`. This made
   horizontal detection too narrow — the mouse could be visually inside
   the ellipse but outside the detection boundary.

## Fix Applied

Replaced the circular `dist() < radius` check with the standard
elliptical containment equation:

```javascript
let adjustedMouseY = mouseY - 30;
let semiX = radius * 1.25;
let semiY = radius;
let insideCircles = circles.map(c => {
  let dx = (mouseX - c.x) / semiX;
  let dy = (adjustedMouseY - c.y) / semiY;
  return (dx * dx + dy * dy) <= 1;
});
```

Also added a `highlightedCircles` lookup map that maps each hover region
name to the indices of circles that should receive the 3px stroke.

## Files Modified

- `docs/sims/microsim-uniqueness/microsim-uniqueness.js`

## Result

Hover detection now matches the drawn ellipse boundaries exactly,
regardless of mouse entry direction. The user confirmed the fix
works perfectly.
