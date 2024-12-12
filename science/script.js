const canvas = document.getElementById('pong');
const context = canvas.getContext('2d');
canvas.width = canvas.offsetWidth;
canvas.height = canvas.offsetHeight;

const paddleWidth = 10;
const paddleHeight = 100;
const ballSize = 10;
let gameOver = false;

const player = {
    x: 0,
    y: canvas.height / 2 - paddleHeight / 2,
    width: paddleWidth,
    height: paddleHeight,
    color: '#fff',
    dy: 4
};

const ai = {
    x: canvas.width - paddleWidth,
    y: canvas.height / 2 - paddleHeight / 2,
    width: paddleWidth,
    height: paddleHeight,
    color: '#fff',
    dy: 4
};

const ball = {
    x: canvas.width / 2,
    y: canvas.height / 2,
    size: ballSize,
    dx: 4,
    dy: 4,
    color: '#fff'
};

function drawRect(x, y, w, h, color) {
    context.fillStyle = color;
    context.fillRect(x, y, w, h);
}

function drawBall(x, y, size, color) {
    context.fillStyle = color;
    context.beginPath();
    context.arc(x, y, size, 0, Math.PI * 2);
    context.closePath();
    context.fill();
}

function movePlayer() {
    document.addEventListener('keydown', event => {
        if (event.key === 'ArrowUp' && player.y > 0) {
            player.y -= player.dy;
        } else if (event.key === 'ArrowDown' && player.y + player.height < canvas.height) {
            player.y += player.dy;
        }
    });
}

function moveAi() {
    if (ball.y < ai.y + ai.height / 2) {
        ai.y -= ai.dy;
    } else if (ball.y > ai.y + ai.height / 2) {
        ai.y += ai.dy;
    }
}

function moveBall() {
    ball.x += ball.dx;
    ball.y += ball.dy;

    if (ball.y + ball.size > canvas.height || ball.y - ball.size < 0) {
        ball.dy *= -1;
    }

    if (ball.x + ball.size > canvas.width) {
        ball.dx *= -1;
    }

    if (ball.x - ball.size < 0) {
        gameOver = true;
        displayGameOver();
    }

    if (collision(player, ball)) {
        ball.dx *= -1;
    } else if (collision(ai, ball)) {
        ball.dx *= -1;
    }
}

function collision(paddle, ball) {
    return (
        ball.x - ball.size < paddle.x + paddle.width &&
        ball.x + ball.size > paddle.x &&
        ball.y + ball.size > paddle.y &&
        ball.y - ball.size < paddle.y + paddle.height
    );
}

function displayGameOver() {
    const gameOverDiv = document.getElementById('game-over');
    gameOverDiv.style.display = 'block';
    setTimeout(() => location.reload(), 2000); // Reload the page after 2 seconds
}

function gameLoop() {
    if (!gameOver) {
        context.clearRect(0, 0, canvas.width, canvas.height);
        drawRect(player.x, player.y, player.width, player.height, player.color);
        drawRect(ai.x, ai.y, ai.width, ai.height, ai.color 
