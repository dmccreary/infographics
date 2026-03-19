// JavaScript Modern Syntax Playground MicroSim
// Before/after code comparison for modern JS features
// Bloom Level: Apply (L3) — interactive code exploration

let containerWidth;
let canvasWidth = 400;
let drawHeight = 380;
let controlHeight = 70;
let canvasHeight = drawHeight + controlHeight;
let containerHeight = canvasHeight;
let margin = 15;

const features = [
  {
    name: "Arrow Functions",
    traditional: [
      "// Traditional function",
      "const regions = data.map(",
      "  function(item) {",
      "    return {",
      "      x: item.x,",
      "      label: item.name",
      "    };",
      "  }",
      ");"
    ],
    modern: [
      "// Arrow function",
      "const regions = data.map(",
      "  item => ({",
      "    x: item.x,",
      "    label: item.name",
      "  })",
      ");"
    ],
    output: "regions → [{x:10, label:'Header'}, {x:50, label:'Body'}]",
    saved: 35
  },
  {
    name: "Template Literals",
    traditional: [
      "// String concatenation",
      "const tooltip =",
      "  'Region: ' + name +",
      "  '\\nValue: ' + value +",
      "  '\\nColor: ' + color;"
    ],
    modern: [
      "// Template literal",
      "const tooltip =",
      "  `Region: ${name}",
      "  Value: ${value}",
      "  Color: ${color}`;"
    ],
    output: "tooltip → 'Region: Header\\nValue: 42\\nColor: #4285F4'",
    saved: 18
  },
  {
    name: "Destructuring",
    traditional: [
      "// Multiple property access",
      "const x = config.x;",
      "const y = config.y;",
      "const w = config.width;",
      "const h = config.height;",
      "const label = config.label;"
    ],
    modern: [
      "// Destructured assignment",
      "const {",
      "  x, y,",
      "  width: w,",
      "  height: h,",
      "  label",
      "} = config;"
    ],
    output: "x=10, y=20, w=100, h=50, label='Header'",
    saved: 42
  },
  {
    name: "Spread Operator",
    traditional: [
      "// Object.assign / concat",
      "const defaults = {",
      "  color: 'blue', size: 16",
      "};",
      "const merged =",
      "  Object.assign({},",
      "    defaults, custom);",
      "const all = arr1.concat(arr2);"
    ],
    modern: [
      "// Spread operator",
      "const defaults = {",
      "  color: 'blue', size: 16",
      "};",
      "const merged = {",
      "  ...defaults, ...custom",
      "};",
      "const all = [...arr1, ...arr2];"
    ],
    output: "merged → {color:'red', size:16, bold:true}",
    saved: 22
  },
  {
    name: "Array Methods",
    traditional: [
      "// For-loop with push",
      "const visible = [];",
      "for (var i = 0;",
      "     i < regions.length;",
      "     i++) {",
      "  if (regions[i].active) {",
      "    visible.push(",
      "      regions[i].label);",
      "  }",
      "}"
    ],
    modern: [
      "// Filter + map chain",
      "const visible = regions",
      "  .filter(r => r.active)",
      "  .map(r => r.label);"
    ],
    output: "visible → ['Header', 'Navigation', 'Footer']",
    saved: 65
  },
  {
    name: "Default Parameters",
    traditional: [
      "// Manual default checks",
      "function drawRegion(",
      "  x, y, w, h, color) {",
      "  if (!color) {",
      "    color = 'blue';",
      "  }",
      "  if (!w) w = 100;",
      "  if (!h) h = 50;",
      "  // draw...",
      "}"
    ],
    modern: [
      "// Default parameter syntax",
      "function drawRegion(",
      "  x, y,",
      "  w = 100,",
      "  h = 50,",
      "  color = 'blue') {",
      "  // draw...",
      "}"
    ],
    output: "drawRegion(10, 20) → uses w=100, h=50, color='blue'",
    saved: 48
  }
];

let currentFeature = 0;
let featureSelect, nextButton;

function setup() {
  updateCanvasSize();
  const canvas = createCanvas(containerWidth, containerHeight);
  canvas.parent(document.querySelector('main'));

  featureSelect = createSelect();
  featureSelect.position(10, drawHeight + 12);
  for (let f of features) {
    featureSelect.option(f.name);
  }
  featureSelect.changed(() => {
    currentFeature = features.findIndex(f => f.name === featureSelect.value());
  });

  nextButton = createButton('Next Feature →');
  nextButton.position(200, drawHeight + 12);
  nextButton.mousePressed(() => {
    currentFeature = (currentFeature + 1) % features.length;
    featureSelect.selected(features[currentFeature].name);
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
  textSize(18);
  text('JavaScript Modern Syntax Playground', canvasWidth / 2, 6);

  let f = features[currentFeature];
  let halfW = (canvasWidth - margin * 3) / 2;
  let panelTop = 32;
  let codeTop = panelTop + 24;
  let lineH = 18;

  // Traditional panel header
  fill('#FFEBEE');
  stroke('#E57373');
  strokeWeight(1);
  rect(margin, panelTop, halfW, 22, 4, 4, 0, 0);
  fill('#C62828');
  noStroke();
  textAlign(CENTER, CENTER);
  textSize(13);
  text('Traditional JS', margin + halfW / 2, panelTop + 11);

  // Traditional code area
  fill('#FFF8F8');
  stroke('#E0E0E0');
  strokeWeight(1);
  let tradH = f.traditional.length * lineH + 10;
  rect(margin, codeTop, halfW, tradH, 0, 0, 4, 4);

  fill('#333');
  textAlign(LEFT, TOP);
  textSize(12);
  textFont('monospace');
  for (let i = 0; i < f.traditional.length; i++) {
    let line = f.traditional[i];
    if (line.startsWith('//')) fill('#999');
    else fill('#333');
    text(line, margin + 8, codeTop + 5 + i * lineH);
  }

  // Modern panel header
  let modX = margin * 2 + halfW;
  fill('#E8F5E9');
  stroke('#81C784');
  strokeWeight(1);
  rect(modX, panelTop, halfW, 22, 4, 4, 0, 0);
  fill('#2E7D32');
  noStroke();
  textAlign(CENTER, CENTER);
  textSize(13);
  text('Modern JS', modX + halfW / 2, panelTop + 11);

  // Modern code area
  fill('#F8FFF8');
  stroke('#E0E0E0');
  strokeWeight(1);
  let modH = f.modern.length * lineH + 10;
  rect(modX, codeTop, halfW, modH, 0, 0, 4, 4);

  fill('#333');
  textAlign(LEFT, TOP);
  textSize(12);
  for (let i = 0; i < f.modern.length; i++) {
    let line = f.modern[i];
    if (line.startsWith('//')) fill('#999');
    else fill('#1B5E20');
    text(line, modX + 8, codeTop + 5 + i * lineH);
  }

  textFont('Arial');

  // Output area
  let outY = codeTop + Math.max(tradH, modH) + 15;
  fill('#F5F5F5');
  stroke('#BDBDBD');
  strokeWeight(1);
  rect(margin, outY, canvasWidth - margin * 2, 40, 4);

  fill('#333');
  noStroke();
  textAlign(LEFT, CENTER);
  textSize(13);
  textFont('monospace');
  text('Output: ' + f.output, margin + 10, outY + 20);
  textFont('Arial');

  // Characters saved badge
  let badgeY = outY + 52;
  fill('#4CAF50');
  noStroke();
  let badgeW = 200;
  rect(canvasWidth / 2 - badgeW / 2, badgeY, badgeW, 28, 14);
  fill('white');
  textAlign(CENTER, CENTER);
  textSize(14);
  text('✓ ' + f.saved + ' characters saved', canvasWidth / 2, badgeY + 14);

  // Green checkmark for identical output
  let checkY = outY + 52;
  fill('#4CAF50');
  textAlign(LEFT, CENTER);
  textSize(12);

  // Control area label
  fill('black');
  noStroke();
  textAlign(LEFT, CENTER);
  textSize(14);
  text('Feature ' + (currentFeature + 1) + ' of ' + features.length, 10, drawHeight + 50);
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
