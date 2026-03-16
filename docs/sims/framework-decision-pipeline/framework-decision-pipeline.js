// Framework Decision Pipeline
// Trace scenarios through Six W's → Six Frameworks → SQVID.
// Bloom Level: Analyze (L4)

let containerWidth;
let canvasWidth = 400;
let drawHeight = 300;
let canvasHeight = drawHeight;

let scenarios = [];
let currentScenario = 0;
let selectedW = -1;
let selectedFramework = -1;
let sqvidValues = { S: 0, Q: 0, V: 0, I: 0, D: 0 };
let checked = false;
let feedback = '';

const sixWs = ['Who/What', 'How Much', 'Where', 'When', 'How', 'Why'];
const sixFrameworks = ['Portrait/Gallery', 'Chart', 'Map', 'Timeline', 'Flowchart', 'Multi-variable Plot'];
const wToFramework = { 0: 0, 1: 1, 2: 2, 3: 3, 4: 4, 5: 5 }; // W index -> Framework index

const sqvidDimensions = [
  { key: 'S', left: 'Simple', right: 'Elaborate' },
  { key: 'Q', left: 'Qualitative', right: 'Quantitative' },
  { key: 'V', left: 'Vision', right: 'Execution' },
  { key: 'I', left: 'Individual', right: 'Comparison' },
  { key: 'D', left: 'Status Quo', right: 'Delta' }
];

function preload() {
  fetch('data.json')
    .then(r => r.json())
    .then(data => { scenarios = data; })
    .catch(() => {
      scenarios = [{ description: 'Error loading data.json', correctW: 'How', correctFramework: 'Flowchart', recommendedSQVID: {S:'Simple',Q:'Qualitative',V:'Execution',I:'Individual',D:'Delta'}, explanation: '' }];
    });
}

function setup() {
  updateCanvasSize();
  const canvas = createCanvas(containerWidth, canvasHeight);
  var mainElement = document.querySelector('main');
  canvas.parent(mainElement);
  textFont('Arial');
  buildControls();
}

function buildControls() {
  let mainEl = document.querySelector('main');

  // Scenario panel
  let scenarioDiv = document.createElement('div');
  scenarioDiv.id = 'scenario-panel';
  scenarioDiv.style.cssText = 'background:#F3E5F5; border:1px solid #CE93D8; padding:12px; font-family:Arial,sans-serif; font-size:14px; line-height:1.6;';
  mainEl.appendChild(scenarioDiv);

  // Result panel
  let resultDiv = document.createElement('div');
  resultDiv.id = 'result-panel';
  resultDiv.style.cssText = 'background:white; border:1px solid silver; padding:12px; font-family:Arial,sans-serif; font-size:14px; min-height:60px;';
  mainEl.appendChild(resultDiv);

  // Button row
  let btnRow = document.createElement('div');
  btnRow.style.cssText = 'display:flex; gap:8px; padding:8px; background:#f5f5f5; border:1px solid silver; border-top:none;';
  btnRow.innerHTML = `
    <button id="checkBtn" style="padding:6px 14px; background:#4A90D9; color:white; border:none; border-radius:4px; cursor:pointer;">Check</button>
    <button id="nextBtn" style="padding:6px 14px; background:#2ECC71; color:white; border:none; border-radius:4px; cursor:pointer;">New Scenario</button>
  `;
  mainEl.appendChild(btnRow);

  document.getElementById('checkBtn').addEventListener('click', checkAnswer);
  document.getElementById('nextBtn').addEventListener('click', nextScenario);

  updateScenarioPanel();
}

function updateScenarioPanel() {
  let panel = document.getElementById('scenario-panel');
  if (!panel || scenarios.length === 0) return;
  let s = scenarios[currentScenario];
  panel.innerHTML = `<strong>Scenario ${currentScenario + 1} of ${scenarios.length}:</strong><br/>${s.description}`;
}

function checkAnswer() {
  if (scenarios.length === 0 || selectedW < 0) return;
  checked = true;
  let s = scenarios[currentScenario];
  let correctWIdx = sixWs.indexOf(s.correctW);
  let correctFIdx = sixFrameworks.indexOf(s.correctFramework);
  let wCorrect = (selectedW === correctWIdx);
  let fCorrect = (selectedFramework === correctFIdx);

  let resultPanel = document.getElementById('result-panel');
  if (resultPanel) {
    let html = '';
    if (wCorrect && fCorrect) {
      html = `<div style="color:#2ECC71; font-weight:bold;">✓ Correct!</div>`;
    } else {
      html = `<div style="color:#E67E22; font-weight:bold;">Not quite</div>`;
      if (!wCorrect) html += `<p>The question type is <strong>${s.correctW}</strong>, not ${sixWs[selectedW]}.</p>`;
      if (!fCorrect) html += `<p>The best framework is <strong>${s.correctFramework}</strong>.</p>`;
    }
    html += `<p style="font-size:13px; color:#555;">${s.explanation}</p>`;

    // Show recommended SQVID
    let sqvid = s.recommendedSQVID;
    html += `<p style="font-size:12px; color:#888;">Recommended SQVID: ${Object.entries(sqvid).map(([k,v]) => k + '=' + v).join(', ')}</p>`;
    resultPanel.innerHTML = html;
  }
}

function nextScenario() {
  currentScenario = (currentScenario + 1) % scenarios.length;
  selectedW = -1;
  selectedFramework = -1;
  sqvidValues = { S: 0, Q: 0, V: 0, I: 0, D: 0 };
  checked = false;
  updateScenarioPanel();
  let resultPanel = document.getElementById('result-panel');
  if (resultPanel) resultPanel.innerHTML = '<div style="color:#888;">Select a W question, then check your answer.</div>';
}

function draw() {
  updateCanvasSize();

  fill('aliceblue');
  stroke('silver');
  strokeWeight(1);
  rect(0, 0, canvasWidth, drawHeight);

  if (scenarios.length === 0) {
    fill('#888');
    noStroke();
    textAlign(CENTER, CENTER);
    textSize(16);
    text('Loading...', canvasWidth / 2, drawHeight / 2);
    return;
  }

  // Three-stage pipeline
  let stageW = (canvasWidth - 60) / 3;
  let stageY = 10;

  // Stage 1: Six W's
  drawStageHeader('Stage 1: Identify the W', 15, stageY, stageW, '#42A5F5');
  let wBtnY = stageY + 25;
  let wBtnW = (stageW - 10) / 2;
  let wBtnH = 28;

  for (let i = 0; i < 6; i++) {
    let col = i % 2;
    let row = floor(i / 2);
    let bx = 15 + col * (wBtnW + 5);
    let by = wBtnY + row * (wBtnH + 4);

    let isSelected = (i === selectedW);
    fill(isSelected ? '#42A5F5' : '#E3F2FD');
    stroke(isSelected ? '#1565C0' : '#90CAF9');
    strokeWeight(1);
    rect(bx, by, wBtnW, wBtnH, 4);

    noStroke();
    fill(isSelected ? 'white' : '#333');
    textAlign(CENTER, CENTER);
    textSize(11);
    text(sixWs[i], bx + wBtnW / 2, by + wBtnH / 2);
  }

  // Arrow 1→2
  let arrowX1 = 15 + stageW + 2;
  stroke('#AAA');
  strokeWeight(2);
  line(arrowX1, drawHeight / 2, arrowX1 + 12, drawHeight / 2);
  noStroke();
  fill('#AAA');
  triangle(arrowX1 + 12, drawHeight / 2, arrowX1 + 7, drawHeight / 2 - 4, arrowX1 + 7, drawHeight / 2 + 4);

  // Stage 2: Framework (auto-selected based on W)
  let s2x = 15 + stageW + 18;
  drawStageHeader('Stage 2: Framework', s2x, stageY, stageW, '#E67E22');

  let fBtnY = stageY + 25;
  let fBtnW = stageW - 5;
  let fBtnH = 25;

  for (let i = 0; i < 6; i++) {
    let by = fBtnY + i * (fBtnH + 3);
    let autoSelected = (selectedW >= 0 && wToFramework[selectedW] === i);
    let manualSelected = (selectedFramework === i);
    let isSelected = manualSelected || (autoSelected && selectedFramework < 0);

    fill(isSelected ? '#E67E22' : '#FFF3E0');
    stroke(isSelected ? '#E65100' : '#FFCC80');
    strokeWeight(1);
    rect(s2x, by, fBtnW, fBtnH, 4);

    noStroke();
    fill(isSelected ? 'white' : '#555');
    textAlign(CENTER, CENTER);
    textSize(11);
    text(sixFrameworks[i], s2x + fBtnW / 2, by + fBtnH / 2);
  }

  // Arrow 2→3
  let arrowX2 = s2x + stageW + 2;
  stroke('#AAA');
  strokeWeight(2);
  line(arrowX2, drawHeight / 2, arrowX2 + 12, drawHeight / 2);
  noStroke();
  fill('#AAA');
  triangle(arrowX2 + 12, drawHeight / 2, arrowX2 + 7, drawHeight / 2 - 4, arrowX2 + 7, drawHeight / 2 + 4);

  // Stage 3: SQVID sliders
  let s3x = s2x + stageW + 18;
  drawStageHeader('Stage 3: Set SQVID', s3x, stageY, stageW, '#66BB6A');

  let sliderY = stageY + 28;
  let sliderW = stageW - 20;

  for (let i = 0; i < sqvidDimensions.length; i++) {
    let dim = sqvidDimensions[i];
    let sy = sliderY + i * 42;

    noStroke();
    fill('#555');
    textAlign(CENTER, TOP);
    textSize(10);
    text(dim.key, s3x + 5, sy);

    fill('#888');
    textSize(9);
    textAlign(LEFT, TOP);
    text(dim.left, s3x + 12, sy);
    textAlign(RIGHT, TOP);
    text(dim.right, s3x + stageW - 5, sy);

    // Slider track
    let trackX = s3x + 12;
    let trackY = sy + 14;
    let trackW = sliderW;

    stroke('#DDD');
    strokeWeight(3);
    line(trackX, trackY, trackX + trackW, trackY);

    // Slider thumb
    let val = sqvidValues[dim.key];
    let thumbX = trackX + map(val, -1, 1, 0, trackW);
    noStroke();
    fill('#66BB6A');
    ellipse(thumbX, trackY, 12);
  }
}

function drawStageHeader(label, x, y, w, col) {
  noStroke();
  fill(col);
  rect(x, y, w, 20, 4, 4, 0, 0);
  fill('white');
  textAlign(CENTER, CENTER);
  textSize(11);
  text(label, x + w / 2, y + 10);
}

function mousePressed() {
  if (scenarios.length === 0) return;

  let stageW = (canvasWidth - 60) / 3;

  // Stage 1: W buttons
  let wBtnW = (stageW - 10) / 2;
  let wBtnH = 28;
  let wBtnY = 35;

  for (let i = 0; i < 6; i++) {
    let col = i % 2;
    let row = floor(i / 2);
    let bx = 15 + col * (wBtnW + 5);
    let by = wBtnY + row * (wBtnH + 4);
    if (mouseX >= bx && mouseX <= bx + wBtnW && mouseY >= by && mouseY <= by + wBtnH) {
      selectedW = i;
      selectedFramework = wToFramework[i]; // Auto-select framework
      return;
    }
  }

  // Stage 2: Framework buttons
  let s2x = 15 + stageW + 18;
  let fBtnW = stageW - 5;
  let fBtnH = 25;
  let fBtnY = 35;

  for (let i = 0; i < 6; i++) {
    let by = fBtnY + i * (fBtnH + 3);
    if (mouseX >= s2x && mouseX <= s2x + fBtnW && mouseY >= by && mouseY <= by + fBtnH) {
      selectedFramework = i;
      return;
    }
  }

  // Stage 3: SQVID sliders
  let s3x = s2x + stageW + 18;
  let sliderW = stageW - 20;
  let sliderY = 38;

  for (let i = 0; i < sqvidDimensions.length; i++) {
    let dim = sqvidDimensions[i];
    let sy = sliderY + i * 42 + 14;
    let trackX = s3x + 12;

    if (mouseX >= trackX && mouseX <= trackX + sliderW && mouseY >= sy - 8 && mouseY <= sy + 8) {
      sqvidValues[dim.key] = map(mouseX, trackX, trackX + sliderW, -1, 1);
      sqvidValues[dim.key] = constrain(sqvidValues[dim.key], -1, 1);
      return;
    }
  }
}

function mouseDragged() {
  // Allow dragging SQVID sliders
  let stageW = (canvasWidth - 60) / 3;
  let s2x = 15 + stageW + 18;
  let s3x = s2x + stageW + 18;
  let sliderW = stageW - 20;
  let sliderY = 38;

  for (let i = 0; i < sqvidDimensions.length; i++) {
    let dim = sqvidDimensions[i];
    let sy = sliderY + i * 42 + 14;
    let trackX = s3x + 12;

    if (mouseX >= trackX - 10 && mouseX <= trackX + sliderW + 10 && mouseY >= sy - 12 && mouseY <= sy + 12) {
      sqvidValues[dim.key] = map(mouseX, trackX, trackX + sliderW, -1, 1);
      sqvidValues[dim.key] = constrain(sqvidValues[dim.key], -1, 1);
      return;
    }
  }
}

function windowResized() {
  updateCanvasSize();
  resizeCanvas(containerWidth, canvasHeight);
  redraw();
}

function updateCanvasSize() {
  const container = document.querySelector('main').getBoundingClientRect();
  containerWidth = Math.floor(container.width);
  canvasWidth = containerWidth;
}
