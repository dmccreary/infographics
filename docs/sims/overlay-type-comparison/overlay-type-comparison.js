// Overlay Type Comparison Side-by-Side
// Assess which overlay type is most appropriate for a given image
// Bloom Level: Evaluate (L5)

let containerWidth;
let canvasWidth = 400;
let drawHeight = 480;
let canvasHeight = drawHeight;

let selectedPanel = 0;
let hoveredRegion = -1;

let types = [
  { name: 'Type 1: Rectangular', short: 'Rectangular Overlay',
    strengths: 'Simple to implement, works with any image, clear boundaries.',
    weaknesses: 'Poor fit for irregular shapes, can overlap important content.',
    bestFor: 'Grid-based layouts, screenshots, dashboards.' },
  { name: 'Type 2: Polygon', short: 'Polygon Overlay',
    strengths: 'Precise fit to irregular shapes, accurate region boundaries.',
    weaknesses: 'Complex to define coordinates, harder to maintain.',
    bestFor: 'Anatomy diagrams, maps, irregular shapes like organelles.' },
  { name: 'Type 3: Callout', short: 'Callout Points',
    strengths: 'Minimal visual obstruction, precise point targeting.',
    weaknesses: 'Labels can crowd edges, lines may cross.',
    bestFor: 'Technical diagrams, engine parts, circuit boards.' },
  { name: 'Type 4: Floating Label', short: 'Floating Labels',
    strengths: 'Clean look, labels stay near their targets.',
    weaknesses: 'Can obscure content beneath labels, positioning challenges.',
    bestFor: 'Simplified diagrams, infographics with few regions.' }
];

// Simplified "microscope" diagram regions
let regions = [
  { name: 'Eyepiece', x: 0.5, y: 0.12, w: 0.15, h: 0.1 },
  { name: 'Body Tube', x: 0.5, y: 0.28, w: 0.08, h: 0.18 },
  { name: 'Objective', x: 0.5, y: 0.52, w: 0.12, h: 0.08 },
  { name: 'Stage', x: 0.5, y: 0.65, w: 0.3, h: 0.06 },
  { name: 'Base', x: 0.5, y: 0.85, w: 0.35, h: 0.1 }
];

function setup() {
  updateCanvasSize();
  const canvas = createCanvas(canvasWidth, canvasHeight);
  canvas.parent(document.querySelector('main'));
  buildInfoPanel();
  describe('Side-by-side comparison of four overlay types applied to the same microscope diagram.');
}

function buildInfoPanel() {
  let mainEl = document.querySelector('main');
  let panel = document.createElement('div');
  panel.id = 'overlay-info';
  panel.style.cssText = 'background: white; border: 1px solid silver; padding: 12px; font-family: Arial, sans-serif; font-size: 13px;';
  mainEl.appendChild(panel);
  updateInfoPanel();
}

function updateInfoPanel() {
  let panel = document.getElementById('overlay-info');
  if (!panel) return;
  let t = types[selectedPanel];
  panel.innerHTML = '<div style="font-weight:bold; font-size:16px; color:#4285F4; margin-bottom:6px;">' + t.name + '</div>' +
    '<div><strong>Strengths:</strong> ' + t.strengths + '</div>' +
    '<div><strong>Weaknesses:</strong> ' + t.weaknesses + '</div>' +
    '<div><strong>Best for:</strong> ' + t.bestFor + '</div>';
}

function draw() {
  updateCanvasSize();

  fill('aliceblue');
  stroke('silver');
  strokeWeight(1);
  rect(0, 0, canvasWidth, drawHeight);

  // Title
  fill('black');
  noStroke();
  textAlign(CENTER, TOP);
  textSize(20);
  text('Overlay Type Comparison', canvasWidth / 2, 6);

  // 2x2 grid of panels
  let gap = 8;
  let panelW = (canvasWidth - gap * 3) / 2;
  let panelH = (drawHeight - 34 - gap * 3) / 2;
  let topY = 32;

  hoveredRegion = -1;

  for (let p = 0; p < 4; p++) {
    let col = p % 2;
    let row = floor(p / 2);
    let px = gap + col * (panelW + gap);
    let py = topY + gap + row * (panelH + gap);

    // Panel background
    let isSelected = (p === selectedPanel);
    if (isSelected) {
      stroke(66, 133, 244);
      strokeWeight(3);
    } else {
      stroke(200);
      strokeWeight(1);
    }
    fill(252, 252, 255);
    rect(px, py, panelW, panelH, 6);

    // Panel title
    noStroke();
    fill(isSelected ? [66, 133, 244] : [100, 100, 100]);
    textAlign(CENTER, TOP);
    textSize(12);
    text(types[p].short, px + panelW / 2, py + 4);

    // Draw microscope and overlay for this type
    let diagramX = px + 10;
    let diagramY = py + 20;
    let diagramW = panelW - 20;
    let diagramH = panelH - 26;

    drawMicroscope(diagramX, diagramY, diagramW, diagramH);
    drawOverlay(p, diagramX, diagramY, diagramW, diagramH, px, py, panelW, panelH);

    // Click detection
    if (mouseX >= px && mouseX <= px + panelW && mouseY >= py && mouseY <= py + panelH) {
      cursor(HAND);
    }
  }
}

function drawMicroscope(x, y, w, h) {
  // Simple microscope shape
  let cx = x + w / 2;

  // Eyepiece
  fill(160, 170, 180);
  stroke(120);
  strokeWeight(1);
  rect(cx - w * 0.1, y, w * 0.2, h * 0.08, 3);

  // Body tube
  fill(170, 180, 190);
  rect(cx - w * 0.05, y + h * 0.08, w * 0.1, h * 0.2);

  // Objective
  fill(140, 150, 165);
  rect(cx - w * 0.08, y + h * 0.45, w * 0.16, h * 0.08, 2);

  // Stage
  fill(180, 190, 200);
  rect(cx - w * 0.2, y + h * 0.58, w * 0.4, h * 0.06, 2);

  // Arm
  fill(150, 160, 170);
  stroke(120);
  rect(cx + w * 0.12, y + h * 0.15, w * 0.05, h * 0.5);

  // Base
  fill(140, 150, 165);
  rect(cx - w * 0.22, y + h * 0.78, w * 0.44, h * 0.12, 4);
}

function drawOverlay(type, x, y, w, h, px, py, panelW, panelH) {
  let isHoverPanel = (mouseX >= px && mouseX <= px + panelW && mouseY >= py && mouseY <= py + panelH);

  for (let i = 0; i < regions.length; i++) {
    let r = regions[i];
    let rx = x + r.x * w - (r.w * w) / 2;
    let ry = y + r.y * h - (r.h * h) / 2;
    let rw = r.w * w;
    let rh = r.h * h;
    let rcx = x + r.x * w;
    let rcy = y + r.y * h;

    let isHover = isHoverPanel && mouseX >= rx && mouseX <= rx + rw && mouseY >= ry && mouseY <= ry + rh;

    switch (type) {
      case 0: // Rectangular
        fill(255, 165, 0, isHover ? 100 : 40);
        stroke(255, 140, 0, isHover ? 200 : 80);
        strokeWeight(isHover ? 2 : 1);
        rect(rx, ry, rw, rh, 2);
        if (isHover) {
          fill(40);
          noStroke();
          textSize(10);
          textAlign(CENTER, BOTTOM);
          text(r.name, rcx, ry - 2);
        }
        break;

      case 1: // Polygon (simulate with rounded rect)
        fill(60, 179, 113, isHover ? 100 : 40);
        stroke(60, 179, 113, isHover ? 200 : 80);
        strokeWeight(isHover ? 2 : 1);
        ellipse(rcx, rcy, rw * 1.1, rh * 1.3);
        if (isHover) {
          fill(40);
          noStroke();
          textSize(10);
          textAlign(CENTER, BOTTOM);
          text(r.name, rcx, ry - 4);
        }
        break;

      case 2: // Callout points with labels at edge
        // Point marker
        fill(220, 60, 60);
        noStroke();
        ellipse(rcx, rcy, isHover ? 10 : 6, isHover ? 10 : 6);

        // Number
        fill(255);
        textSize(7);
        textAlign(CENTER, CENTER);
        noStroke();
        if (isHover) text(i + 1, rcx, rcy);

        // Leader line to edge label
        let labelX = px + panelW - 8;
        let labelY = py + 24 + i * 16;
        stroke(220, 60, 60, isHover ? 200 : 80);
        strokeWeight(isHover ? 1.5 : 0.5);
        line(rcx, rcy, labelX - 2, labelY);

        // Edge label
        fill(isHover ? [220, 60, 60] : [120, 120, 120]);
        noStroke();
        textSize(9);
        textAlign(RIGHT, CENTER);
        text((i + 1) + '. ' + r.name, labelX, labelY);
        break;

      case 3: // Floating labels
        if (isHover) {
          // Show floating label near region
          fill(66, 133, 244, 200);
          noStroke();
          let lw = textWidth(r.name) + 12;
          textSize(10);
          lw = max(lw, 50);
          rect(rcx - lw / 2, rcy - 18, lw, 16, 3);
          fill(255);
          textAlign(CENTER, CENTER);
          text(r.name, rcx, rcy - 10);

          // Arrow
          fill(66, 133, 244, 200);
          triangle(rcx - 4, rcy - 2, rcx + 4, rcy - 2, rcx, rcy + 2);
        } else {
          // Subtle indicator
          fill(66, 133, 244, 50);
          noStroke();
          ellipse(rcx, rcy, 8, 8);
        }
        break;
    }
  }
}

function mousePressed() {
  let gap = 8;
  let panelW = (canvasWidth - gap * 3) / 2;
  let panelH = (drawHeight - 34 - gap * 3) / 2;
  let topY = 32;

  for (let p = 0; p < 4; p++) {
    let col = p % 2;
    let row = floor(p / 2);
    let px = gap + col * (panelW + gap);
    let py = topY + gap + row * (panelH + gap);

    if (mouseX >= px && mouseX <= px + panelW && mouseY >= py && mouseY <= py + panelH) {
      selectedPanel = p;
      updateInfoPanel();
      break;
    }
  }
}

function windowResized() {
  updateCanvasSize();
  resizeCanvas(canvasWidth, canvasHeight);
  redraw();
}

function updateCanvasSize() {
  const container = document.querySelector('main').getBoundingClientRect();
  containerWidth = Math.floor(container.width);
  canvasWidth = containerWidth;
}
