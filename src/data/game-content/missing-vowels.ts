export const missingVowelsHTML = `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Missing Vowels</title>
<style>
  :root { --wf-bg: #E4E3E0; --wf-dark: #141414; --wf-white: #FFFFFF; --wf-blue: #0055FF; }
  body { font-family: 'Courier New', Courier, monospace; background: var(--wf-bg); color: var(--wf-dark); margin: 0; padding: 20px; }
  .container { max-width: 800px; margin: 0 auto; background: var(--wf-white); border: 4px solid var(--wf-dark); box-shadow: 8px 8px 0px 0px var(--wf-dark); padding: 30px; }
  h1 { text-transform: uppercase; font-weight: 900; font-size: 2.5rem; border-bottom: 4px solid var(--wf-dark); padding-bottom: 10px; margin-top: 0; }
  .controls { display: flex; gap: 10px; margin-bottom: 30px; flex-wrap: wrap; }
  .btn { background: var(--wf-white); color: var(--wf-dark); border: 4px solid var(--wf-dark); padding: 10px 20px; font-weight: 900; text-transform: uppercase; cursor: pointer; box-shadow: 4px 4px 0px 0px var(--wf-dark); }
  .btn:hover { transform: translate(2px, 2px); box-shadow: 2px 2px 0px 0px var(--wf-dark); }
  
  .category-title { font-size: 1.5rem; font-weight: bold; margin-bottom: 20px; text-transform: uppercase; border-left: 6px solid var(--wf-dark); padding-left: 10px; }
  
  .phrase-list { display: flex; flex-direction: column; gap: 20px; }
  .phrase-item { font-size: 1.8rem; font-weight: bold; letter-spacing: 4px; line-height: 1.5; word-wrap: break-word; display: flex; flex-wrap: wrap; align-items: center; }
  .vowel-blank { display: inline-block; width: 24px; border-bottom: 3px solid var(--wf-dark); text-align: center; margin: 0 2px; cursor: pointer; color: var(--wf-blue); }
  .vowel-blank.selected { background: #b3f5ff; }
  .answer-text { color: var(--wf-blue); }

  @media print {
    body { background: white; padding: 0; -webkit-print-color-adjust: exact; print-color-adjust: exact; }
    .container { border: none; box-shadow: none; padding: 0; }
    .no-print { display: none !important; }
    .category-title { border-left: 6px solid black !important; color: black !important; }
    .answer-text { color: black !important; }
    h1, .phrase-item { color: black !important; border-color: black !important; }
  }
</style>
</head>
<body>
  <div class="container">
    <h1>Missing Vowels</h1>
    <p>Fill in the missing vowels (A, E, I, O, U) to complete the phrases.</p>
    <div class="controls no-print">
      <button class="btn" onclick="generate()">New Puzzle</button>
      <button class="btn" onclick="toggleAnswers()" style="background: var(--wf-blue); color: white;">Toggle Answers</button>
      <button class="btn" onclick="window.print()" style="background: var(--wf-dark); color: white;">Print (KDP)</button>
    </div>
    <div id="keyboard-hint" class="no-print" style="margin-bottom: 15px; font-weight: bold; color: var(--wf-dark); background: #fff3cd; padding: 10px; border: 2px solid #ffeeba; display: inline-block;">💡 Tip: Click on a blank line to type a vowel (A, E, I, O, U). Use Arrow keys to navigate, Backspace to delete.</div>
    <div id="game-board"></div>
  </div>
  <script>
    const puzzleSets = [
      {
        category: "Famous Proverbs",
        phrases: [
          "A PENNY SAVED IS A PENNY EARNED",
          "ACTIONS SPEAK LOUDER THAN WORDS",
          "BETTER LATE THAN NEVER",
          "EVERY CLOUD HAS A SILVER LINING",
          "KNOWLEDGE IS POWER"
        ]
      },
      {
        category: "Movie Titles",
        phrases: [
          "THE LORD OF THE RINGS",
          "JURASSIC PARK",
          "BACK TO THE FUTURE",
          "THE SILENCE OF THE LAMBS",
          "FORREST GUMP"
        ]
      },
      {
        category: "Animals",
        phrases: [
          "AFRICAN ELEPHANT",
          "BENGAL TIGER",
          "EMPEROR PENGUIN",
          "GIANT PANDA",
          "KOMODO DRAGON"
        ]
      }
    ];

    let currentSet = null;
    let showAnswers = false;
    let userAnswers = []; // Array of arrays of strings
    let selectedPhrase = -1;
    let selectedVowel = -1;
    let vowelPositions = []; // Array of arrays of indices

    function generate() {
      currentSet = puzzleSets[Math.floor(Math.random() * puzzleSets.length)];
      showAnswers = false;
      
      userAnswers = [];
      vowelPositions = [];
      currentSet.phrases.forEach(phrase => {
        let pos = [];
        let ans = [];
        for (let i = 0; i < phrase.length; i++) {
          if (/[AEIOU]/i.test(phrase[i])) {
            pos.push(i);
            ans.push('');
          }
        }
        vowelPositions.push(pos);
        userAnswers.push(ans);
      });
      selectedPhrase = -1;
      selectedVowel = -1;
      
      render();
    }

    function toggleAnswers() {
      showAnswers = !showAnswers;
      render();
    }

    function selectBlank(pIdx, vIdx) {
      if (showAnswers) return;
      selectedPhrase = pIdx;
      selectedVowel = vIdx;
      render();
    }

    document.addEventListener('keydown', (e) => {
      if (document.activeElement.tagName === 'INPUT') return;
      if (selectedPhrase === -1 || selectedVowel === -1) return;
      if (showAnswers) return;

      if (["ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight", "Space"].includes(e.code)) {
        e.preventDefault();
      }

      if (e.key.length === 1 && e.key.match(/^[aeiou]$/i)) {
        userAnswers[selectedPhrase][selectedVowel] = e.key.toUpperCase();
        if (selectedVowel < vowelPositions[selectedPhrase].length - 1) {
          selectedVowel++;
        }
        render();
      } else if (e.key === 'Backspace') {
        if (userAnswers[selectedPhrase][selectedVowel]) {
          userAnswers[selectedPhrase][selectedVowel] = '';
        } else if (selectedVowel > 0) {
          selectedVowel--;
          userAnswers[selectedPhrase][selectedVowel] = '';
        }
        render();
      } else if (e.key === 'ArrowRight') {
        if (selectedVowel < vowelPositions[selectedPhrase].length - 1) {
          selectedVowel++;
          render();
        }
      } else if (e.key === 'ArrowLeft') {
        if (selectedVowel > 0) {
          selectedVowel--;
          render();
        }
      } else if (e.key === 'ArrowDown') {
        if (selectedPhrase < currentSet.phrases.length - 1) {
          selectedPhrase++;
          selectedVowel = Math.min(selectedVowel, vowelPositions[selectedPhrase].length - 1);
          render();
        }
      } else if (e.key === 'ArrowUp') {
        if (selectedPhrase > 0) {
          selectedPhrase--;
          selectedVowel = Math.min(selectedVowel, vowelPositions[selectedPhrase].length - 1);
          render();
        }
      }
    });

    function render() {
      if (!currentSet) return;
      
      let html = \`<div class="category-title">Category: \${currentSet.category}</div>\`;
      html += \`<div class="phrase-list">\`;
      
      currentSet.phrases.forEach((phrase, pIdx) => {
        let displayPhrase = \`<span>\${pIdx + 1}.&nbsp;</span>\`;
        let vIdx = 0;
        for (let i = 0; i < phrase.length; i++) {
          const char = phrase[i];
          if (/[AEIOU]/i.test(char)) {
            const ans = showAnswers ? char : userAnswers[pIdx][vIdx];
            const isSelected = (pIdx === selectedPhrase && vIdx === selectedVowel);
            let classes = "vowel-blank";
            if (isSelected) classes += " selected";
            
            displayPhrase += \`<span class="\${classes}" onclick="selectBlank(\${pIdx}, \${vIdx})">\${ans}</span>\`;
            vIdx++;
          } else {
            if (char === ' ') {
              displayPhrase += '&nbsp;&nbsp;';
            } else {
              displayPhrase += \`<span>\${char}</span>\`;
            }
          }
        }
        html += \`<div class="phrase-item">\${displayPhrase}</div>\`;
      });
      
      html += \`</div>\`;
      document.getElementById('game-board').innerHTML = html;
    }
    
    generate();
  </script>
</body>
</html>`;
