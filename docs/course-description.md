# Course Description for Interactive Infographics for Intelligent Textbooks


## Course Title

Interactive Infographics for Intelligent Textbooks

## Overview

This course teaches instructional designers and educational professionals
how to create interactive infographic diagrams for use in intelligent
textbooks. Students learn to design, build, and deploy width-responsive
interactive infographics that conform to MicroSim standards, enabling
consistent integration into web-based educational content. The course
covers a wide range of infographic types used throughout the education
industry, from simple labeled diagrams with hover-activated infoboxes
to complex polygon overlays, callout systems, causal loop diagrams,
and data-driven visualizations. Students explore how generative AI
tools can accelerate the creation of both underlying images and the
interactive overlay code, making professional-quality infographics
accessible to educators without deep programming expertise. The course
emphasizes practical skills in JavaScript-based visualization libraries
(p5.js, D3.js, Chart.js, vis-network), JSON-driven overlay patterns,
Dublin Core metadata standards, xAPI event logging, and the MicroSim
packaging conventions required for deployment within MkDocs Material
intelligent textbook sites.

## Target Audience

Instructional designers and other interested educational professionals,
including:

- Curriculum developers creating digital learning materials
- Educational technologists building intelligent textbook platforms
- Teachers and faculty interested in enhancing course content with interactive visuals
- Learning experience designers working with web-based educational content
- Publishing professionals developing next-generation digital textbooks

## Prerequisites

- Familiarity with basic HTML and CSS concepts
- Comfort working with a text editor and file system navigation
- Basic understanding of educational design principles
- No advanced programming experience required (the course introduces JavaScript concepts as needed)

## Reading Level

College level

## Topics Covered

### 1. Foundations of Interactive Infographics
- Definitions and distinctions: static infographics, animated infographics, and interactive infographics
- The role of interactive infographics in intelligent textbooks
- MicroSim architecture and how infographics fit as a subtype
- Width-responsive iframe design for embedding in textbook content areas (600px to 1,400px)

### 2. Taxonomy of Infographic Types
- Classification by primary purpose: educational, analytical, persuasive, and promotional
- Classification by structural format: linear, hierarchical, comparative, and circular/radial
- Classification by visual complexity: minimalist, detailed, and interactive
- Classification by medium: static, animated, and interactive digital
- Classification by audience targeting: general public, professional/technical, and stakeholder-specific

### 3. Presentation Slide Art Infographics
- List diagrams: block lists, bullet lists, picture lists, grid lists
- Process diagrams: process arrows, chevron processes, timelines, gear processes
- Cycle diagrams: basic cycles, radial cycles, gear cycles, nested cycles
- Hierarchy diagrams: organization charts, table hierarchies, labeled hierarchies
- Relationship diagrams: Venn diagrams, target diagrams, radial diagrams, matrix diagrams
- Pyramid and funnel diagrams
- Matrix and grid diagrams
- Picture-based diagram types

### 4. Visual Problem-Solving Frameworks
- Dan Roam's "Back of the Napkin" six visual frameworks: portrait, chart, map, timeline, flowchart, and multiple-variable plot
- The 6 W's framework for matching question types to visual types
- The SQVID framework for selecting drawing styles (simple vs. elaborate, qualitative vs. quantitative, vision vs. execution, individual vs. comparison, delta vs. status quo)

### 5. Causal Loop Diagrams
- Fundamentals of systems thinking and circular causality
- Variables, causal links, and polarity indicators
- Reinforcing (R) loops and balancing (B) loops
- Business and educational applications of causal loop diagrams
- Best practices for creating effective CLDs

### 6. Overlayment Interactive Infographic Patterns
- Type 1: Simple non-overlapping rectangular regions with hover and click events
- Type 2: Complex polygon regions with multi-edge overlays
- Type 3: Callout points with edge-aligned labels and numbered indicators
- Type 4: Callout points with floating labels and draggable positioning
- The overlay.json file format for defining interactive regions
- The overlay-diagram.js shared library for event handling

### 7. JavaScript Visualization Libraries for Infographics
- p5.js for custom drawing and interactive canvas-based infographics
- D3.js for data-driven document manipulation
- Chart.js for standard chart types
- vis-network for network and graph visualizations
- Leaflet for geographic and map-based infographics
- Selecting the appropriate library for each infographic type

### 8. MicroSim Standards and Packaging
- MicroSim directory structure and file conventions
- The main.html file as the core simulation entry point
- Dublin Core metadata schema and the metadata.json file
- YAML frontmatter for index.md (title, description, quality_score, social preview images)
- Iframe embedding standards (display iframe and copy-paste iframe)
- Fullscreen link buttons and p5.js editor links
- The MicroSim quality scoring rubric (100-point scale)
- Width-responsive design: aliceblue drawing region above white control region with silver borders

### 9. Using Generative AI for Infographic Creation
- Using text-to-image LLMs to generate base illustrations
- Using LLMs to generate overlay JSON configuration files
- Using LLMs to generate JavaScript interaction code
- AI-assisted workflows: from concept description to deployable interactive infographic
- Quality review and editorial control of AI-generated content

### 10. Student Interaction Tracking and Analytics
- xAPI (Experience API) fundamentals for educational content
- Event logging for hover, click, and selection interactions
- Iframe-to-parent communication using postMessage for height reporting
- Monitoring student engagement through interaction data

### 11. Documentation and Deployment
- Writing effective index.md documentation with description, lesson plan, and references sections
- Social media preview configuration (Open Graph images)
- MkDocs Material theme deployment with GitHub Pages
- Quality assurance using the MicroSim standardization checklist

## Topics Not Covered

This course does not cover the following topics:

- **Advanced JavaScript programming** — The course introduces JavaScript concepts relevant to infographics but does not serve as a comprehensive JavaScript curriculum
- **Graphic design theory** — While the course addresses layout and consistency, it does not cover typography, color theory, or visual design principles in depth
- **Learning Management System (LMS) administration** — xAPI integration is discussed conceptually, but configuring specific LMS platforms (Moodle, Canvas, Blackboard) is out of scope
- **Native mobile application development** — All infographics target web browsers; native iOS or Android development is not addressed
- **3D visualization and virtual/augmented reality** — The course focuses on 2D web-based infographics only
- **Video production and motion graphics** — Animated GIF and video-based infographics are discussed in the taxonomy but not produced in the course
- **Statistical analysis and data science** — While data visualization is covered, the underlying statistical methods for analyzing data are not taught
- **Accessibility and Section 508 compliance** — While responsive design is covered, comprehensive accessibility auditing (WCAG, ARIA, screen reader testing) is not a primary focus
- **Backend server development** — The course focuses on client-side HTML/JavaScript; server-side technologies (databases, APIs, authentication) are not covered
- **Commercial infographic tools** — Paid tools such as Adobe Illustrator, Canva Pro, Tableau, and Infogram premium features are mentioned but not taught in detail
- **Print-ready infographic production** — The focus is exclusively on interactive digital infographics for web delivery
- Server based infographic tools such as H5P Platform, Xerte Toolkit, Charticulator

## Learning Objectives (Bloom's Taxonomy — Revised 2001)

### Level 1: Remember

1. **List** the four types of overlayment interactive infographic patterns (rectangular, polygon, callout-to-edge, callout-to-floating)
2. **Identify** the six visual frameworks from Dan Roam's "Back of the Napkin" (portrait, chart, map, timeline, flowchart, multiple-variable plot)
3. **Recall** the required Dublin Core metadata fields for a MicroSim metadata.json file
4. **Name** the major categories of SmartArt-style infographics (list, process, cycle, hierarchy, relationship, matrix, pyramid, picture)
5. **Define** key terms including interactive infographic, infobox, MicroSim, overlayment pattern, and causal loop diagram

### Level 2: Understand

6. **Explain** how width-responsive iframe design enables infographic reuse across different textbook layouts
7. **Describe** the difference between reinforcing loops and balancing loops in causal loop diagrams
8. **Summarize** the MicroSim packaging conventions including the aliceblue drawing region and white control region
9. **Classify** a given infographic by its primary purpose, structural format, and visual complexity using the infographic taxonomy
10. **Distinguish** between the four overlayment interactive infographic types and identify when each is appropriate

### Level 3: Apply

11. **Construct** an overlay.json file that defines non-overlapping rectangular interactive regions for a given image
12. **Use** p5.js to draw a labeled interactive infographic with hover-activated infoboxes
13. **Implement** iframe-to-parent postMessage communication for automatic height calculation
14. **Apply** the MicroSim standardization checklist to audit an existing infographic and calculate its quality score
15. **Create** a complete MicroSim directory with main.html, index.md (with YAML frontmatter), and metadata.json files

### Level 4: Analyze

16. **Compare** the four overlayment pattern types to determine which best fits a given infographic layout requirement
17. **Analyze** a causal loop diagram to identify all reinforcing and balancing feedback loops and their leverage points
18. **Differentiate** between infographic types that require simple rectangular overlays versus those requiring complex polygon regions
19. **Examine** the SQVID framework dimensions to determine the most effective visual style for a given instructional objective
20. **Assess** whether a given JavaScript visualization library (p5.js, D3.js, Chart.js, vis-network) is the best match for a specific infographic requirement

### Level 5: Evaluate

21. **Critique** an existing interactive infographic against the MicroSim quality scoring rubric and recommend specific improvements
22. **Judge** the effectiveness of an interactive infographic for achieving a stated learning objective, considering interactivity, clarity, and student engagement
23. **Evaluate** the tradeoffs between using generative AI to produce infographic code versus hand-coding with JavaScript libraries
24. **Appraise** the suitability of different overlay patterns (rectangular, polygon, callout) for a given educational diagram
25. **Assess** the completeness and accuracy of Dublin Core metadata for a set of MicroSim infographics

### Level 6: Create

26. **Design** a complete interactive infographic with polygon-based overlay regions, infoboxes, and xAPI event logging
27. **Develop** a reusable overlay.json schema and JavaScript driver that can be applied to multiple infographic images
28. **Compose** a lesson plan that integrates three or more interactive infographic types to teach a complex topic
29. **Generate** an interactive infographic using a generative AI workflow: from text prompt to base image to overlay configuration to deployable MicroSim
30. **Produce** a portfolio of five or more standardized interactive infographics that pass the MicroSim quality audit with scores of 85 or above
