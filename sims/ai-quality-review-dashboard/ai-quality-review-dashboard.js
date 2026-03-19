// AI Quality Review Dashboard
// Evaluate AI-generated MicroSim quality with checklist scoring
// Bloom Level: Evaluate (L5)

let containerWidth;
let canvasWidth = 400;
let drawHeight = 300;
let canvasHeight = drawHeight;

let hoveredRegion = -1;
let showIssuesFlag = false;
let currentSample = 0;

let samples = [
  {
    name: 'Cell Biology (5 issues)',
    regions: [
      { name: 'Nucleus', x: 0.5, y: 0.3, w: 0.16, h: 0.14, color: [160, 80, 160], desc: 'Contains DNA and directs cell activities.' },
      { name: 'Mitochondria', x: 0.3, y: 0.5, w: 0.12, h: 0.08, color: [200, 100, 60], desc: 'Generates ATP via cellular respiration.' },
      { name: 'Chloroplast', x: 0.7, y: 0.45, w: 0.12, h: 0.1, color: [80, 180, 80], desc: 'Generates ATP through photosynthesis.', issue: 'Factual error: Chloroplasts are in plant cells, not animal cells' },
      { name: 'Ribosome', x: 0.6, y: 0.65, w: 0.1, h: 0.07, color: [100, 140, 200], desc: 'Synthesizes proteins.', issue: 'Region misaligned — highlight is offset from visual' },
      { name: 'Cell Membrane', x: 0.5, y: 0.85, w: 0.55, h: 0.06, color: [120, 170, 120], desc: 'Controls transport in and out of cell.' }
    ],
    issues: [
      'Factual error: Region 3 shows chloroplasts in an animal cell — chloroplasts only exist in plant cells',
      'Misaligned region: Ribosome highlight does not match the visual position',
      'Missing metadata: dc:rights field absent from metadata.json',
      'Responsiveness: Font size does not scale on window resize',
      'Reading level: "Generates ATP via cellular respiration" is too advanced for target grade level'
    ]
  },
  {
    name: 'Engine Diagram (3 issues)',
    regions: [
      { name: 'Piston', x: 0.4, y: 0.35, w: 0.14, h: 0.2, color: [150, 150, 150], desc: 'Moves up and down to compress fuel-air mixture.' },
      { name: 'Crankshaft', x: 0.5, y: 0.7, w: 0.3, h: 0.08, color: [120, 120, 140], desc: 'Converts piston motion to rotational motion.' },
      { name: 'Spark Plug', x: 0.6, y: 0.2, w: 0.08, h: 0.1, color: [200, 180, 60], desc: 'Ignites the fuel-air mixture.' },
      { name: 'Valve', x: 0.35, y: 0.2, w: 0.08, h: 0.1, color: [180, 100, 100], desc: 'Controls intake and exhaust flow.' }
    ],
    issues: [
      'Factual error: Spark plug described as "igniting fuel" without mentioning electrical spark mechanism',
      'Missing metadata: dc:contributor field absent',
      'Responsiveness: Controls overlap at widths below 400px'
    ]
  },
  {
    name: 'Network Architecture (7 issues)',
    regions: [
      { name: 'Client', x: 0.2, y: 0.3, w: 0.12, h: 0.1, color: [66, 133, 244], desc: 'Sends HTTP requests to the server.' },
      { name: 'Load Balancer', x: 0.5, y: 0.3, w: 0.14, h: 0.1, color: [251, 140, 0], desc: 'Distributes traffic across servers.' },
      { name: 'Web Server', x: 0.5, y: 0.55, w: 0.14, h: 0.1, color: [52, 168, 83], desc: 'Processes requests and serves responses.' },
      { name: 'Database', x: 0.8, y: 0.55, w: 0.12, h: 0.12, color: [128, 90, 213], desc: 'Stores and retrieves persistent data.' },
      { name: 'Cache', x: 0.2, y: 0.55, w: 0.1, h: 0.08, color: [229, 57, 53], desc: 'Stores frequent responses for fast access.' }
    ],
    issues: [
      'Factual error: Load balancer described without mention of health checks',
      'Factual error: Cache description omits TTL (time-to-live) concept',
      'Misaligned region: Database highlight positioned incorrectly',
      'Missing metadata: dc:rights, dc:language, and dc:date fields absent',
      'Responsiveness: Canvas does not resize on window change',
      'Reading level: "Distributes traffic across servers" needs simpler language',
      'Accessibility: No describe() call for screen readers'
    ]
  }
];

let categories = [
  { name: 'Factual Accuracy', items: [
    { text: 'All region descriptions are factually correct', state: 0 },
    { text: 'Terminology matches the target subject area', state: 0 },
    { text: 'No misleading simplifications', state: 0 }
  ]},
  { name: 'Visual Alignment', items: [
    { text: 'Hover regions align with visual elements', state: 0 },
    { text: 'Colors are distinguishable and meaningful', state: 0 }
  ]},
  { name: 'Metadata Completeness', items: [
    { text: 'All Dublin Core required fields present', state: 0 },
    { text: 'Bloom level and learning objective specified', state: 0 },
    { text: 'License (dc:rights) included', state: 0 }
  ]},
  { name: 'Responsiveness', items: [
    { text: 'Canvas resizes with container', state: 0 },
    { text: 'Controls remain usable at narrow widths', state: 0 }
  ]},
  { name: 'Pedagogical Fit', items: [
    { text: 'Reading level appropriate for audience', state: 0 },
    { text: 'Learning objective is achievable through interaction', state: 0 }
  ]}
];

function setup() {
  updateCanvasSize();
  const canvas = createCanvas(canvasWidth, canvasHeight);
  canvas.parent(document.querySelector('main'));
  buildControls();
  describe('Quality review dashboard with a sample AI-generated MicroSim and a structured checklist for evaluating content, alignment, metadata, responsiveness, and pedagogical fit.');
}

function buildControls() {
  let mainEl = document.querySelector('main');
  let controlDiv = document.createElement('div');
  controlDiv.id = 'review-controls';
  controlDiv.style.cssText = 'background: white; border: 1px solid silver; padding: 12px; font-family: Arial, sans-serif; font-size: 14px;';
  mainEl.appendChild(controlDiv);

  let btnRow = document.createElement('div');
  btnRow.style.cssText = 'display: flex; flex-wrap: wrap; gap: 8px; align-items: center; justify-content: center; margin-bottom: 10px;';

  // Sample selector
  let selLabel = document.createElement('label');
  selLabel.textContent = 'Sample: ';
  selLabel.style.fontWeight = 'bold';
  let sel = document.createElement('select');
  sel.style.cssText = 'padding: 4px 8px; font-size: 14px; border: 1px solid silver; border-radius: 4px;';
  samples.forEach(function(s, i) {
    let o = document.createElement('option');
    o.value = i;
    o.textContent = s.name;
    sel.appendChild(o);
  });
  sel.addEventListener('change', function() {
    currentSample = parseInt(sel.value);
    showIssuesFlag = false;
    categories.forEach(function(c) { c.items.forEach(function(it) { it.state = 0; }); });
    updateChecklist();
  });
  selLabel.appendChild(sel);
  btnRow.appendChild(selLabel);

  let revealBtn = document.createElement('button');
  revealBtn.textContent = 'Reveal Issues';
  revealBtn.id = 'reveal-btn';
  revealBtn.style.cssText = 'padding: 6px 14px; font-size: 14px; cursor: pointer; border: 1px solid #E53935; border-radius: 4px; background: #E53935; color: white; font-weight: bold;';
  revealBtn.addEventListener('click', function() {
    showIssuesFlag = !showIssuesFlag;
    revealBtn.textContent = showIssuesFlag ? 'Hide Issues' : 'Reveal Issues';
  });
  btnRow.appendChild(revealBtn);

  let resetBtn = document.createElement('button');
  resetBtn.textContent = 'Reset Review';
  resetBtn.style.cssText = 'padding: 6px 14px; font-size: 14px; cursor: pointer; border: 1px solid silver; border-radius: 4px; background: #f0f0f0;';
  resetBtn.addEventListener('click', function() {
    showIssuesFlag = false;
    document.getElementById('reveal-btn').textContent = 'Reveal Issues';
    categories.forEach(function(c) { c.items.forEach(function(it) { it.state = 0; }); });
    updateChecklist();
  });
  btnRow.appendChild(resetBtn);

  let scoreSpan = document.createElement('span');
  scoreSpan.id = 'quality-score';
  scoreSpan.style.cssText = 'font-weight: bold; font-size: 16px;';
  btnRow.appendChild(scoreSpan);

  controlDiv.appendChild(btnRow);

  // Checklist and findings
  let gridDiv = document.createElement('div');
  gridDiv.style.cssText = 'display: grid; grid-template-columns: 1fr 1fr; gap: 10px;';

  let checkDiv = document.createElement('div');
  checkDiv.id = 'review-checklist';
  checkDiv.style.cssText = 'max-height: 220px; overflow-y: auto; border: 1px solid #eee; border-radius: 6px; padding: 8px;';
  gridDiv.appendChild(checkDiv);

  let findingsDiv = document.createElement('div');
  findingsDiv.id = 'findings';
  findingsDiv.style.cssText = 'max-height: 220px; overflow-y: auto; border: 1px solid #eee; border-radius: 6px; padding: 8px; background: #fff8f8;';
  findingsDiv.innerHTML = '<strong>Findings:</strong><br/><em style="color:#999">Mark items as Fail to see recommendations.</em>';
  gridDiv.appendChild(findingsDiv);

  controlDiv.appendChild(gridDiv);

  updateChecklist();
}

function updateChecklist() {
  let checkDiv = document.getElementById('review-checklist');
  if (!checkDiv) return;

  let totalItems = 0;
  let passCount = 0;
  let failItems = [];

  let html = '';
  categories.forEach(function(cat, ci) {
    html += '<div style="margin-bottom: 6px;"><strong style="color:#333; font-size:12px;">' + cat.name + '</strong>';
    cat.items.forEach(function(item, ii) {
      totalItems++;
      let stateIcon, stateColor;
      if (item.state === 1) { stateIcon = '✓'; stateColor = '#34A853'; passCount++; }
      else if (item.state === 2) { stateIcon = '✗'; stateColor = '#E53935'; failItems.push(cat.name + ': ' + item.text); }
      else { stateIcon = '○'; stateColor = '#999'; }
      html += '<div data-cat="' + ci + '" data-item="' + ii + '" style="cursor:pointer;padding:2px 6px;margin:1px 0;border-radius:3px;display:flex;align-items:center;gap:6px;background:' + (item.state === 2 ? '#fce4ec' : item.state === 1 ? '#e8f5e9' : '#f5f5f5') + ';">' +
        '<span style="color:' + stateColor + ';font-size:14px;min-width:16px;text-align:center;">' + stateIcon + '</span>' +
        '<span style="font-size:12px;">' + item.text + '</span></div>';
    });
    html += '</div>';
  });
  checkDiv.innerHTML = html;

  checkDiv.querySelectorAll('[data-cat]').forEach(function(el) {
    el.addEventListener('click', function() {
      let ci = parseInt(el.dataset.cat);
      let ii = parseInt(el.dataset.item);
      categories[ci].items[ii].state = (categories[ci].items[ii].state + 1) % 3;
      updateChecklist();
    });
  });

  // Score
  let score = Math.round((passCount / totalItems) * 100);
  let scoreEl = document.getElementById('quality-score');
  if (scoreEl) {
    let scoreColor = score >= 80 ? '#34A853' : score >= 50 ? '#FB8C00' : '#E53935';
    scoreEl.innerHTML = 'Quality: <span style="color:' + scoreColor + '">' + score + '/100</span>';
  }

  // Findings
  let findingsDiv = document.getElementById('findings');
  if (findingsDiv) {
    if (failItems.length > 0) {
      findingsDiv.innerHTML = '<strong>Findings (' + failItems.length + '):</strong><br/>' +
        failItems.map(function(f) { return '<div style="font-size:12px;color:#c62828;padding:2px 0;">✗ ' + f + '</div>'; }).join('');
    } else {
      findingsDiv.innerHTML = '<strong>Findings:</strong><br/><em style="color:#999">Mark items as Fail to see recommendations.</em>';
    }
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
  text('AI-Generated MicroSim Preview', canvasWidth / 2, 6);

  let sample = samples[currentSample];
  fill(100);
  textSize(11);
  text(sample.name, canvasWidth / 2, 24);

  // Draw sample regions
  hoveredRegion = -1;
  for (let i = 0; i < sample.regions.length; i++) {
    let r = sample.regions[i];
    let rx = canvasWidth * r.x;
    let ry = drawHeight * r.y;
    let rw = canvasWidth * r.w;
    let rh = drawHeight * r.h;

    let isHover = mouseX > rx - rw / 2 && mouseX < rx + rw / 2 && mouseY > ry - rh / 2 && mouseY < ry + rh / 2;
    if (isHover) hoveredRegion = i;

    fill(r.color[0], r.color[1], r.color[2], isHover ? 180 : 100);
    stroke(r.color[0], r.color[1], r.color[2]);
    strokeWeight(isHover ? 2.5 : 1);
    ellipse(rx, ry, rw, rh);

    fill(60);
    noStroke();
    textAlign(CENTER, CENTER);
    textSize(14);
    text(r.name, rx, ry);

    // Issue marker
    if (showIssuesFlag && r.issue) {
      fill(229, 57, 53);
      noStroke();
      ellipse(rx + rw / 2 + 5, ry - rh / 2 - 5, 16, 16);
      fill(255);
      textAlign(CENTER, CENTER);
      textSize(10);
      text('!', rx + rw / 2 + 5, ry - rh / 2 - 5);
    }
  }

  // Tooltip
  if (hoveredRegion >= 0) {
    let r = sample.regions[hoveredRegion];
    let tip = r.name + ': ' + r.desc;
    textSize(14);
    let tw = min(textWidth(tip) + 16, canvasWidth - 20);
    let tx = constrain(mouseX + 12, 5, canvasWidth - tw - 5);
    let ty = mouseY - 30;
    fill(50, 50, 50, 220);
    noStroke();
    rect(tx, ty, tw, 24, 4);
    fill(255);
    textAlign(LEFT, CENTER);
    text(tip.substring(0, 65), tx + 8, ty + 12);
  }

  // Issues list overlay
  if (showIssuesFlag) {
    let issueY = drawHeight - 10 - sample.issues.length * 14;
    fill(229, 57, 53, 20);
    noStroke();
    rect(5, issueY - 5, canvasWidth - 10, sample.issues.length * 14 + 15, 4);
    fill(229, 57, 53);
    textAlign(LEFT, TOP);
    textSize(11);
    for (let i = 0; i < sample.issues.length; i++) {
      text((i + 1) + '. ' + sample.issues[i].substring(0, 80), 12, issueY + i * 14);
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
