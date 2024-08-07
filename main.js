/* 
    Game data property that contains a flag to indicate if a round has been played
    User making a choice would change the flag to a true value
    Check for this flag value after round has been played:
    If true rest of function would not execute
*/
const CHOICES = {
    rock: "rock",
    paper: "paper",
    scissors: "scissors",
};

const VICTORIES = {
    rock: ["scissors"],
    paper: ["rock"],
    scissors: ["paper"],
};

const playerContainerChildren = document.querySelector(
    ".item-container.player"
).children;
const playerContainerLength = playerContainerChildren.length;
const computerChoiceTarget = document.querySelector(".computer-choice-target");
const playerChoiceTarget = document.querySelector(".player-choice-target");
const gameControls = document.querySelector(".buttons-container");
const nextRoundButton = document.querySelector("#next-round-button");
const playAgainButton = document.querySelector("#play-again-button");
const resultText = document.querySelector(".result");
const MAX_WINS = 5;
const roundPlayedEvent = new Event("roundPlayed");
const confettiSound = new Audio('/sounds/25\ confetti\ Sound\ effect.mp3')

let gameData = {
    roundPlayed: false,
    numOfRounds: 0,
    numOfWins: 0,
    numOfLosses: 0,
    playerChoice: "",
    computerChoice: "",
};

const gameAreaEventHandlers = {
    roundPlayed: () => {
        gameControls.style.visibility = "visible";
    },
    click: (event) => {
        if (event.target.id === "next-round-button") {
            resetGameArea(
                gameControls,
                playerChoiceTarget,
                computerChoiceTarget,
                gameData.playerChoice,
                gameData.computerChoice
            );
            gameData.roundPlayed = false;
            gameData.playerChoice = "";
            gameData.computerChoice = "";
        } else {
            resetGameArea(
                gameControls,
                playerChoiceTarget,
                computerChoiceTarget,
                gameData.playerChoice,
                gameData.computerChoice
            );
            gameData = {
                roundPlayed: false,
                numOfRounds: 0,
                numOfWins: 0,
                numOfLosses: 0,
                playerChoice: "",
                computerChoice: "",
            };
            updateStatsText("wins-count", gameData.numOfWins);
            updateStatsText("loss-count", gameData.numOfLosses);
            updateStatsText("round-count", gameData.numOfRounds);
        }
    },
};

for (const [eventType, handlerFunction] of Object.entries(
    gameAreaEventHandlers
)) {
    gameControls.addEventListener(eventType, handlerFunction);
}

// Click event listener to initiate playing a round
for (const child of playerContainerChildren) {
    child.addEventListener("click", (event) => {
        if (!gameData.roundPlayed) {
            const choice = event.target.getAttribute("data-value");
            gameData.playerChoice = choice;
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

    // Round played
    moveChoice(computerItem, computerChoiceTarget);
    compareChoices(playerChoice, computerChoice);
    // Add function to display gameData
    gameData.roundPlayed = true;

    // Makes play again & reset buttons visible
    gameControls.dispatchEvent(roundPlayedEvent);
    gameData.numOfRounds++;
    updateStatsText("round-count", gameData.numOfRounds);

    if (gameData.numOfWins === MAX_WINS) {
        resultText.innerText = "You beat the game!";
        const body = document.querySelector("body");

        let canvas = document.createElement("canvas");
        body.prepend(canvas);
        let myConfetti = confetti.create(canvas);

        confettiSound.play();
        myConfetti({
            particleCount: 3,
            spread: 2,
            origin: { y: 0.6 },
            scalar: 0.25,
        }).then(() => body.removeChild(canvas));
    }
}

function resetGameArea(
    controls,
    playerItem,
    computerItem,
    player_choice,
    computer_choice
) {
    controls.setAttribute("style", "");
    playerItem.removeChild(playerItem.children[0]);
    computerItem.removeChild(computerItem.children[0]);
    resultText.innerText = "";

    document
        .querySelector(`.player > img.${player_choice}`)
        .attributeStyleMap.clear();
    document
        .querySelector(`.computer > img.${computer_choice}`)
        .attributeStyleMap.clear();
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
    const MAX_VALUE = Math.floor(3);
    const MIN_VALUE = Math.ceil(1);

    switch (
        Math.floor(Math.random() * (MAX_VALUE - MIN_VALUE + 1) + MIN_VALUE)
    ) {
        case 1:
            gameData.computerChoice = CHOICES.rock;
            return CHOICES.rock;
        case 2:
            gameData.computerChoice = CHOICES.paper;
            return CHOICES.paper;
        case 3:
            gameData.computerChoice = CHOICES.scissors;
            return CHOICES.scissors;
    }
}

function compareChoices(playerChoice, computerChoice) {
    clearTextContent(resultText);

    if (playerChoice === computerChoice) {
        resultText.innerText = "You tied!";
    } else if (VICTORIES[playerChoice].includes(computerChoice)) {
        resultText.innerText = "You won!";
        gameData.numOfWins++;
        updateStatsText("wins-count", gameData.numOfWins);
        if (gameData.numOfWins === MAX_WINS) {
            console.log("You won the game!");
        }
    } else {
        resultText.innerText = "You lost!";
        gameData.numOfLosses++;
        updateStatsText("loss-count", gameData.numOfLosses);
    }
}

function clearTextContent() {
    const resultText = document.querySelector(".result");
    if (resultText.innerText.length > 0) {
        resultText.innerText = "";
    }
}

function updateStatsText(element, resultCount) {
    const el = document.querySelector(`#${element}`);

    el.innerText = resultCount;
}