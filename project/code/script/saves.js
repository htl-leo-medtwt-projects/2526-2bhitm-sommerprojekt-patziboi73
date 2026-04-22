
/// <reference path="design.js"/>
/// <reference path="player.js" />
/// <reference path="keybinds.js" />



let saves = {
    name: "",
    jet: "",
    levelus: false,
    levelde: false,
    levelsw: false,
    levelru: false,
}
function saveUs(){
    saves.jet = "f16"
    saves.levelus = true
    saves.name = document.getElementById("nameinp").value
    map()
}
function saveSw(){
    saves.jet = "gripen"
    saves.levelsw = true
    saves.name = document.getElementById("nameinp").value
    map()
}
function saveRu(){
    saves.jet = "mig29"
    saves.levelru = true
    saves.name = document.getElementById("nameinp").value
    map()
}
function saveDe(){
    saves.jet = "typhoon"
    saves.levelde = true
    saves.name = document.getElementById("nameinp").value
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
    saves.levelde = true
    mission()
}
function sweden(){
    saves.levelsw = true
    mission()
}
function russia(){
    saves.levelru = true
    mission()
}