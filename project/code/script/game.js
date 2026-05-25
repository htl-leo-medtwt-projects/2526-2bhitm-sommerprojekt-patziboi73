/***********************************
 * SCRIPT REFERENCES
 ***********************************/
/// <reference path="design.js"/>
/// <reference path="saves.js" />
/// <reference path="player.js" />
/// <reference path="saves.js" />
/// <reference path="keybinds.js" />


/***********************************
 * GAME LOOP
 **********************************/
let banditsAmount = 0;
let radar = [];
let gamestarted = false;
let maxDistance = 10;
let player = document.getElementById("player");
let main = document.getElementById("main");
let ground = document.getElementById("ground");

// Rotation / Movement
let rotation = 0;
let acceleration = 1;
let turning = false;

let x = 0;
let y = 0;

let rotationHistory = [];
let delayTicks = 30;
let x1 = 0;
let y1 = 0;
let turntime = 0;

let erdbeschleunigung = 0.05; 
/***********************************
 * GAME LOOP FUNCTION
 **********************************/
function gameLoop() {
    try {
        player.style.top = `${window.innerHeight/2 - player.clientHeight/2}px`;

    radar = document.getElementsByClassName("radar");

    for (let i = 0; i < radar.length; i++) {
        radar[i].style.transformOrigin = `${(player.clientWidth / 2) * -1}px 50%`;
        radar[i].style.height = `${player.clientHeight}px`;
        radar[i].style.left = `${player.offsetLeft + player.clientWidth}px`;
        radar[i].style.top = `${player.offsetTop}px`;
        radar[i].style.transform = `rotate(${rotation + 16 - 2*i}deg)`;
    }

    }catch (error) {

    }
    turntime = 180 / (saves.turntime * 50);
    maxDistance = saves.speed;
    // INPUT
    if (KEY_EVENTS.upArrow) {
        rotation += turntime;
        turning = true;
    }

    if (KEY_EVENTS.downArrow) {
        rotation -= turntime;
        turning = true;
    }

    // Spieler visuell sofort drehen
    player.style.rotate = `${rotation}deg`;

    // 🔥 Rotation speichern
    rotationHistory.push(rotation);

    // 🔥 Verzögerte Rotation verwenden
    let usedRotation = rotation;

    if (rotationHistory.length > delayTicks) {
        usedRotation = rotationHistory.shift(); // ältester Wert
    }

    // 👉 Grad → Radiant
    let rad = usedRotation * Math.PI / 180;

    // Bewegung berechnen
    x = Math.cos(rad) * maxDistance /2;
    y = Math.sin(rad) * maxDistance /2;

    // Background bewegen
    
        x1 += x * acceleration * -1;
        y1 += y * acceleration * -1;
        if (acceleration < 1) {
            y1 -= erdbeschleunigung;
            erdbeschleunigung += 0.02;
        }else if (acceleration > 1 && erdbeschleunigung > 0.05) {
            erdbeschleunigung -= 0.02;
            y1 -= erdbeschleunigung;
        }
        main.style.backgroundPosition   = `${x1}px ${y1}px`;
        ground.style.backgroundPositionX = `${x1}px`;
        ground.style.top = `${y1 + 3000}px`;
    // Beschleunigung
    if (acceleration < 5 && !turning) {
        acceleration += 0.005;
    }
    if (acceleration < 10 && !turning) {
        acceleration += 0.05;
    } else if (acceleration > 0.01) {
        acceleration /= 1.005;
    }
    

    // Optional clamp (verhindert negatives oder zu große Werte)
    if (acceleration < 0) acceleration = 0;
    if (acceleration > 20) acceleration = 20;

    turning = false;
    if (y1 <= -3000){
    gamestarted = false;
    won()
    }
    // Loop

    if (gamestarted) {
        setTimeout(gameLoop, 20);
    }
}


/***********************************
 * START FUNCTION (z.B. mission)
 **********************************/
function startGame() {
    if (!gamestarted) {
        gamestarted = true;
        gameLoop();
    }
}