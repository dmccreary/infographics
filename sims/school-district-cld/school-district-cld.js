// School District Infographic Adoption CLD
// Multi-loop CLD with scenario simulation
// Bloom Level: Evaluate (L5) — assess loop dominance

let containerWidth;
let canvasWidth = 400;
let drawHeight = 380;
let controlHeight = 120;
let canvasHeight = drawHeight + controlHeight;
let containerHeight = canvasHeight;
let margin = 15;

// 7 variables forming R1 (growth) and B1 (time constraint)
const variables = [
  { id: 0, name: "Teacher\nTraining", value: 50, baseline: 50, x: 0.2, y: 0.15 },
  { id: 1, name: "Teacher\nConfidence", value: 50, baseline: 50, x: 0.5, y: 0.08 },
  { id: 2, name: "Infographic\nQuality", value: 50, baseline: 50, x: 0.8, y: 0.15 },
  { id: 3, name: "Student\nEngagement", value: 50, baseline: 50, x: 0.85, y: 0.48 },
  { id: 4, name: "Learning\nOutcomes", value: 50, baseline: 50, x: 0.65, y: 0.72 },
  { id: 5, name: "Admin\nSupport", value: 50, baseline: 50, x: 0.35, y: 0.72 },
  { id: 6, name: "Teacher\nWorkload", value: 50, baseline: 50, x: 0.15, y: 0.48 }
];

const links = [
  // R1: Capability Growth (green)
  { from: 0, to: 1, pol: '+', loop: 'R1' },
  { from: 1, to: 2, pol: '+', loop: 'R1' },
  { from: 2, to: 3, pol: '+', loop: 'R1' },
  { from: 3, to: 4, pol: '+', loop: 'R1' },
  { from: 4, to: 5, pol: '+', loop: 'R1' },
  { from: 5, to: 0, pol: '+', loop: 'R1' },
  // B1: Time Constraint (orange)
  { from: 0, to: 6, pol: '+', loop: 'B1' },
  { from: 6, to: 2, pol: '-', loop: 'B1' }
];

const scenarios = [
  { name: "Baseline", desc: "System at equilibrium — no changes.",
    boost: {}, outcome: "R1 and B1 balanced. No net change." },
  { name: "Increased Training Budget", desc: "Admin Support boosted 30% → more training.",
    boost: { 5: 15 }, outcome: "R1 dominates initially. Quality and engagement rise. After several steps, workload increases but B1 effect is moderate." },
  { name: "Training Without Workload Relief", desc: "Training increases but workload not reduced.",
    boost: { 0: 20, 6: 15 }, outcome: "B1 dominates! Workload rises faster than confidence, causing Quality to DECREASE. This is the unintended consequence." }
];

let currentScenario = 0;
let stepCount = 0;
let narrative = '';
let hoveredVar = -1;
let leveragePulse = 0;

let scenarioSelect, simulateButton, resetButton;

function setup() {
  updateCanvasSize();
  const canvas = createCanvas(containerWidth, containerHeight);
  canvas.parent(document.querySelector('main'));

  scenarioSelect = createSelect();
  scenarioSelect.position(10, drawHeight + 8);
  for (let s of scenarios) scenarioSelect.option(s.name);
  scenarioSelect.changed(() => {
    currentScenario = scenarios.findIndex(s => s.name === scenarioSelect.value());
    resetSystem();
    applyScenarioBoost();
  });

  simulateButton = createButton('Simulate 10 Steps');
  simulateButton.position(10, drawHeight + 38);
  simulateButton.mousePressed(simulate10Steps);

  resetButton = createButton('Reset');
  resetButton.position(150, drawHeight + 38);
  resetButton.mousePressed(resetSystem);

  narrative = scenarios[0].desc;
}

function applyScenarioBoost() {
  let sc = scenarios[currentScenario];
  for (let id in sc.boost) {
    variables[parseInt(id)].value += sc.boost[id];
  }
  narrative = sc.desc;
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
  textSize(16);
  text('School District Infographic Adoption', canvasWidth / 2, 4);

  // Loop labels
  fill('#4CAF50');
  noStroke();
  textSize(13);
  textAlign(CENTER, CENTER);
  text('R1: Capability Growth', canvasWidth * 0.6, drawHeight * 0.42);
  fill('#FF9800');
  text('B1: Time Constraint', canvasWidth * 0.2, drawHeight * 0.35);

  leveragePulse += deltaTime * 0.003;

  // Draw links
  for (let link of links) {
    let v1 = variables[link.from];
    let v2 = variables[link.to];
    let x1 = v1.x * canvasWidth, y1 = v1.y * drawHeight;
    let x2 = v2.x * canvasWidth, y2 = v2.y * drawHeight;

    let isR1 = link.loop === 'R1';
    stroke(isR1 ? '#4CAF50' : '#FF9800');
    strokeWeight(2);

    let dx = x2 - x1, dy = y2 - y1;
    let len = sqrt(dx * dx + dy * dy);
    let nx = -dy / len * 6, ny = dx / len * 6;
    let ux = dx / len, uy = dy / len;
    let nodeR = 28;

    let ax1 = x1 + ux * nodeR + nx, ay1 = y1 + uy * nodeR + ny;
    let ax2 = x2 - ux * nodeR + nx, ay2 = y2 - uy * nodeR + ny;
    line(ax1, ay1, ax2, ay2);

    // Arrowhead
    let angle = atan2(ay2 - ay1, ax2 - ax1);
    fill(isR1 ? '#4CAF50' : '#FF9800');
    noStroke();
    triangle(ax2, ay2,
      ax2 - cos(angle - PI / 7) * 8, ay2 - sin(angle - PI / 7) * 8,
      ax2 - cos(angle + PI / 7) * 8, ay2 - sin(angle + PI / 7) * 8);

    // Polarity
    textSize(14);
    textAlign(CENTER, CENTER);
    fill(isR1 ? '#2E7D32' : '#E65100');
    text(link.pol, (ax1 + ax2) / 2 + nx, (ay1 + ay2) / 2 + ny);
  }

  // Draw variable nodes
  hoveredVar = -1;
  for (let i = 0; i < variables.length; i++) {
    let v = variables[i];
    let vx = v.x * canvasWidth, vy = v.y * drawHeight;
    let nodeR = 26;

    let dx = mouseX - vx, dy = mouseY - vy;
    if (sqrt(dx * dx + dy * dy) < nodeR) hoveredVar = i;

    // Color by state
    let diff = v.value - v.baseline;
    let nodeColor;
    if (diff > 3) nodeColor = color(76, 175, 80);
    else if (diff < -3) nodeColor = color(244, 67, 54);
    else nodeColor = color(158, 158, 158);

    // Leverage point star (Admin Support, id=5)
    if (i === 5) {
      let pulse = sin(leveragePulse) * 0.3 + 0.7;
      stroke(255, 215, 0, pulse * 255);
      strokeWeight(3);
      noFill();
      circle(vx, vy, nodeR * 2.6);
    }

    fill(nodeColor);
    stroke(i === hoveredVar ? 'white' : nodeColor);
    strokeWeight(i === hoveredVar ? 3 : 2);
    circle(vx, vy, nodeR * 2);

    // Value bar inside node
    let barW = 20, barH = 8;
    fill('rgba(0,0,0,0.3)');
    noStroke();
    rect(vx - barW / 2, vy + 4, barW, barH, 2);
    fill('white');
    rect(vx - barW / 2, vy + 4, barW * (v.value / 100), barH, 2);

    // Value text
    fill('white');
    noStroke();
    textSize(12);
    textAlign(CENTER, CENTER);
    text(Math.round(v.value), vx, vy - 5);

    // Label
    fill('black');
    textSize(10);
    let labelY = vy < drawHeight * 0.3 ? vy - nodeR - 14 : vy + nodeR + 6;
    text(v.name, vx, labelY);
  }

  // Star icon for leverage point
  fill('#FFD700');
  noStroke();
  textSize(14);
  textAlign(CENTER, CENTER);
  let lpx = variables[5].x * canvasWidth + 30;
  let lpy = variables[5].y * drawHeight;
  text('⭐', lpx, lpy);

  // Hover tooltip
  if (hoveredVar >= 0) {
    let v = variables[hoveredVar];
    let tipX = mouseX + 15, tipY = mouseY - 20;
    if (tipX + 160 > canvasWidth) tipX = mouseX - 175;
    fill(50, 50, 50, 220);
    noStroke();
    rect(tipX, tipY, 160, 35, 4);
    fill('white');
    textSize(11);
    textAlign(LEFT, TOP);
    text(v.name.replace('\n', ' ') + '\nValue: ' + Math.round(v.value) + ' (baseline: ' + v.baseline + ')', tipX + 6, tipY + 4);
  }

  // Narrative panel
  fill(60);
  noStroke();
  textAlign(LEFT, CENTER);
  textSize(12);
  textWrap(WORD);
  text(narrative, 10, drawHeight + 72, canvasWidth - 20);

  // Step counter
  fill(100);
  textSize(12);
  textAlign(RIGHT, CENTER);
  text('Step: ' + stepCount, canvasWidth - 10, drawHeight + 50);
}

function simulate10Steps() {
  for (let step = 0; step < 10; step++) {
    stepCount++;
    for (let link of links) {
      let fromVal = variables[link.from].value;
      let delta = (fromVal - variables[link.from].baseline) * 0.2;
      if (link.pol === '-') delta = -delta;
      if (Math.abs(delta) > 0.3) {
        variables[link.to].value += delta;
        variables[link.to].value = constrain(variables[link.to].value, 0, 100);
      }
    }
  }
  narrative = scenarios[currentScenario].outcome;
}

function resetSystem() {
  for (let v of variables) v.value = v.baseline;
  stepCount = 0;
  narrative = scenarios[currentScenario].desc;
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
