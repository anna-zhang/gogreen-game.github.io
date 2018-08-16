var sodaCanvas = document.getElementById('sodaCanvas');
var sodaContext = sodaCanvas.getContext('2d');
sodaCanvas.width = 375;
sodaCanvas.height = 300;

var canCanvas = document.getElementById('canCanvas');
var canContext = canCanvas.getContext('2d');
canCanvas.width = 375;
canCanvas.height = 200;

var xpos = 145;

// function getRandomIntInclusive(min, max) {
//   min = Math.ceil(min);
//   max = Math.floor(max);
//   return Math.floor(Math.random() * (max - min + 1)) + min; //The maximum is inclusive and the minimum is inclusive
// }
var img = new Image();
img.src = "Images/recycle-bin.png"
img.onload = function(){
  canContext.drawImage(img, xpos, 100, 20, 20);
//  canContext.drawImage(img, xpos, 80, 80, 100);

}

var xpos_soda;
var ypos_soda;
var sodaCan = new Image();
sodaCan.src = "Images/green-soda-can.png"
sodaCan.onload = function(){
  // xpos_soda = getRandomIntInclusive(13, 285);
  // ypos_soda = getRandomIntInclusive(20, 380)
  //context.drawImage(sodaCan, 200, 380, 20, 20);
  sodaContext.drawImage(sodaCan, 200, 180, 80, 100);
  // console.log("print")
}

function test(event){
  console.log("moving");
}
function move(event){
  if(event.key == "d" && xpos<285){
      xpos = xpos+10;
  }
  if(event.key == "a" && xpos>13){
      xpos = xpos-10;
  }
  canCanvas.width = canCanvas.width;
  // context.drawImage(sodaCan, 200, 380, 80, 100);

  canContext.drawImage(img, xpos, 100, 80, 100);

  console.log("Position:", xpos);
}
document.onkeydown = move;
