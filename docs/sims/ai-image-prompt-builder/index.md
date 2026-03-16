---
title: AI Image Generation Prompt Builder
description: Construct effective text-to-image prompts by selecting components from structured categories and observing how each component affects the assembled prompt.
quality_score: 0
image: /sims/ai-image-prompt-builder/ai-image-prompt-builder.png
social:
   cards: false
---
# AI Image Generation Prompt Builder

<iframe src="main.html" height="700" scrolling="no"></iframe>

[Run the AI Image Prompt Builder Fullscreen](./main.html){ .md-button .md-button--primary }

## Sample iframe reference

```html
<iframe
   src="https://dmccreary.github.io/infographics/sims/ai-image-prompt-builder/main.html"
   width="100%" height="700" scrolling="no">
</iframe>
```

## About This MicroSim

This prompt builder helps educators construct effective text-to-image prompts for generating base illustrations that are suitable for interactive overlay infographics. By selecting from structured categories — subject, visual style, composition, and overlay constraints — learners see how each component contributes to a well-structured prompt.

The key insight is that prompts for overlay-ready images differ from general image prompts: they must request **no embedded text**, **clear region boundaries**, and **neutral backgrounds** to ensure the generated illustration works well with interactive overlay labels.

## Lesson Plan

### Learning Objective

Construct effective text-to-image prompts for base illustration generation by selecting components from structured categories and observing how each component affects the assembled prompt.

### Activities

1. Build a prompt using the default settings. Read the generated prompt and identify each component.
2. Change the subject to "Engine" and the composition to "Exploded View." How does the prompt change?
3. Toggle each overlay constraint on/off and observe the effect on the prompt text.
4. Enable **Show Prompt Tips** to learn why each component matters for overlay infographics.
5. Click **Copy Prompt** and paste it into an AI image generator to test the result.

## References

- [Prompt Engineering - Wikipedia](https://en.wikipedia.org/wiki/Prompt_engineering) — Overview of techniques for crafting effective AI prompts.
