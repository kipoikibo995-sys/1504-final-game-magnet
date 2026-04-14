export const hangmanHTML = `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Hangman</title>
<style>
  :root { --wf-bg: #E4E3E0; --wf-dark: #141414; --wf-white: #FFFFFF; --wf-green: #00C853; }
  body { font-family: 'Courier New', Courier, monospace; background: var(--wf-bg); color: var(--wf-dark); margin: 0; padding: 20px; }
  .container { max-width: 800px; margin: 0 auto; background: var(--wf-white); border: 4px solid var(--wf-dark); box-shadow: 8px 8px 0px 0px var(--wf-dark); padding: 30px; }
  h1 { text-transform: uppercase; font-weight: 900; font-size: 2.5rem; border-bottom: 4px solid var(--wf-dark); padding-bottom: 10px; margin-top: 0; }
  .controls { display: flex; gap: 10px; margin-bottom: 30px; flex-wrap: wrap; }
  .btn { background: var(--wf-white); color: var(--wf-dark); border: 4px solid var(--wf-dark); padding: 10px 20px; font-weight: 900; text-transform: uppercase; cursor: pointer; box-shadow: 4px 4px 0px 0px var(--wf-dark); }
  .btn:hover { transform: translate(2px, 2px); box-shadow: 2px 2px 0px 0px var(--wf-dark); }
  
  .game-area { display: flex; flex-direction: column; align-items: center; margin-top: 20px; }
  
  .gallows { width: 200px; height: 250px; border-bottom: 4px solid var(--wf-dark); border-left: 4px solid var(--wf-dark); position: relative; margin-bottom: 40px; }
  .gallows::before { content: ''; position: absolute; top: 0; left: 0; width: 100px; height: 4px; background: var(--wf-dark); }
  .gallows::after { content: ''; position: absolute; top: 0; left: 100px; width: 4px; height: 30px; background: var(--wf-dark); }
  
  /* The Hangman parts (hidden by default for printable puzzle) */
  .hangman-head { position: absolute; top: 30px; left: 82px; width: 40px; height: 40px; border: 4px solid var(--wf-dark); border-radius: 50%; box-sizing: border-box; }
  .hangman-body { position: absolute; top: 70px; left: 100px; width: 4px; height: 60px; background: var(--wf-dark); }
  .hangman-arm-l { position: absolute; top: 80px; left: 70px; width: 30px; height: 4px; background: var(--wf-dark); transform: rotate(45deg); }
  .hangman-arm-r { position: absolute; top: 80px; left: 104px; width: 30px; height: 4px; background: var(--wf-dark); transform: rotate(-45deg); }
  .hangman-leg-l { position: absolute; top: 126px; left: 80px; width: 4px; height: 40px; background: var(--wf-dark); transform: rotate(30deg); }
  .hangman-leg-r { position: absolute; top: 126px; left: 120px; width: 4px; height: 40px; background: var(--wf-dark); transform: rotate(-30deg); }

  .clue-box { font-size: 1.5rem; font-weight: bold; margin-bottom: 30px; text-align: center; border: 2px dashed var(--wf-dark); padding: 15px; width: 80%; }
  
  .word-display { display: flex; gap: 10px; }
  .letter-slot { width: 40px; height: 50px; border-bottom: 4px solid var(--wf-dark); display: flex; align-items: flex-end; justify-content: center; font-size: 2rem; font-weight: bold; padding-bottom: 5px; text-transform: uppercase; }
  
  .answer-text { color: var(--wf-green); }

  @media print {
    body { background: white; padding: 0; -webkit-print-color-adjust: exact; print-color-adjust: exact; }
    .container { border: none; box-shadow: none; padding: 0; }
    .no-print { display: none !important; }
    .gallows, .gallows::before, .gallows::after, .hangman-head, .hangman-body, .hangman-arm-l, .hangman-arm-r, .hangman-leg-l, .hangman-leg-r { border-color: black !important; background-color: black !important; }
    .hangman-head { background-color: transparent !important; }
    .letter-slot { border-bottom: 4px solid black !important; }
    .clue-box { border: 2px dashed black !important; }
    .answer-text { color: black !important; }
    h1 { color: black !important; border-color: black !important; }
  }
</style>
</head>
<body>
  <div class="container">
    <h1>Hangman</h1>
    <div class="controls no-print">
      <button class="btn" onclick="generate()">New Puzzle</button>
      <button class="btn" onclick="toggleAnswers()" style="background: var(--wf-green); color: white;">Toggle Answers</button>
      <button class="btn" onclick="window.print()" style="background: var(--wf-dark); color: white;">Print (KDP)</button>
    </div>
    <div class="game-area">
      <div class="gallows">
        <!-- Static drawing for the printable page -->
        <div class="hangman-head"></div>
        <div class="hangman-body"></div>
        <div class="hangman-arm-l"></div>
        <div class="hangman-arm-r"></div>
      </div>
      
      <div class="clue-box" id="clue">Clue: A popular fruit</div>
      
      <div class="word-display" id="word-board"></div>
    </div>
  </div>
  <script>
    const puzzles = [
      { word: "ELEPHANT", clue: "Large mammal with a trunk" },
      { word: "ASTRONAUT", clue: "Travels to space" },
      { word: "PYRAMID", clue: "Ancient Egyptian structure" },
      { word: "GUITAR", clue: "A six-stringed instrument" }
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
      
      document.getElementById('clue').innerText = "Clue: " + currentPuzzle.clue;
      
      let html = '';
      for (let i = 0; i < currentPuzzle.word.length; i++) {
        const char = currentPuzzle.word[i];
        if (char === ' ') {
          html += \`<div class="letter-slot" style="border: none;"></div>\`;
        } else {
          const displayChar = showAnswers ? \`<span class="answer-text">\${char}</span>\` : '';
          html += \`<div class="letter-slot">\${displayChar}</div>\`;
        }
      }
      
      document.getElementById('word-board').innerHTML = html;
    }
    
    generate();
  </script>
</body>
</html>`;
