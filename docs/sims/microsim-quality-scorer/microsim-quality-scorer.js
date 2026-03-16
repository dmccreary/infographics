// MicroSim Quality Scorer
// Score a MicroSim against the quality rubric
// Bloom Level: Evaluate (L5) — assess quality with rubric

let containerWidth;
let canvasWidth = 400;
let drawHeight = 420;
let controlHeight = 80;
let canvasHeight = drawHeight + controlHeight;
let containerHeight = canvasHeight;
let margin = 15;
let sliderLeftMargin = 140;

const categories = [
  { name: "Functionality", max: 25, desc: "Works without errors, interactive controls respond" },
  { name: "Visual Design", max: 20, desc: "Aliceblue bg, silver borders, consistent colors" },
  { name: "Educational Value", max: 20, desc: "Clear learning objective, appropriate Bloom level" },
  { name: "Metadata", max: 15, desc: "Dublin Core fields, schema meta tag present" },
  { name: "Responsiveness", max: 10, desc: "Adapts to width, no scroll hijacking" },
  { name: "Code Quality", max: 10, desc: "Comments, updateCanvasSize pattern, no globals" }
];

const samples = [
  { name: "Good Example", expected: 90,
    issues: ["Minor: title could be larger", "All standards met"],
    scores: [23, 18, 19, 14, 9, 9] },
  { name: "Needs Work", expected: 72,
    issues: ["Missing metadata.json fields", "No silver border on controls", "Font too small at 12px"],
    scores: [22, 14, 16, 8, 7, 7] },
  { name: "Poor Example", expected: 45,
    issues: ["White background instead of aliceblue", "No responsive resize", "Missing index.md lesson plan",
             "No metadata.json", "Scrollbar appears in iframe"],
    scores: [15, 8, 10, 2, 4, 5] }
];

let sliders = [];
let currentSample = 0;
let sampleSelect, resetButton;

function setup() {
  updateCanvasSize();
  const canvas = createCanvas(containerWidth, containerHeight);
  canvas.parent(document.querySelector('main'));

  // Create sliders for each category
  for (let i = 0; i < categories.length; i++) {
    let s = createSlider(0, categories[i].max, 0, 1);
    s.position(sliderLeftMargin, drawHeight + 8);
    sliders.push(s);
  }
  positionSliders();

  sampleSelect = createSelect();
  sampleSelect.position(10, drawHeight + 8);
  for (let s of samples) sampleSelect.option(s.name);
  sampleSelect.changed(() => {
    currentSample = samples.findIndex(s => s.name === sampleSelect.value());
  });

  resetButton = createButton('Reset Scores');
  resetButton.position(10, drawHeight + 38);
  resetButton.mousePressed(() => { sliders.forEach(s => s.value(0)); });
}

function positionSliders() {
  let panelX = canvasWidth * 0.52;
  let sliderW = canvasWidth * 0.44;
  for (let i = 0; i < sliders.length; i++) {
    sliders[i].position(panelX + 90, 70 + i * 48);
    sliders[i].size(Math.max(80, sliderW - 100));
  }
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
  text('MicroSim Quality Scorer', canvasWidth / 2, 6);

  let sample = samples[currentSample];

  // Left panel — sample preview
  let leftW = canvasWidth * 0.48;
  fill('#F5F5F5');
  stroke('#E0E0E0');
  strokeWeight(1);
  rect(margin, 35, leftW - margin, drawHeight - 45, 6);

  fill('black');
  noStroke();
  textAlign(LEFT, TOP);
  textSize(15);
  text('Sample: ' + sample.name, margin + 10, 45);

  fill(sample.expected >= 85 ? '#4CAF50' : sample.expected >= 70 ? '#FF9800' : '#F44336');
  textSize(13);
  text('Expected Score: ~' + sample.expected, margin + 10, 65);

  // Issues list
  fill('black');
  textSize(13);
  text('Issues to evaluate:', margin + 10, 95);

  textSize(12);
  fill(80);
  for (let i = 0; i < sample.issues.length; i++) {
    text('• ' + sample.issues[i], margin + 15, 115 + i * 20, leftW - 30);
  }

  // Suggested scores hint
  fill(150);
  textSize(11);
  text('Hint scores:', margin + 10, 250);
  for (let i = 0; i < categories.length; i++) {
    text(categories[i].name + ': ' + sample.scores[i] + '/' + categories[i].max,
      margin + 15, 268 + i * 16);
  }

  // Right panel — scoring sliders
  let panelX = canvasWidth * 0.52;

  fill('black');
  noStroke();
  textAlign(LEFT, TOP);
  textSize(14);
  text('Quality Rubric', panelX, 40);

  let totalScore = 0;
  let totalMax = 0;

  for (let i = 0; i < categories.length; i++) {
    let cat = categories[i];
    let val = sliders[i].value();
    totalScore += val;
    totalMax += cat.max;
    let y = 62 + i * 48;

    fill('black');
    noStroke();
    textAlign(LEFT, TOP);
    textSize(13);
    text(cat.name, panelX, y);

    fill(100);
    textSize(10);
    text(cat.desc, panelX, y + 16, canvasWidth - panelX - margin);

    // Score display
    fill(val >= cat.max * 0.85 ? '#4CAF50' : val >= cat.max * 0.7 ? '#FF9800' : '#F44336');
    textAlign(RIGHT, TOP);
    textSize(14);
    text(val + '/' + cat.max, canvasWidth - margin, y);
  }

  // Total score
  let scoreY = 62 + categories.length * 48 + 10;
  let scoreColor = totalScore >= 85 ? '#4CAF50' : totalScore >= 70 ? '#FF9800' : '#F44336';

  fill(scoreColor);
  noStroke();
  textAlign(CENTER, TOP);
  textSize(36);
  text(totalScore, panelX + (canvasWidth - panelX) / 2, scoreY);

  textSize(14);
  text('/ ' + totalMax, panelX + (canvasWidth - panelX) / 2, scoreY + 40);

  // Grade
  let grade = totalScore >= 85 ? 'A' : totalScore >= 70 ? 'B' : totalScore >= 50 ? 'C' : 'D';
  textSize(20);
  text('Grade: ' + grade, panelX + (canvasWidth - panelX) / 2, scoreY + 60);

  // Findings
  let findY = scoreY + 90;
  fill(40);
  rect(panelX, findY, canvasWidth - panelX - margin, drawHeight - findY - 10, 4);
  fill('#00FF88');
  textFont('monospace');
  textSize(10);
  textAlign(LEFT, TOP);
  let findings = '';
  for (let i = 0; i < categories.length; i++) {
    let val = sliders[i].value();
    let cat = categories[i];
    if (val < cat.max * 0.7) {
      findings += cat.name + ': ' + val + '/' + cat.max + ' — Needs improvement\n';
    }
  }
  if (!findings) findings = 'All categories meet quality threshold!';
  text(findings, panelX + 6, findY + 6, canvasWidth - panelX - margin - 12);
  textFont('Arial');

  // Control labels
  fill('black');
  noStroke();
  textAlign(LEFT, CENTER);
  textSize(13);
  text('Total: ' + totalScore + ' (' + grade + ')', 150, drawHeight + 50);
}

function windowResized() {
  updateCanvasSize();
  resizeCanvas(containerWidth, containerHeight);
  positionSliders();
  redraw();
}

function updateCanvasSize() {
  const container = document.querySelector('main').getBoundingClientRect();
  containerWidth = Math.floor(container.width);
  canvasWidth = containerWidth;
}
