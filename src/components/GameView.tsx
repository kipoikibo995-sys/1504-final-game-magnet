import { useParams, Link, Navigate } from 'react-router-dom';
import { GAMES } from '../data/games';
import { hasGameContent, loadGameContent } from '../data/gameContent';
import { isPackageUnlocked } from '../lib/access';
import GameFrame from './GameFrame';
import { ArrowLeft, Maximize2, RotateCcw, Download, Share2, X } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { useState, useEffect, useRef } from 'react';
import { generateChallengeImage } from '../lib/challengeImage';

export default function GameView() {
  const { id } = useParams<{ id: string }>();
  const game = GAMES.find(g => g.id === id);
  const canPlay = !!game && hasGameContent(game.id) && isPackageUnlocked(game.package);

  const iframeRef = useRef<HTMLIFrameElement>(null);
  const [html, setHtml] = useState<string | null>(null);
  const [reloadKey, setReloadKey] = useState(0);
  const [score, setScore] = useState<number>(0);
  const [isGameOver, setIsGameOver] = useState(false);
  const [challengeImage, setChallengeImage] = useState<string | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);

  useEffect(() => {
    if (!canPlay || !game) return;
    let cancelled = false;
    setHtml(null);
    loadGameContent(game.id).then(content => {
      if (!cancelled) setHtml(content);
    });
    return () => { cancelled = true; };
  }, [canPlay, game]);

  useEffect(() => {
    const handleMessage = (event: MessageEvent) => {
      if (event.source !== iframeRef.current?.contentWindow) return;
      if (event.data?.type === 'SCORE_UPDATE') {
        setScore(event.data.score);
      }
      if (event.data?.type === 'GAME_OVER') {
        setIsGameOver(true);
        setScore(event.data.score);
      }
    };

    window.addEventListener('message', handleMessage);
    return () => window.removeEventListener('message', handleMessage);
  }, []);

  // Locked packages can't be opened (or downloaded) by typing the URL directly.
  if (!game || !canPlay) {
    return <Navigate to="/" replace />;
  }

  const handleDownload = () => {
    if (!html) return;
    const blob = new Blob([html], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${game.id}.html`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const handleRestart = () => {
    setScore(0);
    setIsGameOver(false);
    setChallengeImage(null);
    // Re-render through GameFrame so the score/print bridge script is injected again.
    setReloadKey(k => k + 1);
  };

  const handleGenerateChallenge = async () => {
    setIsGenerating(true);
    try {
      const img = await generateChallengeImage(game.title, score);
      setChallengeImage(img);
    } catch (err) {
      console.error('Failed to generate image', err);
    } finally {
      setIsGenerating(false);
    }
  };

  const downloadChallengeImage = () => {
    if (!challengeImage) return;
    const a = document.createElement('a');
    a.href = challengeImage;
    a.download = `challenge-${game.id}-${score}.png`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  return (
    <div className="min-h-screen flex flex-col print:bg-white print:min-h-0">
      <nav className="p-4 md:px-8 md:py-4 flex items-center justify-between bg-wf-white border-b-4 border-wf-dark sticky top-0 z-50 print:hidden gap-2">
        <div className="flex-1 flex justify-start min-w-0">
          <Link 
            to="/" 
            className="brutalist-button bg-wf-gold px-3 py-2 flex items-center gap-2 hover:bg-wf-orange hover:text-white text-sm shrink-0"
          >
            <ArrowLeft size={18} strokeWidth={3} className="shrink-0" />
            <span className="hidden sm:inline whitespace-nowrap">Back to Library</span>
            <span className="sm:hidden whitespace-nowrap">Back</span>
          </Link>
        </div>

        <div className="flex-[2] text-center min-w-0 px-2">
          <h2 className="text-lg md:text-3xl font-black uppercase tracking-tight leading-none truncate">
            {game.title}
          </h2>
          <div className="flex items-center justify-center gap-4 mt-1">
            <span className="text-[10px] md:text-xs font-black uppercase text-gray-500 truncate">
              {game.category}
            </span>
            <div className="bg-wf-gold px-2 py-0.5 border-2 border-wf-dark text-[10px] md:text-xs font-black uppercase shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] shrink-0">
              Score: {score}
            </div>
          </div>
        </div>

        <div className="flex-1 flex justify-end gap-2 min-w-0">
          <button 
            onClick={handleDownload}
            disabled={!html}
            className="brutalist-button bg-wf-gold p-2 hover:bg-wf-orange shrink-0"
            title="Download HTML"
          >
            <Download size={18} strokeWidth={3} />
          </button>
          <button 
            onClick={handleRestart}
            className="brutalist-button bg-wf-blue p-2 hover:bg-wf-green shrink-0"
            title="Restart Game"
          >
            <RotateCcw size={18} strokeWidth={3} />
          </button>
          <button 
            className="brutalist-button bg-wf-white p-2 hidden sm:block shrink-0"
            title="Fullscreen"
            onClick={() => {
              iframeRef.current?.requestFullscreen?.();
            }}
          >
            <Maximize2 size={18} strokeWidth={3} />
          </button>
        </div>
      </nav>

      <main className="flex-1 p-2 md:p-4 bg-wf-cream relative overflow-hidden flex flex-col print:p-0 print:m-0 print:block print:overflow-visible">
        <motion.div 
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="w-full flex-1 max-w-6xl mx-auto flex flex-col h-full print:max-w-none print:w-full print:h-auto print:block"
        >
          {html ? (
            <GameFrame html={html} iframeRef={iframeRef} reloadKey={reloadKey} />
          ) : (
            <div className="w-full flex-1 brutalist-card bg-wf-white flex items-center justify-center font-black uppercase">
              Loading...
            </div>
          )}
        </motion.div>

        {/* Game Over Overlay / Challenge Button */}
        <AnimatePresence>
          {isGameOver && !challengeImage && (
            <motion.div 
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              className="absolute bottom-10 left-1/2 -translate-x-1/2 z-40 print:hidden"
            >
              <button 
                onClick={handleGenerateChallenge}
                disabled={isGenerating}
                className="brutalist-button bg-wf-orange text-white px-8 py-4 text-xl flex items-center gap-3 hover:bg-wf-dark"
              >
                <Share2 size={24} strokeWidth={3} />
                {isGenerating ? 'GENERATING...' : 'CREATE CHALLENGE IMAGE'}
              </button>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Challenge Image Modal */}
        <AnimatePresence>
          {challengeImage && (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/80 z-[100] flex items-center justify-center p-4 backdrop-blur-sm"
            >
              <motion.div 
                initial={{ scale: 0.9, y: 20 }}
                animate={{ scale: 1, y: 0 }}
                className="brutalist-card bg-wf-white max-w-2xl w-full p-6 relative"
              >
                <button 
                  onClick={() => setChallengeImage(null)}
                  className="absolute -top-4 -right-4 brutalist-button bg-wf-red text-white p-2"
                >
                  <X size={24} strokeWidth={3} />
                </button>

                <div className="mb-6 border-4 border-wf-dark shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] overflow-hidden">
                  <img src={challengeImage} alt="Challenge" className="w-full h-auto" />
                </div>

                <div className="flex flex-col sm:flex-row gap-4">
                  <button 
                    onClick={downloadChallengeImage}
                    className="flex-1 brutalist-button bg-wf-green px-6 py-4 text-lg flex items-center justify-center gap-2"
                  >
                    <Download size={20} strokeWidth={3} />
                    DOWNLOAD IMAGE
                  </button>
                  <button 
                    onClick={handleRestart}
                    className="flex-1 brutalist-button bg-wf-blue px-6 py-4 text-lg flex items-center justify-center gap-2"
                  >
                    <RotateCcw size={20} strokeWidth={3} />
                    PLAY AGAIN
                  </button>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
        
        {/* Background Decorative Elements */}
        <div className="absolute top-10 right-10 w-32 h-32 bg-wf-orange/10 rounded-full -z-10 blur-3xl print:hidden"></div>
        <div className="absolute bottom-10 left-10 w-48 h-48 bg-wf-blue/10 rounded-full -z-10 blur-3xl print:hidden"></div>
      </main>
    </div>
  );
}
