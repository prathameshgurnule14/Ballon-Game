// Select the elements
let balloon = document.getElementById('balloon');
let airPumpButton = document.getElementById('airPumpButton');
let isInflating = false;
let balloonSize = 100;
let balloonFlying = false;
let balloonTimer;

// Array of balloon classes to apply different images
const balloonClasses = ['balloon1', 'balloon2', 'balloon3', 'balloon4', 'balloon5'];

// Function to start the game and reset the balloon
function startNewBalloon() {
    isInflating = false;
    balloonFlying = false;
    balloonSize = 100;
    
    // Reset balloon properties
    balloon.style.display = 'block';
    balloon.style.width = `${balloonSize}px`;
    balloon.style.height = `${balloonSize * 1.5}px`;
    balloon.style.bottom = '0px'; // Reset position
    balloon.style.left = `${Math.random() * (window.innerWidth - 100)}px`; // Random position
    
    // Assign a random balloon image
    balloon.className = 'balloon'; // Reset class
    let randomBalloon = balloonClasses[Math.floor(Math.random() * balloonClasses.length)];
    balloon.classList.add(randomBalloon);
}

// Function to start inflating when button is pressed
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

// Stop inflating when button is released
airPumpButton.onmouseup = () => {
    clearInterval(balloonTimer);
    isInflating = false;
};

// Function to make the balloon rise slowly
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

// Function to burst and restart the game
function burstBalloon() {
    balloon.style.display = 'none';
    setTimeout(() => {
        startNewBalloon();
    }, 1000);
}

// Click event to burst the balloon
balloon.onclick = () => {
    if (balloonFlying) {
        balloonFlying = false;
        burstBalloon();
    }
};

// Initialize the first balloon
startNewBalloon();
