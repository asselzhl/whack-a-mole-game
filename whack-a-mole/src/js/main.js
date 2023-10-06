import '../scss/style.scss';


const holes = document.querySelectorAll('.hole');
const moles = document.querySelectorAll('.mole');
const startButton = document.querySelector('.start');
const stopButton = document.querySelector('.stop');
const scoreInfo = document.querySelector('.score');
const timeInfo = document.querySelector('.timer');
const settingsButton = document.querySelector('.settings');
const settingsModal = document.querySelector('.settings__modal');
const resultButton = document.querySelector('.result__button');
const resultModal = document.querySelector('.game__result');
const resultScore = document.querySelector('.result__score');
const levels = document.querySelectorAll('.options__input');
const goalInfo = document.querySelector('.goal');
const goalTimeInfo = document.querySelector('.goal-time');
const resultTitle = document.querySelector('.result__title');
const resultLevelInfo = document.querySelector('.result__level');

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
    let time = getRandomTime(200, 1000);
    let hole = getRandomHole();
    hole.classList.add('up');
    setTimeout(() => {
        hole.classList.remove('up');
        if(!timeUp) {
            moleUp();
            
        } 
    }, time);
}

function startGame () {
    scoreInfo.textContent = 0;
    timeUp = false;
    score = 0;
    moleUp();
    startButton.disabled = true;
    settingsButton.disabled = true;
}

function stopGame () {
    holes.forEach(hole => {
        hole.classList.remove('up');
    })
    timeUp = true;
    startButton.disabled = false;
    scoreInfo.textContent = 0;
    settingsButton.disabled = false;
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
            showPopup();
        })
        if (timeInfo.textContent === "00:00") {
            stopGame();
            showPopup();
        }
    }, 1000);
    
}
startButton.addEventListener('click', setTimer)
startButton.addEventListener('click', startGame);
stopButton.addEventListener('click', stopGame)

settingsButton.addEventListener('click', () => {
    if(settingsModal.classList.contains('hide')) {
        settingsModal.classList.remove('hide');
    } else {
        settingsModal.classList.add('hide');
    }
})


resultButton.addEventListener('click', () => {
    resultModal.classList.add('hide');
})

let selectedLevel = 'Easy';

function showPopup () {
    resultModal.classList.remove('hide');
    resultScore.textContent = score;
    if (score >= goal) {
        resultTitle.textContent = 'Winner!';
    } else {
        resultTitle.textContent = 'Loser!';
    }
    resultLevelInfo.textContent = selectedLevel;
}


let goal;
let goalTime;


levels.forEach(level => {
    level.addEventListener('click', function (e) {
        if (e.target == levels[0]) {
            goal = 5;
            goalTime = "00:10";
            duration = 10;
            selectedLevel = 'Easy';
        } else if (e.target == levels[1]) {
            goal = 10;
            goalTime = "00:15";
            duration = 15;
            selectedLevel = 'Medium';
        } else if (e.target == levels[2]) {
            goal = 10;
            goalTime = "00:10";
            duration = 10;
            selectedLevel = 'Expert';
        }

        goalInfo.textContent = goal;
        goalTimeInfo.textContent = goalTime;
    })
})

