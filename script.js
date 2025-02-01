
let balloon = document.getElementById('balloon');
let airPumpButton = document.getElementById('airPumpButton');
let isInflating = false;
let balloonSize = 100;
let balloonFlying = false;
let balloonTimer;


const balloonClasses = ['balloon1', 'balloon2', 'balloon3', 'balloon4', 'balloon5'];


function startNewBalloon() {
    isInflating = false;
    balloonFlying = false;
    balloonSize = 100;
    
 
    balloon.style.display = 'block';
    balloon.style.width = `${balloonSize}px`;
    balloon.style.height = `${balloonSize * 1.5}px`;
    balloon.style.bottom = '0px'; // Reset position
    balloon.style.left = `${Math.random() * (window.innerWidth - 100)}px`; 
    
   
    balloon.className = 'balloon'; 
    let randomBalloon = balloonClasses[Math.floor(Math.random() * balloonClasses.length)];
    balloon.classList.add(randomBalloon);
}


airPumpButton.onmousedown = () => {
    if (isInflating || balloonFlying) return;
    isInflating = true;

    balloonTimer = setInterval(() => {
        if (balloonSize >= 200) {
            clearInterval(balloonTimer);
            balloonFlying = true;
            moveBalloonUp();
        } else {
            balloonSize += 5;
            balloon.style.width = `${balloonSize}px`;
            balloon.style.height = `${balloonSize * 1.5}px`;
        }
    }, 100);
};


airPumpButton.onmouseup = () => {
    clearInterval(balloonTimer);
    isInflating = false;
};


function moveBalloonUp() {
    let balloonBottom = 0;
    const riseInterval = setInterval(() => {
        if (balloonBottom >= window.innerHeight) {
            clearInterval(riseInterval);
            burstBalloon();
        } else {
            balloonBottom += 1.5;
            balloon.style.bottom = `${balloonBottom}px`;
        }
    }, 20);
}


function burstBalloon() {
    balloon.style.display = 'none';
    setTimeout(() => {
        startNewBalloon();
    }, 1000);
}


balloon.onclick = () => {
    if (balloonFlying) {
        balloonFlying = false;
        burstBalloon();
    }
};


startNewBalloon();
