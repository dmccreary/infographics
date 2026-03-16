// Diagram Type Decision Tool
// Apply the diagram type framework to select the best SmartArt category.
// Bloom Level: Apply (L3)

let containerWidth;
let canvasWidth = 400;
let drawHeight = 280;
let canvasHeight = drawHeight;

let scenarios = [];
let currentScenario = 0;
let score = 0;
let selectedCategory = -1;
let checked = false;
let isCorrect = false;

const categories = [
  { name: 'List', color: '#4A90D9', icon: '≡' },
  { name: 'Process', color: '#2ECC71', icon: '→' },
  { name: 'Cycle', color: '#E67E22', icon: '↻' },
  { name: 'Hierarchy', color: '#9B59B6', icon: '△' },
  { name: 'Relationship', color: '#E74C3C', icon: '⊕' },
  { name: 'Pyramid', color: '#F39C12', icon: '▲' },
  { name: 'Funnel', color: '#1ABC9C', icon: '▽' },
  { name: 'Picture', color: '#3498DB', icon: '🖼' }
];

function preload() {
  // Load scenarios from data.json
  fetch('data.json')
    .then(r => r.json())
    .then(data => { scenarios = data; })
    .catch(() => {
      scenarios = [{
        description: 'Error loading scenarios. Please check data.json.',
        correctCategory: 'List', correctSubtype: '', explanation: '', hint: ''
      }];
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
  let panel = document.createElement('div');
  panel.id = 'feedback-panel';
  panel.style.cssText = 'background:white; border:1px solid silver; padding:15px; font-family:Arial,sans-serif; font-size:14px; min-height:80px;';
  panel.innerHTML = '<div style="color:#888;">Select a category above, then click Check.</div>';
  mainEl.appendChild(panel);
}

function draw() {
  updateCanvasSize();

  // Background
  fill('aliceblue');
  stroke('silver');
  strokeWeight(1);
  rect(0, 0, canvasWidth, drawHeight);

  if (scenarios.length === 0) {
    fill('#888');
    noStroke();
    textAlign(CENTER, CENTER);
    textSize(16);
    text('Loading scenarios...', canvasWidth / 2, drawHeight / 2);
    return;
  }

  // Progress bar
  noStroke();
  fill('#333');
  textAlign(LEFT, TOP);
  textSize(14);
  let progressText = 'Scenario ' + (currentScenario + 1) + ' of ' + scenarios.length + '  —  Score: ' + score + '/' + currentScenario;
  text(progressText, 15, 10);

  // Scenario description
  let scenario = scenarios[currentScenario];
  fill('#2C3E50');
  textSize(14);
  textAlign(LEFT, TOP);
  let descY = 35;
  let descW = canvasWidth - 30;
  descY = drawWrappedText(scenario.description, 15, descY, descW, 20);

  // Category buttons
  let btnW = min(90, (canvasWidth - 30 - 7 * 8) / 8);
  let btnH = 40;
  let btnStartX = (canvasWidth - (btnW * 8 + 7 * 8)) / 2;
  let btnY = descY + 15;

  // Step label
  fill('#888');
  textSize(12);
  textAlign(LEFT, TOP);
  text('Select Category:', 15, btnY - 2);
  btnY += 18;

  for (let i = 0; i < categories.length; i++) {
    let bx = btnStartX + i * (btnW + 8);
    let cat = categories[i];
    let isSelected = (i === selectedCategory);

    if (isSelected) {
      fill(cat.color);
      stroke('#333');
      strokeWeight(2);
    } else {
      fill('#F0F0F0');
      stroke('#CCC');
      strokeWeight(1);
    }
    rect(bx, btnY, btnW, btnH, 6);

    noStroke();
    fill(isSelected ? 'white' : '#555');
    textAlign(CENTER, CENTER);
    textSize(11);
    text(cat.name, bx + btnW / 2, btnY + btnH / 2);
  }

  // Check and Next buttons
  let checkBtnY = btnY + btnH + 15;
  let checkBtnW = 80;

  // Check button
  if (!checked) {
    fill(selectedCategory >= 0 ? '#4A90D9' : '#CCC');
    noStroke();
    rect(canvasWidth / 2 - checkBtnW - 5, checkBtnY, checkBtnW, 32, 5);
    fill('white');
    textAlign(CENTER, CENTER);
    textSize(14);
    text('Check', canvasWidth / 2 - checkBtnW / 2 - 5, checkBtnY + 16);
  }

  // Next button (always visible after check)
  if (checked) {
    fill('#2ECC71');
    noStroke();
    rect(canvasWidth / 2 + 5, checkBtnY, checkBtnW, 32, 5);
    fill('white');
    textAlign(CENTER, CENTER);
    textSize(14);
    text(currentScenario < scenarios.length - 1 ? 'Next' : 'Done', canvasWidth / 2 + checkBtnW / 2 + 5, checkBtnY + 16);
  }
}

function drawWrappedText(txt, x, y, maxW, lineH) {
  let words = txt.split(' ');
  let currentLine = '';
  let cy = y;

  for (let word of words) {
    let testLine = currentLine ? currentLine + ' ' + word : word;
    if (textWidth(testLine) > maxW && currentLine) {
      text(currentLine, x, cy);
      cy += lineH;
      currentLine = word;
    } else {
      currentLine = testLine;
    }
  }
  if (currentLine) {
    text(currentLine, x, cy);
    cy += lineH;
  }
  return cy;
}

function mousePressed() {
  if (scenarios.length === 0) return;

  let scenario = scenarios[currentScenario];

  // Calculate button positions (same as draw)
  let btnW = min(90, (canvasWidth - 30 - 7 * 8) / 8);
  let btnH = 40;
  let btnStartX = (canvasWidth - (btnW * 8 + 7 * 8)) / 2;

  // We need to estimate btnY - compute wrapped text height
  textSize(14);
  let descLines = estimateLines(scenario.description, canvasWidth - 30);
  let btnY = 35 + descLines * 20 + 15 + 18;

  // Category button clicks
  if (!checked) {
    for (let i = 0; i < categories.length; i++) {
      let bx = btnStartX + i * (btnW + 8);
      if (mouseX >= bx && mouseX <= bx + btnW && mouseY >= btnY && mouseY <= btnY + btnH) {
        selectedCategory = i;
        return;
      }
    }
  }

  // Check button
  let checkBtnY = btnY + btnH + 15;
  let checkBtnW = 80;

  if (!checked && selectedCategory >= 0) {
    if (mouseX >= canvasWidth / 2 - checkBtnW - 5 && mouseX <= canvasWidth / 2 - 5 &&
        mouseY >= checkBtnY && mouseY <= checkBtnY + 32) {
      checkAnswer();
      return;
    }
  }

  // Next button
  if (checked) {
    if (mouseX >= canvasWidth / 2 + 5 && mouseX <= canvasWidth / 2 + checkBtnW + 5 &&
        mouseY >= checkBtnY && mouseY <= checkBtnY + 32) {
      nextScenario();
      return;
    }
  }
}

function estimateLines(txt, maxW) {
  let words = txt.split(' ');
  let lines = 1;
  let currentLine = '';
  for (let word of words) {
    let testLine = currentLine ? currentLine + ' ' + word : word;
    if (textWidth(testLine) > maxW && currentLine) {
      lines++;
      currentLine = word;
    } else {
      currentLine = testLine;
    }
  }
  return lines;
}

function checkAnswer() {
  let scenario = scenarios[currentScenario];
  isCorrect = categories[selectedCategory].name === scenario.correctCategory;
  if (isCorrect) score++;
  checked = true;

  let panel = document.getElementById('feedback-panel');
  if (panel) {
    if (isCorrect) {
      panel.innerHTML = `
        <div style="color:#2ECC71; font-size:16px; font-weight:bold;">✓ Excellent!</div>
        <p>${scenario.explanation}</p>
        <p style="color:#888; font-size:13px;">Best subtype: <strong>${scenario.correctSubtype}</strong></p>
      `;
    } else {
      panel.innerHTML = `
        <div style="color:#E67E22; font-size:16px; font-weight:bold;">Not quite — try thinking about it differently</div>
        <p style="color:#666;">${scenario.hint}</p>
        <p style="color:#888; font-size:13px;">The best category is: <strong>${scenario.correctCategory}</strong> → ${scenario.correctSubtype}</p>
        <p>${scenario.explanation}</p>
      `;
    }
  }
}

function nextScenario() {
  if (currentScenario < scenarios.length - 1) {
    currentScenario++;
    selectedCategory = -1;
    checked = false;
    isCorrect = false;
    let panel = document.getElementById('feedback-panel');
    if (panel) panel.innerHTML = '<div style="color:#888;">Select a category above, then click Check.</div>';
  } else {
    let panel = document.getElementById('feedback-panel');
    if (panel) {
      panel.innerHTML = `
        <div style="color:#2ECC71; font-size:18px; font-weight:bold;">All scenarios complete!</div>
        <p>Final score: <strong>${score}/${scenarios.length}</strong></p>
        <p>${score === scenarios.length ? 'Perfect score! You\'ve mastered diagram type selection.' :
           score >= scenarios.length * 0.75 ? 'Great job! Review the ones you missed.' :
           'Keep practicing — try clicking through again to reinforce the patterns.'}</p>
      `;
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
