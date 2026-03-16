// Type 1 Rectangular Overlay Demo
// Interactive overlay with hover-highlight-infobox pattern
// Bloom Level: Apply (L3) — construct and interact with overlays

let containerWidth;
let canvasWidth = 400;
let drawHeight = 380;
let controlHeight = 120;
let canvasHeight = drawHeight + controlHeight;
let containerHeight = canvasHeight;
let margin = 15;

// Simulated computer architecture diagram regions (relative coordinates)
const regions = [
  { id: 'cpu', label: 'CPU', desc: 'Central Processing Unit — executes instructions and performs calculations. The brain of the computer.',
    rx: 0.05, ry: 0.08, rw: 0.28, rh: 0.35, color: '#2196F3' },
  { id: 'ram', label: 'RAM', desc: 'Random Access Memory — fast temporary storage for running programs. Data is lost when power is off.',
    rx: 0.37, ry: 0.08, rw: 0.28, rh: 0.35, color: '#4CAF50' },
  { id: 'gpu', label: 'GPU', desc: 'Graphics Processing Unit — specialized processor for rendering graphics and parallel computation.',
    rx: 0.69, ry: 0.08, rw: 0.28, rh: 0.35, color: '#FF9800' },
  { id: 'storage', label: 'Storage', desc: 'Persistent storage (SSD/HDD) for files, programs, and the operating system. Data survives power off.',
    rx: 0.05, ry: 0.52, rw: 0.28, rh: 0.35, color: '#9C27B0' },
  { id: 'network', label: 'Network', desc: 'Network Interface Card — connects the computer to local networks and the internet via Ethernet or Wi-Fi.',
    rx: 0.37, ry: 0.52, rw: 0.28, rh: 0.35, color: '#009688' },
  { id: 'power', label: 'Power Supply', desc: 'Converts AC power to DC and distributes regulated voltage to all components.',
    rx: 0.69, ry: 0.52, rw: 0.28, rh: 0.35, color: '#F44336' }
];

let hoveredRegion = -1;
let showOutlines = true;
let showCoords = false;
let highlightColor = '#FF9800';

let outlineToggle, coordToggle, colorSelect;

function setup() {
  updateCanvasSize();
  const canvas = createCanvas(containerWidth, containerHeight);
  canvas.parent(document.querySelector('main'));

  outlineToggle = createButton('Outlines: ON');
  outlineToggle.position(10, drawHeight + 8);
  outlineToggle.mousePressed(() => {
    showOutlines = !showOutlines;
    outlineToggle.html('Outlines: ' + (showOutlines ? 'ON' : 'OFF'));
  });

  coordToggle = createButton('Coords: OFF');
  coordToggle.position(130, drawHeight + 8);
  coordToggle.mousePressed(() => {
    showCoords = !showCoords;
    coordToggle.html('Coords: ' + (showCoords ? 'ON' : 'OFF'));
  });

  colorSelect = createSelect();
  colorSelect.position(240, drawHeight + 8);
  colorSelect.option('Orange');
  colorSelect.option('Blue');
  colorSelect.option('Green');
  colorSelect.option('Purple');
  colorSelect.changed(() => {
    let colors = { 'Orange': '#FF9800', 'Blue': '#2196F3', 'Green': '#4CAF50', 'Purple': '#9C27B0' };
    highlightColor = colors[colorSelect.value()] || '#FF9800';
  });
}

function draw() {
  updateCanvasSize();

  // Drawing area
  fill('aliceblue');
  stroke('silver');
  strokeWeight(1);
  rect(0, 0, canvasWidth, drawHeight);

  // Control / infobox area
  fill('white');
  rect(0, drawHeight, canvasWidth, controlHeight);

  // Title
  fill('black');
  noStroke();
  textAlign(CENTER, TOP);
  textSize(18);
  text('Type 1: Rectangular Overlay Demo', canvasWidth / 2, 6);

  // Diagram background (simulated architecture diagram)
  let diagX = margin;
  let diagY = 30;
  let diagW = canvasWidth - margin * 2;
  let diagH = drawHeight - 40;

  fill('#F5F5F5');
  stroke('#E0E0E0');
  strokeWeight(1);
  rect(diagX, diagY, diagW, diagH, 4);

  // Draw "motherboard" connecting lines
  stroke('#BDBDBD');
  strokeWeight(2);
  // Horizontal bus
  let busY = diagY + diagH * 0.47;
  line(diagX + 20, busY, diagX + diagW - 20, busY);
  // Vertical connections
  for (let r of regions) {
    let cx = diagX + (r.rx + r.rw / 2) * diagW;
    let cy = diagY + (r.ry + r.rh / 2) * diagH;
    stroke('#BDBDBD');
    strokeWeight(1);
    line(cx, cy, cx, busY);
  }

  // Check hover
  hoveredRegion = -1;
  for (let i = 0; i < regions.length; i++) {
    let r = regions[i];
    let rx = diagX + r.rx * diagW;
    let ry2 = diagY + r.ry * diagH;
    let rw = r.rw * diagW;
    let rh = r.rh * diagH;

    if (mouseX >= rx && mouseX <= rx + rw && mouseY >= ry2 && mouseY <= ry2 + rh) {
      hoveredRegion = i;
    }
  }

  // Draw region blocks and overlays
  for (let i = 0; i < regions.length; i++) {
    let r = regions[i];
    let rx = diagX + r.rx * diagW;
    let ry2 = diagY + r.ry * diagH;
    let rw = r.rw * diagW;
    let rh = r.rh * diagH;

    let isHover = (i === hoveredRegion);

    // Component block
    fill(r.color + '25');
    stroke(r.color + '60');
    strokeWeight(1);
    rect(rx, ry2, rw, rh, 6);

    // Label inside block
    fill(r.color);
    noStroke();
    textAlign(CENTER, CENTER);
    textSize(16);
    text(r.label, rx + rw / 2, ry2 + rh / 2);

    // Dashed outlines (when enabled)
    if (showOutlines && !isHover) {
      stroke(r.color + '80');
      strokeWeight(1);
      drawingContext.setLineDash([4, 4]);
      noFill();
      rect(rx, ry2, rw, rh, 6);
      drawingContext.setLineDash([]);
    }

    // Hover highlight overlay
    if (isHover) {
      fill(highlightColor + '40');
      stroke(highlightColor);
      strokeWeight(2);
      rect(rx, ry2, rw, rh, 6);

      // Label above highlight
      fill(highlightColor);
      noStroke();
      textAlign(CENTER, BOTTOM);
      textSize(14);
      textStyle(BOLD);
      text(r.label, rx + rw / 2, ry2 - 4);
      textStyle(NORMAL);
    }

    // Coordinate display
    if (showCoords) {
      fill(100);
      noStroke();
      textSize(9);
      textAlign(LEFT, TOP);
      text('(' + r.rx.toFixed(2) + ', ' + r.ry.toFixed(2) + ', ' + r.rw.toFixed(2) + ', ' + r.rh.toFixed(2) + ')',
        rx + 3, ry2 + rh - 14);
    }
  }

  // Infobox panel
  let infoY = drawHeight + 35;
  if (hoveredRegion >= 0) {
    let r = regions[hoveredRegion];

    fill(r.color);
    noStroke();
    textAlign(LEFT, TOP);
    textSize(16);
    textStyle(BOLD);
    text(r.label, margin, infoY);
    textStyle(NORMAL);

    fill(60);
    textSize(13);
    textWrap(WORD);
    text(r.desc, margin, infoY + 22, canvasWidth - margin * 2);

    if (showCoords) {
      fill(100);
      textSize(11);
      textAlign(RIGHT, TOP);
      text('rel coords: (' + r.rx + ', ' + r.ry + ', ' + r.rw + ', ' + r.rh + ')',
        canvasWidth - margin, infoY);
    }
  } else {
    fill(120);
    noStroke();
    textAlign(CENTER, CENTER);
    textSize(14);
    text('Hover over a component to learn more', canvasWidth / 2, infoY + 20);
  }

  // Control area label
  fill(100);
  noStroke();
  textAlign(LEFT, CENTER);
  textSize(12);
  text('Highlight Color:', 240, drawHeight + 22);
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
