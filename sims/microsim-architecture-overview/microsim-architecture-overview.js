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

// File block definitions
let fileBlocks = [];
let arrows = [];
let hoveredBlock = null;
let selectedBlock = null;
let hoverMessage = 'Hover over a file block to see its purpose. Click to highlight connections.';

// Colors matching book theme
const COLORS = {
  mainHtml:     { r: 66,  g: 133, b: 244, label: 'blue' },      // blue
  indexMd:      { r: 52,  g: 168, b: 83,  label: 'green' },      // green
  metadataJson: { r: 251, g: 140, b: 0,   label: 'orange' },     // orange
  dataJson:     { r: 142, g: 68,  b: 173, label: 'purple' },     // purple
  browser:      { r: 200, g: 210, b: 220, label: 'gray' }        // browser chrome
};

// Detailed descriptions for each file
const DESCRIPTIONS = {
  mainHtml: 'main.html — The interactive experience. Contains the HTML5 shell with p5.js CDN link, a <main> element, and imports the JavaScript file. This is the file embedded via iframe.',
  indexMd: 'index.md — The documentation page. Contains YAML frontmatter, an iframe embed of main.html, a fullscreen link, lesson plan, and educational context for the textbook.',
  metadataJson: 'metadata.json — Discoverability metadata. Dublin Core fields (title, creator, subject, date) plus educational metadata (Bloom level, concepts, prerequisites) for search engines.',
  dataJson: 'data.json — Configuration data. Overlay regions, labels, coordinates, and settings loaded at runtime by main.html. Separates content from code for easy editing.'
};

function setup() {
  updateCanvasSize();
  const canvas = createCanvas(containerWidth, containerHeight);
  var mainElement = document.querySelector('main');
  canvas.parent(mainElement);
  textFont('Arial');
  describe('Interactive diagram showing the four files in a MicroSim directory and their relationships', LABEL);
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

  // Browser chrome
  fill(230, 235, 240);
  stroke(180);
  strokeWeight(1);
  rect(browserX, browserY, browserW, browserH, 6);

  // Title bar dots
  fill(255, 95, 87);
  noStroke();
  circle(browserX + 15, browserY + 14, 10);
  fill(255, 189, 46);
  circle(browserX + 30, browserY + 14, 10);
  fill(39, 201, 63);
  circle(browserX + 45, browserY + 14, 10);

  // URL bar
  fill(255);
  stroke(200);
  rect(browserX + 60, browserY + 6, browserW - 75, 18, 4);
  fill(100);
  noStroke();
  textSize(10);
  textAlign(LEFT, CENTER);
  text('localhost:8000/sims/my-infographic/', browserX + 65, browserY + 15);

  // Browser content area
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

    // Tree connector lines
    stroke(150);
    strokeWeight(1);
    line(treeX + 8, fy + 2, treeX + 8, fy + 10);
    line(treeX + 8, fy + 10, treeX + 20, fy + 10);

    // File icon
    let c = COLORS[fileColorKeys[i]];
    fill(c.r, c.g, c.b);
    noStroke();
    rect(treeX + 22, fy + 4, 12, 14, 2);
    fill(255);
    textSize(7);
    textAlign(CENTER, CENTER);
    // small file icon indicator
    rect(treeX + 24, fy + 6, 8, 2);
    rect(treeX + 24, fy + 10, 8, 2);
    rect(treeX + 24, fy + 14, 8, 2);

    // File name
    fill(40);
    noStroke();
    textSize(13);
    textAlign(LEFT, CENTER);
    text(fileNames[i], treeX + 40, fy + 10);
  }

  // Vertical connector for tree
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

    // Determine highlight state
    let isHovered = hoveredBlock === def.key;
    let isSelected = selectedBlock === def.key;

    // Block shadow
    if (isHovered || isSelected) {
      fill(0, 0, 0, 30);
      noStroke();
      rect(bx + 3, by + 3, bw, bh, 8);
    }

    // Block background
    let c = def.color;
    if (isHovered || isSelected) {
      fill(c.r, c.g, c.b, 240);
    } else {
      fill(c.r, c.g, c.b, 180);
    }
    stroke(c.r, c.g, c.b);
    strokeWeight(isSelected ? 3 : 1.5);
    rect(bx, by, bw, bh, 8);

    // Block text
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
  // Truncate for small screens
  let maxChars = Math.floor((canvasWidth - 2 * margin) / 6.5);
  if (msg.length > maxChars) {
    msg = msg.substring(0, maxChars - 3) + '...';
  }
  text(msg, margin, drawHeight + controlHeight / 2);

  // Send height to parent for iframe auto-resize
  window.parent.postMessage({ type: 'microsim-resize', height: canvasHeight }, '*');
}

function drawArrows(blocksStartY, blockHeight, blockSpacing, rightColX, rightColWidth, browserY, browserH) {
  let mainBlock = fileBlocks[0];   // main.html
  let indexBlock = fileBlocks[1];  // index.md
  let dataBlock = fileBlocks[3];   // data.json

  // Arrow: index.md --embeds via iframe--> main.html
  let showIndexArrow = !selectedBlock || selectedBlock === 'indexMd' || selectedBlock === 'mainHtml';
  if (showIndexArrow) {
    let alpha = (selectedBlock === 'indexMd' || selectedBlock === 'mainHtml') ? 255 : 150;
    let sw = (selectedBlock === 'indexMd' || selectedBlock === 'mainHtml') ? 2.5 : 1.5;

    stroke(52, 168, 83, alpha);
    strokeWeight(sw);
    noFill();

    // Curved arrow from index.md left side to main.html left side
    let startX = indexBlock.x;
    let startY = indexBlock.y + indexBlock.h / 2;
    let endX = mainBlock.x;
    let endY = mainBlock.y + mainBlock.h / 2;
    let cpx = startX - 30;

    beginShape();
    vertex(startX, startY);
    bezierVertex(cpx, startY, cpx, endY, endX, endY);
    endShape();

    // Arrowhead
    drawArrowhead(endX, endY, 0, COLORS.indexMd, alpha);

    // Label
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

  // Arrow: main.html --loads--> data.json
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

    // Arrowhead pointing left
    drawArrowhead(endX, endY, PI, COLORS.dataJson, alpha);

    // Label
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

  // Arrow: main.html --renders in--> browser
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

function mouseMoved() {
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
  for (let b of fileBlocks) {
    if (mouseX >= b.x && mouseX <= b.x + b.w && mouseY >= b.y && mouseY <= b.y + b.h) {
      if (selectedBlock === b.key) {
        selectedBlock = null; // toggle off
      } else {
        selectedBlock = b.key;
      }
      return;
    }
  }
  // Click outside blocks clears selection
  selectedBlock = null;
}

function windowResized() {
  updateCanvasSize();
  resizeCanvas(containerWidth, containerHeight);
  redraw();
}

function updateCanvasSize() {
  const container = document.querySelector('main').getBoundingClientRect();
  containerWidth = Math.max(Math.floor(container.width), 600);
  canvasWidth = containerWidth;
}
