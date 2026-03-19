// Relationship Diagram Explorer MicroSim
// Distinguish 4 relationship diagram subtypes
// Bloom Level: Understand (L2) — compare visual structures

let containerWidth;
let canvasWidth = 400;
let drawHeight = 400;
let controlHeight = 50;
let canvasHeight = drawHeight + controlHeight;
let containerHeight = canvasHeight;
let margin = 15;

const diagrams = [
  { name: "Venn Diagram", color: "#2196F3",
    shows: "Overlapping categories showing shared and unique attributes",
    bestFor: "Comparing 2-4 groups, showing commonalities, set intersections",
    interactive: "Hover overlaps to highlight shared attributes; click regions to see items" },
  { name: "Target / Bullseye", color: "#F44336",
    shows: "Concentric layers radiating from a core, showing priority or proximity",
    bestFor: "Priority levels, stakeholder mapping, importance ranking",
    interactive: "Click rings to expand details; animate from core outward" },
  { name: "Radial / Hub-Spoke", color: "#009688",
    shows: "A central concept connected to surrounding related concepts",
    bestFor: "Mind maps, feature sets, role relationships, ecosystem diagrams",
    interactive: "Click the hub to expand spokes; hover spokes for definitions" },
  { name: "Matrix / Grid", color: "#3F51B5",
    shows: "Two-dimensional categorization with items placed in cells",
    bestFor: "Feature comparisons, risk assessment, priority matrices, SWOT",
    interactive: "Click cells to see details; color-code by category or value" }
];

let selectedDiagram = -1;
let hoveredDiagram = -1;

function setup() {
  updateCanvasSize();
  const canvas = createCanvas(containerWidth, containerHeight);
  canvas.parent(document.querySelector('main'));
}

function draw() {
  updateCanvasSize();

  fill('aliceblue');
  stroke('silver');
  strokeWeight(1);
  rect(0, 0, canvasWidth, drawHeight);
  fill('white');
  rect(0, drawHeight, canvasWidth, controlHeight);

  // Title
  fill('black');
  noStroke();
  textAlign(CENTER, TOP);
  textSize(18);
  text('Relationship Diagram Explorer', canvasWidth / 2, 6);

  // 2x2 grid of thumbnails
  let thumbW = (canvasWidth - margin * 3) / 2;
  let thumbH = 130;
  let startY = 32;

  hoveredDiagram = -1;
  for (let i = 0; i < 4; i++) {
    let col = i % 2;
    let row = Math.floor(i / 2);
    let tx = margin + col * (thumbW + margin);
    let ty = startY + row * (thumbH + 25);

    if (mouseX >= tx && mouseX <= tx + thumbW && mouseY >= ty && mouseY <= ty + thumbH) {
      hoveredDiagram = i;
    }

    let isHover = (i === hoveredDiagram);
    let isSelected = (i === selectedDiagram);

    // Thumbnail border
    if (isSelected) {
      fill('white');
      stroke(diagrams[i].color);
      strokeWeight(3);
      drawingContext.shadowBlur = 8;
      drawingContext.shadowColor = diagrams[i].color;
    } else if (isHover) {
      fill('white');
      stroke(diagrams[i].color);
      strokeWeight(2);
    } else {
      fill('#FAFAFA');
      stroke('#E0E0E0');
      strokeWeight(1);
    }
    rect(tx, ty, thumbW, thumbH, 8);
    drawingContext.shadowBlur = 0;

    // Draw miniature
    push();
    let cx = tx + thumbW / 2;
    let cy = ty + thumbH / 2 - 5;
    if (i === 0) drawVenn(cx, cy, thumbW);
    else if (i === 1) drawTarget(cx, cy, thumbW);
    else if (i === 2) drawRadial(cx, cy, thumbW);
    else if (i === 3) drawMatrix(cx, cy, thumbW);
    pop();

    // Label
    fill('black');
    noStroke();
    textAlign(CENTER, TOP);
    textSize(13);
    text(diagrams[i].name, tx + thumbW / 2, ty + thumbH + 4);
  }

  // Detail panel
  let detailY = startY + 2 * (thumbH + 25) + 20;
  if (selectedDiagram >= 0) {
    let d = diagrams[selectedDiagram];

    fill(d.color);
    noStroke();
    textAlign(LEFT, TOP);
    textSize(16);
    text(d.name, margin, detailY);

    fill('black');
    textSize(13);
    let labelW = 85;
    text('Shows:', margin, detailY + 24);
    fill(80);
    textWrap(WORD);
    text(d.shows, margin + labelW, detailY + 24, canvasWidth - margin * 2 - labelW);

    fill('black');
    text('Best for:', margin, detailY + 48);
    fill(80);
    text(d.bestFor, margin + labelW, detailY + 48, canvasWidth - margin * 2 - labelW);

    fill('black');
    text('Interactive:', margin, detailY + 78);
    fill(d.color);
    text(d.interactive, margin + labelW, detailY + 78, canvasWidth - margin * 2 - labelW);
  } else {
    fill(120);
    noStroke();
    textAlign(CENTER, CENTER);
    textSize(14);
    text('Click a diagram to learn about its information pattern.', canvasWidth / 2, detailY + 20);
  }
}

function drawVenn(cx, cy, w) {
  let r = w * 0.18;
  let offset = r * 0.5;
  noStroke();
  fill(66, 133, 244, 100); circle(cx - offset, cy - offset * 0.3, r * 2); // Blue A
  fill(52, 168, 83, 100); circle(cx + offset, cy - offset * 0.3, r * 2);  // Green B
  fill(251, 188, 4, 100); circle(cx, cy + offset * 0.6, r * 2);           // Orange C
  fill('black');
  textSize(10);
  textAlign(CENTER, CENTER);
  text('A', cx - offset * 1.3, cy - offset);
  text('B', cx + offset * 1.3, cy - offset);
  text('C', cx, cy + offset * 1.2);
}

function drawTarget(cx, cy, w) {
  let r = w * 0.2;
  let colors = ['#EEEEEE', '#FFC107', '#FF9800', '#F44336'];
  let labels = ['Outer', 'Middle', 'Inner', 'Core'];
  for (let i = 0; i < 4; i++) {
    fill(colors[i]);
    stroke(colors[i] === '#EEEEEE' ? '#BDBDBD' : colors[i]);
    strokeWeight(1);
    circle(cx, cy, (4 - i) * r * 0.55);
  }
  fill('white');
  noStroke();
  textSize(8);
  textAlign(CENTER, CENTER);
  text('Core', cx, cy);
}

function drawRadial(cx, cy, w) {
  let hubR = w * 0.08;
  let spokeR = w * 0.25;
  // Spokes
  for (let i = 0; i < 5; i++) {
    let angle = -HALF_PI + i * TWO_PI / 5;
    let sx = cx + cos(angle) * spokeR;
    let sy = cy + sin(angle) * spokeR;
    stroke('#BDBDBD');
    strokeWeight(1);
    line(cx, cy, sx, sy);
    fill('#B0BEC5');
    noStroke();
    circle(sx, sy, hubR * 1.5);
  }
  // Hub
  fill('#009688');
  noStroke();
  circle(cx, cy, hubR * 2.5);
  fill('white');
  textSize(8);
  textAlign(CENTER, CENTER);
  text('Hub', cx, cy);
}

function drawMatrix(cx, cy, w) {
  let cellW = w * 0.12;
  let gridX = cx - cellW * 1.5;
  let gridY = cy - cellW * 1.5;
  let matColors = [
    ['#C5CAE9', '#9FA8DA', '#7986CB'],
    ['#9FA8DA', '#7986CB', '#5C6BC0'],
    ['#7986CB', '#5C6BC0', '#3F51B5']
  ];
  for (let r = 0; r < 3; r++) {
    for (let c = 0; c < 3; c++) {
      fill(matColors[r][c]);
      stroke('white');
      strokeWeight(1);
      rect(gridX + c * cellW, gridY + r * cellW, cellW, cellW);
    }
  }
}

function mousePressed() {
  if (hoveredDiagram >= 0) {
    selectedDiagram = hoveredDiagram;
  }
}

function windowResized() {
  updateCanvasSize();
  resizeCanvas(containerWidth, containerHeight);
  redraw();
}

function updateCanvasSize() {
  const container = document.querySelector('main').getBoundingClientRect();
  containerWidth = Math.floor(container.width);
  canvasWidth = containerWidth;
}
