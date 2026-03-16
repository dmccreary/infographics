// Interactive Cycle Builder MicroSim
// Build a cycle diagram by adding labeled nodes
// Bloom Level: Apply (L3) — construct a cycle diagram

let containerWidth;
let canvasWidth = 400;
let drawHeight = 430;
let controlHeight = 70;
let canvasHeight = drawHeight + controlHeight;
let containerHeight = canvasHeight;
let margin = 20;

const MAX_NODES = 8;
const placeholders = ['Plan', 'Do', 'Check', 'Act', 'Review', 'Adjust', 'Measure', 'Improve'];
let nodes = [];
let selectedNode = -1;
let hoveredNode = -1;

let labelInput, addButton, clearButton, editInput;
let editing = false;
let editIndex = -1;

function setup() {
  updateCanvasSize();
  const canvas = createCanvas(containerWidth, containerHeight);
  canvas.parent(document.querySelector('main'));

  labelInput = createInput('');
  labelInput.attribute('placeholder', placeholders[0]);
  labelInput.position(10, drawHeight + 12);
  labelInput.size(150);
  labelInput.attribute('maxlength', '20');

  addButton = createButton('Add Node');
  addButton.position(170, drawHeight + 12);
  addButton.mousePressed(addNodeFromInput);

  clearButton = createButton('Clear');
  clearButton.position(255, drawHeight + 12);
  clearButton.mousePressed(() => {
    nodes = [];
    selectedNode = -1;
    labelInput.attribute('placeholder', placeholders[0]);
  });

  // Handle Enter key on input
  labelInput.elt.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') addNodeFromInput();
  });
}

function addNodeFromInput() {
  if (nodes.length >= MAX_NODES) return;
  let label = labelInput.value().trim();
  if (!label) label = placeholders[nodes.length] || 'Node ' + (nodes.length + 1);
  nodes.push({ label: label, animProgress: 0 });
  labelInput.value('');
  if (nodes.length < MAX_NODES) {
    labelInput.attribute('placeholder', placeholders[nodes.length] || 'Label...');
  }
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
  textSize(20);
  text('Interactive Cycle Builder', canvasWidth / 2, 8);

  // Node counter
  textSize(14);
  textAlign(RIGHT, TOP);
  fill(100);
  text('Nodes: ' + nodes.length + ' of ' + MAX_NODES, canvasWidth - margin, 10);

  let cx = canvasWidth / 2;
  let cy = drawHeight / 2 + 10;
  let radius = Math.min(canvasWidth * 0.32, drawHeight * 0.32);

  if (nodes.length === 0) {
    // Empty state
    stroke('#CCC');
    strokeWeight(2);
    noFill();
    circle(cx, cy, radius * 2);

    fill(150);
    noStroke();
    textAlign(CENTER, CENTER);
    textSize(15);
    text('Type a label and click\n"Add Node" to build\nyour cycle diagram.', cx, cy);

    // Control area
    fill('black');
    noStroke();
    textAlign(LEFT, CENTER);
    textSize(14);
    text('Label:', 10, drawHeight + 50);
    return;
  }

  // Animate new nodes in
  for (let n of nodes) {
    if (n.animProgress < 1) {
      n.animProgress = Math.min(1, n.animProgress + deltaTime / 400);
    }
  }

  hoveredNode = -1;
  let nodeR = Math.min(35, radius * 0.35);

  // Draw arrows first (behind nodes)
  for (let i = 0; i < nodes.length; i++) {
    let angle1 = -HALF_PI + (TWO_PI / nodes.length) * i;
    let angle2 = -HALF_PI + (TWO_PI / nodes.length) * ((i + 1) % nodes.length);

    let x1 = cx + cos(angle1) * radius;
    let y1 = cy + sin(angle1) * radius;
    let x2 = cx + cos(angle2) * radius;
    let y2 = cy + sin(angle2) * radius;

    let isCompletion = (i === nodes.length - 1 && nodes.length >= 3);

    if (isCompletion) {
      // Dashed completion arrow (last to first)
      stroke('#4CAF50');
      strokeWeight(3);
      drawingContext.setLineDash([6, 4]);
    } else if (i < nodes.length - 1) {
      stroke('#FF9800');
      strokeWeight(2);
      drawingContext.setLineDash([]);
    } else {
      continue;
    }

    // Calculate arrow from edge of node circle to edge of next node circle
    let dx = x2 - x1;
    let dy = y2 - y1;
    let dist = sqrt(dx * dx + dy * dy);
    let ux = dx / dist;
    let uy = dy / dist;

    let ax1 = x1 + ux * (nodeR + 2);
    let ay1 = y1 + uy * (nodeR + 2);
    let ax2 = x2 - ux * (nodeR + 5);
    let ay2 = y2 - uy * (nodeR + 5);

    line(ax1, ay1, ax2, ay2);
    drawingContext.setLineDash([]);

    // Arrowhead
    let arrowSize = 8;
    let angle = atan2(ay2 - ay1, ax2 - ax1);
    fill(isCompletion ? '#4CAF50' : '#FF9800');
    noStroke();
    triangle(
      ax2 + cos(angle) * 2,
      ay2 + sin(angle) * 2,
      ax2 - cos(angle - PI / 6) * arrowSize,
      ay2 - sin(angle - PI / 6) * arrowSize,
      ax2 - cos(angle + PI / 6) * arrowSize,
      ay2 - sin(angle + PI / 6) * arrowSize
    );
  }

  // Draw nodes
  for (let i = 0; i < nodes.length; i++) {
    let angle = -HALF_PI + (TWO_PI / nodes.length) * i;
    let prog = nodes[i].animProgress;
    let nx = cx + cos(angle) * radius * prog;
    let ny = cy + sin(angle) * radius * prog;

    // Hit detection
    let dx = mouseX - nx;
    let dy = mouseY - ny;
    if (sqrt(dx * dx + dy * dy) < nodeR) {
      hoveredNode = i;
    }

    let isHover = (i === hoveredNode);
    let isSelected = (i === selectedNode);

    // Node circle
    if (isSelected) {
      fill('#1565C0');
      stroke('white');
      strokeWeight(3);
    } else if (isHover) {
      fill('#42A5F5');
      stroke('white');
      strokeWeight(2);
    } else {
      fill('#2196F3');
      stroke('#1565C0');
      strokeWeight(2);
    }
    circle(nx, ny, nodeR * 2 * prog);

    // Label
    fill('white');
    noStroke();
    textAlign(CENTER, CENTER);
    textSize(Math.min(14, nodeR * 0.7));
    text(nodes[i].label, nx, ny);
  }

  // Control area
  fill('black');
  noStroke();
  textAlign(LEFT, CENTER);
  textSize(14);
  if (nodes.length >= MAX_NODES) {
    fill('#EA4335');
    text('Maximum ' + MAX_NODES + ' nodes reached', 10, drawHeight + 50);
  } else {
    text('Enter label and press Add or Enter', 10, drawHeight + 50);
  }
}

function mousePressed() {
  if (hoveredNode >= 0) {
    selectedNode = hoveredNode;
    // Allow re-labeling by filling input with current label
    labelInput.value(nodes[selectedNode].label);
    labelInput.elt.focus();
    labelInput.elt.select();

    // Override add button to act as "Update" while a node is selected
    addButton.html('Update');
    addButton.mousePressed(() => {
      if (selectedNode >= 0 && selectedNode < nodes.length) {
        let newLabel = labelInput.value().trim();
        if (newLabel) nodes[selectedNode].label = newLabel;
        selectedNode = -1;
        labelInput.value('');
        addButton.html('Add Node');
        addButton.mousePressed(addNodeFromInput);
      }
    });
  } else {
    if (selectedNode >= 0) {
      selectedNode = -1;
      addButton.html('Add Node');
      addButton.mousePressed(addNodeFromInput);
    }
  }
}

function windowResized() {
  updateCanvasSize();
  resizeCanvas(containerWidth, containerHeight);
  labelInput.size(Math.min(150, canvasWidth * 0.3));
  redraw();
}

function updateCanvasSize() {
  const container = document.querySelector('main').getBoundingClientRect();
  containerWidth = Math.floor(container.width);
  canvasWidth = containerWidth;
}
