var snake = document.getElementById("snake")
var snakeHead = snake.children[0]

var left = 0,
    right = 0,
    topPos = 0,
    bottom = 0,
    boxSize = 30,
    borderSize = 2,
    interval = 200,
    index = 1

var snakeRight, snakeLeft, snakeTop, snakeBottom
var isSnakeRight, isSnakeLeft, isSnakeTop, isSnakeBottom
var rightBlocked, leftBlocked, topBlocked, bottomBlocked
var leftElastic, topElastic

for (let i = 0; i < snake.children.length; i++) {
    const el = snake.children[i]
    el.style.width = boxSize + "px"
    el.style.height = boxSize + "px"
}


var grid = document.getElementById("grid"),
    gridSize = grid.offsetWidth - borderSize - boxSize

function borderCrash(snakeInterval) {
    clearInterval(snakeInterval)

    setTimeout(() => {
        startGame()
    }, 1);
}


function startGame() {
    topPos = 300
    left = 300
    snakeHead.style.top = topPos + "px"
    snakeHead.style.left = left + "px"

    isSnakeRight = false
    isSnakeLeft = false
    isSnakeBottom = false
    isSnakeTop = false

    rightBlocked = false
    leftBlocked = false
    bottomBlocked = false
    topBlocked = false

    snakeHead.style.transform = `rotate(0)`
}

startGame()

// var gridBorder = gridSize - boxSize
function moveRight() {
    if (left >= gridSize) {
        borderCrash(snakeRight)
    }

    left += boxSize
    snakeHead.style.left = left + "px"

    eatFood()

    var nextLeftPos = left
    for (let i = 0; i < snake.children.length - 1; i++) {
        const nextEl = snake.children[i + 1]

        nextLeftPos -= boxSize
        nextEl.style.left = nextLeftPos + "px"
        nextEl.style.top = topPos + "px"
    }
}

function moveLeft() {
    if (left <= 0) {
        borderCrash(snakeLeft)
    }

    left -= boxSize
    snakeHead.style.left = left + "px"

    eatFood()



    for (let i = 0; i < snake.children.length - 1; i++) {
        const el = snake.children[i]
        const nextEl = snake.children[i + 1]

        var nextTopPos = nextEl.offsetTop

        if (topElastic) {
            if (nextTopPos != topPos) {
                nextTopPos -= boxSize

                nextEl.style.top = nextTopPos + "px"
            } else {
                var nextLeftPos = nextEl.offsetLeft
                nextLeftPos -= boxSize
                nextEl.style.left = nextLeftPos + "px"
                nextEl.style.top = topPos + "px"
            }
        } else {
            if (nextTopPos != topPos) {
                nextTopPos += boxSize

                nextEl.style.top = nextTopPos + "px"
            } else {
                var nextLeftPos = nextEl.offsetLeft
                nextLeftPos -= boxSize
                nextEl.style.top = topPos + "px"
                nextEl.style.left = nextLeftPos + "px"
            }
        }
    }
}

function moveUp() {
    if (topPos <= 0) {
        borderCrash(snakeTop)
    }

    topPos -= boxSize
    snakeHead.style.top = topPos + "px"

    for (let i = 0; i < snake.children.length - 1; i++) {
        const el = snake.children[i]
        const nextEl = snake.children[i + 1]

        var nextLeftPos = nextEl.offsetLeft

        if (leftElastic) {
            if (nextLeftPos != left) {
                nextLeftPos -= boxSize

                nextEl.style.left = nextLeftPos + "px"
            } else {
                var nextTopPos = nextEl.offsetTop
                nextTopPos -= boxSize
                nextEl.style.top = nextTopPos + "px"
                nextEl.style.left = left + "px"
            }
        } else {
            if (nextLeftPos != left) {
                nextLeftPos += boxSize

                nextEl.style.left = nextLeftPos + "px"
            } else {
                var nextTopPos = nextEl.offsetTop
                nextTopPos -= boxSize
                nextEl.style.top = nextTopPos + "px"
                nextEl.style.left = left + "px"
            }
        }
    }

    eatFood()
}

// var nextLeftPos = snakeHead.offsetLeft

function moveDown() {
    if (topPos >= gridSize) {
        borderCrash(snakeBottom)
    }

    for (let i = 1; i < snake.children.length; i++) {
        const prevEl = snake.children[i - 1]
        const el = snake.children[i]

        el.style.top = prevEl.offsetTop + "px"
    }
    topPos += boxSize
    snakeHead.style.top = topPos + "px"

    eatFood()
}

document.addEventListener('keydown', (event) => {
    const keyName = event.key

    if (keyName === "ArrowRight" && left < 570 && !isSnakeRight && !rightBlocked) {
        clearInterval(snakeTop)
        clearInterval(snakeBottom)
        clearInterval(snakeLeft)

        snakeRight = setInterval(moveRight, interval)

        isSnakeRight = true
        isSnakeLeft = false
        isSnakeBottom = false
        isSnakeTop = false

        rightBlocked = false
        leftBlocked = true
        bottomBlocked = false
        topBlocked = false


        // Rotate the snake
        snakeHead.style.transform = `rotate(-90deg)`

        // For elastic snake
        leftElastic = false
    } else if (keyName === "ArrowLeft" && left >= 30 && !isSnakeLeft && !leftBlocked) {
        clearInterval(snakeRight)
        clearInterval(snakeTop)
        clearInterval(snakeBottom)

        snakeLeft = setInterval(moveLeft, interval)

        isSnakeLeft = true
        isSnakeRight = false
        isSnakeTop = false
        isSnakeBottom = false

        rightBlocked = true
        leftBlocked = false
        bottomBlocked = false
        topBlocked = false

        // Rotate the snake
        snakeHead.style.transform = `rotate(90deg)`

        // For elastic snake
        leftElastic = true
    } else if (keyName === "ArrowDown" && topPos < 570 && !isSnakeBottom && !bottomBlocked) {
        clearInterval(snakeTop)
        clearInterval(snakeRight)
        clearInterval(snakeLeft)

        snakeBottom = setInterval(moveDown, interval)

        isSnakeBottom = true
        isSnakeLeft = false
        isSnakeRight = false
        isSnakeTop = false

        rightBlocked = false
        leftBlocked = false
        bottomBlocked = false
        topBlocked = true

        // Rotate the snake
        snakeHead.style.transform = `rotate(0)`
        topElastic = false
    } else if (keyName === "ArrowUp" && topPos >= 30 && !isSnakeTop && !topBlocked) {
        clearInterval(snakeBottom)
        clearInterval(snakeRight)
        clearInterval(snakeLeft)

        snakeTop = setInterval(moveUp, interval)

        isSnakeTop = true
        isSnakeLeft = false
        isSnakeRight = false
        isSnakeBottom = false

        rightBlocked = false
        leftBlocked = false
        bottomBlocked = true
        topBlocked = false

        // Rotate the snake
        snakeHead.style.transform = `rotate(180deg)`
        topElastic = true
    }
});



var food = document.createElement("div");
food.classList.add("food")
food.setAttribute("id", "food")
food.style.width = boxSize + "px"
food.style.height = boxSize + "px"

grid.appendChild(food)

function generateFood() {
    var food = document.getElementById("food")
    var foodTop = Math.floor(Math.random() * gridSize)
    var foodLeft = Math.floor(Math.random() * gridSize)

    if (foodTop % boxSize === 0) {
        food.style.top = foodTop + "px"
    } else {
        var left = foodTop % boxSize
        foodTop -= left
        food.style.top = foodTop + "px"
    }

    if (foodLeft % boxSize === 0) {
        food.style.left = foodLeft + "px"
    } else {
        var left = foodLeft % boxSize
        foodLeft -= left
        food.style.left = foodLeft + "px"
    }
}

generateFood()

function eatFood() {
    var food = document.getElementsByClassName("food")

    var offsetTopFood = food[0].offsetTop
    var offsetLeftFood = food[0].offsetLeft

    var offsetTopSnake = snakeHead.offsetTop
    var offsetLeftSnake = snakeHead.offsetLeft

    if (offsetTopFood === offsetTopSnake && offsetLeftFood === offsetLeftSnake) {
        generateFood(grid)
        addTail()
    }
}

function addTail() {
    var tail = document.createElement("div")
    tail.classList.add("snake-box")

    tail.style.width = boxSize + "px"
    tail.style.height = boxSize + "px"
    snake.appendChild(tail)
}