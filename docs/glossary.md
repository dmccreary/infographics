# Glossary of Terms

#### A/B Testing
An experimental method that randomly presents users with one of two MicroSim design variants and compares engagement and learning outcome metrics to determine which version is more effective.

#### Admonition Block
A styled callout box in MkDocs Material created with the `!!!` syntax, used for notes, warnings, tips, and mascot appearances to highlight important content within chapters.

**Example:** `!!! warning "Common Mistake"` followed by indented content creates a yellow-bordered warning box.

#### AI Code Generation
The use of large language models to produce JavaScript, HTML, and CSS code for MicroSims based on natural language descriptions of the desired interactive infographic.

#### AI Overlay Generation
The use of AI code generation tools to automatically produce overlay JSON configuration files and rendering code from a base image and a set of region descriptions.

#### AI Quality Review
The process of evaluating AI-generated content against quality standards, checking for accuracy, visual consistency, accessibility compliance, and alignment with learning objectives.

#### AI-Assisted Workflow
A content creation process that combines AI-generated drafts with human review and refinement, leveraging AI for speed while maintaining editorial quality and pedagogical accuracy.

#### Aliceblue Drawing Region
The light blue (`#F0F8FF`) background color applied to the main drawing area of every MicroSim, providing visual consistency and distinguishing the interactive canvas from the control region.

#### Alignment Principle
A design principle stating that visual elements should be arranged along common axes or edges, creating a sense of order and visual connection across the composition.

#### Alt Text
Alternative text descriptions attached to images and visual elements for screen reader accessibility, providing textual equivalents of visual content for users who cannot see the graphics.

**Example:** `alt="Bar chart comparing renewable energy adoption rates across five countries from 2015 to 2023"`

#### Analytical Infographic
An infographic designed to present data analysis results, reveal patterns, and support evidence-based interpretation through charts, graphs, and statistical visualizations.

#### Analyze Level
The fourth level of Bloom's Taxonomy involving breaking down complex information to examine relationships, such as identifying feedback loops in a causal loop diagram.

#### Animated Infographic
An infographic that uses motion and transitions to reveal information sequentially or draw attention to specific elements, without requiring direct user interaction.

**Example:** A bar chart that grows its bars upward over two seconds when the page loads, emphasizing the relative magnitudes of each category.

#### Animation Loop
A recurring function call (typically via `requestAnimationFrame` or p5.js `draw()`) that updates and redraws visual elements at a target frame rate to create smooth motion.

#### Annotated Screenshot
A screenshot of a user interface or application with added labels, arrows, highlights, and callouts that point out specific features or guide the viewer through a workflow.

#### Apply Level
The third level of Bloom's Taxonomy involving using learned concepts in new situations, such as building a MicroSim using p5.js to demonstrate a process diagram.

#### Area Chart
A chart type similar to a line chart but with the space between the line and the x-axis filled with color, emphasizing the magnitude of values over time or categories.

#### ARIA Attribute
Accessible Rich Internet Applications attributes added to HTML elements to convey role, state, and property information to assistive technologies like screen readers.

**Example:** `<div role="img" aria-label="Interactive overlay diagram of the human heart">` on a canvas-based MicroSim container.

#### Array Methods
Built-in JavaScript functions on arrays (`map`, `filter`, `reduce`, `forEach`, `find`) that provide functional programming patterns for transforming and querying data in MicroSims.

#### Arrow Function
A concise JavaScript function syntax using `=>` that inherits the surrounding `this` context, commonly used for inline event handlers and array method callbacks in MicroSim code.

#### Aspect Ratio
The proportional relationship between width and height of an image, canvas, or display area, maintained during scaling to prevent visual distortion.

#### Audience Targeting
The practice of designing infographic content, complexity, and visual style to match the knowledge level, interests, and needs of a specific viewer group.

#### Balancing Loop
A feedback loop in a causal loop diagram where the net effect of all causal links counteracts change, driving the system toward equilibrium or a target — marked with a "B" identifier.

**Example:** A thermostat system where rising temperature triggers cooling, which reduces temperature, which stops cooling — a classic balancing loop.

#### Bar Chart
A chart type that uses horizontal or vertical rectangular bars to compare quantities across discrete categories, with bar length proportional to the value represented.

#### Base Image Generation
The process of using AI image generation tools to create the foundational diagram, illustration, or photograph that serves as the background for an overlay infographic.

**Example:** Prompting an AI to generate a labeled cross-section of a volcano, then using the output as the base image for an interactive overlay MicroSim.

#### Basic Cycle
A cycle diagram with a simple circular arrangement of stages connected by arrows, showing the most straightforward representation of a repeating process.

#### Before-After Diagram
A comparative visualization that places two states side by side or uses a slider to reveal changes between an initial condition and a result, emphasizing transformation or impact.

#### Bezier Curve
A parametric curve defined by control points that creates smooth, flowing shapes, used in infographic design for elegant connectors, custom paths, and organic region boundaries.

#### Block List
A list diagram variant that presents each item in a distinct rectangular block, creating clear visual separation between entries and supporting hierarchical grouping.

#### Bloom's Taxonomy
A hierarchical classification of cognitive learning objectives organized into six levels from lower-order to higher-order thinking: Remember, Understand, Apply, Analyze, Evaluate, and Create.

#### Bounding Box
The smallest axis-aligned rectangle that completely encloses a visual element or region, used for simplified hit detection and layout calculations.

#### Branch Strategy
The team's approach to using Git branches for organizing work, such as using feature branches for new MicroSims and chapter content before merging to the main branch.

#### Breadcrumb Navigation
A secondary navigation element showing the user's current location within a hierarchical drill-down path, enabling quick navigation back to any previous level.

#### Breakpoint
A specific viewport width at which a responsive design changes its layout, adjusting element sizes, positions, or visibility to optimize the display for that screen size.

**Example:** A MicroSim might switch from a side-by-side layout to a stacked layout at a breakpoint of 768 pixels.

#### Browser Developer Tools
The built-in debugging and inspection tools in web browsers (accessed via F12) that allow developers to examine HTML, CSS, JavaScript, network requests, and console output for MicroSims.

#### Bullet List
A list diagram variant using bullet points with optional icons or graphics alongside each item, providing a familiar and scannable format for sequential or categorical information.

#### Callback Function
A function passed as an argument to another function, to be executed later when a specific event occurs or an asynchronous operation completes.

**Example:** `button.addEventListener('click', handleClick)` where `handleClick` is a callback function executed when the button is clicked.

#### Callout Point
The specific x,y coordinate on the base image where a callout line originates, marking the exact feature or component being annotated.

#### Canvas Element
The HTML5 `<canvas>` element that provides a bitmap drawing surface for rendering graphics programmatically using JavaScript, used by p5.js and Chart.js for their visual output.

#### Causal Link
A directed arrow in a causal loop diagram connecting two variables, indicating that a change in the first variable causes a change in the second variable.

#### Causal Loop Diagram
A systems thinking visualization that maps variables and their causal relationships using arrows with polarity indicators, revealing feedback loops that drive system behavior over time.

**Example:** A CLD showing how "Student Motivation" increases "Study Hours," which increases "Test Scores," which further increases "Student Motivation" — forming a reinforcing loop.

#### CDN Script Loading
The practice of loading JavaScript libraries from Content Delivery Network URLs via `<script>` tags in HTML, providing fast, cached access to libraries like p5.js and D3.js.

**Example:** `<script src="https://cdnjs.cloudflare.com/ajax/libs/p5.js/1.9.0/p5.min.js"></script>`

#### Central Content Area
The primary visual region of a MicroSim where the main diagram, chart, or interactive graphic is rendered, typically using an aliceblue background to distinguish it from the control region below.

#### Chart Drawing
In the Dan Roam framework, a visual representation that uses quantitative axes and data points to show measurements, amounts, or distributions, answering "How much?"

#### Chart Type Selection
The design decision of choosing the most effective chart format (bar, line, pie, scatter, etc.) based on the data structure, the comparison being made, and the message to communicate.

#### Chart.js Library
A JavaScript charting library that renders responsive, animated charts on HTML5 Canvas using a simple configuration object, supporting common chart types like bar, line, pie, and radar.

#### Chevron Process
A process diagram variant using chevron-shaped arrows that interlock or overlap, creating a compact and visually dynamic representation of sequential stages.

**Example:** An onboarding workflow shown as five interlocking chevrons labeled "Apply," "Interview," "Offer," "Train," and "Start."

#### Chord Diagram
A circular visualization that shows relationships and flows between entities arranged around the circumference, with connecting arcs whose width represents the strength of the relationship.

#### Circular Causality
A systems thinking concept where cause and effect form a closed loop rather than a linear chain, meaning that effects feed back to influence their own causes.

#### Circular Format
An infographic layout that arranges information in a closed loop, emphasizing cyclical processes, recurring patterns, or continuous workflows.

**Example:** A product lifecycle diagram showing design, build, test, deploy, and feedback stages arranged in a circle.

#### CLD Best Practices
A set of guidelines for creating effective causal loop diagrams, including using 5-15 variables, labeling all polarities, identifying all loops, and keeping the diagram focused on a specific dynamic.

#### Click Event
A user interaction triggered when the user presses and releases a mouse button or taps on a touchscreen element, typically used to select a region and display detailed information.

#### Click Feedback
A visual or auditory response triggered when a user clicks on an interactive element, confirming that the interaction was registered and the system is responding.

#### Click Heatmap
A data visualization that overlays color-coded intensity data on a MicroSim or infographic, showing which regions received the most and fewest user clicks across all sessions.

**Example:** A cell biology overlay heatmap revealing that 80% of students clicked on the nucleus but only 15% explored the endoplasmic reticulum.

#### Code Block
A formatted block of source code in a Markdown page, rendered with syntax highlighting and optional line numbers, used to display HTML, JavaScript, and JSON examples in chapters.

#### Cognitive Load Theory
A learning science theory stating that working memory has limited capacity, and instructional materials should be designed to minimize extraneous processing while maximizing germane learning.

This theory is central to infographic design because overly complex visuals can overwhelm learners rather than aid them.

#### Color Consistency
The practice of using a unified color palette across all MicroSims and chapters in the textbook, ensuring visual coherence and reinforcing brand identity.

#### Color Palette
A defined set of colors used consistently throughout an infographic or MicroSim collection, chosen for aesthetic harmony, accessibility, and effective data encoding.

#### Comparative Format
An infographic layout that places two or more items side by side to highlight similarities, differences, and trade-offs between options or categories.

#### Completion Rate
The percentage of users who interact with all available regions, complete all steps, or reach the final state of a MicroSim, indicating how thoroughly students explore the content.

#### Concave Polygon
A polygon with at least one interior angle greater than 180 degrees, creating an inward indentation that requires more complex hit-detection algorithms like ray casting.

#### Concept Dependency
A relationship between two concepts where understanding the first (prerequisite) is necessary for learning the second, forming the edges in a learning knowledge graph.

**Example:** Understanding "HTML Structure" is a concept dependency for learning "DOM Manipulation."

#### Concept to MicroSim
The end-to-end workflow of transforming an abstract learning concept into a functioning interactive MicroSim, encompassing ideation, design, coding, testing, and integration into the textbook.

#### Configuration Object
A JavaScript object containing key-value pairs that define a MicroSim's settings (colors, sizes, labels, data sources), separating adjustable parameters from rendering logic.

#### Console Logging
The use of `console.log()` statements in JavaScript to output variable values, state information, and debug messages to the browser's developer console during MicroSim development.

#### Content Domain
The subject area or discipline that an infographic addresses, such as science, history, mathematics, or business, which influences the choice of visual metaphors and data types.

#### Content Security Policy
A browser security mechanism configured via HTTP headers or meta tags that restricts which external resources a page can load, potentially affecting CDN script loading in MicroSims.

#### Continuous Cycle
A cycle diagram that emphasizes unbroken flow between stages using smooth, connected paths without discrete endpoints, representing ongoing and seamless processes.

#### Continuous Deployment
An automated workflow where every approved change to the main branch triggers a build and deployment process, keeping the published textbook site synchronized with the source repository.

#### Contrast Principle
A design principle stating that differences in color, size, shape, or weight between elements create visual distinction, helping important elements stand out from their surroundings.

#### Convex Polygon
A polygon where all interior angles are less than 180 degrees, meaning any line segment between two points inside the polygon stays entirely inside — simpler for hit detection.

#### Coordinate System
A numerical framework for specifying the position of points on a canvas or screen, typically using x (horizontal) and y (vertical) values measured in pixels from an origin point.

#### Copy-Paste Iframe
The practice of embedding a MicroSim by copying a standardized iframe code snippet into a chapter's Markdown file, following the project's iframe formatting conventions.

#### Create Level
The sixth and highest level of Bloom's Taxonomy involving producing original work, such as designing and coding a new overlay infographic for a subject of the learner's choice.

#### createCanvas
The p5.js function that creates an HTML5 canvas element with specified width and height in pixels, establishing the drawing surface for all subsequent graphical operations.

#### Cross-Origin Messaging
The secure communication between an iframe and its parent page using the `postMessage` API, used by MicroSims to report their content height for dynamic iframe resizing.

#### Cross-Origin Resource
A web resource (script, image, font, or data file) loaded from a different domain than the host page, subject to browser security restrictions that may require CORS headers.

#### CSS Styling
The style rules that control the visual presentation of a MicroSim, including colors, fonts, spacing, borders, and responsive layout behavior.

#### CSV Format
Comma-Separated Values, a plain-text tabular data format where each line represents a row and values are separated by commas, commonly used for data import in charting MicroSims.

#### Custom CSS Override
Additional CSS rules loaded after the theme's default styles to customize the appearance of specific elements, managed via `extra.css` and `mascot.css` files in the project.

#### Cycle Diagram
An infographic type that shows a set of stages connected in a closed loop, representing processes that repeat continuously without a defined beginning or end.

#### D3 Data Binding
The D3.js mechanism that associates an array of data values with a selection of DOM elements, creating enter, update, and exit selections to synchronize data with visual representation.

**Example:** Binding an array of 50 population values to 50 SVG `<rect>` elements to create a bar chart where each bar's height represents a country's population.

#### D3 Selection
A D3.js object representing a set of DOM elements selected by CSS selectors, providing methods to manipulate attributes, styles, and content of the selected elements.

#### D3.js Library
A JavaScript library for producing dynamic, interactive data visualizations in the browser using SVG, Canvas, and HTML, with powerful data binding and transformation capabilities.

#### Dan Roam Framework
A visual thinking methodology from the book "The Back of the Napkin" that identifies six types of drawings and the SQVID framework for solving problems visually.

#### Dashboard Layout
An arrangement of multiple coordinated charts, metrics, and visualizations on a single screen, providing a comprehensive overview of related data points and performance indicators.

#### Data Visualization
The graphical representation of data using visual elements such as charts, graphs, and maps to reveal patterns, trends, outliers, and relationships that are difficult to detect in raw data.

#### Data-Driven Documents
The design philosophy behind D3.js where visual elements are created, updated, and removed based on data arrays, binding each data point to a corresponding DOM element.

#### Decision Tree Diagram
A branching diagram that maps out choices and their potential outcomes at each node, guiding users through a series of decisions to reach a recommendation or conclusion.

**Example:** A decision tree MicroSim that helps instructional designers choose the right chart type based on their data type and communication goal.

#### Default Parameters
JavaScript function parameters with pre-assigned values that are used when no argument is provided, simplifying MicroSim function calls while allowing customization when needed.

#### Delta vs Status Quo
A SQVID continuum determining whether a visual should emphasize change, transformation, and what is different, or document the current state and existing conditions.

#### Description Metadata
A brief summary of a MicroSim's content and purpose included in metadata, used for search engine optimization, social previews, and catalog listings.

#### Design Pattern
A reusable solution to a commonly occurring problem in software or visual design, providing a proven template that can be adapted to specific MicroSim implementation needs.

#### Desktop Layout
The visual arrangement of a MicroSim optimized for wide viewport widths (typically 1024px or wider), often using side-by-side panels and larger canvas dimensions.

#### Destructuring
A JavaScript syntax for extracting values from arrays or properties from objects into distinct variables, simplifying access to configuration data and function parameters.

#### Detailed Infographic
An infographic with high information density, multiple data visualizations, and extensive annotations, designed for audiences who need comprehensive data exploration.

#### Display Iframe
An iframe element embedded in a chapter page that renders a MicroSim inline with the textbook content, allowing students to interact with simulations without leaving the page.

#### DOM Manipulation
The process of programmatically creating, modifying, or removing HTML elements and attributes in the Document Object Model using JavaScript, fundamental to dynamic infographic rendering.

#### Donut Chart
A pie chart variant with a hollow center, often used to display a key metric in the center while the ring shows the proportional breakdown of categories.

#### Draggable Positioning
An interaction mode where labels, regions, or other visual elements can be moved by clicking and dragging, used during the design phase to fine-tune overlay element placement.

#### Drawing Canvas
The programmable rectangular area within a MicroSim, created via HTML5 Canvas or SVG, where graphical elements such as shapes, text, and images are rendered and updated in response to user interaction.

#### Drill Down
An interaction pattern where clicking on a high-level element reveals more detailed information or sub-visualizations within it, enabling exploration from summary to detail.

**Example:** Clicking on a continent in a world map drills down to show individual countries with their own data values and regional breakdowns.

#### Dual Coding Theory
Allan Paivio's theory that information processed through both verbal and visual channels creates stronger memory traces than information processed through either channel alone.

**Example:** A MicroSim that shows an animated diagram of blood flow while simultaneously displaying text labels for each heart chamber leverages dual coding.

#### Dublin Core Metadata
A standardized set of fifteen metadata elements (title, creator, subject, description, etc.) used to describe educational resources, stored in each MicroSim's `metadata.json` file.

#### Edge
A visual connection between two nodes in a network graph, rendered as a line or arrow indicating a relationship, dependency, or flow between the connected entities.

#### Edge-Aligned Label
A text label positioned along or near the edge of the base image and connected to a callout point by a line, keeping annotations outside the main diagram to reduce visual clutter.

#### Edit Mode
A special operating mode in an overlay diagram driver that enables designers to reposition labels, adjust region boundaries, and export updated coordinates, distinct from the viewer-facing display mode.

#### Editorial Control
The human oversight process ensuring that AI-generated content meets accuracy, tone, accessibility, and pedagogical standards before publication in an intelligent textbook.

#### Educational Infographic
An infographic designed primarily to teach concepts, explain processes, or present learning content in a visually structured format that supports comprehension and retention.

**Example:** An infographic explaining photosynthesis with labeled diagrams, step-by-step arrows, and key vocabulary highlighted in color.

#### Embed Code
The HTML snippet (typically an iframe element) that is copied into a chapter page to display a MicroSim, including the source path, dimensions, and scrolling attributes.

#### Engagement Metrics
Quantitative measures of how actively users interact with a MicroSim, including click counts, hover durations, region exploration coverage, and control adjustments.

#### Error Handling
The practice of anticipating, detecting, and gracefully responding to runtime errors in MicroSim code, preventing crashes and providing helpful feedback when problems occur.

#### Evaluate Level
The fifth level of Bloom's Taxonomy involving making judgments based on criteria, such as using the MicroSim Quality Rubric to assess an interactive infographic's effectiveness.

#### Event Handler
A JavaScript function that executes in response to a specific user interaction event such as a click, hover, or key press, connecting user input to visual or data changes in the infographic.

**Example:** An event handler that listens for clicks on pie chart segments and updates a summary panel with the selected category's details.

#### Event Logging
The practice of recording user interaction events (clicks, hovers, selections, time spent) within a MicroSim for later analysis of learning patterns and engagement.

#### Experience API
The formal name for the xAPI protocol, an e-learning specification that allows learning systems to communicate learner activity data in a standardized "Actor-Verb-Object" statement format.

#### Factory Pattern
A software design pattern that creates objects without specifying their exact class, enabling MicroSims to generate different region types (rectangular, polygon, callout) from a unified configuration.

#### Feature Detection
The runtime practice of testing whether a browser supports a specific API or capability before using it, enabling conditional feature usage rather than relying on browser version assumptions.

#### Feedback Loop
A circular chain of causal links in a system where the output of a process eventually influences its own input, creating self-reinforcing or self-correcting dynamics.

#### Floating Label
A text element placed directly over a base image at specified coordinates, displaying a region name or annotation without a connecting line to a specific point.

#### Flowchart Drawing
In the Dan Roam framework, a visual representation showing decision points, branching paths, and process logic, answering "How does it work?"

#### Font Size Scaling
The technique of adjusting text sizes proportionally based on the available width or viewport dimensions, ensuring readability across different screen sizes and embedding contexts.

#### Formative Assessment
An ongoing evaluation method used during the learning process to monitor student understanding and provide feedback, often embedded within MicroSims as interactive quizzes or exploration tasks.

#### Frame Rate
The number of times per second that a MicroSim's animation loop redraws the canvas, typically targeting 60 frames per second for smooth visual updates.

#### Fullscreen Link Button
A hyperlink placed below an embedded MicroSim iframe that opens the `main.html` file directly in a new browser tab, giving users access to the full-window simulation experience.

#### Funnel Diagram
A diagram shaped like an inverted triangle or cone, showing progressive narrowing of items through stages such as filtering, selection, or conversion processes.

#### Gauge Chart
A semicircular or dial-shaped visualization resembling a speedometer that displays a single value within a defined range, commonly used for KPIs and performance metrics.

#### Gear Cycle
A cycle diagram variant using interlocking gear icons arranged in a circular pattern, emphasizing the mechanical interdependence of each stage in the repeating process.

#### Gear Process
A process diagram variant that uses interlocking gear icons to represent interconnected steps, emphasizing that each stage drives the next in a mechanical or systematic way.

#### Geographic Infographic
An infographic that uses maps as its primary visual structure, displaying data spatially by region, country, or coordinate to reveal geographic patterns and distributions.

**Example:** A choropleth map showing literacy rates by country, with darker colors indicating higher rates.

#### Gestalt Principles
A set of perceptual psychology principles (proximity, similarity, closure, continuity, figure-ground) describing how humans naturally organize visual elements into groups and patterns.

#### gh-deploy Command
The MkDocs command `mkdocs gh-deploy` that builds the site and pushes the output to the `gh-pages` branch of the GitHub repository, triggering automatic deployment to GitHub Pages.

#### Git Version Control
A distributed version control system that tracks changes to project files over time, enabling collaboration, history review, and safe experimentation through branching.

#### GitHub Actions
GitHub's built-in continuous integration and deployment platform that can automatically build, test, and deploy the MkDocs site when changes are pushed to the repository.

#### GitHub Pages Deployment
The process of publishing an MkDocs site to GitHub's free static hosting service, making the intelligent textbook publicly accessible via a `github.io` URL.

#### GitHub Repository
A cloud-hosted Git repository on GitHub that stores the intelligent textbook's source files, enables collaboration through pull requests, and hosts the deployed site via GitHub Pages.

#### Global Variable
A JavaScript variable declared in the outermost scope of a MicroSim's code, accessible from all functions, commonly used to store state like the currently selected region or animation frame.

#### Graceful Degradation
A design strategy where a MicroSim provides a reduced but functional experience in older browsers or when features are unavailable, rather than failing completely.

**Example:** A MicroSim that falls back to displaying a static annotated image when the user's browser does not support HTML5 Canvas.

#### Grid List
A list diagram variant that arranges items in a matrix of rows and columns, useful for presenting categorized data or comparing attributes across multiple items.

**Example:** A 3x4 grid showing twelve design principles, each in its own cell with an icon and one-sentence description.

#### Hierarchical Format
An infographic layout that organizes information in a tree-like structure showing parent-child relationships, levels of importance, or organizational reporting lines.

**Example:** A corporate org chart showing the CEO at the top, department heads below, and team members at the bottom level.

#### Hierarchy Diagram
An infographic type that displays parent-child relationships in a branching tree structure, showing levels of authority, classification, or containment.

#### High Contrast Mode
An accessibility display setting that increases color contrast between foreground and background elements, requiring MicroSims to remain usable when the operating system or browser applies high-contrast overrides.

#### Histogram
A chart type that groups continuous data into bins and displays the frequency of values in each bin as adjacent bars, revealing the distribution shape of a dataset.

**Example:** A histogram showing the distribution of student test scores across 10-point bins from 0-100.

#### Hit Detection
The computational process of determining whether a user's click or hover coordinates fall within the boundary of an interactive region, triggering the appropriate event handler.

#### Hover Event
A user interaction triggered when the pointer moves over a region or element without clicking, commonly used in infographics to display tooltips or highlight areas.

**Example:** Hovering over a country on an interactive map highlights its border and shows its population in a tooltip.

#### Hover Highlight
A visual effect that changes the appearance of an element (such as brightening its color or adding a border) when the user's pointer moves over it, providing immediate interaction feedback.

#### HTML Structure
The semantic markup that defines the content and layout of a MicroSim's web page, including the document head, body, canvas or SVG containers, and control elements.

#### Iframe Element
An HTML `<iframe>` tag that embeds one HTML document inside another, used in intelligent textbooks to display MicroSims within chapter pages while keeping the simulation code isolated.

**Example:** `<iframe src="../../sims/overlay-demo/main.html" height="600" width="100%" scrolling="no"></iframe>`

#### Iframe Height Reporting
The mechanism by which a MicroSim sends its content height to the parent page via the postMessage API, enabling the iframe to resize dynamically and eliminate scrollbars.

#### Image Compression
The process of reducing image file sizes through lossy or lossless algorithms, balancing visual quality against loading speed for base images and assets used in infographics.

#### index.md File
The MkDocs documentation page for a MicroSim that provides context, learning objectives, and embeds the `main.html` file via an iframe element for display within the textbook.

#### Individual vs Comparison
A SQVID continuum determining whether a visual should focus on a single item in depth or place multiple items side by side to reveal relative differences and patterns.

#### Infobox
A floating or fixed panel within an interactive infographic that displays detailed information about a selected region or data point, appearing in response to hover or click events.

**Example:** When a user hovers over "Mitochondria" in a cell diagram, an infobox appears showing its function, size, and a brief description.

#### Infobox Positioning
The logic that determines where an infobox appears relative to the selected region, ensuring it remains visible within the viewport and does not obscure the element being examined.

#### Infographic
A visual representation of information, data, or knowledge designed to present complex content quickly and clearly through the combination of text, images, charts, and graphic elements.

**Example:** A colorful one-page summary showing the water cycle with labeled arrows, temperature data, and percentage breakdowns of freshwater sources.

#### Infographic Portfolio
A curated collection of completed MicroSims and interactive infographics that demonstrates a designer's range of skills, visualization types, and subject-matter versatility.

#### Infographic Taxonomy
A classification system that categorizes infographics by their purpose, format, complexity, audience, and content domain, helping designers select the most effective visual approach.

#### Information Design
The practice of structuring and presenting information so that it can be understood efficiently and accurately, combining principles of graphic design, cognitive science, and data analysis.

#### Instructor Dashboard
A web interface that aggregates learning analytics data from MicroSim interactions, giving instructors visibility into student engagement, progress, and areas of difficulty.

#### Intelligent Textbook
A digital textbook that incorporates interactive simulations, adaptive content, embedded assessments, and learning analytics to create a personalized and engaging learning experience.

**Example:** An online biology textbook where students interact with MicroSims of cell division and the system tracks which concepts they have mastered.

#### Interaction Tracking
The systematic capture and storage of user actions within interactive infographics, including which regions were explored, how long users spent, and what sequence they followed.

**Example:** Recording that a student clicked on 8 of 12 regions in a cell biology overlay, spending an average of 15 seconds on each.

#### Interactive Infographic
An infographic that responds to user input such as hovering, clicking, or dragging, enabling viewers to explore data and discover information at their own pace.

**Example:** A diagram of the solar system where clicking on each planet reveals its mass, distance from the sun, and number of moons in an infobox.

#### Iterative Design
A design methodology that develops MicroSims through repeated cycles of prototyping, testing, analyzing results, and refining, progressively improving quality based on evidence and feedback.

#### JavaScript Fundamentals
The core language features of JavaScript needed to build MicroSims, including variables, functions, conditionals, loops, arrays, objects, and event handling.

#### Journey Map
A visualization that traces a user's or learner's experience through a process or system over time, identifying touchpoints, emotions, pain points, and opportunities for improvement.

#### JSON Format
JavaScript Object Notation, a lightweight text-based data format using key-value pairs and arrays, used extensively in MicroSims for configuration files, overlay definitions, and metadata.

**Example:** `{"title": "Cell Diagram", "regions": [{"name": "nucleus", "x": 150, "y": 120}]}`

#### JSON Schema
A specification that defines the expected structure, data types, and constraints for a JSON document, used to validate overlay configuration files and metadata before rendering.

#### Keyboard Navigation
The ability to operate all interactive features of a MicroSim using only keyboard inputs (Tab, Enter, Arrow keys, Escape), essential for users who cannot use a mouse.

#### Knowledge Graph
A structured representation of concepts and their relationships, used in intelligent textbooks to map prerequisite dependencies and generate personalized learning paths.

#### Labeled Hierarchy
A hierarchy diagram where each node includes descriptive labels, titles, or annotations that provide context about the role or function of each element in the structure.

#### Layered Infographic
An infographic design that uses overlapping visual planes or layers that can be toggled on and off, enabling users to examine different aspects of a complex dataset independently.

#### Leaflet Library
An open-source JavaScript library for creating interactive, mobile-friendly map visualizations with support for tile layers, markers, popups, and geographic data overlays.

#### Learning Analytics
The measurement, collection, analysis, and reporting of data about learners and their contexts, used to understand and optimize learning experiences in intelligent textbooks.

#### Learning Objective
A specific, measurable statement describing what a learner should be able to do after completing a lesson or chapter, typically aligned to a level of Bloom's Taxonomy.

**Example:** "After completing this chapter, the learner will be able to create a causal loop diagram with at least two feedback loops for a given system scenario."

#### Learning Path
A recommended sequence of topics, chapters, or activities through a knowledge graph that guides a learner from foundational concepts to advanced skills in an optimal order.

#### Legend Design
The visual component of a chart or infographic that explains the meaning of colors, symbols, patterns, and sizes used in the visualization, placed for easy reference without obscuring data.

#### Lesson Plan Section
A structured component of a chapter that provides instructors with suggested activities, discussion questions, and facilitation guides for using the chapter's MicroSims in classroom settings.

#### Leverage Point
A place in a system where a small intervention can produce a large, lasting change in system behavior, identified through analysis of feedback loops and system structure.

#### Library Selection
The design decision of choosing the most appropriate JavaScript visualization library for a MicroSim based on the diagram type, interactivity requirements, and complexity of the visualization.

#### Line Chart
A chart type that connects data points with line segments to show trends, patterns, or changes over a continuous variable such as time.

**Example:** A line chart showing monthly website traffic over a year, with the x-axis as months and the y-axis as page views.

#### Linear Format
An infographic layout that guides the viewer through information in a sequential, top-to-bottom or left-to-right flow, well suited for step-by-step processes and timelines.

#### List Diagram
An infographic type that displays related items in a structured list format with visual enhancements such as icons, numbers, or color coding to improve scannability.

#### Local Development Server
A lightweight web server (started with `mkdocs serve`) running on the developer's machine that serves the textbook site locally for previewing changes before deployment.

#### Loop Identifier
A label (typically "R" for reinforcing or "B" for balancing, followed by a number) placed inside a feedback loop in a causal loop diagram to name and reference specific loops.

#### Low-Code Tool
A software platform that enables infographic creation through minimal coding combined with visual configuration, templates, and pre-built components, bridging no-code and full-code approaches.

#### main.html File
The primary HTML file in a MicroSim directory that contains the interactive simulation code, named `main.html` by convention (never `index.html`) to avoid conflicts with the MkDocs documentation page.

#### Map Drawing
In the Dan Roam framework, a visual representation showing spatial relationships, geographic locations, or physical layouts, answering "Where is it?"

#### Map Tile Layer
A set of pre-rendered map image tiles served from a tile server (such as OpenStreetMap) and assembled by a mapping library like Leaflet to create a zoomable, pannable base map.

#### Markdown Format
A lightweight markup language using plain-text formatting syntax (headings, lists, links, emphasis) that is converted to HTML by MkDocs for rendering textbook chapter pages.

#### Matrix Diagram
A relationship diagram that uses a two-dimensional grid with labeled rows and columns to show relationships, intersections, or evaluations between two sets of categories.

**Example:** A matrix comparing four JavaScript libraries across criteria like ease of use, community size, and rendering performance using color-coded cells.

#### Mayer's Principles
Richard Mayer's twelve research-based principles for multimedia learning design, including coherence, signaling, redundancy, spatial contiguity, and temporal contiguity, guiding effective infographic creation.

#### Media Query
A CSS feature that applies different style rules based on device characteristics such as viewport width, enabling responsive layouts that adapt to different screen sizes.

#### Mermaid Diagram
A diagram rendered from text-based markup using the Mermaid.js library, supporting flowcharts, sequence diagrams, class diagrams, and other structured visualizations within Markdown pages.

#### metadata.json File
A JSON file in each MicroSim directory containing Dublin Core metadata fields that describe the simulation's title, creator, subject, educational level, and other cataloging information.

#### MicroSim
A small, self-contained interactive simulation embedded within a textbook page, typically built with HTML, CSS, and JavaScript and displayed inside an iframe element.

**Example:** A 400-pixel-tall p5.js sketch that lets students adjust the angle of a ramp and observe how friction affects an object's acceleration.

#### MicroSim Architecture
The standardized file and folder structure for building MicroSims, consisting of a `main.html` file for the interactive content, an `index.md` file for the documentation page, and a `metadata.json` file for Dublin Core metadata.

#### MicroSim Directory
The dedicated folder within the `docs/sims/` directory that contains all files for a single MicroSim, including `main.html`, `index.md`, `metadata.json`, and any associated assets.

**Example:** `docs/sims/overlay-demo/` containing `main.html`, `index.md`, and `metadata.json`.

#### MicroSim Quality Rubric
A standardized evaluation framework that scores MicroSims across dimensions including visual consistency, interactivity, responsiveness, accessibility, metadata completeness, and educational value.

#### Mind Map
A radial diagram that organizes ideas around a central concept, with branches and sub-branches extending outward to show related topics, subtopics, and associations.

#### Minimalist Infographic
An infographic that uses a limited color palette, generous whitespace, simple typography, and few visual elements to communicate key messages with maximum clarity and minimal distraction.

#### MkDocs Build Process
The static site generation process triggered by `mkdocs build` that converts Markdown files, applies the Material theme, processes plugins, and outputs a complete HTML website.

#### MkDocs Material Theme
A feature-rich theme for the MkDocs static site generator that provides navigation, search, syntax highlighting, admonitions, and responsive design for documentation websites.

#### mkdocs.yml Configuration
The YAML configuration file at the project root that defines site metadata, theme settings, navigation structure, plugins, CSS/JS includes, and build options for the MkDocs site.

#### Mobile-First Design
A responsive design strategy that starts with the layout for the smallest screen size and progressively enhances the design for larger screens, ensuring baseline usability on phones.

#### Module Import
The JavaScript `import` statement for loading code from separate files or packages, enabling modular organization of MicroSim code into reusable components.

#### Mouse Event
A user interaction event triggered by mouse actions such as `click`, `mousemove`, `mouseenter`, and `mouseleave`, used to drive hover highlights and click selections in infographics.

#### Multi-Edge Overlay
An overlay configuration containing multiple polygon regions with complex boundaries, requiring point-in-polygon hit detection algorithms for accurate user interaction.

#### Multi-Variable Plot
In the Dan Roam framework, a visual representation that displays relationships between multiple data dimensions simultaneously, answering "How do things interact?"

**Example:** A scatter plot with bubble sizes representing a third variable, showing the relationship between study time, test scores, and student engagement.

#### Multimedia Learning
The study of how people learn from combined text and visual presentations, providing evidence-based principles for designing effective educational infographics and interactive media.

#### Named Region
A region within an overlay diagram that has been assigned a unique identifier and label, enabling it to be referenced in code, JSON configuration, and event handlers.

**Example:** A named region called "cerebellum" in a brain diagram overlay, with coordinates defining its boundary and a label displayed on hover.

#### Navigation Structure
The hierarchical organization of pages defined in the `nav` section of `mkdocs.yml`, determining the sidebar menu structure and reading order of the intelligent textbook.

#### Negative Polarity
A causal link polarity where an increase in the cause variable leads to a decrease in the effect variable, or vice versa — the variables move in opposite directions.

**Example:** Increasing "Automation" has negative polarity on "Manual Labor Required" — as automation rises, manual labor decreases.

#### Nested Cycle
A cycle diagram with concentric loops representing multiple levels of cyclical processes, showing how inner cycles operate within the context of larger outer cycles.

#### Network Graph
A visualization showing entities as nodes connected by edges representing relationships, used in infographics to display concept maps, social networks, or system architectures.

#### Network Tab Debugging
Using the browser developer tools' Network tab to inspect HTTP requests, response times, file sizes, and loading errors when troubleshooting MicroSim resource loading issues.

#### No-Code Tool
A software application that enables users to create interactive infographics and visualizations through visual interfaces and configuration rather than writing programming code.

**Example:** Canva, Piktochart, or Infogram, where users drag and drop chart elements and data tables to build infographics.

#### Node
A visual element in a network graph representing an entity, concept, or data point, typically rendered as a circle, square, or labeled shape with configurable size and color.

#### Non-Overlapping Regions
A constraint in overlay design where interactive regions are positioned so that no two regions share any pixels, ensuring that every click or hover maps to exactly one region or no region.

#### Numbered Indicator
A small circular badge containing a number, placed on the base image at a callout point, with the corresponding label and description shown in a legend or on hover.

**Example:** A circuit board diagram with numbered circles at each component, and a sidebar legend listing "1: CPU, 2: RAM, 3: GPU" and so on.

#### Object Literal
A JavaScript syntax for creating objects using curly braces with key-value pairs, commonly used for configuration objects, region definitions, and metadata in MicroSim code.

#### Observer Pattern
A software design pattern where an object (subject) maintains a list of dependents (observers) and notifies them of state changes, useful for coordinating linked visualizations in MicroSims.

**Example:** When a user selects a region in one panel, observer objects in the infobox and highlight panels are automatically notified and update their displays.

#### Open Graph Tags
HTML meta tags using the `og:` prefix that define how a web page appears when shared on social media, specifying the title, description, image, and URL for the preview card.

#### Organization Chart
A hierarchy diagram specifically designed to show reporting relationships, roles, and departmental structure within an organization or institution.

#### Overlay Diagram Driver
The JavaScript rendering engine that reads an overlay JSON configuration file, draws regions over a base image, handles user interaction events, and displays infobox content for selected regions.

#### Overlay JSON File
A JSON configuration file that defines the regions, coordinates, labels, and metadata for an overlay infographic, separating the data from the rendering code for reusability.

**Example:** A JSON file containing an array of region objects, each with `name`, `x`, `y`, `width`, `height`, and `description` properties for a human anatomy overlay.

#### Overlayment Pattern
A design pattern for interactive infographics where transparent, clickable regions are positioned over a base image, enabling users to explore labeled areas by hovering or clicking.

#### p5.js Draw Function
The `draw()` function in p5.js that runs continuously in a loop (typically 60 times per second), used to update and render the visual state of an animation or interactive sketch.

#### p5.js Editor Link
A hyperlink to the p5.js online editor preloaded with a MicroSim's code, enabling students and instructors to view, modify, and experiment with the simulation's source code.

#### p5.js Event Handling
The set of built-in p5.js functions (`mousePressed`, `mouseMoved`, `keyPressed`, etc.) that detect and respond to user input, enabling interactivity in MicroSims.

#### p5.js Library
A JavaScript library for creative coding that provides an accessible API for drawing graphics, handling user input, and creating animations on an HTML5 canvas element.

**Example:** A MicroSim using p5.js to draw a color wheel where students click on segments to learn about complementary and analogous color relationships.

#### p5.js Setup Function
The `setup()` function in p5.js that runs once when the sketch initializes, used to create the canvas, set initial styles, and configure one-time settings for the MicroSim.

#### Performance Profiling
The process of measuring and analyzing a MicroSim's rendering speed, memory usage, and JavaScript execution time using browser developer tools to identify and resolve performance bottlenecks.

#### Persuasive Infographic
An infographic designed to influence opinions or drive action by combining data presentation with strategic visual design, narrative framing, and calls to action.

#### Picture Diagram
An infographic type that uses a photograph, illustration, or schematic as the base image, with overlaid labels, callouts, or hotspots to annotate specific features.

#### Picture List
A list diagram variant that pairs each item with an illustrative image or icon, leveraging dual coding to enhance recognition and recall of listed concepts.

#### Pie Chart
A chart type that divides a circle into proportional slices to show the composition of a whole, where each slice represents a category's percentage of the total.

#### Pixel Coordinates
A coordinate system where positions are specified as integer pixel values measured from the top-left corner of the canvas, with x increasing rightward and y increasing downward.

#### PNG Format
Portable Network Graphics, a lossless image format supporting transparency, used for mascot images, icons, and diagrams where sharp edges and transparent backgrounds are required.

#### Point-in-Polygon Test
An algorithm that determines whether a given x,y coordinate falls inside a polygon region, commonly using the ray-casting method to count boundary crossings.

#### Pointer Device
Any input device (mouse, touchpad, stylus, finger) that controls a cursor or contact point on screen, with pointer events providing a unified API across device types.

#### Polarity Indicator
A symbol (+ or −) placed on a causal link arrow indicating whether the linked variables change in the same direction (positive) or opposite directions (negative).

#### Polyfill
A piece of JavaScript code that provides modern browser functionality to older browsers that lack native support, enabling consistent MicroSim behavior across different browser versions.

#### Polygon Edge Point
A single x,y coordinate pair that defines one vertex of a polygon region, with consecutive edge points connected by straight lines to form the region's boundary.

#### Polygon Region
An interactive overlay area defined by an ordered list of vertex coordinates forming a closed polygon shape, enabling precise region boundaries that follow irregular contours.

#### Portrait Drawing
In the Dan Roam framework, a visual representation focusing on a single entity's characteristics, attributes, or features, answering the question "Who or what is it?"

#### Positive Polarity
A causal link polarity where an increase in the cause variable leads to an increase in the effect variable, or a decrease leads to a decrease — the variables move in the same direction.

#### postMessage API
The browser API that enables secure cross-origin communication between an iframe and its parent page, used by MicroSims to report their rendered height for automatic iframe resizing.

**Example:** `window.parent.postMessage({type: 'microsim-resize', height: 450}, '*');`

#### Prerequisite Knowledge
The concepts, skills, or experience that a learner must possess before they can effectively engage with a new topic or complete a learning activity.

#### Process Arrows
Visual connectors in a process diagram that indicate the direction and sequence of steps, typically rendered as arrow shapes pointing from one stage to the next.

#### Process Diagram
An infographic type that visualizes a sequence of steps, stages, or phases in a workflow, using directional arrows or connectors to show progression and order.

#### Progressive Enhancement
A design strategy that builds a MicroSim starting with basic functionality that works everywhere, then adds advanced features for browsers and devices that support them.

#### Promotional Infographic
An infographic created primarily for marketing or outreach purposes, showcasing products, services, or organizational achievements through visually appealing data displays.

#### Prompt Engineering
The practice of crafting precise, structured text prompts that guide AI models to produce desired outputs, critical for generating high-quality base images, code, and overlay configurations.

**Example:** A prompt specifying "Create a p5.js sketch with an aliceblue background showing an interactive color wheel with 12 segments, hover highlights, and an infobox below."

#### Proximity Principle
The Gestalt principle stating that elements placed close together are perceived as related, used in infographic layout to group related labels, icons, and data points.

#### Pull Request
A GitHub collaboration mechanism where proposed changes on a branch are reviewed, discussed, and approved before being merged into the main branch of the repository.

#### Pyramid Diagram
A diagram shaped like a triangle divided into horizontal layers, representing hierarchical levels where lower layers are broader and upper layers are narrower, implying foundational-to-advanced progression.

**Example:** Bloom's Taxonomy shown as a pyramid with "Remember" at the base and "Create" at the apex.

#### Qualitative vs Quantitative
A SQVID continuum determining whether a visual should emphasize subjective qualities, feelings, and impressions or precise numerical data and measurements.

#### Quality Assurance
The systematic process of verifying that all MicroSims, chapter content, and site features meet established standards for accuracy, accessibility, visual consistency, and functionality.

#### Quality Score
A numerical rating assigned to a MicroSim based on a standardized rubric evaluating criteria such as interactivity, visual design, responsiveness, metadata completeness, and educational alignment.

#### Radial Cycle
A cycle diagram variant where stages are arranged around a central hub with connections radiating outward and circling back, emphasizing the relationship between stages and a core concept.

#### Radial Diagram
A relationship diagram with a central node connected to surrounding nodes by lines or spokes, showing how multiple concepts relate to a single core idea.

#### Radial Format
An infographic layout where elements extend outward from a central point like spokes on a wheel, showing relationships between a core concept and its related topics.

#### Rectangular Region
An interactive overlay area defined by x, y, width, and height values, forming an axis-aligned rectangle over the base image.

#### References Section
The final section of a chapter listing external resources, documentation links, academic citations, and further reading materials that support and extend the chapter content.

#### Region
A defined area within an interactive infographic that responds to user interaction, mapped to a specific concept, data point, or component of the diagram.

#### Region Extent Highlight
A visual effect that displays the boundary of a rectangular region when the user hovers over it, typically rendered as a semi-transparent colored rectangle or dashed border.

#### Region Label
A text string displayed on or near a region in an interactive infographic, identifying the concept or data element that the region represents.

#### Reinforcing Loop
A feedback loop in a causal loop diagram where the net effect of all causal links amplifies change, causing exponential growth or decline — marked with an "R" identifier.

#### Relationship Diagram
An infographic type that shows connections, associations, and dependencies between concepts, entities, or data points using lines, arrows, or containment.

#### Relative Coordinates
A coordinate system where positions are expressed as fractions or percentages of the canvas dimensions, enabling layouts that scale proportionally when the canvas is resized.

**Example:** A region at relative coordinates (0.5, 0.3) is always centered horizontally and 30% down from the top, regardless of canvas pixel dimensions.

#### Remember Level
The first level of Bloom's Taxonomy involving recall of facts, terms, and basic concepts, such as identifying diagram types or listing the components of a MicroSim directory.

#### Repetition Principle
A design principle stating that repeating visual elements (colors, shapes, fonts, spacing) across an infographic creates consistency, unity, and a sense of professional polish.

#### Responsive Breakpoints
The set of viewport width values at which a MicroSim's layout changes its configuration, such as repositioning controls, resizing the canvas, or adjusting font sizes.

#### Reusable Overlay Schema
A standardized JSON structure for defining overlay regions that can be applied across multiple base images and diagram types, enabling consistent configuration and tooling.

#### Roadmap Diagram
A timeline-based visualization showing planned features, milestones, or phases of a project, organized into time periods and categories to communicate a strategic plan.

#### Same-Origin Policy
A browser security restriction that prevents JavaScript in one origin (domain, protocol, port) from accessing resources in a different origin, affecting iframe communication and resource loading.

#### Sandbox Attribute
An HTML iframe attribute that restricts the embedded content's capabilities (such as preventing form submission or script execution), enhancing security for embedded third-party content.

#### Sankey Diagram
A flow diagram where the width of connecting bands between nodes is proportional to the flow quantity, used to visualize energy transfers, budget allocations, or process flows.

**Example:** A Sankey diagram showing how students progress through different course modules, with wider bands indicating paths taken by more students.

#### Scaffolding
An instructional strategy that provides temporary support structures to help learners accomplish tasks they cannot yet perform independently, gradually removed as competence develops.

**Example:** A MicroSim that starts with pre-labeled overlay regions and progressively requires students to define their own regions as they advance.

#### Scatter Plot
A chart type that plots individual data points on a two-dimensional grid using x and y coordinates, revealing correlations, clusters, and outliers in the data.

#### Screen Reader Support
The design and implementation practices that ensure MicroSim content and interactions can be understood and operated by screen reader software used by visually impaired users.

#### Scrollytelling
A narrative interaction technique where the visualization changes as the user scrolls down the page, synchronizing story progression with vertical scroll position.

**Example:** A climate change infographic where scrolling down transitions through decades, with charts and maps updating to show temperature and sea level changes over time.

#### Segmenting Principle
Mayer's principle that learning improves when complex information is presented in learner-paced segments rather than as a continuous stream, supporting step-by-step exploration in MicroSims.

#### Selection Event
An interaction event that occurs when a user chooses a specific element or region in an infographic, often changing the visual state of the selected item and updating associated information displays.

#### Semantic HTML
The practice of using HTML elements that convey meaning about the content they contain (such as `<nav>`, `<article>`, `<figure>`) rather than generic `<div>` elements, improving accessibility.

#### Session Duration
The total time a user spends interacting with a MicroSim during a single visit, measured from the first interaction event to the last, indicating depth of engagement.

#### Shared Library
A collection of reusable JavaScript functions, CSS styles, or JSON templates that multiple MicroSims can reference, reducing code duplication and ensuring consistent behavior.

#### Show Numbers Toggle
A user interface control that allows the viewer to show or hide numbered indicators on an overlay diagram, enabling a cleaner view of the base image when annotations are not needed.

#### Side-by-Side Comparison
A layout pattern that places two or more related visualizations adjacent to each other, enabling direct visual comparison of data, designs, or outcomes.

#### Signaling Principle
Mayer's principle that learning improves when visual cues (arrows, highlights, bold text) guide the learner's attention to essential information within a multimedia presentation.

**Example:** Using a pulsing red circle to draw attention to the active step in a process diagram MicroSim.

#### Silver Border
A light gray (`silver`) border applied to the boundary between the drawing region and the control region in a MicroSim, providing subtle visual separation between the two areas.

#### Simple vs Elaborate
A SQVID continuum determining whether a visual should strip content to essentials for clarity or include comprehensive detail for thoroughness, based on audience needs and context.

#### Site Search
The built-in MkDocs Material search feature that indexes all page content and enables users to find specific terms, concepts, and MicroSims across the entire textbook.

#### Six W's Framework
Dan Roam's framework mapping six question types (who/what, how much, where, when, how, why) to six corresponding visual formats for structured visual problem solving.

#### SmartArt Categories
The classification system used in Microsoft Office applications that groups diagram types into categories such as List, Process, Cycle, Hierarchy, Relationship, Matrix, and Pyramid.

This classification is relevant because many instructional designers are familiar with SmartArt and can use these categories as a starting point for more sophisticated interactive infographics.

#### Social Cards Plugin
An MkDocs Material plugin that automatically generates Open Graph preview images for each page, displaying the page title and site branding when URLs are shared on social media.

#### Social Preview Image
An image file referenced in Open Graph metadata that appears as a thumbnail when a page URL is shared on social media platforms, typically showing a screenshot of the MicroSim.

#### Sparkline
A small, inline line chart without axes or labels that shows the general trend of a data series within a sentence or table cell, providing context without requiring a full chart.

#### Spatial Contiguity
Mayer's principle that learning improves when related text and visuals are placed near each other rather than far apart, reducing the need to visually search for corresponding elements.

#### Spread Operator
The JavaScript `...` syntax that expands arrays or objects into individual elements, useful for merging configuration objects or passing variable-length arguments.

#### SQVID Framework
Dan Roam's decision framework with five continuums (Simple-Elaborate, Qualitative-Quantitative, Vision-Execution, Individual-Comparison, Delta-Status Quo) that guide how to present visual information.

#### Stacked Bar Chart
A bar chart variant where each bar is divided into colored segments representing sub-categories, showing both the total value and the composition of each category.

#### Standardization Checklist
A step-by-step verification list ensuring that a MicroSim meets all project conventions, including file naming, aliceblue background, width-responsive layout, height reporting, and metadata inclusion.

#### State Management
The practice of organizing and tracking the current values of all variables that determine a MicroSim's visual output and behavior, ensuring consistent rendering and interaction.

#### Static Infographic
A fixed-image infographic with no interactivity, typically distributed as a PNG, JPEG, or PDF file that presents all information simultaneously without user input.

#### Step Reveal
An interaction pattern where content is disclosed progressively as the user clicks a "Next" button or advances through numbered steps, managing cognitive load by limiting visible information.

#### Step Up Process
A process diagram variant that displays stages as ascending steps or stairs, visually implying progression, improvement, or increasing complexity at each stage.

#### Student Engagement Data
Quantitative and qualitative metrics collected from student interactions with MicroSims, including click counts, time on task, completion rates, and interaction sequences.

#### SVG Element
Scalable Vector Graphics, an XML-based markup format for defining two-dimensional vector graphics in the browser, used by D3.js for creating resolution-independent data visualizations.

#### Systems Thinking
An analytical approach that examines how components of a system interact, influence each other, and produce emergent behaviors, often visualized through causal loop diagrams and stock-and-flow models.

#### Tab Order
The sequence in which interactive elements receive focus when a user presses the Tab key, which should follow a logical reading order through the MicroSim's controls and regions.

#### Table Hierarchy
A hierarchy diagram that uses a table-like grid layout with indentation or nesting to show hierarchical levels, combining the clarity of tabular data with structural relationships.

#### Tablet Layout
The visual arrangement of a MicroSim optimized for medium viewport widths (typically 768-1024px), balancing the space constraints of mobile with the capabilities of desktop.

#### Target Diagram
A relationship diagram using concentric circles resembling a bullseye to show hierarchical layers of importance, proximity, or priority radiating outward from a central focus.

#### Template Literal
A JavaScript string syntax using backticks that supports embedded expressions via `${...}` and multiline text, useful for generating dynamic HTML content and formatted display strings.

**Example:** `` `The ${regionName} has an area of ${area} square pixels.` ``

#### Template MicroSim
A pre-built MicroSim with placeholder content that serves as a starting point for creating new simulations, providing the standard file structure, styling, and height-reporting code.

#### Text-to-Image LLM
A large language model or generative AI system that creates images from text descriptions, used to generate base images, mascot illustrations, and visual assets for infographics.

#### Timeline Diagram
An infographic that arranges events, milestones, or steps along a chronological axis, showing when events occurred relative to each other.

**Example:** A timeline of computing history from 1940 to 2020, with key inventions marked at their respective dates along a horizontal line.

#### Timeline Drawing
In the Dan Roam framework, a visual representation arranging events along a chronological axis, answering "When did it happen?"

#### Title Metadata
The descriptive name assigned to a MicroSim or page in metadata, used for site navigation, search results, browser tabs, and social media sharing previews.

#### Tooltip
A small popup text element that appears when the user hovers over a data point or region, providing additional detail without cluttering the main visualization.

**Example:** Hovering over a bar in a bar chart shows a tooltip reading "Q3 Revenue: $4.2M (+12% YoY)."

#### Touch Event
A user interaction event triggered by finger contact on a touchscreen device, including `touchstart`, `touchmove`, and `touchend`, requiring special handling in mobile-friendly MicroSims.

#### Treemap Diagram
A visualization that displays hierarchical data as a set of nested rectangles, with each rectangle's area proportional to a quantitative value, revealing both structure and relative size.

#### Type 1 Rectangular
An overlay pattern variant where all interactive regions are axis-aligned rectangles that do not overlap, providing the simplest hit-detection logic and the easiest JSON configuration.

#### Type 2 Complex Polygon
An overlay pattern variant where interactive regions are defined as multi-point polygons rather than rectangles, enabling precise mapping of irregularly shaped areas in base images.

**Example:** Mapping the countries on a continent image where each country's border is traced as a polygon with dozens of coordinate points.

#### Type 3 Callout to Edge
An overlay pattern variant where labels are connected to specific points on the base image by lines or arrows, similar to the callout annotations found in technical illustrations.

#### Type 4 Floating Label
An overlay pattern variant where text labels are positioned freely over the base image without connection lines, using drag-and-drop positioning in edit mode for precise placement.

#### Understand Level
The second level of Bloom's Taxonomy involving comprehension and interpretation, such as explaining why a reinforcing loop causes exponential growth in a causal loop diagram.

#### Unintended Consequence
An unexpected outcome that arises from an intervention in a complex system, often visible only when the system's feedback loops and delayed effects are mapped in a causal loop diagram.

#### Usability Testing
The process of observing representative users as they interact with a MicroSim, identifying points of confusion, interaction failures, and opportunities to improve the user experience.

#### User Feedback Loop
A cyclical process of collecting user feedback on MicroSim usability, analyzing the responses, implementing improvements, and re-evaluating to continuously enhance the learning experience.

#### Variable
A named quantity or concept in a causal loop diagram that can increase or decrease over time, representing a measurable or observable aspect of the system being modeled.

**Example:** In an educational CLD, variables might include "Class Size," "Individual Attention," "Student Performance," and "Teacher Workload."

#### Venn Diagram
A relationship diagram using overlapping circles to show commonalities and differences between two or more sets, with shared attributes placed in the intersection areas.

**Example:** A Venn diagram comparing "Infographics" and "Data Dashboards," with shared traits like "visual encoding" in the overlap and unique traits in each circle's exclusive area.

#### Version Pinning
The practice of specifying exact version numbers for external JavaScript libraries in CDN URLs or package files, preventing unexpected behavior from automatic library updates.

#### Vicious Cycle
A reinforcing feedback loop that produces increasingly negative outcomes, where each iteration of the loop worsens the situation.

**Example:** Low funding leads to poor facilities, which decreases enrollment, which further reduces funding.

#### Viewport
The visible area of a web page in the browser window, whose dimensions determine how a width-responsive MicroSim scales and what layout breakpoints activate.

#### Virtuous Cycle
A reinforcing feedback loop that produces increasingly positive outcomes, where each iteration of the loop improves the situation.

#### vis-network Library
A JavaScript library for displaying interactive network graphs with nodes and edges, supporting features like physics simulation, clustering, and hierarchical layouts.

#### Vision vs Execution
A SQVID continuum determining whether a visual should depict an aspirational future state or the concrete current-state implementation details and practical steps.

#### Visual Complexity
The degree of detail, layering, and information density in an infographic, which must be calibrated to the audience's expertise and the learning objectives of the content.

#### Visual Encoding
The mapping of data values to visual properties such as position, length, area, color, shape, or angle, forming the fundamental building blocks of data visualization.

**Example:** Encoding temperature values as color (blue for cold, red for hot) on a geographic heat map.

#### Visual Hierarchy
The arrangement of visual elements to guide the viewer's attention through an infographic in a deliberate order, using size, color, contrast, and position to signal relative importance.

#### Visual Problem Solving
The practice of using drawings, diagrams, and infographics as thinking tools to clarify problems, explore solutions, and communicate ideas more effectively than text alone.

#### WebP Format
A modern image format developed by Google that provides superior compression compared to PNG and JPEG, offering both lossy and lossless modes with transparency support.

#### White Control Region
The white background area below the drawing canvas in a MicroSim that contains sliders, buttons, dropdowns, and other user interface controls for adjusting simulation parameters.

#### Width-Responsive Design
A design approach where a MicroSim or infographic automatically adjusts its layout and element sizes to fill the available horizontal space, ensuring usability across different screen widths.

#### Width-Responsive Testing
The process of verifying that a MicroSim renders correctly across different viewport widths, from narrow mobile screens to wide desktop monitors, by resizing the browser window.

#### Word Cloud
A visualization that displays a collection of words with each word's size proportional to its frequency or importance, providing an at-a-glance summary of textual content themes.

#### xAPI Protocol
Experience API (also called Tin Can API), a specification for tracking and recording learning experiences as statements in the form "Actor-Verb-Object," enabling detailed interaction analytics.

#### YAML Frontmatter
Metadata enclosed between `---` delimiters at the top of a Markdown file, used in MkDocs pages to set page titles, descriptions, tags, and Open Graph properties.

#### Zoom and Pan
An interaction capability that allows users to magnify specific areas of an infographic and navigate across the full extent of a large visualization by dragging, supporting detailed exploration.

