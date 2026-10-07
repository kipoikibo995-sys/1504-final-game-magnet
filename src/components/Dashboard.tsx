import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { GAMES, Game } from '../data/games';
import { loadGameContent } from '../data/gameContent';
import {
  ArrowRight, Binary, Bomb, Book, BookOpen, Calculator, Copy, Dog, Download, Equal, Gamepad2, Gift,
  GraduationCap, Grid, Grid3X3, Image as ImageIcon, Key, Layout, Lock, Map as MapIcon, Megaphone, Move, Palette,
  Rocket, Search, Settings, Shuffle, Skull, Star, Type, Waypoints, X,
} from 'lucide-react';
import { isPackageUnlocked, tryUnlock } from '../lib/access';
import { cn } from '../lib/utils';
import { motion, AnimatePresence } from 'motion/react';

// Only the icons we actually use, so the whole lucide set isn't bundled.
// Game/ad icons are looked up by name, so every `icon` in games.ts and ADS must be listed here.
const Icons = {
  ArrowRight, Binary, Bomb, Book, BookOpen, Calculator, Copy, Dog, Download, Equal, Gamepad2, Gift,
  GraduationCap, Grid, Grid3X3, Image: ImageIcon, Key, Layout, Lock, Map: MapIcon, Megaphone, Move, Palette,
  Rocket, Search, Settings, Shuffle, Skull, Star, Type, Waypoints, X,
};

const ADS = [
  {
    title: "KDP Kid Hub Auto",
    desc: "Automate your KDP kids book business.",
    url: "https://kojilaunch.com/kdp-kid-hub-auto/",
    icon: "Book",
    color: "bg-wf-gold",
    textColor: "text-wf-dark"
  },
  {
    title: "Pet Story Architect",
    desc: "Create engaging pet stories easily.",
    url: "https://kojilaunch.com/pet-story-architect/",
    icon: "Dog",
    color: "bg-wf-green",
    textColor: "text-wf-dark"
  },
  {
    title: "Kids Learning Architect",
    desc: "Build educational KDP books fast.",
    url: "https://kojilaunch.com/fe-kids-learning-architect-kdp/",
    icon: "GraduationCap",
    color: "bg-wf-purple",
    textColor: "text-white"
  }
];

export default function Dashboard() {
  const feGames = GAMES.filter(g => g.package === 'FE');
  const oto1Games = GAMES.filter(g => g.package === 'OTO1');
  const featuredGame = GAMES.find(g => g.isFeatured) || feGames[0];

  // Unlock State
  const [isUnlocked, setIsUnlocked] = useState(() => isPackageUnlocked('FE'));
  const [showUnlockModal, setShowUnlockModal] = useState(false);
  const [accessCode, setAccessCode] = useState('');
  const [error, setError] = useState('');

  // OTO 1 Unlock State
  const [isOto1Unlocked, setIsOto1Unlocked] = useState(() => isPackageUnlocked('OTO1'));
  const [showOto1UnlockModal, setShowOto1UnlockModal] = useState(false);
  const [oto1AccessCode, setOto1AccessCode] = useState('');
  const [oto1Error, setOto1Error] = useState('');

  // OTO 2 Unlock State
  const [isOto2Unlocked, setIsOto2Unlocked] = useState(() => isPackageUnlocked('OTO2'));
  const [showOto2UnlockModal, setShowOto2UnlockModal] = useState(false);
  const [oto2AccessCode, setOto2AccessCode] = useState('');
  const [oto2Error, setOto2Error] = useState('');

  const handleUnlock = (e: React.FormEvent) => {
    e.preventDefault();
    if (tryUnlock('FE', accessCode)) {
      setIsUnlocked(true);
      setShowUnlockModal(false);
      setError('');
    } else {
      setError('Invalid access code. Please try again.');
    }
  };

  const handleOto1Unlock = (e: React.FormEvent) => {
    e.preventDefault();
    if (tryUnlock('OTO1', oto1AccessCode)) {
      setIsOto1Unlocked(true);
      setShowOto1UnlockModal(false);
      setOto1Error('');
    } else {
      setOto1Error('Invalid access code. Please try again.');
    }
  };

  const handleOto2Unlock = (e: React.FormEvent) => {
    e.preventDefault();
    if (tryUnlock('OTO2', oto2AccessCode)) {
      setIsOto2Unlocked(true);
      setShowOto2UnlockModal(false);
      setOto2Error('');
    } else {
      setOto2Error('Invalid access code. Please try again.');
    }
  };

  // White-Label Generator State
  const [wlGameId, setWlGameId] = useState<string>(feGames[0].id);
  const [wlAppName, setWlAppName] = useState<string>('');
  const [wlFooterText, setWlFooterText] = useState<string>('© 2026 MyBrand. All rights reserved.');
  const [wlThemeColor, setWlThemeColor] = useState<string>('#00E5FF');
  const [wlBgColor, setWlBgColor] = useState<string>('#E4E3E0');
  const [wlCardColor, setWlCardColor] = useState<string>('#FFFFFF');
  const [wlBorderColor, setWlBorderColor] = useState<string>('#141414');
  const [wlFontFamily, setWlFontFamily] = useState<string>("'Courier New', Courier, monospace");
  const [wlLogoUrl, setWlLogoUrl] = useState<string>('');
  const [wlWatermarkUrl, setWlWatermarkUrl] = useState<string>('');
  const [wlUiStyle, setWlUiStyle] = useState<string>('brutalist');
  const [wlBgPattern, setWlBgPattern] = useState<string>('solid');
  const [wlAdText, setWlAdText] = useState<string>('');
  const [wlAdLink, setWlAdLink] = useState<string>('');

  // Floating Ad State
  const [currentAdIndex, setCurrentAdIndex] = useState<number>(0);
  const [isAdExpanded, setIsAdExpanded] = useState<boolean>(false);

  useEffect(() => {
    let hideTimeout: NodeJS.Timeout;
    if (isAdExpanded) {
      hideTimeout = setTimeout(() => {
        setIsAdExpanded(false);
      }, 6000);
    }
    return () => clearTimeout(hideTimeout);
  }, [isAdExpanded]);

  useEffect(() => {
    const triggerAd = () => {
      setCurrentAdIndex(Math.floor(Math.random() * ADS.length));
      setIsAdExpanded(true);
    };

    // Initial delay before first ad
    const initialTimer = setTimeout(triggerAd, 5000);

    // Recurring timer every 20 seconds
    const interval = setInterval(triggerAd, 20000);

    return () => {
      clearTimeout(initialTimer);
      clearInterval(interval);
    };
  }, []);

  const handleDownload = async (e: React.MouseEvent, gameId: string) => {
    e.preventDefault();
    e.stopPropagation();
    const game = GAMES.find(g => g.id === gameId);
    if (game?.package === 'FE' && !isUnlocked) {
      setShowUnlockModal(true);
      return;
    }
    if (game?.package === 'OTO1' && !isOto1Unlocked) {
      setShowOto1UnlockModal(true);
      return;
    }
    const html = await loadGameContent(gameId);
    if (!html) return;

    const blob = new Blob([html], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${gameId}.html`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const generateWhiteLabelHTML = async (gameId: string) => {
    let html = await loadGameContent(gameId);
    if (!html) return null;

    const game = GAMES.find(g => g.id === gameId);
    const defaultTitle = game ? game.title : 'Game';
    
    // Replace Title or Add Logo
    const newTitle = wlAppName.trim() || defaultTitle;
    html = html.replace(/<title>.*?<\/title>/i, `<title>${newTitle}</title>`);
    
    if (wlLogoUrl.trim()) {
      const logoHtml = `<img src="${wlLogoUrl}" alt="Logo" style="max-height: 80px; margin-bottom: 20px; display: block;" />`;
      html = html.replace(/<h1>.*?<\/h1>/i, logoHtml);
    } else {
      html = html.replace(/<h1>.*?<\/h1>/i, `<h1>${newTitle}</h1>`);
    }

    // Add footer text before closing body tag
    const footerHtml = `
    <footer style="text-align: center; padding: 20px; font-weight: bold; margin-top: 40px; border-top: 4px solid var(--wf-dark); background: var(--wf-white);">
      ${wlFooterText}
    </footer>
    `;
    html = html.replace('</body>', `${footerHtml}\n</body>`);

    // Build Style Override
    let styleOverride = `
    <style>
      @import url('https://fonts.googleapis.com/css2?family=Comic+Neue:wght@700&family=Playfair+Display:wght@700&family=Press+Start+2P&family=Roboto:wght@400;700&display=swap');
      
      :root {
        --wf-bg: ${wlBgColor} !important;
        --wf-white: ${wlCardColor} !important;
        --wf-dark: ${wlBorderColor} !important;
        --wf-blue: ${wlThemeColor} !important;
        --wf-gold: ${wlThemeColor} !important;
        --wf-purple: ${wlThemeColor} !important;
      }
      body {
        font-family: ${wlFontFamily} !important;
        background-color: var(--wf-bg) !important;
        color: var(--wf-dark) !important;
      }
    `;

    if (wlBgPattern === 'dots') {
      styleOverride += `body { background-image: radial-gradient(var(--wf-dark) 2px, transparent 2px) !important; background-size: 30px 30px !important; }`;
    } else if (wlBgPattern === 'stripes') {
      styleOverride += `body { background-image: repeating-linear-gradient(45deg, transparent, transparent 10px, rgba(0,0,0,0.05) 10px, rgba(0,0,0,0.05) 20px) !important; }`;
    } else if (wlBgPattern === 'grid') {
      styleOverride += `body { background-image: linear-gradient(rgba(0,0,0,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(0,0,0,0.1) 1px, transparent 1px) !important; background-size: 30px 30px !important; }`;
    }

    if (wlUiStyle === 'modern') {
      styleOverride += `
        .container, .btn, .card { 
          border: 2px solid #e2e8f0 !important; 
          border-radius: 16px !important; 
          box-shadow: 0 10px 15px -3px rgba(0,0,0,0.1) !important; 
        }
        .btn:hover { transform: translateY(-2px) !important; box-shadow: 0 20px 25px -5px rgba(0,0,0,0.1) !important; }
      `;
    } else if (wlUiStyle === 'minimalist') {
      styleOverride += `
        .container, .btn, .card { 
          border: 1px solid #cbd5e1 !important; 
          border-radius: 4px !important; 
          box-shadow: none !important; 
        }
        .btn:hover { background-color: #f1f5f9 !important; transform: none !important; }
      `;
    }

    if (wlWatermarkUrl.trim()) {
      styleOverride += `
        .container { position: relative; z-index: 1; }
        .container::before {
          content: "";
          position: absolute;
          top: 0; left: 0; right: 0; bottom: 0;
          background-image: url('${wlWatermarkUrl}');
          background-size: contain;
          background-position: center;
          background-repeat: no-repeat;
          opacity: 0.1;
          z-index: -1;
          pointer-events: none;
        }
      `;
    }

    styleOverride += `
      .custom-ad-banner {
        display: block;
        width: 100%;
        max-width: 800px;
        margin: 0 auto 25px auto;
        padding: 15px 20px;
        background-color: var(--wf-gold);
        border: 4px solid var(--wf-dark);
        color: var(--wf-dark);
        text-align: center;
        text-decoration: none;
        font-weight: 900;
        font-size: 1.2rem;
        text-transform: uppercase;
        transition: all 0.2s ease;
      }
      .custom-ad-banner:hover {
        background-color: var(--wf-orange);
        color: var(--wf-white);
        transform: translateY(-2px);
      }
      @media print {
        .custom-ad-banner { display: none !important; }
      }
    </style>
    `;
    html = html.replace('</head>', `${styleOverride}\n</head>`);

    // Inject Ad Banner
    if (wlAdLink.trim()) {
      const displayText = wlAdText.trim() || '👉 CLICK HERE TO VISIT OUR SPONSOR 👈';
      const adHtml = `
      <a href="${wlAdLink}" target="_blank" rel="noopener noreferrer" class="custom-ad-banner">
        ${displayText}
      </a>
      `;
      // Inject before the main container
      html = html.replace('<div class="container">', `${adHtml}\n    <div class="container">`);
    }

    return html;
  };

  const handleGenerateWhiteLabel = async () => {
    const game = GAMES.find(g => g.id === wlGameId);
    if (game?.package === 'FE' && !isUnlocked) {
      setShowUnlockModal(true);
      return;
    }
    if (game?.package === 'OTO1' && !isOto1Unlocked) {
      setShowOto1UnlockModal(true);
      return;
    }
    const customizedHtml = await generateWhiteLabelHTML(wlGameId);
    if (!customizedHtml) return;

    const blob = new Blob([customizedHtml], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    
    const fileNamePrefix = wlAppName.trim() ? wlAppName.toLowerCase().replace(/[^a-z0-9]+/g, '-') : wlGameId;
    a.download = `${fileNamePrefix}.html`;
    
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="container mx-auto px-4 py-12">
      <header className="text-center mb-16">
        <motion.h1 
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="text-6xl md:text-8xl font-black uppercase tracking-tighter mb-4"
        >
          Game <span className="text-wf-blue relative inline-block">
            Hub
            <span className="absolute bottom-2 left-0 w-full h-4 bg-wf-gold -z-10 skew-x-[-15deg] border-2 border-wf-dark"></span>
          </span>
        </motion.h1>
        <p className="text-xl font-bold uppercase text-gray-600">5 Brutalist Classics • PLR HTML & KDP Printables</p>
      </header>

      {/* FE PACKAGE SECTION */}
      <section className="mb-20">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mb-8">
          <div className="flex items-center gap-4 flex-1 w-full">
            <h2 className="text-3xl font-black uppercase bg-wf-gold px-6 py-2 border-4 border-wf-dark shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] whitespace-nowrap">
              FE Package <span className="text-sm opacity-60 ml-2">({feGames.length} Games)</span>
            </h2>
            <div className="h-1 flex-1 bg-wf-dark"></div>
          </div>
          {isUnlocked && (
            <a href="https://docs.google.com/document/d/1qYQTgyQXfB06rHUSXgAIzJd0YROIQqEZmJh5mGEoMog/edit?tab=t.0" target="_blank" rel="noopener noreferrer" className="px-4 py-2 bg-wf-white border-4 border-wf-dark font-black uppercase text-sm shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:bg-wf-blue hover:text-white transition-colors whitespace-nowrap flex items-center gap-2">
              <Icons.BookOpen size={16} /> Instructions
            </a>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
          {feGames.map((game, index) => {
            const IconComponent = Icons[game.icon as keyof typeof Icons] || Icons.Gamepad2;
            return (
              <motion.div
                key={game.id}
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: index * 0.05 }}
                className="relative group"
              >
                {!isUnlocked && (
                  <div 
                    className="absolute inset-0 z-20 flex flex-col items-center justify-center bg-white/60 backdrop-blur-[2px] opacity-0 group-hover:opacity-100 transition-opacity border-4 border-transparent group-hover:border-wf-dark cursor-pointer"
                    onClick={(e) => { e.preventDefault(); setShowUnlockModal(true); }}
                  >
                    <Icons.Lock size={48} className="mb-4 text-wf-dark drop-shadow-md" />
                    <div className="px-4 py-3 bg-wf-green border-4 border-wf-dark font-black uppercase text-xs shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:bg-wf-orange hover:text-white transition-colors text-center">
                      Unlock FE Package<br/>(Enter Code)
                    </div>
                  </div>
                )}
                <Link 
                  to={isUnlocked ? `/game/${game.id}` : '#'}
                  onClick={(e) => { if(!isUnlocked) e.preventDefault(); }}
                  className={cn(
                    "group flex flex-col h-full brutalist-card p-6 transition-all",
                    isUnlocked ? "hover:-translate-y-2 hover:-translate-x-1 hover:shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]" : "grayscale opacity-70"
                  )}
                >
                  <div className="flex justify-between items-start mb-6">
                    <div className={cn(
                      "w-14 h-14 rounded-xl border-4 border-wf-dark flex items-center justify-center shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] group-hover:rotate-6 transition-transform",
                      game.color
                    )}>
                      <IconComponent size={28} strokeWidth={3} />
                    </div>
                    <div className={cn(
                      "text-[8px] font-black uppercase px-2 py-1 rounded border-2 border-wf-dark",
                      game.difficulty === 'Easy' ? 'bg-wf-green' : 
                      game.difficulty === 'Medium' ? 'bg-wf-gold' : 'bg-wf-red text-white'
                    )}>
                      {game.difficulty}
                    </div>
                  </div>
                  
                  <h3 className="text-xl font-black uppercase mb-6 group-hover:text-wf-orange transition-colors">
                    {game.title}
                  </h3>
                  
                  <div className="mt-auto flex items-center justify-between">
                    <div className="px-4 py-2 bg-wf-dark text-white text-[10px] font-black uppercase rounded-lg group-hover:bg-wf-blue group-hover:text-wf-dark transition-all flex items-center gap-2">
                      Play <Icons.ArrowRight size={14} />
                    </div>
                    <button
                      onClick={(e) => handleDownload(e, game.id)}
                      className="w-10 h-10 flex items-center justify-center bg-wf-white border-2 border-wf-dark rounded-lg hover:bg-wf-orange hover:text-white transition-colors"
                      title="Download HTML"
                    >
                      <Icons.Download size={16} strokeWidth={3} />
                    </button>
                  </div>
                </Link>
              </motion.div>
            );
          })}
        </div>
      </section>

      {/* OTO 1 PACKAGE SECTION */}
      <section className="mb-20">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mb-8">
          <div className="flex items-center gap-4 flex-1 w-full">
            <h2 className="text-3xl font-black uppercase bg-wf-purple text-white px-6 py-2 border-4 border-wf-dark shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] whitespace-nowrap">
              OTO 1: KDP Empire <span className="text-sm opacity-80 ml-2">({isOto1Unlocked ? 'Unlocked' : 'Locked'})</span>
            </h2>
            <div className="h-1 flex-1 bg-wf-dark"></div>
          </div>
          {isOto1Unlocked && (
            <a href="https://docs.google.com/document/d/1weWxWnsUimhrFBQo8MEhrpRmXLh1HsMgqMC3zi0FmRI/edit?tab=t.0" target="_blank" rel="noopener noreferrer" className="px-4 py-2 bg-wf-white border-4 border-wf-dark font-black uppercase text-sm shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:bg-wf-blue hover:text-white transition-colors whitespace-nowrap flex items-center gap-2">
              <Icons.BookOpen size={16} /> Instructions
            </a>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
          {oto1Games.map((game, index) => {
            const IconComponent = Icons[game.icon as keyof typeof Icons] || Icons.Gamepad2;
            return (
              <motion.div
                key={game.id}
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: index * 0.05 }}
                className="relative group"
              >
                {/* Lock Overlay */}
                {!isOto1Unlocked && (
                  <div 
                    className="absolute inset-0 z-20 flex flex-col items-center justify-center bg-white/60 backdrop-blur-[2px] opacity-0 group-hover:opacity-100 transition-opacity border-4 border-transparent group-hover:border-wf-dark cursor-pointer"
                    onClick={(e) => { e.preventDefault(); setShowOto1UnlockModal(true); }}
                  >
                    <Icons.Lock size={48} className="mb-4 text-wf-dark drop-shadow-md" />
                    <div className="px-4 py-3 bg-wf-purple text-white border-4 border-wf-dark font-black uppercase text-xs shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:bg-wf-orange transition-colors text-center">
                      Unlock OTO 1<br/>(Enter Code)
                    </div>
                  </div>
                )}

                <Link 
                  to={isOto1Unlocked ? `/game/${game.id}` : '#'}
                  onClick={(e) => { if(!isOto1Unlocked) e.preventDefault(); }}
                  className={cn(
                    "group flex flex-col h-full brutalist-card p-6 transition-all",
                    isOto1Unlocked ? "hover:-translate-y-2 hover:-translate-x-1 hover:shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]" : "grayscale opacity-70"
                  )}
                >
                  <div className="flex justify-between items-start mb-6">
                    <div className={cn(
                      "w-14 h-14 rounded-xl border-4 border-wf-dark flex items-center justify-center shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]",
                      isOto1Unlocked ? "group-hover:rotate-6 transition-transform" : "",
                      game.color
                    )}>
                      <IconComponent size={28} strokeWidth={3} />
                    </div>
                    <div className="text-[8px] font-black uppercase px-2 py-1 rounded border-2 border-wf-dark bg-gray-200 text-gray-600">
                      KDP Ready 🖨️
                    </div>
                  </div>
                  
                  <h3 className={cn("text-xl font-black uppercase mb-2 transition-colors", isOto1Unlocked ? "group-hover:text-wf-orange" : "")}>
                    {game.title}
                  </h3>
                  <p className="text-xs font-bold text-gray-500 mb-6 line-clamp-2">
                    {game.description}
                  </p>
                  
                  <div className="mt-auto flex items-center justify-between">
                    {isOto1Unlocked ? (
                      <>
                        <div className="px-4 py-2 bg-wf-dark text-white text-[10px] font-black uppercase rounded-lg group-hover:bg-wf-blue group-hover:text-wf-dark transition-all flex items-center gap-2">
                          Play <Icons.ArrowRight size={14} />
                        </div>
                        <button
                          onClick={(e) => handleDownload(e, game.id)}
                          className="w-10 h-10 flex items-center justify-center bg-wf-white border-2 border-wf-dark rounded-lg hover:bg-wf-orange hover:text-white transition-colors"
                          title="Download HTML"
                        >
                          <Icons.Download size={16} strokeWidth={3} />
                        </button>
                      </>
                    ) : (
                      <div className="px-4 py-2 bg-gray-300 text-gray-600 text-[10px] font-black uppercase rounded-lg flex items-center gap-2">
                        Locked <Icons.Lock size={14} />
                      </div>
                    )}
                  </div>
                </Link>
              </motion.div>
            );
          })}
        </div>
      </section>

      {/* PLR WHITE-LABEL GENERATOR SECTION */}
      <section className="mb-20 mt-12">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mb-8">
          <div className="flex items-center gap-4 flex-1 w-full">
            <h2 className="text-3xl font-black uppercase bg-wf-dark text-white px-6 py-2 border-4 border-wf-dark shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] flex items-center gap-3 whitespace-nowrap">
              <Icons.Settings size={28} /> PLR White-Label Generator
            </h2>
            <div className="h-1 flex-1 bg-wf-dark"></div>
          </div>
          {isOto2Unlocked && (
            <a href="https://docs.google.com/document/d/1B5Y5KUaX_uoH2woeQmAFsjKyjBhBMl3B9Z_X1XlswSA/edit?tab=t.0" target="_blank" rel="noopener noreferrer" className="px-4 py-2 bg-wf-white border-4 border-wf-dark font-black uppercase text-sm shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:bg-wf-blue hover:text-white transition-colors whitespace-nowrap flex items-center gap-2">
              <Icons.BookOpen size={16} /> Instructions
            </a>
          )}
        </div>

        <div className="relative brutalist-card bg-wf-white p-8 border-4 border-wf-dark shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] overflow-hidden">
          {!isOto2Unlocked && (
            <div 
              className="absolute inset-0 z-30 flex flex-col items-center justify-center bg-white/60 backdrop-blur-sm cursor-pointer transition-all hover:bg-white/70"
              onClick={() => setShowOto2UnlockModal(true)}
            >
              <Icons.Lock size={64} className="mb-6 text-wf-dark drop-shadow-lg" />
              <div className="px-8 py-4 bg-wf-green border-4 border-wf-dark font-black uppercase text-xl shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hover:bg-wf-orange hover:text-white hover:-translate-y-1 hover:shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] transition-all text-center">
                Unlock Generator<br/><span className="text-sm">(Enter OTO 2 Code)</span>
              </div>
            </div>
          )}
          <div className={cn("grid grid-cols-1 lg:grid-cols-2 gap-12 items-start lg:h-[700px]", !isOto2Unlocked && "pointer-events-none blur-[2px]")}>
            
            {/* Control Panel */}
            <div className="space-y-6 lg:overflow-y-auto brutalist-scrollbar lg:pr-6 h-full pb-8">
              <h3 className="text-2xl font-black uppercase border-b-4 border-wf-dark pb-2 mb-6 sticky top-0 bg-wf-white z-10 pt-2">Brand Your Games</h3>
              
              <div className="space-y-2">
                <label className="font-black uppercase text-sm">1. Select Game</label>
                <select 
                  value={wlGameId}
                  onChange={(e) => setWlGameId(e.target.value)}
                  className="w-full p-3 border-4 border-wf-dark font-bold bg-wf-cream focus:bg-white transition-colors outline-none"
                >
                  <optgroup label={`--- FE Package (${feGames.length} Games) ---`}>
                    {feGames.map(g => (
                      <option key={g.id} value={g.id}>{g.title}</option>
                    ))}
                  </optgroup>
                  {isOto1Unlocked && (
                    <optgroup label={`--- OTO 1: KDP Package (${oto1Games.length} Games) ---`}>
                      {oto1Games.map(g => (
                        <option key={g.id} value={g.id}>{g.title}</option>
                      ))}
                    </optgroup>
                  )}
                </select>
              </div>

              <div className="space-y-2">
                <label className="font-black uppercase text-sm">2. Custom App Name (Optional)</label>
                <input 
                  type="text" 
                  placeholder="e.g., BrainBoost Puzzles"
                  value={wlAppName}
                  onChange={(e) => setWlAppName(e.target.value)}
                  className="w-full p-3 border-4 border-wf-dark font-bold bg-wf-cream focus:bg-white transition-colors outline-none placeholder:text-gray-400"
                />
              </div>

              <div className="space-y-2">
                <label className="font-black uppercase text-sm">3. Footer Copyright Text</label>
                <input 
                  type="text" 
                  placeholder="© 2026 MyBrand. All rights reserved."
                  value={wlFooterText}
                  onChange={(e) => setWlFooterText(e.target.value)}
                  className="w-full p-3 border-4 border-wf-dark font-bold bg-wf-cream focus:bg-white transition-colors outline-none"
                />
              </div>

              <div className="space-y-4 border-t-4 border-wf-dark pt-6 mt-6">
                <h4 className="font-black uppercase text-lg flex items-center gap-2">
                  <Icons.Palette size={20} /> Advanced Colors
                </h4>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="font-bold text-sm">Background</label>
                    <input type="color" value={wlBgColor} onChange={(e) => setWlBgColor(e.target.value)} className="w-full h-10 p-1 border-4 border-wf-dark cursor-pointer bg-wf-cream" />
                  </div>
                  <div className="space-y-2">
                    <label className="font-bold text-sm">Card/Box</label>
                    <input type="color" value={wlCardColor} onChange={(e) => setWlCardColor(e.target.value)} className="w-full h-10 p-1 border-4 border-wf-dark cursor-pointer bg-wf-cream" />
                  </div>
                  <div className="space-y-2">
                    <label className="font-bold text-sm">Border & Text</label>
                    <input type="color" value={wlBorderColor} onChange={(e) => setWlBorderColor(e.target.value)} className="w-full h-10 p-1 border-4 border-wf-dark cursor-pointer bg-wf-cream" />
                  </div>
                  <div className="space-y-2">
                    <label className="font-bold text-sm">Primary Theme</label>
                    <input type="color" value={wlThemeColor} onChange={(e) => setWlThemeColor(e.target.value)} className="w-full h-10 p-1 border-4 border-wf-dark cursor-pointer bg-wf-cream" />
                  </div>
                </div>
              </div>

              <div className="space-y-4 border-t-4 border-wf-dark pt-6 mt-6">
                <h4 className="font-black uppercase text-lg flex items-center gap-2">
                  <Icons.Type size={20} /> Typography & Branding
                </h4>
                <div className="space-y-2">
                  <label className="font-bold text-sm">Font Family</label>
                  <select value={wlFontFamily} onChange={(e) => setWlFontFamily(e.target.value)} className="w-full p-3 border-4 border-wf-dark font-bold bg-wf-cream focus:bg-white transition-colors outline-none">
                    <option value="'Courier New', Courier, monospace">Brutalist (Courier New)</option>
                    <option value="'Comic Neue', cursive">Playful (Comic Neue)</option>
                    <option value="'Press Start 2P', cursive">Retro/Pixel (Press Start 2P)</option>
                    <option value="'Playfair Display', serif">Elegant (Playfair Display)</option>
                    <option value="'Roboto', sans-serif">Modern (Roboto)</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <label className="font-bold text-sm">Custom Logo URL</label>
                  <input type="url" placeholder="https://example.com/logo.png" value={wlLogoUrl} onChange={(e) => setWlLogoUrl(e.target.value)} className="w-full p-3 border-4 border-wf-dark font-bold bg-wf-cream focus:bg-white transition-colors outline-none" />
                </div>
                <div className="space-y-2">
                  <label className="font-bold text-sm">Watermark Image URL</label>
                  <input type="url" placeholder="https://example.com/watermark.png" value={wlWatermarkUrl} onChange={(e) => setWlWatermarkUrl(e.target.value)} className="w-full p-3 border-4 border-wf-dark font-bold bg-wf-cream focus:bg-white transition-colors outline-none" />
                </div>
              </div>

              <div className="space-y-4 border-t-4 border-wf-dark pt-6 mt-6">
                <h4 className="font-black uppercase text-lg flex items-center gap-2">
                  <Icons.Layout size={20} /> UI Style & Patterns
                </h4>
                <div className="space-y-2">
                  <label className="font-bold text-sm">UI Style</label>
                  <select value={wlUiStyle} onChange={(e) => setWlUiStyle(e.target.value)} className="w-full p-3 border-4 border-wf-dark font-bold bg-wf-cream focus:bg-white transition-colors outline-none">
                    <option value="brutalist">Brutalist (Thick borders, sharp corners)</option>
                    <option value="modern">Modern (Rounded corners, soft shadows)</option>
                    <option value="minimalist">Minimalist (Thin borders, no shadows)</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <label className="font-bold text-sm">Background Pattern</label>
                  <select value={wlBgPattern} onChange={(e) => setWlBgPattern(e.target.value)} className="w-full p-3 border-4 border-wf-dark font-bold bg-wf-cream focus:bg-white transition-colors outline-none">
                    <option value="solid">Solid Color</option>
                    <option value="dots">Polka Dots</option>
                    <option value="stripes">Diagonal Stripes</option>
                    <option value="grid">Graph Paper Grid</option>
                  </select>
                </div>
              </div>

              <div className="space-y-4 border-t-4 border-wf-dark pt-6 mt-6">
                <h4 className="font-black uppercase text-lg flex items-center gap-2">
                  <Icons.Megaphone size={20} /> Monetization (Optional)
                </h4>
                
                <div className="space-y-2">
                  <label className="font-bold text-sm">Ad Banner Text</label>
                  <input 
                    type="text"
                    placeholder="e.g., 👉 CLICK HERE FOR 50% OFF PUZZLE BOOKS!"
                    value={wlAdText}
                    onChange={(e) => setWlAdText(e.target.value)}
                    className="w-full p-3 border-4 border-wf-dark font-bold bg-wf-cream focus:bg-white transition-colors outline-none"
                  />
                </div>

                <div className="space-y-2">
                  <label className="font-bold text-sm">Target URL (Link)</label>
                  <input 
                    type="url"
                    placeholder="https://your-affiliate-link.com"
                    value={wlAdLink}
                    onChange={(e) => setWlAdLink(e.target.value)}
                    className="w-full p-3 border-4 border-wf-dark font-bold bg-wf-cream focus:bg-white transition-colors outline-none"
                  />
                  <p className="text-xs font-bold text-gray-500">A clickable banner will be generated above the game.</p>
                </div>
              </div>

              <button 
                onClick={handleGenerateWhiteLabel}
                className="w-full mt-8 py-4 bg-wf-green border-4 border-wf-dark font-black uppercase text-xl shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hover:translate-y-1 hover:translate-x-1 hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] transition-all flex items-center justify-center gap-3"
              >
                <Icons.Download size={24} strokeWidth={3} />
                Generate & Download
              </button>
            </div>

            {/* Live Preview */}
            <div 
              className="border-4 border-wf-dark p-6 relative overflow-hidden flex flex-col items-center justify-center text-center min-h-[400px] h-full"
              style={{
                backgroundColor: wlBgColor,
                backgroundImage: wlBgPattern === 'dots' ? `radial-gradient(${wlBorderColor} 2px, transparent 2px)` : 
                                 wlBgPattern === 'stripes' ? `repeating-linear-gradient(45deg, transparent, transparent 10px, rgba(0,0,0,0.05) 10px, rgba(0,0,0,0.05) 20px)` : 
                                 wlBgPattern === 'grid' ? `linear-gradient(rgba(0,0,0,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(0,0,0,0.1) 1px, transparent 1px)` : 'none',
                backgroundSize: wlBgPattern === 'dots' || wlBgPattern === 'grid' ? '30px 30px' : 'auto',
                fontFamily: wlFontFamily
              }}
            >
              <div className="absolute top-0 left-0 bg-wf-dark text-white text-xs font-black uppercase px-3 py-1 z-10">Live Preview</div>
              
              <div 
                className="w-full max-w-sm p-6 transform rotate-1 relative z-10"
                style={{
                  backgroundColor: wlCardColor,
                  color: wlBorderColor,
                  border: wlUiStyle === 'minimalist' ? `1px solid #cbd5e1` : wlUiStyle === 'modern' ? `2px solid #e2e8f0` : `4px solid ${wlBorderColor}`,
                  borderRadius: wlUiStyle === 'modern' ? '16px' : wlUiStyle === 'minimalist' ? '4px' : '0',
                  boxShadow: wlUiStyle === 'modern' ? '0 10px 15px -3px rgba(0,0,0,0.1)' : wlUiStyle === 'minimalist' ? 'none' : `8px 8px 0px 0px ${wlBorderColor}`
                }}
              >
                {wlWatermarkUrl && (
                  <div 
                    className="absolute inset-0 z-0 opacity-10 pointer-events-none"
                    style={{
                      backgroundImage: `url(${wlWatermarkUrl})`,
                      backgroundSize: 'contain',
                      backgroundPosition: 'center',
                      backgroundRepeat: 'no-repeat'
                    }}
                  />
                )}
                
                <div className="relative z-10">
                  {wlLogoUrl ? (
                    <img src={wlLogoUrl} alt="Logo" className="max-h-20 mx-auto mb-4" />
                  ) : (
                    <h1 
                      className="text-3xl font-black uppercase mb-4"
                      style={{ color: wlThemeColor }}
                    >
                      {wlAppName || GAMES.find(g => g.id === wlGameId)?.title || 'Game Title'}
                    </h1>
                  )}
                  
                  {wlAdLink.trim() && (
                    <div 
                      className="w-full py-2 mb-4 font-black uppercase text-[10px] text-center transition-colors cursor-pointer"
                      style={{
                        backgroundColor: wlThemeColor,
                        color: wlCardColor,
                        border: wlUiStyle === 'minimalist' ? `1px solid #cbd5e1` : wlUiStyle === 'modern' ? `2px solid #e2e8f0` : `4px solid ${wlBorderColor}`,
                        borderRadius: wlUiStyle === 'modern' ? '8px' : '0'
                      }}
                    >
                      {wlAdText.trim() || '👉 CLICK HERE TO VISIT OUR SPONSOR 👈'}
                    </div>
                  )}
                  
                  <div className="space-y-4 mb-8">
                    <div className="h-12 bg-gray-100" style={{ border: `2px solid ${wlBorderColor}`, borderRadius: wlUiStyle === 'modern' ? '8px' : '0' }}></div>
                    <div className="h-32 bg-gray-100 flex items-center justify-center" style={{ border: `2px solid ${wlBorderColor}`, borderRadius: wlUiStyle === 'modern' ? '8px' : '0' }}>
                      <span className="font-black text-gray-400 uppercase">Game Area</span>
                    </div>
                  </div>

                  <button 
                    className="w-full py-3 font-black uppercase text-white"
                    style={{ 
                      backgroundColor: wlThemeColor,
                      border: wlUiStyle === 'minimalist' ? `1px solid #cbd5e1` : wlUiStyle === 'modern' ? `2px solid #e2e8f0` : `4px solid ${wlBorderColor}`,
                      borderRadius: wlUiStyle === 'modern' ? '8px' : wlUiStyle === 'minimalist' ? '4px' : '0',
                      boxShadow: wlUiStyle === 'modern' ? '0 4px 6px -1px rgba(0,0,0,0.1)' : wlUiStyle === 'minimalist' ? 'none' : `4px 4px 0px 0px ${wlBorderColor}`
                    }}
                  >
                    Start Game
                  </button>
                </div>
              </div>

              <div className="mt-8 font-bold text-sm relative z-10" style={{ color: wlThemeColor }}>
                {wlFooterText}
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* OTO 3 PACKAGE SECTION */}
      <section className="mb-20 mt-12">
        <div className="flex items-center gap-4 mb-8">
          <h2 className="text-3xl font-black uppercase bg-wf-orange text-white px-6 py-2 border-4 border-wf-dark shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] flex items-center gap-3 whitespace-nowrap">
            <Icons.Rocket size={28} /> OTO 3: Lead Gen Mastery
          </h2>
          <div className="h-1 flex-1 bg-wf-dark"></div>
        </div>

        <div className="brutalist-card bg-wf-white p-8 border-4 border-wf-dark shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            <div className="border-4 border-wf-dark p-4 bg-wf-cream">
              <h3 className="font-black uppercase text-lg mb-2 flex items-center gap-2"><span className="text-2xl">🎉</span> DFY OPT-IN PAGE TEMPLATE</h3>
              <p className="text-sm font-bold text-gray-700">Stop guessing what works. We give you “Play &amp; Win” landing page layouts engineered by top copywriters. These templates use human psychology to force visitors to hand over their email addresses before they can access the games.</p>
            </div>
            <div className="border-4 border-wf-dark p-4 bg-wf-cream">
              <h3 className="font-black uppercase text-lg mb-2 flex items-center gap-2"><span className="text-2xl">⚙️</span> THE "INSTANT ROI" THANK YOU PAGE</h3>
              <p className="text-sm font-bold text-gray-700">Never just say "Thank You". Our monetization pages are designed to instantly deliver rewards (coupons/bonuses) while aggressively redirecting highly-engaged players straight to your paid affiliate offers or client checkout pages.</p>
            </div>
            <div className="border-4 border-wf-dark p-4 bg-wf-cream">
              <h3 className="font-black uppercase text-lg mb-2 flex items-center gap-2"><span className="text-2xl">📧</span> EMAIL INTEGRATION MASTERCLASS</h3>
              <p className="text-sm font-bold text-gray-700">Ditch the expensive developers. We provide a step-by-step, copy-paste guide to connect your new game funnels with ANY major autoresponder (Mailchimp, AWeber, GetResponse) in under 5 minutes. No tech skills required.</p>
            </div>
            <div className="border-4 border-wf-dark p-4 bg-wf-cream">
              <h3 className="font-black uppercase text-lg mb-2 flex items-center gap-2"><span className="text-2xl">🎯</span> CTA PLACEMENT BLUEPRINTS</h3>
              <p className="text-sm font-bold text-gray-700">Timing is everything. We show you the exact milliseconds to ask for an email for maximum conversions. Learn the secrets of the Pre-game lock, the Mid-game pattern interrupt popup, and the ultra-converting Post-game unlock.</p>
            </div>
            <div className="border-4 border-wf-dark p-4 bg-wf-cream">
              <h3 className="font-black uppercase text-lg mb-2 flex items-center gap-2"><span className="text-2xl">🎁</span> “PLAY TO UNLOCK COUPON” SYSTEM</h3>
              <p className="text-sm font-bold text-gray-700">E-commerce owners will beg you for this. Turn games into discount machines. Instead of a boring 10% off popup, make users play a quick game to "win" their discount. Watch conversion rates skyrocket as you gamify the shopping experience.</p>
            </div>
            <div className="border-4 border-wf-dark p-4 bg-wf-cream">
              <h3 className="font-black uppercase text-lg mb-2 flex items-center gap-2"><span className="text-2xl">🏆</span> “VIRAL GIVEAWAY” ARCHITECTURE</h3>
              <p className="text-sm font-bold text-gray-700">Turn 1 player into 100 leads. Use our contest-style funnel strategy to force users to share your game on social media for extra giveaway entries. This creates a massive, self-sustaining snowball of free leads at scale.</p>
            </div>
          </div>
          <div className="text-center">
            <a href="https://kojilaunch.com/oto3-game-magnet-plr/" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-3 px-8 py-4 bg-wf-orange text-white border-4 border-wf-dark font-black uppercase text-xl shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hover:translate-y-1 hover:translate-x-1 hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] transition-all">
              Get OTO 3 Now <Icons.ArrowRight size={24} />
            </a>
          </div>
        </div>
      </section>

      <footer className="mt-24 text-center pb-12">
        <div className="inline-block brutalist-card px-8 py-4 bg-wf-white font-black uppercase">
           Built with Brutalist Energy ⚡
        </div>
      </footer>

      {/* FLOATING AD NOTIFICATION */}
      <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end">
        <AnimatePresence mode="wait">
          {isAdExpanded ? (
            <motion.div
              key="expanded"
              initial={{ opacity: 0, y: 50, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 50, scale: 0.9 }}
              className="max-w-sm origin-bottom-right"
            >
              <div className="relative">
                <button 
                  onClick={(e) => { e.stopPropagation(); setIsAdExpanded(false); }}
                  className="absolute -top-3 -right-3 w-8 h-8 bg-wf-red text-white border-4 border-wf-dark rounded-full flex items-center justify-center z-10 hover:scale-110 transition-transform"
                >
                  <Icons.X size={16} strokeWidth={4} />
                </button>
                <a 
                  href={ADS[currentAdIndex].url} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className={cn(
                    "block brutalist-card p-4 border-4 border-wf-dark shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hover:translate-y-1 hover:translate-x-1 hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] transition-all flex items-center gap-4",
                    ADS[currentAdIndex].color,
                    ADS[currentAdIndex].textColor
                  )}
                >
                  <div className="w-12 h-12 bg-wf-white border-4 border-wf-dark rounded-full flex items-center justify-center shrink-0">
                    {React.createElement(Icons[ADS[currentAdIndex].icon as keyof typeof Icons] || Icons.Star, { size: 24, className: "text-wf-dark" })}
                  </div>
                  <div>
                    <div className="text-[10px] font-black uppercase mb-1 opacity-80">Recommended Tool</div>
                    <h3 className="font-black uppercase text-sm leading-tight mb-1">{ADS[currentAdIndex].title}</h3>
                    <p className="text-[10px] font-bold opacity-90 leading-tight">{ADS[currentAdIndex].desc}</p>
                  </div>
                </a>
              </div>
            </motion.div>
          ) : (
            <motion.button
              key="collapsed"
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.5 }}
              whileHover={{ scale: 1.1, rotate: -10 }}
              onClick={() => {
                setCurrentAdIndex(Math.floor(Math.random() * ADS.length));
                setIsAdExpanded(true);
              }}
              className="w-14 h-14 bg-wf-gold text-wf-dark border-4 border-wf-dark shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] rounded-full flex items-center justify-center z-50 hover:bg-wf-orange hover:text-white transition-colors"
            >
              <Icons.Gift size={24} strokeWidth={3} />
            </motion.button>
          )}
        </AnimatePresence>
      </div>

      {/* UNLOCK MODAL */}
      {showUnlockModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4 backdrop-blur-sm">
          <div className="bg-white p-8 border-4 border-wf-dark shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] max-w-md w-full text-center relative animate-in fade-in zoom-in duration-200">
            <button 
              onClick={() => setShowUnlockModal(false)}
              className="absolute top-4 right-4 text-wf-dark hover:text-wf-red transition-colors"
            >
              <Icons.X size={24} strokeWidth={3} />
            </button>
            
            <div className="w-20 h-20 bg-wf-dark text-white rounded-full flex items-center justify-center mx-auto mb-6 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
              <Icons.Lock size={40} />
            </div>
            <h2 className="text-3xl font-black uppercase mb-2">Unlock FE Package</h2>
            <p className="font-bold text-gray-600 mb-8">Enter your license key to access the games and generator.</p>
            
            <form onSubmit={handleUnlock} className="space-y-4">
              <input
                type="text"
                placeholder="Enter Access Code..."
                value={accessCode}
                onChange={(e) => setAccessCode(e.target.value)}
                className="w-full p-4 border-4 border-wf-dark font-black uppercase text-center text-xl outline-none focus:bg-wf-gold transition-colors"
                autoFocus
              />
              {error && <p className="text-wf-red font-bold text-sm">{error}</p>}
              <button type="submit" className="w-full py-4 bg-wf-green text-wf-dark font-black uppercase text-xl border-4 border-wf-dark shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:translate-y-1 hover:translate-x-1 hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] transition-all flex items-center justify-center gap-2">
                <Icons.Key size={24} /> Unlock Now
              </button>
            </form>
            
            <div className="mt-8 pt-6 border-t-4 border-wf-dark">
              <p className="font-bold text-sm mb-4">Don't have an access code?</p>
              <a href="https://kojilaunch.com/fe-game-magnet-plr/" target="_blank" rel="noopener noreferrer" className="inline-block px-6 py-3 bg-wf-blue text-white border-4 border-wf-dark font-black uppercase text-sm shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:translate-y-1 hover:translate-x-1 hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] transition-all">
                Get Game Magnet Now
              </a>
            </div>
          </div>
        </div>
      )}

      {/* OTO 1 UNLOCK MODAL */}
      {showOto1UnlockModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4 backdrop-blur-sm">
          <div className="bg-white p-8 border-4 border-wf-dark shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] max-w-md w-full text-center relative animate-in fade-in zoom-in duration-200">
            <button 
              onClick={() => setShowOto1UnlockModal(false)}
              className="absolute top-4 right-4 text-wf-dark hover:text-wf-red transition-colors"
            >
              <Icons.X size={24} strokeWidth={3} />
            </button>
            
            <div className="w-20 h-20 bg-wf-purple text-white rounded-full flex items-center justify-center mx-auto mb-6 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
              <Icons.Lock size={40} />
            </div>
            <h2 className="text-3xl font-black uppercase mb-2">Unlock OTO 1</h2>
            <p className="font-bold text-gray-600 mb-8">Enter your license key to access the KDP Empire games.</p>
            
            <form onSubmit={handleOto1Unlock} className="space-y-4">
              <input
                type="text"
                placeholder="Enter Access Code..."
                value={oto1AccessCode}
                onChange={(e) => setOto1AccessCode(e.target.value)}
                className="w-full p-4 border-4 border-wf-dark font-black uppercase text-center text-xl outline-none focus:bg-wf-gold transition-colors"
                autoFocus
              />
              {oto1Error && <p className="text-wf-red font-bold text-sm">{oto1Error}</p>}
              <button type="submit" className="w-full py-4 bg-wf-purple text-white font-black uppercase text-xl border-4 border-wf-dark shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:translate-y-1 hover:translate-x-1 hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] transition-all flex items-center justify-center gap-2">
                <Icons.Key size={24} /> Unlock Now
              </button>
            </form>
            
            <div className="mt-8 pt-6 border-t-4 border-wf-dark">
              <p className="font-bold text-sm mb-4">Don't have the OTO 1 expansion?</p>
              <a href="https://kojilaunch.com/oto1-game-magnet-plr/" target="_blank" rel="noopener noreferrer" className="inline-block px-6 py-3 bg-wf-blue text-white border-4 border-wf-dark font-black uppercase text-sm shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:translate-y-1 hover:translate-x-1 hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] transition-all">
                Get KDP Empire Now
              </a>
            </div>
          </div>
        </div>
      )}

      {/* OTO 2 UNLOCK MODAL */}
      {showOto2UnlockModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4 backdrop-blur-sm">
          <div className="bg-white p-8 border-4 border-wf-dark shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] max-w-md w-full text-center relative animate-in fade-in zoom-in duration-200">
            <button 
              onClick={() => setShowOto2UnlockModal(false)}
              className="absolute top-4 right-4 text-wf-dark hover:text-wf-red transition-colors"
            >
              <Icons.X size={24} strokeWidth={3} />
            </button>
            
            <div className="w-20 h-20 bg-wf-green text-white rounded-full flex items-center justify-center mx-auto mb-6 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
              <Icons.Lock size={40} />
            </div>
            <h2 className="text-3xl font-black uppercase mb-2">Unlock OTO 2</h2>
            <p className="font-bold text-gray-600 mb-8">Enter your license key to access the PLR White-Label Generator.</p>
            
            <form onSubmit={handleOto2Unlock} className="space-y-4">
              <input
                type="text"
                placeholder="Enter Access Code..."
                value={oto2AccessCode}
                onChange={(e) => setOto2AccessCode(e.target.value)}
                className="w-full p-4 border-4 border-wf-dark font-black uppercase text-center text-xl outline-none focus:bg-wf-gold transition-colors"
                autoFocus
              />
              {oto2Error && <p className="text-wf-red font-bold text-sm">{oto2Error}</p>}
              <button type="submit" className="w-full py-4 bg-wf-green text-white font-black uppercase text-xl border-4 border-wf-dark shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:translate-y-1 hover:translate-x-1 hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] transition-all flex items-center justify-center gap-2">
                <Icons.Key size={24} /> Unlock Now
              </button>
            </form>
            
            <div className="mt-8 pt-6 border-t-4 border-wf-dark">
              <p className="font-bold text-sm mb-4">Don't have the OTO 2 expansion?</p>
              <a href="https://kojilaunch.com/oto2-game-magnet-plr/" target="_blank" rel="noopener noreferrer" className="inline-block px-6 py-3 bg-wf-blue text-white border-4 border-wf-dark font-black uppercase text-sm shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:translate-y-1 hover:translate-x-1 hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] transition-all">
                Get White-Label Rights Now
              </a>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
