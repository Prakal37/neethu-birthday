import { useEffect, useState } from 'react';
import { birthdayData } from '../data/birthdayData';
import { playBirthdayMelody, playSparkle } from '../utils/soundEffects';
import { triggerConfetti, triggerSupernova } from '../utils/confetti';
import { Icon } from './Icons';
import ImageWithFallback from './ImageWithFallback';

export default function Finale({ onRestart, onBack }) {
  const { finale, recipient, memories } = birthdayData;
  const [isPlayingSong, setIsPlayingSong] = useState(false);

  useEffect(() => {
    // Launch celebratory fireworks on load
    triggerSupernova();

    const timer = setTimeout(() => {
      triggerConfetti({
        particleCount: 80,
        origin: { x: 0.5, y: 0.3 },
        speed: 9,
        spread: 360,
      });
    }, 1400);

    return () => clearTimeout(timer);
  }, []);

  const handlePlayMelody = () => {
    playBirthdayMelody();
    setIsPlayingSong(true);
    triggerConfetti({
      particleCount: 60,
      origin: { x: 0.5, y: 0.5 },
      speed: 8,
      spread: 220,
    });
    setTimeout(() => setIsPlayingSong(false), 8000);
  };

  const handleManualFireworks = () => {
    playSparkle();
    triggerSupernova();
  };

  return (
    <div className="destination-page destination-page--finale min-h-screen w-full pt-20 pb-28 px-4 sm:px-6 relative z-10 flex flex-col items-center">
      
      {/* Top Header */}
      <div className="w-full max-w-5xl flex items-center justify-between mb-8">
        <button
          onClick={onBack}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#1c1733]/70 border border-[rgba(216,193,154,0.3)] text-xs sm:text-sm text-[#F4F0EA] hover:text-[#D8C19A] hover:border-[#D8C19A] transition-all cursor-pointer backdrop-blur-md"
        >
          <Icon name="arrow-left" size={15} color="#D8C19A" />
          <span>Back to Overview</span>
        </button>

        <button
          onClick={handleManualFireworks}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#30243F] hover:bg-[#43325c] border border-[rgba(216,193,154,0.4)] text-xs sm:text-sm text-[#D8C19A] font-medium transition-all cursor-pointer shadow-lg font-mono"
        >
          <Icon name="sparkles" size={14} color="#D8C19A" className="animate-spin-slow" />
          <span>Launch Fireworks 🥂</span>
        </button>
      </div>

      {/* Main Finale Display */}
      <div className="w-full max-w-4xl text-center relative z-20">
        
        {/* Recipient Birthday Pill */}
        <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-[#30243F]/80 border border-[rgba(216,193,154,0.35)] text-xs sm:text-sm font-semibold text-[#D8C19A] tracking-widest uppercase mb-6 shadow-lg animate-fade-in font-mono">
          <span>✨ DEDICATED TO {recipient.name.toUpperCase()} ✨</span>
        </div>

        {/* Large Animated Editorial Typography */}
        <h1 className="font-serif text-4xl sm:text-7xl md:text-8xl font-normal text-transparent bg-clip-text bg-gradient-to-r from-[#F4F0EA] via-[#D8C19A] via-[#D8B5C4] to-[#F4F0EA] drop-shadow-[0_0_50px_rgba(216,193,154,0.45)] leading-tight mb-4 tracking-tight">
          {finale.headline}
        </h1>

        <h2 className="font-story text-xl sm:text-3xl md:text-4xl text-[#F4F0EA] font-light italic max-w-2xl mx-auto mb-8 leading-snug">
          &ldquo;{finale.subheadline}&rdquo;
        </h2>

        {/* Music Player Control */}
        <div className="inline-flex flex-col items-center mb-10">
          <button
            onClick={handlePlayMelody}
            className={`px-8 py-3.5 rounded-full font-semibold text-xs sm:text-sm uppercase tracking-wider transition-all duration-300 shadow-[0_0_30px_rgba(216,193,154,0.3)] cursor-pointer flex items-center gap-3 ${
              isPlayingSong
                ? 'bg-[#D8C19A] text-[#15172B] scale-105 animate-pulse'
                : 'bg-gradient-to-r from-[#D8C19A] to-[#D8B5C4] text-[#15172B] hover:opacity-95 hover:scale-102'
            }`}
          >
            <Icon name="music" size={17} color="#15172B" />
            <span>{isPlayingSong ? 'Playing Celestial Melody... 🎶' : 'Play Birthday Song Melodies 🎵'}</span>
          </button>
          <span className="text-[11px] text-[#B8A9CC]/75 mt-2 font-mono">
            Interactive Web Audio Synthesizer
          </span>
        </div>

        {/* Central Toast Card */}
        <div className="w-full max-w-2xl mx-auto p-8 sm:p-10 rounded-3xl bg-[#1c1733]/75 backdrop-blur-2xl border border-[rgba(216,193,154,0.35)] shadow-2xl relative mb-12">
          <div className="w-12 h-12 mx-auto rounded-full bg-[#30243F] border border-[rgba(216,193,154,0.4)] flex items-center justify-center text-xl mb-4 shadow-md">
            🥂
          </div>

          <h3 className="font-serif text-xl sm:text-2xl text-[#F4F0EA] font-medium mb-3">
            Our Birthday Wish For You
          </h3>

          <p className="font-story text-base sm:text-lg text-[#F4F0EA]/90 leading-relaxed italic mb-6">
            &ldquo;{finale.finalToast}&rdquo;
          </p>

          <div className="w-16 h-0.5 bg-[#D8C19A]/50 mx-auto mb-4" />

          <p className="text-xs text-[#D8C19A] font-mono uppercase tracking-wider">
            {finale.quote}
          </p>
        </div>

        {/* Floating Snapshot Gallery strip */}
        <div className="mb-12">
          <span className="text-xs text-[#D8C19A] uppercase font-mono tracking-widest block mb-4">
            Moments Frozen In Light
          </span>
          <div className="flex flex-wrap items-center justify-center gap-4">
            {memories.slice(0, 4).map((m, i) => (
              <div
                key={m.id}
                className="w-24 sm:w-28 p-2 rounded-xl bg-[#FAF8F5] text-[#1c1833] shadow-lg transform hover:scale-110 transition-transform border border-[rgba(216,193,154,0.4)]"
                style={{ transform: `rotate(${i % 2 === 0 ? -3 : 3}deg)` }}
              >
                <div className="rounded overflow-hidden mb-1 bg-[#15172B]">
                  <ImageWithFallback
                    src={m.image}
                    alt={m.title}
                    title={m.title}
                    aspectRatio="1/1"
                  />
                </div>
                <span className="text-[9px] font-story font-medium truncate block text-center">
                  {m.title}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Restart / Return to Overview */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <button
            onClick={onRestart}
            className="w-full sm:w-auto px-10 py-4 rounded-full bg-gradient-to-r from-[#D8C19A] to-[#D8B5C4] text-[#15172B] font-sans font-bold text-xs sm:text-sm uppercase tracking-widest shadow-[0_10px_35px_rgba(216,193,154,0.35)] hover:opacity-95 hover:scale-102 transition-all cursor-pointer flex items-center justify-center gap-2"
          >
            <Icon name="rotate-ccw" size={15} color="#15172B" />
            <span>EXPLORE HER WORLD AGAIN</span>
          </button>
        </div>
      </div>
    </div>
  );
}
