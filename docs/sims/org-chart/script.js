// Global variables
let fullData = null;
let network = null;
let currentEmployeeCount = 25;
let titleOnly = true;
let isInIframe = false;

// Detect whether we are running inside an iframe
function detectIframe() {
    try {
        isInIframe = window.self !== window.top;
    } catch (e) {
        // Cross-origin iframes throw a security error — treat as iframe
        isInIframe = true;
    }
}

// Break a title at spaces so long titles wrap inside narrow boxes.
// "Head of Customer Support" → "Head of\nCustomer\nSupport"
// Short titles (≤ maxLen chars) are returned unchanged.
function wrapTitle(title, maxLen) {
    if (title.length <= maxLen) return title;
    const words = title.split(' ');
    let lines = [];
    let current = words[0];
    for (let i = 1; i < words.length; i++) {
        if ((current + ' ' + words[i]).length <= maxLen) {
            current += ' ' + words[i];
        } else {
            lines.push(current);
            current = words[i];
        }
    }
    lines.push(current);
    return lines.join('\n');
}

// Extract title from label (format: "Name\\nTitle")
function extractTitle(label) {
    const parts = label.split('\\n');
    return parts.length > 1 ? parts[1] : label;
}

// Extract name from label (format: "Name\\nTitle")
function extractName(label) {
    const parts = label.split('\\n');
    return parts[0];
}

// Color scheme: white text on dark backgrounds at every level
const levelColors = {
    0: { background: '#8B2500', border: '#5C1A00' },  // brick red — CEO
    1: { background: '#1B3A5C', border: '#0F2440' },  // navy blue — C-Suite/Heads
    2: { background: '#5B2C6F', border: '#3A1A47' },  // deep purple — Directors/Managers
    3: { background: '#1A6B5A', border: '#0E4A3E' },  // dark teal — Team Leads
    4: { background: '#3E5060', border: '#2A3740' },  // dark slate — Senior ICs
    5: { background: '#4A4A4A', border: '#333333' }   // charcoal — ICs
};

// Create node label based on title-only setting and iframe context
function createNodeLabel(node) {
    const maxLen = isInIframe ? 12 : 18;
    if (titleOnly) {
        return wrapTitle(extractTitle(node.label), maxLen);
    } else {
        // Name on first line, wrapped title below
        const name = extractName(node.label);
        const title = extractTitle(node.label);
        return name + '\n' + wrapTitle(title, maxLen);
    }
}

// Filter and prepare data based on employee count
function prepareData(count) {
    if (!fullData) return null;

    // Take first N nodes, apply level-based colors with white text
    const filteredNodes = fullData.nodes.slice(0, count).map(node => {
        const colors = levelColors[node.level] || levelColors[5];
        return {
            ...node,
            label: createNodeLabel(node),
            color: { background: colors.background, border: colors.border },
            font: { color: 'white', size: 14, face: 'Arial', multi: true }
        };
    });

    // Get IDs of filtered nodes
    const nodeIds = new Set(filteredNodes.map(n => n.id));

    // Filter edges to only include connections between filtered nodes
    const filteredEdges = fullData.edges.filter(edge =>
        nodeIds.has(edge.from) && nodeIds.has(edge.to)
    );

    return {
        nodes: filteredNodes,
        edges: filteredEdges
    };
}

// Create or update the network visualization
function updateNetwork() {
    const data = prepareData(currentEmployeeCount);
    if (!data) return;

    // Create vis.js DataSets
    const nodes = new vis.DataSet(data.nodes);
    const edges = new vis.DataSet(data.edges);

    // Get the network container
    const container = document.getElementById('mynetwork');

    // Prepare data object
    const networkData = {
        nodes: nodes,
        edges: edges
    };

    // Adjust spacing and font size based on iframe vs fullscreen
    const fontSize = isInIframe ? 14 : 14;
    const nodeSpacing = isInIframe ? 100 : 150;
    const levelSeparation = isInIframe ? 90 : 120;
    const maxWidth = isInIframe ? 110 : 150;

    // Configure network options
    const options = {
        layout: {
            hierarchical: {
                direction: 'UD', // Up-Down (top-down)
                sortMethod: 'directed',
                nodeSpacing: nodeSpacing,
                levelSeparation: levelSeparation,
                treeSpacing: 200
            }
        },
        nodes: {
            shape: 'box',
            margin: { top: 10, bottom: 10, left: 4, right: 4 },
            widthConstraint: {
                maximum: maxWidth
            },
            font: {
                size: fontSize,
                face: 'Arial',
                multi: true
            },
            borderWidth: 2,
            shadow: true
        },
        edges: {
            arrows: {
                to: {
                    enabled: true,
                    scaleFactor: 0.5
                }
            },
            color: {
                color: '#848484',
                highlight: '#2B7CE9'
            },
            width: 2,
            smooth: {
                type: 'cubicBezier',
                forceDirection: 'vertical',
                roundness: 0.4
            }
        },
        interaction: {
            dragNodes: true,
            dragView: true,
            zoomView: false, // disable default scroll-to-zoom to prevent hijacking
            hover: true,
            navigationButtons: true // show zoom/pan controls
        },
        physics: {
            enabled: false
        }
    };

    // Create or update the network
    if (network) {
        network.destroy();
    }
    network = new vis.Network(container, networkData, options);

    // Zoom only on shift+scroll (horizontal scroll gesture) to avoid hijacking page scroll
    container.addEventListener('wheel', function(e) {
        if (e.shiftKey) {
            e.preventDefault();
            const scale = network.getScale();
            const delta = e.deltaY > 0 ? 0.9 : 1.1;
            network.moveTo({ scale: scale * delta });
        }
        // Without shift, the event bubbles up and scrolls the page normally
    }, { passive: false });

    // Fit the network to the container after initialization
    network.once('stabilizationIterationsDone', function() {
        network.fit();
    });

    // Update subtitle
    document.getElementById('subtitle').textContent =
        `Typical Organization - Showing ${currentEmployeeCount} Key Positions`;
}

// Size the network container to fill the space between header and controls
function sizeNetworkContainer() {
    const header = document.querySelector('.header');
    const controls = document.querySelector('.controls');
    const container = document.getElementById('mynetwork');
    let viewHeight = window.innerHeight;
    // In some iframes, innerHeight can be 0 before layout completes
    if (viewHeight < 100) {
        viewHeight = 500; // fallback for iframe embed
    }
    const available = viewHeight - header.offsetHeight - controls.offsetHeight;
    container.style.height = Math.max(available, 300) + 'px';
}

// Fetch and initialize the organization chart
async function initOrgChart() {
    try {
        detectIframe();

        // Load data from data.json
        const response = await fetch('data.json');
        fullData = await response.json();

        // Set up event listeners for controls
        const employeeSlider = document.getElementById('employeeCount');
        const countDisplay = document.getElementById('countValue');
        const titleOnlyCheckbox = document.getElementById('titleOnly');

        // Set defaults based on iframe detection
        if (isInIframe) {
            currentEmployeeCount = 15;
            employeeSlider.value = 15;
            employeeSlider.max = 30;
            countDisplay.textContent = 15;
        }

        // Slider change handler
        employeeSlider.addEventListener('input', function() {
            currentEmployeeCount = parseInt(this.value);
            countDisplay.textContent = currentEmployeeCount;
            updateNetwork();
        });

        // Checkbox change handler
        titleOnlyCheckbox.addEventListener('change', function() {
            titleOnly = this.checked;
            updateNetwork();
        });

        // Size container and render
        sizeNetworkContainer();
        updateNetwork();

        window.addEventListener('resize', function() {
            sizeNetworkContainer();
            updateNetwork();
        });

    } catch (error) {
        console.error('Error loading organization chart:', error);
    }
}

// Initialize the chart when the page loads
document.addEventListener('DOMContentLoaded', initOrgChart);
