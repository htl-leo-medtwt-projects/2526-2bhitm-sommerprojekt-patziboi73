
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
    left: document.getElementById("left"), 
    down: document.getElementById("down"), 
    right: document.getElementById("right")
}

let keyup = "w"
let keydown = "s"
let keyleft = "a"
let keyright = "d"

function confirmBinds(){
keyup = up.value
keyright = right.value
keydown = down.value
keyleft = left.value
}


document.onkeydown = keyListenerDown;
document.onkeyup = keyListenerUp;

function keyListenerDown(e) {
    if (e.key === keyleft) { // Left arrow
        KEY_EVENTS.leftArrow = true;
    }
    if (e.key === keyup) { // Up arrow
        KEY_EVENTS.upArrow = true;
    }
    if (e.key === keyright) { // Right arrow
        KEY_EVENTS.rightArrow = true;
    }
    if (e.key === keydown) { // Down arrow
        KEY_EVENTS.downArrow = true;
    }
}
function keyListenerUp(e) {
    if (e.key === keyleft) { // Left arrow
        KEY_EVENTS.leftArrow = false;
    }
    if (e.key === keyup) { // Up arrow
        KEY_EVENTS.upArrow = false;
    }
    if (e.key === keyright) { // Right arrow
        KEY_EVENTS.rightArrow = false;
    }
    if (e.key === keydown) { // Down arrow
        KEY_EVENTS.downArrow = false;
    }
}

