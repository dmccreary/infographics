// Structural Format Gallery
// Compare five structural formats for interactive infographics
// Bloom Level: Understand (L2) — Compare

// Canvas dimensions
let canvasWidth = 400;
let drawHeight = 400;
let controlHeight = 120;
let canvasHeight = drawHeight + controlHeight;
let margin = 12;
let defaultTextSize = 16;

// State
let selectedFormat = -1;
let hoveredFormat = -1;

// Format definitions
const formats = [
    {
        name: 'Linear',
        color: [66, 133, 244],
        lightColor: [200, 220, 255],
        description: 'A linear format arranges information in a sequential path from start to finish. Elements flow in one direction, guiding the reader through a fixed order.',
        bestUse: 'Timelines, step-by-step processes, workflows, historical sequences, and any content with a natural chronological or logical progression.',
        example: 'A timeline showing the evolution of web technologies from HTML1 to HTML5.'
    },
    {
        name: 'Hierarchical',
        color: [251, 140, 0],
        lightColor: [255, 228, 180],
        description: 'A hierarchical format organizes information in a tree structure with parent-child relationships. Each level represents a different tier of detail or authority.',
        bestUse: 'Organizational charts, taxonomies, classification systems, decision trees, and any content with clear levels of nesting.',
        example: 'A taxonomy tree classifying interactive infographic types by purpose, format, and audience.'
    },
    {
        name: 'Comparative',
        color: [52, 168, 83],
        lightColor: [200, 240, 210],
        description: 'A comparative format places two or more items side by side with aligned attributes, making similarities and differences immediately visible.',
        bestUse: 'Product comparisons, before/after analyses, pros and cons lists, feature matrices, and any content requiring direct attribute-by-attribute evaluation.',
        example: 'A side-by-side comparison of static vs. interactive infographics across six dimensions.'
    },
    {
        name: 'Circular',
        color: [142, 68, 173],
        lightColor: [225, 200, 240],
        description: 'A circular format arranges elements in a loop, emphasizing cycles, feedback, and continuous processes where the end connects back to the beginning.',
        bestUse: 'Life cycles, feedback loops, iterative processes, seasonal patterns, and any content where steps repeat or connect cyclically.',
        example: 'The design-build-test-deploy cycle of interactive infographic development.'
    },
    {
        name: 'Radial',
        color: [0, 137, 123],
        lightColor: [180, 230, 225],
        description: 'A radial format places a central concept at the hub with related ideas radiating outward like spokes. It emphasizes a core idea and its connections.',
        bestUse: 'Mind maps, concept webs, stakeholder diagrams, feature overviews centered on a product or idea, and any content with a clear focal point.',
        example: 'A concept map with "Interactive Infographics" at the center and branches to tools, techniques, audiences, and formats.'
    }
];

function setup() {
    updateCanvasSize();
    const canvas = createCanvas(canvasWidth, canvasHeight);
    canvas.parent(document.querySelector('main'));
    textFont('Arial');
    describe('Five miniature diagrams showing linear, hierarchical, comparative, circular, and radial structural formats. Click any thumbnail to see its description and best use cases.', LABEL);
}

function draw() {
    updateCanvasSize();

    // Drawing area
    fill('aliceblue');
    stroke('silver');
    strokeWeight(1);
    rect(0, 0, canvasWidth, drawHeight);

    // Control area
    fill('white');
    stroke('silver');
    rect(0, drawHeight, canvasWidth, controlHeight);

    // Title
    noStroke();
    fill(0);
    textSize(16);
    textAlign(CENTER, TOP);
    text('Structural Format Gallery', canvasWidth / 2, 8);

    // Detect hover
    detectHover();

    // Draw thumbnails
    let thumbSize = Math.min(120, (canvasWidth - margin * 2 - 8 * 4) / 5);
    let thumbY = 38;
    let totalWidth = thumbSize * 5 + 8 * 4;
    let startX = (canvasWidth - totalWidth) / 2;

    for (let i = 0; i < 5; i++) {
        let tx = startX + i * (thumbSize + 8);
        drawThumbnail(i, tx, thumbY, thumbSize);
    }

    // Draw detail panel below thumbnails
    let detailY = thumbY + thumbSize + 16;
    let detailH = drawHeight - detailY - 8;
    drawDetailPanel(margin + 4, detailY, canvasWidth - margin * 2 - 8, detailH);

    // Draw infobox in control area
    drawInfobox();
}

function drawThumbnail(index, x, y, size) {
    let fmt = formats[index];
    let isSelected = selectedFormat === index;
    let isHovered = hoveredFormat === index;

    // Background
    fill(255);
    if (isSelected) {
        stroke(fmt.color);
        strokeWeight(3);
    } else if (isHovered) {
        stroke(fmt.color[0], fmt.color[1], fmt.color[2], 180);
        strokeWeight(2);
    } else {
        stroke(180);
        strokeWeight(1);
    }
    rect(x, y, size, size, 6);

    // Draw miniature diagram
    push();
    translate(x, y);
    let s = size;

    if (index === 0) drawLinearThumb(s);
    if (index === 1) drawHierarchicalThumb(s);
    if (index === 2) drawComparativeThumb(s);
    if (index === 3) drawCircularThumb(s);
    if (index === 4) drawRadialThumb(s);
    pop();

    // Label below thumbnail
    noStroke();
    fill(isSelected ? fmt.color : [80, 80, 80]);
    textSize(Math.min(11, size * 0.1));
    textAlign(CENTER, TOP);
    textStyle(isSelected ? BOLD : NORMAL);
    text(fmt.name, x + size / 2, y + size + 2);
    textStyle(NORMAL);
}

function drawLinearThumb(s) {
    let boxW = s * 0.15;
    let boxH = s * 0.12;
    let gap = s * 0.06;
    let labels = ['A', 'B', 'C', 'D'];
    let totalW = labels.length * boxW + (labels.length - 1) * gap;
    let startX = (s - totalW) / 2;
    let cy = s * 0.45;

    for (let i = 0; i < labels.length; i++) {
        let bx = startX + i * (boxW + gap);

        // Arrow between boxes
        if (i > 0) {
            stroke(66, 133, 244);
            strokeWeight(1.5);
            let ax1 = bx - gap + 1;
            let ax2 = bx - 1;
            line(ax1, cy, ax2, cy);
            // Arrowhead
            line(ax2, cy, ax2 - 3, cy - 3);
            line(ax2, cy, ax2 - 3, cy + 3);
        }

        // Box
        fill(200, 220, 255);
        stroke(66, 133, 244);
        strokeWeight(1.5);
        rect(bx, cy - boxH / 2, boxW, boxH, 2);

        // Label
        noStroke();
        fill(40);
        textSize(s * 0.08);
        textAlign(CENTER, CENTER);
        text(labels[i], bx + boxW / 2, cy);
    }
}

function drawHierarchicalThumb(s) {
    let nodeR = s * 0.06;
    let cx = s / 2;
    // Root
    let rootY = s * 0.22;
    // Level 1
    let l1Y = s * 0.45;
    let l1Xs = [cx - s * 0.22, cx + s * 0.22];
    // Level 2
    let l2Y = s * 0.68;
    let l2Xs = [cx - s * 0.32, cx - s * 0.12, cx + s * 0.12, cx + s * 0.32];

    // Edges
    stroke(251, 140, 0);
    strokeWeight(1.2);
    for (let x of l1Xs) line(cx, rootY, x, l1Y);
    line(l1Xs[0], l1Y, l2Xs[0], l2Y);
    line(l1Xs[0], l1Y, l2Xs[1], l2Y);
    line(l1Xs[1], l1Y, l2Xs[2], l2Y);
    line(l1Xs[1], l1Y, l2Xs[3], l2Y);

    // Nodes
    noStroke();
    fill(251, 140, 0);
    ellipse(cx, rootY, nodeR * 2.5, nodeR * 2.5);
    fill(255, 200, 120);
    for (let x of l1Xs) ellipse(x, l1Y, nodeR * 2, nodeR * 2);
    fill(255, 228, 180);
    for (let x of l2Xs) ellipse(x, l2Y, nodeR * 1.6, nodeR * 1.6);
}

function drawComparativeThumb(s) {
    let colW = s * 0.32;
    let rowH = s * 0.1;
    let gap = s * 0.06;
    let startY = s * 0.2;
    let leftX = s * 0.12;
    let rightX = s - leftX - colW;

    // Headers
    fill(52, 168, 83);
    noStroke();
    rect(leftX, startY, colW, rowH, 2);
    rect(rightX, startY, colW, rowH, 2);

    fill(255);
    textSize(s * 0.065);
    textAlign(CENTER, CENTER);
    text('A', leftX + colW / 2, startY + rowH / 2);
    text('B', rightX + colW / 2, startY + rowH / 2);

    // Rows
    for (let r = 0; r < 4; r++) {
        let ry = startY + rowH + gap + r * (rowH + gap * 0.5);
        fill(200, 240, 210);
        stroke(52, 168, 83, 80);
        strokeWeight(0.5);
        rect(leftX, ry, colW, rowH, 2);
        rect(rightX, ry, colW, rowH, 2);
    }
}

function drawCircularThumb(s) {
    let cx = s / 2;
    let cy = s * 0.47;
    let r = s * 0.22;
    let nodeR = s * 0.055;
    let positions = [];

    for (let i = 0; i < 4; i++) {
        let angle = -HALF_PI + i * HALF_PI;
        positions.push({ x: cx + cos(angle) * r, y: cy + sin(angle) * r });
    }

    // Curved arrows between nodes
    stroke(142, 68, 173);
    strokeWeight(1.2);
    noFill();
    for (let i = 0; i < 4; i++) {
        let from = positions[i];
        let to = positions[(i + 1) % 4];
        let mx = (from.x + to.x) / 2 + (cy - (from.y + to.y) / 2) * 0.3;
        let my = (from.y + to.y) / 2 + ((from.x + to.x) / 2 - cx) * 0.3;
        // Simple line with arrowhead
        line(from.x, from.y, to.x, to.y);
    }

    // Arrowheads (clockwise)
    for (let i = 0; i < 4; i++) {
        let from = positions[i];
        let to = positions[(i + 1) % 4];
        let angle = atan2(to.y - from.y, to.x - from.x);
        let tipX = to.x - cos(angle) * nodeR;
        let tipY = to.y - sin(angle) * nodeR;
        line(tipX, tipY, tipX - cos(angle - 0.4) * 5, tipY - sin(angle - 0.4) * 5);
        line(tipX, tipY, tipX - cos(angle + 0.4) * 5, tipY - sin(angle + 0.4) * 5);
    }

    // Nodes
    noStroke();
    for (let i = 0; i < 4; i++) {
        fill(225, 200, 240);
        stroke(142, 68, 173);
        strokeWeight(1.2);
        ellipse(positions[i].x, positions[i].y, nodeR * 2, nodeR * 2);
    }
}

function drawRadialThumb(s) {
    let cx = s / 2;
    let cy = s * 0.47;
    let r = s * 0.27;
    let nodeR = s * 0.045;

    // Spokes
    stroke(0, 137, 123);
    strokeWeight(1.2);
    for (let i = 0; i < 5; i++) {
        let angle = -HALF_PI + i * (TWO_PI / 5);
        let ex = cx + cos(angle) * r;
        let ey = cy + sin(angle) * r;
        line(cx, cy, ex, ey);

        // Outer node
        fill(180, 230, 225);
        stroke(0, 137, 123);
        strokeWeight(1.2);
        ellipse(ex, ey, nodeR * 2, nodeR * 2);
    }

    // Center node
    fill(0, 137, 123);
    noStroke();
    ellipse(cx, cy, nodeR * 3, nodeR * 3);
}

function drawDetailPanel(x, y, w, h) {
    if (selectedFormat === -1) {
        // Default instruction
        noStroke();
        fill(140);
        textSize(13);
        textAlign(CENTER, CENTER);
        text('Click a format above to learn more about it.', x + w / 2, y + h / 2);
        return;
    }

    let fmt = formats[selectedFormat];
    let py = y + 4;
    let lineH = 15;
    let textW = w - 12;

    // Format name
    noStroke();
    fill(fmt.color);
    textSize(15);
    textAlign(LEFT, TOP);
    textStyle(BOLD);
    text(fmt.name + ' Format', x + 6, py);
    textStyle(NORMAL);
    py += 22;

    // Description
    fill(50);
    textSize(11);
    textAlign(LEFT, TOP);
    text(fmt.description, x + 6, py, textW, 60);
    py += 48;

    // Best use
    fill(fmt.color);
    textSize(11);
    textStyle(BOLD);
    text('Best for:', x + 6, py);
    textStyle(NORMAL);
    py += 15;
    fill(70);
    text(fmt.bestUse, x + 6, py, textW, 60);
    py += 48;

    // Example
    fill(fmt.color);
    textSize(11);
    textStyle(BOLD);
    text('Example:', x + 6, py);
    textStyle(NORMAL);
    py += 15;
    fill(100);
    textStyle(ITALIC);
    text(fmt.example, x + 6, py, textW, 40);
    textStyle(NORMAL);
}

function drawInfobox() {
    noStroke();
    fill(120);
    textSize(11);
    textAlign(CENTER, TOP);
    text('Each format shapes how readers navigate information.', canvasWidth / 2, drawHeight + 8);
    text('The right choice depends on the data structure and the story you want to tell.', canvasWidth / 2, drawHeight + 22);

    if (selectedFormat !== -1) {
        let fmt = formats[selectedFormat];
        fill(fmt.color);
        textSize(12);
        textStyle(BOLD);
        text('Selected: ' + fmt.name, canvasWidth / 2, drawHeight + 46);
        textStyle(NORMAL);
        fill(100);
        textSize(11);
        text('Click the thumbnail again to deselect, or click another format.', canvasWidth / 2, drawHeight + 64);
    } else {
        fill(100);
        textSize(11);
        text('Click any thumbnail to explore its characteristics.', canvasWidth / 2, drawHeight + 46);
    }
}

function detectHover() {
    hoveredFormat = -1;
    let thumbSize = Math.min(120, (canvasWidth - margin * 2 - 8 * 4) / 5);
    let thumbY = 38;
    let totalWidth = thumbSize * 5 + 8 * 4;
    let startX = (canvasWidth - totalWidth) / 2;

    if (mouseY < thumbY || mouseY > thumbY + thumbSize) return;

    for (let i = 0; i < 5; i++) {
        let tx = startX + i * (thumbSize + 8);
        if (mouseX >= tx && mouseX <= tx + thumbSize) {
            hoveredFormat = i;
            break;
        }
    }
}

function mousePressed() {
    if (hoveredFormat !== -1) {
        selectedFormat = (selectedFormat === hoveredFormat) ? -1 : hoveredFormat;
    } else {
        // Don't deselect when clicking in detail area
    }
}

function windowResized() {
    updateCanvasSize();
    resizeCanvas(canvasWidth, canvasHeight);
    redraw();
}

function updateCanvasSize() {
    const container = document.querySelector('main').getBoundingClientRect();
    canvasWidth = Math.floor(container.width);
}
