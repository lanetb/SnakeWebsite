"use strict";
const gameBoard = document.querySelector("#gameBoard");
const gameBoardContext = gameBoard.getContext("2d");
const playerOneScore = document.querySelector("#playerOneScore");
const playerTwoScore = document.querySelector("#playerTwoScore");
const resetButton = document.querySelector("#resetBtn");
const col = 30;
const rows = 60;
const boardHeight = gameBoard.height;
const boardWidth = gameBoard.width;
const boardBackground = "rgb(28, 28, 28)";
const boardBorder = "white";
const playerOneSnakeColor = "lightgreen";
const playerTwoSnakeColor = "lightblue";
const playerOneBodyColor = "green";
const playerTwoBodyColor = "blue";
const foodColor = "red";
const unitSize = 25;
let running = false;
let playerOnewin = false;
let playerTwowin = false;
let playerOneKeyPressed = false;
let playerTwoKeyPressed = false;
let xVelocity = 0;
let yVelocity = 0;
let xVelocity2 = 0;
let yVelocity2 = 0;
let foodX;
let foodY;
let foodX2;
let foodY2;
let playerOScore = 0;
let playerTScore = 0;
let playerOneSnake = [
    { x: 25, y: 375 }
];
let playerTwoSnake = [
    { x: 1450, y: 375 }
];
window.addEventListener("keydown", changeDirectionOne);
window.addEventListener("keydown", changeDirectionTwo);
gameStart();
function gameStart() {
    running = true;
    createFood(1);
    createFood(2);
    drawFood();
    nextTick();
}
function nextTick() {
    if (running) {
        setTimeout(() => {
            clearBoard();
            drawFood();
            moveSnake();
            moveSnake2();
            drawSnake();
            drawSnake2();
            playerOneKeyPressed = false;
            playerTwoKeyPressed = false;
            checkGameOver();
            nextTick();
        }, 75);
    }
    else {
        displayGameOver();
    }
}
function clearBoard() {
    gameBoardContext.fillStyle = boardBackground;
    gameBoardContext.fillRect(0, 0, boardWidth, boardHeight);
}
function createFood(type) {
    function randomFood(min, max) {
        return Math.round((Math.round(Math.random() * (max - min) + min) / unitSize)) * unitSize;
    }
    if (type === 1) {
        foodX = randomFood(0, boardWidth / 2);
        foodY = randomFood(0, boardHeight - unitSize);
    }
    else if (type === 2) {
        foodX2 = randomFood(boardWidth / 2 + unitSize, boardWidth - unitSize);
        foodY2 = randomFood(0, boardHeight - unitSize);
    }
}
function drawFood() {
    gameBoardContext.fillStyle = foodColor;
    gameBoardContext.fillRect(foodX, foodY, unitSize, unitSize);
    gameBoardContext.fillRect(foodX2, foodY2, unitSize, unitSize);
}
function moveSnake() {
    const head = { x: playerOneSnake[0].x + xVelocity, y: playerOneSnake[0].y + yVelocity };
    playerOneSnake.unshift(head);
    const didEatFood1 = playerOneSnake[0].x === foodX && playerOneSnake[0].y === foodY;
    const didEatFood2 = playerOneSnake[0].x === foodX2 && playerOneSnake[0].y === foodY2;
    if (didEatFood1 || didEatFood2) {
        playerOneScore.textContent = ++playerOScore;
        if (didEatFood1) {
            createFood(1);
        }
        else if (didEatFood2) {
            createFood(2);
        }
    }
    else {
        playerOneSnake.pop();
    }
}
function moveSnake2() {
    const head = { x: playerTwoSnake[0].x + xVelocity2, y: playerTwoSnake[0].y + yVelocity2 };
    playerTwoSnake.unshift(head);
    const didEatFood1 = playerTwoSnake[0].x === foodX && playerTwoSnake[0].y === foodY;
    const didEatFood2 = playerTwoSnake[0].x === foodX2 && playerTwoSnake[0].y === foodY2;
    if (didEatFood1 || didEatFood2) {
        playerTwoScore.textContent = ++playerTScore;
        if (didEatFood1) {
            createFood(1);
        }
        else if (didEatFood2) {
            createFood(2);
        }
    }
    else {
        playerTwoSnake.pop();
    }
}
function drawSnake() {
    gameBoardContext.fillStyle = playerOneSnakeColor;
    gameBoardContext.strokeStyle = playerOneBodyColor;
    playerOneSnake.forEach((snakePart) => {
        gameBoardContext.fillRect(snakePart.x, snakePart.y, unitSize, unitSize);
        gameBoardContext.strokeRect(snakePart.x, snakePart.y, unitSize, unitSize);
    });
}
function drawSnake2() {
    gameBoardContext.fillStyle = playerTwoSnakeColor;
    gameBoardContext.strokeStyle = playerTwoBodyColor;
    playerTwoSnake.forEach((snakePart) => {
        gameBoardContext.fillRect(snakePart.x, snakePart.y, unitSize, unitSize);
        gameBoardContext.strokeRect(snakePart.x, snakePart.y, unitSize, unitSize);
    });
}
function changeDirectionTwo(event) {
    const keyPressed = event.keyCode;
    const goingUp = yVelocity2 === -unitSize;
    const goingDown = yVelocity2 === unitSize;
    const goingRight = xVelocity2 === unitSize;
    const goingLeft = xVelocity2 === -unitSize;
    if (keyPressed === 37 && !goingRight && !playerTwoKeyPressed) {
        playerTwoKeyPressed = true;
        xVelocity2 = -unitSize;
        yVelocity2 = 0;
    }
    else if (keyPressed === 38 && !goingDown && !playerTwoKeyPressed) {
        playerTwoKeyPressed = true;
        xVelocity2 = 0;
        yVelocity2 = -unitSize;
    }
    else if (keyPressed === 39 && !goingLeft && !playerTwoKeyPressed) {
        playerTwoKeyPressed = true;
        xVelocity2 = unitSize;
        yVelocity2 = 0;
    }
    else if (keyPressed === 40 && !goingUp && !playerTwoKeyPressed) {
        playerTwoKeyPressed = true;
        xVelocity2 = 0;
        yVelocity2 = unitSize;
    }
}
function changeDirectionOne(event) {
    const keyPressed = event.keyCode;
    const goingUp = yVelocity === -unitSize;
    const goingDown = yVelocity === unitSize;
    const goingRight = xVelocity === unitSize;
    const goingLeft = xVelocity === -unitSize;
    if (keyPressed === 65 && !goingRight && !playerOneKeyPressed) {
        playerOneKeyPressed = true;
        xVelocity = -unitSize;
        yVelocity = 0;
    }
    else if (keyPressed === 87 && !goingDown && !playerOneKeyPressed) {
        playerOneKeyPressed = true;
        xVelocity = 0;
        yVelocity = -unitSize;
    }
    else if (keyPressed === 68 && !goingLeft && !playerOneKeyPressed) {
        playerOneKeyPressed = true;
        xVelocity = unitSize;
        yVelocity = 0;
    }
    else if (keyPressed === 83 && !goingUp && !playerOneKeyPressed) {
        playerOneKeyPressed = true;
        xVelocity = 0;
        yVelocity = unitSize;
    }
}
function checkGameOver() {
    switch (true) {
        case playerOneSnake[0].x < 0:
            running = false;
            playerTwowin = true;
            break;
        case playerOneSnake[0].x > boardWidth - unitSize:
            running = false;
            playerTwowin = true;
            break;
        case playerOneSnake[0].y < 0:
            running = false;
            playerTwowin = true;
            break;
        case playerOneSnake[0].y > boardHeight - unitSize:
            running = false;
            playerTwowin = true;
            break;
        case playerTwoSnake[0].x < 0:
            running = false;
            playerOnewin = true;
            break;
        case playerTwoSnake[0].x > boardWidth - unitSize:
            running = false;
            playerOnewin = true;
            break;
        case playerTwoSnake[0].y < 0:
            running = false;
            playerOnewin = true;
            break;
        case playerTwoSnake[0].y > boardHeight - unitSize:
            running = false;
            playerOnewin = true;
            break;
    }
    for (let i = 1; i < playerOneSnake.length; i++) {
        if (playerOneSnake[0].x === playerOneSnake[i].x && playerOneSnake[0].y === playerOneSnake[i].y) {
            running = false;
            playerTwowin = true;
        }
        else if (playerTwoSnake[0].x === playerOneSnake[i].x && playerTwoSnake[0].y === playerOneSnake[i].y) {
            running = false;
            playerOnewin = true;
        }
    }
    for (let i = 1; i < playerTwoSnake.length; i++) {
        if (playerTwoSnake[0].x === playerTwoSnake[i].x && playerTwoSnake[0].y === playerTwoSnake[i].y) {
            running = false;
            playerOnewin = true;
        }
        else if (playerOneSnake[0].x === playerTwoSnake[i].x && playerOneSnake[0].y === playerTwoSnake[i].y) {
            running = false;
            playerTwowin = true;
        }
    }
}
function displayGameOver() {
    gameBoardContext.fillStyle = "white";
    gameBoardContext.font = "50px Copse";
    gameBoardContext.textAlign = "center";
    if (playerOnewin) {
        gameBoardContext.fillText("Player One Wins!", boardWidth / 2, unitSize * 5);
    }
    else if (playerTwowin) {
        gameBoardContext.fillText("Player Two Wins!", boardWidth / 2, unitSize * 5);
    }
    // create a button that appears when the game is over
    const button = document.createElement('button');
    button.innerText = "Play Again";
    button.addEventListener('click', resetGame);
    document.body.appendChild(button);
    //make the button appear in the middle of the screen
    button.style.textAlign = "center";
    button.style.position = "absolute";
    button.style.top = "50%";
    button.style.left = "50%";
    button.style.transform = "translate(-50%, -50%)";
    button.style.fontSize = "50px";
    button.style.fontFamily = "Copse";
    button.style.backgroundColor = "white";
    button.style.border = "none";
    button.style.borderRadius = "10px";
    button.style.padding = "10px 50px";
    button.style.cursor = "pointer";
    button.style.outline = "none";
    //make the button disappear after it is clicked
    button.addEventListener('click', function () {
        button.style.display = "none";
        button2.style.display = "none";
    });
    //make the button appear bellow the text
    button.style.marginTop = "50px";
    //create a button that appears when the game is over and takes you to the home page
    const button2 = document.createElement('button');
    button2.onclick = function () {
        location.href = "index.html";
    };
    button2.innerText = "Home";
    document.body.appendChild(button2);
    //make the button appear in the middle of the screen
    button2.style.textAlign = "center";
    button2.style.position = "absolute";
    button2.style.top = "50%";
    button2.style.left = "50%";
    button2.style.transform = "translate(-50%, -50%)";
    button2.style.fontSize = "50px";
    button2.style.fontFamily = "Copse";
    button2.style.backgroundColor = "white";
    button2.style.border = "none";
    button2.style.borderRadius = "10px";
    button2.style.padding = "10px 50px";
    button2.style.cursor = "pointer";
    button2.style.outline = "none";
    button2.style.marginTop = "150px";
}
function resetGame() {
    playerOScore = 0;
    playerOneScore.textContent = playerOScore;
    playerTScore = 0;
    playerTwoScore.textContent = playerTScore;
    xVelocity = 0;
    yVelocity = 0;
    xVelocity2 = 0;
    yVelocity2 = 0;
    playerOneSnake = [
        { x: 25, y: 375 }
    ];
    playerTwoSnake = [
        { x: 1450, y: 375 }
    ];
    clearBoard();
    gameStart();
}
