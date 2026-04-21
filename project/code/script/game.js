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


let player = document.getElementById("player")
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
function gameLoop(gameStarted) {

        
        const rect = el.getBoundingClientRect();

    if (KEY_EVENTS.leftArrow && !leavesLeft(player, surface)) {
        movePlayer((-1) * GAME_CONFIG.characterSpeed, 0, -1);
        animatePlayer();
        updateHUD();
    }
    if (KEY_EVENTS.rightArrow && !leavesRight(player, surface)) {
        movePlayer(GAME_CONFIG.characterSpeed, 0, 1);
        animatePlayer();
        updateHUD();
    }
    if (KEY_EVENTS.upArrow && (!leavesGround(player, surface) || onPlattform(player, plattform))) {
        jumpsound.currentTime = 0;
        jumpsound.volume = 0.5;
        jumpsound.play();
        let i = 0
        function myLoop() {         //  create a loop function
        setTimeout(function() {   //  call a 3s setTimeout when the loop is called

            KEY_EVENTS.upArrow = false

        movePlayer(0, (-1) * (GAME_CONFIG.characterSpeed ), 0);
        updateHUD();

        
        i++;  
        if(leavesTop(player)){
        i = surface.clientHeight*0.15
        }               
        if (i < (surface.clientHeight * 0.1)) {          
        myLoop();             //  ..  again which will trigger another 
        }                       //  ..  setTimeout()
        }, 12)
}
        myLoop()
    }
    if (KEY_EVENTS.downArrow && (!leavesBottom(player, surface) && !onPlattform(player, plattform))) {
        movePlayer(0, GAME_CONFIG.characterSpeed, 0);
        animatePlayer();
        updateHUD();
    }if(!leavesBottom(player, surface) && !onPlattform(player, plattform)){
    movePlayer(0, GAME_CONFIG.characterSpeed , 0);
        updateHUD();
    }
    if(isColliding(player, collectable)){
        PLAYER.coinCount ++;
        randomizeLoc()
    }
    timeopmovwthpla++
    
    if (timeopmovwthpla < cooldown && timeopmovwthpla > chargeup){
        document.getElementById("oponent").style.top = rect.top + "px"
        document.getElementById("laser").style.top = rect.top + "px"
        document.getElementById("laser").style.backgroundImage = `none`
    }else if(timeopmovwthpla > chargeup){
        timeopmovwthpla = 0
        document.getElementById("laser").style.backgroundImage = `url("./img/laserBefore.png")`


    }
    if(timeopmovwthpla > chargeup-5 && timeopmovwthpla < chargeup){
        document.getElementById("laser").style.backgroundImage = `url("./img/laser.png")`

    }
    if(timeopmovwthpla > chargeup-5 && timeopmovwthpla < chargeup && laser(player, document.getElementById("laser"))){
        gameover()
        console.log("gameover")
        
    cooldown = 400;
    chargeup = 50;
    oldcount = 0;
    burningtime = 5
    PLAYER.coinCount = 0
    gameStarted = false
    }else{
        gameStarted = true
    }
    if(PLAYER.coinCount == oldcount + 1 && cooldown > 10 && chargeup > burningtime && chargeup < cooldown && cooldown > chargeup +11){
        cooldown = cooldown - 10
        chargeup --;
        oldcount = PLAYER.coinCount


        console.log(cooldown)
        console.log(chargeup)
    }else if(PLAYER.coinCount == oldcount + 1 && chargeup > burningtime && cooldown > 6 ){
        chargeup --;    
        cooldown--;
        oldcount = PLAYER.coinCount

        console.log(cooldown)
        console.log(chargeup)
    }
    console.log(gameStarted)
        if(gameStarted){
        setTimeout(() => gameLoop(gameStarted), 1000 / GAME_CONFIG.gameSpeed);
    }
 // async recursion
    
}
