// CLD Building Blocks Explorer
// Step-through: variables, causal links, polarity indicators
// Bloom Level: Understand (L2)

let containerWidth;
let canvasWidth = 400;
let drawHeight = 380;
let canvasHeight = drawHeight;

let currentStage = 1;
let maxStages = 3;
let hoveredNode = -1;
let hoveredArrow = -1;

let variables = [
  { name: 'Study Hours', x: 0.18, y: 0.45 },
  { name: 'Understanding', x: 0.5, y: 0.2 },
  { name: 'Exam Score', x: 0.82, y: 0.45 }
];

let links = [
  { from: 0, to: 1, polarity: '+', color: [66, 133, 244] },
  { from: 1, to: 2, polarity: '+', color: [66, 133, 244] },
  { from: 2, to: 0, polarity: '+', color: [66, 133, 244] }
];

let stageInfo = [
  'Stage 1: Variables — The building blocks of a CLD are variables. Each variable represents a quantity that can increase or decrease over time. Here we have three variables: Study Hours, Understanding, and Exam Score.',
  'Stage 2: Causal Links — Arrows connect variables to show cause-and-effect relationships. An arrow from A to B means "a change in A causes a change in B." The direction matters — it shows which variable influences which.',
  'Stage 3: Polarity Indicators — Each arrow gets a + or − sign. A "+" means the variables change in the same direction (A goes up, B goes up). A "−" means they change in opposite directions. When all links in a loop are positive, it is a Reinforcing (R) loop.'
];

function setup() {
  updateCanvasSize();
  const canvas = createCanvas(canvasWidth, canvasHeight);
  canvas.parent(document.querySelector('main'));
  buildControls();
  describe('Step-through demonstration of three CLD building blocks: variables, causal links, and polarity indicators.');
}

function buildControls() {
  let mainEl = document.querySelector('main');
  let controlDiv = document.createElement('div');
  controlDiv.id = 'cld-controls';
  controlDiv.style.cssText = 'background: white; border: 1px solid silver; padding: 12px; font-family: Arial, sans-serif; font-size: 14px;';
  mainEl.appendChild(controlDiv);

  let row = document.createElement('div');
  row.style.cssText = 'display: flex; flex-wrap: wrap; gap: 12px; align-items: center; justify-content: center;';

  let prevBtn = document.createElement('button');
  prevBtn.id = 'prev-btn';
  prevBtn.textContent = '← Previous';
  prevBtn.style.cssText = 'padding: 8px 16px; font-size: 14px; cursor: pointer; border: 1px solid silver; border-radius: 4px; background: #f0f0f0;';
  prevBtn.addEventListener('click', function() {
    if (currentStage > 1) currentStage--;
    updateStageDisplay();
  });
  row.appendChild(prevBtn);

  let stageLabel = document.createElement('span');
  stageLabel.id = 'stage-label';
  stageLabel.style.cssText = 'font-weight: bold; font-size: 16px; min-width: 100px; text-align: center;';
  stageLabel.textContent = 'Stage 1 of 3';
  row.appendChild(stageLabel);

  let nextBtn = document.createElement('button');
  nextBtn.id = 'next-btn';
  nextBtn.textContent = 'Next →';
  nextBtn.style.cssText = 'padding: 8px 16px; font-size: 14px; cursor: pointer; border: 1px solid #4285F4; border-radius: 4px; background: #4285F4; color: white; font-weight: bold;';
  nextBtn.addEventListener('click', function() {
    if (currentStage < maxStages) currentStage++;
    updateStageDisplay();
  });
  row.appendChild(nextBtn);

  controlDiv.appendChild(row);

  let infoDiv = document.createElement('div');
  infoDiv.id = 'stage-info';
  infoDiv.style.cssText = 'margin-top: 10px; padding: 10px; background: #f8f9fa; border-radius: 6px; line-height: 1.5; font-size: 14px; color: #333;';
  infoDiv.textContent = stageInfo[0];
  controlDiv.appendChild(infoDiv);
}

function updateStageDisplay() {
  let label = document.getElementById('stage-label');
  if (label) label.textContent = 'Stage ' + currentStage + ' of ' + maxStages;
  let info = document.getElementById('stage-info');
  if (info) info.textContent = stageInfo[currentStage - 1];
  let prevBtn = document.getElementById('prev-btn');
  let nextBtn = document.getElementById('next-btn');
  if (prevBtn) prevBtn.disabled = (currentStage === 1);
  if (nextBtn) nextBtn.disabled = (currentStage === maxStages);
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
  text('CLD Building Blocks', canvasWidth / 2, 8);

  let margin = 40;
  let areaW = canvasWidth - margin * 2;
  let areaH = drawHeight - 70;
  let areaY = 38;

  hoveredNode = -1;
  hoveredArrow = -1;

  // Draw arrows (stage 2+)
  if (currentStage >= 2) {
    for (let i = 0; i < links.length; i++) {
      let lk = links[i];
      let fromV = variables[lk.from];
      let toV = variables[lk.to];
      let x1 = margin + fromV.x * areaW;
      let y1 = areaY + fromV.y * areaH;
      let x2 = margin + toV.x * areaW;
      let y2 = areaY + toV.y * areaH;

      // Offset start/end to node edge
      let angle = atan2(y2 - y1, x2 - x1);
      let nodeR = 45;
      let sx = x1 + cos(angle) * nodeR;
      let sy = y1 + sin(angle) * nodeR;
      let ex = x2 - cos(angle) * nodeR;
      let ey = y2 - sin(angle) * nodeR;

      // Curved arrow - compute control point
      let mx = (sx + ex) / 2;
      let my = (sy + ey) / 2;
      let perpX = -(ey - sy);
      let perpY = (ex - sx);
      let perpLen = sqrt(perpX * perpX + perpY * perpY);
      let curveAmt = 0.15;
      let cpx = mx + (perpX / perpLen) * perpLen * curveAmt;
      let cpy = my + (perpY / perpLen) * perpLen * curveAmt;

      // Check hover on arrow midpoint area
      let midAx = (sx + 2 * cpx + ex) / 4;
      let midAy = (sy + 2 * cpy + ey) / 4;
      if (dist(mouseX, mouseY, midAx, midAy) < 20) hoveredArrow = i;

      let isHoverArrow = (hoveredArrow === i);
      stroke(lk.color[0], lk.color[1], lk.color[2]);
      strokeWeight(isHoverArrow ? 4 : 2.5);
      noFill();
      beginShape();
      vertex(sx, sy);
      quadraticVertex(cpx, cpy, ex, ey);
      endShape();

      // Arrowhead
      let arrowAngle = atan2(ey - cpy, ex - cpx);
      let arrowSize = 10;
      fill(lk.color[0], lk.color[1], lk.color[2]);
      noStroke();
      triangle(
        ex, ey,
        ex - cos(arrowAngle - 0.4) * arrowSize, ey - sin(arrowAngle - 0.4) * arrowSize,
        ex - cos(arrowAngle + 0.4) * arrowSize, ey - sin(arrowAngle + 0.4) * arrowSize
      );

      // Polarity indicator (stage 3)
      if (currentStage >= 3) {
        let polX = (sx + 2 * cpx + ex) / 4;
        let polY = (sy + 2 * cpy + ey) / 4;
        fill(255);
        stroke(lk.color[0], lk.color[1], lk.color[2]);
        strokeWeight(2);
        ellipse(polX, polY, 24, 24);
        fill(lk.color[0], lk.color[1], lk.color[2]);
        noStroke();
        textAlign(CENTER, CENTER);
        textSize(16);
        text(lk.polarity, polX, polY);
      }
    }
  }

  // Draw variable nodes (all stages)
  for (let i = 0; i < variables.length; i++) {
    let v = variables[i];
    let vx = margin + v.x * areaW;
    let vy = areaY + v.y * areaH;

    let isHover = dist(mouseX, mouseY, vx, vy) < 45;
    if (isHover) hoveredNode = i;

    // Node ellipse
    fill(isHover ? '#e8f0fe' : 'white');
    stroke(isHover ? '#1a73e8' : '#555');
    strokeWeight(isHover ? 3 : 2);
    ellipse(vx, vy, 90, 50);

    // Label
    fill(isHover ? '#1a73e8' : '#333');
    noStroke();
    textAlign(CENTER, CENTER);
    textSize(14);
    text(v.name, vx, vy);
  }

  // Loop label (stage 3 only)
  if (currentStage >= 3) {
    let cx = margin + 0.5 * areaW;
    let cy = areaY + 0.42 * areaH;
    fill(52, 168, 83, 40);
    stroke(52, 168, 83);
    strokeWeight(2);
    ellipse(cx, cy, 40, 40);
    fill(52, 168, 83);
    noStroke();
    textAlign(CENTER, CENTER);
    textSize(16);
    text('R', cx, cy);
  }

  // Tooltip
  if (hoveredNode >= 0) {
    let tips = [
      'Study Hours: The amount of time spent studying. This is the input variable in this loop.',
      'Understanding: How well the student grasps the material. Increases with more study time.',
      'Exam Score: The grade achieved on the test. Reflects the level of understanding.'
    ];
    drawTooltip(tips[hoveredNode]);
  } else if (hoveredArrow >= 0 && currentStage >= 2) {
    let tips = [
      'More study hours leads to greater understanding.',
      'Greater understanding leads to higher exam scores.',
      'Higher exam scores lead to more study hours (confidence and motivation).'
    ];
    drawTooltip(tips[hoveredArrow]);
  }

  // Hover instruction
  fill(150);
  noStroke();
  textAlign(CENTER, BOTTOM);
  textSize(14);
  text('Hover over elements for details', canvasWidth / 2, drawHeight - 6);
}

function drawTooltip(tipText) {
  textSize(14);
  let tw = min(textWidth(tipText) + 16, canvasWidth - 20);
  let tx = constrain(mouseX + 12, 5, canvasWidth - tw - 5);
  let ty = mouseY - 34;
  if (ty < 5) ty = mouseY + 18;
  // Word wrap if needed
  let lines = [];
  let words = tipText.split(' ');
  let currentLine = '';
  for (let w = 0; w < words.length; w++) {
    let testLine = currentLine + (currentLine ? ' ' : '') + words[w];
    if (textWidth(testLine) > tw - 16 && currentLine) {
      lines.push(currentLine);
      currentLine = words[w];
    } else {
      currentLine = testLine;
    }
  }
  lines.push(currentLine);
  let boxH = lines.length * 18 + 10;

  fill(50, 50, 50, 220);
  noStroke();
  rect(tx, ty, tw, boxH, 4);
  fill(255);
  textAlign(LEFT, TOP);
  textSize(14);
  for (let l = 0; l < lines.length; l++) {
    text(lines[l], tx + 8, ty + 5 + l * 18);
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
