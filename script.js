const gameArea= document.getElementById("game")
const player= document.getElementById("player")
const star= document.getElementById("star")

let playerX= gameArea.clientWidth* 0.02
let playerY= gameArea.clientHeight / 2.5

let starX= gameArea.clientWidth
let starY= Math.random()* (gameArea.clientHeight - 50)

const speed = 6
const keys = {}

document.addEventListener("keydown", e =>keys[e.key.toLowerCase()] = true)
document.addEventListener("keyup", e =>keys[e.key.toLowerCase()]= false)

function playerMovement (){
    if(keys["arrowup"]) playerY -= speed
    if(keys["arrowdown"]) playerY += speed

    if(keys["arrowleft"])playerX -= speed
    if(keys["arrowright"])playerX += speed


    const limitX= gameArea.clientWidth - player.clientWidth
    const limitY= gameArea.clientHeight - player.clientHeight

    if(playerY < 0) playerY= 0

    if (playerY > limitY)playerY =limitY

    if (playerX < 0) playerX= 0
        
    if (playerX > limitX) playerX= limitX

    player.style.left= playerX +"px"
    player.style.top= playerY +"px"

    requestAnimationFrame(playerMovement)

}

function starMovement(){
    starX -= 4


    if(starX < -50){

        starX= gameArea.clientWidth
        starY= Math.random()* (gameArea.clientHeight -50)
    }

    star.style.left= starX + "px"
    star.style.top= starY+"px"

    requestAnimationFrame(starMovement)

}


starMovement()

playerMovement()