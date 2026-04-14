export const killerSudokuHTML = `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Killer Sudoku</title>
<style>
  :root { --wf-bg: #E4E3E0; --wf-dark: #141414; --wf-white: #FFFFFF; --wf-red: #FF2A00; }
  body { font-family: 'Courier New', Courier, monospace; background: var(--wf-bg); color: var(--wf-dark); margin: 0; padding: 20px; }
  .container { max-width: 800px; margin: 0 auto; background: var(--wf-white); border: 4px solid var(--wf-dark); box-shadow: 8px 8px 0px 0px var(--wf-dark); padding: 30px; }
  h1 { text-transform: uppercase; font-weight: 900; font-size: 2.5rem; border-bottom: 4px solid var(--wf-dark); padding-bottom: 10px; margin-top: 0; }
  .controls { display: flex; gap: 10px; margin-bottom: 30px; flex-wrap: wrap; }
  .btn { background: var(--wf-red); color: white; border: 4px solid var(--wf-dark); padding: 10px 20px; font-weight: 900; text-transform: uppercase; cursor: pointer; box-shadow: 4px 4px 0px 0px var(--wf-dark); }
  .btn:hover { transform: translate(2px, 2px); box-shadow: 2px 2px 0px 0px var(--wf-dark); }
  
  .game-area { display: flex; justify-content: center; margin-top: 20px; }
  .grid { display: grid; border: 4px solid var(--wf-dark); width: fit-content; background: var(--wf-white); }
  .cell { width: 50px; height: 50px; position: relative; display: flex; align-items: center; justify-content: center; font-size: 1.5rem; font-weight: bold; box-sizing: border-box; border: 1px dashed #ccc; cursor: pointer; }
  .cell.selected { background: #b3f5ff; }
  
  /* Thick borders for 3x3 blocks (or 2x2 for 4x4 grid) */
  .cell.thick-right { border-right: 2px solid var(--wf-dark); }
  .cell.thick-bottom { border-bottom: 2px solid var(--wf-dark); }
  
  /* Cage borders */
  .cell.cage-top { border-top: 2px solid var(--wf-dark); }
  .cell.cage-bottom { border-bottom: 2px solid var(--wf-dark); }
  .cell.cage-left { border-left: 2px solid var(--wf-dark); }
  .cell.cage-right { border-right: 2px solid var(--wf-dark); }
  
  .cage-sum { position: absolute; top: 2px; left: 3px; font-size: 11px; font-weight: normal; line-height: 1; }
  .answer-text { color: var(--wf-red); }

  @media print {
    body { background: white; padding: 0; -webkit-print-color-adjust: exact; print-color-adjust: exact; }
    .container { border: none; box-shadow: none; padding: 0; }
    .no-print { display: none !important; }
    .grid { border: 4px solid black !important; }
    .cell.thick-right { border-right: 2px solid black !important; }
    .cell.thick-bottom { border-bottom: 2px solid black !important; }
    .cell.cage-top { border-top: 2px solid black !important; }
    .cell.cage-bottom { border-bottom: 2px solid black !important; }
    .cell.cage-left { border-left: 2px solid black !important; }
    .cell.cage-right { border-right: 2px solid black !important; }
    .answer-text { color: black !important; }
    h1, .cage-sum { color: black !important; border-color: black !important; }
  }
</style>
</head>
<body>
  <div class="container">
    <h1>Killer Sudoku</h1>
    <div class="controls no-print">
      <button class="btn" onclick="generate()">New Puzzle</button>
      <button class="btn" onclick="toggleAnswers()" style="background: var(--wf-white); color: var(--wf-dark);">Toggle Answers</button>
      <button class="btn" onclick="window.print()" style="background: var(--wf-dark); color: white;">Print (KDP)</button>
    </div>
    <div id="keyboard-hint" class="no-print" style="margin-bottom: 15px; font-weight: bold; color: var(--wf-dark); background: #fff3cd; padding: 10px; border: 2px solid #ffeeba; display: inline-block;">💡 Tip: Click on a cell to start typing numbers (1-9). Use Arrow keys to navigate, Backspace to delete.</div>
    <div class="game-area" id="game-board"></div>
  </div>
  <script>
    // 6x6 Killer Sudoku Templates
    const puzzles = [
      {
        size: 6,
        blockWidth: 3,
        blockHeight: 2,
        answers: [
          [1, 2, 3, 4, 5, 6],
          [4, 5, 6, 1, 2, 3],
          [2, 3, 1, 5, 6, 4],
          [5, 6, 4, 2, 3, 1],
          [3, 1, 2, 6, 4, 5],
          [6, 4, 5, 3, 1, 2]
        ],
        cages: [
          { sum: 5, cells: [[0,0], [0,1]] },
          { sum: 7, cells: [[0,2], [0,3]] },
          { sum: 11, cells: [[0,4], [0,5]] },
          { sum: 9, cells: [[1,0], [1,1]] },
          { sum: 7, cells: [[1,2], [2,2]] },
          { sum: 6, cells: [[1,3], [1,4]] },
          { sum: 8, cells: [[1,5], [2,5]] },
          { sum: 7, cells: [[2,0], [3,0]] },
          { sum: 9, cells: [[2,1], [3,1]] },
          { sum: 7, cells: [[2,3], [2,4]] },
          { sum: 9, cells: [[3,2], [4,2]] },
          { sum: 5, cells: [[3,3], [3,4]] },
          { sum: 7, cells: [[3,5], [4,5]] },
          { sum: 4, cells: [[4,0], [4,1]] },
          { sum: 10, cells: [[4,3], [4,4]] },
          { sum: 10, cells: [[5,0], [5,1]] },
          { sum: 8, cells: [[5,2], [5,3]] },
          { sum: 3, cells: [[5,4], [5,5]] }
        ]
      },
      {
        size: 6,
        blockWidth: 3,
        blockHeight: 2,
        answers: [
          [6, 5, 4, 3, 2, 1],
          [3, 2, 1, 6, 5, 4],
          [5, 4, 6, 2, 1, 3],
          [2, 1, 3, 5, 4, 6],
          [4, 6, 5, 1, 3, 2],
          [1, 3, 2, 4, 6, 5]
        ],
        cages: [
          { sum: 11, cells: [[0,0], [0,1]] },
          { sum: 7, cells: [[0,2], [0,3]] },
          { sum: 3, cells: [[0,4], [0,5]] },
          { sum: 8, cells: [[1,0], [2,0]] },
          { sum: 3, cells: [[1,1], [1,2]] },
          { sum: 11, cells: [[1,3], [1,4]] },
          { sum: 7, cells: [[1,5], [2,5]] },
          { sum: 10, cells: [[2,1], [2,2]] },
          { sum: 3, cells: [[2,3], [2,4]] },
          { sum: 6, cells: [[3,0], [4,0]] },
          { sum: 4, cells: [[3,1], [3,2]] },
          { sum: 9, cells: [[3,3], [3,4]] },
          { sum: 8, cells: [[3,5], [4,5]] },
          { sum: 11, cells: [[4,1], [4,2]] },
          { sum: 4, cells: [[4,3], [4,4]] },
          { sum: 4, cells: [[5,0], [5,1]] },
          { sum: 6, cells: [[5,2], [5,3]] },
          { sum: 11, cells: [[5,4], [5,5]] }
        ]
      }
    ];

    let currentPuzzle = null;
    let showAnswers = false;
    let userAnswers = [];
    let selectedRow = -1;
    let selectedCol = -1;

    function generate() {
      currentPuzzle = puzzles[Math.floor(Math.random() * puzzles.length)];
      showAnswers = false;
      userAnswers = Array(currentPuzzle.size).fill(null).map(() => Array(currentPuzzle.size).fill(''));
      selectedRow = -1;
      selectedCol = -1;
      render();
    }

    function toggleAnswers() {
      showAnswers = !showAnswers;
      render();
    }

    function selectCell(r, c) {
      if (showAnswers) return;
      selectedRow = r;
      selectedCol = c;
      render();
    }

    document.addEventListener('keydown', (e) => {
      if (document.activeElement.tagName === 'INPUT') return;
      if (selectedRow === -1 || selectedCol === -1) return;
      if (showAnswers) return;

      if (["ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight", "Space"].includes(e.code)) {
        e.preventDefault();
      }

      if (e.key.match(/^[1-9]$/)) {
        userAnswers[selectedRow][selectedCol] = e.key;
        render();
      } else if (e.key === 'Backspace') {
        userAnswers[selectedRow][selectedCol] = '';
        render();
      } else if (e.key === 'ArrowRight') {
        if (selectedCol < currentPuzzle.size - 1) {
          selectedCol++;
          render();
        }
      } else if (e.key === 'ArrowLeft') {
        if (selectedCol > 0) {
          selectedCol--;
          render();
        }
      } else if (e.key === 'ArrowDown') {
        if (selectedRow < currentPuzzle.size - 1) {
          selectedRow++;
          render();
        }
      } else if (e.key === 'ArrowUp') {
        if (selectedRow > 0) {
          selectedRow--;
          render();
        }
      }
    });

    function render() {
      if (!currentPuzzle) return;
      const p = currentPuzzle;
      const size = p.size;
      
      // Map cells to their cages
      const cellToCage = {};
      p.cages.forEach((cage, cageIndex) => {
        cage.cells.forEach(([r, c]) => {
          cellToCage[\`\${r},\${c}\`] = cageIndex;
        });
      });

      let html = \`<div class="grid" style="grid-template-columns: repeat(\${size}, 50px);">\`;
      
      for (let r = 0; r < size; r++) {
        for (let c = 0; c < size; c++) {
          let classes = ['cell'];
          
          // Block borders
          if ((c + 1) % p.blockWidth === 0 && c !== size - 1) classes.push('thick-right');
          if ((r + 1) % p.blockHeight === 0 && r !== size - 1) classes.push('thick-bottom');
          
          // Cage borders
          const myCage = cellToCage[\`\${r},\${c}\`];
          if (r === 0 || cellToCage[\`\${r-1},\${c}\`] !== myCage) classes.push('cage-top');
          if (r === size - 1 || cellToCage[\`\${r+1},\${c}\`] !== myCage) classes.push('cage-bottom');
          if (c === 0 || cellToCage[\`\${r},\${c-1}\`] !== myCage) classes.push('cage-left');
          if (c === size - 1 || cellToCage[\`\${r},\${c+1}\`] !== myCage) classes.push('cage-right');
          
          // Is top-left of cage?
          const cage = p.cages[myCage];
          const isTopLeft = cage.cells[0][0] === r && cage.cells[0][1] === c;
          
          const ans = showAnswers ? \`<span class="answer-text">\${p.answers[r][c]}</span>\` : userAnswers[r][c];
          const sumLabel = isTopLeft ? \`<span class="cage-sum">\${cage.sum}</span>\` : '';
          
          const isSelected = (r === selectedRow && c === selectedCol);
          if (isSelected) classes.push('selected');
          
          html += \`<div class="\${classes.join(' ')}" onclick="selectCell(\${r}, \${c})">\${sumLabel}\${ans}</div>\`;
        }
      }
      html += \`</div>\`;
      document.getElementById('game-board').innerHTML = html;
    }
    
    generate();
  </script>
</body>
</html>`;
