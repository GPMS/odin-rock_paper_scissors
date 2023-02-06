/**
 * Valid moves
 * @type {Array.<string>}
 */
const MOVES = [ "rock", "paper", "scissors" ];

/**
 * Generates a random move
 * @returns {string} the random move
 */
function getComputerChoice() {
    const randomMove = Math.floor(Math.random() * 3);
    return MOVES[randomMove];
}

/**
 * Prompts the player for a valid move
 * @returns {string} the player move
 */
function getPlayerChoice() {
    let isValidMove = false;
    while (!isValidMove) {
        playerSelection = prompt("What's your move?", "rock");
        if (playerSelection) {
            playerSelection = playerSelection.toLowerCase();
            if (MOVES.includes(playerSelection))
                isValidMove = true;
        }
        if (!isValidMove) {
            console.log("Invalid move, choose again...");
        }
    }
    return playerSelection;
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
    if (moveA === moveB)
        return -1;
}

/**
 * Check who is the winner and logs a message with the result
 * @param {string} playerSelection player's move
 * @param {string} computerSelection computer's move
 */
function playRound(playerSelection, computerSelection) {
    const winner = getWinner(playerSelection, computerSelection);
    if (winner === 1) {
        console.log(`Computer used ${computerSelection}... You won!`)
    }
    else if (winner === 0) {
        console.log(`Computer used ${computerSelection}... You lose!`)
    }
    else {
        console.log("It's a tie!")
    }
}

playerSelection = getPlayerChoice();
computerSelection = getComputerChoice();
playRound(playerSelection, computerSelection);
