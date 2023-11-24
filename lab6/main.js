let ball= document.querySelector("#ball");   
let container = document.getElementsByClassName("container")[0];
let holes = [];
let startGame = false;
let speedX = 0, speedY = 0;
let posX = 20, posY = 20;

window.addEventListener('deviceorientation', onDeviceMove)

function start(){
    gameStart = true;
    spawnHoles();
    moveBall();
    console.log("game Started!")
    document.getElementById("start").hidden=true;
    counter = document.createElement('span'); //punkty 
    counter.classList.add("counter");
    container.appendChild(counter);
}

function restart(){
    startGame = true;
    for(i = container.childElementCount; i > 0; i--){
        if(container.childNodes[i].nodeName == "DIV"){
            if(container.childNodes[i].id !== "ball"){
                container.removeChild(container.childNodes[i])
            }
        }
    }

    holes = [];
    posX = 20, posY = 20;
    spawnHoles();
    moveBall();
    console.log("game Started!")
    document.getElementById("restart").hidden = true;
}
// function onDeviceMove(event) {
//     console.log(event)
// }

// function animate() {
//     //    console.log(Date.now())
//     // requestAnimationFrame(animate)
// }

// requestAnimationFrame(animate)