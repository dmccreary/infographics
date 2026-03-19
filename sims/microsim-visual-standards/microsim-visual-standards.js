// MicroSim Visual Standards Explorer
// Annotated example showing layout standards
// Bloom Level: Understand (L2) — explain visual standards

let containerWidth;
let canvasWidth = 400;
let drawHeight = 400;
let controlHeight = 50;
let canvasHeight = drawHeight + controlHeight;
let containerHeight = canvasHeight;
let margin = 15;

let showAnnotations = true;
let showHexValues = false;
let hoveredAnnotation = -1;

let annotToggle, hexToggle;

const annotations = [
  { label: "Aliceblue Drawing Region", hex: "#F0F8FF",
    desc: "The main drawing area uses aliceblue background for visual consistency across all MicroSims.",
    getPos: () => ({ x: canvasWidth * 0.35, y: 60, tx: canvasWidth * 0.15, ty: 40 }) },
  { label: "White Control Region", hex: "#FFFFFF",
    desc: "The control area below uses white background to visually separate interactive controls from the drawing.",
    getPos: () => ({ x: canvasWidth * 0.35, y: drawHeight - 25, tx: canvasWidth * 0.15, ty: drawHeight + 15 }) },
  { label: "Silver Border (1px)", hex: "#C0C0C0",
    desc: "A 1px silver border separates the drawing region from the control region and frames the canvas.",
    getPos: () => ({ x: canvasWidth * 0.7, y: drawHeight - 55, tx: canvasWidth * 0.85, ty: drawHeight - 55 }) },
  { label: "Font Size ≥ 14px", hex: "",
    desc: "Minimum font size is 14px to ensure readability. Labels and values scale with canvas width.",
    getPos: () => ({ x: canvasWidth * 0.5, y: 170, tx: canvasWidth * 0.75, ty: 140 }) },
  { label: "Title (Centered, 20px+)", hex: "",
    desc: "Every MicroSim has a centered title at the top in at least 20px font size.",
    getPos: () => ({ x: canvasWidth * 0.5, y: 20, tx: canvasWidth * 0.78, ty: 18 }) }
];

// Sample bar chart data
const bars = [
  { label: "HTML", value: 85, color: "#FF9800" },
  { label: "CSS", value: 72, color: "#2196F3" },
  { label: "JS", value: 68, color: "#FFC107" },
  { label: "p5.js", value: 90, color: "#4CAF50" }
];

function setup() {
  updateCanvasSize();
  const canvas = createCanvas(containerWidth, containerHeight);
  canvas.parent(document.querySelector('main'));

  annotToggle = createButton('Annotations: ON');
  annotToggle.position(10, drawHeight + 12);
  annotToggle.mousePressed(() => {
    showAnnotations = !showAnnotations;
    annotToggle.html('Annotations: ' + (showAnnotations ? 'ON' : 'OFF'));
  });

  hexToggle = createButton('Hex Values: OFF');
  hexToggle.position(160, drawHeight + 12);
  hexToggle.mousePressed(() => {
    showHexValues = !showHexValues;
    hexToggle.html('Hex Values: ' + (showHexValues ? 'ON' : 'OFF'));
  });
}

function draw() {
  updateCanvasSize();

  // Standard MicroSim layout
  fill('aliceblue');
  stroke('silver');
  strokeWeight(1);
  rect(0, 0, canvasWidth, drawHeight);
  fill('white');
  rect(0, drawHeight, canvasWidth, controlHeight);

  // Hex values overlay
  if (showHexValues) {
    fill('rgba(0,0,0,0.6)');
    noStroke();
    textSize(14);
    textAlign(CENTER, CENTER);
    text('#F0F8FF', canvasWidth / 2, 85);
    text('#FFFFFF', canvasWidth / 2, drawHeight + 25);
    fill('#C0C0C0');
    textSize(10);
    text('#C0C0C0', canvasWidth - 50, drawHeight - 5);
  }

  // Title
  fill('black');
  noStroke();
  textAlign(CENTER, TOP);
  textSize(20);
  text('Visual Standards Explorer', canvasWidth / 2, 8);

  // Sample bar chart
  let chartX = canvasWidth * 0.15;
  let chartW = canvasWidth * 0.5;
  let chartH = 200;
  let chartY = 50;
  let barW = chartW / bars.length - 10;

  for (let i = 0; i < bars.length; i++) {
    let bx = chartX + i * (barW + 10);
    let bh = (bars[i].value / 100) * chartH;
    let by = chartY + chartH - bh;

    // Bar hover
    let isHover = mouseX >= bx && mouseX <= bx + barW && mouseY >= by && mouseY <= by + bh;

    fill(bars[i].color);
    if (isHover) {
      stroke('black');
      strokeWeight(2);
    } else {
      noStroke();
    }
    rect(bx, by, barW, bh, 3, 3, 0, 0);

    // Value on hover
    if (isHover) {
      fill('black');
      noStroke();
      textSize(16);
      textAlign(CENTER, BOTTOM);
      text(bars[i].value + '%', bx + barW / 2, by - 5);
    }

    // Label
    fill('black');
    noStroke();
    textSize(14);
    textAlign(CENTER, TOP);
    text(bars[i].label, bx + barW / 2, chartY + chartH + 8);
  }

  // Axis label
  fill(100);
  textSize(12);
  textAlign(CENTER, TOP);
  text('Web Technology Proficiency', chartX + chartW / 2, chartY + chartH + 28);

  // Annotation arrows
  if (showAnnotations) {
    hoveredAnnotation = -1;

    for (let i = 0; i < annotations.length; i++) {
      let a = annotations[i];
      let pos = a.getPos();

      // Check hover on annotation text
      let tw = textWidth(a.label) + 20;
      if (mouseX >= pos.tx - tw / 2 && mouseX <= pos.tx + tw / 2 &&
          mouseY >= pos.ty - 12 && mouseY <= pos.ty + 12) {
        hoveredAnnotation = i;
      }

      let isHover = (i === hoveredAnnotation);

      // Arrow line
      stroke(isHover ? '#F44336' : '#1565C0');
      strokeWeight(isHover ? 2 : 1);
      line(pos.x, pos.y, pos.tx, pos.ty);

      // Arrow dot at source
      fill(isHover ? '#F44336' : '#1565C0');
      noStroke();
      circle(pos.x, pos.y, 8);

      // Label
      fill(isHover ? '#F44336' : '#1565C0');
      textSize(11);
      textAlign(CENTER, CENTER);
      text(a.label, pos.tx, pos.ty);
    }

    // Tooltip for hovered annotation
    if (hoveredAnnotation >= 0) {
      let a = annotations[hoveredAnnotation];
      let pos = a.getPos();
      let tipW = Math.min(250, canvasWidth * 0.4);
      let tipX = pos.tx - tipW / 2;
      let tipY = pos.ty + 18;
      if (tipY + 50 > drawHeight) tipY = pos.ty - 60;
      if (tipX < 5) tipX = 5;
      if (tipX + tipW > canvasWidth - 5) tipX = canvasWidth - tipW - 5;

      fill(50, 50, 50, 230);
      noStroke();
      rect(tipX, tipY, tipW, 50, 4);
      fill('white');
      textSize(11);
      textAlign(LEFT, TOP);
      textWrap(WORD);
      text(a.desc, tipX + 8, tipY + 6, tipW - 16);
    }
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
