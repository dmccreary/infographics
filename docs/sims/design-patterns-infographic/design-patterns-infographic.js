// Design Patterns in Infographic Architecture
// Differentiates Configuration Object, Observer, and Factory patterns
// by showing how each structures data flow in an interactive infographic.
let containerWidth;
let canvasWidth = 400;
let drawHeight = 440;
let controlHeight = 50;
let canvasHeight = drawHeight + controlHeight;
let containerHeight = canvasHeight;
let margin = 20;
let defaultTextSize = 14;

// Pattern data
const patterns = [
  {
    name: 'Configuration Object',
    description: 'A central configuration object holds all settings and data. Every component reads from this shared config, making state management simple and predictable.',
    bestFor: ['Simple infographics with few components', 'Rapid prototyping', 'Settings that rarely change at runtime'],
    code: `const config = {
  regions: [{id:"A", x:10, y:20}],
  colors: {hover: "#FFD700"},
  infobox: {position: "below"}
};
// All components read from config
renderer.init(config);
infobox.init(config);`,
    layout: 'star' // central config radiating out
  },
  {
    name: 'Observer',
    description: 'Components communicate through an event bus. When a user interacts, the event detector publishes events, and any number of subscribers react independently.',
    bestFor: ['Complex infographics with many independent reactions', 'Adding new features without modifying existing code', 'Analytics and logging'],
    code: `eventBus.on("regionHover", (e) => {
  renderer.highlight(e.region);
  infobox.show(e.region.data);
  analytics.log("hover", e.region);
});
// Easy to add new subscribers
eventBus.on("regionHover", (e) => {
  sound.play(e.region.tone);
});`,
    layout: 'bus' // event bus fanning out
  },
  {
    name: 'Factory',
    description: 'A factory creates region objects with consistent interfaces. Each region encapsulates its own rendering, hit detection, and data, making it easy to add new region types.',
    bestFor: ['Infographics with many similar but varied elements', 'Adding new region types (rect, circle, polygon)', 'Reusable component libraries'],
    code: `function createRegion(type, data) {
  switch(type) {
    case "rect": return new RectRegion(data);
    case "circle": return new CircleRegion(data);
    case "poly": return new PolyRegion(data);
  }
}
const regions = data.map(d =>
  createRegion(d.type, d));`,
    layout: 'factory' // factory creating objects
  }
];

let selectedPattern = 0;
let animProgress = 1; // 0 to 1 for transitions
let prevPositions = [];
let targetPositions = [];

// Component definitions
const componentNames = ['Config / Data', 'Event Detection', 'Region Renderer', 'Infobox Manager', 'Analytics Logger'];
const componentColors = ['#4A90D9', '#2ECC71', '#E67E22', '#9B59B6', '#E74C3C'];

let componentPositions = [];
let hoveredComponent = -1;
let hoveredArrow = -1;

// Responsibilities for each component
const responsibilities = [
  'Stores all infographic settings, region definitions, color schemes, and layout parameters',
  'Listens for mouse/touch events on the canvas and determines which region was targeted',
  'Draws all visual elements: regions, labels, highlights, and decorative elements',
  'Manages the info panel that appears when a region is hovered or clicked',
  'Records user interactions (hovers, clicks, time spent) for learning analytics'
];

function setup() {
  updateCanvasSize();
  const canvas = createCanvas(containerWidth, containerHeight);
  var mainElement = document.querySelector('main');
  canvas.parent(mainElement);
  textFont('Arial');
  calculatePositions(selectedPattern);
  componentPositions = targetPositions.map(p => ({...p}));
}

function draw() {
  updateCanvasSize();

  // Drawing region
  fill('aliceblue');
  stroke('silver');
  strokeWeight(1);
  rect(0, 0, canvasWidth, drawHeight);

  // Control region
  fill('white');
  rect(0, drawHeight, canvasWidth, controlHeight);

  // Title
  fill('#333');
  noStroke();
  textAlign(CENTER, TOP);
  textSize(20);
  text('Design Patterns in Infographic Architecture', canvasWidth / 2, 12);

  // Animate positions
  if (animProgress < 1) {
    animProgress = min(1, animProgress + 0.04);
    let t = easeInOut(animProgress);
    for (let i = 0; i < componentPositions.length; i++) {
      componentPositions[i].x = lerp(prevPositions[i].x, targetPositions[i].x, t);
      componentPositions[i].y = lerp(prevPositions[i].y, targetPositions[i].y, t);
    }
  }

  // Draw pattern tabs
  drawTabs();

  // Draw arrows first (behind components)
  drawArrows();

  // Draw components
  drawComponents();

  // Draw right panel with description
  drawInfoPanel();

  // Draw tooltip if hovering
  drawTooltip();
}

function drawTabs() {
  let tabW = min(180, (canvasWidth * 0.6 - 40) / 3);
  let tabStartX = 20;
  let tabY = drawHeight + 8;

  for (let i = 0; i < patterns.length; i++) {
    let tx = tabStartX + i * (tabW + 8);

    if (i === selectedPattern) {
      fill('#4A90D9');
      stroke('#2C5F9E');
    } else {
      fill('#E8E8E8');
      stroke('#CCC');
    }
    strokeWeight(1);
    rect(tx, tabY, tabW, 32, 5);

    noStroke();
    fill(i === selectedPattern ? 'white' : '#555');
    textAlign(CENTER, CENTER);
    textSize(12);
    text(patterns[i].name, tx + tabW/2, tabY + 16);
  }
}

function calculatePositions(patternIndex) {
  let diagramW = canvasWidth * 0.55;
  let cx = diagramW / 2;
  let cy = drawHeight / 2 + 20;
  let spread = min(130, diagramW * 0.28);

  let positions = [];

  if (patternIndex === 0) {
    // Configuration Object: star pattern with Config in center
    positions = [
      {x: cx, y: cy},                          // Config (center)
      {x: cx + spread, y: cy - spread * 0.7},  // Event Detection
      {x: cx + spread, y: cy + spread * 0.7},  // Renderer
      {x: cx - spread, y: cy + spread * 0.7},  // Infobox
      {x: cx - spread, y: cy - spread * 0.7}   // Analytics
    ];
  } else if (patternIndex === 1) {
    // Observer: Event Detection -> Event Bus -> others
    positions = [
      {x: cx - spread * 0.3, y: cy + spread},     // Config (bottom, less prominent)
      {x: cx - spread * 1.1, y: cy},                // Event Detection (left)
      {x: cx + spread * 0.7, y: cy - spread * 0.8}, // Renderer
      {x: cx + spread * 0.7, y: cy},                // Infobox
      {x: cx + spread * 0.7, y: cy + spread * 0.8}  // Analytics
    ];
  } else {
    // Factory: Factory creates regions consumed by Renderer
    positions = [
      {x: cx - spread, y: cy - spread * 0.6},      // Config/Data (top left)
      {x: cx - spread, y: cy + spread * 0.6},       // Event Detection (bottom left)
      {x: cx + spread * 0.3, y: cy},                // Renderer (center right)
      {x: cx + spread * 1.1, y: cy - spread * 0.5}, // Infobox
      {x: cx + spread * 1.1, y: cy + spread * 0.5}  // Analytics
    ];
  }

  return positions;
}

function drawArrows() {
  let pattern = selectedPattern;
  strokeWeight(2);

  if (pattern === 0) {
    // Star: Config -> all others
    for (let i = 1; i < 5; i++) {
      let isHovered = (hoveredArrow === i - 1);
      stroke(isHovered ? '#FF6B6B' : '#4A90D9');
      drawArrowBetween(componentPositions[0], componentPositions[i], isHovered);
    }
  } else if (pattern === 1) {
    // Observer: Event Detection -> Event Bus area -> Renderer, Infobox, Analytics
    let busCx = (componentPositions[1].x + componentPositions[2].x) / 2;
    let busCy = componentPositions[1].y;

    // Draw event bus line
    stroke('#2ECC71');
    strokeWeight(3);
    line(busCx, componentPositions[2].y - 10, busCx, componentPositions[4].y + 10);

    noStroke();
    fill('#2ECC71');
    textSize(11);
    textAlign(CENTER, CENTER);
    push();
    translate(busCx, componentPositions[1].y);
    rotate(-HALF_PI);
    text('Event Bus', 0, -12);
    pop();

    strokeWeight(2);
    // Event Detection -> Bus
    stroke(hoveredArrow === 0 ? '#FF6B6B' : '#2ECC71');
    drawArrowBetween(componentPositions[1], {x: busCx, y: busCy}, hoveredArrow === 0);

    // Bus -> subscribers
    for (let i = 2; i <= 4; i++) {
      let isHovered = hoveredArrow === i - 1;
      stroke(isHovered ? '#FF6B6B' : '#2ECC71');
      drawArrowBetween({x: busCx, y: componentPositions[i].y}, componentPositions[i], isHovered);
    }
  } else {
    // Factory: Config -> Factory(Renderer), Renderer -> Infobox, Renderer -> Analytics
    stroke(hoveredArrow === 0 ? '#FF6B6B' : '#E67E22');
    drawArrowBetween(componentPositions[0], componentPositions[2], hoveredArrow === 0);

    stroke(hoveredArrow === 1 ? '#FF6B6B' : '#9B59B6');
    drawArrowBetween(componentPositions[2], componentPositions[3], hoveredArrow === 1);

    stroke(hoveredArrow === 2 ? '#FF6B6B' : '#E74C3C');
    drawArrowBetween(componentPositions[2], componentPositions[4], hoveredArrow === 2);

    stroke(hoveredArrow === 3 ? '#FF6B6B' : '#4A90D9');
    drawArrowBetween(componentPositions[1], componentPositions[2], hoveredArrow === 3);

    // Label for factory
    noStroke();
    fill('#E67E22');
    textSize(11);
    textAlign(CENTER, TOP);
    let midX = (componentPositions[0].x + componentPositions[2].x) / 2;
    let midY = (componentPositions[0].y + componentPositions[2].y) / 2;
    text('creates regions', midX, midY - 20);
  }
}

function drawArrowBetween(from, to, highlighted) {
  let dx = to.x - from.x;
  let dy = to.y - from.y;
  let len = sqrt(dx * dx + dy * dy);
  if (len < 1) return;

  let ux = dx / len;
  let uy = dy / len;

  let startDist = 45;
  let endDist = 50;

  let sx = from.x + ux * startDist;
  let sy = from.y + uy * startDist;
  let ex = to.x - ux * endDist;
  let ey = to.y - uy * endDist;

  strokeWeight(highlighted ? 3 : 2);
  line(sx, sy, ex, ey);

  // Arrowhead
  let aSize = 10;
  let angle = atan2(ey - sy, ex - sx);
  fill(highlighted ? '#FF6B6B' : color(red(stroke), green(stroke), blue(stroke)));
  noStroke();
  triangle(
    ex, ey,
    ex - aSize * cos(angle - 0.4), ey - aSize * sin(angle - 0.4),
    ex - aSize * cos(angle + 0.4), ey - aSize * sin(angle + 0.4)
  );
}

function drawComponents() {
  for (let i = 0; i < 5; i++) {
    let pos = componentPositions[i];
    let isHovered = (hoveredComponent === i);
    let w = 90;
    let h = 40;

    // Shadow
    noStroke();
    fill(0, 0, 0, 20);
    rect(pos.x - w/2 + 3, pos.y - h/2 + 3, w, h, 8);

    // Box
    fill(isHovered ? lightenColor(componentColors[i]) : componentColors[i]);
    stroke(isHovered ? '#333' : '#666');
    strokeWeight(isHovered ? 2 : 1);
    rect(pos.x - w/2, pos.y - h/2, w, h, 8);

    // Label
    noStroke();
    fill('white');
    textAlign(CENTER, CENTER);
    textSize(11);

    // Word wrap for long names
    let words = componentNames[i].split(' ');
    if (words.length <= 2) {
      text(componentNames[i], pos.x, pos.y);
    } else {
      let line1 = words.slice(0, Math.ceil(words.length/2)).join(' ');
      let line2 = words.slice(Math.ceil(words.length/2)).join(' ');
      text(line1, pos.x, pos.y - 7);
      text(line2, pos.x, pos.y + 7);
    }
  }
}

function drawInfoPanel() {
  let panelX = canvasWidth * 0.58;
  let panelW = canvasWidth * 0.40;
  let panelY = 45;
  let panelH = drawHeight - 55;

  // Panel background
  fill('white');
  stroke('silver');
  strokeWeight(1);
  rect(panelX, panelY, panelW, panelH, 5);

  let p = patterns[selectedPattern];
  let tx = panelX + 12;
  let ty = panelY + 15;
  let maxW = panelW - 24;

  // Pattern name
  noStroke();
  fill('#333');
  textAlign(LEFT, TOP);
  textSize(16);
  text(p.name, tx, ty);
  ty += 25;

  // Description
  fill('#555');
  textSize(12);
  ty = drawWrappedText(p.description, tx, ty, maxW, 16);
  ty += 10;

  // Code snippet
  fill('#F5F5F5');
  stroke('#DDD');
  let codeH = min(140, panelH - (ty - panelY) - 100);
  rect(tx - 2, ty, maxW, codeH, 3);

  noStroke();
  fill('#2C3E50');
  textSize(10);
  textFont('monospace');
  let codeLines = p.code.split('\n');
  for (let i = 0; i < codeLines.length && i * 13 < codeH - 10; i++) {
    text(codeLines[i], tx + 5, ty + 8 + i * 13);
  }
  textFont('Arial');
  ty += codeH + 12;

  // Best for
  fill('#333');
  textSize(13);
  text('Best for:', tx, ty);
  ty += 18;

  fill('#555');
  textSize(11);
  for (let b of p.bestFor) {
    if (ty + 15 > panelY + panelH - 5) break;
    text('• ' + b, tx + 5, ty);
    ty += 16;
  }
}

function drawWrappedText(txt, x, y, maxW, lineH) {
  let words = txt.split(' ');
  let currentLine = '';
  let cy = y;

  for (let word of words) {
    let testLine = currentLine ? currentLine + ' ' + word : word;
    if (textWidth(testLine) > maxW && currentLine) {
      text(currentLine, x, cy);
      cy += lineH;
      currentLine = word;
    } else {
      currentLine = testLine;
    }
  }
  if (currentLine) {
    text(currentLine, x, cy);
    cy += lineH;
  }
  return cy;
}

function drawTooltip() {
  if (hoveredComponent >= 0) {
    let tip = responsibilities[hoveredComponent];
    let tipW = min(250, canvasWidth * 0.4);
    let tipH = 50;
    let tx = mouseX + 15;
    let ty = mouseY - 10;

    // Keep on screen
    if (tx + tipW > canvasWidth) tx = mouseX - tipW - 10;
    if (ty + tipH > drawHeight) ty = mouseY - tipH - 10;
    if (ty < 0) ty = 5;

    fill(0, 0, 0, 200);
    noStroke();
    rect(tx, ty, tipW, tipH, 5);

    fill('white');
    textSize(11);
    textAlign(LEFT, TOP);
    drawWrappedTextInBox(tip, tx + 8, ty + 8, tipW - 16);
  }
}

function drawWrappedTextInBox(txt, x, y, maxW) {
  let words = txt.split(' ');
  let currentLine = '';
  let cy = y;

  for (let word of words) {
    let testLine = currentLine ? currentLine + ' ' + word : word;
    if (textWidth(testLine) > maxW && currentLine) {
      text(currentLine, x, cy);
      cy += 14;
      currentLine = word;
    } else {
      currentLine = testLine;
    }
  }
  if (currentLine) text(currentLine, x, cy);
}

function lightenColor(hexColor) {
  let c = color(hexColor);
  return lerpColor(c, color(255), 0.3);
}

function mousePressed() {
  // Check tab clicks
  let tabW = min(180, (canvasWidth * 0.6 - 40) / 3);
  let tabStartX = 20;
  let tabY = drawHeight + 8;

  for (let i = 0; i < patterns.length; i++) {
    let tx = tabStartX + i * (tabW + 8);
    if (mouseX >= tx && mouseX <= tx + tabW && mouseY >= tabY && mouseY <= tabY + 32) {
      if (i !== selectedPattern) {
        prevPositions = componentPositions.map(p => ({...p}));
        selectedPattern = i;
        targetPositions = calculatePositions(i);
        animProgress = 0;
      }
      break;
    }
  }
}

function mouseMoved() {
  hoveredComponent = -1;
  let w = 90, h = 40;
  for (let i = 0; i < 5; i++) {
    let pos = componentPositions[i];
    if (mouseX >= pos.x - w/2 && mouseX <= pos.x + w/2 &&
        mouseY >= pos.y - h/2 && mouseY <= pos.y + h/2) {
      hoveredComponent = i;
      break;
    }
  }
}

function easeInOut(t) {
  return t < 0.5 ? 2 * t * t : 1 - pow(-2 * t + 2, 2) / 2;
}

function windowResized() {
  updateCanvasSize();
  resizeCanvas(containerWidth, containerHeight);
  targetPositions = calculatePositions(selectedPattern);
  componentPositions = targetPositions.map(p => ({...p}));
  animProgress = 1;
  redraw();
}

function updateCanvasSize() {
  const container = document.querySelector('main').getBoundingClientRect();
  containerWidth = Math.floor(container.width);
  canvasWidth = containerWidth;
}
