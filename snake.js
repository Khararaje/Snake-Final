window.addEventListener('load', function(){
var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");
ctx.fillStyle = "#FF0000";
ctx.fillRect(0, 0, 450, 100);

let snizzle = [{x: 250, y: 250,}, {x: 240, y: 250,}, {x: 230, y: 250,}, {x: 220, y: 250,}, {x: 210, y: 250 }]
});

function drawSnizzleScales(snizzleScale){ 
    ctx.fillStyle = 'mint';
    ctx.strokestyle = 'lightpurple';
    ctx.fillRect(snizzleScale.x, snizzleScale.y, 10, 10);
    ctx.strokeRect(snizzleScale.x, snizzleScale.y, 10, 10);
}

function drawSnizzle(){
    snizzle.forEach(drawSnizzleScales);
}