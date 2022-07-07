// by 71460-4-F
let order = [];
let clickedOrder = [];
let score = 0;

var sbt_start = new Audio();
var sbt_sucess = new Audio();
var sbt_error = new Audio();
var sbt_green = new Audio();
var sbt_red = new Audio();
var sbt_yellow = new Audio();
var sbt_blue = new Audio();
var wins_finale = new Audio();

sbt_start.src = 'sons/time-count.wav';
sbt_sucess.src = 'sons/sucess.mp3';
sbt_error.src = 'sons/error.wav';
sbt_green.src = 'sons/dtmf-1.mp3';
sbt_red.src = 'sons/dtmf-2.mp3';
sbt_yellow.src = 'sons/dtmf-3.mp3';
sbt_blue.src = 'sons/dtmf-4.mp3';
wins_finale.src = 'sons/wins-finale.wav';

const blue = document.querySelector('.blue');
const red = document.querySelector('.red');
const green = document.querySelector('.green');
const yellow = document.querySelector('.yellow');
const botao = document.querySelector('.start-buttom');

async function shuffleOrder() {
    let colorOrder = Math.floor(Math.random() * 4);
    order[order.length] = colorOrder;
    clickedOrder = [];
    for (let i in order) {
        let elementColor = createColorElement(order[i]);
        lightColor(elementColor, Number(i) + 1, i);
    }
}

let lightColor = (element, number, i) => {
    number = number * 500;
    setTimeout(() => {
        element.classList.add('selected');
        if (order[i] == 0) {
            sbt_green.play();
        }
        else if (order[i] == 1) {
            sbt_red.play();
        }
        else if (order[i] == 2) {
            sbt_yellow.play();
        }
        else if (order[i] == 3) {
            sbt_blue.play();
        }
    }, number - 250);
    setTimeout(() => {
        element.classList.remove('selected');
    }, number - 50);
}

async function checkOrder() {
    for (let i in clickedOrder) {
        if (clickedOrder[i] != order[i]) {
            score = 0;
            order = [];
            clickedOrder = [];
            botao.textContent = score;
            await gameOver();
            break;
        }
        blue.disabled = false;
        red.disabled = false;
        green.disabled = false;
        yellow.disabled = false;
    }
    if (clickedOrder.length == order.length) {
        blue.disabled = true;
        red.disabled = true;
        green.disabled = true;
        yellow.disabled = true;
        await sleep(500);
        botao.style.color = 'black';
        sbt_sucess.currentTime = 0;
        sbt_sucess.play();
        botao.style.backgroundColor = 'rgb(106, 255, 106)';
        botao.textContent = score;
        await sleep(500);
        botao.style.backgroundColor = 'white';
        botao.textContent = score;
        await sleep(500);
        botao.style.backgroundColor = 'rgb(106, 255, 106)';
        botao.textContent = score;
        await sleep(1000);
        botao.style.backgroundColor = 'white';
        if (score == 99) {
            wins_finale.play();
            score = 0;
            order = [];
            clickedOrder = [];
            wins();
            await sleep(3000);
            demo();
        } else
            demo2();
    }
}

let click = (color) => {
    blue.disabled = true;
    red.disabled = true;
    green.disabled = true;
    yellow.disabled = true;
    clickedOrder[clickedOrder.length] = color;
    createColorElement(color).classList.add('selected');
    if (color == 0) {
        sbt_green.play();
    }
    else if (color == 1) {
        sbt_red.play();
    }
    else if (color == 2) {
        sbt_yellow.play();
    }
    else if (color == 3) {
        sbt_blue.play();
    }
    setTimeout(() => {
        createColorElement(color).classList.remove('selected');
        checkOrder();
    }, 250);
}

let createColorElement = (color) => {
    if (color == 0) {
        return green;
    } else if (color == 1) {
        return red;
    } else if (color == 2) {
        return yellow;
    } else if (color == 3) {
        return blue;
    }
}

function nextLevel() {
    score++;
    shuffleOrder();
}

async function gameOver() {
    blue.disabled = true;
    red.disabled = true;
    green.disabled = true;
    yellow.disabled = true;
    botao.disabled = true;
    sbt_error.currentTime = 0;
    sbt_error.play();
    botao.style.backgroundColor = 'rgb(255, 106, 106)';
    score = 0;
    order = [];
    clickedOrder = [];
    botao.style.color = 'black';
    botao.textContent = score;
    await sleep(500);
    botao.style.backgroundColor = 'white';
    botao.textContent = score;
    await sleep(500);
    botao.style.backgroundColor = 'rgb(255, 106, 106)';
    botao.textContent = score;
    await sleep(1000);
    botao.style.backgroundColor = 'white';
    await demo();
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

async function demo() {
    blue.disabled = true;
    red.disabled = true;
    green.disabled = true;
    yellow.disabled = true;
    botao.disabled = true;
    botao.style.backgroundColor = 'white';
    botao.textContent = '';
    botao.style.color = 'black';
    botao.style.fontSize = '80px';
    await sleep(1);
    for (let i = 3; i > 0; i--) {
        sbt_start.currentTime = 0;
        sbt_start.play();
        botao.textContent = i;
        await sleep(1000);
    }
    blue.disabled = false;
    red.disabled = false;
    green.disabled = false;
    yellow.disabled = false;
    botao.textContent = '?';
    playGame();
}

async function demo2() {
    botao.style.backgroundColor = 'white';
    botao.textContent = '';
    botao.style.color = 'black';
    botao.style.fontSize = '80px';
    await sleep(1);
    for (let i = 3; i > 0; i--) {
        botao.textContent = i;
        sbt_start.currentTime = 0;
        sbt_start.play();
        botao.textContent = i;
        await sleep(1000);
    }
    blue.disabled = false;
    red.disabled = false;
    green.disabled = false;
    yellow.disabled = false;
    botao.textContent = '?';
    nextLevel();
}

let playGame = () => {
    score = 0;
    nextLevel();
}

let playGame2 = () => {
    score = 0;
    nextLevel();
}

botao.onclick = () => {
    sbt_start.play();
    green.onclick = () => click(0);
    red.onclick = () => click(1);
    yellow.onclick = () => click(2);
    blue.onclick = () => click(3);
    demo();
}

async function restart(){
    botao.textContent = '';
    for(i = 10; i < 300; i +=50){
        green.style.backgroundColor = 'yellow';
        red.style.backgroundColor = 'green';
        blue.style.backgroundColor = 'red';
        yellow.style.backgroundColor = 'blue';
        await sleep(i);
        green.style.backgroundColor = 'blue';
        red.style.backgroundColor = 'yellow';
        blue.style.backgroundColor = 'green';
        yellow.style.backgroundColor = 'red';
        await sleep(i);
        green.style.backgroundColor = 'red';
        red.style.backgroundColor = 'blue';
        blue.style.backgroundColor = 'yellow';
        yellow.style.backgroundColor = 'green';
        await sleep(i);
        green.style.backgroundColor = 'green';
        red.style.backgroundColor = 'red';
        blue.style.backgroundColor = 'blue';
        yellow.style.backgroundColor = 'yellow';
        await sleep(i);
    }
    botao.style.backgroundColor = 'white';
    botao.textContent = 'START';
    botao.style.color = 'black';
    botao.style.fontSize = '25px';
}

async function wins() {
    botao.textContent = '';
    for(i = 10; i < 500; i +=50){
        green.style.backgroundColor = 'yellow';
        red.style.backgroundColor = 'green';
        blue.style.backgroundColor = 'red';
        yellow.style.backgroundColor = 'blue';
        await sleep(i);
        green.style.backgroundColor = 'blue';
        red.style.backgroundColor = 'yellow';
        blue.style.backgroundColor = 'green';
        yellow.style.backgroundColor = 'red';
        await sleep(i);
        green.style.backgroundColor = 'red';
        red.style.backgroundColor = 'blue';
        blue.style.backgroundColor = 'yellow';
        yellow.style.backgroundColor = 'green';
        await sleep(i);
        green.style.backgroundColor = 'green';
        red.style.backgroundColor = 'red';
        blue.style.backgroundColor = 'blue';
        yellow.style.backgroundColor = 'yellow';
        await sleep(i);
    }
}
restart();
 