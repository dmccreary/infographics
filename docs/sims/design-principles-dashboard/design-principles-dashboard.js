// Design Principles Synthesis Dashboard
// Design an interactive infographic layout by combining design principles
// and evaluating against a quality rubric.
// Bloom Level: Create (L6)

let containerWidth;
let canvasWidth = 400;
let drawHeight = 500;
let controlHeight = 50;
let canvasHeight = drawHeight + controlHeight;
let containerHeight = canvasHeight;
let margin = 15;

// Design options state
let encoding = 0;       // 0=Position, 1=Length, 2=Color, 3=Size
let encoding2 = 0;      // secondary encoding
let proximity = 50;     // 0-100
let contrast = 30;      // 0-100
let gridSnap = false;
let repetition = false;
let palette = 0;        // 0=Sequential, 1=Diverging, 2=Categorical, 3=Semantic
let interaction = 0;    // 0=Tooltip, 1=Hover+Click, 2=Step, 3=Drill
let accessAlt = false;
let accessKeyboard = false;
let accessAria = false;
let accessHighContrast = false;
let showBreakdown = false;

const encodingNames = ['Position', 'Length', 'Color', 'Size'];
const paletteNames = ['Sequential', 'Diverging', 'Categorical', 'Semantic'];
const interactionNames = ['Tooltip Only', 'Hover + Click', 'Step Reveal', 'Drill Down'];

// Simulated data elements
const dataValues = [85, 42, 67, 91, 23, 55, 78, 36];
const dataLabels = ['Biology', 'Physics', 'Chemistry', 'Math', 'Art', 'History', 'English', 'Music'];

// Color palettes
const palettes = {
  0: ['#08306b','#2171b5','#4292c6','#6baed6','#9ecae1','#c6dbef','#deebf7','#f7fbff'],
  1: ['#b2182b','#d6604d','#f4a582','#fddbc7','#d1e5f0','#92c5de','#4393c3','#2166ac'],
  2: ['#e41a1c','#377eb8','#4daf4a','#984ea3','#ff7f00','#a65628','#f781bf','#999999'],
  3: ['#d32f2f','#f57c00','#fbc02d','#388e3c','#1976d2','#7b1fa2','#5d4037','#455a64']
};

let scrollY = 0;
let hoveredElement = -1;

function setup() {
  updateCanvasSize();
  const canvas = createCanvas(containerWidth, containerHeight);
  var mainElement = document.querySelector('main');
  canvas.parent(mainElement);
  textFont('Arial');
  buildControls();
}

function buildControls() {
  let mainEl = document.querySelector('main');
  let panel = document.createElement('div');
  panel.id = 'control-panel';
  panel.style.cssText = 'background:white; border:1px solid silver; padding:12px; font-family:Arial,sans-serif; font-size:13px; line-height:1.8; max-width:100%; box-sizing:border-box;';

  panel.innerHTML = `
    <div style="display:flex; flex-wrap:wrap; gap:20px;">
      <div style="flex:1; min-width:200px;">
        <strong>Visual Encoding</strong><br/>
        Primary: <select id="enc1">${encodingNames.map((n,i)=>`<option value="${i}">${n}</option>`).join('')}</select><br/>
        Secondary: <select id="enc2">${encodingNames.map((n,i)=>`<option value="${i}">${n}</option>`).join('')}</select>

        <br/><br/><strong>Gestalt Principles</strong><br/>
        Proximity: <input type="range" id="prox" min="0" max="100" value="50" style="width:120px"> <span id="proxVal">50</span><br/>
        Contrast: <input type="range" id="cont" min="0" max="100" value="30" style="width:120px"> <span id="contVal">30</span><br/>
        <label><input type="checkbox" id="grid"> Alignment (Grid)</label><br/>
        <label><input type="checkbox" id="rep"> Repetition (Consistent)</label>
      </div>
      <div style="flex:1; min-width:200px;">
        <strong>Color Palette</strong><br/>
        ${paletteNames.map((n,i)=>`<label><input type="radio" name="pal" value="${i}" ${i===0?'checked':''}> ${n}</label><br/>`).join('')}
        <div id="palPreview" style="display:flex; gap:2px; margin:4px 0;"></div>

        <br/><strong>Interaction Pattern</strong><br/>
        ${interactionNames.map((n,i)=>`<label><input type="radio" name="inter" value="${i}" ${i===0?'checked':''}> ${n}</label><br/>`).join('')}
      </div>
      <div style="flex:1; min-width:200px;">
        <strong>Accessibility</strong><br/>
        <label><input type="checkbox" id="accAlt"> Alt text</label><br/>
        <label><input type="checkbox" id="accKey"> Keyboard nav</label><br/>
        <label><input type="checkbox" id="accAria"> ARIA labels</label><br/>
        <label><input type="checkbox" id="accHC"> High contrast</label><br/><br/>
        <button id="autoBtn" style="padding:6px 12px; background:#4A90D9; color:white; border:none; border-radius:4px; cursor:pointer;">Auto-Optimize</button>
        <button id="resetBtn" style="padding:6px 12px; background:#E74C3C; color:white; border:none; border-radius:4px; cursor:pointer;">Reset</button>
      </div>
    </div>
    <div id="designNotes" style="margin-top:10px; padding:8px; background:#FFF8E1; border-left:3px solid #FFC107; font-size:12px;"></div>
  `;
  mainEl.appendChild(panel);

  // Event listeners
  document.getElementById('enc1').addEventListener('change', function(){ encoding = parseInt(this.value); });
  document.getElementById('enc2').addEventListener('change', function(){ encoding2 = parseInt(this.value); });
  document.getElementById('prox').addEventListener('input', function(){ proximity = parseInt(this.value); document.getElementById('proxVal').textContent = this.value; });
  document.getElementById('cont').addEventListener('input', function(){ contrast = parseInt(this.value); document.getElementById('contVal').textContent = this.value; });
  document.getElementById('grid').addEventListener('change', function(){ gridSnap = this.checked; });
  document.getElementById('rep').addEventListener('change', function(){ repetition = this.checked; });
  document.querySelectorAll('[name="pal"]').forEach(r => r.addEventListener('change', function(){ palette = parseInt(this.value); updatePalettePreview(); }));
  document.querySelectorAll('[name="inter"]').forEach(r => r.addEventListener('change', function(){ interaction = parseInt(this.value); }));
  document.getElementById('accAlt').addEventListener('change', function(){ accessAlt = this.checked; });
  document.getElementById('accKey').addEventListener('change', function(){ accessKeyboard = this.checked; });
  document.getElementById('accAria').addEventListener('change', function(){ accessAria = this.checked; });
  document.getElementById('accHC').addEventListener('change', function(){ accessHighContrast = this.checked; });

  document.getElementById('autoBtn').addEventListener('click', autoOptimize);
  document.getElementById('resetBtn').addEventListener('click', resetAll);

  updatePalettePreview();
}

function updatePalettePreview() {
  let div = document.getElementById('palPreview');
  if (!div) return;
  let colors = palettes[palette];
  div.innerHTML = colors.slice(0, 5).map(c => `<div style="width:24px;height:24px;background:${c};border-radius:3px;"></div>`).join('');
}

function autoOptimize() {
  encoding = 0; // Position is most accurate
  encoding2 = 1; // Length as secondary
  proximity = 80;
  contrast = 75;
  gridSnap = true;
  repetition = true;
  palette = 2; // Categorical
  interaction = 1; // Hover+Click
  accessAlt = true;
  accessKeyboard = true;
  accessAria = true;
  accessHighContrast = false;

  // Update UI
  document.getElementById('enc1').value = encoding;
  document.getElementById('enc2').value = encoding2;
  document.getElementById('prox').value = proximity;
  document.getElementById('proxVal').textContent = proximity;
  document.getElementById('cont').value = contrast;
  document.getElementById('contVal').textContent = contrast;
  document.getElementById('grid').checked = gridSnap;
  document.getElementById('rep').checked = repetition;
  document.querySelectorAll('[name="pal"]')[palette].checked = true;
  document.querySelectorAll('[name="inter"]')[interaction].checked = true;
  document.getElementById('accAlt').checked = accessAlt;
  document.getElementById('accKey').checked = accessKeyboard;
  document.getElementById('accAria').checked = accessAria;
  document.getElementById('accHC').checked = accessHighContrast;
  updatePalettePreview();
}

function resetAll() {
  encoding = 0; encoding2 = 0; proximity = 50; contrast = 30;
  gridSnap = false; repetition = false; palette = 0; interaction = 0;
  accessAlt = false; accessKeyboard = false; accessAria = false; accessHighContrast = false;

  document.getElementById('enc1').value = 0;
  document.getElementById('enc2').value = 0;
  document.getElementById('prox').value = 50;
  document.getElementById('proxVal').textContent = '50';
  document.getElementById('cont').value = 30;
  document.getElementById('contVal').textContent = '30';
  document.getElementById('grid').checked = false;
  document.getElementById('rep').checked = false;
  document.querySelectorAll('[name="pal"]')[0].checked = true;
  document.querySelectorAll('[name="inter"]')[0].checked = true;
  document.getElementById('accAlt').checked = false;
  document.getElementById('accKey').checked = false;
  document.getElementById('accAria').checked = false;
  document.getElementById('accHC').checked = false;
  updatePalettePreview();
}

function calculateScore() {
  let score = 15; // baseline
  let notes = [];

  // Encoding (max 25 pts)
  if (encoding === 0) { score += 25; } // Position is most accurate
  else if (encoding === 1) { score += 20; notes.push('Position encoding is more accurate than Length for quantitative data.'); }
  else if (encoding === 3) { score += 15; notes.push('Size encoding has low precision. Consider Position or Length.'); }
  else { score += 10; notes.push('Color encoding is poor for quantitative comparison. Use it for categories instead.'); }

  if (encoding !== encoding2) score += 5; // dual encoding bonus
  else notes.push('Using different primary and secondary encodings improves readability.');

  // Gestalt (max 20 pts)
  if (proximity > 60) score += 5;
  if (contrast > 50) score += 5;
  if (gridSnap) score += 5;
  if (repetition) score += 5;
  if (proximity < 30) notes.push('Low proximity makes grouping unclear. Increase spacing between groups.');
  if (contrast < 30) notes.push('Low contrast makes important elements hard to distinguish.');

  // Palette (max 10 pts)
  if (palette === 2) score += 10; // Categorical best for distinct items
  else if (palette === 3) score += 8;
  else score += 5;

  // Interaction (max 10 pts)
  if (interaction >= 1) score += 5;
  if (interaction >= 2) score += 5;

  // Accessibility (max 15 pts)
  if (accessAlt) score += 4;
  if (accessKeyboard) score += 4;
  if (accessAria) score += 4;
  if (accessHighContrast) score += 3;
  let accCount = [accessAlt, accessKeyboard, accessAria, accessHighContrast].filter(Boolean).length;
  if (accCount === 0) notes.push('No accessibility features selected. Add alt text and keyboard navigation.');

  score = min(score, 100);

  // Update notes display
  let notesDiv = document.getElementById('designNotes');
  if (notesDiv) {
    if (notes.length === 0) {
      notesDiv.innerHTML = '<strong>Design Notes:</strong> Excellent configuration! All principles well applied.';
    } else {
      notesDiv.innerHTML = '<strong>Design Notes:</strong><br/>' + notes.map(n => '• ' + n).join('<br/>');
    }
  }

  return score;
}

function draw() {
  updateCanvasSize();

  // Drawing area
  fill('aliceblue');
  stroke('silver');
  strokeWeight(1);
  rect(0, 0, canvasWidth, drawHeight);

  // Title and score
  noStroke();
  fill('#333');
  textAlign(CENTER, TOP);
  textSize(18);
  text('Live Preview', canvasWidth / 2, 8);

  let score = calculateScore();
  drawScoreGauge(canvasWidth - 80, 10, score);

  // Draw the 8 data elements based on current settings
  drawDataElements();
}

function drawScoreGauge(x, y, score) {
  // Score circle
  let gaugeSize = 50;
  let scoreColor;
  if (score >= 80) scoreColor = '#2ECC71';
  else if (score >= 60) scoreColor = '#F39C12';
  else if (score >= 40) scoreColor = '#E67E22';
  else scoreColor = '#E74C3C';

  noFill();
  stroke('#DDD');
  strokeWeight(4);
  arc(x, y + gaugeSize/2, gaugeSize, gaugeSize, -HALF_PI, -HALF_PI + TWO_PI);

  stroke(scoreColor);
  strokeWeight(4);
  let angle = map(score, 0, 100, 0, TWO_PI);
  arc(x, y + gaugeSize/2, gaugeSize, gaugeSize, -HALF_PI, -HALF_PI + angle);

  noStroke();
  fill(scoreColor);
  textAlign(CENTER, CENTER);
  textSize(16);
  text(score, x, y + gaugeSize/2);
  textSize(9);
  fill('#666');
  text('Quality', x, y + gaugeSize/2 + 14);
}

function drawDataElements() {
  let colors = palettes[palette];
  let areaX = 30;
  let areaY = 60;
  let areaW = canvasWidth - 60;
  let areaH = drawHeight - 80;

  // Background for data area
  noStroke();
  fill(255, 255, 255, 80);
  rect(areaX, areaY, areaW, areaH, 5);

  hoveredElement = -1;

  for (let i = 0; i < dataValues.length; i++) {
    let val = dataValues[i];
    let col = colors[i % colors.length];
    let hc = accessHighContrast;

    // Determine position based on encoding
    let ex, ey, ew, eh;
    let spacing = map(proximity, 0, 100, 5, 25);

    if (encoding === 0) {
      // Position encoding: y-position represents value
      let cols = 4;
      let row = floor(i / cols);
      let colIdx = i % cols;
      let cellW = (areaW - spacing * (cols + 1)) / cols;
      let cellH = 40;

      if (gridSnap) {
        ex = areaX + spacing + colIdx * (cellW + spacing);
      } else {
        ex = areaX + spacing + colIdx * (cellW + spacing) + sin(i * 1.7) * 10;
      }
      ey = areaY + 20 + map(val, 0, 100, areaH - 80, 20) + row * 15;
      ew = cellW;
      eh = cellH;
    } else if (encoding === 1) {
      // Length encoding: bar height represents value
      let barW = (areaW - spacing * 9) / 8;
      ex = areaX + spacing + i * (barW + spacing);
      if (gridSnap) ex = areaX + spacing + i * (barW + spacing);
      else ex += sin(i * 2.3) * 5;
      eh = map(val, 0, 100, 20, areaH - 40);
      ey = areaY + areaH - eh - 20;
      ew = barW;
    } else if (encoding === 2) {
      // Color encoding: color intensity represents value (less effective)
      let cols = 4;
      let row = floor(i / cols);
      let colIdx = i % cols;
      let cellW = (areaW - spacing * 5) / 4;
      let cellH = (areaH - spacing * 3 - 40) / 2;
      ex = areaX + spacing + colIdx * (cellW + spacing);
      ey = areaY + 20 + row * (cellH + spacing);
      ew = cellW;
      eh = cellH;
      // Override color with intensity
      let intensity = map(val, 0, 100, 220, 40);
      col = color(intensity, intensity, 255 - intensity * 0.3);
    } else {
      // Size encoding: area represents value
      let cols = 4;
      let row = floor(i / cols);
      let colIdx = i % cols;
      let maxSize = min((areaW - 40) / 4, (areaH - 40) / 2) * 0.8;
      let sz = map(val, 0, 100, 15, maxSize);
      ex = areaX + 40 + colIdx * (areaW / 4);
      ey = areaY + 50 + row * (areaH / 2 - 20);
      ew = sz;
      eh = sz;
    }

    // Check hover
    let isHovered = false;
    if (encoding === 3) {
      isHovered = dist(mouseX, mouseY, ex, ey) < ew / 2;
    } else {
      isHovered = mouseX >= ex && mouseX <= ex + ew && mouseY >= ey && mouseY <= ey + eh;
    }
    if (isHovered) hoveredElement = i;

    // Apply contrast
    let alpha = map(contrast, 0, 100, 100, 255);

    // Draw element
    if (hc) {
      stroke(0);
      strokeWeight(2);
    } else {
      noStroke();
    }

    if (typeof col === 'string') {
      let c = color(col);
      c.setAlpha(alpha);
      fill(c);
    } else {
      col.setAlpha(alpha);
      fill(col);
    }

    if (encoding === 3) {
      ellipse(ex, ey, ew, eh);
    } else {
      if (repetition) {
        rect(ex, ey, ew, eh, 5);
      } else {
        // Inconsistent styles without repetition
        if (i % 3 === 0) rect(ex, ey, ew, eh);
        else if (i % 3 === 1) rect(ex, ey, ew, eh, 10);
        else ellipse(ex + ew/2, ey + eh/2, ew, eh);
      }
    }

    // Label
    noStroke();
    fill(hc ? 0 : '#333');
    textAlign(CENTER, TOP);
    textSize(11);
    if (encoding === 3) {
      text(dataLabels[i], ex, ey + eh/2 + 5);
    } else {
      text(dataLabels[i], ex + ew/2, ey + eh + 3);
    }

    // Secondary encoding indicator
    if (encoding !== encoding2) {
      drawSecondaryEncoding(encoding2, val, ex, ey, ew, eh, i);
    }

    // Hover tooltip
    if (isHovered && interaction >= 0) {
      drawTooltip(dataLabels[i], val, mouseX, mouseY);
    }
  }
}

function drawSecondaryEncoding(enc2, val, ex, ey, ew, eh, idx) {
  // Small indicator showing secondary encoding
  noStroke();
  fill(0, 0, 0, 60);
  textSize(9);
  textAlign(LEFT, TOP);
  if (enc2 === 3) {
    let dotR = map(val, 0, 100, 3, 10);
    ellipse(ex + 5, ey + 5, dotR * 2);
  }
}

function drawTooltip(label, val, mx, my) {
  let tipW = 120;
  let tipH = 36;
  let tx = mx + 15;
  let ty = my - 10;
  if (tx + tipW > canvasWidth) tx = mx - tipW - 10;
  if (ty < 0) ty = 5;

  fill(0, 0, 0, 200);
  noStroke();
  rect(tx, ty, tipW, tipH, 5);

  fill(255);
  textAlign(LEFT, TOP);
  textSize(12);
  text(label + ': ' + val + '%', tx + 8, ty + 5);
  textSize(10);
  fill(200);
  text(encodingNames[encoding] + ' encoded', tx + 8, ty + 20);
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
