const dino = document.getElementById('dino');
const gameContainer = document.getElementById('game-container');
const scoreDisplay = document.getElementById('score');
const gameOverDisplay = document.getElementById('game-over');
let isJumping = false;
let gravity = 0.9;
let score = 0;
let gameInterval;

document.addEventListener('keydown', function(event) {
    if (event.code === 'Space' || event.code === 'ArrowUp') {
        jump();
    }
});

document.addEventListener('touchstart', function() {
    jump();
});

function jump() {
    if (isJumping) return;
    let position = 0;
    isJumping = true;

    let upInterval = setInterval(() => {
        if (position >= 150) {
            clearInterval(upInterval);
            let downInterval = setInterval(() => {
                if (position <= 0) {
                    clearInterval(downInterval);
                    isJumping = false;
                }
                position -= 5;
                position *= gravity;
                dino.style.bottom = position + 'px';
            }, 20);
        }
        position += 20;
        position *= gravity;
        dino.style.bottom = position + 'px';
    }, 20);
}

function createSpike() {
    const spike = document.createElement('div');
    spike.classList.add('spike');
    spike.style.right = '0';
    gameContainer.appendChild(spike);

    let moveSpikeInterval = setInterval(() => {
        spike.style.right = parseInt(spike.style.right) + 1 + 'px';

        if (parseInt(spike.style.right) > window.innerWidth) {
            clearInterval(moveSpikeInterval);
            spike.remove();
            score++;
            scoreDisplay.textContent = score;
        }

        if (checkCollision(dino, spike)) {
            clearInterval(moveSpikeInterval);
            gameOver();
        }
    }, 20);

    setTimeout(createSpike, Math.random() * 1000 + 2000);
}

function checkCollision(dino, spike) {
    const dinoRect = dino.getBoundingClientRect();
    const spikeRect = spike.getBoundingClientRect();

    return (
        dinoRect.right > spikeRect.left &&
        dinoRect.left < spikeRect.right &&
        dinoRect.bottom > spikeRect.top
    );
}

function gameOver() {
    gameOverDisplay.style.display = 'block';
    clearInterval(gameInterval);
    gameContainer.querySelectorAll('.spike').forEach(spike => spike.remove());
    setTimeout(resetGame, 2000); // Give time to see the game over message before resetting
}

function resetGame() {
    gameOverDisplay.style.display = 'none';
    score = 0;
    scoreDisplay.textContent = score;
    startGame();
}

function startGame() {
    gameInterval = setInterval(() => {
        if (!isJumping) jump();
    }, 2000);
    setTimeout(createSpike, Math.random() * 1000 + 2000);
}

window.addEventListener('resize', adjustGameSize);
adjustGameSize();
startGame();

function adjustGameSize() {
    gameContainer.style.width = '80%';
    gameContainer.style.height = '70%';
}
