import { useState } from 'react';
import { birthdayData } from '../data/birthdayData';
import { playPaperRustle, playSparkle } from '../utils/soundEffects';
import { triggerConfetti } from '../utils/confetti';
import { Icon } from './Icons';

export default function BirthdayLetter({ onBack }) {
  const { letter, recipient } = birthdayData;
  const [isOpen, setIsOpen] = useState(false);

  const handleOpenLetter = () => {
    playPaperRustle();
    playSparkle();
    setIsOpen(true);
    triggerConfetti({
      particleCount: 50,
      origin: { x: 0.5, y: 0.4 },
      colors: ['#D8C19A', '#D8B5C4', '#F4F0EA', '#B8A9CC'],
      speed: 7,
      spread: 160,
    });
  };

  return (
    <div className="destination-page destination-page--letter min-h-screen w-full pt-20 pb-28 px-4 sm:px-6 relative z-10 flex flex-col items-center">
      
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
            onClick={() => { setIsOpen(false); playSparkle(); }}
            className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-[#30243F] hover:bg-[#43325c] border border-[rgba(216,193,154,0.4)] text-xs text-[#D8C19A] font-medium transition-all cursor-pointer shadow-md font-mono"
          >
            <Icon name="rotate-ccw" size={13} color="#D8C19A" />
            <span>Fold Letter</span>
          </button>
        )}
      </div>

      {/* Main Title */}
      <div className="text-center max-w-xl mx-auto mb-8">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#30243F]/70 border border-[rgba(216,193,154,0.35)] text-xs text-[#D8C19A] tracking-widest uppercase mb-3 shadow-sm">
          <Icon name="feather" size={13} color="#D8C19A" />
          <span>HANDWRITTEN CELESTIAL PARCHMENT</span>
        </div>

        <h1 className="font-serif text-3xl sm:text-4xl text-[#F4F0EA] font-medium mb-2">
          A Letter For {recipient.name}
        </h1>
        <p className="font-story text-sm sm:text-base text-[#F4F0EA]/80">
          {!isOpen
            ? 'An intimate, heartfelt handwritten letter written from the soul. Tap the envelope to unfurl.'
            : 'Words from the heart for your special day.'}
        </p>
      </div>

      {/* ENVELOPE / LETTER STAGE */}
      <div className="w-full max-w-2xl min-h-[460px] flex items-center justify-center">
        
        {/* SEALED ENVELOPE VIEW */}
        {!isOpen && (
          <div
            onClick={handleOpenLetter}
            className="group relative w-full max-w-md h-72 sm:h-80 rounded-3xl bg-gradient-to-tr from-[#2b2144] via-[#392b57] to-[#1c1833] border-2 border-[rgba(216,193,154,0.35)] shadow-[0_20px_60px_rgba(21,23,43,0.8)] hover:shadow-[0_25px_80px_rgba(216,193,154,0.35)] cursor-pointer transition-all duration-300 hover:scale-102 flex flex-col items-center justify-center p-6 text-center overflow-hidden"
          >
            {/* Elegant Silk Ribbon Effect */}
            <div className="absolute top-0 bottom-0 w-12 bg-gradient-to-r from-[rgba(216,193,154,0.15)] via-[rgba(216,193,154,0.35)] to-[rgba(216,193,154,0.15)] pointer-events-none" />
            <div className="absolute left-0 right-0 h-12 bg-gradient-to-b from-[rgba(216,193,154,0.15)] via-[rgba(216,193,154,0.35)] to-[rgba(216,193,154,0.15)] pointer-events-none" />

            {/* Central Golden Medallion */}
            <div className="relative z-10 w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-gradient-to-tr from-[#D8C19A] via-[#D8B5C4] to-[#B8A9CC] border-2 border-white shadow-[0_0_35px_rgba(216,193,154,0.6)] flex flex-col items-center justify-center text-[#15172B] group-hover:scale-110 transition-transform duration-300">
              <Icon name="feather" size={24} color="#15172B" className="mb-0.5" />
              <span className="text-[9px] font-mono font-bold tracking-widest uppercase">
                READ LETTER
              </span>
            </div>

            <h3 className="relative z-10 mt-5 font-serif text-lg sm:text-xl text-[#F4F0EA] font-medium group-hover:text-[#D8C19A] transition-colors">
              {letter.envelopeTitle}
            </h3>

            <p className="relative z-10 mt-1 text-xs text-[#B8A9CC] font-story text-sm">
              {letter.envelopeSubtitle}
            </p>
          </div>
        )}

        {/* UNFOLDED HANDWRITTEN LETTER */}
        {isOpen && (
          <div className="w-full max-w-2xl bg-[#FAF8F5] text-[#1c1833] rounded-3xl p-8 sm:p-14 shadow-[0_25px_80px_rgba(0,0,0,0.85)] border border-[#e3dac9] animate-fade-in relative overflow-hidden">
            
            {/* Subtle vintage parchment texture and corner borders */}
            <div className="absolute top-4 left-4 w-6 h-6 border-t-2 border-l-2 border-[#b5a995]/50 pointer-events-none" />
            <div className="absolute top-4 right-4 w-6 h-6 border-t-2 border-r-2 border-[#b5a995]/50 pointer-events-none" />
            <div className="absolute bottom-4 left-4 w-6 h-6 border-b-2 border-l-2 border-[#b5a995]/50 pointer-events-none" />
            <div className="absolute bottom-4 right-4 w-6 h-6 border-b-2 border-r-2 border-[#b5a995]/50 pointer-events-none" />

            {/* Date Stamp */}
            <div className="text-right text-xs font-mono text-[#8a7f70] uppercase tracking-wider mb-6">
              {letter.date}
            </div>

            {/* Salutation */}
            <h2 className="font-serif text-2xl sm:text-3xl text-[#281f3d] font-normal italic mb-6">
              {letter.salutation}
            </h2>

            {/* Letter Body */}
            <div className="space-y-4 font-story text-base sm:text-lg text-[#2a223d] leading-relaxed mb-10">
              {letter.paragraphs.map((p, idx) => (
                <p key={idx} className="first-letter:text-2xl first-letter:font-normal first-letter:mr-0.5">
                  {p}
                </p>
              ))}
            </div>

            {/* Closing & Signature */}
            <div className="pt-6 border-t border-[#e2d8c7] text-right">
              <p className="font-story text-base text-[#61566e] italic mb-2">
                {letter.closing}
              </p>
              <p className="font-handwriting text-2xl sm:text-3xl text-[#30243F] tracking-wide font-bold">
                {letter.signature}
              </p>
            </div>
          </div>
        )}
      </div>

      <div className="mt-8 text-center text-xs text-[#B8A9CC]/60 font-mono">
        A personal handwritten keepsake for {recipient.name}
      </div>
    </div>
  );
}
