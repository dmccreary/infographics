// SmartArt Category Gallery
// Identify the eight SmartArt categories by visual thumbnail and name
// Bloom Level: Remember (L1)

let containerWidth;
let canvasWidth = 400;
let drawHeight = 500;
let canvasHeight = drawHeight;
let margin = 15;

let categories = [
  { name: 'List', color: [66, 133, 244], desc: 'Displays non-sequential or grouped information. Use for bullet points, feature lists, or grouped items.',
    subtypes: ['Basic Block List', 'Lined List', 'Vertical Bracket List', 'Horizontal Bullet List'] },
  { name: 'Process', color: [251, 140, 0], desc: 'Shows sequential steps in a process or workflow. Use for timelines, procedures, or step-by-step instructions.',
    subtypes: ['Basic Chevron Process', 'Accent Process', 'Basic Bending Process', 'Repeating Bending Process'] },
  { name: 'Cycle', color: [52, 168, 83], desc: 'Represents a circular or repeating process. Use for life cycles, feedback loops, or seasonal patterns.',
    subtypes: ['Basic Cycle', 'Text Cycle', 'Block Cycle', 'Segmented Cycle'] },
  { name: 'Hierarchy', color: [142, 68, 173], desc: 'Shows organizational or decision structures. Use for org charts, classification trees, or decision hierarchies.',
    subtypes: ['Organization Chart', 'Hierarchy', 'Horizontal Hierarchy', 'Table Hierarchy'] },
  { name: 'Relationship', color: [0, 137, 123], desc: 'Illustrates connections, overlaps, or proportional relationships. Use for Venn diagrams, interlocking ideas, or proportional areas.',
    subtypes: ['Basic Venn', 'Stacked Venn', 'Radial Venn', 'Target Layout'] },
  { name: 'Pyramid', color: [229, 57, 53], desc: 'Shows proportional or hierarchical relationships with the largest component at the bottom. Use for priority levels, food pyramids, or concept hierarchies.',
    subtypes: ['Basic Pyramid', 'Inverted Pyramid', 'Segmented Pyramid'] },
  { name: 'Matrix', color: [63, 81, 181], desc: 'Displays the relationship of four components to a whole. Use for quadrant analysis, comparison grids, or categorization.',
    subtypes: ['Basic Matrix', 'Titled Matrix', 'Grid Matrix'] },
  { name: 'Picture', color: [255, 179, 0], desc: 'Layouts that feature images prominently alongside text. Use for photo galleries, team profiles, or visual showcases.',
    subtypes: ['Framed Text Picture', 'Snapshot Picture List', 'Captioned Pictures', 'Bending Picture Caption'] }
];

let selectedIndex = -1;
let hoverIndex = -1;
let cardWidth, cardHeight, cols, rows;

function setup() {
  updateCanvasSize();
  const canvas = createCanvas(canvasWidth, canvasHeight);
  canvas.parent(document.querySelector('main'));
  buildDetailPanel();
  describe('Gallery of eight SmartArt categories with miniature visual thumbnails. Click a category to see its description and subtypes.');
}

function buildDetailPanel() {
  let mainEl = document.querySelector('main');
  let panel = document.createElement('div');
  panel.id = 'detail-panel';
  panel.style.cssText = 'background: white; border: 1px solid silver; padding: 14px; font-family: Arial, sans-serif; font-size: 14px; min-height: 80px;';
  panel.innerHTML = '<em style="color: #999;">Click a category above to explore its diagram types.</em>';
  mainEl.appendChild(panel);
}

function updateDetailPanel() {
  let panel = document.getElementById('detail-panel');
  if (selectedIndex < 0) {
    panel.innerHTML = '<em style="color: #999;">Click a category above to explore its diagram types.</em>';
    return;
  }
  let cat = categories[selectedIndex];
  let col = 'rgb(' + cat.color.join(',') + ')';
  panel.innerHTML = '<div style="font-size:18px; font-weight:bold; color:' + col + '; margin-bottom:6px;">' + cat.name + '</div>' +
    '<div style="margin-bottom:8px;">' + cat.desc + '</div>' +
    '<div style="font-weight:bold; margin-bottom:4px;">Common Subtypes:</div>' +
    '<ul style="margin:0; padding-left:20px;">' + cat.subtypes.map(function(s) { return '<li>' + s + '</li>'; }).join('') + '</ul>';
}

function draw() {
  updateCanvasSize();
  background(240, 248, 255);

  // Title
  fill('black');
  noStroke();
  textAlign(CENTER, TOP);
  textSize(20);
  text('SmartArt Category Gallery', canvasWidth / 2, 8);

  // Calculate grid layout
  let gridTop = 40;
  let gridPad = 12;
  cols = canvasWidth > 600 ? 4 : 2;
  rows = 8 / cols;
  cardWidth = (canvasWidth - gridPad * (cols + 1)) / cols;
  cardHeight = (drawHeight - gridTop - gridPad * (rows + 1)) / rows;

  // Draw cards
  hoverIndex = -1;
  for (let i = 0; i < 8; i++) {
    let col = i % cols;
    let row = floor(i / cols);
    let cx = gridPad + col * (cardWidth + gridPad);
    let cy = gridTop + gridPad + row * (cardHeight + gridPad);

    // Hit test
    let isHover = mouseX >= cx && mouseX <= cx + cardWidth && mouseY >= cy && mouseY <= cy + cardHeight;
    if (isHover) hoverIndex = i;
    let isSelected = (i === selectedIndex);

    // Card background
    if (isSelected) {
      stroke(categories[i].color[0], categories[i].color[1], categories[i].color[2]);
      strokeWeight(3);
    } else if (isHover) {
      stroke(categories[i].color[0], categories[i].color[1], categories[i].color[2], 150);
      strokeWeight(2);
    } else {
      stroke(200);
      strokeWeight(1);
    }
    fill(isSelected ? 248 : 255);
    rect(cx, cy, cardWidth, cardHeight, 8);

    // Draw thumbnail
    let thumbSize = min(cardWidth - 20, cardHeight - 40);
    let thumbX = cx + cardWidth / 2;
    let thumbY = cy + 10 + thumbSize / 2;
    drawThumbnail(i, thumbX, thumbY, thumbSize);

    // Category name
    noStroke();
    fill(categories[i].color[0], categories[i].color[1], categories[i].color[2]);
    textAlign(CENTER, BOTTOM);
    textSize(max(12, min(15, cardWidth / 7)));
    text(categories[i].name, cx + cardWidth / 2, cy + cardHeight - 5);
  }

  // Cursor
  if (hoverIndex >= 0) cursor(HAND);
  else cursor(ARROW);
}

function drawThumbnail(index, cx, cy, size) {
  let s = size * 0.4;
  let c = categories[index].color;
  fill(c[0], c[1], c[2]);
  noStroke();

  switch (index) {
    case 0: // List - horizontal bars
      for (let i = 0; i < 4; i++) {
        let bw = s * (1.6 - i * 0.15);
        rect(cx - bw / 2, cy - s + i * s * 0.55, bw, s * 0.4, 3);
      }
      break;

    case 1: // Process - boxes with arrows
      for (let i = 0; i < 3; i++) {
        let bx = cx - s * 1.2 + i * s * 1.1;
        fill(c[0], c[1], c[2]);
        rect(bx, cy - s * 0.3, s * 0.6, s * 0.6, 4);
        if (i < 2) {
          fill(c[0], c[1], c[2], 180);
          triangle(bx + s * 0.75, cy, bx + s * 0.95, cy, bx + s * 0.85, cy - s * 0.15);
          triangle(bx + s * 0.75, cy, bx + s * 0.95, cy, bx + s * 0.85, cy + s * 0.15);
        }
      }
      break;

    case 2: // Cycle - circular nodes
      for (let i = 0; i < 4; i++) {
        let angle = -HALF_PI + i * HALF_PI;
        let nx = cx + cos(angle) * s * 0.7;
        let ny = cy + sin(angle) * s * 0.7;
        fill(c[0], c[1], c[2]);
        ellipse(nx, ny, s * 0.45, s * 0.45);
      }
      // Arrows between nodes
      stroke(c[0], c[1], c[2], 150);
      strokeWeight(2);
      noFill();
      arc(cx, cy, s * 1.2, s * 1.2, -QUARTER_PI, QUARTER_PI);
      arc(cx, cy, s * 1.2, s * 1.2, QUARTER_PI + HALF_PI, QUARTER_PI + PI);
      noStroke();
      break;

    case 3: // Hierarchy - tree
      fill(c[0], c[1], c[2]);
      // Root
      rect(cx - s * 0.25, cy - s * 0.9, s * 0.5, s * 0.35, 3);
      // Level 2
      rect(cx - s * 0.8, cy - s * 0.2, s * 0.45, s * 0.3, 3);
      rect(cx + s * 0.35, cy - s * 0.2, s * 0.45, s * 0.3, 3);
      // Level 3
      fill(c[0], c[1], c[2], 180);
      rect(cx - s * 1.0, cy + s * 0.4, s * 0.35, s * 0.25, 2);
      rect(cx - s * 0.5, cy + s * 0.4, s * 0.35, s * 0.25, 2);
      rect(cx + s * 0.2, cy + s * 0.4, s * 0.35, s * 0.25, 2);
      rect(cx + s * 0.7, cy + s * 0.4, s * 0.35, s * 0.25, 2);
      // Lines
      stroke(c[0], c[1], c[2], 120);
      strokeWeight(1.5);
      line(cx, cy - s * 0.55, cx - s * 0.58, cy - s * 0.2);
      line(cx, cy - s * 0.55, cx + s * 0.58, cy - s * 0.2);
      noStroke();
      break;

    case 4: // Relationship - Venn
      fill(c[0], c[1], c[2], 120);
      ellipse(cx - s * 0.3, cy, s * 0.8, s * 0.8);
      ellipse(cx + s * 0.3, cy, s * 0.8, s * 0.8);
      ellipse(cx, cy - s * 0.3, s * 0.8, s * 0.8);
      break;

    case 5: // Pyramid
      fill(c[0], c[1], c[2]);
      triangle(cx, cy - s * 0.8, cx - s * 0.9, cy + s * 0.7, cx + s * 0.9, cy + s * 0.7);
      // Horizontal lines
      stroke(255, 255, 255, 200);
      strokeWeight(2);
      line(cx - s * 0.45, cy - s * 0.1, cx + s * 0.45, cy - s * 0.1);
      line(cx - s * 0.7, cy + s * 0.3, cx + s * 0.7, cy + s * 0.3);
      noStroke();
      break;

    case 6: // Matrix - 2x2 grid
      let gs = s * 0.42;
      let gap = s * 0.08;
      fill(c[0], c[1], c[2]);
      rect(cx - gs - gap / 2, cy - gs - gap / 2, gs, gs, 3);
      fill(c[0], c[1], c[2], 200);
      rect(cx + gap / 2, cy - gs - gap / 2, gs, gs, 3);
      fill(c[0], c[1], c[2], 160);
      rect(cx - gs - gap / 2, cy + gap / 2, gs, gs, 3);
      fill(c[0], c[1], c[2], 120);
      rect(cx + gap / 2, cy + gap / 2, gs, gs, 3);
      break;

    case 7: // Picture - image placeholder with text lines
      fill(c[0], c[1], c[2], 80);
      rect(cx - s * 0.7, cy - s * 0.5, s * 0.8, s * 1.0, 4);
      // Image icon
      fill(c[0], c[1], c[2]);
      ellipse(cx - s * 0.4, cy - s * 0.15, s * 0.3, s * 0.3);
      triangle(cx - s * 0.65, cy + s * 0.35, cx - s * 0.3, cy, cx - s * 0.15, cy + s * 0.35);
      // Text lines
      fill(c[0], c[1], c[2], 160);
      rect(cx + s * 0.2, cy - s * 0.4, s * 0.6, s * 0.15, 2);
      rect(cx + s * 0.2, cy - s * 0.1, s * 0.5, s * 0.15, 2);
      rect(cx + s * 0.2, cy + s * 0.2, s * 0.4, s * 0.15, 2);
      break;
  }
}

function mousePressed() {
  if (hoverIndex >= 0) {
    selectedIndex = (selectedIndex === hoverIndex) ? -1 : hoverIndex;
    updateDetailPanel();
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
