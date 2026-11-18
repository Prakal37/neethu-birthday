import { useState } from 'react';
import { birthdayData } from '../data/birthdayData';
import { playSparkle } from '../utils/soundEffects';
import { Icon } from './Icons';
import ImageWithFallback from './ImageWithFallback';

export default function StoryJourney({ onBack }) {
  const { timelineChapters, recipient } = birthdayData;
  const [currentIndex, setCurrentIndex] = useState(0);

  const chapter = timelineChapters[currentIndex];

  const handlePrev = () => {
    if (currentIndex > 0) {
      playSparkle();
      setCurrentIndex(currentIndex - 1);
    }
  };

  const handleNext = () => {
    if (currentIndex < timelineChapters.length - 1) {
      playSparkle();
      setCurrentIndex(currentIndex + 1);
    }
  };

  const goToChapter = (idx) => {
    playSparkle();
    setCurrentIndex(idx);
  };

  return (
    <div className="destination-page destination-page--journey min-h-screen w-full pt-20 pb-28 px-4 sm:px-6 relative z-10 flex flex-col items-center">
      
      {/* Top Header */}
      <div className="w-full max-w-5xl flex items-center justify-between mb-8">
        <button
          onClick={onBack}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[color-ink-plum]/70 border border-[var(--color-blush-border)] text-xs sm:text-sm text-[color-deep-burgundy] hover:text-[#D8C19A] hover:border-[#D8C19A] transition-all cursor-pointer backdrop-blur-md"
        >
          <Icon name="arrow-left" size={15} color="#D8C19A" />
          <span>Back to Overview</span>
        </button>

        <div className="text-right">
          <span className="text-xs text-[#D8C19A] uppercase tracking-widest font-mono">
            Chapter {currentIndex + 1} of {timelineChapters.length}
          </span>
          <h2 className="font-serif text-lg sm:text-xl text-[color-deep-burgundy] font-medium">
            {chapter.year}
          </h2>
        </div>
      </div>

      {/* Timeline Chapter Stepper */}
      <div className="w-full max-w-3xl mb-10 px-2">
        <div className="flex items-center justify-between relative">
          {/* Progress track */}
          <div className="absolute top-1/2 left-0 right-0 -translate-y-1/2 h-0.5 bg-[#30243F]" />
          <div
            className="absolute top-1/2 left-0 -translate-y-1/2 h-0.5 bg-gradient-to-r from-[#D8C19A] to-[#D8B5C4] transition-all duration-500"
            style={{ width: `${(currentIndex / (timelineChapters.length - 1)) * 100}%` }}
          />

          {timelineChapters.map((ch, idx) => {
            const isActive = idx === currentIndex;
            const isCompleted = idx < currentIndex;

            return (
              <button
                key={ch.id}
                onClick={() => goToChapter(idx)}
                className="relative z-10 flex flex-col items-center group cursor-pointer transition-all duration-300"
              >
                <div
                  className={`w-8 h-8 sm:w-10 sm:h-10 rounded-full flex items-center justify-center text-xs font-semibold transition-all duration-300 ${
                    isActive
                      ? 'bg-gradient-to-tr from-[#D8C19A] to-[#D8B5C4] text-[#15172B] scale-110 shadow-[0_0_20px_rgba(216,193,154,0.5)]'
                      : isCompleted
                      ? 'bg-[#30243F] text-[#D8C19A] border border-[rgba(216,193,154,0.5)]'
                      : 'bg-[#15172B] text-[color-deep-burgundy]/40 border border-white/10 group-hover:border-white/40'
                  }`}
                >
                  {ch.number}
                </div>
                <span
                  className={`hidden sm:block text-[11px] mt-2 whitespace-nowrap font-mono transition-colors ${
                    isActive ? 'text-[#D8C19A] font-semibold' : 'text-[#B8A9CC]/60'
                  }`}
                >
                  {ch.age}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Main Chapter Scene Card */}
      <div className="w-full max-w-4xl bg-[#1c1733]/65 backdrop-blur-2xl border border-[rgba(216,193,154,0.3)] rounded-3xl p-6 sm:p-10 shadow-[0_20px_60px_rgba(21,23,43,0.8)] relative overflow-hidden transition-all duration-500">
        
        {/* Subtle accent glow */}
        <div
          className="absolute -top-24 -right-24 w-72 h-72 rounded-full opacity-15 blur-3xl pointer-events-none"
          style={{ backgroundColor: chapter.color || '#D8C19A' }}
        />

        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
          
          {/* Visual Column / Photo Card */}
          <div className="md:col-span-5 flex flex-col items-center">
            <div className="w-full max-w-xs p-3.5 rounded-2xl bg-[#231b40]/80 border border-[rgba(216,193,154,0.35)] shadow-2xl transform hover:rotate-1 transition-transform duration-300">
              <div className="rounded-xl overflow-hidden mb-3">
                <ImageWithFallback
                  src={chapter.image}
                  alt={chapter.title}
                  title={`Chapter ${chapter.number} Photo`}
                  aspectRatio="4/3"
                />
              </div>
              <div className="px-1 text-center">
                <span className="text-[10px] uppercase font-mono tracking-wider text-[#D8C19A] block mb-1">
                  {chapter.age}
                </span>
                <p className="font-story text-sm text-[#F4F0EA]/85 italic">
                  &ldquo;{chapter.caption}&rdquo;
                </p>
              </div>
            </div>
          </div>

          {/* Story Column */}
          <div className="md:col-span-7 flex flex-col justify-between">
            <div>
              <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#30243F]/60 border border-[rgba(216,193,154,0.3)] text-xs text-[#D8C19A] font-mono tracking-wider mb-3">
                <span>CHAPTER {chapter.number}</span>
                <span>•</span>
                <span>{chapter.year}</span>
              </div>

              <h1 className="font-serif text-2xl sm:text-4xl text-[#F4F0EA] font-medium mb-1">
                {chapter.title}
              </h1>

              <h3 className="text-sm sm:text-base text-[#D8B5C4] font-sans tracking-wide mb-4">
                {chapter.subtitle}
              </h3>

              {/* Quote block */}
              <div className="border-l-2 border-[#D8C19A]/60 pl-4 py-1 mb-5">
                <p className="font-story text-base sm:text-lg text-[#F4F0EA]/95 italic leading-relaxed">
                  &ldquo;{chapter.quote}&rdquo;
                </p>
              </div>

              {/* Story text */}
              <p className="font-story text-base sm:text-lg text-[#F4F0EA]/85 leading-relaxed mb-6">
                {chapter.story}
              </p>

              {/* Highlight tags */}
              <div className="flex flex-wrap gap-2 mb-6">
                {chapter.tags?.map((tag) => (
                  <span
                    key={tag}
                    className="px-2.5 py-1 rounded-lg bg-[#30243F]/60 border border-[rgba(216,193,154,0.2)] text-[11px] text-[#B8A9CC] font-mono"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            </div>

            {/* Navigation buttons */}
            <div className="pt-4 border-t border-white/10 flex items-center justify-between">
              <button
                onClick={handlePrev}
                disabled={currentIndex === 0}
                className={`inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-medium transition-all ${
                  currentIndex === 0
                    ? 'opacity-30 cursor-not-allowed text-[#F4F0EA]/40'
                    : 'bg-[#15172B] text-[#F4F0EA] hover:bg-[#30243F] border border-[rgba(216,193,154,0.3)] cursor-pointer'
                }`}
              >
                <Icon name="arrow-left" size={15} color="#D8C19A" />
                <span>Previous Chapter</span>
              </button>

              <button
                onClick={handleNext}
                disabled={currentIndex === timelineChapters.length - 1}
                className={`inline-flex items-center gap-2 px-5 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all ${
                  currentIndex === timelineChapters.length - 1
                    ? 'opacity-30 cursor-not-allowed text-[#F4F0EA]/40'
                    : 'bg-gradient-to-r from-[#D8C19A] to-[#D8B5C4] text-[#15172B] hover:opacity-95 shadow-[0_0_15px_rgba(216,193,154,0.35)] cursor-pointer'
                }`}
              >
                <span>Next Chapter</span>
                <Icon name="arrow-right" size={15} color="#15172B" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Hint */}
      <div className="mt-8 text-center text-xs text-[#B8A9CC]/60 font-mono">
        Seven chapters of memories dedicated to {recipient.name}
      </div>
    </div>
  );
}
