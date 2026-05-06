
/// <reference path="design.js"/>
/// <reference path="player.js" />
/// <reference path="keybinds.js" />

let sprite = document.getElementById("sprite");

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
    saves.jet = "f16"
    saves.levelus = true
    saves.turntime = 4.5
    saves.name = document.getElementById("nameinp").value
    sprite.src = "imgs/jets/f16Profile.png"
    map()
}
function saveSw(){
    saves.jet = "gripen"   
    saves.levelsw = true
    saves.turntime = 4
    saves.name = document.getElementById("nameinp").value
    sprite.src = "imgs/jets/gripenProfile.png"

    map()
}
function saveDe(){
    saves.jet = "typhoon"
    saves.levelde = true
    saves.turntime = 3.5
    saves.name = document.getElementById("nameinp").value
    sprite.src = "imgs/jets/tornadoProfile.png"
    map()
    
}
function saveRu(){
    saves.jet = "mig29"
    saves.levelru = true
    saves.turntime = 5
    saves.name = document.getElementById("nameinp").value
    sprite.src = "imgs/jets/mig_29Profile.png"
    map()
}


function america(){
    if(saves.levelus == false){
    saves.levelus = true
    mission()
    }else{
        map()
    }

}
function germany(){
    if(saves.levelde == false){
    saves.levelde = true
    mission()
    }else{
        map()
    }
}
function sweden(){
    if(saves.levelsw == false){
    saves.levelsw = true
    mission()
    }else{
        map()
    }
}
function russia(){
    if(saves.levelru == false){
    saves.levelru = true
    mission()
    }else{
        map()
    }
}