// Cognitive Load Balance Explorer
// Shows how intrinsic, extraneous, and germane load compete for working memory
// MicroSim template version 2026.03

// Canvas dimensions
let containerWidth;
let canvasWidth = 400;
let drawHeight = 500;
let controlHeight = 0; // controls are HTML DOM below canvas
let canvasHeight = drawHeight;
let containerHeight = canvasHeight;
let margin = 20;
let defaultTextSize = 14;

// Sliders
let complexitySlider;
let qualitySlider;
let interactivitySlider;
let scenarioSelect;

// Smoothed values for animation (initialized to defaults: complexity=5, quality=5, interactivity=5)
let smoothIntrinsic = 50;
let smoothExtraneous = 60;
let smoothGermane = 50;
let smoothEffectiveness = 30;

function setup() {
  updateCanvasSize();
  const canvas = createCanvas(canvasWidth, canvasHeight);
  canvas.parent(document.querySelector('main'));

  buildControls();

  describe('Interactive cognitive load balance explorer showing how three types of cognitive load compete for limited working memory capacity.');
}

function buildControls() {
  let mainEl = document.querySelector('main');

  let controlDiv = document.createElement('div');
  controlDiv.id = 'cog-controls';
  controlDiv.style.cssText = 'background: white; border: 1px solid silver; padding: 12px; font-family: Arial, sans-serif; font-size: 14px; display: grid; grid-template-columns: 1fr 1fr; gap: 10px 20px;';
  mainEl.appendChild(controlDiv);

  // Left column: sliders
  let sliderSection = document.createElement('div');
  controlDiv.appendChild(sliderSection);

  complexitySlider = createLabeledSlider(sliderSection, 'Content Complexity', 1, 10, 5, 1, '',
    'cornflowerblue', 'Adjusts intrinsic load — higher complexity means more inherent difficulty');
  qualitySlider = createLabeledSlider(sliderSection, 'Design Quality', 1, 10, 5, 1, '',
    'coral', 'Adjusts extraneous load — higher quality means less wasted mental effort');
  interactivitySlider = createLabeledSlider(sliderSection, 'Interactivity Level', 1, 10, 5, 1, '',
    'mediumseagreen', 'Adjusts germane load — more interactivity means more learning engagement');

  // Right column: scenario presets
  let scenarioSection = document.createElement('div');
  controlDiv.appendChild(scenarioSection);

  let scenarioLabel = document.createElement('div');
  scenarioLabel.textContent = 'Scenario Presets';
  scenarioLabel.style.cssText = 'font-weight: bold; margin-bottom: 8px; font-size: 14px;';
  scenarioSection.appendChild(scenarioLabel);

  let scenarios = [
    { name: 'Cluttered Static Diagram', complexity: 3, quality: 2, interactivity: 2 },
    { name: 'Clean Interactive MicroSim', complexity: 5, quality: 9, interactivity: 8 },
    { name: 'Complex Unscaffolded', complexity: 9, quality: 4, interactivity: 2 }
  ];

  scenarios.forEach(function(s) {
    let btn = document.createElement('button');
    btn.textContent = s.name;
    btn.style.cssText = 'display: block; width: 100%; padding: 8px 12px; margin-bottom: 6px; font-size: 13px; cursor: pointer; border: 1px solid silver; border-radius: 4px; background: #f8f8f8; text-align: left;';
    btn.addEventListener('click', function() {
      complexitySlider.setValue(s.complexity);
      qualitySlider.setValue(s.quality);
      interactivitySlider.setValue(s.interactivity);
    });
    btn.addEventListener('mouseenter', function() { btn.style.background = '#e8e8e8'; });
    btn.addEventListener('mouseleave', function() { btn.style.background = '#f8f8f8'; });
    scenarioSection.appendChild(btn);
  });
}

function createLabeledSlider(parent, labelText, minVal, maxVal, defaultVal, step, unit, color, tooltip) {
  let row = document.createElement('div');
  row.style.cssText = 'margin-bottom: 10px;';

  let labelRow = document.createElement('div');
  labelRow.style.cssText = 'display: flex; justify-content: space-between; align-items: center; margin-bottom: 2px;';

  let label = document.createElement('span');
  label.textContent = labelText + ':';
  label.style.cssText = 'font-size: 14px; font-weight: bold; color: ' + color + ';';
  labelRow.appendChild(label);

  let valueDisplay = document.createElement('span');
  valueDisplay.textContent = defaultVal + unit;
  valueDisplay.style.cssText = 'font-size: 14px; font-weight: bold; font-variant-numeric: tabular-nums;';
  labelRow.appendChild(valueDisplay);

  row.appendChild(labelRow);

  let slider = document.createElement('input');
  slider.type = 'range';
  slider.min = minVal;
  slider.max = maxVal;
  slider.value = defaultVal;
  slider.step = step;
  slider.style.cssText = 'width: 100%;';
  slider.title = tooltip;
  row.appendChild(slider);

  let desc = document.createElement('div');
  desc.textContent = tooltip;
  desc.style.cssText = 'font-size: 11px; color: #888; margin-top: 1px;';
  row.appendChild(desc);

  slider.addEventListener('input', function() {
    valueDisplay.textContent = slider.value + unit;
  });

  parent.appendChild(row);

  return {
    value: function() { return parseFloat(slider.value); },
    setValue: function(v) { slider.value = v; valueDisplay.textContent = v + unit; },
    _el: slider
  };
}

function draw() {
  updateCanvasSize();

  // Draw background
  fill('aliceblue');
  stroke('silver');
  strokeWeight(1);
  rect(0, 0, canvasWidth, drawHeight);

  // Title
  fill('black');
  noStroke();
  textAlign(CENTER, TOP);
  textSize(20);
  text('Cognitive Load Balance Explorer', canvasWidth / 2, 10);

  // Read slider values
  let complexity = complexitySlider.value();
  let quality = qualitySlider.value();
  let interactivity = interactivitySlider.value();

  // Calculate load percentages (each 0-100, can exceed 100 total)
  let intrinsic = complexity * 10; // 10-100
  let extraneous = (11 - quality) * 10; // 10-100 (inverse of quality)
  let germane = interactivity * 10; // 10-100
  let totalLoad = intrinsic + extraneous + germane;
  let capacity = 100;
  let overloaded = totalLoad > capacity;

  // Smooth transitions
  smoothIntrinsic = lerp(smoothIntrinsic, intrinsic, 0.15);
  smoothExtraneous = lerp(smoothExtraneous, extraneous, 0.15);
  smoothGermane = lerp(smoothGermane, germane, 0.15);

  // Effectiveness calculation
  let effectiveness;
  if (overloaded) {
    // Drops sharply when overloaded
    effectiveness = max(0, 100 - (totalLoad - capacity) * 2);
  } else {
    // High germane + low extraneous = high effectiveness
    effectiveness = (germane / totalLoad) * 100 * (1 - extraneous / totalLoad * 0.5);
  }
  smoothEffectiveness = lerp(smoothEffectiveness, effectiveness, 0.1);

  // Layout calculations
  let barX = margin + 10;
  let barW = canvasWidth - margin * 2 - 20;
  let barH = 40;
  let barY = 50;

  // === WORKING MEMORY CAPACITY BAR ===
  noStroke();
  fill(80);
  textAlign(LEFT, BOTTOM);
  textSize(15);
  text('Working Memory Capacity', barX, barY - 4);

  // Capacity outline
  stroke('black');
  strokeWeight(2);
  noFill();
  rect(barX, barY, barW, barH, 4);

  // Stacked segments
  let smoothTotal = smoothIntrinsic + smoothExtraneous + smoothGermane;
  let segIntrinsic = (smoothIntrinsic / max(smoothTotal, 1)) * min(smoothTotal, capacity) / capacity * barW;
  let segExtraneous = (smoothExtraneous / max(smoothTotal, 1)) * min(smoothTotal, capacity) / capacity * barW;
  let segGermane = (smoothGermane / max(smoothTotal, 1)) * min(smoothTotal, capacity) / capacity * barW;

  // If overloaded, segments fill the bar proportionally, overflow shown separately
  if (smoothTotal > capacity) {
    segIntrinsic = (smoothIntrinsic / smoothTotal) * barW;
    segExtraneous = (smoothExtraneous / smoothTotal) * barW;
    segGermane = (smoothGermane / smoothTotal) * barW;
  }

  noStroke();

  // Intrinsic (blue)
  fill(100, 149, 237);
  rect(barX, barY, segIntrinsic, barH, 4, 0, 0, 4);

  // Extraneous (red/coral)
  fill(255, 127, 80);
  rect(barX + segIntrinsic, barY, segExtraneous, barH);

  // Germane (green)
  fill(60, 179, 113);
  let germaneX = barX + segIntrinsic + segExtraneous;
  let germaneRightRadius = (germaneX + segGermane >= barX + barW - 2) ? 4 : 0;
  rect(germaneX, barY, segGermane, barH, 0, germaneRightRadius, germaneRightRadius, 0);

  // Percentage labels on segments
  fill('white');
  textAlign(CENTER, CENTER);
  textSize(14);
  noStroke();
  if (segIntrinsic > 35) {
    text(round(smoothIntrinsic) + '%', barX + segIntrinsic / 2, barY + barH / 2);
  }
  if (segExtraneous > 35) {
    text(round(smoothExtraneous) + '%', barX + segIntrinsic + segExtraneous / 2, barY + barH / 2);
  }
  if (segGermane > 35) {
    text(round(smoothGermane) + '%', germaneX + segGermane / 2, barY + barH / 2);
  }

  // Capacity marker line at 100%
  if (smoothTotal > capacity) {
    let capX = barX + barW;
    stroke('red');
    strokeWeight(2);
    line(capX, barY - 5, capX, barY + barH + 5);
  }

  // Overload warning
  if (overloaded) {
    let pulse = sin(millis() / 200) * 0.3 + 0.7;
    fill(220, 30, 30, pulse * 255);
    noStroke();
    textAlign(CENTER, TOP);
    textSize(18);
    text('OVERLOAD', canvasWidth / 2, barY + barH + 8);

    // Show overflow amount using actual (not smoothed) values
    textSize(13);
    fill(180, 30, 30);
    text('Total: ' + totalLoad + '% (exceeds 100% capacity by ' + (totalLoad - capacity) + '%)',
         canvasWidth / 2, barY + barH + 30);
  }

  // === LEGEND ===
  let legendY = barY + barH + (overloaded ? 55 : 15);
  textSize(14);
  noStroke();

  let legendItems = [
    { label: 'Intrinsic Load', color: [100, 149, 237], desc: 'Inherent difficulty of the content' },
    { label: 'Extraneous Load', color: [255, 127, 80], desc: 'Wasted effort from poor design' },
    { label: 'Germane Load', color: [60, 179, 113], desc: 'Productive learning effort' }
  ];

  let legendX = barX;
  let legendSpacing = barW / 3;
  legendItems.forEach(function(item, i) {
    let lx = legendX + i * legendSpacing;
    fill(item.color[0], item.color[1], item.color[2]);
    rect(lx, legendY, 14, 14, 2);
    fill(60);
    textAlign(LEFT, TOP);
    textSize(14);
    noStroke();
    text(item.label, lx + 20, legendY);
    textSize(11);
    fill(120);
    text(item.desc, lx + 20, legendY + 17);
  });

  // === EFFECTIVENESS METER ===
  let meterY = legendY + 48;
  let meterH = 28;

  noStroke();
  fill(80);
  textAlign(LEFT, BOTTOM);
  textSize(15);
  text('Learning Effectiveness', barX, meterY - 4);

  // Value display
  textAlign(RIGHT, BOTTOM);
  let effColor;
  if (smoothEffectiveness >= 60) effColor = [50, 170, 90];
  else if (smoothEffectiveness >= 30) effColor = [200, 150, 40];
  else effColor = [220, 50, 50];
  fill(effColor[0], effColor[1], effColor[2]);
  textSize(18);
  text(round(smoothEffectiveness) + '%', barX + barW, meterY - 4);

  // Meter background
  fill(230);
  stroke('silver');
  strokeWeight(1);
  rect(barX, meterY, barW, meterH, 4);

  // Meter fill
  noStroke();
  let meterW = (smoothEffectiveness / 100) * barW;
  // Gradient from red to yellow to green
  let r = smoothEffectiveness < 50 ? 220 : lerp(220, 50, (smoothEffectiveness - 50) / 50);
  let g = smoothEffectiveness < 50 ? lerp(50, 200, smoothEffectiveness / 50) : 170;
  let b = 50;
  fill(r, g, b);
  rect(barX, meterY, meterW, meterH, 4, meterW >= barW - 2 ? 4 : 0, meterW >= barW - 2 ? 4 : 0, 4);

  // === SAMPLE INFOGRAPHIC PREVIEW ===
  let previewY = meterY + meterH + 25;
  let previewH = drawHeight - previewY - 10;
  let previewW = canvasWidth - margin * 2 - 20;

  noStroke();
  fill(80);
  textAlign(LEFT, BOTTOM);
  textSize(15);
  text('Sample Infographic Preview', barX, previewY - 4);

  // Preview background
  fill(252, 252, 255);
  stroke('silver');
  strokeWeight(1);
  rect(barX, previewY, previewW, previewH, 6);

  // Draw sample infographic that morphs based on settings
  drawSampleInfographic(barX, previewY, previewW, previewH, quality, interactivity, complexity);
}

function drawSampleInfographic(px, py, pw, ph, quality, interactivity, complexity) {
  // This draws a simplified infographic that visually degrades
  // with low quality and improves with high quality/interactivity

  let inset = 12;
  let cx = px + inset;
  let cy = py + inset;
  let cw = pw - inset * 2;
  let ch = ph - inset * 2;

  // Misalignment factor (inverse of quality)
  let misalign = (11 - quality) * 1.5;

  // Number of data items based on complexity
  let numItems = min(floor(complexity * 0.6) + 2, 6);

  // Colors: consistent with high quality, random-ish with low quality
  let barColors;
  if (quality >= 6) {
    barColors = [
      [100, 149, 237], [60, 179, 113], [255, 165, 0],
      [186, 85, 211], [255, 99, 71], [70, 130, 180]
    ];
  } else {
    barColors = [
      [200, 80, 80], [80, 200, 80], [255, 255, 0],
      [255, 0, 255], [0, 255, 255], [128, 128, 128]
    ];
  }

  // Title of sample
  noStroke();
  fill(60);
  textAlign(CENTER, TOP);
  textSize(14);
  text('Student Test Scores by Subject', px + pw / 2, cy);

  // Draw bars
  let barAreaY = cy + 24;
  let barAreaH = ch - 50;
  let barGap = quality >= 5 ? 8 : 3;
  let barWidth = (cw - barGap * (numItems + 1)) / numItems;

  let labels = ['Math', 'Science', 'English', 'History', 'Art', 'Music'];
  let values = [75, 62, 88, 55, 70, 80];

  for (let i = 0; i < numItems; i++) {
    let bx = cx + barGap + i * (barWidth + barGap);
    let val = values[i % values.length];

    // Add complexity variation
    if (complexity > 6) val = val + (i * 5 - 12);

    let bh = (val / 100) * barAreaH;
    let by = barAreaY + barAreaH - bh;

    // Apply misalignment
    let offsetX = misalign > 0 ? sin(i * 73) * misalign : 0;
    let offsetY = misalign > 0 ? cos(i * 47) * misalign * 0.5 : 0;

    // Bar
    let col = barColors[i % barColors.length];
    fill(col[0], col[1], col[2]);
    noStroke();

    if (quality >= 7) {
      rect(bx + offsetX, by + offsetY, barWidth, bh, 3, 3, 0, 0);
    } else {
      rect(bx + offsetX, by + offsetY, barWidth, bh);
    }

    // Value label on bar
    if (quality >= 5) {
      fill(60);
      textAlign(CENTER, BOTTOM);
      textSize(12);
      noStroke();
      text(round(val) + '%', bx + barWidth / 2 + offsetX, by + offsetY - 2);
    }

    // X-axis label
    fill(80);
    textAlign(CENTER, TOP);
    textSize(11);
    noStroke();

    // Low quality: labels far from bars
    let labelOffset = quality < 4 ? 15 + misalign : 4;
    text(labels[i], bx + barWidth / 2 + offsetX, barAreaY + barAreaH + labelOffset);
  }

  // Decorative clutter for low quality
  if (quality <= 3) {
    // Unnecessary gridlines
    stroke(200);
    strokeWeight(1);
    for (let y = barAreaY; y < barAreaY + barAreaH; y += 15) {
      line(cx, y, cx + cw, y);
    }

    // Distracting border
    stroke(150, 0, 0);
    strokeWeight(3);
    noFill();
    rect(px + 4, py + 4, pw - 8, ph - 8);
  }

  // Interactive elements for high interactivity
  if (interactivity >= 7) {
    // Show "hover for details" indicators
    fill(60, 179, 113, 180);
    noStroke();
    textSize(11);
    textAlign(LEFT, BOTTOM);
    text('Hover bars for details', cx + cw - 110, barAreaY + barAreaH + 38);

    // Small info icons
    fill(60, 179, 113);
    for (let i = 0; i < min(numItems, 3); i++) {
      let bx = cx + barGap + i * (barWidth + barGap) + barWidth - 4;
      ellipse(bx, barAreaY + 8, 10, 10);
      fill('white');
      textAlign(CENTER, CENTER);
      textSize(8);
      noStroke();
      text('i', bx, barAreaY + 8);
      fill(60, 179, 113);
    }
  }

  if (interactivity >= 5) {
    // Quiz prompt
    fill(100, 149, 237, 160);
    noStroke();
    let promptY = barAreaY + barAreaH + 30;
    rect(cx, promptY, cw, 18, 3);
    fill('white');
    textAlign(CENTER, CENTER);
    textSize(11);
    noStroke();
    let promptText = interactivity >= 8 ? 'Which subject needs the most improvement?' : 'Click to explore data';
    text(promptText, cx + cw / 2, promptY + 9);
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
