var myCompostCanvas = document.getElementById('myCompostCanvas');
var ctx = myCompostCanvas.getContext('2d');
var gameRunning = false;
var scorePath;

function addNewHighscore(newHighscore){
  firebase.database(scorePath).ref().set(newHighscore);
}

function setHighnumberDiv(){
  firebase.database().ref(scorePath).once('value').then(function(snapshot) {
    var highscore = (snapshot.val());
    document.getElementById("highnumber").innerHTML = highscore
  });
}

var can = "Images/green-soda-can.png"
var recycle_bin = "Images/recycle-bin.png"
var apple = "Images/apple.png"
var newspaper = "Images/newspaper.png"

var item1 = {}
var item2 = {}
var item3 = {}
var bin = {}

var compostscore = 0
var fallInterval
var mySoundCompostRight

var sourceList = [[can,30,50,true],[apple, 40,40, false], [newspaper, 50, 40, true]]
var itemList = [bin, item1, item2, item3]


function getRandomArbitrary(min, max) {
    return Math.random() * (max - min) + min;
}

function createItems(){
  console.log("creating items");
  for(var j = 0; j < itemList.length; j++){
    if(j == 0){ //the recycling bin
      itemList[j].x = 188;
      itemList[j].y = 380;
      itemList[j].width = 80;
      itemList[j].height = 100;
      itemList[j].src = recycle_bin;
    } else {
      itemList[j].x = getRandomArbitrary(5, 350);
      itemList[j].y = getRandomArbitrary(-300, 0)
      itemList[j].src = sourceList[j-1][0]
      itemList[j].width = sourceList[j-1][1]
      itemList[j].height = sourceList[j-1][2]
      itemList[j].good = sourceList[j-1][3]
    }
    console.log(itemList[j].x)
    var img = new Image();
    img.src = itemList[j].src;
    img.onload = function(){
      ctx.drawImage(img, 20, 20, 0, 0);
    }
    itemList[j].image = img;
  }

}

function drawItems(){
  console.log("drawing items")
  ctx.clearRect(0, 0, myCanvas.width, myCanvas.height);
  for(var j=0; j < itemList.length; j++){
    ctx.drawImage(itemList[j].image, itemList[j].x, itemList[j].y, itemList[j].width, itemList[j].height);
  }
  document.getElementById("compostnumber").innerHTML = compostscore;
}

function move(event){
  if (event.which == 32){
    console.log("space")
    event.preventDefault();
  }
  if (gameRunning == true){
    if(event.key == "d" && bin.x<285){
        bin.x+=10;
    }
    if(event.key == "a" && bin.x>13){
        bin.x-=10;
    }
    drawItems();
  }
}

function fallingItems(){
  for(var j=1; j < itemList.length; j++){ //generates random position of the item to restart at the top when they fall off the screen
    if(itemList[j].y>500){ //checks to see if the item has already fallen to the bottom and off the screen
      itemList[j].x = getRandomArbitrary(5, 350); //generates random x position to restart
      itemList[j].y = getRandomArbitrary(-300, 0); //generates random y position to restart
    }
    else{
      if(itemList[j].y>=400 && (itemList[j].y <= (itemList[j].y + itemList[0].height))){ //determines whether or not the item is in the height range of the bin
        if(((itemList[j].x + itemList[j].width - 5)>=(itemList[0].x))&& ((itemList[j].x + 5)<=(itemList[0].x + itemList[0].width))){ //checks to see if the item is in the bin (same x and y coordinates)
          if(sourceList[j-1][3] == true){ //if the item is in the bin and it is the correct item, it increases score by 10 and restarts the item at the top
              score +=10;
              itemList[j].x = getRandomArbitrary(5, 350);
              itemList[j].y = getRandomArbitrary(-300, 0);
              mySoundCompostRight.play();}
          else{ //the item is not correct, decreases score by 10 and restarts the items at the top
              score -=10;
              itemList[j].x = getRandomArbitrary(5, 370);
              itemList[j].y = getRandomArbitrary(-300, 0);
              mySoundCompostWrong.play();
          }
        }
        else{ // item keeps falling
          itemList[j].y +=10;
        }
      }
      else{ // item keeps falling
        itemList[j].y +=10;
      }
    }
  }
  drawItems();
  // setTimeout(fallingItems,100)
  }

var interval;
function startTimer(duration, display) {
    var timer = duration, minutes, seconds;
    interval = setInterval(function () {
        console.log(timer)
        minutes = parseInt(timer / 60, 10)
        seconds = parseInt(timer % 60, 10);

        minutes = minutes < 10 ? "0" + minutes : minutes;
        seconds = seconds < 10 ? "0" + seconds : seconds;

        display.textContent = minutes + ":" + seconds;

        if (--timer < 0) {
            stopGame();
        }
    }, 1000);
}

function stopGame(){
  gameRunning = false;
  clearInterval(fallInterval);
  clearInterval(interval);// timer = duration;
  if (score > Number(document.getElementById("highnumber").innerHTML)){
    addNewHighscore(score);
    alert("You got a new high score!");
    setHighnumberDiv();
  }
  document.getElementById('music').pause();
}

//Start game should run when you click space bar. FIX THIS!!!!!!!

function sound(src) {
    this.sound = document.createElement("audio");
    this.sound.src = src;
    this.sound.setAttribute("preload", "auto");
    this.sound.setAttribute("controls", "none");
    this.sound.style.display = "none";
    document.body.appendChild(this.sound);
    this.play = function(){
        this.sound.play();
    }
    this.stop = function(){
        this.sound.pause();
    }
}


function backgroundSound(){
    document.getElementById('music').play();
}



function startGameCompost(){
  compostscore = 0;
  document.getElementById("time").innerHTML = "01:00"
  gameRunning = true;
  createItems();
  document.onkeydown = move;
  drawItems();
  var oneMinute = 60 * 1,
  display = document.querySelector('#time');
  startTimer(oneMinute, display);
  fallInterval = setInterval(fallingItems,100);
  mySoundCompostRight = new sound("Audio/Aluminum_Can_Crunch.mp3");
  mySoundCompostWrong = new sound("Audio/Cartoon_Ringing_Hit.mp3");
  backgroundSound();
}

document.getElementById("compostnumber").innerHTML = compostscore;
document.getElementById("time").innerHTML = "01:00"
setHighnumberDiv();
