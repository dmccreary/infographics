// Learning Path Explorer MicroSim
// vis-network graph with mastery tracking and prerequisite chain analysis
// Bloom Level: Analyze (L4) — examine dependencies, trace learning paths

const taxonomyColors = {
    'WEBFD': { bg: '#2196F3', border: '#1565C0', font: '#FFF' },
    'OVRLY': { bg: '#4CAF50', border: '#2E7D32', font: '#FFF' },
    'MSIM':  { bg: '#FF9800', border: '#E65100', font: '#FFF' },
    'LEARN': { bg: '#9C27B0', border: '#6A1B9A', font: '#FFF' }
};

const masteredColor = { bg: '#FFD700', border: '#FFA000', font: '#333' };
const lockedColor = { bg: '#E0E0E0', border: '#BDBDBD', font: '#999' };

// Subset of course concepts (overlay-related learning path)
const nodeData = [
    // WEBFD foundation
    { id: 1, label: 'HTML Basics', tax: 'WEBFD', x: -400, y: -200 },
    { id: 2, label: 'CSS Styling', tax: 'WEBFD', x: -300, y: -200 },
    { id: 3, label: 'JavaScript Intro', tax: 'WEBFD', x: -200, y: -200 },
    { id: 4, label: 'DOM Manipulation', tax: 'WEBFD', x: -100, y: -150 },
    { id: 5, label: 'Event Listeners', tax: 'WEBFD', x: 0, y: -150 },
    { id: 6, label: 'JSON Data Format', tax: 'WEBFD', x: -350, y: -100 },
    { id: 7, label: 'Responsive Design', tax: 'WEBFD', x: -200, y: -100 },
    // OVRLY patterns
    { id: 8, label: 'Overlay Concept', tax: 'OVRLY', x: -250, y: 0 },
    { id: 9, label: 'Rectangular Overlay', tax: 'OVRLY', x: -350, y: 80 },
    { id: 10, label: 'Polygon Overlay', tax: 'OVRLY', x: -200, y: 80 },
    { id: 11, label: 'Callout Overlay', tax: 'OVRLY', x: -100, y: 80 },
    { id: 12, label: 'Floating Overlay', tax: 'OVRLY', x: 0, y: 80 },
    { id: 13, label: 'Hit Detection', tax: 'OVRLY', x: -150, y: 0 },
    { id: 14, label: 'Region Config', tax: 'OVRLY', x: -50, y: 0 },
    // MSIM standards
    { id: 15, label: 'MicroSim Structure', tax: 'MSIM', x: 100, y: -100 },
    { id: 16, label: 'Canvas Setup', tax: 'MSIM', x: 150, y: 0 },
    { id: 17, label: 'Control Panel', tax: 'MSIM', x: 200, y: 80 },
    { id: 18, label: 'Iframe Embedding', tax: 'MSIM', x: 100, y: 80 },
    { id: 19, label: 'Metadata (Dublin Core)', tax: 'MSIM', x: 250, y: 0 },
    // LEARN science
    { id: 20, label: "Bloom's Taxonomy", tax: 'LEARN', x: 50, y: -200 },
    { id: 21, label: 'Cognitive Load', tax: 'LEARN', x: 150, y: -200 },
    { id: 22, label: 'Zone of Proximal Dev', tax: 'LEARN', x: 250, y: -200 },
    { id: 23, label: 'Constructivism', tax: 'LEARN', x: 200, y: -120 },
    { id: 24, label: 'Active Learning', tax: 'LEARN', x: 300, y: -120 },
    { id: 25, label: 'Learning Analytics', tax: 'LEARN', x: 300, y: 80 }
];

const edgeData = [
    { from: 1, to: 2 }, { from: 1, to: 3 }, { from: 2, to: 7 },
    { from: 3, to: 4 }, { from: 3, to: 6 }, { from: 4, to: 5 },
    { from: 5, to: 13 }, { from: 6, to: 14 }, { from: 7, to: 8 },
    { from: 4, to: 8 }, { from: 8, to: 9 }, { from: 8, to: 10 },
    { from: 8, to: 11 }, { from: 8, to: 12 },
    { from: 13, to: 9 }, { from: 13, to: 10 },
    { from: 14, to: 9 }, { from: 14, to: 11 },
    { from: 3, to: 15 }, { from: 15, to: 16 }, { from: 16, to: 17 },
    { from: 7, to: 18 }, { from: 15, to: 18 }, { from: 15, to: 19 },
    { from: 20, to: 23 }, { from: 21, to: 23 }, { from: 22, to: 23 },
    { from: 23, to: 24 }, { from: 5, to: 25 }, { from: 24, to: 25 }
];

let network, nodes, edges;
let mastered = new Set();

function isInIframe() {
    try { return window.self !== window.top; } catch (e) { return true; }
}

function getNodeColor(nodeId) {
    if (mastered.has(nodeId)) return masteredColor;
    // Check if all prerequisites are mastered
    const prereqs = edgeData.filter(e => e.to === nodeId).map(e => e.from);
    const allPrereqsMastered = prereqs.length === 0 || prereqs.every(p => mastered.has(p));
    if (allPrereqsMastered) {
        const node = nodeData.find(n => n.id === nodeId);
        return taxonomyColors[node.tax];
    }
    return lockedColor;
}

function initializeNetwork() {
    const initialNodes = nodeData.map(n => {
        const c = getNodeColor(n.id);
        const degree = edgeData.filter(e => e.from === n.id).length;
        return {
            id: n.id, label: n.label, x: n.x, y: n.y,
            color: { background: c.bg, border: c.border },
            font: { color: c.font, size: Math.max(14, 13 + degree) },
            size: Math.max(18, 15 + degree * 2),
            borderWidth: 3,
            shadow: { enabled: true, color: 'rgba(0,0,0,0.15)', size: 4, x: 2, y: 2 }
        };
    });

    const initialEdges = edgeData.map((e, i) => ({
        id: i, from: e.from, to: e.to,
        color: { color: '#AAA' }, width: 1.5
    }));

    nodes = new vis.DataSet(initialNodes);
    edges = new vis.DataSet(initialEdges);

    const enableMouse = !isInIframe();
    const options = {
        layout: { improvedLayout: false },
        physics: { enabled: false },
        interaction: {
            zoomView: enableMouse, dragView: enableMouse, dragNodes: false,
            navigationButtons: true, hover: true
        },
        nodes: { shape: 'box', margin: 10 },
        edges: {
            arrows: { to: { enabled: true, scaleFactor: 1 } },
            smooth: { type: 'curvedCW', roundness: 0.12 }
        }
    };

    const container = document.getElementById('network');
    network = new vis.Network(container, { nodes, edges }, options);

    network.once('afterDrawing', function() {
        const pos = network.getViewPosition();
        network.moveTo({ position: { x: pos.x + 60, y: pos.y + 10 }, animation: false });
    });

    network.on('click', function(params) {
        if (params.nodes.length > 0) showNodeDetails(params.nodes[0]);
    });

    network.on('doubleClick', function(params) {
        if (params.nodes.length > 0) toggleMastery(params.nodes[0]);
    });

    updateMasteryUI();
}

function showNodeDetails(nodeId) {
    const node = nodeData.find(n => n.id === nodeId);
    if (!node) return;

    const prereqs = edgeData.filter(e => e.to === nodeId).map(e => nodeData.find(n => n.id === e.from));
    const deps = edgeData.filter(e => e.from === nodeId).map(e => nodeData.find(n => n.id === e.to));

    // Build learning path (all ancestors in order)
    const path = getLearningPath(nodeId);

    let html = '<p><strong>' + node.label + '</strong> [' + node.tax + ']</p>';
    html += '<p>' + (mastered.has(nodeId) ? '⭐ Mastered' : 'Not mastered') + '</p>';

    if (prereqs.length > 0) {
        html += '<p><strong>Prerequisites:</strong></p>';
        prereqs.forEach(p => {
            const icon = mastered.has(p.id) ? '✅' : '⬜';
            html += '<p>' + icon + ' ' + p.label + '</p>';
        });
    }

    if (deps.length > 0) {
        html += '<p><strong>Unlocks:</strong></p>';
        deps.forEach(d => { html += '<p>→ ' + d.label + '</p>'; });
    }

    if (path.length > 1) {
        html += '<p><strong>Learning Path:</strong></p>';
        html += '<p>' + path.map(p => p.label).join(' → ') + '</p>';
    }

    document.getElementById('info-content').innerHTML = html;

    // Highlight prereq and dep chains
    const prereqIds = new Set(prereqs.map(p => p.id));
    const depIds = new Set(deps.map(d => d.id));
    prereqIds.add(nodeId);
    depIds.add(nodeId);

    edges.forEach(e => {
        if (prereqIds.has(e.from) && e.to === nodeId) {
            edges.update({ id: e.id, color: { color: '#FFD700' }, width: 3 });
        } else if (e.from === nodeId && depIds.has(e.to)) {
            edges.update({ id: e.id, color: { color: '#81C784' }, width: 3 });
        } else {
            edges.update({ id: e.id, color: { color: '#DDD' }, width: 1 });
        }
    });
}

function getLearningPath(targetId) {
    // Simple BFS to find one path from a root to the target
    const parents = {};
    const visited = new Set();
    const queue = [];

    // Find root nodes (no incoming edges)
    const roots = nodeData.filter(n => !edgeData.some(e => e.to === n.id)).map(n => n.id);
    roots.forEach(r => { queue.push(r); visited.add(r); parents[r] = null; });

    while (queue.length > 0) {
        const current = queue.shift();
        if (current === targetId) break;
        edgeData.filter(e => e.from === current).forEach(e => {
            if (!visited.has(e.to)) {
                visited.add(e.to);
                parents[e.to] = current;
                queue.push(e.to);
            }
        });
    }

    const path = [];
    let cur = targetId;
    while (cur !== null && cur !== undefined) {
        path.unshift(nodeData.find(n => n.id === cur));
        cur = parents[cur];
    }
    return path;
}

function toggleMastery(nodeId) {
    if (mastered.has(nodeId)) {
        mastered.delete(nodeId);
    } else {
        mastered.add(nodeId);
    }
    refreshNodeColors();
    updateMasteryUI();
    showNodeDetails(nodeId);
}

function refreshNodeColors() {
    nodeData.forEach(n => {
        const c = getNodeColor(n.id);
        nodes.update({
            id: n.id,
            color: { background: c.bg, border: c.border },
            font: { color: c.font }
        });
    });
    // Reset edges
    edges.forEach(e => {
        edges.update({ id: e.id, color: { color: '#AAA' }, width: 1.5 });
    });
}

function updateMasteryUI() {
    const total = nodeData.length;
    const count = mastered.size;
    document.getElementById('mastery-count').textContent = count;
    document.getElementById('total-count').textContent = total;
    document.getElementById('mastery-fill').style.width = (count / total * 100) + '%';
}

function resetAll() {
    mastered.clear();
    refreshNodeColors();
    updateMasteryUI();
    document.getElementById('info-content').innerHTML =
        '<p>Click a node to see its dependencies.</p>' +
        '<p>Double-click to mark as <strong>mastered</strong>.</p>';
    network.fit({ animation: true });
}

document.addEventListener('DOMContentLoaded', function() {
    initializeNetwork();
    document.getElementById('reset-btn').addEventListener('click', resetAll);
    document.getElementById('topo-btn').addEventListener('click', function() {
        // Simple topological sort animation — spread nodes left to right
        const sorted = topologicalSort();
        sorted.forEach((nodeId, i) => {
            const x = -350 + (i % 8) * 100;
            const y = -200 + Math.floor(i / 8) * 120;
            nodes.update({ id: nodeId, x: x, y: y });
        });
        network.fit({ animation: { duration: 1000, easingFunction: 'easeInOutQuad' } });
    });
});

function topologicalSort() {
    const inDegree = {};
    nodeData.forEach(n => { inDegree[n.id] = 0; });
    edgeData.forEach(e => { inDegree[e.to] = (inDegree[e.to] || 0) + 1; });

    const queue = nodeData.filter(n => inDegree[n.id] === 0).map(n => n.id);
    const result = [];

    while (queue.length > 0) {
        const current = queue.shift();
        result.push(current);
        edgeData.filter(e => e.from === current).forEach(e => {
            inDegree[e.to]--;
            if (inDegree[e.to] === 0) queue.push(e.to);
        });
    }
    return result;
}
