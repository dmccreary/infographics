---
title: Visual Encoding Channel Explorer
description: Compare the effectiveness of different visual encoding channels (position, length, color, size, shape, angle) by viewing the same dataset rendered through each channel.
quality_score: 0
image: /sims/visual-encoding-explorer/visual-encoding-explorer.png
social:
   cards: false
---
# Visual Encoding Channel Explorer

<iframe src="main.html" height="620" scrolling="no"></iframe>

[Run the Visual Encoding Explorer Fullscreen](./main.html){ .md-button .md-button--primary }

## Sample iframe reference

```html
<iframe
   src="https://dmccreary.github.io/infographics/sims/visual-encoding-explorer/main.html"
   width="100%" height="620" scrolling="no">
</iframe>
```

## About This MicroSim

This interactive explorer demonstrates how the **same dataset** looks when rendered through six different visual encoding channels. Research in perceptual psychology has established a clear ranking of how accurately humans can decode quantitative information from different visual properties.

### The Six Encoding Channels

1. **Position** — Placing items at different heights along a common scale. This is the most accurate encoding channel; humans can judge relative position with high precision.
2. **Length** — Using bar length to represent values. Nearly as accurate as position, and the basis for bar charts.
3. **Color Saturation** — Varying the intensity of a single hue. Effective for showing relative magnitude but poor for precise comparison.
4. **Size** — Scaling circle area to represent values. Humans tend to underestimate differences in area, making this less accurate.
5. **Angle** — Using pie/donut chart slices. Angle judgment is notoriously imprecise, which is why pie charts are often criticized.
6. **Shape + Hue** — Using different shapes and colors for categorical data. Effective for categories but cannot represent quantitative differences.

### Why This Matters for Infographic Design

Choosing the right encoding channel is one of the most impactful decisions an infographic designer makes. A dataset encoded with position (scatter plot, dot plot) will communicate patterns far more effectively than the same data shown as a pie chart or through color intensity alone. This MicroSim builds that intuition through direct, side-by-side comparison.

## Lesson Plan

### Learning Objective

Compare the effectiveness of different visual encoding channels by viewing the same dataset rendered through each channel, identifying which encodings make patterns easiest to detect.

### Activities

1. With **Show Values** on, examine all 6 panels. Which encoding makes it easiest to rank the items from smallest to largest?
2. Turn **Show Values** off. Try to identify the largest and smallest values in each panel. Which encodings make this easy? Which make it hard?
3. Switch to the **Nearly Equal Values** dataset. Which encodings can still show the differences? Which ones fail?
4. Switch to **Wide Range**. Do any encodings that worked poorly for nearly equal values work better here?
5. Click **Randomize Data** several times. Does your ranking of encoding effectiveness stay consistent?

## References

- [Visual Encoding - Wikipedia](https://en.wikipedia.org/wiki/Visual_encoding) — Overview of how visual properties encode data in visualizations.
- [Cleveland & McGill (1984)](https://www.jstor.org/stable/2288400) — The foundational study ranking visual encoding channels by perceptual accuracy.
