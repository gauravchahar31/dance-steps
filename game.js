let buttonColours = ["red", "blue", "green", "yellow"];
let gamePattern = [];
let userPattern = [];
let level = 0, started = false;

$(document).keypress(function() {
    if (!started) {
      $("#topHeading").text("Level " + level);
      nextSequence();
      started = true;
    }
});

function nextSequence() {
    userPattern = [];
    level++;
    $("#topHeading").text("Level " + level);
    var randomNumber = Math.floor(Math.random() * 4);
    var randomChosenColour = buttonColours[randomNumber];
    gamePattern.push(randomChosenColour);
    $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
    playSound(randomChosenColour);
}

$(".btn").click(function() {
    var userChosenColour = $(this).attr("id");
    userPattern.push(userChosenColour);
  
    playSound(userChosenColour);
    animatePress(userChosenColour);
    checkAnswer(userPattern.length-1);
});

function playSound(name) {
    var audio = new Audio("assets/" + name + ".mp3");
    audio.play();
}

function animatePress(currentColor) {
    $("#" + currentColor).addClass("pressed");
    setTimeout(function () {
      $("#" + currentColor).removeClass("pressed");
    }, 100);
}

function checkAnswer(currentLevel) {
    if (gamePattern[currentLevel] === userPattern[currentLevel]) {
      if (userPattern.length === gamePattern.length){
        setTimeout(function () {
          nextSequence();
        }, 1000);
      }
    } 
    else {
      playSound("wrong");
      $("body").addClass("game-over");
      $("#topHeading").text("Game Over, Press Any Key to Restart");

      setTimeout(function () {
        $("body").removeClass("game-over");
      }, 200);

      startOver();
    }
}

function startOver() {
    level = 0;
    gamePattern = [];
    started = false;
}
  

