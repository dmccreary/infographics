// Interactive Learning Graph Explorer
// vis-network visualization of JS library concept dependencies
// Bloom Level: Analyze (L4) — examine dependency relationships

// Library color groups
const libraryColors = {
    'p5.js':       { bg: '#4285F4', border: '#1565C0', font: '#FFFFFF' },
    'D3.js':       { bg: '#FF9800', border: '#E65100', font: '#FFFFFF' },
    'Chart.js':    { bg: '#4CAF50', border: '#2E7D32', font: '#FFFFFF' },
    'vis-network': { bg: '#9C27B0', border: '#6A1B9A', font: '#FFFFFF' },
    'Leaflet':     { bg: '#F44336', border: '#C62828', font: '#FFFFFF' },
    'Advanced':    { bg: '#009688', border: '#00695C', font: '#FFFFFF' },
    'Cross':       { bg: '#9E9E9E', border: '#616161', font: '#FFFFFF' }
};

// Node definitions grouped by library
const nodeData = [
    // p5.js (blue)
    { id: 1, label: 'p5.js Library', group: 'p5.js', x: -400, y: -200 },
    { id: 2, label: 'Setup Function', group: 'p5.js', x: -350, y: -100 },
    { id: 3, label: 'Draw Function', group: 'p5.js', x: -300, y: -50 },
    { id: 4, label: 'createCanvas', group: 'p5.js', x: -450, y: -100 },
    { id: 5, label: 'Event Handling', group: 'p5.js', x: -250, y: -150 },
    // D3.js (orange)
    { id: 6, label: 'D3.js Library', group: 'D3.js', x: -100, y: -250 },
    { id: 7, label: 'Data-Driven Docs', group: 'D3.js', x: -50, y: -150 },
    { id: 8, label: 'D3 Selection', group: 'D3.js', x: 0, y: -200 },
    { id: 9, label: 'D3 Data Binding', group: 'D3.js', x: -50, y: -100 },
    // Chart.js (green)
    { id: 10, label: 'Chart.js Library', group: 'Chart.js', x: 200, y: -250 },
    { id: 11, label: 'Chart Type Selection', group: 'Chart.js', x: 250, y: -150 },
    { id: 12, label: 'Bar Chart', group: 'Chart.js', x: 150, y: -50 },
    { id: 13, label: 'Line Chart', group: 'Chart.js', x: 200, y: -50 },
    { id: 14, label: 'Pie Chart', group: 'Chart.js', x: 250, y: -50 },
    { id: 15, label: 'Scatter Plot', group: 'Chart.js', x: 300, y: -50 },
    { id: 16, label: 'Radar Chart', group: 'Chart.js', x: 350, y: -50 },
    { id: 17, label: 'Histogram', group: 'Chart.js', x: 150, y: 20 },
    { id: 18, label: 'Donut Chart', group: 'Chart.js', x: 300, y: 20 },
    // vis-network (purple)
    { id: 19, label: 'vis-network Library', group: 'vis-network', x: -400, y: 50 },
    { id: 20, label: 'Network Graph', group: 'vis-network', x: -350, y: 130 },
    { id: 21, label: 'Node', group: 'vis-network', x: -450, y: 130 },
    { id: 22, label: 'Edge', group: 'vis-network', x: -300, y: 180 },
    // Leaflet (red)
    { id: 23, label: 'Leaflet Library', group: 'Leaflet', x: -100, y: 80 },
    { id: 24, label: 'Geographic Info', group: 'Leaflet', x: -50, y: 150 },
    { id: 25, label: 'Map Tile Layer', group: 'Leaflet', x: -150, y: 160 },
    // Advanced D3 (teal)
    { id: 26, label: 'Treemap', group: 'Advanced', x: 50, y: 80 },
    { id: 27, label: 'Sankey Diagram', group: 'Advanced', x: 100, y: 130 },
    { id: 28, label: 'Chord Diagram', group: 'Advanced', x: 50, y: 180 },
    { id: 29, label: 'Word Cloud', group: 'Advanced', x: 150, y: 180 },
    { id: 30, label: 'Gauge Chart', group: 'Advanced', x: 100, y: 230 },
    { id: 31, label: 'Sparkline', group: 'Advanced', x: 200, y: 130 },
    // Cross-cutting (gray)
    { id: 32, label: 'Library Selection', group: 'Cross', x: 200, y: 250 },
    { id: 33, label: 'Dashboard Layout', group: 'Cross', x: 300, y: 250 }
];

// Edge definitions (prerequisite → dependent)
const edgeData = [
    { from: 1, to: 2 }, { from: 1, to: 4 }, { from: 2, to: 3 },
    { from: 2, to: 5 }, { from: 4, to: 3 },
    { from: 6, to: 7 }, { from: 6, to: 8 }, { from: 8, to: 9 },
    { from: 10, to: 11 }, { from: 11, to: 12 }, { from: 11, to: 13 },
    { from: 11, to: 14 }, { from: 11, to: 15 }, { from: 11, to: 16 },
    { from: 11, to: 17 }, { from: 14, to: 18 },
    { from: 19, to: 20 }, { from: 19, to: 21 }, { from: 19, to: 22 },
    { from: 21, to: 20 }, { from: 22, to: 20 },
    { from: 23, to: 24 }, { from: 23, to: 25 },
    { from: 9, to: 26 }, { from: 9, to: 27 }, { from: 9, to: 28 },
    { from: 9, to: 29 }, { from: 9, to: 30 }, { from: 9, to: 31 },
    { from: 1, to: 32 }, { from: 6, to: 32 }, { from: 10, to: 32 },
    { from: 19, to: 32 }, { from: 23, to: 32 },
    { from: 32, to: 33 }, { from: 10, to: 33 }
];

let network, nodes, edges;
let selectedNodeId = null;

function isInIframe() {
    try { return window.self !== window.top; } catch (e) { return true; }
}

function initializeNetwork() {
    // Build nodes with colors based on group
    const initialNodes = nodeData.map(n => {
        const c = libraryColors[n.group];
        // Size proportional to connections
        const degree = edgeData.filter(e => e.from === n.id || e.to === n.id).length;
        return {
            id: n.id, label: n.label, x: n.x, y: n.y,
            group: n.group,
            color: { background: c.bg, border: c.border,
                     highlight: { background: c.bg, border: '#FFD700' } },
            font: { color: c.font, size: Math.max(14, 12 + degree) },
            size: Math.max(20, 15 + degree * 3),
            title: n.label + ' (' + n.group + ')'
        };
    });

    const initialEdges = edgeData.map((e, i) => ({
        id: i, from: e.from, to: e.to,
        color: { color: '#999', highlight: '#FFD700' },
        width: 1.5
    }));

    nodes = new vis.DataSet(initialNodes);
    edges = new vis.DataSet(initialEdges);

    const enableMouse = !isInIframe();
    const options = {
        layout: { improvedLayout: false },
        physics: { enabled: false },
        interaction: {
            selectConnectedEdges: true,
            zoomView: enableMouse,
            dragView: enableMouse,
            dragNodes: false,
            navigationButtons: true,
            hover: true
        },
        nodes: {
            shape: 'box', margin: 10,
            borderWidth: 3,
            shadow: { enabled: true, color: 'rgba(0,0,0,0.2)', size: 5, x: 2, y: 2 }
        },
        edges: {
            arrows: { to: { enabled: true, scaleFactor: 1 } },
            width: 1.5,
            smooth: { type: 'curvedCW', roundness: 0.15 }
        }
    };

    const container = document.getElementById('network');
    network = new vis.Network(container, { nodes, edges }, options);

    // Position view to offset for right panel
    network.once('afterDrawing', function() {
        const pos = network.getViewPosition();
        network.moveTo({
            position: { x: pos.x + 60, y: pos.y + 20 },
            animation: false
        });
    });

    // Click handler
    network.on('click', function(params) {
        if (params.nodes.length > 0) {
            selectNode(params.nodes[0]);
        } else {
            clearSelection();
        }
    });

    // Double-click: highlight full prerequisite chain
    network.on('doubleClick', function(params) {
        if (params.nodes.length > 0) {
            highlightPrereqChain(params.nodes[0]);
        }
    });

    updateStats();
}

function selectNode(nodeId) {
    selectedNodeId = nodeId;
    const node = nodeData.find(n => n.id === nodeId);
    if (!node) return;

    // Find prerequisites (incoming) and dependents (outgoing)
    const prereqs = edgeData.filter(e => e.to === nodeId).map(e => {
        const n = nodeData.find(nd => nd.id === e.from);
        return n ? n.label : '';
    });
    const dependents = edgeData.filter(e => e.from === nodeId).map(e => {
        const n = nodeData.find(nd => nd.id === e.to);
        return n ? n.label : '';
    });

    const c = libraryColors[node.group];
    let html = '<p><strong>' + node.label + '</strong></p>';
    html += '<p><span class="tag" style="background:' + c.bg + '">' + node.group + '</span></p>';

    if (prereqs.length > 0) {
        html += '<p><strong>Prerequisites:</strong></p>';
        prereqs.forEach(p => { html += '<p>← ' + p + '</p>'; });
    } else {
        html += '<p><em>No prerequisites (root concept)</em></p>';
    }

    if (dependents.length > 0) {
        html += '<p><strong>Dependents:</strong></p>';
        dependents.forEach(d => { html += '<p>→ ' + d + '</p>'; });
    } else {
        html += '<p><em>No dependents (leaf concept)</em></p>';
    }

    document.getElementById('info-content').innerHTML = html;
    document.getElementById('info-title').textContent = 'Concept Details';

    // Dim unconnected nodes
    const connected = new Set([nodeId]);
    edgeData.forEach(e => {
        if (e.from === nodeId) connected.add(e.to);
        if (e.to === nodeId) connected.add(e.from);
    });

    nodes.forEach(n => {
        const isConn = connected.has(n.id);
        nodes.update({
            id: n.id,
            opacity: isConn ? 1.0 : 0.25
        });
    });
}

function highlightPrereqChain(nodeId) {
    // BFS backwards to find all ancestors
    const ancestors = new Set();
    const queue = [nodeId];
    while (queue.length > 0) {
        const current = queue.shift();
        edgeData.forEach(e => {
            if (e.to === current && !ancestors.has(e.from)) {
                ancestors.add(e.from);
                queue.push(e.from);
            }
        });
    }
    ancestors.add(nodeId);

    // Highlight ancestors in yellow, dim others
    nodes.forEach(n => {
        if (ancestors.has(n.id)) {
            const c = n.id === nodeId ? '#FFD700' : '#FFF9C4';
            nodes.update({ id: n.id, opacity: 1.0,
                color: { background: c, border: '#FFA000' } });
        } else {
            nodes.update({ id: n.id, opacity: 0.15 });
        }
    });

    // Highlight prerequisite edges
    edges.forEach(e => {
        if (ancestors.has(e.from) && ancestors.has(e.to)) {
            edges.update({ id: e.id, color: { color: '#FFD700' }, width: 3 });
        } else {
            edges.update({ id: e.id, color: { color: '#DDD' }, width: 1 });
        }
    });

    const node = nodeData.find(n => n.id === nodeId);
    document.getElementById('info-content').innerHTML =
        '<p><strong>Prerequisite Chain for:</strong><br>' + node.label + '</p>' +
        '<p>' + ancestors.size + ' concepts in chain (shown in yellow)</p>' +
        '<p><em>Double-click another node or click Reset to clear.</em></p>';
}

function clearSelection() {
    selectedNodeId = null;
    // Restore all nodes to original colors
    nodeData.forEach(n => {
        const c = libraryColors[n.group];
        nodes.update({
            id: n.id, opacity: 1.0,
            color: { background: c.bg, border: c.border,
                     highlight: { background: c.bg, border: '#FFD700' } }
        });
    });

    // Restore edges
    edges.forEach(e => {
        edges.update({ id: e.id, color: { color: '#999' }, width: 1.5 });
    });

    document.getElementById('info-content').innerHTML =
        '<p>Click a node to see its details, prerequisites, and dependents.</p>' +
        '<p>Double-click to trace the full prerequisite chain.</p>';
}

function updateStats() {
    document.getElementById('stats').textContent =
        'Nodes: ' + nodeData.length + ' | Edges: ' + edgeData.length;
}

// Search functionality
function setupSearch() {
    const searchInput = document.getElementById('search-input');
    searchInput.addEventListener('input', function() {
        const query = this.value.toLowerCase().trim();
        if (!query) {
            clearSelection();
            return;
        }
        const match = nodeData.find(n => n.label.toLowerCase().includes(query));
        if (match) {
            network.selectNodes([match.id]);
            selectNode(match.id);
            network.focus(match.id, { scale: 1.2, animation: true });
        }
    });
}

// Initialize
document.addEventListener('DOMContentLoaded', function() {
    initializeNetwork();
    setupSearch();
    document.getElementById('reset-btn').addEventListener('click', function() {
        clearSelection();
        network.fit({ animation: true });
        document.getElementById('search-input').value = '';
    });
});
