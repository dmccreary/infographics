// Accessibility Audit Checklist
// Evaluate a sample MicroSim against accessibility criteria
// Bloom Level: Evaluate (L5)

let containerWidth;
let canvasWidth = 400;
let drawHeight = 340;
let canvasHeight = drawHeight;

let hoveredRegion = -1;
let showIssues = false;
let showFixed = false;

// Sample diagram regions (intentionally imperfect)
let regions = [
  { name: 'Nucleus', x: 0.5, y: 0.35, w: 0.18, h: 0.16, color: [180, 100, 180], desc: 'Contains DNA and controls cell activities.' },
  { name: 'Mitochondria', x: 0.28, y: 0.5, w: 0.14, h: 0.1, color: [220, 120, 80], desc: 'Produces ATP through cellular respiration.' },
  { name: 'Ribosome', x: 0.72, y: 0.3, w: 0.1, h: 0.08, color: [100, 160, 200], desc: 'Synthesizes proteins from mRNA.' },
  { name: 'Cell Membrane', x: 0.5, y: 0.82, w: 0.6, h: 0.08, color: [120, 180, 120], desc: 'Controls what enters and exits the cell.' }
];

// Accessibility issues
let issues = [
  { region: -1, x: 0.5, y: 0.08, text: 'Canvas has no aria-label describing the diagram' },
  { region: 0, x: 0.5, y: 0.22, text: 'Label color #B464B4 has insufficient contrast (2.8:1) on light background' },
  { region: -1, x: 0.15, y: 0.6, text: 'No keyboard navigation — regions only respond to mouse hover' },
  { region: 2, x: 0.82, y: 0.22, text: 'Tooltip not announced to screen readers (no aria-live region)' },
  { region: 3, x: 0.5, y: 0.92, text: 'No focus indicators visible when tabbing through regions' }
];

let categories = [
  {
    name: 'Alt Text',
    items: [
      { text: 'Image/canvas has descriptive alt text', state: 0 },
      { text: 'Alt text describes content, not appearance', state: 0 }
    ]
  },
  {
    name: 'Semantic HTML',
    items: [
      { text: 'Uses appropriate HTML elements', state: 0 },
      { text: 'All controls have visible labels', state: 0 }
    ]
  },
  {
    name: 'ARIA Attributes',
    items: [
      { text: 'aria-label on canvas element', state: 0 },
      { text: 'aria-live for dynamic updates', state: 0 },
      { text: 'Decorative elements hidden from AT', state: 0 }
    ]
  },
  {
    name: 'Keyboard Navigation',
    items: [
      { text: 'All regions focusable via keyboard', state: 0 },
      { text: 'Logical tab order', state: 0 },
      { text: 'Enter/Space triggers interaction', state: 0 }
    ]
  },
  {
    name: 'Screen Reader Support',
    items: [
      { text: 'State changes announced', state: 0 },
      { text: 'Text description available', state: 0 }
    ]
  },
  {
    name: 'High Contrast',
    items: [
      { text: 'Color contrast ratio ≥ 4.5:1', state: 0 },
      { text: 'High contrast mode toggle available', state: 0 }
    ]
  }
];

function setup() {
  updateCanvasSize();
  const canvas = createCanvas(canvasWidth, canvasHeight);
  canvas.parent(document.querySelector('main'));
  buildControls();
  describe('Accessibility audit tool showing a sample cell biology MicroSim with intentional accessibility issues alongside a checklist for evaluation.');
}

function buildControls() {
  let mainEl = document.querySelector('main');
  let controlDiv = document.createElement('div');
  controlDiv.id = 'audit-controls';
  controlDiv.style.cssText = 'background: white; border: 1px solid silver; padding: 12px; font-family: Arial, sans-serif; font-size: 14px;';
  mainEl.appendChild(controlDiv);

  // Buttons row
  let btnRow = document.createElement('div');
  btnRow.style.cssText = 'display: flex; flex-wrap: wrap; gap: 8px; align-items: center; justify-content: center; margin-bottom: 10px;';

  let revealBtn = document.createElement('button');
  revealBtn.textContent = 'Reveal Issues';
  revealBtn.style.cssText = 'padding: 6px 14px; font-size: 14px; cursor: pointer; border: 1px solid #E53935; border-radius: 4px; background: #E53935; color: white; font-weight: bold;';
  revealBtn.addEventListener('click', function() {
    showIssues = !showIssues;
    revealBtn.textContent = showIssues ? 'Hide Issues' : 'Reveal Issues';
  });
  btnRow.appendChild(revealBtn);

  let fixedBtn = document.createElement('button');
  fixedBtn.textContent = 'Show Fixed Version';
  fixedBtn.style.cssText = 'padding: 6px 14px; font-size: 14px; cursor: pointer; border: 1px solid #34A853; border-radius: 4px; background: #34A853; color: white; font-weight: bold;';
  fixedBtn.addEventListener('click', function() {
    showFixed = !showFixed;
    fixedBtn.textContent = showFixed ? 'Show Original' : 'Show Fixed Version';
  });
  btnRow.appendChild(fixedBtn);

  let resetBtn = document.createElement('button');
  resetBtn.textContent = 'Reset Audit';
  resetBtn.style.cssText = 'padding: 6px 14px; font-size: 14px; cursor: pointer; border: 1px solid silver; border-radius: 4px; background: #f0f0f0;';
  resetBtn.addEventListener('click', function() {
    categories.forEach(function(cat) { cat.items.forEach(function(item) { item.state = 0; }); });
    showIssues = false;
    showFixed = false;
    revealBtn.textContent = 'Reveal Issues';
    fixedBtn.textContent = 'Show Fixed Version';
    updateChecklist();
  });
  btnRow.appendChild(resetBtn);

  // Score display
  let scoreSpan = document.createElement('span');
  scoreSpan.id = 'audit-score';
  scoreSpan.style.cssText = 'font-weight: bold; font-size: 16px;';
  btnRow.appendChild(scoreSpan);

  controlDiv.appendChild(btnRow);

  // Checklist
  let checkDiv = document.createElement('div');
  checkDiv.id = 'checklist';
  checkDiv.style.cssText = 'max-height: 260px; overflow-y: auto; border: 1px solid #eee; border-radius: 6px; padding: 8px;';
  controlDiv.appendChild(checkDiv);

  updateChecklist();
}

function updateChecklist() {
  let checkDiv = document.getElementById('checklist');
  if (!checkDiv) return;

  let totalItems = 0;
  let passCount = 0;
  let failCount = 0;

  let html = '';
  categories.forEach(function(cat, ci) {
    html += '<div style="margin-bottom: 8px;"><strong style="color:#333">' + cat.name + '</strong>';
    cat.items.forEach(function(item, ii) {
      totalItems++;
      let stateIcon, stateColor;
      if (item.state === 1) { stateIcon = '✓'; stateColor = '#34A853'; passCount++; }
      else if (item.state === 2) { stateIcon = '✗'; stateColor = '#E53935'; failCount++; }
      else { stateIcon = '○'; stateColor = '#999'; }
      html += '<div data-cat="' + ci + '" data-item="' + ii + '" style="cursor: pointer; padding: 3px 8px; margin: 2px 0; border-radius: 4px; display: flex; align-items: center; gap: 8px; background: ' + (item.state === 2 ? '#fce4ec' : item.state === 1 ? '#e8f5e9' : '#f5f5f5') + ';">' +
        '<span style="color:' + stateColor + '; font-size: 16px; min-width: 20px; text-align: center;">' + stateIcon + '</span>' +
        '<span style="font-size: 13px;">' + item.text + '</span></div>';
    });
    html += '</div>';
  });
  checkDiv.innerHTML = html;

  // Add click handlers
  checkDiv.querySelectorAll('[data-cat]').forEach(function(el) {
    el.addEventListener('click', function() {
      let ci = parseInt(el.dataset.cat);
      let ii = parseInt(el.dataset.item);
      categories[ci].items[ii].state = (categories[ci].items[ii].state + 1) % 3;
      updateChecklist();
    });
  });

  // Update score
  let scoreEl = document.getElementById('audit-score');
  if (scoreEl) {
    let score = passCount;
    let scoreColor = score >= 11 ? '#34A853' : score >= 7 ? '#FB8C00' : '#E53935';
    scoreEl.innerHTML = 'Score: <span style="color:' + scoreColor + '">' + score + '/' + totalItems + '</span>';
  }
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
  text('Sample MicroSim — Cell Biology', canvasWidth / 2, 6);
  fill(120);
  textSize(11);
  text(showFixed ? '(Accessible Version)' : '(Test this for accessibility issues)', canvasWidth / 2, 24);

  // Draw cell
  let cellX = canvasWidth * 0.5;
  let cellY = drawHeight * 0.52;
  let cellW = canvasWidth * 0.7;
  let cellH = drawHeight * 0.65;

  fill(240, 250, 240);
  stroke(120, 180, 120);
  strokeWeight(2);
  ellipse(cellX, cellY, cellW, cellH);

  // Draw regions
  hoveredRegion = -1;
  for (let i = 0; i < regions.length; i++) {
    let r = regions[i];
    let rx = canvasWidth * r.x;
    let ry = drawHeight * r.y;
    let rw = canvasWidth * r.w;
    let rh = drawHeight * r.h;

    let isHover = mouseX > rx - rw / 2 && mouseX < rx + rw / 2 && mouseY > ry - rh / 2 && mouseY < ry + rh / 2;
    if (isHover) hoveredRegion = i;

    fill(r.color[0], r.color[1], r.color[2], isHover ? 180 : 100);
    if (showFixed && isHover) {
      stroke(0, 0, 0);
      strokeWeight(3);
    } else {
      stroke(r.color[0], r.color[1], r.color[2]);
      strokeWeight(isHover ? 2 : 1);
    }
    ellipse(rx, ry, rw, rh);

    // Label
    if (showFixed) {
      fill(0); // High contrast in fixed version
    } else {
      fill(r.color[0], r.color[1], r.color[2]); // Low contrast in original
    }
    noStroke();
    textAlign(CENTER, CENTER);
    textSize(14);
    text(r.name, rx, ry);
  }

  // Tooltip
  if (hoveredRegion >= 0) {
    let r = regions[hoveredRegion];
    let tipText = r.name + ': ' + r.desc;
    textSize(14);
    let tw = min(textWidth(tipText) + 16, canvasWidth - 20);
    let tx = constrain(mouseX + 12, 5, canvasWidth - tw - 5);
    let ty = mouseY - 30;
    if (ty < 5) ty = mouseY + 18;
    fill(50, 50, 50, 220);
    noStroke();
    rect(tx, ty, tw, 24, 4);
    fill(255);
    textAlign(LEFT, CENTER);
    text(tipText.substring(0, 60), tx + 8, ty + 12);
  }

  // Issue annotations
  if (showIssues) {
    for (let i = 0; i < issues.length; i++) {
      let issue = issues[i];
      let ix = canvasWidth * issue.x;
      let iy = drawHeight * issue.y;

      // Red circle with number
      fill(229, 57, 53);
      noStroke();
      ellipse(ix, iy, 20, 20);
      fill(255);
      textAlign(CENTER, CENTER);
      textSize(12);
      text(i + 1, ix, iy);

      // Issue text
      fill(229, 57, 53);
      textAlign(LEFT, CENTER);
      textSize(10);
      noStroke();
      text(issue.text.substring(0, 50), ix + 14, iy);
    }
  }

  // Fixed version indicators
  if (showFixed) {
    fill(52, 168, 83, 40);
    noStroke();
    rect(2, 2, canvasWidth - 4, drawHeight - 4, 4);
    fill(52, 168, 83);
    textAlign(RIGHT, TOP);
    textSize(11);
    text('✓ aria-label  ✓ keyboard nav  ✓ focus indicators  ✓ contrast 4.5:1+', canvasWidth - 10, drawHeight - 20);
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
