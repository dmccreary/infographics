// AI-Assisted Workflow Evolution Timeline
// Horizontal timeline with 5 eras from 2015-2030
// Bloom Level: Analyze (L4)

let containerWidth;
let canvasWidth = 400;
let drawHeight = 380;
let canvasHeight = drawHeight;

let selectedEra = 2; // Default: LLM-Powered Generation (current-ish)
let showRoleBars = false;
let hoveredEra = -1;

let eras = [
  {
    name: 'Template Era',
    years: '2015-2019',
    startYear: 2015, endYear: 2019,
    color: [128, 90, 213],
    tools: 'Canva, Piktochart, Visme, PowerPoint',
    educatorRole: 'Select template, customize colors/text, arrange elements manually',
    toolRole: 'Provide pre-built layouts and asset libraries',
    timePerInfog: '2-4 hours',
    quality: 'Consistent but generic; limited interactivity',
    limitation: 'No interactivity — output is static images or PDFs only',
    humanEffort: 90,
    aiEffort: 10,
    transition: ''
  },
  {
    name: 'Early AI Assistance',
    years: '2019-2022',
    startYear: 2019, endYear: 2022,
    color: [66, 133, 244],
    tools: 'Flourish, Datawrapper, Observable, GitHub Copilot (preview)',
    educatorRole: 'Provide data, choose visualization type, write descriptions',
    toolRole: 'Auto-generate charts from data, suggest layouts, basic code completion',
    timePerInfog: '1-2 hours',
    quality: 'Data-driven charts with basic interaction (hover, filter)',
    limitation: 'AI assists with data viz but cannot create custom interactive simulations',
    humanEffort: 70,
    aiEffort: 30,
    transition: 'Rise of no-code data visualization platforms'
  },
  {
    name: 'LLM-Powered Generation',
    years: '2022-2025',
    startYear: 2022, endYear: 2025,
    color: [52, 168, 83],
    tools: 'ChatGPT, Claude, GitHub Copilot, Midjourney, DALL-E',
    educatorRole: 'Write prompts, review AI output, correct errors, validate pedagogy',
    toolRole: 'Generate complete code files, create base images, write documentation',
    timePerInfog: '15-30 minutes',
    quality: 'Custom interactive MicroSims with overlay patterns',
    limitation: 'Requires careful review — AI can hallucinate facts or produce misaligned visuals',
    humanEffort: 40,
    aiEffort: 60,
    transition: 'GPT-4 released, enabling reliable code generation'
  },
  {
    name: 'Multimodal AI Agents',
    years: '2025-2027',
    startYear: 2025, endYear: 2027,
    color: [251, 140, 0],
    tools: 'Claude Code, AI agents with tool use, automated testing pipelines',
    educatorRole: 'Define learning objectives, curate and approve AI-generated content',
    toolRole: 'End-to-end generation: spec → image → code → test → deploy',
    timePerInfog: '5-10 minutes',
    quality: 'Production-ready MicroSims with automated quality checks',
    limitation: 'Pedagogical judgment still requires human expertise',
    humanEffort: 25,
    aiEffort: 75,
    transition: 'AI agents gain ability to use tools and iterate autonomously'
  },
  {
    name: 'Autonomous Curriculum',
    years: '2027-2030+',
    startYear: 2027, endYear: 2030,
    color: [0, 150, 136],
    tools: 'AI curriculum designers, adaptive learning systems, automated assessment',
    educatorRole: 'Set learning goals, review AI-designed curricula, focus on mentoring students',
    toolRole: 'Design complete courses with sequenced MicroSims, adaptive paths, and assessments',
    timePerInfog: '1-2 minutes (batch generated)',
    quality: 'Personalized, adaptive interactive content',
    limitation: 'Projected — requires breakthroughs in educational AI alignment',
    humanEffort: 15,
    aiEffort: 85,
    transition: 'AI systems learn to align content with educational standards autonomously'
  }
];

function setup() {
  updateCanvasSize();
  const canvas = createCanvas(canvasWidth, canvasHeight);
  canvas.parent(document.querySelector('main'));
  buildControls();
  describe('Horizontal timeline showing 5 eras of AI-assisted infographic creation from 2015 to 2030 with a We Are Here indicator at 2026.');
}

function buildControls() {
  let mainEl = document.querySelector('main');
  let controlDiv = document.createElement('div');
  controlDiv.id = 'timeline-controls';
  controlDiv.style.cssText = 'background: white; border: 1px solid silver; padding: 12px; font-family: Arial, sans-serif; font-size: 14px;';
  mainEl.appendChild(controlDiv);

  let row = document.createElement('div');
  row.style.cssText = 'display: flex; flex-wrap: wrap; gap: 12px; align-items: center; justify-content: center;';

  let roleToggle = document.createElement('label');
  roleToggle.style.cssText = 'display: flex; align-items: center; gap: 6px; cursor: pointer; padding: 6px 12px; border: 2px solid #FB8C00; border-radius: 6px; font-weight: bold; color: #FB8C00;';
  let cb = document.createElement('input');
  cb.type = 'checkbox';
  cb.style.cssText = 'width: 18px; height: 18px;';
  cb.addEventListener('change', function() {
    showRoleBars = cb.checked;
    roleToggle.style.background = cb.checked ? '#FB8C0015' : 'white';
  });
  roleToggle.appendChild(cb);
  roleToggle.appendChild(document.createTextNode('Show Role Comparison'));
  row.appendChild(roleToggle);

  controlDiv.appendChild(row);

  let detailDiv = document.createElement('div');
  detailDiv.id = 'era-detail';
  detailDiv.style.cssText = 'margin-top: 10px; padding: 10px; background: #f8f9fa; border-radius: 6px; line-height: 1.5; font-size: 14px; color: #333; min-height: 50px;';
  controlDiv.appendChild(detailDiv);
  updateDetail();
}

function updateDetail() {
  let detailDiv = document.getElementById('era-detail');
  if (!detailDiv) return;
  if (selectedEra < 0) {
    detailDiv.innerHTML = '<em>Click an era on the timeline to view details.</em>';
    return;
  }
  let e = eras[selectedEra];
  let isCurrent = (selectedEra === 3);
  detailDiv.innerHTML =
    '<strong style="color:rgb(' + e.color.join(',') + ')">' + e.name + '</strong> (' + e.years + ')' +
    (isCurrent ? ' <span style="background:#FB8C00;color:white;padding:2px 8px;border-radius:3px;font-size:11px">CURRENT ERA</span>' : '') +
    '<br/><strong>Tools:</strong> ' + e.tools +
    '<br/><strong>Educator does:</strong> ' + e.educatorRole +
    '<br/><strong>Tool does:</strong> ' + e.toolRole +
    '<br/><strong>Time per infographic:</strong> ' + e.timePerInfog +
    '<br/><strong>Output quality:</strong> ' + e.quality +
    '<br/><strong>Key limitation:</strong> ' + e.limitation;
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
  text('AI Workflow Evolution', canvasWidth / 2, 8);

  let margin = 40;
  let timelineY = showRoleBars ? 100 : 140;
  let timelineLeft = margin;
  let timelineRight = canvasWidth - margin;
  let timelineW = timelineRight - timelineLeft;

  // Timeline line
  stroke(180);
  strokeWeight(3);
  line(timelineLeft, timelineY, timelineRight, timelineY);

  // Year markers
  let yearStart = 2015;
  let yearEnd = 2030;
  let yearRange = yearEnd - yearStart;

  for (let y = 2015; y <= 2030; y += 5) {
    let x = timelineLeft + ((y - yearStart) / yearRange) * timelineW;
    stroke(180);
    strokeWeight(1);
    line(x, timelineY - 6, x, timelineY + 6);
    fill(120);
    noStroke();
    textAlign(CENTER, TOP);
    textSize(11);
    text(y, x, timelineY + 10);
  }

  // "We Are Here" indicator at 2026
  let hereX = timelineLeft + ((2026 - yearStart) / yearRange) * timelineW;
  let pulse = sin(millis() * 0.004) * 4;
  stroke(229, 57, 53);
  strokeWeight(2);
  line(hereX, timelineY - 25 - pulse, hereX, timelineY + 25);
  fill(229, 57, 53);
  noStroke();
  textAlign(CENTER, BOTTOM);
  textSize(11);
  text('We Are Here', hereX, timelineY - 26 - pulse);
  text('(2026)', hereX, timelineY - 14 - pulse);

  // Era markers
  hoveredEra = -1;
  for (let i = 0; i < eras.length; i++) {
    let e = eras[i];
    let midYear = (e.startYear + e.endYear) / 2;
    let cx = timelineLeft + ((midYear - yearStart) / yearRange) * timelineW;
    let cy = timelineY;

    // Era span line
    let sx = timelineLeft + ((e.startYear - yearStart) / yearRange) * timelineW;
    let ex = timelineLeft + ((e.endYear - yearStart) / yearRange) * timelineW;
    stroke(e.color[0], e.color[1], e.color[2], 80);
    strokeWeight(8);
    line(sx, cy, ex, cy);

    let isHover = dist(mouseX, mouseY, cx, cy) < 20;
    if (isHover) hoveredEra = i;
    let isSelected = (selectedEra === i);

    // Marker circle
    fill(isSelected ? color(e.color[0], e.color[1], e.color[2]) : (isHover ? color(e.color[0], e.color[1], e.color[2], 180) : 255));
    stroke(e.color[0], e.color[1], e.color[2]);
    strokeWeight(isSelected ? 3 : 2);
    ellipse(cx, cy, isSelected ? 22 : 18, isSelected ? 22 : 18);

    if (isSelected) {
      fill(255);
      noStroke();
      textAlign(CENTER, CENTER);
      textSize(12);
      text(i + 1, cx, cy);
    }

    // Era name above
    fill(e.color[0], e.color[1], e.color[2]);
    noStroke();
    textAlign(CENTER, BOTTOM);
    textSize(11);
    let nameY = timelineY - 36;
    if (i % 2 === 1) nameY = timelineY - 48;
    let lines = e.name.split(' ');
    if (lines.length > 2) {
      text(lines.slice(0, 2).join(' '), cx, nameY);
      text(lines.slice(2).join(' '), cx, nameY + 12);
    } else {
      text(e.name, cx, nameY);
    }
  }

  // Role comparison bars
  if (showRoleBars) {
    let barY = timelineY + 34;
    let barW = 60;
    let barH = 14;

    // Legend
    fill(80);
    noStroke();
    textAlign(CENTER, TOP);
    textSize(12);
    text('Human Effort vs AI Effort', canvasWidth / 2, barY);
    barY += 18;

    for (let i = 0; i < eras.length; i++) {
      let e = eras[i];
      let midYear = (e.startYear + e.endYear) / 2;
      let cx = timelineLeft + ((midYear - yearStart) / yearRange) * timelineW;

      let humanW = (e.humanEffort / 100) * barW;
      let aiW = (e.aiEffort / 100) * barW;

      // Human bar
      fill(128, 90, 213, 180);
      noStroke();
      rect(cx - barW / 2, barY, humanW, barH, 2);

      // AI bar
      fill(52, 168, 83, 180);
      rect(cx - barW / 2 + humanW, barY, aiW, barH, 2);

      // Percentage labels
      fill(80);
      textAlign(CENTER, TOP);
      textSize(9);
      text(e.humanEffort + '/' + e.aiEffort, cx, barY + barH + 2);
    }

    // Legend
    let legY = barY + barH + 16;
    fill(128, 90, 213, 180);
    rect(canvasWidth / 2 - 80, legY, 10, 10, 2);
    fill(80);
    noStroke();
    textAlign(LEFT, CENTER);
    textSize(10);
    text('Human', canvasWidth / 2 - 66, legY + 5);
    fill(52, 168, 83, 180);
    rect(canvasWidth / 2 + 10, legY, 10, 10, 2);
    fill(80);
    text('AI', canvasWidth / 2 + 24, legY + 5);
  }

  // Hover instruction
  fill(150);
  noStroke();
  textAlign(CENTER, BOTTOM);
  textSize(14);
  text('Click an era marker for details', canvasWidth / 2, drawHeight - 6);
}

function mousePressed() {
  let margin = 40;
  let timelineLeft = margin;
  let timelineRight = canvasWidth - margin;
  let timelineW = timelineRight - timelineLeft;
  let timelineY = showRoleBars ? 100 : 140;
  let yearStart = 2015;
  let yearRange = 15;

  for (let i = 0; i < eras.length; i++) {
    let midYear = (eras[i].startYear + eras[i].endYear) / 2;
    let cx = timelineLeft + ((midYear - yearStart) / yearRange) * timelineW;
    if (dist(mouseX, mouseY, cx, timelineY) < 22) {
      selectedEra = i;
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
