const GRID_SIZE = 3;
const GAME_DURATION = 30000; // 30 seconds
const MOLE_APPEAR_DURATION = 1500; // Mole appears for 1.5 second

let score = 0;
let timeLeft = GAME_DURATION / 1000;
let gameActive = false;
let moleInterval;
let timerInterval;
let moleElements = [];

const scoreDisplay = document.getElementById("score");
const timeLeftDisplay = document.getElementById("time-left");
const grid = document.getElementById("grid");
const startButton = document.getElementById("start-btn");

for (let i = 0; i < GRID_SIZE * GRID_SIZE; i++) {
  const hole = document.createElement("div");
  hole.classList.add("hole");
  hole.addEventListener("click", () => whackMole(i));
  grid.appendChild(hole);
  moleElements.push(hole);
}

function showRandomMole() {
  if (!gameActive) return;
  const randomIndex = Math.floor(Math.random() * moleElements.length);
  moleElements.forEach((mole, index) => {
    mole.classList.toggle("active", index === randomIndex);
  });
}

function whackMole(index) {
  if (moleElements[index].classList.contains("active") && gameActive) {
    score++;
    scoreDisplay.textContent = score;
    moleElements[index].classList.remove("active");
  }
}

function startGame() {
  score = 0;
  timeLeft = GAME_DURATION / 1000;
  scoreDisplay.textContent = score;
  timeLeftDisplay.textContent = timeLeft;
  gameActive = true;
  startButton.disabled = true;

  moleInterval = setInterval(showRandomMole, MOLE_APPEAR_DURATION);

  timerInterval = setInterval(() => {
    timeLeft--;
    timeLeftDisplay.textContent = timeLeft;
    if (timeLeft <= 0) {
      clearInterval(moleInterval);
      clearInterval(timerInterval);
      gameActive = false;
      startButton.disabled = false;
      alert(`Game Over! Your score: ${score}`);
    }
  }, 1000);
}

startButton.addEventListener("click", startGame);
