export const kakuroHTML = `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Kakuro</title>
<style>
  :root { --wf-bg: #E4E3E0; --wf-dark: #141414; --wf-white: #FFFFFF; --wf-green: #00C853; }
  body { font-family: 'Courier New', Courier, monospace; background: var(--wf-bg); color: var(--wf-dark); margin: 0; padding: 20px; }
  .container { max-width: 800px; margin: 0 auto; background: var(--wf-white); border: 4px solid var(--wf-dark); box-shadow: 8px 8px 0px 0px var(--wf-dark); padding: 30px; }
  h1 { text-transform: uppercase; font-weight: 900; font-size: 2.5rem; border-bottom: 4px solid var(--wf-dark); padding-bottom: 10px; margin-top: 0; }
  .controls { display: flex; gap: 10px; margin-bottom: 30px; flex-wrap: wrap; }
  .btn { background: var(--wf-green); color: var(--wf-dark); border: 4px solid var(--wf-dark); padding: 10px 20px; font-weight: 900; text-transform: uppercase; cursor: pointer; box-shadow: 4px 4px 0px 0px var(--wf-dark); }
  .btn:hover { transform: translate(2px, 2px); box-shadow: 2px 2px 0px 0px var(--wf-dark); }
  
  .game-area { display: flex; justify-content: center; margin-top: 20px; }
  .grid { display: grid; border: 4px solid var(--wf-dark); background: var(--wf-dark); gap: 2px; width: fit-content; padding: 2px; }
  .cell { width: 50px; height: 50px; background: var(--wf-white); display: flex; align-items: center; justify-content: center; font-size: 1.5rem; font-weight: bold; position: relative; }
  .cell.input-cell { cursor: pointer; }
  .cell.input-cell.selected { background: #b3f5ff; }
  .cell.black { background: var(--wf-dark); color: var(--wf-white); }
  .cell.empty-black { background: var(--wf-dark); }
  
  .kakuro-svg { position: absolute; top: 0; left: 0; width: 100%; height: 100%; }
  .sum-down { position: absolute; bottom: 2px; left: 4px; font-size: 12px; font-weight: normal; }
  .sum-across { position: absolute; top: 2px; right: 4px; font-size: 12px; font-weight: normal; }
  .answer-text { color: var(--wf-green); }

  @media print {
    body { background: white; padding: 0; -webkit-print-color-adjust: exact; print-color-adjust: exact; }
    .container { border: none; box-shadow: none; padding: 0; }
    .no-print { display: none !important; }
    .grid { border: 4px solid black !important; background: black !important; }
    .cell { background: white !important; }
    .cell.black { background: black !important; color: white !important; }
    .cell.empty-black { background: black !important; }
    .answer-text { color: black !important; }
    h1 { color: black !important; border-color: black !important; }
  }
</style>
</head>
<body>
  <div class="container">
    <h1>Kakuro</h1>
    <div class="controls no-print">
      <button class="btn" onclick="generate()">New Puzzle</button>
      <button class="btn" onclick="toggleAnswers()" style="background: var(--wf-white);">Toggle Answers</button>
      <button class="btn" onclick="window.print()" style="background: var(--wf-dark); color: white;">Print (KDP)</button>
    </div>
    <div id="keyboard-hint" class="no-print" style="margin-bottom: 15px; font-weight: bold; color: var(--wf-dark); background: #fff3cd; padding: 10px; border: 2px solid #ffeeba; display: inline-block;">💡 Tip: Click on a white cell to start typing numbers (1-9). Use Arrow keys to navigate, Backspace to delete.</div>
    <div class="game-area" id="game-board"></div>
  </div>
  <script>
    // 5x5 Kakuro Templates
    // B = Blank Black
    // W = White (Input)
    // {d: 16, a: 24} = Clue Black (down sum, across sum)
    const puzzles = [
      {
        cols: 5, rows: 5,
        grid: [
          ['B', {d: 4, a: null}, {d: 22, a: null}, 'B', 'B'],
          [{d: null, a: 3}, 'W', 'W', {d: 16, a: null}, {d: 3, a: null}],
          [{d: null, a: 15}, 'W', 'W', 'W', 'W'],
          ['B', {d: null, a: 16}, 'W', 'W', 'W'],
          ['B', 'B', {d: null, a: 7}, 'W', 'W']
        ],
        answers: [
          [null, null, null, null, null],
          [null, 1, 2, null, null],
          [null, 3, 5, 6, 1],
          [null, null, 7, 4, 5],
          [null, null, null, 6, 1]
        ]
      },
      {
        cols: 5, rows: 5,
        grid: [
          ['B', {d: 12, a: null}, {d: 4, a: null}, 'B', 'B'],
          [{d: null, a: 11}, 'W', 'W', {d: 10, a: null}, 'B'],
          [{d: null, a: 10}, 'W', 'W', 'W', {d: 3, a: null}],
          ['B', {d: null, a: 6}, 'W', 'W', 'W'],
          ['B', 'B', {d: null, a: 4}, 'W', 'W']
        ],
        answers: [
          [null, null, null, null, null],
          [null, 8, 3, null, null],
          [null, 4, 1, 5, null],
          [null, null, null, 4, 2],
          [null, null, null, 1, 3]
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
      userAnswers = Array(currentPuzzle.rows).fill(null).map(() => Array(currentPuzzle.cols).fill(''));
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
      if (currentPuzzle.grid[r][c] !== 'W') return;
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
        let c = selectedCol + 1;
        while (c < currentPuzzle.cols && currentPuzzle.grid[selectedRow][c] !== 'W') c++;
        if (c < currentPuzzle.cols) { selectedCol = c; render(); }
      } else if (e.key === 'ArrowLeft') {
        let c = selectedCol - 1;
        while (c >= 0 && currentPuzzle.grid[selectedRow][c] !== 'W') c--;
        if (c >= 0) { selectedCol = c; render(); }
      } else if (e.key === 'ArrowDown') {
        let r = selectedRow + 1;
        while (r < currentPuzzle.rows && currentPuzzle.grid[r][selectedCol] !== 'W') r++;
        if (r < currentPuzzle.rows) { selectedRow = r; render(); }
      } else if (e.key === 'ArrowUp') {
        let r = selectedRow - 1;
        while (r >= 0 && currentPuzzle.grid[r][selectedCol] !== 'W') r--;
        if (r >= 0) { selectedRow = r; render(); }
      }
    });

    function render() {
      if (!currentPuzzle) return;
      const p = currentPuzzle;
      
      let html = \`<div class="grid" style="grid-template-columns: repeat(\${p.cols}, 50px);">\`;
      
      for (let r = 0; r < p.rows; r++) {
        for (let c = 0; c < p.cols; c++) {
          const cell = p.grid[r][c];
          
          if (cell === 'B') {
            html += \`<div class="cell empty-black"></div>\`;
          } else if (cell === 'W') {
            const ans = showAnswers ? \`<span class="answer-text">\${p.answers[r][c]}</span>\` : userAnswers[r][c];
            const isSelected = (r === selectedRow && c === selectedCol);
            let classes = "cell input-cell";
            if (isSelected) classes += " selected";
            html += \`<div class="\${classes}" onclick="selectCell(\${r}, \${c})">\${ans}</div>\`;
          } else {
            // Clue cell
            html += \`<div class="cell black">
              <svg class="kakuro-svg"><line x1="0" y1="0" x2="50" y2="50" stroke="white" stroke-width="1"/></svg>
              \${cell.d ? \`<span class="sum-down">\${cell.d}</span>\` : ''}
              \${cell.a ? \`<span class="sum-across">\${cell.a}</span>\` : ''}
            </div>\`;
          }
        }
      }
      html += \`</div>\`;
      document.getElementById('game-board').innerHTML = html;
    }
    
    generate();
  </script>
</body>
</html>`;
