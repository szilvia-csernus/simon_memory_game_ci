const game = {
    score: 0,
    currentGame: [],
    playerMoves: [],
    turnNumber: 0,
    lastButton: '',
    turnInProgress: false,
    choices: ['button1', 'button2', 'button3', 'button4']
}

const newGame = () => {
    game.score = 0;
    game.currentGame = [];
    game.playerMoves = [];

    for (let circle of document.getElementsByClassName('circle')) {
        if (circle.dataset.listener !== true) {
            circle.addEventListener('click', e => {
                if (game.currentGame.length > 0 && !game.turnInProgress) {
                    let move = e.target.getAttribute('id');
                    console.log(move);
                    game.lastButton = move;
                    lightsOn(move);
                    game.playerMoves.push(move);
                    playerTurn();
                }
            });
            circle.dataset.listener = 'true';
        }
    }
    showScore();
    addTurn();
}

/** 
 * Add a randomly selected button to game.currentGame array
 */
const addTurn = () => {
    debugger
    game.playerMoves = [];
    const random = Math.floor(Math.random() * 4);
    game.currentGame.push(game.choices[random]);
    showTurns();
}

/**
 * Lits up the input button for 400ms
 */
const lightsOn = (circ) => {
    debugger
    const circle = document.getElementById(circ);
    circle.classList.add('light');
    setTimeout(() => {
       return circle.classList.remove('light');
    }, 400);
}

/** Add game.score element to the DOM */
const showScore = () => {
    debugger
    document.getElementById('score').innerText = game.score;
}

/** Shows the next challenge to the user by lighting up the buttons in game.currentGame array */
const showTurns = () => {
    debugger
    game.turnInProgress = true;
    game.turnNumber = 0;
    let turns = setInterval(() => {
        lightsOn(game.currentGame[game.turnNumber]);
        game.turnNumber++;
        if (game.turnNumber >= game.currentGame.length) {
            clearInterval(turns);
            game.turnInProgress = false;
        }
    }, 800)
}

/** Compares players clicks to the currentGame array. If one move matches,
 * adds one score, if the move is wrong gives an alert and restarts the game.
*/
const playerTurn = () => {
    debugger
    let i = game.playerMoves.length - 1;
    if (game.currentGame[i] === game.playerMoves[i]) {
        if (game.currentGame.length === game.playerMoves.length) {
            game.score++;
            showScore();
            addTurn();
        }
    } else {
        alert('Wrong move!');
        newGame();
    }
}

module.exports = {
    game,
    newGame,
    addTurn,
    showScore,
    lightsOn,
    showTurns,
    playerTurn
}