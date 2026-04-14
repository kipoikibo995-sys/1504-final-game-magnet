export const ticTacToeHTML = `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Tic-Tac-Toe Grids</title>
<style>
  :root { --wf-bg: #E4E3E0; --wf-dark: #141414; --wf-white: #FFFFFF; }
  body { font-family: 'Courier New', Courier, monospace; background: var(--wf-bg); color: var(--wf-dark); margin: 0; padding: 20px; }
  .container { max-width: 800px; margin: 0 auto; background: var(--wf-white); border: 4px solid var(--wf-dark); box-shadow: 8px 8px 0px 0px var(--wf-dark); padding: 30px; }
  h1 { text-transform: uppercase; font-weight: 900; font-size: 2.5rem; border-bottom: 4px solid var(--wf-dark); padding-bottom: 10px; margin-top: 0; }
  .controls { display: flex; gap: 10px; margin-bottom: 30px; flex-wrap: wrap; }
  .btn { background: var(--wf-white); color: var(--wf-dark); border: 4px solid var(--wf-dark); padding: 10px 20px; font-weight: 900; text-transform: uppercase; cursor: pointer; box-shadow: 4px 4px 0px 0px var(--wf-dark); }
  .btn:hover { transform: translate(2px, 2px); box-shadow: 2px 2px 0px 0px var(--wf-dark); }
  
  .game-area { display: flex; flex-wrap: wrap; gap: 50px; justify-content: center; margin-top: 20px; }
  
  .ttt-board { display: grid; grid-template-columns: repeat(3, 60px); grid-template-rows: repeat(3, 60px); }
  .ttt-cell { display: flex; align-items: center; justify-content: center; font-size: 2rem; font-weight: bold; }
  
  /* Internal borders only */
  .ttt-cell.border-b { border-bottom: 4px solid var(--wf-dark); }
  .ttt-cell.border-r { border-right: 4px solid var(--wf-dark); }

  @media print {
    body { background: white; padding: 0; -webkit-print-color-adjust: exact; print-color-adjust: exact; }
    .container { border: none; box-shadow: none; padding: 0; }
    .no-print { display: none !important; }
    .ttt-cell.border-b { border-bottom: 4px solid black !important; }
    .ttt-cell.border-r { border-right: 4px solid black !important; }
    h1 { color: black !important; border-color: black !important; }
  }
</style>
</head>
<body>
  <div class="container">
    <h1>Tic-Tac-Toe</h1>
    <p>Classic activity page filler. Grab a friend and play!</p>
    <div class="controls no-print">
      <button class="btn" onclick="window.print()" style="background: var(--wf-dark); color: white;">Print (KDP)</button>
    </div>
    <div class="game-area" id="game-board"></div>
  </div>
  <script>
    function render() {
      let html = '';
      // Generate 12 blank boards for a printable page
      for (let b = 0; b < 12; b++) {
        html += '<div class="ttt-board">';
        for (let i = 0; i < 9; i++) {
          let classes = ['ttt-cell'];
          if (i < 6) classes.push('border-b'); // Rows 1 and 2
          if (i % 3 !== 2) classes.push('border-r'); // Cols 1 and 2
          html += \`<div class="\${classes.join(' ')}"></div>\`;
        }
        html += '</div>';
      }
      document.getElementById('game-board').innerHTML = html;
    }
    
    render();
  </script>
</body>
</html>`;
