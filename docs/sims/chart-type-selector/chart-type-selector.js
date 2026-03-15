// Chart Type Selection Guide - Interactive decision tree
// Bloom Level: Analyze (L4) — learners differentiate chart types by data characteristics

// ==================== DECISION TREE DATA ====================

const TREE = {
    id: 'root',
    question: 'What is your primary visualization goal?',
    options: [
        {
            label: 'Compare values',
            next: {
                id: 'compare',
                question: 'How many categories are you comparing?',
                options: [
                    {
                        label: '2-7 categories',
                        next: {
                            id: 'compare-few',
                            question: 'Do you need to show sub-groups within each category?',
                            options: [
                                { label: 'No, just one value per category', result: 'bar' },
                                { label: 'Yes, show composition of each category', result: 'stacked-bar' }
                            ]
                        }
                    },
                    {
                        label: '8+ categories',
                        result: 'bar-horizontal'
                    }
                ]
            }
        },
        {
            label: 'Show trends over time',
            next: {
                id: 'trend',
                question: 'How many data series do you have?',
                options: [
                    {
                        label: '1-3 series',
                        next: {
                            id: 'trend-few',
                            question: 'Do you want to emphasize volume or magnitude?',
                            options: [
                                { label: 'No, just show the trend line', result: 'line' },
                                { label: 'Yes, emphasize the area under the curve', result: 'area' }
                            ]
                        }
                    },
                    { label: '4+ series (overview only)', result: 'sparkline' }
                ]
            }
        },
        {
            label: 'Show proportions of a whole',
            next: {
                id: 'proportion',
                question: 'How many slices or segments?',
                options: [
                    { label: '2-5 segments', result: 'pie' },
                    { label: '6+ segments or need a center label', result: 'donut' },
                    { label: 'Hierarchical (nested categories)', result: 'treemap' }
                ]
            }
        },
        {
            label: 'Explore relationships',
            next: {
                id: 'relationship',
                question: 'What kind of relationship?',
                options: [
                    { label: 'Correlation between two variables', result: 'scatter' },
                    { label: 'Flows between stages or groups', result: 'sankey' },
                    { label: 'Mutual connections between groups', result: 'chord' }
                ]
            }
        },
        {
            label: 'Show distribution',
            next: {
                id: 'distribution',
                question: 'What do you want to show about the distribution?',
                options: [
                    { label: 'Frequency of values in ranges (bins)', result: 'histogram' },
                    { label: 'Relative importance of terms or keywords', result: 'wordcloud' },
                    { label: 'A single metric against a target', result: 'gauge' }
                ]
            }
        }
    ]
};

const CHART_INFO = {
    'bar': {
        name: 'Bar Chart', library: 'Chart.js',
        description: 'Displays values as vertical bars for side-by-side comparison across categories. Each bar height represents the magnitude of one data point.',
        bestFor: 'Comparing 2-7 discrete categories with one value each.'
    },
    'stacked-bar': {
        name: 'Stacked Bar Chart', library: 'Chart.js',
        description: 'Stacks multiple sub-values within each bar to show both total and composition. Each color segment represents a sub-group.',
        bestFor: 'Showing how parts contribute to totals across categories.'
    },
    'bar-horizontal': {
        name: 'Horizontal Bar Chart', library: 'Chart.js',
        description: 'Rotates bars horizontally so long category labels remain readable. Works well when you have many categories to compare.',
        bestFor: 'Comparing 8+ categories with readable labels.'
    },
    'line': {
        name: 'Line Chart', library: 'Chart.js',
        description: 'Connects data points with lines to reveal trends, patterns, and changes over a continuous interval like time.',
        bestFor: 'Showing trends across time with 1-3 data series.'
    },
    'area': {
        name: 'Area Chart', library: 'Chart.js',
        description: 'Fills the region below a line to emphasize cumulative magnitude. Stacked areas show how multiple series contribute to a total over time.',
        bestFor: 'Emphasizing volume or cumulative change over time.'
    },
    'sparkline': {
        name: 'Sparkline', library: 'Custom',
        description: 'Tiny inline charts with no axes or labels, designed to show trend direction at a glance. Often embedded in tables or text.',
        bestFor: 'Showing trend direction for many series in compact space.'
    },
    'pie': {
        name: 'Pie Chart', library: 'Chart.js',
        description: 'Divides a circle into slices where each angle represents a proportion of the whole. Best with few slices for accurate visual comparison.',
        bestFor: 'Showing proportions with 2-5 categories.'
    },
    'donut': {
        name: 'Donut Chart', library: 'Chart.js',
        description: 'A pie chart with a hollow center, useful for displaying a summary value (like a percentage) in the middle while showing proportions around it.',
        bestFor: 'Proportions with a center label or 6+ segments.'
    },
    'treemap': {
        name: 'Treemap', library: 'D3.js',
        description: 'Fills a rectangle with nested sub-rectangles sized by value. Shows hierarchical part-to-whole relationships using area rather than angles.',
        bestFor: 'Hierarchical proportions with nested categories.'
    },
    'scatter': {
        name: 'Scatter Plot', library: 'Chart.js',
        description: 'Plots individual observations as dots on an x-y plane to reveal correlations, clusters, and outliers between two numerical variables.',
        bestFor: 'Revealing correlation between two numerical variables.'
    },
    'sankey': {
        name: 'Sankey Diagram', library: 'D3.js',
        description: 'Shows flows between stages using bands whose width represents magnitude. Reveals where quantities go as they move through a process.',
        bestFor: 'Mapping flows and transfers between stages.'
    },
    'chord': {
        name: 'Chord Diagram', library: 'D3.js',
        description: 'Displays mutual relationships between groups arranged in a circle. Chord thickness shows the strength of each connection.',
        bestFor: 'Showing inter-group relationships and their strength.'
    },
    'histogram': {
        name: 'Histogram', library: 'Chart.js',
        description: 'Groups continuous data into bins and shows the count in each range as adjacent bars. Reveals the shape of a distribution.',
        bestFor: 'Showing frequency distribution of continuous data.'
    },
    'wordcloud': {
        name: 'Word Cloud', library: 'D3.js',
        description: 'Displays words at sizes proportional to their frequency or importance. Gives an at-a-glance impression of dominant themes in text data.',
        bestFor: 'Showing relative importance of terms in a corpus.'
    },
    'gauge': {
        name: 'Gauge Chart', library: 'Custom',
        description: 'Shows a single value on a semicircular dial, like a speedometer. Color zones indicate whether the value is in an acceptable range.',
        bestFor: 'Displaying one KPI against a target or threshold.'
    }
};

const SCENARIOS = [
    {
        name: 'Student scores by subject',
        description: 'A teacher wants to compare average test scores across 5 subjects for one class.',
        path: ['Compare values', '2-7 categories', 'No, just one value per category'],
        result: 'bar'
    },
    {
        name: 'Student flow through course modules',
        description: 'An instructional designer wants to see how 200 students move from introductory modules through elective tracks to completion.',
        path: ['Explore relationships', 'Flows between stages or groups'],
        result: 'sankey'
    },
    {
        name: 'Weekly attendance trend',
        description: 'A principal wants to track daily attendance rates over a semester to spot patterns and dips.',
        path: ['Show trends over time', '1-3 series', 'No, just show the trend line'],
        result: 'line'
    },
    {
        name: 'Budget allocation breakdown',
        description: 'A school board needs to show how the annual budget is split across four major categories.',
        path: ['Show proportions of a whole', '2-5 segments'],
        result: 'pie'
    },
    {
        name: 'Study hours vs. exam scores',
        description: 'A researcher wants to find whether more study hours correlate with higher exam scores across 150 students.',
        path: ['Explore relationships', 'Correlation between two variables'],
        result: 'scatter'
    }
];

// ==================== STATE ====================

let currentNode = TREE;
let answerPath = [];      // [{question, answer, nodeId}]
let selectedResult = null;
let animatingScenario = false;

// ==================== INIT ====================

document.addEventListener('DOMContentLoaded', function() {
    document.querySelector('main').innerHTML = buildLayout();
    renderTree();
});

function buildLayout() {
    return `
    <div id="cts-container">
        <div id="cts-controls">
            <button class="cts-btn cts-reset" onclick="resetTree()">Reset</button>
            <select id="scenario-select" onchange="loadScenario()">
                <option value="">Try a Scenario...</option>
                ${SCENARIOS.map((s, i) => `<option value="${i}">${s.name}</option>`).join('')}
            </select>
            <span id="scenario-desc" class="cts-scenario-desc"></span>
        </div>
        <div id="cts-main">
            <div id="cts-tree"></div>
            <div id="cts-preview">
                <div id="cts-preview-content">
                    <p class="cts-hint">Answer the questions on the left to find the best chart type for your data.</p>
                </div>
            </div>
        </div>
    </div>
    <style>
        #cts-container { max-width: 900px; margin: 0 auto; padding: 6px 10px; }
        #cts-controls {
            display: flex; align-items: center; gap: 8px; margin-bottom: 8px; flex-wrap: wrap;
        }
        .cts-btn {
            padding: 5px 14px; font-size: 13px; cursor: pointer;
            border: 1px solid #2196F3; background: #2196F3; color: white;
            border-radius: 4px;
        }
        .cts-btn:hover { background: #1976D2; }
        .cts-reset { background: #757575; border-color: #757575; }
        .cts-reset:hover { background: #616161; }
        #scenario-select {
            padding: 5px 8px; font-size: 13px; border: 1px solid #ccc;
            border-radius: 4px; max-width: 220px;
        }
        .cts-scenario-desc {
            font-size: 12px; color: #666; font-style: italic; flex: 1;
        }
        #cts-main {
            display: flex; gap: 10px; min-height: 380px;
        }
        #cts-tree {
            flex: 0 0 60%; background: white; border: 1px solid silver;
            border-radius: 6px; padding: 12px; overflow-y: auto; max-height: 420px;
        }
        #cts-preview {
            flex: 0 0 38%; background: white; border: 1px solid silver;
            border-radius: 6px; padding: 12px; display: flex; align-items: flex-start;
        }
        #cts-preview-content { width: 100%; }
        .cts-hint { color: #999; font-size: 14px; text-align: center; margin-top: 40px; }

        /* Tree nodes */
        .cts-node { margin-bottom: 12px; }
        .cts-question {
            font-size: 14px; font-weight: 600; color: #1565C0;
            margin: 0 0 6px 0; padding: 6px 10px;
            background: #E3F2FD; border-radius: 4px; border-left: 4px solid #2196F3;
        }
        .cts-question.answered {
            background: #E8F5E9; border-left-color: #4CAF50; color: #2E7D32;
        }
        .cts-question.answered::before {
            content: '\\2713 '; font-weight: bold;
        }
        .cts-options { display: flex; flex-direction: column; gap: 4px; padding-left: 18px; }
        .cts-option {
            padding: 6px 12px; font-size: 13px; cursor: pointer;
            background: #FAFAFA; border: 1px solid #e0e0e0; border-radius: 4px;
            transition: all 0.15s; text-align: left;
        }
        .cts-option:hover { background: #E3F2FD; border-color: #90CAF9; }
        .cts-option.selected {
            background: #C8E6C9; border-color: #4CAF50; color: #2E7D32;
            font-weight: 600; cursor: default;
        }
        .cts-option.faded { opacity: 0.35; pointer-events: none; }
        .cts-connector {
            width: 2px; height: 10px; background: #4CAF50;
            margin-left: 28px;
        }

        /* Result badge */
        .cts-result-badge {
            display: inline-block; margin-top: 8px; margin-left: 18px;
            padding: 6px 14px; background: #FFF3E0; border: 2px solid #FF9800;
            border-radius: 6px; font-size: 14px; font-weight: 600; color: #E65100;
        }
        .cts-result-badge::before { content: '\\2192 '; }

        /* Preview panel */
        .cts-chart-name { font-size: 18px; font-weight: 700; color: #1565C0; margin: 0 0 4px 0; }
        .cts-chart-lib { font-size: 12px; color: #888; font-weight: normal; }
        .cts-chart-desc { font-size: 13px; margin: 6px 0; line-height: 1.5; }
        .cts-chart-best { font-size: 13px; color: #E65100; margin: 6px 0; }
        .cts-chart-thumb {
            width: 100%; height: 120px; background: #fafafa;
            border: 1px solid #e0e0e0; border-radius: 4px; margin-top: 8px;
            display: flex; align-items: center; justify-content: center;
            overflow: hidden;
        }
        .cts-chart-thumb canvas { max-width: 100%; max-height: 100%; }
        .cts-path-summary {
            margin-top: 12px; padding-top: 8px; border-top: 1px solid #eee;
            font-size: 12px; color: #888;
        }
        .cts-path-summary strong { color: #555; }

        @media (max-width: 640px) {
            #cts-main { flex-direction: column; }
            #cts-tree { flex: none; max-height: 300px; }
            #cts-preview { flex: none; }
        }
    </style>`;
}

// ==================== TREE RENDERING ====================

function renderTree() {
    const container = document.getElementById('cts-tree');
    container.innerHTML = '';

    // Render answered questions
    answerPath.forEach((step, i) => {
        const node = document.createElement('div');
        node.className = 'cts-node';
        node.innerHTML = `
            <div class="cts-question answered">${step.question}</div>
            <div class="cts-options">
                ${step.allOptions.map(opt => {
                    const cls = opt === step.answer ? 'cts-option selected' : 'cts-option faded';
                    return `<button class="${cls}" disabled>${opt}</button>`;
                }).join('')}
            </div>`;
        container.appendChild(node);

        // Connector line
        if (i < answerPath.length - 1 || currentNode) {
            const conn = document.createElement('div');
            conn.className = 'cts-connector';
            container.appendChild(conn);
        }
    });

    // Render current question (if not at a result)
    if (currentNode && !selectedResult) {
        const node = document.createElement('div');
        node.className = 'cts-node';
        node.innerHTML = `
            <div class="cts-question">${currentNode.question}</div>
            <div class="cts-options">
                ${currentNode.options.map((opt, i) =>
                    `<button class="cts-option" onclick="selectOption(${i})">${opt.label}</button>`
                ).join('')}
            </div>`;
        container.appendChild(node);
    }

    // Render result badge if reached
    if (selectedResult) {
        const badge = document.createElement('div');
        badge.className = 'cts-result-badge';
        badge.textContent = CHART_INFO[selectedResult].name;
        container.appendChild(badge);
    }

    // Scroll to bottom
    container.scrollTop = container.scrollHeight;
}

function selectOption(index) {
    if (!currentNode || animatingScenario) return;
    const option = currentNode.options[index];

    answerPath.push({
        question: currentNode.question,
        answer: option.label,
        allOptions: currentNode.options.map(o => o.label),
        nodeId: currentNode.id
    });

    if (option.result) {
        selectedResult = option.result;
        currentNode = null;
        renderTree();
        renderPreview(option.result);
    } else if (option.next) {
        currentNode = option.next;
        renderTree();
    }
}

// ==================== PREVIEW PANEL ====================

function renderPreview(chartId) {
    const info = CHART_INFO[chartId];
    if (!info) return;
    const panel = document.getElementById('cts-preview-content');

    // Build path summary
    const pathSteps = answerPath.map(s => s.answer).join(' → ');

    panel.innerHTML = `
        <h3 class="cts-chart-name">${info.name} <span class="cts-chart-lib">(${info.library})</span></h3>
        <p class="cts-chart-desc">${info.description}</p>
        <p class="cts-chart-best"><strong>Best for:</strong> ${info.bestFor}</p>
        <div class="cts-chart-thumb"><canvas id="preview-canvas"></canvas></div>
        <div class="cts-path-summary">
            <strong>Your path:</strong> ${pathSteps}
        </div>`;

    // Draw a mini chart preview
    setTimeout(() => drawPreviewChart(chartId), 50);
}

// ==================== MINI CHART PREVIEWS ====================

function drawPreviewChart(chartId) {
    const canvas = document.getElementById('preview-canvas');
    if (!canvas) return;
    const wrap = canvas.parentElement;
    const dpr = window.devicePixelRatio || 1;
    const w = wrap.clientWidth - 4;
    const h = wrap.clientHeight - 4;
    canvas.width = w * dpr;
    canvas.height = h * dpr;
    canvas.style.width = w + 'px';
    canvas.style.height = h + 'px';
    const ctx = canvas.getContext('2d');
    ctx.scale(dpr, dpr);

    const drawFn = previewDrawers[chartId];
    if (drawFn) drawFn(ctx, w, h);
}

const previewDrawers = {
    'bar': function(ctx, w, h) {
        const vals = [65, 45, 80, 55, 70];
        const labels = ['Math', 'Eng', 'Sci', 'Hist', 'Art'];
        const colors = ['#36A2EB', '#FF6384', '#4BC0C0', '#FF9F40', '#9966FF'];
        const barW = w * 0.12;
        const gap = (w - vals.length * barW) / (vals.length + 1);
        vals.forEach((v, i) => {
            const bh = (v / 100) * h * 0.8;
            const x = gap + i * (barW + gap);
            ctx.fillStyle = colors[i];
            ctx.fillRect(x, h - bh - 14, barW, bh);
            ctx.fillStyle = '#555';
            ctx.font = '10px Arial';
            ctx.textAlign = 'center';
            ctx.fillText(labels[i], x + barW / 2, h - 2);
        });
    },
    'stacked-bar': function(ctx, w, h) {
        const data = [[30,20,15],[25,30,10],[35,15,20],[20,25,25]];
        const labels = ['Q1','Q2','Q3','Q4'];
        const colors = ['#36A2EB','#FF6384','#4BC0C0'];
        const barW = w * 0.15;
        const gap = (w - data.length * barW) / (data.length + 1);
        data.forEach((stack, i) => {
            let y = h - 14;
            stack.forEach((v, j) => {
                const bh = (v / 80) * h * 0.7;
                y -= bh;
                ctx.fillStyle = colors[j];
                ctx.fillRect(gap + i * (barW + gap), y, barW, bh);
            });
            ctx.fillStyle = '#555'; ctx.font = '10px Arial'; ctx.textAlign = 'center';
            ctx.fillText(labels[i], gap + i * (barW + gap) + barW/2, h - 2);
        });
    },
    'bar-horizontal': function(ctx, w, h) {
        const vals = [85,72,68,61,55,48,42,35];
        const labels = ['Python','JS','Java','C++','Go','Rust','Swift','Kotlin'];
        const barH = (h - 10) / vals.length * 0.7;
        const gap = (h - 10 - vals.length * barH) / (vals.length + 1);
        vals.forEach((v, i) => {
            const bw = (v / 100) * w * 0.55;
            const y = gap + i * (barH + gap);
            ctx.fillStyle = '#36A2EB';
            ctx.fillRect(w * 0.3, y, bw, barH);
            ctx.fillStyle = '#555'; ctx.font = '10px Arial'; ctx.textAlign = 'right'; ctx.textBaseline = 'middle';
            ctx.fillText(labels[i], w * 0.28, y + barH / 2);
        });
    },
    'line': function(ctx, w, h) {
        const vals = [30, 45, 38, 55, 50, 65, 60, 72, 68, 80];
        ctx.beginPath();
        vals.forEach((v, i) => {
            const x = i / (vals.length - 1) * w * 0.85 + w * 0.08;
            const y = h - (v / 100) * h * 0.8 - 10;
            if (i === 0) ctx.moveTo(x, y); else ctx.lineTo(x, y);
        });
        ctx.strokeStyle = '#2196F3'; ctx.lineWidth = 2.5; ctx.stroke();
        vals.forEach((v, i) => {
            const x = i / (vals.length - 1) * w * 0.85 + w * 0.08;
            const y = h - (v / 100) * h * 0.8 - 10;
            ctx.beginPath(); ctx.arc(x, y, 3, 0, Math.PI * 2);
            ctx.fillStyle = '#2196F3'; ctx.fill();
        });
    },
    'area': function(ctx, w, h) {
        const v1 = [20,35,30,50,45,60,55,70];
        const v2 = [10,20,18,30,25,35,30,40];
        [{ vals: v1, color: 'rgba(33,150,243,0.4)', stroke: '#2196F3' },
         { vals: v2, color: 'rgba(255,152,0,0.4)', stroke: '#FF9800' }].forEach(series => {
            ctx.beginPath();
            ctx.moveTo(w * 0.08, h - 10);
            series.vals.forEach((v, i) => {
                const x = i / (series.vals.length - 1) * w * 0.85 + w * 0.08;
                const y = h - (v / 80) * h * 0.7 - 10;
                ctx.lineTo(x, y);
            });
            ctx.lineTo(w * 0.93, h - 10); ctx.closePath();
            ctx.fillStyle = series.color; ctx.fill();
            ctx.strokeStyle = series.stroke; ctx.lineWidth = 1.5; ctx.stroke();
        });
    },
    'sparkline': function(ctx, w, h) {
        const lines = [
            { label: 'Class A', data: [3,5,4,8,6,9,7,10], color: '#2196F3' },
            { label: 'Class B', data: [8,7,9,5,6,4,7,3], color: '#FF6384' },
            { label: 'Class C', data: [2,4,3,5,7,6,8,9], color: '#4BC0C0' }
        ];
        lines.forEach((line, li) => {
            const baseY = (li + 0.5) / lines.length * h;
            const max = Math.max(...line.data), min = Math.min(...line.data);
            ctx.fillStyle = '#555'; ctx.font = '11px Arial'; ctx.textAlign = 'left'; ctx.textBaseline = 'middle';
            ctx.fillText(line.label, 4, baseY);
            ctx.beginPath();
            line.data.forEach((v, i) => {
                const x = i / (line.data.length - 1) * w * 0.5 + w * 0.35;
                const y = baseY - ((v - min) / (max - min) - 0.5) * h * 0.2;
                if (i === 0) ctx.moveTo(x, y); else ctx.lineTo(x, y);
            });
            ctx.strokeStyle = line.color; ctx.lineWidth = 2; ctx.stroke();
        });
    },
    'pie': function(ctx, w, h) {
        const vals = [35, 25, 22, 18];
        const colors = ['#36A2EB', '#FF6384', '#4BC0C0', '#FF9F40'];
        const cx = w / 2, cy = h / 2, r = Math.min(w, h) * 0.38;
        let angle = -Math.PI / 2;
        const total = vals.reduce((a, b) => a + b, 0);
        vals.forEach((v, i) => {
            const sweep = (v / total) * Math.PI * 2;
            ctx.beginPath(); ctx.moveTo(cx, cy);
            ctx.arc(cx, cy, r, angle, angle + sweep);
            ctx.closePath(); ctx.fillStyle = colors[i]; ctx.fill();
            angle += sweep;
        });
    },
    'donut': function(ctx, w, h) {
        const vals = [60, 25, 15];
        const colors = ['#4BC0C0', '#FF9F40', '#e0e0e0'];
        const cx = w / 2, cy = h / 2, r = Math.min(w, h) * 0.38, ir = r * 0.55;
        let angle = -Math.PI / 2;
        const total = vals.reduce((a, b) => a + b, 0);
        vals.forEach((v, i) => {
            const sweep = (v / total) * Math.PI * 2;
            ctx.beginPath(); ctx.arc(cx, cy, r, angle, angle + sweep);
            ctx.arc(cx, cy, ir, angle + sweep, angle, true);
            ctx.closePath(); ctx.fillStyle = colors[i]; ctx.fill();
            angle += sweep;
        });
        ctx.fillStyle = '#333'; ctx.font = `bold ${r * 0.3}px Arial`;
        ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
        ctx.fillText('60%', cx, cy);
    },
    'treemap': function(ctx, w, h) {
        const rects = [
            { x: 0, y: 0, w: 0.6, h: 0.55, c: '#36A2EB' },
            { x: 0.6, y: 0, w: 0.4, h: 0.35, c: '#FF6384' },
            { x: 0.6, y: 0.35, w: 0.4, h: 0.2, c: '#FF9F40' },
            { x: 0, y: 0.55, w: 0.35, h: 0.45, c: '#4BC0C0' },
            { x: 0.35, y: 0.55, w: 0.35, h: 0.45, c: '#9966FF' },
            { x: 0.7, y: 0.55, w: 0.3, h: 0.45, c: '#FFCE56' }
        ];
        rects.forEach(r => {
            ctx.fillStyle = r.c;
            ctx.fillRect(r.x * w + 1, r.y * h + 1, r.w * w - 2, r.h * h - 2);
        });
    },
    'scatter': function(ctx, w, h) {
        const pts = [];
        for (let i = 0; i < 25; i++) {
            const x = Math.random() * 80 + 10;
            const y = x * 0.6 + (Math.random() - 0.5) * 30 + 10;
            pts.push({ x, y: Math.max(5, Math.min(95, y)) });
        }
        pts.forEach(p => {
            ctx.beginPath();
            ctx.arc(p.x / 100 * w * 0.85 + w * 0.08, h - p.y / 100 * h * 0.85 - 8, 3.5, 0, Math.PI * 2);
            ctx.fillStyle = 'rgba(33,150,243,0.7)'; ctx.fill();
        });
    },
    'sankey': function(ctx, w, h) {
        ctx.fillStyle = '#36A2EB'; ctx.fillRect(0, h*0.1, w*0.08, h*0.3);
        ctx.fillStyle = '#4BC0C0'; ctx.fillRect(0, h*0.5, w*0.08, h*0.25);
        ctx.fillStyle = '#9966FF'; ctx.fillRect(0, h*0.8, w*0.08, h*0.15);
        ctx.fillStyle = '#36A2EB'; ctx.fillRect(w*0.92, h*0.05, w*0.08, h*0.2);
        ctx.fillStyle = '#FF6384'; ctx.fillRect(w*0.92, h*0.3, w*0.08, h*0.15);
        ctx.fillStyle = '#4BC0C0'; ctx.fillRect(w*0.92, h*0.5, w*0.08, h*0.2);
        ctx.fillStyle = '#FF9F40'; ctx.fillRect(w*0.92, h*0.75, w*0.08, h*0.15);
        const flows = [
            {sy:0.1,sh:0.2,ey:0.05,eh:0.15,c:'rgba(54,162,235,0.3)'},
            {sy:0.2,sh:0.2,ey:0.3,eh:0.1,c:'rgba(255,99,132,0.3)'},
            {sy:0.5,sh:0.15,ey:0.5,eh:0.15,c:'rgba(75,192,192,0.3)'},
            {sy:0.55,sh:0.2,ey:0.75,eh:0.1,c:'rgba(255,159,64,0.3)'}
        ];
        flows.forEach(f => {
            ctx.beginPath();
            ctx.moveTo(w*0.08, h*f.sy);
            ctx.bezierCurveTo(w*0.5, h*f.sy, w*0.5, h*f.ey, w*0.92, h*f.ey);
            ctx.lineTo(w*0.92, h*(f.ey+f.eh));
            ctx.bezierCurveTo(w*0.5, h*(f.ey+f.eh), w*0.5, h*(f.sy+f.sh), w*0.08, h*(f.sy+f.sh));
            ctx.closePath(); ctx.fillStyle = f.c; ctx.fill();
        });
    },
    'chord': function(ctx, w, h) {
        const cx = w/2, cy = h/2, r = Math.min(w,h)*0.38;
        const n = 5;
        const colors = ['#36A2EB','#FF6384','#4BC0C0','#FF9F40','#9966FF'];
        for (let i = 0; i < n; i++) {
            const a1 = (i/n)*Math.PI*2 - Math.PI/2;
            const a2 = ((i+0.8)/n)*Math.PI*2 - Math.PI/2;
            ctx.beginPath(); ctx.arc(cx, cy, r, a1, a2);
            ctx.lineWidth = r * 0.18; ctx.strokeStyle = colors[i]; ctx.stroke();
        }
        [[0,2],[1,3],[0,4],[2,4]].forEach(([a,b]) => {
            const a1 = ((a+0.4)/n)*Math.PI*2-Math.PI/2;
            const a2 = ((b+0.4)/n)*Math.PI*2-Math.PI/2;
            ctx.beginPath();
            ctx.moveTo(cx+r*Math.cos(a1), cy+r*Math.sin(a1));
            ctx.quadraticCurveTo(cx, cy, cx+r*Math.cos(a2), cy+r*Math.sin(a2));
            ctx.strokeStyle = colors[a].replace(')', ',0.3)').replace('rgb', 'rgba');
            ctx.lineWidth = 2; ctx.stroke();
        });
    },
    'histogram': function(ctx, w, h) {
        const vals = [3, 8, 18, 25, 20, 12, 6, 2];
        const max = Math.max(...vals);
        const barW = w * 0.85 / vals.length;
        vals.forEach((v, i) => {
            const bh = (v / max) * h * 0.75;
            ctx.fillStyle = '#4BC0C0';
            ctx.fillRect(w * 0.08 + i * barW, h - bh - 14, barW - 1, bh);
        });
    },
    'wordcloud': function(ctx, w, h) {
        const words = [
            {t:'Data',s:0.16,x:0.5,y:0.35,c:'#36A2EB'},
            {t:'Chart',s:0.12,x:0.25,y:0.55,c:'#FF6384'},
            {t:'Visual',s:0.1,x:0.75,y:0.5,c:'#4BC0C0'},
            {t:'Graph',s:0.09,x:0.4,y:0.72,c:'#FF9F40'},
            {t:'Plot',s:0.08,x:0.65,y:0.25,c:'#9966FF'},
            {t:'Info',s:0.07,x:0.2,y:0.3,c:'#888'},
            {t:'Trend',s:0.06,x:0.35,y:0.18,c:'#4BC0C0'}
        ];
        words.forEach(wd => {
            ctx.font = `bold ${Math.round(wd.s * h)}px Arial`;
            ctx.fillStyle = wd.c; ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
            ctx.fillText(wd.t, wd.x * w, wd.y * h);
        });
    },
    'gauge': function(ctx, w, h) {
        const cx = w/2, cy = h*0.7, r = Math.min(w,h)*0.4;
        ctx.beginPath(); ctx.arc(cx, cy, r, Math.PI, 0);
        ctx.lineWidth = r*0.22; ctx.strokeStyle = '#e0e0e0'; ctx.stroke();
        ctx.beginPath(); ctx.arc(cx, cy, r, Math.PI, Math.PI + Math.PI*0.75);
        ctx.lineWidth = r*0.22; ctx.strokeStyle = '#4BC0C0'; ctx.stroke();
        ctx.font = `bold ${r*0.4}px Arial`; ctx.fillStyle = '#333';
        ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
        ctx.fillText('75%', cx, cy - r*0.05);
    }
};

// ==================== CONTROLS ====================

function resetTree() {
    currentNode = TREE;
    answerPath = [];
    selectedResult = null;
    animatingScenario = false;
    document.getElementById('scenario-select').value = '';
    document.getElementById('scenario-desc').textContent = '';
    document.getElementById('cts-preview-content').innerHTML =
        '<p class="cts-hint">Answer the questions on the left to find the best chart type for your data.</p>';
    renderTree();
}

function loadScenario() {
    const select = document.getElementById('scenario-select');
    const idx = select.value;
    if (idx === '') return;

    const scenario = SCENARIOS[parseInt(idx)];
    document.getElementById('scenario-desc').textContent = scenario.description;

    // Reset first
    currentNode = TREE;
    answerPath = [];
    selectedResult = null;
    animatingScenario = true;
    renderTree();

    // Animate through the path step by step
    let step = 0;
    function nextStep() {
        if (step >= scenario.path.length) {
            animatingScenario = false;
            return;
        }
        const answer = scenario.path[step];
        const optIndex = currentNode.options.findIndex(o => o.label === answer);
        if (optIndex >= 0) {
            selectOption(optIndex);
        }
        step++;
        if (step < scenario.path.length) {
            setTimeout(nextStep, 600);
        } else {
            animatingScenario = false;
        }
    }
    setTimeout(nextStep, 400);
}
