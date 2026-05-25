
/// <reference path="design.js"/>
/// <reference path="player.js" />
/// <reference path="keybinds.js" />
let playerwidth = document.getElementById("player");
let sprite = document.getElementById("sprite");

let jets = [{
    name: "f16",
    turntime: 19.5 / 4,
    speed: 22,
    radarstrenght: 100 - 200,
    missilespeed: 0,
    missileturn: 0,
    missileTime:0,
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
    missileTime:0,
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
    missileTime:0,
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
    missileTime:25,
    missileamount: 0,
    shotsPerSecond: 0,
    overheattime: 0,
    climbrate: 320,
    size: "1.732%",
 }]

let saves = {
    name: "",
    jet: "",
    levelus: false,
    levelde: false,
    levelsw: false, 
    levelru: false,
    speed: 0,
    turntime: 0,
    radarstrenght: 0,
    missilespeed: 0,
    missileturn: 0,
    missileTime:0,
    missileamount: 0,
    shotsPerSecond: 0,
    overheattime: 0,
    climbrate: 0,
}
function saveUs(){
    saves.jet = jets[0].name
    saves.levelus = true
    saves.turntime = jets[0].turntime
    saves.speed = jets[0].speed
    playerwidth.style.width = jets[0].size
    player.style.left = `${50 - jets[0].size.replace("%", "")/2}%`
    player.style.top = `${50}%`
    saves.name = document.getElementById("nameinp").value
    sprite.src = "imgs/jets/f16Profile.png"
    map()

}
function saveSw(){
    saves.jet = jets[1].name
    saves.levelsw = true
    saves.turntime = jets[1].turntime
    saves.speed = jets[1].speed
    playerwidth.style.width = jets[1].size
    player.style.left = `${50 - jets[1].size.replace("%", "")/2}%`
    player.style.top = `${50}%`
    saves.name = document.getElementById("nameinp").value
    sprite.src = "imgs/jets/gripenProfile.png"

    map()
}
function saveDe(){
    saves.jet = jets[2].name
    saves.levelde = true
    saves.turntime = jets[2].turntime
    saves.speed = jets[2].speed
    playerwidth.style.width = jets[2].size
    player.style.left = `${50 - jets[2].size.replace("%", "")/2}%`
    player.style.top = `${50}%`
    saves.name = document.getElementById("nameinp").value
    sprite.src = "imgs/jets/tornadoProfile.png"
    map()
    
}
function saveRu(){
    saves.jet = jets[3].name
    saves.levelru = true
    saves.turntime = jets[3].turntime
    saves.speed = jets[3].speed
    playerwidth.style.width = jets[3].size 
    player.style.left = `${50 - jets[3].size.replace("%", "")/2}%`
    player.style.top = `${50 }%`
    saves.name = document.getElementById("nameinp").value
    sprite.src = "imgs/jets/mig_29Profile.png"
    map()
}

function america(){
    if(saves.levelus == false){
        y1 = 0
        x1 = 0
        rotation = 0
        erdbeschleunigung = 0
        main.style.backgroundPosition   = `${0}px ${0}px`;
    saves.levelus = true
    mission()
    }else{
        map()
    }

}
function germany(){
    if(saves.levelde == false){
        y1 = 0
        x1 = 0
        rotation = 0
        erdbeschleunigung = 0
        main.style.backgroundPosition   = `${0}px ${0}px`;
    saves.levelde = true
    mission()
    }else{
        map()
    }
}
function sweden(){

    if(saves.levelsw == false){
        y1 = 0
        x1 = 0
        rotation = 0
        erdbeschleunigung = 0
        main.style.backgroundPosition   = `${0}px ${0}px`;
    saves.levelsw = true
    mission()
    }else{
        map()
    }
}
function russia(){
    if(saves.levelru == false){
        y1 = 0
        x1 = 0
        rotation = 0
        erdbeschleunigung = 0
        main.style.backgroundPosition   = `${0}px ${0}px`;
    saves.levelru = true
    mission()
    }else{
        map()
    }
}