/* 
    Game data property that contains a flag to indicate if a round has been played
    User making a choice would change the flag to a true value
    Check for this flag value after round has been played:
    If true rest of function would not execute
*/
const playerContainerChildren = document.querySelector(
    ".item-container.player"
).children;
const playerContainerLength = playerContainerChildren.length;
const computerChoiceTarget = document.querySelector(".computer-choice-target");
const playerChoiceTarget = document.querySelector(".player-choice-target");
const buttonContainer = document.querySelector(".buttons-container");
const MAX_WINS = 5;

const gameData = {
    roundPlayed: false,
    numOfWins: 0,
    numOfLosses: 0,
};

// Click event listener to initiate playing a round
for (const child of playerContainerChildren) {
    child.addEventListener("click", (event) => {
        if (!gameData.roundPlayed) {
            const choice = event.target.getAttribute("data-value");
            moveChoice(child, playerChoiceTarget);
            playRound(choice);
        }
    });
}

// Main function for each round played
function playRound(playerChoice) {
    const computerChoice = getComputerChoice();
    const computerItem = document.querySelector(
        `.computer > .${computerChoice}`
    );

    moveChoice(computerItem, computerChoiceTarget);
    compareChoices(playerChoice, computerChoice);
    gameData.roundPlayed = true;
    makeItemVisible(gameData.roundPlayed, buttonContainer);
}

// Checks if a choice is already present then "move" choice to target area
function moveChoice(item, targetArea) {
    const newItem = item.cloneNode();
    if (!targetArea.firstChild) {
        item.setAttribute("style", "visibility: hidden;");
        targetArea.append(newItem);
    }
}

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

function compareChoices(playerChoice, computerChoice) {
    const VICTORIES = {
        rock: ["scissors"],
        paper: ["rock"],
        scissors: ["paper"],
    };
    const resultText = document.querySelector(".result");

    clearTextContent(resultText);

    if (playerChoice === computerChoice) {
        resultText.innerText = "You tied!";
    } else if (VICTORIES[playerChoice].includes(computerChoice)) {
        resultText.innerText = "You won!";
        gameData.numOfWins++;
        if (gameData.numOfWins === MAX_WINS) {
            console.log("You won the game!");
        }
    } else {
        resultText.innerText = "You lost!";
        gameData.numOfLosses++;
    }
}

function clearTextContent() {
    const resultText = document.querySelector(".result");
    if (resultText.innerText.length > 0) {
        resultText.innerText = "";
    }
}

function makeItemVisible(gameStatus, item) {
    if(gameStatus) {
        item.style.visibility = "visible";
    }
}

