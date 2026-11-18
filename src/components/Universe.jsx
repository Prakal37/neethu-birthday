import { useState } from 'react';
import { birthdayData } from '../data/birthdayData';
import { playSparkle } from '../utils/soundEffects';
import { Icon } from './Icons';

const destinationDetails = {
  story: { title: 'Life Journey', label: '01 · THE STORY SO FAR', note: 'Little moments, big chapters.' },
  gallery: { title: 'Memory Gallery', label: '02 · SNAPSHOTS', note: 'A few favorite moments, kept close.' },
  pinata: { title: 'Birthday Piñata', label: '03 · A LITTLE SURPRISE', note: 'Tap to open your birthday treat.' },
  hunt: { title: 'Treasure Hunt', label: '04 · FOLLOW THE CLUES', note: 'A tiny adventure with a lovely ending.' },
  achievements: { title: 'Achievement Room', label: '05 · ALL THE THINGS YOU DO', note: 'Celebrating every milestone and more.' },
  wishes: { title: 'Wishes From Loved Ones', label: '06 · NOTES FROM YOUR PEOPLE', note: 'Warm words from the ones who love you.' },
  quiz: { title: 'Memory Quiz', label: '07 · HOW WELL DO YOU REMEMBER?', note: 'A little quiz about your shared stories.' },
  secret: { title: 'Secret Message', label: '08 · JUST BETWEEN US', note: 'There is a note waiting to be opened.' },
  letter: { title: 'Birthday Letter', label: '09 · PEN TO PAPER', note: 'A personal letter, saved just for you.' },
  finale: { title: 'Grand Finale', label: '10 · ONE MORE CELEBRATION', note: 'Let’s finish with a birthday toast.' },
};

export default function Universe({ onNavigate }) {
  const { destinations, recipient } = birthdayData;
  const [hoveredId, setHoveredId] = useState(null);

  const handleEnter = (id) => {
    playSparkle();
    onNavigate(id);
  };

  return (
    <div className="memory-hub">
      <div className="hub-ornament hub-ornament--one" aria-hidden="true" />
      <div className="hub-ornament hub-ornament--two" aria-hidden="true" />

      <header className="hub-heading">
        <span className="hub-eyebrow"><span>♡</span> A scrapbook made for {recipient.name}</span>
        <h1>Her Little World<br /><em>of Memories</em></h1>
        <p>Ten little places to wander, remember, laugh, and celebrate you.</p>
        <span className="hub-count">{destinations.length} pages · one very special birthday</span>
      </header>

      <section className="hub-scrapbook" aria-label="Birthday destinations">
        <div className="hub-grid">
          {destinations.map((destination, index) => {
            const details = destinationDetails[destination.id];
            const isHovered = hoveredId === destination.id;
            return (
              <button
                type="button"
                key={destination.id}
                onMouseEnter={() => setHoveredId(destination.id)}
                onMouseLeave={() => setHoveredId(null)}
                onFocus={() => setHoveredId(destination.id)}
                onBlur={() => setHoveredId(null)}
                onClick={() => handleEnter(destination.id)}
                className={`hub-card hub-card--${index + 1} ${isHovered ? 'is-hovered' : ''}`}
              >
                <span className="hub-card-tape" aria-hidden="true" />
                <span className="hub-card-number">{String(index + 1).padStart(2, '0')}</span>
                {destination.badge && <span className="hub-card-badge">{destination.badge}</span>}
                <span className="hub-card-art" aria-hidden="true">
                  <span className="hub-card-art-circle" />
                  <Icon name={destination.icon} size={29} color="var(--color-rose-accent)" />
                  <span className="hub-card-art-mark">♡</span>
                </span>
                <span className="hub-card-label">{details.label}</span>
                <span className="hub-card-title">{details.title}</span>
                <span className="hub-card-note">{details.note}</span>
                <span className="hub-card-open">Open this page <Icon name="arrow-right" size={14} color="currentColor" /></span>
              </button>
            );
          })}
        </div>
        <p className="hub-footer-note">Made with love, page by page <span>♡</span></p>
      </section>
    </div>
  );
}
