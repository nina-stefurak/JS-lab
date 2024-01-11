const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
// let raf;

let ballsCount = 30;
let lineLength = 100;
const balls = [];

class Ball {
  constructor() {
  this.x = Math.random() * (canvas.width - 20) + 10;
  this.y = Math.random() * (canvas.height - 20) + 10;
  this.vx = Math.random() * 5 - 1.5;
  this.vy = Math.random() * 5 - 1.5;
  this.radius = 15;
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
    if (this.x + this.vx > canvas.width - 10|| this.x + this.vx < 10) {
      this.vx = -this.vx;
    }
    this.x += this.vx;
    this.y += this.vy;
  }
  isNear(otherBall, squaredDistance) {
    const dx = this.x - otherBall.x;
    const dy = this.y - otherBall.y;
    return dx * dx + dy * dy < squaredDistance;
}
}

function getVelocity() {
  return Math.random() * 5 - 1.5;
}

function getPosition(max, offset) {
  return Math.random() * (max - offset * 2) + offset;
}

function createOrUpdateBalls() {
  for (let i = 0; i < count; i++) {
      if (balls[i]) {
          balls[i].x = getPosition(canvas.width, 20);
          balls[i].y = getPosition(canvas.height, 20);
          balls[i].velocityX = getVelocity();
          balls[i].velocityY = getVelocity();
      } else {
          balls.push(new Ball(
              getPosition(canvas.width, 20),
              getPosition(canvas.height, 20),
              getVelocity(),
              getVelocity()
          ));
      }
  }

  balls.length = count;
}

function drawBalls() {
  balls.forEach(ball => ball.drawBall());
}

function drawLines() {
  const squaredLineLength = lineLength * lineLength;
  for (let i = 0; i < balls.length; i++) {
      for (let j = i + 1; j < balls.length; j++) {
          if (balls[i].isNear(balls[j], squaredLineLength)) {
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
  requestAnimationFrame(updateCanvas);
}

function startAnimation() {
  count = parseInt(document.querySelector("#ballsCount").value) || 30;
  lineLength = parseInt(document.querySelector("#lineLength").value) || 100;
  createOrUpdateBalls();
  requestAnimationFrame(updateCanvas);
}

function resetAnimation() {
  balls.length = 0;
  balls.length = 0;
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  document.querySelector("#ballsCount").value = '30'; 
  document.querySelector("#lineLength").value = '100'; 
}

document.querySelector("#start-btn").addEventListener("click", startAnimation);
document.getElementById("reset-btn").addEventListener("click", resetAnimation);



// canvas.addEventListener("mouseover", (e) => {
//   raf = window.requestAnimationFrame(draw);
// });

// canvas.addEventListener("mouseout", (e) => {
//   window.cancelAnimationFrame(raf);
// });

  //to trailing effect
  //ctx.fillStyle = "rgba(255, 255, 255, 0.3)"; 
  //ctx.fillRect(0, 0, canvas.width, canvas.height);
  // ctx.clearRect(0, 0, canvas.width, canvas.height); //clearing prior frames
