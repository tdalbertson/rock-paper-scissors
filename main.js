function getComputerChoice() {
    const choices = ['rock', 'paper', 'scissors'];
    switch (Math.floor(Math.random() * (Math.floor(3) /* Max */ - Math.ceil(1) /* Min */ + 1) + Math.ceil(1) /* Min */)) {
        case 1:
            return choices[0];
        case 2:
            return choices[1];
        case 3:
            return choices[2];
    }
}

choice = getComputerChoice();