# Quiz: Web Fundamentals — JavaScript and Responsive Design

Test your understanding of modern JavaScript, animation, state management, design patterns, and responsive layout strategies.

---

#### 1. What is an animation loop in JavaScript and why is it important for interactive infographics?

<div class="upper-alpha" markdown>
1. A CSS property that repeats background images across the page
2. A continuously running function that redraws the canvas at a target frame rate, enabling smooth visual updates in response to user interaction
3. A JavaScript loop that downloads animation files from a server
4. An HTML element that plays animated GIF files in sequence
</div>

??? question "Show Answer"
    The correct answer is **B**. An animation loop is a function (such as p5.js's `draw()` or `requestAnimationFrame()`) that runs continuously at a target frame rate, redrawing the canvas each frame. This is essential for interactive infographics because it allows the display to update smoothly in response to hover events, parameter changes, and animations.

    **Concept Tested:** Animation Loop

---

#### 2. What is state management in the context of interactive infographics?

<div class="upper-alpha" markdown>
1. Managing the geographic location of servers hosting the infographic
2. Tracking and organizing the current values of all variables that determine what the infographic displays at any moment
3. Managing user login sessions and authentication states
4. Controlling which U.S. state data is displayed on a map
</div>

??? question "Show Answer"
    The correct answer is **B**. State management refers to tracking and organizing all the variables that determine the current display — which region is hovered, which mode is active, what parameter values are set, and what data is loaded. Good state management ensures the infographic responds consistently to user interactions and avoids bugs from conflicting variable values.

    **Concept Tested:** State Management

---

#### 3. What is an arrow function in modern JavaScript?

<div class="upper-alpha" markdown>
1. A function that draws arrow shapes on the canvas
2. A concise function syntax using `=>` that provides shorter notation and lexical `this` binding
3. A function that navigates between pages using forward and back arrows
4. A special function for handling keyboard arrow key events
</div>

??? question "Show Answer"
    The correct answer is **B**. An arrow function is a concise syntax for writing JavaScript functions using the `=>` notation (e.g., `const double = x => x * 2`). Arrow functions provide shorter code and importantly bind `this` lexically, which avoids common bugs in event handlers and callbacks within interactive infographics.

    **Concept Tested:** Arrow Function

---

#### 4. What is the mobile-first design approach for responsive infographics?

<div class="upper-alpha" markdown>
1. Designing infographics that only work on mobile phones
2. Designing for the smallest screen first, then progressively enhancing the layout for larger screens using breakpoints
3. Testing infographics on mobile before testing on desktop
4. Using mobile-specific JavaScript APIs instead of standard web APIs
</div>

??? question "Show Answer"
    The correct answer is **B**. Mobile-first design means starting with the layout for the smallest screen (typically 600px), then using responsive breakpoints and media queries to progressively enhance the design for tablet (800-1100px) and desktop (1100-1400px) layouts. This approach ensures the base experience works on all devices.

    **Concept Tested:** Mobile-First Design

---

#### 5. What is the Observer Pattern and how is it used in interactive infographics?

<div class="upper-alpha" markdown>
1. A pattern where one user observes another user's screen
2. A design pattern where an object maintains a list of dependents and notifies them automatically when state changes, enabling event-driven updates
3. A debugging technique where the developer watches variables in the console
4. A security pattern that monitors for suspicious user activity
</div>

??? question "Show Answer"
    The correct answer is **B**. The Observer Pattern is a design pattern where a subject object maintains a list of observers (dependents) and notifies them automatically when its state changes. In interactive infographics, this pattern connects UI controls (sliders, buttons) to the display — when a slider value changes, all dependent visual elements update automatically.

    **Concept Tested:** Observer Pattern

---

#### 6. What is a configuration object in JavaScript?

<div class="upper-alpha" markdown>
1. A file that stores the infographic's metadata in Dublin Core format
2. A browser setting that controls JavaScript execution permissions
3. An object literal that groups related settings and parameters into a single structured variable, making code more readable and maintainable
4. A server-side database record that stores user preferences
</div>

??? question "Show Answer"
    The correct answer is **C**. A configuration object is an object literal that groups related settings (colors, dimensions, labels, data paths) into a single structured variable. This pattern makes infographic code more readable and maintainable by centralizing all configurable values in one place rather than scattering magic numbers throughout the code.

    **Concept Tested:** Configuration Object

---

#### 7. What are browser developer tools used for when building interactive infographics?

<div class="upper-alpha" markdown>
1. Designing the visual layout of the infographic using drag-and-drop
2. Inspecting HTML elements, debugging JavaScript with console logging, monitoring network requests, and profiling performance
3. Automatically generating JavaScript code from visual designs
4. Publishing the infographic to a web hosting service
</div>

??? question "Show Answer"
    The correct answer is **B**. Browser developer tools provide essential debugging capabilities: inspecting and modifying HTML/CSS in real time, logging values with `console.log()`, monitoring network requests in the Network tab to verify data file loading, and profiling performance to identify rendering bottlenecks. These tools are indispensable for building and troubleshooting interactive infographics.

    **Concept Tested:** Browser Developer Tools

---

#### 8. What is progressive enhancement?

<div class="upper-alpha" markdown>
1. A strategy that starts with a basic, functional experience and adds advanced features for browsers that support them
2. A method for gradually increasing the difficulty of quiz questions
3. A technique for progressively loading larger image files as bandwidth allows
4. A project management approach that adds features in sequential sprints
</div>

??? question "Show Answer"
    The correct answer is **A**. Progressive enhancement is a web development strategy that starts with a basic, universally functional experience (working HTML and CSS) and progressively adds advanced features (JavaScript interactivity, animations, advanced APIs) for browsers that support them. This ensures the infographic degrades gracefully in older or limited environments.

    **Concept Tested:** Progressive Enhancement

---

#### 9. A developer notices their infographic animation runs smoothly on desktop but stutters on a tablet. Which browser developer tool should they use first to diagnose the issue?

<div class="upper-alpha" markdown>
1. Console logging
2. Network tab debugging
3. Performance profiling
4. Element inspector
</div>

??? question "Show Answer"
    The correct answer is **C**. Performance profiling records the browser's rendering activity over time, showing frame rates, JavaScript execution time, layout calculations, and paint operations. This reveals which operations are causing the stutter — whether it is expensive drawing calls, excessive DOM updates, or layout thrashing — enabling targeted optimization.

    **Concept Tested:** Performance Profiling

---

#### 10. What is destructuring in JavaScript and why is it useful?

<div class="upper-alpha" markdown>
1. A process of breaking down large files into smaller modules
2. A technique for removing unused code from a JavaScript bundle
3. A syntax for extracting values from objects and arrays into individual variables, reducing verbose property access code
4. A method for deleting DOM elements from the page
</div>

??? question "Show Answer"
    The correct answer is **C**. Destructuring is a JavaScript syntax that extracts values from objects and arrays into individual variables (e.g., `const { x, y, label } = region`). This reduces verbose property access code and makes it easier to work with the data structures common in infographic configuration files, such as region definitions and metadata objects.

    **Concept Tested:** Destructuring
