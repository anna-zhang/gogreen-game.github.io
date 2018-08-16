var myCanvas = document.getElementById('myCanvas');

var myRecycle = new component(80, 100, "Images/recycle-bin.png", 200, 380);
var mySoda = new component(40, 70, "Images/green-soda-can.png",100,300);

var myGameArea = {
    canvas : myCanvas,
    start : function() {
        this.canvas.width = 375;
        this.canvas.height = 500;
        this.context = myCanvas.getContext('2d');
        this.interval = setInterval(updateGameArea, 20);
    },
    clear : function() {
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    },
    stop : function() {
      clearInterval(this.interval)
    }
}


myGameArea.start();



function component(width, height, src, x, y) {
    this.width = width;
    this.height = height;
    this.x = x;
    this.y = y;
    this.image = new Image();
    this.image.src = src;

    this.update = function(){
            ctx = myGameArea.context;
            ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
    }
    this.move = function(amount){
            this.x += amount;
    }

    this.fall = function(amount) {
        this.y += amount;

        if (this.y > myGameArea.canvas.height) {
          this.y = 0
        }
    }
}

function updateGameArea() {
    myGameArea.clear();
    mySoda.update();
    myRecycle.update();
}

function playGame(event){
  setInterval( function () {

    if(event.key == "d" && myRecycle.x<285){
        myRecycle.move(10)
    }
    if(event.key == "a" && myRecycle.x>13){
        myRecycle.move(-10)
    }

    mySoda.fall(10);


    updateGameArea();
  }

  ,1000)}

document.onkeydown = playGame;
