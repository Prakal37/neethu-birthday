import { useState, useRef, useEffect } from 'react';
import { birthdayData } from '../data/birthdayData';
import { playSparkle } from '../utils/soundEffects';
import { Icon } from './Icons';

export default function Navigation({ currentSection, onNavigate }) {
  const { recipient, music } = birthdayData;
  const audioRef = useRef(null);
  const [isAudioPlaying, setIsAudioPlaying] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isDestDropdownOpen, setIsDestDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  // 10 cinematic memory destinations
  const worldLandmarks = [
    { id: "story", name: "Life Journey", realm: "A story in chapters", icon: "compass", color: "#9A4454" },
    { id: "gallery", name: "Memory Gallery", realm: "Favorite snapshots", icon: "camera", color: "#C86A5A" },
    { id: "pinata", name: "Birthday Piñata", realm: "A birthday surprise", icon: "gift", color: "#E09ABA", badge: "Interactive" },
    { id: "hunt", name: "Treasure Hunt", realm: "Follow the clues", icon: "key", color: "#9A4454" },
    { id: "achievements", name: "Achievement Room", realm: "Milestones & magic", icon: "trophy", color: "#C86A5A" },
    { id: "wishes", name: "Wishes From Loved Ones", realm: "Family & friends", icon: "heart", color: "#E09ABA" },
    { id: "quiz", name: "Memory Quiz", realm: "Shared stories", icon: "sparkles", color: "#9A4454" },
    { id: "secret", name: "Secret Message", realm: "Just between us", icon: "lock", color: "#C86A5A" },
    { id: "letter", name: "Birthday Letter", realm: "A note from the heart", icon: "feather", color: "#9A4454" },
    { id: "finale", name: "Grand Finale", realm: "One more celebration", icon: "flame", color: "#E09ABA", badge: "The Toast" },
  ];

  // Close dropdown if clicked outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDestDropdownOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleAudioToggle = async () => {
    const audio = audioRef.current;
    if (!audio) return;

    if (isAudioPlaying) {
      audio.pause();
      setIsAudioPlaying(false);
      return;
    }

    try {
      audio.volume = 0.75;
      await audio.play();
      setIsAudioPlaying(true);
    } catch (error) {
      console.error('Unable to play the birthday song:', error);
      setIsAudioPlaying(false);
    }
  };

  const handleJump = (id) => {
    playSparkle();
    onNavigate(id);
    setIsMobileMenuOpen(false);
    setIsDestDropdownOpen(false);
  };

  const currentLandmark = worldLandmarks.find((d) => d.id === currentSection);

  return (
    <>
      <audio
        ref={audioRef}
        src={music.customAudioUrl}
        loop
        preload="metadata"
        onEnded={() => setIsAudioPlaying(false)}
        onPause={() => setIsAudioPlaying(false)}
        onPlay={() => setIsAudioPlaying(true)}
      />
      {/* Top Floating Adventure HUD Nav Bar */}
      <header className="memory-nav fixed top-0 left-0 right-0 z-40 px-3 sm:px-6 py-3 transition-all duration-300">
        <div className="memory-nav__bar max-w-5xl mx-auto flex items-center justify-between px-3 sm:px-6 py-2.5 rounded-full">
          
          {/* Logo / Brand Home Link */}
          <button
            onClick={() => handleJump('universe')}
            className="flex items-center gap-2.5 group text-left cursor-pointer"
          >
            <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-[#30243F] to-[#D8C19A] flex items-center justify-center text-xs shadow-md border border-[rgba(216,193,154,0.4)] group-hover:scale-108 transition-transform">
              ✨
            </div>
            <div className="flex flex-col">
              <span className="font-serif text-sm font-semibold text-[#F4F0EA] tracking-wide block leading-none group-hover:text-[#D8C19A] transition-colors">
                Memory Lane
              </span>
              <span className="text-[9px] text-[#D8C19A] font-mono tracking-wider">
                Birthday keepsake
              </span>
            </div>
          </button>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-2" ref={dropdownRef}>
            {/* World Vista Overview */}
            <button
              onClick={() => handleJump('universe')}
              className={`px-4 py-1.5 rounded-full text-xs font-medium transition-all cursor-pointer flex items-center gap-1.5 ${
                currentSection === 'universe'
                  ? 'bg-gradient-to-r from-[#D8C19A] to-[#D8B5C4] text-[#15172B] font-semibold shadow-md'
                  : 'text-[#F4F0EA]/80 hover:text-white hover:bg-white/10'
              }`}
            >
              <Icon name="compass" size={13} color={currentSection === 'universe' ? '#15172B' : '#D8C19A'} />
              <span>Memory book</span>
            </button>

            {/* Landmarks Dropdown Trigger Button */}
            <div className="relative">
              <button
                onClick={() => setIsDestDropdownOpen(!isDestDropdownOpen)}
                className={`px-3.5 py-1.5 rounded-full text-xs font-medium transition-all cursor-pointer flex items-center gap-1.5 border ${
                  isDestDropdownOpen || (currentSection !== 'universe' && currentLandmark)
                    ? 'bg-[#30243F] text-[#D8C19A] border-[rgba(216,193,154,0.45)] shadow-sm'
                    : 'bg-white/5 text-[#F4F0EA]/80 hover:text-white border-[rgba(216,193,154,0.2)]'
                }`}
              >
                <Icon name="grid" size={12} color="#D8C19A" />
                <span>
                  {currentLandmark ? currentLandmark.name : '10 memories ▾'}
                </span>
              </button>

              {/* Landmarks Popover Menu */}
              {isDestDropdownOpen && (
                <div className="absolute top-full mt-2 right-0 w-84 p-3.5 rounded-2xl bg-[#1b152e]/95 backdrop-blur-2xl border border-[rgba(216,193,154,0.35)] shadow-[0_20px_60px_rgba(21,23,43,0.9)] z-50 animate-fade-in">
                  <div className="flex items-center justify-between pb-2 mb-2 border-b border-white/10 px-1">
                    <span className="text-[10px] font-mono uppercase tracking-widest text-[#D8C19A]">
                      Choose a memory to visit
                    </span>
                    <button
                      onClick={() => handleJump('universe')}
                      className="text-[10px] text-[#B8A9CC] hover:text-white hover:underline font-mono"
                    >
                      Back to the scrapbook →
                    </button>
                  </div>

                  <div className="grid grid-cols-2 gap-1.5 max-h-72 overflow-y-auto pr-1">
                    {worldLandmarks.map((d) => {
                      const isActive = currentSection === d.id;
                      return (
                        <button
                          key={d.id}
                          onClick={() => handleJump(d.id)}
                          className={`p-2 rounded-xl text-left transition-all cursor-pointer flex items-center gap-2 ${
                            isActive
                              ? 'bg-[#30243F] text-[#F4F0EA] border border-[rgba(216,193,154,0.5)] shadow-sm font-semibold'
                              : 'hover:bg-white/10 text-[#F4F0EA]/80'
                          }`}
                        >
                          <div
                            className="w-6 h-6 rounded-lg flex items-center justify-center shrink-0 border border-white/10"
                            style={{ backgroundColor: `${d.color}25` }}
                          >
                            <Icon name={d.icon} size={12} color={d.color} />
                          </div>
                          <div className="truncate">
                            <span className="block text-xs truncate leading-tight">
                              {d.name}
                            </span>
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>

            {/* Quick shortcut to the finale */}
            <button
              onClick={() => handleJump('finale')}
              className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all cursor-pointer flex items-center gap-1 ${
                currentSection === 'finale'
                  ? 'bg-[#D8C19A] text-[#15172B] font-semibold shadow-md'
                  : 'text-[#D8C19A] hover:bg-[#D8C19A]/15'
              }`}
            >
              <span>Celebrate ♡</span>
            </button>
          </nav>

          {/* Right Action Controls: Audio Toggle + Responsive Menu Button */}
          <div className="flex items-center gap-2">
            {/* Audio Toggle Button */}
            <button
              onClick={handleAudioToggle}
              className={`px-3 py-1.5 rounded-full text-xs font-medium flex items-center gap-1.5 transition-all cursor-pointer border ${
                isAudioPlaying
                  ? 'bg-[#D8C19A]/20 text-[#D8C19A] border-[#D8C19A]/40 shadow-sm'
                  : 'bg-white/5 text-[#F4F0EA]/70 hover:text-white border-white/10'
              }`}
              title={isAudioPlaying ? 'Pause birthday song' : 'Play birthday song'}
            >
              <Icon name={isAudioPlaying ? 'volume' : 'volume-x'} size={13} color={isAudioPlaying ? '#D8C19A' : '#B8A9CC'} />
              <span className="hidden sm:inline font-mono text-[11px]">
                {isAudioPlaying ? 'Audio ON' : 'Audio OFF'}
              </span>
            </button>

            {/* Responsive Menu Button for Tablet & Mobile */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center cursor-pointer border border-white/15"
              aria-label="Toggle Navigation Menu"
            >
              <Icon name={isMobileMenuOpen ? 'close' : 'grid'} size={14} color="#D8C19A" />
            </button>
          </div>
        </div>
      </header>

      {/* Responsive Slide-over Menu Overlay for Mobile & Tablet */}
      {isMobileMenuOpen && (
        <div className="memory-mobile-nav lg:hidden fixed inset-0 z-50 animate-fade-in p-5 pt-16 flex flex-col justify-between overflow-y-auto">
          <div>
            <div className="flex items-center justify-between pb-3 mb-4 border-b border-white/10">
              <div>
                <span className="font-serif text-lg text-[#F4F0EA] font-medium block">
                Your memory book
                </span>
                <span className="text-[11px] text-[#D8C19A] font-mono">
                Choose a page to explore
                </span>
              </div>
              <button
                onClick={() => setIsMobileMenuOpen(false)}
                className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center text-white cursor-pointer"
              >
                <Icon name="close" size={16} />
              </button>
            </div>

            {/* World Overview Primary Button */}
            <button
              onClick={() => handleJump('universe')}
              className={`w-full p-3.5 rounded-2xl mb-3 text-left border cursor-pointer flex items-center justify-between ${
                currentSection === 'universe'
                  ? 'bg-gradient-to-r from-[#D8C19A] to-[#D8B5C4] text-[#15172B] font-bold border-white shadow-lg'
                  : 'bg-[#1e1936] text-[#F4F0EA] border-white/10 hover:border-[#D8C19A]/40'
              }`}
            >
              <div className="flex items-center gap-3">
                <Icon name="compass" size={18} color={currentSection === 'universe' ? '#15172B' : '#D8C19A'} />
                <div>
                  <span className="text-sm font-serif block font-semibold">The scrapbook</span>
                  <span className="text-[10px] font-mono opacity-80">Explore 10 memories</span>
                </div>
              </div>
              <span className="text-xs">→</span>
            </button>

            {/* 2-Column Grid for all 10 landmarks */}
            <div className="grid grid-cols-2 gap-2.5">
              {worldLandmarks.map((d) => {
                const isActive = currentSection === d.id;
                return (
                  <button
                    key={d.id}
                    onClick={() => handleJump(d.id)}
                    className={`p-3 rounded-2xl text-left border cursor-pointer transition-all ${
                      isActive
                        ? 'bg-[#30243F] text-[#F4F0EA] border-[#D8C19A] shadow-md scale-102'
                        : 'bg-[#17142a]/80 text-[#F4F0EA] border-white/10 hover:bg-[#201b3b]'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1.5">
                      <div
                        className="w-7 h-7 rounded-xl flex items-center justify-center border border-white/10"
                        style={{ backgroundColor: `${d.color}25` }}
                      >
                        <Icon name={d.icon} size={14} color={d.color} />
                      </div>
                      {d.badge && (
                        <span className="text-[9px] font-mono px-1.5 py-0.5 rounded-full bg-[#D8C19A]/20 text-[#D8C19A]">
                          {d.badge}
                        </span>
                      )}
                    </div>
                    <span className="text-xs font-serif font-medium block mb-0.5 leading-tight">
                      {d.name}
                    </span>
                    <span className="block text-[9px] text-[#B8A9CC] font-mono leading-tight">
                      {d.realm}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          <div className="pt-4 mt-4 border-t border-white/10 text-center text-xs text-[#B8A9CC]/60 font-mono">
            Made with love for {recipient.name}
          </div>
        </div>
      )}
    </>
  );
}
