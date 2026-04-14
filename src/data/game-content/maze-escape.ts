export const mazeEscapeHTML = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Maze Escape - Brutalist Edition</title>
    
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

        /* MAZE CANVAS */
        #mazeCanvas {
            background: var(--wf-white);
            border: 4px solid var(--wf-dark);
            box-shadow: 6px 6px 0px 0px rgba(0,0,0,0.1);
            max-width: 100%;
            height: auto;
            cursor: crosshair;
        }

        /* CONTROLS OVERLAY (Mobile) */
        .mobile-controls {
            display: none;
            grid-template-columns: repeat(3, 1fr);
            gap: 10px;
            margin-top: 20px;
        }

        .ctrl-btn {
            width: 60px;
            height: 60px;
            background: var(--wf-white);
            border: 3px solid var(--wf-dark);
            box-shadow: 3px 3px 0px 0px var(--wf-dark);
            border-radius: 8px;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 1.5rem;
            cursor: pointer;
        }

        .ctrl-btn:active {
            transform: translate(2px, 2px);
            box-shadow: 1px 1px 0px 0px var(--wf-dark);
        }

        @media (max-width: 768px) {
            .container { flex-direction: column; align-items: center; }
            .sidebar { width: 100%; max-width: 100%; }
            .mobile-controls { display: grid; }
            #gameBox { padding: 15px; }
        }

        @media print {
            body { background: white !important; padding: 0; margin: 0; }
            .sidebar, .game-header, .subtitle, .mobile-controls { display: none !important; }
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
            #mazeCanvas {
                width: 16cm !important;
                height: 16cm !important;
                margin: 0 auto;
                border: 4px solid black !important;
                box-shadow: none !important;
                display: block;
            }
        }
    </style>
</head>
<body>

    <h1>Maze <span class="highlight">Escape</span></h1>
    <div class="subtitle">Find your way out of the brutalist labyrinth!</div>

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
                <select id="mazeDifficulty">
                    <option value="10">Easy (10x10)</option>
                    <option value="15" selected>Medium (15x15)</option>
                    <option value="20">Hard (20x20)</option>
                    <option value="30">Insane (30x30)</option>
                </select>
            </div>

            <button id="startBtn" class="btn-primary" onclick="initGame()">
                <i class="fa-solid fa-play"></i> Generate Maze
            </button>

            <button id="printBtn" class="btn-primary" style="background: var(--wf-green);" onclick="window.print()">
                <i class="fa-solid fa-print"></i> Print to PDF
            </button>

            <div class="card">
                <div class="card-title"><i class="fa-solid fa-keyboard"></i> Controls</div>
                <p style="font-size: 0.9rem; font-weight: 600; margin: 0;">Use <b>Arrow Keys</b> or <b>WASD</b> to move the dot to the exit!</p>
            </div>
        </div>

        <!-- MAIN GAME AREA -->
        <div class="main-area">
            <div id="gameBox">
                <div class="game-header">
                    <div id="resultMsg">PRESS GENERATE TO START</div>
                    <div class="score-display">
                        TIME: <span id="timer">00:00</span>
                    </div>
                </div>
                
                <canvas id="mazeCanvas"></canvas>

                <!-- MOBILE CONTROLS -->
                <div class="mobile-controls">
                    <div></div>
                    <div class="ctrl-btn" onclick="movePlayer(0, -1)"><i class="fa-solid fa-chevron-up"></i></div>
                    <div></div>
                    <div class="ctrl-btn" onclick="movePlayer(-1, 0)"><i class="fa-solid fa-chevron-left"></i></div>
                    <div class="ctrl-btn" onclick="movePlayer(0, 1)"><i class="fa-solid fa-chevron-down"></i></div>
                    <div class="ctrl-btn" onclick="movePlayer(1, 0)"><i class="fa-solid fa-chevron-right"></i></div>
                </div>
            </div>
        </div>
    </div>

    <script>
        // Maze Config
        const canvas = document.getElementById('mazeCanvas');
        const ctx = canvas.getContext('2d');
        let mazeSize = 15;
        let cellSize = 0;
        let maze = [];
        let player = { x: 0, y: 0 };
        let exit = { x: 0, y: 0 };
        
        // Timer
        let startTime;
        let timerInterval;
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

        // --- MAZE GENERATION (Recursive Backtracking) ---
        function generateMaze(size) {
            // Initialize grid with all walls
            let grid = Array(size).fill(null).map(() => Array(size).fill(15)); // 15 = all walls (1111 binary)
            let visited = Array(size).fill(null).map(() => Array(size).fill(false));
            
            let stack = [];
            let current = { x: 0, y: 0 };
            visited[0][0] = true;
            
            while (true) {
                let neighbors = getUnvisitedNeighbors(current.x, current.y, visited, size);
                
                if (neighbors.length > 0) {
                    let next = neighbors[Math.floor(Math.random() * neighbors.length)];
                    stack.push(current);
                    
                    // Remove walls between current and next
                    removeWalls(current, next, grid);
                    
                    current = next;
                    visited[current.y][current.x] = true;
                } else if (stack.length > 0) {
                    current = stack.pop();
                } else {
                    break;
                }
            }
            return grid;
        }

        function getUnvisitedNeighbors(x, y, visited, size) {
            let n = [];
            if (x > 0 && !visited[y][x-1]) n.push({x: x-1, y: y});
            if (x < size-1 && !visited[y][x+1]) n.push({x: x+1, y: y});
            if (y > 0 && !visited[y-1][x]) n.push({x: x, y: y-1});
            if (y < size-1 && !visited[y+1][x]) n.push({x: x, y: y+1});
            return n;
        }

        function removeWalls(a, b, grid) {
            // Wall bits: 1=Top, 2=Right, 4=Bottom, 8=Left
            if (a.x < b.x) { // Move Right
                grid[a.y][a.x] -= 2;
                grid[b.y][b.x] -= 8;
            } else if (a.x > b.x) { // Move Left
                grid[a.y][a.x] -= 8;
                grid[b.y][b.x] -= 2;
            } else if (a.y < b.y) { // Move Down
                grid[a.y][a.x] -= 4;
                grid[b.y][b.x] -= 1;
            } else if (a.y > b.y) { // Move Up
                grid[a.y][a.x] -= 1;
                grid[b.y][b.x] -= 4;
            }
        }

        // --- GAME ENGINE ---
        function initGame() {
            mazeSize = parseInt(document.getElementById('mazeDifficulty').value);
            
            // Set canvas size based on screen
            const containerWidth = Math.min(window.innerWidth - 60, 500);
            canvas.width = containerWidth;
            canvas.height = containerWidth;
            cellSize = canvas.width / mazeSize;

            maze = generateMaze(mazeSize);
            player = { x: 0, y: 0 };
            exit = { x: mazeSize - 1, y: mazeSize - 1 };
            
            gameActive = true;
            startTime = Date.now();
            clearInterval(timerInterval);
            timerInterval = setInterval(updateTimer, 1000);
            
            showMessage('🏃 ESCAPE THE MAZE!', 'var(--wf-blue)');
            draw();
        }

        function updateTimer() {
            const elapsed = Math.floor((Date.now() - startTime) / 1000);
            const mins = Math.floor(elapsed / 60).toString().padStart(2, '0');
            const secs = (elapsed % 60).toString().padStart(2, '0');
            document.getElementById('timer').innerText = \`\${mins}:\${secs}\`;
        }

        function draw() {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            
            // Draw Maze
            ctx.strokeStyle = 'var(--wf-dark)';
            ctx.lineWidth = 3;
            ctx.lineCap = 'round';

            for (let y = 0; y < mazeSize; y++) {
                for (let x = 0; x < mazeSize; x++) {
                    let walls = maze[y][x];
                    let px = x * cellSize;
                    let py = y * cellSize;

                    ctx.beginPath();
                    if (walls & 1) { ctx.moveTo(px, py); ctx.lineTo(px + cellSize, py); } // Top
                    if (walls & 2) { ctx.moveTo(px + cellSize, py); ctx.lineTo(px + cellSize, py + cellSize); } // Right
                    if (walls & 4) { ctx.moveTo(px, py + cellSize); ctx.lineTo(px + cellSize, py + cellSize); } // Bottom
                    if (walls & 8) { ctx.moveTo(px, py); ctx.lineTo(px, py + cellSize); } // Left
                    ctx.stroke();
                }
            }

            // Draw Exit
            ctx.fillStyle = 'var(--wf-green)';
            ctx.fillRect(exit.x * cellSize + 5, exit.y * cellSize + 5, cellSize - 10, cellSize - 10);
            ctx.strokeStyle = 'var(--wf-dark)';
            ctx.strokeRect(exit.x * cellSize + 5, exit.y * cellSize + 5, cellSize - 10, cellSize - 10);

            // Draw Player
            ctx.fillStyle = 'var(--wf-orange)';
            ctx.beginPath();
            ctx.arc(player.x * cellSize + cellSize/2, player.y * cellSize + cellSize/2, cellSize/3, 0, Math.PI * 2);
            ctx.fill();
            ctx.strokeStyle = 'var(--wf-dark)';
            ctx.lineWidth = 2;
            ctx.stroke();
        }

        function movePlayer(dx, dy) {
            if (!gameActive) return;

            let currentWalls = maze[player.y][player.x];
            
            // Check walls
            if (dx === 1 && (currentWalls & 2)) return; // Wall Right
            if (dx === -1 && (currentWalls & 8)) return; // Wall Left
            if (dy === 1 && (currentWalls & 4)) return; // Wall Bottom
            if (dy === -1 && (currentWalls & 1)) return; // Wall Top

            player.x += dx;
            player.y += dy;

            draw();

            if (player.x === exit.x && player.y === exit.y) {
                winGame();
            }
        }

        function winGame() {
            gameActive = false;
            clearInterval(timerInterval);
            showMessage('🏆 YOU ESCAPED!', 'var(--wf-gold)');
            
            // Confetti effect (simple)
            for(let i=0; i<20; i++) {
                setTimeout(() => {
                    ctx.fillStyle = ['#FF2E93', '#FFE600', '#00E5FF', '#00FF66'][Math.floor(Math.random()*4)];
                    ctx.fillRect(Math.random()*canvas.width, Math.random()*canvas.height, 10, 10);
                }, i * 50);
            }
        }

        // Keyboard Controls
        window.addEventListener('keydown', (e) => {
            if (!gameActive) return;
            switch(e.key.toLowerCase()) {
                case 'arrowup': case 'w': movePlayer(0, -1); break;
                case 'arrowdown': case 's': movePlayer(0, 1); break;
                case 'arrowleft': case 'a': movePlayer(-1, 0); break;
                case 'arrowright': case 'd': movePlayer(1, 0); break;
            }
        });

        // Initialize on load
        window.onload = initGame;

    </script>
</body>
</html>`;
