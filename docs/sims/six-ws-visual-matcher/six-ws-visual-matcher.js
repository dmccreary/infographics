// Six W's Visual Matcher MicroSim
// Interactive reference card mapping W questions to visual types
// Bloom Level: Understand (L2) — explain question-to-visual mapping

let containerWidth;
let canvasWidth = 400;
let drawHeight = 400;
let controlHeight = 50;
let canvasHeight = drawHeight + controlHeight;
let containerHeight = canvasHeight;
let margin = 15;

const wItems = [
  { question: "Who / What?", visual: "Portrait", color: "#2196F3", dots: 1,
    example: "A biology teacher wants to show students what a mitochondrion looks like → Portrait drawing with labeled parts." },
  { question: "How Much?", visual: "Chart", color: "#FF9800", dots: 2,
    example: "A math teacher compares student test scores across three classes → Bar chart with colored bars per class." },
  { question: "Where?", visual: "Map", color: "#4CAF50", dots: 3,
    example: "A geography class explores earthquake epicenters worldwide → Interactive map with magnitude markers." },
  { question: "When?", visual: "Timeline", color: "#9C27B0", dots: 4,
    example: "A history class studies the events leading to the American Revolution → Timeline with event cards." },
  { question: "How?", visual: "Flowchart", color: "#009688", dots: 5,
    example: "A CS teacher explains how a sorting algorithm decides which path to take → Interactive flowchart." },
  { question: "Why?", visual: "Multi-Variable Plot", color: "#F44336", dots: 6,
    example: "A science class investigates why some plants grow taller → Scatter plot of sunlight hours vs. height." }
];

let selectedW = -1;
let hoveredW = -1;

function setup() {
  updateCanvasSize();
  const canvas = createCanvas(containerWidth, containerHeight);
  canvas.parent(document.querySelector('main'));
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
  text("Six W's Visual Matcher", canvasWidth / 2, 6);

  let rowH = 48;
  let listW = canvasWidth * 0.38;
  let panelX = canvasWidth * 0.42;
  let panelW = canvasWidth * 0.55;
  let startY = 35;

  // Draw rows on the left
  hoveredW = -1;
  for (let i = 0; i < wItems.length; i++) {
    let ry = startY + i * rowH;
    let w = wItems[i];

    if (mouseX >= margin && mouseX <= margin + listW && mouseY >= ry && mouseY <= ry + rowH) {
      hoveredW = i;
    }

    let isHover = (i === hoveredW);
    let isSelected = (i === selectedW);

    // Row background
    if (isSelected) {
      fill(w.color + '30');
      noStroke();
      rect(margin, ry, listW, rowH, 6);
      // Left accent bar
      fill(w.color);
      rect(margin, ry, 4, rowH, 2, 0, 0, 2);
    } else if (isHover) {
      fill(w.color + '15');
      noStroke();
      rect(margin, ry, listW, rowH, 6);
    }

    // Question text
    fill(isSelected ? w.color : 'black');
    noStroke();
    textAlign(LEFT, CENTER);
    textSize(14);
    text(w.question, margin + 12, ry + rowH / 2 - 8);

    // Arrow
    fill(180);
    textSize(14);
    text('→', margin + listW * 0.55, ry + rowH / 2 - 8);

    // Visual type
    fill(w.color);
    textSize(13);
    text(w.visual, margin + listW * 0.65, ry + rowH / 2 - 8);

    // Complexity dots
    fill(200);
    for (let d = 0; d < 6; d++) {
      if (d < w.dots) fill(w.color);
      else fill(220);
      noStroke();
      circle(margin + 12 + d * 12, ry + rowH / 2 + 12, 8);
    }
  }

  // Right info panel
  if (selectedW >= 0) {
    let w = wItems[selectedW];

    // Mini icon
    fill(w.color);
    noStroke();
    textAlign(LEFT, TOP);
    textSize(20);
    text(w.question, panelX, startY);

    fill(w.color);
    textSize(16);
    text('→ ' + w.visual, panelX, startY + 28);

    // Complexity scale
    fill(100);
    textSize(12);
    text('Complexity:', panelX, startY + 58);
    for (let d = 0; d < 6; d++) {
      fill(d < w.dots ? w.color : '#E0E0E0');
      noStroke();
      circle(panelX + 80 + d * 16, startY + 64, 12);
    }

    // Example scenario
    fill('black');
    textSize(14);
    text('Real-world example:', panelX, startY + 90);

    fill(60);
    textSize(13);
    textWrap(WORD);
    text(w.example, panelX, startY + 112, panelW);

    // Simple miniature visual
    let miniY = startY + 200;
    let miniW = panelW * 0.8;
    let miniH = 120;
    fill('#F5F5F5');
    stroke('#E0E0E0');
    strokeWeight(1);
    rect(panelX, miniY, miniW, miniH, 6);

    push();
    let mcx = panelX + miniW / 2;
    let mcy = miniY + miniH / 2;
    if (selectedW === 0) drawMiniPortrait(mcx, mcy);
    else if (selectedW === 1) drawMiniChart(mcx, mcy);
    else if (selectedW === 2) drawMiniMap(mcx, mcy);
    else if (selectedW === 3) drawMiniTimeline(mcx, mcy);
    else if (selectedW === 4) drawMiniFlowchart(mcx, mcy);
    else if (selectedW === 5) drawMiniScatter(mcx, mcy);
    pop();

  } else {
    fill(120);
    noStroke();
    textAlign(CENTER, CENTER);
    textSize(14);
    text('Click a question type to\nsee its visual match and\na real-world example.', panelX + panelW / 2, startY + 150);
  }
}

// Mini diagram drawing functions
function drawMiniPortrait(cx, cy) {
  stroke('#2196F3'); strokeWeight(2); noFill();
  ellipse(cx, cy - 15, 30, 35);
  line(cx, cy + 3, cx, cy + 30);
  line(cx - 20, cy + 12, cx + 20, cy + 12);
  stroke('#90CAF9'); strokeWeight(1);
  line(cx + 18, cy - 15, cx + 40, cy - 20);
  line(cx + 18, cy + 12, cx + 40, cy + 15);
  fill('#2196F3'); noStroke(); textSize(8); textAlign(LEFT, CENTER);
  text('Part A', cx + 42, cy - 20);
  text('Part B', cx + 42, cy + 15);
}

function drawMiniChart(cx, cy) {
  let vals = [30, 45, 25, 38];
  let colors = ['#FF9800', '#FFC107', '#FFB74D', '#FFE082'];
  for (let i = 0; i < 4; i++) {
    fill(colors[i]); noStroke();
    rect(cx - 35 + i * 20, cy + 25 - vals[i], 16, vals[i], 2, 2, 0, 0);
  }
  stroke(150); strokeWeight(1);
  line(cx - 40, cy + 25, cx + 45, cy + 25);
}

function drawMiniMap(cx, cy) {
  noFill(); stroke('#4CAF50'); strokeWeight(2);
  beginShape();
  vertex(cx - 30, cy - 15); vertex(cx, cy - 25); vertex(cx + 30, cy - 10);
  vertex(cx + 25, cy + 20); vertex(cx - 10, cy + 25); vertex(cx - 35, cy + 10);
  endShape(CLOSE);
  fill('#F44336'); noStroke();
  circle(cx - 10, cy, 6); circle(cx + 15, cy + 8, 5); circle(cx + 5, cy - 10, 4);
}

function drawMiniTimeline(cx, cy) {
  stroke('#9C27B0'); strokeWeight(2);
  line(cx - 40, cy, cx + 40, cy);
  for (let i = 0; i < 4; i++) {
    let x = cx - 30 + i * 22;
    fill('#9C27B0'); noStroke();
    circle(x, cy, 8);
    stroke('#CE93D8'); strokeWeight(1);
    line(x, cy, x, cy + (i % 2 === 0 ? -18 : 18));
  }
  noStroke();
}

function drawMiniFlowchart(cx, cy) {
  fill('#009688'); noStroke();
  rect(cx - 35, cy - 25, 25, 15, 3);
  rect(cx + 10, cy - 25, 25, 15, 3);
  rect(cx - 12, cy + 10, 25, 15, 3);
  fill('#FFC107');
  push(); translate(cx - 12, cy - 2); rotate(PI / 4);
  rect(-6, -6, 12, 12); pop();
  stroke('#009688'); strokeWeight(1);
  line(cx - 10, cy - 17, cx + 10, cy - 17);
  line(cx - 12, cy + 4, cx - 4, cy + 10);
  noStroke();
}

function drawMiniScatter(cx, cy) {
  stroke(180); strokeWeight(1);
  line(cx - 35, cy + 25, cx + 35, cy + 25);
  line(cx - 35, cy - 25, cx - 35, cy + 25);
  let pts = [[-20,15],[-10,-5],[0,-8],[10,-18],[5,2],[15,-10],[-15,8]];
  let cls = ['#F44336','#F44336','#2196F3','#2196F3','#4CAF50','#4CAF50','#F44336'];
  for (let i = 0; i < pts.length; i++) {
    fill(cls[i]); noStroke();
    circle(cx + pts[i][0], cy + pts[i][1], 6);
  }
  stroke('#999'); strokeWeight(1);
  line(cx - 25, cy + 20, cx + 25, cy - 20);
  noStroke();
}

function mousePressed() {
  if (hoveredW >= 0) selectedW = hoveredW;
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
