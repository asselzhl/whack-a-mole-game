import '../scss/style.scss';

const holes = document.querySelectorAll('.hole');
const moles = document.querySelectorAll('.mole');
const startButton = document.querySelector('.start');
const stopButton = document.querySelector('.stop');
const scoreInfo = document.querySelector('.score');
const timeInfo = document.querySelector('.timer');
const settingsButton = document.querySelector('.settings');
const settingsModal = document.querySelector('.settings__modal');


let lastHole;
let timeUp = false;
let score = 0;

function getRandomTime (min, max) {
    return Math.round(Math.random() * (max - min) + min);
}

function getRandomHole () {
    let index = Math.floor(Math.random() * holes.length);
    let hole = holes[index];
    if (hole === lastHole) {
        return getRandomHole();
    } else {
        lastHole = hole;
        return hole;
    }
}

function moleUp () {
    timeUp = false;
    let time = getRandomTime(200, 1000);
    let hole = getRandomHole();
    hole.classList.add('up');
    setTimeout(() => {
        hole.classList.remove('up');
        if(!timeUp) {
            moleUp();
            startButton.disabled = true;
        } 
    }, time);
}

function stopGame () {
    holes.forEach(hole => {
        hole.classList.remove('up');
    })
    timeUp = true;
    startButton.disabled = false;
    scoreInfo.textContent = 0;
}

function whackMole (e) {
    if(!e.isTrusted) {
        return;
    }
    score++;
    this.parentNode.classList.remove('up');
    scoreInfo.textContent = score;
}

moles.forEach((mole) => {
    mole.addEventListener('click', whackMole)
})


let duration = 10;
function setTimer () {
    let timer = duration;
    let minutes;
    let seconds;

    let intervalId = setInterval(function () {
        minutes = parseInt(timer / 60, 10);
        seconds = parseInt(timer % 60, 10);

        if (minutes < 10) {
            minutes = '0' + minutes;
        } else {
            minutes;
        }
        if (seconds < 10) {
            seconds = '0' + seconds;
        } else {
            seconds;
        }

        timeInfo.textContent = minutes + ":" + seconds;

        if (--timer < 0) {
            clearInterval(intervalId);
        }

        stopButton.addEventListener('click', () => {
            clearInterval(intervalId);
            timeInfo.textContent = "00:00";
        })
        if (timeInfo.textContent === "00:00") {
            stopGame();
        }
    }, 1000);
    
}
startButton.addEventListener('click', setTimer)
startButton.addEventListener('click', moleUp);
stopButton.addEventListener('click', stopGame)

settingsButton.addEventListener('click', () => {
    if(settingsModal.classList.contains('hide')) {
        settingsModal.classList.remove('hide');
    } else {
        settingsModal.classList.add('hide');
    }

})