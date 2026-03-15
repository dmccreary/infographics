# Quiz: JavaScript Visualization Libraries

Test your understanding of p5.js, D3.js, Chart.js, vis-network, Leaflet, and library selection criteria.

---

#### 1. What is p5.js best suited for when building interactive infographics?

<div class="upper-alpha" markdown>
1. Creating standard bar charts and pie charts from structured datasets
2. Custom canvas drawing, interactive animations, and creative visual experiences
3. Rendering geographic maps with zoom and pan controls
4. Displaying network graphs with nodes and edges
</div>

??? question "Show Answer"
    The correct answer is **B**. p5.js is a creative coding library built on the HTML5 Canvas element, best suited for custom drawing, interactive animations, and creative visual experiences. It provides a `setup()` function for initialization and a `draw()` function that runs continuously for animation, along with built-in event handling for mouse and touch interactions.

    **Concept Tested:** p5.js Library

---

#### 2. What does D3.js stand for and what is its core approach?

<div class="upper-alpha" markdown>
1. Direct Drawing in Dimensions — it renders 3D graphics in the browser
2. Data-Driven Documents — it binds data to DOM elements and applies transformations based on data values
3. Dynamic Design Deployment — it manages the deployment of web applications
4. Digital Diagram Designer — it provides a drag-and-drop interface for creating diagrams
</div>

??? question "Show Answer"
    The correct answer is **B**. D3.js stands for Data-Driven Documents. Its core approach binds data to DOM elements (typically SVG) and applies data-driven transformations — creating, updating, and removing elements based on the underlying dataset. D3 selections and data binding make it extremely powerful for complex, data-driven visualizations.

    **Concept Tested:** D3.js Library, Data-Driven Documents

---

#### 3. Which library would you choose for creating a standard bar chart, line chart, or pie chart with minimal code?

<div class="upper-alpha" markdown>
1. p5.js
2. vis-network
3. Chart.js
4. Leaflet
</div>

??? question "Show Answer"
    The correct answer is **C**. Chart.js is designed specifically for standard chart types — bar, line, pie, doughnut, scatter, radar, and more — with minimal configuration code. It provides responsive, interactive charts out of the box with tooltips, legends, and animations, making it the fastest path to common chart types.

    **Concept Tested:** Chart.js Library

---

#### 4. What is a network graph and which library is best for creating one?

<div class="upper-alpha" markdown>
1. A chart showing network bandwidth over time; Chart.js
2. A visualization of nodes connected by edges showing relationships; vis-network
3. A geographic map showing internet infrastructure; Leaflet
4. A hierarchical tree showing network protocols; D3.js
</div>

??? question "Show Answer"
    The correct answer is **B**. A network graph visualizes nodes (entities) connected by edges (relationships), showing how items in a system relate to each other. The vis-network library is purpose-built for network graph visualization, providing physics-based layouts, clustering, interactive node dragging, and hover/click events. The learning graph viewer in this textbook uses vis-network.

    **Concept Tested:** Network Graph, vis-network Library, Node, Edge

---

#### 5. What is a map tile layer in the context of the Leaflet library?

<div class="upper-alpha" markdown>
1. A decorative border pattern applied around a geographic map
2. A pre-rendered image grid that provides the base geographic map imagery, loaded in tiles as the user pans and zooms
3. A transparent overlay that displays data points on top of a chart
4. A layer of text labels that can be toggled on and off
</div>

??? question "Show Answer"
    The correct answer is **B**. A map tile layer is a grid of pre-rendered image tiles (typically from services like OpenStreetMap) that provides the base geographic imagery for a Leaflet map. Tiles load dynamically as the user pans and zooms, ensuring smooth performance without loading the entire world map at once. Data markers and polygons are then layered on top.

    **Concept Tested:** Map Tile Layer, Leaflet Library

---

#### 6. What is a Sankey diagram used to visualize?

<div class="upper-alpha" markdown>
1. The hierarchical structure of an organization
2. The cyclical phases of a repeating process
3. Flows between stages, where the width of each flow line represents the quantity being transferred
4. The geographic distribution of data across regions
</div>

??? question "Show Answer"
    The correct answer is **C**. A Sankey diagram visualizes flows between stages or categories, where the width of each connecting line (or band) is proportional to the quantity being transferred. Sankey diagrams are effective for showing energy flows, budget allocations, user journeys, and any system where tracking the magnitude of transfers between stages is important.

    **Concept Tested:** Sankey Diagram

---

#### 7. When selecting a JavaScript visualization library, what is the most important factor to consider?

<div class="upper-alpha" markdown>
1. The library with the most GitHub stars
2. The library that was released most recently
3. The match between the library's strengths and your specific infographic requirements
4. The library with the smallest file size
</div>

??? question "Show Answer"
    The correct answer is **C**. Library selection should be driven by the match between the library's strengths and your specific requirements. p5.js excels at custom drawing, Chart.js at standard charts, D3.js at complex data-driven visualizations, vis-network at network graphs, and Leaflet at geographic maps. Choosing the right tool for the task produces better results with less effort.

    **Concept Tested:** Library Selection

---

#### 8. What is the difference between a pie chart and a donut chart?

<div class="upper-alpha" markdown>
1. A pie chart shows percentages and a donut chart shows absolute values
2. A donut chart has a hollow center, which can display summary information, while a pie chart is a solid filled circle
3. A pie chart can show more categories than a donut chart
4. A donut chart is interactive while a pie chart is always static
</div>

??? question "Show Answer"
    The correct answer is **B**. A donut chart is a pie chart with a hollow center. The center space can be used to display summary statistics (like a total value or percentage) while the ring shows the proportional breakdown. Both show parts of a whole, but the donut chart provides additional space for context information.

    **Concept Tested:** Donut Chart, Pie Chart

---

#### 9. A designer needs to visualize how 200 concepts in a learning graph connect through prerequisite relationships. Which library is the best choice?

<div class="upper-alpha" markdown>
1. Chart.js
2. Leaflet
3. vis-network
4. p5.js
</div>

??? question "Show Answer"
    The correct answer is **C**. vis-network is purpose-built for network graph visualization with support for hundreds of nodes and edges, physics-based layouts that automatically arrange nodes, clustering for managing complexity, and interactive features like dragging, zooming, and hover tooltips. A learning graph with 200 concepts and prerequisite edges is a natural fit for vis-network.

    **Concept Tested:** vis-network Library, Library Selection

---

#### 10. What is a dashboard layout in the context of data visualization?

<div class="upper-alpha" markdown>
1. A single large chart that fills the entire screen
2. A login page for an analytics application
3. A composite layout that arranges multiple coordinated charts and visualizations in a grid to provide an at-a-glance overview of key metrics
4. A navigation menu that links to different chart pages
</div>

??? question "Show Answer"
    The correct answer is **C**. A dashboard layout arranges multiple coordinated visualizations — charts, gauges, sparklines, and key metrics — in a grid layout that provides an at-a-glance overview. Dashboards are effective for monitoring, reporting, and decision-making contexts where stakeholders need to see multiple data dimensions simultaneously.

    **Concept Tested:** Dashboard Layout
