// Algorithm (R-P-S)
// 1) Computer randomly selects a move
// 2) Compare the moves to get the result
// 3) Update a score
// 4) Display the result in a popup
let score = JSON.parse(localStorage.getItem("score")) || {
  wins: 0,
  losses: 0,
  ties: 0,
};

updateScoreElement();
/*
      ^^^ ^^^ ^^^
      score === null OR !score ~ Solution to null Errors
      if (!score) {
        score = {
          wins: 0,
          losses: 0,
          ties: 0,
        };
      }
      */

// setInterval() : returns a number , we can use it to stop the interval
let isAutoPlaying = false;
let intervalId;
/*
document.querySelector(".js-auto-play").addEventListener("click", () => {
  const button = document.querySelector(".auto-play-button");
  if (!isAutoPlaying) {
    autoPlay();
    button.innerHTML = "Stop Playing";
    isAutoPlaying = true;
  } else {
    clearInterval(intervalId);
    button.innerHTML = "Auto Playing";
    isAutoPlaying = false;
  }
});
*/
// const autoPlay = () =>{}
function autoPlay() {
  if (!isAutoPlaying) {
    intervalId = setInterval(() => {
      const playerMove = pickComputerMove();
      playGame(playerMove);
    }, 1000);
    isAutoPlaying = true;
  } else {
    clearInterval(intervalId);
    isAutoPlaying = false;
  }
}

// You can put this fn in the autoPlay , but I like it like this as it is seperated
function toggleAutoPlay() {
  autoPlay();
  const button = document.querySelector(".auto-play-button");
  button.innerHTML = isAutoPlaying ? "Stop Playing" : "Auto Play";
}

function toggleResetScore() {
  score.wins = 0;
  score.losses = 0;
  score.ties = 0;
  localStorage.removeItem("score");
  updateScoreElement();
}

// A helper function (it helps us reuse the
// code for hiding the confirmation message).
function hideResetConfirmation() {
  document.querySelector(".js-reset-warning").innerHTML = "";
}

function showResetConfirmation() {
  let resetHTML = "";
  const html = `<p>
      Are you sure you want to reset the score?
      <button class="js-reset-yes">Yes</button>
      <button class="js-reset-no">No</button>
    </p>`;
  resetHTML += html;

  document.querySelector(".js-reset-warning").innerHTML = resetHTML;

  document.querySelector(".js-reset-yes").addEventListener("click", () => {
    toggleResetScore();
    hideResetConfirmation();
  });

  document.querySelector(".js-reset-no").addEventListener("click", () => {
    hideResetConfirmation();
  });
}

document.querySelector(".js-rock-button").addEventListener("click", () => {
  playGame("rock");
});

document.querySelector(".js-paper-button").addEventListener("click", () => {
  playGame("paper");
});

document.querySelector(".js-scissors-button").addEventListener("click", () => {
  playGame("scissors");
});

document.querySelector(".js-auto-play").addEventListener("click", () => {
  toggleAutoPlay();
});

document.querySelector(".js-reset-score").addEventListener("click", () => {
  showResetConfirmation();
});

document.body.addEventListener("keydown", (event) => {
  if (event.key === "r") {
    playGame("rock");
  } else if (event.key === "p") {
    playGame("paper");
  } else if (event.key === "s") {
    playGame("scissors");
  } else if (event.key === "a") {
    toggleAutoPlay();
  } else if (event.key === "Backspace") {
    showResetConfirmation();
  }
});

function playGame(playerMove) {
  const computerMove = pickComputerMove();
  let result = "";
  if (playerMove === "scissors") {
    if (computerMove === "rock") {
      result = "You Lose";
    } else if (computerMove === "paper") {
      result = "You Win";
    } else if (computerMove === "scissors") {
      result = "Tie";
    }
  } else if (playerMove === "paper") {
    if (computerMove === "rock") {
      result = "You Win";
    } else if (computerMove === "paper") {
      result = "Tie";
    } else if (computerMove === "scissors") {
      result = "You Lose";
    }
  } else if (playerMove === "rock") {
    if (computerMove === "rock") {
      result = "Tie";
    } else if (computerMove === "paper") {
      result = "You Lose";
    } else if (computerMove === "scissors") {
      result = "You Win";
    }
  }

  if (result === "You Win") {
    score.wins++;
  } else if (result === "You Lose") {
    score.losses++;
  } else if (result === "Tie") {
    score.ties++;
  }

  localStorage.setItem("score", JSON.stringify(score));

  updateScoreElement();
  document.querySelector(".js-result").innerHTML = result;
  document.querySelector(
    ".js-moves"
  ).innerHTML = `You <img src="../../images/${playerMove}-emoji.png" class="move-icon" />
      <img src="../../images/${computerMove}-emoji.png" class="move-icon" />
      Computer`;
}

function updateScoreElement() {
  document.querySelector(
    ".js-score"
  ).innerHTML = `Wins: ${score.wins}, Losses: ${score.losses}, Ties: ${score.ties}`;
}

function pickComputerMove() {
  let computerMove = "";
  const randomNumber = Math.random();
  if (randomNumber >= 0 && randomNumber < 1 / 3) {
    computerMove = "rock";
  } else if (randomNumber >= 1 / 3 && randomNumber < 2 / 3) {
    computerMove = "paper";
  } else if (randomNumber >= 2 / 3 && randomNumber < 1) {
    computerMove = "scissors";
  }
  return computerMove; // returning a value from a function
}
