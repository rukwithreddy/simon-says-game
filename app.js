const colors = ["red", "green", "blue", "yellow"];

let gameSequence = [];
let userSequence = [];
let level = 0;
let started = false;

const statusText = document.getElementById("status");


// Character mapping
const characters = {
  red: "Akash",
  green: "Akshith",
  blue: "Babu",
  yellow: "Dhanush"
};

// Dialogues
const dialogues = {
  red: "Akash: Ni notla na sulli",
  green: "Akshith: Prem gadi moddu kudu nuvvu",
  blue: "Babu: Erripukonvi ra nuvvu",
  yellow: "Dhanush: Naa lavada...Dengai puka"
};

let scores = [];

document.getElementById("startBtn").addEventListener("click", startGame);

function startGame() {
  gameSequence = [];
  level = 0;
  started = true;
  nextLevel();
}

function nextLevel() {
  userSequence = [];
  level++;
  statusText.textContent = `Level ${level}`;

  const randomColor = colors[Math.floor(Math.random() * 4)];
  gameSequence.push(randomColor);

  flashButton(randomColor);
}

function flashButton(color) {
  const btn = document.getElementById(color);
  btn.classList.add("active");

  setTimeout(() => btn.classList.remove("active"), 400);
}

document.querySelectorAll(".btn").forEach(btn => {
  btn.addEventListener("click", () => {
    if (!started) return;

    const color = btn.id;
    userSequence.push(color);
    flashButton(color);

    checkAnswer(userSequence.length - 1);
  });
});

function checkAnswer(index) {
  if (userSequence[index] === gameSequence[index]) {
    if (userSequence.length === gameSequence.length) {
      setTimeout(nextLevel, 800);
    }
  } else {
    gameOver(userSequence[index]);
  }
}

function gameOver(lastColor) {
  
  // Character speaks
  statusText.textContent = dialogues[lastColor];

  started = false;
}
