export const cryptogramHTML = `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Cryptogram</title>
<style>
  :root { --wf-bg: #E4E3E0; --wf-dark: #141414; --wf-white: #FFFFFF; --wf-purple: #B000FF; }
  body { font-family: 'Courier New', Courier, monospace; background: var(--wf-bg); color: var(--wf-dark); margin: 0; padding: 20px; }
  .container { max-width: 800px; margin: 0 auto; background: var(--wf-white); border: 4px solid var(--wf-dark); box-shadow: 8px 8px 0px 0px var(--wf-dark); padding: 30px; }
  h1 { text-transform: uppercase; font-weight: 900; font-size: 2.5rem; border-bottom: 4px solid var(--wf-dark); padding-bottom: 10px; margin-top: 0; }
  .controls { display: flex; gap: 10px; margin-bottom: 30px; flex-wrap: wrap; }
  .btn { background: var(--wf-purple); color: white; border: 4px solid var(--wf-dark); padding: 10px 20px; font-weight: 900; text-transform: uppercase; cursor: pointer; box-shadow: 4px 4px 0px 0px var(--wf-dark); }
  .btn:hover { transform: translate(2px, 2px); box-shadow: 2px 2px 0px 0px var(--wf-dark); }
  .custom-input-group { display: flex; gap: 10px; width: 100%; margin-bottom: 20px; }
  .custom-input { flex-grow: 1; padding: 10px; border: 4px solid var(--wf-dark); font-family: 'Courier New', Courier, monospace; font-weight: bold; font-size: 1rem; text-transform: uppercase; }
  .quote-container { display: flex; flex-wrap: wrap; gap: 20px; margin-bottom: 40px; line-height: 2; }
  .word { display: flex; gap: 5px; }
  .letter-box { display: flex; flex-direction: column; align-items: center; width: 24px; }
  .cipher-char { font-weight: bold; font-size: 1.2rem; }
  .guess-line { width: 100%; height: 24px; border-bottom: 2px solid var(--wf-dark); font-weight: bold; text-align: center; color: var(--wf-purple); cursor: pointer; }
  .guess-line.selected { background: var(--wf-blue); color: var(--wf-dark); }
  .guess-line.highlighted { background: #b3f5ff; }
  .key-table { display: grid; grid-template-columns: repeat(13, 1fr); gap: 10px; margin-top: 40px; border: 4px solid var(--wf-dark); padding: 20px; background: var(--wf-bg); }
  .key-cell { display: flex; flex-direction: column; align-items: center; }
  .key-letter { font-weight: bold; }
  .key-line { width: 20px; height: 20px; border-bottom: 2px solid var(--wf-dark); }
  @media print {
    body { background: white; padding: 0; -webkit-print-color-adjust: exact; print-color-adjust: exact; }
    .container { border: none; box-shadow: none; padding: 0; }
    .no-print { display: none !important; }
    .guess-line { border-bottom: 2px solid black !important; color: black !important; }
    .key-table { border: 4px solid black !important; background: white !important; }
    .key-line { border-bottom: 2px solid black !important; color: black !important; }
    h1, .cipher-char, .key-letter { color: black !important; border-color: black !important; }
  }
</style>
</head>
<body>
  <div class="container">
    <h1>Cryptogram</h1>
    <div class="controls no-print">
      <div class="custom-input-group">
        <input type="text" id="custom-quote" class="custom-input" placeholder="Enter a custom quote...">
        <button class="btn" onclick="addCustomQuote()">Add Quote</button>
      </div>
      <button class="btn" onclick="generate()">New Quote</button>
      <button class="btn" onclick="toggleAnswers()" style="background: var(--wf-white); color: var(--wf-dark);">Toggle Answers</button>
      <button class="btn" onclick="window.print()" style="background: var(--wf-dark); color: white;">Print (KDP)</button>
    </div>
    <div id="keyboard-hint" class="no-print" style="margin-bottom: 15px; font-weight: bold; color: var(--wf-dark); background: #fff3cd; padding: 10px; border: 2px solid #ffeeba; display: inline-block;">💡 Tip: Click on a line to start typing. When you guess a letter, all matching letters will update! Use Arrow keys to navigate.</div>
    <div id="game-board"></div>
  </div>
  <script>
    let quotes = [
      "THE ONLY WAY TO DO GREAT WORK IS TO LOVE WHAT YOU DO",
      "INNOVATION DISTINGUISHES BETWEEN A LEADER AND A FOLLOWER",
      "STAY HUNGRY STAY FOOLISH",
      "THE FUTURE BELONGS TO THOSE WHO BELIEVE IN THE BEAUTY OF THEIR DREAMS",
      "SUCCESS IS NOT FINAL FAILURE IS NOT FATAL IT IS THE COURAGE TO CONTINUE THAT COUNTS",
      "DO NOT GO WHERE THE PATH MAY LEAD GO INSTEAD WHERE THERE IS NO PATH AND LEAVE A TRAIL",
      "BELIEVE YOU CAN AND YOU ARE HALFWAY THERE"
    ];

    let currentQuote = "";
    let currentCipher = {};
    let showAnswers = false;
    let userGuesses = {}; // Maps cipher char to user's guessed char
    let selectedIndex = -1; // Index in the flattened string of letters
    let letterPositions = []; // Array of { char, cipherChar, wordIndex, letterIndex }

    function addCustomQuote() {
      const input = document.getElementById('custom-quote').value;
      if (!input) return;
      
      const newQuote = input.trim().toUpperCase().replace(/[^A-Z\s]/g, '');
      
      if (newQuote.length > 0) {
        quotes.unshift(newQuote);
        if (quotes.length > 20) quotes.pop();
        document.getElementById('custom-quote').value = '';
        currentQuote = newQuote;
        const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split('');
        const shuffled = [...alphabet].sort(() => Math.random() - 0.5);
        currentCipher = {};
        alphabet.forEach((char, i) => currentCipher[char] = shuffled[i]);
        showAnswers = false;
        userGuesses = {};
        buildLetterPositions();
        render();
      } else {
        alert("Please enter a valid quote (letters and spaces only).");
      }
    }

    function generate() {
      currentQuote = quotes[Math.floor(Math.random() * quotes.length)];
      const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split('');
      const shuffled = [...alphabet].sort(() => Math.random() - 0.5);
      currentCipher = {};
      alphabet.forEach((char, i) => currentCipher[char] = shuffled[i]);
      showAnswers = false;
      userGuesses = {};
      buildLetterPositions();
      render();
    }

    function buildLetterPositions() {
      letterPositions = [];
      const words = currentQuote.split(' ');
      words.forEach((word, wIdx) => {
        for(let i=0; i<word.length; i++) {
          const char = word[i];
          if(currentCipher[char]) {
            letterPositions.push({
              char: char,
              cipherChar: currentCipher[char],
              wordIndex: wIdx,
              letterIndex: i
            });
          }
        }
      });
      selectedIndex = -1;
    }

    function toggleAnswers() {
      showAnswers = !showAnswers;
      render();
    }

    function selectLetter(index) {
      if (showAnswers) return;
      selectedIndex = index;
      render();
    }

    document.addEventListener('keydown', (e) => {
      if (document.activeElement.tagName === 'INPUT') return;
      if (selectedIndex === -1) return;
      if (showAnswers) return;

      if (["ArrowLeft", "ArrowRight", "Space"].includes(e.code)) {
        e.preventDefault();
      }

      const currentPos = letterPositions[selectedIndex];

      if (e.key.length === 1 && e.key.match(/^[a-z]$/i)) {
        userGuesses[currentPos.cipherChar] = e.key.toUpperCase();
        if (selectedIndex < letterPositions.length - 1) {
          selectedIndex++;
        }
        render();
      } else if (e.key === 'Backspace') {
        if (userGuesses[currentPos.cipherChar]) {
          delete userGuesses[currentPos.cipherChar];
        } else if (selectedIndex > 0) {
          selectedIndex--;
          const prevPos = letterPositions[selectedIndex];
          delete userGuesses[prevPos.cipherChar];
        }
        render();
      } else if (e.key === 'ArrowRight') {
        if (selectedIndex < letterPositions.length - 1) {
          selectedIndex++;
          render();
        }
      } else if (e.key === 'ArrowLeft') {
        if (selectedIndex > 0) {
          selectedIndex--;
          render();
        }
      }
    });

    function render() {
      const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split('');
      let html = '<div class="quote-container">';
      const words = currentQuote.split(' ');
      
      let globalIndex = 0;

      words.forEach((word, wIdx) => {
        html += '<div class="word">';
        for(let i=0; i<word.length; i++) {
          const char = word[i];
          if(currentCipher[char]) {
            const cipherChar = currentCipher[char];
            let ans = '';
            if (showAnswers) {
              ans = char;
            } else if (userGuesses[cipherChar]) {
              ans = userGuesses[cipherChar];
            }

            const isSelected = (globalIndex === selectedIndex);
            const isHighlighted = (!isSelected && selectedIndex !== -1 && letterPositions[selectedIndex].cipherChar === cipherChar);
            
            let classes = "guess-line";
            if (isSelected) classes += " selected";
            else if (isHighlighted) classes += " highlighted";

            html += \`<div class="letter-box"><span class="cipher-char">\${cipherChar}</span><div class="\${classes}" onclick="selectLetter(\${globalIndex})">\${ans}</div></div>\`;
            globalIndex++;
          } else {
            html += \`<div class="letter-box"><span class="cipher-char">\${char}</span><div class="guess-line" style="border:none;"></div></div>\`;
          }
        }
        html += '</div>';
      });
      html += '</div>';
      
      html += '<div class="key-table">';
      alphabet.forEach(char => {
        // Find what letter maps TO this char
        const originalChar = Object.keys(currentCipher).find(k => currentCipher[k] === char);
        let ans = '';
        if (showAnswers && originalChar) {
          ans = originalChar;
        } else if (userGuesses[char]) {
          ans = userGuesses[char];
        }
        
        let classes = "key-line";
        if (selectedIndex !== -1 && letterPositions[selectedIndex].cipherChar === char) {
           classes += " selected"; // Highlight the key table cell too
        }

        html += \`<div class="key-cell"><span class="key-letter">\${char}</span><div class="\${classes}" style="text-align:center; font-weight:bold; color:var(--wf-purple); \${classes.includes('selected') ? 'background: var(--wf-blue); color: var(--wf-dark);' : ''}">\${ans}</div></div>\`;
      });
      html += '</div>';
      
      document.getElementById('game-board').innerHTML = html;
    }
    generate();
  </script>
</body>
</html>`;
