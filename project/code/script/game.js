/***********************************
 * SCRIPT REFERENCES
 ***********************************/
/// <reference path="design.js"/>
/// <reference path="saves.js" />
/// <reference path="player.js" />
/// <reference path="saves.js" />
/// <reference path="keybinds.js" />


/***********************************
 * GAME LOOP
 * **********************************/
let gamestarted = false

let player = document.getElementById("background")
let surface = document.getElementById("surface")
let collectable = document.getElementById("redBox")
let plattform = document.querySelectorAll(".plattform")

let timeopmovwthpla = 50
let jumpsound = document.getElementById("jump")

        const el = document.querySelector("#player");

let cooldown = 400;
let chargeup = 50;
let oldcount = 0;
let burningtime = 5
function gameLoop() {
    if (KEY_EVENTS.upArrow) {
        player.style.rotate += "10deg"
    }
    if (KEY_EVENTS.downArrow) {
        player.style.rotate += "10deg"
    }
    if(gamestarted){
        setTimeout(() => gameLoop(gameStarted), 1000 / GAME_CONFIG.gameSpeed);
    }
 // async recursion
    
}
