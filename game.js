/* Definição das variáveis */

var buttonColours = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];
var level = 0;
var started = 0;

$(document).on("keydown", function () {
  if (started !== 1) nextSequence();
});

// captando e salvando botão clicado pelo usuário

$(".btn").on("click", function (e) {
  var userChosenColour = e.target.id;
  userClickedPattern.push(userChosenColour);
  playSound(userChosenColour);
  animatePress(userChosenColour);
  checkAnswer(userClickedPattern.length - 1);
});

/* Função responsável por tocar gerar nova sequência e captar input do usuário */

function nextSequence() {
  //Mudando texto do h1 referente ao nível e controlando variável nível
  started = 1;
  level++;
  $("h1").text("Level " + level);

  // Resetando userClickedPattern
  userClickedPattern = [];

  // gerando número aleatório entre 0 e 3

  randomNumber = Math.random() * 4;
  randomNumber = Math.floor(randomNumber);

  // definindo a cor com base no número gerado

  var randomChosenColour = buttonColours[randomNumber];
  gamePattern.push(randomChosenColour);

  // tocando áudio da cor

  playSound(randomChosenColour);

  // piscando o botão da cor

  $("#" + randomChosenColour)
    .fadeOut(100)
    .fadeIn(100);

  // Verifica se a resposta está correta
}

/* Função responsável por tocar o áudio dependendo da cor */

function playSound(name) {
  switch (name) {
    case "green":
      var audio = new Audio("sounds/green.mp3");
      audio.play();
      break;
    case "red":
      var audio = new Audio("sounds/red.mp3");
      audio.play();
      break;
    case "yellow":
      var audio = new Audio("sounds/yellow.mp3");
      audio.play();
      break;
    case "blue":
      var audio = new Audio("sounds/blue.mp3");
      audio.play();
      break;
    case "wrong":
      var audio = new Audio("sounds/wrong.mp3");
      audio.play();
      break;
    default:
      nextSequence();
      break;
  }
}

function animatePress(currentColour) {
  $("#" + currentColour).addClass("pressed");

  setTimeout(function () {
    $("#" + currentColour).removeClass("pressed");
  }, 100);
}

function checkAnswer(currentLevel) {
  if (userClickedPattern[currentLevel] === gamePattern[currentLevel]) {
    console.log("Success!");
    if (userClickedPattern.length === gamePattern.length) {
      setTimeout(function () {
        nextSequence();
      }, 1000);
    }
  } else {
    playSound("wrong");
    $("body").addClass("game-over");
    setTimeout(function () {
      $("body").removeClass("game-over");
    }, 200);
    $("h1").text("Game Over, Press Any Key to Restart");
    startOver();
  }
}

function startOver() {
  level = 0;
  gamePattern = [];
  started = 0;
}
