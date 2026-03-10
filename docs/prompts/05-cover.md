# Cover Image Prompt

## Specifications

- **Title**: Interactive Infographics
- **Format**: Open Graph (OG) image
- **Size**: 1200 x 630 pixels (1.91:1 aspect ratio)
- **Purpose**: Social media preview (Facebook, LinkedIn) and home page display
- **Save to**: `docs/img/cover.png`

## Cover Image Prompt

```
Please generate a wide landscape book cover image (1200x630 pixels, 1.91:1 aspect ratio)
for "Interactive Infographics" — a textbook about creating interactive
infographic diagrams for intelligent textbooks.

COMPOSITION: On the LEFT 15% place the image of our course mascot, Percy the Peacock with a welcome pose. The remaining 85% of the image contains the montage elements described below.

TITLE IN CENTER: Place the text "Interactive Infographics" in the center using a white font.

BACKGROUND: Deep royal blue (#1565C0) to dark navy (#0D47A1) gradient
flowing from left to right, with subtle warm orange (#FF7043) accent
glows at key focal points.

MONTAGE ELEMENTS: A rich collage of interactive infographic and data
visualization elements, distributed across the image:
- Colorful bar charts, line graphs, and pie chart segments
- A diagram of cross section of an animal cell
- A small causal loop diagram with reinforcing and balancing loop arrows
- Network graph visualizations with glowing nodes and connecting edges
- Interactive overlay hotspots (small circles with plus icons) on a
  diagram silhouette
- Flowchart arrows and decision diamond shapes
- A timeline bar with milestone markers
- SmartArt-style process arrows and chevron shapes
- A small pyramid/funnel diagram in graduated colors
- Iframe borders suggesting embedded interactive content
- Slider controls, toggle buttons, and other interactive UI widgets at the bottom
- Subtle grid lines and coordinate axes in the background

STYLE: Modern flat vector design aesthetic. Elements rendered as clean,
colorful icons and mini-illustrations with subtle depth shadows. Orange
(#FF7043) and gold (#FFC107) accent highlights on key elements against
the blue background. Elements softly fade and reduce in opacity toward
the edges with a gentle vignette effect.

CENTER AREA: The center-right portion of the image should have a slightly
darker, cleaner area (semi-transparent dark overlay) suitable for white
title text.

TECHNICAL: Professional quality, high resolution, vibrant but cohesive
color palette. No text in the image. No photographs — all elements should
be illustrated/vector style.
```

## Compositing Percy the Peacock

After generating the background montage and the Percy welcome pose separately:

1. Open the cover background image (1200x630)
2. Place `docs/img/mascot/welcome.png` on the left side
3. Position Percy so he occupies roughly the left 10-15% of the image (about 120-180px wide)
4. Percy should be vertically centered, standing on or near the bottom third
5. Ensure Percy's transparent background blends naturally with the cover gradient
6. Export final composite as `docs/img/cover.png`

**Tools for compositing:**
- macOS Preview (simple overlay)
- GIMP (free, full control)
- Figma (free tier, easy layering)
- Canva (free tier, drag and drop)
- ImageMagick command line:

```bash
# Example ImageMagick composite command
composite -gravity West -geometry 150x150+20+0 \
  docs/img/mascot/welcome.png \
  docs/img/cover-background.png \
  docs/img/cover.png
```

## Adding Title Text (Optional)

If you want to bake the title into the image rather than using HTML/CSS overlay:

1. Add a semi-transparent dark rectangle (opacity 50%) in the center-right area
2. Add "Interactive Infographics" in white, bold sans-serif font (Inter, Montserrat, or Source Sans Pro)
3. Optionally add subtitle: "AI-Powered Visual Learning for Intelligent Textbooks"
4. Export as PNG at 1200x630 pixels
