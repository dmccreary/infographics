// Iframe Security Model
// Step through 5 security scenarios showing iframe permissions
// Bloom Level: Understand (L2)

let containerWidth;
let canvasWidth = 400;
let drawHeight = 380;
let canvasHeight = drawHeight;

let currentScenario = 0;

let scenarios = [
  {
    name: 'Same-Origin Access',
    parentOrigin: 'textbook.edu',
    iframeOrigin: 'textbook.edu/sims/',
    arrow: 'Read parent DOM',
    arrowColor: [52, 168, 83], // green = allowed
    status: 'ALLOWED',
    mechanism: 'Same-Origin Policy',
    explanation: 'Both the parent page and the iframe are served from the same origin (textbook.edu). The same-origin policy allows full DOM access between same-origin frames, so the iframe can read and modify the parent page.'
  },
  {
    name: 'Cross-Origin DOM Access',
    parentOrigin: 'textbook.edu',
    iframeOrigin: 'cdn.example.com',
    arrow: 'Read parent DOM',
    arrowColor: [229, 57, 53], // red = blocked
    status: 'BLOCKED',
    mechanism: 'Same-Origin Policy',
    explanation: 'The iframe is loaded from a different origin (cdn.example.com). The same-origin policy blocks DOM access across different origins. The iframe cannot read or modify any content in the parent page.'
  },
  {
    name: 'postMessage Communication',
    parentOrigin: 'textbook.edu',
    iframeOrigin: 'cdn.example.com',
    arrow: 'Send height message',
    arrowColor: [52, 168, 83],
    status: 'ALLOWED',
    mechanism: 'postMessage API',
    explanation: 'The postMessage API is designed for safe cross-origin communication. The iframe can send structured messages to the parent, and the parent can listen for them. This is how MicroSims report their height for auto-resize.'
  },
  {
    name: 'CDN Script Loading',
    parentOrigin: 'textbook.edu',
    iframeOrigin: 'textbook.edu/sims/',
    arrow: 'Load p5.js from CDN',
    arrowColor: [52, 168, 83],
    status: 'ALLOWED',
    mechanism: 'CORS Headers',
    explanation: 'The CDN (jsdelivr.net) includes Access-Control-Allow-Origin: * in its response headers. This CORS header tells the browser that any origin may load this script. This is why p5.js loads from a CDN without issues.'
  },
  {
    name: 'Sandbox Restrictions',
    parentOrigin: 'textbook.edu',
    iframeOrigin: 'textbook.edu/sims/',
    arrow: 'Run JavaScript',
    arrowColor: [251, 140, 0], // yellow = conditional
    status: 'CONDITIONAL',
    mechanism: 'sandbox attribute',
    explanation: 'The HTML sandbox attribute restricts iframe capabilities. Without allow-scripts, all JavaScript is blocked. With allow-scripts, scripts can run but other restrictions (like form submission or top-level navigation) remain. MicroSim iframes typically need allow-scripts.'
  }
];

function setup() {
  updateCanvasSize();
  const canvas = createCanvas(canvasWidth, canvasHeight);
  canvas.parent(document.querySelector('main'));
  buildControls();
  describe('Visual diagram showing parent page and iframe with arrows representing security-controlled communication, cycling through 5 scenarios.');
}

function buildControls() {
  let mainEl = document.querySelector('main');
  let controlDiv = document.createElement('div');
  controlDiv.id = 'security-controls';
  controlDiv.style.cssText = 'background: white; border: 1px solid silver; padding: 12px; font-family: Arial, sans-serif; font-size: 14px;';
  mainEl.appendChild(controlDiv);

  let row = document.createElement('div');
  row.style.cssText = 'display: flex; flex-wrap: wrap; gap: 8px; align-items: center; justify-content: center; margin-bottom: 8px;';

  let prevBtn = document.createElement('button');
  prevBtn.textContent = '← Previous';
  prevBtn.style.cssText = 'padding: 6px 14px; font-size: 14px; cursor: pointer; border: 1px solid silver; border-radius: 4px; background: #f0f0f0;';
  prevBtn.addEventListener('click', function() {
    if (currentScenario > 0) { currentScenario--; updateInfo(); }
  });
  row.appendChild(prevBtn);

  let label = document.createElement('span');
  label.id = 'scenario-label';
  label.style.cssText = 'font-weight: bold; font-size: 15px; min-width: 130px; text-align: center;';
  row.appendChild(label);

  let nextBtn = document.createElement('button');
  nextBtn.textContent = 'Next →';
  nextBtn.style.cssText = 'padding: 6px 14px; font-size: 14px; cursor: pointer; border: 1px solid #4285F4; border-radius: 4px; background: #4285F4; color: white; font-weight: bold;';
  nextBtn.addEventListener('click', function() {
    if (currentScenario < scenarios.length - 1) { currentScenario++; updateInfo(); }
  });
  row.appendChild(nextBtn);

  controlDiv.appendChild(row);

  let infoDiv = document.createElement('div');
  infoDiv.id = 'scenario-info';
  infoDiv.style.cssText = 'padding: 10px; background: #f8f9fa; border-radius: 6px; line-height: 1.6; font-size: 14px; color: #333;';
  controlDiv.appendChild(infoDiv);
  updateInfo();
}

function updateInfo() {
  let label = document.getElementById('scenario-label');
  let infoDiv = document.getElementById('scenario-info');
  let s = scenarios[currentScenario];
  if (label) label.textContent = 'Scenario ' + (currentScenario + 1) + ' of ' + scenarios.length;
  if (infoDiv) {
    let statusColor = s.status === 'ALLOWED' ? '#34A853' : s.status === 'BLOCKED' ? '#E53935' : '#FB8C00';
    infoDiv.innerHTML = '<strong>' + s.name + '</strong> — ' +
      '<span style="background:' + statusColor + ';color:white;padding:2px 8px;border-radius:3px;font-size:12px;">' + s.status + '</span>' +
      '<br/><strong>Mechanism:</strong> ' + s.mechanism +
      '<br/>' + s.explanation;
  }
}

function draw() {
  updateCanvasSize();

  fill('aliceblue');
  stroke('silver');
  strokeWeight(1);
  rect(0, 0, canvasWidth, drawHeight);

  let s = scenarios[currentScenario];

  // Title
  fill('black');
  noStroke();
  textAlign(CENTER, TOP);
  textSize(16);
  text('Iframe Security Model', canvasWidth / 2, 6);
  fill(100);
  textSize(12);
  text('Scenario ' + (currentScenario + 1) + ': ' + s.name, canvasWidth / 2, 26);

  let margin = 30;
  let parentW = canvasWidth - margin * 2;
  let parentH = drawHeight - 80;
  let parentX = margin;
  let parentY = 48;

  // Parent page rectangle
  fill(255, 255, 255, 200);
  stroke(66, 133, 244);
  strokeWeight(2);
  rect(parentX, parentY, parentW, parentH, 8);

  // Parent label
  fill(66, 133, 244);
  noStroke();
  textAlign(LEFT, TOP);
  textSize(14);
  text('Parent Page', parentX + 10, parentY + 8);
  fill(100);
  textSize(11);
  text('Origin: ' + s.parentOrigin, parentX + 10, parentY + 26);

  // Iframe rectangle (inside parent)
  let iframeX = parentX + parentW * 0.15;
  let iframeY = parentY + parentH * 0.35;
  let iframeW = parentW * 0.7;
  let iframeH = parentH * 0.5;

  let isBorder = (currentScenario === 4);
  fill(240, 248, 255);
  stroke(isBorder ? [251, 140, 0] : [128, 90, 213]);
  strokeWeight(isBorder ? 3 : 2);
  if (isBorder) {
    // Dashed border for sandbox
    drawingContext.setLineDash([6, 4]);
  }
  rect(iframeX, iframeY, iframeW, iframeH, 6);
  drawingContext.setLineDash([]);

  // Iframe label
  fill(128, 90, 213);
  noStroke();
  textAlign(LEFT, TOP);
  textSize(14);
  text('Iframe (MicroSim)', iframeX + 10, iframeY + 8);
  fill(100);
  textSize(11);
  text('Origin: ' + s.iframeOrigin, iframeX + 10, iframeY + 26);

  // Sandbox badge
  if (currentScenario === 4) {
    fill(251, 140, 0);
    noStroke();
    let badgeX = iframeX + iframeW - 80;
    rect(badgeX, iframeY - 10, 75, 20, 4);
    fill(255);
    textAlign(CENTER, CENTER);
    textSize(10);
    text('sandbox', badgeX + 37, iframeY);
  }

  // Arrow
  let arrowStartX, arrowStartY, arrowEndX, arrowEndY;

  if (currentScenario === 3) {
    // CDN external arrow
    arrowStartX = canvasWidth - margin - 10;
    arrowStartY = iframeY + iframeH / 2;
    arrowEndX = iframeX + iframeW;
    arrowEndY = iframeY + iframeH / 2;

    // External CDN label
    fill(100);
    noStroke();
    textAlign(RIGHT, CENTER);
    textSize(11);
    text('cdn.jsdelivr.net', arrowStartX, arrowStartY - 14);
  } else {
    // Arrow from iframe to parent (or parent to iframe)
    arrowStartX = iframeX + iframeW / 2;
    arrowStartY = iframeY;
    arrowEndX = parentX + parentW / 2;
    arrowEndY = parentY + 44;
  }

  // Draw arrow line
  stroke(s.arrowColor[0], s.arrowColor[1], s.arrowColor[2]);
  strokeWeight(3);
  line(arrowStartX, arrowStartY, arrowEndX, arrowEndY);

  // Arrowhead
  let angle = atan2(arrowEndY - arrowStartY, arrowEndX - arrowStartX);
  fill(s.arrowColor[0], s.arrowColor[1], s.arrowColor[2]);
  noStroke();
  triangle(
    arrowEndX, arrowEndY,
    arrowEndX - cos(angle - 0.4) * 12, arrowEndY - sin(angle - 0.4) * 12,
    arrowEndX - cos(angle + 0.4) * 12, arrowEndY - sin(angle + 0.4) * 12
  );

  // Arrow label
  let labelX = (arrowStartX + arrowEndX) / 2;
  let labelY = (arrowStartY + arrowEndY) / 2;
  fill(s.arrowColor[0], s.arrowColor[1], s.arrowColor[2]);
  noStroke();
  textAlign(CENTER, CENTER);
  textSize(12);
  // Background for readability
  let tw = textWidth(s.arrow) + 12;
  fill(255, 255, 255, 220);
  noStroke();
  rect(labelX - tw / 2, labelY - 10, tw, 20, 4);
  fill(s.arrowColor[0], s.arrowColor[1], s.arrowColor[2]);
  text(s.arrow, labelX, labelY);

  // Status badge
  if (s.status === 'BLOCKED') {
    // X mark on arrow
    let midX = (arrowStartX + arrowEndX) / 2;
    let midY = (arrowStartY + arrowEndY) / 2 + 20;
    stroke(229, 57, 53);
    strokeWeight(4);
    let sz = 10;
    line(midX - sz, midY - sz, midX + sz, midY + sz);
    line(midX + sz, midY - sz, midX - sz, midY + sz);
  }

  // Shield icon for mechanism
  let shieldX = parentX + parentW - 50;
  let shieldY = parentY + 60;
  let pulse = sin(millis() * 0.004) * 3;

  fill(s.arrowColor[0], s.arrowColor[1], s.arrowColor[2], 40);
  stroke(s.arrowColor[0], s.arrowColor[1], s.arrowColor[2]);
  strokeWeight(2);
  ellipse(shieldX, shieldY, 36 + pulse, 36 + pulse);
  fill(s.arrowColor[0], s.arrowColor[1], s.arrowColor[2]);
  noStroke();
  textAlign(CENTER, CENTER);
  textSize(18);
  text('🛡', shieldX, shieldY);

  // Mechanism label
  fill(80);
  textSize(10);
  textAlign(CENTER, TOP);
  text(s.mechanism, shieldX, shieldY + 22);

  // Simple content inside iframe
  fill(200);
  noStroke();
  rect(iframeX + 15, iframeY + 46, iframeW - 30, iframeH - 60, 4);
  fill(150);
  textAlign(CENTER, CENTER);
  textSize(11);
  text('MicroSim Canvas', iframeX + iframeW / 2, iframeY + iframeH / 2 + 10);
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
