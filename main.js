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

// Take choices as strings and print the results
function playRound(playerChoice, computerSelection) {
    let playerSelection = playerChoice;
    let computerChoice = computerSelection();

    // Winning combination values
    const victories = {
        rock: ["scissors"],
        paper: ["rock"],
        scissors: ["paper"],
    };

    if (playerSelection === computerChoice) {
        console.log(
            `Player: ${playerSelection}\nComputer: ${computerChoice}\nTie`
        );
    } else if (victories[playerSelection].includes(computerChoice)) {
        console.log(
            `Player: ${playerSelection}\nComputer: ${computerChoice}\nWin`
        );
        numOfWins++;
        if (numOfWins == 5) {
            console.log("You won!");
        }
    } else {
        console.log(
            `Player: ${playerSelection}\nComputer: ${computerChoice}\nLoss`
        );
    }
}

function movePlayerChoice(playerItem, targetArea) {
    const newItem = playerItem.cloneNode();
    if (!targetArea.firstChild) {
        playerItem.setAttribute(
            "style",
            'visibility: hidden;'
        );
        targetArea.append(newItem);
    }
}

// Play round when user clicks on rock, paper, or scissors icon
const playerContainerItems = document.querySelector(".item-container.player");
const playerChoiceTarget = document.querySelector('.player-choice-target');
let numOfWins = 0;
let playerContainerObject = {};

for (let i = 0; i < playerContainerItems.children.length; i++) {
    playerContainerItems.children[i].addEventListener("click", (event) => {
        const choice = event.target.getAttribute("data-value");
        playRound(choice, getComputerChoice);
        movePlayerChoice(playerContainerItems.children[i], playerChoiceTarget);
    });
}
