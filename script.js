const statusEl = document.getElementById('status');
const button = document.getElementById('toggleBtn');
const logList = document.getElementById('logList');

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
  li.textContent = `${formatTimestamp()}: Baby is ${status}`;
  logList.prepend(li);
}

button.addEventListener('click', () => {
  asleep = !asleep;
  const statusText = asleep ? 'asleep 💤' : 'awake 👶';
  statusEl.textContent = `Baby is ${statusText}`;
  document.body.style.backgroundColor = asleep ? '#f0f4f8' : '#fff5f5';

  logStatus(statusText);
});
