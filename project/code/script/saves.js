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
    saves.jet = document.getElementById("f16").value
    map()
}
function saveUs(){
    saves.name = document.getElementById("name").value
    saves.jet = document.getElementById("gripen").value
    map()
}
function saveUs(){
    saves.name = document.getElementById("name").value
    saves.jet = document.getElementById("mig29").value
    map()
}
function saveUs(){
    saves.name = document.getElementById("name").value
    saves.jet = document.getElementById("tornado").value
    map()
}

function america(){
    saves.levelus = true
    mission()
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