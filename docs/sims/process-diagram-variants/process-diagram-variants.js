// Process Diagram Variants MicroSim
// Compare 5 process diagram subtypes side by side
// Bloom Level: Understand (L2) — compare visual metaphors

let containerWidth;
let canvasWidth = 400;
let drawHeight = 380;
let controlHeight = 70;
let canvasHeight = drawHeight + controlHeight;
let containerHeight = canvasHeight;
let margin = 15;

const variants = [
  { name: "Process Arrows", color: "#2196F3",
    metaphor: "Linear sequence of steps connected by arrows",
    bestFor: "Step-by-step procedures, workflows, algorithms",
    example: "Software development lifecycle: Requirements → Design → Code → Test → Deploy" },
  { name: "Chevron Process", color: "#FF9800",
    metaphor: "Interlocking chevrons showing progression and momentum",
    bestFor: "Sales funnels, pipeline stages, phased rollouts",
    example: "Customer journey: Awareness → Interest → Decision → Action" },
  { name: "Timeline", color: "#009688",
    metaphor: "Events positioned along a horizontal time axis",
    bestFor: "Historical events, project milestones, schedules",
    example: "Course schedule: Week 1 HTML → Week 3 CSS → Week 5 JS → Week 7 p5.js" },
  { name: "Gear Process", color: "#4CAF50",
    metaphor: "Interlocking gears showing interconnected processes",
    bestFor: "Systems where processes drive each other, mechanical workflows",
    example: "Content pipeline: Writing ⚙ Editing ⚙ Publishing" },
  { name: "Step Up", color: "#9C27B0",
    metaphor: "Ascending staircase showing progression to higher levels",
    bestFor: "Skill progression, maturity models, increasing complexity",
    example: "Bloom's Taxonomy: Remember → Understand → Apply → Analyze" }
];

let selectedVariant = -1;
let hoveredVariant = -1;

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

  // Title
  fill('black');
  noStroke();
  textAlign(CENTER, TOP);
  textSize(18);
  text('Process Diagram Variants', canvasWidth / 2, 6);

  // Layout: thumbnails
  let cols = canvasWidth > 500 ? 5 : (canvasWidth > 350 ? 3 : 2);
  let thumbW = (canvasWidth - margin * 2 - (cols - 1) * 10) / cols;
  let thumbH = 100;
  let startY = 35;

  hoveredVariant = -1;
  for (let i = 0; i < variants.length; i++) {
    let col = i % cols;
    let row = Math.floor(i / cols);
    let tx = margin + col * (thumbW + 10);
    let ty = startY + row * (thumbH + 35);

    if (mouseX >= tx && mouseX <= tx + thumbW && mouseY >= ty && mouseY <= ty + thumbH) {
      hoveredVariant = i;
    }

    let isHover = (i === hoveredVariant);
    let isSelected = (i === selectedVariant);

    // Thumbnail background
    if (isSelected) {
      fill('white');
      stroke(variants[i].color);
      strokeWeight(3);
      drawingContext.shadowBlur = 8;
      drawingContext.shadowColor = variants[i].color;
    } else if (isHover) {
      fill('white');
      stroke(variants[i].color);
      strokeWeight(2);
    } else {
      fill('#FAFAFA');
      stroke('#E0E0E0');
      strokeWeight(1);
    }
    rect(tx, ty, thumbW, thumbH, 6);
    drawingContext.shadowBlur = 0;

    // Draw miniature diagram
    push();
    let cx = tx + thumbW / 2;
    let cy = ty + thumbH / 2 - 5;
    let scale = thumbW / 160;

    if (i === 0) drawProcessArrows(cx, cy, scale, variants[i].color);
    else if (i === 1) drawChevrons(cx, cy, scale, variants[i].color);
    else if (i === 2) drawTimeline(cx, cy, scale, variants[i].color);
    else if (i === 3) drawGears(cx, cy, scale, variants[i].color);
    else if (i === 4) drawStepUp(cx, cy, scale, variants[i].color);
    pop();

    // Label
    fill('black');
    noStroke();
    textAlign(CENTER, TOP);
    textSize(12);
    text(variants[i].name, tx + thumbW / 2, ty + thumbH + 4);
  }

  // Detail panel
  let rows = Math.ceil(variants.length / cols);
  let detailY = startY + rows * (thumbH + 35) + 20;
  let detailH = drawHeight - detailY - 5;

  if (selectedVariant >= 0) {
    let v = variants[selectedVariant];
    fill(v.color);
    noStroke();
    textAlign(LEFT, TOP);
    textSize(16);
    text(v.name, margin, detailY);

    fill('black');
    textSize(14);
    text('Visual Metaphor:', margin, detailY + 25);
    fill(80);
    textSize(13);
    textWrap(WORD);
    text(v.metaphor, margin + 120, detailY + 25, canvasWidth * 0.55);

    fill('black');
    textSize(14);
    text('Best For:', margin, detailY + 55);
    fill(80);
    textSize(13);
    text(v.bestFor, margin + 120, detailY + 55, canvasWidth * 0.55);

    fill('black');
    textSize(14);
    text('Example:', margin, detailY + 90);
    fill(v.color);
    textSize(13);
    text(v.example, margin + 120, detailY + 90, canvasWidth * 0.55);
  } else {
    fill(120);
    noStroke();
    textAlign(CENTER, CENTER);
    textSize(14);
    text('Click a diagram type to learn when to use it.', canvasWidth / 2, detailY + detailH / 2);
  }
}

// Miniature diagram drawing functions
function drawProcessArrows(cx, cy, s, c) {
  let bw = 25 * s, bh = 18 * s, gap = 8 * s;
  for (let i = 0; i < 3; i++) {
    let x = cx - (1.5 * (bw + gap)) + i * (bw + gap);
    fill(c);
    noStroke();
    rect(x, cy - bh / 2, bw, bh, 3 * s);
    if (i < 2) {
      fill(180);
      triangle(x + bw + 2, cy, x + bw + gap - 2, cy - 4 * s, x + bw + gap - 2, cy + 4 * s);
    }
  }
}

function drawChevrons(cx, cy, s, c) {
  let cw = 22 * s, ch = 22 * s;
  for (let i = 0; i < 4; i++) {
    let x = cx - 2 * cw + i * cw;
    let alpha = 255 - i * 40;
    fill(red(color(c)), green(color(c)), blue(color(c)), alpha);
    noStroke();
    beginShape();
    vertex(x, cy - ch / 2);
    vertex(x + cw * 0.7, cy - ch / 2);
    vertex(x + cw, cy);
    vertex(x + cw * 0.7, cy + ch / 2);
    vertex(x, cy + ch / 2);
    vertex(x + cw * 0.3, cy);
    endShape(CLOSE);
  }
}

function drawTimeline(cx, cy, s, c) {
  stroke(180);
  strokeWeight(2 * s);
  line(cx - 50 * s, cy, cx + 50 * s, cy);
  for (let i = 0; i < 4; i++) {
    let x = cx - 40 * s + i * 28 * s;
    let above = (i % 2 === 0);
    fill(c);
    noStroke();
    circle(x, cy, 8 * s);
    stroke(c);
    strokeWeight(1);
    line(x, cy, x, cy + (above ? -15 : 15) * s);
  }
  noStroke();
}

function drawGears(cx, cy, s, c) {
  for (let g = 0; g < 3; g++) {
    let gx = cx - 30 * s + g * 28 * s;
    let r = 12 * s;
    fill(c);
    stroke(color(red(color(c)) - 40, green(color(c)) - 40, blue(color(c)) - 40));
    strokeWeight(1);
    circle(gx, cy, r * 2);
    fill('white');
    noStroke();
    circle(gx, cy, r * 0.6);
    // Teeth
    for (let t = 0; t < 6; t++) {
      let angle = t * PI / 3 + g * PI / 6;
      fill(c);
      noStroke();
      rect(gx + cos(angle) * r - 2 * s, cy + sin(angle) * r - 2 * s, 4 * s, 4 * s);
    }
  }
}

function drawStepUp(cx, cy, s, c) {
  for (let i = 0; i < 4; i++) {
    let sx = cx - 35 * s + i * 20 * s;
    let sh = (i + 1) * 8 * s;
    let sy = cy + 20 * s - sh;
    let alpha = 150 + i * 25;
    fill(red(color(c)), green(color(c)), blue(color(c)), alpha);
    noStroke();
    rect(sx, sy, 18 * s, sh, 2 * s, 2 * s, 0, 0);
  }
}

function mousePressed() {
  if (hoveredVariant >= 0) {
    selectedVariant = hoveredVariant;
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
