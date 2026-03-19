// Gestalt Principles Interactive Playground
// Demonstrates proximity, contrast, alignment, and repetition
// through a 4x4 grid of visual elements
// MicroSim template version 2026.03

// Canvas dimensions
let containerWidth;
let canvasWidth = 400;
let drawHeight = 400;
let controlHeight = 0; // controls are HTML DOM below canvas
let canvasHeight = drawHeight;
let containerHeight = canvasHeight;
let margin = 25;
let defaultTextSize = 14;

// Control variables - Proximity
let groupSpacingSlider;
let itemSpacingSlider;

// Control variables - Contrast
let emphasisSlider;
let highlightCheckbox;

// Control variables - Alignment
let snapGridCheckbox;
let misalignmentSlider;

// Control variables - Repetition
let consistentShapesCheckbox;
let consistentColorsCheckbox;

// Buttons
let resetButton;
let applyAllButton;

// Animation state
let animating = false;
let animStartTime = 0;
let animDuration = 2000; // 2 seconds

// Animation start/target values
let animFrom = {};
let animTo = {};

// Random offsets for misalignment (generated once, reused)
let offsets = [];

// Random shape assignments when not consistent
let randomShapes = [];
// Random color assignments when not consistent
let randomColors = [];

// Group colors
let groupColors = [
  [70, 130, 210],   // blue
  [220, 80, 60],    // red
  [50, 170, 90],    // green
  [200, 150, 40]    // gold
];

// Default parameter values
let defaults = {
  groupSpacing: 10,
  itemSpacing: 10,
  emphasis: 0,
  highlight: false,
  snapGrid: false,
  misalignment: 5,
  consistentShapes: false,
  consistentColors: false
};

function setup() {
  updateCanvasSize();
  const canvas = createCanvas(canvasWidth, canvasHeight);
  canvas.parent(document.querySelector('main'));

  // Generate random offsets for each of 16 elements
  for (let i = 0; i < 16; i++) {
    offsets.push({ x: random(-1, 1), y: random(-1, 1) });
    randomShapes.push(floor(random(4))); // 0-3: circle, square, triangle, diamond
    randomColors.push([
      floor(random(60, 220)),
      floor(random(60, 220)),
      floor(random(60, 220))
    ]);
  }

  // Build control area using HTML DOM elements
  buildControls();

  describe('Interactive Gestalt principles playground with 16 visual elements arranged in groups. Adjust proximity, contrast, alignment, and repetition controls to observe visual grouping effects.');
}

function buildControls() {
  let mainEl = document.querySelector('main');

  // Create control container div
  let controlDiv = document.createElement('div');
  controlDiv.id = 'gestalt-controls';
  controlDiv.style.cssText = 'background: white; border: 1px solid silver; padding: 10px; font-family: Arial, sans-serif; font-size: 14px; display: grid; grid-template-columns: 1fr 1fr; gap: 8px 20px;';
  mainEl.appendChild(controlDiv);

  // --- Proximity Section ---
  let proxSection = createSection(controlDiv, 'Proximity', '#4A90D9');

  groupSpacingSlider = createLabeledSlider(proxSection, 'Group Spacing', 0, 60, defaults.groupSpacing, 1, 'px');
  itemSpacingSlider = createLabeledSlider(proxSection, 'Item Spacing', 2, 30, defaults.itemSpacing, 1, 'px');

  // --- Contrast Section ---
  let contrastSection = createSection(controlDiv, 'Contrast', '#DC5038');

  emphasisSlider = createLabeledSlider(contrastSection, 'Emphasis Level', 0, 100, defaults.emphasis, 1, '');
  highlightCheckbox = createLabeledCheckbox(contrastSection, 'Highlight Active', defaults.highlight);

  // --- Alignment Section ---
  let alignSection = createSection(controlDiv, 'Alignment', '#32AA5A');

  snapGridCheckbox = createLabeledCheckbox(alignSection, 'Snap to Grid', defaults.snapGrid);
  misalignmentSlider = createLabeledSlider(alignSection, 'Misalignment', 0, 15, defaults.misalignment, 1, 'px');

  // --- Repetition Section ---
  let repSection = createSection(controlDiv, 'Repetition', '#C89628');

  consistentShapesCheckbox = createLabeledCheckbox(repSection, 'Consistent Shapes', defaults.consistentShapes);
  consistentColorsCheckbox = createLabeledCheckbox(repSection, 'Consistent Colors', defaults.consistentColors);

  // --- Buttons ---
  let buttonDiv = document.createElement('div');
  buttonDiv.style.cssText = 'grid-column: 1 / -1; display: flex; gap: 10px; justify-content: center; margin-top: 4px;';
  controlDiv.appendChild(buttonDiv);

  resetButton = document.createElement('button');
  resetButton.textContent = 'Reset All';
  resetButton.style.cssText = 'padding: 6px 18px; font-size: 14px; cursor: pointer; border: 1px solid silver; border-radius: 4px; background: #f0f0f0;';
  resetButton.addEventListener('click', resetAll);
  buttonDiv.appendChild(resetButton);

  applyAllButton = document.createElement('button');
  applyAllButton.textContent = 'Apply All Principles';
  applyAllButton.style.cssText = 'padding: 6px 18px; font-size: 14px; cursor: pointer; border: 1px solid #4A90D9; border-radius: 4px; background: #4A90D9; color: white; font-weight: bold;';
  applyAllButton.addEventListener('click', applyAllPrinciples);
  buttonDiv.appendChild(applyAllButton);
}

function createSection(parent, title, color) {
  let section = document.createElement('div');
  section.style.cssText = 'border: 1px solid ' + color + '; border-radius: 6px; padding: 8px; background: ' + color + '10;';

  let header = document.createElement('div');
  header.textContent = title;
  header.style.cssText = 'font-weight: bold; color: ' + color + '; margin-bottom: 6px; font-size: 14px;';
  section.appendChild(header);

  parent.appendChild(section);
  return section;
}

function createLabeledSlider(parent, labelText, minVal, maxVal, defaultVal, step, unit) {
  let row = document.createElement('div');
  row.style.cssText = 'display: flex; align-items: center; gap: 6px; margin-bottom: 4px;';

  let label = document.createElement('span');
  label.textContent = labelText + ':';
  label.style.cssText = 'min-width: 110px; font-size: 13px;';
  row.appendChild(label);

  let slider = document.createElement('input');
  slider.type = 'range';
  slider.min = minVal;
  slider.max = maxVal;
  slider.value = defaultVal;
  slider.step = step;
  slider.style.cssText = 'flex: 1; min-width: 60px;';
  row.appendChild(slider);

  let valueDisplay = document.createElement('span');
  valueDisplay.textContent = defaultVal + unit;
  valueDisplay.style.cssText = 'min-width: 36px; text-align: right; font-size: 13px; font-variant-numeric: tabular-nums;';
  row.appendChild(valueDisplay);

  slider.addEventListener('input', function() {
    valueDisplay.textContent = slider.value + unit;
  });

  parent.appendChild(row);

  // Return an object that mimics p5 slider API
  return {
    value: function() { return parseFloat(slider.value); },
    setValue: function(v) { slider.value = v; valueDisplay.textContent = v + unit; },
    _el: slider
  };
}

function createLabeledCheckbox(parent, labelText, defaultChecked) {
  let row = document.createElement('div');
  row.style.cssText = 'display: flex; align-items: center; gap: 6px; margin-bottom: 4px;';

  let cb = document.createElement('input');
  cb.type = 'checkbox';
  cb.checked = defaultChecked;
  cb.style.cssText = 'width: 16px; height: 16px;';
  row.appendChild(cb);

  let label = document.createElement('span');
  label.textContent = labelText;
  label.style.cssText = 'font-size: 13px; cursor: pointer;';
  label.addEventListener('click', function() { cb.checked = !cb.checked; });
  row.appendChild(label);

  parent.appendChild(row);

  return {
    checked: function() { return cb.checked; },
    setChecked: function(v) { cb.checked = v; },
    _el: cb
  };
}

function draw() {
  updateCanvasSize();

  // Handle animation
  if (animating) {
    let elapsed = millis() - animStartTime;
    let t = constrain(elapsed / animDuration, 0, 1);
    // Ease in-out
    t = t < 0.5 ? 2 * t * t : 1 - pow(-2 * t + 2, 2) / 2;

    groupSpacingSlider.setValue(round(lerp(animFrom.groupSpacing, animTo.groupSpacing, t)));
    itemSpacingSlider.setValue(round(lerp(animFrom.itemSpacing, animTo.itemSpacing, t)));
    emphasisSlider.setValue(round(lerp(animFrom.emphasis, animTo.emphasis, t)));
    misalignmentSlider.setValue(round(lerp(animFrom.misalignment, animTo.misalignment, t)));

    if (t >= 0.5) {
      highlightCheckbox.setChecked(animTo.highlight);
      snapGridCheckbox.setChecked(animTo.snapGrid);
      consistentShapesCheckbox.setChecked(animTo.consistentShapes);
      consistentColorsCheckbox.setChecked(animTo.consistentColors);
    }

    if (t >= 1) {
      animating = false;
    }
  }

  // Draw background regions
  fill('aliceblue');
  stroke('silver');
  strokeWeight(1);
  rect(0, 0, canvasWidth, drawHeight);

  // Title
  fill('black');
  noStroke();
  textAlign(CENTER, TOP);
  textSize(20);
  text('Gestalt Principles Playground', canvasWidth / 2, 10);

  // Read current parameter values
  let groupSpacing = groupSpacingSlider.value();
  let itemSpacing = itemSpacingSlider.value();
  let emphasis = emphasisSlider.value();
  let doHighlight = highlightCheckbox.checked();
  let doSnapGrid = snapGridCheckbox.checked();
  let misalign = misalignmentSlider.value();
  let doConsistentShapes = consistentShapesCheckbox.checked();
  let doConsistentColors = consistentColorsCheckbox.checked();

  // Layout constants
  let elementsPerGroup = 4; // 4 elements per group (2x2)
  let numGroups = 4;
  let titleReserve = 40; // space for title at top
  let bottomReserve = 24; // space for state indicator at bottom
  let sidePad = 30;

  // Available space for the grid
  let availWidth = canvasWidth - sidePad * 2;
  let availHeight = drawHeight - titleReserve - bottomReserve;

  // Scale element size to fill available space
  // Grid is 4 elements wide (2 groups x 2 items) with gaps
  // Grid is 4 elements tall (2 groups x 2 items) with gaps
  let totalGapsH = groupSpacing + itemSpacing * 2; // 1 between-group + 2 within-group
  let totalGapsV = groupSpacing + itemSpacing * 2;
  let labelReserve = 20; // space above each group row for labels

  let elementSizeW = (availWidth - totalGapsH) / 4;
  let elementSizeH = (availHeight - totalGapsV - labelReserve * 2) / 4;
  let elementSize = max(20, min(elementSizeW, elementSizeH));

  // Recalculate actual grid dimensions with computed element size
  let withinGroupGap = itemSpacing;
  let betweenGroupGap = groupSpacing;

  let groupWidth = elementSize * 2 + withinGroupGap;
  let groupHeight = elementSize * 2 + withinGroupGap;

  let totalWidth = groupWidth * 2 + betweenGroupGap;
  let totalHeight = groupHeight * 2 + betweenGroupGap + labelReserve * 2;

  // Center the grid in the available area
  let startX = (canvasWidth - totalWidth) / 2;
  let startY = titleReserve + (availHeight - totalHeight) / 2;

  // Group labels
  let groupLabels = ['Group A', 'Group B', 'Group C', 'Group D'];

  // Draw each group (2x2 arrangement of groups)
  for (let g = 0; g < numGroups; g++) {
    let groupRow = floor(g / 2);
    let groupCol = g % 2;

    let groupX = startX + groupCol * (groupWidth + betweenGroupGap);
    let groupY = startY + labelReserve + groupRow * (groupHeight + betweenGroupGap + labelReserve);

    // Draw group label if grouping is visible
    let groupingVisible = groupSpacing > 15 || doConsistentColors || doConsistentShapes;
    if (groupingVisible) {
      noStroke();
      fill(groupColors[g][0], groupColors[g][1], groupColors[g][2]);
      textAlign(CENTER, BOTTOM);
      textSize(14);
      text(groupLabels[g], groupX + groupWidth / 2, groupY - 3);
    }

    // Draw 4 elements in each group (2x2)
    for (let i = 0; i < elementsPerGroup; i++) {
      let elemRow = floor(i / 2);
      let elemCol = i % 2;
      let globalIndex = g * elementsPerGroup + i;

      // Base position
      let ex = groupX + elemCol * (elementSize + withinGroupGap);
      let ey = groupY + elemRow * (elementSize + withinGroupGap);

      // Alignment: apply misalignment offset if not snapped to grid
      if (!doSnapGrid) {
        ex += offsets[globalIndex].x * misalign;
        ey += offsets[globalIndex].y * misalign;
      }

      // Determine color
      let r, gr, b;
      if (doConsistentColors) {
        r = groupColors[g][0];
        gr = groupColors[g][1];
        b = groupColors[g][2];
      } else {
        r = randomColors[globalIndex][0];
        gr = randomColors[globalIndex][1];
        b = randomColors[globalIndex][2];
      }

      // Contrast: emphasis on group 0
      let alpha = 255;
      if (emphasis > 0) {
        if (g === 0) {
          // Make group 0 more saturated/vivid
          let boost = emphasis / 100;
          r = lerp(r, 30, boost * 0.3);
          gr = lerp(gr, 100, boost * 0.3);
          b = lerp(b, 220, boost);
        } else {
          // Dim other groups
          let dimFactor = emphasis / 100 * 0.6;
          r = lerp(r, 180, dimFactor);
          gr = lerp(gr, 180, dimFactor);
          b = lerp(b, 180, dimFactor);
        }
      }

      // Highlight toggle: brighten group 0, dim others more
      if (doHighlight) {
        if (g === 0) {
          alpha = 255;
          // Add bright outline
          stroke(30, 100, 220);
          strokeWeight(3);
        } else {
          alpha = 120;
          stroke('silver');
          strokeWeight(1);
        }
      } else {
        stroke('silver');
        strokeWeight(1);
      }

      fill(r, gr, b, alpha);

      // Determine shape
      let shapeType;
      if (doConsistentShapes) {
        shapeType = g; // Each group gets its own shape
      } else {
        shapeType = randomShapes[globalIndex];
      }

      // Draw shape
      let cx = ex + elementSize / 2;
      let cy = ey + elementSize / 2;
      let halfSize = elementSize / 2 - 2;

      switch (shapeType) {
        case 0: // Circle
          ellipse(cx, cy, halfSize * 2, halfSize * 2);
          break;
        case 1: // Square
          rectMode(CENTER);
          rect(cx, cy, halfSize * 1.8, halfSize * 1.8, 3);
          rectMode(CORNER);
          break;
        case 2: // Triangle
          triangle(
            cx, cy - halfSize,
            cx - halfSize, cy + halfSize * 0.8,
            cx + halfSize, cy + halfSize * 0.8
          );
          break;
        case 3: // Diamond
          quad(
            cx, cy - halfSize,
            cx + halfSize, cy,
            cx, cy + halfSize,
            cx - halfSize, cy
          );
          break;
      }
    }
  }

  // Draw state indicator
  let allApplied = groupSpacing >= 50 && itemSpacing <= 5 && emphasis >= 80 &&
                   doHighlight && doSnapGrid && misalign <= 1 &&
                   doConsistentShapes && doConsistentColors;
  let allDefault = groupSpacing === defaults.groupSpacing && itemSpacing === defaults.itemSpacing &&
                   emphasis === defaults.emphasis && !doHighlight && !doSnapGrid &&
                   misalign === defaults.misalignment && !doConsistentShapes && !doConsistentColors;

  noStroke();
  textAlign(LEFT, BOTTOM);
  textSize(14);
  if (allApplied) {
    fill(50, 170, 90);
    text('All principles applied', 10, drawHeight - 6);
  } else if (allDefault) {
    fill(150);
    text('Default state (no grouping)', 10, drawHeight - 6);
  } else {
    fill(100);
    text('Exploring...', 10, drawHeight - 6);
  }

  // No dynamic resize - iframe height is set statically in index.md
}

function resetAll() {
  groupSpacingSlider.setValue(defaults.groupSpacing);
  itemSpacingSlider.setValue(defaults.itemSpacing);
  emphasisSlider.setValue(defaults.emphasis);
  highlightCheckbox.setChecked(defaults.highlight);
  snapGridCheckbox.setChecked(defaults.snapGrid);
  misalignmentSlider.setValue(defaults.misalignment);
  consistentShapesCheckbox.setChecked(defaults.consistentShapes);
  consistentColorsCheckbox.setChecked(defaults.consistentColors);
}

function applyAllPrinciples() {
  // Record current state
  animFrom = {
    groupSpacing: groupSpacingSlider.value(),
    itemSpacing: itemSpacingSlider.value(),
    emphasis: emphasisSlider.value(),
    misalignment: misalignmentSlider.value(),
    highlight: highlightCheckbox.checked(),
    snapGrid: snapGridCheckbox.checked(),
    consistentShapes: consistentShapesCheckbox.checked(),
    consistentColors: consistentColorsCheckbox.checked()
  };

  // Target optimized state
  animTo = {
    groupSpacing: 50,
    itemSpacing: 4,
    emphasis: 85,
    misalignment: 0,
    highlight: true,
    snapGrid: true,
    consistentShapes: true,
    consistentColors: true
  };

  animStartTime = millis();
  animating = true;
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
