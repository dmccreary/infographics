// Virtuous and Vicious Cycle Examples
// Toggle between virtuous and vicious reinforcing loops
// Bloom Level: Understand (L2) — classify reinforcing loops

let containerWidth;
let canvasWidth = 400;
let drawHeight = 400;
let controlHeight = 100;
let canvasHeight = drawHeight + controlHeight;
let containerHeight = canvasHeight;
let margin = 15;

// Scenarios: same 4-variable loop structure, different framing
const scenarios = {
  virtuous: {
    title: 'Knowledge Sharing Virtuous Cycle',
    centerLabel: 'R: Growth',
    arrowColor: '#4CAF50',
    variables: [
      { name: 'Study Effort', dir: 'up', tip: 'Time and energy spent learning new material' },
      { name: 'Understanding', dir: 'up', tip: 'Depth of knowledge about the subject' },
      { name: 'Confidence', dir: 'up', tip: 'Belief in ability to apply knowledge' },
      { name: 'Knowledge Sharing', dir: 'up', tip: 'Teaching and explaining to others' }
    ],
    explanation: 'This is a VIRTUOUS cycle: more study leads to deeper understanding, which builds confidence, which motivates knowledge sharing, which reinforces learning through teaching — creating a positive growth spiral.'
  },
  vicious: {
    title: 'Technical Debt Vicious Cycle',
    centerLabel: 'R: Decline',
    arrowColor: '#F44336',
    variables: [
      { name: 'Shortcuts Taken', dir: 'up', tip: 'Quick fixes and workarounds instead of proper solutions' },
      { name: 'Code Complexity', dir: 'up', tip: 'Harder to understand and modify the codebase' },
      { name: 'Bug Rate', dir: 'up', tip: 'More defects due to tangled, fragile code' },
      { name: 'Time Pressure', dir: 'up', tip: 'Deadlines force faster but lower quality work' }
    ],
    explanation: 'This is a VICIOUS cycle: taking shortcuts increases complexity, which raises the bug rate, which creates more time pressure, which forces more shortcuts — a downward spiral of declining quality.'
  }
};

let currentScenario = 'virtuous';
let hoveredVar = -1;
let hoveredArrow = -1;
let transitionProgress = 1;

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

  let s = scenarios[currentScenario];

  // Title
  fill('black');
  noStroke();
  textAlign(CENTER, TOP);
  textSize(18);
  text(s.title, canvasWidth / 2, 6);

  // CLD layout
  let cx = canvasWidth / 2;
  let cy = 195;
  let radius = min(canvasWidth * 0.28, 130);

  // Center reinforcing label
  fill(s.arrowColor + '20');
  stroke(s.arrowColor);
  strokeWeight(2);
  circle(cx, cy, 60);
  fill(s.arrowColor);
  noStroke();
  textAlign(CENTER, CENTER);
  textSize(14);
  textStyle(BOLD);
  text(s.centerLabel, cx, cy);
  textStyle(NORMAL);

  // Draw variables and arrows
  let vars = s.variables;
  hoveredVar = -1;
  hoveredArrow = -1;

  // Positions: top, right, bottom, left
  let angles = [-PI / 2, 0, PI / 2, PI];
  let positions = [];
  for (let i = 0; i < 4; i++) {
    let a = angles[i];
    positions.push({
      x: cx + cos(a) * radius,
      y: cy + sin(a) * radius
    });
  }

  // Draw arrows between nodes (curved)
  for (let i = 0; i < 4; i++) {
    let from = positions[i];
    let to = positions[(i + 1) % 4];

    // Check arrow hover
    let midX = (from.x + to.x) / 2 + (cy - (from.y + to.y) / 2) * 0.3;
    let midY = (from.y + to.y) / 2 + ((from.x + to.x) / 2 - cx) * 0.3;
    if (dist(mouseX, mouseY, midX, midY) < 25) {
      hoveredArrow = i;
    }

    let isHoveredArrow = (i === hoveredArrow);
    stroke(isHoveredArrow ? s.arrowColor : s.arrowColor + 'A0');
    strokeWeight(isHoveredArrow ? 3 : 2);
    noFill();

    // Curved arrow
    let ctrl1x = from.x + (midX - from.x) * 0.8;
    let ctrl1y = from.y + (midY - from.y) * 0.8;
    bezier(from.x, from.y, ctrl1x, ctrl1y, midX, midY, to.x, to.y);

    // Arrowhead at destination
    let angle = atan2(to.y - midY, to.x - midX);
    let arrLen = 10;
    fill(isHoveredArrow ? s.arrowColor : s.arrowColor + 'A0');
    noStroke();
    triangle(
      to.x, to.y,
      to.x - cos(angle - 0.4) * arrLen, to.y - sin(angle - 0.4) * arrLen,
      to.x - cos(angle + 0.4) * arrLen, to.y - sin(angle + 0.4) * arrLen
    );

    // Polarity label (+)
    fill(s.arrowColor + '80');
    noStroke();
    textAlign(CENTER, CENTER);
    textSize(16);
    textStyle(BOLD);
    text('+', midX, midY);
    textStyle(NORMAL);
  }

  // Draw variable nodes
  for (let i = 0; i < 4; i++) {
    let v = vars[i];
    let p = positions[i];
    let isHover = dist(mouseX, mouseY, p.x, p.y) < 35;
    if (isHover) hoveredVar = i;

    // Node background
    fill(isHover ? s.arrowColor + '25' : 'white');
    stroke(isHover ? s.arrowColor : '#9E9E9E');
    strokeWeight(isHover ? 2.5 : 1.5);
    let nodeW = max(textWidth(v.name) * 1.1 + 30, 100);
    textSize(14);
    nodeW = max(textWidth(v.name) + 40, 100);
    rect(p.x - nodeW / 2, p.y - 22, nodeW, 44, 8);

    // Variable name
    fill(isHover ? s.arrowColor : '#333');
    noStroke();
    textAlign(CENTER, CENTER);
    textSize(14);
    text(v.name, p.x, p.y - 4);

    // Direction arrow
    fill(v.dir === 'up' ? '#4CAF50' : '#F44336');
    textSize(18);
    text(v.dir === 'up' ? '↑' : '↓', p.x + nodeW / 2 - 18, p.y - 4);

    // Small label
    fill('#9E9E9E');
    textSize(10);
    text(v.dir === 'up' ? 'increasing' : 'decreasing', p.x, p.y + 14);
  }

  // Tooltip
  if (hoveredVar >= 0) {
    let v = vars[hoveredVar];
    let p = positions[hoveredVar];
    let tipW = min(textWidth(v.tip) + 20, 200);
    textSize(12);
    tipW = min(textWidth(v.tip) + 20, 220);
    let tipX = constrain(p.x, margin + tipW / 2, canvasWidth - margin - tipW / 2);
    let tipY = p.y + 32;

    fill('#333333E0');
    noStroke();
    rect(tipX - tipW / 2, tipY, tipW, 24, 4);
    fill('white');
    textAlign(CENTER, CENTER);
    textSize(12);
    text(v.tip, tipX, tipY + 12);
  }

  // Arrow hover tooltip
  if (hoveredArrow >= 0) {
    let fromV = vars[hoveredArrow];
    let toV = vars[(hoveredArrow + 1) % 4];
    let tip = 'When ' + fromV.name + ' increases, ' + toV.name + ' also increases (+)';
    let from = positions[hoveredArrow];
    let to = positions[(hoveredArrow + 1) % 4];
    let midX = (from.x + to.x) / 2 + (cy - (from.y + to.y) / 2) * 0.3;
    let midY = (from.y + to.y) / 2 + ((from.x + to.x) / 2 - cx) * 0.3;

    textSize(12);
    let tipW = min(textWidth(tip) + 20, canvasWidth - 40);
    let tipX = constrain(midX, margin + tipW / 2, canvasWidth - margin - tipW / 2);
    let tipY = midY + 18;

    fill('#333333E0');
    noStroke();
    rect(tipX - tipW / 2, tipY, tipW, 24, 4);
    fill('white');
    textAlign(CENTER, CENTER);
    textSize(12);
    text(tip, tipX, tipY + 12);
  }

  // Toggle button
  let btnW = 160;
  let btnX = canvasWidth / 2 - btnW / 2;
  let btnY = drawHeight - 48;
  let isVirtuous = (currentScenario === 'virtuous');
  fill(isVirtuous ? '#E8F5E9' : '#FFEBEE');
  stroke(isVirtuous ? '#4CAF50' : '#F44336');
  strokeWeight(2);
  rect(btnX, btnY, btnW, 32, 8);
  fill(isVirtuous ? '#2E7D32' : '#C62828');
  noStroke();
  textAlign(CENTER, CENTER);
  textSize(14);
  textStyle(BOLD);
  text(isVirtuous ? '→ Switch to Vicious' : '→ Switch to Virtuous', btnX + btnW / 2, btnY + 16);
  textStyle(NORMAL);

  // Explanation panel
  let infoY = drawHeight + 8;
  fill(s.arrowColor);
  noStroke();
  textAlign(LEFT, TOP);
  textSize(14);
  textWrap(WORD);
  text(s.explanation, margin, infoY, canvasWidth - margin * 2);
}

function mousePressed() {
  let btnW = 160;
  let btnX = canvasWidth / 2 - btnW / 2;
  let btnY = drawHeight - 48;
  if (mouseX >= btnX && mouseX <= btnX + btnW && mouseY >= btnY && mouseY <= btnY + 32) {
    currentScenario = (currentScenario === 'virtuous') ? 'vicious' : 'virtuous';
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
