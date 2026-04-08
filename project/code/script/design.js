/// <reference path="game.js" />
/// <reference path="player.js" />

function startscreen(){
document.getElementById("main").innerHTML = ""
document.getElementById("main").innerHTML = `
<div id="startseite">
            <div id="startseite">
            <video id="background" autoplay muted loop>
                <source src="videos/titlescreenVideo1_1.mp4" type="video/mp4">
            </video>
            <div id="title">
                <h1>Air</h1>
                <h2>Defenders</h2>
            </div>
            <div id="tobattle">
                <h3 id="contentbox" onclick="createplayer()">Battle</h3>
            </div>
            <div id="content">
                <div id="contentbox">
                    <h4 onclick="settings()">settings</h4>
                </div>
                <div id="contentbox">
                    <h4 onclick="leaderboard()">leaderboard</h4>
                </div>
            </div>
        </div>
        `
}
function createplayer(){

    
}
function map(){
document.getElementById("main").innerHTML = ""
    
}
function mission(){
document.getElementById("main").innerHTML = ""
    
}
function wonMission(){
document.getElementById("main").innerHTML = ""
    
}
function leaderboard(){
document.getElementById("main").innerHTML = ""
    
}
function settings(){
    
}

let currentOffset = 0;
const elements = document.querySelectorAll(".country");

function rightarrow() {
  if(currentOffset != -300){
  currentOffset -= 100;

 
  elements.forEach(el => {
    el.style.transition = "transform 0.5s ease";
    el.style.transform = `translateX(${currentOffset}vw)`;
  });
}else{
    console.log("error")
}
}

function leftarrow() {
    if(currentOffset != 0){
  currentOffset += 100;
  elements.forEach(el => {
    el.style.transition = "transform 0.5s ease";
    el.style.transform = `translateX(${currentOffset}vw)`;
  });
}else{
    console.log("error")
}
}