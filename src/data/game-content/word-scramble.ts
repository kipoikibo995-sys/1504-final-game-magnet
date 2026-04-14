export const wordScrambleHTML = `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Word Scramble</title>
<style>
  :root { --wf-bg: #E4E3E0; --wf-dark: #141414; --wf-white: #FFFFFF; --wf-gold: #FFD700; }
  body { font-family: 'Courier New', Courier, monospace; background: var(--wf-bg); color: var(--wf-dark); margin: 0; padding: 20px; }
  .container { max-width: 800px; margin: 0 auto; background: var(--wf-white); border: 4px solid var(--wf-dark); box-shadow: 8px 8px 0px 0px var(--wf-dark); padding: 30px; }
  h1 { text-transform: uppercase; font-weight: 900; font-size: 2.5rem; border-bottom: 4px solid var(--wf-dark); padding-bottom: 10px; margin-top: 0; }
  .controls { display: flex; gap: 10px; margin-bottom: 30px; flex-wrap: wrap; }
  .btn { background: var(--wf-gold); color: var(--wf-dark); border: 4px solid var(--wf-dark); padding: 10px 20px; font-weight: 900; text-transform: uppercase; cursor: pointer; box-shadow: 4px 4px 0px 0px var(--wf-dark); }
  .btn:hover { transform: translate(2px, 2px); box-shadow: 2px 2px 0px 0px var(--wf-dark); }
  .custom-input-group { display: flex; gap: 10px; width: 100%; margin-bottom: 20px; }
  .custom-input { flex-grow: 1; padding: 10px; border: 4px solid var(--wf-dark); font-family: 'Courier New', Courier, monospace; font-weight: bold; font-size: 1rem; text-transform: uppercase; }
  .scramble-list { list-style: none; padding: 0; font-size: 1.5rem; font-weight: bold; }
  .scramble-item { display: flex; align-items: center; margin-bottom: 25px; }
  .scramble-num { width: 40px; }
  .scramble-word { width: 250px; letter-spacing: 2px; text-transform: uppercase; }
  .scramble-line { flex-grow: 1; border-bottom: 3px dashed var(--wf-dark); height: 30px; margin-left: 20px; position: relative; cursor: pointer; display: flex; align-items: flex-end; padding-bottom: 2px; font-size: 1.5rem; color: var(--wf-gold); font-weight: bold; }
  .scramble-line.selected { background: var(--wf-dark); color: var(--wf-gold); border-bottom: 3px solid var(--wf-dark); }
  .answer-text { position: absolute; bottom: 2px; left: 10px; color: #FF4D00; font-size: 1.2rem; }
  @media print {
    body { background: white; padding: 0; -webkit-print-color-adjust: exact; print-color-adjust: exact; }
    .container { border: none; box-shadow: none; padding: 0; }
    .no-print { display: none !important; }
    .scramble-line { border-bottom: 3px dashed black !important; }
    .answer-text { color: black !important; }
    h1, .scramble-num, .scramble-word { color: black !important; border-color: black !important; }
  }
</style>
</head>
<body>
  <div class="container">
    <h1>Word Scramble</h1>
    <div class="controls no-print">
      <div class="custom-input-group">
        <input type="text" id="custom-word" class="custom-input" placeholder="Enter custom words (comma separated)...">
        <button class="btn" onclick="addCustomWords()">Add Words</button>
      </div>
      <button class="btn" onclick="generate()">New Puzzle</button>
      <button class="btn" onclick="toggleAnswers()" style="background: var(--wf-white);">Toggle Answers</button>
      <button class="btn" onclick="window.print()" style="background: var(--wf-dark); color: white;">Print (KDP)</button>
    </div>
    <div id="keyboard-hint" class="no-print" style="margin-bottom: 15px; font-weight: bold; color: var(--wf-dark); background: #fff3cd; padding: 10px; border: 2px solid #ffeeba; display: inline-block;">💡 Tip: Click on a dashed line to start typing. Use Up/Down arrows to navigate between words.</div>
    <ul id="game-board" class="scramble-list"></ul>
  </div>
  <script>
    let wordBank = ["PUBLISH", "AMAZON", "PUZZLE", "INCOME", "PASSIVE", "BRUTALIST", "DESIGN", "AUTHOR", "ROYALTY", "KEYWORD", "NICHE", "FORMAT", "UPLOAD", "KINDLE", "PAPERBACK", "PROFIT", "MARKETING", "COVER", "MANUSCRIPT", "CONTENT"];
    
    let currentWords = [];
    let showAnswers = false;
    let userAnswers = [];
    let selectedIndex = -1;

    function addCustomWords() {
      const input = document.getElementById('custom-word').value;
      if (!input) return;
      
      const newWords = input.split(',')
        .map(w => w.trim().toUpperCase())
        .filter(w => w.length > 0 && /^[A-Z]+$/.test(w));
        
      if (newWords.length > 0) {
        wordBank = [...newWords, ...wordBank];
        // Keep bank size manageable
        if (wordBank.length > 50) wordBank = wordBank.slice(0, 50);
        document.getElementById('custom-word').value = '';
        generate();
      } else {
        alert("Please enter valid words (letters only).");
      }
    }

    function shuffle(str) {
      let a = str.split(''), n = a.length;
      for(let i = n - 1; i > 0; i--) {
        let j = Math.floor(Math.random() * (i + 1));
        let tmp = a[i]; a[i] = a[j]; a[j] = tmp;
      }
      return a.join('');
    }

    function generate() {
      const shuffledBank = [...wordBank].sort(() => Math.random() - 0.5).slice(0, 10);
      currentWords = shuffledBank.map(word => {
        let scrambled = shuffle(word);
        while(scrambled === word) scrambled = shuffle(word);
        return { original: word, scrambled: scrambled };
      });
      showAnswers = false;
      userAnswers = Array(currentWords.length).fill('');
      selectedIndex = -1;
      render();
    }

    function toggleAnswers() {
      showAnswers = !showAnswers;
      render();
    }

    function selectLine(index) {
      if (showAnswers) return;
      selectedIndex = index;
      render();
    }

    document.addEventListener('keydown', (e) => {
      if (document.activeElement.tagName === 'INPUT') return;
      if (selectedIndex === -1) return;
      if (showAnswers) return;

      if (["ArrowUp", "ArrowDown", "Space"].includes(e.code)) {
        e.preventDefault();
      }

      if (e.key.length === 1 && e.key.match(/^[a-z]$/i)) {
        if (userAnswers[selectedIndex].length < currentWords[selectedIndex].original.length) {
          userAnswers[selectedIndex] += e.key.toUpperCase();
          render();
        }
      } else if (e.key === 'Backspace') {
        if (userAnswers[selectedIndex].length > 0) {
          userAnswers[selectedIndex] = userAnswers[selectedIndex].slice(0, -1);
          render();
        }
      } else if (e.key === 'ArrowDown') {
        if (selectedIndex < currentWords.length - 1) {
          selectedIndex++;
          render();
        }
      } else if (e.key === 'ArrowUp') {
        if (selectedIndex > 0) {
          selectedIndex--;
          render();
        }
      }
    });

    function render() {
      let html = '';
      currentWords.forEach((item, index) => {
        let ans = '';
        if (showAnswers) {
          ans = \`<span class="answer-text">\${item.original}</span>\`;
        } else {
          ans = \`<span style="padding-left: 10px;">\${userAnswers[index]}</span>\`;
        }

        const isSelected = (index === selectedIndex);
        let classes = "scramble-line";
        if (isSelected) classes += " selected";

        html += \`
          <li class="scramble-item">
            <span class="scramble-num">\${index + 1}.</span>
            <span class="scramble-word">\${item.scrambled}</span>
            <div class="\${classes}" onclick="selectLine(\${index})">\${ans}</div>
          </li>
        \`;
      });
      document.getElementById('game-board').innerHTML = html;
    }
    
    generate();
  </script>
</body>
</html>`;
