// Advanced Interaction Pattern Showcase
// 4 tabs showing same content with different interaction patterns
// Bloom Level: Analyze (L4)

let containerWidth;
let canvasWidth = 400;
let drawHeight = 420;
let canvasHeight = drawHeight;

let currentTab = 0;
let stepStage = 0;
let drillStage = -1; // -1 = overview
let hoveredStage = -1;

let tabNames = ['Step Reveal', 'Scroll Reveal', 'Zoom & Pan', 'Drill Down'];
let tabColors = [
  [66, 133, 244],
  [52, 168, 83],
  [251, 140, 0],
  [128, 90, 213]
];

let processStages = [
  { name: 'Introduction', short: 'A bill is drafted by a member of Congress and formally introduced in either the House or Senate.' },
  { name: 'Committee Review', short: 'The bill is assigned to a committee that studies it, holds hearings, and may revise it before voting.' },
  { name: 'Floor Debate', short: 'The full chamber debates the bill. Amendments may be proposed and voted on.' },
  { name: 'Conference & Vote', short: 'Both chambers must pass the same version. A conference committee resolves differences, then both chambers vote.' },
  { name: 'Presidential Action', short: 'The President signs the bill into law or vetoes it. Congress can override a veto with a two-thirds vote.' }
];

let comparison = [
  { pattern: 'Step Reveal', best: 'Linear tutorials, sequential processes', limitations: 'No overview until all steps seen', complexity: 'Low' },
  { pattern: 'Scroll Reveal', best: 'Narrative content, storytelling', limitations: 'Requires scroll interaction; no random access', complexity: 'Medium' },
  { pattern: 'Zoom & Pan', best: 'Large detailed diagrams, maps', limitations: 'Disorienting without minimap; steep learning curve', complexity: 'High' },
  { pattern: 'Drill Down', best: 'Hierarchical data, reference material', limitations: 'Can lose context of the whole; requires breadcrumbs', complexity: 'Medium' }
];

// Zoom & Pan state
let zoomLevel = 1;
let panX = 0, panY = 0;
let dragging = false;
let dragStartX = 0, dragStartY = 0;
let panStartX = 0, panStartY = 0;

// Scroll state
let scrollPos = 0;

function setup() {
  updateCanvasSize();
  const canvas = createCanvas(canvasWidth, canvasHeight);
  canvas.parent(document.querySelector('main'));
  canvas.mouseWheel(handleWheel);
  buildControls();
  describe('Four tabs showing the same five-stage legislative process through different interaction patterns: step reveal, scroll reveal, zoom and pan, and drill down.');
}

function handleWheel(event) {
  if (currentTab === 1) {
    scrollPos = constrain(scrollPos + event.delta * 0.5, 0, 400);
    return false;
  } else if (currentTab === 2) {
    let zoomDelta = event.delta > 0 ? 0.9 : 1.1;
    zoomLevel = constrain(zoomLevel * zoomDelta, 0.5, 3);
    return false;
  }
}

function buildControls() {
  let mainEl = document.querySelector('main');
  let controlDiv = document.createElement('div');
  controlDiv.id = 'showcase-controls';
  controlDiv.style.cssText = 'background: white; border: 1px solid silver; padding: 12px; font-family: Arial, sans-serif; font-size: 14px;';
  mainEl.appendChild(controlDiv);

  // Tab buttons
  let tabRow = document.createElement('div');
  tabRow.id = 'tab-row';
  tabRow.style.cssText = 'display: flex; gap: 4px; margin-bottom: 10px; justify-content: center; flex-wrap: wrap;';
  for (let i = 0; i < tabNames.length; i++) {
    let btn = document.createElement('button');
    btn.textContent = tabNames[i];
    btn.dataset.tab = i;
    btn.style.cssText = 'padding: 8px 14px; font-size: 14px; cursor: pointer; border: 2px solid rgb(' + tabColors[i].join(',') + '); border-radius: 4px 4px 0 0; background: ' + (i === 0 ? 'rgb(' + tabColors[i].join(',') + ')' : 'white') + '; color: ' + (i === 0 ? 'white' : 'rgb(' + tabColors[i].join(',') + ')') + '; font-weight: bold;';
    btn.addEventListener('click', function() {
      currentTab = parseInt(btn.dataset.tab);
      stepStage = 0;
      drillStage = -1;
      scrollPos = 0;
      zoomLevel = 1;
      panX = 0;
      panY = 0;
      updateTabStyles();
      updateComparisonPanel();
    });
    tabRow.appendChild(btn);
  }
  controlDiv.appendChild(tabRow);

  // Tab-specific controls
  let subControls = document.createElement('div');
  subControls.id = 'sub-controls';
  subControls.style.cssText = 'display: flex; gap: 8px; align-items: center; justify-content: center; margin-bottom: 8px; min-height: 30px;';
  controlDiv.appendChild(subControls);
  updateSubControls();

  // Comparison panel
  let compDiv = document.createElement('div');
  compDiv.id = 'comparison-panel';
  compDiv.style.cssText = 'padding: 8px; background: #f8f9fa; border-radius: 6px; line-height: 1.5; font-size: 13px; color: #333;';
  controlDiv.appendChild(compDiv);
  updateComparisonPanel();
}

function updateTabStyles() {
  let buttons = document.querySelectorAll('#tab-row button');
  buttons.forEach(function(btn) {
    let i = parseInt(btn.dataset.tab);
    btn.style.background = (i === currentTab) ? 'rgb(' + tabColors[i].join(',') + ')' : 'white';
    btn.style.color = (i === currentTab) ? 'white' : 'rgb(' + tabColors[i].join(',') + ')';
  });
  updateSubControls();
}

function updateSubControls() {
  let subControls = document.getElementById('sub-controls');
  if (!subControls) return;
  subControls.innerHTML = '';

  if (currentTab === 0) {
    // Step Reveal controls
    let prevBtn = document.createElement('button');
    prevBtn.textContent = '← Previous';
    prevBtn.style.cssText = 'padding: 4px 12px; font-size: 13px; cursor: pointer; border: 1px solid silver; border-radius: 4px; background: #f0f0f0;';
    prevBtn.addEventListener('click', function() { if (stepStage > 0) stepStage--; });
    subControls.appendChild(prevBtn);

    let label = document.createElement('span');
    label.id = 'step-label';
    label.style.fontWeight = 'bold';
    label.textContent = 'Stage ' + (stepStage + 1) + ' of 5';
    subControls.appendChild(label);

    let nextBtn = document.createElement('button');
    nextBtn.textContent = 'Next →';
    nextBtn.style.cssText = 'padding: 4px 12px; font-size: 13px; cursor: pointer; border: 1px solid #4285F4; border-radius: 4px; background: #4285F4; color: white; font-weight: bold;';
    nextBtn.addEventListener('click', function() { if (stepStage < 4) stepStage++; });
    subControls.appendChild(nextBtn);
  } else if (currentTab === 1) {
    let label = document.createElement('span');
    label.style.color = '#666';
    label.textContent = 'Scroll within the canvas to reveal stages';
    subControls.appendChild(label);
  } else if (currentTab === 2) {
    let label = document.createElement('span');
    label.style.color = '#666';
    label.textContent = 'Scroll to zoom, drag to pan';
    subControls.appendChild(label);
    let resetBtn = document.createElement('button');
    resetBtn.textContent = 'Reset View';
    resetBtn.style.cssText = 'padding: 4px 12px; font-size: 13px; cursor: pointer; border: 1px solid silver; border-radius: 4px; background: #f0f0f0;';
    resetBtn.addEventListener('click', function() { zoomLevel = 1; panX = 0; panY = 0; });
    subControls.appendChild(resetBtn);
  } else if (currentTab === 3) {
    if (drillStage >= 0) {
      let breadcrumb = document.createElement('span');
      breadcrumb.innerHTML = '<a href="#" style="color:#7B1FA2">Overview</a> &gt; Stage ' + (drillStage + 1) + ': ' + processStages[drillStage].name;
      breadcrumb.querySelector('a').addEventListener('click', function(e) { e.preventDefault(); drillStage = -1; });
      subControls.appendChild(breadcrumb);
    } else {
      let label = document.createElement('span');
      label.style.color = '#666';
      label.textContent = 'Click a card to drill into details';
      subControls.appendChild(label);
    }
  }
}

function updateComparisonPanel() {
  let compDiv = document.getElementById('comparison-panel');
  if (!compDiv) return;
  let c = comparison[currentTab];
  compDiv.innerHTML =
    '<strong style="color:rgb(' + tabColors[currentTab].join(',') + ')">' + c.pattern + '</strong>' +
    ' &nbsp;|&nbsp; <strong>Best for:</strong> ' + c.best +
    ' &nbsp;|&nbsp; <strong>Limitations:</strong> ' + c.limitations +
    ' &nbsp;|&nbsp; <strong>Complexity:</strong> ' + c.complexity;
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
  text('How a Bill Becomes a Law', canvasWidth / 2, 6);
  fill(tabColors[currentTab][0], tabColors[currentTab][1], tabColors[currentTab][2]);
  textSize(12);
  text('Pattern: ' + tabNames[currentTab], canvasWidth / 2, 24);

  let areaY = 42;
  let areaH = drawHeight - areaY - 8;

  // Update step label
  if (currentTab === 0) {
    let label = document.getElementById('step-label');
    if (label) label.textContent = 'Stage ' + (stepStage + 1) + ' of 5';
  }

  if (currentTab === 0) drawStepReveal(areaY, areaH);
  else if (currentTab === 1) drawScrollReveal(areaY, areaH);
  else if (currentTab === 2) drawZoomPan(areaY, areaH);
  else if (currentTab === 3) drawDrillDown(areaY, areaH);
}

function drawStepReveal(areaY, areaH) {
  let boxW = min(canvasWidth - 40, 500);
  let boxH = 60;
  let gap = 8;
  let startX = (canvasWidth - boxW) / 2;

  for (let i = 0; i < 5; i++) {
    let by = areaY + 10 + i * (boxH + gap);
    let revealed = i <= stepStage;

    fill(revealed ? 255 : 235);
    stroke(revealed ? tabColors[0][0] : 200, revealed ? tabColors[0][1] : 200, revealed ? tabColors[0][2] : 200);
    strokeWeight(revealed ? 2 : 1);
    rect(startX, by, boxW, boxH, 6);

    if (revealed) {
      // Number circle
      fill(tabColors[0][0], tabColors[0][1], tabColors[0][2]);
      noStroke();
      ellipse(startX + 25, by + boxH / 2, 28, 28);
      fill(255);
      textAlign(CENTER, CENTER);
      textSize(14);
      text(i + 1, startX + 25, by + boxH / 2);

      // Name and description
      fill(40);
      textAlign(LEFT, TOP);
      textSize(14);
      noStroke();
      text(processStages[i].name, startX + 46, by + 8);
      fill(100);
      textSize(12);
      text(processStages[i].short.substring(0, 70) + '...', startX + 46, by + 28);
    } else {
      fill(200);
      noStroke();
      textAlign(CENTER, CENTER);
      textSize(14);
      text('Stage ' + (i + 1) + ' — click Next to reveal', startX + boxW / 2, by + boxH / 2);
    }

    // Arrow
    if (i < 4 && revealed) {
      fill(tabColors[0][0], tabColors[0][1], tabColors[0][2], 100);
      noStroke();
      triangle(startX + boxW / 2, by + boxH + 2, startX + boxW / 2 - 6, by + boxH - 2, startX + boxW / 2 + 6, by + boxH - 2);
    }
  }

  // Progress bar
  let progW = boxW;
  let progH = 6;
  let progY = areaY + 5 * (boxH + gap) + 14;
  fill(230);
  noStroke();
  rect(startX, progY, progW, progH, 3);
  fill(tabColors[0][0], tabColors[0][1], tabColors[0][2]);
  rect(startX, progY, progW * ((stepStage + 1) / 5), progH, 3);
}

function drawScrollReveal(areaY, areaH) {
  let boxW = min(canvasWidth - 40, 500);
  let startX = (canvasWidth - boxW) / 2;
  let revealThreshold = 80; // pixels of scroll per stage

  for (let i = 0; i < 5; i++) {
    let stageScroll = i * revealThreshold;
    let progress = constrain((scrollPos - stageScroll) / revealThreshold, 0, 1);
    let by = areaY + 10 + i * 72;
    let alpha = progress * 255;

    if (alpha > 10) {
      fill(255, 255, 255, alpha);
      stroke(tabColors[1][0], tabColors[1][1], tabColors[1][2], alpha);
      strokeWeight(2);
      rect(startX, by, boxW, 64, 6);

      fill(tabColors[1][0], tabColors[1][1], tabColors[1][2], alpha);
      noStroke();
      ellipse(startX + 25, by + 32, 28, 28);
      fill(255, 255, 255, alpha);
      textAlign(CENTER, CENTER);
      textSize(14);
      text(i + 1, startX + 25, by + 32);

      fill(40, 40, 40, alpha);
      textAlign(LEFT, TOP);
      textSize(14);
      noStroke();
      text(processStages[i].name, startX + 46, by + 10);
      fill(100, 100, 100, alpha);
      textSize(12);
      text(processStages[i].short.substring(0, 70) + '...', startX + 46, by + 30);
    }
  }

  // Scroll indicator
  let scrollPct = scrollPos / 400;
  fill(200);
  noStroke();
  rect(canvasWidth - 12, areaY, 6, areaH, 3);
  fill(tabColors[1][0], tabColors[1][1], tabColors[1][2]);
  rect(canvasWidth - 12, areaY + scrollPct * (areaH - 40), 6, 40, 3);
}

function drawZoomPan(areaY, areaH) {
  push();
  let cx = canvasWidth / 2 + panX;
  let cy = areaY + areaH / 2 + panY;

  // Draw all 5 stages in a circular layout
  let radius = 120 * zoomLevel;

  for (let i = 0; i < 5; i++) {
    let angle = -HALF_PI + (i / 5) * TWO_PI;
    let sx = cx + cos(angle) * radius;
    let sy = cy + sin(angle) * radius;
    let boxSize = 50 * zoomLevel;

    fill(255);
    stroke(tabColors[2][0], tabColors[2][1], tabColors[2][2]);
    strokeWeight(2);
    rect(sx - boxSize, sy - boxSize / 2, boxSize * 2, boxSize, 6);

    fill(tabColors[2][0], tabColors[2][1], tabColors[2][2]);
    noStroke();
    textAlign(CENTER, CENTER);
    textSize(max(10, 12 * zoomLevel));
    text((i + 1) + '. ' + processStages[i].name, sx, sy - boxSize / 4);

    if (zoomLevel > 1.3) {
      fill(80);
      textSize(max(8, 9 * zoomLevel));
      let desc = processStages[i].short.substring(0, 50);
      text(desc + '...', sx, sy + boxSize / 6);
    }

    // Arrows
    if (i < 4) {
      let nextAngle = -HALF_PI + ((i + 1) / 5) * TWO_PI;
      let nx = cx + cos(nextAngle) * radius;
      let ny = cy + sin(nextAngle) * radius;
      stroke(200);
      strokeWeight(1.5);
      line(sx + boxSize * 0.8, sy, nx - boxSize * 0.8, ny);
    }
  }

  // Minimap
  let mmW = 60;
  let mmH = 50;
  let mmX = 8;
  let mmY = areaY + 8;
  fill(255, 255, 255, 200);
  stroke(180);
  strokeWeight(1);
  rect(mmX, mmY, mmW, mmH, 3);
  // Viewport rectangle
  let vpW = mmW / zoomLevel;
  let vpH = mmH / zoomLevel;
  let vpX = mmX + mmW / 2 - vpW / 2 - (panX / canvasWidth) * mmW;
  let vpY = mmY + mmH / 2 - vpH / 2 - (panY / areaH) * mmH;
  noFill();
  stroke(229, 57, 53);
  strokeWeight(1.5);
  rect(vpX, vpY, vpW, vpH, 1);

  fill(100);
  noStroke();
  textSize(9);
  textAlign(LEFT, BOTTOM);
  text('Zoom: ' + nf(zoomLevel, 1, 1) + 'x', mmX + 2, mmY + mmH + 12);

  pop();
}

function drawDrillDown(areaY, areaH) {
  let boxW = min(canvasWidth - 40, 500);
  let startX = (canvasWidth - boxW) / 2;

  if (drillStage < 0) {
    // Overview: show 5 cards
    let cardW = (boxW - 20) / 5;
    hoveredStage = -1;
    for (let i = 0; i < 5; i++) {
      let cx = startX + 10 + i * (cardW + 2);
      let cy = areaY + 40;
      let cH = areaH - 60;

      let isHover = mouseX > cx && mouseX < cx + cardW && mouseY > cy && mouseY < cy + cH;
      if (isHover) hoveredStage = i;

      fill(isHover ? color(tabColors[3][0], tabColors[3][1], tabColors[3][2], 20) : 255);
      stroke(isHover ? color(tabColors[3][0], tabColors[3][1], tabColors[3][2]) : '#ccc');
      strokeWeight(isHover ? 2 : 1);
      rect(cx, cy, cardW, cH, 6);

      // Number
      fill(tabColors[3][0], tabColors[3][1], tabColors[3][2]);
      noStroke();
      textAlign(CENTER, TOP);
      textSize(24);
      text(i + 1, cx + cardW / 2, cy + 15);

      // Name (wrapped)
      textSize(11);
      let words = processStages[i].name.split(' ');
      let ly = cy + 50;
      for (let w = 0; w < words.length; w++) {
        text(words[w], cx + cardW / 2, ly);
        ly += 14;
      }

      if (isHover) {
        fill(100);
        textSize(10);
        text('Click to\nexplore', cx + cardW / 2, cy + cH - 40);
      }
    }
  } else {
    // Drilled into a stage
    let s = processStages[drillStage];
    let by = areaY + 20;

    fill(255);
    stroke(tabColors[3][0], tabColors[3][1], tabColors[3][2]);
    strokeWeight(2);
    rect(startX, by, boxW, areaH - 30, 8);

    // Stage number and name
    fill(tabColors[3][0], tabColors[3][1], tabColors[3][2]);
    noStroke();
    ellipse(startX + 30, by + 30, 36, 36);
    fill(255);
    textAlign(CENTER, CENTER);
    textSize(18);
    text(drillStage + 1, startX + 30, by + 30);

    fill(tabColors[3][0], tabColors[3][1], tabColors[3][2]);
    textAlign(LEFT, TOP);
    textSize(20);
    noStroke();
    text(s.name, startX + 56, by + 16);

    // Full description
    fill(60);
    textSize(14);
    let descY = by + 55;
    let words = s.short.split(' ');
    let lineStr = '';
    for (let w = 0; w < words.length; w++) {
      let testLine = lineStr + (lineStr ? ' ' : '') + words[w];
      if (textWidth(testLine) > boxW - 30) {
        text(lineStr, startX + 16, descY);
        descY += 20;
        lineStr = words[w];
      } else {
        lineStr = testLine;
      }
    }
    text(lineStr, startX + 16, descY);

    // Navigation hint
    descY += 40;
    fill(150);
    textSize(13);
    text('Click "Overview" in the breadcrumb above to go back.', startX + 16, descY);
  }
}

function mousePressed() {
  if (currentTab === 2) {
    dragging = true;
    dragStartX = mouseX;
    dragStartY = mouseY;
    panStartX = panX;
    panStartY = panY;
  } else if (currentTab === 3 && drillStage < 0 && hoveredStage >= 0) {
    drillStage = hoveredStage;
    updateSubControls();
  }
}

function mouseDragged() {
  if (currentTab === 2 && dragging) {
    panX = panStartX + (mouseX - dragStartX);
    panY = panStartY + (mouseY - dragStartY);
  }
}

function mouseReleased() {
  dragging = false;
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
