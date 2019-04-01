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
    x : 0, // lado izquierdo del canvas
    y : (canvas.height - 100)/2, // restamos el alto  de la pala y lo dividimos entre 2 para situarla en el centro
    width : 10,
    height : 100,
    score : 0,
    color : "WHITE",
    move_paddle:50
}

// Pala del usuario 2
const user2 = {
    x : canvas.width - 10, // restamos el ancho de  la pala
    y : (canvas.height - 100)/2, //
    width : 10,
    height : 100,
    score : 0,
    color : "WHITE",
    move_paddle:50
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

// collision detection
// la funcion colision devuelve true o false, si hay colicion devuelve true si no false, la b por ball y p de player
function collision(b,p){
    p.top = p.y;
    p.bottom = p.y + p.height;
    p.left = p.x;
    p.right = p.x + p.width;

    b.top = b.y - b.radius;
    b.bottom = b.y + b.radius;
    b.left = b.x - b.radius;
    b.right = b.x + b.radius;

    return p.left < b.right && p.top < b.bottom && p.right > b.left && p.bottom > b.top;
}

// movimiento de palas
window.onkeydown = (e) =>{
  e.preventDefault();
  // jugador 1
  if (e.key == 's'){
    //s mueve jugador 1 arriba
    user1.y = user1.y - user1.move_paddle;
  } else if (e.key == 'd') {
    //s mueve jugador 1 abajo
    user1.y = user1.y + user1.move_paddle;
  } else if (e.key == 'k') {
    //k mueve jugador 2 arriba
    user2.y = user2.y - user2.move_paddle;
  } else if (e.key == 'l') {
    //l mueve jugador 2 abajo
    user2.y = user2.y + user2.move_paddle;
  }
}

// reseteamos la bola cuando uno de los dos marca
function resetBall(){
  ball.x = canvas.width/2;
  ball.y = canvas.height/2;
  ball.velocityX = -ball.velocityX;
  ball.speed = 7;

}

// funcion de actualizar la posicion y comportamiento de la bola en el juego
function update(){

  // Puntuacion cuando la pelota toca el ancho del canvas
  if( ball.x - ball.radius < 0 ){
      user2.score+=1;
      resetBall();
  }else if( ball.x + ball.radius > canvas.width){
      user1.score+=1;
      resetBall();
  }

  // La bola tiene velocidad
  ball.x += ball.velocityX;
  ball.y += ball.velocityY;

  // la bola cambia de direccion cuando choca con el largo del canvas
  if(ball.y - ball.radius < 0 || ball.y + ball.radius > canvas.height){
      ball.velocityY = -ball.velocityY;
  }
  let player = (ball.x + ball.radius < canvas.width/2) ? user1 : user2; //variable local de la funcion, no es variable global. ? es un if si se cumpla la funcion plaeyer sera user si no user
  // si la bola golpea la pala
  if(collision(ball,player)){
      // comprobamos donde golpea la bola la pala
      let collidePoint = (ball.y - (player.y + player.height/2));
      // normalizar el valor de collidePoint, necesitamos obtener números entre -1 y 1
      // -jugado.height / 2 <punto de colisión <player.height / 2
      collidePoint = collidePoint / (player.height/2);

      // cuando la pelota golpea la parte superior de una paleta, queremos que la pelota tome un ángulo de -45degees
      // cuando la pelota golpea el centro de la paleta, queremos que la pelota tome un ángulo de 0 grados
      // cuando la pelota golpee el fondo de la paleta, queremos que la pelota tome 45 grados
      // Matemáticas.PI / 4 = 45 grados
      let angleRad = (Math.PI/4) * collidePoint;

      // cambiar la dirección de la velocidad X e Y
      let direction = (ball.x + ball.radius < canvas.width/2) ? 1 : -1; // let variable local / ? if
      ball.velocityX = direction * ball.speed * Math.cos(angleRad);
      ball.velocityY = ball.speed * Math.sin(angleRad);

      // acelera la pelota cada vez que una paleta la golpea.
      ball.speed += 0.1;
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
