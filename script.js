const statusEl = document.getElementById('status');
const button = document.getElementById('toggleBtn');
const logList = document.getElementById('logList');
const statusImage = document.getElementById('statusImage');

let asleep = true;

function formatTimestamp() {
  const now = new Date();
  return now.toLocaleString(undefined, {
    dateStyle: 'medium',
    timeStyle: 'short'
  });
}

function logStatus(status) {
  const li = document.createElement('li');
  li.className = 'log-entry';

  const text = document.createElement('span');
  text.textContent = `${formatTimestamp()}: Baby is ${status}`;

  const delBtn = document.createElement('button');
  delBtn.textContent = '×';
  delBtn.className = 'delete-btn';
  delBtn.onclick = () => li.remove();

  li.appendChild(text);
  li.appendChild(delBtn);
  logList.prepend(li);
}

button.addEventListener('click', () => {
  asleep = !asleep;
  const statusText = asleep ? 'asleep 💤' : 'awake 👶';
  statusEl.textContent = `Baby is ${statusText}`;
  document.body.style.backgroundColor = asleep ? '#f0f4f8' : '#fff5f5';
  statusImage.src = asleep ? 'deer_asleep.png' : 'deer_awake.png';
  statusImage.alt = `Deer ${statusText}`;

  logStatus(statusText);
});
