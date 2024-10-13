let started = false;
let h4 = document.querySelector("h4");
let level = 0;
let container = document.querySelector(".container");
let colors = ["red", "yellow", "blue", "purple"];
let gameSeq = [];
let userSeq = [];
let h3 = document.querySelector("h3");

// Start the game when a key is pressed
document.addEventListener("keypress", function () {
    if (!started) {
        started = true;
        container.style.display = "block"; // Show the game container when game starts
        h4.innerText = "";
        levelUp();
    }
});

// Game button flash for Simon's turn
function gameFlash(btn) {
    btn.classList.add("flash");
    setTimeout(function () {
        btn.classList.remove("flash");
    }, 250);
}

// User button flash for player's turn
function userFlash(btn) {
    btn.classList.add("flash");
    setTimeout(function () {
        btn.classList.remove("flash");
    }, 250);
}

// Go to next level and show the next color in the sequence
function levelUp() {
    h3.innerText = "";
    userSeq = [];
    level++;
    h4.innerText = `Level ${level}`;

    let ranIdx = Math.floor(Math.random() * 4);
    let ranCol = colors[ranIdx];
    let btn = document.querySelector(`#${ranCol}`);

    gameSeq.push(ranCol);
    setTimeout(() => {
        gameFlash(btn);
    }, 500); // Flash the button after a short delay
}

// Check user's answer
function checkAns(idx) {
    if (userSeq[idx] === gameSeq[idx]) {
        if (userSeq.length === gameSeq.length) {
            setTimeout(levelUp, 1000); // Move to the next level after a short delay
        }
    } else {
        h3.innerText = `Game Over! Press any key to restart the game.`;
        h4.innerText = `Score: ${level === 1 ? 0 : (level - 1) * 10}`; // Show the correct score
        started = false;
        document.addEventListener("keypress", reset, { once: true }); // Wait for a keypress to reset the game
    }
}

// Handle user button press
function btnPress() {
    let btn = this;
    userSeq.push(btn.getAttribute("id"));
    userFlash(btn);
    checkAns(userSeq.length - 1);
}

// Add event listeners to buttons
let btns = document.querySelectorAll(".btn");
for (let btn of btns) {
    btn.addEventListener("click", btnPress);
}

// Reset the game to the initial state
function reset() {
    userSeq = [];
    gameSeq = [];
    level = 0;
    h3.innerText = "";
    h4.innerText = "Press any key to start the game.";
    container.style.display = "none"; // Hide the container when resetting the game
    started = false;
}
