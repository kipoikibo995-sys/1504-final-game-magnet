export const gridCopyHTML = `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Grid Copy</title>
<style>
  :root { --wf-bg: #E4E3E0; --wf-dark: #141414; --wf-white: #FFFFFF; --wf-accent: #FF2A00; }
  body { font-family: 'Courier New', Courier, monospace; background: var(--wf-bg); color: var(--wf-dark); margin: 0; padding: 20px; }
  .container { max-width: 800px; margin: 0 auto; background: var(--wf-white); border: 4px solid var(--wf-dark); box-shadow: 8px 8px 0px 0px var(--wf-dark); padding: 30px; }
  h1 { text-transform: uppercase; font-weight: 900; font-size: 2.5rem; border-bottom: 4px solid var(--wf-dark); padding-bottom: 10px; margin-top: 0; }
  .controls { display: flex; gap: 10px; margin-bottom: 30px; flex-wrap: wrap; }
  .btn { background: var(--wf-white); color: var(--wf-dark); border: 4px solid var(--wf-dark); padding: 10px 20px; font-weight: 900; text-transform: uppercase; cursor: pointer; box-shadow: 4px 4px 0px 0px var(--wf-dark); }
  .btn:hover { transform: translate(2px, 2px); box-shadow: 2px 2px 0px 0px var(--wf-dark); }
  
  .game-area { display: flex; gap: 40px; justify-content: center; margin-top: 20px; flex-wrap: wrap; }
  
  .grid-wrapper { display: flex; flex-direction: column; align-items: center; gap: 10px; }
  .grid-title { font-weight: bold; font-size: 1.2rem; text-transform: uppercase; }
  
  .grid { display: grid; border: 4px solid var(--wf-dark); background: var(--wf-white); }
  .cell { width: 30px; height: 30px; border: 1px solid #ccc; box-sizing: border-box; }
  .cell.filled { background: var(--wf-dark); -webkit-print-color-adjust: exact; print-color-adjust: exact; }
  .cell.answer-filled { background: var(--wf-accent); -webkit-print-color-adjust: exact; print-color-adjust: exact; }

  @media print {
    body { background: white; padding: 0; -webkit-print-color-adjust: exact; print-color-adjust: exact; }
    .container { border: none; box-shadow: none; padding: 0; }
    .no-print { display: none !important; }
    .grid { border: 4px solid black !important; }
    .cell { border: 1px solid #999 !important; }
    .cell.filled { background: black !important; }
    .cell.answer-filled { background: #666 !important; }
    h1, .grid-title { color: black !important; border-color: black !important; }
  }
</style>
</head>
<body>
  <div class="container">
    <h1>Grid Copy</h1>
    <p>Copy the picture from the left grid into the empty right grid.</p>
    <div class="controls no-print">
      <button class="btn" onclick="generate()">New Picture</button>
      <button class="btn" onclick="toggleAnswers()" style="background: var(--wf-accent); color: white;">Toggle Answers</button>
      <button class="btn" onclick="window.print()" style="background: var(--wf-dark); color: white;">Print (KDP)</button>
    </div>
    <div class="game-area" id="game-board"></div>
  </div>
  <script>
    const patterns = [
      {
        size: 8,
        data: [
          [0,0,0,1,1,0,0,0],
          [0,0,1,1,1,1,0,0],
          [0,1,1,0,0,1,1,0],
          [0,1,1,0,0,1,1,0],
          [0,1,1,1,1,1,1,0],
          [0,1,1,1,1,1,1,0],
          [0,1,1,0,0,1,1,0],
          [0,1,1,0,0,1,1,0]
        ] // Alien/Monster
      },
      {
        size: 8,
        data: [
          [0,0,0,1,1,0,0,0],
          [0,0,1,1,1,1,0,0],
          [0,1,1,1,1,1,1,0],
          [1,1,1,1,1,1,1,1],
          [0,0,1,1,1,1,0,0],
          [0,0,1,1,1,1,0,0],
          [0,0,1,1,1,1,0,0],
          [0,1,1,1,1,1,1,0]
        ] // Tree
      },
      {
        size: 8,
        data: [
          [0,1,1,0,0,1,1,0],
          [1,1,1,1,1,1,1,1],
          [1,1,1,1,1,1,1,1],
          [0,1,1,1,1,1,1,0],
          [0,0,1,1,1,1,0,0],
          [0,0,0,1,1,0,0,0],
          [0,0,0,0,0,0,0,0],
          [0,0,0,0,0,0,0,0]
        ] // Heart
      }
    ];

    let currentPattern = null;
    let showAnswers = false;

    function generate() {
      currentPattern = patterns[Math.floor(Math.random() * patterns.length)];
      showAnswers = false;
      render();
    }

    function toggleAnswers() {
      showAnswers = !showAnswers;
      render();
    }

    function render() {
      if (!currentPattern) return;
      const size = currentPattern.size;
      const data = currentPattern.data;
      
      let html = '';
      
      // Source Grid
      html += '<div class="grid-wrapper"><div class="grid-title">Source</div>';
      html += \`<div class="grid" style="grid-template-columns: repeat(\${size}, 30px);">\`;
      for (let r = 0; r < size; r++) {
        for (let c = 0; c < size; c++) {
          html += \`<div class="cell \${data[r][c] ? 'filled' : ''}"></div>\`;
        }
      }
      html += '</div></div>';
      
      // Target Grid
      html += '<div class="grid-wrapper"><div class="grid-title">Copy Here</div>';
      html += \`<div class="grid" style="grid-template-columns: repeat(\${size}, 30px);">\`;
      for (let r = 0; r < size; r++) {
        for (let c = 0; c < size; c++) {
          const isAns = showAnswers && data[r][c] ? 'answer-filled' : '';
          html += \`<div class="cell \${isAns}"></div>\`;
        }
      }
      html += '</div></div>';
      
      document.getElementById('game-board').innerHTML = html;
    }
    
    generate();
  </script>
</body>
</html>`;
