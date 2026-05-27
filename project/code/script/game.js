/***********************************
 * SCRIPT REFERENCES
 ***********************************/
/// <reference path="design.js"/>
/// <reference path="saves.js" />
/// <reference path="player.js" />
/// <reference path="keybinds.js" />


/***********************************
 * GAME VARIABLES
 ***********************************/
let banditsAmount = 0;
let radar = [];
let gamestarted = false;

let maxDistance = 10;

let player = document.getElementById("player");
let main = document.getElementById("main");
let ground = document.getElementById("ground");

let banditjets = "";
let banditsspeed;
let banditjetsname = "";

// PLAYER
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

// BANDITS
let bandits = [];
let banditSize = ""

/***********************************
 * BANDIT SPAWN
 ***********************************/
function spawnBandit() {

    banditsAmount++;

    // Neues Element erstellen
    let bandit = document.createElement("div");
    bandit.classList.add("bandit");
    bandit.id = `bandit${banditsAmount}`;

    // Bild erstellen
    let img = document.createElement("img");
    img.classList.add("sprite");
    img.src = `./imgs/jets/${banditjetsname}`;

    bandit.appendChild(img);

    // Zum main hinzufügen
    document.getElementById("main").appendChild(bandit);

    // Größe setzen
    bandit.style.width = banditSize;

    // RANDOM SPAWN POSITION
    let spawnX;
    let spawnY;

    if (Math.random() < 0.5) {
        spawnX = (Math.random() * window.innerWidth) - window.innerWidth;
    } else {
        spawnX = (Math.random() * window.innerWidth) + window.innerWidth;
    }

    if (Math.random() < 0.5) {
        spawnY = (Math.random() * window.innerHeight) - window.innerHeight;
    } else {
        spawnY = (Math.random() * window.innerHeight) + window.innerHeight;
    }

    bandit.style.left = `${spawnX}px`;
    bandit.style.top = `${spawnY}px`;

    let speed = 5;

    bandits.push({
        el: bandit,

        x: spawnX,
        y: spawnY,

        rotation: 0,

        acceleration: 1,

        speed: speed,

        velX: 0,
        velY: 0,

        gravity: 0.05
    });
}


let iterations = 400
/***********************************
 * BANDITS UPDATE
 ***********************************/
function updateBandits(relx, rely) {

    for (let i = 0; i < bandits.length; i++) {

        let b = bandits[i];

        // PLAYER CENTER (WICHTIG: relativ stabil)
        let playerX = window.innerWidth / 2;
        let playerY = window.innerHeight / 2;

        let dx = playerX - b.x;
        let dy = playerY - b.y;

        let targetRotation = Math.atan2(dy, dx) * 180 / Math.PI;

        // smooth turning
        let diff = targetRotation - b.rotation;

        while (diff > 180) diff -= 360;
        while (diff < -180) diff += 360;

        b.rotation += diff * 0.01;

        let rad = b.rotation * Math.PI / 180;

        // gleiche Fluglogik wie Player
        let moveX = Math.cos(rad) * b.speed / 2;
        let moveY = Math.sin(rad) * b.speed / 2;

        b.velX += moveX * b.acceleration;
        b.velY += moveY * b.acceleration;

        // gravity like player
        if (b.acceleration < 1) {
            b.velY -= b.gravity;
            b.gravity += 0.02;
        } else if (b.acceleration > 1 && b.gravity > 0.05) {
            b.gravity -= 0.02;
            b.velY -= b.gravity;
        }

        // damping
        b.velX *= 0.98;
        b.velY *= 0.98;

        // position update
        b.x += b.velX * 0.02;
        b.y += b.velY * 0.02;
        b.x += relx * 0.02;
        b.y += rely * 0.02;

        b.el.style.left = `${b.x}px`;
        b.el.style.top = `${b.y}px`;
        b.el.style.rotate = `${b.rotation}deg`;
    }
}


/***********************************
 * GAME LOOP
 ***********************************/
function gameLoop() {

    // FIX: KEIN querySelectorAll innerHTML mehr (war BUG)
    // optional sprite update falls nötig:
    /*
    let sprites = document.querySelectorAll(".bandit .sprite");
    for (let i = 0; i < sprites.length; i++) {
        sprites[i].src = `./imgs/jets/${banditjetsname}`;
    }
    */
    iterations++;
    if(iterations == 500){
        iterations = 0
        spawnBandit();
    }
    // RANDOM SPAWN
    

    try {

        player.style.top =
            `${window.innerHeight / 2 - player.clientHeight / 2}px`;

        radar = document.getElementsByClassName("radar");

        for (let i = 0; i < radar.length; i++) {

            radar[i].style.transformOrigin =
                `${(player.clientWidth / 2) * -1}px 50%`;

            radar[i].style.height =
                `${player.clientHeight}px`;

            radar[i].style.left =
                `${player.offsetLeft + player.clientWidth}px`;

            radar[i].style.top =
                `${player.offsetTop}px`;

            radar[i].style.transform =
                `rotate(${rotation + 16 - 2 * i}deg)`;
        }

    } catch (e) {}

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

    player.style.rotate = `${rotation}deg`;

    rotationHistory.push(rotation);

    let usedRotation = rotation;

    if (rotationHistory.length > delayTicks) {
        usedRotation = rotationHistory.shift();
    }

    let rad = usedRotation * Math.PI / 180;

    x = Math.cos(rad) * maxDistance / 2;
    y = Math.sin(rad) * maxDistance / 2;

    x1 += x * acceleration * -1;
    y1 += y * acceleration * -1;

    if (acceleration < 1) {
        y1 -= erdbeschleunigung;
        erdbeschleunigung += 0.02;
    } else if (acceleration > 1 && erdbeschleunigung > 0.05) {
        erdbeschleunigung -= 0.02;
        y1 -= erdbeschleunigung;
    }

    main.style.backgroundPosition = `${x1}px ${y1}px`;
    ground.style.backgroundPositionX = `${x1}px`;
    ground.style.top = `${y1 + 3000}px`;

    if (acceleration < 5 && !turning) {
        acceleration += 0.005;
    }

    if (acceleration < 10 && !turning) {
        acceleration += 0.05;
    } else if (acceleration > 0.01) {
        acceleration /= 1.005;
    }

    if (acceleration < 0) acceleration = 0;
    if (acceleration > 20) acceleration = 20;

    turning = false;
    updateBandits(x * acceleration * -1, y * acceleration * -1);

    if (y1 <= -3000) {
        gamestarted = false;
        won();
    }

    if (gamestarted) {
        setTimeout(gameLoop, 20);
    }
}


/***********************************
 * START GAME
 ***********************************/
function startGame() {
    if (!gamestarted) {
        gamestarted = true;
        gameLoop();
    }
}