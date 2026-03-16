// CI/CD Deployment Pipeline
// Step-through vertical pipeline with 6 stages
// Bloom Level: Understand (L2)

let containerWidth;
let canvasWidth = 400;
let drawHeight = 450;
let canvasHeight = drawHeight;

let selectedStage = -1;
let animating = false;
let animStage = -1;
let animTimer = 0;
let stageStates = []; // 'pending', 'running', 'complete'

let stages = [
  {
    name: 'Content Change',
    icon: 'pencil',
    color: [128, 90, 213],
    summary: 'Author edits Chapter 13 index.md',
    description: 'An author modifies a chapter file in their local repository. This could be fixing a typo, adding a new section, or updating a MicroSim iframe.',
    commands: 'vim docs/chapters/13-advanced/index.md\n# (make edits and save)',
    output: 'File modified locally.',
    time: '0s',
    pitfall: 'Forgetting to save the file, or editing the wrong branch.'
  },
  {
    name: 'Git Commit & Push',
    icon: 'branch',
    color: [66, 133, 244],
    summary: 'git add, git commit, git push origin main',
    commands: 'git add docs/chapters/13-advanced/index.md\ngit commit -m "Update chapter 13 content"\ngit push origin main',
    description: 'The author stages the changed files, creates a commit with a descriptive message, and pushes to the remote repository on GitHub.',
    output: 'Enumerating objects: 5, done.\nTo github.com:user/textbook.git\n   abc1234..def5678  main -> main',
    time: '15s',
    pitfall: 'Push rejected if remote has newer commits. Fix with git pull --rebase first.'
  },
  {
    name: 'GitHub Actions Trigger',
    icon: 'play',
    color: [52, 168, 83],
    summary: 'Workflow .github/workflows/deploy.yml fires',
    description: 'GitHub detects the push to main and triggers the deploy workflow defined in .github/workflows/deploy.yml. A runner machine is allocated to execute the workflow steps.',
    commands: '# Automatic — triggered by push to main\n# Defined in .github/workflows/deploy.yml',
    output: 'Run triggered: Deploy MkDocs site\nRunner: ubuntu-latest\nStatus: In progress...',
    time: '30s',
    pitfall: 'Workflow file has a syntax error or wrong branch trigger. Check the Actions tab on GitHub.'
  },
  {
    name: 'MkDocs Build',
    icon: 'gear',
    color: [251, 140, 0],
    summary: 'mkdocs build generates static HTML site',
    description: 'The GitHub Actions runner installs Python, pip installs mkdocs-material and plugins, then runs mkdocs build to convert all Markdown files into a static HTML site.',
    commands: 'pip install mkdocs-material\nmkdocs build --strict',
    output: 'INFO - Building documentation...\nINFO - Documentation built in 2.34 seconds\nINFO - 47 pages built',
    time: '2m',
    pitfall: 'Build fails due to broken links, missing images, or YAML syntax errors in mkdocs.yml.'
  },
  {
    name: 'Deploy to gh-pages',
    icon: 'upload',
    color: [0, 150, 136],
    summary: 'Built site pushed to gh-pages branch',
    description: 'The built site directory is pushed to the gh-pages branch using the peaceiris/actions-gh-pages action. GitHub Pages serves content from this branch.',
    commands: '# Handled by GitHub Action:\n# peaceiris/actions-gh-pages@v3\n#   publish_dir: ./site',
    output: 'Deploying to gh-pages branch...\nDeployment successful.',
    time: '2m 30s',
    pitfall: 'gh-pages branch not configured as the source in repo Settings > Pages.'
  },
  {
    name: 'Live on GitHub Pages',
    icon: 'globe',
    color: [52, 168, 83],
    summary: 'https://username.github.io/textbook/ updated',
    description: 'The site is now live and accessible to all students. Changes typically appear within 1-2 minutes of the deployment completing. CDN caching may cause brief delays.',
    commands: '# No commands needed — automatic!\n# Visit: https://username.github.io/textbook/',
    output: 'Site live at:\nhttps://username.github.io/textbook/\nChapter 13 changes visible.',
    time: '3m',
    pitfall: 'Browser cache showing old content. Try hard refresh (Ctrl+Shift+R) or incognito mode.'
  }
];

function setup() {
  updateCanvasSize();
  const canvas = createCanvas(canvasWidth, canvasHeight);
  canvas.parent(document.querySelector('main'));
  resetStates();
  buildControls();
  describe('Vertical pipeline diagram showing 6 stages of CI/CD deployment from content change to live site.');
}

function resetStates() {
  stageStates = [];
  for (let i = 0; i < stages.length; i++) stageStates.push('pending');
  animating = false;
  animStage = -1;
}

function buildControls() {
  let mainEl = document.querySelector('main');
  let controlDiv = document.createElement('div');
  controlDiv.id = 'pipeline-controls';
  controlDiv.style.cssText = 'background: white; border: 1px solid silver; padding: 12px; font-family: Arial, sans-serif; font-size: 14px;';
  mainEl.appendChild(controlDiv);

  let row = document.createElement('div');
  row.style.cssText = 'display: flex; flex-wrap: wrap; gap: 12px; align-items: center; justify-content: center;';

  let animBtn = document.createElement('button');
  animBtn.textContent = 'Animate Pipeline';
  animBtn.style.cssText = 'padding: 8px 16px; font-size: 14px; cursor: pointer; border: 1px solid #4285F4; border-radius: 4px; background: #4285F4; color: white; font-weight: bold;';
  animBtn.addEventListener('click', function() {
    resetStates();
    animating = true;
    animStage = 0;
    animTimer = millis();
    stageStates[0] = 'running';
    selectedStage = 0;
    updateDetail();
  });
  row.appendChild(animBtn);

  let resetBtn = document.createElement('button');
  resetBtn.textContent = 'Reset';
  resetBtn.style.cssText = 'padding: 8px 16px; font-size: 14px; cursor: pointer; border: 1px solid silver; border-radius: 4px; background: #f0f0f0;';
  resetBtn.addEventListener('click', function() {
    resetStates();
    selectedStage = -1;
    updateDetail();
  });
  row.appendChild(resetBtn);

  controlDiv.appendChild(row);

  let detailDiv = document.createElement('div');
  detailDiv.id = 'stage-detail';
  detailDiv.style.cssText = 'margin-top: 10px; padding: 10px; background: #f8f9fa; border-radius: 6px; line-height: 1.5; font-size: 14px; color: #333; min-height: 60px;';
  detailDiv.innerHTML = '<em>Click a stage or press Animate Pipeline to begin.</em>';
  controlDiv.appendChild(detailDiv);
}

function updateDetail() {
  let detailDiv = document.getElementById('stage-detail');
  if (!detailDiv) return;
  if (selectedStage < 0) {
    detailDiv.innerHTML = '<em>Click a stage or press Animate Pipeline to begin.</em>';
    return;
  }
  let s = stages[selectedStage];
  detailDiv.innerHTML =
    '<strong style="color:rgb(' + s.color.join(',') + ')">' + s.name + '</strong> — ' + s.description +
    '<br/><br/><strong>Commands:</strong><pre style="background:#1e1e1e;color:#d4d4d4;padding:8px;border-radius:4px;font-size:12px;overflow-x:auto;margin:4px 0">' + s.commands + '</pre>' +
    '<strong>Output:</strong><pre style="background:#1e1e1e;color:#4ec9b0;padding:8px;border-radius:4px;font-size:12px;overflow-x:auto;margin:4px 0">' + s.output + '</pre>' +
    '<strong>Time elapsed:</strong> ' + s.time +
    ' &nbsp;|&nbsp; <strong>Common pitfall:</strong> ' + s.pitfall;
}

function draw() {
  updateCanvasSize();

  // Animation logic
  if (animating && animStage >= 0 && animStage < stages.length) {
    if (millis() - animTimer > 2000) {
      stageStates[animStage] = 'complete';
      animStage++;
      if (animStage < stages.length) {
        stageStates[animStage] = 'running';
        selectedStage = animStage;
        updateDetail();
      } else {
        animating = false;
      }
      animTimer = millis();
    }
  }

  fill('aliceblue');
  stroke('silver');
  strokeWeight(1);
  rect(0, 0, canvasWidth, drawHeight);

  // Title
  fill('black');
  noStroke();
  textAlign(CENTER, TOP);
  textSize(18);
  text('CI/CD Deployment Pipeline', canvasWidth / 2, 8);

  let stageH = 52;
  let gap = 10;
  let totalH = stages.length * stageH + (stages.length - 1) * gap;
  let startY = 38 + (drawHeight - 38 - totalH) / 2;
  let boxW = min(canvasWidth - 40, 360);
  let boxX = (canvasWidth - boxW) / 2;

  for (let i = 0; i < stages.length; i++) {
    let s = stages[i];
    let by = startY + i * (stageH + gap);

    // Connector arrow
    if (i > 0) {
      let ay = by - gap;
      stroke(180);
      strokeWeight(2);
      line(canvasWidth / 2, ay - 2, canvasWidth / 2, ay + gap + 2);
      // arrowhead
      fill(180);
      noStroke();
      triangle(canvasWidth / 2, ay + gap + 2, canvasWidth / 2 - 5, ay + gap - 4, canvasWidth / 2 + 5, ay + gap - 4);
    }

    let isHover = mouseX > boxX && mouseX < boxX + boxW && mouseY > by && mouseY < by + stageH;
    let isSelected = (selectedStage === i);
    let state = stageStates[i];

    // Box
    let c = s.color;
    if (state === 'complete') {
      fill(c[0], c[1], c[2], 30);
      stroke(c[0], c[1], c[2]);
    } else if (state === 'running') {
      let pulse = sin(millis() * 0.005) * 20 + 40;
      fill(c[0], c[1], c[2], pulse);
      stroke(c[0], c[1], c[2]);
    } else {
      fill(isHover || isSelected ? 245 : 255);
      stroke(isHover || isSelected ? color(c[0], c[1], c[2]) : '#ccc');
    }
    strokeWeight(isSelected ? 3 : isHover ? 2 : 1);
    rect(boxX, by, boxW, stageH, 8);

    // Status indicator
    let indX = boxX + 22;
    let indY = by + stageH / 2;
    noStroke();
    if (state === 'complete') {
      fill(52, 168, 83);
      ellipse(indX, indY, 18, 18);
      fill(255);
      textAlign(CENTER, CENTER);
      textSize(12);
      text('✓', indX, indY);
    } else if (state === 'running') {
      let angle = millis() * 0.003;
      stroke(c[0], c[1], c[2]);
      strokeWeight(2.5);
      noFill();
      arc(indX, indY, 16, 16, angle, angle + PI * 1.5);
    } else {
      fill(220);
      ellipse(indX, indY, 18, 18);
    }

    // Stage name and summary
    noStroke();
    fill(c[0], c[1], c[2]);
    textAlign(LEFT, TOP);
    textSize(15);
    text(s.name, boxX + 40, by + 8);
    fill(100);
    textSize(12);
    text(s.summary, boxX + 40, by + 28);

    // Stage number
    fill(180);
    textAlign(RIGHT, CENTER);
    textSize(12);
    text(i + 1, boxX + boxW - 12, by + stageH / 2);
  }

  // Click detection
  if (mouseIsPressed) {
    for (let i = 0; i < stages.length; i++) {
      let by = startY + i * (stageH + gap);
      if (mouseX > boxX && mouseX < boxX + boxW && mouseY > by && mouseY < by + stageH) {
        if (selectedStage !== i) {
          selectedStage = i;
          updateDetail();
        }
      }
    }
  }
}

function mousePressed() {
  let stageH = 52;
  let gap = 10;
  let totalH = stages.length * stageH + (stages.length - 1) * gap;
  let startY = 38 + (drawHeight - 38 - totalH) / 2;
  let boxW = min(canvasWidth - 40, 360);
  let boxX = (canvasWidth - boxW) / 2;
  for (let i = 0; i < stages.length; i++) {
    let by = startY + i * (stageH + gap);
    if (mouseX > boxX && mouseX < boxX + boxW && mouseY > by && mouseY < by + stageH) {
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
