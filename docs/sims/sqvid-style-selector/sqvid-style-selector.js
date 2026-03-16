// SQVID Style Selector
// Apply the SQVID framework by adjusting five style sliders
// Bloom Level: Apply (L3)

let containerWidth;
let canvasWidth = 400;
let drawHeight = 500;
let canvasHeight = drawHeight;

// SQVID sliders (HTML DOM)
let sSlider, qSlider, vSlider, iSlider, dSlider;

function setup() {
  updateCanvasSize();
  const canvas = createCanvas(canvasWidth, canvasHeight);
  canvas.parent(document.querySelector('main'));
  buildControls();
  describe('SQVID Style Selector with five dimension sliders and a live preview of the resulting infographic style.');
}

function buildControls() {
  let mainEl = document.querySelector('main');

  let controlDiv = document.createElement('div');
  controlDiv.id = 'sqvid-controls';
  controlDiv.style.cssText = 'background: white; border: 1px solid silver; padding: 12px; font-family: Arial, sans-serif; font-size: 14px;';
  mainEl.appendChild(controlDiv);

  let dims = [
    { id: 'S', left: 'Simple', right: 'Elaborate', color: '#4285F4' },
    { id: 'Q', left: 'Qualitative', right: 'Quantitative', color: '#FB8C00' },
    { id: 'V', left: 'Vision', right: 'Execution', color: '#34A853' },
    { id: 'I', left: 'Individual', right: 'Comparison', color: '#8E44AD' },
    { id: 'D', left: 'Delta (Change)', right: 'Status Quo', color: '#E53935' }
  ];

  let sliders = [];
  dims.forEach(function(dim) {
    let row = document.createElement('div');
    row.style.cssText = 'display: flex; align-items: center; gap: 6px; margin-bottom: 6px;';

    let idLabel = document.createElement('span');
    idLabel.textContent = dim.id;
    idLabel.style.cssText = 'font-weight: bold; font-size: 18px; color: ' + dim.color + '; width: 20px; text-align: center;';
    row.appendChild(idLabel);

    let leftLabel = document.createElement('span');
    leftLabel.textContent = dim.left;
    leftLabel.style.cssText = 'width: 100px; text-align: right; font-size: 12px; color: #666;';
    row.appendChild(leftLabel);

    let slider = document.createElement('input');
    slider.type = 'range';
    slider.min = 0;
    slider.max = 100;
    slider.value = 50;
    slider.style.cssText = 'flex: 1;';
    row.appendChild(slider);

    let rightLabel = document.createElement('span');
    rightLabel.textContent = dim.right;
    rightLabel.style.cssText = 'width: 100px; font-size: 12px; color: #666;';
    row.appendChild(rightLabel);

    controlDiv.appendChild(row);
    sliders.push(slider);
  });

  sSlider = { value: function() { return parseInt(sliders[0].value); }, setValue: function(v) { sliders[0].value = v; } };
  qSlider = { value: function() { return parseInt(sliders[1].value); }, setValue: function(v) { sliders[1].value = v; } };
  vSlider = { value: function() { return parseInt(sliders[2].value); }, setValue: function(v) { sliders[2].value = v; } };
  iSlider = { value: function() { return parseInt(sliders[3].value); }, setValue: function(v) { sliders[3].value = v; } };
  dSlider = { value: function() { return parseInt(sliders[4].value); }, setValue: function(v) { sliders[4].value = v; } };

  // Buttons
  let btnRow = document.createElement('div');
  btnRow.style.cssText = 'display: flex; gap: 10px; justify-content: center; margin-top: 8px;';

  let resetBtn = document.createElement('button');
  resetBtn.textContent = 'Reset';
  resetBtn.style.cssText = 'padding: 6px 16px; font-size: 14px; cursor: pointer; border: 1px solid silver; border-radius: 4px; background: #f0f0f0;';
  resetBtn.addEventListener('click', function() {
    [sSlider, qSlider, vSlider, iSlider, dSlider].forEach(function(s) { s.setValue(50); });
  });
  btnRow.appendChild(resetBtn);

  let randBtn = document.createElement('button');
  randBtn.textContent = 'Randomize';
  randBtn.style.cssText = 'padding: 6px 16px; font-size: 14px; cursor: pointer; border: 1px solid #4285F4; border-radius: 4px; background: #4285F4; color: white; font-weight: bold;';
  randBtn.addEventListener('click', function() {
    [sSlider, qSlider, vSlider, iSlider, dSlider].forEach(function(s) { s.setValue(Math.floor(Math.random() * 101)); });
  });
  btnRow.appendChild(randBtn);

  controlDiv.appendChild(btnRow);

  // Audience description
  let descDiv = document.createElement('div');
  descDiv.id = 'sqvid-desc';
  descDiv.style.cssText = 'background: #f8f8ff; border: 1px solid silver; padding: 10px; margin-top: 8px; font-size: 13px; border-radius: 4px;';
  controlDiv.appendChild(descDiv);
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
  textSize(20);
  text('SQVID Style Selector', canvasWidth / 2, 8);

  // Read values (0-100)
  let s = sSlider.value();
  let q = qSlider.value();
  let v = vSlider.value();
  let i = iSlider.value();
  let d = dSlider.value();

  // Preview area
  let px = 30;
  let py = 42;
  let pw = canvasWidth - 60;
  let ph = drawHeight - 55;

  // Preview background
  let bgR = lerp(250, 240, v / 100);
  let bgG = lerp(252, 245, v / 100);
  let bgB = lerp(255, 250, v / 100);
  fill(bgR, bgG, bgB);
  stroke('silver');
  strokeWeight(1);
  rect(px, py, pw, ph, 8);

  // Determine style parameters from SQVID
  let numElements = floor(lerp(2, 8, s / 100)); // simple=few, elaborate=many
  let showNumbers = q > 50;
  let warmColors = v < 50; // vision=warm, execution=cool
  let showComparison = i > 50;
  let showDelta = d < 50;

  // Draw the preview infographic
  let innerPad = 20;
  let innerX = px + innerPad;
  let innerY = py + innerPad;
  let innerW = pw - innerPad * 2;
  let innerH = ph - innerPad * 2;

  // Title of preview
  noStroke();
  fill(60);
  textAlign(CENTER, TOP);
  textSize(16);
  let previewTitle = showDelta ? 'Revenue Growth 2024-2025' : 'Revenue Overview 2025';
  if (showComparison) previewTitle = showDelta ? 'Product A vs B: Growth' : 'Product A vs B: Current';
  text(previewTitle, px + pw / 2, innerY);

  // Bar chart area
  let chartY = innerY + 30;
  let chartH = innerH - 50;
  let chartW = innerW;

  // Generate data
  let dataA = [65, 72, 58, 80, 45, 90, 55, 70];
  let dataB = [50, 68, 75, 60, 55, 70, 80, 65];

  let sets = showComparison ? 2 : 1;
  let totalBars = numElements * sets;
  let barGap = lerp(8, 3, s / 100);
  let groupGap = showComparison ? 4 : 0;
  let groupWidth = (chartW - barGap * (numElements + 1)) / numElements;
  let barWidth = showComparison ? (groupWidth - groupGap) / 2 : groupWidth;

  for (let bi = 0; bi < numElements; bi++) {
    let groupX = innerX + barGap + bi * (groupWidth + barGap);

    for (let si = 0; si < sets; si++) {
      let data = si === 0 ? dataA : dataB;
      let val = data[bi % data.length];
      let bh = (val / 100) * chartH;
      let bx = groupX + si * (barWidth + groupGap);
      let by = chartY + chartH - bh;

      // Color based on vision/execution
      if (warmColors) {
        if (si === 0) fill(255, 140, 50, lerp(255, 200, s / 100));
        else fill(255, 90, 90, lerp(255, 200, s / 100));
      } else {
        if (si === 0) fill(66, 133, 244, lerp(255, 200, s / 100));
        else fill(52, 168, 83, lerp(255, 200, s / 100));
      }

      noStroke();
      let cornerR = s < 30 ? 0 : 4;
      rect(bx, by, barWidth, bh, cornerR, cornerR, 0, 0);

      // Show numbers if quantitative
      if (showNumbers) {
        fill(60);
        textAlign(CENTER, BOTTOM);
        textSize(max(10, min(13, barWidth / 2.5)));
        noStroke();
        text(val + '%', bx + barWidth / 2, by - 2);
      }

      // Delta arrow
      if (showDelta && si === 0) {
        let delta = dataA[bi % dataA.length] - dataB[bi % dataB.length];
        if (abs(delta) > 5) {
          let arrowColor = delta > 0 ? [50, 170, 90] : [220, 60, 60];
          fill(arrowColor[0], arrowColor[1], arrowColor[2]);
          textSize(11);
          noStroke();
          textAlign(CENTER, TOP);
          text((delta > 0 ? '+' : '') + delta + '%', bx + barWidth / 2, by - 18);
        }
      }
    }
  }

  // X-axis labels
  let months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug'];
  fill(100);
  textAlign(CENTER, TOP);
  textSize(11);
  noStroke();
  for (let bi = 0; bi < numElements; bi++) {
    let groupX = innerX + barGap + bi * (groupWidth + barGap);
    text(months[bi], groupX + groupWidth / 2, chartY + chartH + 4);
  }

  // Legend if comparison
  if (showComparison) {
    let legendY = chartY + chartH + 22;
    textSize(12);
    if (warmColors) {
      fill(255, 140, 50);
      rect(innerX + chartW / 2 - 80, legendY, 12, 12, 2);
      fill(60); noStroke();
      textAlign(LEFT, TOP);
      text('Product A', innerX + chartW / 2 - 64, legendY);
      fill(255, 90, 90);
      rect(innerX + chartW / 2 + 10, legendY, 12, 12, 2);
      fill(60); noStroke();
      text('Product B', innerX + chartW / 2 + 26, legendY);
    } else {
      fill(66, 133, 244);
      rect(innerX + chartW / 2 - 80, legendY, 12, 12, 2);
      fill(60); noStroke();
      textAlign(LEFT, TOP);
      text('Product A', innerX + chartW / 2 - 64, legendY);
      fill(52, 168, 83);
      rect(innerX + chartW / 2 + 10, legendY, 12, 12, 2);
      fill(60); noStroke();
      text('Product B', innerX + chartW / 2 + 26, legendY);
    }
  }

  // Elaborate decorations
  if (s > 70) {
    // Axis lines
    stroke(180);
    strokeWeight(1);
    line(innerX, chartY, innerX, chartY + chartH);
    line(innerX, chartY + chartH, innerX + chartW, chartY + chartH);
    // Y-axis labels
    fill(150);
    noStroke();
    textAlign(RIGHT, CENTER);
    textSize(10);
    for (let yi = 0; yi <= 100; yi += 25) {
      let yy = chartY + chartH - (yi / 100) * chartH;
      text(yi + '%', innerX - 4, yy);
      stroke(230);
      strokeWeight(0.5);
      line(innerX, yy, innerX + chartW, yy);
      noStroke();
    }
  }

  // Vision label
  if (v < 30) {
    noStroke();
    fill(255, 140, 50, 180);
    textAlign(RIGHT, BOTTOM);
    textSize(14);
    text('Target: 85%+', innerX + chartW, chartY + 10);
  } else if (v > 70) {
    noStroke();
    fill(100, 100, 100, 180);
    textAlign(RIGHT, BOTTOM);
    textSize(12);
    text('Q3 Deadline: Sep 30', innerX + chartW, chartY + 10);
  }

  // Update audience description
  updateDescription(s, q, v, i, d);
}

function updateDescription(s, q, v, i, d) {
  let desc = document.getElementById('sqvid-desc');
  if (!desc) return;

  let audience = '';
  let style = '';

  if (s < 35) { style += 'Clean and minimal. '; audience += 'executives, '; }
  else if (s > 65) { style += 'Detailed and data-rich. '; audience += 'analysts, '; }
  else { style += 'Balanced detail level. '; audience += 'general audiences, '; }

  if (q < 35) { style += 'Story-driven with qualitative emphasis. '; audience += 'stakeholders, '; }
  else if (q > 65) { style += 'Numbers-forward with precise metrics. '; audience += 'data teams, '; }

  if (v < 35) { style += 'Aspirational and forward-looking. '; audience += 'leadership, '; }
  else if (v > 65) { style += 'Action-oriented with concrete deliverables. '; audience += 'project managers, '; }

  if (i > 65) { style += 'Comparative view highlighting differences. '; }
  else if (i < 35) { style += 'Single-focus view for clarity. '; }

  if (d < 35) { style += 'Change-oriented showing growth or decline.'; }
  else if (d > 65) { style += 'Snapshot of current state.'; }

  // Clean up audience
  audience = audience.replace(/, $/, '');

  desc.innerHTML = '<strong>Style:</strong> ' + style + '<br/><strong>Best suited for:</strong> ' + (audience || 'general audiences');
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
