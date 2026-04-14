export const slidingPuzzleHTML = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Sliding Puzzle - Brutalist Edition</title>
    
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
            color: var(--wf-green);
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

        /* PUZZLE GRID */
        .puzzle-grid {
            display: grid;
            width: 100%;
            max-width: 500px;
            aspect-ratio: 1;
            background: var(--wf-dark);
            border: 4px solid var(--wf-dark);
            border-radius: 8px;
            box-shadow: 6px 6px 0px 0px rgba(0,0,0,0.1);
            /* Grid template set dynamically via JS */
            grid-template-columns: repeat(var(--grid-size, 3), 1fr);
            gap: 10px;
            padding: 10px;
        }

        .puzzle-tile {
            background: var(--wf-white);
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 2.5rem;
            font-weight: 900;
            color: var(--wf-dark);
            border: 4px solid var(--wf-dark);
            border-radius: 8px;
            cursor: pointer;
            box-shadow: 4px 4px 0px 0px var(--wf-dark);
            transition: transform 0.1s, background-color 0.2s;
            user-select: none;
        }

        .puzzle-tile:hover {
            background: var(--wf-blue);
            transform: translate(-2px, -2px);
            box-shadow: 6px 6px 0px 0px var(--wf-dark);
        }

        .puzzle-tile:active {
            transform: translate(2px, 2px);
            box-shadow: 1px 1px 0px 0px var(--wf-dark);
        }

        .puzzle-tile.empty {
            background: transparent;
            border: 3px dashed rgba(0,0,0,0.2);
            box-shadow: none;
            cursor: default;
            pointer-events: none;
        }

        .puzzle-tile.correct {
            background: var(--wf-green);
        }

        @media (max-width: 768px) {
            .container { flex-direction: column; align-items: center; }
            .sidebar { width: 100%; max-width: 100%; }
            #gameBox { padding: 15px; }
            .puzzle-tile { font-size: 1.8rem; }
        }
    </style>
</head>
<body>

    <h1>Sliding <span class="highlight">Puzzle</span></h1>
    <div class="subtitle">Arrange the tiles in order to win! Upload your own image for a custom challenge.</div>

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
                <div class="card-title"><i class="fa-solid fa-image"></i> Custom Image</div>
                <input type="file" id="imageInput" accept="image/*" style="display: none;" onchange="handleImageUpload(event)">
                <button class="btn-primary" style="background: var(--wf-gold); margin-bottom: 10px;" onclick="document.getElementById('imageInput').click()">
                    <i class="fa-solid fa-upload"></i> Upload Image
                </button>
                <button id="clearImageBtn" class="btn-primary" style="background: var(--wf-red); color: white; display: none;" onclick="clearImage()">
                    <i class="fa-solid fa-trash"></i> Clear Image
                </button>
            </div>

            <div class="card">
                <div class="card-title"><i class="fa-solid fa-border-all"></i> Grid Size</div>
                <select id="gridSize">
                    <option value="3" selected>3 x 3 (Easy)</option>
                    <option value="4">4 x 4 (Medium)</option>
                    <option value="5">5 x 5 (Hard)</option>
                </select>
            </div>

            <button id="startBtn" class="btn-primary" onclick="initGame()">
                <i class="fa-solid fa-play"></i> Shuffle & Start
            </button>

            <div class="card">
                <div class="card-title"><i class="fa-solid fa-info-circle"></i> Instructions</div>
                <p style="font-size: 0.9rem; font-weight: 600; margin: 0;">Click on a tile adjacent to the empty space to move it. Arrange the tiles to reconstruct the image or sequence.</p>
            </div>
        </div>

        <!-- MAIN GAME AREA -->
        <div class="main-area">
            <div id="gameBox">
                <div class="game-header">
                    <div id="resultMsg">PRESS SHUFFLE TO START</div>
                    <div class="score-display">
                        MOVES: <span id="moveCount">0</span>
                    </div>
                </div>
                
                <div class="puzzle-grid" id="puzzleGrid">
                    <!-- Tiles generated by JS -->
                </div>
            </div>
        </div>
    </div>

    <script>
        // Game State
        let gridSize = 3;
        let tiles = []; // Flattened array of tile values
        let moves = 0;
        let gameActive = false;
        let customImage = null;

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

        // --- IMAGE HANDLING ---
        function handleImageUpload(event) {
            const file = event.target.files[0];
            if (file) {
                const reader = new FileReader();
                reader.onload = function(e) {
                    customImage = e.target.result;
                    document.getElementById('clearImageBtn').style.display = 'block';
                    showMessage('🖼️ IMAGE UPLOADED!', 'var(--wf-green)');
                    initGame();
                };
                reader.readAsDataURL(file);
            }
        }

        function clearImage() {
            customImage = null;
            document.getElementById('imageInput').value = '';
            document.getElementById('clearImageBtn').style.display = 'none';
            showMessage('🗑️ IMAGE REMOVED', 'var(--wf-orange)');
            initGame();
        }

        // --- GAME ENGINE ---
        function initGame() {
            gridSize = parseInt(document.getElementById('gridSize').value);
            moves = 0;
            document.getElementById('moveCount').innerText = moves;
            
            // Create solved state
            tiles = Array.from({ length: gridSize * gridSize }, (_, i) => i + 1);
            tiles[tiles.length - 1] = 0; // 0 represents the empty tile

            shuffleTiles();
            gameActive = true;
            showMessage('🧩 SOLVE THE PUZZLE!', 'var(--wf-blue)');
            renderGrid();
        }

        function shuffleTiles() {
            // To ensure solvability, we perform random valid moves instead of random shuffle
            let emptyIdx = tiles.indexOf(0);
            
            for (let i = 0; i < 200; i++) {
                let neighbors = getNeighbors(emptyIdx);
                let moveIdx = neighbors[Math.floor(Math.random() * neighbors.length)];
                
                // Swap
                [tiles[emptyIdx], tiles[moveIdx]] = [tiles[moveIdx], tiles[emptyIdx]];
                emptyIdx = moveIdx;
            }
        }

        function getNeighbors(idx) {
            let n = [];
            let r = Math.floor(idx / gridSize);
            let c = idx % gridSize;

            if (r > 0) n.push(idx - gridSize); // Top
            if (r < gridSize - 1) n.push(idx + gridSize); // Bottom
            if (c > 0) n.push(idx - 1); // Left
            if (c < gridSize - 1) n.push(idx + 1); // Right
            return n;
        }

        function renderGrid() {
            const gridEl = document.getElementById('puzzleGrid');
            gridEl.innerHTML = '';
            gridEl.style.setProperty('--grid-size', gridSize);

            tiles.forEach((val, idx) => {
                const tile = document.createElement('div');
                tile.className = 'puzzle-tile';
                if (val === 0) {
                    tile.classList.add('empty');
                    tile.innerText = '';
                } else {
                    if (customImage) {
                        tile.style.backgroundImage = \`url(\${customImage})\`;
                        tile.style.backgroundSize = \`\${gridSize * 100}% \${gridSize * 100}%\`;
                        
                        // Calculate original position of this tile value
                        const originalIdx = val - 1;
                        const origR = Math.floor(originalIdx / gridSize);
                        const origC = originalIdx % gridSize;
                        
                        tile.style.backgroundPosition = \`\${(origC / (gridSize - 1)) * 100}% \${(origR / (gridSize - 1)) * 100}%\`;
                        tile.innerText = ''; // Hide number if image is present
                        tile.style.color = 'transparent';
                    } else {
                        tile.innerText = val;
                    }
                    
                    // Check if in correct position
                    if (val === idx + 1) tile.classList.add('correct');
                    tile.onclick = () => handleTileClick(idx);
                }
                gridEl.appendChild(tile);
            });
        }

        function handleTileClick(idx) {
            if (!gameActive) return;

            let emptyIdx = tiles.indexOf(0);
            let neighbors = getNeighbors(idx);

            if (neighbors.includes(emptyIdx)) {
                // Perform move
                [tiles[idx], tiles[emptyIdx]] = [tiles[emptyIdx], tiles[idx]];
                moves++;
                document.getElementById('moveCount').innerText = moves;
                renderGrid();
                checkWin();
            }
        }

        function checkWin() {
            const isWin = tiles.every((val, idx) => {
                if (idx === tiles.length - 1) return val === 0;
                return val === idx + 1;
            });

            if (isWin) {
                gameActive = false;
                showMessage('🏆 YOU SOLVED IT!', 'var(--wf-gold)');
                
                // Final visual polish
                const gridEl = document.getElementById('puzzleGrid');
                if (customImage) {
                    // Show the full image in the empty spot
                    const emptyTile = gridEl.querySelector('.empty');
                    if (emptyTile) {
                        emptyTile.classList.remove('empty');
                        emptyTile.style.backgroundImage = \`url(\${customImage})\`;
                        emptyTile.style.backgroundSize = \`\${gridSize * 100}% \${gridSize * 100}%\`;
                        emptyTile.style.backgroundPosition = '100% 100%';
                        emptyTile.style.border = '4px solid var(--wf-dark)';
                        emptyTile.style.boxShadow = '4px 4px 0px 0px var(--wf-dark)';
                    }
                }

                document.querySelectorAll('.puzzle-tile').forEach(t => {
                    t.classList.add('correct');
                    t.onclick = null;
                });
            }
        }

        // Initialize on load
        window.onload = initGame;

    </script>
</body>
</html>`;
