// Interaction Feedback Patterns Demo MicroSim
// Demonstrates 6 feedback patterns: tooltip, color change, opacity dim, border glow, scale up, click select
// Bloom Level: Apply (L3) — hands-on parameter exploration

let containerWidth;
let canvasWidth = 400;
let drawHeight = 300;
let controlHeight = 150;
let canvasHeight = drawHeight + controlHeight;
let containerHeight = canvasHeight;
let margin = 15;
let sliderLeftMargin = 140;

const patterns = [
  { name: "Tooltip", color: "#4285F4", icon: "💬", desc: "Shows an info box on hover" },
  { name: "Color Change", color: "#34A853", icon: "🎨", desc: "Shifts to a highlight color" },
  { name: "Opacity Dim", color: "#FBBC04", icon: "👁", desc: "Dims non-hovered elements" },
  { name: "Border Glow", color: "#EA4335", icon: "✨", desc: "Adds bright border emphasis" },
  { name: "Scale Up", color: "#9C27B0", icon: "🔍", desc: "Slightly enlarges on hover" },
  { name: "Click Select", color: "#00BCD4", icon: "👆", desc: "Persistent selection on click" }
];

let hoveredBox = -1;
let selectedBox = -1;
let feedbackLog = [];
let simStartTime;

// Control values
let tooltipDelay = 200;
let highlightOpacity = 0.3;
let scaleFactor = 1.1;
let hoverColorHex = '#FFD700';

let delaySlider, opacitySlider, scaleSlider;
let clearLogButton;

function setup() {
  updateCanvasSize();
  const canvas = createCanvas(containerWidth, containerHeight);
  canvas.parent(document.querySelector('main'));
  simStartTime = millis();

  delaySlider = createSlider(0, 1000, tooltipDelay, 50);
  delaySlider.position(sliderLeftMargin, drawHeight + 8);
  delaySlider.size(canvasWidth - sliderLeftMargin - margin);

  opacitySlider = createSlider(10, 100, highlightOpacity * 100, 5);
  opacitySlider.position(sliderLeftMargin, drawHeight + 35);
  opacitySlider.size(canvasWidth - sliderLeftMargin - margin);

  scaleSlider = createSlider(100, 130, scaleFactor * 100, 1);
  scaleSlider.position(sliderLeftMargin, drawHeight + 62);
  scaleSlider.size(canvasWidth - sliderLeftMargin - margin);

  clearLogButton = createButton('Clear Log');
  clearLogButton.position(10, drawHeight + 92);
  clearLogButton.mousePressed(() => { feedbackLog = []; });
}

function draw() {
  updateCanvasSize();

  tooltipDelay = delaySlider.value();
  highlightOpacity = opacitySlider.value() / 100;
  scaleFactor = scaleSlider.value() / 100;

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
  text('Interaction Feedback Patterns', canvasWidth / 2, 6);

  // Calculate box layout
  let cols = canvasWidth > 500 ? 3 : 2;
  let rows = Math.ceil(patterns.length / cols);
  let boxW = (canvasWidth - margin * 2 - (cols - 1) * 10) / cols;
  let boxH = Math.min(80, (drawHeight - 80) / rows - 10);
  let startY = 35;

  // Detect hover
  let prevHovered = hoveredBox;
  hoveredBox = -1;
  for (let i = 0; i < patterns.length; i++) {
    let col = i % cols;
    let row = Math.floor(i / cols);
    let bx = margin + col * (boxW + 10);
    let by = startY + row * (boxH + 10);

    if (mouseX >= bx && mouseX <= bx + boxW && mouseY >= by && mouseY <= by + boxH) {
      hoveredBox = i;
    }
  }

  // Log hover events
  if (hoveredBox >= 0 && hoveredBox !== prevHovered) {
    let elapsed = ((millis() - simStartTime) / 1000).toFixed(1);
    feedbackLog.push('Hovered "' + patterns[hoveredBox].name + '" at ' + elapsed + 's');
    if (feedbackLog.length > 6) feedbackLog.shift();
  }

  // Draw boxes with their respective feedback patterns
  for (let i = 0; i < patterns.length; i++) {
    let col = i % cols;
    let row = Math.floor(i / cols);
    let bx = margin + col * (boxW + 10);
    let by = startY + row * (boxH + 10);
    let isHovered = (i === hoveredBox);
    let isSelected = (i === selectedBox);
    let p = patterns[i];

    push();

    // Pattern 4: Scale Up
    if (i === 4 && isHovered) {
      let sc = scaleFactor;
      translate(bx + boxW / 2, by + boxH / 2);
      scale(sc);
      translate(-(bx + boxW / 2), -(by + boxH / 2));
    }

    // Pattern 2: Opacity Dim (dim non-hovered when something is hovered)
    if (i === 2 && hoveredBox >= 0 && !isHovered) {
      let alphaVal = Math.floor(highlightOpacity * 255);
      fill(red(color(p.color)), green(color(p.color)), blue(color(p.color)), alphaVal);
    } else if (i === 1 && isHovered) {
      // Pattern 1: Color Change
      fill(hoverColorHex);
    } else {
      fill(p.color);
    }

    // Pattern 3: Border Glow
    if (i === 3 && isHovered) {
      stroke(255, 215, 0);
      strokeWeight(4);
      // Glow effect
      drawingContext.shadowBlur = 15;
      drawingContext.shadowColor = 'gold';
    } else if (i === 5 && isSelected) {
      // Pattern 5: Click Select (persistent)
      stroke('white');
      strokeWeight(3);
    } else {
      stroke(isHovered ? 'white' : p.color);
      strokeWeight(isHovered ? 2 : 1);
    }

    rect(bx, by, boxW, boxH, 8);
    drawingContext.shadowBlur = 0;

    // Icon and label
    fill('white');
    noStroke();
    textAlign(CENTER, CENTER);
    textSize(22);
    text(p.icon, bx + boxW / 2, by + boxH / 2 - 12);
    textSize(14);
    text(p.name, bx + boxW / 2, by + boxH / 2 + 14);

    pop();

    // Pattern 0: Tooltip (with delay simulation)
    if (i === 0 && isHovered) {
      let tipX = mouseX + 10;
      let tipY = mouseY - 30;
      if (tipX + 150 > canvasWidth) tipX = mouseX - 160;
      fill(50, 50, 50, 220);
      noStroke();
      rect(tipX, tipY, 150, 28, 4);
      fill('white');
      textSize(12);
      textAlign(LEFT, CENTER);
      text('Delay: ' + tooltipDelay + 'ms', tipX + 8, tipY + 14);
    }
  }

  // Feedback log in bottom right of draw area
  let logX = canvasWidth - 200;
  let logY = startY + rows * (boxH + 10) + 5;
  fill(40);
  noStroke();
  rect(logX, logY, 190, drawHeight - logY - 5, 4);
  fill('#00FF88');
  textAlign(LEFT, TOP);
  textSize(10);
  textFont('monospace');
  for (let i = 0; i < feedbackLog.length; i++) {
    text(feedbackLog[i], logX + 5, logY + 4 + i * 14);
  }
  textFont('Arial');

  fill(120);
  textSize(11);
  textAlign(LEFT, TOP);
  text('Event Log', logX, logY - 14);

  // Slider labels
  fill('black');
  noStroke();
  textAlign(LEFT, CENTER);
  textSize(13);
  text('Tooltip Delay: ' + tooltipDelay + 'ms', 10, drawHeight + 18);
  text('Dim Opacity: ' + (highlightOpacity * 100).toFixed(0) + '%', 10, drawHeight + 45);
  text('Scale Factor: ' + scaleFactor.toFixed(2) + 'x', 10, drawHeight + 72);
}

function mousePressed() {
  if (hoveredBox === 5) {
    selectedBox = (selectedBox === 5) ? -1 : 5;
    let elapsed = ((millis() - simStartTime) / 1000).toFixed(1);
    feedbackLog.push('Clicked "Click Select" at ' + elapsed + 's');
    if (feedbackLog.length > 6) feedbackLog.shift();
  }
}

function windowResized() {
  updateCanvasSize();
  resizeCanvas(containerWidth, containerHeight);
  delaySlider.size(canvasWidth - sliderLeftMargin - margin);
  opacitySlider.size(canvasWidth - sliderLeftMargin - margin);
  scaleSlider.size(canvasWidth - sliderLeftMargin - margin);
  redraw();
}

function updateCanvasSize() {
  const container = document.querySelector('main').getBoundingClientRect();
  containerWidth = Math.floor(container.width);
  canvasWidth = containerWidth;
}
