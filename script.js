
let startBtn = document.getElementById("start");
let pauseBtn = document.getElementById("pause");
let resetBtn = document.getElementById("reset");
let lapBtn = document.getElementById("lap");
let timeDisplay = document.getElementById("time");
let lapTable = document.getElementById("lapTable").getElementsByTagName("tbody")[0];

let timer = null;
let elapsedTime = 0;
let running = false;
let lapCount = 0;

// Format time in hh:mm:ss
function formatTime(ms) {
  let totalSeconds = Math.floor(ms / 1000);
  let hours = String(Math.floor(totalSeconds / 3600)).padStart(2, "0");
  let minutes = String(Math.floor((totalSeconds % 3600) / 60)).padStart(2, "0");
  let seconds = String(totalSeconds % 60).padStart(2, "0");
  return ${hours}:${minutes}:${seconds};
}

// Update display every second
function updateDisplay() {
  timeDisplay.textContent = formatTime(elapsedTime);
}

// Start
startBtn.onclick = () => {
  if (!running) {
    running = true;
    let startTime = Date.now() - elapsedTime;
    timer = setInterval(() => {
      elapsedTime = Date.now() - startTime;
      updateDisplay();
    }, 100);
  }
};

// Pause
pauseBtn.onclick = () => {
  running = false;
  clearInterval(timer);
};

// Reset
resetBtn.onclick = () => {
  running = false;
  clearInterval(timer);
  elapsedTime = 0;
  updateDisplay();
  lapTable.innerHTML = "";
  lapCount = 0;
};

// Lap
lapBtn.onclick = () => {
  if (running) {
    lapCount++;
    let row = lapTable.insertRow();
    row.insertCell(0).textContent = lapCount;
    row.insertCell(1).textContent = formatTime(elapsedTime);
  }
};

// Initialize
updateDisplay();
