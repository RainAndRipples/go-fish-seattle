import { useState } from 'react'
import './FishID.css'

const fish = [
  {
    name: 'Rainbow Trout',
    image: '/fish/rainbow-trout.png',
    color: '#e91e8c',
    habitat: 'Lakes & Rivers',
    size: 'Up to 30 inches',
    wikiUrl: 'https://en.wikipedia.org/wiki/Rainbow_trout',
    front: { tagline: 'The most common catch around Seattle!' },
    back: {
      facts: [
        'Has a pink or red stripe down its side',
        'Loves cold, clear water',
        'Jumps out of the water when hooked — exciting!',
        'Stocked in many Seattle-area lakes by WDFW',
      ],
      keepSize: 'Usually 8–12 inches minimum — check local rules',
    },
    credit: {
      author: 'Heqs',
      license: 'Public domain',
      url: 'https://commons.wikimedia.org/wiki/File:Rainbow_trout.png',
    },
  },
  {
    name: 'Yellow Perch',
    image: '/fish/yellow-perch.jpg',
    color: '#f9a825',
    habitat: 'Lakes',
    size: 'Up to 12 inches',
    wikiUrl: 'https://en.wikipedia.org/wiki/Yellow_perch',
    front: { tagline: 'Easy to catch and great for beginners!' },
    back: {
      facts: [
        'Bright yellow with dark vertical stripes',
        'Travels in schools — catch one, catch many!',
        'Bites almost any small bait or lure',
        'One of the tastiest fish to eat',
      ],
      keepSize: 'No minimum size in most WA lakes — check local rules',
    },
    credit: {
      author: 'Afarensis702',
      license: 'CC0',
      url: 'https://commons.wikimedia.org/wiki/File:Perca_flavescens.jpg',
    },
  },
  {
    name: 'Largemouth Bass',
    image: '/fish/largemouth-bass.jpg',
    color: '#388e3c',
    habitat: 'Lakes',
    size: 'Up to 24 inches',
    wikiUrl: 'https://en.wikipedia.org/wiki/Largemouth_bass',
    front: { tagline: 'A fierce fighter on the line!' },
    back: {
      facts: [
        'Has a huge mouth that opens wide',
        'Dark greenish body with a black stripe',
        'Hides near weeds, logs, and docks',
        'Jumps and thrashes when caught — hold on!',
      ],
      keepSize: 'Usually 12 inches minimum — check local rules',
    },
    credit: {
      author: 'Duane Raver / USFWS',
      license: 'Public domain',
      url: 'https://commons.wikimedia.org/wiki/File:Micropterus_salmoides.jpg',
    },
  },
  {
    name: 'Coho Salmon',
    image: '/fish/coho-salmon.jpg',
    color: '#c62828',
    habitat: 'Puget Sound & Rivers',
    size: 'Up to 36 inches',
    wikiUrl: 'https://en.wikipedia.org/wiki/Coho_salmon',
    front: { tagline: "Washington's famous silver fish!" },
    back: {
      facts: [
        'Also called "silver salmon" — bright silver sides',
        'Runs from the ocean into rivers to lay eggs',
        'Caught off piers in late summer and fall',
        'Kids need a catch record card for salmon — ask a grown-up!',
      ],
      keepSize: 'Check WDFW — seasons and limits change yearly',
    },
    credit: {
      author: 'Afarensis702',
      license: 'CC0',
      url: 'https://commons.wikimedia.org/wiki/File:Oncorhynchus_kisutch.jpg',
    },
  },
  {
    name: 'Cutthroat Trout',
    image: '/fish/cutthroat-trout.jpg',
    color: '#d84315',
    habitat: 'Lakes, Rivers & Puget Sound',
    size: 'Up to 20 inches',
    wikiUrl: 'https://en.wikipedia.org/wiki/Cutthroat_trout',
    front: { tagline: 'Named for the red slash under its jaw!' },
    back: {
      facts: [
        'Look for a red or orange slash under the chin',
        'Some live in lakes, some swim in saltwater too',
        'Native to the Pacific Northwest',
        'Often caught at Puget Sound piers in winter',
      ],
      keepSize: 'Usually 14 inches minimum — check local rules',
    },
    credit: {
      author: 'U.S. Fish Commission, 1906',
      license: 'Public domain',
      url: 'https://commons.wikimedia.org/wiki/File:Oncorhynchus_clarkii_clarkii.jpg',
    },
  },
  {
    name: 'Bluegill',
    image: '/fish/bluegill.jpg',
    color: '#1565c0',
    habitat: 'Lakes',
    size: 'Up to 10 inches',
    wikiUrl: 'https://en.wikipedia.org/wiki/Bluegill',
    front: { tagline: 'Small, colorful, and super fun to catch!' },
    back: {
      facts: [
        'Has a bright blue patch on its gill cover',
        'Round, flat body — looks like a big coin',
        'Will bite a tiny worm almost every time',
        'Perfect first fish for beginners',
      ],
      keepSize: 'No minimum size in most WA lakes — check local rules',
    },
    credit: {
      author: 'NOAA',
      license: 'Public domain',
      url: 'https://commons.wikimedia.org/wiki/File:Lepomis_macrochirus.jpg',
    },
  },
]

function FishCard({ fish: f }) {
  const [flipped, setFlipped] = useState(false)

  return (
    <div
      className="fish-card-scene"
      onClick={() => setFlipped(v => !v)}
      role="button"
      tabIndex={0}
      aria-label={`${f.name} — tap to flip`}
      onKeyDown={e => e.key === 'Enter' && setFlipped(v => !v)}
    >
      <div className={`fish-card-inner ${flipped ? 'is-flipped' : ''}`}>
        {/* Front */}
        <div className="fish-card-face fish-card-front" style={{ '--accent': f.color }}>
          <div className="fish-card-photo-wrapper">
            <img className="fish-card-photo" src={f.image} alt={f.name} />
          </div>
          <div className="fish-card-info">
            <h2 className="fish-card-name">{f.name}</h2>
            <p className="fish-card-tagline">{f.front.tagline}</p>
            <div className="fish-card-meta">
              <span>📍 {f.habitat}</span>
              <span>📏 {f.size}</span>
            </div>
          </div>
          <div className="fish-card-hint">Tap to flip! 👆</div>
        </div>

        {/* Back */}
        <div className="fish-card-face fish-card-back" style={{ '--accent': f.color }}>
          <h2 className="fish-card-name">{f.name}</h2>
          <ul className="fish-facts">
            {f.back.facts.map(fact => (
              <li key={fact}>✅ {fact}</li>
            ))}
          </ul>
          <div className="fish-keep">
            ⚖️ <strong>Keep size:</strong> {f.back.keepSize}
          </div>
          <a
            className="fish-wiki-link"
            href={f.wikiUrl}
            target="_blank"
            rel="noopener noreferrer"
            onClick={e => e.stopPropagation()}
          >
            Learn more on Wikipedia →
          </a>
          <div className="fish-card-hint">Tap to flip back 👆</div>
        </div>
      </div>
    </div>
  )
}

export default function FishID() {
  return (
    <div className="page fish-id-page">
      <h1 className="fish-id-title">🐟 Fish ID</h1>
      <p className="fish-id-intro">Tap a card to learn more about each fish!</p>

      <div className="fish-grid">
        {fish.map(f => <FishCard key={f.name} fish={f} />)}
      </div>

      <div className="fish-wdfw-note">
        <span aria-hidden="true">⚠️</span>
        <p>
          Keep sizes and catch limits change. Always check{' '}
          <a href="https://wdfw.wa.gov" target="_blank" rel="noopener noreferrer">
            wdfw.wa.gov
          </a>{' '}
          with a grown-up before keeping any fish!
        </p>
      </div>

      <section className="fish-credits">
        <h2 className="fish-credits-title">Image Credits</h2>
        <ul className="fish-credits-list">
          {fish.map(f => (
            <li key={f.name}>
              <strong>{f.name}:</strong>{' '}
              <a href={f.credit.url} target="_blank" rel="noopener noreferrer">
                {f.credit.author}
              </a>
              {' '}— {f.credit.license} via Wikimedia Commons
            </li>
          ))}
        </ul>
      </section>
    </div>
  )
}
