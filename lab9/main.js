const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
let raf;

let ballsCount = 100;
let lineLength = 130;
const balls = [];

let mouse = { 
  x: 0, 
  y: 0, 
radius: 80
};

canvas.addEventListener('mousemove', 
function(event) {
  let rect = canvas.getBoundingClientRect(); //metoda pobiera rozmiar elementu oraz jego pozycji i zwraca obiekt DOMRect, który zawiera informacje o pozycji
  mouse.x = event.clientX - rect.left;
  mouse.y = event.clientY - rect.top;
 });

class Ball {
  constructor() {
    this.x = Math.random() * (canvas.width - 20) + 10;
    this.y = Math.random() * (canvas.height - 20) + 10;
    this.vx = Math.random() * 3 - 1;
    this.vy = Math.random() * 3 - 1;
    this.radius = Math.random() * 6 + 1;
  }

  drawBall() {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, true);
    ctx.closePath();
    ctx.fillStyle = 'white';
    ctx.fill();
  }

  interactWithCursor() {
    let dx = this.x - mouse.x;
    let dy = this.y - mouse.y;
    let distance = Math.sqrt(dx * dx + dy * dy);
//odpychanie kulek
    if (distance < mouse.radius + this.radius) {
      if (mouse.x < this.x && this.x < canvas.width - this.radius * 10) {
        this.x += 10;
      }
      if (mouse.x > this.x && this.x > this.radius * 10) {
        this.x -= 10;
      }
      if (mouse.y < this.y && this.y < canvas.height - this.radius * 10) {
        this.y += 10;
      }
      if (mouse.y > this.y && this.y > this.radius * 10) {
        this.y -= 10;
      }
    }
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
    this.interactWithCursor();

  }

  isNear(otherBall) {
    const dx = this.x - otherBall.x;
    const dy = this.y - otherBall.y;
    return Math.sqrt(dx * dx + dy * dy);
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

// function drawLines() { //1 rysuję pomiędzy kulkami zwykłe linie
//   ctx.strokeStyle = 'white';
//   for (let i = 0; i < balls.length; i++) {
//     for (let j = i + 1; j < balls.length; j++) {
//       if (balls[i].isNear(balls[j])) {
//         ctx.beginPath();
//         ctx.moveTo(balls[i].x, balls[i].y);
//         ctx.lineTo(balls[j].x, balls[j].y);
//         ctx.stroke();
//         ctx.closePath();
//       }
//     }
//   }
// }
function drawLines() {
  ctx.strokeStyle = 'white';
  for (let i = 0; i < balls.length; i++) {
    for (let j = i + 1; j < balls.length; j++) {
      const distance = balls[i].isNear(balls[j]);
      if (distance < lineLength) {
        ctx.globalAlpha = Math.max(0.1, 1 - (distance / lineLength)); ///dodaję przezroczystość do linii w zależności od odległości
        ctx.beginPath();
        ctx.moveTo(balls[i].x, balls[i].y);
        ctx.lineTo(balls[j].x, balls[j].y);
        ctx.stroke();
        ctx.closePath();
        ctx.globalAlpha = 1;
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
  ballsCount = parseInt(document.getElementById("ballsCount").value) || 100;
  lineLength = parseInt(document.getElementById("lineLength").value) || 130;
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
  document.getElementById("ballsCount").value = '100';
  document.getElementById("lineLength").value = '130';
}

//mouse out event
canvas.addEventListener('mouseout', 
function(){
  mouse.x = undefined;
  mouse.y = undefined;
});

document.getElementById("start-btn").addEventListener("click", startAnimation);
document.getElementById("reset-btn").addEventListener("click", resetAnimation);
