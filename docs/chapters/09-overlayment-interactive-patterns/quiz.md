# Quiz: Overlayment Interactive Patterns

Test your understanding of the four overlayment patterns, overlay JSON format, and edit mode.

---

#### 1. What is an overlayment pattern?

<div class="upper-alpha" markdown>
1. A CSS technique for stacking multiple background images
2. A method for adding interactive regions, labels, and infoboxes on top of a base image to create an interactive infographic
3. A JavaScript library for creating overlay animations
4. A file compression technique for reducing image sizes
</div>

??? question "Show Answer"
    The correct answer is **B**. An overlayment pattern is a technique for transforming static images into interactive learning experiences by adding interactive regions, labels, callouts, and infoboxes on top of a base illustration, photograph, or diagram. The overlay configuration is stored in a JSON file and rendered by a shared JavaScript driver.

    **Concept Tested:** Overlayment Pattern

---

#### 2. What are the four types of overlayment interactive infographic patterns?

<div class="upper-alpha" markdown>
1. Static, animated, interactive, and responsive
2. Type 1 rectangular regions, Type 2 complex polygons, Type 3 callout-to-edge labels, and Type 4 floating labels
3. Hover, click, drag, and scroll patterns
4. Canvas, SVG, WebGL, and CSS patterns
</div>

??? question "Show Answer"
    The correct answer is **B**. The four overlayment patterns are: Type 1 (simple non-overlapping rectangular regions with hover and click events), Type 2 (complex polygon regions with multi-edge overlays for irregular shapes), Type 3 (callout points with edge-aligned labels and numbered indicators), and Type 4 (callout points with floating labels and draggable positioning).

    **Concept Tested:** Type 1 Rectangular, Type 2 Complex Polygon, Type 3 Callout to Edge, Type 4 Floating Label

---

#### 3. What does the overlay JSON file contain?

<div class="upper-alpha" markdown>
1. The base image encoded as a Base64 string
2. JavaScript code for rendering the interactive overlay
3. Configuration data defining region coordinates, labels, descriptions, and interactive behavior for each overlay element
4. CSS styling rules for the infobox and label appearance
</div>

??? question "Show Answer"
    The correct answer is **C**. The overlay JSON file (overlay.json or data.json) contains the configuration data that defines each interactive element: region coordinates (as rectangles, polygons, or callout points), label text, descriptions for infoboxes, and settings for interactive behavior. This data-driven approach separates content from code, making infographics easy to update and maintain.

    **Concept Tested:** Overlay JSON File

---

#### 4. When would you use a Type 2 complex polygon overlay instead of a Type 1 rectangular overlay?

<div class="upper-alpha" markdown>
1. When the infographic has fewer than three regions
2. When the regions have irregular, non-rectangular boundaries that cannot be accurately represented by axis-aligned boxes
3. When the infographic needs to work on mobile devices
4. When the base image is a photograph rather than a drawing
</div>

??? question "Show Answer"
    The correct answer is **B**. Type 2 complex polygon overlays use multi-point polygon regions that can follow irregular boundaries — such as country shapes on a map, organelle boundaries in a cell diagram, or component outlines in a circuit board. Type 1 rectangular overlays are limited to axis-aligned boxes, which work well for grid-like layouts but cannot accurately represent irregular shapes.

    **Concept Tested:** Type 2 Complex Polygon, Polygon Region

---

#### 5. What is a numbered indicator in a Type 3 callout-to-edge pattern?

<div class="upper-alpha" markdown>
1. A page number displayed in the corner of the infographic
2. A small circled number placed on the diagram at a callout point, connected by a line to its label positioned at the edge of the image
3. A score counter that tracks how many regions the user has explored
4. A version number embedded in the metadata.json file
</div>

??? question "Show Answer"
    The correct answer is **B**. In a Type 3 callout-to-edge pattern, numbered indicators are small circled numbers placed directly on the diagram at each callout point. A connecting line extends from each indicator to its corresponding label, which is aligned along the edge of the image. This keeps the diagram clean while providing clear identification of each part.

    **Concept Tested:** Numbered Indicator, Type 3 Callout to Edge

---

#### 6. What is the purpose of the overlay diagram driver?

<div class="upper-alpha" markdown>
1. A hardware device that connects the computer to a display projector
2. A shared JavaScript library that reads overlay JSON data and renders the interactive regions, labels, and event handlers on any base image
3. A database driver for storing overlay configurations on a server
4. A print driver that formats the overlay for paper output
</div>

??? question "Show Answer"
    The correct answer is **B**. The overlay diagram driver is a shared JavaScript library (overlay-diagram.js) that reads the overlay JSON configuration and renders the interactive overlay on any base image. It handles hit detection, hover and click events, infobox display, and label rendering. Using a shared driver means multiple infographics can share the same interaction code, with only the JSON data changing.

    **Concept Tested:** Overlay Diagram Driver

---

#### 7. What is the "show numbers toggle" feature in a Type 3 callout overlay?

<div class="upper-alpha" markdown>
1. A toggle that shows or hides page numbers in the textbook
2. A control that switches between showing numbered indicators on the diagram and hiding them for a cleaner view or quiz mode
3. A setting that displays the total count of regions in the infographic
4. A debug feature that shows coordinate values on each callout point
</div>

??? question "Show Answer"
    The correct answer is **B**. The show numbers toggle is an interactive control that allows users to show or hide the numbered indicators on a Type 3 callout diagram. When hidden, the diagram presents a clean view suitable for quiz mode where learners must identify regions without the aid of numbered labels. When shown, the numbers provide reference points for learning.

    **Concept Tested:** Show Numbers Toggle

---

#### 8. What distinguishes Type 4 floating labels from Type 3 edge-aligned labels?

<div class="upper-alpha" markdown>
1. Type 4 labels are larger in font size than Type 3 labels
2. Type 4 labels can be dragged to any position by the designer, while Type 3 labels are fixed along the image edges
3. Type 4 labels use color coding while Type 3 labels are always black
4. Type 4 labels support only hover events while Type 3 supports click events
</div>

??? question "Show Answer"
    The correct answer is **B**. Type 4 floating labels can be positioned anywhere on or near the diagram through draggable positioning, giving designers maximum flexibility in label placement. Type 3 edge-aligned labels are fixed along the edges of the image, connected to callout points by lines. Floating labels are ideal when edge alignment would create cluttered or crossing lines.

    **Concept Tested:** Type 4 Floating Label, Floating Label, Draggable Positioning

---

#### 9. What is edit mode used for in overlayment infographics?

<div class="upper-alpha" markdown>
1. Allowing students to modify the infographic content during a quiz
2. Enabling designers to visually calibrate region coordinates, callout positions, and label placements by dragging elements and exporting updated JSON
3. Switching the infographic from a dark theme to a light theme
4. Converting the infographic from interactive to static format for printing
</div>

??? question "Show Answer"
    The correct answer is **B**. Edit mode is a designer tool that allows visual calibration of overlay positions. In edit mode, designers can drag region boundaries, callout points, and labels to their correct positions on the base image, then export the updated coordinates as JSON. This eliminates the need to manually calculate pixel or percentage coordinates by hand.

    **Concept Tested:** Edit Mode

---

#### 10. A designer has a photograph of a printed circuit board and needs to add interactive hover regions over irregularly shaped components. Which overlayment pattern type should they use?

<div class="upper-alpha" markdown>
1. Type 1 — rectangular regions
2. Type 2 — complex polygon regions
3. Type 3 — callout-to-edge labels
4. Type 4 — floating labels
</div>

??? question "Show Answer"
    The correct answer is **B**. Type 2 complex polygon overlays are designed for irregularly shaped regions that cannot be accurately represented by rectangular boxes. Circuit board components have varied shapes (rectangular chips, cylindrical capacitors, irregular routing), making polygon regions with multiple edge points the best choice for precise hit detection and highlighting.

    **Concept Tested:** Type 2 Complex Polygon, Polygon Region
