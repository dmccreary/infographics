// Biogeochemical Cycles Dashboard
// p5.js MicroSim — landscape.png background with cycle overlays
// Tabs: Carbon · Nitrogen · Phosphorus · Water
// Modes: Explore (hover for info) · Quiz (click to identify)
// Toggle: Human Impact (red arrows)

// ── image ──
let img;

// ── layout (computed in setup) ──
let canvasWidth, drawHeight, controlHeight, canvasHeight;
let imgW, imgH, imgY;
const MARGIN = 12;
const TITLE_H = 28;
const TAB_ROW_Y = TITLE_H;
const TAB_H = 28;
const OVERLAY_Y_OFFSET = 20; // shift all reservoir markers and arrows up/down (px)

// ── state ──
let activeCycle = 'carbon';
let showHumanImpact = false;
let quizMode = false;
let hoveredItem = null;   // {type, idx}
let quizAnswered = {};    // per cycle: Set of reservoir indices answered
let quizTarget = null;    // current quiz question index
let quizFeedback = '';
let quizFeedbackTimer = 0;

// ── controls ──
let humanImpactBox, quizModeBox;

// ═══════════════════════════════════════════════════════════
//  CYCLE DATA — coordinates as % of image (0-100)
// ═══════════════════════════════════════════════════════════

const cycles = {

// ─── CARBON CYCLE ────────────────────────────────────────
carbon: {
  title: 'The Carbon Cycle',
  reservoirs: [
    { name: 'Atmospheric CO₂',
      x: 42, y: 8,  color: '#87CEEB',
      amount: '~830 GtC',
      description: 'Carbon dioxide in the atmosphere absorbs infrared radiation, contributing to the greenhouse effect. Pre-industrial levels were ~280 ppm; current levels exceed 420 ppm.' },
    { name: 'Terrestrial Plants',
      x: 24, y: 36, color: '#2E8B57',
      amount: '~450 GtC',
      description: 'Land plants fix atmospheric CO₂ via photosynthesis (C₃, C₄, and CAM pathways), converting it to organic carbon in biomass — trunks, leaves, and roots.' },
    { name: 'Soil Organic Carbon',
      x: 22, y: 64, color: '#5C4033',
      amount: '~1,500 GtC',
      description: 'Dead organic matter is decomposed by bacteria and fungi, releasing CO₂ back to the atmosphere. Soil holds roughly twice as much carbon as the atmosphere.' },
    { name: 'Fossil Fuels',
      x: 42, y: 88, color: '#555555',
      amount: '~10,000 GtC',
      description: 'Coal, oil, and natural gas formed over millions of years from buried organic matter. Burning fossil fuels transfers carbon from the lithosphere to the atmosphere.' },
    { name: 'Ocean Surface',
      x: 78, y: 38, color: '#4169E1',
      amount: '~900 GtC',
      description: 'CO₂ dissolves in surface waters and is used by phytoplankton for photosynthesis. The ocean absorbs roughly 25% of annual human CO₂ emissions.' },
    { name: 'Deep Ocean',
      x: 84, y: 62, color: '#1E3A5F',
      amount: '~37,000 GtC',
      description: 'The deep ocean is the largest active carbon reservoir. The biological and solubility pumps transport carbon from the surface to the deep ocean over centuries.' },
    { name: 'Marine Sediment',
      x: 80, y: 80, color: '#A0926B',
      amount: '~6,000 GtC',
      description: 'Dead marine organisms sink and accumulate as carbonate sediments on the ocean floor. Over geological time, these become limestone rock.' }
  ],
  fluxes: [
    { name: 'Photosynthesis',     from: 0, to: 1, rate: '~120 GtC/yr',
      description: 'Plants absorb CO₂ from the atmosphere and convert it to glucose using light energy.', human: false },
    { name: 'Plant Respiration',  from: 1, to: 0, rate: '~60 GtC/yr',
      description: 'Plants release CO₂ back to the atmosphere through cellular respiration.', human: false },
    { name: 'Decomposition',      from: 1, to: 2, rate: '~60 GtC/yr',
      description: 'Dead plant material enters the soil where decomposers break it down, releasing nutrients.', human: false },
    { name: 'Soil Respiration',   from: 2, to: 0, rate: '~60 GtC/yr',
      description: 'Soil microbes and root respiration release CO₂ from organic matter decomposition.', human: false },
    { name: 'Ocean Uptake',       from: 0, to: 4, rate: '~90 GtC/yr',
      description: 'CO₂ dissolves into ocean surface waters driven by the partial pressure gradient.', human: false },
    { name: 'Ocean Outgassing',   from: 4, to: 0, rate: '~88 GtC/yr',
      description: 'Warmer ocean waters release dissolved CO₂ back to the atmosphere.', human: false },
    { name: 'Biological Pump',    from: 4, to: 5, rate: '~10 GtC/yr',
      description: 'Dead phytoplankton and fecal pellets sink, transporting carbon to the deep ocean.', human: false },
    { name: 'Sedimentation',      from: 5, to: 6, rate: '~0.2 GtC/yr',
      description: 'A small fraction of deep-ocean carbon reaches the seafloor and becomes sediment.', human: false },
    { name: 'Fossil Fuel Burning', from: 3, to: 0, rate: '~9.5 GtC/yr',
      description: 'Combustion of coal, oil, and gas releases ancient carbon to the atmosphere, driving climate change.', human: true },
    { name: 'Deforestation',       from: 1, to: 0, rate: '~1.5 GtC/yr',
      description: 'Clearing forests releases stored carbon and reduces future CO₂ uptake by plants.', human: true }
  ]
},

// ─── NITROGEN CYCLE ──────────────────────────────────────
nitrogen: {
  title: 'The Nitrogen Cycle',
  reservoirs: [
    { name: 'Atmospheric N₂',
      x: 42, y: 8,  color: '#B0C4DE',
      amount: '~3.9 × 10⁹ Gt',
      description: 'Molecular nitrogen (N₂) makes up 78% of the atmosphere. The triple bond makes it unreactive — only specialized processes can fix it into usable forms.' },
    { name: 'Soil NH₄⁺ / NO₃⁻',
      x: 22, y: 64, color: '#DAA520',
      amount: 'Variable',
      description: 'Ammonium (NH₄⁺) and nitrate (NO₃⁻) are the forms plants can absorb. Nitrifying bacteria convert NH₄⁺ → NO₂⁻ → NO₃⁻ in a two-step aerobic process.' },
    { name: 'Plant Biomass',
      x: 24, y: 36, color: '#2E8B57',
      amount: '~10 GtN',
      description: 'Plants assimilate NH₄⁺ or NO₃⁻ through roots and incorporate nitrogen into amino acids, nucleotides, and chlorophyll.' },
    { name: 'Root Nodule Bacteria',
      x: 28, y: 52, color: '#DEB887',
      amount: 'N/A',
      description: 'Rhizobium bacteria in legume root nodules fix atmospheric N₂ into NH₃ using the nitrogenase enzyme. This is the primary biological nitrogen fixation pathway.' },
    { name: 'Aquatic Nitrogen',
      x: 78, y: 42, color: '#4682B4',
      amount: '~6 × 10⁵ GtN',
      description: 'Dissolved nitrogen in rivers and oceans supports aquatic productivity. Excess nitrogen from runoff causes algal blooms and eutrophication.' },
    { name: 'Ocean Sediment N',
      x: 82, y: 78, color: '#A0926B',
      amount: '~4 × 10⁸ GtN',
      description: 'Organic nitrogen accumulates in marine sediments. Over geological time, some is incorporated into sedimentary rock.' }
  ],
  fluxes: [
    { name: 'Biological N₂ Fixation', from: 0, to: 3, rate: '~140 MtN/yr',
      description: 'Rhizobium and free-living bacteria convert N₂ → NH₃ using nitrogenase (requires anaerobic conditions within the nodule).', human: false },
    { name: 'Lightning Fixation',      from: 0, to: 1, rate: '~5 MtN/yr',
      description: 'Lightning energy splits N₂ and O₂, forming NOₓ that dissolves in rain and reaches soil as nitrate.', human: false },
    { name: 'Nitrification',           from: 3, to: 1, rate: 'Continuous',
      description: 'Nitrifying bacteria (Nitrosomonas, Nitrobacter) oxidize NH₄⁺ → NO₃⁻ in aerobic soil, making nitrogen available to plants.', human: false },
    { name: 'Plant Assimilation',      from: 1, to: 2, rate: '~1,200 MtN/yr',
      description: 'Roots absorb NH₄⁺ or NO₃⁻ and incorporate nitrogen into organic molecules (amino acids, nucleotides).', human: false },
    { name: 'Decomposition / Ammonification', from: 2, to: 1, rate: '~1,200 MtN/yr',
      description: 'Decomposers break down dead organisms, releasing NH₄⁺ back into the soil (ammonification).', human: false },
    { name: 'Denitrification',         from: 1, to: 0, rate: '~300 MtN/yr',
      description: 'Anaerobic bacteria convert NO₃⁻ → N₂O → N₂, returning nitrogen to the atmosphere. Occurs in waterlogged soils.', human: false },
    { name: 'Runoff',                  from: 1, to: 4, rate: '~80 MtN/yr',
      description: 'Dissolved nitrate washes from soil into streams and eventually the ocean via surface and groundwater flow.', human: false },
    { name: 'Sedimentation',           from: 4, to: 5, rate: '~10 MtN/yr',
      description: 'Particulate organic nitrogen sinks to the ocean floor and is buried in sediments.', human: false },
    { name: 'Haber-Bosch Process',     from: 0, to: 1, rate: '~120 MtN/yr',
      description: 'Industrial fixation of N₂ into NH₃ for synthetic fertilizer. Humans now fix more nitrogen than all natural processes combined.', human: true },
    { name: 'Fertilizer Runoff',       from: 1, to: 4, rate: '~50 MtN/yr',
      description: 'Excess agricultural nitrogen runs off into waterways, causing eutrophication, dead zones, and algal blooms.', human: true }
  ]
},

// ─── PHOSPHORUS CYCLE ────────────────────────────────────
phosphorus: {
  title: 'The Phosphorus Cycle',
  reservoirs: [
    { name: 'Phosphate Rock',
      x: 10, y: 82, color: '#C0C0C0',
      amount: '~4 × 10⁹ GtP',
      description: 'Apatite minerals in sedimentary and igneous rock are the ultimate source of all phosphorus. Unlike C and N, phosphorus has no significant atmospheric reservoir.' },
    { name: 'Soil Phosphorus',
      x: 22, y: 64, color: '#8B6914',
      amount: '~200 GtP',
      description: 'Weathered phosphate dissolves slowly into soil solution as PO₄³⁻. Phosphorus is often the limiting nutrient in terrestrial ecosystems because of its low solubility.' },
    { name: 'Plant Biomass',
      x: 24, y: 36, color: '#2E8B57',
      amount: '~3 GtP',
      description: 'Plants absorb dissolved PO₄³⁻ through roots. Phosphorus is essential for ATP, DNA, RNA, and phospholipid membranes.' },
    { name: 'Freshwater Phosphorus',
      x: 50, y: 46, color: '#4682B4',
      amount: '~0.1 GtP',
      description: 'Rivers carry dissolved and particulate phosphorus from weathered rock and soil erosion toward the ocean.' },
    { name: 'Ocean Phosphorus',
      x: 80, y: 42, color: '#4169E1',
      amount: '~90,000 GtP',
      description: 'Dissolved phosphate supports marine productivity. Phytoplankton use it for growth, then it cycles through the marine food web.' },
    { name: 'Ocean Sediment',
      x: 82, y: 78, color: '#A0926B',
      amount: '~4 × 10⁹ GtP',
      description: 'Phosphorus slowly accumulates on the ocean floor in sediments and biogenic deposits (fish bones, shells). Over millions of years, tectonic uplift returns it to land as rock.' }
  ],
  fluxes: [
    { name: 'Weathering',          from: 0, to: 1, rate: '~15 MtP/yr',
      description: 'Physical and chemical weathering of phosphate rock releases PO₄³⁻ into soil over geological timescales.', human: false },
    { name: 'Root Uptake',         from: 1, to: 2, rate: '~60 MtP/yr',
      description: 'Plant roots absorb dissolved PO₄³⁻. Mycorrhizal fungi greatly extend the absorptive surface area for phosphorus uptake.', human: false },
    { name: 'Decomposition',       from: 2, to: 1, rate: '~60 MtP/yr',
      description: 'Decomposers mineralize organic phosphorus back to PO₄³⁻, making it available for plant uptake again.', human: false },
    { name: 'Erosion / Runoff',    from: 1, to: 3, rate: '~20 MtP/yr',
      description: 'Rain washes dissolved and particulate phosphorus from soil into streams and rivers.', human: false },
    { name: 'River Transport',     from: 3, to: 4, rate: '~20 MtP/yr',
      description: 'Rivers deliver phosphorus to the ocean — the one-way trip that makes phosphorus a non-renewable resource on human timescales.', human: false },
    { name: 'Sedimentation',       from: 4, to: 5, rate: '~18 MtP/yr',
      description: 'Phosphorus settles to the ocean floor in dead organisms and mineral particles, eventually forming phosphorite rock.', human: false },
    { name: 'Tectonic Uplift',     from: 5, to: 0, rate: 'Geological',
      description: 'Over millions of years, tectonic forces uplift ocean sediments, exposing phosphate rock on land to restart the cycle.', human: false },
    { name: 'Fertilizer Application', from: 0, to: 1, rate: '~20 MtP/yr',
      description: 'Mined phosphate rock is processed into fertilizer and applied to agricultural soils, greatly accelerating the cycle.', human: true },
    { name: 'Agricultural Runoff', from: 1, to: 3, rate: '~10 MtP/yr',
      description: 'Excess phosphorus from fertilized fields washes into waterways, causing eutrophication and harmful algal blooms.', human: true }
  ]
},

// ─── WATER CYCLE ─────────────────────────────────────────
water: {
  title: 'The Water (Hydrological) Cycle',
  reservoirs: [
    { name: 'Atmospheric Water Vapor',
      x: 42, y: 8,  color: '#B0E0E6',
      amount: '~12,900 km³',
      description: 'Water vapor in the atmosphere (only 0.001% of total water) drives weather patterns and the entire hydrological cycle through phase changes.' },
    { name: 'Clouds / Precipitation',
      x: 72, y: 14, color: '#D3D3D3',
      amount: 'Transient',
      description: 'Water vapor condenses on aerosol particles to form clouds. Precipitation (rain, snow) delivers water back to land and ocean surfaces.' },
    { name: 'Surface Water (Rivers/Lakes)',
      x: 48, y: 46, color: '#4682B4',
      amount: '~93,100 km³',
      description: 'Rivers and lakes hold only 0.007% of Earth\'s water but are critical for terrestrial life, agriculture, and freshwater ecosystems.' },
    { name: 'Groundwater',
      x: 35, y: 76, color: '#87CEEB',
      amount: '~10.6 million km³',
      description: 'Water stored underground in aquifers — some for thousands of years. Groundwater feeds springs and wells, and slowly discharges to streams and the ocean.' },
    { name: 'Ocean',
      x: 82, y: 42, color: '#4169E1',
      amount: '~1.335 billion km³',
      description: 'The ocean holds 96.5% of all Earth\'s water. It is the primary source of atmospheric water vapor through evaporation.' },
    { name: 'Vegetation (Transpiration)',
      x: 24, y: 36, color: '#2E8B57',
      amount: 'Transient',
      description: 'Plants absorb soil water through roots and release it as vapor from leaf stomata (transpiration). A single large tree can transpire over 400 liters per day.' },
    { name: 'Ice and Snow',
      x: 8, y: 34,  color: '#E8E8E8',
      amount: '~26.4 million km³',
      description: 'Glaciers and ice caps store 1.7% of all water. Melting ice contributes to sea level rise and alters freshwater availability downstream.' }
  ],
  fluxes: [
    { name: 'Evaporation (Ocean)',   from: 4, to: 0, rate: '~425,000 km³/yr',
      description: 'Solar energy converts liquid ocean water to vapor. The ocean provides ~86% of all evaporation on Earth.', human: false },
    { name: 'Transpiration',         from: 5, to: 0, rate: '~70,000 km³/yr',
      description: 'Plants release water vapor from stomata. Transpiration pulls water up from roots and contributes significantly to atmospheric moisture over land.', human: false },
    { name: 'Precipitation (Land)',  from: 1, to: 2, rate: '~110,000 km³/yr',
      description: 'Condensed water falls as rain, snow, sleet, or hail onto land surfaces, replenishing surface water and soil moisture.', human: false },
    { name: 'Precipitation (Ocean)', from: 1, to: 4, rate: '~385,000 km³/yr',
      description: 'Most precipitation falls directly back into the ocean, completing the short oceanic water cycle loop.', human: false },
    { name: 'Surface Runoff',        from: 2, to: 4, rate: '~40,000 km³/yr',
      description: 'Water flows over the land surface in streams and rivers, eventually reaching the ocean. Runoff carries dissolved nutrients and sediment.', human: false },
    { name: 'Infiltration',          from: 2, to: 3, rate: '~15,000 km³/yr',
      description: 'Water seeps downward through soil and rock, recharging underground aquifers over years to millennia.', human: false },
    { name: 'Groundwater Discharge', from: 3, to: 4, rate: '~15,000 km³/yr',
      description: 'Groundwater slowly flows through aquifers and discharges into streams, lakes, wetlands, and directly into the ocean.', human: false },
    { name: 'Glacial Melt',          from: 6, to: 2, rate: 'Accelerating',
      description: 'Rising temperatures increase glacial and ice-sheet melting, adding freshwater to rivers and raising sea levels.', human: true },
    { name: 'Groundwater Pumping',   from: 3, to: 2, rate: '~1,000 km³/yr',
      description: 'Humans extract groundwater faster than it recharges for irrigation, industry, and drinking water — depleting aquifers worldwide.', human: true },
    { name: 'Dam / Reservoir Storage', from: 2, to: 2, rate: '~8,000 km³ stored',
      description: 'Dams alter natural flow patterns, increase evaporation from reservoirs, and trap sediment, changing downstream ecosystems.', human: true }
  ]
}

};

// ── Tab colors ──
const TAB_COLORS = {
  carbon:     { bg: '#4A4A4A', text: '#FFFFFF', activeBg: '#2C2C2C' },
  nitrogen:   { bg: '#5B8C5A', text: '#FFFFFF', activeBg: '#3D6B3C' },
  phosphorus: { bg: '#8B6914', text: '#FFFFFF', activeBg: '#6B4F0E' },
  water:      { bg: '#4682B4', text: '#FFFFFF', activeBg: '#2C5F8A' }
};

// ═══════════════════════════════════════════════════════════
//  p5.js LIFECYCLE
// ═══════════════════════════════════════════════════════════

// Note that when using the p5.js editor you MUST load this image manually.
// Look for the "+" symbol in the upper left corner of the editor.
function preload() {
  img = loadImage('landscape-v2.jpg');
}

function setup() {
  updateCanvasSize();
  let cnv = createCanvas(canvasWidth, canvasHeight);
  cnv.parent(select('main'));
  initQuizState();
}

function updateCanvasSize() {
  // Is the min needed?
  // canvasWidth = min(windowWidth - 20, 900);
  canvasWidth = windowWidth;
  let imgAspect = img.width / img.height;    // 3:2
  imgW = canvasWidth;
  imgH = canvasWidth / imgAspect;
  // this needs to be enough to have padding below the image for controls + infobox
  imgY = TAB_H + 24;                         // below tab row
  controlHeight = 40;                        // checkbox row below image
  drawHeight = imgY + imgH;
  canvasHeight = drawHeight + controlHeight + 8;
}

function windowResized() {
  updateCanvasSize();
  resizeCanvas(canvasWidth, canvasHeight);
}

function draw() {
  background('#F0F8FF');  // aliceblue

  drawMainTitle();
  drawTabs();
  drawImage();
  drawFluxArrows();
  drawReservoirs();
  drawControls();
  drawInfobox();
  drawTitle();
}

// ═══════════════════════════════════════════════════════════
//  DRAWING HELPERS
// ═══════════════════════════════════════════════════════════

function drawMainTitle() {
  textAlign(CENTER, CENTER);
  textSize(18);
  textStyle(BOLD);
  fill(30);
  noStroke();
  text('Biological and Chemical Cycles of Earth', canvasWidth / 2, TITLE_H / 2);
  textStyle(NORMAL);
}

function drawTitle() {
  let cyc = cycles[activeCycle];
  textAlign(CENTER, TOP);
  textSize(16);
  textStyle(BOLD);
  fill(30);
  noStroke();
  text(cyc.title, canvasWidth / 2, imgY + 10);
  textStyle(NORMAL);
}

function drawTabs() {
  let tabNames = ['carbon', 'nitrogen', 'phosphorus', 'water'];
  let labels   = ['Carbon', 'Nitrogen', 'Phosphorus', 'Water'];
  let tabW = (canvasWidth - MARGIN * 2 - 12) / 4;
  let tx = MARGIN;

  textAlign(CENTER, CENTER);
  textSize(13);
  textStyle(BOLD);

  for (let i = 0; i < 4; i++) {
    let isActive = (activeCycle === tabNames[i]);
    let col = TAB_COLORS[tabNames[i]];
    fill(isActive ? col.activeBg : col.bg);
    stroke(isActive ? '#FFD700' : 80);
    strokeWeight(isActive ? 2 : 1);
    rect(tx, TAB_ROW_Y, tabW, TAB_H, 6);
    fill(col.text);
    noStroke();
    text(labels[i], tx + tabW / 2, TAB_ROW_Y + TAB_H / 2);
    tx += tabW + 4;
  }
  textStyle(NORMAL);
}

function drawImage() {
  image(img, 0, imgY, imgW, imgH);
}

// ── Reservoirs (circles + labels) ──
function drawReservoirs() {
  let cyc = cycles[activeCycle];
  let res = cyc.reservoirs;

  for (let i = 0; i < res.length; i++) {
    let r = res[i];
    let px = pctX(r.x);
    let py = pctY(r.y);
    let isHovered = (hoveredItem && hoveredItem.type === 'reservoir' && hoveredItem.idx === i);
    let isQuizTarget = (quizMode && quizTarget === i);

    // In quiz mode, hide unanswered labels
    let answered = quizAnswered[activeCycle] && quizAnswered[activeCycle].has(i);

    // Glow ring on hover
    if (isHovered || isQuizTarget) {
      noFill();
      stroke(255, 215, 0, 180);
      strokeWeight(3);
      ellipse(px, py, 30, 30);
    }

    // Marker circle
    let sz = 20;
    fill(r.color);
    stroke(255);
    strokeWeight(2);
    ellipse(px, py, sz, sz);

    // Number inside circle
    fill(luminance(r.color) > 140 ? 0 : 255);
    noStroke();
    textAlign(CENTER, CENTER);
    textSize(11);
    textStyle(BOLD);
    text(i + 1, px, py);

    // Label next to marker (hidden in quiz for unanswered)
    if (!quizMode || answered) {
      drawReservoirLabel(r.name, px, py, i, res.length);
    } else if (isQuizTarget) {
      drawReservoirLabel('???', px, py, i, res.length);
    }
  }
  textStyle(NORMAL);
}

function drawReservoirLabel(label, px, py, idx, total) {
  // Place label to the right or left depending on position
  let side = (px < canvasWidth * 0.5) ? 1 : -1;
  let lx = px + side * 18;
  let ly = py;

  textAlign(side > 0 ? LEFT : RIGHT, CENTER);
  textSize(11);
  textStyle(BOLD);

  // Background pill
  let tw = textWidth(label) + 10;
  let th = 18;
  fill(0, 0, 0, 160);
  noStroke();
  rect(lx - (side > 0 ? 4 : tw - 4), ly - th / 2, tw, th, 4);

  fill(255);
  text(label, lx, ly);
  textStyle(NORMAL);
}

// ── Flux Arrows ──
function drawFluxArrows() {
  let cyc = cycles[activeCycle];
  let fluxes = cyc.fluxes;
  let res = cyc.reservoirs;

  for (let i = 0; i < fluxes.length; i++) {
    let f = fluxes[i];
    if (f.human && !showHumanImpact) continue;

    let fromR = res[f.from];
    let toR   = res[f.to];
    let x1 = pctX(fromR.x);
    let y1 = pctY(fromR.y);
    let x2 = pctX(toR.x);
    let y2 = pctY(toR.y);

    let isHovered = (hoveredItem && hoveredItem.type === 'flux' && hoveredItem.idx === i);

    // Arrow color
    let arrowColor;
    if (f.human) {
      arrowColor = isHovered ? color(255, 80, 80) : color(220, 50, 50, 200);
    } else {
      arrowColor = isHovered ? color(60, 180, 60) : color(40, 140, 40, 180);
    }

    stroke(arrowColor);
    strokeWeight(isHovered ? 5.5 : 2.5);
    noFill();

    // Self-referencing arrow (e.g., dam storage)
    if (f.from === f.to) {
      let loopR = 25;
      arc(x1 + loopR, y1 - loopR, loopR * 2, loopR * 2, PI * 0.5, PI * 2);
      drawArrowhead(x1 + loopR + loopR * cos(PI * 2), y1 - loopR + loopR * sin(PI * 2),
                    PI / 2, arrowColor);
      continue;
    }

    // Curved arrow using quadratic bezier
    let mx = (x1 + x2) / 2;
    let my = (y1 + y2) / 2;
    // Offset control point perpendicular to the line
    let dx = x2 - x1;
    let dy = y2 - y1;
    let len = sqrt(dx * dx + dy * dy);
    let nx = -dy / len;
    let ny = dx / len;
    let curvature = 25 + (i % 3) * 8; // stagger curves
    let cx = mx + nx * curvature;
    let cy = my + ny * curvature;

    beginShape();
    vertex(x1, y1);
    quadraticVertex(cx, cy, x2, y2);
    endShape();

    // Arrowhead — pull tip back from the reservoir center so it's visible
    let t = 0.85;
    let bx = (1 - t) * (1 - t) * x1 + 2 * (1 - t) * t * cx + t * t * x2;
    let by = (1 - t) * (1 - t) * y1 + 2 * (1 - t) * t * cy + t * t * y2;
    let t2 = 0.80;
    let ax = (1 - t2) * (1 - t2) * x1 + 2 * (1 - t2) * t2 * cx + t2 * t2 * x2;
    let ay = (1 - t2) * (1 - t2) * y1 + 2 * (1 - t2) * t2 * cy + t2 * t2 * y2;
    let angle = atan2(by - ay, bx - ax);
    drawArrowhead(bx, by, angle, arrowColor);

    // Label on arrow midpoint
    if (isHovered) {
      let labelX = cx;
      let labelY = cy - 10;
      textAlign(CENTER, BOTTOM);
      textSize(10);
      fill(0, 0, 0, 180);
      noStroke();
      let tw = textWidth(f.name) + 8;
      rect(labelX - tw / 2, labelY - 14, tw, 16, 3);
      fill(255);
      text(f.name, labelX, labelY);
    }
  }
}

function drawArrowhead(tipX, tipY, angle, col) {
  push();
  translate(tipX, tipY);
  rotate(angle);
  fill(col);
  stroke(col);
  strokeWeight(1);
  triangle(0, 0, -14, -7, -14, 7);
  pop();
}

// ── Controls row ──
function drawControls() {
  let cy = drawHeight + 8;

  // Human Impact checkbox (drawn manually)
  let hx = MARGIN + 10;
  let boxSz = 16;
  stroke(100);
  strokeWeight(1);
  fill(showHumanImpact ? color(220, 50, 50) : 255);
  rect(hx, cy, boxSz, boxSz, 3);
  if (showHumanImpact) {
    stroke(255);
    strokeWeight(2);
    line(hx + 3, cy + 8, hx + 7, cy + 13);
    line(hx + 7, cy + 13, hx + 13, cy + 4);
  }
  fill(40);
  noStroke();
  textAlign(LEFT, CENTER);
  textSize(12);
  text('Human Impact', hx + boxSz + 6, cy + boxSz / 2);

  // Quiz Mode checkbox
  let qx = hx + 150;
  stroke(100);
  strokeWeight(1);
  fill(quizMode ? color(50, 120, 200) : 255);
  rect(qx, cy, boxSz, boxSz, 3);
  if (quizMode) {
    stroke(255);
    strokeWeight(2);
    line(qx + 3, cy + 8, qx + 7, cy + 13);
    line(qx + 7, cy + 13, qx + 13, cy + 4);
  }
  fill(40);
  noStroke();
  text('Quiz Mode', qx + boxSz + 6, cy + boxSz / 2);

  // Quiz score (if in quiz mode)
  if (quizMode) {
    let answered = quizAnswered[activeCycle] ? quizAnswered[activeCycle].size : 0;
    let total = cycles[activeCycle].reservoirs.length;
    let sx = qx + 140;
    textSize(12);
    textStyle(BOLD);
    fill(answered === total ? color(0, 150, 0) : color(60));
    text('Score: ' + answered + ' / ' + total, sx, cy + boxSz / 2);

    if (answered === total) {
      fill(0, 150, 0);
      text('  ★ Complete!', sx + textWidth('Score: ' + answered + ' / ' + total) + 4, cy + boxSz / 2);
    }
    textStyle(NORMAL);
  }
}

// ── Floating Infobox (overlays the image, avoids hovered item) ──
function drawInfobox() {
  // Box dimensions
  // 
  let iw = min(canvasWidth * 0.55, 200);
  let ih = 110;
  let pad = MARGIN;

  // Determine which corner to place the infobox in, opposite the hovered item
  let itemX = canvasWidth / 2;
  let itemY = imgY + imgH / 2;
  if (hoveredItem) {
    let cyc = cycles[activeCycle];
    if (hoveredItem.type === 'reservoir') {
      let r = cyc.reservoirs[hoveredItem.idx];
      itemX = pctX(r.x);
      itemY = pctY(r.y);
    } else if (hoveredItem.type === 'flux') {
      let f = cyc.fluxes[hoveredItem.idx];
      let fromR = cyc.reservoirs[f.from];
      let toR   = cyc.reservoirs[f.to];
      itemX = (pctX(fromR.x) + pctX(toR.x)) / 2;
      itemY = (pctY(fromR.y) + pctY(toR.y)) / 2;
    }
  }

  // Place infobox near the hovered item but offset so it doesn't cover it
  let offsetX = 40;
  let offsetY = 30;
  let ix, iy;

  // Horizontal: offset to the right if room, else to the left
  if (itemX + offsetX + iw < canvasWidth - pad) {
    ix = itemX + offsetX;
  } else {
    ix = itemX - offsetX - iw;
  }
  // Clamp to canvas bounds
  ix = constrain(ix, pad, canvasWidth - iw - pad);

  // Vertical: place just above the item if room, else just below
  if (itemY - offsetY - ih > imgY + pad) {
    iy = itemY - offsetY - ih;
  } else {
    iy = itemY + offsetY;
  }
  // Clamp within image area
  iy = constrain(iy, imgY + pad, imgY + imgH - ih - pad);

  // Only draw if there is content to show
  let hasContent = (quizMode && quizFeedback) || hoveredItem ||
                   (quizMode && quizTarget !== null);
  if (!hasContent) return;

  // Box background — semi-transparent white
  fill(255, 255, 255, 220);
  stroke(120);
  strokeWeight(1);
  rect(ix, iy, iw, ih, 8);

  fill(40);
  noStroke();
  textSize(12);
  textAlign(LEFT, TOP);

  let tx = ix + 10;
  let ty = iy + 8;
  let maxW = iw - 20;

  if (quizMode && quizFeedback) {
    textStyle(BOLD);
    fill(quizFeedback.startsWith('✓') ? color(0, 130, 0) : color(200, 50, 50));
    text(quizFeedback, tx, ty, maxW, ih - 16);
    textStyle(NORMAL);
  } else if (hoveredItem) {
    let cyc = cycles[activeCycle];
    if (hoveredItem.type === 'reservoir') {
      let r = cyc.reservoirs[hoveredItem.idx];
      textStyle(BOLD);
      textSize(13);
      fill(40);
      text((hoveredItem.idx + 1) + '. ' + r.name + '  (' + r.amount + ')', tx, ty, maxW, 20);
      textStyle(NORMAL);
      textSize(11);
      fill(60);
      text(r.description, tx, ty + 20, maxW, ih - 36);
    } else if (hoveredItem.type === 'flux') {
      let f = cyc.fluxes[hoveredItem.idx];
      textStyle(BOLD);
      textSize(13);
      let prefix = f.human ? '⚠ ' : '';
      fill(f.human ? color(200, 50, 50) : color(40));
      text(prefix + f.name + '  (' + f.rate + ')', tx, ty, maxW, 20);
      textStyle(NORMAL);
      textSize(11);
      fill(60);
      text(f.description, tx, ty + 20, maxW, ih - 36);
      let fromName = cyc.reservoirs[f.from].name;
      let toName   = cyc.reservoirs[f.to].name;
      fill(120);
      textSize(10);
      text(fromName + '  →  ' + toName, tx, ty + ih - 30, maxW, 16);
    }
  } else if (quizMode && quizTarget !== null) {
    let r = cycles[activeCycle].reservoirs[quizTarget];
    textStyle(BOLD);
    textSize(14);
    fill(50, 120, 200);
    text('Quiz: Click on reservoir #' + (quizTarget + 1), tx, ty, maxW, 20);
    textStyle(NORMAL);
    textSize(12);
    fill(80);
    text('Hint: ' + r.description.substring(0, 100) + '…', tx, ty + 24, maxW, ih - 40);
  } else {
    fill(120);
    textSize(12);
    textStyle(ITALIC);
    if (quizMode) {
      text('Quiz mode: identify each numbered reservoir by clicking on it.', tx, ty, maxW, ih - 16);
    } else {
      text('Hover over a numbered reservoir or an arrow to learn about that component of the ' + activeCycle + ' cycle.', tx, ty, maxW, ih - 16);
    }
    textStyle(NORMAL);
  }
}

// ═══════════════════════════════════════════════════════════
//  INTERACTION
// ═══════════════════════════════════════════════════════════

function mouseMoved() {
  hoveredItem = null;

  let cyc = cycles[activeCycle];

  // Check reservoirs first — they take priority
  let nearReservoir = false;
  for (let i = 0; i < cyc.reservoirs.length; i++) {
    let r = cyc.reservoirs[i];
    let px = pctX(r.x);
    let py = pctY(r.y);
    let d = dist(mouseX, mouseY, px, py);
    if (d < 16) {
      hoveredItem = { type: 'reservoir', idx: i };
      cursor(HAND);
      return;
    }
    if (d < 26) nearReservoir = true; // within 10px of the 16px hit zone
  }

  // Check flux arrows only if not near any reservoir
  if (!nearReservoir) {
    for (let i = 0; i < cyc.fluxes.length; i++) {
      let f = cyc.fluxes[i];
      if (f.human && !showHumanImpact) continue;
      if (f.from === f.to) continue;
      if (isNearFluxArrow(f, cyc.reservoirs, i)) {
        hoveredItem = { type: 'flux', idx: i };
        cursor(HAND);
        return;
      }
    }
  }

  cursor(ARROW);
}

function isNearFluxArrow(f, reservoirs, idx) {
  let fromR = reservoirs[f.from];
  let toR   = reservoirs[f.to];
  let x1 = pctX(fromR.x), y1 = pctY(fromR.y);
  let x2 = pctX(toR.x),   y2 = pctY(toR.y);
  let mx = (x1 + x2) / 2, my = (y1 + y2) / 2;
  let dx = x2 - x1, dy = y2 - y1;
  let len = sqrt(dx * dx + dy * dy);
  if (len === 0) return false;
  let nx = -dy / len, ny = dx / len;
  let curvature = 25 + (idx % 3) * 8;
  let cx = mx + nx * curvature;
  let cy = my + ny * curvature;

  // Sample points along the quadratic bezier
  for (let t = 0; t <= 1; t += 0.05) {
    let bx = (1 - t) * (1 - t) * x1 + 2 * (1 - t) * t * cx + t * t * x2;
    let by = (1 - t) * (1 - t) * y1 + 2 * (1 - t) * t * cy + t * t * y2;
    if (dist(mouseX, mouseY, bx, by) < 10) return true;
  }
  return false;
}

function mousePressed() {
  // Tab clicks
  let tabNames = ['carbon', 'nitrogen', 'phosphorus', 'water'];
  let tabW = (canvasWidth - MARGIN * 2 - 12) / 4;
  let tx = MARGIN;
  for (let i = 0; i < 4; i++) {
    if (mouseX >= tx && mouseX <= tx + tabW &&
        mouseY >= TAB_ROW_Y && mouseY <= TAB_ROW_Y + TAB_H) {
      activeCycle = tabNames[i];
      hoveredItem = null;
      if (quizMode) pickQuizTarget();
      return;
    }
    tx += tabW + 4;
  }

  // Checkbox clicks
  let cy = drawHeight + 8;
  let boxSz = 16;
  let hx = MARGIN + 10;
  if (mouseX >= hx && mouseX <= hx + boxSz + 90 &&
      mouseY >= cy && mouseY <= cy + boxSz) {
    showHumanImpact = !showHumanImpact;
    return;
  }
  let qx = hx + 150;
  if (mouseX >= qx && mouseX <= qx + boxSz + 80 &&
      mouseY >= cy && mouseY <= cy + boxSz) {
    quizMode = !quizMode;
    if (quizMode) {
      quizFeedback = '';
      pickQuizTarget();
    } else {
      quizTarget = null;
      quizFeedback = '';
    }
    return;
  }

  // Quiz answer clicks (on reservoir markers)
  if (quizMode && quizTarget !== null) {
    let cyc = cycles[activeCycle];
    for (let i = 0; i < cyc.reservoirs.length; i++) {
      let r = cyc.reservoirs[i];
      let px = pctX(r.x);
      let py = pctY(r.y);
      if (dist(mouseX, mouseY, px, py) < 16) {
        if (i === quizTarget) {
          // Correct
          if (!quizAnswered[activeCycle]) quizAnswered[activeCycle] = new Set();
          quizAnswered[activeCycle].add(i);
          quizFeedback = '✓ Correct! That is the ' + r.name + '.';
          // Pick next target after short delay
          setTimeout(() => {
            quizFeedback = '';
            pickQuizTarget();
          }, 1500);
        } else {
          quizFeedback = '✗ Not quite — try again! Look for reservoir #' + (quizTarget + 1) + '.';
        }
        return;
      }
    }
  }
}

// ═══════════════════════════════════════════════════════════
//  QUIZ LOGIC
// ═══════════════════════════════════════════════════════════

function initQuizState() {
  quizAnswered = {};
  for (let key in cycles) {
    quizAnswered[key] = new Set();
  }
}

function pickQuizTarget() {
  let cyc = cycles[activeCycle];
  let unanswered = [];
  for (let i = 0; i < cyc.reservoirs.length; i++) {
    if (!quizAnswered[activeCycle].has(i)) {
      unanswered.push(i);
    }
  }
  if (unanswered.length === 0) {
    quizTarget = null;
    quizFeedback = '★ You identified all ' + cyc.reservoirs.length + ' reservoirs in the ' + activeCycle + ' cycle! Well done!';
  } else {
    quizTarget = unanswered[floor(random(unanswered.length))];
    quizFeedback = '';
  }
}

// ═══════════════════════════════════════════════════════════
//  UTILITIES
// ═══════════════════════════════════════════════════════════

function pctX(pct) {
  return (pct / 100) * imgW;
}

function pctY(pct) {
  return imgY + (pct / 100) * imgH + OVERLAY_Y_OFFSET;
}

function luminance(hexColor) {
  // Approximate perceived brightness
  let c = color(hexColor);
  return red(c) * 0.299 + green(c) * 0.587 + blue(c) * 0.114;
}
