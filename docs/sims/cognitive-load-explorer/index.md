---
title: Cognitive Load Balance Explorer
description: Interactive visualization showing how three types of cognitive load (intrinsic, extraneous, germane) compete for limited working memory capacity.
quality_score: 0
image: /sims/cognitive-load-explorer/cognitive-load-explorer.png
og:image: /sims/cognitive-load-explorer/cognitive-load-explorer.png
twitter:image: /sims/cognitive-load-explorer/cognitive-load-explorer.png
social:
   cards: false
---
# Cognitive Load Balance Explorer

<iframe src="main.html" height="700" scrolling="no"></iframe>

[Run the Cognitive Load Explorer Fullscreen](./main.html){ .md-button .md-button--primary }

## Sample iframe reference

```html
<iframe
   src="https://dmccreary.github.io/infographics/sims/cognitive-load-explorer/main.html"
   width="100%"
   height="700"
   scrolling="no">
</iframe>
```

## What is Cognitive Load Theory?

**Cognitive Load Theory (CLT)**, developed by educational psychologist John
Sweller in the late 1980s, describes how human working memory has a strictly
limited capacity for processing new information. When that capacity is
exceeded, learning breaks down — not because the content is too hard, but
because the learner's mental resources are exhausted.

CLT identifies three types of load that compete for the same limited pool
of working memory:

- **Intrinsic Load** — the inherent difficulty of the content itself. A
  simple concept like "primary colors" has low intrinsic load; quantum
  mechanics has high intrinsic load. This is largely determined by the
  subject matter and the learner's prior knowledge, and cannot be
  eliminated — only managed through sequencing and scaffolding.

- **Extraneous Load** — mental effort wasted on poorly designed instruction.
  Labels placed far from the elements they describe, inconsistent color
  coding, cluttered layouts, decorative but meaningless graphics — all of
  these force the learner to spend cognitive resources on decoding the
  presentation rather than learning the content.

- **Germane Load** — productive mental effort directed toward understanding,
  organizing, and integrating new knowledge into long-term memory. This is
  the "good" cognitive load: prediction prompts, self-explanation
  activities, interactive explorations, and practice with feedback all
  increase germane load.

The key insight is that these three loads **share a fixed total capacity**.
When extraneous load is high, there is less room for germane load — and
learning suffers even if the content itself is manageable.

## Why This MicroSim Matters for Infographic Design

Every design decision you make when creating an interactive infographic
affects the cognitive load balance:

- **Placing labels close to their targets** reduces extraneous load (the
  spatial contiguity effect).
- **Using consistent color coding** reduces extraneous load (the learner
  doesn't have to re-decode what each color means).
- **Adding hover-to-reveal details** increases germane load by encouraging
  active exploration rather than passive viewing.
- **Including prediction prompts** ("Which bar do you think will be
  tallest?") increases germane load by engaging the learner before
  revealing the answer.

This MicroSim makes these trade-offs visible. The stacked bar shows how
your three sliders affect the total load on working memory. When the total
exceeds 100%, the "OVERLOAD" warning appears and the Learning Effectiveness
meter drops — illustrating that even excellent content fails to produce
learning when the delivery overwhelms the learner.

## How to Use This MicroSim

1. **Start with the defaults** and observe the balanced state.
2. **Try the three scenario presets** to see extreme configurations:
   - *Cluttered Static Diagram*: low complexity but high extraneous load
     from poor design — effectiveness is low despite simple content.
   - *Clean Interactive MicroSim*: moderate complexity with excellent design
     and high interactivity — effectiveness is high.
   - *Complex Unscaffolded*: high complexity with mediocre design and no
     interactivity — the learner is overwhelmed.
3. **Adjust individual sliders** to explore cause and effect. Notice that
   increasing Design Quality (reducing extraneous load) directly frees
   capacity for germane load.
4. **Watch the sample infographic preview** at the bottom — it visually
   degrades as quality drops and enriches as interactivity increases.

## Lesson Plan

### Learning Objective

Students will be able to explain how the three types of cognitive load
(intrinsic, extraneous, germane) compete for limited working memory
capacity, and how design decisions shift the balance between them.

### Activities

1. **Baseline exploration**: Set all sliders to 5 and observe the balanced
   state. What percentage of capacity is used? What is the effectiveness?
2. **Scenario comparison**: Click each of the three scenario presets.
   For each one, write down the total load percentage and effectiveness.
   Which scenario produces the best learning outcome? Why?
3. **Design quality experiment**: Set complexity to 7 and interactivity
   to 5. Then slowly increase Design Quality from 1 to 10. What happens
   to the extraneous load segment? What happens to effectiveness?
4. **Overload investigation**: Find a slider combination that triggers
   the OVERLOAD warning. Then find the minimum change needed to bring
   the total back under 100%. Which type of load is most effective to
   reduce?
5. **Infographic critique**: Apply what you've learned to critique a
   real infographic. Identify elements that contribute to each load type
   and suggest specific design changes to improve the balance.

### Assessment

Ask students to:

- Explain in their own words why a beautifully designed but complex
  infographic might still overwhelm learners.
- Propose three specific design changes to reduce extraneous load in
  a given infographic example.
- Describe the relationship between extraneous load and germane load
  in terms of working memory capacity.

## References

- [Cognitive Load Theory - Wikipedia](https://en.wikipedia.org/wiki/Cognitive_load) — Overview of John Sweller's cognitive load theory, including the three load types and their educational implications.
- [Sweller, J. (1988). Cognitive load during problem solving: Effects on learning. Cognitive Science, 12(2), 257-285.](https://en.wikipedia.org/wiki/Cognitive_load#History) — The foundational paper introducing cognitive load theory.
- [Mayer, R. E. (2009). Multimedia Learning. Cambridge University Press.](https://en.wikipedia.org/wiki/Multimedia_learning) — Richard Mayer's principles for reducing extraneous load in multimedia instruction.
- [Clark, R. C., Nguyen, F., & Sweller, J. (2006). Efficiency in Learning. Pfeiffer.](https://en.wikipedia.org/wiki/Cognitive_load#Instructional_design) — Practical application of CLT to instructional design decisions.
