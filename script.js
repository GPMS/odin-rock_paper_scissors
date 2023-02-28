const messages = document.querySelector("#messages");
const winsText = document.querySelector("#wins");
const lossesText = document.querySelector("#losses");
const resultText = document.querySelector("#result");
const buttons = document.querySelectorAll("button")

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
    const randomMove = Math.floor(Math.random() * 3);
    return MOVES[randomMove];
}

/**
 * Check who is the winner from the given moves
 * @param {string} moveA player A move
 * @param {string} moveB player B move
 * @returns {number} 1 if A wins, 0 if B wins, -1 if tie
 */
function getWinner(moveA, moveB) {
    // Rock win
    if (moveA === "rock" && moveB === "scissors")
        return 1;
    if (moveA === "scissors" && moveB === "rock")
        return 0;
    // Scissors win
    if (moveA === "scissors" && moveB === "paper")
        return 1;
    if (moveA === "paper" && moveB === "scissors")
        return 0;
    // Paper win
    if (moveA === "paper" && moveB === "rock")
        return 1;
    if (moveA === "rock" && moveB === "paper")
        return 0;
    // Tie
    if (moveA === moveB)
        return -1;
}

const MAX_SCORE = 5;
let round = 0;
let wins = 0;
let losses = 0;

/**
 * Append given message to the log
 * @param {string} message the message to log
 */
function logMessage(message) {
    let tag = document.createElement("p");
    tag.innerHTML = message;
    messages.appendChild(tag);

    // Keep the latest message always visible by scrolling to the bottom
    messages.scrollTop = messages.scrollHeight;
}

/**
 * Update the display at the top with the correct number of wins/losses
 */
function updateDisplay() {
    winsText.textContent = wins;
    lossesText.textContent = losses;
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
        resultText.style.color = "blue";
    } else {
        resultText.textContent = "You lose!";
        resultText.style.color = "red";
    }
    // Prevent player from continuing to play
    buttons.forEach(button => {
        button.disabled = true;
    })
}

/**
 * Game logic
 * @param {string} playerSelection player's move
 * @param {string} computerSelection computer's move
 */
function playRound(playerSelection, computerSelection) {
    round++;
    const winner = getWinner(playerSelection, computerSelection);
    if (winner === 1) {
        logMessage(`<strong>#${round}</strong> Computer used ${computerSelection}... You won!`);
        wins++;
    } else if (winner === 0) {
        logMessage(`<strong>#${round}</strong> Computer used ${computerSelection}... You lose!`);
        losses++;
    } else {
        logMessage(`<strong>#${round}</strong> It's a tie!`);
    }
    updateDisplay();

    if (wins == MAX_SCORE || losses == MAX_SCORE) {
        gameOver();
    }
}

buttons.forEach(button => {
    button.addEventListener("click", e => {
        const playerSelection = e.target.id;
        const computerSelection = getComputerSelection();
        playRound(playerSelection, computerSelection);
    })
});

// Set up display for the first round
updateDisplay();