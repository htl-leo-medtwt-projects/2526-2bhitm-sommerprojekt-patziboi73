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

let rotation = 0;

function gameLoop() {
    if (KEY_EVENTS.upArrow) {
        rotation += 0.6
        player.style.rotate = `${rotation}deg`;
    }
    if (KEY_EVENTS.downArrow) {
        rotation -= 1;
        player.style.rotate = `${rotation}deg`;
    }
    if(gamestarted){
        setTimeout(gameLoop, 24);
    }
 // async recursion
    
}
