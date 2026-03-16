// Leverage Point and Unintended Consequence Explorer
// CLD with intervention simulation for systems thinking
// Bloom Level: Analyze (L4) — examine cause-effect propagation

let containerWidth;
let canvasWidth = 400;
let drawHeight = 380;
let controlHeight = 120;
let canvasHeight = drawHeight + controlHeight;
let containerHeight = canvasHeight;
let margin = 15;

// System variables forming two loops: R1 (Growth) and B1 (Saturation)
const variables = [
  { id: 0, name: "Marketing\nSpend", value: 50, baseline: 50, x: 0.15, y: 0.25 },
  { id: 1, name: "Brand\nAwareness", value: 50, baseline: 50, x: 0.5, y: 0.12 },
  { id: 2, name: "Customer\nAcquisition", value: 50, baseline: 50, x: 0.85, y: 0.25 },
  { id: 3, name: "Revenue", value: 50, baseline: 50, x: 0.85, y: 0.65 },
  { id: 4, name: "Market\nSaturation", value: 50, baseline: 50, x: 0.5, y: 0.78 },
  { id: 5, name: "Acquisition\nCost", value: 50, baseline: 50, x: 0.15, y: 0.65 }
];

// Causal links: from → to with polarity (+/-)
const links = [
  { from: 0, to: 1, polarity: '+', loop: 'R1' },
  { from: 1, to: 2, polarity: '+', loop: 'R1' },
  { from: 2, to: 3, polarity: '+', loop: 'R1' },
  { from: 3, to: 0, polarity: '+', loop: 'R1' },
  { from: 2, to: 4, polarity: '+', loop: 'B1' },
  { from: 4, to: 5, polarity: '+', loop: 'B1' },
  { from: 5, to: 0, polarity: '-', loop: 'B1' }
];

let hoveredVar = -1;
let stepCount = 0;
let narrative = "Click a variable to boost it, then click 'Step Forward' to see effects propagate.";
let interventionVar = -1;
let isAutoPlaying = false;
let autoTimer = 0;

let strengthSlider, stepButton, resetButton, autoButton;

function setup() {
  updateCanvasSize();
  const canvas = createCanvas(containerWidth, containerHeight);
  canvas.parent(document.querySelector('main'));

  stepButton = createButton('Step Forward');
  stepButton.position(10, drawHeight + 8);
  stepButton.mousePressed(stepForward);

  resetButton = createButton('Reset System');
  resetButton.position(120, drawHeight + 8);
  resetButton.mousePressed(resetSystem);

  autoButton = createButton('Auto-play: OFF');
  autoButton.position(230, drawHeight + 8);
  autoButton.mousePressed(() => {
    isAutoPlaying = !isAutoPlaying;
    autoButton.html('Auto-play: ' + (isAutoPlaying ? 'ON' : 'OFF'));
  });

  strengthSlider = createSlider(1, 5, 3, 1);
  strengthSlider.position(160, drawHeight + 38);
  strengthSlider.size(canvasWidth - 180 - margin);
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
  text('Leverage Point Explorer', canvasWidth / 2, 6);

  // Auto-play
  if (isAutoPlaying) {
    autoTimer += deltaTime;
    if (autoTimer > 1000) {
      autoTimer = 0;
      stepForward();
    }
  }

  // Draw loop labels
  fill('#4CAF50');
  noStroke();
  textSize(14);
  textAlign(CENTER, CENTER);
  text('R1: Growth', canvasWidth * 0.65, drawHeight * 0.42);
  fill('#F44336');
  text('B1: Saturation', canvasWidth * 0.35, drawHeight * 0.58);

  // Draw links (arrows)
  hoveredVar = -1;
  for (let link of links) {
    let v1 = variables[link.from];
    let v2 = variables[link.to];
    let x1 = v1.x * canvasWidth;
    let y1 = v1.y * drawHeight;
    let x2 = v2.x * canvasWidth;
    let y2 = v2.y * drawHeight;

    let isR1 = link.loop === 'R1';
    stroke(isR1 ? '#4CAF50' : '#F44336');
    strokeWeight(2);

    // Offset the line slightly to avoid overlapping with reverse links
    let dx = x2 - x1;
    let dy = y2 - y1;
    let len = sqrt(dx * dx + dy * dy);
    let nx = -dy / len * 8;
    let ny = dx / len * 8;

    let ax1 = x1 + nx;
    let ay1 = y1 + ny;
    let ax2 = x2 + nx;
    let ay2 = y2 + ny;

    // Shorten to node edge
    let ux = dx / len;
    let uy = dy / len;
    let nodeR = 32;
    ax1 += ux * nodeR;
    ay1 += uy * nodeR;
    ax2 -= ux * nodeR;
    ay2 -= uy * nodeR;

    line(ax1, ay1, ax2, ay2);

    // Arrowhead
    let angle = atan2(ay2 - ay1, ax2 - ax1);
    fill(isR1 ? '#4CAF50' : '#F44336');
    noStroke();
    triangle(
      ax2, ay2,
      ax2 - cos(angle - PI / 7) * 10, ay2 - sin(angle - PI / 7) * 10,
      ax2 - cos(angle + PI / 7) * 10, ay2 - sin(angle + PI / 7) * 10
    );

    // Polarity label at midpoint
    textSize(16);
    textAlign(CENTER, CENTER);
    fill(isR1 ? '#2E7D32' : '#C62828');
    text(link.polarity, (ax1 + ax2) / 2 + nx * 0.8, (ay1 + ay2) / 2 + ny * 0.8);
  }

  // Draw variable nodes
  for (let i = 0; i < variables.length; i++) {
    let v = variables[i];
    let vx = v.x * canvasWidth;
    let vy = v.y * drawHeight;
    let nodeR = 30;

    // Hit detection
    let dx = mouseX - vx;
    let dy = mouseY - vy;
    if (sqrt(dx * dx + dy * dy) < nodeR) {
      hoveredVar = i;
    }

    let isHover = (i === hoveredVar);
    let isIntervention = (i === interventionVar);

    // Color by state
    let val = v.value;
    let nodeColor;
    if (val > v.baseline + 5) nodeColor = color(76, 175, 80); // green = increasing
    else if (val < v.baseline - 5) nodeColor = color(244, 67, 54); // red = decreasing
    else nodeColor = color(158, 158, 158); // gray = stable

    if (isIntervention) {
      stroke('#FFD700');
      strokeWeight(4);
    } else if (isHover) {
      stroke('white');
      strokeWeight(3);
    } else {
      stroke(nodeColor);
      strokeWeight(2);
    }
    fill(nodeColor);
    circle(vx, vy, nodeR * 2);

    // Value inside node
    fill('white');
    noStroke();
    textAlign(CENTER, CENTER);
    textSize(16);
    text(Math.round(v.value), vx, vy);

    // Label above/below node
    fill('black');
    textSize(11);
    let labelY = vy < drawHeight / 2 ? vy - nodeR - 16 : vy + nodeR + 10;
    text(v.name, vx, labelY);
  }

  // Narrative panel
  let narY = drawHeight * 0.92;
  fill(255, 255, 255, 200);
  noStroke();
  rect(margin, narY - 10, canvasWidth - margin * 2, 28, 4);
  fill(60);
  textAlign(LEFT, CENTER);
  textSize(11);
  text(narrative, margin + 5, narY + 4, canvasWidth - margin * 2 - 10);

  // Control labels
  fill('black');
  noStroke();
  textAlign(LEFT, CENTER);
  textSize(14);
  text('Strength: ' + strengthSlider.value(), 10, drawHeight + 48);
  text('Step: ' + stepCount, 10, drawHeight + 75);

  if (interventionVar >= 0) {
    fill('#1565C0');
    textSize(12);
    text('Intervened on: ' + variables[interventionVar].name.replace('\n', ' '), 10, drawHeight + 98);
  }
}

function mousePressed() {
  if (hoveredVar >= 0 && mouseY < drawHeight) {
    let strength = strengthSlider.value() * 5;
    interventionVar = hoveredVar;
    variables[hoveredVar].value += strength;
    stepCount = 0;
    narrative = 'Boosted "' + variables[hoveredVar].name.replace('\n', ' ') + '" by ' + strength + '. Click Step Forward to propagate.';
  }
}

function stepForward() {
  if (interventionVar < 0) {
    narrative = 'First click a variable to apply an intervention.';
    return;
  }

  stepCount++;
  let changes = [];

  // Propagate effects through causal links
  for (let link of links) {
    let fromVal = variables[link.from].value;
    let delta = (fromVal - variables[link.from].baseline) * 0.3;
    if (link.polarity === '-') delta = -delta;
    if (Math.abs(delta) > 0.5) {
      variables[link.to].value += delta;
      variables[link.to].value = constrain(variables[link.to].value, 0, 100);
      let dir = delta > 0 ? 'increased' : 'decreased';
      changes.push(variables[link.to].name.replace('\n', ' ') + ' ' + dir);
    }
  }

  if (changes.length > 0) {
    narrative = 'Step ' + stepCount + ': ' + changes.slice(0, 3).join(', ');
  } else {
    narrative = 'Step ' + stepCount + ': System approaching equilibrium.';
  }

  // After 5 steps, identify dominant loop
  if (stepCount === 5) {
    let r1Strength = Math.abs(variables[3].value - variables[3].baseline);
    let b1Strength = Math.abs(variables[5].value - variables[5].baseline);
    if (r1Strength > b1Strength) {
      narrative += ' | R1 (Growth) dominates.';
    } else {
      narrative += ' | B1 (Saturation) dominates.';
    }
  }

  // Check for leverage point
  if (interventionVar === 2 && stepCount >= 3) {
    narrative += ' ⚠ Leverage point: boosting acquisition accelerates BOTH loops!';
  }
}

function resetSystem() {
  for (let v of variables) {
    v.value = v.baseline;
  }
  interventionVar = -1;
  stepCount = 0;
  isAutoPlaying = false;
  autoButton.html('Auto-play: OFF');
  narrative = "Click a variable to boost it, then click 'Step Forward' to see effects propagate.";
}

function windowResized() {
  updateCanvasSize();
  resizeCanvas(containerWidth, containerHeight);
  strengthSlider.size(canvasWidth - 180 - margin);
  redraw();
}

function updateCanvasSize() {
  const container = document.querySelector('main').getBoundingClientRect();
  containerWidth = Math.floor(container.width);
  canvasWidth = containerWidth;
}
