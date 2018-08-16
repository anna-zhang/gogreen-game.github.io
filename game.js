var current_screen= "start";
document.getElementById("startScreen").style.display="block";
document.getElementById("secondScreen").style.display="none";
var begin = 0;

function myFunction() {
  var x = document.getElementById("myDIV");
  if (x.style.display === "none") {
  x.style.display = "block";
} else {
  x.style.display = "none";
}
}

function random(){
  document.getElementById("secondScreen").style.display= "none";
  document.getElementById("thirdScreen").style.display= "none";
  document.getElementById("fourthScreen").style.display= "none";
  document.getElementById("fifthScreen").style.display= "none";
  document.getElementById("sixthScreen").style.display= "none";
  document.getElementById("gameScreen").style.display= "none";
  document.getElementById("startScreen").style.display= "block";

  console.log("test");
  current_screen= "start";
  var ran1 = Math.floor(Math.random() * 4); // 4 skin tones
  var ran2 = Math.floor(Math.random() * 4);
  var recycle-can;
  var compost-can;

  if (ran1 == 0){
    compost-can = "Images/trash-can.png";
  }
  if (ran1 == 1){
    compost-can = "babies/compost-can2.svg";
  }
  if (ran1 == 2){
    compost-can = "babies/compost-can3.svg";
  }
  if (ran1 == 3){
    compost-can = "babies/compost-can4.svg";
  }
  if (ran2== 0){
    recycle-can = "babies/flipped/recycle-can11.svg";
  }
  if (ran2 == 1){
    recycle-can = "babies/flipped/recycle-can22.svg";
  }
  if (ran2 == 2){
    recycle-can = "babies/flipped/recycle-can33.svg";
  }
  if (ran2 == 3){
    recycle-can = "babies/flipped/recycle-can44.svg";
  }
  document.getElementById("baby1").src = compost-can;
  document.getElementById("baby2").src = recycle-can;
}



var myGamePiece;
var myBackground;
var myObstacle;
var score;
var total_score;
var high_score = -1000000;
var total_scoreDis;
var high_scoreDis;
var count_score;
var gender;
var skin;
var hair;
var teenImg;
var babyImg;
var adultImg;
var obImg;
var obstacleNum;
var count = 0;
var generation;
var generationDis;
var check = false;
var start = 0;
var lives;
var partLives;
var end;
var endShift;

function startGame() { // starts game
score = 0; // need 50 to reach next level, then resets once starts new level
lives = 3;
partLives = 3;
total_score = 0; // starts with 0 score
count_score = 0; // keeps track of level
generation = 0;
gender = Math.floor(Math.random() *2); //compost-can is 0, recycle-can is 1
skin = Math.floor(Math.random() * 4); // 4 skin tones
hair = Math.floor(Math.random() * 4); // 4 hair colors
if (gender == 0){//compost-can
  if (skin == 0){ // 0 to 1, lightest to darkest
    babyImg = "babies/compost-can1.svg";
  }
  if (skin == 1){
    babyImg = "babies/compost-can2.svg";
  }
  if (skin == 2){
    babyImg = "babies/compost-can3.svg";
  }
  if (skin == 3){
    babyImg = "babies/compost-can4.svg";
  }
}
if (gender == 1){//recycle-can
  if (skin == 0){ // 0 to 1, lightest to darkest
    babyImg = "babies/recycle-can1.svg";
  }
  if (skin == 1){
    babyImg = "babies/recycle-can2.svg";
  }
  if (skin == 2){
    babyImg = "babies/recycle-can3.svg";
  }
  if (skin == 3){
    babyImg = "babies/recycle-can4.svg";
  }
}


end = new component(480, 270, "background/gameover.svg", 0, 0, "end");
myScore = new component("15px", "Consolas", "black", 20, 20, "text");
myLives = new component("15px", "Consolas", "black", 20, 40, "text");
myGamePiece = new component(80, 100, babyImg, 10, 100, "image");
myBackground = new component(3700, 270, "background/Kid.svg", -50, 0, "background");
myObstacle = new component(10, 10, "", 0, 0, "obstacle");

myGamePiece.gravity= 1.6;
myGameArea.start();

}

var myGameArea = { // runs everytime
  canvas : document.createElement("canvas"),
  start : function() {
    myGamePiece.speedX= 0;
    myGamePiece.speedY= 0;
    myGamePiece.gravitySpeed = 5.6;
    this.canvas.width = 480;
    this.canvas.height = 270;
    this.context = this.canvas.getContext("2d");
    document.body.insertBefore(this.canvas, document.body.childNodes[0]);
    this.frameNo = 0;
    this.interval = setInterval(updateGameArea, 20);
    window.addEventListener('keydown', function(e){
      myGameArea.key= e.keyCode;
    })
    window.addEventListener('keyup', function(e){
      myGameArea.key= false;
    })
    },
  clear : function() {
    this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
  },
  stop : function() {
    clearInterval(this.interval);
  }
}

function component(width, height, color, x, y, type) {
  this.type = type;
  if (type == "image" || type == "background" || type == "obstacle" || type == "end") {
    this.image = new Image();
    this.image.src = color;
    if (type == "image"){
      this.gravitySpeed =  5.6; // image accelerates downward while rest of things aren't affected by gravity
    }
  }
  this.width = width;
  this.height = height;
  this.speedX = 0;
  this.speedY = 0;
  if (  type == "obstacle" || type == "background"){
    if (start == 0){
      this.speedX = -7;
    }
    else{
      this.speedX = -7 - (2*generation);
    }
  }
  if( type == "image"){
    this.speedX = 0;
  }
  this.x = x;
  this.y = y;
  this.gravity= 0.05;
  this.gravitySpeed= 0.6;

  this.update = function() { //"prints" everything
    ctx = myGameArea.context;
    if (type == "image" || type == "background" || type == "text" || type == "obstacle" || type == "end") { //draws each image
      if (type == "image"){
          ctx.drawImage(this.image,
          this.x,
          this.y,
          this.width, this.height);
      }
      if (type == "end"){
          ctx.drawImage(this.image,
          this.x,
          this.y,
          this.width, this.height);
      }
      if (type == "obstacle"){
          ctx.drawImage(this.image,
          this.x,
          this.y,
          this.width, this.height);
      }
      if (type == "background") {
          ctx.drawImage(this.image,
          this.x,
          this.y,
          this.width, this.height);
          ctx.drawImage(this.image,
          this.x + this.width-60,
          this.y,
          this.width, this.height);
      }
      if (type == "text") {
        ctx.font = this.width + " " + this.height;
        ctx.fillStyle = color;
        ctx.fillText(this.text, this.x, this.y);
      }
    }
    else {
      ctx.fillStyle = color;
      ctx.fillRect(this.x, this.y, this.width, this.height);
    }
  }

  this.newPos = function() { // new position based on type
      if (this.type == "image"){ // for image, check if: hit any of the edges, and gravity accelerates downwards
        this.gravitySpeed += this.gravity;
        this.hitBottom();
        this.hitTop();
        this.hitRight();
        this.hitLeft();
        this.y += this.speedY + this.gravitySpeed; //  change y value by adding speed and gravity
      }
      if (this.type == "background") { // for background, moves back to beginning when pass through screen (to loop)
        if (this.x <= -(this.width)) {
            this.x = -50; // weird thing where background kinda cuts off, so make sure that it starts earlier
        }
      }
      if (this.type == "obstacle"){
          if (this.x <= -(this.width)) { // create new obstacle when pass screen
            var x1;
            var y1;
            if (count_score == 0){ // four baby ones
              obstacleNum = Math.floor(Math.random() *4)
              if (obstacleNum == 0){
                obImg = "items/compost-cans/Train.svg";
                x1 = 50;
                y1 = 40;
              }
              if (obstacleNum == 1){
                obImg = "items/recycle-cans/Doll.svg";
                x1 = 50;
                y1 = 50;
              }
              if (obstacleNum == 2){
                obImg = "items/compost-cans/legoes.svg";
                x1 = 50;
                y1 = 40;
              }
              if (obstacleNum == 3){
                obImg = "items/recycle-cans/ragdoll.svg";
                x1 = 60;
                y1 = 40;
              }
            }
            if (count_score == 1){ // 4 teen ones
              obstacleNum = Math.floor(Math.random() *4)
              if (obstacleNum == 0){
                obImg = "items/compost-cans/Weights.svg";
                x1 = 50;
                y1 = 20;
              }
              if (obstacleNum == 1){
                obImg = "items/compost-cans/Videogame.svg";
                x1 = 70;
                y1 = 40;
              }
              if (obstacleNum == 2){
                obImg = "items/recycle-cans/Fashion.svg";
                x1 = 50;
                y1 = 40;
              }
              if (obstacleNum == 3){
                obImg = "items/recycle-cans/Makeup.svg";
                x1 = 20;
                y1 = 40;
              }
            }
            if (count_score == 2){ // 3 adult ones
              obstacleNum = Math.floor(Math.random() *3)
              if (obstacleNum == 0){
                obImg = "items/Neutral/Family.svg";
                x1 = 50;
                y1 = 50;
              }
              if (obstacleNum == 1){
                obImg = "items/compost-cans/Job.svg";
                x1 = 50;
                y1 = 40;
              }
              if (obstacleNum == 2){
                obImg = "items/Neutral/House.svg";
                x1 = 50;
                y1 = 50;
              }
            }

            //can be in 2 y values, by random
            var rand = Math.floor(Math.random()*2)
            if (rand == 0){
              var ObstacleY = 50;
            }
            if (rand == 1){
              var ObstacleY = 200;
            }
            myObstacle = new component(x1, y1, obImg, 450, ObstacleY, "obstacle"); // create obstacle
          }
        }// if obstacle, creates obstacle
      this.x += this.speedX; //change x value by adding speed to
  }

  this.hitBottom = function() { //when hit bottom
    var rockbottom = myGameArea.canvas.height - this.height- 20;
    if (this.y > rockbottom){ //if below bottom
      this.y = rockbottom; //set equal to bottom
      this.gravitySpeed = 0; //make sure does not keep accelerating downwards
    }
  }

  this.hitTop = function() { //when hit top of canvas
    var top= 0;
    if (this.y < top){ // if greater than top (above)
      this.y= top; //sets = top
      this.gravitySpeed= 0.6; // makes acceleration so go down
    }
  }

  this.hitRight = function() { //when hit right
    var rockbottom = myGameArea.canvas.width - this.width;
    if(this.type == "image"){
      if (this.x > rockbottom){ //if beyond right
        this.x = rockbottom; //set equal to right
        this.SpeedX = 0; //make sure does not go right
      }
    }
  }

  this.hitLeft = function() { //when hit left
    var left = 0;
    if (this.type == "image"){
      if (this.x < left){ //if hit left
        this.x = left; //set equal to left
        this.SpeedX = 0; //make sure does not go left
      }
    }
  }

  if (type == "image"){ //check if crash with an obstacle (based if overlap width and height)
    this.crashWith = function(ob) {
      var myleft = this.x+ 10; //
      var myright = this.x + (this.width)- 10;
      var mytop = this.y;
      var mybottom = this.y + (this.height);
      var otherleft = ob.x;
      var otherright = ob.x + (ob.width);
      var othertop = ob.y;
      var otherbottom = ob.y + (ob.height);
      var crash = true;
      if ((mybottom < othertop) || (mytop > otherbottom) || (myright < otherleft) || (myleft > otherright)) {
          crash = false;
      }
      return crash;
    } //crash function
  }
}

function accelerate(n){
myGamePiece.gravity= n;
}

function updateGameArea() {
if (gender == 0){ //compost-can
  if (skin == 0){ // 0 to 1, lightest to darkest
    adultImg = "adult/man/skin1.svg";
    if (hair == 0){
      teenImg = "teen/compost-can/skin1/blackHair.svg";
    }
    if (hair == 1){
      teenImg = "teen/compost-can/skin1/blondHair.svg";
    }
    if (hair == 2){
      teenImg = "teen/compost-can/skin1/brownHair.svg";
    }
    if (hair == 3){
      teenImg = "teen/compost-can/skin1/lightBrownHair.svg";
    }
  }
  if (skin == 1){
    adultImg = "adult/man/skin2.svg";
    if (hair == 0){
      teenImg = "teen/compost-can/skin2/blackHair.svg";
    }
    if (hair == 1){
      teenImg = "teen/compost-can/skin2/blondHair.svg";
    }
    if (hair == 2){
      teenImg = "teen/compost-can/skin2/brownHair.svg";
    }
    if (hair == 3){
      teenImg = "teen/compost-can/skin2/lightBrownHair.svg";
    }
  }
  if (skin == 2){
    adultImg = "adult/man/skin3.svg";
    if (hair == 0){
      teenImg = "teen/compost-can/skin3/blackHair.svg";
    }
    if (hair == 1){
      teenImg = "teen/compost-can/skin3/blondHair.svg";
    }
    if (hair == 2){
      teenImg = "teen/compost-can/skin3/brownHair.svg";
    }
    if (hair == 3){
      teenImg = "teen/compost-can/skin3/lightBrownHair.svg";
    }
  }
  if (skin == 3){
    adultImg = "adult/man/skin4.svg";
    if (hair == 0){
      teenImg = "teen/compost-can/skin4/blackHair.svg";
    }
    if (hair == 1){
      teenImg = "teen/compost-can/skin4/blondHair.svg";
    }
    if (hair == 2){
      teenImg = "teen/compost-can/skin4/brownHair.svg";
    }
    if (hair == 3){
      teenImg = "teen/compost-can/skin4/lightBrownHair.svg";
    }
  }
}
else if(gender == 1){ //recycle-can
  if (skin == 0){ // 0 to 1, lightest to darkest
    if (hair == 0){
      teenImg = "teen/recycle-can/Skin1/blackHair.svg";
      adultImg = "adult/woman/skin1/blackHair.svg";
    }
    if (hair == 1){
      teenImg = "teen/recycle-can/Skin1/blondHair.svg";
      adultImg = "adult/woman/skin1/blondHair.svg";
    }
    if (hair == 2){
      teenImg = "teen/recycle-can/Skin1/brownHair.svg";
      adultImg = "adult/woman/skin1/brownHair.svg";
    }
    if (hair == 3){
      teenImg = "teen/recycle-can/Skin1/lightBrownHair.svg";
      adultImg = "adult/woman/skin1/lightBrownHair.svg";
    }
  }
  if (skin == 1){
    if (hair == 0){
      teenImg = "teen/recycle-can/Skin2/blackHair.svg";
      adultImg = "adult/woman/skin2/blackHair.svg";
    }
    if (hair == 1){
      teenImg = "teen/recycle-can/Skin2/blondHair.svg";
      adultImg = "adult/woman/skin2/blondHair.svg";
    }
    if (hair == 2){
      teenImg = "teen/recycle-can/Skin2/brownHair.svg";
      adultImg = "adult/woman/skin2/brownHair.svg";
    }
    if (hair == 3){
      teenImg = "teen/recycle-can/Skin2/lightBrownHair.svg";
      adultImg = "adult/woman/skin2/lightBrownHair.svg";
    }
  }
  if (skin == 2){
    if (hair == 0){
      teenImg = "teen/recycle-can/Skin3/blackHair.svg";
      adultImg = "adult/woman/skin3/blackHair.svg";
    }
    if (hair == 1){
      teenImg = "teen/recycle-can/Skin3/blondHair.svg";
      adultImg ="adult/woman/skin3/blondHair.svg";
    }
    if (hair == 2){
      teenImg = "teen/recycle-can/Skin3/brownHair.svg";
      adultImg ="adult/woman/skin3/brownHair.svg";
    }
    if (hair == 3){
      teenImg = "teen/recycle-can/Skin3/lightBrownHair.svg";
      adultImg = "adult/woman/skin3/lightBrownHair.svg";
    }
  }
  if (skin == 3){
    if (hair == 0){
      teenImg = "teen/recycle-can/Skin4/blackHair.svg";
      adultImg = "adult/woman/skin4/blackHair.svg";
    }
    if (hair == 1){
      teenImg = "teen/recycle-can/Skin4/blondHair.svg";
      adultImg = "adult/woman/skin4/blondHair.svg";
    }
    if (hair == 2){
      teenImg = "teen/recycle-can/Skin4/brownHair.svg";
      adultImg = "adult/woman/skin4/brownHair.svg";
    }
    if (hair == 3){
      teenImg = "teen/recycle-can/Skin4/lightBrownHair.svg";
      adultImg = "adult/woman/skin4/lightBrownHair.svg";
    }
  }
}

if (score == 50 && count_score == 0){ // once reaches score of 50 (first time), changes to next state(to teen)
  myGameArea.clear();
  myBackground = new component(3700, 270, "background/Teen.svg", -50, 0, "background"); // change to teen background
  myObstacle = new component(100,100, "", 0, 0, "obstacle");
  if (gender == 0){
    myGamePiece = new component(50, 100, teenImg, 10, 100, "image"); //change to compost-can sprite (different dimensions)
  }
  else if (gender == 1){
    myGamePiece = new component(30, 100, teenImg, 10, 100, "image"); //change to recycle-can sprite
  }
  score = 0; // resets to 0, (reach 50 to go to next level)
  count_score += 1; // count_score shows which level
}

if (score == 50 && count_score == 1){ // second time reaching 50, changes to adult
  myGameArea.clear();
  myBackground = new component(3700, 270, "background/Adult.svg", -50, 0, "background"); //change to adult background
  myGamePiece = new component(30, 100, adultImg, 10, 100, "image");
  myObstacle = new component(100,100, "", 0, 0, "obstacle");
  score = 0; // reset level score
  count_score += 1; // go up one level
}

if (score == 50 && count_score == 2){ // resets back to baby stage
  myGameArea.clear();
  generation += 1; // completed one full round
  start += 1;
  myObstacle.speedX = -7 - (2*generation);
  myBackground.speedX = -7 - (2* generation);
  myBackground = new component(3700, 270, "background/Kid.svg", -50, 0, "background"); //change to adult background
  myGamePiece = new component(80, 100, babyImg, 10, 100, "image");
  myObstacle = new component(100,100, "", 0, 0, "obstacle");

  score = 0; //reset level score
  count_score = 0; //reset to level 0
}

  myGameArea.clear();
  myObstacle.update();
  myBackground.newPos();
  myBackground.update();
  myGamePiece.speedX= 0;
  myGamePiece.speedY= 0;


  if (myGameArea.key && myGameArea.key == 37){ //left
    myGamePiece.speedX= -4;
  }

  if (myGameArea.key && myGameArea.key== 39){ //right
    myGamePiece.speedX= 6
  }

  if (myGameArea.key && myGameArea.key == 40){ //down
    myGamePiece.speedY =10;
  }

  if( myGamePiece.y >= 130){ //up
    if (myGameArea.key && myGameArea.key == 38){
      accelerate(-0.6);
    }
  }

  if(myGamePiece.y <= 80){ //make sure it will not hover at top
    if(myGamePiece.y <= 0){
      accelerate(0.6);
    }
  }

  if (!myGameArea.key) { //doesn't accelerate if "on the floor"
    if (myGamePiece.y < myGameArea.canvas.height - myGamePiece.height- 18 && myGamePiece.y > myGameArea.canvas.height - myGamePiece.height- 22){
      accelerate(0);
    }
    else{
      accelerate(1);
    }
  }//default gravity

  var crash = myGamePiece.crashWith(myObstacle);
  if (crash == true){
    if (check == false){ //check if crashed with obstacle
      myObstacle = new component(0, 0, "", myObstacle.x, myObstacle.Y, "obstacle");
      if (gender == 0){ //compost-can
        if (count_score == 0){//kid
          if (obstacleNum == 0){//train
            score += 10;
            total_score += 10;
          }
          if (obstacleNum == 1){//doll
            score -= 10;
            total_score -= 10;
            partLives -= 1;
          }
          if (obstacleNum == 2){//legoes
            score += 10;
            total_score += 10;
          }
          if (obstacleNum == 3){//ragdoll
            score -= 10;
            total_score -=10;
            partLives -= 1;
          }
        }
        if (count_score == 1){//teen
          if (obstacleNum == 0){//weight
            score += 10;
            total_score += 10;
          }
          if (obstacleNum == 1){//videogame
            score += 10;
            total_score += 10;
          }
          if (obstacleNum == 2){//fashion
            score -= 10;
            total_score -= 10;
            partLives -= 1;
          }
          if (obstacleNum == 3){//makeup
            score -= 10;
            total_score -= 10;
            partLives -= 1;
          }
        }
        if (count_score == 2){//adult
          if (obstacleNum == 0){//family
            score += 10;
            total_score += 10;
          }
          if (obstacleNum == 1){//job
            score += 10;
            total_score += 10;
          }
          if (obstacleNum == 2){//house
            score += 10;
            total_score += 10;
          }
        }
      }
      if (gender == 1){//recycle-can
        if (count_score == 0){//kid
          if (obstacleNum == 0){//train
            score -= 10;
            total_score -= 10;
            partLives -= 1;
          }
          if (obstacleNum == 1){//doll
            score += 10;
            total_score += 10;
          }
          if (obstacleNum == 2){//legoes
            score -= 10;
            total_score -= 10;
            partLives -= 1;
          }
          if (obstacleNum == 3){//ragdoll
            score += 10;
            total_score +=10;
          }
        }
        if (count_score == 1){//teen
          if (obstacleNum == 0){//weight
            score -= 10;
            total_score -= 10;
            partLives -= 1;
          }
          if (obstacleNum == 1){//videogame
            score -= 10;
            total_score -= 10;
            partLives -= 1;
          }
          if (obstacleNum == 2){//fashion
            score += 10;
            total_score += 10;
          }
          if (obstacleNum == 3){//makeup
            score += 10;
            total_score += 10;
          }
        }
        if (count_score == 2){//adult
          if (obstacleNum == 0){//family
            score += 10;
            total_score += 10;
          }
          if (obstacleNum == 1){//job
            score -= 10;
            total_score -= 10;
            partLives -= 1;
          }
          if (obstacleNum == 2){//house
            score += 10;
            total_score += 10;
          }
        }
      }
      check = true;
    }
  }
  if (crash == false){//once not touching, then makes it possible to check if it crashes
    check = false;
  }

  if (partLives == 0){
    // if (count_score == 0){ // once reaches score of 50 (first time), changes to next state(to teen)
    //   myGameArea.clear();
    //   myBackground = new component(3700, 270, "background/Kid.svg", -50, 0, "background"); // change to teen background
    //   myObstacle = new component(100,100, "", 0, 0, "obstacle");
    // }
    //
    // if (count_score == 1){ // second time reaching 50, changes to adult
    //   myGameArea.clear();
    //   myBackground = new component(3700, 270, "background/teen.svg", -50, 0, "background"); //change to adult background
    //   myObstacle = new component(100,100, "", 0, 0, "obstacle");
    // }
    //
    // if (count_score == 2){ // resets back to baby stage
    //   myGameArea.clear();
    //   myBackground = new component(3700, 270, "background/adult.svg", -50, 0, "background"); //change to adult background
    //   myObstacle = new component(100,100, "", 0, 0, "obstacle");
    // }
    lives -= 1;
    partLives = 3;
  }

  myScore.text = "Score: " + total_score;
  myScore.update(); //display score
  myLives.text = "Lives: " + lives;
  myLives.update();
  myObstacle.newPos();
  myObstacle.update();
  myGamePiece.newPos();
  myGamePiece.update();

  if (lives <= 0){
    console.log("GAMEOVER");

    if (total_score > high_score){
      high_score = total_score;
    }

    myGameArea.stop();
    myGameArea.clear();

    total_scoreDis = new component("15px", "Consolas", "black", 395, 40, "text");
    high_scoreDis = new component("15px", "Consolas", "black", 0, 20, "text");
    generationDis = new component("15px", "Consolas", "black", 265, 20, "text");
    endShift = new component("15px", "Consolas", "white", 140, 200, "text");
    total_scoreDis.text = "Score: "+ total_score;
    high_scoreDis.text = "High score: "+ high_score;
    generationDis.text = "Generations completed: "+ generation;
    endShift.text = "Press space to restart";
    end.update();
    endShift.update();
    total_scoreDis.update();
    high_scoreDis.update();
    generationDis.update();
  }


}

function keyCode(event) { // check if press shift key to start/restart game
var x = event.keyCode;
if ( x == 16 && begin != 1){//check first space (start game)
  document.getElementById("startScreen").style.display= "none";
  document.getElementById("secondScreen").style.display= "none";
  document.getElementById("thirdScreen").style.display= "none";
  document.getElementById("fourthScreen").style.display= "none";
  document.getElementById("fifthScreen").style.display= "none";

  document.getElementById("sixthScreen").style.display= "none";
  document.getElementById("gameScreen").style.display= "block";
  begin = 1;
}


 if ( x == 39 && begin != 1){
   if (current_screen === "start") {
     document.getElementById("startScreen").style.display= "none";
     document.getElementById("secondScreen").style.display= "block";
       document.getElementById("thirdScreen").style.display= "none";
       document.getElementById("fourthScreen").style.display= "none";
       document.getElementById("fifthScreen").style.display= "none";
       document.getElementById("sixthScreen").style.display= "none";
     window.current_screen= "secondScreen"; }
   else if (current_screen === "secondScreen") {
     document.getElementById("startScreen").style.display= "none";
     document.getElementById("secondScreen").style.display= "none";
     document.getElementById("thirdScreen").style.display= "block";
       document.getElementById("fourthScreen").style.display= "none";
       document.getElementById("fifthScreen").style.display= "none";
            document.getElementById("gameScreen").style.display= "none";
            document.getElementById("sixthScreen").style.display= "none";
     window.current_screen= "thirdScreen" }
   else if (current_screen === "thirdScreen") {
     document.getElementById("startScreen").style.display= "none";
     document.getElementById("secondScreen").style.display= "none";
     document.getElementById("thirdScreen").style.display= "none";
     document.getElementById("fourthScreen").style.display= "block";
       document.getElementById("fifthScreen").style.display= "none";
            document.getElementById("gameScreen").style.display= "none";
            document.getElementById("sixthScreen").style.display= "none";
     window.current_screen= "fourthScreen"}
   else if (current_screen === "fourthScreen") {
     document.getElementById("startScreen").style.display= "none";
     document.getElementById("secondScreen").style.display= "none";
     document.getElementById("thirdScreen").style.display= "none";
     document.getElementById("fourthScreen").style.display= "none";
     document.getElementById("fifthScreen").style.display= "block";
     document.getElementById("sixthScreen").style.display= "none";
     document.getElementById("gameScreen").style.display= "none";
     window.current_screen= "fifthScreen"}
   else if (current_screen === "fifthScreen") {
     document.getElementById("startScreen").style.display= "none";
     document.getElementById("secondScreen").style.display= "none";
     document.getElementById("thirdScreen").style.display= "none";
     document.getElementById("fourthScreen").style.display= "none";
     document.getElementById("fifthScreen").style.display= "none";
     document.getElementById("gameScreen").style.display= "none";
     document.getElementById("sixthScreen").style.display= "block";
     window.current_screen = "sixthScreen";
   }
   else if (current_screen === "sixthScreen") {
     document.getElementById("startScreen").style.display= "none";
     document.getElementById("secondScreen").style.display= "none";
     document.getElementById("thirdScreen").style.display= "none";
     document.getElementById("fourthScreen").style.display= "none";
     document.getElementById("fifthScreen").style.display= "none";
     document.getElementById("gameScreen").style.display= "block";
     document.getElementById("sixthScreen").style.display= "none";
     begin = 1;
     window.current_screen = "gameScreen";
   }
 }
 if ( x == 37 && begin != 1){
   if (current_screen === "secondScreen") {
     document.getElementById("secondScreen").style.display= "none";
     document.getElementById("startScreen").style.display= "block";
     window.current_screen= "start"; }
   else if (current_screen === "thirdScreen") {
     document.getElementById("thirdScreen").style.display= "none";
     document.getElementById("secondScreen").style.display= "block";
     window.current_screen= "secondScreen" }
   else if (current_screen === "fourthScreen") {
     document.getElementById("fourthScreen").style.display= "none";
     document.getElementById("thirdScreen").style.display= "block";
     window.current_screen= "thirdScreen"}
   else if (current_screen === "fifthScreen") {
     document.getElementById("fifthScreen").style.display= "none";
     document.getElementById("fourthScreen").style.display= "block";
     window.current_screen= "fourthScreen"}
     else if (current_screen === "sixthScreen") {
       document.getElementById("sixthScreen").style.display= "none";
       document.getElementById("fifthScreen").style.display= "block";
       window.current_screen= "fifthScreen"}
 }
if ( x == 32 && count == 0 && begin == 1){//check first space (start game)

    document.getElementById("press").style.display= "none";
    count += 1;
    start = 0;
    startGame();
 }
else if (x == 32 && count != 0 && begin == 1){   //if press space again (second time pressing space), will restart
   console.log("test");
   myGameArea.stop();
   start = 0;
   startGame();
 }
// if (x == 16){
//   lives = 0;
// }
}
