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
let radarlock = false;
let banditsAmount = 0;
let radar = [];
let gamestarted = false;
let targetRotation = 0;

let player = document.getElementById("player");
let main = document.getElementById("main");
let ground = document.getElementById("ground");

// PLAYER
let rotation = 0;
let acceleration = 1;
let turning = false;

let mgElement = document.getElementById("mg");
let mgActive = false;

let x = 0;
let y = 0;

let rotationHistory = [];
let delayTicks = 30;

let x1 = 0;
let y1 = 0;

let erdbeschleunigung = 0.05;

// BANDITS
let bandits = [];

let lockedopps = [];

/***********************************
 * BANDIT SPAWN
 ***********************************/
function spawnBandit() {

    if (!banditJet) return;

    banditsAmount++;

    let bandit = document.createElement("div");

    bandit.classList.add("bandit");

    bandit.id = `bandit${banditsAmount}`;

    let img = document.createElement("img");

    img.classList.add("sprite");

    img.src =
        `./imgs/jets/${banditJet.name}Profile.png`;

    bandit.appendChild(img);

    document.getElementById("main")
        .appendChild(bandit);

    bandit.style.width = banditJet.size;

    let spawnX;
    let spawnY;

    if (Math.random() < 0.5) {

        spawnX =
            (Math.random() * window.innerWidth)
            - window.innerWidth;

    } else {

        spawnX =
            (Math.random() * window.innerWidth)
            + window.innerWidth;
    }

    if (Math.random() < 0.5) {

        spawnY =
            (Math.random() * window.innerHeight)
            - window.innerHeight;

    } else {

        spawnY =
            (Math.random() * window.innerHeight)
            + window.innerHeight;
    }

    bandit.style.left = `${spawnX}px`;
    bandit.style.top = `${spawnY}px`;

    bandits.push({

        el: bandit,

        jet: banditJet,

        x: spawnX,
        y: spawnY,

        rotation: 0,

        acceleration: 1,

        turning: false,

        rotationHistory: [],

        usedRotation: 0
    });
}

let iterations = 400;

/***********************************
 * BANDITS UPDATE
 ***********************************/
function updateBandits(playerVelX, playerVelY) {

    for (let i = 0; i < bandits.length; i++) {

        let b = bandits[i];

        let playerX = window.innerWidth / 2;
        let playerY = window.innerHeight / 2;

        let dx = playerX - b.x;
        let dy = playerY - b.y;

        let targetRotation =
            Math.atan2(dy, dx) * 180 / Math.PI;

        let diff = targetRotation - b.rotation;

        while (diff > 180) diff -= 360;
        while (diff < -180) diff += 360;

        let banditTurntime =
            180 / (b.jet.turntime * 50);

        b.turning = false;

        if (diff > 30) {

            b.rotation += banditTurntime;

            b.turning = true;
        }

        if (diff < -2) {

            b.rotation -= banditTurntime;

            b.turning = true;
        }

        // ROTATION TRÄGHEIT
        b.rotationHistory.push(b.rotation);

        let usedRotation = b.rotation;

        if (b.rotationHistory.length > delayTicks) {

            usedRotation =
                b.rotationHistory.shift();
        }

        b.usedRotation = usedRotation;

        let rad =
            usedRotation * Math.PI / 180;

        // GLEICHE PHYSIK WIE SPIELER
        if (b.acceleration < 5 && !b.turning) {

            b.acceleration += 0.005;
        }

        if (b.acceleration < 10 && !b.turning) {

            b.acceleration += 0.05;

        } else if (b.acceleration > 0.01) {

            b.acceleration /= 1.005;
        }

        if (b.acceleration < 0)
            b.acceleration = 0;

        if (b.acceleration > 20)
            b.acceleration = 20;

        let enemyVelX =
            Math.cos(rad) *
            (b.jet.speed / 2) *
            b.acceleration *
            0.2;

        let enemyVelY =
            Math.sin(rad) *
            (b.jet.speed / 2) *
            b.acceleration *
            0.2;

        b.x += enemyVelX - playerVelX;
        b.y += enemyVelY - playerVelY;

        b.el.style.left = `${b.x}px`;
        b.el.style.top = `${b.y}px`;

        b.el.style.rotate =
            `${b.rotation}deg`;
    }
}

/***********************************
 * fire missile
 ***********************************/
    let missileAmount = 0
function fireMissile(lockedopps){
    missileAmount++

    let missile = document.createElement("div");

    missile.classList.add("missile");

    missile.id = `missile${missileAmount}`;

    main.appendChild(missile)





}
function IrLock(bandits){

    let playerX = window.innerWidth / 2;
    let playerY = window.innerHeight / 2;

    let maxRange = window.innerWidth * 0.4;

    // Beam erstellen falls nicht vorhanden
    

    updateBeam(rotation);

    let rad = rotation * Math.PI / 180;

    let dirX = Math.cos(rad);
    let dirY = Math.sin(rad);

    for (let i = bandits.length - 1; i >= 0; i--) {

        let opp = bandits[i];

        let dx = opp.x - playerX;
        let dy = opp.y - playerY;

        let dist = Math.sqrt(dx * dx + dy * dy);

        if (dist > maxRange) continue;

        let dot = dx * dirX + dy * dirY;
        let cross = Math.abs(dx * dirY - dy * dirX);

        if (dot > 0 && cross < 20) {

            opp.el.remove();
            allOpps.splice(i, 1);
        }
    }

}
function spawnTracer(x, y, rotation, length) {

    let tracer = document.createElement("div");
    tracer.classList.add("tracer");

    main.appendChild(tracer);

    return tracer;
}
function updateBeam(rotation) {

    if (!mgBeam) return;

    let playerX = window.innerWidth / 2;
    let playerY = window.innerHeight / 2 + player.clientHeight/2;

    let maxRange = window.innerWidth * 0.1;

    mgBeam.style.left = playerX + "px";
    mgBeam.style.top = playerY + "px";
    mgBeam.style.width = maxRange + "px";
    mgBeam.style.transform = `rotate(${rotation}deg)`;
}
let mgBeam = null;
function shootmg(allOpps, rotation) {

    let playerX = window.innerWidth / 2;
    let playerY = window.innerHeight / 2;

    let maxRange = window.innerWidth * 0.1;

    // Beam erstellen falls nicht vorhanden
    if (!mgBeam) {
        mgBeam = spawnTracer(playerX, playerY, rotation, maxRange);
    }

    updateBeam(rotation);

    let rad = rotation * Math.PI / 180;

    let dirX = Math.cos(rad);
    let dirY = Math.sin(rad);

    for (let i = allOpps.length - 1; i >= 0; i--) {

        let opp = allOpps[i];

        let dx = opp.x - playerX;
        let dy = opp.y - playerY;

        let dist = Math.sqrt(dx * dx + dy * dy);

        if (dist > maxRange) continue;

        let dot = dx * dirX + dy * dirY;
        let cross = Math.abs(dx * dirY - dy * dirX);

        if (dot > 0 && cross < 20) {

            opp.el.remove();
            allOpps.splice(i, 1);
        }
    }
}

let mgcooldown = 0
let mgoverheat = 0
/***********************************
 * GAME LOOP
 ***********************************/

let missilecooldown = false
function gameLoop() {

    iterations++;

    if (iterations >= 500) {

        iterations = 0;

        spawnBandit();
    }

        



    if (!playerJet) return;

    let turntime =
        180 / (playerJet.turntime * 50);

    let maxDistance =
        playerJet.speed;

    // INPUT
    if (KEY_EVENTS.upArrow) {

        rotation += turntime;

        turning = true;
    }

    if (KEY_EVENTS.downArrow) {

        rotation -= turntime;

        turning = true;
    }

    player.style.rotate =
        `${rotation}deg`;

    rotationHistory.push(rotation);

    let usedRotation = rotation;

    if (rotationHistory.length > delayTicks) {

        usedRotation =
            rotationHistory.shift();
    }

    let rad =
        usedRotation * Math.PI / 180;

    x =
        Math.cos(rad) *
        maxDistance / 2;

    y =
        Math.sin(rad) *
        maxDistance / 2;

    x1 += x * acceleration * -0.2;
    y1 += y * acceleration * -0.2;

    // GRAVITY
    if (acceleration < 1) {

        y1 -= erdbeschleunigung;

        erdbeschleunigung += 0.02;

    } else if (
        acceleration > 1 &&
        erdbeschleunigung > 0.05
    ) {

        erdbeschleunigung -= 0.02;

        y1 -= erdbeschleunigung;
    }

    main.style.backgroundPosition =
        `${x1}px ${y1}px`;

    ground.style.backgroundPositionX =
        `${x1}px`;

    ground.style.top =
        `${y1 + 3000}px`;

    // SPEED SYSTEM
    if (acceleration < 5 && !turning) {

        acceleration += 0.005;
    }

    if (acceleration < 10 && !turning) {

        acceleration += 0.05;

    } else if (acceleration > 0.01) {

        acceleration /= 1.005;
    }

    if (acceleration < 0)
        acceleration = 0;

    if (acceleration > 20)
        acceleration = 20;

    turning = false;

    let playerVelX =
        x * acceleration * 0.2;

    let playerVelY =
        y * acceleration * 0.2;

    updateBandits(
        playerVelX,
        playerVelY
    );

    if (y1 <= -3000) {

        gamestarted = false;

        lost();
    }
    for (let i = 0; i < bandits.length; i++) {
        if (isColliding(player, bandits[i].el)) {

            gamestarted = false;

            lost();
        }
    }


    if(KEY_EVENTS.shootmg ==true){
        shootmg(bandits, rotation)
    }
    if (!KEY_EVENTS.shootmg) {

    if (mgBeam) {
        mgBeam.remove();
        mgBeam = null;
    }

    
    }

    IrLock(bandits, rotation)

    
        while (rotation > 180) rotation -= 360;
        while (rotation < -180) rotation += 360;

    if (gamestarted) {

        setTimeout(gameLoop, 20);
    }
    

}
/***********************************
 * START GAME+
 ***********************************/
function startGame() {

    if (!gamestarted) {

        gamestarted = true;

        gameLoop();
    }
}
