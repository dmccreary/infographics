# Quiz: Web Fundamentals — Structure, Style, and Data

Test your understanding of HTML, CSS, data formats, coordinate geometry, and iframe security for interactive infographics.

---

#### 1. What is the role of HTML in building interactive infographics?

<div class="upper-alpha" markdown>
1. HTML provides the visual styling including colors, fonts, and layout
2. HTML provides the document structure — the skeleton of elements that define the content and its organization
3. HTML handles user interactions like click and hover events
4. HTML stores data in key-value pairs for dynamic content
</div>

??? question "Show Answer"
    The correct answer is **B**. HTML (HyperText Markup Language) provides the document structure — the skeleton of elements that define content and its organization. Elements like `<div>`, `<canvas>`, `<iframe>`, and `<p>` create the structural framework. CSS handles styling and JavaScript handles interactivity.

    **Concept Tested:** HTML Structure

---

#### 2. What is the difference between JSON and CSV data formats?

<div class="upper-alpha" markdown>
1. JSON is for images and CSV is for text
2. JSON supports nested, hierarchical data structures while CSV stores flat, tabular data in rows and columns
3. JSON is a programming language while CSV is a markup language
4. JSON can only store numbers while CSV can store any data type
</div>

??? question "Show Answer"
    The correct answer is **B**. JSON (JavaScript Object Notation) supports nested, hierarchical data structures with objects, arrays, strings, and numbers — ideal for complex configuration like overlay regions. CSV (Comma-Separated Values) stores flat, tabular data in rows and columns — ideal for simple datasets like learning graph edges. Both are commonly used to drive dynamic infographic content.

    **Concept Tested:** JSON Format, CSV Format

---

#### 3. What is the fundamental difference between the Canvas element and the SVG element for graphics?

<div class="upper-alpha" markdown>
1. Canvas is for 3D graphics and SVG is for 2D graphics
2. Canvas draws pixels on a bitmap that cannot be individually manipulated after drawing, while SVG creates DOM elements that remain individually accessible and manipulable
3. Canvas only works in Chrome while SVG works in all browsers
4. Canvas is newer technology that has replaced SVG entirely
</div>

??? question "Show Answer"
    The correct answer is **B**. The Canvas element provides a bitmap drawing surface where pixels are painted and cannot be individually selected or manipulated after drawing — ideal for p5.js animations. The SVG element creates vector graphics as DOM elements that remain individually accessible, stylable, and event-responsive — ideal for D3.js data visualizations.

    **Concept Tested:** Canvas Element, SVG Element

---

#### 4. What is hit detection in the context of interactive infographics?

<div class="upper-alpha" markdown>
1. A security feature that detects unauthorized access attempts
2. A performance metric measuring how often users click on the infographic
3. The process of determining whether a user's pointer position falls within a defined region
4. A testing technique for finding bugs in JavaScript code
</div>

??? question "Show Answer"
    The correct answer is **C**. Hit detection is the process of determining whether a user's pointer position (mouse or touch) falls within a defined interactive region. For rectangular regions, this involves bounding box checks. For irregular shapes, a point-in-polygon test is used. Hit detection is essential for making hover and click events work on specific diagram regions.

    **Concept Tested:** Hit Detection

---

#### 5. Why do MicroSims use relative coordinates (percentages) instead of pixel coordinates for defining regions?

<div class="upper-alpha" markdown>
1. Percentages are easier to type than pixel values
2. Browsers cannot process pixel coordinate values
3. Relative coordinates scale proportionally when the infographic resizes, supporting width-responsive design
4. Pixel coordinates are deprecated in modern web standards
</div>

??? question "Show Answer"
    The correct answer is **C**. Relative coordinates (percentages from 0-100) scale proportionally when the infographic resizes to different screen widths. This is essential for width-responsive design — when the canvas scales from 600px to 1400px, percentage-based region definitions automatically adjust. Pixel coordinates would require recalculation for every screen size.

    **Concept Tested:** Relative Coordinates, Pixel Coordinates

---

#### 6. What is a bounding box used for in interactive infographics?

<div class="upper-alpha" markdown>
1. A decorative border drawn around the entire infographic
2. A rectangular area defined by minimum and maximum x,y coordinates that encloses a region for quick hit detection
3. A text container for displaying infobox content
4. A security boundary that prevents scripts from accessing external resources
</div>

??? question "Show Answer"
    The correct answer is **B**. A bounding box is the smallest axis-aligned rectangle that completely encloses a region, defined by its minimum and maximum x,y coordinates. It provides a fast first-pass check for hit detection — if the pointer is outside the bounding box, it cannot be inside the region, avoiding the more expensive point-in-polygon test.

    **Concept Tested:** Bounding Box

---

#### 7. What is a media query in CSS?

<div class="upper-alpha" markdown>
1. A database query that retrieves media files from a server
2. A JavaScript function for loading images and videos
3. A CSS rule that applies different styles based on device characteristics such as screen width
4. An HTML element for embedding audio and video content
</div>

??? question "Show Answer"
    The correct answer is **C**. A media query is a CSS feature that applies different style rules based on device characteristics such as screen width, height, or orientation. Media queries enable responsive breakpoints — for example, switching from a two-column layout to single-column when the viewport width drops below 800px.

    **Concept Tested:** Media Query

---

#### 8. What is the same-origin policy and why is it relevant to MicroSim iframes?

<div class="upper-alpha" markdown>
1. A design guideline requiring all MicroSims to use the same color scheme
2. A browser security rule that restricts how documents from different origins can interact, protecting embedded MicroSims from unauthorized access
3. A naming convention requiring all files in a MicroSim to have the same prefix
4. A version control policy requiring all team members to commit to the same branch
</div>

??? question "Show Answer"
    The correct answer is **B**. The same-origin policy is a browser security mechanism that restricts how documents or scripts from one origin (protocol + domain + port) can interact with resources from another origin. This is relevant to MicroSim iframes because it governs whether the parent textbook page and the embedded MicroSim can communicate, which is why cross-origin messaging via postMessage is needed.

    **Concept Tested:** Same-Origin Policy

---

#### 9. A designer needs to determine whether a user clicked inside an irregularly shaped country on a map infographic. Which technique should they use?

<div class="upper-alpha" markdown>
1. Bounding box check only
2. CSS hover pseudo-class
3. Point-in-polygon test
4. Aspect ratio calculation
</div>

??? question "Show Answer"
    The correct answer is **C**. A point-in-polygon test determines whether a point (the click location) falls inside a polygon defined by multiple vertices. This is necessary for irregularly shaped regions like country boundaries that cannot be accurately represented by simple bounding boxes. The ray-casting algorithm is a common implementation that counts how many times a ray from the point crosses the polygon's edges.

    **Concept Tested:** Point-in-Polygon Test

---

#### 10. What is CDN script loading and why is it used for JavaScript visualization libraries?

<div class="upper-alpha" markdown>
1. A technique for compressing JavaScript files to reduce their size
2. Loading JavaScript libraries from a Content Delivery Network, which provides faster delivery from geographically distributed servers and avoids bundling large libraries locally
3. A security protocol for encrypting JavaScript code during transmission
4. A method for converting JavaScript code to run on mobile devices
</div>

??? question "Show Answer"
    The correct answer is **B**. CDN (Content Delivery Network) script loading means referencing JavaScript libraries from a remote CDN server rather than including them locally. CDNs provide faster delivery through geographically distributed servers, automatic caching, and version management. MicroSims use CDN loading for libraries like p5.js, D3.js, and Chart.js to keep the MicroSim directory lightweight.

    **Concept Tested:** CDN Script Loading
