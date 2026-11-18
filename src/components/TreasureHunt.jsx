import { useState } from 'react';
import { birthdayData } from '../data/birthdayData';
import { playSuccessChime, playShatterSound, playSparkle } from '../utils/soundEffects';
import { triggerConfetti } from '../utils/confetti';
import { Icon } from './Icons';

export default function TreasureHunt({ onBack }) {
  const { treasureHunt } = birthdayData;
  const [unlockedKeys, setUnlockedKeys] = useState({});
  const [activeClue, setActiveClue] = useState(null);
  const [selectedOption, setSelectedOption] = useState(null);
  const [clueFeedback, setClueFeedback] = useState(null);
  const [isChestOpened, setIsChestOpened] = useState(false);

  const keysCount = Object.keys(unlockedKeys).length;
  const allKeysUnlocked = keysCount === treasureHunt.clues.length;

  const handleOpenClue = (clue) => {
    playSparkle();
    setActiveClue(clue);
    setSelectedOption(null);
    setClueFeedback(null);
  };

  const handleSelectOption = (idx) => {
    setSelectedOption(idx);
  };

  const handleSubmitAnswer = () => {
    if (selectedOption === null || !activeClue) return;

    if (selectedOption === activeClue.correctIndex || activeClue.correctIndex === undefined) {
      playSuccessChime();
      setUnlockedKeys((prev) => ({ ...prev, [activeClue.id]: true }));
      setClueFeedback({ success: true, text: activeClue.unlockedText });
      triggerConfetti({
        particleCount: 30,
        origin: { x: 0.5, y: 0.5 },
        speed: 7,
        spread: 160,
      });
    } else {
      setClueFeedback({
        success: false,
        text: 'A thoughtful guess, but inspect the clue once more!',
      });
    }
  };

  const handleOpenChest = () => {
    if (!allKeysUnlocked || isChestOpened) return;
    playShatterSound();
    setIsChestOpened(true);
    triggerConfetti({
      particleCount: 90,
      origin: { x: 0.5, y: 0.4 },
      speed: 10,
      spread: 360,
    });
  };

  const handleReset = () => {
    playSparkle();
    setUnlockedKeys({});
    setIsChestOpened(false);
    setActiveClue(null);
  };

  return (
    <div className="destination-page destination-page--hunt min-h-screen w-full pt-20 pb-28 px-4 sm:px-6 relative z-10 flex flex-col items-center">
      
      {/* Top Header */}
      <div className="w-full max-w-5xl flex items-center justify-between mb-8">
        <button
          onClick={onBack}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#1c1733]/70 border border-[rgba(216,193,154,0.3)] text-xs sm:text-sm text-[#F4F0EA] hover:text-[#D8C19A] hover:border-[#D8C19A] transition-all cursor-pointer backdrop-blur-md"
        >
          <Icon name="arrow-left" size={15} color="#D8C19A" />
          <span>Back to Overview</span>
        </button>

        {allKeysUnlocked && (
          <button
            onClick={handleReset}
            className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-[#30243F] hover:bg-[#43325c] border border-[rgba(216,193,154,0.4)] text-xs text-[#D8C19A] font-medium transition-all cursor-pointer shadow-md font-mono"
          >
            <Icon name="rotate-ccw" size={13} color="#D8C19A" />
            <span>Reset Quest</span>
          </button>
        )}
      </div>

      {/* Main Title & Progress */}
      <div className="text-center max-w-2xl mx-auto mb-8">
        <span className="text-xs text-[#D8C19A] uppercase tracking-widest font-mono">
          THE GILDED QUEST
        </span>
        <h1 className="font-serif text-3xl sm:text-4xl text-[#F4F0EA] font-medium mt-1 mb-2">
          {treasureHunt.title}
        </h1>
        <p className="font-story text-sm sm:text-base text-[#F4F0EA]/80 max-w-lg mx-auto">
          {treasureHunt.subtitle}
        </p>

        {/* Progress Bar */}
        <div className="mt-5 inline-flex items-center gap-3 px-5 py-2 rounded-full bg-[#1c1733]/85 border border-[rgba(216,193,154,0.35)] shadow-lg">
          <Icon name="key" size={17} color="#D8C19A" />
          <span className="text-xs font-mono font-medium text-[#F4F0EA]">
            Keys Discovered: <span className="text-[#D8C19A] font-bold">{keysCount}</span> / {treasureHunt.clues.length}
          </span>
          <div className="w-20 sm:w-28 h-2 rounded-full bg-white/10 overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-[#D8C19A] to-[#D8B5C4] transition-all duration-500"
              style={{ width: `${(keysCount / treasureHunt.clues.length) * 100}%` }}
            />
          </div>
        </div>
      </div>

      {/* 3 INTERACTIVE CLUE PODS */}
      <div className="w-full max-w-4xl grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
        {treasureHunt.clues.map((clue, idx) => {
          const isUnlocked = !!unlockedKeys[clue.id];

          return (
            <div
              key={clue.id}
              onClick={() => handleOpenClue(clue)}
              className={`group relative p-6 rounded-3xl border transition-all duration-300 cursor-pointer flex flex-col justify-between ${
                isUnlocked
                  ? 'bg-[#211a3b]/85 border-[rgba(216,193,154,0.65)] shadow-[0_10px_30px_rgba(216,193,154,0.18)]'
                  : 'bg-[#1c1733]/60 border-[rgba(216,193,154,0.22)] hover:border-[rgba(216,193,154,0.55)] hover:-translate-y-1'
              }`}
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div
                    className={`w-12 h-12 rounded-2xl flex items-center justify-center border shadow-md ${
                      isUnlocked
                        ? 'bg-[#30243F] border-[#D8C19A] text-[#D8C19A]'
                        : 'bg-[#15172B] border-[rgba(216,193,154,0.3)] text-[#B8A9CC]'
                    }`}
                  >
                    <Icon name={clue.icon || 'key'} size={20} color={isUnlocked ? '#D8C19A' : '#B8A9CC'} />
                  </div>
                  <span
                    className={`px-2.5 py-0.5 rounded-full text-[10px] font-mono font-semibold ${
                      isUnlocked
                        ? 'bg-[#30243F] text-[#D8C19A] border border-[rgba(216,193,154,0.4)]'
                        : 'bg-white/10 text-[#F4F0EA]/60'
                    }`}
                  >
                    {isUnlocked ? 'KEY UNLOCKED 🔑' : `CLUE #${idx + 1}`}
                  </span>
                </div>

                <h3 className="font-serif text-lg font-medium text-[#F4F0EA] mb-2 group-hover:text-[#D8C19A] transition-colors">
                  {clue.title}
                </h3>
                <p className="font-story text-sm text-[#F4F0EA]/80 leading-relaxed">
                  {isUnlocked ? clue.unlockedText : 'Open this clue and discover the hidden key...'}
                </p>
              </div>

              <div className="mt-5 pt-3 border-t border-white/10 flex items-center justify-between text-xs">
                <span className={isUnlocked ? 'text-[#D8C19A] font-medium' : 'text-[#B8A9CC]'}>
                  {isUnlocked ? 'Solved ✓' : 'Inspect Clue →'}
                </span>
                <Icon name={isUnlocked ? 'unlock' : 'lock'} size={14} color={isUnlocked ? '#D8C19A' : '#B8A9CC'} />
              </div>
            </div>
          );
        })}
      </div>

      {/* THE ANCIENT BIRTHDAY CHEST */}
      <div className="w-full max-w-xl text-center">
        <div
          onClick={handleOpenChest}
          className={`relative p-8 rounded-3xl border-2 transition-all duration-500 ${
            allKeysUnlocked
              ? 'bg-gradient-to-b from-[#261d3d] to-[#171329] border-[#D8C19A] shadow-[0_0_60px_rgba(216,193,154,0.35)] cursor-pointer hover:scale-102'
              : 'bg-[#1c1733]/60 border-white/10 opacity-75 cursor-not-allowed'
          }`}
        >
          {/* Glowing Aura if ready */}
          {allKeysUnlocked && !isChestOpened && (
            <div className="absolute -inset-1 rounded-3xl bg-gradient-to-r from-[#D8C19A] via-[#D8B5C4] to-[#B8A9CC] opacity-35 blur-lg animate-pulse" />
          )}

          {/* Chest Icon */}
          <div className="relative z-10">
            <div className="w-24 h-24 sm:w-28 sm:h-28 mx-auto rounded-3xl bg-gradient-to-tr from-[#30243F] via-[#48375e] to-[#D8C19A] p-1 border-2 border-white/60 shadow-2xl flex items-center justify-center mb-4">
              <span className="text-5xl sm:text-6xl filter drop-shadow">
                {isChestOpened ? '🌟' : allKeysUnlocked ? '🗝️' : '🔒'}
              </span>
            </div>

            <h3 className="font-serif text-2xl text-[#F4F0EA] font-medium mb-1">
              {isChestOpened ? treasureHunt.finalReward.unlockedTitle : treasureHunt.finalReward.chestTitle}
            </h3>

            <p className="font-story text-sm sm:text-base text-[#F4F0EA]/85 max-w-md mx-auto mb-4">
              {isChestOpened
                ? treasureHunt.finalReward.message
                : allKeysUnlocked
                ? 'All 3 keys assembled! Click to open the vault.'
                : `Collect all 3 memory keys to open the chest (${keysCount} / 3 found)`}
            </p>

            {isChestOpened && (
              <div className="inline-block px-4 py-1.5 rounded-full bg-[#30243F] border border-[#D8C19A] text-xs font-mono font-bold text-[#D8C19A] tracking-wider uppercase animate-bounce">
                {treasureHunt.finalReward.rewardBadge}
              </div>
            )}

            {!isChestOpened && allKeysUnlocked && (
              <button
                onClick={handleOpenChest}
                className="px-8 py-3 rounded-full bg-gradient-to-r from-[#D8C19A] to-[#D8B5C4] text-[#15172B] font-bold text-xs sm:text-sm uppercase tracking-wider shadow-lg hover:opacity-95 cursor-pointer"
              >
                OPEN CELESTIAL CHEST NOW! ✨
              </button>
            )}
          </div>
        </div>
      </div>

      {/* CLUE MODAL DIALOG */}
      {activeClue && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-fade-in">
          <div className="relative max-w-lg w-full bg-[#1b162e] border border-[rgba(216,193,154,0.4)] rounded-3xl p-6 sm:p-8 shadow-2xl text-[#F4F0EA]">
            
            <button
              onClick={() => setActiveClue(null)}
              className="absolute top-4 right-4 w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-all cursor-pointer"
            >
              <Icon name="close" size={17} />
            </button>

            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#30243F] text-[#D8C19A] text-xs font-mono mb-3 border border-[rgba(216,193,154,0.3)]">
              <Icon name={activeClue.icon || 'key'} size={13} color="#D8C19A" />
              <span>{activeClue.title}</span>
            </div>

            <h2 className="font-serif text-xl sm:text-2xl text-[#F4F0EA] font-medium mb-3">
              Memory Challenge:
            </h2>

            <p className="font-story text-base text-[#D8B5C4] leading-relaxed mb-5">
              &ldquo;{activeClue.riddle}&rdquo;
            </p>

            {/* Multiple Choice Options */}
            <div className="space-y-2.5 mb-6">
              {activeClue.options.map((opt, i) => {
                const isSelected = selectedOption === i;
                return (
                  <button
                    key={i}
                    onClick={() => handleSelectOption(i)}
                    className={`w-full text-left p-3.5 rounded-2xl border text-xs sm:text-sm font-sans transition-all cursor-pointer ${
                      isSelected
                        ? 'bg-[#30243F] border-[#D8C19A] text-[#F4F0EA] shadow-md font-medium'
                        : 'bg-[#15172B]/80 border-white/10 text-[#F4F0EA]/80 hover:bg-[#231d3d]'
                    }`}
                  >
                    <span className="font-mono text-[#D8C19A] mr-2">[{String.fromCharCode(65 + i)}]</span>
                    {opt}
                  </button>
                );
              })}
            </div>

            {/* Feedback alert */}
            {clueFeedback && (
              <div
                className={`p-3.5 rounded-xl mb-4 text-xs font-sans leading-relaxed ${
                  clueFeedback.success
                    ? 'bg-[#30243F] border border-[#D8C19A]/60 text-[#D8C19A]'
                    : 'bg-[#402029] border border-[#D8B5C4]/40 text-[#D8B5C4]'
                }`}
              >
                {clueFeedback.text}
              </div>
            )}

            {/* Action Buttons */}
            <div className="flex items-center justify-end gap-3">
              <button
                onClick={() => setActiveClue(null)}
                className="px-4 py-2 rounded-full text-xs text-[#F4F0EA]/70 hover:text-white cursor-pointer"
              >
                Cancel
              </button>
              <button
                onClick={handleSubmitAnswer}
                disabled={selectedOption === null}
                className="px-6 py-2.5 rounded-full bg-gradient-to-r from-[#D8C19A] to-[#D8B5C4] text-[#15172B] font-semibold text-xs uppercase tracking-wider disabled:opacity-40 cursor-pointer shadow-md"
              >
                Confirm Memory Answer
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
