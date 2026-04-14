export const minesweeperHTML = `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Minesweeper Logic</title>
<style>
  :root { --wf-bg: #E4E3E0; --wf-dark: #141414; --wf-white: #FFFFFF; --wf-red: #FF2A00; }
  body { font-family: 'Courier New', Courier, monospace; background: var(--wf-bg); color: var(--wf-dark); margin: 0; padding: 20px; }
  .container { max-width: 800px; margin: 0 auto; background: var(--wf-white); border: 4px solid var(--wf-dark); box-shadow: 8px 8px 0px 0px var(--wf-dark); padding: 30px; }
  h1 { text-transform: uppercase; font-weight: 900; font-size: 2.5rem; border-bottom: 4px solid var(--wf-dark); padding-bottom: 10px; margin-top: 0; }
  .controls { display: flex; gap: 10px; margin-bottom: 30px; flex-wrap: wrap; }
  .btn { background: var(--wf-white); color: var(--wf-dark); border: 4px solid var(--wf-dark); padding: 10px 20px; font-weight: 900; text-transform: uppercase; cursor: pointer; box-shadow: 4px 4px 0px 0px var(--wf-dark); }
  .btn:hover { transform: translate(2px, 2px); box-shadow: 2px 2px 0px 0px var(--wf-dark); }
  
  .game-area { display: flex; justify-content: center; margin-top: 20px; }
  .grid { display: grid; border-top: 2px solid var(--wf-dark); border-left: 2px solid var(--wf-dark); width: fit-content; }
  .cell { width: 40px; height: 40px; border-bottom: 2px solid var(--wf-dark); border-right: 2px solid var(--wf-dark); display: flex; align-items: center; justify-content: center; font-size: 1.5rem; font-weight: bold; box-sizing: border-box; }
  
  .mine { color: var(--wf-red); }
  .hidden-mine { color: transparent; }

  @media print {
    body { background: white; padding: 0; -webkit-print-color-adjust: exact; print-color-adjust: exact; }
    .container { border: none; box-shadow: none; padding: 0; }
    .no-print { display: none !important; }
    .grid { border-top: 2px solid black !important; border-left: 2px solid black !important; }
    .cell { border-bottom: 2px solid black !important; border-right: 2px solid black !important; color: black !important; }
    .mine { color: black !important; }
    h1 { color: black !important; border-color: black !important; }
  }
</style>
</head>
<body>
  <div class="container">
    <h1>Minesweeper Logic</h1>
    <p>Find the hidden mines (M) using the numbers as clues.</p>
    <div class="controls no-print">
      <button class="btn" onclick="generate()">New Puzzle</button>
      <button class="btn" onclick="toggleAnswers()" style="background: var(--wf-red); color: white;">Toggle Answers</button>
      <button class="btn" onclick="window.print()" style="background: var(--wf-dark); color: white;">Print (KDP)</button>
    </div>
    <div class="game-area" id="game-board"></div>
  </div>
  <script>
    const puzzles = [
      {
        cols: 6, rows: 6,
        grid: [
          [1, 1, 1, 0, 0, 0],
          [1,'M',1, 0, 0, 0],
          [1, 1, 2, 1, 1, 0],
          [0, 0, 1,'M',1, 0],
          [0, 0, 1, 1, 1, 0],
          [0, 0, 0, 0, 0, 0]
        ]
      },
      {
        cols: 6, rows: 6,
        grid: [
          [0, 1,'M',1, 0, 0],
          [0, 1, 1, 2, 1, 1],
          [0, 0, 0, 1,'M',1],
          [0, 0, 0, 1, 1, 1],
          [1, 1, 0, 0, 0, 0],
          ['M',1, 0, 0, 0, 0]
        ]
      }
    ];

    let currentPuzzle = null;
    let showAnswers = false;

    function generate() {
      currentPuzzle = puzzles[Math.floor(Math.random() * puzzles.length)];
      showAnswers = false;
      render();
    }

    function toggleAnswers() {
      showAnswers = !showAnswers;
      render();
    }

    function render() {
      if (!currentPuzzle) return;
      const p = currentPuzzle;
      
      let html = \`<div class="grid" style="grid-template-columns: repeat(\${p.cols}, 40px);">\`;
      
      for (let r = 0; r < p.rows; r++) {
        for (let c = 0; c < p.cols; c++) {
          const cell = p.grid[r][c];
          if (cell === 'M') {
            html += \`<div class="cell \${showAnswers ? 'mine' : 'hidden-mine'}">M</div>\`;
          } else {
            html += \`<div class="cell">\${cell === 0 ? '' : cell}</div>\`;
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
