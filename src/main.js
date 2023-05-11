"use strict";

import popUp from "./popup.js";

const field = document.querySelector(".game_field");
const fieldRect = field.getBoundingClientRect();

const startBtn = document.querySelector(".start_button");
const pauseBtn = document.querySelector(".pause_button");
const stopBtn = document.querySelector(".stop_button");
const pauseAndstopBtn = document.querySelector(".pause_and_stop_hide");
const gameScore = document.querySelector(".game_score");
const gameTimer = document.querySelector(".game_timer");
const pauseIcon = document.querySelector(".fa-pause");

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
  showTimerAndScore();
  remainingTimeSec();
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
        replayPopup.showText("YOU LOSE!");
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

// show timer & socre
function showTimerAndScore() {
  gameTimer.style.visibility = "visible";
  gameScore.style.visibility = "visible";
}

// pause and restart button
pauseBtn.addEventListener("click", () => {
  if (started) {
    started = false;
    showPauseBtn();
    remainingTimeSec();
  } else {
    started = true;
    showPlayBtn();
    clearInterval(timer);
  }
});

// Show pause and stop icon
function showPauseAndStopBtn() {
  startBtn.classList.add("hide");
  pauseAndstopBtn.classList.remove("pause_and_stop_hide");
}

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
  finishGame();
  replayPopup.showText("REPLAY?");
});

// finish game
function finishGame(lose) {
  pauseAndstopBtn.style.visibility = "hidden";
  clearInterval(timer);
  replayPopup.showText(lose ? "YOU LOSE!" : "YOU WIN!");
  started = true;
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
    finishGame(true);
  }
}

function updateScoreText() {
  gameScore.innerText = PUMPKIN_COUNT - score;
}

const replayPopup = new popUp();
replayPopup.userClickListener(() => {
  // time initialization
  startTime = 5;
  // call game
  startGame();
  // pause and stop button visible
  pauseAndstopBtn.style.visibility = "visible";
  showPauseBtn();
});
