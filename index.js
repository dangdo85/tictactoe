const ticTacToeGame = new TicTacToeGame();
ticTacToeGame.start();

function TicTacToeGame() {
    const board = new Board();
    const humanXPlayer = new HumanXPlayer(board);
    const humanOPlayer = new HumanOPlayer(board);
    let turn = 0;

    this.start = function() {
        const config = { childList: true};
        const observer = new MutationObserver(() => takeTurn());
        board.positions.forEach((el) => observer.observe(el, config));
        takeTurn();
    }


function takeTurn() {
    if (board.checkForWinner()) {
        return;  
    }
    if (turn % 2 === 0) {
        humanXPlayer.takeTurn();
        const messages = document.querySelector('h2')
        messages.textContent = `Player X's turn`; 
    } else {
        humanOPlayer.takeTurn();
        const messages = document.querySelector('h2')
        messages.textContent = `Player O's turn`; 
    }

    turn++;
    console.log(turn)
    if (turn === 10) {
        const messages = document.querySelector('h2')
        messages.textContent = `It's a tie!!!`; }
}

function Board() {
    this.positions = Array.from(document.querySelectorAll('.col'));
    this.checkForWinner = function() {
        let winner = false;
        const winningCombinations = [
            [0, 1, 2],
            [3, 4, 5],
            [6, 7, 8],
            [0, 4, 8],
            [2, 4, 6],
            [0, 3, 6],
            [1, 4, 7],
            [2, 5, 8]
        ];
        const positions = this.positions;

        winningCombinations.forEach((winningCombo) => {
            const pos0InnerText = positions[winningCombo[0]].innerText;
            const pos1InnerText = positions[winningCombo[1]].innerText;
            const pos2InnerText = positions[winningCombo[2]].innerText;
            const isWinningCombo = pos0InnerText !== '' &&
                pos0InnerText === pos1InnerText &&
                pos1InnerText === pos2InnerText;

                if (isWinningCombo) {
                    winner = true;
                    winningCombo.forEach((index) => {
                        positions[index].className += ' winner';
                        const messages = document.querySelector('h2')
                        messages.textContent = `Winner!!!`; 
                    })
                }
        });
        return winner;
            }
    }
    
function HumanXPlayer(board) {
    this.takeTurn = function() {
        board.positions.forEach(el => {
            if (el.innerText === '') {
            el.addEventListener('click', handleTurnTaken)
        }
        });
        console.log('x activated')
    }
    function handleTurnTaken(event) {
        event.target.innerText = 'X';

        board.positions.forEach(el => el.removeEventListener('click', handleTurnTaken));
        console.log('x removed', board.positions)
    }
}

function HumanOPlayer(board) {
    this.takeTurn = function() {
        board.positions.forEach(el => {
            if (el.innerText === '') {
                el.addEventListener('click', handleTurnTaken)
            }
        });
    }
    function handleTurnTaken(event) {
        event.target.innerText = 'O'; 
        board.positions.forEach(el => el.removeEventListener('click', handleTurnTaken)); 
}
}

resetButton.addEventListener('click', function (event){
    location.reload()
 })
}