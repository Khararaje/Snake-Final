"use strict";
//Variables
var canvas, ctx;
var myScore = document.getElementById("score");
var score;

var foodAte = 0;
var LvUp = 1;

//states/modes
var isPaused = false;
var isArcade = true;
var isSurvival = false;
var isExplorer = false;
var isShrink = false;
var isGameOver = false;

//load function
// var gameArea = 
window.onload = function () {
    canvas = document.getElementById("myCanvas");
    ctx = canvas.getContext("2d");
    this.document.addEventListener("keydown", keyDownEvent);
    var r = 10;
    this.setInterval(refresh, 1000 / r);
    ts = dts;
    score = 0;
    this.isGameOver = false;
    // var scoreboard = new this.component("30px", "Consolas", "red", 350, 40, "text");
}

//pause
function togglePause(){
    isPaused = !isPaused;
    if (isPaused == false){
        loop();
    }
}
//statechecker
function getState(){

}
// //prepares score for canvas
// function component(width, height, color, x, y, type){
//     this.type = type;
//     this.width = w;
//     this.height = h;
//     this.speedX = 0;
//     this.speedY = 0;
//     this.x = x;
//     this.y = y;
//     this.update = function(){
//         ctx = gameArea.getContext;
//         if (this.type = "text"){
//             ctx.font = this.width + " " + this.height;
//             ctx.fillStyle = color;
//             ctx.fillText(this.x, this.y, this.width, this.height);
//         }
//     }

// }

// //function writes score to canvas 
// function updateGame(){
//     var x, height;
//     for (i = 0; i < trail.length; i += 1){
//         if (nextX == snizzleX && nextY == snizzleY){
//             gameArea.stop();
//             alert("Game Over Snizzle bit himself");
//             return;
//         }
//     }
//     gameArea.clear();
    
// }

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
        orangeX = Math.floor(Math.random() * gSize);
        orangeY = Math.floor(Math.random() * gSize);
        score += 105;
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
            alert("Game Over");
            
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
            break;
        case 38:
            nextX = 0;
            nextY = -1;
            break;
        case 39:
            nextX = 1;
            nextY = 0;
            break;
        case 40:
            nextX = 0;
            nextY = 1;
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

function loop(){
    if (isPaused){
    return;
    }
    refresh();
    drawSnizzleScales();

}