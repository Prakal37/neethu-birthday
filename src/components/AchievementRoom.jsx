import { useState } from 'react';
import { birthdayData } from '../data/birthdayData';
import { playSparkle } from '../utils/soundEffects';
import { triggerConfetti } from '../utils/confetti';
import { Icon } from './Icons';

export default function AchievementRoom({ onBack }) {
  const { achievements, recipient } = birthdayData;
  const [celebratedId, setCelebratedId] = useState(null);

  const handleCelebrate = (ach) => {
    playSparkle();
    setCelebratedId(ach.id);
    triggerConfetti({
      particleCount: 28,
      origin: { x: 0.5, y: 0.5 },
      colors: ['#D8C19A', '#F4F0EA', '#D8B5C4', '#B8A9CC'],
      speed: 7,
      spread: 140,
    });
    setTimeout(() => setCelebratedId(null), 1200);
  };

  return (
    <div className="destination-page destination-page--achievements min-h-screen w-full pt-20 pb-28 px-4 sm:px-6 relative z-10 flex flex-col items-center">
      
      {/* Top Header */}
      <div className="w-full max-w-5xl flex items-center justify-between mb-8">
        <button
          onClick={onBack}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#1c1733]/70 border border-[rgba(216,193,154,0.3)] text-xs sm:text-sm text-[#F4F0EA] hover:text-[#D8C19A] hover:border-[#D8C19A] transition-all cursor-pointer backdrop-blur-md"
        >
          <Icon name="arrow-left" size={15} color="#D8C19A" />
          <span>Back to Overview</span>
        </button>

        <div className="text-right">
          <span className="text-xs text-[#D8C19A] font-mono uppercase tracking-wider">
            ★ {achievements.length} Accolades
          </span>
        </div>
      </div>

      {/* Main Title */}
      <div className="text-center max-w-2xl mx-auto mb-10">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#30243F]/70 border border-[rgba(216,193,154,0.35)] text-xs text-[#D8C19A] tracking-widest uppercase mb-3 shadow-sm">
          <Icon name="trophy" size={13} color="#D8C19A" />
          <span>HALL OF CELESTIAL HONORS</span>
        </div>

        <h1 className="font-serif text-3xl sm:text-4xl text-[#F4F0EA] font-medium mb-2">
          {recipient.name}&apos;s Trophy Room
        </h1>
        <p className="font-story text-sm sm:text-base text-[#F4F0EA]/80 max-w-lg mx-auto">
          Celebrating your kindness, brilliant humor, quiet resilience, and every single quality that makes you truly irreplaceable. Tap an award to give it a little birthday sparkle.
        </p>
      </div>

      {/* Trophy Cards Grid */}
      <div className="w-full max-w-5xl grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {achievements.map((ach) => {
          const isCelebrating = celebratedId === ach.id;
          const cardColor = '#D8C19A';

          return (
            <div
              key={ach.id}
              onClick={() => handleCelebrate(ach)}
              className={`group relative p-6 rounded-3xl bg-[#1c1733]/65 backdrop-blur-xl border transition-all duration-300 cursor-pointer flex flex-col justify-between hover:-translate-y-1.5 shadow-xl ${
                isCelebrating
                  ? 'border-[#D8C19A] scale-104 shadow-[0_0_35px_rgba(216,193,154,0.4)]'
                  : 'border-[rgba(216,193,154,0.22)] hover:border-[rgba(216,193,154,0.65)]'
              }`}
            >
              {/* Outer ambient glow on hover */}
              <div className="absolute -inset-0.5 rounded-3xl opacity-0 group-hover:opacity-15 blur-md transition duration-500 pointer-events-none bg-[#D8C19A]" />

              <div>
                {/* Header row: Trophy icon & year */}
                <div className="flex items-center justify-between mb-4">
                  <div
                    className="w-13 h-13 rounded-2xl flex items-center justify-center border shadow-md transition-transform group-hover:scale-110 duration-300"
                    style={{
                      background: 'radial-gradient(circle at 30% 30%, rgba(216, 193, 154, 0.25), #1a162e)',
                      borderColor: 'rgba(216, 193, 154, 0.5)',
                    }}
                  >
                    <Icon name={ach.icon || 'trophy'} size={24} color={cardColor} />
                  </div>

                  <span className="px-2.5 py-1 rounded-full text-[10px] font-mono tracking-wider bg-white/10 text-[#F4F0EA]/80 border border-white/10">
                    {ach.year}
                  </span>
                </div>

                {/* Category Pill */}
                <span className="inline-block text-[11px] font-mono uppercase tracking-wider font-semibold mb-1 text-[#D8C19A]">
                  {ach.category}
                </span>

                {/* Title */}
                <h3 className="font-serif text-xl font-medium text-[#F4F0EA] mb-2 group-hover:text-[#D8C19A] transition-colors">
                  {ach.title}
                </h3>

                {/* Description */}
                <p className="font-story text-sm sm:text-base text-[#F4F0EA]/80 leading-relaxed font-sans">
                  {ach.description}
                </p>
              </div>

              {/* Bottom Action Footer */}
              <div className="mt-5 pt-3 border-t border-white/10 flex items-center justify-between text-xs text-[#D8C19A]">
                <span className="font-mono text-[11px] uppercase tracking-wider group-hover:text-[#F4F0EA] transition-colors">
                  {isCelebrating ? 'Starlight Bestowed! ✨' : 'Tap to salute 🌟'}
                </span>
                <span className="text-xs">🏆</span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Hall Citation */}
      <div className="mt-12 text-center max-w-xl text-sm text-[#F4F0EA]/70 italic font-story">
        &ldquo;True achievements are measured by the hearts you touch and the warmth you leave in your wake.&rdquo;
      </div>
    </div>
  );
}
