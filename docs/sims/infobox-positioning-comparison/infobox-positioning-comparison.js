// Infobox Positioning Comparison MicroSim
// This simulation compares three infobox placement strategies and two event triggers.
// Instructional design checkpoint:
//  - Bloom Level: Analyze (Compare) — learners weigh pros/cons of each placement.
//  - Learning Objective: Learners will compare below, side, and floating infoboxes with hover/click events to match them to diagram layouts.
//  - Key data displayed: layout of six regions, current placement annotation, contextual pros/cons, and live infobox content.
//  - Prediction prompt: Users are encouraged (via annotation copy) to anticipate which pairing fits their current diagram before interacting.
//
// Control Inventory and Layout Planning (per p5 guide Step 2.5)
// | # | Control Type | Label Text              | Row |
// |---|--------------|-------------------------|-----|
// | 1 | Select       | "InfoBox Positioning"   | 1   |
// | 2 | Select       | "Event Mode"            | 2   |
//
// - Number of control rows: 2
// - controlHeight = (2 × 35) + 10 = 80
// - drawHeight = 520 (diagram + annotations + infobox area)
// - canvasHeight = 520 + 80 = 600
// - iframeHeight = 600 + 2 = 602 (reported in index.md)
// - sliderLeftMargin (shared left edge for DOM controls) = 260
//
// Control positions:
//   Row 1 select → position(sliderLeftMargin, drawHeight + 5)
//   Row 2 select → position(sliderLeftMargin, drawHeight + 40)
// Labels are rendered at x = margin for each row.

let containerWidth;
let canvasWidth = 400;
let drawHeight = 520;
let controlRows = 2;
let controlHeight = (controlRows * 35) + 10; // 80px tall control region
let canvasHeight = drawHeight + controlHeight;
let containerHeight = canvasHeight;
let margin = 25;
let sliderLeftMargin = 140;
let defaultTextSize = 16;

const infoPositionOptions = {
  below: {
    label: 'Below Diagram',
    annotation: 'Anchors every detail beneath the layout, ideal when you need stacked reading order.',
    highlightColor: 'rgba(255, 224, 178, 0.85)'
  },
  side: {
    label: 'Side Panel',
    annotation: 'Locks callouts in a persistent right panel so learners can compare without scrolling.',
    highlightColor: 'rgba(197, 231, 255, 0.9)'
  },
  floating: {
    label: 'Floating Tooltip',
    annotation: 'Follows the cursor to stay next to the region, perfect when space is tight.',
    highlightColor: 'rgba(214, 221, 255, 0.9)'
  }
};

const proConNotes = {
  below: 'Pro: predictable reading order.\nCon: consumes extra vertical space.',
  side: 'Pro: infobox stays visible while scanning.\nCon: needs a wide layout.',
  floating: 'Pro: zero reserved space.\nCon: tooltip can cover content if diagram is dense.'
};

const eventModeNotes = {
  hover: 'Hover mode: peek at info instantly while gliding across regions.',
  click: 'Click mode: require deliberate taps so mobile users avoid accidental tooltips.'
};

const regionData = [
  { label: 'Region 1', color: '#c0392b', info: 'Great for top-left anchors or step 1 blocks that benefit from immediate context.' },
  { label: 'Region 2', color: '#e67e22', info: 'Useful for overview panels that summarize multiple elements at once.' },
  { label: 'Region 3', color: '#d4af37', info: 'Ideal for metric callouts where comparisons are stacked underneath the diagram.' },
  { label: 'Region 4', color: '#27ae60', info: 'Pairs well with persistent side panels that should stay visible during scanning.' },
  { label: 'Region 5', color: '#1f78b4', info: 'Represents dense content—floating tooltips help avoid covering neighbors.' },
  { label: 'Region 6', color: '#8e44ad', info: 'Shows extended notes where a below panel keeps long explanations organized.' }
];

let infoPositionMode = 'below';
let eventMode = 'hover';
let infoPositionSelect;
let eventModeSelect;
let activeRegionIndex = -1;
let hasInteracted = false;
let layoutState = null; // cache latest layout for hit-testing

function setup() {
  updateCanvasSize();
  const canvas = createCanvas(containerWidth, containerHeight);
  const mainElement = document.querySelector('main');
  canvas.parent(mainElement);
  textFont('Inter, "Helvetica Neue", Arial, sans-serif');
  textSize(defaultTextSize);

  infoPositionSelect = createSelect();
  infoPositionSelect.option('Below Diagram', 'below');
  infoPositionSelect.option('Side Panel', 'side');
  infoPositionSelect.option('Floating Tooltip', 'floating');
  infoPositionSelect.selected('below');
  infoPositionSelect.changed(() => {
    infoPositionMode = infoPositionSelect.value();
    if (infoPositionMode !== 'floating' && activeRegionIndex === -1 && eventMode === 'click') {
      // no-op, but ensures layout refresh on next draw
    }
  });

  eventModeSelect = createSelect();
  eventModeSelect.option('Hover', 'hover');
  eventModeSelect.option('Click', 'click');
  eventModeSelect.selected('hover');
  eventModeSelect.changed(() => {
    eventMode = eventModeSelect.value();
    if (eventMode === 'hover') {
      activeRegionIndex = -1;
    }
  });

  describe('Interactive comparison of infobox placements and hover/click trigger modes', LABEL);
}

function draw() {
  updateCanvasSize();

  // Drawing + control regions
  fill('aliceblue');
  stroke('silver');
  strokeWeight(1);
  rect(0, 0, canvasWidth, drawHeight);
  fill('white');
  rect(0, drawHeight, canvasWidth, canvasHeight - drawHeight);

  drawTitle();

  layoutState = computeLayout();
  const hoveredRegion = (eventMode === 'hover') ? getHoveredRegion(mouseX, mouseY) : -1;
  if (eventMode === 'hover') {
    activeRegionIndex = hoveredRegion;
    if (hoveredRegion !== -1) {
      hasInteracted = true;
    }
  }

  drawModeAnnotation();
  drawEventNote();
  drawDiagram();
  drawInfoDisplay();
  drawInstructionBanner();
  drawProConNote();
  drawControlLabels();
  positionControls();
}

function drawTitle() {
  noStroke();
  fill('Black');
  textAlign(CENTER, TOP);
  textSize(24);
  text('Infobox Positioning Comparison', canvasWidth / 2, margin);
}

function drawModeAnnotation() {
  const meta = infoPositionOptions[infoPositionMode];
  const boxWidth = Math.min(canvasWidth - margin * 2, 640);
  const x = (canvasWidth - boxWidth) / 2;
  const y = margin + 40;
  push();
  fill(meta.highlightColor);
  stroke('#7a7d84');
  strokeWeight(1);
  rect(x, y, boxWidth, 54, 12);
  noStroke();
  fill('#1e1e1e');
  textAlign(CENTER, CENTER);
  textSize(16);
  text(meta.annotation, x + boxWidth / 2, y + 26);
  pop();
}

function drawEventNote() {
  const note = eventModeNotes[eventMode];
  push();
  noStroke();
  fill('#1b4965');
  textSize(14);
  textAlign(CENTER, TOP);
  text(note, canvasWidth / 2, margin + 98);
  pop();
}

function drawDiagram() {
  const { regionRects } = layoutState;
  regionRects.forEach((rectInfo, index) => {
    const isActive = index === activeRegionIndex;
    push();
    stroke(isActive ? '#1d1d1d' : '#d5d8de');
    strokeWeight(isActive ? 3 : 1);
    fill(regionData[index].color);
    rect(rectInfo.x, rectInfo.y, rectInfo.w, rectInfo.h, 16);
    noStroke();
    fill('white');
    textAlign(CENTER, CENTER);
    textSize(18);
    text(regionData[index].label, rectInfo.x + rectInfo.w / 2, rectInfo.y + rectInfo.h / 2);
    pop();
  });
}

function drawInfoDisplay() {
  if (!layoutState) return;
  const region = activeRegionIndex >= 0 ? regionData[activeRegionIndex] : null;
  const eventTip = eventMode === 'hover'
    ? 'Shown while your pointer stays inside a region.'
    : 'Stays visible until another region is clicked.';
  const title = region ? `${region.label} insight` : 'Try an infobox position';
  const body = region ? region.info : 'Hover or click any colored region to populate the infobox, then switch positioning modes to compare.';

  if (layoutState.infoBoxRect) {
    drawCard(layoutState.infoBoxRect, title, body, eventTip);
  } else if (layoutState.sidePanelRect) {
    drawCard(layoutState.sidePanelRect, title, body, eventTip);
  } else if (infoPositionMode === 'floating' && region) {
    drawFloatingTooltip(region, title, body, eventTip);
  } else if (infoPositionMode === 'floating' && !region) {
    push();
    noStroke();
    fill('#1b3a57');
    textAlign(CENTER, TOP);
    textSize(16);
    text('Floating tooltips follow the region. Interact to see the drop shadow card.', canvasWidth / 2, layoutState.diagramY + layoutState.diagramHeight + 24);
    pop();
  }
}

// draw a region card for testing infoboxes
function drawCard(rectInfo, title, body, eventTip) {

  drawingContext.shadowColor = 'rgba(15, 36, 74, 0.25)';
  drawingContext.shadowBlur = 16;
  drawingContext.shadowOffsetY = 6;
  fill('white');
  stroke('#c5ccd6');
  strokeWeight(1.5);
  rect(rectInfo.x, rectInfo.y, rectInfo.w, rectInfo.h, 18);

  const padding = 16;

  noStroke();
  fill('#0b2545');
  textAlign(LEFT, TOP);
  textSize(18);
  text(title, rectInfo.x + padding, rectInfo.y + padding);
  textSize(14);
  textLeading(20);
  const bodyWidth = rectInfo.w - padding * 2;
  const bodyHeight = rectInfo.h - padding * 2 - 42;
  text(body, rectInfo.x + padding, rectInfo.y + padding + 26, bodyWidth, bodyHeight);
  fill('#546a7b');
  text(eventTip, rectInfo.x + padding, rectInfo.y + rectInfo.h - 40, bodyWidth, 32);
}

function drawFloatingTooltip(region, title, body, eventTip) {
  const rectInfo = layoutState.regionRects[activeRegionIndex];
  const tooltipWidth = 260;
  const tooltipHeight = 130;
  let tooltipX = rectInfo.x + rectInfo.w + 18;
  if (tooltipX + tooltipWidth > canvasWidth - margin) {
    tooltipX = rectInfo.x - tooltipWidth - 18;
  }
  let tooltipY = rectInfo.y - tooltipHeight - 12;
  if (tooltipY < margin + 60) {
    tooltipY = rectInfo.y + rectInfo.h + 12;
  }
  const tooltipRect = { x: tooltipX, y: tooltipY, w: tooltipWidth, h: tooltipHeight };
  drawCard(tooltipRect, title, body, eventTip);
}

function drawInstructionBanner() {
  if (hasInteracted) return;
  const bannerHeight = 38;
  const x = margin;
  const y = drawHeight - bannerHeight - 8;
  const w = canvasWidth - margin * 2;
  push();
  fill('rgba(255, 255, 255, 0.95)');
  stroke('#a8badc');
  strokeWeight(1);
  rect(x, y, w, bannerHeight, 10);
  noStroke();
  fill('#1a2b5f');
  textAlign(CENTER, CENTER);
  textSize(16);
  text('Select an InfoBox positioning option and an event mode option', canvasWidth / 2, y + bannerHeight / 2);
  pop();
}

function drawProConNote() {
  const note = proConNotes[infoPositionMode];
  push();
  noStroke();
  fill('#243b53');
  textSize(14);
  textAlign(RIGHT, BOTTOM);
  text(note, canvasWidth - margin, drawHeight - 10);
  pop();
}

// draw the labels within the controls
function drawControlLabels() {
  fill('black');
  noStroke();
  textSize(16);
  textAlign(LEFT, CENTER);
  text('InfoBox Positioning:', margin, drawHeight + 18);
  text('Event Mode:', margin, drawHeight + 53);
}

function positionControls() {
  // The width of both of the selection lists
  const selectWidth = 130;
  infoPositionSelect.position(sliderLeftMargin, drawHeight + 5);
  infoPositionSelect.size(selectWidth, 28);
  eventModeSelect.position(sliderLeftMargin, drawHeight + 40);
  eventModeSelect.size(selectWidth, 28);
}

function computeLayout() {
  const availableWidth = canvasWidth - margin * 2;
  const columns = 3;
  const rows = 2;
  const regionGap = 18;
  const infoAreaHeight = 120;
  const usingSidePanel = infoPositionMode === 'side';
  const sidePanelWidth = usingSidePanel ? constrain(Math.floor(availableWidth * 0.28), 180, 260) : 0;
  const horizontalGap = usingSidePanel ? 22 : 0;
  let diagramWidth = availableWidth - sidePanelWidth - horizontalGap;
  diagramWidth = Math.max(260, diagramWidth);
  const rawRegionWidth = (diagramWidth - regionGap * (columns - 1)) / columns;
  const regionWidth = constrain(rawRegionWidth, 90, 220);
  // Shrink region height to 80% of previous proportion (0.58 → 0.464)
  const regionHeight = constrain(regionWidth * 0.464, 52, 90);
  const diagramHeight = rows * regionHeight + (rows - 1) * regionGap;
  const diagramY = margin + 120;
  const diagramX = usingSidePanel
    ? margin
    : margin + (availableWidth - diagramWidth) / 2;

  const regionRects = [];
  for (let row = 0; row < rows; row++) {
    for (let col = 0; col < columns; col++) {
      const index = row * columns + col;
      const x = diagramX + col * (regionWidth + regionGap);
      const y = diagramY + row * (regionHeight + regionGap);
      regionRects[index] = { x, y, w: regionWidth, h: regionHeight };
    }
  }

  const infoBoxRect = (infoPositionMode === 'below')
    ? { x: diagramX, y: diagramY + diagramHeight + 24, w: diagramWidth, h: infoAreaHeight }
    : null;

  const sidePanelRect = usingSidePanel
    ? { x: diagramX + diagramWidth + horizontalGap, y: diagramY, w: sidePanelWidth, h: diagramHeight }
    : null;

  return { diagramX, diagramY, diagramWidth, diagramHeight, regionGap, regionRects, infoBoxRect, sidePanelRect };
}

function getHoveredRegion(px, py) {
  if (!layoutState || px < 0 || py < 0 || py > drawHeight) return -1;
  for (let i = 0; i < layoutState.regionRects.length; i++) {
    const rectInfo = layoutState.regionRects[i];
    if (px >= rectInfo.x && px <= rectInfo.x + rectInfo.w && py >= rectInfo.y && py <= rectInfo.y + rectInfo.h) {
      return i;
    }
  }
  return -1;
}

function mousePressed() {
  if (eventMode !== 'click') return;
  if (!layoutState) return;
  if (mouseY > drawHeight) return; // ignore control-region clicks
  const clicked = getHoveredRegion(mouseX, mouseY);
  if (clicked !== -1) {
    activeRegionIndex = clicked;
    hasInteracted = true;
  }
}

function windowResized() {
  updateCanvasSize();
  resizeCanvas(containerWidth, containerHeight);
  positionControls();
}

function updateCanvasSize() {
  const container = document.querySelector('main').getBoundingClientRect();
  containerWidth = Math.floor(container.width);
  canvasWidth = containerWidth;
}
