function generatePuzzle() {
    fetch('/generate')
      .then(response => response.json())
      .then(puzzle => {
        const table = document.getElementById('sudoku-container');
        table.innerHTML = '';

        for (let row = 0; row < 9; row++) {
          const tr = document.createElement('tr');
          for (let col = 0; col < 9; col++) {
            const td = document.createElement('td');
            const index = row * 9 + col;
            const value = puzzle[index];

            const input = document.createElement('input');
            input.type = 'text';
            input.maxLength = 1;
            input.value = value !== null ? (value + 1) : '';
            input.disabled = value !== null;

            if(value == null) {
                input.readOnly = true;
            }

            td.appendChild(input);
            tr.appendChild(td);
          }
          table.appendChild(tr);
        }
      });
  }

  /*
  function solvePuzzle() {
    const inputs = document.querySelectorAll('#sudoku-container input');
    const puzzle = Array.from(inputs).map(input => {
      const value = input.value ? parseInt(input.value) - 1 : null;
      return isNaN(value) ? null : value;
    });

    fetch('/solve', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ puzzle })
    })
    .then(response => response.json())
    .then(solution => {
      inputs.forEach((input, index) => {
          input.value = solution[index] !== null ? solution[index] + 1 : '';
      });
    });
  }*/
    function solvePuzzle() {
      const inputs = document.querySelectorAll('#sudoku-container input');
      const puzzleArray = Array.from({ length: 9 }, () => Array(9).fill(0));
  
      inputs.forEach((input, index) => {
          const row = Math.floor(index / 9);
          const col = index % 9;
          puzzleArray[row][col] = input.value ? parseInt(input.value) : 0;
      });
  
      function isSafe(board, row, col, num) {
          for (let x = 0; x < 9; x++) {
              if (board[row][x] === num || board[x][col] === num || board[3 * Math.floor(row / 3) + Math.floor(x / 3)][3 * Math.floor(col / 3) + x % 3] === num) {
                  return false;
              }
          }
          return true;
      }
  
      function solveSudoku(board) {
          let row = -1;
          let col = -1;
          let isEmpty = true;
          for (let i = 0; i < 9; i++) {
              for (let j = 0; j < 9; j++) {
                  if (board[i][j] === 0) {
                      row = i;
                      col = j;
                      isEmpty = false;
                      break;
                  }
              }
              if (!isEmpty) {
                  break;
              }
          }
  
          if (isEmpty) {
              return true;
          }
  
          for (let num = 1; num <= 9; num++) {
              if (isSafe(board, row, col, num)) {
                  board[row][col] = num;
                  if (solveSudoku(board)) {
                      return true;
                  }
                  board[row][col] = 0;
              }
          }
          return false;
      }
  
      if (solveSudoku(puzzleArray)) {
          inputs.forEach((input, index) => {
              const row = Math.floor(index / 9);
              const col = index % 9;
              input.value = puzzleArray[row][col] !== 0 ? puzzleArray[row][col] : '';
          });
      } else {
          alert("No solution found");
      }
  }
