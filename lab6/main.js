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
let lastGamma = 0;
let lastBeta = 0;

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
    requestAnimationFrame(updateBallPosition);
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
        lastGamma = event.gamma;
        lastBeta = event.beta;
    });
}

function updateBallPosition() {
    if (gameStart) {
        let maxX = gameContainer.offsetWidth - ball.offsetWidth;
        let maxY = gameContainer.offsetHeight - ball.offsetHeight;

        let x = Math.max(Math.min(lastGamma, 45), -45) / 45 * maxX;
        let y = Math.max(Math.min(lastBeta, 45), -45) / 45 * maxY;

        ball.style.left = Math.min(Math.max(x, 0), maxX) + 'px';
        ball.style.top = Math.min(Math.max(y, 0), maxY) + 'px';

        checkCollision();
        requestAnimationFrame(updateBallPosition);
    }
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

function saveScore(score) {
    let scores = JSON.parse(localStorage.getItem('scores')) || [];
    scores.push(score);
    localStorage.setItem('scores', JSON.stringify(scores));
}

function showScores() {
    let scores = JSON.parse(localStorage.getItem('scores')) || [];
    scores.sort((a, b) => b - a);

    let scoresList = document.getElementById('scoresList');
    scoresList.innerHTML = ''; 

    scores.forEach((score, index) => {
        let listItem = document.createElement('li');
        listItem.textContent = `Miejsce ${index + 1}: ${score}`;
        scoresList.appendChild(listItem);
    });
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
            saveScore(score);
            showScores();
        }
    }, 1000);
}
document.addEventListener('DOMContentLoaded', function() {
    showScores();
});
