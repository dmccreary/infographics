---
title: Brewing Beer Process Explorer
description: Interactive MicroSim that walks through the five key biochemical steps of brewing fermentation.
image: /sims/brewing-beer/brewing-beer.png
og:image: /sims/brewing-beer/brewing-beer.png
twitter:image: /sims/brewing-beer/brewing-beer.png
social:
   cards: false
quality_score: 0
---

# Brewing Beer Process Explorer

<iframe src="main.html" height="720px" width="100%" scrolling="no"></iframe>

[Run the Brewing Beer Process Explorer MicroSim Fullscreen](./main.html){ .md-button .md-button--primary }

## About This MicroSim

This MicroSim traces the complete biochemical pathway of alcoholic
fermentation as it occurs inside a brewery fermenter. Students step
through five illustrated stages that follow a glucose molecule from
crushed grain to ethanol in the finished beer. Each stage pairs a
detailed cutaway illustration of brewing equipment with a magnified
inset showing the molecular-scale reactions inside a yeast cell.

The five stages map directly to the AP Biology cellular respiration
and fermentation curriculum:

1. **Glucose Feedstock Preparation** — starch hydrolysis by amylase enzymes
2. **Glycolysis** — the ten-enzyme cascade producing pyruvate, ATP, and NADH
3. **Anaerobic Pyruvate Accumulation** — the metabolic bottleneck when oxygen is excluded
4. **Decarboxylation** — pyruvate decarboxylase releasing $\ce{CO2}$ and acetaldehyde
5. **Ethanol Formation** — alcohol dehydrogenase regenerating $\ce{NAD+}$ to keep glycolysis running

## How to Use

1. **Click any Step button** (1 through 5) to jump to that stage of the process.
2. **Toggle Show Labels** to overlay or hide the labeled callouts on each image.
   Labels identify both the brewing equipment (mash tun, fermenter, blow-off hose)
   and the molecular components (glucose, pyruvate, NADH, enzymes).
3. **Read the infobox** below the controls for a detailed explanation of the
   biochemistry happening at each stage, including the key molecules involved.
4. Step through the stages in order (1 through 5) to see the full narrative arc
   of how sugar becomes alcohol and carbon dioxide.

## Key Concepts

### Glycolysis (Step 2)

Glycolysis is the universal first stage of glucose metabolism. It occurs in the
cytoplasm and does not require oxygen. Each glucose molecule is split into two
pyruvate molecules through a ten-enzyme cascade, netting:

- **2 ATP** (substrate-level phosphorylation)
- **2 NADH** (electron carriers)

### The Anaerobic Bottleneck (Step 3)

When the brewer seals the fermenter, dissolved oxygen is quickly consumed.
Without oxygen, the electron transport chain in the mitochondria shuts down.
This means:

- Pyruvate cannot enter the mitochondria for the citric acid cycle
- NADH cannot donate electrons to the ETC
- $\ce{NAD+}$ becomes scarce, threatening to stall glycolysis

Fermentation (Steps 4 and 5) solves this bottleneck.

### Alcoholic Fermentation (Steps 4 and 5)

Fermentation is a two-reaction pathway that regenerates $\ce{NAD+}$:

**Reaction 1 — Decarboxylation (Step 4):**

$$\ce{pyruvate ->[\text{pyruvate decarboxylase}] acetaldehyde + CO2}$$

This reaction produces all the $\ce{CO2}$ in beer — the bubbles, the foam head,
and the carbonation.

**Reaction 2 — Reduction (Step 5):**

$$\ce{acetaldehyde + NADH + H+ ->[\text{alcohol dehydrogenase}] ethanol + NAD+}$$

The regenerated $\ce{NAD+}$ cycles back to glycolysis, allowing ATP production to
continue indefinitely under anaerobic conditions.

### Net Equation

$$\ce{C6H12O6 -> 2 C2H5OH + 2 CO2 + 2 ATP}$$

Fermentation yields only 2 ATP per glucose — far less than the 30-38 ATP from
aerobic respiration — but it allows the yeast to survive and reproduce when
oxygen is unavailable.

## AP Biology Connections

| AP Big Idea | Connection |
|-------------|------------|
| **Big Idea 1: Evolution** | Fermentation is an ancient metabolic pathway conserved across yeasts, bacteria, and animal muscle cells |
| **Big Idea 2: Energetics** | Glycolysis + fermentation illustrate substrate-level phosphorylation and the necessity of $\ce{NAD+}$ recycling |
| **Big Idea 3: Information** | Enzyme specificity (pyruvate decarboxylase vs. lactate dehydrogenase) determines whether ethanol or lactate is produced |
| **Big Idea 4: Systems** | The sealed fermenter is a model closed system for studying anaerobic metabolism |

**Common AP Exam Misconception:** Students often believe fermentation
*produces* ATP. In fact, glycolysis produces the ATP. Fermentation's sole
purpose is to regenerate $\ce{NAD+}$ so that glycolysis can continue.

## Lesson Plan

### Grade Level

9-12 (High School Biology / AP Biology)

### Duration

45 minutes (one class period)

### AP Biology Standards Alignment

- **Essential Knowledge 3.D.1** — Cell communication and responses to internal changes
- **Learning Objective ENE-1.L** — Explain how cellular respiration and fermentation generate ATP
- **Science Practice 1.4** — Use representations to describe biological concepts

### Prerequisites

Students should be familiar with:

- Basic cell structure (cytoplasm, mitochondria, cell membrane)
- The concept of enzymes as biological catalysts
- ATP as the cell's energy currency
- The difference between aerobic and anaerobic conditions

### Materials

- Computer or tablet with internet access
- Student worksheet (see Assessment section)
- Optional: actual brewing yeast sample and sugar water for a live fermentation demo

### Warm-Up (5 minutes)

Ask students: *"What do bread rising and beer brewing have in common?"*

Collect responses on the board. Guide discussion toward the idea that both
involve yeast consuming sugar and producing gas ($\ce{CO2}$). Introduce the
question that will drive the lesson: *"What exactly happens inside a yeast
cell when it turns sugar into alcohol and carbon dioxide?"*

### Direct Instruction — Walking Through the Diagram (10 minutes)

Project the MicroSim fullscreen with labels ON. Walk through each step as a
class, pointing out the specific visual elements in the diagram. The
illustrations use a consistent color code throughout all five steps — help
students learn to read the molecular shapes so they can follow the
biochemical story visually.

#### Step 1 — Glucose Feedstock Preparation

Show the diagram. On the left, point out the **copper mash tun** filled with
crushed barley grains splitting open. Trace the stainless piping to the
**conical fermenter** on the right. Direct students to the **magnified inset
circle** in the lower right — this is where the molecular action happens.

Inside the inset, identify:

- **Starch chains** — long, coiled tan spirals made of linked hexagonal units.
  These are the stored energy in barley grain.
- **Amylase enzymes** — blue-green wedge shapes that cleave the starch chains
  at specific points, like molecular scissors.
- **Maltose** — two linked gold hexagons, the primary sugar released by amylase.
- **Glucose monomers** — single gold hexagons with a warm glow. This is the fuel
  that yeast will consume. Every subsequent reaction starts with this molecule.

*Guiding question: "Why does the brewer need to crush the grain and add hot
water before the yeast can do anything?"*

#### Step 2 — Glycolysis in the Fermenter

Click Step 2. The scene shifts to the **interior of the sealed fermenter**
filled with amber wort. Tiny $\ce{CO2}$ bubbles are beginning to form along
the vessel walls. Dozens of oval **yeast cells** (tan cell walls, pale cream
cytoplasm) float suspended in the liquid. Note the **instrumentation probes**
(temperature, pH, dissolved oxygen) inserted through the fermenter wall.

Direct students to the inset circle to follow glycolysis:

- **Glucose** (warm-gold hexagon) enters the cell from the left through a
  transporter channel in the cell membrane.
- **Enzyme chain** — a row of ten small, distinctly colored shapes arranged
  left to right, like stations on an assembly line. Each enzyme reshapes the
  molecule slightly as it passes through.
- **Pyruvate** — two orange-red triangular molecules emerge at the right end
  of the chain. These are the 3-carbon products of splitting the 6-carbon
  glucose.
- **ATP** — bright yellow glowing spheres floating above the enzyme chain
  (2 per glucose). This is the energy payoff.
- **NADH** — violet glowing spheres floating above the chain (2 per glucose).
  These electron carriers will become critically important in Steps 3 and 5.
- **Mitochondria** — faint oval organelles with internal folds (cristae) pushed
  to the edge of the cell. They are present but not yet relevant — glycolysis
  happens in the cytoplasm, not the mitochondria.

*Guiding question: "What are the two energy-carrying products of glycolysis,
and what colors represent them in the diagram?"* (Answer: yellow ATP, violet NADH)

#### Step 3 — Pyruvate Pool Under Anaerobic Conditions

Click Step 3. The overall scene has shifted dramatically — the fermenter is now
**sealed** with a tri-clamp lid, and the lighting has changed to cool blue-gray
tones emphasizing the anaerobic environment. A **blow-off hose** runs from the
top of the fermenter into a **sanitizer bucket** on the floor. A faint
$\ce{CO2}$ **headspace** haze sits above the wort surface.

In the inset, the mood has changed inside the cell:

- **Pyruvate molecules** (orange-red triangles) are now **crowding the
  cytoplasm** — they have nowhere to go because the mitochondria are blocked.
- **NADH** (violet glowing spheres) are **accumulating in clusters** — they
  cannot donate their electrons to the electron transport chain.
- **Blocked mitochondria** — the two mitochondria along the right side of the
  cell now have their membrane channels visibly closed with small red barrier
  marks. The internal cristae are dim and inactive.
- **NAD+** (gray spheres, no glow) are scattered sparsely — they are running
  out because NADH is not being recycled.

This is the metabolic crisis: without $\ce{NAD+}$, glycolysis cannot continue,
and ATP production stops. Ask students to notice the contrast between the
abundant violet NADH and the scarce gray $\ce{NAD+}$.

*Guiding question: "What would happen to the cell if it could not find a way
to convert the violet NADH back into gray NAD+?"*

#### Step 4 — Decarboxylation: Acetaldehyde and $\ce{CO2}$ Release

Click Step 4. The fermenter is now in **peak fermentation** — vigorous
$\ce{CO2}$ bubbles stream upward, a thick **krausen foam** crown sits at the
wort surface, and the blow-off hose is actively bubbling. The lighting has
shifted back to warm amber-orange, reflecting the intense metabolic activity.
Outside the fermenter, a brewer's hydrometer floats in a sample jar.

In the inset, point out the first fermentation enzyme:

- **Pyruvate decarboxylase** — a large, multi-lobed blue-purple protein
  complex dominating the center of the cell. It has a visible cleft (the
  active site) where the reaction occurs.
- **TPP cofactor** — a small green diamond shape nestled inside the enzyme's
  active site. TPP (thiamine pyrophosphate, derived from vitamin B1) is
  essential for this reaction to work.
- **Pyruvate** (orange-red triangle) enters the enzyme active site.
- **$\ce{CO2}$** — small translucent white spheres being ejected upward from
  the enzyme, floating through the cytoplasm and out through the cell
  membrane to join the larger bubbles in the wort. This is where every
  $\ce{CO2}$ molecule in beer originates.
- **Acetaldehyde** — salmon-pink V-shaped molecules (smaller than the
  triangular pyruvate) exit from the other side of the enzyme. These are
  2-carbon molecules that still need to be processed in Step 5.

Note that the violet NADH spheres from Step 3 are still present and waiting.

*Guiding question: "The enzyme removes one carbon as $\ce{CO2}$. Pyruvate
has 3 carbons. How many carbons does the acetaldehyde have?"* (Answer: 2)

#### Step 5 — Ethanol Formation and $\ce{NAD+}$ Regeneration

Click Step 5. The fermenter has quieted — fewer bubbles rise, the krausen
foam has collapsed to a thin ring, and the beer has clarified from cloudy
amber to a clearer golden color. Yeast cells are **clumping together**
(flocculating) and sinking toward the bottom cone. A **transfer line** runs
to a horizontal **conditioning tank**. A **$\ce{CO2}$ capture dome** collects
residual gas.

In the inset, point out the final reaction:

- **Alcohol dehydrogenase** — a large, multi-lobed copper-brown protein with
  a visible active site cleft. This is the second and final fermentation enzyme.
- **Acetaldehyde** (salmon-pink V-shape) enters the enzyme from one side.
- **NADH** (violet glowing sphere) approaches from the other side and
  **transfers its electrons** — shown as a luminous violet light trail
  streaming through the enzyme into the acetaldehyde.
- **Ethanol** — a pale blue-green, small, compact, round molecule exits the
  enzyme. This is the alcohol in beer. Several ethanol molecules are shown
  diffusing out through the cell membrane into the surrounding liquid.
- **NAD+** (gray sphere, no glow) — the NADH, having donated its electrons,
  reverts to gray $\ce{NAD+}$ and drifts back toward the glycolysis enzyme
  chain, completing a **visible recycling loop** within the cytoplasm.

This is the key moment: the gray $\ce{NAD+}$ flowing back to glycolysis is
the entire reason fermentation exists. Without this recycling, the cell would
run out of $\ce{NAD+}$ and die.

*Guiding question: "Why is regenerating $\ce{NAD+}$ more important to the
cell than producing ethanol?"*

#### Visual Color Code Summary

After walking through all five steps, display this summary so students can
refer to it during independent work:

| Molecule | Shape in Diagram | Color | Role |
|----------|-----------------|-------|------|
| Glucose | Hexagonal ring | Warm gold | Starting fuel (6 carbons) |
| Pyruvate | Triangle | Orange-red | Glycolysis product (3 carbons) |
| Acetaldehyde | V-shape | Salmon pink | Intermediate (2 carbons) |
| Ethanol | Small round sphere | Pale blue-green | Final product (2 carbons) |
| ATP | Sphere | Bright yellow glow | Energy currency |
| NADH | Sphere | Violet glow | Electron carrier (loaded) |
| NAD+ | Sphere | Gray (no glow) | Electron carrier (empty) |
| $\ce{CO2}$ | Small sphere | Translucent white | Waste gas (1 carbon) |
| Amylase | Wedge | Blue-green | Starch-cleaving enzyme |
| Pyruvate decarboxylase | Multi-lobed mass | Blue-purple | Removes $\ce{CO2}$ from pyruvate |
| Alcohol dehydrogenase | Multi-lobed mass | Copper-brown | Reduces acetaldehyde to ethanol |
| TPP cofactor | Diamond | Green | Helper molecule in decarboxylase |
| Starch | Coiled spiral | Light tan | Storage polymer in barley |
| Mitochondria | Oval with internal folds | Tan (dim when blocked) | Aerobic respiration organelle |

### Guided Practice (15 minutes)

Students work in pairs at their own devices. Refer to the Visual Color Code
Summary table from the direct instruction whenever needed.

1. **Exploration Phase (5 min):** Step through all five stages independently.
   Toggle labels on and off. For each step, write one sentence answering:
   *"What colored molecule enters the reaction, and what colored molecules
   come out?"* For example, Step 2: "A gold hexagonal glucose enters the
   enzyme chain; orange-red triangular pyruvates, yellow ATP spheres, and
   violet NADH spheres come out."

2. **Carbon Tracking Phase (5 min):** Using the diagram colors, have students
   trace where each carbon atom goes. Start with the 6-carbon gold glucose
   hexagon in Step 1. In Step 2, it splits into two 3-carbon orange-red
   pyruvate triangles. In Step 4, each pyruvate loses one carbon as a
   translucent white $\ce{CO2}$ sphere, leaving a 2-carbon salmon-pink
   acetaldehyde V-shape. In Step 5, the acetaldehyde becomes a pale
   blue-green ethanol sphere. Ask: *"Account for all 6 carbons from the
   original glucose. Where did they end up?"* (Answer: 2 in $\ce{CO2}$
   molecules, 4 in ethanol molecules — $2 \times 1 + 2 \times 2 = 6$)

3. **Electron Tracking Phase (5 min):** Have students follow the color of the
   electron carriers. In Step 2, gray $\ce{NAD+}$ spheres pick up electrons
   and become violet NADH spheres. In Step 3, violet NADH accumulates while
   gray $\ce{NAD+}$ becomes scarce — point out the visual imbalance in the
   diagram. In Step 5, the violet NADH transfers its electrons (visible as a
   light trail) through the copper-brown alcohol dehydrogenase enzyme into
   acetaldehyde, then exits as gray $\ce{NAD+}$ and loops back to glycolysis.
   Students identify which step would be affected by each scenario:
    - The brewer leaves the fermenter lid open (Step 3 — oxygen unblocks the
      dim mitochondria, $\ce{NAD+}$ is recycled via the ETC instead)
    - The malt has very low amylase activity (Step 1 — fewer blue-green wedge
      enzymes means fewer gold glucose hexagons are released)
    - A mutation disables pyruvate decarboxylase (Step 4 — the blue-purple
      enzyme cannot function, orange-red pyruvate accumulates, no translucent
      white $\ce{CO2}$ is released, no salmon-pink acetaldehyde is formed,
      and fermentation stops entirely)

### Independent Assessment (10 minutes)

Students answer the following questions individually:

1. Write the net equation for alcoholic fermentation starting from glucose.
   Identify which carbon atoms become $\ce{CO2}$ and which become ethanol.

2. A student claims: *"Fermentation produces more ATP than glycolysis
   because it makes ethanol, which contains lots of energy."* Explain
   why this statement is incorrect.

3. Explain why $\ce{NAD+}$ recycling is essential for ATP production under
   anaerobic conditions. Use the terms glycolysis, NADH, $\ce{NAD+}$,
   and substrate-level phosphorylation in your answer.

4. Predict what would happen to beer production if a yeast strain had a
   mutation that made its alcohol dehydrogenase enzyme nonfunctional.
   Which steps would still occur? Which would stop? What would accumulate?

5. Compare the ATP yield of fermentation (2 ATP/glucose) to aerobic
   respiration (30-38 ATP/glucose). Why would natural selection maintain
   the fermentation pathway if it is so much less efficient?

### Extension Activities

- **Lab Connection:** Set up a simple fermentation experiment with yeast,
  sugar water, and a balloon over a flask. Measure $\ce{CO2}$ production
  at different temperatures and sugar concentrations.
- **Cross-Unit Link:** Connect to Unit 1 (Evolution) — discuss how the
  universality of glycolysis across all domains of life suggests it
  evolved very early.
- **Real-World Application:** Research how different yeast strains
  (ale vs. lager vs. wild) produce different flavor compounds during
  fermentation.

### Differentiation

- **Struggling students:** Focus on Steps 1, 2, and 5 only. Emphasize the
  simple narrative: glucose in, ethanol + $\ce{CO2}$ out, with $\ce{NAD+}$
  recycling as the key concept.
- **Advanced students:** Challenge them to diagram the electron flow from
  glucose through NADH to ethanol, showing every oxidation and reduction step.

## Iframe Embed Code

You can add this MicroSim to any web page by adding this to your HTML:

```html
<iframe src="https://dmccreary.github.io/biology/sims/brewing-beer/main.html"
        height="820px"
        width="100%"
        scrolling="no"></iframe>
```

## References

1. [Alcoholic Fermentation](https://en.wikipedia.org/wiki/Ethanol_fermentation) — Wikipedia overview of the two-step conversion of pyruvate to ethanol and $\ce{CO2}$, including the enzymes pyruvate decarboxylase and alcohol dehydrogenase.
2. [Glycolysis](https://en.wikipedia.org/wiki/Glycolysis) — Wikipedia article covering the ten-enzyme pathway that splits glucose into pyruvate, producing 2 ATP and 2 NADH per glucose molecule.
3. [Saccharomyces cerevisiae](https://en.wikipedia.org/wiki/Saccharomyces_cerevisiae) — Wikipedia article on brewer's yeast, the organism responsible for alcoholic fermentation in beer, wine, and bread.
4. [Fermentation in Food Processing](https://en.wikipedia.org/wiki/Fermentation_in_food_processing) — Wikipedia overview of how fermentation is used across food and beverage production, including brewing, baking, and dairy.
5. [AP Biology Course and Exam Description](https://apcentral.collegeboard.org/courses/ap-biology) — College Board curriculum framework covering cellular energetics, including glycolysis and fermentation (Unit 3: Cellular Energetics).
6. [Pyruvate Decarboxylase](https://en.wikipedia.org/wiki/Pyruvate_decarboxylase) — Wikipedia article on the TPP-dependent enzyme that removes $\ce{CO2}$ from pyruvate, the first step of alcoholic fermentation.
7. [Alcohol Dehydrogenase](https://en.wikipedia.org/wiki/Alcohol_dehydrogenase) — Wikipedia article on the enzyme family that catalyzes the interconversion of alcohols and aldehydes, including the final step of fermentation.
8. [NAD+ / NADH](https://en.wikipedia.org/wiki/Nicotinamide_adenine_dinucleotide) — Wikipedia article on the essential coenzyme whose recycling is the biological purpose of fermentation.
9. [Brewing Process](https://en.wikipedia.org/wiki/Brewing) — Wikipedia overview of the complete beer-making process from mashing through conditioning.
10. [Anaerobic Respiration](https://en.wikipedia.org/wiki/Anaerobic_respiration) — Wikipedia article explaining metabolism in the absence of oxygen, including the distinction between anaerobic respiration and fermentation.
