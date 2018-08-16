var startScreen = document.getElementById('startScreen')
var secondScreen = document.getElementById('secondScreen')
var thirdScreen = document.getElementById('thirdScreen')
var i = 0;

var screens = [startScreen, secondScreen, thirdScreen]
function start(){
  startScreen.style.display = "block";
  secondScreen.style.display = "none";
  thirdScreen.style.display = "none";
}
function switchScreen(event) {
  if (i+1 < screens.length && event.key == "ArrowRight"){
    console.log("index_start: " + i);
    screens[i].style.display = "none";
    i++;
    screens[i].style.display = "block";
    console.log("index_end: " + i);
  }
  if (i >= 1 && event.key == "ArrowLeft"){
    console.log("index_start: " + i);
    screens[i].style.display = "none";
    i--;
    screens[i].style.display = "block";
    console.log("index_end: " + i);
  }
 }
