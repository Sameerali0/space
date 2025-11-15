const gameArea= document.getElementById("game")
const player= document.getElementById("player")
const showScore= document.getElementById("score")
const gameOverDiv= document.getElementById("gameOver")
const finalScore= document.getElementById("finalScore")
const playAgainBtn= document.getElementById("playAgain")


let playerX
let playerY

let stars=[]
let rocks=[]
let score = 0

let starInterval
let rockInterval

let gameRunning= true

const speed = 6
const keys = {}

document.addEventListener("keydown", e =>keys[e.key.toLowerCase()] = true)
document.addEventListener("keyup", e =>keys[e.key.toLowerCase()]= false)

function playerMovement (){

    if(!gameRunning){

        return
    }

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

    if(!gameRunning){
        
        return
    }

    for(let i= stars.length - 1; i >= 0; i--){
        let star= stars[i]
        star.x -= star.speed

        star.element.style.left= star.x + "px"

        if(star.x < -50){
            
              star.element.remove()
              stars.splice(i, 1)


        }

        if(playerX < star.x + 40 && playerX + player.clientWidth > star.x &&
           playerY < star.y + 40 && playerY + player.clientHeight > star.y
        ){
            
            star.element.remove()
            stars.splice(i, 1)

            score++

            showScore.textContent= "Score: " + score
        }
    }

    requestAnimationFrame(starMovement)
}

function rock(){

    const rockDiv= document.createElement("div")
    rockDiv.classList.add("rock")

    const rockImg= document.createElement("img")
    rockImg.src= "images/rock.png"
    rockDiv.appendChild(rockImg)


    let rockX= gameArea.clientWidth
    let rockY= Math.random() * (gameArea.clientHeight -70)

    rockDiv.style.left= rockX +"px"
    rockDiv.style.top= rockY+ "px"

    gameArea.appendChild(rockDiv)


        rocks.push({

            element: rockDiv, x: rockX, y: rockY, speed: 6  
        })
}



function rockMovement(){

    if(!gameRunning){

        return
    }

    for(let i= rocks.length - 1; i >= 0; i--){

        let rock= rocks[i]
        rock.x -= rock.speed

        rock.element.style.left= rock.x +"px"


          if(rock.x < -70){
                rock.element.remove()
                rocks.splice(i, 1)
          }


        if(playerX < rock.x + 60 && playerX + player.clientWidth > rock.x &&
           playerY < rock.y + 60 && playerY + player.clientHeight > rock.y
        ){

             gameOver()
             return
        }
    }

    requestAnimationFrame(rockMovement)
    
}

function gameOver(){

    gameRunning= false

    finalScore.textContent= "Your Score: " + score

    gameOverDiv.style.display= "flex"

    clearInterval(starInterval)
    clearInterval(rockInterval)
}

function resetPlayer(){

    playerX= gameArea.clientWidth* 0.02
    playerY= gameArea.clientHeight / 2.5

    player.style.left= playerX +"px"
    player.style.top= playerY +"px"

}


function game() {
    
    gameOverDiv.style.display="none"

    stars.forEach(s => s.element.remove())
    rocks.forEach(r => r.element.remove())

    stars= []
    rocks= []

    score = 0
    showScore.textContent = "Score: 0"

    resetPlayer()

    gameRunning= true

    starInterval= setInterval(star, 800)

    rockInterval= setInterval(rock, 1000)


rockMovement()

starMovement()

playerMovement()

}

playAgainBtn.addEventListener("click", () =>{

    game()
})

game()