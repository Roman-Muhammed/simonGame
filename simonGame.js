// step1 -> keypress : game started
// step2 -> random btn flash + level 1
// step3 -> user btn press -> check userSeq == gameSeq
// if same -> level Up , no-> game over

let gameSeq = [];
let userSeq = [];
let btns = ["red", "yellow", "green", "purple"]; //length -> 0 -- 3

let started = false; //game not start
let level = 0;

let h2 = document.querySelector("h2");

document.addEventListener("keypress", function () {
  if (started == false) {
    console.log("game started");
    started = true;

    levelUp();
  }
});

function gameFlash(btn) {
  btn.classList.add("flash");
  setTimeout(function () {
    btn.classList.remove("flash");
  }, 250); //250ms -> 1/4 sec
}

function userFlash(btn) {
  btn.classList.add("userflash");
  setTimeout(function () {
    btn.classList.remove("userflash");
  }, 250); //250ms -> 1/4 sec
}

function levelUp() {
  userSeq = []; //to make userSeq empty in each level
  level++;
  h2.innerText = `Level ${level}`;

  // random btn flash
  let randIdx = Math.floor(Math.random() * 3); // btns -> 0-3
  let randColor = btns[randIdx];
  let randBtn = document.querySelector(`.${randColor}`); // access class of that btn

  // console.log(randIdx);
  // console.log(randColor);
  // console.log(randBtn);

  gameSeq.push(randColor);
  console.log(gameSeq);

  gameFlash(randBtn);
}

function checkAns(idx) {
  // let idx = level - 1;  //fixed idx
  if (userSeq[idx] === gameSeq[idx]) {
    if (userSeq.length == gameSeq.length) {
      setTimeout(levelUp, 1000);
    }
  } else {
    h2.innerHTML = `Game Over! Your score is <b>${level}</b> <br> Press any key to start the game`;
    document.querySelector("body").style.backgroundColor = "red";
    setTimeout(function () {
      document.querySelector("body").style.backgroundColor = "white";
    }, 150);
    reset();
  }
}

function btnPress() {
  // console.log(this); //which btn is clicked
  let btn = this;
  userFlash(btn);

  userColor = btn.getAttribute("id");
  userSeq.push(userColor);

  checkAns(userSeq.length - 1);
}

let allBtns = document.querySelectorAll(".btn");
for (btn of allBtns) {
  btn.addEventListener("click", btnPress);
}

function reset() {
  started = false;
  gameSeq = [];
  userSeq = [];
  level = 0;
}
