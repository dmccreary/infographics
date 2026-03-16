---
title: Accessibility Audit Checklist
description: Assess the accessibility compliance of a sample MicroSim by evaluating it against a structured checklist covering alt text, semantic HTML, ARIA attributes, keyboard navigation, and more.
quality_score: 0
image: /sims/accessibility-audit-checklist/accessibility-audit-checklist.png
social:
   cards: false
---
# Accessibility Audit Checklist

<iframe src="main.html" height="700" scrolling="no"></iframe>

[Run the Accessibility Audit Fullscreen](./main.html){ .md-button .md-button--primary }

## Sample iframe reference

```html
<iframe
   src="https://dmccreary.github.io/infographics/sims/accessibility-audit-checklist/main.html"
   width="100%" height="700" scrolling="no">
</iframe>
```

## About This MicroSim

This audit tool presents a sample cell biology MicroSim with **intentional accessibility issues** alongside a structured checklist for evaluation. Learners practice the audit process by testing the sample, marking items as Pass/Fail, and generating a compliance score.

The five planted issues include missing alt text, insufficient color contrast, no keyboard navigation, tooltips not announced to screen readers, and absent focus indicators.

## Lesson Plan

### Learning Objective

Assess the accessibility compliance of a sample MicroSim by systematically evaluating it against a structured checklist.

### Activities

1. Interact with the sample MicroSim. Try hovering, tabbing, and using a screen reader.
2. For each checklist category, click items to mark them as Pass (green), Fail (red), or Not Tested (gray).
3. Click **Reveal Issues** to see all 5 planted accessibility problems annotated in red.
4. Click **Show Fixed Version** to compare the accessible version side-by-side.
5. Aim for a score of 14/14 by correctly identifying all issues.

## References

- [Web Content Accessibility Guidelines (WCAG)](https://www.w3.org/WAI/standards-guidelines/wcag/) — The international standard for web accessibility.
- [ARIA Authoring Practices](https://www.w3.org/WAI/ARIA/apg/) — Patterns for building accessible web components.
