// Library Selection Flowchart MicroSim
// Decision flowchart for choosing the right JS visualization library
// Bloom Level: Evaluate (L5) — assess trade-offs between libraries

let containerWidth;
let canvasWidth = 400;
let drawHeight = 350;
let controlHeight = 100;
let canvasHeight = drawHeight + controlHeight;
let containerHeight = canvasHeight;
let margin = 15;

// Decision tree structure
const decisions = [
  { id: 0, question: "What type of\ninfographic?", type: "decision", x: 0.5, y: 0.08 },
  { id: 1, question: "Geographic\ndata?", type: "decision", x: 0.12, y: 0.28 },
  { id: 2, question: "Network or\nrelationships?", type: "decision", x: 0.32, y: 0.28 },
  { id: 3, question: "Standard\nchart type?", type: "decision", x: 0.52, y: 0.28 },
  { id: 4, question: "Custom viz\nor simulation?", type: "decision", x: 0.72, y: 0.28 },
  { id: 5, question: "Complex\ndata-driven?", type: "decision", x: 0.9, y: 0.28 },
  // Terminal nodes
  { id: 10, name: "Leaflet", color: "#F44336", icon: "🗺", type: "terminal", x: 0.12, y: 0.58,
    strengths: "Tile-based maps, markers, layers, GeoJSON", alt: "Mapbox GL JS" },
  { id: 11, name: "vis-network", color: "#9C27B0", icon: "🕸", type: "terminal", x: 0.32, y: 0.58,
    strengths: "Node-edge graphs, physics, drag, zoom", alt: "D3 force layout" },
  { id: 12, name: "Chart.js", color: "#4CAF50", icon: "📊", type: "terminal", x: 0.52, y: 0.58,
    strengths: "Bar, line, pie, radar, doughnut charts", alt: "Plotly.js" },
  { id: 13, name: "p5.js", color: "#2196F3", icon: "🎨", type: "terminal", x: 0.72, y: 0.58,
    strengths: "Canvas drawing, animation, event handling", alt: "Fabric.js or Konva.js" },
  { id: 14, name: "D3.js", color: "#FF9800", icon: "📈", type: "terminal", x: 0.9, y: 0.58,
    strengths: "Treemaps, Sankey, chord, custom layouts", alt: "Observable Plot" }
];

const edges = [
  { from: 0, to: 1, label: "Geo?" },
  { from: 0, to: 2, label: "Network?" },
  { from: 0, to: 3, label: "Chart?" },
  { from: 0, to: 4, label: "Custom?" },
  { from: 0, to: 5, label: "Complex?" },
  { from: 1, to: 10, label: "Yes" },
  { from: 2, to: 11, label: "Yes" },
  { from: 3, to: 12, label: "Yes" },
  { from: 4, to: 13, label: "Yes" },
  { from: 5, to: 14, label: "Yes" }
];

// Scenarios
const scenarios = [
  { name: "Bar chart: student scores", path: [0, 3, 12], library: "Chart.js" },
  { name: "Animated physics simulation", path: [0, 4, 13], library: "p5.js" },
  { name: "Concept dependency graph", path: [0, 2, 11], library: "vis-network" },
  { name: "World map of universities", path: [0, 1, 10], library: "Leaflet" },
  { name: "Sankey diagram: student flow", path: [0, 5, 14], library: "D3.js" },
  { name: "Dashboard with 4 charts", path: [0, 3, 12], library: "Chart.js + layout" }
];

let currentPath = [];
let currentDecision = 0;
let result = null;
let hoveredNode = -1;
let selectedScenario = -1;
let animating = false;
let animStep = 0;
let animTimer = 0;

let resetButton, scenarioSelect;

function setup() {
  updateCanvasSize();
  const canvas = createCanvas(containerWidth, containerHeight);
  canvas.parent(document.querySelector('main'));

  resetButton = createButton('Reset');
  resetButton.position(10, drawHeight + 8);
  resetButton.mousePressed(resetFlowchart);

  scenarioSelect = createSelect();
  scenarioSelect.position(80, drawHeight + 8);
  scenarioSelect.option('Load Scenario...');
  for (let s of scenarios) {
    scenarioSelect.option(s.name);
  }
  scenarioSelect.changed(loadScenario);
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
  text('Library Selection Flowchart', canvasWidth / 2, 4);

  // Scenario animation
  if (animating) {
    animTimer += deltaTime;
    if (animTimer > 800) {
      animTimer = 0;
      animStep++;
      if (animStep >= scenarios[selectedScenario].path.length) {
        animating = false;
        result = decisions.find(d => d.id === scenarios[selectedScenario].path[scenarios[selectedScenario].path.length - 1]);
        currentPath = scenarios[selectedScenario].path;
      } else {
        currentPath = scenarios[selectedScenario].path.slice(0, animStep + 1);
      }
    }
  }

  hoveredNode = -1;

  // Draw edges
  for (let edge of edges) {
    let fromNode = decisions.find(d => d.id === edge.from);
    let toNode = decisions.find(d => d.id === edge.to);
    let x1 = fromNode.x * canvasWidth;
    let y1 = fromNode.y * drawHeight + 20;
    let x2 = toNode.x * canvasWidth;
    let y2 = toNode.y * drawHeight - 15;

    let isOnPath = currentPath.includes(edge.from) && currentPath.includes(edge.to);
    let isFaded = currentPath.length > 0 && !isOnPath;

    if (isOnPath) {
      stroke('#4CAF50');
      strokeWeight(3);
    } else if (isFaded) {
      stroke(220);
      strokeWeight(1);
    } else {
      stroke(180);
      strokeWeight(1.5);
    }
    line(x1, y1, x2, y2);

    // Edge label
    fill(isFaded ? 220 : 100);
    noStroke();
    textSize(10);
    textAlign(CENTER, CENTER);
    text(edge.label, (x1 + x2) / 2 + 12, (y1 + y2) / 2);
  }

  // Draw nodes
  for (let node of decisions) {
    let nx = node.x * canvasWidth;
    let ny = node.y * drawHeight;
    let isOnPath = currentPath.includes(node.id);
    let isFaded = currentPath.length > 0 && !isOnPath;

    // Hit detection
    let nw = node.type === 'terminal' ? 70 : 65;
    let nh = node.type === 'terminal' ? 50 : 40;
    if (mouseX > nx - nw / 2 && mouseX < nx + nw / 2 && mouseY > ny - nh / 2 && mouseY < ny + nh / 2) {
      hoveredNode = node.id;
    }

    if (node.type === 'decision') {
      // Decision diamond (rendered as rounded rect for readability)
      if (isFaded) {
        fill(240);
        stroke(220);
      } else if (isOnPath) {
        fill('#FFF9C4');
        stroke('#FBC02D');
      } else {
        fill('#FFF9C4');
        stroke('#FBC02D');
      }
      strokeWeight(isOnPath ? 2 : 1);
      rect(nx - nw / 2, ny - nh / 2, nw, nh, 6);

      fill(isFaded ? 200 : '#333');
      noStroke();
      textSize(10);
      textAlign(CENTER, CENTER);
      text(node.question, nx, ny);
    } else {
      // Terminal (library result)
      let alpha = isFaded ? '40' : 'FF';
      fill(node.color + alpha);
      stroke(node.color);
      strokeWeight(isOnPath ? 3 : 1);
      rect(nx - nw / 2, ny - nh / 2, nw, nh, 8);

      fill(isFaded ? '#CCC' : 'white');
      noStroke();
      textSize(18);
      textAlign(CENTER, CENTER);
      text(node.icon, nx, ny - 8);
      textSize(12);
      text(node.name, nx, ny + 14);

      // Expand when result
      if (result && result.id === node.id) {
        // Strengths below
        let infoY = ny + nh / 2 + 8;
        fill(40);
        textSize(10);
        textAlign(CENTER, TOP);
        textWrap(WORD);
        text(node.strengths, nx, infoY, 120);

        fill(100);
        textSize(9);
        text('Alt: ' + node.alt, nx, infoY + 35);
      }
    }
  }

  // Instructions at bottom of draw area
  if (!result && currentPath.length === 0 && !animating) {
    fill(120);
    noStroke();
    textSize(13);
    textAlign(CENTER, CENTER);
    text('Click a decision branch or load a scenario to navigate the flowchart.',
      canvasWidth / 2, drawHeight * 0.85);
  }

  // Control area info
  fill('black');
  noStroke();
  textAlign(LEFT, CENTER);
  textSize(13);
  if (result) {
    fill(result.color);
    text('Result: ' + result.name, 10, drawHeight + 45);
    fill(80);
    textSize(11);
    text(result.strengths, 10, drawHeight + 65, canvasWidth - 20);
    fill(100);
    text('Alternative: ' + result.alt, 10, drawHeight + 85);
  } else {
    text('Select a path through the flowchart', 10, drawHeight + 55);
  }
}

function mousePressed() {
  if (hoveredNode < 0 || animating) return;

  let node = decisions.find(d => d.id === hoveredNode);
  if (!node) return;

  if (node.type === 'terminal') {
    result = node;
    if (!currentPath.includes(node.id)) currentPath.push(node.id);
    return;
  }

  // If clicking a decision node, find its child terminal and navigate
  let childEdges = edges.filter(e => e.from === node.id);
  if (childEdges.length > 0) {
    // Add this decision to path, then show children
    if (!currentPath.includes(node.id)) {
      currentPath = [0, node.id]; // Reset path to root → this decision
    }
  }
}

function loadScenario() {
  let idx = scenarios.findIndex(s => s.name === scenarioSelect.value());
  if (idx < 0) return;
  selectedScenario = idx;
  currentPath = [scenarios[idx].path[0]];
  result = null;
  animating = true;
  animStep = 0;
  animTimer = 0;
}

function resetFlowchart() {
  currentPath = [];
  result = null;
  animating = false;
  selectedScenario = -1;
  scenarioSelect.selected('Load Scenario...');
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
