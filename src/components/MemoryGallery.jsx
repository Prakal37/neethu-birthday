import { useState } from 'react';
import { birthdayData } from '../data/birthdayData';
import { playSparkle, playPaperRustle } from '../utils/soundEffects';
import { triggerConfetti } from '../utils/confetti';
import { Icon } from './Icons';
import ImageWithFallback from './ImageWithFallback';

export default function MemoryGallery({ onBack }) {
  const { memories, thenAndNow, recipient } = birthdayData;
  const [selectedPhoto, setSelectedPhoto] = useState(null);
  const [activeTab, setActiveTab] = useState('gallery'); // 'gallery' or 'then-now'
  const [isExploded, setIsExploded] = useState(false);

  const handleOpenPhoto = (item) => {
    playPaperRustle();
    setSelectedPhoto(item);
  };

  const handleClosePhoto = () => {
    playSparkle();
    setSelectedPhoto(null);
  };

  const handleTriggerExplosion = () => {
    playSparkle();
    setIsExploded(true);
    triggerConfetti({
      particleCount: 70,
      origin: { x: 0.5, y: 0.4 },
      speed: 9,
      spread: 360,
    });
    setTimeout(() => {
      setIsExploded(false);
    }, 1800);
  };

  return (
    <div className="destination-page destination-page--gallery min-h-screen w-full pt-20 pb-28 px-4 sm:px-6 relative z-10 flex flex-col items-center">
      
      {/* Top Header */}
      <div className="w-full max-w-5xl flex items-center justify-between mb-8">
        <button
          onClick={onBack}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#1c1733]/70 border border-[rgba(216,193,154,0.3)] text-xs sm:text-sm text-[#F4F0EA] hover:text-[#D8C19A] hover:border-[#D8C19A] transition-all cursor-pointer backdrop-blur-md"
        >
          <Icon name="arrow-left" size={15} color="#D8C19A" />
          <span>Back to Overview</span>
        </button>

        {/* Tab switchers */}
        <div className="flex items-center gap-2 bg-[#171329]/80 p-1 rounded-full border border-[rgba(216,193,154,0.25)]">
          <button
            onClick={() => { setActiveTab('gallery'); playSparkle(); }}
            className={`px-3.5 sm:px-5 py-1.5 rounded-full text-xs font-medium transition-all cursor-pointer ${
              activeTab === 'gallery'
                ? 'bg-gradient-to-r from-[#D8C19A] to-[#D8B5C4] text-[#15172B] font-semibold shadow-md'
                : 'text-[#F4F0EA]/70 hover:text-white'
            }`}
          >
            Polaroid Exhibition
          </button>
          <button
            onClick={() => { setActiveTab('then-now'); playSparkle(); }}
            className={`px-3.5 sm:px-5 py-1.5 rounded-full text-xs font-medium transition-all cursor-pointer ${
              activeTab === 'then-now'
                ? 'bg-gradient-to-r from-[#D8C19A] to-[#D8B5C4] text-[#15172B] font-semibold shadow-md'
                : 'text-[#F4F0EA]/70 hover:text-white'
            }`}
          >
            Then vs. Now ✨
          </button>
        </div>
      </div>

      {/* Main Title Banner */}
      <div className="text-center max-w-2xl mx-auto mb-8">
        <span className="text-xs text-[#D8C19A] uppercase tracking-widest font-mono">
          EDITORIAL ARCHIVE
        </span>
        <h1 className="font-serif text-3xl sm:text-4xl text-[#F4F0EA] font-medium mt-1 mb-2">
          {recipient.name}&apos;s Memory Gallery
        </h1>
        <p className="font-story text-sm sm:text-base text-[#F4F0EA]/80">
          {activeTab === 'gallery'
            ? 'Moments frozen in golden light. Tap any photograph to read the narrative backstory.'
            : 'A heartwarming reflection of grace, growth, and timeless charm.'}
        </p>

        {activeTab === 'gallery' && (
          <button
            onClick={handleTriggerExplosion}
            className="mt-4 inline-flex items-center gap-2 px-5 py-2 rounded-full bg-[#30243F]/70 hover:bg-[#3d2f52] border border-[rgba(216,193,154,0.35)] text-xs text-[#D8C19A] font-mono tracking-wider transition-all shadow-md cursor-pointer hover:scale-105 active:scale-95"
          >
            <Icon name="sparkles" size={13} color="#D8C19A" className="animate-spin-slow" />
            <span>Celebrate these memories ✨</span>
          </button>
        )}
      </div>

      {/* TAB 1: POLAROID GRID WITH ROTATIONS */}
      {activeTab === 'gallery' && (
        <div
          className={`w-full max-w-5xl grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 transition-all duration-700 ${
            isExploded ? 'scale-102 rotate-1' : 'scale-100'
          }`}
        >
          {memories.map((mem) => {
            const rot = mem.rotation || 0;
            return (
              <div
                key={mem.id}
                onClick={() => handleOpenPhoto(mem)}
                style={{ transform: `rotate(${rot}deg)` }}
                className="group relative bg-[#F9F7F4] p-4 pb-6 rounded-xl shadow-[0_15px_35px_rgba(0,0,0,0.55)] hover:shadow-[0_22px_45px_rgba(216,193,154,0.25)] transition-all duration-300 hover:scale-105 hover:z-20 cursor-pointer flex flex-col justify-between border border-[rgba(216,193,154,0.4)]"
              >
                {/* Champagne Silk Tape Accent */}
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-16 h-5 bg-[#D8C19A]/75 backdrop-blur-sm border-t border-b border-white/60 shadow-xs transform -rotate-1 pointer-events-none" />

                {/* Photo */}
                <div className="relative rounded-lg overflow-hidden shadow-inner bg-[#15172B] mb-3">
                  <ImageWithFallback
                    src={mem.image}
                    alt={mem.title}
                    title={mem.title}
                    aspectRatio="1/1"
                  />
                  {mem.badge && (
                    <span className="absolute top-2 right-2 px-2 py-0.5 rounded-full text-[10px] font-mono font-medium bg-[#15172B]/80 text-[#D8C19A] backdrop-blur-sm border border-[rgba(216,193,154,0.3)]">
                      {mem.badge}
                    </span>
                  )}
                </div>

                {/* Polaroid Caption */}
                <div className="px-1 text-center">
                  <h3 className="font-serif text-base text-[#1b1730] font-semibold leading-tight mb-0.5">
                    {mem.title}
                  </h3>
                  <span className="block text-[10px] text-[#786a8a] uppercase tracking-wider font-mono mb-1">
                    {mem.year}
                  </span>
                  <p className="font-story text-sm text-[#383145] italic line-clamp-2">
                    &ldquo;{mem.caption}&rdquo;
                  </p>
                </div>

                {/* Hover indicator */}
                <span className="block text-center text-[11px] text-[#977f60] font-mono font-semibold mt-2.5 opacity-0 group-hover:opacity-100 transition-opacity">
                  Read Story Note →
                </span>
              </div>
            );
          })}
        </div>
      )}

      {/* TAB 2: THEN VS NOW COMPARISON */}
      {activeTab === 'then-now' && (
        <div className="w-full max-w-4xl bg-[#1c1733]/65 backdrop-blur-2xl border border-[rgba(216,193,154,0.3)] rounded-3xl p-6 sm:p-10 shadow-2xl">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            
            {/* Then Card */}
            <div className="flex flex-col items-center text-center p-5 rounded-2xl bg-[#231b40]/70 border border-[rgba(216,193,154,0.25)] shadow-xl">
              <span className="px-3.5 py-1 rounded-full text-xs font-mono uppercase bg-[#30243F] text-[#D8C19A] border border-[rgba(216,193,154,0.3)] mb-3">
                {thenAndNow.then.year}
              </span>
              <div className="w-full max-w-xs rounded-xl overflow-hidden shadow-lg mb-3">
                <ImageWithFallback
                  src={thenAndNow.then.image}
                  alt={thenAndNow.then.year}
                  title="Little You Photo"
                  aspectRatio="1/1"
                />
              </div>
              <p className="font-story text-sm sm:text-base text-[#F4F0EA]/85 italic">
                &ldquo;{thenAndNow.then.caption}&rdquo;
              </p>
            </div>

            {/* Now Card */}
            <div className="flex flex-col items-center text-center p-5 rounded-2xl bg-[#231b40]/70 border border-[rgba(216,181,196,0.35)] shadow-xl">
              <span className="px-3.5 py-1 rounded-full text-xs font-mono uppercase bg-[#30243F] text-[#D8B5C4] border border-[rgba(216,181,196,0.4)] mb-3">
                {thenAndNow.now.year}
              </span>
              <div className="w-full max-w-xs rounded-xl overflow-hidden shadow-lg mb-3">
                <ImageWithFallback
                  src={thenAndNow.now.image}
                  alt={thenAndNow.now.year}
                  title="Present You Photo"
                  aspectRatio="1/1"
                />
              </div>
              <p className="font-story text-sm sm:text-base text-[#F4F0EA]/85 italic">
                &ldquo;{thenAndNow.now.caption}&rdquo;
              </p>
            </div>
          </div>

          {/* Bottom Quote */}
          <div className="mt-8 text-center pt-6 border-t border-white/10">
            <p className="font-story text-base sm:text-xl text-[#D8C19A] italic max-w-xl mx-auto">
              &ldquo;{thenAndNow.quote}&rdquo;
            </p>
          </div>
        </div>
      )}

      {/* MODAL: EXPANDED PHOTO DIALOG */}
      {selectedPhoto && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-fade-in">
          <div className="relative max-w-lg w-full bg-[#1b162e] border border-[rgba(216,193,154,0.4)] rounded-3xl p-6 sm:p-7 shadow-[0_25px_80px_rgba(0,0,0,0.85)] text-[#F4F0EA]">
            
            {/* Close button */}
            <button
              onClick={handleClosePhoto}
              className="absolute top-4 right-4 w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-all cursor-pointer"
            >
              <Icon name="close" size={17} />
            </button>

            {/* Image */}
            <div className="rounded-2xl overflow-hidden mb-4 shadow-lg border border-white/10">
              <ImageWithFallback
                src={selectedPhoto.image}
                alt={selectedPhoto.title}
                title={selectedPhoto.title}
                aspectRatio="4/3"
              />
            </div>

            {/* Details */}
            <div className="inline-flex items-center gap-2 px-3 py-0.5 rounded-full bg-[#30243F] text-[#D8C19A] text-[11px] font-mono mb-2 border border-[rgba(216,193,154,0.25)]">
              <span>{selectedPhoto.year}</span>
              {selectedPhoto.badge && <span>• {selectedPhoto.badge}</span>}
            </div>

            <h2 className="font-serif text-2xl text-[#F4F0EA] font-medium mb-1">
              {selectedPhoto.title}
            </h2>

            <p className="font-story text-base text-[#D8B5C4] italic mb-4">
              &ldquo;{selectedPhoto.caption}&rdquo;
            </p>

            <div className="p-4 rounded-xl bg-[#241d3d]/80 border border-[rgba(216,193,154,0.2)] text-xs sm:text-sm text-[#F4F0EA]/90 leading-relaxed font-story text-base">
              <span className="block text-[11px] text-[#D8C19A] uppercase font-mono tracking-wider mb-1 font-semibold">
                The Narrative:
              </span>
              {selectedPhoto.expandedStory}
            </div>

            <div className="mt-5 text-center">
              <button
                onClick={handleClosePhoto}
                className="px-6 py-2 rounded-full bg-gradient-to-r from-[#D8C19A] to-[#D8B5C4] text-[#15172B] text-xs font-semibold uppercase tracking-wider cursor-pointer"
              >
                Close Memory
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
