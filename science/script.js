const canvas = document.getElementById('gameCanvas');
const context = canvas.getContext('2d');
const gameOverDisplay = document.getElementById('game-over');
canvas.width = canvas.height = 500;

let paddleWidth = 10;
let paddleHeight = 70;
let ballSize = 10;
let playerY = canvas.height / 2 - paddleHeight / 2;
let aiY = canvas.height / 2 - paddleHeight / 2;
let ballX = canvas.width / 2 - ballSize / 2;
let ballY = canvas.height / 2 - ballSize / 2;
let ballSpeedX = 4;
let ballSpeedY = 4;
let playerSpeed = 0;
let aiSpeed = 3;
let playerScore = 0;

function draw() {
    // Clear screen
    context.fillStyle = 'black';
    context.fillRect(0, 0, canvas.width, canvas.height);

    // Player paddle
    context.fillStyle = 'white';
    context.fillRect(0, playerY, paddleWidth, paddleHeight);

    // AI paddle
    context.fillRect(canvas.width - paddleWidth, aiY, paddleWidth, paddleHeight);

    // Ball
    context.fillRect(ballX, ballY, ballSize, ballSize);

    // Score
    context.font = '20px "Press Start 2P"';
    context.fillText(playerScore, canvas.width / 2 - 20, 30);
}

function update() {
    // Move player
    playerY += playerSpeed;

    // Move AI
    if (aiY + paddleHeight / 2 < ballY) {
        aiY += aiSpeed;
    } else {
        aiY -= aiSpeed;
    }

    // Move ball
    ballX += ballSpeedX;
    ballY += ballSpeedY;

    // Ball collision with top and bottom
    if (ballY <= 0 || ballY + ballSize >= canvas.height) {
        ballSpeedY = -ballSpeedY;
    }

    // Ball collision with player paddle
    if (ballX <= paddleWidth && ballY + ballSize >= playerY && ballY <= playerY + paddleHeight) {
        ballSpeedX = -ballSpeedX;
    }

    // Ball collision with AI paddle
    if (ballX + ballSize >= canvas.width - paddleWidth && ballY + ballSize >= aiY && ballY <= aiY + paddleHeight) {
        ballSpeedX = -ballSpeedX;
    }

    // Ball out of bounds
    if (ballX < 0) {
        playerScore++;
        resetBall();
    } else if (ballX + ballSize > canvas.width) {
        gameOver();
    }
}

function resetBall() {
    ballX = canvas.width / 2 - ballSize / 2;
    ballY = canvas.height / 2 - ballSize / 2;
    ballSpeedX = -ballSpeedX;
    ballSpeedY = Math.floor(Math.random() * 10) - 5;
}

function gameOver() {
    gameOverDisplay.style.display = 'block';
    setTimeout(() => {
        playerScore = 0;
        gameOverDisplay.style.display = 'none';
        resetBall();
    }, 2000);
}

document.addEventListener('keydown', function(event) {
    if (event.key === 'ArrowUp') {
        playerSpeed = -5;
    } else if (event.key === 'ArrowDown') {
        playerSpeed = 5;
    }
});

document.addEventListener('keyup', function() {
    playerSpeed = 0;
});

function gameLoop() {
    draw();
    update();
    requestAnimationFrame(gameLoop);
}

gameLoop();
