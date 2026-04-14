export const sudokuMasterHTML = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Sudoku Master - Brutalist Edition</title>
    
    <!-- Font Awesome for Icons -->
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
    <!-- Google Fonts: Poppins -->
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;600;800;900&display=swap" rel="stylesheet">

    <style>
        :root {
            --wf-dark: #000000;        
            --wf-gold: #FFE600;        
            --wf-orange: #FF2E93;      
            --wf-cream: #F0F4F8;       
            --wf-white: #ffffff;
            --wf-green: #00FF66;
            --wf-red: #FF2A2A;
            --wf-blue: #00E5FF;
            --wf-purple: #B000FF;
            --wf-brown: #c7b198;
            --bg-color: var(--wf-cream);
        }

        body {
            font-family: 'Poppins', sans-serif;
            background-color: var(--bg-color);
            background-image: 
                linear-gradient(rgba(0, 0, 0, 0.05) 2px, transparent 2px),
                linear-gradient(90deg, rgba(0, 0, 0, 0.05) 2px, transparent 2px);
            background-size: 40px 40px;
            color: var(--wf-dark);
            display: flex;
            flex-direction: column;
            align-items: center;
            min-height: 100vh;
            margin: 0;
            padding: 40px 20px;
            box-sizing: border-box;
            overflow-x: hidden;
            transition: background-color 0.3s;
        }

        * {
            box-sizing: border-box;
            outline: none;
        }

        h1 {
            margin-top: 10px;
            margin-bottom: 10px;
            color: var(--wf-dark);
            font-size: clamp(2.5rem, 6vw, 3.5rem);
            font-weight: 900;
            text-align: center;
            text-transform: uppercase;
            letter-spacing: -2px;
            text-shadow: 3px 3px 0px #fff;
            line-height: 1.15;
        }

        .highlight {
            position: relative;
            display: inline-block;
            color: var(--wf-orange);
            font-weight: 900;
            -webkit-text-stroke: 1px var(--wf-dark);
        }

        .highlight::after {
            content: '';
            position: absolute;
            bottom: 5px;
            left: -5px;
            right: -5px;
            height: 18px;
            background-color: var(--wf-gold);
            z-index: -1;
            transform: skew(-10deg);
            border: 2px solid var(--wf-dark);
        }

        .subtitle {
            margin-bottom: 30px;
            font-size: 1.1rem;
            font-weight: 800;
            text-align: center;
            background: var(--wf-white);
            border: 3px solid var(--wf-dark);
            padding: 8px 20px;
            box-shadow: 5px 5px 0px 0px var(--wf-dark);
            color: var(--wf-dark);
            text-transform: uppercase;
            transform: rotate(-1deg);
        }

        /* LAYOUT */
        .container {
            display: flex;
            gap: 30px;
            width: 100%;
            max-width: 1100px;
            align-items: flex-start;
            justify-content: center;
            flex-wrap: wrap;
        }

        /* SIDEBAR / CONTROLS */
        .sidebar {
            flex: 1;
            min-width: 300px;
            max-width: 350px;
            display: flex;
            flex-direction: column;
            gap: 20px;
        }

        .card {
            background: var(--wf-white);
            border-radius: 12px;
            padding: 20px;
            border: 4px solid var(--wf-dark);
            box-shadow: 6px 6px 0px 0px var(--wf-dark);
        }

        .card-title {
            font-weight: 900;
            text-transform: uppercase;
            margin-bottom: 10px;
            font-size: 1.1rem;
            display: flex;
            align-items: center;
            gap: 8px;
        }

        /* THEME DOTS */
        .theme-dots {
            display: flex;
            gap: 15px;
            margin-top: 10px;
        }

        .dot {
            width: 35px;
            height: 35px;
            border-radius: 50%;
            cursor: pointer;
            border: 3px solid var(--wf-dark);
            box-shadow: 2px 2px 0px 0px var(--wf-dark);
            transition: transform 0.1s;
        }

        .dot:hover {
            transform: translate(-2px, -2px);
            box-shadow: 4px 4px 0px 0px var(--wf-dark);
        }

        .dot.active {
            border: 4px solid var(--wf-white);
            outline: 4px solid var(--wf-dark);
            transform: scale(1.1);
        }

        .dot.cream { background: var(--wf-cream); }
        .dot.pink { background: #FF99C8; }
        .dot.blue { background: #A0C4FF; }
        .dot.green { background: #CAFFBF; }
        .dot.purple { background: #BDB2FF; }

        /* INPUTS & BUTTONS */
        select {
            width: 100%;
            padding: 12px;
            border-radius: 8px;
            border: 3px solid var(--wf-dark);
            font-family: 'Poppins', sans-serif;
            font-weight: 800;
            font-size: 1rem;
            text-transform: uppercase;
            cursor: pointer;
            background: var(--wf-white);
            box-shadow: 4px 4px 0px 0px var(--wf-dark);
        }

        button.btn-primary {
            width: 100%;
            padding: 15px;
            border-radius: 8px;
            border: 4px solid var(--wf-dark);
            background: var(--wf-blue);
            color: var(--wf-dark);
            font-family: 'Poppins', sans-serif;
            font-weight: 900;
            font-size: 1.2rem;
            text-transform: uppercase;
            cursor: pointer;
            box-shadow: 6px 6px 0px 0px var(--wf-dark);
            transition: all 0.1s;
        }

        button.btn-primary:hover {
            background: var(--wf-orange);
            color: var(--wf-white);
            transform: translate(-2px, -2px);
            box-shadow: 8px 8px 0px 0px var(--wf-dark);
        }

        button.btn-primary:active {
            transform: translate(2px, 2px);
            box-shadow: 2px 2px 0px 0px var(--wf-dark);
        }

        /* MAIN GAME AREA */
        .main-area {
            flex: 2;
            min-width: 320px;
            display: flex;
            flex-direction: column;
            align-items: center;
            width: 100%;
        }

        #gameBox {
            width: 100%;
            max-width: 650px;
            background: var(--wf-white);
            border: 5px solid var(--wf-dark);
            box-shadow: 10px 10px 0px 0px var(--wf-dark);
            border-radius: 12px;
            padding: 25px;
            display: flex;
            flex-direction: column;
            align-items: center;
        }

        .game-header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            width: 100%;
            margin-bottom: 20px;
            flex-wrap: wrap;
            gap: 15px;
        }

        #resultMsg {
            font-size: 1.2rem;
            font-weight: 900;
            text-transform: uppercase;
            text-align: center;
            min-height: 35px;
            padding: 8px 15px;
            border-radius: 6px;
            border: 3px solid transparent;
            flex: 1;
        }

        .score-display {
            font-size: 1.2rem;
            font-weight: 900;
            color: var(--wf-dark);
            background: var(--wf-gold);
            padding: 8px 15px;
            border: 3px solid var(--wf-dark);
            box-shadow: 3px 3px 0px 0px var(--wf-dark);
            border-radius: 6px;
            white-space: nowrap;
        }

        /* SUDOKU GRID */
        .sudoku-grid {
            display: grid;
            grid-template-columns: repeat(9, 1fr);
            width: 100%;
            max-width: 500px;
            aspect-ratio: 1;
            background: var(--wf-dark);
            border: 5px solid var(--wf-dark);
            box-shadow: 6px 6px 0px 0px rgba(0,0,0,0.1);
        }

        .sudoku-cell {
            background: var(--wf-white);
            border: 1px solid #ccc;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 1.5rem;
            font-weight: 800;
            color: var(--wf-dark);
            cursor: pointer;
            transition: background-color 0.2s;
            user-select: none;
        }

        .sudoku-cell:hover {
            background: var(--wf-blue);
        }

        .sudoku-cell.selected {
            background: var(--wf-gold) !important;
            box-shadow: inset 0 0 0 3px var(--wf-dark);
        }

        .sudoku-cell.fixed {
            background: #f0f0f0;
            color: #555;
            cursor: default;
        }

        .sudoku-cell.error {
            color: var(--wf-red);
            background: #ffebeb;
        }

        /* BORDERS FOR 3x3 BLOCKS */
        .sudoku-cell:nth-child(3n) { border-right: 3px solid var(--wf-dark); }
        .sudoku-cell:nth-child(9n) { border-right: none; }
        .sudoku-cell:nth-child(n+19):nth-child(-n+27),
        .sudoku-cell:nth-child(n+46):nth-child(-n+54) { border-bottom: 3px solid var(--wf-dark); }

        /* NUMBER PAD */
        .number-pad {
            display: grid;
            grid-template-columns: repeat(9, 1fr);
            gap: 10px;
            width: 100%;
            max-width: 500px;
            margin-top: 25px;
        }

        .num-btn {
            background: var(--wf-white);
            border: 3px solid var(--wf-dark);
            padding: 12px 5px;
            font-size: 1.2rem;
            font-weight: 900;
            border-radius: 8px;
            cursor: pointer;
            box-shadow: 4px 4px 0px 0px var(--wf-dark);
            transition: all 0.1s;
        }

        .num-btn:hover {
            background: var(--wf-blue);
            transform: translate(-2px, -2px);
            box-shadow: 6px 6px 0px 0px var(--wf-dark);
        }

        .num-btn:active {
            transform: translate(2px, 2px);
            box-shadow: 1px 1px 0px 0px var(--wf-dark);
        }

        .num-btn.erase {
            grid-column: span 3;
            background: var(--wf-orange);
            color: var(--wf-white);
        }

        @media (max-width: 768px) {
            .container { flex-direction: column; align-items: center; }
            .sidebar { width: 100%; max-width: 100%; }
            #gameBox { padding: 15px; }
            .sudoku-cell { font-size: 1.1rem; }
            .num-btn { font-size: 1rem; padding: 10px 2px; }
        }

        @media print {
            body { background: white !important; padding: 0; margin: 0; }
            .sidebar, .game-header, .number-pad, .subtitle { display: none !important; }
            .container { display: block; }
            .main-area { width: 100%; }
            
            h1 { 
                display: block !important; 
                text-align: center !important; 
                font-size: 2.5rem !important; 
                margin: 40px 0 !important; 
                color: black !important;
                text-shadow: none !important;
                text-transform: uppercase !important;
            }
            .highlight { color: black !important; -webkit-text-stroke: 0 !important; }
            .highlight::after { display: none !important; }

            #gameBox { 
                box-shadow: none !important; 
                border: none !important; 
                padding: 0 !important;
                width: 100% !important;
                max-width: none !important;
            }
            .sudoku-grid {
                max-width: 100% !important;
                width: 16cm !important;
                height: 16cm !important;
                margin: 0 auto;
                border: 4px solid black !important;
            }
            .sudoku-cell {
                border: 1px solid #000 !important;
                color: #000 !important;
                background: #fff !important;
                font-size: 1.5rem !important;
            }
            .sudoku-cell.fixed { background: #fff !important; font-weight: 900; }
            .sudoku-cell:nth-child(3n) { border-right: 3px solid black !important; }
            .sudoku-cell:nth-child(n+19):nth-child(-n+27),
            .sudoku-cell:nth-child(n+46):nth-child(-n+54) { border-bottom: 3px solid black !important; }
        }
    </style>
</head>
<body>

    <h1>Sudoku <span class="highlight">Master</span></h1>
    <div class="subtitle">The ultimate logic challenge. Fill the grid!</div>

    <div class="container">
        <!-- SIDEBAR CONTROLS -->
        <div class="sidebar">
            <div class="card">
                <div class="card-title"><i class="fa-solid fa-palette"></i> Theme Color</div>
                <div class="theme-dots">
                    <div class="dot cream active" onclick="setTheme('cream', this)"></div>
                    <div class="dot pink" onclick="setTheme('pink', this)"></div>
                    <div class="dot blue" onclick="setTheme('blue', this)"></div>
                    <div class="dot green" onclick="setTheme('green', this)"></div>
                    <div class="dot purple" onclick="setTheme('purple', this)"></div>
                </div>
            </div>

            <div class="card">
                <div class="card-title"><i class="fa-solid fa-gauge-high"></i> Difficulty</div>
                <select id="sudokuDiff">
                    <option value="easy">Easy (More clues)</option>
                    <option value="medium" selected>Medium (Standard)</option>
                    <option value="hard">Hard (Fewer clues)</option>
                </select>
            </div>

            <button id="startBtn" class="btn-primary" onclick="initGame()">
                <i class="fa-solid fa-play"></i> New Game
            </button>

            <button id="printBtn" class="btn-primary" style="background: var(--wf-green);" onclick="window.print()">
                <i class="fa-solid fa-print"></i> Print to PDF
            </button>

            <div class="card">
                <div class="card-title"><i class="fa-solid fa-lightbulb"></i> Hint</div>
                <p style="font-size: 0.9rem; font-weight: 600; margin: 0;">Each row, column, and 3x3 block must contain numbers 1-9 without repetition.</p>
            </div>
        </div>

        <!-- MAIN GAME AREA -->
        <div class="main-area">
            <div id="gameBox">
                <div class="game-header">
                    <div id="resultMsg">PRESS NEW GAME TO START</div>
                    <div class="score-display">
                        ERRORS: <span id="errorCount">0</span>/3
                    </div>
                </div>
                
                <div class="sudoku-grid" id="sudokuGrid">
                    <!-- Cells generated by JS -->
                </div>

                <div class="number-pad">
                    <button class="num-btn" onclick="inputNumber(1)">1</button>
                    <button class="num-btn" onclick="inputNumber(2)">2</button>
                    <button class="num-btn" onclick="inputNumber(3)">3</button>
                    <button class="num-btn" onclick="inputNumber(4)">4</button>
                    <button class="num-btn" onclick="inputNumber(5)">5</button>
                    <button class="num-btn" onclick="inputNumber(6)">6</button>
                    <button class="num-btn" onclick="inputNumber(7)">7</button>
                    <button class="num-btn" onclick="inputNumber(8)">8</button>
                    <button class="num-btn" onclick="inputNumber(9)">9</button>
                </div>
            </div>
        </div>
    </div>

    <script>
        // Game State
        let solution = [];
        let puzzle = [];
        let selectedCell = null;
        let errors = 0;
        let gameActive = false;

        // Theme Switcher
        function setTheme(theme, el) {
            const colors = {
                cream: 'var(--wf-cream)',
                pink: '#FF99C8',
                blue: '#A0C4FF',
                green: '#CAFFBF',
                purple: '#BDB2FF'
            };

            document.documentElement.style.setProperty('--bg-color', colors[theme]);
            document.querySelectorAll(".dot").forEach(d => d.classList.remove("active"));
            el.classList.add("active");
        }

        function showMessage(text, bgColor, textColor = 'var(--wf-dark)') {
            const msgEl = document.getElementById('resultMsg');
            msgEl.innerText = text;
            msgEl.style.backgroundColor = bgColor;
            msgEl.style.color = textColor;
            if (bgColor !== 'transparent') {
                msgEl.style.border = '3px solid var(--wf-dark)';
            } else {
                msgEl.style.border = '3px solid transparent';
            }
        }

        // --- SUDOKU ENGINE ---
        function initGame() {
            errors = 0;
            selectedCell = null;
            gameActive = true;
            document.getElementById('errorCount').innerText = errors;
            
            generateSudoku();
            renderGrid();
            showMessage('🧠 FOCUS AND SOLVE!', 'var(--wf-blue)');
        }

        function generateSudoku() {
            // Simple generator: Start with solved, then remove
            solution = solveSudoku(Array(81).fill(0));
            puzzle = [...solution];
            
            const diff = document.getElementById('sudokuDiff').value;
            const removeCount = diff === 'easy' ? 30 : (diff === 'medium' ? 45 : 55);
            
            let removed = 0;
            while (removed < removeCount) {
                let idx = Math.floor(Math.random() * 81);
                if (puzzle[idx] !== 0) {
                    puzzle[idx] = 0;
                    removed++;
                }
            }
        }

        function solveSudoku(board) {
            const findEmpty = (b) => b.indexOf(0);
            const isValid = (b, idx, num) => {
                let r = Math.floor(idx / 9);
                let c = idx % 9;
                // Row
                for (let i = 0; i < 9; i++) if (b[r * 9 + i] === num) return false;
                // Col
                for (let i = 0; i < 9; i++) if (b[i * 9 + c] === num) return false;
                // Box
                let br = Math.floor(r / 3) * 3;
                let bc = Math.floor(c / 3) * 3;
                for (let i = 0; i < 3; i++) {
                    for (let j = 0; j < 3; j++) {
                        if (b[(br + i) * 9 + (bc + j)] === num) return false;
                    }
                }
                return true;
            };

            const solve = (b) => {
                let empty = findEmpty(b);
                if (empty === -1) return true;
                
                let nums = [1,2,3,4,5,6,7,8,9].sort(() => Math.random() - 0.5);
                for (let n of nums) {
                    if (isValid(b, empty, n)) {
                        b[empty] = n;
                        if (solve(b)) return true;
                        b[empty] = 0;
                    }
                }
                return false;
            };

            let b = [...board];
            solve(b);
            return b;
        }

        function renderGrid() {
            const gridEl = document.getElementById('sudokuGrid');
            gridEl.innerHTML = '';
            
            puzzle.forEach((val, idx) => {
                const cell = document.createElement('div');
                cell.className = 'sudoku-cell';
                if (val !== 0) {
                    cell.innerText = val;
                    cell.classList.add('fixed');
                } else {
                    cell.innerText = '';
                    cell.onclick = () => selectCell(cell, idx);
                }
                gridEl.appendChild(cell);
            });
        }

        function selectCell(el, idx) {
            if (!gameActive) return;
            document.querySelectorAll('.sudoku-cell').forEach(c => c.classList.remove('selected'));
            el.classList.add('selected');
            selectedCell = { el, idx };
        }

        function inputNumber(num) {
            if (!gameActive || !selectedCell) return;
            
            const { el, idx } = selectedCell;
            
            if (num === solution[idx]) {
                el.innerText = num;
                el.classList.remove('error');
                el.classList.add('fixed');
                el.onclick = null;
                el.classList.remove('selected');
                selectedCell = null;
                puzzle[idx] = num;
                checkWin();
            } else {
                errors++;
                document.getElementById('errorCount').innerText = errors;
                el.innerText = num;
                el.classList.add('error');
                
                if (errors >= 3) {
                    gameActive = false;
                    showMessage('💀 GAME OVER!', 'var(--wf-red)', 'var(--wf-white)');
                } else {
                    showMessage('❌ WRONG NUMBER!', 'var(--wf-orange)');
                }
            }
        }

        function checkWin() {
            if (puzzle.every(v => v !== 0)) {
                gameActive = false;
                showMessage('🏆 SUDOKU MASTER!', 'var(--wf-gold)');
            }
        }

        // Initialize on load
        window.onload = initGame;

    </script>
</body>
</html>`;
