
/***********************************
 * EVENT EVENTS
 ***********************************/
let KEY_EVENTS = {
    leftArrow: false,
    rightArrow: false,
    upArrow: false,
    downArrow: false
}
let keybinds = {
    up: document.getElementById("up"),
    down: document.getElementById("down")
}

let keyup = "w"
let keydown = "s"




document.onkeydown = keyListenerDown;
document.onkeyup = keyListenerUp;

function keyListenerDown(e) {
    
    if (e.key === keyup) { // Up arrow
        KEY_EVENTS.upArrow = true;
    }
    
    if (e.key === keydown) { // Down arrow
        KEY_EVENTS.downArrow = true;
    }
}
function keyListenerUp(e) {
    
    if (e.key === keyup) { // Up arrow
        KEY_EVENTS.upArrow = false;
    }
    
    if (e.key === keydown) { // Down arrow
        KEY_EVENTS.downArrow = false;
    }
}

