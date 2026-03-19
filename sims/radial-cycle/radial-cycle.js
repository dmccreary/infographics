// Radial Cycle MicroSim — DMAIC Continuous Improvement
// Central hub "Quality" connected to 5 outer nodes that also cycle sequentially
let canvasWidth = 500;
let drawHeight = 420;
let controlHeight = 80;
let canvasHeight = drawHeight + controlHeight;
let margin = 25;

let containerWidth;
let containerHeight = canvasHeight;

let hubNode;
let outerNodes = [];
let outerEdges = [];   // sequential cycle edges between outer nodes
let spokeEdges = [];   // hub-to-outer spokes
let currentHover = null;
let hubRadius = 80;
let outerRadius = 70;

// Descriptions for each node
let descriptions = {
  'Quality':  'The central driver of the cycle. Every stage feeds back into quality, and quality goals shape every stage. In a radial cycle, the hub powers all outer stages simultaneously.',
  'Define':   'Identify the problem, set goals, and define the scope of improvement. Clear definitions ensure every subsequent stage targets the right issue.',
  'Measure':  'Collect data on current performance to establish a baseline. Accurate measurement reveals the gap between current state and the quality goal.',
  'Analyze':  'Examine the data to identify root causes of defects or inefficiency. Analysis transforms raw measurements into actionable insights.',
  'Improve':  'Develop and implement solutions that address root causes. Improvement turns analytical findings into concrete changes in the process.',
  'Control':  'Monitor the improved process to sustain gains. Control mechanisms ensure improvements persist and feed new data back into the next cycle.'
};

// Color scheme
let hubColor = '#E53935';      // red
let hubBorder = '#B71C1C';
let outerColors = ['#4285F4', '#34A853', '#FB8C00', '#8E44AD', '#00897B'];
let outerBorders = ['#1565C0', '#1B5E20', '#E65100', '#5B2C6F', '#004D40'];
let outerLabels = ['Define', 'Measure', 'Analyze', 'Improve', 'Control'];

function setup() {
  updateCanvasSize();
  const canvas = createCanvas(containerWidth, containerHeight);
  canvas.parent(document.querySelector('main'));
  initializeNetwork();
  describe('Radial cycle diagram showing a DMAIC continuous improvement cycle with Quality at the center hub connected to five outer stages that also cycle sequentially.', LABEL);
}

function initializeNetwork() {
  let centerX = canvasWidth / 2;
  let centerY = drawHeight / 2 + 10;
  let ringRadius = min(canvasWidth, drawHeight) / 2 - outerRadius - margin + 5;

  // Hub node
  hubNode = {
    id: 'Quality', label: 'Quality',
    x: centerX, y: centerY,
    color: hubColor, borderColor: hubBorder,
    textColor: 'white', size: hubRadius
  };

  // Outer nodes arranged in a circle, starting at top (-PI/2)
  outerNodes = [];
  for (let i = 0; i < 5; i++) {
    let angle = -PI / 2 + (TWO_PI / 5) * i;
    outerNodes.push({
      id: outerLabels[i], label: outerLabels[i],
      x: centerX + cos(angle) * ringRadius,
      y: centerY + sin(angle) * ringRadius,
      color: outerColors[i], borderColor: outerBorders[i],
      textColor: 'white', size: outerRadius
    });
  }

  // Sequential cycle edges (outer ring)
  outerEdges = [];
  for (let i = 0; i < 5; i++) {
    outerEdges.push({ from: outerLabels[i], to: outerLabels[(i + 1) % 5] });
  }
}

function draw() {
  // Drawing area
  fill('aliceblue');
  stroke('silver');
  strokeWeight(1);
  rect(0, 0, canvasWidth, drawHeight);

  // Control area
  fill('white');
  stroke('silver');
  rect(0, drawHeight, canvasWidth, controlHeight);

  // Title
  fill('black');
  noStroke();
  textSize(22);
  textAlign(CENTER, TOP);
  text('Radial Cycle: Continuous Improvement', canvasWidth / 2, 8);

  // Subtitle
  textStyle(ITALIC);
  textSize(16);
  fill('#555');
  text('DMAIC is a classic quality improvement radial diagram', canvasWidth / 2, 34);
  textStyle(NORMAL);

  checkHover();
  drawSpokes();
  drawOuterEdges();
  drawAllNodes();
  drawDescription();
}

function checkHover() {
  currentHover = null;
  // Check hub
  if (dist(mouseX, mouseY, hubNode.x, hubNode.y) < hubNode.size / 2) {
    currentHover = hubNode.id;
    return;
  }
  // Check outer nodes
  for (let n of outerNodes) {
    if (dist(mouseX, mouseY, n.x, n.y) < n.size / 2) {
      currentHover = n.id;
      return;
    }
  }
}

// Draw dashed spokes from hub to each outer node
function drawSpokes() {
  for (let n of outerNodes) {
    let angle = atan2(n.y - hubNode.y, n.x - hubNode.x);
    let x1 = hubNode.x + cos(angle) * (hubNode.size / 2);
    let y1 = hubNode.y + sin(angle) * (hubNode.size / 2);
    let x2 = n.x - cos(angle) * (n.size / 2);
    let y2 = n.y - sin(angle) * (n.size / 2);

    // Highlight spoke if either end is hovered
    let isActive = (currentHover === hubNode.id || currentHover === n.id);
    stroke(isActive ? '#333' : '#aaa');
    strokeWeight(isActive ? 3 : 1.5);
    drawingContext.setLineDash([6, 4]);
    line(x1, y1, x2, y2);
    drawingContext.setLineDash([]);
  }
}

// Draw curved arrows between sequential outer nodes
function drawOuterEdges() {
  let centerX = canvasWidth / 2;
  let centerY = drawHeight / 2 + 10;

  for (let edge of outerEdges) {
    let fromNode = outerNodes.find(n => n.id === edge.from);
    let toNode = outerNodes.find(n => n.id === edge.to);

    let angle1 = atan2(toNode.y - fromNode.y, toNode.x - fromNode.x) - 0.5;
    let fromX = fromNode.x + cos(angle1) * (fromNode.size / 2);
    let fromY = fromNode.y + sin(angle1) * (fromNode.size / 2);

    let angle2 = atan2(toNode.y - fromNode.y, toNode.x - fromNode.x) + 0.5;
    let toX = toNode.x - cos(angle2) * (toNode.size / 2);
    let toY = toNode.y - sin(angle2) * (toNode.size / 2);

    // Control point: push outward from center
    let midX = (fromX + toX) / 2;
    let midY = (fromY + toY) / 2;
    let dx = midX - centerX;
    let dy = midY - centerY;
    let len = sqrt(dx * dx + dy * dy);
    let curveOffset = 25;
    let controlX = midX + (dx / len) * curveOffset;
    let controlY = midY + (dy / len) * curveOffset;

    // Draw curve
    noFill();
    stroke('#555');
    strokeWeight(3);
    bezier(fromX, fromY, controlX, controlY, controlX, controlY, toX, toY);

    // Arrowhead
    let arrowAngle = atan2(toY - controlY, toX - controlX);
    let arrowSize = 10;
    fill('#555');
    noStroke();
    push();
    translate(toX, toY);
    rotate(arrowAngle);
    triangle(0, 0, -arrowSize * 1.5, -arrowSize * 0.6, -arrowSize * 1.5, arrowSize * 0.6);
    pop();
  }
}

function drawAllNodes() {
  // Draw outer nodes
  for (let n of outerNodes) {
    let isHover = (currentHover === n.id);
    stroke(n.borderColor);
    strokeWeight(isHover ? 4 : 2);
    fill(n.color);
    circle(n.x, n.y, n.size);
    fill(n.textColor);
    noStroke();
    textAlign(CENTER, CENTER);
    textSize(16);
    text(n.label, n.x, n.y);
  }

  // Draw hub node (on top)
  let isHubHover = (currentHover === hubNode.id);
  stroke(hubNode.borderColor);
  strokeWeight(isHubHover ? 5 : 3);
  fill(hubNode.color);
  circle(hubNode.x, hubNode.y, hubNode.size);
  fill(hubNode.textColor);
  noStroke();
  textAlign(CENTER, CENTER);
  textSize(20);
  textStyle(BOLD);
  text(hubNode.label, hubNode.x, hubNode.y);
  textStyle(NORMAL);
}

function drawDescription() {
  let descY = drawHeight + 8;
  let descH = controlHeight - 16;

  if (currentHover) {
    let desc = descriptions[currentHover];
    let node = (currentHover === hubNode.id) ? hubNode : outerNodes.find(n => n.id === currentHover);
    let label = node.label + ':';
    let leftMargin = 10;
    let baseFontSize = constrain(containerWidth * 0.025, 12, 14);
    let descWidth = canvasWidth - leftMargin * 2;

    noStroke();
    textAlign(LEFT, TOP);

    // Colored bold label
    textStyle(BOLD);
    textSize(baseFontSize + 4);
    fill(node.color);
    let labelW = textWidth(label);
    text(label, leftMargin, descY);

    // Description text indented past label
    let textX = leftMargin + labelW + 6;
    let textW = descWidth - labelW - 6;
    textStyle(NORMAL);
    textSize(baseFontSize);
    fill('black');
    text(desc, textX, descY + 2, textW, descH);
  } else {
    fill('#666');
    noStroke();
    textSize(constrain(containerWidth * 0.025, 12, 16));
    textAlign(CENTER, CENTER);
    text('Hover over a node to learn about its role in the cycle', canvasWidth / 2, descY + descH / 2);
  }
}

function windowResized() {
  updateCanvasSize();
  resizeCanvas(containerWidth, containerHeight);
  initializeNetwork();
  redraw();
}

function updateCanvasSize() {
  const container = document.querySelector('main').getBoundingClientRect();
  containerWidth = Math.floor(container.width);
  canvasWidth = containerWidth;
}
