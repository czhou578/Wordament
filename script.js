const timerElement = document.getElementById('timer');
const starting = 3;
//const starting = 1;
let time = starting * 60; //seconds
//let time = starting * 10;

function update() { //update the clock
  const minutes = Math.floor(time / 60);
  let seconds = time % 60;
  if (seconds == 0) {
    timerElement.innerHTML = `${minutes}:${0}${0}`;
  } else if (seconds < 10 && seconds > 0) {
    timerElement.innerHTML = `${minutes}:${0}${seconds}`;
  } 
  else {
    timerElement.innerHTML = `${minutes}:${seconds}`;
    seconds = seconds < 10 ? "10" + seconds : seconds;
  }

  if (minutes < 0) {
    timerElement.innerHTML = "Time's Up!";
  }
  time--;
}

var board = document.getElementById("board");
var letterSquares = board.getElementsByTagName('div'); //div elements
var arrayOfGenLetters = Array.prototype.slice.call(letterSquares); //array of div elements
var vowelString = "aeiou".toUpperCase();
var consonantString = "bcdfghjklmnpqrstvwxyz".toUpperCase();

function letterGenerator() { //generate the letters
  
  const vowelDivInt = new Set(); //unique set representing divs
  
  while (vowelDivInt.size != 8) { //determines which number div will receive vowel value
    vowelDivInt.add(Math.floor(Math.random() * 16));
  }
  
  for (let i = 0; i < arrayOfGenLetters.length; i++) {
    let result = '';
    for (let j = 0; j < vowelDivInt.size; j++) {
      if (vowelDivInt.has(i)) {
        result = vowelString.charAt(Math.floor(Math.random() * 5)).toString();
        arrayOfGenLetters[i].innerHTML = result;
        
      } else {
        result = consonantString.charAt(Math.floor(Math.random() * 20)).toString();
        arrayOfGenLetters[i].innerHTML = result;        
      }
    }
  }
}

letterGenerator();

var isLoaded = false;
var loadedWordString = "";
var arrayWords;
function loadWord() { //loads the word bank file into the program
  document.getElementById('inputFile').addEventListener('change', function() {
    var reader = new FileReader();
    reader.readAsText(this.files[0]);
    isLoaded = true;
    
    reader.onload = function() {
      let temp = reader.result;
      arrayWords = temp.split('\n'); //array of words!
      loadedWordString = arrayWords.toString().toUpperCase();
      console.log(loadedWordString); //converts it into a string
    }
    setInterval(update, 1000);
  })
}

loadWord();

var square = document.getElementsByClassName('wordsquare');
var board = document.getElementById("board");
var page = document.getElementById("page");
var scoring = document.getElementById('score');
var mousedown;
var selectedLetters = new Array(16);
let squaresUsed = 0;
var score = 0;

page.onmouseleave = leftBoard;

function leftBoard() {
  for (let i = 0; i < squaresUsed; i++) {
    selectedLetters[i].style.backgroundColor = "lightgreen";
  } 
  squaresUsed = 0;
  mousedown = false;
}

board.onmouseup  = touchedBoard;

function touchedBoard() {
  for (let i = 0; i < squaresUsed; i++) {
    selectedLetters[i].style.backgroundColor = "lightgreen";
  }
  squaresUsed = 0;
  mousedown = false;
}

function allGreen() { //utility function
  for (let j = 0; j < squaresUsed; j++) {
    selectedLetters[j].style.backgroundColor = "lightgreen";
  }
}

function resultWordString() {
  var resultStr = "";
  for (let i = 0; i < squaresUsed; i++) {
    resultStr += selectedLetters[i].innerHTML;
  }
  console.log(resultStr)
  return resultStr;
}

//mouse events start here
for (let i = 0; i < square.length; i++) {
  
  square[i].addEventListener("mousedown", function(e) {
    mousedown = true;
    e.preventDefault();
    square[i].style.backgroundColor = "orange";
    selectedLetters[0] = square[i];
    //console.log(square[i].innerHTML);
    squaresUsed++;
    
  });

  square[i].addEventListener("mouseover", function(e) {
    if (mousedown == true) {
      square[i].style.backgroundColor = "orange";
      if (e.target.nodeName == "DIV") {
        //console.log(e.target.innerHTML);
        selectedLetters[squaresUsed] = e.target;
        squaresUsed++;
      }
    }
  });
  
  square[i].addEventListener("mouseup", function(e) {
    mousedown = false;
    
    if (e.target.id != "board" && e.target.nodeName != "DIV") { //needds fix
      for (let i = 0; i < squaresUsed; i++) {
        //console.log(selectedLetters[i].innerHTML);
        selectedLetters[i].style.backgroundColor = "lightgreen";
      } 
    }
    
    if (isLoaded == false) {
      allGreen();

    } else if (loadedWordString.includes(resultWordString())) { //fix later
      //console.log(selectedLetters.join())

      if (squaresUsed == 1) {
        squaresUsed = 0;
        selectedLetters[0].style.backgroundColor = "lightgreen";
      }

      for (let i = 0; i < squaresUsed; i++) { //process the words here
        if (vowelString.includes(selectedLetters[i].innerHTML)) {
          score += 3;
        } else if (consonantString.includes(selectedLetters[i].innerHTML)) {
          score += 6;
        }
        scoring.innerHTML = score;
        selectedLetters[i].style.backgroundColor = "lightgreen";
      } 

    } else if (!loadedWordString.includes(selectedLetters.join())) {
      allGreen();
    }
    squaresUsed = 0;

  });
  selectedLetters = [];
}


