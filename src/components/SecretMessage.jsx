import { useState } from 'react';
import { birthdayData } from '../data/birthdayData';
import { playPaperRustle, playSparkle } from '../utils/soundEffects';
import { triggerConfetti } from '../utils/confetti';
import { Icon } from './Icons';

export default function SecretMessage({ onBack }) {
  const { secretMessage, recipient } = birthdayData;
  const [isOpen, setIsOpen] = useState(false);

  const handleOpenEnvelope = () => {
    if (isOpen) return;
    playPaperRustle();
    playSparkle();
    setIsOpen(true);
    triggerConfetti({
      particleCount: 45,
      origin: { x: 0.5, y: 0.5 },
      colors: ['#D8C19A', '#D8B5C4', '#F4F0EA', '#B8A9CC'],
      speed: 8,
      spread: 180,
    });
  };

  const handleReseal = () => {
    playSparkle();
    setIsOpen(false);
  };

  return (
    <div className="destination-page destination-page--secret min-h-screen w-full pt-20 pb-28 px-4 sm:px-6 relative z-10 flex flex-col items-center">
      
      {/* Top Header */}
      <div className="w-full max-w-5xl flex items-center justify-between mb-8">
        <button
          onClick={onBack}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#1c1733]/70 border border-[rgba(216,193,154,0.3)] text-xs sm:text-sm text-[#F4F0EA] hover:text-[#D8C19A] hover:border-[#D8C19A] transition-all cursor-pointer backdrop-blur-md"
        >
          <Icon name="arrow-left" size={15} color="#D8C19A" />
          <span>Back to Overview</span>
        </button>

        {isOpen && (
          <button
            onClick={handleReseal}
            className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-[#30243F] hover:bg-[#43325c] border border-[rgba(216,193,154,0.4)] text-xs text-[#D8C19A] font-medium transition-all cursor-pointer shadow-md font-mono"
          >
            <Icon name="lock" size={13} color="#D8C19A" />
            <span>Reseal Message</span>
          </button>
        )}
      </div>

      {/* Main Title */}
      <div className="text-center max-w-xl mx-auto mb-8">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#30243F]/70 border border-[rgba(216,193,154,0.35)] text-xs text-[#D8C19A] tracking-widest uppercase mb-3 shadow-sm">
          <Icon name="lock" size={13} color="#D8C19A" />
          <span>{secretMessage.tag || 'CONFIDENTIAL'}</span>
        </div>

        <h1 className="font-serif text-3xl sm:text-4xl text-[#F4F0EA] font-medium mb-2">
          The Secret Message
        </h1>
        <p className="font-story text-sm sm:text-base text-[#F4F0EA]/80">
          {!isOpen
            ? 'A confidential wax seal meant only for your eyes. Touch the seal to unfurl the message.'
            : 'The seal is dissolved. Words kept in confidence for your special day.'}
        </p>
      </div>

      {/* ENVELOPE STAGE */}
      <div className="w-full max-w-xl min-h-[420px] flex items-center justify-center">
        
        {/* SEALED ENVELOPE (INTERACTIVE) */}
        {!isOpen && (
          <div
            onClick={handleOpenEnvelope}
            className="group relative w-full max-w-md h-64 sm:h-72 rounded-3xl bg-gradient-to-br from-[#261d3d] via-[#35274d] to-[#171329] border-2 border-[rgba(216,193,154,0.4)] shadow-[0_20px_60px_rgba(21,23,43,0.85)] hover:shadow-[0_25px_80px_rgba(216,193,154,0.3)] cursor-pointer transition-all duration-300 hover:scale-102 flex flex-col items-center justify-center p-6 text-center overflow-hidden"
          >
            {/* Ambient Pulse Ring */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(216,193,154,0.12)_0%,transparent_70%)] pointer-events-none" />

            {/* Simulated Envelope Flap Lines */}
            <div className="absolute top-0 left-0 right-0 h-32 border-b border-[rgba(216,193,154,0.25)] pointer-events-none" />

            {/* Central Wax Seal */}
            <div className="relative z-10 w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-gradient-to-tr from-[#3a2c52] via-[#523d70] to-[#D8C19A] border-2 border-white/80 shadow-[0_0_30px_rgba(216,193,154,0.6)] flex flex-col items-center justify-center text-white group-hover:scale-110 transition-transform duration-300">
              <Icon name="lock" size={22} color="#D8C19A" className="mb-0.5" />
              <span className="text-[8px] font-mono font-bold tracking-widest uppercase text-[#D8C19A]">
                {secretMessage.waxSealLabel || 'SEALED'}
              </span>
            </div>

            <span className="relative z-10 mt-5 font-serif text-base sm:text-lg text-[#F4F0EA] font-medium group-hover:text-[#D8C19A] transition-colors">
              Dedicated to {recipient.name}
            </span>

            <span className="relative z-10 mt-1 text-xs text-[#D8C19A] font-mono animate-pulse">
              {secretMessage.hint}
            </span>
          </div>
        )}

        {/* UNLOCKED & REVEALED PARCHMENT */}
        {isOpen && (
          <div className="w-full max-w-xl bg-gradient-to-b from-[#1f1836] to-[#151226] border border-[rgba(216,193,154,0.5)] rounded-3xl p-6 sm:p-10 shadow-[0_20px_70px_rgba(21,23,43,0.9)] animate-fade-in relative text-[#F4F0EA]">
            
            {/* Unlocked Seal Header */}
            <div className="flex items-center justify-between pb-4 mb-6 border-b border-white/10">
              <div className="flex items-center gap-2 text-xs font-mono text-[#D8C19A]">
                <Icon name="unlock" size={15} color="#D8C19A" />
                <span>SEAL DISSOLVED • STRICTLY CONFIDENTIAL</span>
              </div>
              <span className="text-xs text-[#D8B5C4] font-mono">★ Private Archive</span>
            </div>

            <h2 className="font-serif text-2xl sm:text-3xl font-medium text-[#F4F0EA] mb-6">
              {secretMessage.title}
            </h2>

            {/* Paragraphs */}
            <div className="space-y-4 font-story text-base sm:text-lg text-[#F4F0EA]/90 leading-relaxed mb-8">
              {secretMessage.paragraphs.map((p, i) => (
                <p key={i}>
                  {p}
                </p>
              ))}
            </div>

            {/* Signoff */}
            <div className="pt-4 border-t border-white/10 text-right">
              <p className="font-story text-base sm:text-lg text-[#D8C19A] italic">
                {secretMessage.signoff}
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
