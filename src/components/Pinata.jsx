import { useState } from 'react';
import { birthdayData } from '../data/birthdayData';
import { playHitSound, playShatterSound, playSparkle } from '../utils/soundEffects';
import { triggerConfetti, triggerSupernova } from '../utils/confetti';
import { Icon } from './Icons';
import ImageWithFallback from './ImageWithFallback';

export default function Pinata({ onBack }) {
  const { pinata, recipient } = birthdayData;
  const [hits, setHits] = useState(0);
  const [isWobbling, setIsWobbling] = useState(false);
  const [floatingSparks, setFloatingSparks] = useState([]);
  const [lastMessage, setLastMessage] = useState(pinata.instruction);

  const isBroken = hits >= pinata.totalHitsRequired;

  const handleHit = (e) => {
    if (isBroken) return;

    const newHits = hits + 1;
    setHits(newHits);

    // Sound effect with ascending pitch per hit
    playHitSound(1 + newHits * 0.15);

    // Visual wobble
    setIsWobbling(true);
    setTimeout(() => setIsWobbling(false), 450);

    // Particle spark at click coordinates or center
    const rect = e.currentTarget.getBoundingClientRect();
    const clickX = e.clientX ? e.clientX - rect.left : rect.width / 2;
    const clickY = e.clientY ? e.clientY - rect.top : rect.height / 2;

    const sparkId = Date.now() + Math.random();
    setFloatingSparks((prev) => [
      ...prev.slice(-6),
      { id: sparkId, x: clickX, y: clickY, text: `+${newHits} ✨` },
    ]);

    // Update message
    if (newHits < pinata.totalHitsRequired) {
      setLastMessage(pinata.hitMessages[newHits - 1]);
      triggerConfetti({
        particleCount: 18,
        origin: { x: 0.5, y: 0.4 },
        speed: 6,
        spread: 120,
      });
    } else {
      // BROKEN OPEN!
      playShatterSound();
      triggerSupernova();
      setLastMessage(pinata.hitMessages[pinata.totalHitsRequired - 1]);
    }
  };

  const handleReset = () => {
    playSparkle();
    setHits(0);
    setLastMessage(pinata.instruction);
    setFloatingSparks([]);
  };

  return (
    <div className="destination-page destination-page--pinata min-h-screen w-full pt-20 pb-28 px-4 sm:px-6 relative z-10 flex flex-col items-center">
      
      {/* Top Header */}
      <div className="w-full max-w-5xl flex items-center justify-between mb-6">
        <button
          onClick={onBack}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#1c1733]/70 border border-[rgba(216,193,154,0.3)] text-xs sm:text-sm text-[#F4F0EA] hover:text-[#D8C19A] hover:border-[#D8C19A] transition-all cursor-pointer backdrop-blur-md"
        >
          <Icon name="arrow-left" size={15} color="#D8C19A" />
          <span>Back to Overview</span>
        </button>

        <div className="flex items-center gap-2">
          {isBroken && (
            <button
              onClick={handleReset}
              className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-[#30243F] hover:bg-[#43325c] border border-[rgba(216,193,154,0.4)] text-xs text-[#D8C19A] font-medium transition-all cursor-pointer shadow-md font-mono"
            >
              <Icon name="rotate-ccw" size={13} color="#D8C19A" />
              <span>Reassemble Piñata</span>
            </button>
          )}
        </div>
      </div>

      {/* Title & Progress Header */}
      <div className="text-center max-w-xl mx-auto mb-6">
        <span className="text-xs text-[#D8C19A] uppercase tracking-widest font-mono">
          INTERACTIVE EXPERIENCE
        </span>
        <h1 className="font-serif text-3xl sm:text-4xl text-[#F4F0EA] font-medium mt-1 mb-2">
          Break Open {recipient.name}&apos;s Piñata
        </h1>
        <p className="font-story text-sm sm:text-base text-[#F4F0EA]/80">
          {lastMessage}
        </p>

        {/* Hits indicator meter */}
        <div className="mt-4 flex flex-col items-center">
          <div className="flex items-center gap-2 mb-1.5">
            {[1, 2, 3, 4, 5].map((num) => (
              <div
                key={num}
                className={`w-7 h-7 sm:w-8 sm:h-8 rounded-full flex items-center justify-center text-xs font-mono font-bold transition-all duration-300 ${
                  num <= hits
                    ? 'bg-gradient-to-tr from-[#D8C19A] to-[#D8B5C4] text-[#15172B] scale-110 shadow-[0_0_12px_rgba(216,193,154,0.7)]'
                    : 'bg-[#15172B] text-[#F4F0EA]/30 border border-white/10'
                }`}
              >
                {num <= hits ? '✨' : num}
              </div>
            ))}
          </div>
          <span className="text-[11px] text-[#D8C19A] font-mono">
            {isBroken ? '🎉 UNLOCKED' : `Damage: ${hits} / 5 Hits`}
          </span>
        </div>
      </div>

      {/* Main Interactive Stage */}
      <div className="w-full max-w-2xl min-h-[460px] relative flex flex-col items-center justify-center">
        
        {/* Hanging Cord & Anchor */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 flex flex-col items-center pointer-events-none z-10">
          <div className="w-3.5 h-3.5 rounded-full bg-[#D8C19A] shadow-[0_0_10px_#D8C19A]" />
          <div className="w-0.5 h-16 sm:h-20 bg-gradient-to-b from-[#D8C19A] via-[#B8A9CC] to-transparent" />
        </div>

        {/* THE PIÑATA (ACTIVE STATE) */}
        {!isBroken && (
          <div
            onClick={handleHit}
            className={`relative mt-12 cursor-pointer select-none transition-transform duration-100 ${
              isWobbling ? 'scale-92 rotate-[-6deg]' : 'hover:scale-104 active:scale-96'
            }`}
            style={{
              animation: isWobbling ? 'wobble 0.4s ease' : 'swing 3.2s ease-in-out infinite',
              transformOrigin: 'top center',
            }}
          >
            {/* Piñata Body 3D Gem / Star Cluster */}
            <div className="relative w-48 h-48 sm:w-60 sm:h-60 flex items-center justify-center">
              
              {/* Outer Ambient Glow */}
              <div
                className="absolute inset-0 rounded-full blur-2xl opacity-40 transition-opacity duration-300 pointer-events-none"
                style={{
                  background: hits > 2 ? 'radial-gradient(circle, #D8C19A, #D8B5C4)' : 'radial-gradient(circle, #30243F, #15172B)',
                }}
              />

              {/* 3D Geometric Crystal Jewel */}
              <div className="relative w-40 h-40 sm:w-52 sm:h-52 rounded-3xl bg-gradient-to-tr from-[#30243F] via-[#48375e] to-[#D8C19A] p-1 shadow-[0_0_40px_rgba(216,193,154,0.3)] border-2 border-white/60 flex items-center justify-center overflow-hidden">
                
                {/* Surface Facets Pattern */}
                <div className="absolute inset-0 opacity-30 bg-[radial-gradient(circle_at_25%_25%,rgba(244,240,234,0.8),transparent_50%),radial-gradient(circle_at_75%_75%,rgba(216,181,196,0.6),transparent_50%)]" />

                {/* Progressive Golden Cracks Overlay */}
                {hits >= 1 && (
                  <svg className="absolute inset-0 w-full h-full pointer-events-none animate-pulse" viewBox="0 0 100 100">
                    <path d="M50 20 L45 40 L55 60 L48 80" stroke="#F4F0EA" strokeWidth="2" fill="none" strokeDasharray="3,1" />
                  </svg>
                )}
                {hits >= 2 && (
                  <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 100 100">
                    <path d="M25 50 L45 48 L65 52 L85 45" stroke="#D8C19A" strokeWidth="2.5" fill="none" />
                  </svg>
                )}
                {hits >= 3 && (
                  <svg className="absolute inset-0 w-full h-full pointer-events-none animate-ping" viewBox="0 0 100 100">
                    <path d="M30 30 L50 50 L70 70 M70 30 L50 50 L30 70" stroke="#D8B5C4" strokeWidth="3" fill="none" />
                  </svg>
                )}
                {hits >= 4 && (
                  <div className="absolute inset-0 bg-[#D8C19A]/25 animate-pulse pointer-events-none" />
                )}

                {/* Piñata Center Icon / Face */}
                <div className="relative z-10 flex flex-col items-center text-center">
                  <span className="text-4xl sm:text-5xl filter drop-shadow">
                    {hits === 0 ? '💎' : hits < 3 ? '✨' : hits < 5 ? '⚡' : '💥'}
                  </span>
                  <span className="mt-1 font-serif text-xs sm:text-sm font-bold text-white tracking-wider uppercase drop-shadow">
                    TAP ME
                  </span>
                  <span className="text-[10px] text-[#D8C19A] font-mono">
                    {5 - hits} hits left
                  </span>
                </div>
              </div>

              {/* Trailing Silk Ribbons */}
              <div className="absolute -bottom-10 left-1/2 -translate-x-1/2 flex items-center gap-2 pointer-events-none">
                <div className="w-1.5 h-16 bg-[#D8C19A] rounded-full transform -rotate-12 animate-pulse" />
                <div className="w-1.5 h-20 bg-[#D8B5C4] rounded-full transform rotate-6 animate-pulse" />
                <div className="w-1.5 h-14 bg-[#B8A9CC] rounded-full transform -rotate-6 animate-pulse" />
                <div className="w-1.5 h-18 bg-[#F4F0EA] rounded-full transform rotate-12 animate-pulse" />
              </div>
            </div>

            {/* Click Sparks Floating */}
            {floatingSparks.map((spark) => (
              <span
                key={spark.id}
                style={{ left: `${spark.x}px`, top: `${spark.y}px` }}
                className="absolute text-xs sm:text-sm font-bold text-[#D8C19A] pointer-events-none animate-float-up whitespace-nowrap drop-shadow"
              >
                {spark.text}
              </span>
            ))}
          </div>
        )}

        {/* BROKEN OPEN STATE: REVEAL SURPRISES! */}
        {isBroken && (
          <div className="w-full max-w-xl bg-[#1c1733]/85 backdrop-blur-2xl border border-[rgba(216,193,154,0.6)] rounded-3xl p-6 sm:p-8 shadow-[0_20px_70px_rgba(21,23,43,0.9)] text-center relative animate-fade-in z-20">
            
            {/* Burst Badge */}
            <div className="w-16 h-16 mx-auto rounded-full bg-gradient-to-tr from-[#D8C19A] to-[#D8B5C4] flex items-center justify-center text-3xl shadow-lg -mt-12 mb-4 border-2 border-white">
              🎉
            </div>

            <h2 className="font-serif text-2xl sm:text-3xl font-medium text-transparent bg-clip-text bg-gradient-to-r from-[#F4F0EA] via-[#D8C19A] to-[#D8B5C4] mb-2">
              YOU UNLOCKED THE SURPRISE!
            </h2>

            <p className="font-story text-base sm:text-lg text-[#F4F0EA] italic leading-relaxed mb-6 px-4">
              &ldquo;{pinata.secretSurpriseMessage}&rdquo;
            </p>

            {/* Floating Released Photos */}
            <div className="mb-6">
              <span className="block text-[11px] text-[#D8C19A] uppercase font-mono tracking-wider mb-3">
                Treasures Released:
              </span>
              <div className="grid grid-cols-3 gap-3">
                {pinata.surprisePhotos.map((photo, i) => (
                  <div
                    key={photo.id}
                    className="p-2 rounded-xl bg-[#231b40] border border-[rgba(216,193,154,0.3)] shadow-md transform hover:scale-105 transition-transform"
                    style={{ transform: `rotate(${i === 0 ? -3 : i === 1 ? 2 : -2}deg)` }}
                  >
                    <div className="rounded-lg overflow-hidden mb-1">
                      <ImageWithFallback
                        src={photo.img}
                        alt={photo.caption}
                        title={`Surprise ${i + 1}`}
                        aspectRatio="1/1"
                      />
                    </div>
                    <span className="text-[10px] text-[#F4F0EA]/90 block truncate font-story">
                      {photo.caption}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Replay Button */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
              <button
                onClick={handleReset}
                className="w-full sm:w-auto px-7 py-3 rounded-full bg-gradient-to-r from-[#D8C19A] to-[#D8B5C4] text-[#15172B] font-semibold text-xs sm:text-sm uppercase tracking-wider shadow-lg hover:opacity-95 cursor-pointer flex items-center justify-center gap-2"
              >
                <Icon name="rotate-ccw" size={15} color="#15172B" />
                <span>Reassemble Piñata</span>
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Floating animation keyframes */}
      <style>{`
        @keyframes swing {
          0%, 100% { transform: rotate(-2.5deg); }
          50% { transform: rotate(2.5deg); }
        }
        @keyframes wobble {
          0% { transform: scale(0.92) rotate(-8deg); }
          50% { transform: scale(1.04) rotate(6deg); }
          100% { transform: scale(1) rotate(0deg); }
        }
        @keyframes float-up {
          0% { opacity: 1; transform: translateY(0); }
          100% { opacity: 0; transform: translateY(-40px); }
        }
        .animate-float-up {
          animation: float-up 0.8s ease-out forwards;
        }
      `}</style>
    </div>
  );
}
