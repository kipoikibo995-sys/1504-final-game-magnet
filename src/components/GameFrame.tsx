import { useEffect, type RefObject } from 'react';

interface GameFrameProps {
  html: string;
  iframeRef: RefObject<HTMLIFrameElement | null>;
  /** Change this value to reload the game from scratch. */
  reloadKey?: number;
}

export default function GameFrame({ html, iframeRef, reloadKey = 0 }: GameFrameProps) {
  useEffect(() => {
    const handleMessage = (event: MessageEvent) => {
      if (event.source !== iframeRef.current?.contentWindow) return;
      if (event.data?.type === 'PRINT_REQUEST') {
        window.print();
      }
    };
    window.addEventListener('message', handleMessage);
    return () => window.removeEventListener('message', handleMessage);
  }, [iframeRef]);

  useEffect(() => {
    if (iframeRef.current) {
      // Inject a style to make the game content more compact and responsive to the iframe height
      const compactStyle = `
        <style>
          body { 
            padding: 10px !important; 
            min-height: 100vh !important;
            display: flex !important;
            flex-direction: column !important;
            justify-content: center !important;
            align-items: center !important;
          }
          h1 { font-size: clamp(1.2rem, 4vw, 2rem) !important; margin: 5px 0 !important; }
          .subtitle { display: none !important; }
          .container { gap: 10px !important; padding: 0 !important; }
          .card { padding: 10px !important; margin-bottom: 5px !important; }
          #gameBox { padding: 10px !important; max-width: 100% !important; box-shadow: 4px 4px 0px 0px var(--wf-dark) !important; }
          .game-header { margin-bottom: 10px !important; }
          #canvasContainer { max-width: 350px !important; }
          .mobile-controls { margin-top: 10px !important; scale: 0.8; transform-origin: top; }
        </style>
        <script>
          // Override window.print to send a message to the parent
          (function() {
            const originalPrint = window.print;
            window.print = function() {
              window.parent.postMessage({ type: 'PRINT_REQUEST' }, '*');
            };
            // Expose a way to call the original print
            window.triggerActualPrint = function() {
              originalPrint.call(window);
            };
          })();

          // Monitor for game over state and score
          (function() {
            let lastScore = 0;
            let gameOverDetected = false;

            function checkGameState() {
              // Try to find score in common elements
              const scoreEl = document.getElementById('scoreCount') || 
                            document.getElementById('scoreVal') || 
                            document.getElementById('score') ||
                            document.querySelector('.score-display span') ||
                            document.querySelector('.score-pill span');
              
              if (scoreEl) {
                const currentScore = parseInt(scoreEl.innerText) || 0;
                if (currentScore !== lastScore) {
                  lastScore = currentScore;
                  window.parent.postMessage({ type: 'SCORE_UPDATE', score: lastScore }, '*');
                }
              }

              // Try to detect game over message
              const msgEl = document.getElementById('resultMsg') || 
                           document.querySelector('.result-message');
              
              if (msgEl) {
                const text = msgEl.innerText.toUpperCase();
                if ((text.includes('GAME OVER') || text.includes('TRY AGAIN') || text.includes('NO MORE MOVES')) && !gameOverDetected) {
                  gameOverDetected = true;
                  window.parent.postMessage({ type: 'GAME_OVER', score: lastScore }, '*');
                } else if (!text.includes('GAME OVER') && !text.includes('TRY AGAIN')) {
                  gameOverDetected = false;
                }
              }
            }

            setInterval(checkGameState, 500);
          })();
        </script>
      `;
      
      const enhancedHtml = html.replace('</head>', compactStyle + '</head>');
      iframeRef.current.srcdoc = enhancedHtml;
    }
  }, [html, reloadKey, iframeRef]);

  return (
    <div className="w-full flex-1 brutalist-card overflow-hidden bg-wf-white relative flex flex-col print:border-none print:shadow-none print:rounded-none print:p-0 print:m-0 print:block print:h-auto print:overflow-visible">
      <iframe
        ref={iframeRef}
        title="Game Content"
        className="w-full h-full border-none flex-1 print:block print:w-full print:h-screen"
        // allow-same-origin is needed for in-game localStorage (e.g. Quick Math high score).
        // Safe here because the iframe only ever renders the app's own bundled game HTML.
        sandbox="allow-scripts allow-same-origin allow-downloads allow-forms allow-modals allow-popups"
      />
    </div>
  );
}
