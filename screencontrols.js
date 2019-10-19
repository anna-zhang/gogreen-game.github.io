var startScreen = document.getElementById('startScreen')
var secondScreen = document.getElementById('secondScreen')
var thirdScreen = document.getElementById('thirdScreen')
var fourthScreen = document.getElementById('fourthScreen')
var ruleScreen = document.getElementById('ruleScreen')
var whatToCollect = document.getElementById('whatToCollect')
var gameChoice = document.getElementById('gameChoice')
var gameScreen = document.getElementById('gameScreen')
var mythScreen = document.getElementById('mythScreen')
var learnMoreScreen = document.getElementById('learnMoreScreen')
var resourceScreen = document.getElementById('resourceScreen')
var tweetScreen = document.getElementById('tweetScreen')
var quizScreen = document.getElementById('quizScreen')
var endScreen = document.getElementById('endScreen')
var i = 0;

var menuScreen = 13; //change this to the menu screen index
var screens = [startScreen, secondScreen, thirdScreen, fourthScreen, ruleScreen, whatToCollect, gameChoice, gameScreen, mythScreen, learnMoreScreen, resourceScreen, quizScreen, tweetScreen, endScreen]
console.log(screens.length)

function showMenu(screenIndex){
  if ((screenIndex==0)||((screenIndex >= 6)&&(screenIndex<13))){
    document.getElementById("bottomDiv").style.display = "block";
  }
  else {
    document.getElementById("bottomDiv").style.display = "none";
  }
}
function goToScreen(screenIndex){
  screens[i].style.display = "none";
  i = screenIndex;
  screens[i].style.display = "block";
  console.log("i is now "+i)
  showMenu(i);

}

function genRand() {
  var myths =[
    "MYTH: Plastic bags cannot be recycled. FALSE! However, because plastic bags are so light, they get tangled in the complicated recycling equipment. Tip: Instead of throwing them away, try to reuse them.",
    "MYTH: Milk cartons cannot be recycled. FALSE! Cartons can be recycled because they are mostly made of paper.",
    "MYTH: Glass and plastic can be recycled together. TRUE! The recycling factories will organize through they recycling.",
    "MYTH: Plasticware be recycled. TRUE AND FALSE! Plasticware labeled with #6 can be recycled, but most of them are not recyclable. If you do not see a number, throw it out. Better safe than sorry.",
    "MYTH: Aluminum foil can be recycled. TRUE, however, some companies don't accept aluminum foil, so try to reuse it or check with your town.",
    "MYTH: Styrofoam cups cannot be recycled. FALSE, but like aluminum foil and plasticware, some facilities do not recycle #6 plastics. Styrofoam cups also have a certain material that makes it even harder to recycle. Our suggestion is for you to check with your local recycling company.",
    "MYTH: Anything recyclable must be clean. TRUE! It is important to make sure that all recyclables do no have any food particles on them or it will damage the machines. Do not fret though; it does not have to be completely spotless.",
  ]
  var rand = myths[Math.floor(Math.random() * myths.length)];
  document.getElementById("random-fact").innerHTML = rand;
}



function start(){
  startScreen.style.display = "block";
  secondScreen.style.display = "none";
  thirdScreen.style.display = "none";
  fourthScreen.style.display = "none";
  ruleScreen.style.display = "none";
  whatToCollect.style.display = "none";
  gameChoice.style.display = "none";
  gameScreen.style.display = "none";
  mythScreen.style.display = "none";
  learnMoreScreen.style.display = "none";
  resourceScreen.style.display = "none";
  quizScreen.style.display = "none";
  tweetScreen.style.display = "none";
  endScreen.style.display = "none";
  genRand();
}

function switchScreen(event) {
  if (i+1 < screens.length && event.key == "ArrowRight"){
    console.log("index_start: " + i);
    screens[i].style.display = "none";
    i++;
    screens[i].style.display = "block";
    console.log("index_end: " + i);
    showMenu(i);
    stopGame();

  }
  if (i >= 1 && event.key == "ArrowLeft"){
    console.log("index_start: " + i);
    screens[i].style.display = "none";
    i--;
    screens[i].style.display = "block";
    console.log("index_end: " + i);
    showMenu(i);
    stopGame();
  }
  console.log("i is now "+i);

}


var current = 0;
function work() {

  var resources = [
    "Here are some tips on how use less plastic. <a href = 'http://www.greeneducationfoundation.org/nationalgreenweeksub/waste-reduction-tips/tips-to-use-less-plastic.html'>Click here</a> to learn more.",
    "Want to learn more about compost? <a href ='https://www.glad.com/teachable-trash/filter/composting/?msclkid=1a376ec706411d4da44c35aaa9052f10&utm_source=bing&utm_medium=cpc&utm_campaign=GLT_Generic_Teachable_Trash_Exact&utm_term=composter&utm_content=Composting%20Facts'> Click here</a>.",
    "There has been a debate going around about the use of plastic straws. <a href = 'https://get-green-now.com/environmental-impact-plastic-straws/'>Click here</a> if you want to learn more about the topic.",
    "Plastic bags have been an issue for a long time. <a href = 'http://www.theworldcounts.com/stories/interesting-facts-about-plastic-bags'>Here's the reason why</a>.",
    "Don't know when to throw something away or recycle? Here's a <a href = 'http://americanlifestylemag.com/culture/green-living/trash-vs-recycle-do-you-know-when-to-trash-it/'>website</a> that would really help!",
    "Still confused about why recycling is important? <a href = 'https://helpsavenature.com/why-is-recycling-important'> Click here</a> for more.",
    "<a href = 'http://www.all-recycling-facts.com/recycling-statistics.html'>Here</a> are some cool statistics about recycling.",
    "Want to learn more about about recycling plastic bottles and glass jars? This <a href = 'https://www.recyclenow.com/what-to-do-with/glass-0'>website and video</a> do an amazing job in explaining the topic.",
    "Ever heard of Lauren Singer? She has a <a href = 'https://www.youtube.com/channel/UCgjw6tZNyjR_8zIFDsIPpww'>YouTube</a> and a <a href = 'http://trashisfortossers.com/'> website.</a> She's super cool so go check her out!"
  ]
  var randIndex = Math.floor(Math.random() * (resources.length-1))
  while (randIndex == current){
    randIndex = Math.floor(Math.random() * (resources.length-1))
  }
  current = randIndex
  var rand = resources[randIndex];
  document.getElementById("random-resources").innerHTML = rand;
}
