// Coordinate System Explorer
// Use pixel and relative coordinate systems to place elements on a canvas
// Bloom Level: Apply (L3)

let containerWidth;
let canvasWidth = 400;
let drawHeight = 400;
let canvasHeight = drawHeight;

let markers = [];
let markerCount = 0;
let showRelativeGrid = false;
let snapToGrid = false;

function setup() {
  updateCanvasSize();
  const canvas = createCanvas(canvasWidth, canvasHeight);
  canvas.parent(document.querySelector('main'));

  // Place 3 default shapes
  markers = [
    { x: 0.25, y: 0.3, color: [66, 133, 244], shape: 'circle', label: 'A' },
    { x: 0.6, y: 0.5, color: [255, 140, 0], shape: 'square', label: 'B' },
    { x: 0.45, y: 0.75, color: [52, 168, 83], shape: 'triangle', label: 'C' }
  ];

  buildControls();
  describe('Interactive coordinate system explorer showing pixel and relative coordinates with a crosshair cursor and placeable markers.');
}

function buildControls() {
  let mainEl = document.querySelector('main');
  let controlDiv = document.createElement('div');
  controlDiv.id = 'coord-controls';
  controlDiv.style.cssText = 'background: white; border: 1px solid silver; padding: 10px; font-family: Arial, sans-serif; font-size: 14px; display: flex; flex-wrap: wrap; gap: 10px; align-items: center; justify-content: center;';
  mainEl.appendChild(controlDiv);

  // Readout
  let readout = document.createElement('div');
  readout.id = 'coord-readout';
  readout.style.cssText = 'font-family: monospace; font-size: 14px; background: #f0f0f0; padding: 6px 12px; border-radius: 4px; min-width: 300px; text-align: center;';
  readout.textContent = 'Pixel: (—, —) | Relative: (—, —)';
  controlDiv.appendChild(readout);

  // Toggle grid mode
  let gridBtn = document.createElement('button');
  gridBtn.id = 'grid-btn';
  gridBtn.textContent = 'Show Relative Grid';
  gridBtn.style.cssText = 'padding: 6px 14px; font-size: 13px; cursor: pointer; border: 1px solid silver; border-radius: 4px; background: #f0f0f0;';
  gridBtn.addEventListener('click', function() {
    showRelativeGrid = !showRelativeGrid;
    gridBtn.textContent = showRelativeGrid ? 'Show Pixel Grid' : 'Show Relative Grid';
  });
  controlDiv.appendChild(gridBtn);

  // Snap toggle
  let snapLabel = document.createElement('label');
  snapLabel.style.cssText = 'display: flex; align-items: center; gap: 4px; font-size: 13px;';
  let snapCb = document.createElement('input');
  snapCb.type = 'checkbox';
  snapCb.addEventListener('change', function() { snapToGrid = snapCb.checked; });
  snapLabel.appendChild(snapCb);
  snapLabel.appendChild(document.createTextNode('Snap to Grid'));
  controlDiv.appendChild(snapLabel);

  // Place marker button
  let placeBtn = document.createElement('button');
  placeBtn.textContent = 'Place Marker';
  placeBtn.style.cssText = 'padding: 6px 14px; font-size: 13px; cursor: pointer; border: 1px solid #4285F4; border-radius: 4px; background: #4285F4; color: white;';
  placeBtn.addEventListener('click', function() {
    if (mouseX > 0 && mouseX < canvasWidth && mouseY > 0 && mouseY < drawHeight) {
      markerCount++;
      markers.push({
        x: mouseX / canvasWidth,
        y: mouseY / drawHeight,
        color: [100 + (markerCount * 37) % 155, 80 + (markerCount * 73) % 175, 60 + (markerCount * 53) % 195],
        shape: 'circle',
        label: '' + markerCount
      });
    }
  });
  controlDiv.appendChild(placeBtn);

  // Clear button
  let clearBtn = document.createElement('button');
  clearBtn.textContent = 'Clear Markers';
  clearBtn.style.cssText = 'padding: 6px 14px; font-size: 13px; cursor: pointer; border: 1px solid silver; border-radius: 4px; background: #f0f0f0;';
  clearBtn.addEventListener('click', function() {
    markers = markers.slice(0, 3); // keep default shapes
    markerCount = 0;
  });
  controlDiv.appendChild(clearBtn);
}

function draw() {
  updateCanvasSize();

  // Background
  fill('aliceblue');
  stroke('silver');
  strokeWeight(1);
  rect(0, 0, canvasWidth, drawHeight);

  // Draw grid
  let gridSpacing;
  if (showRelativeGrid) {
    gridSpacing = canvasWidth / 10;
    // Draw relative grid
    stroke(200, 210, 230);
    strokeWeight(0.5);
    for (let i = 0; i <= 10; i++) {
      let gx = i * canvasWidth / 10;
      let gy = i * drawHeight / 10;
      line(gx, 0, gx, drawHeight);
      line(0, gy, canvasWidth, gy);
    }
    // Labels
    fill(140);
    noStroke();
    textSize(10);
    textAlign(CENTER, TOP);
    for (let i = 0; i <= 10; i++) {
      text((i / 10).toFixed(1), i * canvasWidth / 10, 2);
    }
    textAlign(LEFT, CENTER);
    for (let i = 1; i <= 10; i++) {
      text((i / 10).toFixed(1), 2, i * drawHeight / 10);
    }
  } else {
    gridSpacing = 50;
    // Pixel grid
    stroke(200, 210, 230);
    strokeWeight(0.5);
    for (let gx = 0; gx <= canvasWidth; gx += gridSpacing) {
      line(gx, 0, gx, drawHeight);
    }
    for (let gy = 0; gy <= drawHeight; gy += gridSpacing) {
      line(0, gy, canvasWidth, gy);
    }
    // Labels
    fill(140);
    noStroke();
    textSize(10);
    textAlign(CENTER, TOP);
    for (let gx = 0; gx <= canvasWidth; gx += gridSpacing) {
      text(gx, gx, 2);
    }
    textAlign(LEFT, CENTER);
    for (let gy = gridSpacing; gy <= drawHeight; gy += gridSpacing) {
      text(gy, 2, gy);
    }
  }

  // Origin marker
  fill(220, 50, 50);
  noStroke();
  ellipse(0, 0, 10, 10);
  fill(180, 30, 30);
  textSize(11);
  textAlign(LEFT, TOP);
  noStroke();
  text('(0,0)', 6, 4);

  // Draw markers/shapes
  for (let i = 0; i < markers.length; i++) {
    let m = markers[i];
    let mx = m.x * canvasWidth;
    let my = m.y * drawHeight;

    fill(m.color[0], m.color[1], m.color[2]);
    stroke(m.color[0], m.color[1], m.color[2]);
    strokeWeight(2);

    if (m.shape === 'circle') {
      ellipse(mx, my, 24, 24);
    } else if (m.shape === 'square') {
      rectMode(CENTER);
      rect(mx, my, 22, 22, 3);
      rectMode(CORNER);
    } else if (m.shape === 'triangle') {
      triangle(mx, my - 13, mx - 13, my + 10, mx + 13, my + 10);
    }

    // Label
    fill('white');
    noStroke();
    textAlign(CENTER, CENTER);
    textSize(12);
    text(m.label, mx, my);

    // Coordinate label
    fill(m.color[0], m.color[1], m.color[2]);
    textAlign(LEFT, TOP);
    textSize(10);
    noStroke();
    let coordText = '(' + round(mx) + ', ' + round(my) + ')';
    text(coordText, mx + 14, my - 6);
  }

  // Crosshair at mouse position
  if (mouseX > 0 && mouseX < canvasWidth && mouseY > 0 && mouseY < drawHeight) {
    let cx = mouseX;
    let cy = mouseY;

    // Snap
    if (snapToGrid) {
      if (showRelativeGrid) {
        cx = round(cx / (canvasWidth / 10)) * (canvasWidth / 10);
        cy = round(cy / (drawHeight / 10)) * (drawHeight / 10);
      } else {
        cx = round(cx / 50) * 50;
        cy = round(cy / 50) * 50;
      }
    }

    stroke(0, 0, 0, 80);
    strokeWeight(1);
    line(cx, 0, cx, drawHeight);
    line(0, cy, canvasWidth, cy);

    // Update readout
    let readout = document.getElementById('coord-readout');
    if (readout) {
      let relX = (cx / canvasWidth).toFixed(2);
      let relY = (cy / drawHeight).toFixed(2);
      readout.textContent = 'Pixel: (' + round(cx) + ', ' + round(cy) + ') | Relative: (' + relX + ', ' + relY + ')';
    }
  }
}

function windowResized() {
  updateCanvasSize();
  resizeCanvas(canvasWidth, canvasHeight);
  redraw();
}

function updateCanvasSize() {
  const container = document.querySelector('main').getBoundingClientRect();
  containerWidth = Math.floor(container.width);
  canvasWidth = containerWidth;
}
