// Interactive CLD Builder
// Create causal loop diagrams by placing variables and drawing links
// Bloom Level: Create (L6)

let containerWidth;
let canvasWidth = 400;
let drawHeight = 450;
let canvasHeight = drawHeight;

let nodes = [];
let links = [];
let loopLabels = [];

let mode = 'select'; // 'select', 'addNode', 'addLink'
let linkPolarity = '+';
let draggingNode = -1;
let linkSource = -1;
let hoveredNode = -1;
let selectedNode = -1;
let editingNode = -1;
let editText = '';
let nextNodeId = 1;

function setup() {
  updateCanvasSize();
  const canvas = createCanvas(canvasWidth, canvasHeight);
  canvas.parent(document.querySelector('main'));
  buildControls();
  describe('Interactive causal loop diagram builder where users place variables, draw causal links with polarity, and identify reinforcing or balancing loops.');
}

function buildControls() {
  let mainEl = document.querySelector('main');
  let controlDiv = document.createElement('div');
  controlDiv.id = 'cld-builder-controls';
  controlDiv.style.cssText = 'background: white; border: 1px solid silver; padding: 12px; font-family: Arial, sans-serif; font-size: 14px;';
  mainEl.appendChild(controlDiv);

  let row1 = document.createElement('div');
  row1.style.cssText = 'display: flex; flex-wrap: wrap; gap: 8px; align-items: center; justify-content: center; margin-bottom: 8px;';

  // Mode buttons
  let addNodeBtn = createModeBtn('Add Variable', '#4285F4', function() {
    mode = 'addNode';
    linkSource = -1;
    updateModeDisplay();
  });
  row1.appendChild(addNodeBtn);

  let addLinkBtn = createModeBtn('Add Link', '#34A853', function() {
    mode = 'addLink';
    linkSource = -1;
    updateModeDisplay();
  });
  row1.appendChild(addLinkBtn);

  let selectBtn = createModeBtn('Select/Move', '#666', function() {
    mode = 'select';
    linkSource = -1;
    updateModeDisplay();
  });
  row1.appendChild(selectBtn);

  // Polarity selector
  let polDiv = document.createElement('span');
  polDiv.style.cssText = 'display: flex; align-items: center; gap: 4px; padding: 4px 8px; border: 1px solid silver; border-radius: 4px;';
  polDiv.innerHTML = 'Polarity: ';
  let plusBtn = document.createElement('button');
  plusBtn.textContent = '+';
  plusBtn.id = 'pol-plus';
  plusBtn.style.cssText = 'width: 28px; height: 28px; font-size: 16px; font-weight: bold; cursor: pointer; border: 2px solid #4285F4; border-radius: 4px; background: #4285F4; color: white;';
  plusBtn.addEventListener('click', function() { linkPolarity = '+'; updatePolarityBtns(); });
  let minusBtn = document.createElement('button');
  minusBtn.textContent = '−';
  minusBtn.id = 'pol-minus';
  minusBtn.style.cssText = 'width: 28px; height: 28px; font-size: 16px; font-weight: bold; cursor: pointer; border: 2px solid #E53935; border-radius: 4px; background: white; color: #E53935;';
  minusBtn.addEventListener('click', function() { linkPolarity = '-'; updatePolarityBtns(); });
  polDiv.appendChild(plusBtn);
  polDiv.appendChild(minusBtn);
  row1.appendChild(polDiv);

  controlDiv.appendChild(row1);

  let row2 = document.createElement('div');
  row2.style.cssText = 'display: flex; flex-wrap: wrap; gap: 8px; align-items: center; justify-content: center; margin-bottom: 8px;';

  let identifyBtn = document.createElement('button');
  identifyBtn.textContent = 'Identify Loops';
  identifyBtn.style.cssText = 'padding: 6px 14px; font-size: 14px; cursor: pointer; border: 1px solid #FB8C00; border-radius: 4px; background: #FB8C00; color: white; font-weight: bold;';
  identifyBtn.addEventListener('click', identifyLoops);
  row2.appendChild(identifyBtn);

  let exampleBtn = document.createElement('button');
  exampleBtn.textContent = 'Load Example';
  exampleBtn.style.cssText = 'padding: 6px 14px; font-size: 14px; cursor: pointer; border: 1px solid #7B1FA2; border-radius: 4px; background: #7B1FA2; color: white; font-weight: bold;';
  exampleBtn.addEventListener('click', loadExample);
  row2.appendChild(exampleBtn);

  let clearBtn = document.createElement('button');
  clearBtn.textContent = 'Clear All';
  clearBtn.style.cssText = 'padding: 6px 14px; font-size: 14px; cursor: pointer; border: 1px solid silver; border-radius: 4px; background: #f0f0f0;';
  clearBtn.addEventListener('click', function() {
    nodes = []; links = []; loopLabels = [];
    nextNodeId = 1; linkSource = -1; editingNode = -1;
    updateFeedback('Workspace cleared.');
  });
  row2.appendChild(clearBtn);

  controlDiv.appendChild(row2);

  // Mode and feedback display
  let modeDiv = document.createElement('div');
  modeDiv.id = 'mode-display';
  modeDiv.style.cssText = 'text-align: center; font-size: 13px; color: #666; margin-bottom: 4px;';
  modeDiv.textContent = 'Mode: Select/Move — Click a tool above to begin building.';
  controlDiv.appendChild(modeDiv);

  let feedbackDiv = document.createElement('div');
  feedbackDiv.id = 'feedback';
  feedbackDiv.style.cssText = 'padding: 8px; background: #f8f9fa; border-radius: 6px; font-size: 14px; color: #333; min-height: 24px;';
  feedbackDiv.innerHTML = '<em>Click "Add Variable" to place nodes, then "Add Link" to connect them.</em>';
  controlDiv.appendChild(feedbackDiv);
}

function createModeBtn(label, color, onClick) {
  let btn = document.createElement('button');
  btn.textContent = label;
  btn.style.cssText = 'padding: 6px 14px; font-size: 14px; cursor: pointer; border: 2px solid ' + color + '; border-radius: 4px; background: white; color: ' + color + '; font-weight: bold;';
  btn.addEventListener('click', onClick);
  return btn;
}

function updateModeDisplay() {
  let modeDiv = document.getElementById('mode-display');
  if (!modeDiv) return;
  if (mode === 'addNode') modeDiv.textContent = 'Mode: Add Variable — Click on the canvas to place a new variable.';
  else if (mode === 'addLink') modeDiv.textContent = 'Mode: Add Link (' + linkPolarity + ') — Click a source variable, then click a target variable.';
  else modeDiv.textContent = 'Mode: Select/Move — Drag variables to reposition. Double-click to delete.';
}

function updatePolarityBtns() {
  let plus = document.getElementById('pol-plus');
  let minus = document.getElementById('pol-minus');
  if (plus) { plus.style.background = linkPolarity === '+' ? '#4285F4' : 'white'; plus.style.color = linkPolarity === '+' ? 'white' : '#4285F4'; }
  if (minus) { minus.style.background = linkPolarity === '-' ? '#E53935' : 'white'; minus.style.color = linkPolarity === '-' ? 'white' : '#E53935'; }
  updateModeDisplay();
}

function updateFeedback(msg) {
  let fb = document.getElementById('feedback');
  if (fb) fb.innerHTML = msg;
}

function loadExample() {
  nodes = [
    { id: 1, name: 'Study Effort', x: 0.2, y: 0.5 },
    { id: 2, name: 'Understanding', x: 0.5, y: 0.2 },
    { id: 3, name: 'Exam Score', x: 0.8, y: 0.5 },
    { id: 4, name: 'Confidence', x: 0.5, y: 0.8 }
  ];
  links = [
    { from: 1, to: 2, polarity: '+' },
    { from: 2, to: 3, polarity: '+' },
    { from: 3, to: 4, polarity: '+' },
    { from: 4, to: 1, polarity: '+' }
  ];
  nextNodeId = 5;
  loopLabels = [];
  updateFeedback('Example loaded: Study Effort → Understanding → Exam Score → Confidence → Study Effort. Click "Identify Loops" to classify it.');
}

function identifyLoops() {
  loopLabels = [];
  if (nodes.length < 2 || links.length < 2) {
    updateFeedback('Not enough nodes or links to form a loop. Add more variables and connections.');
    return;
  }

  // Simple cycle detection using DFS
  let cycles = [];
  let adjList = {};
  nodes.forEach(function(n) { adjList[n.id] = []; });
  links.forEach(function(l) { adjList[l.from].push({ to: l.to, polarity: l.polarity }); });

  function dfs(start, current, path, visited) {
    let neighbors = adjList[current] || [];
    for (let i = 0; i < neighbors.length; i++) {
      let next = neighbors[i].to;
      if (next === start && path.length >= 2) {
        cycles.push(path.slice());
        continue;
      }
      if (!visited[next]) {
        visited[next] = true;
        path.push(next);
        dfs(start, next, path, visited);
        path.pop();
        visited[next] = false;
      }
    }
  }

  nodes.forEach(function(n) {
    let visited = {};
    visited[n.id] = true;
    dfs(n.id, n.id, [n.id], visited);
  });

  // Deduplicate cycles
  let uniqueCycles = [];
  let seen = {};
  cycles.forEach(function(cycle) {
    let sorted = cycle.slice().sort().join(',');
    if (!seen[sorted]) {
      seen[sorted] = true;
      uniqueCycles.push(cycle);
    }
  });

  if (uniqueCycles.length === 0) {
    updateFeedback('No closed loops detected. Connect variables back to create feedback loops.');
    return;
  }

  // Classify each loop
  let loopNum = { R: 0, B: 0 };
  uniqueCycles.forEach(function(cycle) {
    let negCount = 0;
    for (let i = 0; i < cycle.length; i++) {
      let from = cycle[i];
      let to = cycle[(i + 1) % cycle.length];
      for (let j = 0; j < links.length; j++) {
        if (links[j].from === from && links[j].to === to && links[j].polarity === '-') negCount++;
      }
    }
    let loopType = (negCount % 2 === 0) ? 'R' : 'B';
    loopNum[loopType]++;
    let label = loopType + loopNum[loopType];

    // Calculate center position
    let cx = 0, cy = 0;
    cycle.forEach(function(id) {
      let n = nodes.find(function(nd) { return nd.id === id; });
      if (n) { cx += n.x; cy += n.y; }
    });
    cx /= cycle.length;
    cy /= cycle.length;

    loopLabels.push({ label: label, type: loopType, x: cx, y: cy });
  });

  let msg = 'Found ' + uniqueCycles.length + ' loop(s): ';
  loopLabels.forEach(function(ll) {
    msg += '<strong style="color:' + (ll.type === 'R' ? '#34A853' : '#E53935') + '">' + ll.label +
      ' (' + (ll.type === 'R' ? 'Reinforcing' : 'Balancing') + ')</strong> ';
  });
  updateFeedback(msg);
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
  textSize(16);
  text('CLD Builder', canvasWidth / 2, 6);

  // Grid
  stroke(230);
  strokeWeight(0.5);
  for (let gx = 0; gx < canvasWidth; gx += 40) line(gx, 28, gx, drawHeight);
  for (let gy = 28; gy < drawHeight; gy += 40) line(0, gy, canvasWidth, gy);

  // Draw links
  for (let i = 0; i < links.length; i++) {
    let lk = links[i];
    let fromNode = nodes.find(function(n) { return n.id === lk.from; });
    let toNode = nodes.find(function(n) { return n.id === lk.to; });
    if (!fromNode || !toNode) continue;

    let x1 = fromNode.x * canvasWidth;
    let y1 = fromNode.y * drawHeight;
    let x2 = toNode.x * canvasWidth;
    let y2 = toNode.y * drawHeight;

    let angle = atan2(y2 - y1, x2 - x1);
    let nodeR = 45;
    let sx = x1 + cos(angle) * nodeR;
    let sy = y1 + sin(angle) * nodeR;
    let ex = x2 - cos(angle) * nodeR;
    let ey = y2 - sin(angle) * nodeR;

    // Curve
    let mx = (sx + ex) / 2;
    let my = (sy + ey) / 2;
    let perpX = -(ey - sy);
    let perpY = (ex - sx);
    let perpLen = sqrt(perpX * perpX + perpY * perpY) || 1;
    let cpx = mx + (perpX / perpLen) * perpLen * 0.12;
    let cpy = my + (perpY / perpLen) * perpLen * 0.12;

    let linkColor = lk.polarity === '+' ? [66, 133, 244] : [229, 57, 53];
    stroke(linkColor[0], linkColor[1], linkColor[2]);
    strokeWeight(2.5);
    noFill();
    beginShape();
    vertex(sx, sy);
    quadraticVertex(cpx, cpy, ex, ey);
    endShape();

    // Arrowhead
    let aAngle = atan2(ey - cpy, ex - cpx);
    fill(linkColor[0], linkColor[1], linkColor[2]);
    noStroke();
    triangle(ex, ey, ex - cos(aAngle - 0.4) * 10, ey - sin(aAngle - 0.4) * 10, ex - cos(aAngle + 0.4) * 10, ey - sin(aAngle + 0.4) * 10);

    // Polarity badge
    let polX = (sx + 2 * cpx + ex) / 4;
    let polY = (sy + 2 * cpy + ey) / 4;
    fill(255);
    stroke(linkColor[0], linkColor[1], linkColor[2]);
    strokeWeight(2);
    ellipse(polX, polY, 22, 22);
    fill(linkColor[0], linkColor[1], linkColor[2]);
    noStroke();
    textAlign(CENTER, CENTER);
    textSize(14);
    text(lk.polarity, polX, polY);
  }

  // Draw link in progress
  if (mode === 'addLink' && linkSource >= 0) {
    let fromNode = nodes.find(function(n) { return n.id === linkSource; });
    if (fromNode) {
      stroke(150);
      strokeWeight(1.5);
      let dashLen = 8;
      let x1 = fromNode.x * canvasWidth;
      let y1 = fromNode.y * drawHeight;
      let dx = mouseX - x1;
      let dy = mouseY - y1;
      let d = sqrt(dx * dx + dy * dy);
      for (let t = 0; t < d; t += dashLen * 2) {
        let startT = t / d;
        let endT = min((t + dashLen) / d, 1);
        line(x1 + dx * startT, y1 + dy * startT, x1 + dx * endT, y1 + dy * endT);
      }
    }
  }

  // Loop labels
  for (let i = 0; i < loopLabels.length; i++) {
    let ll = loopLabels[i];
    let lx = ll.x * canvasWidth;
    let ly = ll.y * drawHeight;
    let lColor = ll.type === 'R' ? [52, 168, 83] : [229, 57, 53];
    fill(lColor[0], lColor[1], lColor[2], 40);
    stroke(lColor[0], lColor[1], lColor[2]);
    strokeWeight(2);
    ellipse(lx, ly, 36, 36);
    fill(lColor[0], lColor[1], lColor[2]);
    noStroke();
    textAlign(CENTER, CENTER);
    textSize(14);
    text(ll.label, lx, ly);
  }

  // Draw nodes
  hoveredNode = -1;
  for (let i = 0; i < nodes.length; i++) {
    let n = nodes[i];
    let nx = n.x * canvasWidth;
    let ny = n.y * drawHeight;

    let isHover = dist(mouseX, mouseY, nx, ny) < 45;
    if (isHover) hoveredNode = i;

    fill(isHover ? '#e8f0fe' : 'white');
    stroke(isHover ? '#1a73e8' : '#555');
    strokeWeight(isHover ? 3 : 2);
    ellipse(nx, ny, 90, 48);

    fill(isHover ? '#1a73e8' : '#333');
    noStroke();
    textAlign(CENTER, CENTER);
    textSize(13);
    text(n.name, nx, ny);
  }

  // Mode hint
  if (nodes.length === 0) {
    fill(180);
    noStroke();
    textAlign(CENTER, CENTER);
    textSize(16);
    text('Click "Add Variable" then click here\nto place your first variable', canvasWidth / 2, drawHeight / 2);
  }
}

function mousePressed() {
  if (mouseY < 28 || mouseY > drawHeight) return;

  if (mode === 'addNode') {
    let name = 'Variable ' + nextNodeId;
    nodes.push({ id: nextNodeId, name: name, x: mouseX / canvasWidth, y: mouseY / drawHeight });
    nextNodeId++;
    updateFeedback('Added "' + name + '". Double-click to rename. Add more variables or switch to "Add Link".');
    return;
  }

  if (mode === 'addLink') {
    // Find clicked node
    for (let i = 0; i < nodes.length; i++) {
      let nx = nodes[i].x * canvasWidth;
      let ny = nodes[i].y * drawHeight;
      if (dist(mouseX, mouseY, nx, ny) < 45) {
        if (linkSource < 0) {
          linkSource = nodes[i].id;
          updateFeedback('Source: "' + nodes[i].name + '" — Now click the target variable.');
        } else if (nodes[i].id !== linkSource) {
          links.push({ from: linkSource, to: nodes[i].id, polarity: linkPolarity });
          let fromName = nodes.find(function(n) { return n.id === linkSource; }).name;
          updateFeedback('Link added: "' + fromName + '" → "' + nodes[i].name + '" (' + linkPolarity + ')');
          linkSource = -1;
          loopLabels = []; // Clear old loop analysis
        }
        return;
      }
    }
    return;
  }

  if (mode === 'select') {
    for (let i = 0; i < nodes.length; i++) {
      let nx = nodes[i].x * canvasWidth;
      let ny = nodes[i].y * drawHeight;
      if (dist(mouseX, mouseY, nx, ny) < 45) {
        draggingNode = i;
        return;
      }
    }
  }
}

function mouseDragged() {
  if (draggingNode >= 0 && mode === 'select') {
    nodes[draggingNode].x = constrain(mouseX / canvasWidth, 0.05, 0.95);
    nodes[draggingNode].y = constrain(mouseY / drawHeight, 0.08, 0.95);
  }
}

function mouseReleased() {
  draggingNode = -1;
}

function doubleClicked() {
  if (mode !== 'select') return;
  for (let i = 0; i < nodes.length; i++) {
    let nx = nodes[i].x * canvasWidth;
    let ny = nodes[i].y * drawHeight;
    if (dist(mouseX, mouseY, nx, ny) < 45) {
      let newName = prompt('Rename variable (or type "delete" to remove):', nodes[i].name);
      if (newName === 'delete' || newName === 'DELETE') {
        let nodeId = nodes[i].id;
        nodes.splice(i, 1);
        links = links.filter(function(l) { return l.from !== nodeId && l.to !== nodeId; });
        loopLabels = [];
        updateFeedback('Variable deleted.');
      } else if (newName && newName.trim()) {
        nodes[i].name = newName.trim();
        updateFeedback('Renamed to "' + newName.trim() + '".');
      }
      return;
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
