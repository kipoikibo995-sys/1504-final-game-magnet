export const nonogramHTML = `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Nonogram</title>
<style>
  :root { --wf-bg: #E4E3E0; --wf-dark: #141414; --wf-white: #FFFFFF; --wf-accent: #FF2A00; }
  body { font-family: 'Courier New', Courier, monospace; background: var(--wf-bg); color: var(--wf-dark); margin: 0; padding: 20px; }
  .container { max-width: 800px; margin: 0 auto; background: var(--wf-white); border: 4px solid var(--wf-dark); box-shadow: 8px 8px 0px 0px var(--wf-dark); padding: 30px; }
  h1 { text-transform: uppercase; font-weight: 900; font-size: 2.5rem; border-bottom: 4px solid var(--wf-dark); padding-bottom: 10px; margin-top: 0; }
  .controls { display: flex; gap: 10px; margin-bottom: 30px; flex-wrap: wrap; }
  .btn { background: var(--wf-dark); color: white; border: 4px solid var(--wf-dark); padding: 10px 20px; font-weight: 900; text-transform: uppercase; cursor: pointer; box-shadow: 4px 4px 0px 0px var(--wf-dark); }
  .btn:hover { transform: translate(2px, 2px); box-shadow: 2px 2px 0px 0px var(--wf-dark); }
  
  .game-area { display: flex; justify-content: center; margin-top: 20px; overflow-x: auto; }
  
  table { border-collapse: collapse; }
  td, th { border: 1px solid var(--wf-dark); text-align: center; vertical-align: bottom; padding: 2px; }
  
  /* Thicker borders for 5x5 blocks */
  td:nth-child(5n+1), th:nth-child(5n+1) { border-right: 2px solid var(--wf-dark); }
  tr:nth-child(5n+1) td, tr:nth-child(5n+1) th { border-bottom: 2px solid var(--wf-dark); }
  
  .top-clues th { height: 80px; vertical-align: bottom; padding-bottom: 5px; font-size: 14px; font-weight: bold; }
  .left-clues { text-align: right; padding-right: 10px; font-size: 14px; font-weight: bold; white-space: nowrap; }
  .corner { border: none !important; }
  
  .cell { width: 30px; height: 30px; cursor: pointer; }
  .cell.filled { background: var(--wf-dark); -webkit-print-color-adjust: exact; print-color-adjust: exact; }
  
  @media print {
    body { background: white; padding: 0; -webkit-print-color-adjust: exact; print-color-adjust: exact; }
    .container { border: none; box-shadow: none; padding: 0; }
    .no-print { display: none !important; }
    td, th { border: 1px solid black !important; color: black !important; }
    td:nth-child(5n+1), th:nth-child(5n+1) { border-right: 2px solid black !important; }
    tr:nth-child(5n+1) td, tr:nth-child(5n+1) th { border-bottom: 2px solid black !important; }
    .cell.filled { background: black !important; }
    .corner { border: none !important; }
    h1 { color: black !important; border-color: black !important; }
  }
</style>
</head>
<body>
  <div class="container">
    <h1>Nonogram (Picross)</h1>
    <div class="controls no-print">
      <button class="btn" onclick="generate()">New Puzzle</button>
      <button class="btn" onclick="toggleAnswers()" style="background: var(--wf-white); color: var(--wf-dark);">Toggle Answers</button>
      <button class="btn" onclick="window.print()" style="background: var(--wf-accent); color: white;">Print (KDP)</button>
    </div>
    <div class="game-area" id="game-board"></div>
  </div>
  <script>
    const puzzles = [
      {
        // Heart 10x10
        grid: [
          [0,1,1,0,0,0,0,1,1,0],
          [1,1,1,1,0,0,1,1,1,1],
          [1,1,1,1,1,1,1,1,1,1],
          [1,1,1,1,1,1,1,1,1,1],
          [0,1,1,1,1,1,1,1,1,0],
          [0,0,1,1,1,1,1,1,0,0],
          [0,0,0,1,1,1,1,0,0,0],
          [0,0,0,0,1,1,0,0,0,0],
          [0,0,0,0,0,0,0,0,0,0],
          [0,0,0,0,0,0,0,0,0,0]
        ]
      },
      {
        // Smiley 10x10
        grid: [
          [0,0,1,1,1,1,1,1,0,0],
          [0,1,0,0,0,0,0,0,1,0],
          [1,0,1,0,0,0,0,1,0,1],
          [1,0,1,0,0,0,0,1,0,1],
          [1,0,0,0,0,0,0,0,0,1],
          [1,0,1,0,0,0,0,1,0,1],
          [1,0,0,1,1,1,1,0,0,1],
          [0,1,0,0,0,0,0,0,1,0],
          [0,0,1,1,1,1,1,1,0,0],
          [0,0,0,0,0,0,0,0,0,0]
        ]
      }
    ];

    let currentPuzzle = null;
    let showAnswers = false;

    function getClues(line) {
      const clues = [];
      let count = 0;
      for (let i = 0; i < line.length; i++) {
        if (line[i] === 1) {
          count++;
        } else if (count > 0) {
          clues.push(count);
          count = 0;
        }
      }
      if (count > 0) clues.push(count);
      if (clues.length === 0) clues.push(0);
      return clues;
    }

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
      const grid = currentPuzzle.grid;
      const rows = grid.length;
      const cols = grid[0].length;
      
      const topClues = [];
      for (let c = 0; c < cols; c++) {
        const colData = [];
        for (let r = 0; r < rows; r++) colData.push(grid[r][c]);
        topClues.push(getClues(colData));
      }
      
      const leftClues = [];
      for (let r = 0; r < rows; r++) {
        leftClues.push(getClues(grid[r]));
      }

      let html = '<table>';
      
      // Top clues row
      html += '<tr class="top-clues">';
      html += '<th class="corner"></th>';
      for (let c = 0; c < cols; c++) {
        html += \`<th>\${topClues[c].join('<br>')}</th>\`;
      }
      html += '</tr>';
      
      // Grid rows
      for (let r = 0; r < rows; r++) {
        html += '<tr>';
        html += \`<td class="left-clues">\${leftClues[r].join(' &nbsp;')}</td>\`;
        for (let c = 0; c < cols; c++) {
          const isFilled = showAnswers && grid[r][c] === 1;
          html += \`<td class="cell \${isFilled ? 'filled' : ''}"></td>\`;
        }
        html += '</tr>';
      }
      
      html += '</table>';
      document.getElementById('game-board').innerHTML = html;
    }
    
    generate();
  </script>
</body>
</html>`;
