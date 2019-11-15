//canvas
var canvas, ctx;

//load function
window.onload = function () {
    canvas = document.getElementById("myCanvas");
    ctx = canvas.getContext("2d");
    this.document.addEventListener("keydown", keyDownEvent);
    var r = 10;
    this.setInterval(refresh, 1000 / r);

}

//snizzle the snake
var dts = 5;
var ts = dts;
var trail = [];
var snizzleX = snizzleY = 10;

//grid game world
var gSize = tSize = 20;
var nextX = nextY = 0;

//food
var orangeX = (orangeY = 15);

function refresh() {
    //move snizzle
    snizzleX += nextX;
    snizzleY += nextY;

    //checks if snizzle is out of bound
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


    //snizzle eat?
    if (snizzleX == orangeX && snizzleY == orangeY) {
        ts++;
        orangeX = Math.floor(Math.random() * gSize);
        orangeY = Math.floor(Math.random() * gSize);
    }

    //redraw background
    ctx.fillStyle = "black";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    //paint snizzle
    ctx.fillStyle = "red";
    for (var z = 0; z < trail.length; z++) {
        ctx.fillRect(trail[z].x * tSize, trail[z].y * tSize, tSize, tSize);
        if (trail[z].x == snizzleX && trail[z].y == snizzleY) {
            ts = dts;
        }
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
    }
}

function drawSnizzleScales(snizzleScale) {
    ctx.fillStyle = 'mint';
    ctx.strokestyle = 'lightpurple';
    ctx.fillRect(snizzleScale.x, snizzleScale.y, 10, 10);
    ctx.strokeRect(snizzleScale.x, snizzleScale.y, 10, 10);
}

function drawSnizzle() {
    snizzle.forEach(drawSnizzleScales);
}

