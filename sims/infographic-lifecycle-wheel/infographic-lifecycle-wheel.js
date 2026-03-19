// Infographic Lifecycle Wheel MicroSim
// 9-stage circular lifecycle diagram
// Bloom Level: Understand (L2) — click-to-explore with optional auto-walk

let containerWidth;
let canvasWidth = 400;
let drawHeight = 420;
let controlHeight = 80;
let canvasHeight = drawHeight + controlHeight;
let containerHeight = canvasHeight;
let margin = 15;

const stages = [
  { name: "Design", color: "#9C27B0", icon: "💡", time: "2 hours",
    desc: "Define the learning objective, select content, and sketch the layout. Choose the infographic type and identify the key message.",
    tools: "Figma, Paper sketches, Course description", chapter: "Ch 2" },
  { name: "Build", color: "#2196F3", icon: "🔧", time: "4 hours",
    desc: "Create the HTML structure, set up the MicroSim directory, and write the main.html scaffold with appropriate library CDN links.",
    tools: "VS Code, MkDocs, p5.js", chapter: "Ch 7" },
  { name: "Generate", color: "#4CAF50", icon: "✨", time: "1 hour",
    desc: "Use AI-assisted code generation to produce the JavaScript visualization code. Iterate on prompts to refine the output.",
    tools: "Claude, GitHub Copilot", chapter: "Ch 9" },
  { name: "Document", color: "#FF9800", icon: "📄", time: "30 min",
    desc: "Write the index.md with lesson plan, learning objectives, and metadata.json with Dublin Core fields for discoverability.",
    tools: "MkDocs Material, YAML", chapter: "Ch 10" },
  { name: "Deploy", color: "#009688", icon: "🚀", time: "5 min",
    desc: "Run mkdocs gh-deploy to publish to GitHub Pages. Verify the iframe embedding works correctly in the chapter page.",
    tools: "GitHub Pages, mkdocs", chapter: "Ch 14" },
  { name: "Track", color: "#F44336", icon: "👁", time: "Ongoing",
    desc: "Monitor user interactions through the event stream: hovers, clicks, drags, and time-on-task. Collect xAPI statements.",
    tools: "xAPI, Event listeners", chapter: "Ch 14" },
  { name: "Analyze", color: "#3F51B5", icon: "📊", time: "1 hour",
    desc: "Review analytics dashboards to understand which elements users interact with most and where they struggle or disengage.",
    tools: "Grafana, Python, pandas", chapter: "Ch 14" },
  { name: "Test", color: "#FFC107", icon: "📋", time: "2 hours",
    desc: "Conduct usability testing with target learners. Check accessibility, responsiveness, and educational effectiveness.",
    tools: "Lighthouse, Screen readers", chapter: "Ch 13" },
  { name: "Iterate", color: "#00BCD4", icon: "🔁", time: "Variable",
    desc: "Based on analytics and testing, refine the design. Adjust interactions, fix usability issues, and improve learning outcomes.",
    tools: "Git, Diff tools", chapter: "Ch 14" }
];

let selectedStage = -1;
let animating = false;
let animStep = -1;
let animTimer = 0;
let cycleCount = 1;
let showTimes = false;

let animateButton, showAllButton, timeToggle;

function setup() {
  updateCanvasSize();
  const canvas = createCanvas(containerWidth, containerHeight);
  canvas.parent(document.querySelector('main'));
  textSize(14);

  animateButton = createButton('Animate Cycle');
  animateButton.position(10, drawHeight + 8);
  animateButton.mousePressed(toggleAnimate);

  showAllButton = createButton('Show All Details');
  showAllButton.position(130, drawHeight + 8);
  showAllButton.mousePressed(() => { selectedStage = -2; });

  timeToggle = createButton('Show Times: OFF');
  timeToggle.position(270, drawHeight + 8);
  timeToggle.mousePressed(() => {
    showTimes = !showTimes;
    timeToggle.html('Show Times: ' + (showTimes ? 'ON' : 'OFF'));
  });
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
  textSize(20);
  text('Infographic Lifecycle Wheel', canvasWidth / 2, 6);

  let activeStage = selectedStage;
  if (animating && animStep >= 0) {
    activeStage = animStep;
  }

  // Animation
  if (animating) {
    animTimer += deltaTime;
    if (animTimer > 2000) {
      animTimer = 0;
      animStep++;
      if (animStep >= stages.length) {
        animStep = 0;
        cycleCount++;
      }
    }
  }

  // Wheel parameters
  let cx = canvasWidth * 0.35;
  let cy = drawHeight * 0.48;
  let outerR = Math.min(canvasWidth * 0.28, drawHeight * 0.35);
  let innerR = outerR * 0.45;
  let angleStep = TWO_PI / stages.length;

  // Draw arc segments
  for (let i = 0; i < stages.length; i++) {
    let startAngle = -HALF_PI + i * angleStep;
    let endAngle = startAngle + angleStep;
    let isActive = (i === activeStage);

    // Arc segment
    if (isActive) {
      fill(stages[i].color);
      stroke('black');
      strokeWeight(3);
    } else if (activeStage >= 0 && activeStage !== -2) {
      fill(stages[i].color + '60');
      stroke(stages[i].color + '80');
      strokeWeight(1);
    } else {
      fill(stages[i].color + 'CC');
      stroke(stages[i].color);
      strokeWeight(1);
    }

    arc(cx, cy, outerR * 2, outerR * 2, startAngle, endAngle, PIE);

    // Inner circle to make it a ring
    fill('aliceblue');
    noStroke();
    circle(cx, cy, innerR * 2);

    // Label on the arc
    let midAngle = startAngle + angleStep / 2;
    let labelR = (outerR + innerR) / 2;
    let lx = cx + cos(midAngle) * labelR;
    let ly = cy + sin(midAngle) * labelR;

    fill(isActive ? 'white' : 'black');
    noStroke();
    textAlign(CENTER, CENTER);
    textSize(16);
    text(stages[i].icon, lx, ly - 6);
    textSize(Math.min(11, outerR / 8));
    text(stages[i].name, lx, ly + 10);

    if (showTimes) {
      textSize(9);
      fill(100);
      text(stages[i].time, lx, ly + 22);
    }
  }

  // Center info
  fill('black');
  noStroke();
  textAlign(CENTER, CENTER);
  textSize(14);
  text('Iteration ' + cycleCount + ' of ∞', cx, cy);

  // Mouse hit detection on wheel
  let dx = mouseX - cx;
  let dy = mouseY - cy;
  let dist2 = sqrt(dx * dx + dy * dy);
  if (dist2 > innerR && dist2 < outerR && !animating) {
    let angle = atan2(dy, dx) + HALF_PI;
    if (angle < 0) angle += TWO_PI;
    let idx = Math.floor(angle / angleStep) % stages.length;
    if (mouseIsPressed) {
      selectedStage = idx;
    }
  }

  // Right info panel
  let panelX = canvasWidth * 0.68;
  let panelW = canvasWidth * 0.3;
  let panelY = 35;

  if (activeStage >= 0 && activeStage < stages.length) {
    let s = stages[activeStage];
    fill(s.color);
    noStroke();
    textAlign(LEFT, TOP);
    textSize(18);
    text(s.icon + ' ' + s.name, panelX, panelY);

    fill('black');
    textSize(13);
    textWrap(WORD);
    text(s.desc, panelX, panelY + 28, panelW);

    fill(100);
    textSize(12);
    text('Tools: ' + s.tools, panelX, panelY + 105, panelW);
    text('Reference: ' + s.chapter, panelX, panelY + 140);
    text('Duration: ' + s.time, panelX, panelY + 160);
  } else if (activeStage === -2) {
    // Show all details list
    fill('black');
    noStroke();
    textAlign(LEFT, TOP);
    textSize(12);
    for (let i = 0; i < stages.length; i++) {
      let yy = panelY + i * 40;
      fill(stages[i].color);
      textSize(14);
      text(stages[i].icon + ' ' + stages[i].name, panelX, yy);
      fill(80);
      textSize(11);
      text(stages[i].time + ' — ' + stages[i].tools, panelX, yy + 16);
    }
  } else {
    fill(120);
    noStroke();
    textAlign(CENTER, CENTER);
    textSize(14);
    text('Click a stage\nto see details', panelX + panelW / 2, drawHeight / 2);
  }

  // Control area labels
  fill('black');
  noStroke();
  textAlign(LEFT, CENTER);
  textSize(14);
  text('Cycle: ' + cycleCount, 10, drawHeight + 55);
}

function toggleAnimate() {
  animating = !animating;
  if (animating) {
    animStep = 0;
    animTimer = 0;
    animateButton.html('Stop');
  } else {
    animStep = -1;
    animateButton.html('Animate Cycle');
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
