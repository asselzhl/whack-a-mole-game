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
    showPopup();
    
}

function whackMole (e) {
    if(!e.isTrusted) {
        return;
    }
    score++;
    this.parentNode.classList.remove('up');
    scoreInfo.textContent = score;

    if (score == goal) {
        stopGame();
    }
}

moles.forEach((mole) => {
    mole.addEventListener('click', whackMole)
})


let duration = 10;
function setTimer () {
    let timer = duration;
    let minutes = 0;
    let seconds = 0;

    let intervalId = setInterval(function () {
        seconds++;
        if (seconds < 10) {
            seconds = '0' + seconds;
        } else {
            seconds;
        }

        timeInfo.textContent = "00:" + seconds;

        if (seconds == duration) {
            clearInterval(intervalId);
            seconds = 0;
            stopGame();
        }

        stopButton.addEventListener('click', () => {
            clearInterval(intervalId);
            timeInfo.textContent = "00:00";
            showPopup();
        })
        
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
document.addEventListener('click', (e) => {
    if (!settingsButton.contains(e.target)) {
        settingsModal.classList.add('hide');
    }
})


resultButton.addEventListener('click', () => {
    resultModal.classList.add('hide');
    timeInfo.textContent = '00:00';
})

let selectedLevel = 'Easy';

function showPopup () {
    resultModal.classList.remove('hide');
    resultScore.textContent = score;
    

    if (goal <= score) {
        resultTitle.textContent = 'Winner!';
    } else {
        resultTitle.textContent = 'Loser!';
    }
    resultLevelInfo.textContent = selectedLevel;
}


let goal = 5;
let goalTime = 10;


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






