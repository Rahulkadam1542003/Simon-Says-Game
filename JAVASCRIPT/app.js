let gameSeq = [];
let userSeq = [];

let btns = ["yellow","red","purple","green"];

let started = false;
let level = 0;

let h2 = document.querySelector("h2");

// YAHI HAI FIX - JS SE HI COLOUR SET KAR DIYA
let allBtns = document.querySelectorAll(".btn");
allBtns.forEach((btn) => {
    if(btn.classList.contains("yellow")) {
        btn.style.backgroundColor = "#f39c12"; // Orange
    }
    else if(btn.classList.contains("red")) {
        btn.style.backgroundColor = "#e74c3c"; // Red
    }
    else if(btn.classList.contains("purple")) {
        btn.style.backgroundColor = "#9b59b6"; // Purple - Box 3
    }
    else if(btn.classList.contains("green")) {
        btn.style.backgroundColor = "#2ecc71"; // Green - Box 4
    }

    // Basic styling bhi JS se hi de di
    btn.style.height = "200px";
    btn.style.width = "200px";
    btn.style.border = "10px solid black";
    btn.style.borderRadius = "20px";
    btn.style.margin = "2rem";
    btn.style.display = "inline-block";
});

document.addEventListener("keypress", function () {
    if (started == false) {
        console.log("game is started");
        started = true;
        levelUp();
    }
});

function gameflash(btn) {
    let originalColor = btn.style.backgroundColor;
    btn.style.backgroundColor = "white";
    setTimeout(function() {
        btn.style.backgroundColor = originalColor;
    }, 250);
}

function userflash(btn) {
    let originalColor = btn.style.backgroundColor;
    btn.style.backgroundColor = "#3498db";
    setTimeout(function() {
        btn.style.backgroundColor = originalColor;
    }, 250);
}

function levelUp() {
    userSeq = [];
    level++;
    h2.innerText = `Level ${level}`;

    let randIdx = Math.floor(Math.random() * btns.length);
    let randColor = btns[randIdx];
    let randBtn = document.querySelector(`.${randColor}`);
    gameSeq.push(randColor);
    console.log(gameSeq);
    gameflash(randBtn);
}

function checkAns(idx) {
    if(userSeq[idx] === gameSeq[idx]) {
        if(userSeq.length == gameSeq.length) {
            setTimeout(levelUp, 1000);
        }
    } else {
        h2.innerHTML = `Game over! Your score was <b>${level}</b> <br> Press any key to start.`;
        document.querySelector("body").style.backgroundColor = "red";
        setTimeout(function() {
            document.querySelector("body").style.backgroundColor = "white";
        }, 150);
        reset();
    }
}

function btnPress() {
    let btn = this;
    userflash(btn);

    let usercolor = btn.getAttribute("id");
    userSeq.push(usercolor);

    checkAns(userSeq.length-1);
}

for (let btn of allBtns) {
    btn.addEventListener("click", btnPress);
}

function reset() {
    started = false;
    gameSeq = [];
    userSeq = [];
    level = 0;
}