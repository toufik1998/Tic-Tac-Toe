let title = document.querySelector('.title');
let turn = "X"; // Start with player X
let squares = [];
let gameOver = false;
const gridSize = 20;

function end(nums) {
    title.innerHTML = `${squares[nums[0]]} wins!`;
    nums.forEach(num => {
        document.getElementById('item' + num).style.background = '#000';
    });

    gameOver = true;

    setInterval(() => {
        title.innerHTML += '.WINS';
    }, 1000);

    setTimeout(() => {
        location.reload();
    }, 4000);
}

function winner() {
    for (let i = 1; i <= gridSize * gridSize; i++) {
        squares[i] = document.getElementById('item' + i).innerHTML;
    }

    // Check for a win (same logic as before)
    // Example logic for checking horizontal wins:
    for (let i = 1; i <= gridSize; i++) {
        for (let j = 1; j <= gridSize - 4; j++) {
            let row = [];
            for (let k = 0; k < 5; k++) {
                row.push(i + k + (j - 1) * gridSize);
            }
            if (row.every(num => squares[num] === 'X')) {
                end(row);
                return;
            }
            if (row.every(num => squares[num] === 'O')) {
                end(row);
                return;
            }
        }
    }


    // Logic for checking vertical wins:
    for (let i = 1; i <= gridSize - 4; i++) {
        for (let j = 1; j <= gridSize; j++) {
            let column = [];
            for (let k = 0; k < 5; k++) {
                column.push(j + (i - 1) * gridSize + k * gridSize);
            }
            if (column.every(num => squares[num] === 'X')) {
                end(column);
                return;
            }
            if (column.every(num => squares[num] === 'O')) {
                end(column);
                return;
            }
        }
    }


    // Logic for checking diagonal wins (from top-left to bottom-right):
    for (let i = 1; i <= gridSize - 4; i++) {
        for (let j = 1; j <= gridSize - 4; j++) {
            let diagonal = [];
            for (let k = 0; k < 5; k++) {
                diagonal.push((j + k) + (i + k - 1) * gridSize);
            }
            if (diagonal.every(num => squares[num] === 'X')) {
                end(diagonal);
                return;
            }
            if (diagonal.every(num => squares[num] === 'O')) {
                end(diagonal);
                return;
            }
        }
    }


       // Logic for checking diagonal wins (from top-right to bottom-left):
    for (let i = 1; i <= gridSize - 4; i++) {
        for (let j = gridSize; j >= 5; j--) {
            let diagonal = [];
            for (let k = 0; k < 5; k++) {
                diagonal.push((j - k) + (i + k - 1) * gridSize);
            }
            if (diagonal.every(num => squares[num] === 'X')) {
                end(diagonal);
                return;
            }
            if (diagonal.every(num => squares[num] === 'O')) {
                end(diagonal);
                return;
            }
        }
    }




    // Check for a tie
    if (!squares.includes('') && !gameOver) {
        title.innerHTML = "The result is a tie between X and O";
        title.style.padding = '2rem';
        setTimeout(() => {
            location.reload();
        }, 4000);
    }
}

// Function to create the grid dynamically (same as before)
function createGrid() {
    const gridContainer = document.querySelector('.grid');
    for (let i = 1; i <= gridSize * gridSize; i++) {
        const square = document.createElement('div');
        square.className = 'square';
        square.id = 'item' + i;
        square.onclick = function () {
            game(this.id);
        };
        gridContainer.appendChild(square);
    }
}

createGrid();

function game(id) {
    let element = document.getElementById(id);
    if (!gameOver && element.innerHTML == '') {
        element.innerHTML = turn;
        winner();

        // Switch to the other player's turn
        turn = turn === "X" ? "O" : "X";

        // Update the title to display the current player's turn
        title.innerHTML = turn;

    }
}
