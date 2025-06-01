const statusEl = document.getElementById('status');
const button = document.getElementById('toggleBtn');
const logList = document.getElementById('logList');
const statusImage = document.getElementById('statusImage');
const summaryEl = document.getElementById('summary');
const downloadBtn = document.getElementById('downloadLogBtn');

let asleep = true;
let logs = [];

// Load from localStorage
function loadLogs() {
  const savedLogs = localStorage.getItem('logEntries');
  if (savedLogs) {
    logs = JSON.parse(savedLogs);
  }
}

// Save to localStorage
function saveLogs() {
  localStorage.setItem('logEntries', JSON.stringify(logs));
}

// Render all logs
function renderLogs() {
  logList.innerHTML = '';
  logs.forEach((entry, index) => {
    const li = document.createElement('li');
    li.className = 'log-entry';

    const text = document.createElement('span');
    const date = new Date(entry.timestamp);
    text.textContent = `${date.toLocaleString()}: Baby is ${entry.state}`;

    const delBtn = document.createElement('button');
    delBtn.textContent = '×';
    delBtn.className = 'delete-btn';
    delBtn.onclick = () => {
      logs.splice(index, 1);
      saveLogs();
      renderLogs();
      renderSummary();
    };

    li.appendChild(text);
    li.appendChild(delBtn);
    logList.appendChild(li);
  });
}

// Update main display
function updateDisplay() {
  const statusText = asleep ? 'asleep 💤' : 'awake 👶';
  statusEl.textContent = `Baby is ${statusText}`;
  document.body.style.backgroundColor = asleep ? '#f0f4f8' : '#fff5f5';
  statusImage.src = asleep ? 'deer_asleep.png' : 'deer_awake.png';
  statusImage.alt = `Deer ${statusText}`;
}

// Add a new log entry
function addLogEntry(state) {
  const entry = {
    state: state,
    timestamp: new Date().toISOString()
  };
  logs.push(entry);
  saveLogs();
  renderLogs();
  renderSummary();
}

// Calculate and show summary
function renderSummary() {
  if (logs.length < 2) {
    summaryEl.textContent = 'Not enough data to calculate summary.';
    return;
  }

  let asleepTime = 0;
  let awakeTime = 0;

  for (let i = 1; i < logs.length; i++) {
    const prev = logs[i - 1];
    const curr = logs[i];
    const duration = new Date(curr.timestamp) - new Date(prev.timestamp);
    if (prev.state === 'asleep') {
      asleepTime += duration;
    } else {
      awakeTime += duration;
    }
  }

  const formatDuration = ms => {
    const h = Math.floor(ms / (1000 * 60 * 60));
    const m = Math.floor((ms % (1000 * 60 * 60)) / (1000 * 60));
    return `${h}h ${m}m`;
  };

  summaryEl.textContent = `Total time asleep: ${formatDuration(asleepTime)} | Total time awake: ${formatDuration(awakeTime)}`;
}

// Download the log as a text file
downloadBtn.addEventListener('click', () => {
  const text = logs.map(l => {
    const date = new Date(l.timestamp).toLocaleString();
    return `${date}: Baby is ${l.state}`;
  }).join('\n');

  const blob = new Blob([text], { type: 'text/plain' });
  const url = URL.createObjectURL(blob);

  const a = document.createElement('a');
  a.href = url;
  a.download = 'baby_status_log.txt';
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
});

// Handle toggle
button.addEventListener('click', () => {
  asleep = !asleep;
  updateDisplay();
  addLogEntry(asleep ? 'asleep' : 'awake');
});

// Initial load
loadLogs();
if (logs.length > 0) {
  const lastState = logs[logs.length - 1].state;
  asleep = lastState === 'asleep';
}
updateDisplay();
renderLogs();
renderSummary();
