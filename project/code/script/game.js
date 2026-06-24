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
let flares = [];
let flareCooldown = 0;
let flarePressed = false;

let missiles = [];
let banditMissiles = [];
let lockedTarget = null;
let kills = 0;
let currentLevel = null;
let missileCooldownTicks = 0;
let changelockPressed = false;

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
function deployFlare() {
    if (flareCooldown > 0) return;
    flareCooldown = 100; // ~2 Sekunden bei 20ms tick

    let playerX = window.innerWidth / 2;
    let playerY = window.innerHeight / 2;

    let flare = document.createElement("div");
    flare.classList.add("flare");
    main.appendChild(flare);

    flares.push({
        el: flare,
        x: playerX,
        y: playerY,
        life: 75 // ~1.5 Sekunden Wirkdauer
    });
}

function updateFlares(playerVelX, playerVelY) {
    for (let i = flares.length - 1; i >= 0; i--) {
        let f = flares[i];

        // Flares treiben relativ zum Spieler weg (wie der Hintergrund)
        f.x -= playerVelX;
        f.y -= playerVelY;
        f.y += 2; // sinken leicht

        f.el.style.left = `${f.x}px`;
        f.el.style.top = `${f.y}px`;

        f.life--;

        if (f.life <= 0) {
            f.el.remove();
            flares.splice(i, 1);
        }
    }
}

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
    usedRotation: 0,
    missileCooldown: Math.random() * 100 + 60   // NEU
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

        if (b.missileCooldown > 0) b.missileCooldown--;

        let distToPlayer = Math.hypot(dx, dy);

        if (distToPlayer < window.innerWidth * 0.35 && Math.abs(diff) < 20) {
            fireBanditMissile(b);
        }
    }
}

/***********************************
 * fire missile
 ***********************************/
    let missileAmount = 0
function fireMissile(target) {
    if (!playerJet || !target || missileCooldownTicks > 0) return;

    missileAmount++;
    missileCooldownTicks = 40;

    let missile = document.createElement("div");
    missile.classList.add("missile");
    missile.id = `missile${missileAmount}`;

    let img = document.createElement("img");
    img.src = "imgs/AIM-9MArrow.webp";
    missile.appendChild(img);
    main.appendChild(missile);

    let playerX = window.innerWidth / 2;
    let playerY = window.innerHeight / 2;

    missiles.push({
        el: missile,
        x: playerX,
        y: playerY,
        rotation: rotation,
        target: target,
        speed: playerJet.missilespeed > 0 ? playerJet.missilespeed : 25,
        turnrate: playerJet.missileturn > 0 ? playerJet.missileturn : 25,
        life: (playerJet.missileTime > 0 ? playerJet.missileTime : 30) * 50
    });
}

function fireBanditMissile(bandit) {
    if (bandit.missileCooldown > 0) return;

    bandit.missileCooldown = 80;

    let missile = document.createElement("div");
    missile.classList.add("missile");

    let img = document.createElement("img");
    img.src = "imgs/AIM-9MArrow.webp";
    missile.appendChild(img);
    main.appendChild(missile);

    banditMissiles.push({
        el: missile,
        x: bandit.x,
        y: bandit.y,
        rotation: bandit.rotation,
        speed: bandit.jet.missilespeed > 0 ? bandit.jet.missilespeed : 22,
        turnrate: bandit.jet.missileturn > 0 ? bandit.jet.missileturn : 20,
        life: (bandit.jet.missileTime > 0 ? bandit.jet.missileTime : 30) * 50
    });
}

// gemeinsame Logik für Spieler- und Gegnerraketen
function steerMissile(m, targetX, targetY) {
    let dx = targetX - m.x;
    let dy = targetY - m.y;

    let targetRotation = Math.atan2(dy, dx) * 180 / Math.PI;

    let diff = targetRotation - m.rotation;
    while (diff > 180) diff -= 360;
    while (diff < -180) diff += 360;

    let maxTurn = m.turnrate / 10;

    if (diff > maxTurn) m.rotation += maxTurn;
    else if (diff < -maxTurn) m.rotation -= maxTurn;
    else m.rotation = targetRotation;

    let rad = m.rotation * Math.PI / 180;

    m.x += Math.cos(rad) * m.speed;
    m.y += Math.sin(rad) * m.speed;

    m.el.style.left = `${m.x}px`;
    m.el.style.top = `${m.y}px`;
    m.el.style.rotate = `${m.rotation}deg`;

    m.life--;
}

function updateMissiles() {
    let playerX = window.innerWidth / 2;
    let playerY = window.innerHeight / 2;

    // Spielerraketen verfolgen Gegner
    for (let i = missiles.length - 1; i >= 0; i--) {
        let m = missiles[i];

        if (!bandits.includes(m.target)) {
            m.el.remove();
            missiles.splice(i, 1);
            continue;
        }

        steerMissile(m, m.target.x, m.target.y);

        let dist = Math.hypot(m.target.x - m.x, m.target.y - m.y);

        if (dist < 40) {
            m.target.el.remove();
            bandits.splice(bandits.indexOf(m.target), 1);
            kills++;
            m.el.remove();
            missiles.splice(i, 1);
            continue;
        }

        if (m.life <= 0) {
            m.el.remove();
            missiles.splice(i, 1);
        }
    }

    // Gegnerraketen verfolgen den Spieler
    // Gegnerraketen verfolgen den Spieler ODER eine Flare
    for (let i = banditMissiles.length - 1; i >= 0; i--) {
        let m = banditMissiles[i];

        let target = { x: playerX, y: playerY };

        if (flares.length > 0) {
            let nearestFlare = flares.reduce((closest, f) => {
                let d = Math.hypot(f.x - m.x, f.y - m.y);
                let dClosest = closest ? Math.hypot(closest.x - m.x, closest.y - m.y) : Infinity;
                return d < dClosest ? f : closest;
            }, null);

            let distToFlare = Math.hypot(nearestFlare.x - m.x, nearestFlare.y - m.y);
            let distToPlayer = Math.hypot(playerX - m.x, playerY - m.y);

            // Flare lenkt ab, wenn sie näher oder ähnlich nah ist
            if (distToFlare < distToPlayer * 1.3) {
                target = nearestFlare;
            }
        }

        steerMissile(m, target.x, target.y);

        let distToTarget = Math.hypot(target.x - m.x, target.y - m.y);

        if (distToTarget < 40) {
            m.el.remove();
            banditMissiles.splice(i, 1);

            if (target === flares.find(f => f === target)) {
                continue; // Flare getroffen, kein Treffer am Spieler
            }

            gamestarted = false;
            lost();
            return;
        }

        if (m.life <= 0) {
            m.el.remove();
            banditMissiles.splice(i, 1);
        }
    }
}

function cycleLock() {
    let playerX = window.innerWidth / 2;
    let playerY = window.innerHeight / 2;
    let maxRange = window.innerWidth * 0.4;

    let inRange = bandits.filter(b =>
        Math.hypot(b.x - playerX, b.y - playerY) < maxRange
    );

    if (inRange.length === 0) {
        lockedTarget = null;
        return;
    }

    let idx = inRange.indexOf(lockedTarget);
    lockedTarget = inRange[(idx + 1) % inRange.length];
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
    if (missileCooldownTicks > 0) missileCooldownTicks--;

    if (KEY_EVENTS.changelock && !changelockPressed) {
        changelockPressed = true;
        cycleLock();
    } else if (!KEY_EVENTS.changelock) {
        changelockPressed = false;
    }

    bandits.forEach(b => b.el.classList.remove("locked"));
    if (lockedTarget) lockedTarget.el.classList.add("locked");

    if (KEY_EVENTS.shootMissile) {
        fireMissile(lockedTarget);
    }

    updateMissiles();
    if (flareCooldown > 0) flareCooldown--;

    if (KEY_EVENTS.flare && !flarePressed) {
        flarePressed = true;
        deployFlare();
    } else if (!KEY_EVENTS.flare) {
        flarePressed = false;
    }

    updateFlares(playerVelX, playerVelY);
    
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
