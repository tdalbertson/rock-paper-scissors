// Choose computer's choice at random then return the choice as a string
function getComputerChoice() {
    const choices = ["rock", "paper", "scissors"];
    switch (
        Math.floor(
            Math.random() *
                (Math.floor(3) /* Max */ - Math.ceil(1) /* Min */ + 1) +
                Math.ceil(1) /* Min */
        )
    ) {
        case 1:
            return choices[0];
        case 2:
            return choices[1];
        case 3:
            return choices[2];
    }
}

// Take choices as strings and return the results
function playRound(playerSelection, computerSelection) {
    const victories = {
        rock: ["scissors"],
        paper: ["rock"],
        scissors: ["paper"],
    };

    if (playerSelection === computerSelection) {
        return "Tie";
    } else if (victories[playerSelection].includes(computerSelection)) {
        return "Win";
    } else {
        return "Loss";
    }
}

const playerChoice = prompt(
    'Choose "Rock", "Paper" or "Scissors":'
).toLowerCase();
const computerChoice = getComputerChoice();
const result = playRound(playerChoice, computerChoice);
