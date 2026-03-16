// MicroSim Directory Structure Explorer
// Interactive file tree showing required MicroSim files
// Bloom Level: Remember (L1) — identify files and recall purpose

let containerWidth;
let canvasWidth = 400;
let drawHeight = 400;
let controlHeight = 50;
let canvasHeight = drawHeight + controlHeight;
let containerHeight = canvasHeight;
let margin = 15;

const files = [
  { name: "📁 cell-biology/", indent: 0, type: "folder", color: "#795548",
    purpose: "Root folder for this MicroSim", required: true,
    example: "Named using kebab-case\nmatching the sim-id" },
  { name: "📄 main.html", indent: 1, type: "html", color: "#FF9800",
    purpose: "HTML shell that loads the JavaScript and CSS. Must be named main.html (never index.html).",
    required: true,
    example: '<!DOCTYPE html>\n<html lang="en">\n<head>...<script src="sketch.js">' },
  { name: "📄 index.md", indent: 1, type: "md", color: "#2196F3",
    purpose: "MkDocs documentation page with iframe embed, lesson plan, and fullscreen link.",
    required: true,
    example: '---\ntitle: Cell Biology\n---\n<iframe src="main.html"...' },
  { name: "📄 metadata.json", indent: 1, type: "json", color: "#4CAF50",
    purpose: "Dublin Core metadata for discoverability: title, creator, subject, description.",
    required: true,
    example: '{\n  "dc.title": "Cell Biology",\n  "dc.creator": "...",\n  "dc.subject": "Biology"' },
  { name: "📄 sketch.js", indent: 1, type: "js", color: "#FFC107",
    purpose: "Main JavaScript file containing the p5.js visualization code.",
    required: true,
    example: 'function setup() {\n  createCanvas(w, h);\n}\nfunction draw() { ... }' },
  { name: "📄 style.css", indent: 1, type: "css", color: "#9C27B0",
    purpose: "Optional CSS for custom styling beyond the default layout.",
    required: false,
    example: 'body {\n  margin: 0;\n  background: aliceblue;\n}' },
  { name: "📄 data.json", indent: 1, type: "json", color: "#4CAF50",
    purpose: "Optional data file for region definitions, quiz questions, or chart data.",
    required: false,
    example: '{\n  "regions": [\n    {"x":10,"y":20,"w":100}\n  ]\n}' },
  { name: "📁 img/", indent: 1, type: "folder", color: "#795548",
    purpose: "Optional folder for background images used by the MicroSim.",
    required: false, example: "Contains PNG/JPG images\nfor overlay backgrounds" },
  { name: "🖼️ diagram.png", indent: 2, type: "image", color: "#F44336",
    purpose: "Background image for overlay-type infographics.",
    required: false, example: "1024x768 PNG image\nof the diagram to annotate" },
  { name: "🖼️ preview.png", indent: 2, type: "image", color: "#F44336",
    purpose: "Screenshot preview for the MicroSim index page.",
    required: false, example: "800px wide screenshot\ncaptured by bk-capture-screenshot" }
];

let selectedFile = -1;
let hoveredFile = -1;
let showSizes = false;
let quizMode = false;
let quizQuestion = -1;
let quizOptions = [];
let quizFeedback = '';
let quizScore = 0;
let quizTotal = 0;
let quizAnswered = false;

let quizButton, showSizesButton;

function setup() {
  updateCanvasSize();
  const canvas = createCanvas(containerWidth, containerHeight);
  canvas.parent(document.querySelector('main'));

  quizButton = createButton('Quiz Mode');
  quizButton.position(10, drawHeight + 12);
  quizButton.mousePressed(toggleQuiz);

  showSizesButton = createButton('Show Sizes: OFF');
  showSizesButton.position(110, drawHeight + 12);
  showSizesButton.mousePressed(() => {
    showSizes = !showSizes;
    showSizesButton.html('Show Sizes: ' + (showSizes ? 'ON' : 'OFF'));
  });
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
  text('MicroSim Directory Structure', canvasWidth / 2, 6);

  let treeX = margin;
  let treeW = canvasWidth * 0.45;
  let panelX = canvasWidth * 0.5;
  let panelW = canvasWidth * 0.48;
  let rowH = 32;
  let startY = 35;

  // Draw file tree
  hoveredFile = -1;
  for (let i = 0; i < files.length; i++) {
    let f = files[i];
    let fy = startY + i * rowH;
    let fx = treeX + f.indent * 24;

    // Hit detection
    if (mouseX >= treeX && mouseX <= treeX + treeW && mouseY >= fy && mouseY <= fy + rowH) {
      hoveredFile = i;
    }

    let isHover = (i === hoveredFile);
    let isSelected = (i === selectedFile);

    // Row background
    if (isSelected) {
      fill('#BBDEFB');
      noStroke();
      rect(treeX, fy, treeW, rowH, 4);
    } else if (isHover) {
      fill('#E3F2FD');
      noStroke();
      rect(treeX, fy, treeW, rowH, 4);
    }

    // File icon and name
    fill(f.color);
    noStroke();
    textAlign(LEFT, CENTER);
    textSize(14);
    text(f.name, fx, fy + rowH / 2);

    // Required badge
    if (f.required && f.type !== 'folder') {
      fill('#E53935');
      textSize(9);
      textAlign(RIGHT, CENTER);
      text('REQ', treeX + treeW - 5, fy + rowH / 2);
    } else if (!f.required && f.type !== 'folder') {
      fill('#9E9E9E');
      textSize(9);
      textAlign(RIGHT, CENTER);
      text('OPT', treeX + treeW - 5, fy + rowH / 2);
    }

    // File sizes
    if (showSizes && f.type !== 'folder') {
      fill(150);
      textSize(10);
      textAlign(RIGHT, CENTER);
      let sizes = { html: '2 KB', md: '3 KB', json: '1 KB', js: '8 KB', css: '1 KB', image: '50 KB' };
      text(sizes[f.type] || '', treeX + treeW - 30, fy + rowH / 2);
    }
  }

  // Right panel — file details or quiz
  if (quizMode) {
    drawQuizPanel(panelX, panelW, startY);
  } else {
    drawInfoPanel(panelX, panelW, startY);
  }

  // Control area
  fill(100);
  noStroke();
  textAlign(LEFT, CENTER);
  textSize(12);
  if (quizMode) {
    text('Score: ' + quizScore + '/' + quizTotal, 260, drawHeight + 25);
  }
}

function drawInfoPanel(px, pw, sy) {
  if (selectedFile >= 0) {
    let f = files[selectedFile];

    fill(f.color);
    noStroke();
    textAlign(LEFT, TOP);
    textSize(16);
    text(f.name, px, sy);

    fill(f.required ? '#E53935' : '#9E9E9E');
    textSize(11);
    text(f.required ? '● Required' : '○ Optional', px, sy + 22);

    fill('black');
    textSize(14);
    textWrap(WORD);
    text(f.purpose, px, sy + 42, pw);

    // Example code
    let codeY = sy + 110;
    fill(40);
    noStroke();
    rect(px, codeY, pw, 120, 4);
    fill('#00FF88');
    textSize(12);
    textFont('monospace');
    textAlign(LEFT, TOP);
    text(f.example, px + 8, codeY + 8, pw - 16);
    textFont('Arial');
  } else {
    fill(120);
    noStroke();
    textAlign(CENTER, CENTER);
    textSize(14);
    text('Click a file to see\nits purpose and\nexample contents', px + pw / 2, sy + 150);
  }
}

function drawQuizPanel(px, pw, sy) {
  if (quizQuestion < 0) {
    nextQuizQuestion();
    return;
  }

  let f = files[quizQuestion];

  fill('#1565C0');
  noStroke();
  textAlign(LEFT, TOP);
  textSize(15);
  textWrap(WORD);
  text('What is the purpose of:', px, sy, pw);

  fill(f.color);
  textSize(18);
  text(f.name, px, sy + 25);

  // Options
  for (let i = 0; i < quizOptions.length; i++) {
    let oy = sy + 65 + i * 55;
    let isHover = mouseX >= px && mouseX <= px + pw && mouseY >= oy && mouseY <= oy + 48;

    if (quizAnswered) {
      if (quizOptions[i].correct) {
        fill('#C8E6C9');
        stroke('#4CAF50');
      } else if (quizOptions[i].selected) {
        fill('#FFCDD2');
        stroke('#F44336');
      } else {
        fill('#F5F5F5');
        stroke('#E0E0E0');
      }
    } else if (isHover) {
      fill('#E3F2FD');
      stroke('#2196F3');
    } else {
      fill('white');
      stroke('#BDBDBD');
    }
    strokeWeight(1);
    rect(px, oy, pw, 48, 6);

    fill('black');
    noStroke();
    textSize(12);
    textAlign(LEFT, TOP);
    textWrap(WORD);
    text(quizOptions[i].text, px + 8, oy + 6, pw - 16);
  }

  // Feedback
  if (quizFeedback) {
    fill(quizFeedback.startsWith('✓') ? '#2E7D32' : '#C62828');
    textSize(14);
    textAlign(CENTER, CENTER);
    text(quizFeedback, px + pw / 2, sy + 300);
  }
}

function nextQuizQuestion() {
  // Pick a random required file (not folder)
  let candidates = files.filter((f, i) => f.type !== 'folder').map((f, i) =>
    files.indexOf(f));
  quizQuestion = candidates[Math.floor(Math.random() * candidates.length)];

  let correct = files[quizQuestion];
  let others = files.filter((f, i) => i !== quizQuestion && f.type !== 'folder');
  let shuffled = others.sort(() => Math.random() - 0.5).slice(0, 3);

  quizOptions = [
    { text: correct.purpose, correct: true, selected: false },
    ...shuffled.map(f => ({ text: f.purpose, correct: false, selected: false }))
  ].sort(() => Math.random() - 0.5);

  quizFeedback = '';
  quizAnswered = false;
}

function toggleQuiz() {
  quizMode = !quizMode;
  quizButton.html(quizMode ? 'Browse Mode' : 'Quiz Mode');
  if (quizMode) {
    quizScore = 0;
    quizTotal = 0;
    quizQuestion = -1;
  }
}

function mousePressed() {
  if (quizMode && quizQuestion >= 0 && !quizAnswered) {
    let px = canvasWidth * 0.5;
    let pw = canvasWidth * 0.48;
    let sy = 35;
    for (let i = 0; i < quizOptions.length; i++) {
      let oy = sy + 65 + i * 55;
      if (mouseX >= px && mouseX <= px + pw && mouseY >= oy && mouseY <= oy + 48) {
        quizOptions[i].selected = true;
        quizAnswered = true;
        quizTotal++;
        if (quizOptions[i].correct) {
          quizScore++;
          quizFeedback = '✓ Correct!';
        } else {
          quizFeedback = '✗ Incorrect';
        }
        setTimeout(nextQuizQuestion, 2000);
        break;
      }
    }
  } else if (!quizMode && hoveredFile >= 0) {
    selectedFile = hoveredFile;
  }
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
