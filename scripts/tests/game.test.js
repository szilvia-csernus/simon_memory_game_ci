const {
    game, newGame, addTurn, lightsOn, showTurns, playerTurn
} = require('../game');

jest.spyOn(window, 'alert').mockImplementation(() => {})

beforeAll(() => {
    let fs = require('fs');
    let fileContents = fs.readFileSync('index.html', 'utf-8');
    document.open();
    document.write(fileContents);
    document.close();
})

describe('game object contains correct keys', () => {
    test('score key exist', () => {
        expect('score' in game).toBe(true);
    })
    test('currentGame key exist', () => {
        expect('currentGame' in game).toBe(true);
    })
    test('playerMoves key exist', () => {
        expect('playerMoves' in game).toBe(true);
    })
    test('turnNumber key exist', () => {
        expect('turnNumber' in game).toBe(true);
    })
    test('lastButton key exist', () => {
        expect('lastButton' in game).toBe(true);
    })
    test('turnInProgress key exist', () => {
        expect('turnInProgress' in game).toBe(true);
    })
    test('choices key exist', () => {
        expect('choices' in game).toBe(true);
    })
    test('choices contain correct ids', () => {
        expect(game.choices).toEqual(['button1', 'button2', 'button3', 'button4'])
    })
})

describe('newGame() function works correctly', () => {
    beforeAll(() => {
        game.score = 42;
        game.currentGame = ['button1','button2'];
        game.playerMoves = ['button1','button2'];
        document.getElementById('score').innerText = '42';
        newGame();
    })
    describe(`resets the game object's values`, () => {
        test('score should be 0', () => {
            expect(game.score).toBe(0);
        })
        test("should be one move in the computer's game array", () => {
            expect(game.currentGame.length).toEqual(1);
        })
        test('playerMoves aray should be empty', () => {
            expect(game.playerMoves.length).toEqual(0);
        })
        test('should display 0 as a score', () => {
            expect(document.getElementById('score').innerText).toEqual(0)
        })
        test('expect data-listener to be true', () => {
            const elements = document.getElementsByClassName('circle');
            for (let element of elements) {
                expect(element.dataset.listener).toEqual('true')
            }
        })
    })
})

describe('Gameplay works correctly', () => {
    beforeEach(() => {
        game.score = 0;
        game.currentGame = [];
        game.playerMoves = [];
        addTurn();
    });
    afterEach(() => {
        game.score = 0;
        game.currentGame = [];
        game.playerMoves = [];
    })
    test('addTurn() adds a new turn to the game', () => {
        addTurn();
        expect(game.currentGame.length).toBe(2);
    })
    test('should add correct class to light up the button', () => {
        let button = document.getElementById(game.currentGame[0]);
        lightsOn(game.currentGame[0]);
        expect(button.classList).toContain('light');
    })
    test('showTurns updates game.turnNumber', () => {
        game.turnNumber = 42;
        showTurns();
        expect(game.turnNumber).toBe(0);
    })
    test('should increment the score if the turn is correct', () => {
        game.playerMoves.push(game.currentGame[0]);
        playerTurn();
        expect(game.score).toBe(1);
    })
    test('should call an alert if the move is wrong', () => {
        game.playerMoves.push('wrong');
        playerTurn();
        expect(window.alert).toBeCalledWith('Wrong move!')
    })
    test('should toggle turnInProgress to true', () => {
        showTurns();
        expect(game.turnInProgress).toBe(true);
    })
    test('clicking during the computer sequence should fail', () => {
        showTurns();
        game.lastButtton = '';
        document.getElementById('button2').click();
        expect(game.lastButton).toEqual('');
    })
})
