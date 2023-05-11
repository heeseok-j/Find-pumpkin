"use strict";

export default class popUp {
  constructor() {
    this.popUp = document.querySelector(".pop_up");
    this.popUpMessage = document.querySelector(".pop_up_message");
    this.popUpRefresh = document.querySelector(".pop_up_refresh");
    this.popUpRefresh.addEventListener("click", () => {
      if (this.click) {
        this.click();
        this.hide();
      }
    });
  }

  userClickListener(click) {
    this.click = click;
  }

  hide() {
    this.popUp.classList.add("pop-up-hide");
  }

  showText(text) {
    this.popUpMessage.innerText = text;
    this.popUp.classList.remove("pop-up-hide");
  }
}
