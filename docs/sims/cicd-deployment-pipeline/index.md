---
title: CI/CD Deployment Pipeline
description: Describe the continuous deployment pipeline for an intelligent textbook by tracing the flow from content change through Git commit, GitHub Actions build, and GitHub Pages deployment.
quality_score: 0
image: /sims/cicd-deployment-pipeline/cicd-deployment-pipeline.png
social:
   cards: false
---
# CI/CD Deployment Pipeline

<iframe src="main.html" height="680" scrolling="no"></iframe>

[Run the CI/CD Pipeline Fullscreen](./main.html){ .md-button .md-button--primary }

## Sample iframe reference

```html
<iframe
   src="https://dmccreary.github.io/infographics/sims/cicd-deployment-pipeline/main.html"
   width="100%" height="680" scrolling="no">
</iframe>
```

## About This MicroSim

This interactive pipeline diagram traces the complete journey from editing a chapter file to seeing changes live on GitHub Pages. Each of the 6 stages shows the commands, outputs, timing, and common pitfalls involved in continuous deployment of an intelligent textbook.

## Lesson Plan

### Learning Objective

Describe the continuous deployment pipeline for an intelligent textbook by tracing the flow from a content change through Git commit, push, GitHub Actions build, and GitHub Pages deployment, identifying what happens at each stage.

### Activities

1. Click each stage to read its description, commands, and expected output.
2. Press **Animate Pipeline** to watch the stages complete in sequence with realistic timing.
3. Note the common pitfalls at each stage — which ones have you encountered?
4. Identify which stages require human action vs. which are automated.

## References

- [GitHub Actions Documentation](https://docs.github.com/en/actions) — Official guide to GitHub's CI/CD automation.
- [MkDocs Deployment](https://www.mkdocs.org/user-guide/deploying-your-docs/) — How MkDocs builds and deploys documentation sites.
