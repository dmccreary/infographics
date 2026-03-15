# Quiz: MicroSim Standards and Packaging

Test your understanding of MicroSim directory structure, metadata, quality scoring, and deployment standards.

---

#### 1. What is the required name for the interactive HTML file in every MicroSim directory?

<div class="upper-alpha" markdown>
1. index.html
2. main.html
3. sim.html
4. app.html
</div>

??? question "Show Answer"
    The correct answer is **B**. Every MicroSim uses `main.html` as the entry point for the interactive experience — never `index.html`. The `index.md` file is reserved for the MkDocs documentation page. This naming convention prevents conflicts with the MkDocs build system and maintains a clear separation between the interactive content and its documentation.

    **Concept Tested:** main.html File

---

#### 2. What is Dublin Core metadata and why is it used in MicroSims?

<div class="upper-alpha" markdown>
1. A JavaScript framework for building user interfaces in web applications
2. A standardized set of metadata fields (title, creator, description, subject) that makes MicroSims discoverable and catalogable across systems
3. A CSS color palette used for consistent visual styling
4. A database schema for storing student interaction data
</div>

??? question "Show Answer"
    The correct answer is **B**. Dublin Core is an internationally recognized metadata standard with fields like title, creator, description, subject, date, and format. The metadata.json file in each MicroSim directory uses Dublin Core fields to make the infographic discoverable, catalogable, and searchable across educational platforms and repositories.

    **Concept Tested:** Dublin Core Metadata, metadata.json File

---

#### 3. What is the standard visual layout convention for a MicroSim?

<div class="upper-alpha" markdown>
1. A white background throughout with no visual distinction between areas
2. An aliceblue drawing region above a white control region, separated by silver borders
3. A dark mode interface with neon-colored interactive elements
4. A full-screen canvas with controls overlaid on top of the drawing area
</div>

??? question "Show Answer"
    The correct answer is **B**. The standard MicroSim layout uses an aliceblue (#F0F8FF) drawing region for the interactive canvas above a white control region for sliders, buttons, and dropdowns, separated by silver borders. This consistent visual convention helps students recognize interactive content and distinguishes the drawing area from controls across all MicroSims.

    **Concept Tested:** Aliceblue Drawing Region, White Control Region, Silver Border

---

#### 4. What is the purpose of the postMessage API in MicroSim iframe embedding?

<div class="upper-alpha" markdown>
1. Sending email notifications when a student completes the MicroSim
2. Enabling the MicroSim to communicate its actual height to the parent page for automatic iframe resizing
3. Posting student scores to a learning management system
4. Sending error messages to the browser's developer console
</div>

??? question "Show Answer"
    The correct answer is **B**. The postMessage API enables cross-origin communication between the MicroSim iframe and the parent textbook page. MicroSims send a height message (`{type: 'microsim-resize', height: height}`) so the parent page can automatically adjust the iframe height to fit the content, eliminating unnecessary scrollbars and white space.

    **Concept Tested:** postMessage API, Iframe Height Reporting

---

#### 5. What does the MicroSim Quality Rubric measure?

<div class="upper-alpha" markdown>
1. The file size and download speed of the MicroSim
2. The artistic quality and color harmony of the visual design
3. A comprehensive quality score on a 100-point scale covering functionality, responsiveness, metadata, documentation, and standards compliance
4. The number of user interactions recorded during testing
</div>

??? question "Show Answer"
    The correct answer is **C**. The MicroSim Quality Rubric evaluates interactive infographics on a 100-point scale across multiple dimensions including functional correctness, width-responsive behavior, metadata completeness, documentation quality, visual consistency (aliceblue/white/silver), accessibility, and compliance with packaging standards.

    **Concept Tested:** MicroSim Quality Rubric, Quality Score

---

#### 6. What is a copy-paste iframe and how does it differ from a display iframe?

<div class="upper-alpha" markdown>
1. A copy-paste iframe is a backup copy stored on a different server
2. A display iframe renders the MicroSim in the textbook page, while a copy-paste iframe provides a ready-to-embed code snippet that others can copy to embed the MicroSim on their own pages
3. A copy-paste iframe uses a different file format than a display iframe
4. There is no difference — they are the same thing with different names
</div>

??? question "Show Answer"
    The correct answer is **B**. A display iframe is the actual embedded `<iframe>` element that renders the MicroSim within a textbook chapter. A copy-paste iframe is a code snippet (typically shown in a copyable text box) that provides the complete iframe embed code for others to copy and paste into their own web pages, enabling MicroSim reuse beyond the original textbook.

    **Concept Tested:** Display Iframe, Copy-Paste Iframe

---

#### 7. What is YAML frontmatter used for in a MicroSim's index.md file?

<div class="upper-alpha" markdown>
1. Defining the JavaScript animation parameters for the MicroSim
2. Specifying page-level metadata including title, description, quality score, and social preview image configuration
3. Storing the overlay region coordinates in a structured format
4. Configuring the web server settings for hosting the MicroSim
</div>

??? question "Show Answer"
    The correct answer is **B**. YAML frontmatter at the top of the index.md file (enclosed in `---` markers) specifies page-level metadata that MkDocs uses for SEO, navigation, and social sharing. This includes the title, description, quality score, and Open Graph image configuration for social media preview cards.

    **Concept Tested:** YAML Frontmatter, Title Metadata, Description Metadata

---

#### 8. What is the gh-deploy command used for?

<div class="upper-alpha" markdown>
1. Deploying a Git repository to a private enterprise server
2. Publishing the MkDocs Material site including all MicroSims to GitHub Pages
3. Creating a new GitHub repository from a template
4. Generating a deployment report for the project manager
</div>

??? question "Show Answer"
    The correct answer is **B**. The `mkdocs gh-deploy` command builds the MkDocs Material site and publishes it to GitHub Pages, making the intelligent textbook and all its embedded MicroSims publicly accessible on the web. This is the standard deployment method for intelligent textbooks in this course.

    **Concept Tested:** gh-deploy Command

---

#### 9. A designer creates a new MicroSim but forgets to include a metadata.json file. What capability is lost?

<div class="upper-alpha" markdown>
1. The MicroSim will not render in the browser
2. The MicroSim loses discoverability and cannot be cataloged or searched across educational platforms
3. The MicroSim's interactive features will stop working
4. The MicroSim cannot be embedded in an iframe
</div>

??? question "Show Answer"
    The correct answer is **B**. Without metadata.json, the MicroSim still functions technically — it renders and responds to interactions. However, it loses the Dublin Core metadata (title, creator, description, subject) that makes it discoverable, catalogable, and searchable. This matters for reuse across textbooks, integration with learning management systems, and AI-assisted content discovery.

    **Concept Tested:** metadata.json File, Dublin Core Metadata

---

#### 10. What is a template MicroSim and why is it valuable?

<div class="upper-alpha" markdown>
1. A MicroSim that uses template literal strings in its JavaScript code
2. A pre-built starter MicroSim with all required files and standard conventions already in place, enabling rapid creation of new infographics
3. A read-only MicroSim that cannot be modified by designers
4. A MicroSim that generates other MicroSims automatically
</div>

??? question "Show Answer"
    The correct answer is **B**. A template MicroSim is a pre-built starter directory containing main.html, index.md, metadata.json, and optionally data.json, all following standard conventions (aliceblue background, responsive layout, postMessage height reporting). Designers copy the template and customize it for their specific content, dramatically accelerating MicroSim creation while ensuring standards compliance.

    **Concept Tested:** Template MicroSim
