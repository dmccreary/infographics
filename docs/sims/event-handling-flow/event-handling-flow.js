/* Event Handling Data Flow MicroSim
 * Loads Mermaid diagram data and wires hover/click interactions
 */

const infoDisplay = document.getElementById('info-display');
const infoPanel = document.querySelector('.info-panel');
const titleEl = document.querySelector('.microsim-title');
const subtitleEl = document.querySelector('.microsim-subtitle');
const instructionsEl = document.querySelector('.instructions');
const tooltipHintEl = document.querySelector('.tooltip-hint');
const mermaidHost = document.querySelector('.mermaid');

let simData = null;
let nodeMap = {};
let defaultInfoHtml = '';
let selectedElement = null;

/**
 * Populate panel text that does not depend on Mermaid
 */
function applyStaticContent() {
  if (!simData) {
    return;
  }
  titleEl.textContent = simData.title || 'Event Handling Diagram';
  subtitleEl.textContent =
    simData.subtitle || 'Three-phase pattern for interactive infographics';
  defaultInfoHtml = `<p class="info-placeholder">${simData.instructions}</p>`;
  infoDisplay.innerHTML = defaultInfoHtml;
  instructionsEl.textContent = simData.instructions;
  if (tooltipHintEl) {
    tooltipHintEl.textContent = 'Hover a step to read its tooltip, then click to see full details here.';
  }
}

/**
 * Load Mermaid text into the host element and trigger rendering
 */
async function renderMermaid() {
  if (!window.mermaid) {
    throw new Error('Mermaid library is not available.');
  }
  mermaidHost.textContent = simData.mermaid.trim();
  await window.mermaid.run({ nodes: [mermaidHost] });
}

/**
 * Remove selected styling from any node
 */
function clearSelection() {
  if (selectedElement) {
    selectedElement.classList.remove('selected');
  }
  selectedElement = null;
}

/**
 * Update info panel with node detail content
 */
function showDetails(nodeId) {
  const info = nodeMap[nodeId];
  if (!info) {
    return;
  }
  infoPanel.classList.add('details-active');
  infoDisplay.innerHTML = `
    <div class="info-title">${info.label}</div>
    <div class="info-content">${info.details}</div>
  `;
}

/**
 * Restore instructions message in info panel
 */
function resetInfoPanel() {
  infoPanel.classList.remove('details-active');
  infoDisplay.innerHTML = defaultInfoHtml;
}

/**
 * Attach hover and click behaviors to rendered Mermaid nodes
 */
function wireNodeInteractions() {
  const nodes = document.querySelectorAll('.node');
  nodes.forEach(node => {
    const nodeId = node.id.replace('flowchart-', '').split('-')[0];
    const info = nodeMap[nodeId];
    if (!info) {
      return;
    }

    node.setAttribute('title', info.summary);
    node.setAttribute('role', 'button');
    node.setAttribute('tabindex', '0');
    node.setAttribute('aria-label', `${info.label}. ${info.summary}`);
    node.style.cursor = 'pointer';

    node.addEventListener('click', event => {
      event.stopPropagation();
      clearSelection();
      node.classList.add('selected');
      selectedElement = node;
      showDetails(nodeId);
    });

    node.addEventListener('mouseenter', () => {
      if (!selectedElement) {
        resetInfoPanel();
      }
    });

    node.addEventListener('mouseleave', () => {
      if (!selectedElement) {
        resetInfoPanel();
      }
    });

    node.addEventListener('keydown', evt => {
      if (evt.key === 'Enter' || evt.key === ' ') {
        evt.preventDefault();
        node.click();
      }
    });
  });

  // Clear selection when user clicks background
  document.addEventListener('click', evt => {
    if (!evt.target.closest('.node')) {
      clearSelection();
      resetInfoPanel();
    }
  });
}

/**
 * Fetch JSON configuration
 */
async function loadData() {
  const response = await fetch('data.json', { cache: 'no-store' });
  if (!response.ok) {
    throw new Error(`Unable to load data.json (${response.status})`);
  }
  simData = await response.json();
  nodeMap = (simData.nodes || []).reduce((acc, entry) => {
    acc[entry.id] = entry;
    return acc;
  }, {});
}

async function initializeMicroSim() {
  try {
    await loadData();
    applyStaticContent();
    await renderMermaid();
    wireNodeInteractions();
  } catch (error) {
    console.error(error);
    infoDisplay.innerHTML = '<p class="info-placeholder">Unable to load diagram data.</p>';
  }
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initializeMicroSim);
} else {
  initializeMicroSim();
}
