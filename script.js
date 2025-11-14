const gameArea= document.getElementById("game")
const player= document.getElementById("player")
const showScore= document.getElementById("score")

let playerX= gameArea.clientWidth* 0.02
let playerY= gameArea.clientHeight / 2.5

let stars=[]



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

function star(){

    const starDiv= document.createElement("div")
    starDiv.classList.add("star")

    const starImg= document.createElement("img")
    starImg.src= "images/star.png"
    starDiv.appendChild(starImg)

    let starX= gameArea.clientWidth
    let starY= Math.random()* (gameArea.clientHeight - 50)


    starDiv.style.left= starX + "px"
    starDiv.style.top= starY+"px"

    gameArea.appendChild(starDiv)

    stars.push({
        element: starDiv, x: starX, y: starY, speed: 4
    })

}

function starMovement(){


    for(let i= stars.length - 1; i >= 0; i--){
        let star= stars[i]
        star.x -= star.speed

        star.element.style.left= star.x + "px"

        if(star.x < -50){
            
              star.element.remove()
              stars.splice(i, 1)


        }
    }

    requestAnimationFrame(starMovement)
}

setInterval(star, 800)

starMovement()

playerMovement()