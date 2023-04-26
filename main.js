"use strict";
const startBtn = document.querySelector(".start_button");
const pauseBtn = document.querySelector(".pause_button");
const stopBtn = document.querySelector(".stop_button");
const pauseAndstopBtn = document.querySelector(".pause_and_stop");
const gameScore = document.querySelector(".game_score");

const popUp = document.querySelector(".pop_up");
const popUpMessage = document.querySelector(".pop_up_message");
const popUpRefresh = document.querySelector(".pop_up_refresh");

const gameTimer = document.querySelector(".game_timer");
const icon = document.querySelector(".fa-pause");

// Game start
startBtn.addEventListener("click", () => {
  startGame();
});

function startGame() {
  stoped = false;
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
  if (stoped) {
    showPauseBtn();
    stoped = false;
    remainingTimeSec();
  } else {
    clearInterval(timer);
    showPlayBtn();
    stoped = true;
  }
  console.log(stoped);
});

// show play button and pause button
function showPlayBtn() {
  icon.classList.remove("fa-pause");
  icon.classList.add("fa-play");
}

function showPauseBtn() {
  icon.classList.remove("fa-play");
  icon.classList.add("fa-pause");
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
function finishGame() {
  pauseAndstopBtn.style.visibility = "hidden";
  showPopUp();
  clearInterval(timer);
}

// show timer
function showTimer() {
  gameTimer.style.visibility = "visible";
}

// show score
function showScore() {
  gameScore.style.visibility = "visible";
}

let stoped = true;
let startTime = 5;
let timer = undefined;

function remainingTimeSec() {
  if (!stoped) {
    updateTimerText(startTime);
    timer = setInterval(() => {
      updateTimerText(--startTime);
      if (startTime <= 0) {
        clearInterval(timer);
        // call finish game
        finishGame();
        showPopUpText("REPLAY?");
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

const field = document.querySelector(".game_field");
const fieldRect = field.getBoundingClientRect();
const imageSize = 60;
const pumpkinCount = 5;
const skullCount = 8;
const frankensteinCount = 8;
let score = 0;

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
  }
}

// initgame
function initGame() {
  score = 0;
  field.innerHTML = "";

  gameScore.innerText = pumpkinCount;
  addItem("pumpkin", pumpkinCount, "img/pumpkin.png");
  addItem("skull", skullCount, "img/skull.png");
  addItem("frankenstein", frankensteinCount, "img/frankenstein.png");
}

// field click event
field.addEventListener("click", (event) => {
  // mouse target
  const thisTarget = event.target;
  // if ) target = pumpkin
  if (thisTarget.classList.contains("pumpkin")) {
    thisTarget.remove();
    score++;
    updateScoreText();
    if (pumpkinCount === score) {
      finishGame();
      showPopUpText("YOU WIN");
    }
  } else if (
    thisTarget.classList.contains("skull") ||
    thisTarget.classList.contains("frankenstein")
  ) {
    finishGame();
    showPopUpText("REPLAY?");
  }
});

function updateScoreText() {
  gameScore.innerText = pumpkinCount - score;
}
