# Quiz: Tracking, Analytics, and Deployment

Test your understanding of xAPI tracking, engagement analytics, MkDocs deployment, and CI/CD workflows.

---

#### 1. What is xAPI (Experience API) and what role does it play in interactive infographics?

<div class="upper-alpha" markdown>
1. A JavaScript library for creating animated chart experiences
2. A standardized protocol for recording learning experiences as "actor-verb-object" statements, enabling tracking of student interactions with infographics
3. An API for exchanging data between different learning management systems
4. A testing framework for validating interactive infographic functionality
</div>

??? question "Show Answer"
    The correct answer is **B**. xAPI (Experience API) is a standardized protocol that records learning experiences as "actor-verb-object" statements (e.g., "Student hovered over Mitochondria region"). It enables tracking how students interact with interactive infographics — which regions they explore, how long they spend, and what quiz answers they select — providing data for learning analytics.

    **Concept Tested:** xAPI Protocol, Experience API

---

#### 2. What is a click heatmap used for in learning analytics?

<div class="upper-alpha" markdown>
1. Measuring the temperature of the server hosting the infographic
2. Visualizing where students click most frequently on an infographic, revealing which regions attract the most attention and interaction
3. Displaying real-time weather data overlaid on a geographic map
4. Measuring the performance speed of click event handlers in JavaScript
</div>

??? question "Show Answer"
    The correct answer is **B**. A click heatmap visualizes the frequency and location of student clicks across an interactive infographic. Areas with more clicks appear as warmer colors (red, orange), revealing which regions attract the most attention. This data helps designers identify popular areas, neglected regions, and potential usability issues.

    **Concept Tested:** Click Heatmap

---

#### 3. What is A/B testing in the context of interactive infographic design?

<div class="upper-alpha" markdown>
1. Testing the infographic in both browser A (Chrome) and browser B (Firefox)
2. Comparing two versions of an infographic by randomly showing each version to different students and measuring which produces better engagement or learning outcomes
3. Testing accessibility features with both sighted and visually impaired users
4. Comparing the file sizes of two different image compression formats
</div>

??? question "Show Answer"
    The correct answer is **B**. A/B testing is an experimental method that randomly presents users with one of two design variants and compares engagement and learning outcome metrics to determine which version is more effective. For example, testing whether below-diagram infoboxes (variant A) or side-panel infoboxes (variant B) lead to longer exploration times.

    **Concept Tested:** A/B Testing

---

#### 4. What is the MkDocs Material theme used for in this course?

<div class="upper-alpha" markdown>
1. A CSS framework for creating material design mobile applications
2. A static site generator theme that converts Markdown files into a professional, searchable, responsive intelligent textbook website
3. A JavaScript library for creating 3D material texture effects
4. A database management system for storing educational content
</div>

??? question "Show Answer"
    The correct answer is **B**. MkDocs Material is a theme for the MkDocs static site generator that converts Markdown files into a professional, searchable, responsive website. It provides features like side navigation, site search, social cards, admonition blocks, code highlighting, and Mermaid diagram support — making it ideal for building intelligent textbooks.

    **Concept Tested:** MkDocs Material Theme

---

#### 5. What is the mkdocs.yml file used for?

<div class="upper-alpha" markdown>
1. Storing the JavaScript code for all MicroSims
2. Configuring the site name, navigation structure, theme settings, plugins, and extensions for the MkDocs-powered textbook
3. Defining the Dublin Core metadata for the entire textbook
4. Storing student interaction data in YAML format
</div>

??? question "Show Answer"
    The correct answer is **B**. The mkdocs.yml file is the central configuration file for an MkDocs site. It defines the site name and URL, the navigation structure (which pages appear in which order), theme settings (colors, features), plugins (search, social cards), Markdown extensions (admonitions, code highlighting), and custom CSS/JS file references.

    **Concept Tested:** mkdocs.yml Configuration

---

#### 6. What is continuous deployment using GitHub Actions?

<div class="upper-alpha" markdown>
1. Manually uploading files to a web server every time content changes
2. An automated workflow that builds and deploys the textbook site to GitHub Pages whenever changes are pushed to the repository
3. A scheduled task that backs up the repository once per day
4. A notification system that alerts the team when new content is available
</div>

??? question "Show Answer"
    The correct answer is **B**. Continuous deployment with GitHub Actions automates the build-and-deploy pipeline. When changes are pushed to the repository, a GitHub Actions workflow automatically runs `mkdocs build` and deploys the result to GitHub Pages. This ensures the live site always reflects the latest content without manual deployment steps.

    **Concept Tested:** Continuous Deployment, GitHub Actions

---

#### 7. What engagement metrics can be collected from interactive infographics?

<div class="upper-alpha" markdown>
1. Only the number of page views
2. Session duration, completion rate, click frequency, hover patterns, quiz scores, and region exploration sequences
3. Only whether the student opened the page or not
4. Only the student's final exam grade
</div>

??? question "Show Answer"
    The correct answer is **B**. Interactive infographics can collect rich engagement metrics including session duration (how long students spend), completion rate (percentage of regions explored), click frequency and patterns, hover behavior, quiz answer accuracy, and the sequence in which regions are explored. These metrics enable data-driven improvements to infographic design.

    **Concept Tested:** Engagement Metrics, Session Duration, Completion Rate

---

#### 8. What is a pull request in the Git/GitHub workflow?

<div class="upper-alpha" markdown>
1. A request to download files from a remote server
2. A proposal to merge changes from one branch into another, enabling code review and discussion before integration
3. A request for a collaborator to pull their weight on the project
4. An automated process that pulls the latest data from an external API
</div>

??? question "Show Answer"
    The correct answer is **B**. A pull request is a GitHub feature that proposes merging changes from one branch into another (typically from a feature branch into main). It enables team members to review the proposed changes, discuss potential issues, suggest modifications, and approve the merge — ensuring quality control before changes reach the live site.

    **Concept Tested:** Pull Request

---

#### 9. What is usability testing and how does it differ from A/B testing?

<div class="upper-alpha" markdown>
1. Usability testing checks whether the code compiles without errors; A/B testing checks performance speed
2. Usability testing observes individual users interacting with the infographic to identify usability problems, while A/B testing compares two versions statistically across many users
3. Usability testing is for mobile devices; A/B testing is for desktop browsers
4. There is no meaningful difference between the two methods
</div>

??? question "Show Answer"
    The correct answer is **B**. Usability testing involves observing individual users as they interact with the infographic, identifying confusion points, navigation difficulties, and design problems through direct observation. A/B testing is a statistical comparison of two design variants across many users to determine which produces better outcomes. Usability testing finds qualitative problems; A/B testing measures quantitative differences.

    **Concept Tested:** Usability Testing, A/B Testing

---

#### 10. What is iterative design and why is it important for interactive infographic development?

<div class="upper-alpha" markdown>
1. Writing code in loops to generate repetitive visual patterns
2. A design process that cycles through creation, testing, feedback, and refinement, improving the infographic through multiple rounds of revision
3. Repeating the same design across multiple chapters for visual consistency
4. A technique for generating multiple color variations of the same infographic
</div>

??? question "Show Answer"
    The correct answer is **B**. Iterative design is a cyclical process of creating a design, testing it with users, gathering feedback, and refining the design based on what was learned. Each iteration improves the infographic's usability, effectiveness, and learner experience. Combined with engagement analytics and usability testing, iterative design ensures continuous improvement over time.

    **Concept Tested:** Iterative Design
