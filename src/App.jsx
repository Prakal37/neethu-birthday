import { useState, useEffect } from 'react';
import Navigation from './components/Navigation';
import Welcome from './components/Welcome';
import Universe from './components/Universe';
import StoryJourney from './components/StoryJourney';
import MemoryGallery from './components/MemoryGallery';
import Pinata from './components/Pinata';
import TreasureHunt from './components/TreasureHunt';
import AchievementRoom from './components/AchievementRoom';
import WishesRoom from './components/WishesRoom';
import MemoryQuiz from './components/MemoryQuiz';
import SecretMessage from './components/SecretMessage';
import BirthdayLetter from './components/BirthdayLetter';
import Finale from './components/Finale';

// Sections that use full-viewport canvas rendering — no Starfield, no footer needed
const FULLSCREEN_SECTIONS = ['welcome'];
// Sections that show the navigation bar
const NAV_SECTIONS = ['universe', 'story', 'gallery', 'pinata', 'hunt', 'achievements', 'wishes', 'quiz', 'secret', 'letter', 'finale'];

export default function App() {
  const [currentSection, setCurrentSection] = useState('welcome');

  // Scroll to top when section changes (not for fullscreen sections)
  useEffect(() => {
    if (!FULLSCREEN_SECTIONS.includes(currentSection)) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, [currentSection]);

  const handleNavigate = (sectionId) => {
    setCurrentSection(sectionId);
  };

  const isFullscreen = FULLSCREEN_SECTIONS.includes(currentSection);
  const showNav = NAV_SECTIONS.includes(currentSection);
  const showFooter = !isFullscreen;

  return (
    <div
      className="relative min-h-screen bg-[#FFF9F5] text-[#4B1D27] font-sans overflow-x-hidden selection:bg-[#E09ABA] selection:text-[#4B1D27]"
      style={{ overflowY: isFullscreen ? 'hidden' : 'auto' }}
    >

      {/* Global Navigation Bar (visible in all non-welcome sections) */}
      {showNav && (
        <Navigation
          currentSection={currentSection}
          onNavigate={handleNavigate}
        />
      )}

      {/* Main View Router */}
      <main
        className="relative w-full"
        style={{
          zIndex: 10,
          minHeight: isFullscreen ? '100vh' : undefined,
        }}
      >
        {/* ── CINEMATIC OPENING ───────────────────────────────── */}
        {/* The Welcome section is fullscreen; Starfield is hidden during it */}
        {currentSection === 'welcome' && (
          <Welcome onEnter={() => handleNavigate('universe')} />
        )}

        {/* ── 2D DESTINATIONS HUB ──────────────────────────────── */}
        {currentSection === 'universe' && (
          <Universe onNavigate={handleNavigate} />
        )}

        {/* ── THE 10 DESTINATIONS ─────────────────────────────── */}
        {currentSection === 'story' && (
          <StoryJourney onBack={() => handleNavigate('universe')} />
        )}

        {currentSection === 'gallery' && (
          <MemoryGallery onBack={() => handleNavigate('universe')} />
        )}

        {currentSection === 'pinata' && (
          <Pinata onBack={() => handleNavigate('universe')} />
        )}

        {currentSection === 'hunt' && (
          <TreasureHunt onBack={() => handleNavigate('universe')} />
        )}

        {currentSection === 'achievements' && (
          <AchievementRoom onBack={() => handleNavigate('universe')} />
        )}

        {currentSection === 'wishes' && (
          <WishesRoom onBack={() => handleNavigate('universe')} />
        )}

        {currentSection === 'quiz' && (
          <MemoryQuiz onBack={() => handleNavigate('universe')} />
        )}

        {currentSection === 'secret' && (
          <SecretMessage onBack={() => handleNavigate('universe')} />
        )}

        {currentSection === 'letter' && (
          <BirthdayLetter onBack={() => handleNavigate('universe')} />
        )}

        {currentSection === 'finale' && (
          <Finale
            onRestart={() => handleNavigate('universe')}
            onBack={() => handleNavigate('universe')}
          />
        )}

        {/* Global Luxury Footer (shown on destination pages only) */}
        {showFooter && (
          <footer className="w-full py-6 text-center text-xs text-[#9A4454]/60 relative z-20 border-t border-[rgba(224,154,186,0.3)] bg-[#FFF9F5]/90 backdrop-blur-md">
            <div className="flex items-center justify-center gap-2 mb-1">
              <span>A bespoke digital keepsake crafted with love 💖</span>
            </div>
            <p className="text-[11px] text-[#D8C19A]/70 font-mono tracking-wider">
              Memory Lane V2 • A Birthday Story for Astra
            </p>
          </footer>
        )}
      </main>
    </div>
  );
}
