# Quiz: Generative AI for Infographic Creation

Test your understanding of AI-assisted workflows, prompt engineering, and quality review for interactive infographics.

---

#### 1. What is a text-to-image LLM used for in the infographic creation workflow?

<div class="upper-alpha" markdown>
1. Converting infographic images into text descriptions for accessibility
2. Generating base illustrations from natural language descriptions that serve as the foundation for interactive overlays
3. Translating infographic labels from one language to another
4. Compressing image files to reduce storage requirements
</div>

??? question "Show Answer"
    The correct answer is **B**. Text-to-image LLMs generate base illustrations from natural language descriptions (prompts). These AI-generated images serve as the visual foundation onto which interactive overlay regions, labels, and infoboxes are added. This dramatically accelerates the creation process by eliminating the need for custom illustration from scratch.

    **Concept Tested:** Text-to-Image LLM, Base Image Generation

---

#### 2. What is prompt engineering in the context of AI-assisted infographic creation?

<div class="upper-alpha" markdown>
1. Writing JavaScript code that prompts users for input
2. The craft of writing precise, structured natural language instructions that guide AI tools to produce consistent, high-quality outputs
3. Designing the user interface prompts that appear in quiz mode
4. Creating database queries that retrieve infographic templates
</div>

??? question "Show Answer"
    The correct answer is **B**. Prompt engineering is the craft of writing precise, structured natural language instructions that guide generative AI tools to produce consistent, high-quality results. Effective prompts for infographic creation specify the subject, visual style, layout requirements, color scheme, and labeling conventions to ensure the output matches design standards.

    **Concept Tested:** Prompt Engineering

---

#### 3. What is the AI-assisted workflow for creating a MicroSim from concept to deployment?

<div class="upper-alpha" markdown>
1. Download a pre-made template, change the title, and deploy
2. Concept description → base image generation → overlay/code generation → quality review → packaging as a MicroSim
3. Write all code manually, then use AI to check spelling
4. Use AI to generate the entire textbook, including all chapters and quizzes
</div>

??? question "Show Answer"
    The correct answer is **B**. The AI-assisted workflow follows a pipeline: start with a concept description, use AI to generate a base illustration, then generate overlay JSON configuration and JavaScript interaction code, conduct quality review with editorial control, and finally package as a deployable MicroSim with all required files (main.html, index.md, metadata.json).

    **Concept Tested:** AI-Assisted Workflow, Concept to MicroSim

---

#### 4. What is AI quality review and why is it necessary?

<div class="upper-alpha" markdown>
1. Using AI to grade student quiz submissions automatically
2. The process of evaluating AI-generated content against quality standards for accuracy, visual consistency, and pedagogical alignment before deployment
3. An automated test that measures the loading speed of AI-generated infographics
4. A certification process that verifies the AI tool is approved for educational use
</div>

??? question "Show Answer"
    The correct answer is **B**. AI quality review is the process of evaluating AI-generated content against quality standards, checking for accuracy, visual consistency, accessibility compliance, and alignment with learning objectives. It is necessary because AI tools can produce plausible but incorrect content, inconsistent visual styles, or pedagogically ineffective designs that require human editorial control.

    **Concept Tested:** AI Quality Review

---

#### 5. What is editorial control in AI-assisted infographic creation?

<div class="upper-alpha" markdown>
1. A software feature that restricts who can edit the infographic files
2. The human review and refinement process that ensures AI-generated content meets accuracy, quality, and pedagogical standards
3. A version control system for tracking changes to AI-generated code
4. A legal review process for copyright compliance
</div>

??? question "Show Answer"
    The correct answer is **B**. Editorial control is the human oversight process where educators and designers review, correct, and refine AI-generated content. This includes verifying factual accuracy, ensuring visual consistency with the textbook's design standards, validating pedagogical alignment with learning objectives, and fixing any errors or inconsistencies in the generated output.

    **Concept Tested:** Editorial Control

---

#### 6. What is the difference between a no-code tool and a low-code tool for infographic creation?

<div class="upper-alpha" markdown>
1. No-code tools are free while low-code tools require a paid license
2. No-code tools require no programming at all, while low-code tools require minimal coding for customization beyond templates
3. No-code tools produce lower quality output than low-code tools
4. No-code tools work offline while low-code tools require an internet connection
</div>

??? question "Show Answer"
    The correct answer is **B**. No-code tools allow educators to create interactive infographics entirely through visual interfaces, templates, and configuration — with no programming required. Low-code tools require minimal coding for customization beyond what templates provide. Both approaches make professional infographics accessible to educators without deep programming expertise.

    **Concept Tested:** No-Code Tool, Low-Code Tool

---

#### 7. What is AI overlay generation?

<div class="upper-alpha" markdown>
1. A technique for generating multiple layers of transparency in image files
2. Using AI to automatically produce overlay JSON configuration files and rendering code from a base image and region descriptions
3. An AI tool that creates animated overlay effects for video presentations
4. A process for generating CSS overlay styles for web page backgrounds
</div>

??? question "Show Answer"
    The correct answer is **B**. AI overlay generation uses AI tools to automatically produce the overlay.json configuration file — defining region coordinates, labels, descriptions, and interactive behavior — from a base image and a set of natural language region descriptions. This eliminates the tedious manual process of identifying pixel coordinates for each interactive region.

    **Concept Tested:** AI Overlay Generation

---

#### 8. Which step in the AI-assisted workflow should come AFTER generating the base image but BEFORE deploying the MicroSim?

<div class="upper-alpha" markdown>
1. Writing the course description
2. Selecting the JavaScript visualization library
3. Quality review with editorial control to verify accuracy and fix errors
4. Publishing the textbook to GitHub Pages
</div>

??? question "Show Answer"
    The correct answer is **C**. Quality review with editorial control is a critical step that must occur after content generation (base image, overlay, code) and before deployment. Without human review, AI-generated content may contain factual errors, visual inconsistencies, broken interactions, or pedagogically ineffective designs. Editorial control ensures the final MicroSim meets quality standards.

    **Concept Tested:** AI Quality Review, Editorial Control

---

#### 9. An educator with no programming experience wants to create an interactive labeled diagram of the solar system. Which approach would be most appropriate?

<div class="upper-alpha" markdown>
1. Write custom D3.js code from scratch using documentation
2. Use a no-code or AI-assisted workflow that generates the base image and overlay configuration from natural language descriptions
3. Hire a professional software development team
4. Use a static PowerPoint slide instead
</div>

??? question "Show Answer"
    The correct answer is **B**. A no-code or AI-assisted workflow is ideal for educators without programming experience. They can describe the desired infographic in natural language, use AI to generate the base illustration and overlay configuration, review the output for accuracy, and deploy as a MicroSim — all without writing code. This is exactly the workflow this chapter is designed to teach.

    **Concept Tested:** No-Code Tool, AI-Assisted Workflow, Concept to MicroSim

---

#### 10. What is AI code generation in the context of MicroSim creation?

<div class="upper-alpha" markdown>
1. Using AI to encrypt JavaScript code for security
2. Using large language models to produce JavaScript, HTML, and CSS code for MicroSims based on natural language descriptions of the desired interactive infographic
3. Automatically generating documentation comments in existing code
4. Converting code from one programming language to another
</div>

??? question "Show Answer"
    The correct answer is **B**. AI code generation uses large language models to produce the JavaScript, HTML, and CSS code needed for MicroSim interactive infographics based on natural language descriptions. This includes event handlers for hover and click interactions, canvas drawing code, responsive layout logic, and data loading from JSON configuration files.

    **Concept Tested:** AI Code Generation
