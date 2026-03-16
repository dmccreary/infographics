// Concept-to-MicroSim Workflow
// 5-stage horizontal pipeline showing AI-assisted workflow
// Bloom Level: Understand (L2)

let containerWidth;
let canvasWidth = 400;
let drawHeight = 400;
let canvasHeight = drawHeight;

let selectedStage = -1;
let showTimeBars = false;

let stages = [
  {
    name: 'Concept\nDefinition',
    badge: 'HUMAN',
    badgeColor: [128, 90, 213],
    color: [128, 90, 213],
    arrow: 'Learning objective + description',
    description: 'The educator defines the learning concept, writes the learning objective, and describes what the MicroSim should demonstrate. This stage requires human pedagogical judgment.',
    inputs: 'Course topic, Bloom\'s taxonomy level, target audience',
    outputs: 'Learning objective statement, MicroSim specification',
    tools: 'Text editor, curriculum planning tools',
    timeAI: '5 min',
    timeManual: '15 min',
    pitfalls: 'Scope creep — trying to teach too many concepts in one MicroSim.'
  },
  {
    name: 'Base Image\nGeneration',
    badge: 'AI + REVIEW',
    badgeColor: [66, 133, 244],
    color: [66, 133, 244],
    arrow: 'Base illustration file',
    description: 'AI generates a base illustration from the concept description. The educator reviews for accuracy, appropriate style, and absence of embedded text (which would interfere with overlays).',
    inputs: 'Learning objective, visual style preferences',
    outputs: 'Base illustration PNG/SVG',
    tools: 'DALL-E, Midjourney, or Stable Diffusion',
    timeAI: '2 min',
    timeManual: '2 hours',
    pitfalls: 'AI-generated images with baked-in text labels that can\'t be removed.'
  },
  {
    name: 'Overlay & Code\nGeneration',
    badge: 'AI + REVIEW',
    badgeColor: [52, 168, 83],
    color: [52, 168, 83],
    arrow: 'Complete MicroSim package',
    description: 'AI generates the interactive overlay code (HTML, CSS, JavaScript) including region definitions, hover behaviors, and information panels. The educator reviews for accuracy and pedagogical fit.',
    inputs: 'Base illustration, region specifications',
    outputs: 'main.html, JavaScript file, index.md, metadata.json',
    tools: 'Claude Code, GitHub Copilot, or similar LLM',
    timeAI: '5 min',
    timeManual: '3 hours',
    pitfalls: 'Generated code with incorrect coordinates or factual errors in descriptions.'
  },
  {
    name: 'Quality\nReview',
    badge: 'HUMAN',
    badgeColor: [251, 140, 0],
    color: [251, 140, 0],
    arrow: 'Approved MicroSim',
    description: 'The educator tests the MicroSim end-to-end: checks factual accuracy, verifies hover regions align with visuals, tests responsiveness, and confirms the learning objective is met.',
    inputs: 'Complete MicroSim package',
    outputs: 'Approved MicroSim (or revision notes)',
    tools: 'Browser DevTools, accessibility checker, peer review',
    timeAI: '5 min',
    timeManual: '30 min',
    pitfalls: 'Skipping review because "AI generated it." Always verify factual accuracy.'
  },
  {
    name: 'Deployment',
    badge: 'AUTOMATED',
    badgeColor: [0, 150, 136],
    color: [0, 150, 136],
    arrow: '',
    description: 'The approved MicroSim is committed to the repository and automatically deployed through the CI/CD pipeline. The iframe is embedded in the chapter page.',
    inputs: 'Approved MicroSim files',
    outputs: 'Live MicroSim on GitHub Pages',
    tools: 'Git, GitHub Actions, MkDocs',
    timeAI: '3 min',
    timeManual: '10 min',
    pitfalls: 'Forgetting to add the iframe to the chapter or update mkdocs.yml navigation.'
  }
];

function setup() {
  updateCanvasSize();
  const canvas = createCanvas(canvasWidth, canvasHeight);
  canvas.parent(document.querySelector('main'));
  buildControls();
  describe('Five-stage horizontal workflow showing the concept-to-MicroSim AI-assisted creation pipeline.');
}

function buildControls() {
  let mainEl = document.querySelector('main');
  let controlDiv = document.createElement('div');
  controlDiv.id = 'workflow-controls';
  controlDiv.style.cssText = 'background: white; border: 1px solid silver; padding: 12px; font-family: Arial, sans-serif; font-size: 14px;';
  mainEl.appendChild(controlDiv);

  let row = document.createElement('div');
  row.style.cssText = 'display: flex; flex-wrap: wrap; gap: 12px; align-items: center; justify-content: center;';

  let timeToggle = document.createElement('label');
  timeToggle.style.cssText = 'display: flex; align-items: center; gap: 6px; cursor: pointer; padding: 6px 12px; border: 2px solid #FB8C00; border-radius: 6px; font-weight: bold; color: #FB8C00;';
  let cb = document.createElement('input');
  cb.type = 'checkbox';
  cb.style.cssText = 'width: 18px; height: 18px;';
  cb.addEventListener('change', function() {
    showTimeBars = cb.checked;
    timeToggle.style.background = cb.checked ? '#FB8C0015' : 'white';
  });
  timeToggle.appendChild(cb);
  timeToggle.appendChild(document.createTextNode('Show Time Comparison'));
  row.appendChild(timeToggle);

  let resetBtn = document.createElement('button');
  resetBtn.textContent = 'Reset';
  resetBtn.style.cssText = 'padding: 6px 14px; font-size: 14px; cursor: pointer; border: 1px solid silver; border-radius: 4px; background: #f0f0f0;';
  resetBtn.addEventListener('click', function() {
    selectedStage = -1;
    updateDetail();
  });
  row.appendChild(resetBtn);

  controlDiv.appendChild(row);

  let detailDiv = document.createElement('div');
  detailDiv.id = 'workflow-detail';
  detailDiv.style.cssText = 'margin-top: 10px; padding: 10px; background: #f8f9fa; border-radius: 6px; line-height: 1.5; font-size: 14px; color: #333; min-height: 50px;';
  detailDiv.innerHTML = '<em>Click a stage to view details about that step in the workflow.</em>';
  controlDiv.appendChild(detailDiv);
}

function updateDetail() {
  let detailDiv = document.getElementById('workflow-detail');
  if (!detailDiv) return;
  if (selectedStage < 0) {
    detailDiv.innerHTML = '<em>Click a stage to view details about that step in the workflow.</em>';
    return;
  }
  let s = stages[selectedStage];
  detailDiv.innerHTML =
    '<strong style="color:rgb(' + s.color.join(',') + ')">' + s.name.replace('\n', ' ') + '</strong> <span style="background:rgb(' + s.badgeColor.join(',') + ');color:white;padding:2px 8px;border-radius:3px;font-size:11px">' + s.badge + '</span>' +
    '<br/>' + s.description +
    '<br/><br/><strong>Inputs:</strong> ' + s.inputs +
    '<br/><strong>Outputs:</strong> ' + s.outputs +
    '<br/><strong>Tools:</strong> ' + s.tools +
    '<br/><strong>Time (AI-assisted):</strong> ' + s.timeAI + ' &nbsp;|&nbsp; <strong>Time (manual):</strong> ' + s.timeManual +
    '<br/><strong>Common pitfall:</strong> ' + s.pitfalls;
}

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
  textSize(18);
  text('Concept-to-MicroSim Workflow', canvasWidth / 2, 8);

  let margin = 20;
  let stageW = (canvasWidth - margin * 2 - 30 * 4) / 5;
  stageW = min(stageW, 120);
  let totalW = stageW * 5 + 30 * 4;
  let startX = (canvasWidth - totalW) / 2;
  let stageH = showTimeBars ? 100 : 120;
  let stageY = 40;

  for (let i = 0; i < stages.length; i++) {
    let s = stages[i];
    let sx = startX + i * (stageW + 30);

    // Arrow between stages
    if (i > 0) {
      let ax = sx - 30;
      stroke(180);
      strokeWeight(2);
      line(ax + 4, stageY + stageH / 2, ax + 26, stageY + stageH / 2);
      fill(180);
      noStroke();
      triangle(ax + 26, stageY + stageH / 2, ax + 20, stageY + stageH / 2 - 5, ax + 20, stageY + stageH / 2 + 5);

      // Arrow label
      if (s.arrow) {
        fill(120);
        textAlign(CENTER, TOP);
        textSize(9);
        let words = stages[i - 1].arrow.split(' ');
        let line1 = '', line2 = '';
        for (let w = 0; w < words.length; w++) {
          if (textWidth(line1 + words[w]) < 50) line1 += words[w] + ' ';
          else line2 += words[w] + ' ';
        }
      }
    }

    let isHover = mouseX > sx && mouseX < sx + stageW && mouseY > stageY && mouseY < stageY + stageH;
    let isSelected = (selectedStage === i);

    // Stage box
    fill(isSelected ? color(s.color[0], s.color[1], s.color[2], 30) : (isHover ? 250 : 255));
    stroke(s.color[0], s.color[1], s.color[2]);
    strokeWeight(isSelected ? 3 : isHover ? 2 : 1.5);
    rect(sx, stageY, stageW, stageH, 8);

    // Stage number circle
    fill(s.color[0], s.color[1], s.color[2]);
    noStroke();
    ellipse(sx + stageW / 2, stageY + 20, 24, 24);
    fill(255);
    textAlign(CENTER, CENTER);
    textSize(14);
    text(i + 1, sx + stageW / 2, stageY + 20);

    // Stage name
    fill(s.color[0], s.color[1], s.color[2]);
    textAlign(CENTER, TOP);
    textSize(12);
    noStroke();
    let lines = s.name.split('\n');
    for (let l = 0; l < lines.length; l++) {
      text(lines[l], sx + stageW / 2, stageY + 36 + l * 14);
    }

    // Badge
    let badgeW = textWidth(s.badge) + 12;
    fill(s.badgeColor[0], s.badgeColor[1], s.badgeColor[2], 200);
    noStroke();
    rect(sx + (stageW - badgeW) / 2, stageY + stageH - 22, badgeW, 16, 3);
    fill(255);
    textAlign(CENTER, CENTER);
    textSize(9);
    text(s.badge, sx + stageW / 2, stageY + stageH - 14);
  }

  // Time comparison bars
  if (showTimeBars) {
    let barY = stageY + stageH + 20;
    let barH = 14;
    let maxTime = 180; // 3 hours in minutes
    let aiTimes = [5, 2, 5, 5, 3];
    let manTimes = [15, 120, 180, 30, 10];

    fill(80);
    noStroke();
    textAlign(CENTER, TOP);
    textSize(14);
    text('Time Comparison: AI-Assisted vs Manual', canvasWidth / 2, barY - 4);

    barY += 18;

    for (let i = 0; i < stages.length; i++) {
      let sx = startX + i * (stageW + 30);

      // AI bar (green)
      let aiW = (aiTimes[i] / maxTime) * stageW;
      fill(52, 168, 83, 180);
      noStroke();
      rect(sx, barY, max(aiW, 4), barH, 2);

      // Manual bar (red)
      let manW = (manTimes[i] / maxTime) * stageW;
      fill(229, 57, 53, 180);
      rect(sx, barY + barH + 2, max(manW, 4), barH, 2);

      // Labels
      fill(80);
      textAlign(CENTER, TOP);
      textSize(9);
      text(stages[i].timeAI, sx + stageW / 2, barY + barH * 2 + 6);
      text('vs ' + stages[i].timeManual, sx + stageW / 2, barY + barH * 2 + 16);
    }

    // Legend
    let legY = barY + barH * 2 + 32;
    fill(52, 168, 83, 180);
    noStroke();
    rect(canvasWidth / 2 - 100, legY, 12, 12, 2);
    fill(80);
    textAlign(LEFT, CENTER);
    textSize(11);
    text('AI-Assisted', canvasWidth / 2 - 84, legY + 6);
    fill(229, 57, 53, 180);
    noStroke();
    rect(canvasWidth / 2 + 10, legY, 12, 12, 2);
    fill(80);
    text('Manual', canvasWidth / 2 + 26, legY + 6);
  }

  // Hover instruction
  fill(150);
  noStroke();
  textAlign(CENTER, BOTTOM);
  textSize(14);
  text('Click a stage for details', canvasWidth / 2, drawHeight - 6);
}

function mousePressed() {
  let margin = 20;
  let stageW = (canvasWidth - margin * 2 - 30 * 4) / 5;
  stageW = min(stageW, 120);
  let totalW = stageW * 5 + 30 * 4;
  let startX = (canvasWidth - totalW) / 2;
  let stageH = showTimeBars ? 100 : 120;
  let stageY = 40;

  for (let i = 0; i < stages.length; i++) {
    let sx = startX + i * (stageW + 30);
    if (mouseX > sx && mouseX < sx + stageW && mouseY > stageY && mouseY < stageY + stageH) {
      selectedStage = i;
      updateDetail();
      return;
    }
  }
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
