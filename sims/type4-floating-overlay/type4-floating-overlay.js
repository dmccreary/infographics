// Type 4 Floating Label with Edit Mode Demo
// Draggable floating labels with JSON export
// Bloom Level: Create (L6) — design floating label overlays

let containerWidth;
let canvasWidth = 400;
let drawHeight = 500;
let controlHeight = 100;
let canvasHeight = drawHeight + controlHeight;
let containerHeight = canvasHeight;
let margin = 15;

// Solar system diagram with labeled features
const features = [
  { id: 'sun', label: 'Sun', desc: 'The star at the center of our solar system. A ball of hot plasma generating energy through nuclear fusion.',
    px: 0.12, py: 0.50, lx: 0.03, ly: 0.20, color: '#FF9800' },
  { id: 'mercury', label: 'Mercury', desc: 'The smallest planet and closest to the Sun. Extreme temperature swings between day and night.',
    px: 0.25, py: 0.48, lx: 0.18, ly: 0.10, color: '#9E9E9E' },
  { id: 'venus', label: 'Venus', desc: 'Similar in size to Earth but with a thick toxic atmosphere. The hottest planet due to runaway greenhouse effect.',
    px: 0.35, py: 0.45, lx: 0.30, ly: 0.80, color: '#FFC107' },
  { id: 'earth', label: 'Earth', desc: 'Our home planet. The only known world with liquid water on its surface and life.',
    px: 0.48, py: 0.50, lx: 0.52, ly: 0.15, color: '#2196F3' },
  { id: 'mars', label: 'Mars', desc: 'The Red Planet. Has the largest volcano (Olympus Mons) and longest canyon (Valles Marineris) in the solar system.',
    px: 0.60, py: 0.47, lx: 0.62, ly: 0.82, color: '#F44336' },
  { id: 'jupiter', label: 'Jupiter', desc: 'The largest planet. A gas giant with the Great Red Spot storm and at least 95 known moons.',
    px: 0.78, py: 0.50, lx: 0.82, ly: 0.22, color: '#FF5722' }
];

// Store original positions for reset
const originalPositions = features.map(f => ({ lx: f.lx, ly: f.ly }));

let editMode = false;
let showGrid = false;
let dragging = -1;
let dragOffX = 0, dragOffY = 0;
let hoveredFeature = -1;
let selectedFeature = -1;
let copyFeedback = '';
let copyFeedbackTime = 0;

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
  text('Type 4: Floating Label Demo', canvasWidth / 2, 6);

  // Diagram area
  let diagX = margin;
  let diagY = 30;
  let diagW = canvasWidth - margin * 2;
  let diagH = drawHeight - 85;

  // Background
  fill('#1A237E');
  stroke('#E0E0E0');
  strokeWeight(1);
  rect(diagX, diagY, diagW, diagH, 4);

  // Grid in edit mode
  if (editMode && showGrid) {
    stroke('#FFFFFF15');
    strokeWeight(1);
    let step = 30;
    for (let gx = diagX + step; gx < diagX + diagW; gx += step)
      line(gx, diagY, gx, diagY + diagH);
    for (let gy = diagY + step; gy < diagY + diagH; gy += step)
      line(diagX, gy, diagX + diagW, gy);
  }

  // Draw orbit paths
  stroke('#FFFFFF20');
  strokeWeight(1);
  noFill();
  let sunX = diagX + 0.12 * diagW;
  let sunY = diagY + 0.50 * diagH;
  for (let f of features) {
    if (f.id !== 'sun') {
      let r = dist(sunX, sunY, diagX + f.px * diagW, diagY + f.py * diagH);
      circle(sunX, sunY, r * 2);
    }
  }

  // Check hover
  hoveredFeature = -1;
  for (let i = 0; i < features.length; i++) {
    let f = features[i];
    let fpx = diagX + f.px * diagW;
    let fpy = diagY + f.py * diagH;
    let flx = diagX + f.lx * diagW;
    let fly = diagY + f.ly * diagH;
    if (dist(mouseX, mouseY, fpx, fpy) < 12 || dist(mouseX, mouseY, flx, fly) < 30) {
      hoveredFeature = i;
    }
  }

  // Draw features: callout points, leader lines, labels
  for (let i = 0; i < features.length; i++) {
    let f = features[i];
    let fpx = diagX + f.px * diagW;
    let fpy = diagY + f.py * diagH;
    let flx = diagX + f.lx * diagW;
    let fly = diagY + f.ly * diagH;
    let isActive = (i === hoveredFeature || i === selectedFeature);
    let isDragged = (i === dragging);

    // Planet dot
    let planetSize = f.id === 'sun' ? 28 : f.id === 'jupiter' ? 20 : 12;
    fill(f.color);
    noStroke();
    circle(fpx, fpy, planetSize);

    // Leader line
    stroke(isActive ? f.color : f.color + '80');
    strokeWeight(isActive ? 2 : 1);
    line(fpx, fpy, flx, fly);

    // Floating label
    let labelOpacity = (editMode && dragging >= 0 && !isDragged) ? '60' : 'FF';
    let labelW = textWidth(f.label) + 20;
    textSize(14);
    labelW = max(textWidth(f.label) + 20, 60);

    if (isDragged) {
      fill('#FFFFFF30');
      stroke(f.color);
      strokeWeight(2);
      drawingContext.setLineDash([4, 4]);
      rect(flx - labelW / 2 - 4, fly - 14, labelW + 8, 28, 4);
      drawingContext.setLineDash([]);
    }

    // Label background
    fill(isActive ? f.color + 'E0' : '#000000A0');
    noStroke();
    rect(flx - labelW / 2, fly - 12, labelW, 24, 4);

    // Label text
    fill('white');
    textAlign(CENTER, CENTER);
    textSize(14);
    if (isActive) textStyle(BOLD);
    text(f.label, flx, fly);
    textStyle(NORMAL);

    // Edit mode drag handles
    if (editMode) {
      fill('#FF9800');
      noStroke();
      let hs = 6;
      rect(flx - labelW / 2 - hs / 2, fly - 12 - hs / 2, hs, hs);
      rect(flx + labelW / 2 - hs / 2, fly - 12 - hs / 2, hs, hs);
      rect(flx - labelW / 2 - hs / 2, fly + 12 - hs / 2, hs, hs);
      rect(flx + labelW / 2 - hs / 2, fly + 12 - hs / 2, hs, hs);
    }
  }

  // Coordinate readout in edit mode
  if (editMode && dragging >= 0) {
    let f = features[dragging];
    fill('#FF9800');
    noStroke();
    textAlign(LEFT, TOP);
    textSize(13);
    text(f.label + ': (' + f.lx.toFixed(2) + ', ' + f.ly.toFixed(2) + ')',
      diagX + 5, diagY + 5);
  }

  // Control buttons
  let btnY = drawHeight - 48;
  let bx = margin;
  drawBtn(bx, btnY, editMode ? 'View Mode' : 'Edit Mode', editMode, 100);
  bx += 108;
  if (editMode) {
    drawBtn(bx, btnY, 'Save JSON', false, 90); bx += 98;
    drawBtn(bx, btnY, 'Reset', false, 70); bx += 78;
    drawBtn(bx, btnY, 'Grid: ' + (showGrid ? 'ON' : 'OFF'), showGrid, 80);
  }

  // Copy feedback
  if (copyFeedback && millis() - copyFeedbackTime < 2000) {
    fill('#4CAF50');
    noStroke();
    textAlign(CENTER, CENTER);
    textSize(14);
    textStyle(BOLD);
    text(copyFeedback, canvasWidth / 2, btnY + 14);
    textStyle(NORMAL);
  }

  // Infobox
  let infoY = drawHeight + 8;
  if (!editMode) {
    let active = selectedFeature >= 0 ? selectedFeature : hoveredFeature;
    if (active >= 0) {
      let f = features[active];
      fill(f.color);
      noStroke();
      textAlign(LEFT, TOP);
      textSize(16);
      textStyle(BOLD);
      text(f.label, margin, infoY);
      textStyle(NORMAL);

      fill(60);
      textSize(14);
      textWrap(WORD);
      text(f.desc, margin, infoY + 22, canvasWidth - margin * 2);
    } else {
      fill(120);
      noStroke();
      textAlign(CENTER, CENTER);
      textSize(14);
      text('Hover over a planet to learn more', canvasWidth / 2, infoY + 35);
    }
  } else {
    fill(100);
    noStroke();
    textAlign(CENTER, CENTER);
    textSize(14);
    text('Drag labels to reposition. Save JSON to export coordinates.', canvasWidth / 2, infoY + 35);
  }
}

function drawBtn(bx, by, label, active, bw) {
  let bh = 28;
  fill(active ? '#E3F2FD' : 'white');
  stroke(active ? '#2196F3' : '#BDBDBD');
  strokeWeight(1);
  rect(bx, by, bw, bh, 6);
  fill(active ? '#1565C0' : '#616161');
  noStroke();
  textAlign(CENTER, CENTER);
  textSize(13);
  text(label, bx + bw / 2, by + bh / 2);
}

function mousePressed() {
  let btnY = drawHeight - 48;
  let bx = margin;

  // Button clicks
  if (mouseY >= btnY && mouseY <= btnY + 28) {
    if (mouseX >= bx && mouseX <= bx + 100) {
      editMode = !editMode;
      if (!editMode) { dragging = -1; selectedFeature = -1; }
      return;
    }
    bx += 108;
    if (editMode) {
      if (mouseX >= bx && mouseX <= bx + 90) { saveJSON(); return; }
      bx += 98;
      if (mouseX >= bx && mouseX <= bx + 70) { resetPositions(); return; }
      bx += 78;
      if (mouseX >= bx && mouseX <= bx + 80) { showGrid = !showGrid; return; }
    }
    return;
  }

  // Drag or select labels
  let diagX = margin;
  let diagY = 30;
  let diagW = canvasWidth - margin * 2;
  let diagH = drawHeight - 85;

  if (editMode) {
    for (let i = 0; i < features.length; i++) {
      let f = features[i];
      let flx = diagX + f.lx * diagW;
      let fly = diagY + f.ly * diagH;
      if (dist(mouseX, mouseY, flx, fly) < 30) {
        dragging = i;
        dragOffX = mouseX - flx;
        dragOffY = mouseY - fly;
        return;
      }
    }
  } else {
    if (hoveredFeature >= 0) {
      selectedFeature = (selectedFeature === hoveredFeature) ? -1 : hoveredFeature;
    } else {
      selectedFeature = -1;
    }
  }
}

function mouseDragged() {
  if (!editMode || dragging < 0) return;
  let diagX = margin;
  let diagY = 30;
  let diagW = canvasWidth - margin * 2;
  let diagH = drawHeight - 85;

  let newLx = (mouseX - dragOffX - diagX) / diagW;
  let newLy = (mouseY - dragOffY - diagY) / diagH;
  features[dragging].lx = constrain(newLx, 0.02, 0.98);
  features[dragging].ly = constrain(newLy, 0.05, 0.95);
}

function mouseReleased() {
  dragging = -1;
}

function saveJSON() {
  let json = features.map(f =>
    '  {"id": "' + f.id + '", "labelPosition": [' + f.lx.toFixed(2) + ', ' + f.ly.toFixed(2) + ']}'
  ).join(',\n');
  let output = '[\n' + json + '\n]';

  // Copy to clipboard
  let ta = document.createElement('textarea');
  ta.value = output;
  document.body.appendChild(ta);
  ta.select();
  document.execCommand('copy');
  document.body.removeChild(ta);

  copyFeedback = 'JSON copied to clipboard!';
  copyFeedbackTime = millis();
}

function resetPositions() {
  for (let i = 0; i < features.length; i++) {
    features[i].lx = originalPositions[i].lx;
    features[i].ly = originalPositions[i].ly;
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
