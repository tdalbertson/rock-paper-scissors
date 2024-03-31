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

function playRound(playerChoice) {
    const computerChoice = getComputerChoice();
    const computerItem = document.querySelector(`.computer > .${computerChoice}`);

    moveChoice(computerItem, computerChoiceTarget);
    compareChoices(playerChoice, computerChoice);
}

// Checks if a choice is already present then "move" choice to target area
function moveChoice(item, targetArea) {
    const newItem = item.cloneNode();
    if (!targetArea.firstChild) {
        item.setAttribute("style", "visibility: hidden;");
        targetArea.append(newItem);
    }
}

/* 
    Game data property that contains a flag to indicate if a round has been played
    User making a choice would change the flag to a true value
    Check for this flag value after round has been played:
    If true rest of function would not execute
*/

function compareChoices(playerChoice, computerChoice) {
    const VICTORIES = {
        rock: ["scissors"],
        paper: ["rock"],
        scissors: ["paper"],
    };
    const resultText = document.querySelector(".result");

    clearTextContent(resultText);

    if (playerChoice === computerChoice) {
        resultText.innerText = 'You tied!';
    } else if (VICTORIES[playerChoice].includes(computerChoice)) {
        resultText.innerText = 'You won!';
        numOfWins++;
        if (numOfWins == MAX_WINS) {
            console.log("You won the game!");
        }
    } else {
        resultText.innerText = 'You lost!'; 
    }
}

function clearTextContent() {
    const resultText = document.querySelector(".result");
    if (resultText.innerText.length > 0) {
        resultText.innerText = '';
    }
} 


const playerContainerChildren = document.querySelector(".item-container.player").children;
const playerContainerLength = playerContainerChildren.length;
const computerChoiceTarget = document.querySelector(".computer-choice-target");
const playerChoiceTarget = document.querySelector(".player-choice-target");
const MAX_WINS = 5;
let numOfWins = 0;

// Play round when user clicks on rock, paper, or scissors icon
// for (let i = 0; i < playerContainerLength; i++) {
//     playerContainerChildren[i].addEventListener("click", (event) => {
//         const choice = event.target.getAttribute("data-value");
//         moveChoice(playerContainerChildren[i], playerChoiceTarget);
//         playRound(choice);
//     });
// }
const gameData = {
    "roundPlayed": false,
};


for (const child of playerContainerChildren) {
    child.addEventListener("click", (event) => {
        // Check for round has played flag here 
        /*
            if(!roundHasPlayed) {
                run below code
            }
        */
        const choice = event.target.getAttribute("data-value");
        moveChoice(child, playerChoiceTarget);
        playRound(choice);
    });
}