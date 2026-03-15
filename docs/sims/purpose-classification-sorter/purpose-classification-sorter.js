// Purpose Classification Sorter
// Classify infographic descriptions into purpose categories
// Bloom Level: Understand (L2) — Classify

// Canvas dimensions
let canvasWidth = 400;
let drawHeight = 350;
let controlHeight = 50;
let canvasHeight = drawHeight + controlHeight;
let margin = 15;

// State
let scenarios = [];
let currentIndex = 0;
let score = 0;
let answered = false;
let selectedCategory = '';
let isCorrect = false;
let gameOver = false;

// Category definitions
const categories = [
    { name: 'Educational', color: [66, 133, 244], shortDesc: 'Teach a concept' },
    { name: 'Analytical', color: [251, 140, 0], shortDesc: 'Reveal data patterns' },
    { name: 'Persuasive', color: [52, 168, 83], shortDesc: 'Argue a point' },
    { name: 'Promotional', color: [142, 68, 173], shortDesc: 'Market a product' }
];

let hoveredBin = -1;
let nextButton;
let justAdvanced = false; // guard against double-fire from button click

// Celebration particles
let confettiParticles = [];
let perfectScore = false;
let confettiWaves = 0;
const confettiColors = [
    [66, 133, 244],   // blue
    [251, 140, 0],    // orange
    [52, 168, 83],    // green
    [142, 68, 173],   // purple
    [244, 67, 54],    // red
    [255, 213, 0],    // gold
    [0, 188, 212]     // cyan
];

function preload() {
    // Load scenario data
    scenarios = loadJSON('data.json');
}

function setup() {
    updateCanvasSize();
    const canvas = createCanvas(canvasWidth, canvasHeight);
    canvas.parent(document.querySelector('main'));
    textFont('Arial');

    // Convert loaded JSON object to array if needed
    if (!Array.isArray(scenarios)) {
        let arr = [];
        for (let key in scenarios) {
            arr.push(scenarios[key]);
        }
        scenarios = arr;
    }

    // Shuffle scenarios
    shuffleArray(scenarios);

    // Create Next button
    nextButton = createButton('Next');
    nextButton.parent(document.querySelector('main'));
    nextButton.mousePressed(advanceScenario);
    nextButton.style('font-size', '14px');
    nextButton.style('padding', '6px 20px');
    nextButton.style('border', 'none');
    nextButton.style('border-radius', '4px');
    nextButton.style('background-color', '#2196f3');
    nextButton.style('color', 'white');
    nextButton.style('cursor', 'pointer');
    nextButton.hide();

    describe('A classification quiz where you read infographic descriptions and sort them into four purpose categories: Educational, Analytical, Persuasive, or Promotional.', LABEL);
}

function draw() {
    justAdvanced = false; // clear the one-frame guard
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
    textSize(22);
    textAlign(CENTER, TOP);
    text('Purpose Classification Sorter', canvasWidth / 2, 8);

    if (gameOver) {
        drawGameOver();
        if (perfectScore) {
            updateAndDrawConfetti();
        }
    } else {
        // Score and progress
        drawScoreAndProgress();

        // Scenario card
        drawScenarioCard();

        // Detect hover on bins
        detectBinHover();

        // Category bins
        drawCategoryBins();

        // Feedback area
        if (answered) {
            drawFeedback();
        }
    }

    // Position Next button
    positionNextButton();
}

function drawScoreAndProgress() {
    let total = scenarios.length;
    noStroke();

    // Score
    fill('gray');
    textSize(14);
    textAlign(RIGHT, TOP);
    text(score + ' of ' + total + ' correct', canvasWidth - margin, 10);

    // Progress bar
    let barX = margin;
    let barY = 30;
    let barW = canvasWidth - margin * 2;
    let barH = 6;

    fill(220);
    noStroke();
    rect(barX, barY, barW, barH, 3);

    if (currentIndex > 0) {
        fill(66, 133, 244);
        rect(barX, barY, barW * (currentIndex / total), barH, 3);
    }

    // Question number
    fill(120);
    textSize(14);
    textAlign(LEFT, TOP);
    text('Question ' + (currentIndex + 1) + ' of ' + total, margin, 10);
}

function drawScenarioCard() {
    let cardX = margin;
    let cardY = 42;
    let cardW = canvasWidth - margin * 2;
    let cardH = 95;

    // Card background
    fill(255);
    stroke(200);
    strokeWeight(1);
    rect(cardX, cardY, cardW, cardH, 6);

    // Card header
    noStroke();
    fill(50);
    textSize(18);
    textStyle(BOLD);
    textAlign(LEFT, TOP);
    text('Scenario:', cardX + 10, cardY + 8);
    textStyle(NORMAL);

    // Scenario text
    fill(60);
    textSize(16);
    textAlign(LEFT, TOP);
    let scenario = scenarios[currentIndex];
    text(scenario.description, cardX + 10, cardY + 28, cardW - 20, cardH - 30);
}

function drawCategoryBins() {
    let binY = 148;
    let binH = 52;
    let gap = 8;
    let binW = (canvasWidth - margin * 2 - gap * 3) / 4;

    for (let i = 0; i < 4; i++) {
        let bx = margin + i * (binW + gap);
        let cat = categories[i];
        let isHovered = hoveredBin === i && !answered;
        let isChosen = answered && selectedCategory === cat.name;
        let isCorrectBin = answered && scenarios[currentIndex].correctCategory === cat.name;

        // Bin background
        if (isCorrectBin && answered) {
            fill(200, 255, 200);
            stroke(46, 125, 50);
            strokeWeight(3);
        } else if (isChosen && !isCorrect) {
            fill(255, 210, 210);
            stroke(200, 50, 50);
            strokeWeight(2);
        } else if (isHovered) {
            fill(cat.color[0], cat.color[1], cat.color[2], 30);
            stroke(cat.color);
            strokeWeight(2);
        } else {
            fill(255);
            stroke(180);
            strokeWeight(1);
        }
        rect(bx, binY, binW, binH, 6);

        // Category color bar at top
        noStroke();
        fill(cat.color);
        rect(bx, binY, binW, 18, 6, 6, 0, 0);

        // Category name
        fill(255);
        textSize(14);
        textAlign(CENTER, CENTER);
        textStyle(BOLD);
        text(cat.name, bx + binW / 2, binY + 9);
        textStyle(NORMAL);

        // Short description
        fill(80);
        textSize(14);
        textAlign(CENTER, CENTER);
        text(cat.shortDesc, bx + binW / 2, binY + 36);
    }
}

function drawFeedback() {
    let fbY = 210;
    let fbH = drawHeight - fbY - 6;
    let fbX = margin;
    let fbW = canvasWidth - margin * 2;

    // Feedback background
    if (isCorrect) {
        fill(232, 245, 233);
        stroke(76, 175, 80);
    } else {
        fill(255, 235, 238);
        stroke(244, 67, 54);
    }
    strokeWeight(1);
    rect(fbX, fbY, fbW, fbH, 6);

    // Feedback header
    noStroke();
    if (isCorrect) {
        fill(46, 125, 50);
    } else {
        fill(200, 50, 50);
    }
    textSize(14);
    textAlign(LEFT, TOP);
    textStyle(BOLD);
    let header = isCorrect ? 'Correct!' : 'Not quite — the answer is ' + scenarios[currentIndex].correctCategory + '.';
    text(header, fbX + 10, fbY + 8);
    textStyle(NORMAL);

    // Explanation
    fill(60);
    textSize(14);
    textAlign(LEFT, TOP);
    text(scenarios[currentIndex].explanation, fbX + 10, fbY + 28, fbW - 20, fbH - 34);
}

function drawGameOver() {
    let total = scenarios.length;
    let pct = Math.round((score / total) * 100);

    noStroke();
    fill(0);
    textSize(22);
    textAlign(CENTER, CENTER);
    textStyle(BOLD);
    text('Quiz Complete!', canvasWidth / 2, drawHeight * 0.3);
    textStyle(NORMAL);

    textSize(18);
    fill(66, 133, 244);
    text(score + ' out of ' + total + ' correct (' + pct + '%)', canvasWidth / 2, drawHeight * 0.45);

    fill(80);
    textSize(14);
    if (pct === 100) {
        text('Perfect score! You are a classification master!', canvasWidth / 2, drawHeight * 0.58);
    } else if (pct >= 80) {
        text('Excellent! You can classify infographic purposes confidently.', canvasWidth / 2, drawHeight * 0.58);
    } else if (pct >= 60) {
        text('Good effort! Review the purpose definitions and try again.', canvasWidth / 2, drawHeight * 0.58);
    } else {
        text('Keep practicing! Re-read the chapter section on purpose types.', canvasWidth / 2, drawHeight * 0.58);
    }

    // Restart button text in control area
    fill(100);
    textSize(14);
    text('Click "Restart" to try again with shuffled questions.', canvasWidth / 2, drawHeight + controlHeight / 2);
}

function positionNextButton() {
    if (answered && !gameOver) {
        nextButton.position(canvasWidth / 2 - 40, drawHeight + 12);
        nextButton.show();
        nextButton.html('Next');
    } else if (gameOver) {
        nextButton.position(canvasWidth / 2 - 40, drawHeight + 12);
        nextButton.show();
        nextButton.html('Restart');
        nextButton.style('background-color', '#4caf50');
    } else {
        nextButton.hide();
    }
}

function detectBinHover() {
    hoveredBin = -1;
    if (answered) return;

    let binY = 148;
    let binH = 52;
    let gap = 8;
    let binW = (canvasWidth - margin * 2 - gap * 3) / 4;

    if (mouseY < binY || mouseY > binY + binH) return;

    for (let i = 0; i < 4; i++) {
        let bx = margin + i * (binW + gap);
        if (mouseX >= bx && mouseX <= bx + binW) {
            hoveredBin = i;
            cursor(HAND);
            return;
        }
    }
    cursor(ARROW);
}

function mousePressed() {
    if (justAdvanced) return; // ignore click that triggered the Next button
    if (answered || gameOver) return;
    if (hoveredBin === -1) return;

    selectedCategory = categories[hoveredBin].name;
    isCorrect = selectedCategory === scenarios[currentIndex].correctCategory;
    if (isCorrect) score++;
    answered = true;
    cursor(ARROW);
}

function advanceScenario() {
    justAdvanced = true; // block the global mousePressed from double-firing

    if (gameOver) {
        // Restart
        currentIndex = 0;
        score = 0;
        answered = false;
        gameOver = false;
        perfectScore = false;
        confettiParticles = [];
        confettiWaves = 0;
        shuffleArray(scenarios);
        nextButton.style('background-color', '#2196f3');
        nextButton.hide();
        return;
    }

    currentIndex++;
    answered = false;
    selectedCategory = '';

    if (currentIndex >= scenarios.length) {
        gameOver = true;
        if (score >= 7) {
            perfectScore = true;
            spawnConfetti();
        }
    }

    nextButton.hide();
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

// Celebration confetti system
function spawnConfetti() {
    for (let i = 0; i < 80; i++) {
        let col = confettiColors[Math.floor(Math.random() * confettiColors.length)];
        confettiParticles.push({
            x: canvasWidth / 2 + random(-40, 40),
            y: drawHeight * 0.35,
            vx: random(-4, 4),
            vy: random(-8, -2),
            size: random(4, 9),
            rotation: random(TWO_PI),
            rotationSpeed: random(-0.15, 0.15),
            color: col,
            alpha: 255,
            gravity: 0.12,
            shape: floor(random(3)) // 0=rect, 1=circle, 2=triangle
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
        p.alpha -= 1.5;

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

    // Spawn a second wave for extra celebration
    if (confettiParticles.length < 10 && confettiWaves < 3) {
        confettiWaves++;
        spawnConfetti();
    }
}
