# Pumpkin Game
 pumpkin game

</br>

## URL
 https://heeseok-j.github.io/Find-pumpkin/

</br>

## 1. 概要及び目的
 子供向けのゲームとして作り、クリックするだけの簡単なものです。
 
</br>
<details>
<summary><b>目的</b></summary>
<div markdown="1">

</br>

### 1-1. ゲームを作った理由
 - 子供の頃にゲームランド(Jr.naver gamerand)というサイトで楽しくした記憶があったため
 - 難しいこと無く、簡単に操作できるため
 
</br> 
 
### 1-2. 参考サイト
 - 現在のJr.naverサイト(https://jr.naver.com/)
 - ニュース記事(https://www.edaily.co.kr/news/read?newsId=03568646622394784&mediaCodeNo=257)
 
 </br>
 
 </div>
</details>
  
</br>

## 2. 機能
 - gameが始まってpauseボタンを押すと残りの時間がとまり、各アイコンが消えます
 - startボタンを押すととまった時間が流れ、消えた各アイコンがまた現れるようにしました
 
 </br>
 
<img src="https://user-images.githubusercontent.com/89200643/235615530-9d2118db-e544-4ce0-a71f-e0eaff7e444d.png" width="500px">         <img src="https://user-images.githubusercontent.com/89200643/235615533-9aaf7c58-b9d3-4b0f-955a-c33d6ae640eb.png" width="500px">

</br>

## 3. 使用技術
- HTML
- CSS
- Javascript

</br>

## 4. 利用方法
 スタートボタン押すとゲームが始まり、 パンプキンを探してクリックする</br>
 時間切れ又はパンプキン以外のアイコンを押すと負け
 
</br>

## 5. 苦労・改善

</br>
<details>
<summary><b>苦労</b></summary>
<div markdown="1">

</br>

### 5-1. pauseとstartボタンを入替で時間とまり
 - ゲームする側にもう少し楽に、そして綺麗な状態を見せたかった
 - ause後にstart押すと5秒がリセットされる問題があってこれを解決するまで２~３週間ぐらいかかってしまった
 
---

remainingTimeSecという残りの時間を表現できる設定しました。

 ```javascript
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
```

---
puaseボタン押したらclearIntervalでタイマーをとまることにした
```javascript
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
```
---
ゲーム終了後、再スタートボタン押すと初期化設定のじかんである5秒にするようにコードを作りました。
```javascript
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
```

</br> 

  </div>
</details>

<details>
<summary><b>改善</b></summary>
<div markdown="1">

</br>

### 5.2 ゲーム終了後又は負けたときにクリックできないように設定

 finishGameの方にtrue設定でクリックしても動作ができないようにしました。

```javascript
function finishGame(lose) {
  pauseAndstopBtn.style.visibility = "hidden";
  showPopUp();
  clearInterval(timer);
  showPopUpText(lose ? "YOU LOSE!" : "YOU WIN!");
  started = true;
}
```

</br>

### 5.3 コードmatches VS containsの違い改善
 - contains : 対象の文字列から探そうとする文字列が含まれているか確認したいとき
 - matches  : 対象の文字列から数字、英文字等が含まれているか確認したいとき
 
 今は簡単なコードのため、両方とも使えて問題はないと思いますが、</br>
 無数のコードがある場合を考えて具体的に現すために変えました。
 
 ---
 
 -fieldのclick event**改善後**
 
  ```javascript
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
 ```
 
 ---
 
 fieldのclick event**改善後**
 
 ```javascript
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
 ```
 
 </br>
 
 ### 5.4 再スタートクリックするときに画面が揺れるPopup改善
 CSSでclassのpop_upのところをheightを140pxから130pxにサイズを減らして改善しました。
 
 </br>
 
 </div>
</details>
