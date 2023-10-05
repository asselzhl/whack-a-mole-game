import '../scss/style.scss';

const holes = document.querySelectorAll('.hole');
const moles = document.querySelectorAll('.mole');
const startButton = document.querySelector('.start');
const stopButton = document.querySelector('.stop');
const scoreInfo = document.querySelector('.score');
const timeInfo = document.querySelector('.timer');

let lastHole;
let timeUp = false;
let isGameOn;
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
    let time = getRandomTime(200, 1000);
    let hole = getRandomHole();
    hole.classList.add('up');
    setTimeout(() => {
        hole.classList.remove('up');
        if(!timeUp) moleUp();
    }, time);
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


let duration = 30;
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
            timer = duration;
        }

        stopButton.addEventListener('click', () => {
            clearInterval(intervalId);
        })
    }, 1000);
}
startButton.addEventListener('click', setTimer)

