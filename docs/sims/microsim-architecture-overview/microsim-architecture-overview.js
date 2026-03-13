// MicroSim Architecture Overview
// Interactive diagram showing the four-file MicroSim directory structure
// Bloom Level: Understand (L2) - Explain the four-file architecture
// MicroSim template version 2026.02

// global layout variables
let containerWidth;
let canvasWidth = 400;
let drawHeight = 550;
let controlHeight = 40;
let canvasHeight = drawHeight + controlHeight;
let containerHeight = canvasHeight;
let margin = 20;
let defaultTextSize = 16;
let sliderLeftMargin = 160;

// File block definitions
let fileBlocks = [];
let hoveredBlock = null;
let selectedBlock = null;
let hoverMessage = 'Hover over a file block to see its purpose. Click to highlight connections.';

// Quiz state
let quizMode = false;
let quizData = [];
let quizIndex = 0;
let quizSelected = -1;   // which choice the user clicked
let quizAnswered = false; // has user answered current question
let quizScore = 0;
let quizComplete = false;
let quizButton;

// Colors matching book theme
const COLORS = {
  mainHtml:     { r: 66,  g: 133, b: 244, label: 'blue' },
  indexMd:      { r: 52,  g: 168, b: 83,  label: 'green' },
  metadataJson: { r: 251, g: 140, b: 0,   label: 'orange' },
  dataJson:     { r: 142, g: 68,  b: 173, label: 'purple' },
  browser:      { r: 200, g: 210, b: 220, label: 'gray' }
};

// Detailed descriptions for each file
const DESCRIPTIONS = {
  mainHtml: 'main.html — The interactive experience. Contains the HTML5 shell with p5.js CDN link, a <main> element, and imports the JavaScript file. This is the file embedded via iframe.',
  indexMd: 'index.md — The documentation page. Contains YAML frontmatter, an iframe embed of main.html, a fullscreen link, lesson plan, and educational context for the textbook.',
  metadataJson: 'metadata.json — Discoverability metadata. Dublin Core fields (title, creator, subject, date) plus educational metadata (Bloom level, concepts, prerequisites) for search engines.',
  dataJson: 'data.json — Configuration data. Overlay regions, labels, coordinates, and settings loaded at runtime by main.html. Separates content from code for easy editing.'
};

// Quiz choice hit areas (populated during draw)
let choiceAreas = [];

function setup() {
  updateCanvasSize();
  const canvas = createCanvas(containerWidth, containerHeight);
  var mainElement = document.querySelector('main');
  canvas.parent(mainElement);
  textFont('Arial');

  // Quiz Mode button
  quizButton = createButton('Quiz Mode');
  quizButton.position(10, drawHeight + 8);
  quizButton.mousePressed(toggleQuizMode);

  // Load quiz data from overlay.json
  fetch('overlay.json')
    .then(r => r.json())
    .then(data => {
      if (data.quiz && data.quiz.length > 0) {
        quizData = data.quiz;
      }
    })
    .catch(() => {
      // Quiz data unavailable — button will show message
    });

  describe('Interactive diagram showing the four files in a MicroSim directory with quiz mode', LABEL);
}

function toggleQuizMode() {
  if (quizData.length === 0) return;
  quizMode = !quizMode;
  if (quizMode) {
    quizButton.html('Diagram');
    quizIndex = 0;
    quizSelected = -1;
    quizAnswered = false;
    quizScore = 0;
    quizComplete = false;
  } else {
    quizButton.html('Quiz Mode');
  }
}

function draw() {
  updateCanvasSize();

  // Drawing region background
  fill('aliceblue');
  stroke('silver');
  strokeWeight(1);
  rect(0, 0, canvasWidth, drawHeight);

  // Control region background
  fill('white');
  rect(0, drawHeight, canvasWidth, controlHeight);

  if (quizMode) {
    drawQuiz();
  } else {
    drawDiagram();
  }

  // Send height to parent for iframe auto-resize
  window.parent.postMessage({ type: 'microsim-resize', height: canvasHeight }, '*');
}

// ============================================================
// DIAGRAM MODE
// ============================================================

function drawDiagram() {
  // Calculate responsive layout
  let leftColWidth = canvasWidth * 0.32;
  let rightColX = leftColWidth + 20;
  let rightColWidth = canvasWidth - rightColX - margin;
  let blockHeight = 52;
  let blockSpacing = 14;

  // --- Browser Mockup at Top ---
  let browserY = 15;
  let browserH = 70;
  let browserX = rightColX;
  let browserW = rightColWidth;

  fill(230, 235, 240);
  stroke(180);
  strokeWeight(1);
  rect(browserX, browserY, browserW, browserH, 6);

  fill(255, 95, 87);
  noStroke();
  circle(browserX + 15, browserY + 14, 10);
  fill(255, 189, 46);
  circle(browserX + 30, browserY + 14, 10);
  fill(39, 201, 63);
  circle(browserX + 45, browserY + 14, 10);

  fill(255);
  stroke(200);
  rect(browserX + 60, browserY + 6, browserW - 75, 18, 4);
  fill(100);
  noStroke();
  textSize(10);
  textAlign(LEFT, CENTER);
  text('localhost:8000/sims/my-infographic/', browserX + 65, browserY + 15);

  fill(240, 248, 255);
  noStroke();
  rect(browserX + 4, browserY + 28, browserW - 8, browserH - 32, 0, 0, 4, 4);
  fill(66, 133, 244, 80);
  rect(browserX + 14, browserY + 34, browserW - 28, browserH - 44, 3);
  fill(66, 133, 244);
  textSize(11);
  textAlign(CENTER, CENTER);
  text('Rendered MicroSim (from main.html)', browserX + browserW / 2, browserY + 52);

  // --- Directory Tree on Left ---
  let treeX = margin;
  let treeY = browserY + browserH + 30;

  fill(40);
  noStroke();
  textSize(14);
  textAlign(LEFT, TOP);
  text('docs/sims/my-infographic/', treeX, treeY);

  let fileNames = ['main.html', 'index.md', 'metadata.json', 'data.json'];
  let fileColorKeys = ['mainHtml', 'indexMd', 'metadataJson', 'dataJson'];

  textSize(13);
  for (let i = 0; i < fileNames.length; i++) {
    let fy = treeY + 24 + i * 22;

    stroke(150);
    strokeWeight(1);
    line(treeX + 8, fy + 2, treeX + 8, fy + 10);
    line(treeX + 8, fy + 10, treeX + 20, fy + 10);

    let c = COLORS[fileColorKeys[i]];
    fill(c.r, c.g, c.b);
    noStroke();
    rect(treeX + 22, fy + 4, 12, 14, 2);
    fill(255);
    textSize(7);
    textAlign(CENTER, CENTER);
    rect(treeX + 24, fy + 6, 8, 2);
    rect(treeX + 24, fy + 10, 8, 2);
    rect(treeX + 24, fy + 14, 8, 2);

    fill(40);
    noStroke();
    textSize(13);
    textAlign(LEFT, CENTER);
    text(fileNames[i], treeX + 40, fy + 10);
  }

  stroke(150);
  strokeWeight(1);
  let firstFy = treeY + 24 + 2;
  let lastFy = treeY + 24 + 3 * 22 + 2;
  line(treeX + 8, firstFy, treeX + 8, lastFy + 10);

  // --- File Blocks on Right ---
  let blocksStartY = browserY + browserH + 20;

  fileBlocks = [];
  let blockDefs = [
    { key: 'mainHtml',     label: 'main.html',     subtitle: 'Interactive Experience: HTML + JavaScript', color: COLORS.mainHtml },
    { key: 'indexMd',      label: 'index.md',       subtitle: 'Documentation: Textbook Page with Iframe Embed', color: COLORS.indexMd },
    { key: 'metadataJson', label: 'metadata.json',  subtitle: 'Discoverability: Dublin Core Metadata', color: COLORS.metadataJson },
    { key: 'dataJson',     label: 'data.json',      subtitle: 'Configuration: Overlay Regions, Labels, Settings', color: COLORS.dataJson }
  ];

  for (let i = 0; i < blockDefs.length; i++) {
    let bx = rightColX;
    let by = blocksStartY + i * (blockHeight + blockSpacing);
    let bw = rightColWidth;
    let bh = blockHeight;
    let def = blockDefs[i];

    fileBlocks.push({
      x: bx, y: by, w: bw, h: bh,
      key: def.key, label: def.label, subtitle: def.subtitle, color: def.color
    });

    let isHovered = hoveredBlock === def.key;
    let isSelected = selectedBlock === def.key;

    if (isHovered || isSelected) {
      fill(0, 0, 0, 30);
      noStroke();
      rect(bx + 3, by + 3, bw, bh, 8);
    }

    let c = def.color;
    if (isHovered || isSelected) {
      fill(c.r, c.g, c.b, 240);
    } else {
      fill(c.r, c.g, c.b, 180);
    }
    stroke(c.r, c.g, c.b);
    strokeWeight(isSelected ? 3 : 1.5);
    rect(bx, by, bw, bh, 8);

    fill(255);
    noStroke();
    textAlign(LEFT, CENTER);
    textSize(15);
    text(def.label, bx + 12, by + 18);
    textSize(11);
    fill(255, 255, 255, 200);
    text(def.subtitle, bx + 12, by + 37);
  }

  // --- Arrows ---
  drawArrows(blocksStartY, blockHeight, blockSpacing, rightColX, rightColWidth, browserY, browserH);

  // --- Title ---
  fill(30);
  noStroke();
  textAlign(CENTER, TOP);
  textSize(Math.min(24, canvasWidth * 0.045));
  text('MicroSim Four-File Architecture', canvasWidth / 2, drawHeight - 45);

  textSize(12);
  fill(100);
  text('Each MicroSim directory contains four files with distinct roles', canvasWidth / 2, drawHeight - 22);

  // --- Control region: hover/click info ---
  fill(60);
  noStroke();
  textAlign(LEFT, CENTER);
  textSize(12);
  let msg = hoverMessage;
  if (hoveredBlock) {
    msg = DESCRIPTIONS[hoveredBlock];
  } else if (selectedBlock) {
    msg = DESCRIPTIONS[selectedBlock];
  }
  let maxChars = Math.floor((canvasWidth - 100) / 6.5);
  if (msg.length > maxChars) {
    msg = msg.substring(0, maxChars - 3) + '...';
  }
  text(msg, 90, drawHeight + controlHeight / 2);
}

function drawArrows(blocksStartY, blockHeight, blockSpacing, rightColX, rightColWidth, browserY, browserH) {
  let mainBlock = fileBlocks[0];
  let indexBlock = fileBlocks[1];
  let dataBlock = fileBlocks[3];

  let showIndexArrow = !selectedBlock || selectedBlock === 'indexMd' || selectedBlock === 'mainHtml';
  if (showIndexArrow) {
    let alpha = (selectedBlock === 'indexMd' || selectedBlock === 'mainHtml') ? 255 : 150;
    let sw = (selectedBlock === 'indexMd' || selectedBlock === 'mainHtml') ? 2.5 : 1.5;

    stroke(52, 168, 83, alpha);
    strokeWeight(sw);
    noFill();

    let startX = indexBlock.x;
    let startY = indexBlock.y + indexBlock.h / 2;
    let endX = mainBlock.x;
    let endY = mainBlock.y + mainBlock.h / 2;
    let cpx = startX - 30;

    beginShape();
    vertex(startX, startY);
    bezierVertex(cpx, startY, cpx, endY, endX, endY);
    endShape();

    drawArrowhead(endX, endY, 0, COLORS.indexMd, alpha);

    fill(52, 168, 83, alpha);
    noStroke();
    textSize(10);
    textAlign(CENTER, CENTER);
    push();
    translate(cpx - 8, (startY + endY) / 2);
    rotate(-HALF_PI);
    text('embeds via iframe', 0, 0);
    pop();
  }

  let showDataArrow = !selectedBlock || selectedBlock === 'mainHtml' || selectedBlock === 'dataJson';
  if (showDataArrow) {
    let alpha = (selectedBlock === 'mainHtml' || selectedBlock === 'dataJson') ? 255 : 150;
    let sw = (selectedBlock === 'mainHtml' || selectedBlock === 'dataJson') ? 2.5 : 1.5;

    stroke(142, 68, 173, alpha);
    strokeWeight(sw);
    noFill();

    let startX = mainBlock.x + mainBlock.w;
    let startY = mainBlock.y + mainBlock.h / 2;
    let endX = dataBlock.x + dataBlock.w;
    let endY = dataBlock.y + dataBlock.h / 2;
    let cpx = startX + 30;

    beginShape();
    vertex(startX, startY);
    bezierVertex(cpx, startY, cpx, endY, endX, endY);
    endShape();

    drawArrowhead(endX, endY, PI, COLORS.dataJson, alpha);

    fill(142, 68, 173, alpha);
    noStroke();
    textSize(10);
    textAlign(CENTER, CENTER);
    push();
    translate(cpx + 8, (startY + endY) / 2);
    rotate(HALF_PI);
    text('loads at runtime', 0, 0);
    pop();
  }

  let showBrowserArrow = !selectedBlock || selectedBlock === 'mainHtml';
  if (showBrowserArrow) {
    let alpha = (selectedBlock === 'mainHtml') ? 255 : 150;
    let sw = (selectedBlock === 'mainHtml') ? 2.5 : 1.5;

    stroke(66, 133, 244, alpha);
    strokeWeight(sw);

    let startX = mainBlock.x + mainBlock.w / 2;
    let startY = mainBlock.y;
    let endX = rightColX + rightColWidth / 2;
    let endY = browserY + browserH;

    line(startX, startY, endX, endY);
    drawArrowhead(endX, endY, -HALF_PI, COLORS.mainHtml, alpha);

    fill(66, 133, 244, alpha);
    noStroke();
    textSize(10);
    textAlign(LEFT, CENTER);
    text('renders in browser', startX + 5, (startY + endY) / 2);
  }
}

function drawArrowhead(tipX, tipY, angle, colorObj, alpha) {
  push();
  translate(tipX, tipY);
  rotate(angle);
  fill(colorObj.r, colorObj.g, colorObj.b, alpha);
  noStroke();
  triangle(0, 0, -10, -5, -10, 5);
  pop();
}

// ============================================================
// QUIZ MODE
// ============================================================

function drawQuiz() {
  choiceAreas = [];

  if (quizData.length === 0) {
    fill(100);
    noStroke();
    textAlign(CENTER, CENTER);
    textSize(18);
    text('Quiz data not available.', canvasWidth / 2, drawHeight / 2);
    return;
  }

  let px = margin + 20; // left padding for quiz content
  let maxW = canvasWidth - 2 * px;

  if (quizComplete) {
    drawQuizResults(px, maxW);
    return;
  }

  let q = quizData[quizIndex];

  // Header
  fill(30);
  noStroke();
  textAlign(LEFT, TOP);
  textSize(14);
  fill(100);
  text('Question ' + (quizIndex + 1) + ' of ' + quizData.length, px, 25);

  // Progress bar
  let barY = 48;
  let barW = maxW;
  let barH = 6;
  fill(220);
  noStroke();
  rect(px, barY, barW, barH, 3);
  fill(66, 133, 244);
  rect(px, barY, barW * ((quizIndex + 1) / quizData.length), barH, 3);

  // Question text with word wrap
  fill(30);
  textSize(18);
  textAlign(LEFT, TOP);
  let questionY = 70;
  drawWrappedText(q.question, px, questionY, maxW, 22);

  // Calculate where question text ends (approximate)
  let questionLines = Math.ceil(textWidth(q.question) / maxW);
  let choicesStartY = questionY + questionLines * 24 + 20;

  // Choice buttons
  let choiceH = 44;
  let choiceGap = 10;
  let choiceLetters = ['A', 'B', 'C', 'D'];

  for (let i = 0; i < q.choices.length; i++) {
    let cy = choicesStartY + i * (choiceH + choiceGap);
    let cx = px;
    let cw = maxW;

    choiceAreas.push({ x: cx, y: cy, w: cw, h: choiceH, index: i });

    // Determine choice state
    let isCorrect = i === q.correct;
    let isChosen = quizSelected === i;
    let isHover = !quizAnswered && isMouseInRect(cx, cy, cw, choiceH);

    // Background
    if (quizAnswered) {
      if (isCorrect) {
        fill(52, 168, 83, 40);
        stroke(52, 168, 83);
        strokeWeight(2);
      } else if (isChosen && !isCorrect) {
        fill(234, 67, 53, 40);
        stroke(234, 67, 53);
        strokeWeight(2);
      } else {
        fill(245);
        stroke(200);
        strokeWeight(1);
      }
    } else if (isHover) {
      fill(66, 133, 244, 25);
      stroke(66, 133, 244);
      strokeWeight(1.5);
    } else {
      fill(250);
      stroke(200);
      strokeWeight(1);
    }
    rect(cx, cy, cw, choiceH, 8);

    // Letter badge
    let badgeX = cx + 20;
    let badgeY = cy + choiceH / 2;
    if (quizAnswered && isCorrect) {
      fill(52, 168, 83);
    } else if (quizAnswered && isChosen && !isCorrect) {
      fill(234, 67, 53);
    } else {
      fill(66, 133, 244);
    }
    noStroke();
    circle(badgeX, badgeY, 28);
    fill(255);
    textAlign(CENTER, CENTER);
    textSize(14);
    text(choiceLetters[i], badgeX, badgeY);

    // Choice text
    fill(40);
    noStroke();
    textAlign(LEFT, CENTER);
    textSize(15);
    text(q.choices[i], cx + 42, cy + choiceH / 2);
  }

  // Explanation after answering
  if (quizAnswered) {
    let explanationY = choicesStartY + q.choices.length * (choiceH + choiceGap) + 10;

    // Explanation box
    let isCorrectAnswer = quizSelected === q.correct;
    if (isCorrectAnswer) {
      fill(52, 168, 83, 20);
      stroke(52, 168, 83);
    } else {
      fill(251, 140, 0, 20);
      stroke(251, 140, 0);
    }
    strokeWeight(1);
    rect(px, explanationY, maxW, 70, 8);

    fill(40);
    noStroke();
    textAlign(LEFT, TOP);
    textSize(13);
    let statusText = isCorrectAnswer ? 'Correct!' : 'Not quite.';
    fill(isCorrectAnswer ? color(52, 168, 83) : color(234, 67, 53));
    textSize(15);
    text(statusText, px + 12, explanationY + 10);

    fill(60);
    textSize(12);
    drawWrappedText(q.explanation, px + 12, explanationY + 30, maxW - 24, 16);

    // Next button prompt in control area
    fill(60);
    noStroke();
    textAlign(LEFT, CENTER);
    textSize(13);
    if (quizIndex < quizData.length - 1) {
      text('Click anywhere to continue to the next question.', 90, drawHeight + controlHeight / 2);
    } else {
      text('Click anywhere to see your results.', 90, drawHeight + controlHeight / 2);
    }
  } else {
    // Prompt
    fill(100);
    noStroke();
    textAlign(LEFT, CENTER);
    textSize(13);
    text('Select the best answer.', 90, drawHeight + controlHeight / 2);
  }

  // Score display in top right
  fill(100);
  noStroke();
  textAlign(RIGHT, TOP);
  textSize(13);
  text('Score: ' + quizScore + '/' + quizData.length, canvasWidth - px, 25);
}

function drawQuizResults(px, maxW) {
  let centerX = canvasWidth / 2;

  // Title
  fill(30);
  noStroke();
  textAlign(CENTER, TOP);
  textSize(28);
  text('Quiz Complete!', centerX, 60);

  // Score circle
  let circleY = 170;
  let circleR = 70;
  let pct = quizScore / quizData.length;

  // Background circle
  stroke(220);
  strokeWeight(8);
  noFill();
  circle(centerX, circleY, circleR * 2);

  // Score arc
  if (pct >= 0.8) {
    stroke(52, 168, 83);
  } else if (pct >= 0.6) {
    stroke(251, 140, 0);
  } else {
    stroke(234, 67, 53);
  }
  strokeWeight(8);
  noFill();
  arc(centerX, circleY, circleR * 2, circleR * 2, -HALF_PI, -HALF_PI + TWO_PI * pct);

  // Score text inside circle
  fill(30);
  noStroke();
  textAlign(CENTER, CENTER);
  textSize(32);
  text(quizScore + '/' + quizData.length, centerX, circleY - 5);
  textSize(14);
  fill(100);
  text(Math.round(pct * 100) + '%', centerX, circleY + 22);

  // Message
  let message;
  if (pct === 1) {
    message = 'Perfect score! You have a solid understanding of the MicroSim architecture.';
  } else if (pct >= 0.8) {
    message = 'Great job! You understand the key concepts well.';
  } else if (pct >= 0.6) {
    message = 'Good effort! Review the diagram to strengthen your understanding.';
  } else {
    message = 'Keep learning! Hover over the file blocks in diagram mode to review each role.';
  }
  fill(60);
  textSize(15);
  textAlign(CENTER, TOP);
  drawWrappedText(message, px, 260, maxW, 20);

  // Prompt
  fill(100);
  noStroke();
  textAlign(LEFT, CENTER);
  textSize(13);
  text('Click "Diagram" to return to the architecture view and review.', 90, drawHeight + controlHeight / 2);
}

function drawWrappedText(txt, x, y, maxW, lineH) {
  let words = txt.split(' ');
  let currentLine = '';
  let cy = y;
  for (let w of words) {
    let testLine = currentLine ? currentLine + ' ' + w : w;
    if (textWidth(testLine) > maxW && currentLine) {
      text(currentLine, x, cy);
      currentLine = w;
      cy += lineH;
    } else {
      currentLine = testLine;
    }
  }
  if (currentLine) {
    text(currentLine, x, cy);
  }
}

function isMouseInRect(rx, ry, rw, rh) {
  return mouseX >= rx && mouseX <= rx + rw && mouseY >= ry && mouseY <= ry + rh;
}

// ============================================================
// INPUT HANDLERS
// ============================================================

function mouseMoved() {
  if (quizMode) {
    // Check if hovering over a choice
    for (let ca of choiceAreas) {
      if (isMouseInRect(ca.x, ca.y, ca.w, ca.h) && !quizAnswered) {
        cursor(HAND);
        return;
      }
    }
    cursor(ARROW);
    return;
  }

  hoveredBlock = null;
  for (let b of fileBlocks) {
    if (mouseX >= b.x && mouseX <= b.x + b.w && mouseY >= b.y && mouseY <= b.y + b.h) {
      hoveredBlock = b.key;
      cursor(HAND);
      return;
    }
  }
  cursor(ARROW);
}

function mousePressed() {
  if (quizMode) {
    handleQuizClick();
    return;
  }

  for (let b of fileBlocks) {
    if (mouseX >= b.x && mouseX <= b.x + b.w && mouseY >= b.y && mouseY <= b.y + b.h) {
      if (selectedBlock === b.key) {
        selectedBlock = null;
      } else {
        selectedBlock = b.key;
      }
      return;
    }
  }
  selectedBlock = null;
}

function handleQuizClick() {
  if (quizComplete) return;

  if (quizAnswered) {
    // Advance to next question
    quizIndex++;
    quizSelected = -1;
    quizAnswered = false;
    if (quizIndex >= quizData.length) {
      quizComplete = true;
    }
    return;
  }

  // Check if a choice was clicked
  for (let ca of choiceAreas) {
    if (isMouseInRect(ca.x, ca.y, ca.w, ca.h)) {
      quizSelected = ca.index;
      quizAnswered = true;
      if (quizSelected === quizData[quizIndex].correct) {
        quizScore++;
      }
      return;
    }
  }
}

function windowResized() {
  updateCanvasSize();
  resizeCanvas(containerWidth, containerHeight);
  quizButton.position(10, drawHeight + 8);
  redraw();
}

function updateCanvasSize() {
  const container = document.querySelector('main').getBoundingClientRect();
  containerWidth = Math.max(Math.floor(container.width), 600);
  canvasWidth = containerWidth;
}
