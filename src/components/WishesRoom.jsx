import { useState } from 'react';
import { birthdayData } from '../data/birthdayData';
import { playSparkle } from '../utils/soundEffects';
import { triggerConfetti } from '../utils/confetti';
import { Icon } from './Icons';
import ImageWithFallback from './ImageWithFallback';

export default function WishesRoom({ onBack }) {
  const { wishes, videoWishes, recipient } = birthdayData;
  const [filter, setFilter] = useState('all');
  const [lovedWishes, setLovedWishes] = useState({});
  const [activeVideo, setActiveVideo] = useState(null);
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);

  const handleLoveWish = (id) => {
    playSparkle();
    setLovedWishes((prev) => ({ ...prev, [id]: !prev[id] }));
    triggerConfetti({
      particleCount: 22,
      origin: { x: 0.5, y: 0.6 },
      colors: ['#D8C19A', '#D8B5C4', '#F4F0EA'],
      speed: 6,
      spread: 100,
    });
  };

  const filteredWishes =
    filter === 'all'
      ? wishes
      : wishes.filter((w) => w.relation === filter);

  return (
    <div className="destination-page destination-page--wishes min-h-screen w-full pt-20 pb-28 px-4 sm:px-6 relative z-10 flex flex-col items-center">
      
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
          <span className="text-xs text-[#D8B5C4] font-mono uppercase tracking-wider">
            Warmth From Those Who Cherish You
          </span>
        </div>
      </div>

      {/* Main Title */}
      <div className="text-center max-w-2xl mx-auto mb-8">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#30243F]/70 border border-[rgba(216,181,196,0.35)] text-xs text-[#D8B5C4] tracking-widest uppercase mb-3 shadow-sm">
          <Icon name="heart" size={13} color="#D8B5C4" />
          <span>CELESTIAL WISHES ARCHIVE</span>
        </div>

        <h1 className="font-serif text-3xl sm:text-4xl text-[#F4F0EA] font-medium mb-2">
          Messages For {recipient.name}
        </h1>
        <p className="font-story text-sm sm:text-base text-[#F4F0EA]/80 max-w-lg mx-auto">
          Warm wishes, candid greetings, and deep appreciation from the people who love you most.
        </p>

        {/* Filter Pills */}
        <div className="flex flex-wrap items-center justify-center gap-2 mt-6">
          {[
            { id: 'all', label: 'All Wishes' },
            { id: 'family', label: 'Parents & Family' },
            { id: 'siblings', label: 'Siblings' },
            { id: 'friends', label: 'Best Friends' },
            { id: 'video', label: 'Video Wishes 🎬' },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => { setFilter(tab.id); playSparkle(); }}
              className={`px-4 py-1.5 rounded-full text-xs font-medium tracking-wide transition-all cursor-pointer ${
                filter === tab.id
                  ? 'bg-gradient-to-r from-[#D8C19A] to-[#D8B5C4] text-[#15172B] font-semibold shadow-md'
                  : 'bg-[#1c1733]/70 text-[#F4F0EA]/75 hover:text-white border border-[rgba(216,193,154,0.2)]'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* SECTION: WRITTEN WISHES */}
      {filter !== 'video' && (
        <div className="w-full max-w-4xl grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
          {filteredWishes.map((w) => {
            const isLoved = !!lovedWishes[w.id];

            return (
              <div
                key={w.id}
                className="group relative p-6 sm:p-7 rounded-3xl bg-[#1c1733]/65 backdrop-blur-xl border border-[rgba(216,193,154,0.22)] hover:border-[rgba(216,181,196,0.6)] transition-all duration-300 shadow-xl flex flex-col justify-between"
              >
                <div>
                  {/* Sender Header */}
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-2xl bg-[#30243F] border border-[rgba(216,193,154,0.35)] flex items-center justify-center text-xl shadow-md">
                        {w.avatar || '🌸'}
                      </div>
                      <div>
                        <h3 className="font-serif text-lg font-medium text-[#F4F0EA]">
                          {w.sender}
                        </h3>
                        <span className="text-[11px] text-[#D8C19A] font-mono">
                          {w.tag}
                        </span>
                      </div>
                    </div>

                    <button
                      onClick={() => handleLoveWish(w.id)}
                      className={`w-9 h-9 rounded-full flex items-center justify-center transition-all cursor-pointer ${
                        isLoved
                          ? 'bg-[#D8B5C4] text-[#15172B] scale-108 shadow-md'
                          : 'bg-white/10 text-[#F4F0EA]/60 hover:text-[#D8B5C4]'
                      }`}
                      title="Send love"
                    >
                      <Icon name="heart" size={15} color={isLoved ? '#15172B' : 'currentColor'} />
                    </button>
                  </div>

                  {/* Message */}
                  <p className="font-story text-base sm:text-lg text-[#F4F0EA]/90 italic leading-relaxed mb-4">
                    &ldquo;{w.message}&rdquo;
                  </p>
                </div>

                <div className="pt-3 border-t border-white/10 flex items-center justify-between text-[11px] text-[#B8A9CC]/75 font-mono">
                  <span>{w.date}</span>
                  <span className="text-[#D8C19A]">{isLoved ? 'Love returned ❤️' : 'Tap heart to return love'}</span>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* SECTION: VIDEO WISHES */}
      {(filter === 'video' || filter === 'all') && (
        <div className="w-full max-w-4xl mt-2">
          <div className="text-center mb-6">
            <span className="text-xs text-[#D8C19A] uppercase tracking-widest font-mono">
              SPECIAL RECORDED GREETINGS
            </span>
            <h2 className="font-serif text-2xl text-[#F4F0EA] font-medium mt-1">
              Video & Audio Messages 🎥
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {videoWishes.map((vid) => (
              <div
                key={vid.id}
                onClick={() => {
                  setActiveVideo(vid);
                  setIsVideoPlaying(true);
                  playSparkle();
                }}
                className="group relative p-4 rounded-3xl bg-[#1c1733]/65 backdrop-blur-xl border border-[rgba(216,193,154,0.25)] hover:border-[#D8C19A] transition-all duration-300 shadow-xl cursor-pointer hover:-translate-y-1"
              >
                {/* Video Card Thumbnail */}
                <div className="relative rounded-2xl overflow-hidden mb-4 bg-black/60 aspect-video flex items-center justify-center border border-white/10">
                  <ImageWithFallback
                    src={vid.thumbnail}
                    alt={vid.sender}
                    title={vid.sender}
                    type="video"
                    aspectRatio="16/9"
                  />

                  {/* Play Button Overlay */}
                  <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-all flex items-center justify-center">
                    <div className="w-14 h-14 rounded-full bg-gradient-to-tr from-[#D8C19A] to-[#D8B5C4] text-[#15172B] flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                      <Icon name="play" size={20} color="#15172B" />
                    </div>
                  </div>

                  {/* Duration Tag */}
                  <span className="absolute bottom-2 right-2 px-2 py-0.5 rounded-md text-[10px] font-mono bg-black/75 text-white backdrop-blur-sm">
                    {vid.duration}
                  </span>
                </div>

                <div className="px-2">
                  <span className="text-[10px] uppercase font-mono tracking-wider text-[#D8C19A] block mb-1">
                    {vid.relation}
                  </span>
                  <h3 className="font-serif text-lg font-medium text-[#F4F0EA] mb-1 group-hover:text-[#D8C19A] transition-colors">
                    {vid.sender}
                  </h3>
                  <p className="font-story text-sm text-[#F4F0EA]/75 line-clamp-2">
                    {vid.caption}
                  </p>
                </div>

                <div className="mt-4 pt-3 border-t border-white/10 flex items-center justify-between text-xs text-[#D8C19A]">
                  <span className="font-mono text-[11px] uppercase tracking-wider">Watch Message</span>
                  <Icon name="play" size={13} color="#D8C19A" />
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* VIDEO PLAYER MODAL */}
      {activeVideo && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-fade-in">
          <div className="relative max-w-2xl w-full bg-[#1b162e] border border-[rgba(216,193,154,0.4)] rounded-3xl p-6 sm:p-8 shadow-2xl text-[#F4F0EA]">
            
            <button
              onClick={() => {
                setActiveVideo(null);
                setIsVideoPlaying(false);
              }}
              className="absolute top-4 right-4 w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-all cursor-pointer"
            >
              <Icon name="close" size={17} />
            </button>

            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#30243F] text-[#D8C19A] text-xs font-mono mb-3 border border-[rgba(216,193,154,0.25)]">
              <span>{activeVideo.relation}</span>
              <span>•</span>
              <span>{activeVideo.duration}</span>
            </div>

            <h2 className="font-serif text-2xl text-[#F4F0EA] font-medium mb-1">
              {activeVideo.sender}
            </h2>
            <p className="font-story text-sm text-[#F4F0EA]/80 mb-4">
              {activeVideo.caption}
            </p>

            {/* Video Container */}
            <div className="relative rounded-2xl overflow-hidden aspect-video bg-black flex flex-col items-center justify-center border border-white/10 mb-4">
              {activeVideo.videoUrl ? (
                <video
                  src={activeVideo.videoUrl}
                  controls
                  autoPlay={isVideoPlaying}
                  className="w-full h-full object-contain"
                />
              ) : (
                <div className="w-full h-full p-6 flex flex-col items-center justify-center text-center bg-gradient-to-tr from-[#1b1730] via-[#281e42] to-[#151329]">
                  {/* Pulsing Champagne Soundwaves */}
                  <div className="flex items-center gap-1.5 h-12 mb-4">
                    {[16, 32, 48, 24, 40, 20, 36, 18, 44, 28].map((h, i) => (
                      <div
                        key={i}
                        className="w-1.5 bg-gradient-to-t from-[#D8C19A] to-[#D8B5C4] rounded-full animate-pulse"
                        style={{
                          height: isVideoPlaying ? `${h}px` : '8px',
                          animationDelay: `${i * 0.1}s`,
                        }}
                      />
                    ))}
                  </div>

                  <p className="font-story text-base sm:text-lg text-[#D8C19A] italic max-w-md mb-2">
                    {activeVideo.quote}
                  </p>

                  <span className="text-[11px] text-[#B8A9CC]/70 font-mono max-w-sm leading-relaxed">
                    Place your real <code className="text-[#D8C19A]">.mp4</code> in <code className="text-[#F4F0EA]">public/videos/</code> and update <code className="text-[#D8B5C4]">birthdayData.videoWishes</code>
                  </span>
                </div>
              )}
            </div>

            <div className="text-center">
              <button
                onClick={() => {
                  setActiveVideo(null);
                  setIsVideoPlaying(false);
                }}
                className="px-6 py-2 rounded-full bg-gradient-to-r from-[#D8C19A] to-[#D8B5C4] text-[#15172B] text-xs font-semibold uppercase tracking-wider cursor-pointer font-sans"
              >
                Close Video Greeting
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
