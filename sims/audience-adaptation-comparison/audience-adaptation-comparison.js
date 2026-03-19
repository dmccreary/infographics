// Audience Adaptation Comparison
// Shows how the same dataset is presented differently for three audience types
// Bloom Level: Understand (L2) — Compare

// Canvas dimensions
let canvasWidth = 400;
let drawHeight = 420;
let controlHeight = 110;
let canvasHeight = drawHeight + controlHeight;
let margin = 15;
let defaultTextSize = 16;

// Panel layout
let panelGap = 10;
let panelY = 60;
let panelHeight = 340;

// State
let selectedPanel = -1; // -1 = none, 0/1/2 = panel index
let hoveredPanel = -1;

// Audience panel definitions
const panels = [
    {
        label: 'General Public',
        borderColor: [66, 133, 244],    // blue
        bgColor: [232, 240, 254],
        rationale: 'For the general public, the design uses a single bold statistic ("78%") as the focal point, supported by a simple two-bar chart. Technical jargon is eliminated. The goal is instant comprehension — a viewer should grasp the key message in under 3 seconds without any domain expertise.'
    },
    {
        label: 'Professional',
        borderColor: [232, 145, 58],    // orange
        bgColor: [253, 241, 228],
        rationale: 'For professionals, the design presents five detailed metrics with axis labels and statistical notation. Domain vocabulary like "engagement rate" and "completion ratio" assumes familiarity. The goal is analytical depth — professionals need enough data to evaluate methodology and draw their own conclusions.'
    },
    {
        label: 'Stakeholder',
        borderColor: [76, 175, 80],     // green
        bgColor: [232, 245, 233],
        rationale: 'For stakeholders, the design leads with budget impact and ROI projections. The heading is action-oriented: "Recommended: Expand interactive content." Numbers are framed as cost-per-student and return on investment. The goal is decision support — stakeholders need financial justification, not raw data.'
    }
];

function setup() {
    updateCanvasSize();
    const canvas = createCanvas(canvasWidth, canvasHeight);
    canvas.parent(document.querySelector('main'));
    textFont('Arial');
    describe('Three panels showing the same student engagement data adapted for general public, professional, and stakeholder audiences. Click a panel to learn why it was designed that way.', LABEL);
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
    text('Audience Adaptation Comparison', canvasWidth / 2, 8);

    // Subtitle
    fill(100);
    textSize(11);
    text('Topic: Student Engagement with Interactive Infographics', canvasWidth / 2, 28);

    // Detect hover
    detectHover();

    // Draw three panels
    let panelWidth = (canvasWidth - margin * 2 - panelGap * 2) / 3;
    for (let i = 0; i < 3; i++) {
        let px = margin + i * (panelWidth + panelGap);
        drawPanel(i, px, panelY, panelWidth, panelHeight);
    }

    // Draw infobox in control area
    drawInfobox();
}

function drawPanel(index, px, py, pw, ph) {
    let panel = panels[index];
    let isSelected = selectedPanel === index;
    let isHovered = hoveredPanel === index;

    // Panel background
    fill(panel.bgColor);
    if (isSelected) {
        stroke(panel.borderColor);
        strokeWeight(4);
    } else if (isHovered) {
        stroke(panel.borderColor);
        strokeWeight(3);
    } else {
        stroke(180);
        strokeWeight(1);
    }
    rect(px, py, pw, ph, 6);

    // Panel header
    noStroke();
    fill(panel.borderColor);
    rect(px, py, pw, 28, 6, 6, 0, 0);
    fill(255);
    textSize(11);
    textAlign(CENTER, CENTER);
    textStyle(BOLD);
    text(panel.label, px + pw / 2, py + 14);
    textStyle(NORMAL);

    // Draw content based on panel type
    if (index === 0) drawGeneralPublicContent(px, py + 34, pw, ph - 40);
    if (index === 1) drawProfessionalContent(px, py + 34, pw, ph - 40);
    if (index === 2) drawStakeholderContent(px, py + 34, pw, ph - 40);
}

function drawGeneralPublicContent(x, y, w, h) {
    // Big bold percentage
    noStroke();
    fill(50);
    textAlign(CENTER, TOP);
    textSize(min(36, w * 0.32));
    textStyle(BOLD);
    text('78%', x + w / 2, y + 10);
    textStyle(NORMAL);

    textSize(min(10, w * 0.09));
    fill(80);
    text('of students prefer', x + w / 2, y + 52);
    text('interactive content', x + w / 2, y + 65);

    // Simple 2-bar chart
    let barAreaY = y + 90;
    let barAreaH = h - 110;
    let barW = w * 0.25;
    let gap = w * 0.15;

    // Bar 1: Interactive 78%
    let bar1H = barAreaH * 0.78;
    fill(66, 133, 244, 180);
    noStroke();
    rect(x + w / 2 - barW - gap / 2, barAreaY + barAreaH - bar1H, barW, bar1H, 3, 3, 0, 0);

    // Bar 2: Traditional 22%
    let bar2H = barAreaH * 0.22;
    fill(180);
    rect(x + w / 2 + gap / 2, barAreaY + barAreaH - bar2H, barW, bar2H, 3, 3, 0, 0);

    // Labels
    fill(60);
    textSize(min(9, w * 0.08));
    textAlign(CENTER, TOP);
    text('Interactive', x + w / 2 - barW / 2 - gap / 2, barAreaY + barAreaH + 4);
    text('Traditional', x + w / 2 + barW / 2 + gap / 2, barAreaY + barAreaH + 4);

    // Simple takeaway
    fill(100);
    textSize(min(9, w * 0.08));
    textAlign(CENTER, BOTTOM);
    text('Students learn better', x + w / 2, y + h - 12);
    text('with interactive content', x + w / 2, y + h);
}

function drawProfessionalContent(x, y, w, h) {
    // Title
    noStroke();
    fill(50);
    textSize(min(10, w * 0.085));
    textAlign(CENTER, TOP);
    textStyle(BOLD);
    text('Engagement Metrics', x + w / 2, y + 4);
    textStyle(NORMAL);
    textSize(min(8, w * 0.07));
    fill(120);
    text('(n=2,847, p<0.01)', x + w / 2, y + 18);

    // 5 horizontal bars with metrics
    let metrics = [
        { label: 'Engagement', value: 0.78, display: '78.3%' },
        { label: 'Completion', value: 0.64, display: '64.1%' },
        { label: 'Retention', value: 0.71, display: '71.2%' },
        { label: 'Satisfaction', value: 0.82, display: '82.5%' },
        { label: 'Transfer', value: 0.56, display: '56.8%' }
    ];

    let barStartY = y + 36;
    let barSpacing = (h - 80) / 5;
    let labelW = w * 0.38;
    let barMaxW = w * 0.42;
    let valueW = w * 0.18;

    for (let i = 0; i < metrics.length; i++) {
        let by = barStartY + i * barSpacing;

        // Label
        fill(70);
        textSize(min(9, w * 0.075));
        textAlign(LEFT, CENTER);
        noStroke();
        text(metrics[i].label, x + 4, by + barSpacing * 0.4);

        // Bar background
        fill(230);
        rect(x + labelW, by + barSpacing * 0.15, barMaxW, barSpacing * 0.5, 2);

        // Bar fill
        fill(232, 145, 58, 200);
        rect(x + labelW, by + barSpacing * 0.15, barMaxW * metrics[i].value, barSpacing * 0.5, 2);

        // Value
        fill(60);
        textSize(min(8, w * 0.07));
        textAlign(LEFT, CENTER);
        text(metrics[i].display, x + labelW + barMaxW + 3, by + barSpacing * 0.4);
    }

    // Axis label
    fill(120);
    textSize(min(7, w * 0.06));
    textAlign(CENTER, BOTTOM);
    text('Rate (CI 95%)', x + labelW + barMaxW / 2, y + h - 2);
}

function drawStakeholderContent(x, y, w, h) {
    // Action heading
    noStroke();
    fill(46, 125, 50);
    textSize(min(9, w * 0.08));
    textAlign(CENTER, TOP);
    textStyle(BOLD);
    text('RECOMMENDED:', x + w / 2, y + 4);
    text('Expand Interactive', x + w / 2, y + 16);
    text('Content', x + w / 2, y + 28);
    textStyle(NORMAL);

    // Budget metrics
    let metricsY = y + 50;
    let lineH = 42;

    // Cost per student
    fill(50);
    textSize(min(9, w * 0.075));
    textAlign(CENTER, TOP);
    text('Cost Per Student', x + w / 2, metricsY);
    fill(46, 125, 50);
    textSize(min(22, w * 0.2));
    textStyle(BOLD);
    text('$4.20', x + w / 2, metricsY + 14);
    textStyle(NORMAL);
    fill(120);
    textSize(min(8, w * 0.065));
    text('vs $12.80 traditional', x + w / 2, metricsY + 38);

    // ROI
    metricsY += lineH + 30;
    fill(50);
    textSize(min(9, w * 0.075));
    text('Projected ROI', x + w / 2, metricsY);
    fill(46, 125, 50);
    textSize(min(22, w * 0.2));
    textStyle(BOLD);
    text('3.2x', x + w / 2, metricsY + 14);
    textStyle(NORMAL);
    fill(120);
    textSize(min(8, w * 0.065));
    text('over 2 semesters', x + w / 2, metricsY + 38);

    // Completion improvement
    metricsY += lineH + 30;
    fill(50);
    textSize(min(9, w * 0.075));
    text('Completion Rate', x + w / 2, metricsY);
    fill(46, 125, 50);
    textSize(min(18, w * 0.16));
    textStyle(BOLD);
    text('+23%', x + w / 2, metricsY + 14);
    textStyle(NORMAL);
    fill(120);
    textSize(min(8, w * 0.065));
    text('vs baseline', x + w / 2, metricsY + 34);

    // Bottom line
    fill(70);
    textSize(min(8, w * 0.07));
    textAlign(CENTER, BOTTOM);
    textStyle(ITALIC);
    text('Budget-neutral by Q3', x + w / 2, y + h - 2);
    textStyle(NORMAL);
}

function drawInfobox() {
    noStroke();

    if (selectedPanel === -1) {
        // Default instruction
        fill(120);
        textSize(12);
        textAlign(CENTER, CENTER);
        text('Click a panel to see why it was designed this way.', canvasWidth / 2, drawHeight + controlHeight / 2);
    } else {
        // Show rationale for selected panel
        let panel = panels[selectedPanel];

        // Panel name header
        fill(panel.borderColor);
        textSize(13);
        textAlign(LEFT, TOP);
        textStyle(BOLD);
        text(panel.label + ' — Design Rationale:', margin + 4, drawHeight + 8);
        textStyle(NORMAL);

        // Rationale text with word wrap
        fill(60);
        textSize(11);
        textAlign(LEFT, TOP);
        text(panel.rationale, margin + 4, drawHeight + 26, canvasWidth - margin * 2 - 8, controlHeight - 32);
    }
}

function detectHover() {
    hoveredPanel = -1;
    if (mouseY < panelY || mouseY > panelY + panelHeight) return;
    if (mouseX < margin || mouseX > canvasWidth - margin) return;

    let panelWidth = (canvasWidth - margin * 2 - panelGap * 2) / 3;
    for (let i = 0; i < 3; i++) {
        let px = margin + i * (panelWidth + panelGap);
        if (mouseX >= px && mouseX <= px + panelWidth) {
            hoveredPanel = i;
            break;
        }
    }
}

function mousePressed() {
    if (hoveredPanel !== -1) {
        selectedPanel = (selectedPanel === hoveredPanel) ? -1 : hoveredPanel;
    } else if (mouseY > drawHeight) {
        // Click in control area deselects
    } else {
        selectedPanel = -1;
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
