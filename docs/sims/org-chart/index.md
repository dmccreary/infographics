---
title: Organization Chart Visualization
description: Interactive hierarchical organization chart demonstrating graph visualization with adjustable employee count and compact title-only view mode.
image: org-chart.png
og:image: org-chart.png
quality_score: 100
---

# Organization Chart Visualization

<iframe src="main.html" width="100%" height="500px" scrolling="no"></iframe>
[Run MicroSim in Fullscreen (Recommended)](main.html){ .md-button .md-button--primary }

## How to Embed This MicroSim

Copy this iframe to your website:

```html
<iframe src="https://dmccreary.github.io/intro-to-graph/sims/org-chart/main.html" width="100%" height="600px"></iframe>
```


## Description

This interactive MicroSim demonstrates hierarchical graph visualization using the vis-network.js library. It displays an organizational structure for a 1,000-employee company, showing key positions from the CEO down to individual contributors.

**Key Features:**

- **Adjustable Employee Count**: Use the slider to display between 5 and 50 employees, allowing you to focus on specific organizational levels or view the complete hierarchy.
- **Title-Only View**: Toggle between compact title-only labels and full name+title labels. The title-only view (enabled by default) is ideal for small iframes and presentations where space is limited.
- **Color-Coded Hierarchy**: Five distinct colors represent different organizational levels:
    - Red: CEO
    - Blue: C-Suite/Department Heads
    - Purple: Directors/Managers
    - Teal: Team Leads
    - Gray: Individual Contributors
- **Interactive Navigation**: Drag nodes, pan the view, and zoom to explore the organizational structure in detail.

**How to Use:**

1. Adjust the "Number of Employees" slider to show more or fewer positions
2. Check/uncheck "Show titles only" to toggle between compact and detailed views
3. Click and drag to pan around the chart
4. Use mouse wheel to zoom in and out
5. Hover over nodes to highlight reporting relationships

This visualization demonstrates how graphs can model hierarchical relationships in organizations, making it easier to understand reporting structures, span of control, and organizational depth.

## Lesson Plan

**Target Audience**: Undergraduate and graduate students learning about graph databases and data modeling

**Learning Objectives:**

By the end of this lesson, students will be able to:

1. Understand how hierarchical relationships can be represented as directed acyclic graphs (DAGs)
2. Identify the key components of an organizational graph model (nodes as employees, edges as reporting relationships)
3. Analyze organizational structures using graph properties such as depth, branching factor, and span of control
4. Apply graph visualization techniques to represent hierarchical data effectively
5. Compare and contrast different ways of displaying hierarchical information (tree layouts, compact vs. detailed labels)

**Prerequisites:**

- Basic understanding of graphs (nodes, edges, directed graphs)
- Familiarity with organizational hierarchies
- Introduction to data visualization concepts

**Duration**: 50 minutes

**Activities:**

1. **Introduction (10 minutes)**
    - Discuss organizational structures and why they matter
    - Introduce the concept of representing organizations as graphs
    - Show the MicroSim and explain the color-coding scheme

2. **Exploration Activity (15 minutes)**
    - Students explore the MicroSim with different employee counts (5, 15, 25, 50)
    - Record observations about organizational depth and breadth
    - Compare title-only vs. full-label views for different use cases

3. **Analysis Exercise (15 minutes)**
    - Calculate the span of control for different managers
    - Identify the organizational depth (number of levels)
    - Discuss advantages/disadvantages of different organizational structures
    - Question: "What happens to communication pathways as the organization grows?"

4. **Application Activity (10 minutes)**
    - Small groups design an organizational structure for a hypothetical company
    - Consider: How many levels? What span of control? Which roles are essential?
    - Share designs and discuss trade-offs

**Assessment:**

- **Formative**: Monitor student discussions during exploration and analysis
- **Summative**: Short quiz on graph terminology and organizational structure concepts
- **Extended**: Assignment to create their own organization chart using the data.json format

**Extensions:**

- Explore how graph algorithms (shortest path, centrality) apply to organizational analysis
- Discuss matrix vs. hierarchical organizational structures
- Investigate how real companies structure their organizations (flat vs. tall hierarchies)

## Graph Concepts Demonstrated

This MicroSim illustrates several important graph database concepts:

1. **Directed Acyclic Graph (DAG)**: The organization chart is a DAG where edges represent "reports to" relationships flowing from employees to managers, with no cycles.

2. **Tree Structure**: As a special case of a DAG, this hierarchy is a tree with a single root node (CEO) and unique paths from root to each node.

3. **Hierarchical Layout**: The vis-network library automatically arranges nodes by level, demonstrating graph layout algorithms.

4. **Node Properties**: Each node has properties (id, label, level, color) representing employee attributes.

5. **Edge Semantics**: Edges have clear semantics—they represent formal reporting relationships.

6. **Graph Traversal**: Following edges from any node toward the root traces the chain of command.

7. **Subgraph Filtering**: The slider demonstrates filtering a graph to show only a connected subgraph (first N nodes that maintain valid relationships).

## Technical Implementation

**Architecture:**

- `data.json`: Contains 50 employee nodes with names, titles, hierarchy levels, and reporting relationships (edges)
- `main.html`: HTML structure with controls (slider, checkbox), legend, and network container
- `style.css`: Styling for header, controls, legend, and network visualization area
- `script.js`: JavaScript logic for data loading, filtering, label formatting, and vis-network configuration

**Libraries Used:**

- **vis-network.js** (v9.x): JavaScript graph visualization library with excellent support for hierarchical layouts

**Code Structure:**

The script follows a clean separation of concerns:
- Data loading and storage (async fetch from JSON)
- Data filtering and transformation (based on slider and checkbox)
- Network rendering and configuration (vis-network options)
- Event handling for interactive controls

## References

1. [vis-network Documentation](https://visjs.github.io/vis-network/docs/network/) - Official documentation for the vis-network library used in this MicroSim
2. [Hierarchical Graph Drawing](https://en.wikipedia.org/wiki/Layered_graph_drawing) - Wikipedia article on algorithms for drawing hierarchical graphs
3. [Organizational Structure Concepts](https://courses.lumenlearning.com/wm-principlesofmanagement/chapter/types-of-organizational-structures/) - 2023 - Lumen Learning - Overview of different organizational structure types
4. [Span of Control in Management](https://www.investopedia.com/terms/s/span-of-control.asp) - 2024 - Investopedia - Explanation of span of control concept in organizational design
5. [Graph Databases and Organizational Modeling](https://neo4j.com/use-cases/organizational-management/) - Neo4j Use Cases - How graph databases model organizational structures in enterprise systems
