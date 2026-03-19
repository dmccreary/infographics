// Infographic Design Principles Workflow
// Step-through workflow applying learning science at each design stage.
// Bloom Level: Create (L6)

let containerWidth;
let canvasWidth = 400;
let drawHeight = 150;
let canvasHeight = drawHeight;
let containerHeight = canvasHeight;

let selectedStage = -1;
let completed = [false, false, false, false, false, false];
let animating = false;
let animStage = 0;
let animTimer = 0;
let showConnections = true;

const stages = [
  {
    name: 'Define Learning\nObjective',
    color: '#7E57C2',
    icon: '🎯',
    bullets: [
      'Choose a Bloom\'s Taxonomy level and action verb',
      'Write a measurable learning outcome statement',
      'Identify the specific knowledge or skill to assess',
      'Align the objective with curriculum standards'
    ],
    example: 'Example: "Analyze the water cycle by identifying feedback loops in a causal loop diagram" (Analyze L4)',
    check: 'Can you state exactly what the learner will be able to DO after interacting?'
  },
  {
    name: 'Select Interaction\nPattern',
    color: '#42A5F5',
    icon: '🖱️',
    bullets: [
      'Match Bloom level to appropriate interaction type',
      'Remember/Understand → hover labels, step-through',
      'Apply/Analyze → sliders, selectors, comparisons',
      'Evaluate/Create → builders, editors, rubric tools'
    ],
    example: 'For the water cycle CLD: an interactive network diagram with hover tooltips and click-to-highlight feedback loops.',
    check: 'Does the interaction pattern require the learner to THINK at the target Bloom level?'
  },
  {
    name: 'Manage\nCognitive Load',
    color: '#EF5350',
    icon: '🧠',
    bullets: [
      'Minimize extraneous load: remove decorative elements',
      'Manage intrinsic load: segment complex topics',
      'Maximize germane load: add meaningful interactions',
      'Use progressive disclosure for multi-layer content'
    ],
    example: 'The CLD starts with 3 visible nodes; clicking "Show All" reveals the full 8-node system.',
    check: 'If you removed one visual element, would it hurt understanding? If not, remove it.'
  },
  {
    name: 'Apply Mayer\'s\nPrinciples',
    color: '#66BB6A',
    icon: '📐',
    bullets: [
      'Signaling: highlight key elements with color/weight',
      'Segmenting: break content into manageable chunks',
      'Spatial contiguity: place labels near their referents',
      'Coherence: exclude interesting but irrelevant content'
    ],
    example: 'Labels are placed directly on CLD arrows (spatial contiguity), not in a separate legend.',
    check: 'Is every label within 50px of the element it describes?'
  },
  {
    name: 'Build with\nScaffolding',
    color: '#FFA726',
    icon: '🏗️',
    bullets: [
      'Start from a working template (bouncing-ball.js)',
      'Provide worked examples before open-ended tasks',
      'Add complexity incrementally, testing each layer',
      'Include default states that demonstrate correct behavior'
    ],
    example: 'The MicroSim loads with a pre-built 3-node CLD; students add nodes to build the full system.',
    check: 'Can a beginner get a working result within 2 minutes of starting?'
  },
  {
    name: 'Embed Formative\nAssessment',
    color: '#26A69A',
    icon: '✅',
    bullets: [
      'Add prediction prompts before revealing answers',
      'Include self-check questions within the interaction',
      'Track completion of all interactive elements',
      'Provide immediate, specific feedback on actions'
    ],
    example: 'Before showing the feedback loop, ask: "Will increasing rainfall increase or decrease evaporation?"',
    check: 'Does the learner receive feedback that helps them correct misconceptions?'
  }
];

function setup() {
  updateCanvasSize();
  const canvas = createCanvas(containerWidth, containerHeight);
  var mainElement = document.querySelector('main');
  canvas.parent(mainElement);
  textFont('Arial');
  buildControls();
}

function buildControls() {
  let mainEl = document.querySelector('main');
  let panel = document.createElement('div');
  panel.id = 'detail-panel';
  panel.style.cssText = 'background:white; border:1px solid silver; padding:15px; font-family:Arial,sans-serif; font-size:14px; line-height:1.6; min-height:180px;';
  panel.innerHTML = '<div style="color:#888; text-align:center; padding:30px;">Click a stage above to see details</div>';
  mainEl.appendChild(panel);

  let btnRow = document.createElement('div');
  btnRow.style.cssText = 'display:flex; gap:8px; padding:8px; background:#f5f5f5; border:1px solid silver; border-top:none;';
  btnRow.innerHTML = `
    <button id="animBtn" style="padding:6px 14px; background:#42A5F5; color:white; border:none; border-radius:4px; cursor:pointer;">Animate Workflow</button>
    <button id="resetBtn" style="padding:6px 14px; background:#EF5350; color:white; border:none; border-radius:4px; cursor:pointer;">Reset</button>
    <label style="display:flex; align-items:center; gap:4px; margin-left:auto;"><input type="checkbox" id="showConn" checked> Show Connections</label>
  `;
  mainEl.appendChild(btnRow);

  document.getElementById('animBtn').addEventListener('click', startAnimation);
  document.getElementById('resetBtn').addEventListener('click', function(){
    completed = [false,false,false,false,false,false];
    selectedStage = -1;
    updateDetailPanel();
  });
  document.getElementById('showConn').addEventListener('change', function(){ showConnections = this.checked; });
}

function startAnimation() {
  if (animating) return;
  animating = true;
  animStage = 0;
  animTimer = millis();
  selectedStage = 0;
  updateDetailPanel();
}

function draw() {
  updateCanvasSize();

  // Background
  fill('aliceblue');
  stroke('silver');
  strokeWeight(1);
  rect(0, 0, canvasWidth, drawHeight);

  // Title
  noStroke();
  fill('#333');
  textAlign(CENTER, TOP);
  textSize(18);
  text('Infographic Design Workflow', canvasWidth / 2, 8);

  // Handle animation
  if (animating && millis() - animTimer > 2000) {
    animStage++;
    if (animStage >= stages.length) {
      animating = false;
    } else {
      selectedStage = animStage;
      completed[animStage - 1] = true;
      updateDetailPanel();
      animTimer = millis();
    }
  }

  // Calculate stage positions
  let stageW = 100;
  let stageH = 65;
  let positions = calculateStagePositions(stageW, stageH);

  // Draw connections
  if (showConnections) {
    for (let i = 0; i < positions.length - 1; i++) {
      let from = positions[i];
      let to = positions[i + 1];
      stroke(animating && animStage === i + 1 ? '#FF6B6B' : '#BBB');
      strokeWeight(animating && animStage === i + 1 ? 3 : 2);

      let fx = from.x + stageW / 2;
      let fy = from.y + stageH / 2;
      let tx = to.x + stageW / 2;
      let ty = to.y + stageH / 2;

      // Determine if same row or next row
      if (abs(fy - ty) < 10) {
        // Same row: horizontal arrow
        drawArrow(fx + stageW/2 - 5, fy, tx - stageW/2 + 5, ty);
      } else {
        // Different row: curve down
        noFill();
        let midX = (fx + tx) / 2;
        bezier(fx, fy + stageH/2 - 5, fx, fy + 50, tx, ty - 50, tx, ty - stageH/2 + 5);
        // Arrowhead
        let angle = atan2(5, 0);
        fill(animating && animStage === i + 1 ? '#FF6B6B' : '#BBB');
        noStroke();
        triangle(tx, ty - stageH/2 + 5, tx - 5, ty - stageH/2 - 5, tx + 5, ty - stageH/2 - 5);
      }
    }
  }

  // Draw stages
  for (let i = 0; i < stages.length; i++) {
    let pos = positions[i];
    let isSelected = (i === selectedStage);
    let isAnimHighlight = (animating && i === animStage);
    let s = stages[i];

    // Shadow
    noStroke();
    fill(0, 0, 0, 15);
    rect(pos.x + 3, pos.y + 3, stageW, stageH, 10);

    // Stage box
    if (isSelected || isAnimHighlight) {
      stroke('#333');
      strokeWeight(3);
    } else {
      stroke('#AAA');
      strokeWeight(1);
    }
    fill(isSelected ? s.color : lightenHex(s.color, 0.7));
    rect(pos.x, pos.y, stageW, stageH, 10);

    // Checkmark if completed
    if (completed[i]) {
      noStroke();
      fill('#2ECC71');
      ellipse(pos.x + stageW - 8, pos.y + 8, 18);
      fill('white');
      textAlign(CENTER, CENTER);
      textSize(11);
      text('✓', pos.x + stageW - 8, pos.y + 7);
    }

    // Stage number and name
    noStroke();
    fill(isSelected ? 'white' : '#333');
    textAlign(CENTER, CENTER);
    textSize(10);

    let lines = s.name.split('\n');
    let textY = pos.y + stageH / 2 - (lines.length - 1) * 7;
    for (let j = 0; j < lines.length; j++) {
      text(lines[j], pos.x + stageW / 2, textY + j * 14);
    }

    // Stage number
    textSize(9);
    fill(isSelected ? 'rgba(255,255,255,0.7)' : '#888');
    text('Stage ' + (i + 1), pos.x + stageW / 2, pos.y + stageH - 8);
  }

  // Completion message
  if (completed.every(Boolean)) {
    fill('#2ECC71');
    textAlign(CENTER, CENTER);
    textSize(16);
    noStroke();
    text('Workflow Complete! All stages reviewed.', canvasWidth / 2, drawHeight - 15);
  }
}

function calculateStagePositions(w, h) {
  let positions = [];
  let gap = 15;
  let perRow = canvasWidth < 600 ? 3 : 6;
  let totalW = perRow * w + (perRow - 1) * gap;
  let startX = (canvasWidth - totalW) / 2;
  let startY = 45;

  for (let i = 0; i < stages.length; i++) {
    let row = floor(i / perRow);
    let col = i % perRow;
    positions.push({
      x: startX + col * (w + gap),
      y: startY + row * (h + 40)
    });
  }
  return positions;
}

function drawArrow(x1, y1, x2, y2) {
  line(x1, y1, x2, y2);
  // Arrowhead
  let angle = atan2(y2 - y1, x2 - x1);
  let size = 8;
  fill('#BBB');
  noStroke();
  triangle(
    x2, y2,
    x2 - size * cos(angle - 0.4), y2 - size * sin(angle - 0.4),
    x2 - size * cos(angle + 0.4), y2 - size * sin(angle + 0.4)
  );
}

function lightenHex(hex, amount) {
  let c = color(hex);
  return lerpColor(c, color(255), amount);
}

function mousePressed() {
  if (mouseY > drawHeight) return;

  let stageW = 100;
  let stageH = 65;
  let positions = calculateStagePositions(stageW, stageH);

  for (let i = 0; i < stages.length; i++) {
    let pos = positions[i];
    if (mouseX >= pos.x && mouseX <= pos.x + stageW &&
        mouseY >= pos.y && mouseY <= pos.y + stageH) {
      selectedStage = i;
      updateDetailPanel();
      break;
    }
  }
}

function updateDetailPanel() {
  let panel = document.getElementById('detail-panel');
  if (!panel) return;

  if (selectedStage < 0) {
    panel.innerHTML = '<div style="color:#888; text-align:center; padding:30px;">Click a stage above to see details</div>';
    return;
  }

  let s = stages[selectedStage];
  let html = `
    <div style="display:flex; align-items:center; gap:10px; margin-bottom:10px;">
      <span style="font-size:28px;">${s.icon}</span>
      <div>
        <strong style="color:${s.color}; font-size:16px;">Stage ${selectedStage + 1}: ${s.name.replace('\n', ' ')}</strong>
      </div>
    </div>
    <ul style="margin:8px 0; padding-left:20px;">
      ${s.bullets.map(b => `<li>${b}</li>`).join('')}
    </ul>
    <div style="background:#F3E5F5; padding:8px; border-radius:4px; margin:8px 0; font-size:13px;">
      <strong>📖</strong> ${s.example}
    </div>
    <div style="background:#FFF3E0; padding:8px; border-radius:4px; margin:8px 0; font-size:13px;">
      <strong>🔍 Self-Check:</strong> ${s.check}
    </div>
    <button onclick="markComplete(${selectedStage})" style="padding:6px 14px; background:${completed[selectedStage] ? '#AAA' : '#2ECC71'}; color:white; border:none; border-radius:4px; cursor:pointer;">
      ${completed[selectedStage] ? '✓ Completed' : 'Mark Complete'}
    </button>
  `;
  panel.innerHTML = html;
}

// Global function for button click
window.markComplete = function(idx) {
  completed[idx] = true;
  updateDetailPanel();
};

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
