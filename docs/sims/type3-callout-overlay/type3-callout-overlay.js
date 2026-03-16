// Type 3 Callout to Edge Demo
// Callout points with leader lines and edge labels
// Bloom Level: Analyze (L4) — differentiate label placement strategies

let containerWidth;
let canvasWidth = 400;
let drawHeight = 460;
let controlHeight = 100;
let canvasHeight = drawHeight + controlHeight;
let containerHeight = canvasHeight;
let margin = 15;

// Bicycle component callouts with edge positions
// rx,ry = callout point on image; edge = which edge the label goes to
const callouts = [
  { id: 'seat', label: 'Seat', desc: 'The saddle where the rider sits. Adjustable height for comfort and pedaling efficiency.',
    rx: 0.32, ry: 0.18, edge: 'top', color: '#2196F3' },
  { id: 'handlebars', label: 'Handlebars', desc: 'Steering control connected to the fork. Determines riding position and turning radius.',
    rx: 0.68, ry: 0.15, edge: 'top', color: '#FF9800' },
  { id: 'frame', label: 'Frame', desc: 'The structural backbone connecting all components. Usually made of steel, aluminum, or carbon fiber.',
    rx: 0.48, ry: 0.35, edge: 'right', color: '#4CAF50' },
  { id: 'chain', label: 'Chain', desc: 'Transfers pedaling force from the chainring to the rear wheel sprocket via interlocking links.',
    rx: 0.38, ry: 0.60, edge: 'right', color: '#9C27B0' },
  { id: 'pedal', label: 'Pedals', desc: 'Foot platforms attached to crank arms. Convert the rider\'s leg motion into rotational force.',
    rx: 0.35, ry: 0.72, edge: 'bottom', color: '#009688' },
  { id: 'rear_wheel', label: 'Rear Wheel', desc: 'Driven wheel providing propulsion. Contains the rear hub, spokes, rim, and tire.',
    rx: 0.18, ry: 0.55, edge: 'left', color: '#F44336' },
  { id: 'front_wheel', label: 'Front Wheel', desc: 'Steering wheel mounted on the fork. Guides direction and absorbs road impacts.',
    rx: 0.78, ry: 0.55, edge: 'bottom', color: '#795548' },
  { id: 'brakes', label: 'Brakes', desc: 'Friction-based stopping mechanism. Calipers squeeze brake pads against the wheel rim or disc.',
    rx: 0.72, ry: 0.38, edge: 'left', color: '#E91E63' }
];

let selectedCallout = -1;
let hoveredCallout = -1;
let showNumbers = true;
let showLeaders = true;
let quizMode = false;
let quizRevealed = [];
let labelStyle = 0; // 0=Text+Number, 1=Text Only, 2=Number Only

function setup() {
  updateCanvasSize();
  const canvas = createCanvas(containerWidth, containerHeight);
  canvas.parent(document.querySelector('main'));
  quizRevealed = new Array(callouts.length).fill(false);
}

function draw() {
  updateCanvasSize();

  fill('aliceblue');
  stroke('silver');
  strokeWeight(1);
  rect(0, 0, canvasWidth, drawHeight);

  fill('white');
  rect(0, drawHeight, canvasWidth, controlHeight);

  // Title
  fill('black');
  noStroke();
  textAlign(CENTER, TOP);
  textSize(18);
  text('Type 3: Callout Overlay Demo', canvasWidth / 2, 6);

  // Diagram area
  let diagX = margin + 40;
  let diagY = 32;
  let diagW = canvasWidth - margin * 2 - 80;
  let diagH = drawHeight - 95;

  // Draw bicycle silhouette
  drawBicycle(diagX, diagY, diagW, diagH);

  // Determine hover
  hoveredCallout = -1;
  for (let i = 0; i < callouts.length; i++) {
    let c = callouts[i];
    let px = diagX + c.rx * diagW;
    let py = diagY + c.ry * diagH;
    let labelPos = getEdgeLabelPos(c, i, diagX, diagY, diagW, diagH);
    let d1 = dist(mouseX, mouseY, px, py);
    let d2 = dist(mouseX, mouseY, labelPos.lx + labelPos.tw / 2, labelPos.ly);
    if (d1 < 15 || d2 < 20) {
      hoveredCallout = i;
    }
  }

  // Draw leader lines, numbers, and labels
  for (let i = 0; i < callouts.length; i++) {
    let c = callouts[i];
    let px = diagX + c.rx * diagW;
    let py = diagY + c.ry * diagH;
    let isActive = (i === hoveredCallout || i === selectedCallout);
    let labelPos = getEdgeLabelPos(c, i, diagX, diagY, diagW, diagH);

    // Leader line
    if (showLeaders) {
      stroke(isActive ? c.color : c.color + '60');
      strokeWeight(isActive ? 2.5 : 1);
      line(px, py, labelPos.lx + labelPos.tw / 2, labelPos.ly);
    }

    // Numbered indicator
    if (showNumbers) {
      fill(isActive ? c.color : c.color + 'A0');
      noStroke();
      circle(px, py, isActive ? 24 : 20);
      fill('white');
      textAlign(CENTER, CENTER);
      textSize(12);
      textStyle(BOLD);
      text(i + 1, px, py);
      textStyle(NORMAL);
    }

    // Edge label
    let showLabel = !quizMode || quizRevealed[i];
    if (showLabel) {
      let labelText = getLabelText(c, i);
      fill(isActive ? c.color : '#333');
      noStroke();
      textAlign(labelPos.align, CENTER);
      textSize(isActive ? 14 : 13);
      if (isActive) textStyle(BOLD);
      text(labelText, labelPos.lx, labelPos.ly);
      textStyle(NORMAL);
    } else if (quizMode) {
      fill('#BDBDBD');
      noStroke();
      textAlign(labelPos.align, CENTER);
      textSize(13);
      text('? ? ?', labelPos.lx, labelPos.ly);
    }
  }

  // Quiz mode score
  if (quizMode) {
    let revealed = quizRevealed.filter(r => r).length;
    fill('#1565C0');
    noStroke();
    textAlign(RIGHT, TOP);
    textSize(14);
    text(revealed + ' of ' + callouts.length + ' identified', canvasWidth - margin, diagY);
  }

  // Control buttons
  let btnY = drawHeight - 55;
  let bx = margin;
  drawToggleBtn(bx, btnY, 'Numbers', showNumbers); bx += 100;
  drawToggleBtn(bx, btnY, 'Leaders', showLeaders); bx += 100;
  drawToggleBtn(bx, btnY, 'Quiz', quizMode); bx += 100;

  // Label style indicator
  let styles = ['Text+No.', 'Text', 'Number'];
  fill('#616161');
  noStroke();
  textAlign(LEFT, CENTER);
  textSize(12);
  text('Style:', bx + 5, btnY + 14);
  drawToggleBtn(bx + 45, btnY, styles[labelStyle], true);

  // Infobox
  let infoY = drawHeight + 8;
  let active = selectedCallout >= 0 ? selectedCallout : hoveredCallout;
  if (active >= 0) {
    let c = callouts[active];
    fill(c.color);
    noStroke();
    textAlign(LEFT, TOP);
    textSize(16);
    textStyle(BOLD);
    text((active + 1) + '. ' + c.label, margin, infoY);
    textStyle(NORMAL);

    fill(60);
    textSize(14);
    textWrap(WORD);
    text(c.desc, margin, infoY + 22, canvasWidth - margin * 2);
  } else {
    fill(120);
    noStroke();
    textAlign(CENTER, CENTER);
    textSize(14);
    text(quizMode ? 'Click numbered points to reveal labels' : 'Hover or click a callout to learn more',
      canvasWidth / 2, infoY + 35);
  }
}

function getLabelText(c, i) {
  if (labelStyle === 0) return (i + 1) + '. ' + c.label;
  if (labelStyle === 1) return c.label;
  return '' + (i + 1);
}

function getEdgeLabelPos(c, i, dx, dy, dw, dh) {
  let px = dx + c.rx * dw;
  let py = dx + c.ry * dh;
  let lx, ly, align;
  let edgeCounts = { top: 0, bottom: 0, left: 0, right: 0 };
  // Count items per edge up to this index for spacing
  for (let j = 0; j <= i; j++) {
    if (callouts[j].edge === c.edge) edgeCounts[c.edge]++;
  }
  let slot = edgeCounts[c.edge] - 1;
  let tw = 80; // approximate text width

  switch (c.edge) {
    case 'top':
      lx = dx + (0.25 + slot * 0.35) * dw;
      ly = dy - 5;
      align = CENTER;
      break;
    case 'bottom':
      lx = dx + (0.25 + slot * 0.35) * dw;
      ly = dy + dh + 15;
      align = CENTER;
      break;
    case 'left':
      lx = dx - 5;
      ly = dy + (0.30 + slot * 0.30) * dh;
      align = RIGHT;
      break;
    case 'right':
      lx = dx + dw + 5;
      ly = dy + (0.30 + slot * 0.30) * dh;
      align = LEFT;
      break;
  }
  return { lx, ly, align, tw };
}

function drawBicycle(dx, dy, dw, dh) {
  push();
  // Simple bicycle wireframe
  let cx1 = dx + 0.18 * dw; // rear wheel center
  let cy1 = dy + 0.55 * dh;
  let cx2 = dx + 0.78 * dw; // front wheel center
  let cy2 = dy + 0.55 * dh;
  let wr = 0.15 * dh; // wheel radius

  stroke('#BDBDBD');
  strokeWeight(2);
  noFill();

  // Wheels
  circle(cx1, cy1, wr * 2);
  circle(cx2, cy2, wr * 2);

  // Frame triangle
  let seatX = dx + 0.32 * dw, seatY = dy + 0.20 * dh;
  let bbX = dx + 0.38 * dw, bbY = dy + 0.60 * dh;
  let headX = dx + 0.65 * dw, headY = dy + 0.30 * dh;

  strokeWeight(3);
  stroke('#9E9E9E');
  // seat tube
  line(seatX, seatY, bbX, bbY);
  // top tube
  line(seatX, seatY, headX, headY);
  // down tube
  line(headX, headY, bbX, bbY);
  // chain stay
  line(bbX, bbY, cx1, cy1);
  // seat stay
  line(seatX, seatY + 10, cx1, cy1);
  // fork
  line(headX, headY, cx2, cy2);
  // handlebar
  let hbX = dx + 0.68 * dw, hbY = dy + 0.15 * dh;
  line(headX, headY, hbX, hbY);
  // seat post
  line(seatX, seatY, seatX, seatY - 12);
  strokeWeight(4);
  line(seatX - 10, seatY - 12, seatX + 10, seatY - 12);

  // Pedal crank
  strokeWeight(2);
  line(bbX - 12, bbY + 12, bbX + 12, bbY - 12);

  pop();
}

function drawToggleBtn(bx, by, label, active) {
  let bw = 90;
  let bh = 28;
  fill(active ? '#E3F2FD' : 'white');
  stroke(active ? '#2196F3' : '#BDBDBD');
  strokeWeight(1);
  rect(bx, by, bw, bh, 6);
  fill(active ? '#1565C0' : '#616161');
  noStroke();
  textAlign(CENTER, CENTER);
  textSize(13);
  text(label, bx + bw / 2, by + bh / 2);
}

function mousePressed() {
  let btnY = drawHeight - 55;
  if (mouseY >= btnY && mouseY <= btnY + 28) {
    let bx = margin;
    if (mouseX >= bx && mouseX <= bx + 90) { showNumbers = !showNumbers; return; }
    bx += 100;
    if (mouseX >= bx && mouseX <= bx + 90) { showLeaders = !showLeaders; return; }
    bx += 100;
    if (mouseX >= bx && mouseX <= bx + 90) {
      quizMode = !quizMode;
      if (quizMode) {
        quizRevealed = new Array(callouts.length).fill(false);
        selectedCallout = -1;
      }
      return;
    }
    bx += 100;
    if (mouseX >= bx + 45 && mouseX <= bx + 135) {
      labelStyle = (labelStyle + 1) % 3;
      return;
    }
  }

  // Click on callout points
  if (quizMode) {
    for (let i = 0; i < callouts.length; i++) {
      let c = callouts[i];
      let diagX = margin + 40;
      let diagY = 32;
      let diagW = canvasWidth - margin * 2 - 80;
      let diagH = drawHeight - 95;
      let px = diagX + c.rx * diagW;
      let py = diagY + c.ry * diagH;
      if (dist(mouseX, mouseY, px, py) < 15) {
        quizRevealed[i] = true;
        selectedCallout = i;
        return;
      }
    }
  } else {
    if (hoveredCallout >= 0) {
      selectedCallout = (selectedCallout === hoveredCallout) ? -1 : hoveredCallout;
    } else {
      selectedCallout = -1;
    }
  }
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
