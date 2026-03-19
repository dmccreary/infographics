// Browser DevTools Navigator
// Identify key DevTools panels and their purposes
// Bloom Level: Remember (L1)

let containerWidth;
let canvasWidth = 400;
let drawHeight = 400;
let canvasHeight = drawHeight;

let selectedTab = 0;
let hoveredTab = -1;

let tabs = [
  {
    name: 'Console',
    shortcut: 'Ctrl+Shift+J',
    color: [66, 133, 244],
    uses: [
      'View JavaScript errors and warnings in your MicroSim',
      'Test JavaScript expressions interactively',
      'Debug variable values with console.log()',
      'Check p5.js error messages and stack traces'
    ]
  },
  {
    name: 'Elements',
    shortcut: 'Ctrl+Shift+C',
    color: [128, 90, 213],
    uses: [
      'Inspect the DOM structure of your HTML page',
      'Edit CSS styles live to test layout changes',
      'Find the canvas element and its parent container',
      'Debug iframe embedding issues'
    ]
  },
  {
    name: 'Network',
    shortcut: 'Ctrl+Shift+E',
    color: [52, 168, 83],
    uses: [
      'Verify p5.js library loads from CDN correctly',
      'Check if image assets (PNG, SVG) load without errors',
      'Monitor data.json fetch requests',
      'Diagnose CORS issues with external resources'
    ]
  },
  {
    name: 'Performance',
    shortcut: 'Ctrl+Shift+E',
    color: [251, 140, 0],
    uses: [
      'Profile draw() frame rate to find slow rendering',
      'Identify layout thrashing from DOM manipulation',
      'Check if animations maintain 60fps',
      'Find memory leaks in long-running simulations'
    ]
  }
];

function setup() {
  updateCanvasSize();
  const canvas = createCanvas(canvasWidth, canvasHeight);
  canvas.parent(document.querySelector('main'));
  buildControls();
  describe('Simulated browser developer tools window with four clickable tabs: Console, Elements, Network, and Performance, each showing a preview and description.');
}

function buildControls() {
  let mainEl = document.querySelector('main');
  let controlDiv = document.createElement('div');
  controlDiv.id = 'devtools-controls';
  controlDiv.style.cssText = 'background: white; border: 1px solid silver; padding: 12px; font-family: Arial, sans-serif; font-size: 14px;';
  mainEl.appendChild(controlDiv);

  let infoDiv = document.createElement('div');
  infoDiv.id = 'panel-info';
  infoDiv.style.cssText = 'padding: 10px; background: #f8f9fa; border-radius: 6px; line-height: 1.6; font-size: 14px; color: #333;';
  controlDiv.appendChild(infoDiv);
  updateInfo();
}

function updateInfo() {
  let infoDiv = document.getElementById('panel-info');
  if (!infoDiv) return;
  let t = tabs[selectedTab];
  let html = '<strong style="color:rgb(' + t.color.join(',') + ')">' + t.name + ' Panel</strong>' +
    ' &nbsp;<span style="background:#eee;padding:2px 8px;border-radius:3px;font-family:monospace;font-size:12px;">' + t.shortcut + '</span>' +
    '<br/><strong>Uses for infographic development:</strong><ul style="margin:4px 0;padding-left:20px;">';
  t.uses.forEach(function(u) { html += '<li>' + u + '</li>'; });
  html += '</ul>';
  infoDiv.innerHTML = html;
}

function draw() {
  updateCanvasSize();

  // Dark DevTools background
  fill(36, 36, 36);
  noStroke();
  rect(0, 0, canvasWidth, drawHeight);

  // Browser chrome bar
  fill(50, 50, 50);
  rect(0, 0, canvasWidth, 28);
  fill(180);
  textAlign(LEFT, CENTER);
  textSize(12);
  noStroke();
  text('DevTools — https://textbook.github.io/sims/cell-biology/', 10, 14);

  // Close/minimize icons
  fill(229, 57, 53);
  ellipse(canvasWidth - 16, 14, 10, 10);
  fill(251, 191, 0);
  ellipse(canvasWidth - 32, 14, 10, 10);
  fill(52, 168, 83);
  ellipse(canvasWidth - 48, 14, 10, 10);

  // Tab bar
  let tabY = 28;
  let tabH = 32;
  fill(42, 42, 42);
  noStroke();
  rect(0, tabY, canvasWidth, tabH);

  hoveredTab = -1;
  let tabW = canvasWidth / tabs.length;
  for (let i = 0; i < tabs.length; i++) {
    let tx = i * tabW;
    let isHover = mouseX > tx && mouseX < tx + tabW && mouseY > tabY && mouseY < tabY + tabH;
    if (isHover) hoveredTab = i;
    let isSelected = (selectedTab === i);

    if (isSelected) {
      fill(tabs[i].color[0], tabs[i].color[1], tabs[i].color[2], 30);
      rect(tx, tabY, tabW, tabH);
      // Active indicator
      fill(tabs[i].color[0], tabs[i].color[1], tabs[i].color[2]);
      rect(tx, tabY + tabH - 3, tabW, 3);
    } else if (isHover) {
      fill(60, 60, 60);
      rect(tx, tabY, tabW, tabH);
    }

    fill(isSelected ? 255 : (isHover ? 220 : 160));
    noStroke();
    textAlign(CENTER, CENTER);
    textSize(14);
    text(tabs[i].name, tx + tabW / 2, tabY + tabH / 2);
  }

  // Preview area
  let previewY = tabY + tabH + 4;
  let previewH = drawHeight - previewY - 4;

  if (selectedTab === 0) drawConsolePreview(previewY, previewH);
  else if (selectedTab === 1) drawElementsPreview(previewY, previewH);
  else if (selectedTab === 2) drawNetworkPreview(previewY, previewH);
  else if (selectedTab === 3) drawPerformancePreview(previewY, previewH);
}

function drawConsolePreview(py, ph) {
  let lines = [
    { text: '> p5.js v1.11.10 loaded', color: [200, 200, 200] },
    { text: '[INFO] Canvas created: 800x600', color: [130, 190, 255] },
    { text: '> console.log(mouseX, mouseY)', color: [200, 200, 200] },
    { text: '245 180', color: [200, 200, 200] },
    { text: '⚠ Warning: createCanvas() already called', color: [255, 200, 50] },
    { text: '✗ Uncaught TypeError: ellipse is not defined', color: [255, 100, 100] },
    { text: '    at draw (sketch.js:47:5)', color: [180, 180, 180] },
    { text: '> regions.forEach(r => console.log(r.name))', color: [200, 200, 200] },
    { text: 'Nucleus', color: [130, 255, 130] },
    { text: 'Mitochondria', color: [130, 255, 130] },
    { text: 'Ribosome', color: [130, 255, 130] }
  ];

  let lineH = 22;
  for (let i = 0; i < min(lines.length, floor(ph / lineH)); i++) {
    let ly = py + 8 + i * lineH;
    if (lines[i].text.startsWith('✗')) {
      fill(80, 30, 30);
      noStroke();
      rect(4, ly - 2, canvasWidth - 8, lineH - 2);
    } else if (lines[i].text.startsWith('⚠')) {
      fill(60, 50, 20);
      noStroke();
      rect(4, ly - 2, canvasWidth - 8, lineH - 2);
    }
    fill(lines[i].color[0], lines[i].color[1], lines[i].color[2]);
    noStroke();
    textAlign(LEFT, TOP);
    textSize(12);
    text(lines[i].text, 12, ly);
  }
}

function drawElementsPreview(py, ph) {
  let lines = [
    { text: '<html lang="en">', indent: 0, color: [180, 130, 255] },
    { text: '<head>...</head>', indent: 1, color: [150, 150, 150] },
    { text: '<body>', indent: 1, color: [180, 130, 255] },
    { text: '<main>', indent: 2, color: [180, 130, 255] },
    { text: '<canvas width="800" height="600">', indent: 3, color: [130, 200, 255] },
    { text: '  class="p5Canvas"', indent: 3, color: [130, 255, 130] },
    { text: '</canvas>', indent: 3, color: [130, 200, 255] },
    { text: '<div id="controls">', indent: 3, color: [180, 130, 255] },
    { text: '<input type="range">', indent: 4, color: [255, 200, 130] },
    { text: '<button>Reset</button>', indent: 4, color: [255, 200, 130] },
    { text: '</div>', indent: 3, color: [180, 130, 255] },
    { text: '</main>', indent: 2, color: [180, 130, 255] }
  ];

  let lineH = 22;
  for (let i = 0; i < min(lines.length, floor(ph / lineH)); i++) {
    let ly = py + 8 + i * lineH;
    if (i === 4) {
      fill(50, 60, 80);
      noStroke();
      rect(4, ly - 2, canvasWidth - 8, lineH * 2);
    }
    fill(lines[i].color[0], lines[i].color[1], lines[i].color[2]);
    noStroke();
    textAlign(LEFT, TOP);
    textSize(12);
    text(lines[i].text, 12 + lines[i].indent * 16, ly);
  }
}

function drawNetworkPreview(py, ph) {
  let requests = [
    { name: 'main.html', type: 'doc', size: '2.1 KB', time: 45, status: 200, color: [130, 200, 255] },
    { name: 'p5.min.js', type: 'script', size: '892 KB', time: 120, status: 200, color: [255, 200, 130] },
    { name: 'sketch.js', type: 'script', size: '4.5 KB', time: 35, status: 200, color: [255, 200, 130] },
    { name: 'cell-diagram.png', type: 'img', size: '156 KB', time: 85, status: 200, color: [180, 130, 255] },
    { name: 'data.json', type: 'fetch', size: '1.2 KB', time: 25, status: 200, color: [130, 255, 130] },
    { name: 'missing-font.woff2', type: 'font', size: '—', time: 0, status: 404, color: [255, 100, 100] }
  ];

  // Header
  fill(50, 50, 50);
  noStroke();
  rect(4, py + 4, canvasWidth - 8, 20);
  fill(160);
  textAlign(LEFT, CENTER);
  textSize(11);
  text('Name', 12, py + 14);
  text('Type', canvasWidth * 0.4, py + 14);
  text('Size', canvasWidth * 0.55, py + 14);
  text('Time', canvasWidth * 0.7, py + 14);
  text('Waterfall', canvasWidth * 0.82, py + 14);

  let lineH = 24;
  for (let i = 0; i < requests.length; i++) {
    let ly = py + 28 + i * lineH;
    let r = requests[i];

    if (r.status === 404) {
      fill(80, 30, 30);
      noStroke();
      rect(4, ly, canvasWidth - 8, lineH - 2);
    }

    fill(r.color[0], r.color[1], r.color[2]);
    noStroke();
    textAlign(LEFT, CENTER);
    textSize(11);
    text(r.name, 12, ly + lineH / 2);
    fill(160);
    text(r.type, canvasWidth * 0.4, ly + lineH / 2);
    text(r.size, canvasWidth * 0.55, ly + lineH / 2);
    text(r.time > 0 ? r.time + 'ms' : '—', canvasWidth * 0.7, ly + lineH / 2);

    // Waterfall bar
    if (r.time > 0) {
      let barX = canvasWidth * 0.82;
      let barW = (r.time / 150) * (canvasWidth * 0.15);
      fill(r.color[0], r.color[1], r.color[2], 150);
      rect(barX, ly + 6, barW, lineH - 14, 2);
    }
  }
}

function drawPerformancePreview(py, ph) {
  // Simplified flame chart
  fill(80);
  noStroke();
  textAlign(LEFT, TOP);
  textSize(11);
  text('FPS', 12, py + 8);
  text('Call Tree', 12, py + ph * 0.35);

  // FPS graph
  let graphY = py + 22;
  let graphH = ph * 0.25;
  stroke(80);
  strokeWeight(0.5);
  line(12, graphY + graphH, canvasWidth - 12, graphY + graphH);

  // 60fps line
  stroke(52, 168, 83, 100);
  let fps60Y = graphY + graphH * 0.03;
  line(12, fps60Y, canvasWidth - 12, fps60Y);
  fill(52, 168, 83, 150);
  noStroke();
  textSize(9);
  text('60fps', canvasWidth - 40, fps60Y - 2);

  // FPS data with occasional dips
  stroke(52, 168, 83);
  strokeWeight(1.5);
  noFill();
  beginShape();
  for (let x = 12; x < canvasWidth - 12; x += 3) {
    let noise_val = noise(x * 0.02, 100);
    let fps = 55 + noise_val * 10;
    if (x > canvasWidth * 0.4 && x < canvasWidth * 0.5) fps = 20 + random(10); // dip
    let y = graphY + graphH - (fps / 65) * graphH;
    vertex(x, y);
  }
  endShape();

  // Flame chart bars
  let flameY = py + ph * 0.4;
  let flames = [
    { name: 'draw()', x: 0.05, w: 0.9, depth: 0, color: [66, 133, 244] },
    { name: 'drawRegions()', x: 0.1, w: 0.35, depth: 1, color: [52, 168, 83] },
    { name: 'hitDetect()', x: 0.1, w: 0.15, depth: 2, color: [251, 140, 0] },
    { name: 'renderOverlay()', x: 0.25, w: 0.2, depth: 2, color: [128, 90, 213] },
    { name: 'drawInfobox()', x: 0.5, w: 0.25, depth: 1, color: [229, 57, 53] },
    { name: 'updateScore()', x: 0.78, w: 0.15, depth: 1, color: [0, 150, 136] }
  ];

  let barH = 18;
  for (let i = 0; i < flames.length; i++) {
    let f = flames[i];
    let fx = 12 + f.x * (canvasWidth - 24);
    let fw = f.w * (canvasWidth - 24);
    let fy = flameY + f.depth * (barH + 2);
    fill(f.color[0], f.color[1], f.color[2], 180);
    noStroke();
    rect(fx, fy, fw, barH, 2);
    fill(255);
    textAlign(LEFT, CENTER);
    textSize(10);
    if (textWidth(f.name) < fw - 4) text(f.name, fx + 4, fy + barH / 2);
  }
}

function mousePressed() {
  let tabY = 28;
  let tabH = 32;
  let tabW = canvasWidth / tabs.length;
  if (mouseY > tabY && mouseY < tabY + tabH) {
    for (let i = 0; i < tabs.length; i++) {
      if (mouseX > i * tabW && mouseX < (i + 1) * tabW) {
        selectedTab = i;
        updateInfo();
        return;
      }
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
