// Chart Type Gallery - Interactive gallery of 14 chart types
// Uses Chart.js for standard charts, canvas for non-standard types

const CHART_DATA = [
    {
        id: 'bar', name: 'Bar Chart', library: 'Chart.js', category: 'chartjs',
        bestFor: 'Comparing discrete categories or groups side by side.',
        dataShape: 'One categorical axis, one numerical axis. Each bar represents one value per category.',
        example: 'Comparing average test scores across five schools in a district.',
        tip: 'Avoid bar charts when you have more than 15 categories — consider a horizontal bar or grouped layout instead.'
    },
    {
        id: 'stacked-bar', name: 'Stacked Bar Chart', library: 'Chart.js', category: 'chartjs',
        bestFor: 'Showing part-to-whole relationships across categories.',
        dataShape: 'Multiple numerical series stacked on a categorical axis. Each segment is a sub-category.',
        example: 'Showing how each department contributes to total school spending per quarter.',
        tip: 'Avoid when the middle segments are the focus — they are hard to compare without a common baseline.'
    },
    {
        id: 'line', name: 'Line Chart', library: 'Chart.js', category: 'chartjs',
        bestFor: 'Displaying trends and changes over a continuous interval (usually time).',
        dataShape: 'Ordered x-axis (dates or sequence) with numerical y-values connected by lines.',
        example: 'Tracking daily attendance rates across a semester to spot patterns.',
        tip: 'Do not use for categorical data with no natural order — a bar chart is better in that case.'
    },
    {
        id: 'area', name: 'Area Chart', library: 'Chart.js', category: 'chartjs',
        bestFor: 'Emphasizing volume or magnitude of change over time.',
        dataShape: 'Same as line chart but with the region below the line filled with color.',
        example: 'Showing cumulative enrollment growth across three programs over five years.',
        tip: 'Overlapping areas can obscure data — use transparency or stacked areas when series overlap heavily.'
    },
    {
        id: 'pie', name: 'Pie Chart', library: 'Chart.js', category: 'chartjs',
        bestFor: 'Showing proportions of a whole when there are few categories (2-6).',
        dataShape: 'A single series of values that sum to 100%. Each slice is one category.',
        example: 'Displaying the percentage breakdown of a school budget by category.',
        tip: 'Never use with more than 6 slices — humans cannot accurately compare angles beyond that.'
    },
    {
        id: 'donut', name: 'Donut Chart', library: 'Chart.js', category: 'chartjs',
        bestFor: 'Same as pie chart but with space in the center for a summary label or value.',
        dataShape: 'A single series of proportional values with a hollow center.',
        example: 'Showing course completion rate with "78% Complete" displayed in the center.',
        tip: 'Avoid when precise slice comparison matters — the removed center makes angle judgment even harder.'
    },
    {
        id: 'scatter', name: 'Scatter Plot', library: 'Chart.js', category: 'chartjs',
        bestFor: 'Revealing correlations and clusters between two numerical variables.',
        dataShape: 'Pairs of (x, y) values. Each point represents one observation.',
        example: 'Plotting study hours vs. exam scores for 200 students to find the correlation.',
        tip: 'Not useful for categorical data — both axes must be numerical for a scatter plot to work.'
    },
    {
        id: 'histogram', name: 'Histogram', library: 'Chart.js', category: 'chartjs',
        bestFor: 'Showing the frequency distribution of a single numerical variable.',
        dataShape: 'Continuous data grouped into bins (ranges). Bar height shows count per bin.',
        example: 'Displaying the distribution of student ages in a community college.',
        tip: 'Do not confuse with a bar chart — histograms have no gaps because the x-axis is continuous.'
    },
    {
        id: 'treemap', name: 'Treemap', library: 'D3.js', category: 'd3',
        bestFor: 'Showing hierarchical data as nested rectangles sized by value.',
        dataShape: 'Tree structure with parent-child relationships and a size metric at each leaf.',
        example: 'Visualizing school district budget allocation with nested departments and line items.',
        tip: 'Avoid for time-series data — treemaps show a snapshot, not a trend.'
    },
    {
        id: 'sankey', name: 'Sankey Diagram', library: 'D3.js', category: 'd3',
        bestFor: 'Showing flows and transfers between stages or categories.',
        dataShape: 'Source-target-value triples. Width of each flow band represents magnitude.',
        example: 'Mapping how students flow from freshman courses through graduation pathways.',
        tip: 'Becomes unreadable with too many nodes — limit to 10-15 nodes maximum.'
    },
    {
        id: 'chord', name: 'Chord Diagram', library: 'D3.js', category: 'd3',
        bestFor: 'Showing inter-relationships and flows between groups in a matrix.',
        dataShape: 'A square matrix where cell (i,j) represents the flow from group i to group j.',
        example: 'Showing collaboration frequency between academic departments in a university.',
        tip: 'Difficult to read with more than 8 groups — use a Sankey or heatmap for larger datasets.'
    },
    {
        id: 'wordcloud', name: 'Word Cloud', library: 'D3.js', category: 'd3',
        bestFor: 'Showing relative frequency or importance of terms in a text corpus.',
        dataShape: 'List of words with associated weight/frequency values. Larger words appear more prominent.',
        example: 'Displaying the most common themes from 500 student course evaluations.',
        tip: 'Word clouds are imprecise — do not use when exact comparisons between word frequencies matter.'
    },
    {
        id: 'gauge', name: 'Gauge Chart', library: 'Other', category: 'other',
        bestFor: 'Showing a single metric against a target or scale (like a speedometer).',
        dataShape: 'One numerical value with defined minimum, maximum, and optional target zones.',
        example: 'Displaying current course completion percentage against a 90% target.',
        tip: 'Only useful for a single KPI — do not stack multiple gauges when a bar chart would work better.'
    },
    {
        id: 'sparkline', name: 'Sparkline', library: 'Other', category: 'other',
        bestFor: 'Embedding tiny trend indicators inline with text or in table cells.',
        dataShape: 'A short series of values (10-50 points) rendered as a minimal line with no axes.',
        example: 'Showing weekly quiz score trends next to each student name in a gradebook table.',
        tip: 'Sparklines sacrifice precision for context — do not use when the reader needs to read exact values.'
    }
];

// Color palette
const COLORS = {
    blue: 'rgba(54, 162, 235, 0.8)',
    red: 'rgba(255, 99, 132, 0.8)',
    green: 'rgba(75, 192, 192, 0.8)',
    orange: 'rgba(255, 159, 64, 0.8)',
    purple: 'rgba(153, 102, 255, 0.8)',
    yellow: 'rgba(255, 206, 86, 0.8)',
    pink: 'rgba(255, 99, 171, 0.8)',
    teal: 'rgba(0, 150, 136, 0.8)'
};

let selectedChart = null;
let quizMode = false;
let quizScore = 0;
let quizAttempts = 0;
let activeFilter = 'all';
let chartInstances = {};
let quizAnswered = new Set();

document.addEventListener('DOMContentLoaded', function() {
    const main = document.querySelector('main');
    main.innerHTML = buildHTML();
    renderAllThumbnails();
    selectChart(CHART_DATA[0]);
});

function buildHTML() {
    return `
    <div id="gallery-container" style="max-width:900px; margin:0 auto; padding:4px 8px;">
        <div id="controls" style="display:flex; flex-wrap:wrap; gap:6px; align-items:center; margin-bottom:10px;">
            <button class="filter-btn active" data-filter="all" onclick="setFilter('all')">All</button>
            <button class="filter-btn" data-filter="chartjs" onclick="setFilter('chartjs')">Chart.js</button>
            <button class="filter-btn" data-filter="d3" onclick="setFilter('d3')">D3.js</button>
            <button class="filter-btn" data-filter="other" onclick="setFilter('other')">Other</button>
            <span style="flex-grow:1"></span>
            <button id="quiz-btn" class="quiz-btn" onclick="toggleQuizMode()">Quiz Mode</button>
            <span id="quiz-score" style="display:none; font-size:14px; font-weight:bold; color:#333;"></span>
        </div>
        <div id="grid" style="display:grid; grid-template-columns:repeat(4,1fr); gap:6px; position:relative;">
            ${CHART_DATA.map(c => buildThumbnailCard(c)).join('')}
            <div id="info-panel" class="info-popover" style="display:none;"></div>
        </div>
    </div>
    <style>
        .filter-btn {
            padding: 5px 14px; font-size: 13px; cursor: pointer;
            border: 1px solid #2196F3; background: white; color: #2196F3;
            border-radius: 4px; transition: all 0.2s;
        }
        .filter-btn.active, .filter-btn:hover {
            background: #2196F3; color: white;
        }
        .quiz-btn {
            padding: 5px 14px; font-size: 13px; cursor: pointer;
            border: 1px solid #FF9800; background: white; color: #FF9800;
            border-radius: 4px; transition: all 0.2s;
        }
        .quiz-btn.active {
            background: #FF9800; color: white;
        }
        .thumb-card {
            background: white; border: 2px solid #e0e0e0; border-radius: 6px;
            cursor: pointer; transition: border-color 0.2s, box-shadow 0.2s;
            overflow: hidden; display: flex; flex-direction: column;
        }
        .thumb-card:hover { border-color: #90CAF9; box-shadow: 0 2px 8px rgba(33,150,243,0.15); }
        .thumb-card.selected { border-color: #2196F3; box-shadow: 0 2px 8px rgba(33,150,243,0.3); }
        .thumb-card.quiz-highlight { border: 3px solid #FF9800; box-shadow: 0 2px 12px rgba(255,152,0,0.4); }
        .thumb-card.quiz-correct { border: 3px solid #4CAF50; box-shadow: 0 2px 12px rgba(76,175,80,0.4); }
        .thumb-card.quiz-wrong { border: 3px solid #D32F2F; box-shadow: 0 2px 12px rgba(211,47,47,0.4); }
        .thumb-card.hidden { display: none; }
        .thumb-canvas-wrap { width: 100%; height: 120px; position: relative; background: #fafafa; overflow: hidden; }
        .thumb-canvas-wrap canvas { display: block; width: 100% !important; height: 120px !important; }
        .thumb-label {
            text-align: center; font-size: 12px; font-weight: 600; padding: 4px 2px;
            color: #333; white-space: nowrap; overflow: hidden; text-overflow: ellipsis;
        }
        .thumb-label.quiz-hidden { color: transparent; }
        .lib-badge {
            position: absolute; top: 3px; right: 3px; font-size: 9px; padding: 1px 5px;
            border-radius: 3px; color: white; font-weight: bold;
        }
        .lib-chartjs { background: #FF6384; }
        .lib-d3 { background: #F68E1E; }
        .lib-other { background: #9966FF; }
        .info-popover {
            position: absolute; z-index: 10;
            background: white; border: 2px solid #2196F3; border-radius: 6px;
            padding: 10px 14px; width: 340px; max-width: 90vw;
            box-shadow: 0 4px 16px rgba(33,150,243,0.25);
            font-size: 13px; line-height: 1.4;
        }
        .info-popover h3 { margin: 0 0 4px 0; color: #1565C0; font-size: 15px; }
        .info-popover p { margin: 0 0 3px 0; }
        .info-popover .tip-text { color: #E65100; }
        .info-popover .close-btn {
            position: absolute; top: 4px; right: 8px; cursor: pointer;
            font-size: 16px; color: #999; background: none; border: none; line-height: 1;
        }
        .info-popover .close-btn:hover { color: #333; }
        @media (max-width: 700px) {
            #grid { grid-template-columns: repeat(3, 1fr) !important; }
            .info-popover { width: 280px; }
        }
        @media (max-width: 480px) {
            #grid { grid-template-columns: repeat(2, 1fr) !important; }
            .info-popover { width: 240px; }
        }
        .star-particle {
            position: fixed; z-index: 100; pointer-events: none;
            font-size: 28px; color: #FFD700;
            animation: starRise 0.8s ease-out forwards;
            text-shadow: 0 0 6px rgba(255,215,0,0.6);
        }
        @keyframes starRise {
            0% { opacity: 1; transform: translateY(0) scale(0.5); }
            60% { opacity: 1; transform: translateY(-60px) scale(1.2); }
            100% { opacity: 0; transform: translateY(-100px) scale(0.8); }
        }
        .confetti-particle {
            position: fixed; top: -10px; z-index: 100; pointer-events: none;
            width: 10px; height: 10px; border-radius: 2px;
            animation: confettiFall 2s ease-in forwards;
        }
        @keyframes confettiFall {
            0% { opacity: 1; transform: translateY(0) rotate(0deg); }
            100% { opacity: 0; transform: translateY(100vh) rotate(720deg); }
        }
    </style>`;
}

function buildThumbnailCard(chart) {
    const libClass = chart.category === 'chartjs' ? 'lib-chartjs' : chart.category === 'd3' ? 'lib-d3' : 'lib-other';
    return `
    <div class="thumb-card" id="card-${chart.id}" data-category="${chart.category}" onclick="selectChart(CHART_DATA.find(c=>c.id==='${chart.id}'))">
        <div class="thumb-canvas-wrap">
            <canvas id="thumb-${chart.id}"></canvas>
            <span class="lib-badge ${libClass}">${chart.library}</span>
        </div>
        <div class="thumb-label" id="label-${chart.id}">${chart.name}</div>
    </div>`;
}

function selectChart(chart) {
    if (!chart) return;
    selectedChart = chart;
    const panel = document.getElementById('info-panel');
    const card = document.getElementById('card-' + chart.id);
    const grid = document.getElementById('grid');

    // Update selection highlight
    document.querySelectorAll('.thumb-card').forEach(el => el.classList.remove('selected'));
    if (card) card.classList.add('selected');

    if (quizMode) {
        // Build shuffled options for dropdown
        const options = CHART_DATA.map(c => c.name).sort();
        panel.innerHTML = `<button class="close-btn" onclick="closeInfoPanel()">&times;</button>
            <p style="margin:0 0 6px 0; font-weight:bold; font-size:13px;">What chart type is this?</p>
            <select id="quiz-select" style="font-size:14px; padding:4px 8px; width:100%; border:1px solid #ccc; border-radius:4px;" onchange="checkQuizAnswer()">
                <option value="">-- Select chart type --</option>
                ${options.map(n => `<option value="${n}">${n}</option>`).join('')}
            </select>
            <div id="quiz-feedback" style="margin-top:6px; font-size:13px; min-height:18px;"></div>`;
        card.classList.add('quiz-highlight');
    } else {
        panel.innerHTML = `<button class="close-btn" onclick="closeInfoPanel()">&times;</button>
            <h3>${chart.name} <span style="font-size:11px; color:#888; font-weight:normal;">(${chart.library})</span></h3>
            <p><strong>Best for:</strong> ${chart.bestFor}</p>
            <p><strong>Data shape:</strong> ${chart.dataShape}</p>
            <p><strong>Example:</strong> ${chart.example}</p>
            <p class="tip-text"><strong>Tip:</strong> ${chart.tip}</p>`;
    }

    panel.style.display = 'block';
    panel.style.transform = 'none';
    positionInfoPanel(card, panel, grid);
}

function closeInfoPanel() {
    document.getElementById('info-panel').style.display = 'none';
    document.querySelectorAll('.thumb-card').forEach(el => {
        el.classList.remove('selected');
        el.classList.remove('quiz-highlight');
    });
    selectedChart = null;
}

function positionInfoPanel(card, panel, grid) {
    if (!card || !panel || !grid) return;

    const gridRect = grid.getBoundingClientRect();
    const cardRect = card.getBoundingClientRect();

    // Determine column position (0-based) relative to visible cards
    const gridLeft = gridRect.left;
    const gridWidth = gridRect.width;
    const cardCenterX = cardRect.left + cardRect.width / 2 - gridLeft;
    const colFraction = cardCenterX / gridWidth;

    // Determine if this is the last row by checking if card bottom is near grid bottom
    const isBottomRow = (gridRect.bottom - cardRect.bottom) < 20;

    // Calculate top position relative to grid
    const cardTop = cardRect.top - gridRect.top;
    const cardBottom = cardRect.bottom - gridRect.top;

    // Vertical: above for bottom row, below otherwise
    if (isBottomRow) {
        // Show panel first to measure its height, then position above
        panel.style.top = 'auto';
        panel.style.bottom = 'auto';
        panel.style.visibility = 'hidden';
        panel.style.top = '0px';
        const panelHeight = panel.offsetHeight;
        panel.style.top = (cardTop - panelHeight - 8) + 'px';
        panel.style.visibility = 'visible';
    } else {
        panel.style.top = (cardBottom + 8) + 'px';
    }

    // Horizontal: right-aligned for right columns, left-aligned for left columns
    const cardLeft = cardRect.left - gridRect.left;
    const cardRight = cardLeft + cardRect.width;

    if (colFraction > 0.5) {
        // Right side columns — align popover right edge to card right edge
        const rightPos = gridWidth - cardRight;
        panel.style.left = 'auto';
        panel.style.right = rightPos + 'px';
    } else {
        // Left side columns — align popover left edge to card left edge
        panel.style.right = 'auto';
        panel.style.left = cardLeft + 'px';
    }
}

function setFilter(filter) {
    activeFilter = filter;
    document.querySelectorAll('.filter-btn').forEach(btn => {
        btn.classList.toggle('active', btn.dataset.filter === filter);
    });
    document.querySelectorAll('.thumb-card').forEach(card => {
        const cat = card.dataset.category;
        card.classList.toggle('hidden', filter !== 'all' && cat !== filter);
    });
}

function toggleQuizMode() {
    quizMode = !quizMode;
    const btn = document.getElementById('quiz-btn');
    btn.classList.toggle('active', quizMode);
    btn.textContent = quizMode ? 'Exit Quiz' : 'Quiz Mode';

    document.querySelectorAll('.thumb-label').forEach(el => {
        el.classList.toggle('quiz-hidden', quizMode);
    });

    const scoreEl = document.getElementById('quiz-score');
    scoreEl.style.display = quizMode ? 'inline' : 'none';

    // Remove quiz highlight from all cards
    document.querySelectorAll('.thumb-card').forEach(el => el.classList.remove('quiz-highlight'));

    // Clear all quiz state on cards
    document.querySelectorAll('.thumb-card').forEach(el => {
        el.classList.remove('quiz-correct', 'quiz-wrong');
    });

    if (quizMode) {
        quizScore = 0;
        quizAttempts = 0;
        quizAnswered = new Set();
        updateQuizScore();
        // Auto-select a random chart to start
        selectNextQuizChart();
    } else {
        closeInfoPanel();
    }
}

function updateQuizScore() {
    document.getElementById('quiz-score').textContent = `Score: ${quizScore}/${quizAttempts}`;
}

function checkQuizAnswer() {
    if (!selectedChart || !quizMode) return;
    const select = document.getElementById('quiz-select');
    const feedback = document.getElementById('quiz-feedback');
    const answer = select.value;
    if (!answer) return;

    quizAttempts++;
    quizAnswered.add(selectedChart.id);
    const isCorrect = answer === selectedChart.name;
    const card = document.getElementById('card-' + selectedChart.id);

    if (isCorrect) {
        quizScore++;
        feedback.innerHTML = `<span style="color:green; font-weight:bold;">Correct!</span>`;
        if (card) { card.classList.remove('quiz-highlight'); card.classList.add('quiz-correct'); }
        showStarAnimation(card);
        if (quizScore >= 10) {
            setTimeout(() => showCelebration(), 600);
        }
    } else {
        feedback.innerHTML = `<span style="color:#D32F2F; font-weight:bold;">Not quite.</span> This is a <strong>${selectedChart.name}</strong>.`;
        if (card) { card.classList.remove('quiz-highlight'); card.classList.add('quiz-wrong'); }
    }
    select.disabled = true;
    updateQuizScore();

    // Auto-advance to next unanswered chart after a delay
    setTimeout(() => {
        if (quizMode) selectNextQuizChart();
    }, 1200);
}

function selectNextQuizChart() {
    const unanswered = CHART_DATA.filter(c => !quizAnswered.has(c.id));
    if (unanswered.length === 0) {
        closeInfoPanel();
        const panel = document.getElementById('info-panel');
        panel.innerHTML = `<button class="close-btn" onclick="closeInfoPanel()">&times;</button>
            <p style="text-align:center; font-size:15px; font-weight:bold; margin:4px 0;">
            Quiz complete! Score: ${quizScore}/${quizAttempts}</p>`;
        panel.style.display = 'block';
        // Center it in the grid
        panel.style.top = '40%';
        panel.style.left = '50%';
        panel.style.right = 'auto';
        panel.style.transform = 'translate(-50%, -50%)';
        if (quizScore >= 10) showCelebration();
        return;
    }
    // Pick a random unanswered chart
    const next = unanswered[Math.floor(Math.random() * unanswered.length)];
    selectChart(next);
}

// ==================== ANIMATIONS ====================

function showStarAnimation(card) {
    if (!card) return;
    const rect = card.getBoundingClientRect();
    const count = 5;
    for (let i = 0; i < count; i++) {
        const star = document.createElement('div');
        star.className = 'star-particle';
        star.textContent = '\u2605';
        star.style.left = (rect.left + rect.width / 2 + (Math.random() - 0.5) * rect.width * 0.6) + 'px';
        star.style.top = (rect.top + rect.height / 2) + 'px';
        star.style.animationDelay = (i * 0.08) + 's';
        document.body.appendChild(star);
        star.addEventListener('animationend', () => star.remove());
    }
}

function showCelebration() {
    const colors = ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF', '#FF9F40', '#4CAF50'];
    const count = 40;
    for (let i = 0; i < count; i++) {
        const confetti = document.createElement('div');
        confetti.className = 'confetti-particle';
        confetti.style.left = (Math.random() * 100) + 'vw';
        confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
        confetti.style.animationDuration = (1.5 + Math.random() * 1.5) + 's';
        confetti.style.animationDelay = (Math.random() * 0.5) + 's';
        document.body.appendChild(confetti);
        confetti.addEventListener('animationend', () => confetti.remove());
    }
}

// ==================== THUMBNAIL RENDERERS ====================

function renderAllThumbnails() {
    CHART_DATA.forEach(chart => {
        const canvas = document.getElementById('thumb-' + chart.id);
        if (!canvas) return;
        // Set canvas pixel dimensions from its container
        const wrap = canvas.parentElement;
        canvas.width = wrap.clientWidth;
        canvas.height = wrap.clientHeight;
        const renderer = thumbnailRenderers[chart.id];
        if (renderer) renderer(canvas);
    });
}

const thumbnailRenderers = {
    'bar': function(canvas) {
        const ctx = canvas.getContext('2d');
        chartInstances[canvas.id] = new Chart(ctx, {
            type: 'bar',
            data: {
                labels: ['A', 'B', 'C', 'D', 'E'],
                datasets: [{ data: [12, 19, 8, 15, 10], backgroundColor: [COLORS.blue, COLORS.red, COLORS.green, COLORS.orange, COLORS.purple] }]
            },
            options: thumbOptions()
        });
    },
    'stacked-bar': function(canvas) {
        const ctx = canvas.getContext('2d');
        chartInstances[canvas.id] = new Chart(ctx, {
            type: 'bar',
            data: {
                labels: ['Q1', 'Q2', 'Q3', 'Q4'],
                datasets: [
                    { data: [10, 15, 12, 8], backgroundColor: COLORS.blue },
                    { data: [8, 10, 14, 11], backgroundColor: COLORS.red },
                    { data: [5, 7, 6, 9], backgroundColor: COLORS.green }
                ]
            },
            options: { ...thumbOptions(), scales: { x: { stacked: true, display: false }, y: { stacked: true, display: false } } }
        });
    },
    'line': function(canvas) {
        const ctx = canvas.getContext('2d');
        chartInstances[canvas.id] = new Chart(ctx, {
            type: 'line',
            data: {
                labels: ['J', 'F', 'M', 'A', 'M', 'J'],
                datasets: [{ data: [3, 7, 5, 12, 9, 15], borderColor: '#2196F3', backgroundColor: 'rgba(33,150,243,0.1)', fill: false, tension: 0.3, pointRadius: 2 }]
            },
            options: thumbOptions()
        });
    },
    'area': function(canvas) {
        const ctx = canvas.getContext('2d');
        chartInstances[canvas.id] = new Chart(ctx, {
            type: 'line',
            data: {
                labels: ['J', 'F', 'M', 'A', 'M', 'J'],
                datasets: [
                    { data: [5, 10, 8, 15, 12, 18], borderColor: '#2196F3', backgroundColor: 'rgba(33,150,243,0.3)', fill: true, tension: 0.3, pointRadius: 0 },
                    { data: [3, 6, 5, 9, 7, 11], borderColor: '#FF9800', backgroundColor: 'rgba(255,152,0,0.3)', fill: true, tension: 0.3, pointRadius: 0 }
                ]
            },
            options: thumbOptions()
        });
    },
    'pie': function(canvas) {
        const ctx = canvas.getContext('2d');
        chartInstances[canvas.id] = new Chart(ctx, {
            type: 'pie',
            data: {
                labels: ['A', 'B', 'C', 'D'],
                datasets: [{ data: [35, 25, 22, 18], backgroundColor: [COLORS.blue, COLORS.red, COLORS.green, COLORS.orange] }]
            },
            options: thumbOptions(true)
        });
    },
    'donut': function(canvas) {
        const ctx = canvas.getContext('2d');
        chartInstances[canvas.id] = new Chart(ctx, {
            type: 'doughnut',
            data: {
                labels: ['Done', 'In Progress', 'Todo'],
                datasets: [{ data: [60, 25, 15], backgroundColor: [COLORS.green, COLORS.orange, '#e0e0e0'] }]
            },
            options: thumbOptions(true)
        });
    },
    'scatter': function(canvas) {
        const ctx = canvas.getContext('2d');
        const pts = [];
        for (let i = 0; i < 20; i++) pts.push({ x: Math.random() * 100, y: Math.random() * 100 });
        chartInstances[canvas.id] = new Chart(ctx, {
            type: 'scatter',
            data: { datasets: [{ data: pts, backgroundColor: COLORS.blue, pointRadius: 3 }] },
            options: thumbOptions()
        });
    },
    'histogram': function(canvas) {
        const ctx = canvas.getContext('2d');
        chartInstances[canvas.id] = new Chart(ctx, {
            type: 'bar',
            data: {
                labels: ['0-10', '10-20', '20-30', '30-40', '40-50', '50-60'],
                datasets: [{ data: [4, 12, 25, 18, 9, 3], backgroundColor: COLORS.teal, barPercentage: 1.0, categoryPercentage: 1.0 }]
            },
            options: thumbOptions()
        });
    },

    // Non-Chart.js types - drawn with Canvas 2D
    'treemap': function(canvas) {
        drawOnResize(canvas, function(ctx, w, h) {
            const rects = [
                { x: 0, y: 0, w: 0.6, h: 0.55, c: COLORS.blue },
                { x: 0.6, y: 0, w: 0.4, h: 0.35, c: COLORS.red },
                { x: 0.6, y: 0.35, w: 0.4, h: 0.2, c: COLORS.orange },
                { x: 0, y: 0.55, w: 0.35, h: 0.45, c: COLORS.green },
                { x: 0.35, y: 0.55, w: 0.35, h: 0.45, c: COLORS.purple },
                { x: 0.7, y: 0.55, w: 0.3, h: 0.45, c: COLORS.yellow }
            ];
            rects.forEach(r => {
                ctx.fillStyle = r.c;
                ctx.fillRect(r.x * w + 1, r.y * h + 1, r.w * w - 2, r.h * h - 2);
            });
        });
    },
    'sankey': function(canvas) {
        drawOnResize(canvas, function(ctx, w, h) {
            const flows = [
                { sy: 0.1, sh: 0.3, ey: 0.05, eh: 0.2, c: 'rgba(54,162,235,0.5)' },
                { sy: 0.1, sh: 0.3, ey: 0.3, eh: 0.15, c: 'rgba(255,99,132,0.5)' },
                { sy: 0.45, sh: 0.25, ey: 0.5, eh: 0.2, c: 'rgba(75,192,192,0.5)' },
                { sy: 0.45, sh: 0.25, ey: 0.75, eh: 0.15, c: 'rgba(255,159,64,0.5)' },
                { sy: 0.75, sh: 0.2, ey: 0.75, eh: 0.15, c: 'rgba(153,102,255,0.5)' }
            ];
            // Left nodes
            ctx.fillStyle = COLORS.blue; ctx.fillRect(0, h * 0.1, w * 0.08, h * 0.3);
            ctx.fillStyle = COLORS.green; ctx.fillRect(0, h * 0.45, w * 0.08, h * 0.25);
            ctx.fillStyle = COLORS.purple; ctx.fillRect(0, h * 0.75, w * 0.08, h * 0.2);
            // Right nodes
            ctx.fillStyle = COLORS.blue; ctx.fillRect(w * 0.92, h * 0.05, w * 0.08, h * 0.2);
            ctx.fillStyle = COLORS.red; ctx.fillRect(w * 0.92, h * 0.3, w * 0.08, h * 0.15);
            ctx.fillStyle = COLORS.green; ctx.fillRect(w * 0.92, h * 0.5, w * 0.08, h * 0.2);
            ctx.fillStyle = COLORS.orange; ctx.fillRect(w * 0.92, h * 0.75, w * 0.08, h * 0.15);
            // Flows
            flows.forEach(f => {
                ctx.beginPath();
                ctx.moveTo(w * 0.08, h * f.sy);
                ctx.bezierCurveTo(w * 0.5, h * f.sy, w * 0.5, h * f.ey, w * 0.92, h * f.ey);
                ctx.lineTo(w * 0.92, h * (f.ey + f.eh));
                ctx.bezierCurveTo(w * 0.5, h * (f.ey + f.eh), w * 0.5, h * (f.sy + f.sh), w * 0.08, h * (f.sy + f.sh));
                ctx.closePath();
                ctx.fillStyle = f.c;
                ctx.fill();
            });
        });
    },
    'chord': function(canvas) {
        drawOnResize(canvas, function(ctx, w, h) {
            const cx = w / 2, cy = h / 2, r = Math.min(w, h) * 0.4;
            const n = 5;
            const colors = [COLORS.blue, COLORS.red, COLORS.green, COLORS.orange, COLORS.purple];
            // Arcs
            for (let i = 0; i < n; i++) {
                const a1 = (i / n) * Math.PI * 2 - Math.PI / 2;
                const a2 = ((i + 0.8) / n) * Math.PI * 2 - Math.PI / 2;
                ctx.beginPath();
                ctx.arc(cx, cy, r, a1, a2);
                ctx.lineWidth = Math.min(w, h) * 0.07;
                ctx.strokeStyle = colors[i];
                ctx.stroke();
            }
            // Chords
            const pairs = [[0,2],[1,3],[0,4],[2,4],[1,4]];
            pairs.forEach(([a, b]) => {
                const a1 = ((a + 0.4) / n) * Math.PI * 2 - Math.PI / 2;
                const a2 = ((b + 0.4) / n) * Math.PI * 2 - Math.PI / 2;
                const x1 = cx + r * Math.cos(a1), y1 = cy + r * Math.sin(a1);
                const x2 = cx + r * Math.cos(a2), y2 = cy + r * Math.sin(a2);
                ctx.beginPath();
                ctx.moveTo(x1, y1);
                ctx.quadraticCurveTo(cx, cy, x2, y2);
                ctx.strokeStyle = colors[a].replace('0.8', '0.3');
                ctx.lineWidth = 2;
                ctx.stroke();
            });
        });
    },
    'wordcloud': function(canvas) {
        drawOnResize(canvas, function(ctx, w, h) {
            const words = [
                { t: 'Data', s: 0.14, x: 0.5, y: 0.35, c: COLORS.blue },
                { t: 'Chart', s: 0.11, x: 0.25, y: 0.55, c: COLORS.red },
                { t: 'Visual', s: 0.1, x: 0.72, y: 0.5, c: COLORS.green },
                { t: 'Graph', s: 0.08, x: 0.4, y: 0.7, c: COLORS.orange },
                { t: 'Plot', s: 0.07, x: 0.62, y: 0.25, c: COLORS.purple },
                { t: 'Info', s: 0.06, x: 0.2, y: 0.3, c: COLORS.teal },
                { t: 'Map', s: 0.065, x: 0.8, y: 0.72, c: COLORS.pink },
                { t: 'Trend', s: 0.055, x: 0.35, y: 0.18, c: '#888' },
                { t: 'Stats', s: 0.05, x: 0.78, y: 0.38, c: COLORS.yellow }
            ];
            words.forEach(wd => {
                ctx.font = `bold ${Math.round(wd.s * h)}px Arial`;
                ctx.fillStyle = wd.c;
                ctx.textAlign = 'center';
                ctx.textBaseline = 'middle';
                ctx.fillText(wd.t, wd.x * w, wd.y * h);
            });
        });
    },
    'gauge': function(canvas) {
        drawOnResize(canvas, function(ctx, w, h) {
            const cx = w / 2, cy = h * 0.65, r = Math.min(w, h) * 0.38;
            // Background arc
            ctx.beginPath();
            ctx.arc(cx, cy, r, Math.PI, 0);
            ctx.lineWidth = r * 0.25;
            ctx.strokeStyle = '#e0e0e0';
            ctx.stroke();
            // Value arc (75%)
            ctx.beginPath();
            ctx.arc(cx, cy, r, Math.PI, Math.PI + Math.PI * 0.75);
            ctx.lineWidth = r * 0.25;
            ctx.strokeStyle = COLORS.green;
            ctx.stroke();
            // Center text
            ctx.font = `bold ${Math.round(r * 0.45)}px Arial`;
            ctx.fillStyle = '#333';
            ctx.textAlign = 'center';
            ctx.textBaseline = 'middle';
            ctx.fillText('75%', cx, cy - r * 0.05);
        });
    },
    'sparkline': function(canvas) {
        drawOnResize(canvas, function(ctx, w, h) {
            const lines = [
                { y: 0.2, data: [3,5,4,8,6,9,7,10,8,12], c: COLORS.blue },
                { y: 0.5, data: [8,7,9,5,6,4,7,3,5,4], c: COLORS.red },
                { y: 0.8, data: [2,4,3,5,7,6,8,9,7,10], c: COLORS.green }
            ];
            lines.forEach(line => {
                const max = Math.max(...line.data), min = Math.min(...line.data);
                const baseY = line.y * h;
                const sparkH = h * 0.2;
                ctx.beginPath();
                line.data.forEach((v, i) => {
                    const x = (i / (line.data.length - 1)) * w * 0.8 + w * 0.1;
                    const y = baseY - ((v - min) / (max - min)) * sparkH + sparkH / 2;
                    if (i === 0) ctx.moveTo(x, y); else ctx.lineTo(x, y);
                });
                ctx.strokeStyle = line.c;
                ctx.lineWidth = 2;
                ctx.stroke();
            });
            // Labels
            ctx.font = `${Math.max(10, Math.round(h * 0.08))}px Arial`;
            ctx.fillStyle = '#666';
            ctx.textAlign = 'left';
            ctx.textBaseline = 'middle';
            ctx.fillText('Student A', w * 0.02, h * 0.2);
            ctx.fillText('Student B', w * 0.02, h * 0.5);
            ctx.fillText('Student C', w * 0.02, h * 0.8);
        });
    }
};

function thumbOptions(isRadial) {
    return {
        responsive: false,
        maintainAspectRatio: false,
        animation: { duration: 600 },
        plugins: {
            legend: { display: false },
            tooltip: { enabled: false }
        },
        scales: isRadial ? {} : {
            x: { display: false },
            y: { display: false, beginAtZero: true }
        }
    };
}

// Helper for canvas-drawn thumbnails with resize support
function drawOnResize(canvas, drawFn) {
    function render() {
        const rect = canvas.parentElement.getBoundingClientRect();
        const dpr = window.devicePixelRatio || 1;
        canvas.width = rect.width * dpr;
        canvas.height = rect.height * dpr;
        const ctx = canvas.getContext('2d');
        ctx.scale(dpr, dpr);
        ctx.clearRect(0, 0, rect.width, rect.height);
        drawFn(ctx, rect.width, rect.height);
    }
    render();
    // Re-render on resize
    const observer = new ResizeObserver(() => render());
    observer.observe(canvas.parentElement);
}
