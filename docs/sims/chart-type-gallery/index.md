---
title: Chart Type Gallery
description: Interactive gallery of 14 chart types with click-to-reveal details and quiz mode, helping learners identify which chart type best communicates different data characteristics.
image: /sims/chart-type-gallery/chart-type-gallery.png
og:image: /sims/chart-type-gallery/chart-type-gallery.png
twitter:image: /sims/chart-type-gallery/chart-type-gallery.png
social:
   cards: false
---

# Chart Type Gallery

<iframe src="main.html" height="850" width="100%" scrolling="no"></iframe>

[Run the Chart Type Gallery Fullscreen](./main.html){ .md-button .md-button--primary }

## About This MicroSim

This interactive gallery displays 14 chart types commonly used in data visualization, organized in a responsive grid layout. Each thumbnail renders a miniature example of the chart using either Chart.js (for standard chart types) or canvas-drawn approximations (for D3.js and other specialized types).

Click any chart thumbnail to see detailed information in the panel below, including what the chart is best for, the expected data shape, a concrete educational use case, and a practical tip about when not to use it.

## How to Use

1. **Browse** the gallery grid — each thumbnail shows a recognizable example of that chart type
2. **Click** any thumbnail to select it and view details in the info panel below
3. **Filter** by library using the buttons at the top: All, Chart.js, D3.js, or Other
4. **Quiz Mode** — click "Quiz Mode" to hide chart names, then click a thumbnail and type what chart type you think it is. The quiz tracks your score as you go.

## Chart Types Covered

| Row | Charts |
|-----|--------|
| 1 | Bar Chart, Stacked Bar Chart, Line Chart, Area Chart |
| 2 | Pie Chart, Donut Chart, Scatter Plot, Histogram |
| 3 | Treemap, Sankey Diagram, Chord Diagram, Word Cloud |
| 4 | Gauge Chart, Sparkline |

## Lesson Plan

### Grade Level

Undergraduate / Professional Development

### Duration

10-15 minutes

### Prerequisites

Basic familiarity with data types (categorical vs. numerical) and an understanding of why data visualization matters in education and communication.

### Activities

1. **Gallery Exploration** (5 min): Students browse all 14 chart types, clicking each to read the "Best for" and "Data shape" descriptions. They note which chart types they have never used before.
2. **Quiz Challenge** (5 min): Students activate Quiz Mode and try to identify as many chart types as possible from the thumbnails alone. Goal: 10 or more correct out of 14.
3. **Matching Exercise** (5 min): Working in pairs, students receive a list of five datasets and must agree on which chart type best fits each one, using the gallery as a reference.

### Assessment

Students can correctly identify at least 10 of 14 chart types by visual appearance and can articulate the data characteristics (categorical, continuous, hierarchical, relational) that make each chart type appropriate.

## References

1. [Chart.js Documentation](https://www.chartjs.org/docs/latest/)
2. [D3.js Gallery](https://d3-graph-gallery.com/)
3. [Chapter 8: JavaScript Visualization Libraries](../../chapters/08-javascript-visualization-libraries/index.md)
