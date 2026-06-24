/// <reference path="design.js"/>
/// <reference path="player.js" />
/// <reference path="keybinds.js" />

let playerwidth = document.getElementById("player");
let sprite = document.getElementById("sprite");

let jets = [
{
    name: "f16",
    turntime: 19.5 / 4,
    speed: 22,
    radarstrenght: -100,
    missilespeed: 0,
    missileturn: 0,
    missileTime: 0,
    missileamount: 0,
    shotsPerSecond: 0,
    overheattime: 0,
    climbrate: 305,
    size: "1.48%",
},
{
    name: "gripen",
    turntime: 24 / 4,
    speed: 20,
    radarstrenght: 120,
    missilespeed: 0,
    missileturn: 0,
    missileTime: 0,
    missileamount: 0,
    shotsPerSecond: 0,
    overheattime: 0,
    climbrate: 245,
    size: "1.410%",
},
{
    name: "tornado",
    turntime: 28 / 4,
    speed: 23.2,
    radarstrenght: 150,
    missilespeed: 0,
    missileturn: 0,
    missileTime: 0,
    missileamount: 0,
    shotsPerSecond: 0,
    overheattime: 0,
    climbrate: 204,
    size: "1.868%",
},
{
    name: "mig_29",
    turntime: 19.8 / 4,
    speed: 23.5,
    missiletype: "IR",
    radarstrenght: 140,
    missilespeed: 25,
    missileturn: 30,
    missileTime: 25,
    missileamount: 0,
    shotsPerSecond: 0,
    overheattime: 0,
    climbrate: 320,
    size: "1.732%",
}
];

let playerJet = null;
let banditJet = null;

let saves = {
    name: "",
    jet: "",
    levelus: false,
    levelde: false,
    levelsw: false,
    levelru: false,
}

function saveUs(){

    playerJet = jets[0]

    saves.jet = playerJet.name
    saves.levelus = true

    playerwidth.style.width = playerJet.size

    player.style.left =
        `${50 - playerJet.size.replace("%", "") / 2}%`

    player.style.top = `${50}%`

    saves.name =
        document.getElementById("nameinp").value

    sprite.src = "imgs/jets/f16Profile.png"

    map()
}

function saveSw(){

    playerJet = jets[1]

    saves.jet = playerJet.name
    saves.levelsw = true

    playerwidth.style.width = playerJet.size

    player.style.left =
        `${50 - playerJet.size.replace("%", "") / 2}%`

    player.style.top = `${50}%`

    saves.name =
        document.getElementById("nameinp").value

    sprite.src = "imgs/jets/gripenProfile.png"

    map()
}

function saveDe(){

    playerJet = jets[2]

    saves.jet = playerJet.name
    saves.levelde = true

    playerwidth.style.width = playerJet.size

    player.style.left =
        `${50 - playerJet.size.replace("%", "") / 2}%`

    player.style.top = `${50}%`

    saves.name =
        document.getElementById("nameinp").value

    sprite.src = "imgs/jets/tornadoProfile.png"

    map()
}

function saveRu(){

    playerJet = jets[3]

    saves.jet = playerJet.name
    saves.levelru = true

    playerwidth.style.width = playerJet.size

    player.style.left =
        `${50 - playerJet.size.replace("%", "") / 2}%`

    player.style.top = `${50}%`

    saves.name =
        document.getElementById("nameinp").value

    sprite.src = "imgs/jets/mig_29Profile.png"

    map()
}
function startMission(level, jet) {
    clearAllProjectiles();   // NEU – räumt alle Raketen/Flares/Gegner vorheriger Mission

    y1 = 0;
    x1 = 0;
    rotation = 0;
    erdbeschleunigung = 0;

    main.style.backgroundPosition = `0px 0px`;

    banditJet = jet;
    currentLevel = level;
    kills = 0;

    mission();
}
function america(){ startMission("us", jets[0]); }
function germany(){ startMission("de", jets[2]); }
function sweden(){ startMission("sw", jets[1]); }
function russia(){ startMission("ru", jets[3]); }

let leaderboardData = JSON.parse(localStorage.getItem("airdefenders_leaderboard")) || {
    us: [], de: [], sw: [], ru: []
};
function clearAllProjectiles() {
    missiles.forEach(m => m.el.remove());
    missiles = [];

    banditMissiles.forEach(m => m.el.remove());
    banditMissiles = [];

    flares.forEach(f => f.el.remove());
    flares = [];

    bandits.forEach(b => b.el.remove());
    bandits = [];

    lockedTarget = null;
    missileCooldownTicks = 0;
    flareCooldown = 0;
    banditsAmount = 0;
    missileAmount = 0;
    iterations = 400;
}
function saveScore(level, name, kills) {
    if (!level) return;
    if (!leaderboardData[level]) leaderboardData[level] = [];

    leaderboardData[level].push({ name: name || "Unbekannt", kills: kills });
    leaderboardData[level].sort((a, b) => b.kills - a.kills);
    leaderboardData[level] = leaderboardData[level].slice(0, 10);

    localStorage.setItem("airdefenders_leaderboard", JSON.stringify(leaderboardData));
}