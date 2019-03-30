// seleccionar el elemento de canvas
const canvas = document.getElementById("pong");

// Para dibujar en canvas
const ctx = canvas.getContext('2d');



// objeto bola
const ball = {
    x : canvas.width/2,
    y : canvas.height/2,
    radius : 10,
    velocityX : 5,
    velocityY : 5,
    speed : 7,
    color : "WHITE"
}

// Pala del usuario 1
const user1 = {
    x : 0, // left side of canvas
    y : (canvas.height - 100)/2, // -100 the height of paddle
    width : 10,
    height : 100,
    score : 0,
    color : "WHITE"
}

// Pala del usuario 2
const user2 = {
    x : canvas.width - 10, // - width of paddle
    y : (canvas.height - 100)/2, // -100 the height of paddle
    width : 10,
    height : 100,
    score : 0,
    color : "WHITE"
}

// RED
const net = {
    x : (canvas.width - 2)/2,
    y : 0,
    height : 10,
    width : 2,
    color : "WHITE"
}


// dibujaremos el canvas y las palas de los usuarios
function drawRect(x, y, w, h, color){
    ctx.fillStyle = color;
    ctx.fillRect(x, y, w, h);
}


// para dibujar la bola
function drawArc(x, y, r, color){
    ctx.fillStyle = color;
    ctx.beginPath();
    ctx.arc(x,y,r,0,Math.PI*2,true);
    ctx.closePath();
    ctx.fill();
}

// para dibujar la red
function drawNet(){
    for(let i = 0; i <= canvas.height; i+=15){
        drawRect(net.x, net.y + i, net.width, net.height, net.color);
    }
}

// para la puntuacion de los jugadores escribiremos en texto
function drawText(text,x,y){
    ctx.fillStyle = "#FFF";
    ctx.font = "75px fantasy";
    ctx.fillText(text, x, y);
}

function update(){

window.onkeydown = (e) =>{
  e.preventDefault();
  // jugador 1
  if (e.key == 's'){
    //s mueve jugador 1 arriba
    user1.y = user1.y -10;
  } else if (e.key == 'd') {
    //s mueve jugador 1 abajo
    user1.y = user1.y +10;
  } else if (e.key == 'k') {
    //k mueve jugador 2 arriba
    user2.y = user2.y -10;
  } else if (e.key == 'l') {
    //l mueve jugador 2 abajo
    user2.y = (user2.y +10);
  }
  }
}
function render(){

    // limpiamos canvas
    drawRect(0, 0, canvas.width, canvas.height, "BLACK");

    // dibujamos marcador de la izquierda, usuario 1
    drawText(user1.score,canvas.width/4,canvas.height/5);

    // dibujamos marcador de la derecha, usuario 2
    drawText(user2.score,3*canvas.width/4,canvas.height/5);

    // dibujamos red
    drawNet();

    // dibujamos pala de la izquierda, usuario 1
    drawRect(user1.x, user1.y, user1.width, user1.height, user1.color);

    // dibujamos pala de la derecha, usuario 2
    drawRect(user2.x, user2.y, user2.width, user2.height, user2.color);

    // dibujamos bola
    drawArc(ball.x, ball.y, ball.radius, ball.color);
}



function game(){

    update();
    render();

}
// numero de frames por segundo
let framePerSecond = 50;

// llama a la funcion game 50 veces cada segundo
let loop = setInterval(game,1000/framePerSecond);
