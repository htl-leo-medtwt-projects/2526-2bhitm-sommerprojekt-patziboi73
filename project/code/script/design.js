/// <reference path="game.js" />
/// <reference path="player.js" />
/// <reference path="saves.js" />

function startscreen() {
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
                <h3 id="contentbox" onclick="createplayer()" style="cursor: pointer;">Battle</h3>
            </div>
            <div id="content">
                <div id="contentbox">
                    <h4 onclick="settings()" style="cursor: pointer;">settings</h4>
                </div>
                <div id="contentbox">
                    <h4 onclick="leaderboard()" style="cursor: pointer;">leaderboard</h4>
                </div>
            </div>
        </div>
        `
        document.getElementById("ground").style.opacity = "0"
        document.getElementById("player").style.opacity = "0"
}
function createplayer() {
    document.getElementById("main").innerHTML = ""
    document.getElementById("main").innerHTML = `
<div id="germany" class="country">
            <div id="flag"><img src="imgs/germany.webp" alt=""></div>
            <div id="jetpreview">
                <p>Tornado</p>
                <img src="imgs/jets/tornado.png" alt="">
            </div>
            <div id="play" onclick="saveDe()" style="cursor: pointer;"><h4 style="font-family: wt;">to map</h4></div>
            <div id="stats"></div>
        </div>
        <div id="russia" class="country">
            <div id="flag"><img src="imgs/Flag_of_Russia.svg.webp" alt=""></div>
            <div id="jetpreview">
                <p>MiG-29</p>
                <img src="imgs/jets/mig_29.png" alt="">
            </div>
            <div id="play" onclick="saveRu()" style="cursor: pointer;"><h4 style="font-family: wt;">to map</h4></div>
        </div>
        <div id="amerika" class="country">
            <div id="flag"><img src="imgs/amerika.png" alt=""></div>
            <div id="jetpreview">
                <p>F-16</p>
                <img src="imgs/jets/f_16.png" alt="">
            </div>
            <div id="play" onclick="saveUs()" style="cursor: pointer;"><h4 style="font-family: wt;">to map</h4></div>
            

        </div>
        <div id="sweden" class="country">
            <div id="flag"><img src="imgs/schweden.png" alt=""></div>
            <div id="jetpreview">
                <p>Gripen</p>
                <img src="imgs/jets/gripen.png" alt="">
            </div>
            <div id="play" onclick="saveSw()" style="cursor: pointer;"><h4 style="font-family: wt;">to map</h4></div>

        </div>
            <div id="name">
                <p>pilot: </p>
                <input type="text" name="" id="nameinp"></div>
            
        <div id="arrowright" onclick="rightarrow()" style="cursor: pointer;"></div>
        <div id="arrowleft" onclick="leftarrow()" style="cursor: pointer;"></div>
    `
}
function map() {
        
    document.getElementById("main").innerHTML = ""

    document.getElementById("main").innerHTML = `<div onclick="map()" id="worldheader"><h1>choose mission</h1></div>
        <div id="worldmap">
            <img src="imgs/marker.png" alt="" id="markerus" onclick="america()" class="marker" style="cursor: pointer;">
            <img src="imgs/marker.png" alt="" id="markerde" onclick="germany()" class="marker" style="cursor: pointer;">
            <img src="imgs/marker.png" alt="" id="markerru" onclick="russia()" class="marker" style="cursor: pointer;">
            <img src="imgs/marker.png" alt="" id="markersw" onclick="sweden()" class="marker" style="cursor: pointer;">
            <img src="imgs/world.svg" alt="" id="worldmapimg">
        </div>
        `

        document.getElementById("ground").style.opacity = "0"
        document.getElementById("player").style.opacity = "0"

    markerus()
    markerde()
    markerru()
    markersw()
    
}
function mission() {
    document.getElementById("main").innerHTML = ""

    document.getElementById("main").innerHTML = `
        
        <div class="radar"></div>
        <div class="radar"></div>
        <div class="radar"></div>
        <div class="radar"></div>
        <div class="radar"></div>
        <div class="radar"></div>
        <div class="radar"></div>
        <div class="radar"></div>
        <div class="radar"></div>
        <div class="radar"></div>
        <div class="radar"></div>
        <div class="radar"></div>
        <div class="radar"></div>
        <div class="radar"></div>
        <div class="radar"></div>
        <div class="radar"></div>
        <div class="radar"></div>
        <div class="radar"></div>

        
`
document.getElementById("player").style.opacity = "1"
document.getElementById("main").style.backgroundImage = "url('imgs/backgroundsky.png')"
document.getElementById("main").style.backgroundPositionX = "0px"
document.getElementById("main").style.backgroundPositionY = "0px"
document.getElementById("ground").style.opacity = "1"
missionstarted = true
gamestarted = true
gameLoop()

}

function leaderboard() {
    document.getElementById("main").innerHTML = ""
    document.getElementById("main").innerHTML = `
<div id="leaderboard">
            <h1>Leaderboard</h1>
            <p>1. Player1</p>
            <p>2. Player2</p>
            <p>3. Player3</p>

            <button onclick="startscreen()" id="button"><h4>back</h4 style="cursor: pointer;"></button>
        </div>

`

        document.getElementById("ground").style.opacity = "0"
        document.getElementById("player").style.opacity = "0"

}
function settings() {
    document.getElementById("main").innerHTML = ""
    document.getElementById("main").innerHTML = `
<div id="leaderboard">
            <h1>settings</h1>

            <button onclick="startscreen()" id="button"><h4>back</h4 style="cursor: pointer;"></button>
        </div>
        `
}

let currentOffset = 0;

function rightarrow() {
    const elements = document.querySelectorAll(".country");
    if (currentOffset != -300) {
        currentOffset -= 100;


        elements.forEach(el => {
            el.style.transition = "transform 0.5s ease";
            el.style.transform = `translateX(${currentOffset}vw)`;
        });
    }
}

function leftarrow() {
    const elements = document.querySelectorAll(".country");
    if (currentOffset != 0) {
        currentOffset += 100;
        elements.forEach(el => {
            el.style.transition = "transform 0.5s ease";
            el.style.transform = `translateX(${currentOffset}vw)`;
        });
    }
}
let w = false;
function lost() {
    document.getElementById("main").innerHTML = ""

    document.getElementById("main").innerHTML = `
        
        

        <div id="loosingscreen">
            <div>
                <h1>you got shoot down</h1>
            </div>
            <div>
                <img src="imgs/jets/tornado.png" alt="">
            </div>
            <div>
                <p>you shot down ... enemies</p>
            </div>
            <div>
                <button id="button" onclick="startscreen()" style="cursor: pointer;">
                    <h4>startscreen</h4>
                </button>
                <button id="button" onclick="map()" style="cursor: pointer;">
                    <h4>next level</h4>
                </button>
            </div>
        </div>
`
    gamestarted = false
}

startscreen()


function markerus() {
    let imgwidth = document.getElementById("worldmapimg").clientWidth
    let imgheight = document.getElementById("worldmapimg").clientHeight
    let imgoffsetTop = document.getElementById("worldmapimg").offsetTop
    let imgoffsetLeft = document.getElementById("worldmapimg").offsetLeft
    let marker = document.getElementById("markerus")
    marker.style.top = (imgheight / 4 + imgoffsetTop) + "px"
    marker.style.left = (imgwidth / 5 + imgoffsetLeft) + "px"

    if (saves.levelus == true) {
        marker.src = "imgs/marker_gray.png"
    }
}
function markerde() {
    let imgwidth = document.getElementById("worldmapimg").clientWidth
    let imgheight = document.getElementById("worldmapimg").clientHeight
    let imgoffsetTop = document.getElementById("worldmapimg").offsetTop
    let imgoffsetLeft = document.getElementById("worldmapimg").offsetLeft
    let marker = document.getElementById("markerde")
    marker.style.top = (imgheight / 6.9 + imgoffsetTop) + "px"
    marker.style.left = (imgwidth / 2.02 + imgoffsetLeft) + "px"

    if (saves.levelde == true) {
        marker.src = "imgs/marker_gray.png"
    }
}
function markersw() {
    let imgwidth = document.getElementById("worldmapimg").clientWidth
    let imgheight = document.getElementById("worldmapimg").clientHeight
    let imgoffsetTop = document.getElementById("worldmapimg").offsetTop
    let imgoffsetLeft = document.getElementById("worldmapimg").offsetLeft
    let marker = document.getElementById("markersw")
    marker.style.top = (imgheight / 11 + imgoffsetTop) + "px"
    marker.style.left = (imgwidth / 2 + imgoffsetLeft) + "px"

    if (saves.levelsw == true) {
        marker.src = "imgs/marker_gray.png"
    }
}
function markerru() {
    let imgwidth = document.getElementById("worldmapimg").clientWidth
    let imgheight = document.getElementById("worldmapimg").clientHeight
    let imgoffsetTop = document.getElementById("worldmapimg").offsetTop
    let imgoffsetLeft = document.getElementById("worldmapimg").offsetLeft
    let marker = document.getElementById("markerru")
    marker.style.top = (imgheight / 10 + imgoffsetTop) + "px"
    marker.style.left = (imgwidth / 1.5 + imgoffsetLeft) + "px"

    if (saves.levelru == true) {
        marker.src = "imgs/marker_gray.png"
    }
}