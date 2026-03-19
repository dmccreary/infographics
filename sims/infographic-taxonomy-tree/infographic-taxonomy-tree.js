// Interactive Infographic Taxonomy Tree - Interactive Hierarchical Visualization
// Uses vis-network with hierarchical layout to display the five dimensions
// of infographic classification.

// Taxonomy data: each dimension with its leaf values and descriptions
const taxonomyData = {
    root: {
        id: 0,
        label: 'Interactive\nInfographics\nTaxonomy',
        title: 'The five key dimensions used to classify and design interactive infographics.',
        color: '#666666',
        fontColor: '#ffffff'
    },
    dimensions: [
        {
            id: 1,
            label: 'Purpose',
            title: 'The intended goal or function of the infographic.',
            color: '#4a86c8',
            description: 'Purpose defines why the infographic exists. Different purposes require different design strategies, data emphasis, and call-to-action elements.',
            children: [
                { id: 101, label: 'Educational', title: 'Teach concepts, explain processes, or build understanding.', description: 'Educational infographics break down complex topics into visual steps. They prioritize clarity, logical flow, and scaffolded learning.' },
                { id: 102, label: 'Analytical', title: 'Present data analysis, trends, and statistical findings.', description: 'Analytical infographics emphasize data accuracy, comparisons, and evidence-based conclusions. Charts and graphs are central.' },
                { id: 103, label: 'Persuasive', title: 'Convince the audience to adopt a viewpoint or take action.', description: 'Persuasive infographics use selective data presentation, emotional design, and strong visual hierarchy to guide opinion.' },
                { id: 104, label: 'Promotional', title: 'Market products, services, or brands.', description: 'Promotional infographics blend information with marketing. Brand colors, logos, and calls to action are prominent.' },
                { id: 105, label: 'Narrative', title: 'Tell a story through a visual sequence of events.', description: 'Narrative infographics guide readers through a chronological or thematic storyline using visual flow and pacing.' }
            ]
        },
        {
            id: 2,
            label: 'Structural\nFormat',
            title: 'The physical layout and organizational pattern.',
            color: '#e8913a',
            description: 'Structural format determines how information is spatially organized. The right format depends on the data type and reading pattern.',
            children: [
                { id: 201, label: 'Timeline', title: 'Events arranged chronologically along a line or path.', description: 'Timelines show temporal sequences. They work best for historical events, project milestones, and process evolution.' },
                { id: 202, label: 'Flowchart', title: 'Decision trees and process flows with branching paths.', description: 'Flowcharts map processes, decisions, and workflows. Arrows guide readers through conditional logic and sequential steps.' },
                { id: 203, label: 'Hierarchical', title: 'Tree structures showing parent-child relationships.', description: 'Hierarchical layouts display organizational charts, taxonomies, and classification systems with clear levels of nesting.' },
                { id: 204, label: 'Comparison', title: 'Side-by-side layouts highlighting similarities and differences.', description: 'Comparison formats place two or more items in parallel columns or sections, making differences immediately visible.' },
                { id: 205, label: 'Geographic', title: 'Map-based layouts tied to spatial locations.', description: 'Geographic formats overlay data onto maps, showing regional patterns, distributions, and location-based relationships.' },
                { id: 206, label: 'Statistical', title: 'Chart-heavy layouts dominated by data visualizations.', description: 'Statistical formats center on charts, graphs, and numerical displays. They prioritize quantitative accuracy.' }
            ]
        },
        {
            id: 3,
            label: 'Visual\nComplexity',
            title: 'The level of detail and visual sophistication.',
            color: '#4caf50',
            description: 'Visual complexity ranges from minimal to elaborate. The right level depends on audience expertise and the density of information being conveyed.',
            children: [
                { id: 301, label: 'Minimal', title: 'Simple icons, limited color palette, sparse text.', description: 'Minimal designs use whitespace, simple shapes, and few colors. They communicate one or two key points with maximum clarity.' },
                { id: 302, label: 'Moderate', title: 'Balanced mix of visuals, text, and data elements.', description: 'Moderate complexity balances visual interest with readability. Most educational and business infographics fall here.' },
                { id: 303, label: 'Elaborate', title: 'Rich illustrations, dense data, multiple visual layers.', description: 'Elaborate infographics pack dense information with detailed illustrations, multiple chart types, and layered visual narratives.' }
            ]
        },
        {
            id: 4,
            label: 'Audience',
            title: 'The intended viewers and their expertise level.',
            color: '#9c27b0',
            description: 'Audience determines vocabulary, visual density, and assumed background knowledge. Design choices should match viewer expectations.',
            children: [
                { id: 401, label: 'General\nPublic', title: 'Broad audience with no specialized knowledge assumed.', description: 'Designs for the general public use plain language, familiar metaphors, and high visual appeal to maintain engagement.' },
                { id: 402, label: 'Students', title: 'Learners at various educational levels.', description: 'Student-oriented infographics scaffold complexity, use labeled diagrams, and align with curriculum learning objectives.' },
                { id: 403, label: 'Professionals', title: 'Domain experts who expect technical precision.', description: 'Professional infographics can use domain jargon, dense data, and assume familiarity with standard representations.' },
                { id: 404, label: 'Decision\nMakers', title: 'Executives and leaders who need actionable insights.', description: 'Decision-maker infographics highlight key metrics, trends, and recommendations. They prioritize clarity over completeness.' }
            ]
        },
        {
            id: 5,
            label: 'Content\nDomain',
            title: 'The subject area or field of knowledge.',
            color: '#00897b',
            description: 'Content domain influences visual conventions, expected chart types, and the balance between text and imagery.',
            children: [
                { id: 501, label: 'Science &\nTechnology', title: 'STEM topics including biology, physics, computing.', description: 'Science infographics use diagrams, molecular structures, circuit layouts, and precise labeling of technical components.' },
                { id: 502, label: 'Business &\nFinance', title: 'Economics, marketing, organizational topics.', description: 'Business infographics emphasize KPIs, market trends, org charts, and ROI metrics with professional styling.' },
                { id: 503, label: 'Biology &\nMedicine', title: 'Biology, medical, wellness, and public health topics.', description: 'Biology and medical infographics use anatomical illustrations, risk statistics, and clear action items for patient education.' },
                { id: 504, label: 'Social\nSciences', title: 'History, geography, sociology, psychology.', description: 'Social science infographics combine maps, timelines, demographic data, and cultural context in narrative layouts.' },
                { id: 505, label: 'Arts &\nHumanities', title: 'Literature, philosophy, visual arts, music.', description: 'Arts infographics use creative layouts, rich imagery, and thematic design that reflects the subject aesthetic.' }
            ]
        }
    ]
};

// Track collapsed state of branch nodes
const collapsedBranches = new Set();

// Network instance
let network = null;
let nodesDataSet = null;
let edgesDataSet = null;

// Build full node/edge datasets from taxonomy
function buildGraphData() {
    const nodes = [];
    const edges = [];

    // Root node
    nodes.push({
        id: taxonomyData.root.id,
        label: taxonomyData.root.label,
        level: 0,
        color: {
            background: taxonomyData.root.color,
            border: darken(taxonomyData.root.color),
            highlight: { background: lighten(taxonomyData.root.color), border: taxonomyData.root.color }
        },
        font: { color: '#ffffff', size: 16, face: 'Arial', bold: true },
        shape: 'box',
        margin: 14,
        borderWidth: 3
    });

    // Dimension nodes and leaf nodes
    for (const dim of taxonomyData.dimensions) {
        // Branch node
        const isCollapsed = collapsedBranches.has(dim.id);
        const childCount = dim.children.length;
        nodes.push({
            id: dim.id,
            label: dim.label + (isCollapsed ? '\n(+' + childCount + ')' : ''),
            level: 1,
            color: {
                background: dim.color,
                border: darken(dim.color),
                highlight: { background: lighten(dim.color), border: dim.color }
            },
            font: { color: '#ffffff', size: 14, face: 'Arial', bold: true },
            shape: 'box',
            margin: 12,
            borderWidth: 3,
            size: 20 + childCount * 3
        });

        edges.push({
            from: taxonomyData.root.id,
            to: dim.id,
            color: { color: dim.color, highlight: dim.color },
            width: 2
        });

        // Leaf nodes (only if not collapsed)
        if (!isCollapsed) {
            for (const child of dim.children) {
                nodes.push({
                    id: child.id,
                    label: child.label,
                    level: 2,
                    color: {
                        background: lighten(dim.color),
                        border: dim.color,
                        highlight: { background: '#ffffff', border: dim.color }
                    },
                    font: { color: '#333333', size: 12, face: 'Arial' },
                    shape: 'box',
                    margin: 8,
                    borderWidth: 2
                });

                edges.push({
                    from: dim.id,
                    to: child.id,
                    color: { color: dim.color, highlight: dim.color },
                    width: 1.5,
                    dashes: false
                });
            }
        }
    }

    return { nodes, edges };
}

// Color utility: darken a hex color
function darken(hex) {
    const r = parseInt(hex.slice(1, 3), 16);
    const g = parseInt(hex.slice(3, 5), 16);
    const b = parseInt(hex.slice(5, 7), 16);
    return '#' +
        Math.max(0, Math.floor(r * 0.7)).toString(16).padStart(2, '0') +
        Math.max(0, Math.floor(g * 0.7)).toString(16).padStart(2, '0') +
        Math.max(0, Math.floor(b * 0.7)).toString(16).padStart(2, '0');
}

// Color utility: lighten a hex color
function lighten(hex) {
    const r = parseInt(hex.slice(1, 3), 16);
    const g = parseInt(hex.slice(3, 5), 16);
    const b = parseInt(hex.slice(5, 7), 16);
    return '#' +
        Math.min(255, Math.floor(r + (255 - r) * 0.6)).toString(16).padStart(2, '0') +
        Math.min(255, Math.floor(g + (255 - g) * 0.6)).toString(16).padStart(2, '0') +
        Math.min(255, Math.floor(b + (255 - b) * 0.6)).toString(16).padStart(2, '0');
}

// Find info for a node by ID — combines short title text and longer description
function getNodeInfo(nodeId) {
    if (nodeId === taxonomyData.root.id) {
        return { title: 'Interactive Infographics Taxonomy', body: taxonomyData.root.title };
    }
    for (const dim of taxonomyData.dimensions) {
        if (dim.id === nodeId) {
            return { title: dim.label.replace('\n', ' '), subtitle: dim.title, body: dim.description };
        }
        for (const child of dim.children) {
            if (child.id === nodeId) {
                return { title: child.label.replace('\n', ' '), subtitle: child.title, body: child.description };
            }
        }
    }
    return null;
}

// Position the info panel near a node, clamped within the container
function positionInfoPanel(nodeId) {
    const panel = document.getElementById('info-panel');
    const container = document.querySelector('.container');
    const containerRect = container.getBoundingClientRect();

    // Get node position in canvas coordinates, convert to DOM
    const positions = network.getPositions([nodeId]);
    if (!positions[nodeId]) return;

    const canvasPos = positions[nodeId];
    const domPos = network.canvasToDOM(canvasPos);

    // Offset: place panel to the right and below the node
    const offsetX = 40;
    const offsetY = 5;
    let left = domPos.x + offsetX;
    let top = domPos.y + offsetY;

    // Make panel visible briefly to measure its size
    panel.style.display = 'block';
    const panelWidth = panel.offsetWidth;
    const panelHeight = panel.offsetHeight;

    // Clamp horizontally within container
    if (left + panelWidth > containerRect.width - 10) {
        // Flip to left side of node
        left = domPos.x - panelWidth - offsetX;
    }
    if (left < 10) {
        left = 10;
    }

    // Clamp vertically within container
    if (top + panelHeight > containerRect.height - 10) {
        top = containerRect.height - panelHeight - 10;
    }
    if (top < 10) {
        top = 10;
    }

    panel.style.left = left + 'px';
    panel.style.top = top + 'px';
}

// Show the info panel near a node
function showInfo(nodeId) {
    const panel = document.getElementById('info-panel');
    const info = getNodeInfo(nodeId);
    if (info) {
        let html = '<div class="info-title">' + info.title + '</div>';
        if (info.subtitle) {
            html += '<div class="info-subtitle">' + info.subtitle + '</div>';
        }
        if (info.body) {
            html += '<div class="info-body">' + info.body + '</div>';
        }
        panel.innerHTML = html;
        panel.style.display = 'block';
        positionInfoPanel(nodeId);
    }
}

function resetInfo() {
    const panel = document.getElementById('info-panel');
    panel.style.display = 'none';
}

// Check if a node ID is a branch (dimension) node
function isBranchNode(nodeId) {
    return taxonomyData.dimensions.some(d => d.id === nodeId);
}

// Toggle expand/collapse of a branch
function toggleBranch(dimId) {
    if (collapsedBranches.has(dimId)) {
        collapsedBranches.delete(dimId);
    } else {
        collapsedBranches.add(dimId);
    }
    rebuildNetwork();
}

// Rebuild the network with current collapsed state
function rebuildNetwork() {
    const graphData = buildGraphData();
    nodesDataSet = new vis.DataSet(graphData.nodes);
    edgesDataSet = new vis.DataSet(graphData.edges);
    network.setData({ nodes: nodesDataSet, edges: edgesDataSet });
}

// Detect iframe context
function isInIframe() {
    try { return window.self !== window.top; } catch (e) { return true; }
}

// Initialize
function initializeNetwork() {
    const graphData = buildGraphData();
    nodesDataSet = new vis.DataSet(graphData.nodes);
    edgesDataSet = new vis.DataSet(graphData.edges);

    const enableMouseInteraction = !isInIframe();

    const options = {
        layout: {
            hierarchical: {
                direction: 'LR',
                sortMethod: 'directed',
                levelSeparation: 200,
                nodeSpacing: 40,
                treeSpacing: 30,
                blockShifting: true,
                edgeMinimization: true
            }
        },
        physics: { enabled: false },
        interaction: {
            hover: true,
            tooltipDelay: 200,
            zoomView: enableMouseInteraction,
            dragView: enableMouseInteraction,
            dragNodes: false,
            navigationButtons: true
        },
        nodes: {
            shadow: {
                enabled: true,
                color: 'rgba(0,0,0,0.15)',
                size: 4,
                x: 2,
                y: 2
            }
        },
        edges: {
            arrows: { to: { enabled: false } },
            smooth: { type: 'cubicBezier', roundness: 0.5 }
        }
    };

    const container = document.getElementById('network');
    network = new vis.Network(container, { nodes: nodesDataSet, edges: edgesDataSet }, options);

    // Click handler: toggle branches, show info for leaves
    network.on('click', function(params) {
        if (params.nodes.length > 0) {
            const nodeId = params.nodes[0];
            if (isBranchNode(nodeId)) {
                toggleBranch(nodeId);
                showInfo(nodeId);
            } else {
                showInfo(nodeId);
            }
        } else {
            resetInfo();
        }
    });

    // Hover handler: show info
    network.on('hoverNode', function(params) {
        showInfo(params.node);
    });

    network.on('blurNode', function() {
        resetInfo();
    });

    // Send height to parent for auto-resize
    window.parent.postMessage({ type: 'microsim-resize', height: 1100 }, '*');
}

document.addEventListener('DOMContentLoaded', initializeNetwork);
