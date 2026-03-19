// Bloom's Taxonomy MicroSim Matcher
// Two-stage matching quiz: objective → Bloom level → best MicroSim pattern
// Bloom Level: Analyze (L4)

let containerWidth;
let canvasWidth = 400;
let drawHeight = 200;
let canvasHeight = drawHeight;

let questions = [
  { objective: 'Students will LIST the four overlay types and DEFINE each one.', level: 0, pattern: 0,
    verb: 'list', explanation: '"List" and "define" are recall-level verbs.' },
  { objective: 'Students will EXPLAIN how cognitive load affects learning outcomes.', level: 1, pattern: 1,
    verb: 'explain', explanation: '"Explain" requires understanding cause and effect.' },
  { objective: 'Students will USE the SQVID framework to select a visual style.', level: 2, pattern: 2,
    verb: 'use', explanation: '"Use" requires applying a framework to a concrete task.' },
  { objective: 'Students will COMPARE reinforcing and balancing feedback loops.', level: 3, pattern: 3,
    verb: 'compare', explanation: '"Compare" requires breaking down and examining differences.' },
  { objective: 'Students will ASSESS which overlay type best suits an anatomy diagram.', level: 4, pattern: 4,
    verb: 'assess', explanation: '"Assess" requires making judgments based on criteria.' },
  { objective: 'Students will DESIGN an interactive infographic for a biology lesson.', level: 5, pattern: 5,
    verb: 'design', explanation: '"Design" requires creating something new.' },
  { objective: 'Students will IDENTIFY the eight SmartArt categories by name.', level: 0, pattern: 0,
    verb: 'identify', explanation: '"Identify" is recognition — a Remember-level task.' },
  { objective: 'Students will DESCRIBE how responsive breakpoints change layout.', level: 1, pattern: 1,
    verb: 'describe', explanation: '"Describe" requires understanding and restating concepts.' },
  { objective: 'Students will CALCULATE the iframe height from canvas dimensions.', level: 2, pattern: 2,
    verb: 'calculate', explanation: '"Calculate" requires applying a formula to specific values.' },
  { objective: 'Students will DIFFERENTIATE between intrinsic and extraneous cognitive load.', level: 3, pattern: 3,
    verb: 'differentiate', explanation: '"Differentiate" requires analytical comparison.' }
];

let levels = [
  { name: 'L1 Remember', color: '#E53935', patterns: ['Flashcard Quiz', 'Labeling Exercise', 'Matching Game'] },
  { name: 'L2 Understand', color: '#FB8C00', patterns: ['Step-Through Demo', 'Worked Example', 'Concept Map'] },
  { name: 'L3 Apply', color: '#FDD835', patterns: ['Parameter Explorer', 'Calculator', 'Practice Problem'] },
  { name: 'L4 Analyze', color: '#43A047', patterns: ['Comparison Tool', 'Network Explorer', 'Pattern Finder'] },
  { name: 'L5 Evaluate', color: '#1E88E5', patterns: ['Sorting/Ranking', 'Rubric Tool', 'Critique Activity'] },
  { name: 'L6 Create', color: '#8E24AA', patterns: ['Builder/Editor', 'Canvas Tool', 'Model Creator'] }
];

let currentQ = 0;
let stage = 1; // 1=classify level, 2=select pattern
let score = 0;
let answered = 0;
let feedback = '';
let feedbackColor = '';
let shuffledOrder = [];

function setup() {
  updateCanvasSize();
  const canvas = createCanvas(canvasWidth, canvasHeight);
  canvas.parent(document.querySelector('main'));
  shuffleQuestions();
  buildUI();
  updateUI();
  describe('Bloom\'s Taxonomy MicroSim Matcher quiz with two-stage matching: classify learning objectives by Bloom level, then select the best MicroSim pattern.');
}

function shuffleQuestions() {
  shuffledOrder = [];
  for (let i = 0; i < questions.length; i++) shuffledOrder.push(i);
  for (let i = shuffledOrder.length - 1; i > 0; i--) {
    let j = floor(random(i + 1));
    let tmp = shuffledOrder[i];
    shuffledOrder[i] = shuffledOrder[j];
    shuffledOrder[j] = tmp;
  }
}

function buildUI() {
  let mainEl = document.querySelector('main');

  let uiDiv = document.createElement('div');
  uiDiv.id = 'bloom-ui';
  uiDiv.style.cssText = 'background: white; border: 1px solid silver; padding: 14px; font-family: Arial, sans-serif;';
  mainEl.appendChild(uiDiv);
}

function updateUI() {
  let uiDiv = document.getElementById('bloom-ui');
  if (!uiDiv) return;

  let q = questions[shuffledOrder[currentQ]];

  let html = '<div style="display: flex; justify-content: space-between; margin-bottom: 10px; font-size: 14px;">';
  html += '<span><strong>Question ' + (currentQ + 1) + ' of ' + questions.length + '</strong></span>';
  html += '<span>Score: <strong>' + score + '/' + answered + '</strong></span></div>';

  // Objective card
  html += '<div style="background: #f0f4ff; border: 1px solid #c0d0e8; border-radius: 6px; padding: 14px; margin-bottom: 12px; font-size: 15px; line-height: 1.5;">';
  html += q.objective + '</div>';

  if (stage === 1) {
    html += '<div style="font-weight: bold; margin-bottom: 8px; font-size: 14px;">Stage 1: What Bloom\'s level is this?</div>';
    html += '<div style="display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 6px;">';
    for (let i = 0; i < 6; i++) {
      html += '<button onclick="selectLevel(' + i + ')" style="padding: 8px; font-size: 13px; cursor: pointer; border: 2px solid ' + levels[i].color + '; border-radius: 4px; background: white; color: ' + levels[i].color + '; font-weight: bold;">' + levels[i].name + '</button>';
    }
    html += '</div>';
  } else if (stage === 2) {
    html += '<div style="font-weight: bold; margin-bottom: 8px; font-size: 14px;">Stage 2: Which MicroSim pattern is best?</div>';
    let correctLevel = q.level;
    html += '<div style="display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 6px;">';
    // Show 3 patterns from the correct level
    let pats = levels[correctLevel].patterns;
    for (let i = 0; i < pats.length; i++) {
      html += '<button onclick="selectPattern(' + i + ')" style="padding: 8px; font-size: 13px; cursor: pointer; border: 1px solid silver; border-radius: 4px; background: #f8f8f8;">' + pats[i] + '</button>';
    }
    html += '</div>';
  }

  if (feedback) {
    html += '<div style="margin-top: 10px; padding: 10px; border-radius: 4px; background: ' + (feedbackColor === 'green' ? '#e8f5e9' : '#fce4ec') + '; border: 1px solid ' + (feedbackColor === 'green' ? '#a5d6a7' : '#ef9a9a') + '; font-size: 13px;">' + feedback + '</div>';
  }

  if (stage === 3) {
    html += '<div style="text-align: center; margin-top: 12px;">';
    if (currentQ < questions.length - 1) {
      html += '<button onclick="nextQuestion()" style="padding: 8px 20px; font-size: 14px; cursor: pointer; border: 1px solid #4285F4; border-radius: 4px; background: #4285F4; color: white; font-weight: bold;">Next Objective</button>';
    } else {
      html += '<div style="font-size: 16px; font-weight: bold; color: #4285F4;">Quiz Complete! Final Score: ' + score + '/' + questions.length + '</div>';
      html += '<button onclick="resetQuiz()" style="padding: 8px 20px; font-size: 14px; cursor: pointer; border: 1px solid silver; border-radius: 4px; background: #f0f0f0; margin-top: 8px;">Reset Quiz</button>';
    }
    html += '</div>';
  }

  uiDiv.innerHTML = html;
}

// Global functions for button onclick
window.selectLevel = function(levelIdx) {
  let q = questions[shuffledOrder[currentQ]];
  if (levelIdx === q.level) {
    feedback = 'Correct! ' + q.explanation + ' Now select the best MicroSim pattern.';
    feedbackColor = 'green';
    stage = 2;
  } else {
    feedback = 'Not quite. The key verb is "' + q.verb + '" — ' + q.explanation + ' The correct level is ' + levels[q.level].name + '.';
    feedbackColor = 'red';
    answered++;
    stage = 3;
  }
  updateUI();
};

window.selectPattern = function(patIdx) {
  let q = questions[shuffledOrder[currentQ]];
  if (patIdx === q.pattern % 3) {
    feedback = 'Correct! ' + levels[q.level].patterns[patIdx] + ' is an ideal pattern for ' + levels[q.level].name + ' objectives.';
    feedbackColor = 'green';
    score++;
  } else {
    feedback = 'The best match is "' + levels[q.level].patterns[q.pattern % 3] + '" for this ' + levels[q.level].name + ' objective.';
    feedbackColor = 'red';
  }
  answered++;
  stage = 3;
  updateUI();
};

window.nextQuestion = function() {
  currentQ++;
  stage = 1;
  feedback = '';
  updateUI();
};

window.resetQuiz = function() {
  currentQ = 0;
  stage = 1;
  score = 0;
  answered = 0;
  feedback = '';
  shuffleQuestions();
  updateUI();
};

function draw() {
  updateCanvasSize();

  fill('aliceblue');
  stroke('silver');
  strokeWeight(1);
  rect(0, 0, canvasWidth, drawHeight);

  // Title
  fill('black');
  noStroke();
  textAlign(CENTER, TOP);
  textSize(20);
  text("Bloom's Taxonomy MicroSim Matcher", canvasWidth / 2, 10);

  // Draw the 6 Bloom levels as a horizontal bar
  let barY = 50;
  let barH = 30;
  let barPad = 15;
  let barW = (canvasWidth - barPad * 2) / 6;

  for (let i = 0; i < 6; i++) {
    let bx = barPad + i * barW;
    let c = color(levels[i].color);

    // Highlight current question's correct level subtly
    let q = questions[shuffledOrder[currentQ]];
    if (stage >= 2 && i === q.level) {
      strokeWeight(3);
      stroke(0);
    } else {
      strokeWeight(1);
      stroke(255);
    }
    fill(c);
    rect(bx, barY, barW - 2, barH, 3);

    // Label
    fill(255);
    noStroke();
    textAlign(CENTER, CENTER);
    textSize(max(9, min(12, barW / 5)));
    text(levels[i].name.replace('L' + (i + 1) + ' ', ''), bx + barW / 2 - 1, barY + barH / 2);
  }

  // Arrow labels
  fill(120);
  noStroke();
  textSize(11);
  textAlign(LEFT, TOP);
  text('Lower Order →', barPad, barY + barH + 4);
  textAlign(RIGHT, TOP);
  text('← Higher Order', canvasWidth - barPad, barY + barH + 4);

  // Bloom pyramid hint
  noStroke();
  fill(100);
  textAlign(CENTER, TOP);
  textSize(12);
  text('Classify the learning objective below, then match it to a MicroSim pattern.', canvasWidth / 2, barY + barH + 22);

  // Stage indicator
  let stageText = stage === 1 ? 'Stage 1: Classify the Bloom Level' : stage === 2 ? 'Stage 2: Select the MicroSim Pattern' : 'Review Feedback';
  fill(66, 133, 244);
  textSize(14);
  textAlign(CENTER, BOTTOM);
  text(stageText, canvasWidth / 2, drawHeight - 6);
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
