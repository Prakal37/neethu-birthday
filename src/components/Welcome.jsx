import { useEffect, useState } from 'react';
import { birthdayData } from '../data/birthdayData';
import { playSparkle } from '../utils/soundEffects';
import { triggerConfetti } from '../utils/confetti';
import { Icon } from './Icons';

export default function Welcome({ onEnter }) {
  const { recipient } = birthdayData;
  const [phase, setPhase] = useState(0);
  const [isEntering, setIsEntering] = useState(false);

  useEffect(() => {
    const timers = [
      setTimeout(() => setPhase(1), 250),
      setTimeout(() => setPhase(2), 900),
      setTimeout(() => setPhase(3), 1550),
    ];
    return () => timers.forEach(clearTimeout);
  }, []);

  const handleEnterClick = () => {
    playSparkle();
    setIsEntering(true);
    triggerConfetti({
      particleCount: 90,
      origin: { x: 0.5, y: 0.45 },
      speed: 12,
      spread: 260,
    });
    setTimeout(() => onEnter(), 650);
  };

  return (
    <main className={`welcome-screen ${isEntering ? 'welcome-screen--leaving' : ''}`}>
      <div className="welcome-paper" aria-hidden="true">
        <span className="welcome-tape" />
        <img
          src="/images/neethu-recent.jpg"
          alt="Neethu"
          className="welcome-paper-photo"
        />
        <span className="welcome-paper-heart">♡</span>
        <div className="welcome-seal">
          <span>For you</span>
          <span className="welcome-seal-heart">♥</span>
        </div>
        <span className="welcome-caption">a day to celebrate you</span>
      </div>

      <div className={`welcome-copy ${phase >= 1 ? 'is-visible' : ''}`}>
        <span className="welcome-eyebrow">
          <span className="welcome-eyebrow-dot" />
          {recipient.birthdayDate} · a little birthday keepsake
        </span>
        <p className="welcome-kicker">With love, for</p>
        <h1 className="welcome-title">
          Happy Birthday,
          <span>{recipient.name}</span>
        </h1>
        <div className="welcome-divider"><span>♡</span></div>
        <p className={`welcome-message ${phase >= 2 ? 'is-visible' : ''}`}>
          A birthday story, made just for you.
        </p>
        <div className={`welcome-action ${phase >= 3 ? 'is-visible' : ''}`}>
          <p>Every page holds a little piece of your story.</p>
          <button type="button" onClick={handleEnterClick} className="welcome-button">
            <Icon name="sparkles" size={18} color="currentColor" />
            <span>Open your story</span>
            <Icon name="arrow-right" size={18} color="currentColor" />
          </button>
        </div>
      </div>

      <span className="welcome-corner-note" aria-hidden="true">made with love</span>
    </main>
  );
}
