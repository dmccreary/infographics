// Responsive Layout Simulator
// Demonstrate how an infographic layout adapts to different viewport widths
// Bloom Level: Apply (L3)

let containerWidth;
let canvasWidth = 400;
let drawHeight = 480;
let canvasHeight = drawHeight;

let viewportSlider;
let showBreakpoints = true;

function setup() {
  updateCanvasSize();
  const canvas = createCanvas(canvasWidth, canvasHeight);
  canvas.parent(document.querySelector('main'));
  buildControls();
  describe('Responsive layout simulator showing how an infographic rearranges at mobile, tablet, and desktop breakpoints.');
}

function buildControls() {
  let mainEl = document.querySelector('main');
  let controlDiv = document.createElement('div');
  controlDiv.id = 'resp-controls';
  controlDiv.style.cssText = 'background: white; border: 1px solid silver; padding: 12px; font-family: Arial, sans-serif; font-size: 14px;';
  mainEl.appendChild(controlDiv);

  // Slider row
  let sliderRow = document.createElement('div');
  sliderRow.style.cssText = 'display: flex; align-items: center; gap: 8px; margin-bottom: 8px;';

  let label = document.createElement('span');
  label.textContent = 'Viewport Width:';
  label.style.cssText = 'font-weight: bold; white-space: nowrap;';
  sliderRow.appendChild(label);

  let sl = document.createElement('input');
  sl.type = 'range'; sl.min = 320; sl.max = 1400; sl.value = 900; sl.step = 10;
  sl.style.cssText = 'flex: 1;';
  sliderRow.appendChild(sl);

  let valDisplay = document.createElement('span');
  valDisplay.id = 'vp-value';
  valDisplay.textContent = '900px';
  valDisplay.style.cssText = 'min-width: 50px; font-variant-numeric: tabular-nums; font-weight: bold;';
  sliderRow.appendChild(valDisplay);

  sl.addEventListener('input', function() { valDisplay.textContent = sl.value + 'px'; });
  viewportSlider = { value: function() { return parseInt(sl.value); } };

  controlDiv.appendChild(sliderRow);

  // Info row
  let infoRow = document.createElement('div');
  infoRow.style.cssText = 'display: flex; align-items: center; gap: 12px; flex-wrap: wrap;';

  let infoDiv = document.createElement('div');
  infoDiv.id = 'layout-info';
  infoDiv.style.cssText = 'font-size: 13px; flex: 1;';
  infoRow.appendChild(infoDiv);

  let bpLabel = document.createElement('label');
  bpLabel.style.cssText = 'display: flex; align-items: center; gap: 4px; font-size: 13px; white-space: nowrap;';
  let bpCb = document.createElement('input');
  bpCb.type = 'checkbox'; bpCb.checked = true;
  bpCb.addEventListener('change', function() { showBreakpoints = bpCb.checked; });
  bpLabel.appendChild(bpCb);
  bpLabel.appendChild(document.createTextNode('Show Breakpoint Lines'));
  infoRow.appendChild(bpLabel);

  controlDiv.appendChild(infoRow);
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
  text('Responsive Layout Simulator', canvasWidth / 2, 8);

  let vpWidth = viewportSlider.value();

  // Determine tier
  let tier, tierColor, layoutDesc;
  if (vpWidth < 600) {
    tier = 'Mobile';
    tierColor = [229, 57, 53];
    layoutDesc = 'Single column, stacked layout. Controls below drawing area.';
  } else if (vpWidth < 900) {
    tier = 'Tablet';
    tierColor = [255, 179, 0];
    layoutDesc = 'Single column with more spacing. Larger elements.';
  } else {
    tier = 'Desktop';
    tierColor = [52, 168, 83];
    layoutDesc = 'Two-column layout. Controls in right sidebar.';
  }

  // Update info
  let infoDiv = document.getElementById('layout-info');
  if (infoDiv) {
    infoDiv.innerHTML = '<span style="color:rgb(' + tierColor.join(',') + '); font-weight:bold;">' +
      tier + '</span> — ' + layoutDesc;
  }

  // Draw simulated browser frame
  let frameMargin = 30;
  let maxFrameW = canvasWidth - frameMargin * 2;
  let frameW = map(vpWidth, 320, 1400, maxFrameW * 0.3, maxFrameW);
  let frameX = (canvasWidth - frameW) / 2;
  let frameY = 42;
  let frameH = drawHeight - frameY - 15;

  // Browser chrome
  fill(230);
  stroke(180);
  strokeWeight(1);
  rect(frameX, frameY, frameW, 24, 8, 8, 0, 0);

  // Traffic lights
  fill(255, 95, 87); noStroke();
  ellipse(frameX + 14, frameY + 12, 8, 8);
  fill(255, 189, 46);
  ellipse(frameX + 28, frameY + 12, 8, 8);
  fill(39, 201, 63);
  ellipse(frameX + 42, frameY + 12, 8, 8);

  // URL bar
  fill(255);
  stroke(200);
  rect(frameX + 56, frameY + 5, frameW - 70, 14, 3);
  fill(150);
  noStroke();
  textSize(9);
  textAlign(LEFT, CENTER);
  text('localhost:8000/sims/demo/main.html', frameX + 62, frameY + 12);

  // Browser content area
  let contentY = frameY + 24;
  let contentH = frameH - 24;
  fill(240, 248, 255);
  stroke(180);
  strokeWeight(1);
  rect(frameX, contentY, frameW, contentH);

  // Breakpoint lines
  if (showBreakpoints) {
    let bp600 = map(600, 320, 1400, maxFrameW * 0.3, maxFrameW);
    let bp900 = map(900, 320, 1400, maxFrameW * 0.3, maxFrameW);
    let bp600X = (canvasWidth - bp600) / 2 + bp600;
    let bp900X = (canvasWidth - bp900) / 2 + bp900;

    // Only draw if within frame
    stroke(229, 57, 53, 100);
    strokeWeight(1);
    drawingContext.setLineDash([4, 4]);
    if (bp600 < frameW) {
      let lx = frameX + map(600, 320, vpWidth, 0, frameW);
      if (lx > frameX && lx < frameX + frameW) {
        line(lx, contentY, lx, contentY + contentH);
      }
    }
    drawingContext.setLineDash([]);
  }

  // Draw simulated infographic inside browser
  let pad = 6;
  let innerX = frameX + pad;
  let innerY = contentY + pad;
  let innerW = frameW - pad * 2;
  let innerH = contentH - pad * 2;

  drawSimulatedInfographic(innerX, innerY, innerW, innerH, tier);

  // Breakpoint tier markers below the slider track
  noStroke();
  textAlign(CENTER, TOP);
  textSize(12);

  let trackY = drawHeight - 8;
  fill(229, 57, 53);
  text('Mobile', frameX + frameW * 0.1, trackY);
  fill(255, 179, 0);
  text('Tablet', canvasWidth / 2 - 20, trackY);
  fill(52, 168, 83);
  text('Desktop', frameX + frameW * 0.85, trackY);
}

function drawSimulatedInfographic(x, y, w, h, tier) {
  let pad = 4;

  if (tier === 'Desktop') {
    // Two column: drawing left, controls right
    let drawW = w * 0.65;
    let ctrlW = w * 0.3;
    let ctrlX = x + drawW + w * 0.05;

    // Drawing area
    fill(220, 232, 245);
    stroke(180, 200, 220);
    strokeWeight(1);
    rect(x, y, drawW, h * 0.85, 4);

    // Title
    fill(60);
    noStroke();
    textAlign(CENTER, TOP);
    textSize(max(10, min(14, drawW / 12)));
    text('Interactive Diagram', x + drawW / 2, y + 6);

    // Three labeled regions
    let regionH = (h * 0.85 - 40) / 3 - 4;
    let colors = [[100, 149, 237], [60, 179, 113], [255, 165, 0]];
    let labels = ['Region A', 'Region B', 'Region C'];
    for (let i = 0; i < 3; i++) {
      fill(colors[i][0], colors[i][1], colors[i][2], 100);
      stroke(colors[i][0], colors[i][1], colors[i][2]);
      strokeWeight(1);
      rect(x + 8, y + 28 + i * (regionH + 4), drawW - 16, regionH, 3);
      fill(colors[i][0], colors[i][1], colors[i][2]);
      noStroke();
      textSize(max(8, min(11, drawW / 16)));
      textAlign(CENTER, CENTER);
      text(labels[i], x + drawW / 2, y + 28 + i * (regionH + 4) + regionH / 2);
    }

    // Control panel (right side)
    fill(255);
    stroke(200);
    strokeWeight(1);
    rect(ctrlX, y, ctrlW, h * 0.85, 4);

    fill(80);
    noStroke();
    textAlign(CENTER, TOP);
    textSize(max(8, min(11, ctrlW / 8)));
    text('Controls', ctrlX + ctrlW / 2, y + 6);

    // Simulated sliders
    for (let i = 0; i < 2; i++) {
      let sy = y + 28 + i * 30;
      fill(220);
      noStroke();
      rect(ctrlX + 8, sy, ctrlW - 16, 6, 3);
      fill(66, 133, 244);
      ellipse(ctrlX + 8 + (ctrlW - 16) * 0.4, sy + 3, 10, 10);
    }

    // Simulated button
    fill(66, 133, 244);
    noStroke();
    rect(ctrlX + 8, y + 95, ctrlW - 16, 18, 3);
    fill(255);
    textSize(max(7, min(10, ctrlW / 10)));
    textAlign(CENTER, CENTER);
    text('Run', ctrlX + ctrlW / 2, y + 104);

  } else if (tier === 'Tablet') {
    // Stacked but with good spacing
    let drawH = h * 0.6;

    // Drawing area
    fill(220, 232, 245);
    stroke(180, 200, 220);
    strokeWeight(1);
    rect(x, y, w, drawH, 4);

    fill(60);
    noStroke();
    textAlign(CENTER, TOP);
    textSize(max(9, min(13, w / 14)));
    text('Interactive Diagram', x + w / 2, y + 4);

    // Regions
    let regionH = (drawH - 30) / 3 - 3;
    let colors = [[100, 149, 237], [60, 179, 113], [255, 165, 0]];
    for (let i = 0; i < 3; i++) {
      fill(colors[i][0], colors[i][1], colors[i][2], 100);
      stroke(colors[i][0], colors[i][1], colors[i][2]);
      rect(x + 6, y + 22 + i * (regionH + 3), w - 12, regionH, 3);
    }

    // Controls below
    let ctrlY = y + drawH + 6;
    fill(255);
    stroke(200);
    rect(x, ctrlY, w, h - drawH - 8, 4);

    // Slider
    fill(220);
    noStroke();
    rect(x + 10, ctrlY + 10, w - 20, 5, 3);
    fill(66, 133, 244);
    ellipse(x + 10 + (w - 20) * 0.4, ctrlY + 12, 8, 8);

  } else {
    // Mobile - everything stacked and small
    let drawH = h * 0.55;

    fill(220, 232, 245);
    stroke(180, 200, 220);
    strokeWeight(1);
    rect(x, y, w, drawH, 3);

    fill(60);
    noStroke();
    textAlign(CENTER, TOP);
    textSize(max(7, min(10, w / 10)));
    text('Diagram', x + w / 2, y + 2);

    // Smaller regions
    let regionH = (drawH - 18) / 3 - 2;
    let colors = [[100, 149, 237], [60, 179, 113], [255, 165, 0]];
    for (let i = 0; i < 3; i++) {
      fill(colors[i][0], colors[i][1], colors[i][2], 80);
      stroke(colors[i][0], colors[i][1], colors[i][2]);
      rect(x + 3, y + 14 + i * (regionH + 2), w - 6, regionH, 2);
    }

    // Controls
    let ctrlY = y + drawH + 4;
    fill(255);
    stroke(200);
    rect(x, ctrlY, w, h - drawH - 6, 3);

    fill(220);
    noStroke();
    rect(x + 6, ctrlY + 8, w - 12, 4, 2);
    fill(66, 133, 244);
    ellipse(x + 6 + (w - 12) * 0.3, ctrlY + 10, 6, 6);
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
