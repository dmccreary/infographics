// Six Frameworks Interactive Gallery
// Compare 6 visual problem-solving frameworks
// Bloom Level: Understand (L2) — compare visual types

let containerWidth;
let canvasWidth = 400;
let drawHeight = 400;
let controlHeight = 50;
let canvasHeight = drawHeight + controlHeight;
let containerHeight = canvasHeight;
let margin = 15;

const frameworks = [
  { name: "Portrait", color: "#2196F3", question: "Who / What?",
    shows: "Visual representation of a subject with labeled parts",
    bestFor: ["Anatomy diagrams", "Product features", "Character profiles", "Object identification"],
    interactive: "Hover labeled parts to see definitions; click to zoom",
    example: "A biology teacher shows the parts of a cell with hover labels for each organelle." },
  { name: "Chart", color: "#FF9800", question: "How Much?",
    shows: "Quantitative data comparison using bars, lines, or areas",
    bestFor: ["Survey results", "Performance metrics", "Budget comparisons", "Trend analysis"],
    interactive: "Hover bars for values; toggle between chart types; filter data",
    example: "Compare programming language popularity with an interactive bar chart." },
  { name: "Map", color: "#4CAF50", question: "Where?",
    shows: "Geographic or spatial relationships between locations",
    bestFor: ["Office/campus layouts", "Store locations", "Migration patterns", "Regional data"],
    interactive: "Click markers for details; toggle map layers; zoom to regions",
    example: "Show university locations worldwide with enrollment as marker size." },
  { name: "Timeline", color: "#9C27B0", question: "When?",
    shows: "Events ordered chronologically along a time axis",
    bestFor: ["Historical events", "Project milestones", "Course schedules", "Evolution of ideas"],
    interactive: "Scroll through time; click events for detail; filter by category",
    example: "Display the history of computing from 1940 to present." },
  { name: "Flowchart", color: "#009688", question: "How?",
    shows: "Step-by-step process with decisions and branching paths",
    bestFor: ["Algorithms", "Decision procedures", "Troubleshooting", "Approval workflows"],
    interactive: "Click decision points to follow paths; highlight current step",
    example: "Guide a user through choosing the right JS visualization library." },
  { name: "Multi-Variable", color: "#F44336", question: "Why?",
    shows: "Relationships between multiple variables to reveal causes",
    bestFor: ["Correlation analysis", "Root cause diagrams", "Causal models", "Scatter analysis"],
    interactive: "Select axes; color by category; hover for correlations",
    example: "Plot study hours vs. test scores colored by student major." }
];

let selectedFW = -1;
let hoveredFW = -1;

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
  text('Six Visual Frameworks', canvasWidth / 2, 6);

  // 3x2 grid
  let cols = canvasWidth > 450 ? 3 : 2;
  let thumbW = (canvasWidth - margin * 2 - (cols - 1) * 10) / cols;
  let thumbH = 90;
  let startY = 32;

  hoveredFW = -1;
  for (let i = 0; i < frameworks.length; i++) {
    let col = i % cols;
    let row = Math.floor(i / cols);
    let tx = margin + col * (thumbW + 10);
    let ty = startY + row * (thumbH + 25);

    if (mouseX >= tx && mouseX <= tx + thumbW && mouseY >= ty && mouseY <= ty + thumbH)
      hoveredFW = i;

    let isHover = (i === hoveredFW);
    let isSelected = (i === selectedFW);

    fill(isSelected ? 'white' : (isHover ? '#FAFAFA' : '#F5F5F5'));
    stroke(isSelected || isHover ? frameworks[i].color : '#E0E0E0');
    strokeWeight(isSelected ? 3 : (isHover ? 2 : 1));
    if (isSelected) { drawingContext.shadowBlur = 6; drawingContext.shadowColor = frameworks[i].color; }
    rect(tx, ty, thumbW, thumbH, 6);
    drawingContext.shadowBlur = 0;

    // Draw miniature
    push();
    let cx = tx + thumbW / 2;
    let cy = ty + thumbH / 2 - 5;
    if (i === 0) drawPortrait(cx, cy, thumbW);
    else if (i === 1) drawChart(cx, cy, thumbW);
    else if (i === 2) drawMap(cx, cy, thumbW);
    else if (i === 3) drawTimelineMini(cx, cy, thumbW);
    else if (i === 4) drawFlowchart(cx, cy, thumbW);
    else if (i === 5) drawScatter(cx, cy, thumbW);
    pop();

    fill(frameworks[i].color);
    noStroke();
    textAlign(CENTER, TOP);
    textSize(12);
    text(frameworks[i].name, tx + thumbW / 2, ty + thumbH + 2);
    fill(100);
    textSize(10);
    text(frameworks[i].question, tx + thumbW / 2, ty + thumbH + 16);
  }

  // Detail panel
  let rows = Math.ceil(frameworks.length / cols);
  let detailY = startY + rows * (thumbH + 25) + 10;

  if (selectedFW >= 0) {
    let f = frameworks[selectedFW];
    fill(f.color);
    noStroke();
    textAlign(LEFT, TOP);
    textSize(16);
    text(f.name + ' — "' + f.question + '"', margin, detailY);

    fill('black');
    textSize(13);
    textWrap(WORD);
    text(f.shows, margin, detailY + 22, canvasWidth * 0.55);

    fill(80);
    textSize(12);
    text('Best for: ' + f.bestFor.join(', '), margin, detailY + 48, canvasWidth * 0.55);

    // Example on right side
    let exX = canvasWidth * 0.58;
    fill(f.color);
    textSize(12);
    text('Example:', exX, detailY);
    fill(60);
    textSize(11);
    text(f.example, exX, detailY + 18, canvasWidth - exX - margin);
  } else {
    fill(120);
    noStroke();
    textAlign(CENTER, CENTER);
    textSize(14);
    text('Click a framework to explore it.', canvasWidth / 2, detailY + 20);
  }
}

function drawPortrait(cx, cy, w) {
  let s = w / 160;
  // Simple head + body outline with callout lines
  stroke('#2196F3');
  strokeWeight(1.5 * s);
  noFill();
  circle(cx, cy - 12 * s, 20 * s);
  line(cx, cy - 2 * s, cx, cy + 18 * s);
  line(cx - 15 * s, cy + 5 * s, cx + 15 * s, cy + 5 * s);
  // Callout lines
  stroke('#90CAF9');
  strokeWeight(1);
  line(cx + 12 * s, cy - 12 * s, cx + 30 * s, cy - 15 * s);
  line(cx + 12 * s, cy + 5 * s, cx + 30 * s, cy + 8 * s);
  noStroke();
}

function drawChart(cx, cy, w) {
  let s = w / 160;
  let bw = 12 * s;
  let vals = [0.6, 0.9, 0.5, 0.75];
  let colors = ['#FF9800', '#FFC107', '#FFB74D', '#FFE082'];
  for (let i = 0; i < 4; i++) {
    let bh = vals[i] * 50 * s;
    fill(colors[i]);
    noStroke();
    rect(cx - 30 * s + i * (bw + 4 * s), cy + 20 * s - bh, bw, bh, 2 * s, 2 * s, 0, 0);
  }
  stroke(150);
  strokeWeight(1);
  line(cx - 35 * s, cy + 20 * s, cx + 35 * s, cy + 20 * s);
}

function drawMap(cx, cy, w) {
  let s = w / 160;
  // Simple region outline
  noFill();
  stroke('#4CAF50');
  strokeWeight(1.5 * s);
  beginShape();
  vertex(cx - 25 * s, cy - 15 * s); vertex(cx - 10 * s, cy - 20 * s);
  vertex(cx + 15 * s, cy - 10 * s); vertex(cx + 25 * s, cy + 5 * s);
  vertex(cx + 10 * s, cy + 20 * s); vertex(cx - 20 * s, cy + 15 * s);
  endShape(CLOSE);
  // Location dots
  fill('#F44336');
  noStroke();
  circle(cx - 5 * s, cy - 5 * s, 5 * s);
  circle(cx + 10 * s, cy + 5 * s, 4 * s);
  circle(cx - 12 * s, cy + 8 * s, 3 * s);
}

function drawTimelineMini(cx, cy, w) {
  let s = w / 160;
  stroke('#9C27B0');
  strokeWeight(2 * s);
  line(cx - 30 * s, cy, cx + 30 * s, cy);
  for (let i = 0; i < 4; i++) {
    let x = cx - 25 * s + i * 18 * s;
    fill('#9C27B0');
    noStroke();
    circle(x, cy, 6 * s);
    stroke('#CE93D8');
    strokeWeight(1);
    let up = i % 2 === 0;
    line(x, cy, x, cy + (up ? -12 : 12) * s);
  }
  noStroke();
}

function drawFlowchart(cx, cy, w) {
  let s = w / 160;
  fill('#009688');
  noStroke();
  rect(cx - 25 * s, cy - 20 * s, 18 * s, 12 * s, 2 * s);
  rect(cx + 8 * s, cy - 20 * s, 18 * s, 12 * s, 2 * s);
  rect(cx - 8 * s, cy + 8 * s, 18 * s, 12 * s, 2 * s);
  // Diamond
  fill('#FFC107');
  push();
  translate(cx - 8 * s, cy - 3 * s);
  rotate(PI / 4);
  rect(-5 * s, -5 * s, 10 * s, 10 * s);
  pop();
  // Arrows
  stroke('#009688');
  strokeWeight(1);
  line(cx - 7 * s, cy - 14 * s, cx + 8 * s, cy - 14 * s);
  line(cx - 8 * s, cy + 3 * s, cx - 2 * s, cy + 8 * s);
  noStroke();
}

function drawScatter(cx, cy, w) {
  let s = w / 160;
  stroke(150);
  strokeWeight(1);
  line(cx - 25 * s, cy + 20 * s, cx + 25 * s, cy + 20 * s);
  line(cx - 25 * s, cy - 20 * s, cx - 25 * s, cy + 20 * s);
  let pts = [[-15, 10], [-5, -5], [5, -10], [15, -15], [0, 0], [10, -5], [-10, 5]];
  let dotColors = ['#F44336', '#F44336', '#2196F3', '#2196F3', '#F44336', '#4CAF50', '#4CAF50'];
  for (let i = 0; i < pts.length; i++) {
    fill(dotColors[i]);
    noStroke();
    circle(cx + pts[i][0] * s, cy + pts[i][1] * s, 5 * s);
  }
  // Trend line
  stroke('#F44336');
  strokeWeight(1);
  line(cx - 20 * s, cy + 15 * s, cx + 20 * s, cy - 15 * s);
  noStroke();
}

function mousePressed() {
  if (hoveredFW >= 0) selectedFW = hoveredFW;
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
