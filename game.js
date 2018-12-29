var level = 0;

var pointsCounter = 0;

var arrOfVisibleHoles = []; //the beaver holes that are visible

var arrOfBeaverAppearance = []; // the holes in which is the beaver appears

var arrOfuserClickedBtn = []; // the holes that the user has clickec on

var arrtimeOutMs = [2500, 2300, 2100, 1900, 1700, 1500, 1300]; // idle time, after which game auto ends.

var arrOfBeaverAppearanceTime = []; // time at which beaver has appeared

var arrOfUserClickedTimeMs = []; // time at which user has clicked on holes

var timer; // the timer in the console

// to start the game - press any key. k = number of keypresses on a game.
var k = 0;
$(document).keypress(function() {
  k = k + 1;
  if (k === 1) {
    console.log(k);

    startOfLevel();
    console.log(level);
    callBeaver(arrOfVisibleHoles);
  }
});


// getting x number of holes to appear on the page.
// Function startOfLevel() returns an array of visible hole classes - level 1
function startOfLevel() {

  // creating an array of all the holes.
  var arrOfHoles = [];
  for (var h = 0; h < 16; h++) {
    arrOfHoles.push(h);
  }

  level = level + 1;
  console.log(level);
  $("h1").text("Level " + level).removeClass("lose win"); //css("color", "#FEF2BF")

  for (var i = 0; i < (level + 3); i++) {
    var holeChosen = randomNumber(arrOfHoles.length); // random number bet 0 - 15
    var idOfHole = "col-" + arrOfHoles[holeChosen]; // taking a number from the arrOfHoles.
    arrOfHoles.splice(holeChosen, 1);
    console.log(arrOfHoles);
    arrOfVisibleHoles.push(idOfHole);
    $("#" + idOfHole).addClass("visible-btn");
  }
  console.log(arrOfVisibleHoles); // e.g ["col-1", "col-15"]

  timer = setTimeout(timeUp, arrtimeOutMs[level-1]); // for the first time the beaver comes up.
  console.log(timer);

  // re-setting the points to 0 once it goes back to level 1.
  if (level === 1) {
    resetPoints();
    console.log("i've reset the points");
  }
}


// making the beaver appear in one of the Visible holes for 2 seconds.
// Function callBeaver(input = array of the visible holes) will get beaver to appear in one of the visible holes. returns a string.
function callBeaver(array) {

  var beaverAppearances = Math.floor(array.length * Math.random());
  var idOfBeaverAppearance = array[beaverAppearances]; //e.g "col-1"
  arrOfBeaverAppearance.push(idOfBeaverAppearance);
  console.log(arrOfBeaverAppearance);
  $("#" + idOfBeaverAppearance).append($("img"));

  console.log(level);
  var peepTime = (arrtimeOutMs[level-1]-100)/2;
  console.log(peepTime);
  $(".img").delay(peepTime).show(0).delay(peepTime).fadeOut(100);
  //return classOfBeaverAppearance;

  var startTime = new Date();
  arrOfBeaverAppearanceTime.push(startTime.getTime());
  console.log(arrOfBeaverAppearanceTime);

}


// once a click is detected, capture the clicked class & time, and check if class is correct.
$(".btn").on("click", function() {

  var userClickedBtnClass = ($(this).attr("id")); // i get a string of "btn col-1". Sliced it to just "col-1"
  arrOfuserClickedBtn.push(userClickedBtnClass);
  console.log(arrOfuserClickedBtn);

  var clickTime = new Date();
  arrOfUserClickedTimeMs.push(clickTime.getTime());
  console.log(arrOfUserClickedTimeMs);

  checkAnswer(arrOfuserClickedBtn.length - 1);

});

// checks for 1. whether there's a click, 2. whether timing is <timeOutMs and 3. whether hole is correct
function checkAnswer(currentIndex) {

  var timeDiff = arrOfUserClickedTimeMs[currentIndex] - arrOfBeaverAppearanceTime[currentIndex];
  console.log(timeDiff);

  if (arrOfBeaverAppearance[currentIndex] === arrOfuserClickedBtn[currentIndex]) { //&& timeDiff < arrtimeOutMs[0]
    $(".img").finish();
    pointsCounter = pointsCounter + 1;
    $("#points-counter").text("Beavers Whacked: " + pointsCounter);

    clearTimeout(timer);
    console.log(timer);
    timer = setTimeout(timeUp, arrtimeOutMs[level-1]);
    console.log(timer);

    if (pointsCounter === 5 || pointsCounter === 10 || pointsCounter === 15 || pointsCounter === 20 || pointsCounter === 25 || pointsCounter === 30 || pointsCounter === 35) {
      startOfNextLevel();
      clearTimeout(timer);
    } else {
      callBeaver(arrOfVisibleHoles);
    }


  } else {
    console.log("fail");
    $("h1").text("Gameover. Press any key to restart.").addClass("lose");
    // $("h1").css("color", "red");

    clearTimeout(timer);

    startOver();
  }
}


function startOfNextLevel() {

  k = 0;
  console.log(level);
  $("h1").text("Level " + level + " completed. Press any key to level up!").addClass("win"); //css("color", "green")
  $(".btn").removeClass("visible-btn");
  arrOfVisibleHoles.length = 0;
  arrOfBeaverAppearance.length = 0;
  arrOfuserClickedBtn.length = 0;
  arrOfUserClickedTimeMs.length = 0;
  arrOfBeaverAppearanceTime.length = 0;

}

// this function will end game if no click is detected within timeOutMs (2500ms)
function timeUp() {
  console.log("Time up");
  $("h1").text("Time's Up. Press any key to restart.").addClass("lose"); //css("color", "red")
  startOver();
}



// generates random numbers from 0-15 // positions of the numbers.
function randomNumber(arrOfHolesLength) {
  return Math.floor(arrOfHolesLength * Math.random());
}


// to start over
function startOver() {
  k = 0;
  level = 0;
  $(".btn").removeClass("visible-btn");
  arrOfVisibleHoles.length = 0;
  arrOfBeaverAppearance.length = 0;
  arrOfuserClickedBtn.length = 0;
  arrOfUserClickedTimeMs.length = 0;
  arrOfBeaverAppearanceTime.length = 0;
}

function resetPoints () {
  pointsCounter = 0;
  $("#points-counter").text("Beavers Whacked: " + pointsCounter);
}
