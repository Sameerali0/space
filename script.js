const gameArea= document.getElementById("game")
const player= document.getElementById("player")
const showScore= document.getElementById("score")
const gameOverDiv= document.getElementById("gameOver")
const finalScore= document.getElementById("finalScore")
const playAgainBtn= document.getElementById("playAgain")
const showHighScore= document.getElementById("highScore")
const finalHighScore= document.getElementById("finalHighScore")
const showLevel= document.getElementById("level")
const pauseBtn= document.getElementById("pauseBtn")
const startScreen= document.getElementById("start")
const startBtn= document.getElementById("startBtn")


const starCollectSound= new Audio("sounds/star.mp3")
const rockHitSound= new Audio("sounds/rock.mp3")


let playerX
let playerY

let stars=[]
let rocks=[]
let score = 0

let starInterval
let rockInterval

let isPaused= false
let gameRunning= true

let level= 1
let starSpeed= 4
let rockSpeed= 6

let highScore= localStorage.getItem("highScore") || 0
showHighScore.textContent= "High Score: " + highScore


const speed = 6
const keys = {}

document.addEventListener("keydown", e =>keys[e.key.toLowerCase()] = true)
document.addEventListener("keyup", e =>keys[e.key.toLowerCase()]= false)

function showLevelUp(levelNum){

    const levelUpDiv= document.getElementById("levelUp")
    levelUpDiv.textContent= "LEVEL " + levelNum
    levelUpDiv.style.display= "block"

    setTimeout(() =>{

        levelUpDiv.style.display= "none"
    }, 800)
}


function levelUp (){

    let newLevel= Math.floor(score / 10) + 1

     if(newLevel !== level){
        level= newLevel

        starSpeed++
        rockSpeed++

        stars.forEach(s => s.speed= starSpeed)

        rocks.forEach(r => r.speed= rockSpeed)

        showLevel.textContent = "Level: " + level;

        showLevelUp(level)

    }
}

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
        element: starDiv, x: starX, y: starY, speed: starSpeed
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
            

            starCollectSound.currentTime= 0
            starCollectSound.play()
            
            star.element.remove()
            stars.splice(i, 1)

            score++

            showScore.textContent= "Score: " + score

            levelUp()
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

            element: rockDiv, x: rockX, y: rockY, speed: rockSpeed  
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

            
            rockHitSound.currentTime= 0
            rockHitSound.play()

             gameOver()
             return
        }
    }

    requestAnimationFrame(rockMovement)
    
}


function rocket(){

    const rocketDiv= document.createElement("div")
    rocketDiv.classList.add("rocket")

    const rocketImg= document.createElement("img")
    rocketImg.src= "images/rocket.png"
    rocketDiv.appendChild(rocketImg)


    gameArea.appendChild(rocketDiv)


}

rocket()
function gameOver(){

    gameRunning= false

    if(score > highScore){

        highScore= score
        localStorage.setItem("highScore", highScore)

    }

    finalScore.textContent= "Your Score: " + score

    finalHighScore.textContent= "High Score: " + highScore

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

function pauseGame(){
    
    isPaused= true
    gameRunning= false
    pauseBtn.textContent= "Resume"


    clearInterval(starInterval)

    clearInterval(rockInterval)
    
}

function resumeGame(){
    
    isPaused= false
    gameRunning= true
    pauseBtn.textContent= "Pause"

    starInterval= setInterval(star, 800)
    rockInterval= setInterval(rock, 1000)


    starMovement()
    rockMovement()

    playerMovement()
}


function game() {
    
    gameOverDiv.style.display="none"

    stars.forEach(s => s.element.remove())
    rocks.forEach(r => r.element.remove())

    stars= []
    rocks= []

    starSpeed= 4
    rockSpeed= 6

    score= 0
    level= 1

    showLevel.textContent= "Level: 1"
    showScore.textContent= "Score: 0"
    showHighScore.textContent= "High Score: " + highScore

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

pauseBtn.addEventListener("click", () =>{

    if(!isPaused){

        pauseGame()

    }else{

        resumeGame()
    }
})


startBtn.addEventListener("click", () =>{

     startScreen.style.display="none"

    game()

})
