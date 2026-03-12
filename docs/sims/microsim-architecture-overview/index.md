---
title: MicroSim Architecture Overview
description: Interactive diagram showing the four-file MicroSim directory structure and how each file serves a distinct role in the packaging standard.
image: /sims/microsim-architecture-overview/microsim-architecture-overview.png
og:image: /sims/microsim-architecture-overview/microsim-architecture-overview.png
twitter:image: /sims/microsim-architecture-overview/microsim-architecture-overview.png
social:
   cards: false
---
# MicroSim Architecture Overview

<iframe src="main.html" height="592px" scrolling="no"></iframe>

[Run the MicroSim Architecture Overview Fullscreen](./main.html){ .md-button .md-button--primary }

## About This MicroSim

This interactive diagram illustrates the **four-file architecture** used by every MicroSim in an intelligent textbook. Each MicroSim directory contains exactly four files, each with a distinct role:

| File | Role | Color |
|------|------|-------|
| **main.html** | Interactive experience — HTML shell with library CDN and JavaScript import | Blue |
| **index.md** | Documentation — MkDocs page with iframe embed, lesson plan, and context | Green |
| **metadata.json** | Discoverability — Dublin Core metadata for search engines and catalogs | Orange |
| **data.json** | Configuration — Overlay regions, labels, and settings loaded at runtime | Purple |

## How to Interact

- **Hover** over any colored file block to see a detailed description of its contents and purpose
- **Click** a file block to highlight all arrows connected to that file
- **Click again** or click empty space to clear the selection

## Learning Objective

Explain the four-file MicroSim architecture and how each file serves a distinct role in the packaging standard.

## Lesson Plan

Use this diagram when introducing students to the MicroSim standard. Ask students to:

1. Identify which file is responsible for the visual experience
2. Trace the path from the textbook page to the rendered simulation
3. Explain why separating data (data.json) from code (main.html) is beneficial
4. Describe how metadata.json supports discoverability without affecting the user experience

## References

- [MicroSim Packaging Standard](https://dmccreary.github.io/intelligent-textbooks/)
- [p5.js Reference](https://p5js.org/reference/)
