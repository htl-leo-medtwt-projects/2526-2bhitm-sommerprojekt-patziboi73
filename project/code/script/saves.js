
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
    saves.name = document.getElementById("name").value
    saves.jet = "f16"
    saves.levelus = true
    map()
}
function saveSw(){
    saves.name = document.getElementById("name").value
    saves.jet = "gripen"
    saves.levelsw = true
    map()
}
function saveRu(){
    saves.name = document.getElementById("name").value
    saves.jet = "mig29"
    saves.levelru = true
    map()
}
function saveDe(){
    saves.name = document.getElementById("name").value
    saves.jet = "typhoon"
    saves.levelde = true
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