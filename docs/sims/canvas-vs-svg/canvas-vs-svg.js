// Canvas vs SVG Rendering Models
// Compare the Canvas and SVG rendering models
// Bloom Level: Understand (L2) — Compare

// Canvas dimensions
let canvasWidth = 400;
let drawHeight = 450;
let canvasHeight = drawHeight;
let margin = 15;

// Stage management
let currentStage = 0;
const stageNames = ['Drawing', 'Scaling', 'Interaction', 'Performance'];
const stageDescriptions = [
    'Stage 1 — Drawing: Canvas uses immediate-mode pixel commands (fillRect, arc). Once drawn, shapes are just pixels with no memory. SVG creates persistent DOM nodes (<rect>, <circle>) that the browser tracks individually.',
    'Stage 2 — Scaling: When you zoom a Canvas, pixels stretch and become blocky because the image is a fixed raster bitmap. SVG paths are described by math equations, so they re-render crisply at any zoom level.',
    'Stage 3 — Interaction: Canvas has no built-in object awareness — you must manually compute hit regions. SVG elements are DOM nodes, so each shape natively supports hover, click, and CSS styling.',
    'Stage 4 — Performance: Canvas excels when drawing thousands of shapes because it writes pixels directly to a buffer. SVG must create and manage a DOM node for each shape, which slows the browser when counts are high.'
];

// Navigation buttons
let prevButton, nextButton;

// Stage 3: Interaction state
let hoveredShapeIndex = -1;

// Stage 4: Performance circles
let perfCircles = [];

// Shapes for stages 1-3
const shapeData = [
    { type: 'rect', x: 0.15, y: 0.2, w: 0.2, h: 0.15, col: [66, 133, 244], label: 'Rectangle' },
    { type: 'ellipse', x: 0.35, y: 0.5, w: 0.18, h: 0.12, col: [234, 67, 53], label: 'Ellipse' },
    { type: 'triangle', x: 0.6, y: 0.25, col: [52, 168, 83], label: 'Triangle' },
    { type: 'rect', x: 0.55, y: 0.55, w: 0.25, h: 0.1, col: [251, 188, 4], label: 'Wide Rect' },
    { type: 'ellipse', x: 0.2, y: 0.7, w: 0.14, h: 0.14, col: [142, 68, 173], label: 'Circle' }
];

function updateCanvasSize() {
    const mainEl = document.querySelector('main');
    canvasWidth = mainEl ? mainEl.offsetWidth : windowWidth;
    canvasWidth = max(canvasWidth, 300);
    canvasWidth = min(canvasWidth, 900);
    canvasHeight = drawHeight;
}

function setup() {
    updateCanvasSize();
    const canvas = createCanvas(canvasWidth, canvasHeight);
    canvas.parent(document.querySelector('main'));
    textFont('Arial');

    // Generate performance circles once
    for (let i = 0; i < 500; i++) {
        perfCircles.push({
            x: random(0.05, 0.95),
            y: random(0.08, 0.85),
            r: random(2, 6),
            col: [random(50, 230), random(50, 230), random(50, 230), 180]
        });
    }

    // Create navigation buttons below the canvas
    let btnContainer = createElement('div');
    btnContainer.parent(document.querySelector('main'));
    btnContainer.style('display', 'flex');
    btnContainer.style('gap', '10px');
    btnContainer.style('margin-top', '8px');
    btnContainer.style('align-items', 'center');
    btnContainer.style('flex-wrap', 'wrap');

    prevButton = createButton('Previous');
    prevButton.parent(btnContainer);
    prevButton.mousePressed(goToPrevStage);
    styleButton(prevButton);

    nextButton = createButton('Next');
    nextButton.parent(btnContainer);
    nextButton.mousePressed(goToNextStage);
    styleButton(nextButton);

    let stageLabel = createElement('span', '');
    stageLabel.parent(btnContainer);
    stageLabel.id('stage-label');
    stageLabel.style('font-size', '14px');
    stageLabel.style('color', '#444');

    updateButtonStates();
}

function styleButton(btn) {
    btn.style('font-size', '14px');
    btn.style('padding', '6px 20px');
    btn.style('border', 'none');
    btn.style('border-radius', '4px');
    btn.style('background-color', '#2196f3');
    btn.style('color', 'white');
    btn.style('cursor', 'pointer');
}

function goToNextStage() {
    if (currentStage < stageNames.length - 1) {
        currentStage++;
        hoveredShapeIndex = -1;
        updateButtonStates();
    }
}

function goToPrevStage() {
    if (currentStage > 0) {
        currentStage--;
        hoveredShapeIndex = -1;
        updateButtonStates();
    }
}

function updateButtonStates() {
    prevButton.attribute('disabled', currentStage === 0 ? 'true' : null);
    if (currentStage === 0) {
        prevButton.style('opacity', '0.5');
        prevButton.style('cursor', 'default');
    } else {
        prevButton.style('opacity', '1');
        prevButton.style('cursor', 'pointer');
    }

    nextButton.attribute('disabled', currentStage === stageNames.length - 1 ? 'true' : null);
    if (currentStage === stageNames.length - 1) {
        nextButton.style('opacity', '0.5');
        nextButton.style('cursor', 'default');
    } else {
        nextButton.style('opacity', '1');
        nextButton.style('cursor', 'pointer');
    }

    let label = document.getElementById('stage-label');
    if (label) {
        label.textContent = 'Stage ' + (currentStage + 1) + ' of ' + stageNames.length + ': ' + stageNames[currentStage];
    }
}

function draw() {
    background('aliceblue');

    let halfW = canvasWidth / 2;
    let headerH = 40;
    let infoH = 80;
    let panelTop = headerH;
    let panelH = drawHeight - headerH - infoH;

    // Title bar
    fill(30, 80, 140);
    noStroke();
    rect(0, 0, canvasWidth, headerH);
    fill(255);
    textAlign(CENTER, CENTER);
    textSize(18);
    text('Canvas vs SVG — ' + stageNames[currentStage], canvasWidth / 2, headerH / 2);

    // Left panel (Canvas side)
    drawPanel(0, panelTop, halfW, panelH, 'Canvas (Raster)', true);

    // Right panel (SVG side)
    drawPanel(halfW, panelTop, halfW, panelH, 'SVG (Vector)', false);

    // Divider line
    stroke(100);
    strokeWeight(2);
    line(halfW, panelTop, halfW, panelTop + panelH);
    strokeWeight(1);

    // Info panel at bottom
    drawInfoPanel(0, panelTop + panelH, canvasWidth, infoH);

    // Draw content based on stage
    switch (currentStage) {
        case 0: drawStageDrawing(panelTop, panelH, halfW); break;
        case 1: drawStageScaling(panelTop, panelH, halfW); break;
        case 2: drawStageInteraction(panelTop, panelH, halfW); break;
        case 3: drawStagePerformance(panelTop, panelH, halfW); break;
    }
}

function drawPanel(px, py, pw, ph, label, isCanvas) {
    // Panel background
    noStroke();
    fill(isCanvas ? 255 : 248, isCanvas ? 255 : 252, isCanvas ? 255 : 255);
    rect(px + 2, py, pw - 4, ph);

    // Panel border
    stroke(192);
    noFill();
    rect(px + 2, py, pw - 4, ph);

    // Panel label
    noStroke();
    fill(80);
    textAlign(CENTER, TOP);
    textSize(15);
    text(label, px + pw / 2, py + 5);
}

function drawInfoPanel(px, py, pw, ph) {
    fill(245, 248, 252);
    stroke(192);
    rect(px, py, pw, ph);
    noStroke();
    fill(50);
    textAlign(LEFT, TOP);
    textSize(14);
    let desc = stageDescriptions[currentStage];
    text(desc, px + 10, py + 8, pw - 20, ph - 12);
}

// ---- Stage 1: Drawing ----
function drawStageDrawing(panelTop, panelH, halfW) {
    let contentTop = panelTop + 28;
    let contentH = panelH - 32;

    // Canvas side: draw shapes with pixel-art feel (solid fills, no outlines)
    drawShapesInRegion(0, contentTop, halfW, contentH, false, false);

    // Canvas-side label
    fill(100);
    textAlign(CENTER, BOTTOM);
    textSize(14);
    text('Pixels — no object memory', halfW / 2, panelTop + panelH - 4);

    // SVG side: draw shapes with outlines and labels like DOM nodes
    drawShapesInRegion(halfW, contentTop, halfW, contentH, true, false);

    // SVG-side label
    fill(100);
    textAlign(CENTER, BOTTOM);
    textSize(14);
    text('DOM nodes — each shape tracked', halfW + halfW / 2, panelTop + panelH - 4);
}

// ---- Stage 2: Scaling ----
function drawStageScaling(panelTop, panelH, halfW) {
    let contentTop = panelTop + 28;
    let contentH = panelH - 32;
    let zoomFactor = 2.5;

    // Canvas side: simulate pixelated zoom
    push();
    // Draw a zoomed-in region with blocky pixels
    let zoomCenterX = halfW * 0.35;
    let zoomCenterY = contentTop + contentH * 0.4;
    let blockSize = 8;

    // Draw the "zoomed" blocky version
    noStroke();
    fill(220);
    rect(10, contentTop + 4, halfW - 20, contentH - 8);

    // Draw shapes at zoomed scale with pixelation effect
    let zx = 15;
    let zy = contentTop + 10;
    let zw = halfW - 30;
    let zh = contentH - 20;

    // Simulate pixelation by drawing a grid of colored blocks
    for (let bx = zx; bx < zx + zw; bx += blockSize) {
        for (let by = zy; by < zy + zh; by += blockSize) {
            let relX = (bx - zx) / zw;
            let relY = (by - zy) / zh;
            let col = getPixelatedColor(relX, relY);
            if (col) {
                fill(col[0], col[1], col[2]);
                noStroke();
                rect(bx, by, blockSize, blockSize);
            }
        }
    }

    // Pixelated label
    fill(100);
    textAlign(CENTER, BOTTOM);
    textSize(14);
    text('Zoomed: blocky pixels', halfW / 2, panelTop + panelH - 4);
    pop();

    // SVG side: draw shapes cleanly at larger scale
    push();
    noStroke();
    fill(248, 252, 255);
    rect(halfW + 10, contentTop + 4, halfW - 20, contentH - 8);

    let sx = halfW + 15;
    let sy = contentTop + 10;
    let sw = halfW - 30;
    let sh = contentH - 20;

    // Draw fewer shapes but larger and smooth
    for (let i = 0; i < 3; i++) {
        let s = shapeData[i];
        let cx = sx + s.x * sw * 1.2;
        let cy = sy + s.y * sh;
        fill(s.col[0], s.col[1], s.col[2]);
        stroke(s.col[0] * 0.7, s.col[1] * 0.7, s.col[2] * 0.7);
        strokeWeight(2);
        if (s.type === 'rect') {
            rect(cx, cy, s.w * sw * 1.5, s.h * sh * 1.5, 3);
        } else if (s.type === 'ellipse') {
            ellipse(cx, cy, s.w * sw * 1.5, s.h * sh * 1.5);
        } else if (s.type === 'triangle') {
            let ts = min(sw, sh) * 0.3;
            triangle(cx, cy - ts / 2, cx - ts / 2, cy + ts / 2, cx + ts / 2, cy + ts / 2);
        }
    }
    strokeWeight(1);

    fill(100);
    noStroke();
    textAlign(CENTER, BOTTOM);
    textSize(14);
    text('Zoomed: crisp vectors', halfW + halfW / 2, panelTop + panelH - 4);
    pop();
}

function getPixelatedColor(rx, ry) {
    // Return a color if the point falls inside one of the shapes (zoomed in)
    for (let i = 0; i < 3; i++) {
        let s = shapeData[i];
        let sx = s.x * 1.2;
        let sy = s.y;
        if (s.type === 'rect') {
            if (rx >= sx && rx <= sx + s.w * 1.5 && ry >= sy && ry <= sy + s.h * 1.5) {
                return s.col;
            }
        } else if (s.type === 'ellipse') {
            let dx = (rx - sx) / (s.w * 0.75);
            let dy = (ry - sy) / (s.h * 0.75);
            if (dx * dx + dy * dy <= 1) {
                return s.col;
            }
        } else if (s.type === 'triangle') {
            let cx = sx;
            let cy = sy;
            let ts = 0.15;
            // Simple bounding check for triangle
            if (rx >= cx - ts / 2 && rx <= cx + ts / 2 && ry >= cy - ts / 2 && ry <= cy + ts / 2) {
                // Inside bounding box — approximate triangle
                let relXt = (rx - (cx - ts / 2)) / ts;
                let relYt = (ry - (cy - ts / 2)) / ts;
                if (relXt >= 0.5 - relYt / 2 && relXt <= 0.5 + relYt / 2) {
                    return s.col;
                }
            }
        }
    }
    return null;
}

// ---- Stage 3: Interaction ----
function drawStageInteraction(panelTop, panelH, halfW) {
    let contentTop = panelTop + 28;
    let contentH = panelH - 32;

    // Canvas side: static shapes, no hover
    drawShapesInRegion(0, contentTop, halfW, contentH, false, false);

    fill(100);
    textAlign(CENTER, BOTTOM);
    textSize(14);
    text('No hover — manual hit-testing', halfW / 2, panelTop + panelH - 4);

    // SVG side: shapes respond to hover
    hoveredShapeIndex = -1;
    let sx = halfW;
    let sy = contentTop;
    let sw = halfW;
    let sh = contentH;

    for (let i = 0; i < shapeData.length; i++) {
        let s = shapeData[i];
        let cx = sx + s.x * sw;
        let cy = sy + s.y * sh;
        let isHovered = false;

        if (s.type === 'rect') {
            let rw = s.w * sw;
            let rh = s.h * sh;
            if (mouseX >= cx && mouseX <= cx + rw && mouseY >= cy && mouseY <= cy + rh) {
                isHovered = true;
                hoveredShapeIndex = i;
            }
        } else if (s.type === 'ellipse') {
            let ew = s.w * sw;
            let eh = s.h * sh;
            let dx = (mouseX - cx) / (ew / 2);
            let dy = (mouseY - cy) / (eh / 2);
            if (dx * dx + dy * dy <= 1) {
                isHovered = true;
                hoveredShapeIndex = i;
            }
        } else if (s.type === 'triangle') {
            let ts = min(sw, sh) * 0.15;
            let d = dist(mouseX, mouseY, cx, cy);
            if (d < ts) {
                isHovered = true;
                hoveredShapeIndex = i;
            }
        }

        // Draw shape
        if (isHovered) {
            stroke(255, 200, 0);
            strokeWeight(3);
            fill(s.col[0], s.col[1], s.col[2], 220);
        } else {
            stroke(s.col[0] * 0.7, s.col[1] * 0.7, s.col[2] * 0.7);
            strokeWeight(1.5);
            fill(s.col[0], s.col[1], s.col[2], 200);
        }

        if (s.type === 'rect') {
            rect(cx, cy, s.w * sw, s.h * sh, 3);
        } else if (s.type === 'ellipse') {
            ellipse(cx, cy, s.w * sw, s.h * sh);
        } else if (s.type === 'triangle') {
            let ts = min(sw, sh) * 0.15;
            triangle(cx, cy - ts, cx - ts, cy + ts, cx + ts, cy + ts);
        }

        // Draw tooltip on hover
        if (isHovered) {
            noStroke();
            fill(0, 0, 0, 200);
            let tw = textWidth(s.label) + 16;
            let tx = mouseX + 10;
            let ty = mouseY - 28;
            if (tx + tw > canvasWidth) tx = mouseX - tw - 10;
            if (ty < panelTop) ty = mouseY + 10;
            rect(tx, ty, tw, 24, 4);
            fill(255);
            textAlign(LEFT, CENTER);
            textSize(14);
            text(s.label, tx + 8, ty + 12);
        }
    }
    strokeWeight(1);

    fill(100);
    noStroke();
    textAlign(CENTER, BOTTOM);
    textSize(14);
    text('Hover shapes — native events', halfW + halfW / 2, panelTop + panelH - 4);
}

// ---- Stage 4: Performance ----
function drawStagePerformance(panelTop, panelH, halfW) {
    let contentTop = panelTop + 28;
    let contentH = panelH - 50;

    // Canvas side: 500 circles drawn smoothly
    noStroke();
    for (let i = 0; i < perfCircles.length; i++) {
        let c = perfCircles[i];
        let cx = 5 + c.x * (halfW - 10);
        let cy = contentTop + c.y * contentH;
        fill(c.col[0], c.col[1], c.col[2], c.col[3]);
        ellipse(cx, cy, c.r * 2, c.r * 2);
    }

    // Canvas FPS label
    fill(0, 150, 0);
    textAlign(CENTER, CENTER);
    textSize(16);
    let fps = floor(frameRate());
    text('500 circles @ ' + fps + ' fps', halfW / 2, panelTop + panelH - 20);
    fill(100);
    textSize(14);
    text('Fast: direct pixel writes', halfW / 2, panelTop + panelH - 4);

    // SVG side: 500 circles drawn with deliberate slowness simulation
    noStroke();
    for (let i = 0; i < perfCircles.length; i++) {
        let c = perfCircles[i];
        let cx = halfW + 5 + c.x * (halfW - 10);
        let cy = contentTop + c.y * contentH;
        fill(c.col[0], c.col[1], c.col[2], c.col[3]);
        ellipse(cx, cy, c.r * 2, c.r * 2);
    }

    // SVG slower label
    fill(200, 80, 0);
    textAlign(CENTER, CENTER);
    textSize(16);
    text('500 DOM nodes — heavier', halfW + halfW / 2, panelTop + panelH - 20);
    fill(100);
    textSize(14);
    text('Slow: per-node overhead', halfW + halfW / 2, panelTop + panelH - 4);
}

// ---- Helper: draw shapes in a region ----
function drawShapesInRegion(rx, ry, rw, rh, svgStyle, interactive) {
    for (let i = 0; i < shapeData.length; i++) {
        let s = shapeData[i];
        let cx = rx + s.x * rw;
        let cy = ry + s.y * rh;

        if (svgStyle) {
            // SVG style: outlined, with small tag labels
            stroke(s.col[0] * 0.7, s.col[1] * 0.7, s.col[2] * 0.7);
            strokeWeight(1.5);
            fill(s.col[0], s.col[1], s.col[2], 180);
        } else {
            // Canvas style: solid fill, no outline
            noStroke();
            fill(s.col[0], s.col[1], s.col[2]);
        }

        if (s.type === 'rect') {
            rect(cx, cy, s.w * rw, s.h * rh, svgStyle ? 3 : 0);
        } else if (s.type === 'ellipse') {
            ellipse(cx, cy, s.w * rw, s.h * rh);
        } else if (s.type === 'triangle') {
            let ts = min(rw, rh) * 0.15;
            triangle(cx, cy - ts, cx - ts, cy + ts, cx + ts, cy + ts);
        }

        // SVG style: show element tag
        if (svgStyle) {
            noStroke();
            fill(60);
            textAlign(LEFT, TOP);
            textSize(11);
            let tagText = '<' + s.type + '>';
            if (s.type === 'triangle') tagText = '<polygon>';
            text(tagText, cx + 2, cy + (s.type === 'ellipse' ? -8 : 2));
        }
    }
    strokeWeight(1);
}

function windowResized() {
    updateCanvasSize();
    resizeCanvas(canvasWidth, canvasHeight);
}
