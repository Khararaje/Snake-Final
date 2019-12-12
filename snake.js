"use strict";
//Variables
var canvas, ctx;


var foodAte = 0;
var LvUp = 1;
var points = 105;
var myScore = 0;

var turns = 4;

//states/modes
var isPaused = false;
var isArcade = true;
var isSurvival = false;
var isAdvanced = false;
var isMaster = false;
var isGameOver = false;

var arcbtn = document.getElementById('arc');
var surbtn = document.getElementById("survival");
var advbtn = document.getElementById("adv");
var masbtn = document.getElementById("master");



window.onload = function () {
    canvas = document.getElementById("myCanvas");
    ctx = canvas.getContext("2d");
    var myScore = 0;
    myScore = document.getElementById("score").innerHTML = myScore;
    turns = 4;
    this.document.addEventListener("keydown", keyDownEvent);
    var r = 10;
    this.setInterval(refresh, 1000 / r);
    ts = dts;

    this.isGameOver = false;
}

//pause
function togglePause(){
    isPaused = !isPaused;
    if (isPaused == false){
        loop();
    }
}


//snizzle the snake
var snizzleY;
var dts = 5; //parts
var ts = dts; //tail size
var trail = []; //trail array
var snizzleX = snizzleY = 10; // snizzle

//grid game world
var tSize, nextY;
var gSize = tSize = 20;
var nextX = nextY = 0;

//food
var orangeY, appleY;
var orangeX = (orangeY = 15);
var appleX = (appleY = 12);



function refresh() {
    if (isPaused){
        return;
    }

    if (isMaster == true){
        if (turns <= 0){
            isGameOver = true;
            location.reload(false);
            alert("You ran out of turns. Game Over. \n Click ok to restart"); 
        }
    }
    //move snizzle
    snizzleX += nextX;
    snizzleY += nextY;
    
    for (var i = 0; i < trail.length; i++) {
        var sx = snizzleX[i];
        var sy = snizzleY[i];
        if (snizzleY == 10 && snizzleX == 10) {
            return;
        }
    }

    //checks if snizzle is out of bound; allowed
    if (isArcade == true) {
        if (snizzleY < 0) {
            snizzleY = gSize - 1;
        }
        if (snizzleY > gSize - 1) {
            snizzleY = 0;
        }
        if (snizzleX < 0) {
            snizzleX = gSize - 1;
        }
        if (snizzleX > gSize - 1) {
            snizzleX = 0;
        }
    }//check out of bound; not allowed
    else{ //top
        if (snizzleY <= 0 -2) {
            // gameArea.stop();
            isGameOver = true;
            location.reload(false);
            alert("You explored out of bounds. Game Over. \n Click ok to restart");

        } //bottom
        if (snizzleY >= gSize + 1) {
            // gameArea.stop();
            isGameOver = true;
            location.reload(false);
            alert("You explored out of bounds. Game Over. \n Click ok to restart");
            
        } //left
        if (snizzleX <= 0 - 2) {
            // gameArea.stop();
            isGameOver = true;
            location.reload(false);
            alert("You explored out of bounds. Game Over. \n Click ok to restart");
            
        }//
        if (snizzleX >= gSize + 1 ) {
            // gameArea.stop();
            isGameOver = true;
            location.reload(false);
            alert("You explored out of bounds. Game Over. \n Click ok to restart");
            
    }
        // if (isGameOver = true) {
        //     location.reload(false);
        //     alert("Game Over. \n Click ok to restart");
        // }
}
    
    //snizzle eat?
    if (snizzleX == orangeX && snizzleY == orangeY) {
        ts++;
        if (isMaster){
            turns = 3;
        }
        if (isSurvival == true ){
            myScore = myScore / points;
            myScore = document.getElementById("score").innerHTML = myScore;
        }else{
            myScore += points;
            myScore = document.getElementById("score").innerHTML = myScore;
        }
        orangeX = Math.floor(Math.random() * gSize);
        orangeY = Math.floor(Math.random() * gSize);
        foodAte++
        if (foodAte == LvUp){
            appleX = Math.floor(Math.random() * gSize);
            appleY = Math.floor(Math.random() * gSize);
            ctx.fillStyle = "red";
            ctx.fillRect(appleX * tSize, appleY * tSize, tSize, tSize);
            alert(appleX + " " + appleY);
        }
    }
    //redraw background
    ctx.fillStyle = "black";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    //paint snizzle
    ctx.fillStyle = "green";
    for (var z = 0; z < trail.length; z++) {
        ctx.fillRect(trail[z].x * tSize, trail[z].y * tSize, tSize, tSize);
        //restart game if snizzle overlap
        if (trail[z].x == snizzleX && trail[z].y == snizzleY) {
            isGameOver = true;
            location.reload(false);
            alert("Game Over, You bit yourself.");
            
        }
        // console.log("X: " + snizzleX);
        // console.log("Y: " + snizzleY);
    }
    //paint food
    ctx.fillStyle = "orange";
    ctx.fillRect(orangeX * tSize, orangeY * tSize, tSize, tSize);

    //set trail
    trail.push({ x: snizzleX, y: snizzleY });
    while (trail.length > ts) {
        trail.shift();
    }
}

function keyDownEvent(e) {
    switch (e.keyCode) {
        case 37:
            nextX = -1;
            nextY = 0;
            if (isMaster){
                turns--;
            }
            break;
        case 38:
            nextX = 0;
            nextY = -1;
            if (isMaster){
                turns--;
            }
            break;
        case 39:
            nextX = 1;
            nextY = 0;
            if (isMaster){
                turns--;
            }
            break;
        case 40:
            nextX = 0;
            nextY = 1;
            if (isMaster){
                turns--;
            }
            break;
        case 80:
            togglePause();
            break;
    }
}

function drawSnizzleScales() {
    ctx.fillStyle = "green";
    for (var z = 0; z < trail.length; z++) {
        ctx.fillRect(trail[z].x * tSize, trail[z].y * tSize, tSize, tSize);
        if (isPaused){
            requestAnimationFrame(drawSnizzleScales);
        }
    }   
}

function drawSnizzle() {
    snizzle.forEach(drawSnizzleScales);
}

function setAdv(){
    isAdvanced = true;
    isPaused = false;
    isArcade = false;
    isSurvival = false;
    isAdvanced = false;
    isMaster = false;

}
function setArc(){
    isAdvanced = false;
    isPaused = false;
    isArcade = true;
    isSurvival = false;
    isAdvanced = false;
    isMaster = false;
}
function setMas(){
    isAdvanced = false;
    isPaused = false;
    isArcade = false;
    isSurvival = false;
    isAdvanced = false;
    isMaster = true;
}
function setSur(){
    isAdvanced = false;
    isPaused = false;
    isArcade = false;
    isSurvival = true;
    isAdvanced = false;
    isMaster = false;
}

//pause
function loop(){
    if (isPaused){
    return;
    }
    refresh();
    drawSnizzleScales();

}