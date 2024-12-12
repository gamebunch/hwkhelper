const dino = document.getElementById('dino');
const spike = document.getElementById('spike');
const scoreDisplay = document.getElementById('score');
let isJumping = false;
let gravity = 0.9;
let score = 0;

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

function checkCollision() {
    const dinoRect = dino.getBoundingClientRect();
    const spikeRect = spike.getBoundingClientRect();

    if (dinoRect.right > spikeRect.left && dinoRect.left < spikeRect.right && dinoRect.bottom > spikeRect.top) {
        // Collision detected
        return true;
    }
    return false;
}

function moveSpike() {
    spike.style.right = parseInt(spike.style.right) + 1 + 'px';
    if (parseInt(spike.style.right) > window.innerWidth) {
        spike.style.right = '0px';
        score++;
        scoreDisplay.textContent = score;
    }
    if (!checkCollision()) {
        requestAnimationFrame(moveSpike);
    } else {
        alert('Game Over! Final Score: ' + score);
        resetGame();
    }
}

function resetGame() {
    spike.style.right = '0px';
    score = 0;
    scoreDisplay.textContent = score;
    moveSpike();
}

window.addEventListener('resize', adjustGameSize);
adjustGameSize();
moveSpike();

function adjustGameSize() {
    const gameContainer = document.getElementById('game-container');
    gameContainer.style.width = window.innerWidth + 'px';
    gameContainer.style.height = window.innerHeight + 'px';
}
