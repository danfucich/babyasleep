const statusEl = document.getElementById('status');
const button = document.getElementById('toggleBtn');

let asleep = true;

button.addEventListener('click', () => {
  asleep = !asleep;
  if (asleep) {
    statusEl.textContent = 'Baby is asleep 💤';
    document.body.style.backgroundColor = '#f0f4f8';
  } else {
    statusEl.textContent = 'Baby is awake 👶';
    document.body.style.backgroundColor = '#fff5f5';
  }
});
