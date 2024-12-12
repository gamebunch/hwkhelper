const dino = document.getElementById('dino');
let isJumping = false;
let gravity = 0.9;

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

window.addEventListener('resize', function() {
    const gameContainer = document.getElementById('game-container');
    gameContainer.style.width = window.innerWidth + 'px';
    gameContainer.style.height = window.innerHeight + 'px';
});
