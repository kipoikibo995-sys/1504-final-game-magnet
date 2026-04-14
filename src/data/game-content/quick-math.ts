export const quickMathHTML = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Quick Math Challenge</title>
    
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
            color: var(--wf-purple);
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

        /* MATH DISPLAY */
        .math-display {
            width: 100%;
            background: var(--wf-dark);
            color: var(--wf-white);
            padding: 40px 20px;
            border-radius: 12px;
            text-align: center;
            margin-bottom: 30px;
            border: 4px solid var(--wf-dark);
            box-shadow: inset 0 0 20px rgba(0,0,0,0.5);
        }

        #equation {
            font-size: clamp(3rem, 10vw, 5rem);
            font-weight: 900;
            letter-spacing: 2px;
            margin: 0;
        }

        /* OPTIONS GRID */
        .options-grid {
            display: grid;
            grid-template-columns: repeat(2, 1fr);
            gap: 20px;
            width: 100%;
        }

        .option-btn {
            background: var(--wf-white);
            border: 4px solid var(--wf-dark);
            padding: 20px;
            font-size: 2rem;
            font-weight: 900;
            border-radius: 12px;
            cursor: pointer;
            box-shadow: 6px 6px 0px 0px var(--wf-dark);
            transition: all 0.1s;
            display: flex;
            align-items: center;
            justify-content: center;
        }

        .option-btn:hover {
            background: var(--wf-blue);
            transform: translate(-2px, -2px);
            box-shadow: 8px 8px 0px 0px var(--wf-dark);
        }

        .option-btn:active {
            transform: translate(2px, 2px);
            box-shadow: 2px 2px 0px 0px var(--wf-dark);
        }

        .option-btn.correct {
            background: var(--wf-green) !important;
            color: var(--wf-dark);
        }

        .option-btn.wrong {
            background: var(--wf-red) !important;
            color: var(--wf-white);
        }

        /* PROGRESS BAR */
        .timer-bar-container {
            width: 100%;
            height: 15px;
            background: var(--wf-cream);
            border: 3px solid var(--wf-dark);
            border-radius: 10px;
            margin-bottom: 20px;
            overflow: hidden;
        }

        #timerBar {
            width: 100%;
            height: 100%;
            background: var(--wf-orange);
            transition: width 0.1s linear;
        }

        @media (max-width: 768px) {
            .container { flex-direction: column; align-items: center; }
            .sidebar { width: 100%; max-width: 100%; }
            #gameBox { padding: 15px; }
            .option-btn { font-size: 1.5rem; padding: 15px; }
        }

        @media print {
            body { background: white !important; padding: 0; margin: 0; }
            .sidebar, .game-header, .subtitle, .timer-bar-container { display: none !important; }
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
            .math-display {
                background: white !important;
                color: black !important;
                border: 4px solid black !important;
                box-shadow: none !important;
                margin-bottom: 40px !important;
            }
            #equation {
                color: black !important;
                font-size: 4rem !important;
            }
            .option-btn {
                border: 2px solid black !important;
                box-shadow: none !important;
                background: white !important;
                color: black !important;
                font-size: 2rem !important;
            }
        }
    </style>
</head>
<body>

    <h1>Quick <span class="highlight">Math</span></h1>
    <div class="subtitle">Think fast! Solve the equations before time runs out!</div>

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
                <select id="mathDifficulty">
                    <option value="easy">Easy (Addition/Subtraction)</option>
                    <option value="medium" selected>Medium (Multiplication)</option>
                    <option value="hard">Hard (Mixed Operations)</option>
                </select>
            </div>

            <button id="startBtn" class="btn-primary" onclick="startGame()">
                <i class="fa-solid fa-play"></i> Start Challenge
            </button>

            <button class="btn-primary" style="background: var(--wf-blue);" onclick="window.print()">
                <i class="fa-solid fa-print"></i> Print to PDF
            </button>

            <div class="card">
                <div class="card-title"><i class="fa-solid fa-trophy"></i> High Score</div>
                <p id="highScore" style="font-size: 1.5rem; font-weight: 900; margin: 0; color: var(--wf-orange);">0</p>
            </div>
        </div>

        <!-- MAIN GAME AREA -->
        <div class="main-area">
            <div id="gameBox">
                <div class="game-header">
                    <div id="resultMsg">PRESS START TO PLAY</div>
                    <div class="score-display">
                        SCORE: <span id="currentScore">0</span>
                    </div>
                </div>

                <div class="timer-bar-container">
                    <div id="timerBar"></div>
                </div>

                <div class="math-display">
                    <p id="equation">? + ?</p>
                </div>

                <div class="options-grid">
                    <button class="option-btn" onclick="checkAnswer(this)">-</button>
                    <button class="option-btn" onclick="checkAnswer(this)">-</button>
                    <button class="option-btn" onclick="checkAnswer(this)">-</button>
                    <button class="option-btn" onclick="checkAnswer(this)">-</button>
                </div>
            </div>
        </div>
    </div>

    <script>
        // Game State
        let score = 0;
        let timeLeft = 100;
        let timerInterval;
        let currentAnswer = 0;
        let gameActive = false;
        let difficulty = 'medium';
        let timePerQuestion = 5000; // 5 seconds
        let startTime;

        // Load High Score
        let highScore = localStorage.getItem('quickMathHighScore') || 0;
        document.getElementById('highScore').innerText = highScore;

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

        // --- GAME LOGIC ---
        function startGame() {
            score = 0;
            gameActive = true;
            difficulty = document.getElementById('mathDifficulty').value;
            document.getElementById('currentScore').innerText = score;
            
            showMessage('🚀 GO GO GO!', 'var(--wf-blue)');
            nextQuestion();
        }

        function nextQuestion() {
            if (!gameActive) return;

            // Reset Timer Bar
            clearInterval(timerInterval);
            timeLeft = 100;
            updateTimerBar();
            
            // Generate Equation
            const eq = generateEquation();
            document.getElementById('equation').innerText = eq.text;
            currentAnswer = eq.answer;

            // Generate Options
            const options = generateOptions(eq.answer);
            const btns = document.querySelectorAll('.option-btn');
            btns.forEach((btn, i) => {
                btn.innerText = options[i];
                btn.className = 'option-btn'; // Reset classes
                btn.disabled = false;
            });

            // Start Timer
            startTime = Date.now();
            timerInterval = setInterval(() => {
                const elapsed = Date.now() - startTime;
                const limit = difficulty === 'easy' ? 6000 : (difficulty === 'medium' ? 4000 : 3000);
                timeLeft = 100 - (elapsed / limit * 100);
                
                if (timeLeft <= 0) {
                    timeLeft = 0;
                    updateTimerBar();
                    gameOver('TIME\\'S UP!');
                } else {
                    updateTimerBar();
                }
            }, 50);
        }

        function generateEquation() {
            let a, b, op, text, answer;
            
            if (difficulty === 'easy') {
                a = Math.floor(Math.random() * 20) + 1;
                b = Math.floor(Math.random() * 20) + 1;
                op = Math.random() > 0.5 ? '+' : '-';
                if (op === '-' && a < b) [a, b] = [b, a]; // No negative results for easy
                answer = op === '+' ? a + b : a - b;
                text = \`\${a} \${op} \${b}\`;
            } else if (difficulty === 'medium') {
                a = Math.floor(Math.random() * 12) + 2;
                b = Math.floor(Math.random() * 12) + 2;
                answer = a * b;
                text = \`\${a} × \${b}\`;
            } else {
                // Hard: Mixed
                const type = Math.floor(Math.random() * 3);
                if (type === 0) { // Addition/Sub with larger numbers
                    a = Math.floor(Math.random() * 100) + 10;
                    b = Math.floor(Math.random() * 100) + 10;
                    op = Math.random() > 0.5 ? '+' : '-';
                    answer = op === '+' ? a + b : a - b;
                    text = \`\${a} \${op} \${b}\`;
                } else if (type === 1) { // Multiplication
                    a = Math.floor(Math.random() * 20) + 2;
                    b = Math.floor(Math.random() * 15) + 2;
                    answer = a * b;
                    text = \`\${a} × \${b}\`;
                } else { // Division
                    b = Math.floor(Math.random() * 12) + 2;
                    answer = Math.floor(Math.random() * 12) + 2;
                    a = b * answer;
                    text = \`\${a} ÷ \${b}\`;
                }
            }
            return { text, answer };
        }

        function generateOptions(correct) {
            let options = [correct];
            while (options.length < 4) {
                let offset = Math.floor(Math.random() * 10) + 1;
                if (Math.random() > 0.5) offset *= -1;
                let fake = correct + offset;
                if (fake > 0 && !options.includes(fake)) {
                    options.push(fake);
                }
            }
            return options.sort(() => Math.random() - 0.5);
        }

        function checkAnswer(btn) {
            if (!gameActive) return;
            clearInterval(timerInterval);

            const selected = parseInt(btn.innerText);
            const btns = document.querySelectorAll('.option-btn');
            
            if (selected === currentAnswer) {
                btn.classList.add('correct');
                score++;
                document.getElementById('currentScore').innerText = score;
                showMessage('✨ CORRECT!', 'var(--wf-green)');
                
                setTimeout(nextQuestion, 500);
            } else {
                btn.classList.add('wrong');
                // Show correct one
                btns.forEach(b => {
                    if (parseInt(b.innerText) === currentAnswer) b.classList.add('correct');
                });
                gameOver('WRONG ANSWER!');
            }
        }

        function updateTimerBar() {
            const bar = document.getElementById('timerBar');
            bar.style.width = \`\${timeLeft}%\`;
            if (timeLeft < 30) bar.style.backgroundColor = 'var(--wf-red)';
            else bar.style.backgroundColor = 'var(--wf-orange)';
        }

        function gameOver(reason) {
            gameActive = false;
            clearInterval(timerInterval);
            showMessage(\`💀 \${reason}\`, 'var(--wf-red)', 'var(--wf-white)');
            
            if (score > highScore) {
                highScore = score;
                localStorage.setItem('quickMathHighScore', highScore);
                document.getElementById('highScore').innerText = highScore;
                setTimeout(() => showMessage('🏆 NEW HIGH SCORE!', 'var(--wf-gold)'), 1000);
            }

            document.querySelectorAll('.option-btn').forEach(b => b.disabled = true);
        }

    </script>
</body>
</html>`;
