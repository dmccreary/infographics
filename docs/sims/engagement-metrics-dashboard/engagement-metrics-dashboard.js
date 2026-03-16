// Engagement Metrics Dashboard
// Examine simulated engagement metrics for interactive infographics.
// Bloom Level: Analyze (L4) - Chart.js implementation

document.addEventListener('DOMContentLoaded', function() {
  const main = document.querySelector('main');
  main.style.background = 'aliceblue';
  main.style.padding = '15px';
  main.style.fontFamily = 'Arial, sans-serif';
  main.style.boxSizing = 'border-box';

  // Title
  const title = document.createElement('h2');
  title.textContent = 'Engagement Metrics Dashboard';
  title.style.cssText = 'text-align:center; margin:0 0 12px 0; color:#333; font-size:20px;';
  main.appendChild(title);

  // Metric cards
  const cardRow = document.createElement('div');
  cardRow.style.cssText = 'display:flex; gap:10px; margin-bottom:12px; flex-wrap:wrap;';
  main.appendChild(cardRow);

  const metrics = [
    { label: 'Total Sessions', value: '2,847', color: '#4A90D9', icon: '📊' },
    { label: 'Avg Duration', value: '4m 32s', color: '#2ECC71', icon: '⏱️' },
    { label: 'Avg Completion', value: '73%', color: '#E67E22', icon: '✅' },
    { label: 'Active Students', value: '156', color: '#9B59B6', icon: '👥' }
  ];

  metrics.forEach(m => {
    const card = document.createElement('div');
    card.style.cssText = `flex:1; min-width:120px; background:white; border-radius:8px; padding:12px; text-align:center; border-left:4px solid ${m.color}; box-shadow:0 1px 3px rgba(0,0,0,0.1);`;
    card.innerHTML = `<div style="font-size:20px;">${m.icon}</div><div style="font-size:22px; font-weight:bold; color:${m.color};">${m.value}</div><div style="font-size:12px; color:#888;">${m.label}</div>`;
    cardRow.appendChild(card);
  });

  // Controls row
  const controls = document.createElement('div');
  controls.style.cssText = 'display:flex; gap:12px; margin-bottom:12px; align-items:center; flex-wrap:wrap;';
  controls.innerHTML = `
    <label style="font-size:13px;">Time Period:
      <select id="timePeriod" style="padding:4px; border-radius:4px; border:1px solid #ccc;">
        <option value="7">Last 7 days</option>
        <option value="30" selected>Last 30 days</option>
        <option value="90">Last 90 days</option>
      </select>
    </label>
    <label style="font-size:13px;">Sort By:
      <select id="sortBy" style="padding:4px; border-radius:4px; border:1px solid #ccc;">
        <option value="completion">Completion Rate</option>
        <option value="sessions">Sessions</option>
        <option value="duration">Duration</option>
        <option value="coverage">Click Coverage</option>
      </select>
    </label>
    <label style="font-size:13px;"><input type="checkbox" id="showTrend" checked> Show Trend Lines</label>
  `;
  main.appendChild(controls);

  // Charts row
  const chartRow = document.createElement('div');
  chartRow.style.cssText = 'display:flex; gap:12px; margin-bottom:12px; flex-wrap:wrap;';
  main.appendChild(chartRow);

  const leftChart = document.createElement('div');
  leftChart.style.cssText = 'flex:1; min-width:280px; background:white; border-radius:8px; padding:10px; box-shadow:0 1px 3px rgba(0,0,0,0.1);';
  leftChart.innerHTML = '<canvas id="completionChart"></canvas>';
  chartRow.appendChild(leftChart);

  const rightChart = document.createElement('div');
  rightChart.style.cssText = 'flex:1; min-width:280px; background:white; border-radius:8px; padding:10px; box-shadow:0 1px 3px rgba(0,0,0,0.1);';
  rightChart.innerHTML = '<canvas id="sessionsChart"></canvas>';
  chartRow.appendChild(rightChart);

  // Detail table
  const tableContainer = document.createElement('div');
  tableContainer.style.cssText = 'background:white; border-radius:8px; padding:10px; box-shadow:0 1px 3px rgba(0,0,0,0.1); overflow-x:auto;';
  tableContainer.innerHTML = '<table id="detailTable" style="width:100%; border-collapse:collapse; font-size:13px;"></table>';
  main.appendChild(tableContainer);

  // Data
  const infographics = [
    { name: 'Cell Biology Overlay', sessions: 523, duration: '5m 12s', durationSec: 312, completion: 89, coverage: 78, topRegion: 'Nucleus', chapter: 'Ch 8' },
    { name: 'Water Cycle CLD', sessions: 412, duration: '6m 45s', durationSec: 405, completion: 82, coverage: 65, topRegion: 'Evaporation', chapter: 'Ch 9' },
    { name: 'Solar System Scale', sessions: 389, duration: '3m 20s', durationSec: 200, completion: 71, coverage: 52, topRegion: 'Jupiter', chapter: 'Ch 10' },
    { name: 'Circuit Builder', sessions: 356, duration: '7m 10s', durationSec: 430, completion: 67, coverage: 88, topRegion: 'Resistor', chapter: 'Ch 7' },
    { name: 'Historical Timeline', sessions: 298, duration: '2m 55s', durationSec: 175, completion: 58, coverage: 35, topRegion: '1776 Event', chapter: 'Ch 11' },
    { name: 'Geometry Proofs', sessions: 267, duration: '4m 48s', durationSec: 288, completion: 45, coverage: 42, topRegion: 'Step 3', chapter: 'Ch 6' },
    { name: 'Music Theory Wheel', sessions: 312, duration: '3m 30s', durationSec: 210, completion: 76, coverage: 70, topRegion: 'C Major', chapter: 'Ch 12' },
    { name: 'Economic Supply/Demand', sessions: 290, duration: '5m 05s', durationSec: 305, completion: 63, coverage: 55, topRegion: 'Equilibrium', chapter: 'Ch 5' }
  ];

  let completionChart, sessionsChart;

  function getBarColor(val) {
    if (val >= 80) return 'rgba(46, 204, 113, 0.8)';
    if (val >= 60) return 'rgba(241, 196, 15, 0.8)';
    return 'rgba(231, 76, 60, 0.8)';
  }

  function getStatusDot(val) {
    if (val >= 80) return '🟢';
    if (val >= 60) return '🟡';
    return '🔴';
  }

  function buildCompletionChart() {
    const ctx = document.getElementById('completionChart').getContext('2d');
    const sortedData = [...infographics].sort((a, b) => b.completion - a.completion);

    if (completionChart) completionChart.destroy();
    completionChart = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: sortedData.map(d => d.name),
        datasets: [{
          label: 'Completion Rate (%)',
          data: sortedData.map(d => d.completion),
          backgroundColor: sortedData.map(d => getBarColor(d.completion)),
          borderColor: sortedData.map(d => getBarColor(d.completion).replace('0.8', '1')),
          borderWidth: 1
        }]
      },
      options: {
        responsive: true,
        plugins: {
          title: { display: true, text: 'Completion Rate by Infographic', font: { size: 14 } },
          legend: { display: false }
        },
        scales: {
          y: { beginAtZero: true, max: 100, title: { display: true, text: '%' } },
          x: { ticks: { maxRotation: 45, minRotation: 30, font: { size: 10 } } }
        },
        onClick: function(evt, elements) {
          if (elements.length > 0) {
            let idx = elements[0].index;
            highlightRow(sortedData[idx].name);
          }
        }
      }
    });
  }

  function buildSessionsChart() {
    const ctx = document.getElementById('sessionsChart').getContext('2d');
    const days = document.getElementById('timePeriod').value;
    const showTrend = document.getElementById('showTrend').checked;

    // Generate simulated daily session data
    let labels = [];
    let data = [];
    for (let i = 0; i < days; i++) {
      let d = new Date();
      d.setDate(d.getDate() - (days - i));
      labels.push((d.getMonth() + 1) + '/' + d.getDate());
      // Simulated data with weekly pattern
      let base = 80 + Math.sin(i * 0.3) * 20 + (i / days) * 15;
      let dayOfWeek = d.getDay();
      if (dayOfWeek === 0 || dayOfWeek === 6) base *= 0.4; // weekend dip
      data.push(Math.round(base + (Math.random() - 0.5) * 20));
    }

    let datasets = [{
      label: 'Daily Sessions',
      data: data,
      borderColor: 'rgba(74, 144, 217, 0.8)',
      backgroundColor: 'rgba(74, 144, 217, 0.1)',
      fill: true,
      tension: 0.3,
      pointRadius: days > 30 ? 0 : 3
    }];

    if (showTrend) {
      // Simple linear trend
      let trendData = [];
      let sumX = 0, sumY = 0, sumXY = 0, sumX2 = 0;
      for (let i = 0; i < data.length; i++) {
        sumX += i; sumY += data[i]; sumXY += i * data[i]; sumX2 += i * i;
      }
      let n = data.length;
      let slope = (n * sumXY - sumX * sumY) / (n * sumX2 - sumX * sumX);
      let intercept = (sumY - slope * sumX) / n;
      for (let i = 0; i < data.length; i++) {
        trendData.push(Math.round(slope * i + intercept));
      }
      datasets.push({
        label: 'Trend',
        data: trendData,
        borderColor: 'rgba(231, 76, 60, 0.6)',
        borderDash: [5, 5],
        pointRadius: 0,
        fill: false
      });
    }

    if (sessionsChart) sessionsChart.destroy();
    sessionsChart = new Chart(ctx, {
      type: 'line',
      data: { labels, datasets },
      options: {
        responsive: true,
        plugins: {
          title: { display: true, text: 'Daily Sessions', font: { size: 14 } }
        },
        scales: {
          y: { beginAtZero: true, title: { display: true, text: 'Sessions' } },
          x: { ticks: { maxTicksLimit: 10, font: { size: 10 } } }
        }
      }
    });
  }

  function buildTable() {
    const sortKey = document.getElementById('sortBy').value;
    let sorted = [...infographics];

    if (sortKey === 'completion') sorted.sort((a, b) => b.completion - a.completion);
    else if (sortKey === 'sessions') sorted.sort((a, b) => b.sessions - a.sessions);
    else if (sortKey === 'duration') sorted.sort((a, b) => b.durationSec - a.durationSec);
    else if (sortKey === 'coverage') sorted.sort((a, b) => b.coverage - a.coverage);

    const table = document.getElementById('detailTable');
    let html = `<thead><tr style="background:#f5f5f5;">
      <th style="padding:8px; text-align:left; border-bottom:2px solid #ddd;">Infographic</th>
      <th style="padding:8px; text-align:right; border-bottom:2px solid #ddd;">Sessions</th>
      <th style="padding:8px; text-align:right; border-bottom:2px solid #ddd;">Avg Duration</th>
      <th style="padding:8px; text-align:right; border-bottom:2px solid #ddd;">Completion</th>
      <th style="padding:8px; text-align:right; border-bottom:2px solid #ddd;">Coverage</th>
      <th style="padding:8px; text-align:left; border-bottom:2px solid #ddd;">Top Region</th>
      <th style="padding:8px; text-align:center; border-bottom:2px solid #ddd;">Status</th>
    </tr></thead><tbody>`;

    sorted.forEach(d => {
      html += `<tr class="detail-row" data-name="${d.name}" style="border-bottom:1px solid #eee; cursor:pointer;">
        <td style="padding:8px;">${d.name} <span style="color:#aaa; font-size:11px;">(${d.chapter})</span></td>
        <td style="padding:8px; text-align:right;">${d.sessions}</td>
        <td style="padding:8px; text-align:right;">${d.duration}</td>
        <td style="padding:8px; text-align:right; font-weight:bold; color:${d.completion >= 80 ? '#2ECC71' : d.completion >= 60 ? '#F39C12' : '#E74C3C'};">${d.completion}%</td>
        <td style="padding:8px; text-align:right;">${d.coverage}%</td>
        <td style="padding:8px;">${d.topRegion}</td>
        <td style="padding:8px; text-align:center;">${getStatusDot(d.completion)}</td>
      </tr>`;
    });

    html += '</tbody>';
    table.innerHTML = html;
  }

  function highlightRow(name) {
    document.querySelectorAll('.detail-row').forEach(row => {
      row.style.background = row.dataset.name === name ? '#E3F2FD' : '';
    });
  }

  // Event listeners
  document.getElementById('timePeriod').addEventListener('change', buildSessionsChart);
  document.getElementById('showTrend').addEventListener('change', buildSessionsChart);
  document.getElementById('sortBy').addEventListener('change', buildTable);

  // Initial build
  buildCompletionChart();
  buildSessionsChart();
  buildTable();
});
