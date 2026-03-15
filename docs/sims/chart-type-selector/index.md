---
title: Chart Type Selection Guide
description: Interactive decision tree that guides learners through questions about their data characteristics and visualization goals to recommend the best chart type.
image: /sims/chart-type-selector/chart-type-selector.png
og:image: /sims/chart-type-selector/chart-type-selector.png
twitter:image: /sims/chart-type-selector/chart-type-selector.png
social:
   cards: false
---

# Chart Type Selection Guide

<iframe src="main.html" height="500" width="100%" scrolling="no"></iframe>

[Run the Chart Type Selection Guide Fullscreen](./main.html){ .md-button .md-button--primary }

## About This MicroSim

This interactive decision tree helps learners differentiate between chart types by walking through a series of guided questions about their data and communication goals. Rather than memorizing a chart selection table, learners analyze their specific visualization needs step by step.

The decision tree starts with a high-level goal question ("What is your primary visualization goal?") and branches into progressively more specific follow-ups. Each path through the tree ends with a recommended chart type, displayed in the preview panel with a description, mini chart preview, and the path that led to the recommendation.

## How to Use

1. **Read** the highlighted question on the left panel
2. **Click** the answer that best describes your data or goal
3. **Follow** the branching path — your previous answers appear in green
4. **Review** the recommended chart type in the right panel with its description and preview
5. **Reset** to try a different path, or use **Try a Scenario** to see a pre-built example animate through the tree

## Decision Tree Structure

| Goal | Follow-up | Recommended Chart |
|------|-----------|-------------------|
| Compare values | 2-7 categories, no sub-groups | Bar Chart |
| Compare values | 2-7 categories, with sub-groups | Stacked Bar Chart |
| Compare values | 8+ categories | Horizontal Bar Chart |
| Show trends | 1-3 series, line only | Line Chart |
| Show trends | 1-3 series, emphasize volume | Area Chart |
| Show trends | 4+ series (overview) | Sparkline |
| Show proportions | 2-5 segments | Pie Chart |
| Show proportions | 6+ segments or center label | Donut Chart |
| Show proportions | Hierarchical | Treemap |
| Explore relationships | Correlation | Scatter Plot |
| Explore relationships | Flows between stages | Sankey Diagram |
| Explore relationships | Mutual connections | Chord Diagram |
| Show distribution | Frequency bins | Histogram |
| Show distribution | Term importance | Word Cloud |
| Show distribution | Single metric vs. target | Gauge Chart |

## Lesson Plan

### Grade Level

Undergraduate / Professional Development

### Duration

10-15 minutes

### Prerequisites

Familiarity with the concept of data types (categorical, numerical, hierarchical) and a basic understanding of why different data shapes call for different visual representations.

### Activities

1. **Free Exploration** (5 min): Students work through the decision tree 3-4 times with different starting goals, noting which chart types appear at the end of each path.
2. **Scenario Challenge** (5 min): Students use the "Try a Scenario" dropdown to watch the tree auto-fill, then discuss in pairs why the recommended chart is the best fit.
3. **Create Your Own** (5 min): Each student describes a dataset from their own field, walks through the decision tree, and writes a one-sentence justification for the recommended chart type.

### Assessment

Students can correctly navigate the decision tree for a novel dataset description and articulate the data characteristics (number of categories, continuous vs. categorical, part-to-whole vs. comparison) that led to the recommendation.

## References

1. [Chart.js Documentation](https://www.chartjs.org/docs/latest/)
2. [D3.js Gallery](https://d3-graph-gallery.com/)
3. [Chapter 8: JavaScript Visualization Libraries](../../chapters/08-javascript-visualization-libraries/index.md)
