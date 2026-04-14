export const numberSearchHTML = `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Number Search</title>
<style>
  :root { --wf-bg: #E4E3E0; --wf-dark: #141414; --wf-white: #FFFFFF; --wf-blue: #0055FF; }
  body { font-family: 'Courier New', Courier, monospace; background: var(--wf-bg); color: var(--wf-dark); margin: 0; padding: 20px; }
  .container { max-width: 800px; margin: 0 auto; background: var(--wf-white); border: 4px solid var(--wf-dark); box-shadow: 8px 8px 0px 0px var(--wf-dark); padding: 30px; }
  h1 { text-transform: uppercase; font-weight: 900; font-size: 2.5rem; border-bottom: 4px solid var(--wf-dark); padding-bottom: 10px; margin-top: 0; }
  .controls { display: flex; gap: 10px; margin-bottom: 30px; flex-wrap: wrap; }
  .btn { background: var(--wf-blue); color: white; border: 4px solid var(--wf-dark); padding: 10px 20px; font-weight: 900; text-transform: uppercase; cursor: pointer; box-shadow: 4px 4px 0px 0px var(--wf-dark); }
  .btn:hover { transform: translate(2px, 2px); box-shadow: 2px 2px 0px 0px var(--wf-dark); }
  
  .game-area { display: flex; gap: 40px; align-items: flex-start; flex-wrap: wrap; }
  .grid { display: grid; border: 4px solid var(--wf-dark); background: var(--wf-white); padding: 10px; gap: 5px; user-select: none; }
  .cell { width: 30px; height: 30px; display: flex; align-items: center; justify-content: center; font-size: 1.2rem; font-weight: bold; position: relative; cursor: pointer; }
  .cell.highlight { background: var(--wf-dark); color: var(--wf-white); border-radius: 50%; }
  .cell.selected { background: #b3f5ff; border-radius: 50%; }
  .cell.found { background: var(--wf-blue); color: var(--wf-white); border-radius: 50%; }
  
  .word-list-container { flex: 1; min-width: 200px; }
  .word-list-title { text-transform: uppercase; font-weight: 900; border-bottom: 2px solid var(--wf-dark); padding-bottom: 5px; margin-bottom: 15px; }
  .word-list { list-style: none; padding: 0; display: grid; grid-template-columns: repeat(auto-fill, minmax(100px, 1fr)); gap: 10px; }
  .word-item { font-size: 1.2rem; font-weight: bold; letter-spacing: 2px; transition: all 0.3s; }
  .word-item.found-word { text-decoration: line-through; color: #888; opacity: 0.7; }

  @media print {
    body { background: white; padding: 0; -webkit-print-color-adjust: exact; print-color-adjust: exact; }
    .container { border: none; box-shadow: none; padding: 0; }
    .no-print { display: none !important; }
    .grid { border: 4px solid black !important; }
    .cell.highlight { background: #ccc !important; color: black !important; }
    h1, .word-list-title, .word-item { color: black !important; border-color: black !important; }
  }
</style>
</head>
<body>
  <div class="container">
    <h1>Number Search</h1>
    <div class="controls no-print">
      <button class="btn" onclick="generate()">New Puzzle</button>
      <button class="btn" onclick="toggleAnswers()" style="background: var(--wf-white); color: var(--wf-dark);">Toggle Answers</button>
      <button class="btn" onclick="window.print()" style="background: var(--wf-dark); color: white;">Print (KDP)</button>
    </div>
    <div id="mouse-hint" class="no-print" style="margin-bottom: 15px; font-weight: bold; color: var(--wf-dark); background: #fff3cd; padding: 10px; border: 2px solid #ffeeba; display: inline-block;">💡 Tip: Click and drag across the grid to find and select the numbers!</div>
    <div class="game-area">
      <div id="grid-container"></div>
      <div class="word-list-container">
        <div class="word-list-title">Find These Numbers</div>
        <ul class="word-list" id="word-list"></ul>
      </div>
    </div>
  </div>
  <script>
    const numberLists = [
      ["14925", "83746", "99210", "55432", "10293", "47586", "11223", "98765", "34567", "50505"],
      ["84729", "10384", "56789", "98123", "45612", "77889", "23456", "89012", "34125", "67890"],
      ["13579", "24680", "11235", "81321", "34558", "98712", "45678", "10987", "54321", "67812"]
    ];

    let currentGrid = [];
    let currentAnswers = [];
    let showAnswers = false;
    const gridSize = 12;

    let numbersToFind = [];
    let foundNumbers = new Set();
    let foundCells = new Set();
    let isSelecting = false;
    let startCell = null;
    let currentSelection = [];

    function generate() {
      numbersToFind = numberLists[Math.floor(Math.random() * numberLists.length)];
      currentGrid = Array(gridSize).fill(null).map(() => Array(gridSize).fill(''));
      currentAnswers = [];
      foundNumbers.clear();
      foundCells.clear();
      isSelecting = false;
      startCell = null;
      currentSelection = [];
      
      // Directions: right, down, diagonal down-right
      const dirs = [[0, 1], [1, 0], [1, 1]];
      
      // Place numbers
      numbersToFind.forEach(numStr => {
        let placed = false;
        let attempts = 0;
        while (!placed && attempts < 100) {
          const dir = dirs[Math.floor(Math.random() * dirs.length)];
          const r = Math.floor(Math.random() * gridSize);
          const c = Math.floor(Math.random() * gridSize);
          
          let canPlace = true;
          for (let i = 0; i < numStr.length; i++) {
            const nr = r + dir[0] * i;
            const nc = c + dir[1] * i;
            if (nr >= gridSize || nc >= gridSize || (currentGrid[nr][nc] !== '' && currentGrid[nr][nc] !== numStr[i])) {
              canPlace = false;
              break;
            }
          }
          
          if (canPlace) {
            const answerCells = [];
            for (let i = 0; i < numStr.length; i++) {
              const nr = r + dir[0] * i;
              const nc = c + dir[1] * i;
              currentGrid[nr][nc] = numStr[i];
              answerCells.push(\`\${nr},\${nc}\`);
            }
            currentAnswers.push(answerCells);
            placed = true;
          }
          attempts++;
        }
      });
      
      // Fill empty cells with random digits
      for (let r = 0; r < gridSize; r++) {
        for (let c = 0; c < gridSize; c++) {
          if (currentGrid[r][c] === '') {
            currentGrid[r][c] = Math.floor(Math.random() * 10).toString();
          }
        }
      }
      
      showAnswers = false;
      render();
    }

    function toggleAnswers() {
      showAnswers = !showAnswers;
      render();
    }

    function startSelect(r, c) {
      if (showAnswers) return;
      isSelecting = true;
      startCell = {r, c};
      currentSelection = [{r, c}];
      render();
    }

    function enterCell(r, c) {
      if (!isSelecting || showAnswers) return;
      
      const dr = r - startCell.r;
      const dc = c - startCell.c;
      
      if (dr === 0 || dc === 0 || Math.abs(dr) === Math.abs(dc)) {
        currentSelection = [];
        const steps = Math.max(Math.abs(dr), Math.abs(dc));
        const stepR = dr === 0 ? 0 : dr / steps;
        const stepC = dc === 0 ? 0 : dc / steps;
        
        for (let i = 0; i <= steps; i++) {
          currentSelection.push({
            r: startCell.r + stepR * i,
            c: startCell.c + stepC * i
          });
        }
        render();
      }
    }

    function endSelect() {
      if (!isSelecting) return;
      isSelecting = false;
      
      if (currentSelection.length > 0) {
        let str = currentSelection.map(cell => currentGrid[cell.r][cell.c]).join('');
        let revStr = str.split('').reverse().join('');
        
        let foundIdx = numbersToFind.findIndex(n => n === str || n === revStr);
        if (foundIdx !== -1 && !foundNumbers.has(numbersToFind[foundIdx])) {
          foundNumbers.add(numbersToFind[foundIdx]);
          currentSelection.forEach(cell => foundCells.add(\`\${cell.r},\${cell.c}\`));
        }
      }
      
      currentSelection = [];
      render();
    }

    document.addEventListener('mouseup', endSelect);

    function render() {
      const answerSet = new Set();
      if (showAnswers) {
        currentAnswers.forEach(cells => cells.forEach(c => answerSet.add(c)));
      }
      
      let html = \`<div class="grid" style="grid-template-columns: repeat(\${gridSize}, 30px);" onmouseleave="endSelect()">\`;
      for (let r = 0; r < gridSize; r++) {
        for (let c = 0; c < gridSize; c++) {
          const isAns = answerSet.has(\`\${r},\${c}\`);
          const isFound = foundCells.has(\`\${r},\${c}\`);
          const isSelected = currentSelection.some(cell => cell.r === r && cell.c === c);
          
          let classes = "cell";
          if (isAns) classes += " highlight";
          else if (isFound) classes += " found";
          else if (isSelected) classes += " selected";
          
          html += \`<div class="\${classes}" onmousedown="startSelect(\${r}, \${c})" onmouseenter="enterCell(\${r}, \${c})">\${currentGrid[r][c]}</div>\`;
        }
      }
      html += '</div>';
      document.getElementById('grid-container').innerHTML = html;
      
      document.getElementById('word-list').innerHTML = numbersToFind.map(n => {
        const isFound = foundNumbers.has(n);
        return \`<li class="word-item \${isFound ? 'found-word' : ''}">\${n}</li>\`;
      }).join('');
    }
    
    generate();
  </script>
</body>
</html>`;
