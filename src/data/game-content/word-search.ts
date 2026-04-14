export const wordSearchHTML = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Word Search Challenge</title>
    
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
            user-select: none; /* Prevent text selection during drag */
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
            color: var(--wf-blue);
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

        .hidden {
            display: none !important;
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

        /* WORDS TO FIND LIST */
        .words-container {
            width: 100%;
            display: flex;
            flex-wrap: wrap;
            gap: 10px;
            margin-bottom: 20px;
            justify-content: center;
        }

        .word-pill {
            background: var(--wf-cream);
            border: 3px solid var(--wf-dark);
            padding: 6px 14px;
            border-radius: 20px;
            font-weight: 800;
            font-size: 0.95rem;
            text-transform: uppercase;
            box-shadow: 3px 3px 0px 0px var(--wf-dark);
            transition: all 0.3s;
        }

        .word-pill.found {
            background: var(--wf-green);
            color: var(--wf-dark);
            text-decoration: line-through;
            opacity: 0.6;
            box-shadow: 1px 1px 0px 0px var(--wf-dark);
            transform: translate(2px, 2px);
        }

        /* WORD GRID */
        .word-grid {
            display: grid;
            width: 100%;
            max-width: 500px;
            aspect-ratio: 1;
            background: var(--wf-dark);
            border: 4px solid var(--wf-dark);
            border-radius: 8px;
            box-shadow: 6px 6px 0px 0px rgba(0,0,0,0.2);
            /* Grid template set dynamically via JS */
            grid-template-columns: repeat(var(--grid-size, 10), 1fr);
            gap: 1px; /* Giảm gap xuống 1px để tối ưu cho lưới 15x15 */
            touch-action: none; /* Prevent scrolling while swiping on grid */
        }

        .letter-cell {
            background: var(--wf-white);
            display: flex;
            align-items: center;
            justify-content: center;
            /* Font chữ tự động scale theo kích thước lưới và màn hình */
            font-size: calc(min(90vw, 500px) / var(--grid-size) * 0.6);
            font-weight: 900;
            color: var(--wf-dark);
            cursor: pointer;
            transition: background-color 0.1s, transform 0.1s;
        }

        .letter-cell.selecting {
            background: var(--wf-blue);
            color: var(--wf-white);
            transform: scale(0.9);
        }

        .letter-cell.found {
            background: var(--wf-gold);
            color: var(--wf-dark);
        }
        
        .letter-cell.found.selecting {
            background: var(--wf-green); /* Mix visual if selecting over already found */
        }

        @media (max-width: 768px) {
            .container { flex-direction: column; align-items: center; }
            .sidebar { width: 100%; max-width: 100%; }
            .game-header { flex-direction: column; text-align: center; }
            #gameBox { padding: 15px; }
            .word-pill { font-size: 0.85rem; padding: 4px 10px; }
        }

        @media print {
            body { background: white !important; padding: 0; margin: 0; }
            .sidebar, .subtitle, .btn-primary, .theme-dots, .dot, select, .card-title { display: none !important; }
            .container { display: block; }
            .main-area { width: 100%; max-width: 100%; margin: 0; padding: 0; }
            
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

            #gameBox { border: none; box-shadow: none; padding: 0; }
            .game-header { border-bottom: 2px solid black; margin-bottom: 20px; }
            .word-grid { border: 2px solid black !important; width: 16cm !important; height: 16cm !important; margin: 0 auto !important; }
            .word-cell { border: 1px solid #ddd !important; color: black !important; font-size: 1.2rem !important; }
            .word-pill { border: 1px solid black !important; color: black !important; background: white !important; }
            .word-pill.found { text-decoration: none !important; font-weight: bold; }
            #resultMsg { display: none; }
            .score-display { font-size: 1.2rem; font-weight: bold; }
        }
    </style>
</head>
<body>

    <h1>Word <span class="highlight">Search</span></h1>
    <div class="subtitle">Drag to connect letters and find all the hidden words!</div>

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
                <div class="card-title"><i class="fa-solid fa-book"></i> Category</div>
                <select id="wordCategory" onchange="startGame()">
                    <option value="animals" selected>Animals</option>
                    <option value="colors">Colors</option>
                    <option value="tech">Technology</option>
                    <option value="space">Space</option>
                </select>
            </div>

            <div class="card">
                <div class="card-title"><i class="fa-solid fa-border-all"></i> Grid Size</div>
                <select id="gridSize" onchange="startGame()">
                    <option value="10" selected>10 x 10 (Easy)</option>
                    <option value="12">12 x 12 (Medium)</option>
                    <option value="15">15 x 15 (Hard)</option>
                </select>
            </div>

            <button id="startBtn" class="btn-primary" onclick="startGame()">
                <i class="fa-solid fa-play"></i> Generate Game
            </button>

            <button class="btn-primary" style="background: var(--wf-blue);" onclick="window.print()">
                <i class="fa-solid fa-print"></i> Print to PDF
            </button>
        </div>

        <!-- MAIN GAME AREA -->
        <div class="main-area">
            <div id="gameBox">
                <div class="game-header">
                    <div id="resultMsg">PRESS GENERATE TO PLAY</div>
                    <div class="score-display">
                        FOUND: <span id="foundCount">0</span>/<span id="totalCount">0</span>
                    </div>
                </div>
                
                <!-- WORD LIST -->
                <div class="words-container" id="wordListContainer">
                    <!-- Pills generated by JS -->
                </div>

                <!-- LETTER GRID -->
                <div class="word-grid" id="wordGrid">
                    <!-- Placeholder text before generation -->
                    <div style="text-align: center; color: var(--wf-white); font-weight: 800; font-size: 1.2rem; padding: 40px; grid-column: 1 / -1; align-self: center;">
                        <i class="fa-solid fa-arrow-left" style="font-size: 2rem; margin-bottom: 10px; display: block; color: var(--wf-white);"></i>
                        <span style="color: var(--wf-white);">SELECT SETTINGS & GENERATE</span>
                    </div>
                </div>

            </div>
        </div>
    </div>

    <script>
        // Word Dictionaries
        const DICTIONARIES = {
            animals: ['TIGER', 'LION', 'ELEPHANT', 'MONKEY', 'GIRAFFE', 'ZEBRA', 'KANGAROO', 'PANDA', 'DOLPHIN', 'PENGUIN'],
            colors: ['RED', 'BLUE', 'GREEN', 'YELLOW', 'PURPLE', 'ORANGE', 'PINK', 'BLACK', 'WHITE', 'BROWN'],
            tech: ['COMPUTER', 'INTERNET', 'SOFTWARE', 'HARDWARE', 'LAPTOP', 'MOBILE', 'KEYBOARD', 'MOUSE', 'SCREEN', 'SERVER'],
            space: ['PLANET', 'GALAXY', 'STAR', 'METEOR', 'COMET', 'MOON', 'SUN', 'ASTEROID', 'ORBIT', 'ROCKET']
        };

        // Game State
        let gridSize = 10;
        let wordsToFind = [];
        let wordsFound = [];
        let gridMatrix = [];
        
        // Interaction State
        let isSelecting = false;
        let startCell = null;
        let currentSelection = []; // Array of cell objects {r, c, el}

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

        // --- CORE LOGIC: GENERATE GAME ---
        function startGame() {
            gridSize = parseInt(document.getElementById('gridSize').value);
            const category = document.getElementById('wordCategory').value;
            
            // Randomly select words from the category depending on grid size
            let dict = [...DICTIONARIES[category]];
            dict.sort(() => Math.random() - 0.5);
            let numWords = gridSize === 10 ? 6 : (gridSize === 12 ? 8 : 10);
            wordsToFind = dict.slice(0, numWords);
            
            wordsFound = [];
            
            showMessage('🔍 FIND ALL THE WORDS!', 'var(--wf-blue)');

            // Tạo lưới trước, sau đó mới cập nhật danh sách từ (để loại trừ từ không đặt được)
            generateGridMatrix();
            renderWordList();
            renderGrid();
        }

        function renderWordList() {
            const container = document.getElementById('wordListContainer');
            container.innerHTML = '';
            wordsToFind.forEach(word => {
                const pill = document.createElement('div');
                pill.className = 'word-pill';
                pill.id = \`pill-\${word}\`;
                pill.innerText = word;
                container.appendChild(pill);
            });
            
            // Cập nhật lại số lượng điểm dựa trên những từ đã tạo thành công
            document.getElementById('foundCount').innerText = 0;
            document.getElementById('totalCount').innerText = wordsToFind.length;
        }

        function generateGridMatrix() {
            // Initialize empty grid
            gridMatrix = Array(gridSize).fill(null).map(() => Array(gridSize).fill(''));

            // Directions: [dRow, dCol]
            const dirs = [
                [0, 1], [1, 0], [1, 1], [-1, 1],
                [0, -1], [-1, 0], [-1, -1], [1, -1]
            ];

            let successfullyPlacedWords = []; // Lưu lại các từ đã đặt thành công

            // Place words
            for (let word of wordsToFind) {
                let placed = false;
                let attempts = 0;

                while (!placed && attempts < 200) {
                    let d = dirs[Math.floor(Math.random() * dirs.length)];
                    let r = Math.floor(Math.random() * gridSize);
                    let c = Math.floor(Math.random() * gridSize);

                    if (canPlaceWord(word, r, c, d[0], d[1])) {
                        for (let i = 0; i < word.length; i++) {
                            gridMatrix[r + i * d[0]][c + i * d[1]] = word[i];
                        }
                        placed = true;
                        successfullyPlacedWords.push(word);
                    }
                    attempts++;
                }
                if (!placed) console.warn(\`Could not place word: \${word}\`); // Fallback
            }

            // Ghi đè lại danh sách từ bằng những từ đã được đặt thành công (fix lỗi unwinnable)
            wordsToFind = successfullyPlacedWords;

            // Fill remaining empty cells with random letters
            const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
            for (let r = 0; r < gridSize; r++) {
                for (let c = 0; c < gridSize; c++) {
                    if (gridMatrix[r][c] === '') {
                        gridMatrix[r][c] = letters.charAt(Math.floor(Math.random() * letters.length));
                    }
                }
            }
        }

        function canPlaceWord(word, r, c, dRow, dCol) {
            // Check bounds
            let endR = r + (word.length - 1) * dRow;
            let endC = c + (word.length - 1) * dCol;
            if (endR < 0 || endR >= gridSize || endC < 0 || endC >= gridSize) return false;

            // Check conflicts
            for (let i = 0; i < word.length; i++) {
                let currR = r + i * dRow;
                let currC = c + i * dCol;
                let cell = gridMatrix[currR][currC];
                if (cell !== '' && cell !== word[i]) {
                    return false; // Conflict
                }
            }
            return true;
        }

        // --- RENDER & INTERACTION ---
        function renderGrid() {
            const gridEl = document.getElementById('wordGrid');
            gridEl.innerHTML = '';
            gridEl.style.setProperty('--grid-size', gridSize);

            // Add Event Listeners for Grid Container (Better for touch)
            gridEl.addEventListener('mousedown', handlePointerDown);
            gridEl.addEventListener('mousemove', handlePointerMove);
            window.addEventListener('mouseup', handlePointerUp); // Window to catch release outside

            gridEl.addEventListener('touchstart', handlePointerDown, {passive: false});
            gridEl.addEventListener('touchmove', handlePointerMove, {passive: false});
            window.addEventListener('touchend', handlePointerUp);

            for (let r = 0; r < gridSize; r++) {
                for (let c = 0; c < gridSize; c++) {
                    const cell = document.createElement('div');
                    cell.className = 'letter-cell';
                    cell.innerText = gridMatrix[r][c];
                    cell.dataset.row = r;
                    cell.dataset.col = c;
                    cell.id = \`cell-\${r}-\${c}\`;
                    gridEl.appendChild(cell);
                }
            }
        }

        // Handle Mouse & Touch Inputs
        function getCellFromEvent(e) {
            let clientX, clientY;
            if (e.touches && e.touches.length > 0) {
                clientX = e.touches[0].clientX;
                clientY = e.touches[0].clientY;
            } else {
                clientX = e.clientX;
                clientY = e.clientY;
            }
            
            // For touchmove, target is always the start element, so we need elementFromPoint
            const target = document.elementFromPoint(clientX, clientY);
            if (target && target.classList.contains('letter-cell')) {
                return {
                    r: parseInt(target.dataset.row),
                    c: parseInt(target.dataset.col),
                    el: target
                };
            }
            return null;
        }

        function handlePointerDown(e) {
            const cell = getCellFromEvent(e);
            if (cell) {
                if (e.cancelable) e.preventDefault(); // Prevent scrolling on touch
                isSelecting = true;
                startCell = cell;
                clearSelection();
                selectCell(cell.r, cell.c, cell.el);
            }
        }

        function handlePointerMove(e) {
            if (!isSelecting || !startCell) return;
            if (e.cancelable) e.preventDefault();

            const current = getCellFromEvent(e);
            if (current) {
                calculateLine(startCell.r, startCell.c, current.r, current.c);
            }
        }

        function handlePointerUp(e) {
            if (isSelecting) {
                isSelecting = false;
                validateSelection();
            }
        }

        // Draw line between start and current
        function calculateLine(r1, c1, r2, c2) {
            clearSelection();

            let dr = r2 - r1;
            let dc = c2 - c1;
            
            // Check if it's a valid straight line (horizontal, vertical, or exactly diagonal)
            if (dr === 0 || dc === 0 || Math.abs(dr) === Math.abs(dc)) {
                let steps = Math.max(Math.abs(dr), Math.abs(dc));
                let stepR = dr === 0 ? 0 : dr / Math.abs(dr);
                let stepC = dc === 0 ? 0 : dc / Math.abs(dc);

                for (let i = 0; i <= steps; i++) {
                    let r = r1 + i * stepR;
                    let c = c1 + i * stepC;
                    let el = document.getElementById(\`cell-\${r}-\${c}\`);
                    selectCell(r, c, el);
                }
            } else {
                // If invalid line, just highlight start cell
                selectCell(r1, c1, startCell.el);
            }
        }

        function selectCell(r, c, el) {
            el.classList.add('selecting');
            currentSelection.push({ r, c, el });
        }

        function clearSelection() {
            currentSelection.forEach(item => {
                item.el.classList.remove('selecting');
            });
            currentSelection = [];
        }

        // Check if selected line forms a valid word
        function validateSelection() {
            if (currentSelection.length < 2) {
                clearSelection();
                return;
            }

            // Read the word
            let selectedWord = currentSelection.map(item => gridMatrix[item.r][item.c]).join('');
            let reversedWord = selectedWord.split('').reverse().join('');

            let foundWord = null;
            if (wordsToFind.includes(selectedWord) && !wordsFound.includes(selectedWord)) {
                foundWord = selectedWord;
            } else if (wordsToFind.includes(reversedWord) && !wordsFound.includes(reversedWord)) {
                foundWord = reversedWord;
            }

            if (foundWord) {
                // Mark as found
                wordsFound.push(foundWord);
                document.getElementById(\`pill-\${foundWord}\`).classList.add('found');
                document.getElementById('foundCount').innerText = wordsFound.length;

                // Color the cells permanently
                currentSelection.forEach(item => {
                    item.el.classList.remove('selecting');
                    item.el.classList.add('found');
                });
                
                showMessage(\`✨ FOUND: \${foundWord}!\`, 'var(--wf-green)');
                
                // Check win condition
                if (wordsFound.length === wordsToFind.length) {
                    setTimeout(() => {
                        showMessage('🏆 INCREDIBLE! YOU FOUND THEM ALL!', 'var(--wf-gold)');
                    }, 500);
                }
            } else {
                // Wrong word, clear
                clearSelection();
            }
            
            currentSelection = [];
            startCell = null;
        }

        // Initialize game on load
        startGame();

    </script>
</body>
</html>`;
