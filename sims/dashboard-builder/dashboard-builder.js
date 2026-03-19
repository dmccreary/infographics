// Educational Dashboard Builder
// Drag chart types into a 3x2 grid to build a dashboard
// Bloom Level: Create (L6)

let containerWidth;
let canvasWidth = 400;
let drawHeight = 480;
let canvasHeight = drawHeight;

let gridCols = 3;
let gridRows = 2;
let grid = []; // 6 cells, each null or {type, dataSource, colorScheme}
let selectedCell = -1;
let hoveredCell = -1;
let hoveredPalette = -1;

let chartTypes = ['Bar', 'Line', 'Pie', 'Donut', 'Gauge', 'Sparkline'];
let chartColors = [
  [66, 133, 244],
  [52, 168, 83],
  [251, 140, 0],
  [229, 57, 53],
  [128, 90, 213],
  [0, 150, 136]
];

let dataSources = ['Enrollment', 'Engagement', 'Scores', 'Completion', 'Quality'];
let sampleData = {
  'Enrollment': [120, 95, 140, 110, 130, 100, 145, 125],
  'Engagement': [78, 82, 65, 88, 72, 90, 85, 70],
  'Scores': [85, 72, 90, 68, 95, 78, 82, 88],
  'Completion': [92, 85, 78, 95, 70, 88, 82, 90],
  'Quality': [75, 82, 90, 65, 88, 78, 85, 72]
};

let draggingType = -1;
let dragX = 0, dragY = 0;

function setup() {
  updateCanvasSize();
  const canvas = createCanvas(canvasWidth, canvasHeight);
  canvas.parent(document.querySelector('main'));
  for (let i = 0; i < 6; i++) grid.push(null);
  buildControls();
  describe('Dashboard builder with a chart type palette on the left and a 3x2 grid where users place and configure mini chart visualizations.');
}

function buildControls() {
  let mainEl = document.querySelector('main');
  let controlDiv = document.createElement('div');
  controlDiv.id = 'dashboard-controls';
  controlDiv.style.cssText = 'background: white; border: 1px solid silver; padding: 12px; font-family: Arial, sans-serif; font-size: 14px;';
  mainEl.appendChild(controlDiv);

  let row = document.createElement('div');
  row.style.cssText = 'display: flex; flex-wrap: wrap; gap: 8px; align-items: center; justify-content: center; margin-bottom: 8px;';

  let templateBtn = document.createElement('button');
  templateBtn.textContent = 'Load Template';
  templateBtn.style.cssText = 'padding: 6px 14px; font-size: 14px; cursor: pointer; border: 1px solid #4285F4; border-radius: 4px; background: #4285F4; color: white; font-weight: bold;';
  templateBtn.addEventListener('click', loadTemplate);
  row.appendChild(templateBtn);

  let clearBtn = document.createElement('button');
  clearBtn.textContent = 'Clear All';
  clearBtn.style.cssText = 'padding: 6px 14px; font-size: 14px; cursor: pointer; border: 1px solid silver; border-radius: 4px; background: #f0f0f0;';
  clearBtn.addEventListener('click', function() {
    for (let i = 0; i < 6; i++) grid[i] = null;
    selectedCell = -1;
    updateConfigPanel();
  });
  row.appendChild(clearBtn);

  controlDiv.appendChild(row);

  // Config panel for selected cell
  let configDiv = document.createElement('div');
  configDiv.id = 'config-panel';
  configDiv.style.cssText = 'padding: 8px; background: #f8f9fa; border-radius: 6px; font-size: 14px; color: #333; min-height: 30px;';
  configDiv.innerHTML = '<em>Click a chart type on the left, then click a grid cell to place it. Click a filled cell to configure.</em>';
  controlDiv.appendChild(configDiv);
}

function updateConfigPanel() {
  let configDiv = document.getElementById('config-panel');
  if (!configDiv) return;
  if (selectedCell < 0 || !grid[selectedCell]) {
    configDiv.innerHTML = '<em>Click a chart type on the left, then click a grid cell to place it. Click a filled cell to configure.</em>';
    return;
  }
  let cell = grid[selectedCell];
  let html = '<strong>Cell ' + (selectedCell + 1) + ': ' + cell.type + ' Chart</strong> &nbsp;';

  // Data source selector
  html += 'Data: <select id="data-select" style="padding:2px 6px;font-size:13px;border:1px solid silver;border-radius:3px;">';
  dataSources.forEach(function(ds) {
    html += '<option value="' + ds + '"' + (cell.dataSource === ds ? ' selected' : '') + '>' + ds + '</option>';
  });
  html += '</select> &nbsp;';

  // Remove button
  html += '<button id="remove-cell" style="padding:2px 10px;font-size:12px;cursor:pointer;border:1px solid #E53935;border-radius:3px;background:#E53935;color:white;">Remove</button>';

  configDiv.innerHTML = html;

  document.getElementById('data-select').addEventListener('change', function(e) {
    grid[selectedCell].dataSource = e.target.value;
  });
  document.getElementById('remove-cell').addEventListener('click', function() {
    grid[selectedCell] = null;
    selectedCell = -1;
    updateConfigPanel();
  });
}

function loadTemplate() {
  grid[0] = { type: 'Line', dataSource: 'Enrollment' };
  grid[1] = { type: 'Gauge', dataSource: 'Completion' };
  grid[2] = { type: 'Pie', dataSource: 'Quality' };
  grid[3] = { type: 'Bar', dataSource: 'Engagement' };
  grid[4] = { type: 'Donut', dataSource: 'Scores' };
  grid[5] = { type: 'Sparkline', dataSource: 'Completion' };
  selectedCell = -1;
  updateConfigPanel();
}

function draw() {
  updateCanvasSize();

  fill('aliceblue');
  stroke('silver');
  strokeWeight(1);
  rect(0, 0, canvasWidth, drawHeight);

  // Title
  fill('black');
  noStroke();
  textAlign(CENTER, TOP);
  textSize(16);
  text('Educational Dashboard Builder', canvasWidth / 2, 6);

  // Layout
  let paletteW = 80;
  let gridX = paletteW + 10;
  let gridY = 30;
  let gridW = canvasWidth - gridX - 10;
  let gridH = drawHeight - gridY - 10;
  let cellW = gridW / gridCols;
  let cellH = gridH / gridRows;

  // Draw palette
  hoveredPalette = -1;
  fill(250);
  stroke(200);
  strokeWeight(1);
  rect(5, gridY, paletteW - 5, gridH, 6);

  fill(80);
  noStroke();
  textAlign(CENTER, TOP);
  textSize(11);
  text('Chart Types', paletteW / 2 + 2, gridY + 4);

  let palItemH = (gridH - 24) / chartTypes.length;
  for (let i = 0; i < chartTypes.length; i++) {
    let py = gridY + 20 + i * palItemH;
    let isHover = mouseX > 8 && mouseX < paletteW - 2 && mouseY > py && mouseY < py + palItemH - 4;
    if (isHover) hoveredPalette = i;

    fill(isHover ? color(chartColors[i][0], chartColors[i][1], chartColors[i][2], 30) : 255);
    stroke(chartColors[i][0], chartColors[i][1], chartColors[i][2]);
    strokeWeight(isHover ? 2 : 1);
    rect(8, py, paletteW - 14, palItemH - 4, 4);

    fill(chartColors[i][0], chartColors[i][1], chartColors[i][2]);
    noStroke();
    textAlign(CENTER, CENTER);
    textSize(12);
    text(chartTypes[i], paletteW / 2 + 2, py + (palItemH - 4) / 2);
  }

  // Draw grid
  hoveredCell = -1;
  for (let r = 0; r < gridRows; r++) {
    for (let c = 0; c < gridCols; c++) {
      let idx = r * gridCols + c;
      let cx = gridX + c * cellW;
      let cy = gridY + r * cellH;

      let isHover = mouseX > cx && mouseX < cx + cellW && mouseY > cy && mouseY < cy + cellH;
      if (isHover) hoveredCell = idx;
      let isSelected = (selectedCell === idx);

      fill(grid[idx] ? 255 : (isHover ? 245 : 250));
      stroke(isSelected ? '#4285F4' : (isHover ? '#999' : '#ddd'));
      strokeWeight(isSelected ? 2.5 : 1);
      rect(cx + 2, cy + 2, cellW - 4, cellH - 4, 6);

      if (grid[idx]) {
        drawMiniChart(grid[idx], cx + 6, cy + 6, cellW - 12, cellH - 12);
      } else {
        fill(200);
        noStroke();
        textAlign(CENTER, CENTER);
        textSize(12);
        text('Drop\nchart here', cx + cellW / 2, cy + cellH / 2);
      }
    }
  }

  // Dragging indicator
  if (draggingType >= 0) {
    fill(chartColors[draggingType][0], chartColors[draggingType][1], chartColors[draggingType][2], 150);
    noStroke();
    rect(mouseX - 30, mouseY - 15, 60, 30, 4);
    fill(255);
    textAlign(CENTER, CENTER);
    textSize(12);
    text(chartTypes[draggingType], mouseX, mouseY);
  }
}

function drawMiniChart(cell, x, y, w, h) {
  let data = sampleData[cell.dataSource] || sampleData['Enrollment'];
  let typeIdx = chartTypes.indexOf(cell.type);
  let col = typeIdx >= 0 ? chartColors[typeIdx] : [100, 100, 100];

  // Title
  fill(col[0], col[1], col[2]);
  noStroke();
  textAlign(LEFT, TOP);
  textSize(10);
  text(cell.type + ' — ' + cell.dataSource, x + 2, y);

  let chartY = y + 14;
  let chartH = h - 16;

  if (cell.type === 'Bar') {
    let barW = (w - 4) / data.length - 1;
    let maxVal = max(data);
    for (let i = 0; i < data.length; i++) {
      let bh = (data[i] / maxVal) * chartH;
      fill(col[0], col[1], col[2], 180);
      noStroke();
      rect(x + 2 + i * (barW + 1), chartY + chartH - bh, barW, bh, 1);
    }
  } else if (cell.type === 'Line') {
    let maxVal = max(data);
    stroke(col[0], col[1], col[2]);
    strokeWeight(1.5);
    noFill();
    beginShape();
    for (let i = 0; i < data.length; i++) {
      let px = x + 2 + (i / (data.length - 1)) * (w - 4);
      let py = chartY + chartH - (data[i] / maxVal) * chartH;
      vertex(px, py);
    }
    endShape();
    // Area fill
    fill(col[0], col[1], col[2], 30);
    noStroke();
    beginShape();
    vertex(x + 2, chartY + chartH);
    for (let i = 0; i < data.length; i++) {
      let px = x + 2 + (i / (data.length - 1)) * (w - 4);
      let py = chartY + chartH - (data[i] / maxVal) * chartH;
      vertex(px, py);
    }
    vertex(x + w - 2, chartY + chartH);
    endShape(CLOSE);
  } else if (cell.type === 'Pie') {
    let cx = x + w / 2;
    let cy = chartY + chartH / 2;
    let r = min(w, chartH) / 2 - 4;
    let total = data.reduce(function(a, b) { return a + b; }, 0);
    let startAngle = -HALF_PI;
    let hues = [0, 45, 90, 135, 180, 225, 270, 315];
    for (let i = 0; i < data.length; i++) {
      let sweep = (data[i] / total) * TWO_PI;
      fill(color('hsla(' + hues[i] + ',60%,55%,0.7)'));
      stroke(255);
      strokeWeight(0.5);
      arc(cx, cy, r * 2, r * 2, startAngle, startAngle + sweep, PIE);
      startAngle += sweep;
    }
  } else if (cell.type === 'Donut') {
    let cx = x + w / 2;
    let cy = chartY + chartH / 2;
    let r = min(w, chartH) / 2 - 4;
    let total = data.reduce(function(a, b) { return a + b; }, 0);
    let startAngle = -HALF_PI;
    let hues = [0, 45, 90, 135, 180, 225, 270, 315];
    for (let i = 0; i < data.length; i++) {
      let sweep = (data[i] / total) * TWO_PI;
      fill(color('hsla(' + hues[i] + ',60%,55%,0.7)'));
      stroke(255);
      strokeWeight(0.5);
      arc(cx, cy, r * 2, r * 2, startAngle, startAngle + sweep, PIE);
      startAngle += sweep;
    }
    fill('aliceblue');
    noStroke();
    ellipse(cx, cy, r, r);
  } else if (cell.type === 'Gauge') {
    let cx = x + w / 2;
    let cy = chartY + chartH * 0.7;
    let r = min(w, chartH) * 0.4;
    let avg = data.reduce(function(a, b) { return a + b; }, 0) / data.length;
    let pct = avg / 100;

    noFill();
    stroke(230);
    strokeWeight(8);
    arc(cx, cy, r * 2, r * 2, PI, TWO_PI);
    stroke(col[0], col[1], col[2]);
    arc(cx, cy, r * 2, r * 2, PI, PI + PI * pct);

    fill(col[0], col[1], col[2]);
    noStroke();
    textAlign(CENTER, CENTER);
    textSize(14);
    text(Math.round(avg) + '%', cx, cy - 4);
  } else if (cell.type === 'Sparkline') {
    let maxVal = max(data);
    let minVal = min(data);
    let range = maxVal - minVal || 1;
    // Table-like display with sparkline
    for (let i = 0; i < min(data.length, 6); i++) {
      let ry = chartY + i * (chartH / 6);
      fill(i % 2 === 0 ? 250 : 255);
      noStroke();
      rect(x, ry, w, chartH / 6);
      fill(80);
      textAlign(LEFT, CENTER);
      textSize(9);
      text('Item ' + (i + 1), x + 2, ry + chartH / 12);
      // Mini bar
      let barW = (data[i] / maxVal) * (w * 0.5);
      fill(col[0], col[1], col[2], 150);
      rect(x + w * 0.35, ry + 3, barW, chartH / 6 - 6, 2);
      fill(80);
      textAlign(RIGHT, CENTER);
      textSize(9);
      text(data[i], x + w - 2, ry + chartH / 12);
    }
  }
}

function mousePressed() {
  // Check palette click
  if (hoveredPalette >= 0) {
    draggingType = hoveredPalette;
    return;
  }
  // Check grid cell click
  if (hoveredCell >= 0) {
    if (draggingType >= 0) {
      // Place chart
      grid[hoveredCell] = { type: chartTypes[draggingType], dataSource: 'Enrollment' };
      draggingType = -1;
      selectedCell = hoveredCell;
      updateConfigPanel();
    } else if (grid[hoveredCell]) {
      selectedCell = hoveredCell;
      updateConfigPanel();
    }
  }
}

function mouseReleased() {
  if (draggingType >= 0 && hoveredCell >= 0) {
    grid[hoveredCell] = { type: chartTypes[draggingType], dataSource: 'Enrollment' };
    selectedCell = hoveredCell;
    updateConfigPanel();
  }
  draggingType = -1;
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
