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

let player = document.getElementById("player")


function gameLoop() {
    if (KEY_EVENTS.upArrow) {
        player.style.rotate += "10deg"
    }
    if (KEY_EVENTS.downArrow) {
        player.style.rotate += "-10deg"
    }
    if(gamestarted){
        setTimeout(() => gameLoop(), 24);
    }
 // async recursion
    
}
