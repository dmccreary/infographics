// Multi-Dimensional Classification Explorer
// Apply the five-dimension taxonomy to classify infographic examples
// Bloom Level: Apply (L3) — Apply

// Canvas dimensions
let canvasWidth = 400;
let drawHeight = 580;
let controlHeight = 50;
let canvasHeight = drawHeight + controlHeight;
let margin = 15;

// State
let scenarios = [];
let currentIndex = 0;
let totalCorrect = 0; // across all scenarios
let checked = false;
let justAdvanced = false;
let gameOver = false;

// Selections (one per dimension, empty string = not selected)
let selections = { purpose: '', format: '', complexity: '', audience: '', domain: '' };

// Results after checking (true/false per dimension)
let results = {};

// Dimension definitions
const dimensions = [
    {
        key: 'purpose',
        label: 'Purpose',
        options: ['Educational', 'Analytical', 'Persuasive', 'Promotional'],
        colors: { base: [66, 133, 244], light: [220, 235, 255] }
    },
    {
        key: 'format',
        label: 'Format',
        options: ['Linear', 'Hierarchical', 'Comparative', 'Circular', 'Radial'],
        colors: { base: [251, 140, 0], light: [255, 235, 200] }
    },
    {
        key: 'complexity',
        label: 'Complexity',
        options: ['Minimalist', 'Detailed'],
        colors: { base: [52, 168, 83], light: [215, 245, 220] }
    },
    {
        key: 'audience',
        label: 'Audience',
        options: ['General Public', 'Professional', 'Stakeholder'],
        colors: { base: [142, 68, 173], light: [235, 215, 245] }
    },
    {
        key: 'domain',
        label: 'Domain',
        options: ['Science', 'Business', 'Technology', 'Education', 'Health', 'History'],
        colors: { base: [0, 137, 123], light: [200, 235, 230] }
    }
];

// Celebration
let confettiParticles = [];
let confettiWaves = 0;
let showCelebration = false;
const confettiColors = [
    [66, 133, 244], [251, 140, 0], [52, 168, 83],
    [142, 68, 173], [244, 67, 54], [255, 213, 0], [0, 188, 212]
];

// Layout cache (recalculated on resize)
let rowY = [];
let rowH = 42;
let btnPositions = []; // [dimIndex][optIndex] = {x, y, w, h}

function preload() {
    scenarios = loadJSON('data.json');
}

function setup() {
    updateCanvasSize();
    const canvas = createCanvas(canvasWidth, canvasHeight);
    canvas.parent(document.querySelector('main'));
    textFont('Arial');

    if (!Array.isArray(scenarios)) {
        let arr = [];
        for (let key in scenarios) arr.push(scenarios[key]);
        scenarios = arr;
    }

    shuffleArray(scenarios);
    describe('A multi-dimensional classification quiz where you classify interactive infographic descriptions across five taxonomy dimensions: Purpose, Format, Complexity, Audience, and Domain.', LABEL);
}

function draw() {
    justAdvanced = false;
    updateCanvasSize();
    calculateLayout();

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
    textSize(18);
    textAlign(CENTER, TOP);
    textStyle(BOLD);
    text('Multi-Dimensional Classifier', canvasWidth / 2, 8);
    textStyle(NORMAL);

    if (gameOver) {
        drawGameOver();
    } else {
        // Score and progress
        drawProgress();

        // Scenario card
        drawScenarioCard();

        // Dimension rows
        drawDimensionRows();

        // Feedback panel (when checked)
        if (checked) {
            drawFeedback();
        }

        // Control area content
        drawControlArea();
    }

    // Celebration
    if (showCelebration) {
        updateAndDrawConfetti();
    }
}

function drawProgress() {
    let total = scenarios.length;
    noStroke();

    fill('gray');
    textSize(14);
    textAlign(RIGHT, TOP);
    text('Scenario ' + (currentIndex + 1) + ' of ' + total, canvasWidth - margin, 32);

    // Progress bar
    let barX = margin;
    let barY = 50;
    let barW = canvasWidth - margin * 2;
    let barH = 5;

    fill(220);
    rect(barX, barY, barW, barH, 3);

    if (currentIndex > 0) {
        fill(66, 133, 244);
        rect(barX, barY, barW * (currentIndex / total), barH, 3);
    }
}

function drawScenarioCard() {
    let cardX = margin;
    let cardY = 60;
    let cardW = canvasWidth - margin * 2;
    let cardH = 90;

    fill(255);
    stroke(200);
    strokeWeight(1);
    rect(cardX, cardY, cardW, cardH, 6);

    noStroke();
    fill(50);
    textSize(14);
    textStyle(BOLD);
    textAlign(LEFT, TOP);
    text('Scenario:', cardX + 10, cardY + 8);
    textStyle(NORMAL);

    fill(60);
    textSize(14);
    textAlign(LEFT, TOP);
    text(scenarios[currentIndex].description, cardX + 10, cardY + 26, cardW - 20, cardH - 32);
}

function calculateLayout() {
    let startY = 160;
    rowY = [];
    btnPositions = [];

    for (let d = 0; d < dimensions.length; d++) {
        rowY.push(startY + d * (rowH + 4));
        btnPositions.push([]);

        let dim = dimensions[d];
        let labelW = 90;
        let availW = canvasWidth - margin - labelW - margin;
        let gap = 4;
        let btnW = (availW - gap * (dim.options.length - 1)) / dim.options.length;
        let btnH = 26;
        let btnY = rowY[d] + (rowH - btnH) / 2;

        for (let o = 0; o < dim.options.length; o++) {
            let btnX = margin + labelW + o * (btnW + gap);
            btnPositions[d].push({ x: btnX, y: btnY, w: btnW, h: btnH });
        }
    }
}

function drawDimensionRows() {
    for (let d = 0; d < dimensions.length; d++) {
        let dim = dimensions[d];
        let y = rowY[d];
        let correctKey = 'correct' + dim.key.charAt(0).toUpperCase() + dim.key.slice(1);
        let correctVal = scenarios[currentIndex][correctKey];

        // Dimension label
        noStroke();
        fill(dim.colors.base);
        textSize(14);
        textAlign(LEFT, CENTER);
        textStyle(BOLD);
        text(dim.label, margin, y + rowH / 2);
        textStyle(NORMAL);

        // Option buttons
        for (let o = 0; o < dim.options.length; o++) {
            let bp = btnPositions[d][o];
            let opt = dim.options[o];
            let isSelected = selections[dim.key] === opt;
            let isCorrectOpt = checked && (Array.isArray(correctVal) ? correctVal.includes(opt) : correctVal === opt);
            let isWrongSelection = checked && isSelected && !isCorrectOpt;

            // Button background
            if (checked && isCorrectOpt) {
                fill(200, 255, 200);
                stroke(46, 125, 50);
                strokeWeight(2);
            } else if (isWrongSelection) {
                fill(255, 210, 210);
                stroke(200, 50, 50);
                strokeWeight(2);
            } else if (isSelected) {
                fill(dim.colors.light);
                stroke(dim.colors.base);
                strokeWeight(2);
            } else {
                fill(255);
                stroke(190);
                strokeWeight(1);
            }
            rect(bp.x, bp.y, bp.w, bp.h, 4);

            // Button text
            noStroke();
            fill(isSelected && !checked ? dim.colors.base : (checked && isCorrectOpt ? [46, 125, 50] : (isWrongSelection ? [200, 50, 50] : [80, 80, 80])));
            textSize(Math.max(14, 0));
            textAlign(CENTER, CENTER);
            text(opt, bp.x + bp.w / 2, bp.y + bp.h / 2);
        }
    }
}

function drawFeedback() {
    let fbY = rowY[dimensions.length - 1] + rowH + 10;
    let fbX = margin;
    let fbW = canvasWidth - margin * 2;
    let fbH = drawHeight - fbY - 6;

    let correctCount = 0;
    for (let key in results) {
        if (results[key]) correctCount++;
    }

    // Background
    let allCorrect = correctCount === 5;
    if (allCorrect) {
        fill(232, 245, 233);
        stroke(76, 175, 80);
    } else {
        fill(255, 248, 235);
        stroke(251, 140, 0);
    }
    strokeWeight(1);
    rect(fbX, fbY, fbW, fbH, 6);

    // Header
    noStroke();
    fill(allCorrect ? [46, 125, 50] : [200, 100, 0]);
    textSize(16);
    textAlign(LEFT, TOP);
    textStyle(BOLD);
    text(correctCount + ' of 5 dimensions correct' + (allCorrect ? '!' : ''), fbX + 10, fbY + 8);
    textStyle(NORMAL);

    // Per-dimension feedback for incorrect ones
    let py = fbY + 28;
    for (let d = 0; d < dimensions.length; d++) {
        let dim = dimensions[d];
        if (!results[dim.key]) {
            let correctKey = 'correct' + dim.key.charAt(0).toUpperCase() + dim.key.slice(1);
            let correctVal = scenarios[currentIndex][correctKey];
            let explanationKey = dim.key;

            fill(180, 60, 0);
            textSize(14);
            textAlign(LEFT, TOP);
            let expText = dim.label + ': ' + scenarios[currentIndex].explanations[explanationKey];
            text(expText, fbX + 10, py, fbW - 20, 40);
            py += 38;
        }
    }
}

function drawControlArea() {
    let btnW = 120;
    let btnH = 30;
    let btnX = canvasWidth / 2 - btnW / 2;
    let btnY = drawHeight + (controlHeight - btnH) / 2;

    if (!checked) {
        // Check Answer button
        let allSelected = true;
        for (let key in selections) {
            if (selections[key] === '') allSelected = false;
        }

        if (allSelected) {
            fill(66, 133, 244);
        } else {
            fill(180);
        }
        noStroke();
        rect(btnX, btnY, btnW, btnH, 4);

        fill(255);
        textSize(14);
        textAlign(CENTER, CENTER);
        textStyle(BOLD);
        text('Check Answer', btnX + btnW / 2, btnY + btnH / 2);
        textStyle(NORMAL);
    } else {
        // Next / Finish button
        let isLast = currentIndex >= scenarios.length - 1;
        fill(isLast ? [76, 175, 80] : [66, 133, 244]);
        noStroke();
        rect(btnX, btnY, btnW, btnH, 4);

        fill(255);
        textSize(14);
        textAlign(CENTER, CENTER);
        textStyle(BOLD);
        text(isLast ? 'See Results' : 'Next Scenario', btnX + btnW / 2, btnY + btnH / 2);
        textStyle(NORMAL);
    }
}

function mousePressed() {
    if (justAdvanced) return;

    // Handle restart click on game over screen
    if (gameOver) {
        let btnW = 120;
        let btnH = 30;
        let btnX = canvasWidth / 2 - btnW / 2;
        let btnY = drawHeight * 0.60;
        if (mouseX >= btnX && mouseX <= btnX + btnW && mouseY >= btnY && mouseY <= btnY + btnH) {
            gameOver = false;
            currentIndex = 0;
            totalCorrect = 0;
            checked = false;
            selections = { purpose: '', format: '', complexity: '', audience: '', domain: '' };
            results = {};
            showCelebration = false;
            confettiParticles = [];
            confettiWaves = 0;
            shuffleArray(scenarios);
        }
        return;
    }

    // Check control area button click
    let btnW = 120;
    let btnH = 30;
    let btnX = canvasWidth / 2 - btnW / 2;
    let btnY = drawHeight + (controlHeight - btnH) / 2;

    if (mouseX >= btnX && mouseX <= btnX + btnW && mouseY >= btnY && mouseY <= btnY + btnH) {
        if (!checked) {
            // Check answer
            let allSelected = true;
            for (let key in selections) {
                if (selections[key] === '') allSelected = false;
            }
            if (!allSelected) return;

            checkAnswer();
        } else {
            // Advance
            advanceScenario();
        }
        return;
    }

    // Check dimension button clicks (only if not checked)
    if (checked) return;

    for (let d = 0; d < dimensions.length; d++) {
        for (let o = 0; o < dimensions[d].options.length; o++) {
            let bp = btnPositions[d][o];
            if (mouseX >= bp.x && mouseX <= bp.x + bp.w &&
                mouseY >= bp.y && mouseY <= bp.y + bp.h) {
                selections[dimensions[d].key] = dimensions[d].options[o];
                return;
            }
        }
    }
}

function checkAnswer() {
    results = {};
    let scenarioDimCorrect = 0;
    for (let d = 0; d < dimensions.length; d++) {
        let dim = dimensions[d];
        let correctKey = 'correct' + dim.key.charAt(0).toUpperCase() + dim.key.slice(1);
        let correctVal = scenarios[currentIndex][correctKey];
        let isRight = Array.isArray(correctVal)
            ? correctVal.includes(selections[dim.key])
            : selections[dim.key] === correctVal;
        results[dim.key] = isRight;
        if (isRight) {
            totalCorrect++;
            scenarioDimCorrect++;
        }
    }
    checked = true;

    // Celebrate if all 5 dimensions correct for this scenario
    if (scenarioDimCorrect === 5) {
        showCelebration = true;
        confettiWaves = 0;
        confettiParticles = [];
        spawnConfetti();
    }
}

function advanceScenario() {
    justAdvanced = true;

    // If on the last scenario, go to game over
    if (currentIndex >= scenarios.length - 1) {
        gameOver = true;
        checked = false;
        showCelebration = true;
        confettiWaves = 0;
        confettiParticles = [];
        spawnConfetti();
        return;
    }

    currentIndex++;
    checked = false;
    selections = { purpose: '', format: '', complexity: '', audience: '', domain: '' };
    results = {};
    showCelebration = false;
    confettiParticles = [];
    confettiWaves = 0;
}

function drawGameOver() {
    let total = scenarios.length * 5; // total possible dimension answers
    let pct = Math.round((totalCorrect / total) * 100);

    noStroke();
    fill(0);
    textSize(22);
    textAlign(CENTER, CENTER);
    textStyle(BOLD);
    text('Quiz Complete!', canvasWidth / 2, drawHeight * 0.25);
    textStyle(NORMAL);

    textSize(18);
    fill(66, 133, 244);
    text(totalCorrect + ' of ' + total + ' dimensions correct (' + pct + '%)', canvasWidth / 2, drawHeight * 0.38);

    fill(80);
    textSize(14);
    if (pct >= 90) {
        text('Outstanding! You have mastered the taxonomy.', canvasWidth / 2, drawHeight * 0.50);
    } else if (pct >= 70) {
        text('Great work! You have a strong grasp of the taxonomy.', canvasWidth / 2, drawHeight * 0.50);
    } else if (pct >= 50) {
        text('Good effort! Review the dimensions you found tricky.', canvasWidth / 2, drawHeight * 0.50);
    } else {
        text('Keep practicing! Re-read Chapter 2 on the taxonomy.', canvasWidth / 2, drawHeight * 0.50);
    }

    // Restart button
    let btnW = 120;
    let btnH = 30;
    let btnX = canvasWidth / 2 - btnW / 2;
    let btnY = drawHeight * 0.60;

    fill(76, 175, 80);
    noStroke();
    rect(btnX, btnY, btnW, btnH, 4);

    fill(255);
    textSize(14);
    textAlign(CENTER, CENTER);
    textStyle(BOLD);
    text('Restart', btnX + btnW / 2, btnY + btnH / 2);
    textStyle(NORMAL);

    // Instructions
    fill(100);
    textSize(14);
    textAlign(CENTER, CENTER);
    text('Click "Restart" to try again with shuffled scenarios.', canvasWidth / 2, drawHeight + controlHeight / 2);
}

function shuffleArray(arr) {
    for (let i = arr.length - 1; i > 0; i--) {
        let j = Math.floor(Math.random() * (i + 1));
        [arr[i], arr[j]] = [arr[j], arr[i]];
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

// Celebration confetti
function spawnConfetti() {
    for (let i = 0; i < 60; i++) {
        let col = confettiColors[Math.floor(Math.random() * confettiColors.length)];
        confettiParticles.push({
            x: canvasWidth / 2 + random(-60, 60),
            y: drawHeight * 0.3,
            vx: random(-4, 4),
            vy: random(-7, -2),
            size: random(4, 8),
            rotation: random(TWO_PI),
            rotationSpeed: random(-0.15, 0.15),
            color: col,
            alpha: 255,
            gravity: 0.12,
            shape: floor(random(3))
        });
    }
}

function updateAndDrawConfetti() {
    for (let i = confettiParticles.length - 1; i >= 0; i--) {
        let p = confettiParticles[i];
        p.vy += p.gravity;
        p.x += p.vx;
        p.y += p.vy;
        p.rotation += p.rotationSpeed;
        p.alpha -= 1.8;

        if (p.alpha <= 0 || p.y > canvasHeight + 20) {
            confettiParticles.splice(i, 1);
            continue;
        }

        push();
        translate(p.x, p.y);
        rotate(p.rotation);
        noStroke();
        fill(p.color[0], p.color[1], p.color[2], p.alpha);

        if (p.shape === 0) {
            rectMode(CENTER);
            rect(0, 0, p.size, p.size * 0.6, 1);
            rectMode(CORNER);
        } else if (p.shape === 1) {
            ellipse(0, 0, p.size, p.size);
        } else {
            let s = p.size * 0.5;
            triangle(-s, s * 0.6, s, s * 0.6, 0, -s * 0.8);
        }
        pop();
    }

    if (confettiParticles.length < 8 && confettiWaves < 2) {
        confettiWaves++;
        spawnConfetti();
    }
}
