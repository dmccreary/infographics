// Event Logging Flow Visualization
// Step through the event pipeline from user action to storage.
// Bloom Level: Understand (L2)

let containerWidth;
let canvasWidth = 400;
let drawHeight = 300;
let canvasHeight = drawHeight;

let currentStage = 0;
const stageCount = 5;

const pipelineStages = [
  {
    name: 'Student Action',
    color: '#7E57C2',
    icon: '👆',
    data: 'Student clicked region "Nucleus"\nat position (245, 180)\non the Cell Biology infographic',
    dataFormatted: [
      'Action: click',
      'Target: "Nucleus" region',
      'Position: (245, 180)',
      'Time: 14:23:15.042'
    ]
  },
  {
    name: 'Event Capture',
    color: '#42A5F5',
    icon: '⚡',
    data: '{\n  type: "click",\n  clientX: 245,\n  clientY: 180,\n  target: "canvas",\n  timestamp: 1710423135042\n}',
    dataFormatted: [
      'type: "click"',
      'clientX: 245',
      'clientY: 180',
      'target: "canvas"',
      'timestamp: 1710423135042'
    ]
  },
  {
    name: 'Data Structuring',
    color: '#66BB6A',
    icon: '📋',
    data: '{\n  type: "region-click",\n  target: "nucleus",\n  timestamp: 1710423135042,\n  details: {\n    x: 0.41, y: 0.30,\n    regionType: "polygon"\n  }\n}',
    dataFormatted: [
      'type: "region-click"',
      'target: "nucleus"',
      'timestamp: 1710423...',
      'x: 0.41, y: 0.30',
      'regionType: "polygon"'
    ]
  },
  {
    name: 'Transmission',
    color: '#FFA726',
    icon: '📡',
    data: 'window.parent.postMessage({\n  type: "microsim-event",\n  simId: "cell-biology-overlay",\n  event: {\n    type: "click",\n    target: "nucleus",\n    ...\n  }\n}, "*");',
    dataFormatted: [
      'postMessage to parent',
      'type: "microsim-event"',
      'simId: "cell-biology"',
      'payload: {click, nucleus}',
      'origin: "*"'
    ]
  },
  {
    name: 'Storage & Analysis',
    color: '#26A69A',
    icon: '💾',
    data: '{\n  actor: { name: "Student A" },\n  verb: { id: "interacted" },\n  object: {\n    id: "cell-biology-overlay",\n    definition: { name: "Cell Biology" }\n  },\n  result: {\n    region: "nucleus",\n    duration: 2.3\n  }\n}',
    dataFormatted: [
      'xAPI Statement',
      'actor: "Student A"',
      'verb: "interacted"',
      'object: "cell-biology"',
      'result: {nucleus, 2.3s}'
    ]
  }
];

// Sample MicroSim regions for interaction demo
const sampleRegions = [
  { name: 'Nucleus', x: 0.15, y: 0.15, w: 0.12, h: 0.1, color: '#7E57C2' },
  { name: 'Mitochondria', x: 0.15, y: 0.28, w: 0.12, h: 0.1, color: '#66BB6A' },
  { name: 'Ribosome', x: 0.15, y: 0.41, w: 0.12, h: 0.1, color: '#42A5F5' }
];

let eventLog = [];
let hoveredRegion = -1;

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

  // Detail panel
  let panel = document.createElement('div');
  panel.id = 'stage-detail';
  panel.style.cssText = 'background:white; border:1px solid silver; padding:15px; font-family:monospace; font-size:13px; white-space:pre-wrap; min-height:120px; line-height:1.5; color:#2C3E50;';
  mainEl.appendChild(panel);

  // Button row
  let btnRow = document.createElement('div');
  btnRow.style.cssText = 'display:flex; gap:8px; padding:8px; background:#f5f5f5; border:1px solid silver; border-top:none; align-items:center; flex-wrap:wrap;';
  btnRow.innerHTML = `
    <button id="prevBtn" style="padding:6px 14px; background:#888; color:white; border:none; border-radius:4px; cursor:pointer;">← Previous</button>
    <button id="nextBtn" style="padding:6px 14px; background:#42A5F5; color:white; border:none; border-radius:4px; cursor:pointer;">Next →</button>
    <button id="clearBtn" style="padding:6px 14px; background:#EF5350; color:white; border:none; border-radius:4px; cursor:pointer; margin-left:auto;">Clear Events</button>
  `;
  mainEl.appendChild(btnRow);

  document.getElementById('prevBtn').addEventListener('click', function(){
    if (currentStage > 0) { currentStage--; updateStageDetail(); }
  });
  document.getElementById('nextBtn').addEventListener('click', function(){
    if (currentStage < stageCount - 1) { currentStage++; updateStageDetail(); }
  });
  document.getElementById('clearBtn').addEventListener('click', function(){
    eventLog = [];
  });

  updateStageDetail();
}

function updateStageDetail() {
  let panel = document.getElementById('stage-detail');
  if (!panel) return;
  let s = pipelineStages[currentStage];
  panel.innerHTML = `<span style="color:${s.color}; font-weight:bold; font-family:Arial;">${s.icon} Stage ${currentStage + 1}: ${s.name}</span>\n\n${s.data}`;
}

function draw() {
  updateCanvasSize();

  // Background
  fill('aliceblue');
  stroke('silver');
  strokeWeight(1);
  rect(0, 0, canvasWidth, drawHeight);

  // Title
  noStroke();
  fill('#333');
  textAlign(CENTER, TOP);
  textSize(16);
  text('Event Logging Pipeline', canvasWidth / 2, 6);

  // Draw sample MicroSim area (top left)
  let simX = 15;
  let simY = 30;
  let simW = canvasWidth * 0.22;
  let simH = drawHeight - 50;

  fill('white');
  stroke('#AAA');
  strokeWeight(1);
  rect(simX, simY, simW, simH, 5);

  noStroke();
  fill('#555');
  textAlign(CENTER, TOP);
  textSize(11);
  text('Try clicking:', simX + simW / 2, simY + 5);

  // Draw sample regions
  hoveredRegion = -1;
  for (let i = 0; i < sampleRegions.length; i++) {
    let r = sampleRegions[i];
    let rx = simX + r.x * canvasWidth;
    let ry = simY + r.y * drawHeight;
    let rw = r.w * canvasWidth;
    let rh = r.h * drawHeight;

    let isHovered = mouseX >= rx && mouseX <= rx + rw && mouseY >= ry && mouseY <= ry + rh;
    if (isHovered) hoveredRegion = i;

    fill(isHovered ? r.color : lighten(r.color, 0.5));
    stroke(r.color);
    strokeWeight(isHovered ? 2 : 1);
    rect(rx, ry, rw, rh, 4);

    noStroke();
    fill(isHovered ? 'white' : '#333');
    textAlign(CENTER, CENTER);
    textSize(10);
    text(r.name, rx + rw / 2, ry + rh / 2);
  }

  // Draw pipeline stages
  let pipeX = simX + simW + 20;
  let pipeW = canvasWidth - pipeX - 15;
  let stageW = min(90, (pipeW - (stageCount - 1) * 8) / stageCount);
  let stageH = 50;
  let pipeY = 35;

  for (let i = 0; i < stageCount; i++) {
    let sx = pipeX + i * (stageW + 8);
    let sy = pipeY;
    let s = pipelineStages[i];
    let isActive = (i === currentStage);

    // Arrow to next stage
    if (i < stageCount - 1) {
      stroke(i < currentStage ? s.color : '#CCC');
      strokeWeight(2);
      let arrowX = sx + stageW;
      let arrowEndX = sx + stageW + 8;
      line(arrowX, sy + stageH / 2, arrowEndX, sy + stageH / 2);
      // Arrowhead
      noStroke();
      fill(i < currentStage ? s.color : '#CCC');
      triangle(arrowEndX, sy + stageH / 2, arrowEndX - 5, sy + stageH / 2 - 4, arrowEndX - 5, sy + stageH / 2 + 4);
    }

    // Stage box
    if (isActive) {
      stroke('#333');
      strokeWeight(2);
    } else {
      stroke('#CCC');
      strokeWeight(1);
    }
    fill(isActive ? s.color : '#F5F5F5');
    rect(sx, sy, stageW, stageH, 6);

    // Label
    noStroke();
    fill(isActive ? 'white' : '#666');
    textAlign(CENTER, CENTER);
    textSize(9);
    let nameLines = s.name.split(' ');
    if (nameLines.length <= 2) {
      text(s.name, sx + stageW / 2, sy + stageH / 2);
    } else {
      text(nameLines.slice(0, 2).join(' '), sx + stageW / 2, sy + stageH / 2 - 7);
      text(nameLines.slice(2).join(' '), sx + stageW / 2, sy + stageH / 2 + 7);
    }

    // Data preview below each stage
    if (i <= currentStage) {
      fill('#888');
      textSize(8);
      textAlign(CENTER, TOP);
      let preview = s.dataFormatted[0];
      text(preview, sx + stageW / 2, sy + stageH + 5);
    }
  }

  // Live event stream
  let streamY = pipeY + stageH + 30;
  let streamH = drawHeight - streamY - 10;

  fill('white');
  stroke('#DDD');
  strokeWeight(1);
  rect(pipeX, streamY, pipeW, streamH, 5);

  noStroke();
  fill('#888');
  textAlign(LEFT, TOP);
  textSize(11);
  text('Live Event Stream', pipeX + 8, streamY + 5);

  // Show recent events
  fill('#333');
  textSize(10);
  let logY = streamY + 22;
  for (let i = eventLog.length - 1; i >= 0 && logY < streamY + streamH - 5; i--) {
    let evt = eventLog[i];
    let age = millis() - evt.time;
    let alpha = age < 500 ? 255 : max(100, 255 - (age - 500) / 50);

    fill(evt.color + hex(floor(alpha), 2).slice(-2));
    textAlign(LEFT, TOP);
    text(evt.text, pipeX + 8, logY);
    logY += 16;
  }

  // Stage indicator
  fill('#555');
  textSize(12);
  textAlign(CENTER, BOTTOM);
  noStroke();
  text('Stage ' + (currentStage + 1) + ' of ' + stageCount, canvasWidth / 2, drawHeight - 5);
}

function lighten(hexColor, amount) {
  let c = color(hexColor);
  return lerpColor(c, color(255), amount).toString('#rrggbb');
}

function mousePressed() {
  // Check sample region clicks
  let simX = 15;
  let simY = 30;

  for (let i = 0; i < sampleRegions.length; i++) {
    let r = sampleRegions[i];
    let rx = simX + r.x * canvasWidth;
    let ry = simY + r.y * drawHeight;
    let rw = r.w * canvasWidth;
    let rh = r.h * drawHeight;

    if (mouseX >= rx && mouseX <= rx + rw && mouseY >= ry && mouseY <= ry + rh) {
      let now = new Date();
      let timeStr = now.toTimeString().split(' ')[0];
      eventLog.push({
        text: timeStr + ' click → ' + r.name,
        time: millis(),
        color: r.color
      });
      if (eventLog.length > 8) eventLog.shift();
      break;
    }
  }

  // Check pipeline stage clicks
  let simW = canvasWidth * 0.22;
  let pipeX = simX + simW + 20;
  let pipeW = canvasWidth - pipeX - 15;
  let stageW = min(90, (pipeW - (stageCount - 1) * 8) / stageCount);
  let stageH = 50;
  let pipeY = 35;

  for (let i = 0; i < stageCount; i++) {
    let sx = pipeX + i * (stageW + 8);
    if (mouseX >= sx && mouseX <= sx + stageW && mouseY >= pipeY && mouseY <= pipeY + stageH) {
      currentStage = i;
      updateStageDetail();
      break;
    }
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
