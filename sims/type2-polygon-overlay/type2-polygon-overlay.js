// Type 2 Polygon Overlay Demo
// Interactive polygon overlay with ray casting hit detection
// Bloom Level: Apply (L3) — implement polygon overlays

let containerWidth;
let canvasWidth = 400;
let drawHeight = 460;
let controlHeight = 100;
let canvasHeight = drawHeight + controlHeight;
let containerHeight = canvasHeight;
let margin = 15;

// Polygon regions for a simplified cell diagram (relative coords 0-1)
const organelles = [
  {
    id: 'membrane', label: 'Cell Membrane',
    desc: 'The outer boundary of the cell. A selective barrier that controls what enters and exits, maintaining homeostasis.',
    color: '#78909C',
    vertices: [
      [0.05,0.30],[0.10,0.12],[0.25,0.05],[0.50,0.03],[0.75,0.05],
      [0.90,0.12],[0.95,0.30],[0.97,0.50],[0.95,0.70],[0.90,0.85],
      [0.75,0.93],[0.50,0.95],[0.25,0.93],[0.10,0.85],[0.05,0.70],
      [0.03,0.50]
    ]
  },
  {
    id: 'nucleus', label: 'Nucleus',
    desc: 'The control center of the cell containing DNA. It directs all cellular activities including growth, metabolism, and reproduction.',
    color: '#5C6BC0',
    vertices: [
      [0.35,0.30],[0.42,0.25],[0.52,0.23],[0.62,0.25],[0.68,0.30],
      [0.70,0.40],[0.68,0.50],[0.62,0.55],[0.52,0.57],[0.42,0.55],
      [0.35,0.50],[0.33,0.40]
    ]
  },
  {
    id: 'mitochondria', label: 'Mitochondria',
    desc: 'The powerhouse of the cell. Converts nutrients into ATP energy through cellular respiration. Has its own DNA.',
    color: '#EF5350',
    vertices: [
      [0.72,0.25],[0.78,0.20],[0.85,0.22],[0.90,0.28],[0.91,0.36],
      [0.88,0.42],[0.82,0.44],[0.76,0.40],[0.73,0.34]
    ]
  },
  {
    id: 'er', label: 'Endoplasmic Reticulum',
    desc: 'A network of membranes involved in protein and lipid synthesis. Rough ER has ribosomes; smooth ER processes lipids.',
    color: '#66BB6A',
    vertices: [
      [0.15,0.15],[0.28,0.12],[0.34,0.16],[0.30,0.22],[0.22,0.25],
      [0.18,0.30],[0.24,0.35],[0.30,0.32],[0.33,0.20],[0.38,0.16],
      [0.32,0.12],[0.20,0.10],[0.12,0.14],[0.10,0.22],[0.14,0.30],
      [0.12,0.24]
    ]
  },
  {
    id: 'golgi', label: 'Golgi Apparatus',
    desc: 'The cell\'s packaging and shipping center. Modifies, sorts, and packages proteins and lipids for transport.',
    color: '#FFA726',
    vertices: [
      [0.15,0.60],[0.22,0.58],[0.30,0.62],[0.32,0.68],[0.28,0.74],
      [0.22,0.78],[0.16,0.80],[0.12,0.76],[0.10,0.70],[0.12,0.64]
    ]
  }
];

let hoveredRegion = -1;
let showOutlines = true;
let showVertices = false;
let showRayCast = false;

function setup() {
  updateCanvasSize();
  const canvas = createCanvas(containerWidth, containerHeight);
  canvas.parent(document.querySelector('main'));
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
  text('Type 2: Polygon Overlay Demo', canvasWidth / 2, 6);

  // Diagram area
  let diagX = margin;
  let diagY = 32;
  let diagW = canvasWidth - margin * 2;
  let diagH = drawHeight - 95;

  // Cell background
  fill('#FAFDE8');
  stroke('#E0E0E0');
  strokeWeight(1);
  rect(diagX, diagY, diagW, diagH, 8);

  // Check hover using ray casting
  hoveredRegion = -1;
  let mx = mouseX;
  let my = mouseY;
  // Check in reverse order so topmost (last drawn) is picked first
  for (let i = organelles.length - 1; i >= 0; i--) {
    let pts = getAbsoluteVertices(organelles[i], diagX, diagY, diagW, diagH);
    if (pointInPolygon(mx, my, pts)) {
      hoveredRegion = i;
      break;
    }
  }

  // Draw organelles
  for (let i = 0; i < organelles.length; i++) {
    let org = organelles[i];
    let pts = getAbsoluteVertices(org, diagX, diagY, diagW, diagH);
    let isHover = (i === hoveredRegion);

    // Fill
    if (isHover) {
      fill(org.color + '50');
      stroke(org.color);
      strokeWeight(2.5);
    } else {
      fill(org.color + '15');
      if (showOutlines) {
        stroke(org.color + '80');
        strokeWeight(1.5);
      } else {
        noStroke();
      }
    }

    beginShape();
    for (let p of pts) vertex(p[0], p[1]);
    endShape(CLOSE);

    // Label
    let cx = pts.reduce((s, p) => s + p[0], 0) / pts.length;
    let cy = pts.reduce((s, p) => s + p[1], 0) / pts.length;
    fill(isHover ? org.color : org.color + 'A0');
    noStroke();
    textAlign(CENTER, CENTER);
    textSize(isHover ? 15 : 14);
    if (isHover) textStyle(BOLD);
    text(org.label, cx, cy);
    textStyle(NORMAL);

    // Show vertices
    if (showVertices) {
      fill(org.color);
      noStroke();
      for (let p of pts) {
        circle(p[0], p[1], 5);
      }
    }
  }

  // Ray cast visualization
  if (showRayCast && mx > diagX && mx < diagX + diagW && my > diagY && my < diagY + diagH) {
    drawRayCast(mx, my, diagX, diagY, diagW, diagH);
  }

  // Control buttons
  let btnY = drawHeight - 55;
  drawButton(margin, btnY, 'Outlines: ' + (showOutlines ? 'ON' : 'OFF'), showOutlines);
  drawButton(margin + 130, btnY, 'Vertices: ' + (showVertices ? 'ON' : 'OFF'), showVertices);
  drawButton(margin + 260, btnY, 'Ray Cast: ' + (showRayCast ? 'ON' : 'OFF'), showRayCast);

  // Infobox
  let infoY = drawHeight + 8;
  if (hoveredRegion >= 0) {
    let org = organelles[hoveredRegion];
    let pts = getAbsoluteVertices(org, diagX, diagY, diagW, diagH);
    fill(org.color);
    noStroke();
    textAlign(LEFT, TOP);
    textSize(16);
    textStyle(BOLD);
    text(org.label, margin, infoY);
    textStyle(NORMAL);

    fill(100);
    textSize(11);
    textAlign(RIGHT, TOP);
    text(pts.length + ' vertices', canvasWidth - margin, infoY);

    fill(60);
    textSize(14);
    textAlign(LEFT, TOP);
    textWrap(WORD);
    text(org.desc, margin, infoY + 22, canvasWidth - margin * 2);
  } else {
    fill(120);
    noStroke();
    textAlign(CENTER, CENTER);
    textSize(14);
    text('Hover over an organelle to learn more', canvasWidth / 2, infoY + 35);
  }
}

function drawButton(bx, by, label, active) {
  let bw = 120;
  let bh = 28;
  fill(active ? '#E3F2FD' : 'white');
  stroke(active ? '#2196F3' : '#BDBDBD');
  strokeWeight(1);
  rect(bx, by, bw, bh, 6);
  fill(active ? '#1565C0' : '#616161');
  noStroke();
  textAlign(CENTER, CENTER);
  textSize(13);
  text(label, bx + bw / 2, by + bh / 2);
}

function mousePressed() {
  let btnY = drawHeight - 55;
  if (mouseY >= btnY && mouseY <= btnY + 28) {
    if (mouseX >= margin && mouseX <= margin + 120) showOutlines = !showOutlines;
    else if (mouseX >= margin + 130 && mouseX <= margin + 250) showVertices = !showVertices;
    else if (mouseX >= margin + 260 && mouseX <= margin + 380) showRayCast = !showRayCast;
  }
}

function getAbsoluteVertices(org, dx, dy, dw, dh) {
  return org.vertices.map(v => [dx + v[0] * dw, dy + v[1] * dh]);
}

// Ray casting point-in-polygon test
function pointInPolygon(px, py, pts) {
  let inside = false;
  for (let i = 0, j = pts.length - 1; i < pts.length; j = i++) {
    let xi = pts[i][0], yi = pts[i][1];
    let xj = pts[j][0], yj = pts[j][1];
    if ((yi > py) !== (yj > py) && px < (xj - xi) * (py - yi) / (yj - yi) + xi) {
      inside = !inside;
    }
  }
  return inside;
}

function drawRayCast(mx, my, diagX, diagY, diagW, diagH) {
  let rightEdge = diagX + diagW;
  // Draw the ray line
  stroke('#F44336');
  strokeWeight(1);
  drawingContext.setLineDash([3, 3]);
  line(mx, my, rightEdge, my);
  drawingContext.setLineDash([]);

  // Find intersections for all polygons
  let crossings = 0;
  let intersections = [];
  for (let org of organelles) {
    let pts = getAbsoluteVertices(org, diagX, diagY, diagW, diagH);
    for (let i = 0, j = pts.length - 1; i < pts.length; j = i++) {
      let xi = pts[i][0], yi = pts[i][1];
      let xj = pts[j][0], yj = pts[j][1];
      if ((yi > my) !== (yj > my)) {
        let ix = (xj - xi) * (my - yi) / (yj - yi) + xi;
        if (ix > mx) {
          intersections.push(ix);
          crossings++;
        }
      }
    }
  }

  // Draw intersection points
  fill('#F44336');
  noStroke();
  for (let ix of intersections) {
    circle(ix, my, 8);
  }

  // Show crossing count
  fill('#F44336');
  textAlign(LEFT, BOTTOM);
  textSize(13);
  textStyle(BOLD);
  text('Crossings: ' + crossings + (crossings % 2 === 1 ? ' (odd = inside)' : ' (even = outside)'),
    mx + 8, my - 6);
  textStyle(NORMAL);
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
