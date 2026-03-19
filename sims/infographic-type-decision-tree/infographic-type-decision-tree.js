// Infographic Type Decision Tree MicroSim
// Navigate a decision tree to find the right infographic type
// Bloom Level: Analyze (L4) — decision-making with branching paths

let containerWidth;
let canvasWidth = 400;
let drawHeight = 430;
let controlHeight = 70;
let canvasHeight = drawHeight + controlHeight;
let containerHeight = canvasHeight;
let margin = 15;

// Tree data structure
const tree = {
  id: 'root',
  question: 'What is the primary structure of your content?',
  options: [
    {
      label: 'Spatial / Regional',
      child: {
        id: 'spatial',
        question: 'Does the content have an underlying image?',
        options: [
          { label: 'Yes', leaf: { name: 'Overlay Infographic', color: '#4285F4', examples: ['Anatomy diagram', 'Floor plan labels', 'Product feature callouts'] }},
          { label: 'No', leaf: { name: 'Geographic Map', color: '#34A853', examples: ['University locations', 'Climate data by region', 'Sales territories'] }}
        ]
      }
    },
    {
      label: 'Sequential / Temporal',
      child: {
        id: 'temporal',
        question: 'Is it a process or a timeline?',
        options: [
          { label: 'Process', leaf: { name: 'Flowchart / Process', color: '#FBBC04', examples: ['Onboarding workflow', 'Algorithm steps', 'Approval pipeline'] }},
          { label: 'Timeline', leaf: { name: 'Timeline Infographic', color: '#EA4335', examples: ['History of computing', 'Project milestones', 'Course schedule'] }}
        ]
      }
    },
    {
      label: 'Hierarchical / Networked',
      child: {
        id: 'network',
        question: 'How many connections per item?',
        options: [
          { label: 'Few (tree)', leaf: { name: 'Mind Map', color: '#9C27B0', examples: ['Topic brainstorm', 'Org chart', 'Taxonomy tree'] }},
          { label: 'Many (graph)', leaf: { name: 'Network Graph', color: '#00BCD4', examples: ['Concept dependencies', 'Social network', 'System architecture'] }}
        ]
      }
    },
    {
      label: 'Comparative',
      child: {
        id: 'compare',
        question: 'How many items being compared?',
        options: [
          { label: 'Two items', leaf: { name: 'Before-After / Side-by-Side', color: '#FF5722', examples: ['Old vs new UI', 'Before/after renovation', 'Pre/post data'] }},
          { label: 'Three or more', leaf: { name: 'Chart (Bar / Radar)', color: '#607D8B', examples: ['Library comparison', 'Student scores', 'Feature matrix'] }}
        ]
      }
    },
    {
      label: 'Decision / Conditional',
      child: null,
      leaf: { name: 'Decision Tree Diagram', color: '#795548', examples: ['Troubleshooting guide', 'Library selection', 'Diagnosis flowchart'] }
    },
    {
      label: 'Narrative / Journey',
      child: null,
      leaf: { name: 'Journey Map', color: '#E91E63', examples: ['User onboarding', 'Patient experience', 'Student learning path'] }
    }
  ]
};

let currentNode = tree;
let selectedOption = -1;
let result = null;
let path = [];
let showExamples = false;
let showFullTree = false;

let resetButton, fullTreeButton, examplesButton;

function setup() {
  updateCanvasSize();
  const canvas = createCanvas(containerWidth, containerHeight);
  canvas.parent(document.querySelector('main'));

  resetButton = createButton('Start Over');
  resetButton.position(10, drawHeight + 8);
  resetButton.mousePressed(resetTree);

  fullTreeButton = createButton('Show Full Tree');
  fullTreeButton.position(100, drawHeight + 8);
  fullTreeButton.mousePressed(() => { showFullTree = !showFullTree; fullTreeButton.html(showFullTree ? 'Hide Full Tree' : 'Show Full Tree'); });

  examplesButton = createButton('Examples: OFF');
  examplesButton.position(230, drawHeight + 8);
  examplesButton.mousePressed(() => { showExamples = !showExamples; examplesButton.html('Examples: ' + (showExamples ? 'ON' : 'OFF')); });
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
  text('Infographic Type Decision Tree', canvasWidth / 2, 6);

  if (showFullTree) {
    drawFullTree();
    return;
  }

  if (result) {
    drawResult();
    return;
  }

  drawCurrentQuestion();

  // Control area text
  fill(100);
  noStroke();
  textAlign(LEFT, CENTER);
  textSize(12);
  text('Path: ' + (path.length > 0 ? path.join(' → ') : 'Start'), 10, drawHeight + 50);
}

function drawCurrentQuestion() {
  let qx = canvasWidth / 2;
  let qy = 50;

  // Question diamond
  fill('#E3F2FD');
  stroke('#2196F3');
  strokeWeight(2);
  rectMode(CENTER);
  rect(qx, qy + 30, Math.min(canvasWidth - 40, 500), 50, 8);
  rectMode(CORNER);

  fill('#1565C0');
  noStroke();
  textAlign(CENTER, CENTER);
  textSize(15);
  textWrap(WORD);
  text(currentNode.question, qx, qy + 30, Math.min(canvasWidth - 60, 480));

  // Options as clickable buttons
  let opts = currentNode.options;
  let optW = Math.min(200, (canvasWidth - 40) / Math.min(opts.length, 3) - 10);
  let optH = 45;
  let startY = qy + 80;
  let cols = Math.min(opts.length, 3);
  let rows = Math.ceil(opts.length / cols);
  let totalW = cols * (optW + 10) - 10;
  let startX = (canvasWidth - totalW) / 2;

  for (let i = 0; i < opts.length; i++) {
    let col = i % cols;
    let row = Math.floor(i / cols);
    let ox = startX + col * (optW + 10);
    let oy = startY + row * (optH + 15);

    // Draw connecting line from question to option
    stroke('#90CAF9');
    strokeWeight(1);
    line(qx, qy + 55, ox + optW / 2, oy);

    // Check hover
    let isHover = mouseX >= ox && mouseX <= ox + optW && mouseY >= oy && mouseY <= oy + optH;

    if (isHover) {
      fill('#BBDEFB');
      stroke('#1976D2');
      strokeWeight(2);
      cursor(HAND);
    } else {
      fill('white');
      stroke('#90CAF9');
      strokeWeight(1);
    }
    rect(ox, oy, optW, optH, 8);

    fill('#1565C0');
    noStroke();
    textAlign(CENTER, CENTER);
    textSize(14);
    text(opts[i].label, ox + optW / 2, oy + optH / 2);

    // If this leads to a leaf, show small indicator
    if (opts[i].leaf) {
      fill(opts[i].leaf.color);
      circle(ox + optW - 10, oy + 10, 10);
    }
  }

  // Path breadcrumbs
  if (path.length > 0) {
    let by = startY + rows * (optH + 15) + 30;
    fill(100);
    noStroke();
    textAlign(LEFT, TOP);
    textSize(12);
    text('Your path:', margin, by);

    let bx = margin + 70;
    for (let p of path) {
      fill('#E3F2FD');
      stroke('#90CAF9');
      strokeWeight(1);
      let tw = textWidth(p) + 16;
      rect(bx, by - 3, tw, 22, 11);
      fill('#1565C0');
      noStroke();
      textAlign(CENTER, CENTER);
      text(p, bx + tw / 2, by + 8);
      bx += tw + 8;
      fill('#90CAF9');
      text('→', bx - 6, by + 8);
    }
  }
}

function drawResult() {
  let rx = canvasWidth / 2;
  let ry = drawHeight / 2 - 20;

  // Result box
  fill(result.color);
  stroke(result.color);
  strokeWeight(2);
  rectMode(CENTER);
  rect(rx, ry - 20, Math.min(350, canvasWidth - 40), 60, 12);
  rectMode(CORNER);

  fill('white');
  noStroke();
  textAlign(CENTER, CENTER);
  textSize(22);
  text(result.name, rx, ry - 20);

  // Path taken
  fill(80);
  textSize(13);
  textAlign(CENTER, TOP);
  text('Path: ' + path.join(' → '), rx, ry + 30, canvasWidth - 40);

  // Examples
  if (showExamples && result.examples) {
    fill('black');
    textSize(15);
    text('Example Use Cases:', rx, ry + 65);
    textSize(14);
    fill(60);
    for (let i = 0; i < result.examples.length; i++) {
      text('• ' + result.examples[i], rx, ry + 90 + i * 22);
    }
  }
}

function drawFullTree() {
  fill('black');
  noStroke();
  textAlign(CENTER, CENTER);
  textSize(12);

  // Draw the root question
  let rx = canvasWidth / 2;
  fill('#E3F2FD');
  stroke('#2196F3');
  strokeWeight(1);
  rectMode(CENTER);
  rect(rx, 45, Math.min(400, canvasWidth - 20), 30, 6);
  rectMode(CORNER);
  fill('#1565C0');
  noStroke();
  textSize(10);
  text(tree.question, rx, 45);

  // Draw all branches
  let opts = tree.options;
  let spacing = canvasWidth / (opts.length + 1);
  for (let i = 0; i < opts.length; i++) {
    let ox = spacing * (i + 1);
    let oy = 100;

    // Connecting line
    stroke('#CCC');
    strokeWeight(1);
    line(rx, 60, ox, oy - 10);

    // Option label
    fill('#FFF9C4');
    stroke('#FBC02D');
    strokeWeight(1);
    rectMode(CENTER);
    rect(ox, oy, 80, 25, 4);
    rectMode(CORNER);
    fill('#333');
    noStroke();
    textSize(8);
    text(opts[i].label, ox, oy);

    // Sub-question or leaf
    if (opts[i].child) {
      let sub = opts[i].child;
      let sy = oy + 50;
      fill('#E8F5E9');
      stroke('#66BB6A');
      strokeWeight(1);
      rectMode(CENTER);
      rect(ox, sy, 75, 25, 4);
      rectMode(CORNER);
      fill('#2E7D32');
      noStroke();
      textSize(7);
      text(sub.question.substring(0, 25) + '...', ox, sy);

      // Sub-options
      for (let j = 0; j < sub.options.length; j++) {
        let sx2 = ox + (j - 0.5) * 55;
        let sy2 = sy + 50;
        stroke('#CCC');
        strokeWeight(1);
        line(ox, sy + 12, sx2, sy2 - 12);

        let leaf = sub.options[j].leaf;
        if (leaf) {
          fill(leaf.color);
          stroke(leaf.color);
          strokeWeight(1);
          rectMode(CENTER);
          rect(sx2, sy2, 70, 22, 4);
          rectMode(CORNER);
          fill('white');
          noStroke();
          textSize(7);
          text(leaf.name, sx2, sy2);
        }
      }
    } else if (opts[i].leaf) {
      let ly = oy + 50;
      stroke('#CCC');
      strokeWeight(1);
      line(ox, oy + 12, ox, ly - 12);
      fill(opts[i].leaf.color);
      stroke(opts[i].leaf.color);
      rectMode(CENTER);
      rect(ox, ly, 75, 22, 4);
      rectMode(CORNER);
      fill('white');
      noStroke();
      textSize(7);
      text(opts[i].leaf.name, ox, ly);
    }
  }
}

function mousePressed() {
  if (showFullTree || result) return;

  let opts = currentNode.options;
  let optW = Math.min(200, (canvasWidth - 40) / Math.min(opts.length, 3) - 10);
  let optH = 45;
  let startY = 130;
  let cols = Math.min(opts.length, 3);
  let totalW = cols * (optW + 10) - 10;
  let startX = (canvasWidth - totalW) / 2;

  for (let i = 0; i < opts.length; i++) {
    let col = i % cols;
    let row = Math.floor(i / cols);
    let ox = startX + col * (optW + 10);
    let oy = startY + row * (optH + 15);

    if (mouseX >= ox && mouseX <= ox + optW && mouseY >= oy && mouseY <= oy + optH) {
      path.push(opts[i].label);
      if (opts[i].leaf) {
        result = opts[i].leaf;
      } else if (opts[i].child) {
        currentNode = opts[i].child;
      }
      break;
    }
  }
}

function resetTree() {
  currentNode = tree;
  selectedOption = -1;
  result = null;
  path = [];
  showFullTree = false;
  fullTreeButton.html('Show Full Tree');
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
