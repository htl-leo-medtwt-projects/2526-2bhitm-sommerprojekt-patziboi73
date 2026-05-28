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
    name: "mig29",
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

function america(){

    if(saves.levelus == false){

        y1 = 0
        x1 = 0

        rotation = 0

        erdbeschleunigung = 0

        main.style.backgroundPosition =
            `0px 0px`

        banditJet = jets[0]

        saves.levelus = true

        mission()

    } else {
        map()
    }
}

function germany(){

    if(saves.levelde == false){

        y1 = 0
        x1 = 0

        rotation = 0

        erdbeschleunigung = 0

        main.style.backgroundPosition =
            `0px 0px`

        banditJet = jets[2]

        saves.levelde = true

        mission()

    } else {
        map()
    }
}

function sweden(){

    if(saves.levelsw == false){

        y1 = 0
        x1 = 0

        rotation = 0

        erdbeschleunigung = 0

        main.style.backgroundPosition =
            `0px 0px`

        banditJet = jets[1]

        saves.levelsw = true

        mission()

    } else {
        map()
    }
}

function russia(){

    if(saves.levelru == false){

        y1 = 0
        x1 = 0

        rotation = 0

        erdbeschleunigung = 0

        main.style.backgroundPosition =
            `0px 0px`

        banditJet = jets[3]

        saves.levelru = true

        mission()

    } else {
        map()
    }
}