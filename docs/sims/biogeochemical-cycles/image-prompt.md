# Biogeochemical Cycles Dashboard — Image Generation Prompt

## CRITICAL: No text, labels, numbers, arrows, callout lines, leader lines, or annotation marks anywhere in the image. No figure captions, scale bars, or legends. Repeat: absolutely NO TEXT of any kind.

## Overview

Generate a **single landscape illustration** showing a cross-section of Earth's major biogeochemical reservoirs. This image will serve as the shared background for a tabbed dashboard covering the Carbon, Nitrogen, Phosphorus, and Water cycles. Interactive overlays (arrows, labels, callouts) will be added programmatically — the image itself must contain NO annotations.

## Image Specifications

- **Aspect ratio:** Landscape 2:1
- **Resolution:** 1200 × 600 px
- **Style:** Biological textbook illustration, clean line art with light color fills, earth cross section at the bottom, green land in the middle, sky blue at top, AP Biology high school level
- **Perspective:** Cross-section view from left to right, showing atmosphere above, land surface in the middle, and underground/underwater layers below
- Do not place any white board on the lower edge of the image

## Spatial Layout (Left to Right, Top to Bottom)

### Sky / Atmosphere (top 30% of image)

- **Upper sky** (top 15%): Clear gradient from white at very top to light sky blue (#87CEEB). A few small white cumulus clouds in the upper-left and upper-right corners. A pale yellow sun disc in the upper-right area (no rays or glow effects). This region represents the atmospheric reservoir.
- **Lower sky** (15–30%): Slightly deeper blue. A few birds silhouetted (tiny, simple) flying in the center-left area. Faint rain falling from one cloud on the right side — simple vertical blue-gray lines suggesting precipitation connecting atmosphere to land/ocean.

### Land Surface and Vegetation (middle band, 30–55% from top)

The land occupies the left two-thirds of the image width. The right third is ocean.

- **Far left (0–15% width):** Rocky mountain/volcanic area with one snow-capped peak and one volcano peak. Gray-brown rocky outcrop (#8B7D6B) with sparse dark green shrubs. Snow at the caps of the mountains.  Represents geological/rock reservoir. A small volcanic vent or hot spring at the peak emitting a faint wisp (no text labels).
- **Left-center (15–40% width):** Temperate forest. Dense canopy of mixed deciduous and coniferous trees in rich greens (#2E8B57 dark green canopy, #3CB371 medium green understory). Tree trunks visible in brown (#8B4513). Fallen leaves and decomposing matter visible at the base. This represents the terrestrial organism reservoir and connects to soil decomposition below.
- **Center (40–55% width):** Agricultural/grassland area. Shorter golden-green grasses (#9ACD32) with a small farm structure, simple red barn silhouette, one cow silhouette. A factory smokestack in the background emitting a gray plume (represents human industrial activity — for the Human Impact toggle overlay). A river or stream (#4682B4 blue) flows from left to right through this zone, cutting through the land before reaching the ocean. The stream bed is visible in cross-section where it meets the soil layers below.
- **Right-center (55–65% width):** Coastal wetland/marsh transition zone. Low green marsh grasses (#6B8E23) at the water's edge. Muddy brown shoreline. This is where land meets ocean — a critical zone for nutrient exchange (runoff, erosion).

### Ocean (right third, 55–100% width, from 30% to 75% depth)

- **Surface water** (30–45% depth): Bright blue (#4169E1) with gentle wave patterns. A few small fish silhouettes near the surface. Tiny green dots near the surface representing phytoplankton (no labels). A simple boat silhouette on the surface.
- **Mid-depth water** (45–60% depth): Deeper blue (#1E3A5F). Larger fish silhouettes. Suggestion of dissolved particles — tiny scattered dots. Represents the dissolved oceanic reservoir.
- **Deep ocean** (60–75% depth): Very dark blue (#0D1B2A). Faint suggestion of deep-sea organisms. This transitions to the ocean floor sediment below.

### Underground / Below Surface (bottom 25%, from 75% to 100% depth)

This band spans the full width, showing what's below the land (left 2/3) and below the ocean floor (right 1/3).

- **Topsoil layer** (75–82% depth, under land only): Rich dark brown (#5C4033) with visible root systems extending down from the trees and grasses above. Small organisms visible — earthworms (pink, simple curved shapes), tiny arthropod silhouettes. Decomposing leaf litter visible as lighter brown patches. This represents the soil organic matter reservoir.
- **Subsoil / mineral layer** (82–90% depth, under land): Lighter tan-brown (#C4A882) with fewer roots. Rock fragments visible. Groundwater suggested by a slightly blue-tinted horizontal band (#B0C4DE) — an aquifer layer running through this zone. The aquifer connects visually to the river above (water seeps down) and extends toward the ocean.
- **Bedrock / deep rock** (90–100% depth, full width): Gray rock (#808080) with fossil shapes embedded — simple shell and bone silhouettes in slightly lighter gray. Represents the geological/fossil reservoir (fossil fuels, calcium carbonate, phosphate rock). Under the ocean side, this transitions to **ocean floor sediment** — layered brown and gray bands representing marine sediment accumulation.

## Reservoir Color Coding

Each major reservoir must be visually distinct by color so overlays can reference them:

| Reservoir | Location in Image | Dominant Color | Hex |
|-----------|------------------|----------------|-----|
| Atmosphere | Top 30% | Light sky blue | #87CEEB |
| Terrestrial organisms | Left-center forest canopy | Rich green | #2E8B57 |
| Soil organic matter | Below land, topsoil band | Dark brown | #5C4033 |
| Freshwater (river/aquifer) | Center stream + underground band | Steel blue | #4682B4 |
| Ocean surface | Right third, upper water | Royal blue | #4169E1 |
| Deep ocean | Right third, lower water | Navy | #1E3A5F |
| Ocean sediment | Bottom-right, below ocean | Gray-brown | #A0926B |
| Rock / fossil reserves | Bottom band, full width | Medium gray | #808080 |
| Human/industrial | Center, barn + smokestack area | Muted red-gray | #8B6969 |

## Key Visual Elements for Each Cycle (no labels — just visual presence)

These elements must be visually present so the overlay arrows can connect them meaningfully:

### For the Carbon Cycle
- Trees with visible root-to-canopy structure (photosynthesis/respiration)
- Decomposing matter in soil (decomposition)
- Fossil shapes in bedrock (fossil fuels)
- Factory smokestack with gray plume (combustion)
- Ocean surface phytoplankton dots (marine photosynthesis)
- Deep ocean dark zone (deep carbon storage)

### For the Nitrogen Cycle
- Root nodules visible on legume-like plants in the grassland area — small round pink/tan bumps on roots (#DEB887)
- Soil bacteria suggested by tiny colored dots in the topsoil — clusters of pale yellow dots (#F0E68C)
- Lightning bolt shape faintly visible in one cloud (atmospheric nitrogen fixation)
- Agricultural area with fertilizer suggestion (green-tinged soil near farm)

### For the Phosphorus Cycle
- Rock/mineral deposits visible in bedrock — lighter crystalline patches (#D3D3D3)
- Weathered rock fragments in subsoil layer
- Aquatic sediment layers clearly visible on ocean floor
- Runoff suggestion where river meets ocean (slightly murky water at coast)

### For the Water Cycle
- Clouds with rain (evaporation/precipitation)
- River flowing from mountain to ocean (surface runoff)
- Underground aquifer band (groundwater)
- Transpiration from tree canopy (very faint upward wisps from treetops — barely visible, no arrows)
- Ocean evaporation zone (very faint wisps rising from ocean surface)

## Style Notes

- All transitions between zones should be smooth and naturalistic — no harsh grid lines
- Use subtle shading to distinguish layers (topsoil vs. subsoil vs. bedrock)
- Keep the illustration clean and uncluttered — the overlay system will add all labels, arrows, and annotations
- The cross-section "cut" edges (left side mountain, right side deep ocean) should fade to white or have a clean geological cross-section style edge
- Maintain enough whitespace/visual breathing room in each reservoir zone for overlay markers (30–40 px clear space per marker)

## REMINDER: No text, labels, numbers, arrows, callout lines, leader lines, or annotation marks anywhere in the image. The overlay system handles all annotations.
