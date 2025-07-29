import * as text from "./paragraphs.js";
const RandomText = text.paragraphs;
let TypingText = document.querySelector(".typing-text p");
let inpfield = document.querySelector(".wrapper input");
let TryAgain = document.querySelector("button");
let MistakeTage = document.querySelector(".mistake span");
let wpmTag = document.querySelector(".wpm span");
let Timetag = document.querySelector(".time span b");
let cpmTag = document.querySelector(".cpm span ");
let charindex = 0,
  mistake = 0,
  isTyping = 0,
  timer,
  maxtimer = 60,
  timeleft = maxtimer;
const getRandomText = () => {
  TypingText.innerHTML = "";
  RandomText[Math.floor(Math.random() * RandomText.length)]
    .split("")
    .forEach((span) => {
      let spantag = `<span>${span}</span>`;
      TypingText.innerHTML += spantag;
    });
  TypingText.querySelectorAll("span")[0].classList.add("active");
  document.addEventListener("keydown", () => inpfield.focus());
  TypingText.addEventListener("click", () => inpfield.focus());
};
function initTyping() {
  const characters = TypingText.querySelectorAll("span");
  let typechar = inpfield.value.split("")[charindex];
  if (charindex < characters.length - 1 && timeleft > 0) {
    if (!isTyping) {
      timer = setInterval(initTimer, 1000);
      isTyping = true;
    }
    if (typechar == null) {
      charindex--;
      if (characters[charindex].classList.contains("incorrect")) {
        mistake--;
      }
      characters[charindex].classList.remove("correct", "incorrect");
    } else {
      if (characters[charindex].innerText == typechar) {
        characters[charindex].classList.add("correct");
      } else {
        mistake++;
        characters[charindex].classList.add("incorrect");
      }
      charindex++;
    }
    characters.forEach((span) => span.classList.remove("active"));
    characters[charindex].classList.add("active");
    let wpm = Math.round(
      ((charindex - mistake) / 5 / (maxtimer - timeleft)) * 60
    );
    wpm = wpm < 0 || !wpm || wpm === Infinity ? 0 : wpm;
    wpmTag.innerText = wpm;
    MistakeTage.innerText = mistake;
    cpmTag.innerText = charindex - mistake;
    MistakeTage.innerHTML = mistake;
  } else {
    inpfield.value = "";
    clearInterval(timer);
  }
}
function initTimer() {
  if (timeleft > 0) {
    timeleft--;
    Timetag.innerText = timeleft;
  } else {
    clearInterval(timer);
  }
}
function resetGame() {
  getRandomText();
  clearInterval(timer);
  timeleft = maxtimer;
  charindex = 0;
  mistake = 0;
  isTyping = 0;
  inpfield.value = "";
  Timetag.innerText = timeleft;
  wpmTag.innerText = 0;
  MistakeTage.innerText = 0;
  cpmTag.innerText = 0;
}
getRandomText();
TryAgain.addEventListener("click", resetGame);
inpfield.addEventListener("input", initTyping);
