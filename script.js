const gameBody = document.querySelector('.body');
const boardContainer = document.getElementById('board-container');
const strikeEl = document.getElementById('strike');
const winningAlert = document.querySelector('.winning-alert');
let playerTurn = 0;

const winningCombinations = [
    // Rows
    {strike: "row-1", combo: [0, 1, 2]},
    {strike: "row-2", combo: [3, 4, 5]},
    {strike: "row-3", combo: [6, 7, 8]},
    // Columns
    {strike: "column-1", combo: [0, 3, 6]},
    {strike: "column-2", combo: [1, 4, 7]},
    {strike: "column-3", combo: [2, 5, 8]},
    // Diagonals
    {strike: "diagonal-1", combo: [0, 4, 8]},
    {strike: "diagonal-2", combo: [2, 4, 6]}
];

// Tiles Clicking Event
const tileClickEvent = (e) => {
    // Get Tile Id
    const tile = document.getElementById(e.target.id);
    tile.classList.add('clicked');
    if (tile.textContent !== '') {
        return;
    } else {
        // Fill Tiles With Correct Values
        if (playerTurn === 0) {
            playerTurn = 1;
            tile.textContent = "X";
        } else if (playerTurn === 1) {
            playerTurn = 0;
            tile.textContent = "O";
        }
        checkWinning();
    }
};

// Add Event Listeners To Tiles
const tiles = document.querySelectorAll('.tile');
const tilesArr = [];
tiles.forEach(tile => {
    tilesArr.push(tile);
});
tilesArr.map(tile => {
    tile.addEventListener('click', e => tileClickEvent(e));
    tile.addEventListener('touchstart', e => tileClickEvent(e));
});


// Check Winning
const checkWinning = () => {
    for (const {combo, strike} of winningCombinations) {
        const tileValue1 = tilesArr[combo[0]].textContent;
        const tileValue2 = tilesArr[combo[1]].textContent;
        const tileValue3 = tilesArr[combo[2]].textContent;

        if (tileValue1 && tileValue1 === tileValue2 && tileValue2 === tileValue3) {
            strikeEl.classList.add(`${strike}`);
            playerTurn = 2;
            displayWinner(tileValue1);
            return;
        }
    }
    if (tilesArr.every(tile => tile.textContent)) {
        displayWinner('draw');
    }
};

// Display Winner
const displayWinner = (winner) => {
    gameBody.classList.add('blur');
    winningAlert.style.visibility = "visible";
    setTimeout(() => {
        gameBody.addEventListener('click', gameRestart);
    }, 1000);
    if (winner === "X") {
        winningAlert.textContent = "X Wins";
    } else if (winner === "O") {
        winningAlert.textContent = "O Wins";
    } else {
        winningAlert.textContent = "Draw";
    }
};

const gameRestart = () => {
    location.reload();
};