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
let gamestarted = false;
let maxDistance = 10;
let player = document.getElementById("player");
let main = document.getElementById("main");

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
let turntime = 3.5;
let turntimeintiks = 180 / (turntime * 50);

let erdbeschleunigung = 0.05; 
/***********************************
 * GAME LOOP FUNCTION
 **********************************/
function gameLoop() {

    // INPUT
    if (KEY_EVENTS.upArrow) {
        rotation += turntimeintiks;
        turning = true;
    }

    if (KEY_EVENTS.downArrow) {
        rotation -= turntimeintiks;
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
    x = Math.cos(rad) * maxDistance;
    y = Math.sin(rad) * maxDistance;

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
    
    // Beschleunigung
    if (acceleration < 5 && !turning) {
        acceleration += 0.0005;
    }
    if (acceleration < 10 && !turning) {
        acceleration += 0.05;
    } else if (acceleration > 0.01) {
        acceleration /= 1.01;
    }
    

    // Optional clamp (verhindert negatives oder zu große Werte)
    if (acceleration < 0) acceleration = 0;
    if (acceleration > 20) acceleration = 20;

    turning = false;

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