# Quiz: Foundations of Interactive Infographics

Test your understanding of the core vocabulary and concepts for building interactive infographics in intelligent textbooks.

---

#### 1. What is an infographic?

<div class="upper-alpha" markdown>
1. A JavaScript library for creating web animations
2. A visual representation of information designed to present complex information quickly and clearly
3. A type of database used for storing educational content
4. A file format for embedding images in web pages
</div>

??? question "Show Answer"
    The correct answer is **B**. An infographic combines "information" and "graphic" to create a visual representation that communicates complex information quickly and clearly. It uses shapes, colors, and positions to encode data, achieving higher information density and cognitive efficiency than text alone.

    **Concept Tested:** Infographic

---

#### 2. What is the key difference between an interactive infographic and a static infographic?

<div class="upper-alpha" markdown>
1. Interactive infographics use higher resolution images
2. Interactive infographics are always larger in file size
3. Interactive infographics respond to user input in real time, allowing exploration and manipulation
4. Interactive infographics require a paid software license to create
</div>

??? question "Show Answer"
    The correct answer is **C**. The defining characteristic of an interactive infographic is that it responds to user input — hover, click, drag, and parameter adjustments — in real time. This puts the learner in control, transforming passive viewing into active exploration. Static infographics show a single fixed view regardless of user actions.

    **Concept Tested:** Interactive Infographic

---

#### 3. Which type of infographic adds movement and time-based transitions but does not allow the viewer to control the sequence?

<div class="upper-alpha" markdown>
1. Animated infographic
2. Interactive infographic
3. Static infographic
4. Responsive infographic
</div>

??? question "Show Answer"
    The correct answer is **A**. Animated infographics add movement and time-based transitions to visual presentations, making them effective for showing processes. However, like static infographics, they present a predetermined sequence that the viewer cannot control, pause at will, or explore interactively.

    **Concept Tested:** Animated Infographic

---

#### 4. What is a MicroSim in the context of intelligent textbooks?

<div class="upper-alpha" markdown>
1. A small computer used for running simulations
2. A JavaScript testing framework for educational content
3. A browser extension for viewing interactive diagrams
4. A self-contained, standard packaging format for interactive content designed to be embedded via an iframe
</div>

??? question "Show Answer"
    The correct answer is **D**. A MicroSim (Micro Simulation) is the standard packaging format for interactive content within intelligent textbooks. It is a self-contained directory with its own HTML, JavaScript, data files, and metadata, designed to be embedded in a textbook chapter via an iframe element.

    **Concept Tested:** MicroSim

---

#### 5. Which files make up the standard MicroSim directory structure?

<div class="upper-alpha" markdown>
1. index.html, style.css, app.js, and README.md
2. main.html, index.md, metadata.json, and optionally data.json
3. page.html, content.md, config.yaml, and assets folder
4. sim.html, docs.md, schema.json, and overlay.csv
</div>

??? question "Show Answer"
    The correct answer is **B**. Every MicroSim follows a consistent architecture: `main.html` (the interactive experience), `index.md` (the MkDocs documentation page), `metadata.json` (Dublin Core metadata for discoverability), and optionally `data.json` (configuration data for regions, labels, and settings). The entry point is always `main.html`, not `index.html`.

    **Concept Tested:** MicroSim Architecture

---

#### 6. Why does the iframe element provide a valuable isolation benefit when embedding MicroSims?

<div class="upper-alpha" markdown>
1. The MicroSim's JavaScript runs in its own execution context, preventing interference with the textbook's navigation and styling
2. The iframe blocks all network requests from the embedded content
3. The iframe automatically translates the MicroSim content into multiple languages
4. The iframe compresses the MicroSim files for faster loading
</div>

??? question "Show Answer"
    The correct answer is **A**. Iframes provide critical isolation because the MicroSim's JavaScript runs in its own execution context. This means the interactive content cannot accidentally interfere with the textbook's navigation, styling, or other interactive elements, making it safe to embed many MicroSims from different authors across a single textbook.

    **Concept Tested:** Iframe Element

---

#### 7. What is the primary purpose of width-responsive design in MicroSims?

<div class="upper-alpha" markdown>
1. To make the infographic load faster on slow connections
2. To allow the infographic to be printed at different paper sizes
3. To ensure the infographic looks great and functions correctly across screen widths from 600px to 1,400px
4. To enable the infographic to switch between light and dark color themes
</div>

??? question "Show Answer"
    The correct answer is **C**. Width-responsive design ensures that interactive infographics display correctly across the range of screen widths found in intelligent textbook deployments — from 600-pixel mobile views to 1,400-pixel desktop layouts. This is achieved through techniques like `windowResized()` functions, proportional text scaling, and reflowing control elements.

    **Concept Tested:** Width-Responsive Design

---

#### 8. What is an infobox and what positioning strategy is recommended as the default for intelligent textbooks?

<div class="upper-alpha" markdown>
1. A modal dialog that covers the entire screen; center positioning is recommended
2. A sidebar menu for navigating between chapters; left-side positioning is recommended
3. A pop-up notification about errors; top-right positioning is recommended
4. A content panel that appears when a student interacts with a region; below-diagram positioning is recommended
</div>

??? question "Show Answer"
    The correct answer is **D**. An infobox is a content panel that appears when a student interacts with a region, serving as the primary mechanism for progressive disclosure. The below-diagram positioning strategy is recommended as the default because it works reliably across all screen sizes and never obscures the student's view of the infographic.

    **Concept Tested:** Infobox, Infobox Positioning

---

#### 9. An instructional designer is building an interactive diagram of a biological cell with irregularly shaped organelles. Which type of region would best fit these irregular boundaries?

<div class="upper-alpha" markdown>
1. Polygon regions that follow the irregular boundaries with multiple edge points
2. Rectangular regions aligned to the horizontal and vertical axes
3. Circular regions defined by center points and radii
4. Text regions that display labels without boundaries
</div>

??? question "Show Answer"
    The correct answer is **A**. Polygon regions use multiple coordinate points to define complex, multi-point shapes that can follow irregular boundaries. Rectangular regions are limited to axis-aligned boxes suitable for non-overlapping grid layouts, and circular regions are best for simple callout markers. For organelles with curved, irregular shapes, polygon regions provide the closest fit.

    **Concept Tested:** Region

---

#### 10. What is the correct three-step pattern that all event handlers follow in interactive infographics?

<div class="upper-alpha" markdown>
1. Load data → Render canvas → Save state
2. Authenticate user → Log event → Send notification
3. Detect the event → Identify the target region → Update the display
4. Parse JSON → Validate schema → Write to database
</div>

??? question "Show Answer"
    The correct answer is **C**. Every interactive infographic follows the same fundamental event handling loop: first detect the event (hover, click, or selection), then identify which region was targeted using hit detection, and finally update the display by showing the infobox and highlighting the region. This pattern applies whether building a simple labeled diagram or a complex polygon overlay.

    **Concept Tested:** Event Handler
