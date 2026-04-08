/// <reference path="game.js" />
/// <reference path="player.js" />

function startscreen(){
document.getElementById("content").innerHTML = ""
document.getElementById("content").innerHTML = `
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
document.getElementById("content").innerHTML = ""
    
}
function map(){
document.getElementById("content").innerHTML = ""
    
}
function mission(){
document.getElementById("content").innerHTML = ""
    
}
function wonMission(){
document.getElementById("content").innerHTML = ""
    
}
function leaderboard(){
document.getElementById("content").innerHTML = ""
    
}
function settings(){
    
}
