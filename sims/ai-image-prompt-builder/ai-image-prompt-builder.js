// AI Image Generation Prompt Builder
// Build structured text-to-image prompts from categorized components
// Bloom Level: Apply (L3)

let containerWidth;
let canvasWidth = 400;
let drawHeight = 200;
let canvasHeight = drawHeight;

let selectedSubject = 'Cell Biology';
let selectedStyle = 'Flat Design';
let selectedComposition = 'Labeled Cross-Section';
let constraints = {
  noText: true,
  clearBoundaries: true,
  neutralBg: false,
  highContrast: false,
  landscape: false
};
let showTips = false;

let subjects = ['Cell Biology', 'Engine', 'Solar System', 'Computer Architecture', 'Human Heart', 'Water Cycle'];
let styles = ['Flat Design', 'Technical Illustration', 'Watercolor', 'Photorealistic', 'Minimalist Line Art'];
let compositions = ['Labeled Cross-Section', 'Exploded View', 'Block Diagram', 'Side-by-Side Comparison', 'Bird\'s Eye View'];

let tips = {
  subject: 'Be specific about the subject. "Animal cell with organelles visible" is better than just "cell." Include the level of detail needed for your overlay regions.',
  style: 'Flat design and technical illustration work best for overlay infographics because they have clean edges and uniform colors. Photorealistic images can make overlay boundaries harder to see.',
  composition: 'Cross-sections and exploded views expose internal structure, making them ideal for labeling exercises. Bird\'s eye views work well for geographic or spatial concepts.',
  constraints: 'Always request "no embedded text" — AI-generated text is often garbled and interferes with your overlay labels. "Neutral background" makes region detection easier.'
};

function setup() {
  updateCanvasSize();
  const canvas = createCanvas(canvasWidth, canvasHeight);
  canvas.parent(document.querySelector('main'));
  buildControls();
  describe('Prompt builder interface with dropdowns for subject, style, composition, and constraint checkboxes, generating a structured text-to-image prompt.');
}

function buildControls() {
  let mainEl = document.querySelector('main');
  let controlDiv = document.createElement('div');
  controlDiv.id = 'prompt-controls';
  controlDiv.style.cssText = 'background: white; border: 1px solid silver; padding: 16px; font-family: Arial, sans-serif; font-size: 14px;';
  mainEl.appendChild(controlDiv);

  // Grid layout for selectors
  let grid = document.createElement('div');
  grid.style.cssText = 'display: grid; grid-template-columns: 1fr 1fr; gap: 12px; margin-bottom: 12px;';

  // Subject
  grid.appendChild(createSelector('Subject', subjects, selectedSubject, function(v) {
    selectedSubject = v;
    updatePrompt();
  }));

  // Style
  grid.appendChild(createSelector('Visual Style', styles, selectedStyle, function(v) {
    selectedStyle = v;
    updatePrompt();
  }));

  // Composition
  grid.appendChild(createSelector('Composition', compositions, selectedComposition, function(v) {
    selectedComposition = v;
    updatePrompt();
  }));

  // Constraints
  let constraintDiv = document.createElement('div');
  let constraintLabel = document.createElement('div');
  constraintLabel.textContent = 'Overlay Constraints';
  constraintLabel.style.cssText = 'font-weight: bold; margin-bottom: 4px; color: #333;';
  constraintDiv.appendChild(constraintLabel);

  let constraintItems = [
    { key: 'noText', label: 'No embedded text' },
    { key: 'clearBoundaries', label: 'Clear region boundaries' },
    { key: 'neutralBg', label: 'Neutral background' },
    { key: 'highContrast', label: 'High contrast colors' },
    { key: 'landscape', label: 'Landscape orientation' }
  ];
  constraintItems.forEach(function(item) {
    let lbl = document.createElement('label');
    lbl.style.cssText = 'display: flex; align-items: center; gap: 4px; cursor: pointer; font-size: 13px; margin: 2px 0;';
    let cb = document.createElement('input');
    cb.type = 'checkbox';
    cb.checked = constraints[item.key];
    cb.addEventListener('change', function() {
      constraints[item.key] = cb.checked;
      updatePrompt();
    });
    lbl.appendChild(cb);
    lbl.appendChild(document.createTextNode(item.label));
    constraintDiv.appendChild(lbl);
  });
  grid.appendChild(constraintDiv);

  controlDiv.appendChild(grid);

  // Tips toggle
  let tipRow = document.createElement('div');
  tipRow.style.cssText = 'display: flex; gap: 12px; align-items: center; justify-content: center; margin-bottom: 10px;';

  let tipToggle = document.createElement('label');
  tipToggle.style.cssText = 'display: flex; align-items: center; gap: 6px; cursor: pointer; padding: 4px 10px; border: 2px solid #34A853; border-radius: 6px; font-weight: bold; color: #34A853; font-size: 13px;';
  let tipCb = document.createElement('input');
  tipCb.type = 'checkbox';
  tipCb.style.cssText = 'width: 16px; height: 16px;';
  tipCb.addEventListener('change', function() {
    showTips = tipCb.checked;
    tipToggle.style.background = tipCb.checked ? '#34A85315' : 'white';
    document.getElementById('tips-panel').style.display = tipCb.checked ? 'block' : 'none';
  });
  tipToggle.appendChild(tipCb);
  tipToggle.appendChild(document.createTextNode('Show Prompt Tips'));
  tipRow.appendChild(tipToggle);

  let copyBtn = document.createElement('button');
  copyBtn.textContent = 'Copy Prompt';
  copyBtn.style.cssText = 'padding: 6px 14px; font-size: 14px; cursor: pointer; border: 1px solid #4285F4; border-radius: 4px; background: #4285F4; color: white; font-weight: bold;';
  copyBtn.addEventListener('click', function() {
    let promptText = document.getElementById('prompt-output').textContent;
    navigator.clipboard.writeText(promptText).then(function() {
      copyBtn.textContent = 'Copied!';
      setTimeout(function() { copyBtn.textContent = 'Copy Prompt'; }, 2000);
    });
  });
  tipRow.appendChild(copyBtn);

  let resetBtn = document.createElement('button');
  resetBtn.textContent = 'Reset';
  resetBtn.style.cssText = 'padding: 6px 14px; font-size: 14px; cursor: pointer; border: 1px solid silver; border-radius: 4px; background: #f0f0f0;';
  resetBtn.addEventListener('click', function() {
    selectedSubject = 'Cell Biology';
    selectedStyle = 'Flat Design';
    selectedComposition = 'Labeled Cross-Section';
    constraints = { noText: true, clearBoundaries: true, neutralBg: false, highContrast: false, landscape: false };
    // Reset UI
    controlDiv.querySelectorAll('select').forEach(function(sel) {
      if (sel.dataset.category === 'Subject') sel.value = selectedSubject;
      if (sel.dataset.category === 'Visual Style') sel.value = selectedStyle;
      if (sel.dataset.category === 'Composition') sel.value = selectedComposition;
    });
    controlDiv.querySelectorAll('input[type=checkbox]').forEach(function(cb, idx) {
      if (idx < 5) cb.checked = [true, true, false, false, false][idx];
    });
    updatePrompt();
  });
  tipRow.appendChild(resetBtn);

  controlDiv.appendChild(tipRow);

  // Tips panel
  let tipsPanel = document.createElement('div');
  tipsPanel.id = 'tips-panel';
  tipsPanel.style.cssText = 'display: none; background: #e8f5e9; border: 1px solid #34A853; border-radius: 6px; padding: 10px; margin-bottom: 10px; font-size: 13px; line-height: 1.5;';
  tipsPanel.innerHTML =
    '<strong>Subject:</strong> ' + tips.subject + '<br/><br/>' +
    '<strong>Visual Style:</strong> ' + tips.style + '<br/><br/>' +
    '<strong>Composition:</strong> ' + tips.composition + '<br/><br/>' +
    '<strong>Constraints:</strong> ' + tips.constraints;
  controlDiv.appendChild(tipsPanel);

  // Prompt output
  let promptLabel = document.createElement('div');
  promptLabel.textContent = 'Generated Prompt:';
  promptLabel.style.cssText = 'font-weight: bold; margin-bottom: 4px;';
  controlDiv.appendChild(promptLabel);

  let promptOutput = document.createElement('div');
  promptOutput.id = 'prompt-output';
  promptOutput.style.cssText = 'background: #1e1e1e; color: #4ec9b0; padding: 12px; border-radius: 6px; font-family: monospace; font-size: 13px; line-height: 1.6; word-wrap: break-word;';
  controlDiv.appendChild(promptOutput);

  updatePrompt();
}

function createSelector(label, options, defaultVal, onChange) {
  let div = document.createElement('div');
  let lbl = document.createElement('div');
  lbl.textContent = label;
  lbl.style.cssText = 'font-weight: bold; margin-bottom: 4px; color: #333;';
  div.appendChild(lbl);

  let sel = document.createElement('select');
  sel.dataset.category = label;
  sel.style.cssText = 'width: 100%; padding: 6px; font-size: 14px; border: 1px solid silver; border-radius: 4px;';
  options.forEach(function(opt) {
    let o = document.createElement('option');
    o.value = opt;
    o.textContent = opt;
    if (opt === defaultVal) o.selected = true;
    sel.appendChild(o);
  });
  sel.addEventListener('change', function() { onChange(sel.value); });
  div.appendChild(sel);
  return div;
}

function updatePrompt() {
  let parts = [];
  parts.push('Create a ' + selectedStyle.toLowerCase() + ' illustration of ' + selectedSubject.toLowerCase());
  parts.push('shown as a ' + selectedComposition.toLowerCase());

  let constraintParts = [];
  if (constraints.noText) constraintParts.push('no embedded text or labels');
  if (constraints.clearBoundaries) constraintParts.push('clear visual boundaries between regions');
  if (constraints.neutralBg) constraintParts.push('plain neutral background');
  if (constraints.highContrast) constraintParts.push('high contrast colors for accessibility');
  if (constraints.landscape) constraintParts.push('landscape orientation (16:9 aspect ratio)');

  if (constraintParts.length > 0) {
    parts.push('with ' + constraintParts.join(', '));
  }

  parts.push('suitable for interactive overlay labeling in an educational context');

  let promptText = parts.join(', ') + '.';

  let promptOutput = document.getElementById('prompt-output');
  if (promptOutput) promptOutput.textContent = promptText;
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
  textSize(18);
  text('AI Image Prompt Builder', canvasWidth / 2, 8);

  // Visual comparison of good vs bad prompts
  let colW = canvasWidth / 3;

  // Bad prompt example
  let bx = colW * 0.5;
  fill(229, 57, 53, 30);
  stroke(229, 57, 53);
  strokeWeight(1);
  rect(bx - 55, 40, 110, 90, 6);
  fill(229, 57, 53);
  noStroke();
  textAlign(CENTER, TOP);
  textSize(11);
  text('Vague Prompt', bx, 44);
  // Messy preview
  fill(200, 200, 200);
  noStroke();
  rect(bx - 40, 60, 80, 55, 3);
  fill(150);
  textSize(9);
  textAlign(CENTER, CENTER);
  text('Unclear layout\ngarbled text\nbusy background', bx, 87);
  // Red X
  fill(229, 57, 53);
  textSize(18);
  text('✗', bx + 40, 42);

  // Good prompt example
  let gx = colW * 1.5;
  fill(52, 168, 83, 30);
  stroke(52, 168, 83);
  strokeWeight(1);
  rect(gx - 55, 40, 110, 90, 6);
  fill(52, 168, 83);
  noStroke();
  textAlign(CENTER, TOP);
  textSize(11);
  text('Structured Prompt', gx, 44);
  // Clean preview
  fill(230, 245, 235);
  noStroke();
  rect(gx - 40, 60, 80, 55, 3);
  stroke(52, 168, 83, 100);
  strokeWeight(1);
  rect(gx - 35, 65, 30, 20, 2);
  rect(gx + 5, 65, 30, 20, 2);
  rect(gx - 35, 90, 70, 18, 2);
  fill(52, 168, 83);
  textSize(18);
  noStroke();
  text('✓', gx + 40, 42);

  // No text example
  let nx = colW * 2.5;
  fill(66, 133, 244, 30);
  stroke(66, 133, 244);
  strokeWeight(1);
  rect(nx - 55, 40, 110, 90, 6);
  fill(66, 133, 244);
  noStroke();
  textAlign(CENTER, TOP);
  textSize(11);
  text('"No Text" Constraint', nx, 44);
  fill(220, 235, 255);
  noStroke();
  rect(nx - 40, 60, 80, 55, 3);
  stroke(66, 133, 244, 100);
  strokeWeight(1);
  ellipse(nx, 85, 40, 40);
  line(nx - 15, 75, nx + 15, 95);
  fill(66, 133, 244);
  textSize(9);
  noStroke();
  textAlign(CENTER, CENTER);
  text('Clean for\noverlay labels', nx, 85);

  // Subtitle
  fill(120);
  noStroke();
  textAlign(CENTER, BOTTOM);
  textSize(14);
  text('Build structured prompts for overlay-ready illustrations', canvasWidth / 2, drawHeight - 6);
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
