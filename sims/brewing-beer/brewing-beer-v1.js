// Brewing Beer Process Explorer MicroSim
// Adapts the alcoholic fermentation explorer to highlight brewery steps, CO2 capture, and strain differences.

let containerWidth;
let canvasWidth = 760;
const drawHeight = 690;
const controlHeight = 120;
const canvasHeight = drawHeight + controlHeight;
const margin = 24;

let startButton;
let resetButton;
let prevButton;
let nextButton;
let co2Toggle;
let delaySlider;
const sliderRange = { min: 0, max: 100 };

let isRunning = false;
let currentStep = 0;
let lastAdvance = 0;
let autoDelay = 2000;
let showCO2Trace = false;
let selectedOrganism = '';
let co2Count = 0;
let simulationSpeedLabel = { x: 0, y: 0 };
const co2Increment = 4;

const stageCards = [
  { title: 'Glucose feedstock', detail: 'Malted barley mash converted to sweet wort', color: '#fffef1' },
  { title: 'Glycolysis', detail: '2 ATP + 2 NADH + 2 pyruvate in the fermenter', color: '#fff4e2' },
  { title: 'Pyruvate pool', detail: 'Oxygen exclusion pushes wort chemistry anaerobic', color: '#ffe6ce' },
  { title: 'Acetaldehyde + CO2', detail: 'Pyruvate decarboxylase vents CO2 through blow-off tubes', color: '#ffd9c0' },
  { title: 'Ethanol formed', detail: 'NADH reduces acetaldehyde to flavorful ethanol', color: '#ffcdb0' }
];

const steps = [
  {
    heading: '1. Mash tun feeds glucose-rich wort to yeast',
    body: 'Yeast absorb maltose and run glycolysis, netting 2 ATP and 2 NADH per glucose.',
    highlights: [0]
  },
  {
    heading: '2. Fermentation vessels stay oxygen-limited',
    body: 'Brewers cap the tank so pyruvate cannot enter mitochondria, forcing fermentation.',
    highlights: [1]
  },
  {
    heading: '3. Pyruvate decarboxylase vents aromatic CO2',
    body: 'Carbon dioxide scrubs volatile aromatics and carbonates the beer.',
    highlights: [2]
  },
  {
    heading: '4. Acetaldehyde accepts NADH electrons',
    body: 'NADH → NAD+ keeps glycolysis running while ethanol precursors form flavor compounds.',
    highlights: [3]
  },
  {
    heading: '5. Cellar team directs CO2 capture and ethanol conditioning',
    body: 'CO2 can be trapped in bright tanks while ethanol matures with yeast cleanup.',
    highlights: [4]
  }
];

const organisms = [
  { name: 'Ale Yeast (Saccharomyces cerevisiae)', fact: 'Top-fermenting strains generate fruity esters while recycling NAD+ quickly.', color: '#2a9d8f' },
  { name: 'Lager Yeast (Saccharomyces pastorianus)', fact: 'Cold fermentation slows glycolysis but keeps acetaldehyde and diacetyl low.', color: '#1c7a74' },
  { name: 'Spontaneous Cultures', fact: 'Mixed yeasts and bacteria drive complex fermentation and CO2 curves in foeders.', color: '#90be6d' }
];

let layout;

function setup() {
  updateCanvasSize();
  const canvas = createCanvas(canvasWidth, canvasHeight);
  canvas.parent(document.querySelector('main'));

  startButton = createButton('Start Simulation');
  startButton.mousePressed(toggleSimulation);
  startButton.removeAttribute('disabled');

  resetButton = createButton('Reset');
  resetButton.mousePressed(resetSimulation);

  prevButton = createButton('Previous Step');
  prevButton.mousePressed(() => changeStep(-1));

  nextButton = createButton('Next Step');
  nextButton.mousePressed(() => changeStep(1));

  co2Toggle = createCheckbox(' Show CO2 Trace', false);
  co2Toggle.changed(() => {
    showCO2Trace = co2Toggle.checked();
  });

  const initialSliderValue = map(autoDelay, 4000, 800, sliderRange.min, sliderRange.max, true);
  delaySlider = createSlider(sliderRange.min, sliderRange.max, initialSliderValue, 1);
  delaySlider.input(() => {
    autoDelay = map(delaySlider.value(), sliderRange.min, sliderRange.max, 4000, 800, true);
  });

  describe('Brewing beer fermentation MicroSim showing stage cards, CO2 production, and yeast strain facts.', LABEL);
  updateControlPositions();
  lastAdvance = millis();
}

function draw() {
  updateCanvasSize();
  resizeCanvas(canvasWidth, canvasHeight, true);
  layout = computeLayout();

  fill('aliceblue');
  stroke('silver');
  rect(0, 0, canvasWidth, drawHeight);
  fill('white');
  rect(0, drawHeight, canvasWidth, controlHeight);

  if (isRunning && millis() - lastAdvance >= autoDelay) {
    advanceStep();
  }

  drawTitle();
  drawStatusStrip();
  drawStages();
  drawStepDetail();
  drawCO2Panel();
  drawBadges();
  drawOrganismRow();
  drawNarration();
  drawControlsLabeling();
}

function drawTitle() {
  noStroke();
  fill('#103049');
  textAlign(CENTER, TOP);
  textSize(30);
  text('Brewing Beer Process Explorer', canvasWidth / 2, margin);
  textSize(15);
  fill('#1f4b99');
  text('Trace how wort sugars become CO2 and ethanol in a brewery fermenter', canvasWidth / 2, margin + 32);
}

function drawStatusStrip() {
  const area = layout.statusStrip;
  stroke('#c28f4a');
  strokeWeight(1);
  fill('#fff0dd');
  rect(area.x, area.y, area.w, area.h, 12);
  noStroke();
  fill('#4a2d0a');
  textAlign(LEFT, CENTER);
  textSize(14);
  const status = showCO2Trace ? 'CO2 trace ON - bubbles highlighted' : 'CO2 trace OFF - focus on electron flow';
  text(status, area.x + 16, area.y + area.h / 2);
}

function drawStages() {
  const area = layout.stageArea;
  const gap = 16;
  const totalGap = gap * (stageCards.length - 1);
  const cardHeight = (area.h - totalGap) / stageCards.length;
  const slotHeight = cardHeight + gap;
  const cardWidth = area.w - 20;
  stageCards.forEach((stage, index) => {
    const x = area.x + 10;
    const y = area.y + index * slotHeight;
    stroke('#c27f55');
    fill(stage.color);
    rect(x, y, cardWidth, cardHeight, 12);
    noStroke();
    fill('#1d1d1d');
    textAlign(LEFT, TOP);
    textSize(14);
    text(`Step ${index + 1}: ${stage.title}`, x + 12, y + 7, cardWidth - 24, 22);
    textSize(11);
    fill('#4b4b4b');
    text(stage.detail, x + 12, y + 29, cardWidth - 24, cardHeight - 28);
    if (steps[currentStep].highlights.includes(index)) {
      noFill();
      stroke('#d97706');
      strokeWeight(3);
      rect(x - 4, y - 4, cardWidth + 8, cardHeight + 8, 14);
      strokeWeight(1);
    }
    if (index < stageCards.length - 1) {
      stroke('#5a5a5a');
      strokeWeight(2);
      const arrowX = x + cardWidth / 2;
      const arrowTop = y + cardHeight;
      const arrowBottom = arrowTop + gap - 4;
      line(arrowX, arrowTop, arrowX, arrowBottom);
      drawArrowHead(arrowX, arrowBottom, HALF_PI);
    }
  });
}

function drawStepDetail() {
  const area = layout.infoBox;
  stroke('#7f6aa3');
  fill('#f6f1ff');
  rect(area.x, area.y, area.w, area.h, 16);
  const step = steps[currentStep];
  noStroke();
  fill('#2d1f44');
  textAlign(LEFT, TOP);
  textSize(16);
  text(step.heading, area.x + 16, area.y + 16, area.w - 32, 44);
  textSize(13);
  fill('#4a3c5f');
  text(step.body, area.x + 16, area.y + 66, area.w - 32, area.h - 110);

  fill('#51305a');
  textAlign(LEFT, BOTTOM);
  textSize(12);
  text(`Step ${currentStep + 1} of ${steps.length}`, area.x + 16, area.y + area.h - 42);
  const barY = area.y + area.h - 22;
  const barWidth = area.w - 32;
  fill('#dcc7ff');
  rect(area.x + 16, barY, barWidth, 8, 4);
  fill('#a374ff');
  rect(area.x + 16, barY, barWidth * ((currentStep + 1) / steps.length), 8, 4);
}

function drawCO2Panel() {
  const nadh = layout.nadhArea;
  stroke('#b868cb');
  fill('#fdf0ff');
  rect(nadh.x, nadh.y, nadh.w, nadh.h, 12);
  noStroke();
  fill('#531b65');
  textAlign(CENTER, CENTER);
  textSize(16);
  text('NADH ↺ NAD+', nadh.x + nadh.w / 2, nadh.y + nadh.h / 2);

  const startX = nadh.x + nadh.w * 0.2;
  const startY = nadh.y + nadh.h + 10;
  const endX = nadh.x + nadh.w * 0.8;
  const endY = startY;
  noFill();
  stroke('#7b3fad');
  strokeWeight(3);
  bezier(startX, startY, startX + 40, startY - 30, endX - 40, startY - 30, endX, endY);
  drawCurvedArrowHead(endX, endY, 0);
  strokeWeight(1);

  const co2Box = layout.co2Box;
  stroke('#c27f55');
  fill('#fff1de');
  rect(co2Box.x, co2Box.y, co2Box.w, co2Box.h, 10);
  noStroke();
  fill('#7c410b');
  textAlign(LEFT, CENTER);
  textSize(14);
  text(`CO2 bubbles: ${co2Count}`, co2Box.x + 12, co2Box.y + co2Box.h / 2);
  if (showCO2Trace) {
    stroke('#b45309');
    noFill();
    for (let i = 0; i < 5; i++) {
      const bx = co2Box.x + 80 + i * 80;
      const by = co2Box.y - 20 - (i % 2) * 10;
      ellipse(bx, by, 12, 12);
    }
  }
}

function drawBadges() {
  const waste = layout.wasteBadge;
  const atp = layout.atpBadge;
  stroke('#d58f2a');
  fill('#ffeecf');
  rect(waste.x, waste.y, waste.w, waste.h, 8);
  noStroke();
  fill('#7c2d12');
  textAlign(LEFT, CENTER);
  textSize(14);
  text('Waste: Ethanol + CO2', waste.x + 12, waste.y + waste.h / 2);

  stroke('#d58f2a');
  fill('#fff7e0');
  rect(atp.x, atp.y, atp.w, atp.h, 8);
  noStroke();
  fill('#5a3a07');
  textSize(14);
  text('Net ATP: 2', atp.x + 12, atp.y + atp.h / 2);
}

function drawOrganismRow() {
  const area = layout.organisms;
  stroke('#66ad7f');
  fill('#eefdf2');
  rect(area.x, area.y, area.w, area.h, 14);

  const chipWidth = 170;
  const spacing = (area.w - chipWidth * organisms.length) / (organisms.length + 1);
  organisms.forEach((org, i) => {
    const x = area.x + spacing * (i + 1) + chipWidth * i;
    const y = area.y + 9;
    stroke(selectedOrganism === org.name ? '#d97706' : '#0f172a');
    fill(org.color);
    rect(x, y, chipWidth, 28, 12);
    noStroke();
    fill('#fff');
    textAlign(CENTER, CENTER);
    textSize(12);
    text(org.name, x + chipWidth / 2, y + 14);
  });

  if (selectedOrganism) {
    fill('#0f172a');
    textAlign(LEFT, TOP);
    textSize(12);
    const fact = organisms.find((o) => o.name === selectedOrganism)?.fact || '';
    text(fact, area.x + 12, area.y + area.h - 19);
  }
}

function drawNarration() {
  const area = layout.narration;
  stroke('#d29a3d');
  fill('#fff3d8');
  rect(area.x, area.y, area.w, area.h, 12);
  const status = showCO2Trace
    ? 'CO2 trace ON - bubbles highlighted throughout the flow.'
    : 'CO2 trace OFF - focus on electron shuttling.';
  noStroke();
  fill('#7a341a');
  textAlign(LEFT, CENTER);
  textSize(13);
  text(status, area.x + 16, area.y + area.h / 2 - 10, area.w - 32);
  fill('#3f2f2a');
  text(`CO2 counter: ${co2Count}`, area.x + 16, area.y + area.h / 2 + 14);
}

function drawControlsLabeling() {
  fill('#0f172a');
  textAlign(LEFT, TOP);
  textSize(12);
  text(`Step delay: ${(autoDelay / 1000).toFixed(1)} s`, margin, drawHeight + 95);

  fill('#1f2937');
  textAlign(LEFT, CENTER);
  textSize(15);
  text('Simulation Speed:', simulationSpeedLabel.x, simulationSpeedLabel.y);
  textSize(12);
  text('slower', simulationSpeedLabel.x + 130, simulationSpeedLabel.y + 17);
  textAlign(RIGHT, CENTER);
  text('faster', canvasWidth - margin, simulationSpeedLabel.y + 17);
}

function toggleSimulation() {
  startButton.removeAttribute('disabled');
  isRunning = !isRunning;
  if (isRunning && currentStep === steps.length - 1) {
    currentStep = 0;
  }
  startButton.html(isRunning ? 'Pause Simulation' : 'Start Simulation');
  lastAdvance = millis();
}

function advanceStep() {
  changeStep(1);
}

function changeStep(delta) {
  const nextIndex = constrain(currentStep + delta, 0, steps.length - 1);
  if (nextIndex !== currentStep) {
    currentStep = nextIndex;
    lastAdvance = millis();
    co2Count = computeCO2Count(currentStep);
  } else if (delta > 0 && currentStep === steps.length - 1) {
    isRunning = false;
    startButton.html('Start Simulation');
    startButton.attribute('disabled', 'true');
  }
}

function resetSimulation() {
  isRunning = false;
  currentStep = 0;
  co2Count = 0;
  lastAdvance = millis();
  showCO2Trace = false;
  co2Toggle.checked(false);
  selectedOrganism = '';
  startButton.html('Start Simulation');
  startButton.removeAttribute('disabled');
}

function mousePressed() {
  if (layout) {
    const stageArea = layout.stageArea;
    const gap = 16;
    const cardHeight = (stageArea.h - gap * (stageCards.length - 1)) / stageCards.length;
    const slotHeight = cardHeight + gap;

    const cardWidth = stageArea.w - 20;
    for (let i = 0; i < stageCards.length; i++) {
      const x = stageArea.x + 10;
      const y = stageArea.y + i * slotHeight;
      const h = cardHeight;
      if (mouseX >= x && mouseX <= x + cardWidth && mouseY >= y && mouseY <= y + h) {
        currentStep = i;
        isRunning = false;
        startButton.html('Start Simulation');
        startButton.removeAttribute('disabled');
        co2Count = computeCO2Count(currentStep);
        break;
      }
    }
  }
  const area = layout.organisms;
  const chipWidth = 170;
  const spacing = (area.w - chipWidth * organisms.length) / (organisms.length + 1);
  organisms.forEach((org, i) => {
    const x = area.x + spacing * (i + 1) + chipWidth * i;
    const y = area.y + 9;
    if (mouseX >= x && mouseX <= x + chipWidth && mouseY >= y && mouseY <= y + 28) {
      selectedOrganism = org.name;
      isRunning = false;
      startButton.html('Start Simulation');
      startButton.removeAttribute('disabled');
    }
  });
}

function computeLayout() {
  const contentWidth = canvasWidth - margin * 2;
  const stageWidth = canvasWidth * 0.35;
  const gap = 14;
  const rightWidth = contentWidth - stageWidth - gap;
  const statusHeight = 44;
  const stageHeight = 294;
  const nadhHeight = 28;
  const co2Height = 36;
  const badgeHeight = 28;
  const organismHeight = 60;
  const narrationHeight = 32;
  const statusY = margin + 60;
  const stageY = statusY + statusHeight + 12;
  const nadhY = stageY + stageHeight + 12;
  const co2Y = nadhY + nadhHeight + 24;
  const wasteY = co2Y + co2Height + 12;
  const organismY = wasteY + badgeHeight + 12;
  const narrationY = organismY + organismHeight + 12;

  return {
    statusStrip: { x: margin, y: statusY, w: contentWidth, h: statusHeight },
    stageArea: { x: margin, y: stageY, w: stageWidth, h: stageHeight },
    infoBox: { x: margin + stageWidth + gap, y: stageY, w: rightWidth, h: stageHeight },
    nadhArea: { x: margin + 30, y: nadhY, w: contentWidth - 60, h: nadhHeight },
    co2Box: { x: margin + 30, y: co2Y, w: contentWidth - 60, h: co2Height },
    wasteBadge: { x: margin + 10, y: wasteY, w: contentWidth / 2 - 20, h: badgeHeight },
    atpBadge: { x: margin + contentWidth / 2 + 10, y: wasteY, w: contentWidth / 2 - 20, h: badgeHeight },
    organisms: { x: margin, y: organismY, w: contentWidth, h: organismHeight },
    narration: { x: margin, y: narrationY, w: contentWidth, h: narrationHeight }
  };
}

function updateControlPositions() {
  const rowY = drawHeight + 12;
  let posX = margin;
  posX = positionButton(startButton, posX, rowY);
  posX = positionButton(resetButton, posX, rowY);
  posX = positionButton(prevButton, posX, rowY);
  posX = positionButton(nextButton, posX, rowY);

  co2Toggle.position(posX + 20, rowY + 8);

  const sliderY = rowY + 60;
  const sliderX = margin + 130;
  delaySlider.position(sliderX, sliderY);
  delaySlider.size(canvasWidth - sliderX - margin);
  simulationSpeedLabel = { x: margin, y: sliderY + 6 };
}

function positionButton(btn, x, y) {
  btn.position(x, y);
  btn.style('height', '34px');
  btn.style('width', 'auto');
  btn.style('padding', '6px 5px');
  btn.style('box-sizing', 'border-box');
  const width = btn.elt.offsetWidth || 120;
  return x + width + 12;
}

function computeCO2Count(stepIndex) {
  let total = 0;
  for (let i = 0; i <= stepIndex; i++) {
    if (steps[i].highlights.includes(2)) {
      total += co2Increment;
    }
  }
  return total;
}

function updateCanvasSize() {
  const container = document.querySelector('main');
  if (!container) return;
  const bounds = container.getBoundingClientRect();
  containerWidth = Math.floor(bounds.width);
  canvasWidth = containerWidth;
}

function windowResized() {
  updateCanvasSize();
  resizeCanvas(canvasWidth, canvasHeight, true);
  updateControlPositions();
}

function drawArrowHead(x, y, angle) {
  push();
  translate(x, y);
  rotate(angle);
  fill('#555');
  noStroke();
  triangle(0, 0, -10, 4, -10, -4);
  pop();
}

function drawCurvedArrowHead(x, y, angle) {
  push();
  translate(x, y);
  rotate(angle);
  fill('#7b3fad');
  noStroke();
  triangle(0, 0, -10, 4, -10, -4);
  pop();
}
