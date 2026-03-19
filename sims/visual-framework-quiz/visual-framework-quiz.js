// Visual Framework Matching Quiz
// Match scenarios to Six W's and visual types
// Bloom Level: Apply (L3) — use frameworks on new problems

let containerWidth;
let canvasWidth = 400;
let drawHeight = 450;
let controlHeight = 60;
let canvasHeight = drawHeight + controlHeight;
let containerHeight = canvasHeight;
let margin = 15;

const wTypes = [
  { name: 'Who/What', color: '#2196F3' },
  { name: 'How Much', color: '#FF9800' },
  { name: 'Where', color: '#4CAF50' },
  { name: 'When', color: '#9C27B0' },
  { name: 'How', color: '#009688' },
  { name: 'Why', color: '#F44336' }
];

const visTypes = [
  { name: 'Portrait', color: '#1976D2' },
  { name: 'Chart', color: '#F57C00' },
  { name: 'Map', color: '#388E3C' },
  { name: 'Timeline', color: '#7B1FA2' },
  { name: 'Flowchart', color: '#00796B' },
  { name: 'Multi-Var Plot', color: '#D32F2F' }
];

const scenarios = [
  {
    desc: 'A public health official wants to show how vaccination rates have risen and fallen across different decades.',
    correctW: 'When', correctVis: 'Timeline',
    explain: '"When" because the focus is on change over time. A Timeline is the natural visual for showing trends across decades.'
  },
  {
    desc: 'A startup CEO wants to demonstrate why their product outperforms competitors across customer satisfaction, price, and feature completeness.',
    correctW: 'Why', correctVis: 'Multi-Var Plot',
    explain: '"Why" because the goal is to argue a causal claim. A Multi-Variable Plot compares multiple dimensions simultaneously.'
  },
  {
    desc: 'A teacher wants to show the organizational chart of a school district, from superintendent to individual teachers.',
    correctW: 'Who/What', correctVis: 'Portrait',
    explain: '"Who/What" because it identifies people and roles. A Portrait (org chart) shows hierarchical relationships between people.'
  },
  {
    desc: 'A logistics manager needs to visualize the distribution of warehouses and delivery routes across the country.',
    correctW: 'Where', correctVis: 'Map',
    explain: '"Where" because the data is geographic. A Map shows spatial relationships between locations and routes.'
  },
  {
    desc: 'An analyst wants to compare quarterly revenue figures for five product lines over the past year.',
    correctW: 'How Much', correctVis: 'Chart',
    explain: '"How Much" because the focus is on quantitative comparison. A Chart (bar or line) displays numerical values clearly.'
  },
  {
    desc: 'A software architect needs to document the steps a user request takes from the browser through the API gateway, database, and back.',
    correctW: 'How', correctVis: 'Flowchart',
    explain: '"How" because it describes a process. A Flowchart shows sequential steps and decision points in a workflow.'
  },
  {
    desc: 'A museum curator wants to create a profile of Leonardo da Vinci showing his key works, biography, and contributions.',
    correctW: 'Who/What', correctVis: 'Portrait',
    explain: '"Who/What" because the subject is a specific person. A Portrait layout presents biographical information visually.'
  },
  {
    desc: 'A city planner wants to explain why investing in public transit reduces both traffic congestion and carbon emissions through a chain of effects.',
    correctW: 'Why', correctVis: 'Multi-Var Plot',
    explain: '"Why" because it traces cause and effect across multiple variables. A Multi-Variable Plot shows how changes in one factor cascade to others.'
  }
];

let currentQ = 0;
let score = 0;
let totalAnswered = 0;
let selectedW = -1;
let selectedVis = -1;
let feedback = '';
let feedbackW = false;
let feedbackVis = false;
let answered = false;
let shuffled;

function setup() {
  updateCanvasSize();
  const canvas = createCanvas(containerWidth, containerHeight);
  canvas.parent(document.querySelector('main'));
  shuffled = [...scenarios].sort(() => Math.random() - 0.5);
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
  text('Visual Framework Quiz', canvasWidth / 2, 6);

  // Progress bar
  let progW = canvasWidth - margin * 2;
  let progY = 28;
  fill('#E0E0E0');
  noStroke();
  rect(margin, progY, progW, 6, 3);
  fill('#4CAF50');
  rect(margin, progY, progW * (totalAnswered / scenarios.length), 6, 3);

  // Score
  fill(100);
  textSize(12);
  textAlign(RIGHT, TOP);
  text('Score: ' + score + '/' + totalAnswered, canvasWidth - margin, progY + 10);

  if (currentQ >= shuffled.length) {
    drawFinalScreen();
    return;
  }

  let q = shuffled[currentQ];

  // Scenario card
  let cardY = 44;
  let cardH = 75;
  fill('white');
  stroke('#BBDEFB');
  strokeWeight(2);
  rect(margin, cardY, canvasWidth - margin * 2, cardH, 8);

  fill('#1565C0');
  noStroke();
  textAlign(LEFT, TOP);
  textSize(14);
  textWrap(WORD);
  text(q.desc, margin + 10, cardY + 10, canvasWidth - margin * 2 - 20);

  // Row 1: "What W?"
  let row1Y = cardY + cardH + 12;
  fill('#333');
  noStroke();
  textAlign(LEFT, CENTER);
  textSize(14);
  textStyle(BOLD);
  text('What W?', margin, row1Y + 18);
  textStyle(NORMAL);

  let btnW = (canvasWidth - margin * 2 - 80) / 6;
  let btnH = 36;
  let btnStartX = margin + 75;

  for (let i = 0; i < wTypes.length; i++) {
    let bx = btnStartX + i * (btnW + 2);
    let by = row1Y;
    let w = wTypes[i];
    let isSelected = (i === selectedW);
    let isCorrect = answered && w.name === q.correctW;
    let isWrong = answered && isSelected && !feedbackW;

    if (isCorrect) {
      fill('#C8E6C9'); stroke('#4CAF50'); strokeWeight(2);
    } else if (isWrong) {
      fill('#FFCDD2'); stroke('#F44336'); strokeWeight(2);
    } else if (isSelected) {
      fill(w.color + '25'); stroke(w.color); strokeWeight(2);
    } else {
      fill('white'); stroke('#E0E0E0'); strokeWeight(1);
    }
    rect(bx, by, btnW, btnH, 6);

    fill(isSelected || isCorrect ? w.color : '#616161');
    noStroke();
    textAlign(CENTER, CENTER);
    textSize(min(12, btnW / 5));
    text(w.name, bx + btnW / 2, by + btnH / 2);
  }

  // Row 2: "What Visual?"
  let row2Y = row1Y + btnH + 12;
  fill('#333');
  noStroke();
  textAlign(LEFT, CENTER);
  textSize(14);
  textStyle(BOLD);
  text('Visual?', margin, row2Y + 18);
  textStyle(NORMAL);

  for (let i = 0; i < visTypes.length; i++) {
    let bx = btnStartX + i * (btnW + 2);
    let by = row2Y;
    let v = visTypes[i];
    let isSelected = (i === selectedVis);
    let isCorrect = answered && v.name === q.correctVis;
    let isWrong = answered && isSelected && !feedbackVis;

    if (isCorrect) {
      fill('#C8E6C9'); stroke('#4CAF50'); strokeWeight(2);
    } else if (isWrong) {
      fill('#FFCDD2'); stroke('#F44336'); strokeWeight(2);
    } else if (isSelected) {
      fill(v.color + '25'); stroke(v.color); strokeWeight(2);
    } else {
      fill('white'); stroke('#E0E0E0'); strokeWeight(1);
    }
    rect(bx, by, btnW, btnH, 6);

    fill(isSelected || isCorrect ? v.color : '#616161');
    noStroke();
    textAlign(CENTER, CENTER);
    textSize(min(11, btnW / 5.5));
    text(v.name, bx + btnW / 2, by + btnH / 2);
  }

  // Check Answer button
  let checkY = row2Y + btnH + 14;
  if (!answered && selectedW >= 0 && selectedVis >= 0) {
    let checkW = 140;
    let checkX = canvasWidth / 2 - checkW / 2;
    fill('#2196F3');
    noStroke();
    rect(checkX, checkY, checkW, 32, 8);
    fill('white');
    textAlign(CENTER, CENTER);
    textSize(14);
    textStyle(BOLD);
    text('Check Answer', checkX + checkW / 2, checkY + 16);
    textStyle(NORMAL);
  }

  // Feedback
  if (answered) {
    let fbY = checkY + 5;
    let wMark = feedbackW ? '✓' : '✗';
    let vMark = feedbackVis ? '✓' : '✗';
    fill(feedbackW && feedbackVis ? '#2E7D32' : '#C62828');
    noStroke();
    textAlign(CENTER, TOP);
    textSize(14);
    textStyle(BOLD);
    text('W: ' + wMark + '  Visual: ' + vMark, canvasWidth / 2, fbY);
    textStyle(NORMAL);

    fill(60);
    textSize(13);
    textWrap(WORD);
    text(q.explain, margin, fbY + 22, canvasWidth - margin * 2);
  }

  // Control area
  fill(100);
  noStroke();
  textAlign(LEFT, CENTER);
  textSize(14);
  text('Scenario ' + (currentQ + 1) + ' of ' + shuffled.length, margin, drawHeight + 25);

  // Retry button
  let retryX = canvasWidth - margin - 90;
  fill('white');
  stroke('#BDBDBD');
  strokeWeight(1);
  rect(retryX, drawHeight + 10, 90, 30, 6);
  fill('#616161');
  noStroke();
  textAlign(CENTER, CENTER);
  textSize(13);
  text('Retry Quiz', retryX + 45, drawHeight + 25);
}

function drawFinalScreen() {
  let pct = Math.round((score / scenarios.length) * 100);
  let grade = pct >= 90 ? 'Excellent!' : pct >= 70 ? 'Good job!' : pct >= 50 ? 'Keep practicing!' : 'Try again!';

  fill(pct >= 70 ? '#4CAF50' : '#FF9800');
  noStroke();
  textAlign(CENTER, CENTER);
  textSize(48);
  text(pct + '%', canvasWidth / 2, drawHeight / 2 - 30);

  fill('black');
  textSize(20);
  text(grade, canvasWidth / 2, drawHeight / 2 + 20);

  textSize(14);
  fill(100);
  text(score + ' correct out of ' + scenarios.length, canvasWidth / 2, drawHeight / 2 + 50);
}

function mousePressed() {
  // Retry button
  let retryX = canvasWidth - margin - 90;
  if (mouseX >= retryX && mouseX <= retryX + 90 && mouseY >= drawHeight + 10 && mouseY <= drawHeight + 40) {
    resetQuiz();
    return;
  }

  if (currentQ >= shuffled.length) return;

  let q = shuffled[currentQ];
  let cardH = 75;
  let row1Y = 44 + cardH + 12;
  let btnW = (canvasWidth - margin * 2 - 80) / 6;
  let btnH = 36;
  let btnStartX = margin + 75;
  let row2Y = row1Y + btnH + 12;

  // Auto-advance on click after answered
  if (answered) {
    currentQ++;
    selectedW = -1;
    selectedVis = -1;
    answered = false;
    feedback = '';
    return;
  }

  // W row clicks
  if (mouseY >= row1Y && mouseY <= row1Y + btnH) {
    for (let i = 0; i < wTypes.length; i++) {
      let bx = btnStartX + i * (btnW + 2);
      if (mouseX >= bx && mouseX <= bx + btnW) {
        selectedW = i;
        return;
      }
    }
  }

  // Visual row clicks
  if (mouseY >= row2Y && mouseY <= row2Y + btnH) {
    for (let i = 0; i < visTypes.length; i++) {
      let bx = btnStartX + i * (btnW + 2);
      if (mouseX >= bx && mouseX <= bx + btnW) {
        selectedVis = i;
        return;
      }
    }
  }

  // Check Answer button
  let checkY = row2Y + btnH + 14;
  let checkW = 140;
  let checkX = canvasWidth / 2 - checkW / 2;
  if (!answered && selectedW >= 0 && selectedVis >= 0 &&
      mouseX >= checkX && mouseX <= checkX + checkW &&
      mouseY >= checkY && mouseY <= checkY + 32) {
    checkAnswer();
  }
}

function checkAnswer() {
  let q = shuffled[currentQ];
  feedbackW = (wTypes[selectedW].name === q.correctW);
  feedbackVis = (visTypes[selectedVis].name === q.correctVis);
  answered = true;
  totalAnswered++;
  if (feedbackW && feedbackVis) score++;
}

function resetQuiz() {
  currentQ = 0;
  score = 0;
  totalAnswered = 0;
  selectedW = -1;
  selectedVis = -1;
  answered = false;
  feedback = '';
  shuffled = [...scenarios].sort(() => Math.random() - 0.5);
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
