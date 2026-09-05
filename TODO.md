# TODO

<!-- p5js-v2-audit-2026-09-05 -->
## p5.js 2.x Upgrade: MicroSim Fixes Needed (2026-09-05)

A static scan of this repo's `docs/sims/` MicroSims found **10 sim(s)** using p5.js v1-only APIs that will break if upgraded to p5.js 2.x (the microsim-generator skill's templates now default to p5@2.3.2). Fix these before bumping this repo's MicroSims past p5@1.x.

- [ ] **biogeochemical-cycles** (`docs/sims/biogeochemical-cycles/`)
    - `biogeochemical-cycles.js` uses `preload()`, which p5.js v2 removed entirely — move the loading calls into `async function setup()` and `await` each `load*()` call before `createCanvas()`.
    - `biogeochemical-cycles.js` uses `quadraticVertex(...)`, folded into `bezierVertex()` in v2 — replace with `bezierOrder(2)` followed by single-control-point `bezierVertex()` calls.
- [ ] **brewing-beer** (`docs/sims/brewing-beer/`)
    - `brewing-beer.js` uses `preload()`, which p5.js v2 removed entirely — move the loading calls into `async function setup()` and `await` each `load*()` call before `createCanvas()`.
- [ ] **cld-builder** (`docs/sims/cld-builder/`)
    - `cld-builder.js` uses `quadraticVertex(...)`, folded into `bezierVertex()` in v2 — replace with `bezierOrder(2)` followed by single-control-point `bezierVertex()` calls.
- [ ] **cld-building-blocks** (`docs/sims/cld-building-blocks/`)
    - `cld-building-blocks.js` uses `quadraticVertex(...)`, folded into `bezierVertex()` in v2 — replace with `bezierOrder(2)` followed by single-control-point `bezierVertex()` calls.
- [ ] **comparative-anatomy** (`docs/sims/comparative-anatomy/`)
    - `comparative-anatomy.js` uses `preload()`, which p5.js v2 removed entirely — move the loading calls into `async function setup()` and `await` each `load*()` call before `createCanvas()`.
- [ ] **diagram-type-decision-tool** (`docs/sims/diagram-type-decision-tool/`)
    - `diagram-type-decision-tool.js` uses `preload()`, which p5.js v2 removed entirely — move the loading calls into `async function setup()` and `await` each `load*()` call before `createCanvas()`.
- [ ] **framework-decision-pipeline** (`docs/sims/framework-decision-pipeline/`)
    - `framework-decision-pipeline.js` uses `preload()`, which p5.js v2 removed entirely — move the loading calls into `async function setup()` and `await` each `load*()` call before `createCanvas()`.
- [ ] **microsim-architecture-overview** (`docs/sims/microsim-architecture-overview/`)
    - `microsim-architecture-overview.js` uses the old multi-control-point `bezierVertex(...)` call — v2 takes one control point per `bezierVertex()` call — chain multiple calls instead of packing several points into one; use `bezierOrder()` for a quadratic curve.
- [ ] **multi-dimensional-classifier** (`docs/sims/multi-dimensional-classifier/`)
    - `multi-dimensional-classifier.js` uses `preload()`, which p5.js v2 removed entirely — move the loading calls into `async function setup()` and `await` each `load*()` call before `createCanvas()`.
- [ ] **purpose-classification-sorter** (`docs/sims/purpose-classification-sorter/`)
    - `purpose-classification-sorter.js` uses `preload()`, which p5.js v2 removed entirely — move the loading calls into `async function setup()` and `await` each `load*()` call before `createCanvas()`.

Reference: [p5.js Teachers' Guide to v2 transition](https://p5js.org/tutorials/v2_transition/)
