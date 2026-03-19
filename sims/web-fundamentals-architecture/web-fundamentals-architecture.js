// Web Fundamentals Architecture Overview
// 5-layer interactive architecture diagram
// Bloom Level: Analyze (L4) — organize web fundamentals into layers

let containerWidth;
let canvasWidth = 400;
let drawHeight = 460;
let controlHeight = 60;
let canvasHeight = drawHeight + controlHeight;
let containerHeight = canvasHeight;
let margin = 15;

const layers = [
  {
    name: 'Interaction Layer',
    color: '#F44336',
    desc: 'Handles user input through mouse, touch, and pointer events. This layer converts physical actions into digital signals that drive the interactive infographic.',
    techs: [
      { name: 'Mouse Events', tip: 'Click, hover, drag — desktop interaction primitives' },
      { name: 'Touch Events', tip: 'Tap, swipe, pinch — mobile device interactions' },
      { name: 'Pointer Devices', tip: 'Unified API for mouse, touch, and stylus input' }
    ],
    connections: 'Sends user actions down to the Graphics Layer for visual response'
  },
  {
    name: 'Graphics Layer',
    color: '#FF9800',
    desc: 'Renders visual elements using Canvas or SVG. Manages coordinate systems, hit detection for overlays, and smooth curves via Bezier mathematics.',
    techs: [
      { name: 'Canvas / SVG', tip: 'Two rendering approaches: pixel-based (Canvas) vs. vector-based (SVG)' },
      { name: 'Coordinate Systems', tip: 'Translate between screen pixels and logical diagram coordinates' },
      { name: 'Hit Detection', tip: 'Determine which element the user is pointing at (bounding box or ray casting)' },
      { name: 'Bezier Curves', tip: 'Mathematical curves for smooth connectors and organic shapes' }
    ],
    connections: 'Reads structure from the Structure & Style Layer to know what to draw'
  },
  {
    name: 'Structure & Style Layer',
    color: '#4CAF50',
    desc: 'Defines the document structure (HTML), visual presentation (CSS), and dynamic behavior (DOM manipulation) of the infographic.',
    techs: [
      { name: 'HTML Structure', tip: 'Semantic elements that define the page layout and content hierarchy' },
      { name: 'CSS Styling', tip: 'Visual rules for colors, fonts, spacing, and responsive layout' },
      { name: 'DOM Manipulation', tip: 'JavaScript access to read and modify the document tree in real time' }
    ],
    connections: 'Accesses the Data Layer to populate content dynamically'
  },
  {
    name: 'Data Layer',
    color: '#2196F3',
    desc: 'Stores and validates the content that powers the infographic. Uses JSON for structured data, CSV for tabular data, and JSON Schema for validation.',
    techs: [
      { name: 'JSON', tip: 'Lightweight key-value format for configuration, overlays, and metadata' },
      { name: 'CSV', tip: 'Comma-separated values for tabular datasets and spreadsheet imports' },
      { name: 'JSON Schema', tip: 'Formal rules that validate JSON data structure and types' }
    ],
    connections: 'All data access is governed by the Security Layer below'
  },
  {
    name: 'Security Layer',
    color: '#78909C',
    desc: 'Enforces browser security policies that protect embedded infographics. Controls cross-origin access, content loading, and iframe sandboxing.',
    techs: [
      { name: 'Same-Origin Policy', tip: 'Prevents scripts from accessing data on a different domain' },
      { name: 'CORS', tip: 'Cross-Origin Resource Sharing — controlled exceptions to same-origin policy' },
      { name: 'CSP', tip: 'Content Security Policy — whitelist of allowed script and resource sources' },
      { name: 'Sandbox', tip: 'Iframe sandbox attribute restricts embedded content capabilities' }
    ],
    connections: 'Foundation layer — all other layers operate within these security constraints'
  }
];

let hoveredLayer = -1;
let hoveredTech = -1;
let expandedLayer = -1;

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
  text('Web Fundamentals Architecture', canvasWidth / 2, 6);

  // Layout
  let panelW = min(250, canvasWidth * 0.35);
  let diagX = margin;
  let diagY = 30;
  let diagW = canvasWidth - margin * 2 - panelW - 10;
  let diagH = drawHeight - 40;
  let layerGap = 6;
  let layerH = (diagH - layerGap * (layers.length - 1)) / layers.length;

  // Check hover
  hoveredLayer = -1;
  hoveredTech = -1;

  // Draw layers (top = index 0, bottom = index 4)
  for (let i = 0; i < layers.length; i++) {
    let ly = layers[i];
    let y = diagY + i * (layerH + layerGap);
    let isHover = false;
    let isExpanded = (i === expandedLayer);

    // Layer hover check
    if (mouseX >= diagX && mouseX <= diagX + diagW && mouseY >= y && mouseY <= y + layerH) {
      hoveredLayer = i;
      isHover = true;
    }

    // Dim non-hovered layers
    let alpha = (hoveredLayer >= 0 && hoveredLayer !== i) ? '40' : 'FF';

    // Layer rectangle
    fill(ly.color + (isHover ? '30' : '15'));
    stroke(ly.color + alpha);
    strokeWeight(isHover || isExpanded ? 2.5 : 1.5);
    rect(diagX, y, diagW, layerH, 6);

    // Layer name
    fill(ly.color + alpha);
    noStroke();
    textAlign(LEFT, CENTER);
    textSize(15);
    textStyle(BOLD);
    text(ly.name, diagX + 10, y + layerH / 2 - (isExpanded ? layerH / 4 : 0));
    textStyle(NORMAL);

    // Tech boxes inside layer
    if (isExpanded || isHover) {
      let techY = y + layerH / 2 + (isExpanded ? -2 : 8);
      let techBtnW = (diagW - 20) / ly.techs.length - 4;
      for (let j = 0; j < ly.techs.length; j++) {
        let tx = diagX + 10 + j * (techBtnW + 4);
        let ty = techY;
        let th = 20;

        let techHover = (mouseX >= tx && mouseX <= tx + techBtnW && mouseY >= ty && mouseY <= ty + th);
        if (techHover) hoveredTech = j;

        fill(techHover ? ly.color + '40' : ly.color + '15');
        stroke(ly.color + '80');
        strokeWeight(1);
        rect(tx, ty, techBtnW, th, 3);

        fill(ly.color);
        noStroke();
        textAlign(CENTER, CENTER);
        textSize(min(11, techBtnW / 6));
        text(ly.techs[j].name, tx + techBtnW / 2, ty + th / 2);
      }
    }

    // Vertical arrows between layers
    if (i < layers.length - 1) {
      let arrowY = y + layerH;
      let arrowX = diagX + diagW / 2;
      stroke(layers[i].color + '60');
      strokeWeight(1.5);
      line(arrowX, arrowY + 2, arrowX, arrowY + layerGap - 2);
      // Arrowhead
      fill(layers[i].color + '60');
      noStroke();
      triangle(arrowX, arrowY + layerGap - 1,
        arrowX - 4, arrowY + layerGap - 6,
        arrowX + 4, arrowY + layerGap - 6);
    }
  }

  // Iframe boundary dashed line (around layers 0-3, with security straddling)
  let iframeY = diagY;
  let iframeH = 4 * (layerH + layerGap) + layerH * 0.3;
  stroke('#9E9E9E');
  strokeWeight(1);
  drawingContext.setLineDash([6, 4]);
  noFill();
  rect(diagX - 3, iframeY - 3, diagW + 6, iframeH, 4);
  drawingContext.setLineDash([]);
  fill('#9E9E9E');
  noStroke();
  textSize(10);
  textAlign(RIGHT, TOP);
  text('iframe boundary', diagX + diagW, iframeY - 14);

  // Info panel (right side)
  let panelX = diagX + diagW + 10;
  let panelY = diagY;
  fill('white');
  stroke('silver');
  strokeWeight(1);
  rect(panelX, panelY, panelW, diagH, 6);

  let activeLayer = expandedLayer >= 0 ? expandedLayer : hoveredLayer;
  if (activeLayer >= 0) {
    let ly = layers[activeLayer];
    fill(ly.color);
    noStroke();
    textAlign(LEFT, TOP);
    textSize(16);
    textStyle(BOLD);
    text(ly.name, panelX + 10, panelY + 10);
    textStyle(NORMAL);

    fill(60);
    textSize(13);
    textWrap(WORD);
    text(ly.desc, panelX + 10, panelY + 32, panelW - 20);

    // Connection info
    fill(ly.color + '80');
    textSize(12);
    textStyle(ITALIC);
    text(ly.connections, panelX + 10, panelY + 120, panelW - 20);
    textStyle(NORMAL);

    // Tech tooltip
    if (hoveredTech >= 0 && hoveredTech < ly.techs.length) {
      let tech = ly.techs[hoveredTech];
      fill(ly.color);
      textSize(14);
      textStyle(BOLD);
      text(tech.name, panelX + 10, panelY + 200);
      textStyle(NORMAL);
      fill(80);
      textSize(13);
      text(tech.tip, panelX + 10, panelY + 220, panelW - 20);
    }

    // Technologies list
    fill(100);
    textSize(12);
    textAlign(LEFT, TOP);
    let techListY = panelY + 270;
    text('Technologies:', panelX + 10, techListY);
    for (let j = 0; j < ly.techs.length; j++) {
      fill(ly.color);
      textSize(14);
      text('• ' + ly.techs[j].name, panelX + 15, techListY + 18 + j * 20);
    }
  } else {
    fill(120);
    noStroke();
    textAlign(CENTER, CENTER);
    textSize(14);
    text('Hover over a layer\nto see details', panelX + panelW / 2, panelY + diagH / 2);
  }

  // Collapse All button
  if (expandedLayer >= 0) {
    let cbX = canvasWidth / 2 - 60;
    let cbY = drawHeight + 15;
    fill('white');
    stroke('#BDBDBD');
    strokeWeight(1);
    rect(cbX, cbY, 120, 30, 6);
    fill('#616161');
    noStroke();
    textAlign(CENTER, CENTER);
    textSize(13);
    text('Collapse All', cbX + 60, cbY + 15);
  } else {
    fill(100);
    noStroke();
    textAlign(CENTER, CENTER);
    textSize(14);
    text('Click a layer to expand its details', canvasWidth / 2, drawHeight + 30);
  }
}

function mousePressed() {
  // Collapse All button
  if (expandedLayer >= 0) {
    let cbX = canvasWidth / 2 - 60;
    let cbY = drawHeight + 15;
    if (mouseX >= cbX && mouseX <= cbX + 120 && mouseY >= cbY && mouseY <= cbY + 30) {
      expandedLayer = -1;
      return;
    }
  }

  // Layer click to expand
  if (hoveredLayer >= 0) {
    expandedLayer = (expandedLayer === hoveredLayer) ? -1 : hoveredLayer;
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
