let ball = document.getElementById("ball");
let hole = document.getElementById("hole");
let timerElement = document.getElementById("timer");
let scoreElement = document.getElementById("score");
let startButton = document.getElementById("startButton");
let restartButton = document.getElementById("restartButton");
let gameContainer = document.querySelector(".game-container");
let gameStart = false;
let score = 0;
let timeLeft = 60;
let interval;

function startGame() {
    gameStart = true;
    score = 0;
    timeLeft = 60;
    ball.style.left = "10px";
    ball.style.top = "10px";
    startButton.style.display = "none";
    restartButton.style.display = "none";
    updateScore();
    updateTimer();
    moveBall();
    spawnHole();
    countDown();
}

function restartGame() {
    clearInterval(interval);
    gameStart = true;
    score = 0;
    timeLeft = 60;
    ball.style.left = "10px";
    ball.style.top = "10px";
    updateScore();
    updateTimer();
    spawnHole();
    countDown();
}

function moveBall() {
    window.addEventListener('deviceorientation', (event) => {
        let maxX = gameContainer.offsetWidth - ball.offsetWidth;
        let maxY = gameContainer.offsetHeight - ball.offsetHeight;

        let x = Math.max(Math.min(event.gamma, 45), -45) / 45 * maxX;
        let y = Math.max(Math.min(event.beta, 45), -45) / 45 * maxY;
        ball.style.left = Math.min(Math.max(x, 0), maxX) + 'px';
        ball.style.top = Math.min(Math.max(y, 0), maxY) + 'px';

        checkCollision();
    });
}

function spawnHole() {
    let maxX = gameContainer.offsetWidth - hole.offsetWidth;
    let maxY = gameContainer.offsetHeight - hole.offsetHeight;
    let x, y;
    do {
        x = Math.random() * maxX;
        y = Math.random() * maxY;
    } while (isTooCloseToBall(x, y));

    hole.style.left = x + 'px';
    hole.style.top = y + 'px';
}

function isTooCloseToBall(x, y) {
    const minDistance = 50;
    let ballX = parseInt(ball.style.left, 10);
    let ballY = parseInt(ball.style.top, 10);

    return Math.abs(ballX - x) < minDistance && Math.abs(ballY - y) < minDistance;
}

function checkCollision() {
    let ballRect = ball.getBoundingClientRect();
    let holeRect = hole.getBoundingClientRect();
    if (ballRect.left < holeRect.left + holeRect.width &&
        ballRect.left + ballRect.width > holeRect.left &&
        ballRect.top < holeRect.top + holeRect.height &&
        ballRect.height + ballRect.top > holeRect.top) {
        score++;
        updateScore();
        spawnHole();
    }
}

function updateScore() {
    scoreElement.innerText = "Score: " + score;
}

function updateTimer() {
    timerElement.innerText = "Time: " + timeLeft;
}

function countDown() {
    interval = setInterval(() => {
        if (!gameStart) {
            clearInterval(interval);
            startButton.style.display = "inline";
            restartButton.style.display = "inline";
            return;
        }
        timeLeft--;
        updateTimer();
        if (timeLeft <= 0) {
            gameStart = false;
            clearInterval(interval);
            restartButton.style.display = "inline";
            alert("Game over! Your score: " + score);
        }
    }, 1000);
}