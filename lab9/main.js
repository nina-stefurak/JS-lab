const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
let raf;

let ballsCount = 30;
let lineLength = 100;
const balls = [];

class Ball {
  constructor() {
    this.x = Math.random() * (canvas.width - 20) + 10;
    this.y = Math.random() * (canvas.height - 20) + 10;
    this.vx = Math.random() * 5 - 1.5;
    this.vy = Math.random() * 5 - 1.5;
    this.radius = 10;
    this.color = "black";
  }

  drawBall() {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, true);
    ctx.closePath();
    ctx.fillStyle = this.color;
    ctx.fill();
  }

  update() {
    if (this.y + this.vy > canvas.height - 10 || this.y + this.vy < 10) {
      this.vy = -this.vy;
    }
    if (this.x + this.vx > canvas.width - 10 || this.x + this.vx < 10) {
      this.vx = -this.vx;
    }
    this.x += this.vx;
    this.y += this.vy;
  }

  isNear(otherBall) {
    const dx = this.x - otherBall.x;
    const dy = this.y - otherBall.y;
    return dx * dx + dy * dy < lineLength * lineLength;
  }
}

function createOrUpdateBalls() {
  for (let i = 0; i < ballsCount; i++) {
    if (balls[i]) {
      balls[i].x = Math.random() * (canvas.width - 20) + 10;
      balls[i].y = Math.random() * (canvas.height - 20) + 10;
      balls[i].vx = Math.random() * 5 - 1.5;
      balls[i].vy = Math.random() * 5 - 1.5;
    } else {
      balls.push(new Ball());
    }
  }
  balls.length = ballsCount;
}

function drawBalls() {
  balls.forEach(ball => ball.drawBall());
}

function drawLines() {
  for (let i = 0; i < balls.length; i++) {
    for (let j = i + 1; j < balls.length; j++) {
      if (balls[i].isNear(balls[j])) {
        ctx.beginPath();
        ctx.moveTo(balls[i].x, balls[i].y);
        ctx.lineTo(balls[j].x, balls[j].y);
        ctx.stroke();
        ctx.closePath();
      }
    }
  }
}

function updateCanvas() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  drawBalls();
  drawLines();
  balls.forEach(ball => ball.update());
  raf = requestAnimationFrame(updateCanvas);
}

function startAnimation() {
  ballsCount = parseInt(document.getElementById("ballsCount").value) || 30;
  lineLength = parseInt(document.getElementById("lineLength").value) || 100;
  createOrUpdateBalls();
  if (raf) {
    cancelAnimationFrame(raf);
  }
  raf = requestAnimationFrame(updateCanvas);
}

function resetAnimation() {
  if (raf) cancelAnimationFrame(raf);
  balls.length = 0;
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  document.getElementById("ballsCount").value = '30';
  document.getElementById("lineLength").value = '100';
}

document.getElementById("start-btn").addEventListener("click", startAnimation);
document.getElementById("reset-btn").addEventListener("click", resetAnimation);
