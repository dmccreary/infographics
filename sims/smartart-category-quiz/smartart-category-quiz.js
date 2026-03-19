// SmartArt Category Matching Quiz
// Match descriptions to SmartArt categories
// Bloom Level: Remember (L1) — identify categories

let containerWidth;
let canvasWidth = 400;
let drawHeight = 380;
let controlHeight = 70;
let canvasHeight = drawHeight + controlHeight;
let containerHeight = canvasHeight;
let margin = 15;

const categories = [
  { name: "List", color: "#2196F3", icon: "≡" },
  { name: "Process", color: "#FF9800", icon: "→" },
  { name: "Cycle", color: "#4CAF50", icon: "↻" },
  { name: "Hierarchy", color: "#9C27B0", icon: "△" },
  { name: "Relationship", color: "#009688", icon: "◎" },
  { name: "Pyramid", color: "#F44336", icon: "▲" },
  { name: "Funnel", color: "#795548", icon: "▽" },
  { name: "Picture", color: "#E91E63", icon: "🖼" }
];

const questions = [
  { desc: "A triangle divided into horizontal layers where the base is the broadest and the top is the narrowest, showing that higher levels are rarer.", answer: "Pyramid" },
  { desc: "Items arranged in a circle with arrows pointing clockwise from each to the next, looping back to the start.", answer: "Cycle" },
  { desc: "A central concept connected by spokes to five surrounding concepts, showing a hub-and-spoke relationship.", answer: "Relationship" },
  { desc: "Three boxes connected by horizontal arrows from left to right, showing sequential steps.", answer: "Process" },
  { desc: "An inverted triangle with progressively narrower sections from top to bottom, showing filtering.", answer: "Funnel" },
  { desc: "A tree structure with one item at the top branching down to multiple levels of subordinates.", answer: "Hierarchy" },
  { desc: "Bullet points with brief text items arranged vertically, each with a colored marker.", answer: "List" },
  { desc: "A gallery of images with captions, arranged in a grid layout to showcase visual content.", answer: "Picture" },
  { desc: "Four colored chevron shapes interlocking from left to right, showing workflow progression.", answer: "Process" },
  { desc: "Three overlapping circles showing shared and unique attributes between groups.", answer: "Relationship" },
  { desc: "Five ascending stair steps from lower-left to upper-right representing growing expertise.", answer: "Process" },
  { desc: "Concentric rings radiating outward from a core value, showing priority from center to edge.", answer: "Relationship" }
];

let currentQuestion = 0;
let score = 0;
let totalAnswered = 0;
let feedback = '';
let feedbackCorrect = false;
let answered = false;
let hoveredCat = -1;
let shuffledQuestions;
let retryButton;

function setup() {
  updateCanvasSize();
  const canvas = createCanvas(containerWidth, containerHeight);
  canvas.parent(document.querySelector('main'));

  retryButton = createButton('Retry Quiz');
  retryButton.position(10, drawHeight + 12);
  retryButton.mousePressed(resetQuiz);

  shuffledQuestions = [...questions].sort(() => Math.random() - 0.5);
}

function resetQuiz() {
  currentQuestion = 0;
  score = 0;
  totalAnswered = 0;
  feedback = '';
  answered = false;
  shuffledQuestions = [...questions].sort(() => Math.random() - 0.5);
}

function draw() {
  updateCanvasSize();

  fill('aliceblue');
  stroke('silver');
  strokeWeight(1);
  rect(0, 0, canvasWidth, drawHeight);
  fill('white');
  rect(0, drawHeight, canvasWidth, controlHeight);

  fill('black');
  noStroke();
  textAlign(CENTER, TOP);
  textSize(18);
  text('SmartArt Category Quiz', canvasWidth / 2, 6);

  // Progress bar
  let progW = canvasWidth - margin * 2;
  let progY = 30;
  fill('#E0E0E0');
  noStroke();
  rect(margin, progY, progW, 8, 4);
  fill('#4CAF50');
  rect(margin, progY, progW * (totalAnswered / questions.length), 8, 4);

  // Score
  fill(100);
  textSize(12);
  textAlign(RIGHT, TOP);
  text(score + ' of ' + totalAnswered + ' correct', canvasWidth - margin, progY + 12);

  if (currentQuestion >= shuffledQuestions.length) {
    drawFinalScreen();
    return;
  }

  // Description card
  let q = shuffledQuestions[currentQuestion];
  let cardY = 50;
  let cardH = 80;
  fill('white');
  stroke('#BBDEFB');
  strokeWeight(2);
  rect(margin, cardY, canvasWidth - margin * 2, cardH, 8);

  fill('#1565C0');
  noStroke();
  textAlign(LEFT, TOP);
  textSize(14);
  textWrap(WORD);
  text(q.desc, margin + 12, cardY + 12, canvasWidth - margin * 2 - 24);

  // Category buttons — 2 rows of 4
  let btnW = (canvasWidth - margin * 2 - 30) / 4;
  let btnH = 55;
  let btnStartY = cardY + cardH + 15;

  hoveredCat = -1;
  for (let i = 0; i < categories.length; i++) {
    let col = i % 4;
    let row = Math.floor(i / 4);
    let bx = margin + col * (btnW + 10);
    let by = btnStartY + row * (btnH + 10);

    if (mouseX >= bx && mouseX <= bx + btnW && mouseY >= by && mouseY <= by + btnH)
      hoveredCat = i;

    let isHover = (i === hoveredCat) && !answered;
    let cat = categories[i];

    // Color based on answer state
    if (answered && cat.name === q.answer) {
      fill('#C8E6C9');
      stroke('#4CAF50');
      strokeWeight(2);
    } else if (answered && cat.name === feedback && !feedbackCorrect) {
      fill('#FFCDD2');
      stroke('#F44336');
      strokeWeight(2);
    } else if (isHover) {
      fill(cat.color + '20');
      stroke(cat.color);
      strokeWeight(2);
    } else {
      fill('white');
      stroke('#E0E0E0');
      strokeWeight(1);
    }
    rect(bx, by, btnW, btnH, 8);

    // Icon and name
    fill(cat.color);
    noStroke();
    textAlign(CENTER, CENTER);
    textSize(20);
    text(cat.icon, bx + btnW / 2, by + 18);
    textSize(12);
    fill('black');
    text(cat.name, bx + btnW / 2, by + 40);
  }

  // Feedback
  if (feedback) {
    let fbY = btnStartY + 2 * (btnH + 10) + 10;
    fill(feedbackCorrect ? '#2E7D32' : '#C62828');
    noStroke();
    textAlign(CENTER, CENTER);
    textSize(16);
    text(feedbackCorrect ? '✓ Correct! ' + q.answer : '✗ Wrong — Correct answer: ' + q.answer,
      canvasWidth / 2, fbY);
  }

  // Control area
  fill(100);
  noStroke();
  textAlign(LEFT, CENTER);
  textSize(13);
  text('Question ' + (currentQuestion + 1) + ' of ' + shuffledQuestions.length, 120, drawHeight + 25);
}

function drawFinalScreen() {
  let pct = Math.round((score / questions.length) * 100);
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
  text(score + ' correct out of ' + questions.length, canvasWidth / 2, drawHeight / 2 + 50);
}

function mousePressed() {
  if (answered || currentQuestion >= shuffledQuestions.length) return;
  if (hoveredCat < 0) return;

  let q = shuffledQuestions[currentQuestion];
  let selected = categories[hoveredCat].name;
  answered = true;

  if (selected === q.answer) {
    score++;
    feedbackCorrect = true;
    feedback = selected;
  } else {
    feedbackCorrect = false;
    feedback = selected;
  }

  totalAnswered++;

  // Auto-advance after 2 seconds
  setTimeout(() => {
    currentQuestion++;
    answered = false;
    feedback = '';
  }, 2000);
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
