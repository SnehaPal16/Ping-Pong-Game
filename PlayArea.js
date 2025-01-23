// ---------dark mode---------
const isDarkMode = localStorage.getItem('darkMode') === 'true';

function toggleDarkMode() {
  const isDark = document.body.classList.toggle('dark-mode');
  document.documentElement.classList.add(isDark ? 'dark' : document.documentElement.classList.remove('dark'));
  localStorage.setItem('darkMode', isDark);
}

if (isDarkMode) {
  toggleDarkMode();
}


// -----------canvas line----------
const canvas = document.getElementById("board");
const ctx = canvas.getContext("2d");

function line(){
  ctx.beginPath();
  ctx.moveTo(150, 0);
  ctx.lineWidth = 2;
  ctx.setLineDash([5, 3]);
  ctx.lineTo(150, 150);
  if (isDarkMode) {
    ctx.strokeStyle = "white";
  }
  ctx.stroke();
}


var x = canvas.width/2;
var y = canvas.height-30;
var dx = 4;
var dy = -4;
var ballRadius=4;


// ----------ball----------
function Ball(){
  ctx.beginPath();
  ctx.arc(x, y, ballRadius, 0, Math.PI*2);
  ctx.fillStyle = "black";
  ctx.fill();
  if (isDarkMode) {
    ctx.fillStyle = "#03ff00";
    ctx.fill();
  }
  ctx.closePath();
}



// ------movement of paddles------
var leftUpPressed = false;
var leftDownPressed = false;
var rightUpPressed = false;
var rightDownPressed = false;

// ------downward handler--------
function downHandler(e){
  if(e.keyCode == 65) leftUpPressed=true;
  else if(e.keyCode == 90) leftDownPressed=true;
  if(e.keyCode == 38) rightUpPressed=true;
  else if(e.keyCode == 40) rightDownPressed=true;
}

// ------upward handler--------
function upHandler(e){
  if(e.keyCode == 65) leftUpPressed=false;
  else if(e.keyCode == 90) leftDownPressed=false;
  if(e.keyCode == 38) rightUpPressed=false;
  else if(e.keyCode == 40) rightDownPressed=false;
}


// --------left paddle--------
var l_PaddleHeight = 30;
var l_PaddleWidth = 5;
var l_PaddleX = 5;
var l_PaddleY = canvas.height / 2 - l_PaddleHeight/2;

function drawLeftPaddle(){
  ctx.beginPath();
  ctx.rect(l_PaddleX,l_PaddleY,l_PaddleWidth,l_PaddleHeight);
  ctx.fillStyle="#c40808";
  ctx.fill();
  ctx.closePath();

  if (leftDownPressed && l_PaddleY < canvas.height - l_PaddleHeight) {
    l_PaddleY += 2;
  }
  else if (leftUpPressed && l_PaddleY > 0) {
    l_PaddleY -= 2;
  }  
}

// ---------right paddle----------
var r_PaddleWidth = 5;
var r_PaddleX = canvas.width - (r_PaddleWidth + 5);
var r_PaddleHeight = 30;
var r_PaddleY = canvas.height / 2 - r_PaddleHeight/2;

function drawRightPaddle(){
  ctx.beginPath();
  ctx.rect(r_PaddleX,r_PaddleY,r_PaddleWidth,r_PaddleHeight);
  ctx.fillStyle="#2c0180";
  ctx.fill();
  ctx.closePath();

  if(rightDownPressed && r_PaddleY < canvas.height - r_PaddleHeight){
    r_PaddleY +=2;
  }
  else if(rightUpPressed && r_PaddleY > 0){
    r_PaddleY -=2;
  }
}


//-----score card------
var leftScore=document.getElementById('l_score');
var rightScore=document.getElementById('r_score');;

// ------collision of ball--------
// ------with left paddle ===>
function collisionWithLeftPaddle(){
  if((x-ballRadius) <= 5+l_PaddleWidth){
    if(y>l_PaddleY && y < l_PaddleY + l_PaddleHeight) dx=-dx;

    else if((x-ballRadius)<=0){
      let val = parseInt(rightScore.innerText);
      val++;
      rightScore.innerText=val;

      x=canvas.width/2;
      y=canvas.height/2;
      dx = -dx;
      dy = -dy;
    }
  }
}


// ------with right paddle ===>
function collisionsWithRightPaddle() {
  if ((x + ballRadius) >= canvas.width - (r_PaddleWidth + 5)) {
    if (y > r_PaddleY && y < r_PaddleY + r_PaddleHeight) dx = -dx;

    else if (x + ballRadius >= canvas.width) {
      let val = parseInt(leftScore.innerText);
      val++;
      leftScore.innerText=val;
        
      x = canvas.width / 2;
      y = canvas.height / 2;
      dx = -dx;
      dy = -dy;
    
    }
  }
}


// ------calling of collision function------
function computeCollisionsWithWallsAndPaddle() {
  collisionWithLeftPaddle();
  collisionsWithRightPaddle();
  if (((y - ballRadius) <= 0) || ((y + ballRadius) >= canvas.height)) {
    dy = -dy;
  }
}

// -----calling of all function to draw-----

function draw(){
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  line();
  drawLeftPaddle();
  drawRightPaddle();
  Ball();
  computeCollisionsWithWallsAndPaddle();
  x += dx;
  y += dy;
}

// ------REPLAY BUTTON---------
var replayBTN= document.getElementById("replayBtn");
replayBTN.addEventListener('click',function() {
  location.reload();
});


// -------PLAY/PAUSE BUTTON-------
var gameRunning = true;
var intervalId;
var playPauseButton=document.getElementById("ppBtn");
playPauseButton.addEventListener("click", toggleGame);

function toggleGame(){
  if(gameRunning) clearInterval(intervalId);
  else intervalId = setInterval(draw, 35);

  gameRunning = !gameRunning;
}


intervalId=setInterval(draw,35);
document.addEventListener("keydown",downHandler,false);
document.addEventListener("keyup",upHandler,false);

