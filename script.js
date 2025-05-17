const statusEl = document.getElementById('status');
const button = document.getElementById('toggleBtn');
const logList = document.getElementById('logList');
const statusImage = document.getElementById('statusImage');

let asleep = true;

function loadState() {
  const savedStatus = localStorage.getItem('asleep');
  const savedLogs = JSON.parse(localStorage.getItem('logEntries') || '[]');

  if (savedStatus !== null) {
    asleep = savedStatus === 'true';
  }

  updateDisplay();

  savedLogs.forEach(entry => {
    addLogToDOM(entry, false);
  });
}

function saveState() {
  localStorage.setItem('asleep', asleep);
}

function saveLog() {
  const entries = Array.from(logList.children).map(li => li.querySelector('span')?.textContent);
  localStorage.setItem('logEntries', JSON.stringify(entries));
}

function formatTimestamp() {
  const now = new Date();
  return now.toLocaleString(undefined, {
    dateStyle: 'medium',
    timeStyle: 'short'
  });
}

function addLogToDOM(entry, save = true) {
  const li = document.createElement('li');
  li.className = 'log-entry';

  const text = document.createElement('span');
  text.textContent = entry;

  const delBtn = document.createElement('button');
  delBtn.textContent = '×';
  delBtn.className = 'delete-btn';
  delBtn.onclick = () => {
    li.remove();
    saveLog();
  };

  li.appendChild(text);
  li.appendChild(delBtn);
  logList.prepend(li);

  if (save) saveLog();
}

function updateDisplay() {
  const statusText = asleep ? 'asleep 💤' : 'awake 👶';
  statusEl.textContent = `Baby is ${statusText}`;
  document.body.style.backgroundColor = asleep ? '#f0f4f8' : '#fff5f5';
  statusImage.src = asleep ? 'deer_asleep.png' : 'deer_awake.png';
  statusImage.alt = `Deer ${statusText}`;
}

button.addEventListener('click', () => {
  asleep = !asleep;
  updateDisplay();
  saveState();

  const logEntry = `${formatTimestamp()}: Baby is ${asleep ? 'asleep 💤' : 'awake 👶'}`;
  addLogToDOM(logEntry);
});

loadState();


document.getElementById('downloadLogBtn').addEventListener('click', () => {
  const entries = Array.from(logList.children).map(li => li.querySelector('span')?.textContent).join('\n');
  const blob = new Blob([entries], { type: 'text/plain' });
  const url = URL.createObjectURL(blob);

  const a = document.createElement('a');
  a.href = url;
  a.download = 'baby_status_log.txt';
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
});
