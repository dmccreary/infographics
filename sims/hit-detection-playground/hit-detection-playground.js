// Hit Detection Playground
// Implement and compare bounding box vs precise hit detection.
// Bloom Level: Apply (L3)

let containerWidth;
let canvasWidth = 400;
let drawHeight = 400;
let canvasHeight = drawHeight;

let testMode = 1; // 0=bounding box only, 1=precise
let showBoundingBoxes = false;
let showRay = false;
let hitShape = -1;
let hitAlgorithm = '';
let crossingCount = 0;

// Shape definitions (will be repositioned on resize)
function getShapes() {
  let w = canvasWidth - 200; // leave room for info panel
  let h = drawHeight;
  let scale = min(w / 500, h / 450);

  return [
    {
      name: 'Rectangle',
      type: 'rect',
      color: '#4A90D9',
      x: 60 * scale, y: 80 * scale,
      w: 120 * scale, h: 80 * scale
    },
    {
      name: 'Circle',
      type: 'circle',
      color: '#2ECC71',
      cx: 280 * scale, cy: 120 * scale,
      r: 55 * scale
    },
    {
      name: 'Hexagon',
      type: 'polygon',
      color: '#E67E22',
      points: hexagonPoints(150 * scale, 280 * scale, 50 * scale)
    },
    {
      name: 'L-Shape',
      type: 'polygon',
      color: '#9B59B6',
      points: lShapePoints(280 * scale, 240 * scale, scale)
    },
    {
      name: 'Triangle',
      type: 'polygon',
      color: '#E74C3C',
      points: [
        { x: 60 * scale, y: 350 * scale },
        { x: 160 * scale, y: 350 * scale },
        { x: 110 * scale, y: 260 * scale }
      ]
    },
    {
      name: 'Bezier Shape',
      type: 'bezier',
      color: '#1ABC9C',
      cx: 300 * scale, cy: 360 * scale,
      size: 50 * scale
    }
  ];
}

function hexagonPoints(cx, cy, r) {
  let pts = [];
  for (let i = 0; i < 6; i++) {
    let angle = TWO_PI / 6 * i - HALF_PI;
    pts.push({ x: cx + r * cos(angle), y: cy + r * sin(angle) });
  }
  return pts;
}

function lShapePoints(x, y, s) {
  return [
    { x: x, y: y },
    { x: x + 80 * s, y: y },
    { x: x + 80 * s, y: y + 40 * s },
    { x: x + 40 * s, y: y + 40 * s },
    { x: x + 40 * s, y: y + 100 * s },
    { x: x, y: y + 100 * s }
  ];
}

function setup() {
  updateCanvasSize();
  const canvas = createCanvas(containerWidth, canvasHeight);
  var mainElement = document.querySelector('main');
  canvas.parent(mainElement);
  textFont('Arial');
  buildControls();
}

function buildControls() {
  let mainEl = document.querySelector('main');
  let panel = document.createElement('div');
  panel.style.cssText = 'display:flex; gap:12px; padding:8px 12px; background:white; border:1px solid silver; font-family:Arial,sans-serif; font-size:13px; align-items:center; flex-wrap:wrap;';
  panel.innerHTML = `
    <label>Test Mode:
      <select id="testMode" style="padding:3px; border-radius:3px; border:1px solid #ccc;">
        <option value="0">Bounding Box Only</option>
        <option value="1" selected>Precise Detection</option>
      </select>
    </label>
    <label><input type="checkbox" id="showBB"> Show Bounding Boxes</label>
    <label><input type="checkbox" id="showRay"> Show Ray</label>
  `;
  mainEl.appendChild(panel);

  document.getElementById('testMode').addEventListener('change', function() { testMode = parseInt(this.value); });
  document.getElementById('showBB').addEventListener('change', function() { showBoundingBoxes = this.checked; });
  document.getElementById('showRay').addEventListener('change', function() { showRay = this.checked; });
}

function draw() {
  updateCanvasSize();

  fill('aliceblue');
  stroke('silver');
  strokeWeight(1);
  rect(0, 0, canvasWidth, drawHeight);

  // Title
  noStroke();
  fill('#333');
  textAlign(CENTER, TOP);
  textSize(18);
  text('Hit Detection Playground', canvasWidth / 2, 6);

  let shapes = getShapes();
  hitShape = -1;
  hitAlgorithm = '';
  crossingCount = 0;

  // Check all shapes for hit
  for (let i = 0; i < shapes.length; i++) {
    let s = shapes[i];
    let isHit = false;

    if (testMode === 0) {
      // Bounding box only
      let bb = getBoundingBox(s);
      isHit = mouseX >= bb.x && mouseX <= bb.x + bb.w && mouseY >= bb.y && mouseY <= bb.y + bb.h;
      if (isHit) hitAlgorithm = 'Bounds check';
    } else {
      // Precise detection
      let result = preciseHitTest(s, mouseX, mouseY);
      isHit = result.hit;
      if (isHit) {
        hitAlgorithm = result.algorithm;
        crossingCount = result.crossings || 0;
      }
    }

    if (isHit) hitShape = i;

    // Draw shape
    drawShape(s, isHit);

    // Draw bounding box if enabled
    if (showBoundingBoxes) {
      let bb = getBoundingBox(s);
      noFill();
      stroke('#AAA');
      strokeWeight(1);
      drawingContext.setLineDash([4, 4]);
      rect(bb.x, bb.y, bb.w, bb.h);
      drawingContext.setLineDash([]);
    }

    // Label
    noStroke();
    fill('#555');
    textAlign(CENTER, TOP);
    textSize(11);
    let bb = getBoundingBox(s);
    text(s.name, bb.x + bb.w / 2, bb.y + bb.h + 3);
  }

  // Draw ray if enabled
  if (showRay && mouseX > 0 && mouseY > 0 && mouseY < drawHeight) {
    stroke('#E74C3C');
    strokeWeight(1);
    drawingContext.setLineDash([3, 3]);
    line(mouseX, mouseY, canvasWidth - 200, mouseY);
    drawingContext.setLineDash([]);

    // Draw crossing points for polygons
    for (let s of shapes) {
      if (s.type === 'polygon') {
        let crossings = getRayCrossings(s.points, mouseX, mouseY);
        for (let cp of crossings) {
          fill('#E74C3C');
          noStroke();
          ellipse(cp.x, cp.y, 8);
        }
      }
    }
  }

  // Info panel (right side)
  drawInfoPanel(shapes);
}

function drawShape(s, isHit) {
  let alpha = isHit ? 150 : 30;
  let c = color(s.color);

  switch (s.type) {
    case 'rect':
      fill(red(c), green(c), blue(c), alpha);
      stroke(s.color);
      strokeWeight(isHit ? 3 : 2);
      rect(s.x, s.y, s.w, s.h, 3);
      break;

    case 'circle':
      fill(red(c), green(c), blue(c), alpha);
      stroke(s.color);
      strokeWeight(isHit ? 3 : 2);
      ellipse(s.cx, s.cy, s.r * 2);
      break;

    case 'polygon':
      fill(red(c), green(c), blue(c), alpha);
      stroke(s.color);
      strokeWeight(isHit ? 3 : 2);
      beginShape();
      for (let p of s.points) vertex(p.x, p.y);
      endShape(CLOSE);
      break;

    case 'bezier':
      fill(red(c), green(c), blue(c), alpha);
      stroke(s.color);
      strokeWeight(isHit ? 3 : 2);
      // Draw a curved blob shape
      beginShape();
      let steps = 36;
      for (let i = 0; i < steps; i++) {
        let angle = TWO_PI * i / steps;
        let r = s.size * (1 + 0.3 * sin(angle * 3));
        vertex(s.cx + r * cos(angle), s.cy + r * sin(angle));
      }
      endShape(CLOSE);
      break;
  }
}

function getBoundingBox(s) {
  switch (s.type) {
    case 'rect':
      return { x: s.x, y: s.y, w: s.w, h: s.h };
    case 'circle':
      return { x: s.cx - s.r, y: s.cy - s.r, w: s.r * 2, h: s.r * 2 };
    case 'polygon':
      let minX = Infinity, minY = Infinity, maxX = -Infinity, maxY = -Infinity;
      for (let p of s.points) {
        minX = min(minX, p.x); minY = min(minY, p.y);
        maxX = max(maxX, p.x); maxY = max(maxY, p.y);
      }
      return { x: minX, y: minY, w: maxX - minX, h: maxY - minY };
    case 'bezier':
      let maxR = s.size * 1.3;
      return { x: s.cx - maxR, y: s.cy - maxR, w: maxR * 2, h: maxR * 2 };
    default:
      return { x: 0, y: 0, w: 0, h: 0 };
  }
}

function preciseHitTest(s, mx, my) {
  switch (s.type) {
    case 'rect':
      return {
        hit: mx >= s.x && mx <= s.x + s.w && my >= s.y && my <= s.y + s.h,
        algorithm: 'Bounds check'
      };

    case 'circle':
      return {
        hit: dist(mx, my, s.cx, s.cy) <= s.r,
        algorithm: 'Distance test'
      };

    case 'polygon':
      let crossings = getRayCrossings(s.points, mx, my);
      return {
        hit: crossings.length % 2 === 1,
        algorithm: 'Ray casting',
        crossings: crossings.length
      };

    case 'bezier':
      // Use distance from center with radius modulation
      let angle = atan2(my - s.cy, mx - s.cx);
      let r = s.size * (1 + 0.3 * sin(angle * 3));
      return {
        hit: dist(mx, my, s.cx, s.cy) <= r,
        algorithm: 'Parametric distance'
      };

    default:
      return { hit: false, algorithm: '' };
  }
}

function getRayCrossings(points, mx, my) {
  let crossings = [];
  let n = points.length;

  for (let i = 0; i < n; i++) {
    let p1 = points[i];
    let p2 = points[(i + 1) % n];

    // Check if ray from (mx, my) going right crosses this edge
    if ((p1.y <= my && p2.y > my) || (p2.y <= my && p1.y > my)) {
      let t = (my - p1.y) / (p2.y - p1.y);
      let crossX = p1.x + t * (p2.x - p1.x);
      if (crossX > mx) {
        crossings.push({ x: crossX, y: my });
      }
    }
  }
  return crossings;
}

function drawInfoPanel(shapes) {
  let panelX = canvasWidth - 190;
  let panelY = 30;
  let panelW = 180;
  let panelH = drawHeight - 40;

  fill('white');
  stroke('silver');
  strokeWeight(1);
  rect(panelX, panelY, panelW, panelH, 5);

  noStroke();
  let tx = panelX + 10;
  let ty = panelY + 12;

  // Mouse coordinates
  fill('#888');
  textAlign(LEFT, TOP);
  textSize(11);
  text('Mouse:', tx, ty);
  fill('#333');
  textSize(13);
  text('(' + mouseX + ', ' + mouseY + ')', tx, ty + 15);
  ty += 40;

  // Hit result
  fill('#888');
  textSize(11);
  text('Inside:', tx, ty);
  if (hitShape >= 0) {
    fill(shapes[hitShape].color);
    textSize(14);
    text(shapes[hitShape].name, tx, ty + 16);
  } else {
    fill('#AAA');
    textSize(14);
    text('none', tx, ty + 16);
  }
  ty += 45;

  // Algorithm
  fill('#888');
  textSize(11);
  text('Algorithm:', tx, ty);
  fill('#333');
  textSize(13);
  text(hitAlgorithm || '—', tx, ty + 16);
  ty += 45;

  // Crossings (for polygon)
  if (hitAlgorithm === 'Ray casting') {
    fill('#888');
    textSize(11);
    text('Edge crossings:', tx, ty);
    fill(crossingCount % 2 === 1 ? '#2ECC71' : '#E74C3C');
    textSize(14);
    text(crossingCount + (crossingCount % 2 === 1 ? ' (odd → inside)' : ' (even → outside)'), tx, ty + 16);
    ty += 45;
  }

  // Mode indicator
  ty = panelY + panelH - 50;
  fill('#888');
  textSize(11);
  text('Mode:', tx, ty);
  fill(testMode === 1 ? '#2ECC71' : '#E67E22');
  textSize(12);
  text(testMode === 1 ? 'Precise' : 'Bounding Box', tx, ty + 16);

  if (testMode === 0) {
    fill('#E67E22');
    textSize(10);
    text('⚠ False positives possible', tx, ty + 32);
  }
}

function windowResized() {
  updateCanvasSize();
  resizeCanvas(containerWidth, canvasHeight);
  redraw();
}

function updateCanvasSize() {
  const container = document.querySelector('main').getBoundingClientRect();
  containerWidth = Math.floor(container.width);
  canvasWidth = containerWidth;
}
