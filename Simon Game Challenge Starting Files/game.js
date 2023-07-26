var buttonColours = ["red", "blue", "green", "yellow"];

var gamePattern = [];
var userClickedPattern = [];



$(".btn").click(function handlerFunction(){
   var  userChosenColour  = $(this).attr("id");
   userClickedPattern.push(userChosenColour);
   playSound(userChosenColour);
   animatePress(userChosenColour);

   checkAnswer(userClickedPattern.length-1);
});

var start = false;

var Level = 0;

$(document).keypress(function(){
   if(!start){

       $("#level-title").text("Level " + Level);
       nextSequence();
       start = true;  
    }
  });

  function checkAnswer(currentLevel) {

    //ck if the most recent user answer is the same as the game pattern. If so then log "success", otherwise log "wrong".
    if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
  
      console.log("success");
  
      //4. If the user got the most recent answer right in step 3, then check that they have finished their sequence with another if statement.
      if (userClickedPattern.length === gamePattern.length){
  
        //5. Call nextSequence() after a 1000 millisecond delay.
        setTimeout(function () {
          nextSequence();
        }, 1000);
  
      }
  
    } else {
  
      console.log("wrong");
      playSound("wrong");
      $("body").addClass("game-over");
      setTimeout(() => {
        $("body").removeClass("game-over");
      },200);

     $("#level-title").text("Game Over, Press Any Key to Restart");
    startOver();
    }
  }
  

  function startOver(){
    Level = 0;
    gamePattern = [];
    start = false;

  }

function nextSequence(){
  userClickedPattern = [];

  Level++;
  $("#level-title").text("Level " + Level);

    var randomNumber = Math.floor(Math.random()*4);
    
    var randomChosenColour = buttonColours[randomNumber];
    gamePattern.push(randomChosenColour);
    

   playSound(randomChosenColour);
    $("#"+ randomChosenColour).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);
    
}


function playSound(name ){

    var audio = new Audio("sounds/"+ name+".mp3");
    audio.play();
}

function animatePress(currentColour){
  $("#" + currentColour).addClass("pressed");
  
  setTimeout(function(){
    $("#"+currentColour).removeClass("pressed");
  },100 )
  
}




