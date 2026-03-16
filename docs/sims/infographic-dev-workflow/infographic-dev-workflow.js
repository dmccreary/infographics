// Infographic Development Workflow MicroSim
// 8-step workflow showing the end-to-end infographic development process
// Bloom Level: Understand (L2) — step-through with hover details

let containerWidth;
let canvasWidth = 400;
let drawHeight = 350;
let controlHeight = 50;
let canvasHeight = drawHeight + controlHeight;
let containerHeight = canvasHeight;
let margin = 15;
let defaultTextSize = 14;

// Workflow steps data
const steps = [
  {
    name: "Define Config",
    color: "#4285F4",
    icon: "⚙",
    desc: "Set up the configuration object that defines dimensions, colors, labels, and data sources. This pattern centralizes all parameters for easy maintenance.",
    concepts: ["Configuration Object", "JSON", "Defaults"],
    code: "const config = {\n  width: 800,\n  colors: ['#4285F4'],\n  title: 'My Infographic'\n};"
  },
  {
    name: "Load Data",
    color: "#4285F4",
    icon: "📦",
    desc: "Fetch external data using JSON files or API calls. Handle errors gracefully so the infographic shows a fallback message if data is unavailable.",
    concepts: ["fetch()", "JSON.parse", "Error Handling"],
    code: "const data = await\n  fetch('data.json')\n  .then(r => r.json())\n  .catch(e => fallback);"
  },
  {
    name: "Create Regions",
    color: "#34A853",
    icon: "🔲",
    desc: "Use the Factory pattern to generate interactive region objects from configuration data. Destructuring keeps the code clean and readable.",
    concepts: ["Factory Pattern", "Destructuring", "Array.map"],
    code: "const regions =\n  config.areas.map(\n  ({x,y,w,h,label}) =>\n  new Region(x,y,w,h,label));"
  },
  {
    name: "Setup Canvas",
    color: "#34A853",
    icon: "🖼",
    desc: "Initialize the p5.js canvas with responsive sizing. The canvas attaches to the <main> element and adapts to the container width.",
    concepts: ["createCanvas", "Responsive", "Parent Element"],
    code: "function setup() {\n  updateCanvasSize();\n  createCanvas(w, h)\n    .parent('main');\n}"
  },
  {
    name: "Draw Loop",
    color: "#FBBC04",
    icon: "🔄",
    desc: "The draw() function runs 60 times per second, rendering the current state. Use state variables to control what is displayed without recalculating everything.",
    concepts: ["Animation Loop", "State Mgmt", "frameRate"],
    code: "function draw() {\n  background('aliceblue');\n  regions.forEach(\n    r => r.render());\n}"
  },
  {
    name: "Handle Events",
    color: "#FBBC04",
    icon: "👆",
    desc: "Respond to mouse and touch events using the Observer pattern. Callbacks detect which region was clicked or hovered and update the application state.",
    concepts: ["Observer Pattern", "Callbacks", "Touch/Mouse"],
    code: "function mousePressed() {\n  regions.forEach(r => {\n    if (r.contains(mouseX,\n      mouseY)) r.select();\n  });\n}"
  },
  {
    name: "Adapt Layout",
    color: "#A142F4",
    icon: "📱",
    desc: "Use breakpoints and the windowResized() function to adapt the layout for different screen sizes. Mobile-first design ensures usability on all devices.",
    concepts: ["Breakpoints", "Mobile-First", "Resize"],
    code: "function windowResized(){\n  updateCanvasSize();\n  resizeCanvas(w, h);\n  repositionControls();\n}"
  },
  {
    name: "Debug & Profile",
    color: "#EA4335",
    icon: "🔍",
    desc: "Use browser DevTools to inspect the DOM, monitor network requests, and profile rendering performance. Console.log() helps trace event flow.",
    concepts: ["Console", "Network Tab", "Performance"],
    code: "console.log(\n  'FPS:', frameRate(),\n  'Regions:', regions\n    .length);"
  }
];

let hoveredStep = -1;
let walkthroughActive = false;
let walkthroughStep = -1;
let walkthroughTimer = 0;
let walkthroughButton;

function setup() {
  updateCanvasSize();
  const canvas = createCanvas(containerWidth, containerHeight);
  var mainElement = document.querySelector('main');
  canvas.parent(mainElement);
  textSize(defaultTextSize);

  walkthroughButton = createButton('Play Walkthrough');
  walkthroughButton.position(10, drawHeight + 12);
  walkthroughButton.mousePressed(toggleWalkthrough);
}

function draw() {
  updateCanvasSize();

  // Draw regions
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
  text('Infographic Development Workflow', canvasWidth / 2, 8);

  // Calculate step box layout
  let boxW = Math.min(110, (canvasWidth - margin * 2 - 10) / 4 - 10);
  let boxH = 50;
  let startX = margin;
  let row1Y = 42;
  let row2Y = row1Y + boxH + 20;

  // Determine active step (walkthrough overrides hover)
  let activeStep = hoveredStep;
  if (walkthroughActive && walkthroughStep >= 0) {
    activeStep = walkthroughStep;
  }

  // Handle walkthrough timing
  if (walkthroughActive) {
    walkthroughTimer += deltaTime;
    if (walkthroughTimer > 2000) {
      walkthroughTimer = 0;
      walkthroughStep++;
      if (walkthroughStep >= steps.length) {
        walkthroughActive = false;
        walkthroughStep = -1;
        walkthroughButton.html('Play Walkthrough');
      }
    }
  }

  // Check mouse hover
  hoveredStep = -1;
  for (let i = 0; i < steps.length; i++) {
    let col = i % 4;
    let row = Math.floor(i / 4);
    let bx = startX + col * (boxW + 10);
    let by = row === 0 ? row1Y : row2Y;
    if (mouseX >= bx && mouseX <= bx + boxW && mouseY >= by && mouseY <= by + boxH) {
      hoveredStep = i;
      if (walkthroughActive) {
        walkthroughStep = i;
        walkthroughTimer = 0;
      }
    }
  }

  // Draw step boxes and arrows
  for (let i = 0; i < steps.length; i++) {
    let col = i % 4;
    let row = Math.floor(i / 4);
    let bx = startX + col * (boxW + 10);
    let by = row === 0 ? row1Y : row2Y;

    let isActive = (i === activeStep);

    // Draw arrow to next step
    if (i < steps.length - 1) {
      let nextCol = (i + 1) % 4;
      let nextRow = Math.floor((i + 1) / 4);
      let nx = startX + nextCol * (boxW + 10);
      let ny = nextRow === 0 ? row1Y : row2Y;

      stroke(180);
      strokeWeight(2);
      if (row === nextRow) {
        // Horizontal arrow
        let ax1 = bx + boxW;
        let ay1 = by + boxH / 2;
        let ax2 = nx;
        let ay2 = ny + boxH / 2;
        line(ax1, ay1, ax2, ay2);
        // Arrowhead
        fill(180);
        triangle(ax2, ay2, ax2 - 6, ay2 - 4, ax2 - 6, ay2 + 4);
      } else {
        // Wrap from end of row 1 to start of row 2
        let ax1 = bx + boxW / 2;
        let ay1 = by + boxH;
        let ax2 = nx + boxW / 2;
        let ay2 = ny;
        noFill();
        bezier(ax1, ay1, ax1, ay1 + 15, ax2, ay2 - 15, ax2, ay2);
        fill(180);
        noStroke();
        triangle(ax2, ay2, ax2 - 4, ay2 - 6, ax2 + 4, ay2 - 6);
      }
    }

    // Draw step box
    if (isActive) {
      fill(steps[i].color);
      stroke(0);
      strokeWeight(2);
    } else {
      fill(steps[i].color + 'CC');
      stroke(steps[i].color);
      strokeWeight(1);
    }
    rect(bx, by, boxW, boxH, 6);

    // Icon and label
    fill('white');
    noStroke();
    textAlign(CENTER, CENTER);
    textSize(18);
    text(steps[i].icon, bx + boxW / 2, by + 16);
    textSize(Math.min(12, boxW / 8));
    text(steps[i].name, bx + boxW / 2, by + 38);
  }

  // Info panel below the steps
  let panelY = row2Y + boxH + 12;
  let panelH = drawHeight - panelY - 5;

  if (activeStep >= 0 && activeStep < steps.length) {
    let s = steps[activeStep];

    // Description
    fill('black');
    noStroke();
    textAlign(LEFT, TOP);
    textSize(14);
    textWrap(WORD);
    text(s.desc, margin, panelY, canvasWidth * 0.5 - margin * 2);

    // Concept tags
    let tagX = margin;
    let tagY = panelY + 55;
    textSize(11);
    for (let tag of s.concepts) {
      let tw = textWidth(tag) + 12;
      fill(s.color + '40');
      stroke(s.color);
      strokeWeight(1);
      rect(tagX, tagY, tw, 20, 10);
      fill(s.color);
      noStroke();
      textAlign(CENTER, CENTER);
      text(tag, tagX + tw / 2, tagY + 10);
      tagX += tw + 5;
    }

    // Code snippet
    let codeX = canvasWidth * 0.52;
    let codeW = canvasWidth * 0.48 - margin;
    fill(40);
    noStroke();
    rect(codeX, panelY, codeW, panelH - 5, 4);
    fill('#00FF88');
    textAlign(LEFT, TOP);
    textSize(12);
    textFont('monospace');
    textWrap(WORD);
    text(s.code, codeX + 8, panelY + 8, codeW - 16);
    textFont('Arial');
  } else {
    fill(120);
    noStroke();
    textAlign(CENTER, CENTER);
    textSize(16);
    text('Hover over a step to see details, or click "Play Walkthrough"', canvasWidth / 2, panelY + panelH / 2);
  }
}

function toggleWalkthrough() {
  walkthroughActive = !walkthroughActive;
  if (walkthroughActive) {
    walkthroughStep = 0;
    walkthroughTimer = 0;
    walkthroughButton.html('Stop');
  } else {
    walkthroughStep = -1;
    walkthroughButton.html('Play Walkthrough');
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
