// Choose computer's choice at random then return the choice as a string
function getComputerChoice() {
    const CHOICES = ["rock", "paper", "scissors"];
    const MAX_VALUE = Math.floor(3);
    const MIN_VALUE = Math.ceil(1);

    switch (
        Math.floor(Math.random() * (MAX_VALUE - MIN_VALUE + 1) + MIN_VALUE)
    ) {
        case 1:
            return CHOICES[0];
        case 2:
            return CHOICES[1];
        case 3:
            return CHOICES[2];
    }
}

function playRound(choice) {
    const VICTORIES = {
        rock: ["scissors"],
        paper: ["rock"],
        scissors: ["paper"],
    };
    const result = document.querySelector(".result");
    let computerChoice = getComputerChoice();
    let computerItem = document.querySelector(`.computer > .${computerChoice}`);

    moveChoice(computerItem, computerChoiceTarget);

    if (choice === computerChoice) {
        result.textContent = "You tied!";
    } else if (VICTORIES[choice].includes(computerChoice)) {
        result.textContent = "You won!";
        numOfWins++;
        if (numOfWins == MAX_WINS) {
            console.log("You won the game!");
        }
    } else {
        result.textContent = "You lost!";
    }
}

// Checks if a choice is already present then "move" choice to target area
function moveChoice(item, targetArea) {
    const newItem = item.cloneNode();
    if (!targetArea.firstChild) {
        item.setAttribute("style", "visibility: hidden;");
        targetArea.append(newItem);
    }
}

const playerContainer = document.querySelector(".item-container.player");
const playerContainerLength = playerContainer.children.length;
const computerChoiceTarget = document.querySelector(".computer-choice-target");
const playerChoiceTarget = document.querySelector(".player-choice-target");
const MAX_WINS = 5;
let numOfWins = 0;

// Play round when user clicks on rock, paper, or scissors icon
for (let i = 0; i < playerContainerLength; i++) {
    playerContainer.children[i].addEventListener("click", (event) => {
        const choice = event.target.getAttribute("data-value");
        moveChoice(playerContainer.children[i], playerChoiceTarget);
        playRound(choice);
    });
}
