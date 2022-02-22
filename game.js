//Declerations
let userClickedPattern=[];
let buttonColours=["red", "blue", "green", "yellow"];
let gamePattern=[];
let i=0;
let level=0;
let started=true;


//When Button who have .btn as class got clicked then following lines will get executed
$(".btn").click(function()
{
  var userChosenColour=$(this).attr("id");
  var flag=0;
  userClickedPattern.push(userChosenColour);
  if(gamePattern[i]===userClickedPattern[i])
  {
    playSound(userChosenColour);
    animatePress(userChosenColour);
    i++;
  }
  else
  {
    i=0;
    gamePattern=[];                 //this is because new game should be start
                                   //when user eneterd the wrong choice
    userClickedPattern=[];         //same reason applies to this as well
    document.querySelectorAll("h1")[0].innerHTML="Game Over ,Congratulations Your Score is "+(level-1);
    level=0;
    flag=1;
    document.querySelector("input").value=0;
    $("body").css("background-color","red");
    var audio=new Audio("wrong.mp3");
    audio.play();
    setTimeout(function(){
          $("body").css("background-color","#011F3F");
      }, 1000);
  }
  if(i===level && flag===0)
  {
    i=0;
    userClickedPattern=[];  //here gamePattern will not change because new
                            //level is starting not new game

    document.querySelector("input").value=level;  //on completion this level
    setTimeout(nextSequence(),1000);
  }


});


//when start OR Restart button is get tapped
$(".start").click(function()
{

  level=0;
  i=0;
  document.querySelectorAll("h1")[0].innerHTML="Game Started";
  document.querySelector("input").value=0;
  userClickedPattern=[];  //because new game should be start
  gamePattern=[];         //because new game should start
  nextSequence();

});
$(".Quit").click(function()
{
  level=0;
  i=0;
  document.querySelectorAll("h1")[0].innerHTML="Start The Game";
  document.querySelector("input").value=0;
  userClickedPattern=[];
  gamePattern=[];
});
function nextSequence()
{
  level++;
  $("#"+"level-title").text("Level "+level);
  var randomNumber=randomNumber1 = Math.floor(Math.random() * 4);
  var randomChosenColour=buttonColours[randomNumber];
  $("#"+randomChosenColour).fadeOut(100).fadeIn(100);
  var audio = new Audio(randomChosenColour+".mp3");
  audio.play();
  gamePattern.push(randomChosenColour);
}
function playSound(name)
{
  var audio = new Audio(name+".mp3");
  audio.play();
}
function animatePress(currentColour)
{
  $("#"+currentColour).addClass("pressed");
  setTimeout(function(){
        $("#"+currentColour).removeClass("pressed");
    }, 100);
}
