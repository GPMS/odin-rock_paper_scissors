const messages = document.querySelector("#messages");
const winsText = document.querySelector("#wins");
const lossesText = document.querySelector("#losses");
const resultText = document.querySelector("#result");
const buttons = document.querySelectorAll("button");

/**
 * Valid moves
 * @type {Array.<string>}
 */
const MOVES = ["rock", "paper", "scissors"];

/**
 * Generates a random move
 * @returns {string} the random move
 */
function getComputerSelection() {
  const randomIndex = Math.floor(Math.random() * 3);
  return MOVES[randomIndex];
}

/**
 * Check who is the winner from the given moves
 * @param {string} moveA player A move
 * @param {string} moveB player B move
 * @returns {number} 1 if A wins, 0 if B wins, -1 if tie
 */
function checkWinner(moveA, moveB) {
  if (moveA === moveB) {
    // Tie
    return -1;
  } else if (
    (moveA === "rock" && moveB === "scissors") ||
    (moveA === "scissors" && moveB === "paper") ||
    (moveA === "paper" && moveB === "rock")
  ) {
    // A wins
    return 1;
  } else {
    // B wins
    return 0;
  }
}

const MAX_SCORE = 5;
let round = 0;
let wins = 0;
let losses = 0;

/**
 * Append given message to the log
 * @param {string} message the message to log
 */
function logMessage(round, message) {
  let tag = document.createElement("p");
  tag.innerHTML = `<strong>Round ${round}:</strong> ${message}`;
  messages.appendChild(tag);

  // Keep the latest message always visible by scrolling to the bottom
  messages.scrollTop = messages.scrollHeight;
}

/**
 * Display results and end the game
 */
function gameOver() {
  // Display result
  if (wins == losses) {
    resultText.textContent = "It's a tie!";
  } else if (wins > losses) {
    resultText.textContent = "You won!";
    resultText.style.color = "green";
  } else {
    resultText.textContent = "You lost!";
    resultText.style.color = "red";
  }
  // Prevent player from continuing to play
  buttons.forEach((button) => {
    button.disabled = true;
  });
}

/**
 * Game logic
 * @param {string} playerSelection player's move
 * @param {string} computerSelection computer's move
 */
function playRound(playerSelection, computerSelection) {
  round++;
  const winner = checkWinner(playerSelection, computerSelection);
  if (winner === 1) {
    logMessage(
      round,
      `You won, ${playerSelection} beats ${computerSelection}.`
    );
    wins++;
  } else if (winner === 0) {
    logMessage(
      round,
      `You lost, ${computerSelection} beats ${playerSelection}.`
    );
    losses++;
  } else {
    logMessage(round, `It's a tie, both are ${playerSelection}.`);
  }

  // Update display
  winsText.textContent = wins;
  lossesText.textContent = losses;

  if (wins == MAX_SCORE || losses == MAX_SCORE) {
    gameOver();
  }
}

buttons.forEach((button) => {
  button.addEventListener("click", (e) => {
    const playerSelection = e.target.id;
    const computerSelection = getComputerSelection();
    playRound(playerSelection, computerSelection);
  });
});
