"use strict";

const field = document.querySelector(".game_field");
const fieldRect = field.getBoundingClientRect();

const startBtn = document.querySelector(".start_button");
const pauseBtn = document.querySelector(".pause_button");
const stopBtn = document.querySelector(".stop_button");
const pauseAndstopBtn = document.querySelector(".pause_and_stop");
const gameScore = document.querySelector(".game_score");
const gameTimer = document.querySelector(".game_timer");
const pauseIcon = document.querySelector(".fa-pause");

const popUp = document.querySelector(".pop_up");
const popUpMessage = document.querySelector(".pop_up_message");
const popUpRefresh = document.querySelector(".pop_up_refresh");

const imageSize = 60;
const PUMPKIN_COUNT = 5;
const SKULL_COUNT = 8;
const FRANKENSTEIN_COUNT = 8;
let score = 0;

let started = false;
let startTime = 5;
let timer = undefined;

// Game start
startBtn.addEventListener("click", () => {
  startGame();
});

function startGame() {
  started = false;
  initGame();
  showPauseAndStopBtn();
  showTimer();
  remainingTimeSec();
  showScore();
}

// Show pause and stop icon
function showPauseAndStopBtn() {
  startBtn.style.display = "none";
  pauseAndstopBtn.style.display = "block";
}

// pause and restart button
pauseBtn.addEventListener("click", () => {
  if (started) {
    showPauseBtn();
    started = false;
    remainingTimeSec();
  } else {
    clearInterval(timer);
    showPlayBtn();
    started = true;
  }
});

// show play button and pause button
function showPlayBtn() {
  pauseIcon.classList.remove("fa-pause");
  pauseIcon.classList.add("fa-play");
}

function showPauseBtn() {
  pauseIcon.classList.remove("fa-play");
  pauseIcon.classList.add("fa-pause");
}

// game finish button
stopBtn.addEventListener("click", () => {
  pauseAndstopBtn.style.visibility = "hidden";
  finishGame();
  showPopUpText("REPLAY?");
});

// game replay button
popUpRefresh.addEventListener("click", () => {
  // time initialization
  startTime = 5;
  // call game
  startGame();
  // call hide popup
  hidePopUp();
  // pause and stop button visible
  pauseAndstopBtn.style.visibility = "visible";
  showPauseBtn();
});

// finish game
function finishGame(lose) {
  pauseAndstopBtn.style.visibility = "hidden";
  showPopUp();
  clearInterval(timer);
  showPopUpText(lose ? "YOU LOSE!" : "YOU WIN!");
  started = true;
}

// show timer
function showTimer() {
  gameTimer.style.visibility = "visible";
}

// show score
function showScore() {
  gameScore.style.visibility = "visible";
}

function remainingTimeSec() {
  if (!started) {
    updateTimerText(startTime);
    timer = setInterval(() => {
      updateTimerText(--startTime);
      if (startTime <= 0) {
        clearInterval(timer);
        // call finish game
        finishGame();
        showPopUpText("YOU LOSE!");
        return;
      }
    }, 1000);
  }
}

function updateTimerText(time) {
  const minutes = Math.floor(time / 60);
  const seconds = time % 60;
  gameTimer.innerText = `${minutes} : ${seconds}`;
}

// hide popup function
function hidePopUp() {
  popUp.style.display = "none";
}

// show popup function
function showPopUp() {
  popUp.style.display = "block";
}

// show popup text function
function showPopUpText(text) {
  popUpMessage.innerText = text;
}

// random number
function randomNumber(min, max) {
  return Math.random() * (max - min) + min;
}

// add item
function addItem(className, count, imgPath) {
  for (let i = 0; i < count; i++) {
    // 1. add item html
    const item = document.createElement("img");
    // 2. add class
    item.setAttribute("class", className);
    // 3. add image
    item.setAttribute("src", imgPath);
    item.style.position = "absolute";
    item.style.cursor = "pointer";
    field.appendChild(item);

    // field x,y and random number
    const x1 = 0;
    const y1 = 0;
    const x2 = fieldRect.width - imageSize;
    const y2 = fieldRect.height - imageSize;
    const x = randomNumber(x1, x2);
    const y = randomNumber(y1, y2);
    // call random number
    item.style.left = `${x}px`;
    item.style.top = `${y}px`;

    pauseBtn.addEventListener("click", () => {
      if (started) {
        item.style.visibility = "hidden";
      } else {
        item.style.visibility = "visible";
      }
    });
  }
}

// initgame
function initGame() {
  score = 0;
  field.innerHTML = "";

  gameScore.innerText = PUMPKIN_COUNT;
  addItem("pumpkin", PUMPKIN_COUNT, "img/pumpkin.png");
  addItem("skull", SKULL_COUNT, "img/skull.png");
  addItem("frankenstein", FRANKENSTEIN_COUNT, "img/frankenstein.png");
}

// field click event
field.addEventListener("click", onFieldClick);

function onFieldClick(event) {
  if (started) {
    return;
  }
  const target = event.target;
  if (target.matches(".pumpkin")) {
    target.remove();
    score++;
    updateScoreText();
    if (score === PUMPKIN_COUNT) {
      finishGame();
    }
  } else if (target.matches(".skull") || target.matches(".frankenstein")) {
    finishGame();
    showPopUpText("YOU LOSE!");
  }
}

function updateScoreText() {
  gameScore.innerText = PUMPKIN_COUNT - score;
}
