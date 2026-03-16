// Mayer's Principles Interactive Comparison
// Toggle signaling, segmenting, and spatial contiguity on a sample infographic
// Bloom Level: Apply (L3)

let containerWidth;
let canvasWidth = 400;
let drawHeight = 420;
let canvasHeight = drawHeight;

let signalingOn = false;
let segmentingOn = false;
let contiguityOn = false;
let hoveredRegion = -1;

let organs = [
  { name: 'Brain', x: 0.5, y: 0.12, w: 0.14, h: 0.1, color: [255, 140, 105],
    desc: 'The brain controls all body functions and processes sensory information.' },
  { name: 'Heart', x: 0.46, y: 0.32, w: 0.1, h: 0.1, color: [220, 60, 80],
    desc: 'The heart pumps blood through the circulatory system.' },
  { name: 'Lungs', x: 0.56, y: 0.3, w: 0.12, h: 0.12, color: [135, 180, 220],
    desc: 'The lungs exchange oxygen and carbon dioxide with the blood.' },
  { name: 'Liver', x: 0.42, y: 0.45, w: 0.1, h: 0.08, color: [180, 100, 80],
    desc: 'The liver filters blood and produces bile for digestion.' },
  { name: 'Stomach', x: 0.52, y: 0.5, w: 0.1, h: 0.1, color: [220, 180, 100],
    desc: 'The stomach breaks down food using acid and enzymes.' },
  { name: 'Intestines', x: 0.5, y: 0.65, w: 0.14, h: 0.12, color: [180, 140, 200],
    desc: 'The intestines absorb nutrients from digested food.' }
];

function setup() {
  updateCanvasSize();
  const canvas = createCanvas(canvasWidth, canvasHeight);
  canvas.parent(document.querySelector('main'));
  buildControls();
  describe('Sample anatomy infographic that changes appearance based on Mayer\'s multimedia learning principles: signaling, segmenting, and spatial contiguity.');
}

function buildControls() {
  let mainEl = document.querySelector('main');
  let controlDiv = document.createElement('div');
  controlDiv.id = 'mayer-controls';
  controlDiv.style.cssText = 'background: white; border: 1px solid silver; padding: 12px; font-family: Arial, sans-serif; font-size: 14px;';
  mainEl.appendChild(controlDiv);

  let row = document.createElement('div');
  row.style.cssText = 'display: flex; flex-wrap: wrap; gap: 12px; align-items: center; justify-content: center;';

  let toggles = [
    { label: 'Signaling', color: '#4285F4', get: function() { return signalingOn; }, set: function(v) { signalingOn = v; } },
    { label: 'Segmenting', color: '#34A853', get: function() { return segmentingOn; }, set: function(v) { segmentingOn = v; } },
    { label: 'Spatial Contiguity', color: '#FB8C00', get: function() { return contiguityOn; }, set: function(v) { contiguityOn = v; } }
  ];

  toggles.forEach(function(t) {
    let lbl = document.createElement('label');
    lbl.style.cssText = 'display: flex; align-items: center; gap: 6px; cursor: pointer; padding: 6px 12px; border: 2px solid ' + t.color + '; border-radius: 6px; font-size: 14px; font-weight: bold; color: ' + t.color + ';';
    let cb = document.createElement('input');
    cb.type = 'checkbox';
    cb.style.cssText = 'width: 18px; height: 18px;';
    cb.addEventListener('change', function() {
      t.set(cb.checked);
      lbl.style.background = cb.checked ? t.color + '15' : 'white';
    });
    lbl.appendChild(cb);
    lbl.appendChild(document.createTextNode(t.label));
    row.appendChild(lbl);
  });

  // Best Practice / Reset buttons
  let bestBtn = document.createElement('button');
  bestBtn.textContent = 'Best Practice';
  bestBtn.style.cssText = 'padding: 6px 14px; font-size: 13px; cursor: pointer; border: 1px solid #4285F4; border-radius: 4px; background: #4285F4; color: white; font-weight: bold;';
  bestBtn.addEventListener('click', function() {
    signalingOn = segmentingOn = contiguityOn = true;
    row.querySelectorAll('input[type=checkbox]').forEach(function(cb) { cb.checked = true; cb.dispatchEvent(new Event('change')); });
  });
  row.appendChild(bestBtn);

  let resetBtn = document.createElement('button');
  resetBtn.textContent = 'Reset';
  resetBtn.style.cssText = 'padding: 6px 14px; font-size: 13px; cursor: pointer; border: 1px solid silver; border-radius: 4px; background: #f0f0f0;';
  resetBtn.addEventListener('click', function() {
    signalingOn = segmentingOn = contiguityOn = false;
    row.querySelectorAll('input[type=checkbox]').forEach(function(cb) { cb.checked = false; cb.dispatchEvent(new Event('change')); });
  });
  row.appendChild(resetBtn);

  controlDiv.appendChild(row);

  // Score display
  let scoreDiv = document.createElement('div');
  scoreDiv.id = 'quality-score';
  scoreDiv.style.cssText = 'text-align: center; margin-top: 8px; font-size: 15px;';
  controlDiv.appendChild(scoreDiv);
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
  text("Mayer's Principles Comparison", canvasWidth / 2, 8);

  // Calculate quality score
  let scoreVal = 25;
  if (signalingOn) scoreVal += 23;
  if (segmentingOn) scoreVal += 25;
  if (contiguityOn) scoreVal += 22;

  let scoreDiv = document.getElementById('quality-score');
  if (scoreDiv) {
    let scoreColor = scoreVal >= 80 ? '#34A853' : scoreVal >= 50 ? '#FB8C00' : '#E53935';
    scoreDiv.innerHTML = 'Design Quality Score: <strong style="color:' + scoreColor + '; font-size: 20px;">' + scoreVal + '/95</strong>';
  }

  // Draw body outline
  let bodyX = canvasWidth * 0.3;
  let bodyW = canvasWidth * 0.4;
  let bodyY = 40;
  let bodyH = drawHeight - 55;

  // Simple body silhouette
  fill(245, 235, 225);
  stroke(200, 190, 180);
  strokeWeight(1);
  // Head
  ellipse(bodyX + bodyW * 0.5, bodyY + bodyH * 0.08, bodyW * 0.2, bodyH * 0.12);
  // Torso
  beginShape();
  vertex(bodyX + bodyW * 0.35, bodyY + bodyH * 0.15);
  vertex(bodyX + bodyW * 0.65, bodyY + bodyH * 0.15);
  vertex(bodyX + bodyW * 0.7, bodyY + bodyH * 0.5);
  vertex(bodyX + bodyW * 0.65, bodyY + bodyH * 0.8);
  vertex(bodyX + bodyW * 0.35, bodyY + bodyH * 0.8);
  vertex(bodyX + bodyW * 0.3, bodyY + bodyH * 0.5);
  endShape(CLOSE);

  // Draw organ regions
  hoveredRegion = -1;
  for (let i = 0; i < organs.length; i++) {
    let o = organs[i];
    let ox = bodyX + o.x * bodyW;
    let oy = bodyY + o.y * bodyH;
    let ow = o.w * bodyW;
    let oh = o.h * bodyH;

    let isHover = (mouseX > ox - ow / 2 && mouseX < ox + ow / 2 && mouseY > oy - oh / 2 && mouseY < oy + oh / 2);
    if (isHover) hoveredRegion = i;

    // Region fill
    if (signalingOn) {
      fill(o.color[0], o.color[1], o.color[2], isHover ? 200 : 120);
      stroke(o.color[0], o.color[1], o.color[2]);
      strokeWeight(isHover ? 3 : 1.5);
    } else {
      fill(200, 200, 200, isHover ? 100 : 50);
      stroke(180);
      strokeWeight(1);
    }
    ellipse(ox, oy, ow, oh);

    // Signaling: numbered indicators
    if (signalingOn) {
      fill(o.color[0], o.color[1], o.color[2]);
      noStroke();
      ellipse(ox - ow / 2 - 8, oy, 16, 16);
      fill(255);
      textAlign(CENTER, CENTER);
      textSize(10);
      noStroke();
      text(i + 1, ox - ow / 2 - 8, oy);
    }

    // Signaling: bold label on hover
    if (signalingOn && isHover) {
      fill(o.color[0], o.color[1], o.color[2]);
      noStroke();
      textAlign(CENTER, BOTTOM);
      textSize(14);
      text(o.name, ox, oy - oh / 2 - 4);
    }
  }

  // Descriptions: segmenting and contiguity determine placement
  if (!segmentingOn) {
    // All descriptions visible at once (bad: no segmenting)
    let descX = contiguityOn ? bodyX + bodyW + 20 : canvasWidth - 15;
    let descAlign = contiguityOn ? LEFT : RIGHT;

    fill(60);
    noStroke();
    textAlign(descAlign, TOP);
    textSize(10);
    let dy = bodyY + 10;
    for (let i = 0; i < organs.length; i++) {
      text((i + 1) + '. ' + organs[i].name + ': ' + organs[i].desc.substring(0, 40) + '...', descX, dy);
      dy += 14;
    }
  } else {
    // Segmented: only show description for hovered region
    if (hoveredRegion >= 0) {
      let o = organs[hoveredRegion];
      let ox = bodyX + o.x * bodyW;
      let oy = bodyY + o.y * bodyH;

      if (contiguityOn) {
        // Adjacent infobox with connecting arrow
        let ibX = ox + o.w * bodyW / 2 + 15;
        let ibY = oy - 20;
        let ibW = 180;
        let ibH = 50;

        // Keep within canvas
        if (ibX + ibW > canvasWidth - 5) ibX = ox - o.w * bodyW / 2 - ibW - 15;
        if (ibY + ibH > drawHeight) ibY = drawHeight - ibH - 5;
        if (ibY < bodyY) ibY = bodyY;

        // Arrow line
        stroke(o.color[0], o.color[1], o.color[2]);
        strokeWeight(2);
        line(ox, oy, ibX, ibY + ibH / 2);

        // Infobox
        fill(255, 255, 255, 240);
        stroke(o.color[0], o.color[1], o.color[2]);
        strokeWeight(2);
        rect(ibX, ibY, ibW, ibH, 6);

        fill(o.color[0], o.color[1], o.color[2]);
        noStroke();
        textAlign(LEFT, TOP);
        textSize(12);
        text(o.name, ibX + 8, ibY + 6);
        fill(60);
        textSize(10);
        // Word wrap manually
        let words = o.desc.split(' ');
        let line1 = '', line2 = '';
        for (let w = 0; w < words.length; w++) {
          if (textWidth(line1 + words[w]) < ibW - 16) line1 += words[w] + ' ';
          else line2 += words[w] + ' ';
        }
        text(line1.trim(), ibX + 8, ibY + 22);
        if (line2) text(line2.trim(), ibX + 8, ibY + 34);
      } else {
        // Far sidebar (bad contiguity)
        let sbX = canvasWidth - 180;
        fill(255, 255, 255, 240);
        stroke(200);
        strokeWeight(1);
        rect(sbX, bodyY + 10, 170, 60, 4);
        fill(60);
        noStroke();
        textAlign(LEFT, TOP);
        textSize(12);
        text(o.name, sbX + 8, bodyY + 16);
        textSize(10);
        let words = o.desc.split(' ');
        let ln = '';
        let ly = bodyY + 32;
        for (let w = 0; w < words.length; w++) {
          if (textWidth(ln + words[w]) < 154) ln += words[w] + ' ';
          else { text(ln.trim(), sbX + 8, ly); ly += 12; ln = words[w] + ' '; }
        }
        text(ln.trim(), sbX + 8, ly);
      }
    }
  }

  // Hover instruction
  if (hoveredRegion < 0) {
    fill(150);
    noStroke();
    textAlign(CENTER, BOTTOM);
    textSize(13);
    text('Hover over organ regions to explore', canvasWidth / 2, drawHeight - 8);
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
