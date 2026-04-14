export const futoshikiHTML = `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Futoshiki</title>
<style>
  :root { --wf-bg: #E4E3E0; --wf-dark: #141414; --wf-white: #FFFFFF; --wf-blue: #0055FF; }
  body { font-family: 'Courier New', Courier, monospace; background: var(--wf-bg); color: var(--wf-dark); margin: 0; padding: 20px; }
  .container { max-width: 800px; margin: 0 auto; background: var(--wf-white); border: 4px solid var(--wf-dark); box-shadow: 8px 8px 0px 0px var(--wf-dark); padding: 30px; }
  h1 { text-transform: uppercase; font-weight: 900; font-size: 2.5rem; border-bottom: 4px solid var(--wf-dark); padding-bottom: 10px; margin-top: 0; }
  .controls { display: flex; gap: 10px; margin-bottom: 30px; flex-wrap: wrap; }
  .btn { background: var(--wf-blue); color: white; border: 4px solid var(--wf-dark); padding: 10px 20px; font-weight: 900; text-transform: uppercase; cursor: pointer; box-shadow: 4px 4px 0px 0px var(--wf-dark); }
  .btn:hover { transform: translate(2px, 2px); box-shadow: 2px 2px 0px 0px var(--wf-dark); }
  
  .game-area { display: flex; justify-content: center; margin-top: 20px; }
  .board { display: flex; flex-direction: column; width: fit-content; background: var(--wf-white); padding: 10px; border: 4px solid var(--wf-dark); }
  .row { display: flex; }
  .v-gap-row { display: flex; height: 20px; }
  
  .cell { width: 50px; height: 50px; border: 2px solid var(--wf-dark); display: flex; align-items: center; justify-content: center; font-size: 1.5rem; font-weight: bold; box-sizing: border-box; }
  .h-gap { width: 20px; height: 50px; display: flex; align-items: center; justify-content: center; font-weight: bold; font-size: 1.2rem; }
  .v-gap { width: 50px; height: 20px; display: flex; align-items: center; justify-content: center; font-weight: bold; font-size: 1.2rem; }
  .corner { width: 20px; height: 20px; }
  
  .given-text { color: var(--wf-dark); }
  .answer-text { color: var(--wf-blue); }

  @media print {
    body { background: white; padding: 0; -webkit-print-color-adjust: exact; print-color-adjust: exact; }
    .container { border: none; box-shadow: none; padding: 0; }
    .no-print { display: none !important; }
    .board { border: 4px solid black !important; }
    .cell { border: 2px solid black !important; }
    .answer-text { color: black !important; }
    h1, .given-text, .h-gap, .v-gap { color: black !important; border-color: black !important; }
  }
</style>
</head>
<body>
  <div class="container">
    <h1>Futoshiki</h1>
    <div class="controls no-print">
      <button class="btn" onclick="generate()">New Puzzle</button>
      <button class="btn" onclick="toggleAnswers()" style="background: var(--wf-white); color: var(--wf-dark);">Toggle Answers</button>
      <button class="btn" onclick="window.print()" style="background: var(--wf-dark); color: white;">Print (KDP)</button>
    </div>
    <div class="game-area" id="game-board"></div>
  </div>
  <script>
    // 4x4 Futoshiki Templates
    const puzzles = [
      {
        size: 4,
        answers: [
          [3, 4, 1, 2],
          [4, 2, 3, 1],
          [1, 3, 2, 4],
          [2, 1, 4, 3]
        ],
        given: [
          [0, 0, 0, 2],
          [0, 0, 0, 0],
          [0, 3, 0, 0],
          [0, 0, 0, 0]
        ],
        inequalities: [
          { r1: 0, c1: 0, r2: 0, c2: 1, rel: '<' }, // 3 < 4
          { r1: 1, c1: 0, r2: 1, c2: 1, rel: '>' }, // 4 > 2
          { r1: 2, c1: 1, r2: 2, c2: 0, rel: '>' }, // 3 > 1
          { r1: 3, c1: 2, r2: 3, c2: 3, rel: '>' }, // 4 > 3
          { r1: 0, c1: 2, r2: 1, c2: 2, rel: '<' }, // 1 < 3 (vertical)
          { r1: 2, c1: 0, r2: 3, c2: 0, rel: '<' }  // 1 < 2 (vertical)
        ]
      },
      {
        size: 4,
        answers: [
          [2, 1, 4, 3],
          [3, 4, 2, 1],
          [4, 3, 1, 2],
          [1, 2, 3, 4]
        ],
        given: [
          [0, 0, 0, 0],
          [0, 4, 0, 0],
          [0, 0, 0, 2],
          [1, 0, 0, 0]
        ],
        inequalities: [
          { r1: 0, c1: 0, r2: 0, c2: 1, rel: '>' }, // 2 > 1
          { r1: 1, c1: 2, r2: 1, c2: 3, rel: '>' }, // 2 > 1
          { r1: 2, c1: 0, r2: 2, c2: 1, rel: '>' }, // 4 > 3
          { r1: 3, c1: 1, r2: 3, c2: 2, rel: '<' }, // 2 < 3
          { r1: 0, c1: 3, r2: 1, c2: 3, rel: '>' }, // 3 > 1 (vertical)
          { r1: 1, c1: 0, r2: 2, c2: 0, rel: '<' }  // 3 < 4 (vertical)
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
      const size = p.size;
      
      // Helper to find inequality
      const getRel = (r1, c1, r2, c2) => {
        const ineq = p.inequalities.find(i => 
          (i.r1 === r1 && i.c1 === c1 && i.r2 === r2 && i.c2 === c2) ||
          (i.r1 === r2 && i.c1 === c2 && i.r2 === r1 && i.c2 === c1)
        );
        if (!ineq) return '';
        
        if (r1 === r2) { // Horizontal
          if (ineq.c1 === c1) return ineq.rel; // Left to right
          return ineq.rel === '<' ? '>' : '<'; // Right to left
        } else { // Vertical
          if (ineq.r1 === r1) return ineq.rel === '<' ? '^' : 'v'; // Top to bottom
          return ineq.rel === '<' ? 'v' : '^'; // Bottom to top
        }
      };

      let html = '<div class="board">';
      
      for (let r = 0; r < size; r++) {
        // Cell row
        html += '<div class="row">';
        for (let c = 0; c < size; c++) {
          const given = p.given[r][c];
          let content = '';
          if (given !== 0) {
            content = \`<span class="given-text">\${given}</span>\`;
          } else if (showAnswers) {
            content = \`<span class="answer-text">\${p.answers[r][c]}</span>\`;
          }
          html += \`<div class="cell">\${content}</div>\`;
          
          // Horizontal gap
          if (c < size - 1) {
            const rel = getRel(r, c, r, c + 1);
            html += \`<div class="h-gap">\${rel}</div>\`;
          }
        }
        html += '</div>';
        
        // Vertical gap row
        if (r < size - 1) {
          html += '<div class="v-gap-row">';
          for (let c = 0; c < size; c++) {
            const rel = getRel(r, c, r + 1, c);
            html += \`<div class="v-gap">\${rel}</div>\`;
            if (c < size - 1) {
              html += '<div class="corner"></div>';
            }
          }
          html += '</div>';
        }
      }
      
      html += '</div>';
      document.getElementById('game-board').innerHTML = html;
    }
    
    generate();
  </script>
</body>
</html>`;
