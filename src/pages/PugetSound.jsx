import { useState, useEffect } from 'react'
import { Helmet } from 'react-helmet-async'
import './PugetSound.css'

const SITE = 'https://go-fish-seattle.vercel.app'
const TIDE_STATION = '9447130' // NOAA Seattle

function getTodayStr(offset = 0) {
  const d = new Date()
  d.setDate(d.getDate() + offset)
  return `${d.getFullYear()}${String(d.getMonth() + 1).padStart(2, '0')}${String(d.getDate()).padStart(2, '0')}`
}

function fmt12(timeStr) {
  const [, hh, mm] = timeStr.match(/(\d{2}):(\d{2})/)
  const h = parseInt(hh, 10)
  const ampm = h >= 12 ? 'pm' : 'am'
  const h12 = h % 12 || 12
  return `${h12}:${mm} ${ampm}`
}

const PIER_SPOTS = [
  {
    id: 'edmonds-pier',
    name: 'Edmonds Fishing Pier',
    city: 'Edmonds',
    emoji: '⚓',
    species: ['Rockfish', 'Perch', 'Flounder', 'Salmon (seasonal)'],
    facilities: ['parking', 'restrooms', 'pier'],
    bestFor: 'Classic first saltwater pier — free, safe railings, and great views of the Olympics',
    parentInfo: { parking: 'Free parking next to the ferry terminal on Admiral Way.', bathrooms: 'Yes — near the parking area.' },
    tip: 'No fishing license needed for kids under 15! A simple jig or bait off the side works great.',
    googleMapsUrl: 'https://www.google.com/maps/search/?api=1&query=Edmonds+Fishing+Pier+Edmonds+WA',
    wdfwUrl: 'https://wdfw.wa.gov/fishing/locations/marine/edmonds-underwater-park',
  },
  {
    id: 'pier-86',
    name: 'Pier 86 — Myrtle Edwards',
    city: 'Seattle (Interbay)',
    emoji: '🌉',
    species: ['Salmon (seasonal)', 'Perch', 'Rockfish', 'Cutthroat Trout'],
    facilities: ['parking', 'restrooms', 'pier'],
    bestFor: 'Free public pier with stunning views of Elliott Bay and the Olympic Mountains',
    parentInfo: { parking: 'Free parking at the Interbay athletic complex nearby.', bathrooms: 'Restrooms at Myrtle Edwards Park, a short walk north.' },
    tip: 'Best during salmon season in late summer and fall. Check WDFW for current openings!',
    googleMapsUrl: 'https://www.google.com/maps/search/?api=1&query=Pier+86+Myrtle+Edwards+Park+Seattle+WA',
    wdfwUrl: 'https://wdfw.wa.gov/fishing/regulations',
  },
  {
    id: 'seacrest-pier',
    name: 'Seacrest Fishing Pier',
    city: 'West Seattle',
    emoji: '🌁',
    species: ['Rockfish', 'Perch', 'Salmon (seasonal)', 'Flounder'],
    facilities: ['parking', 'restrooms', 'pier'],
    bestFor: 'Kids love the view of downtown Seattle across the bay — great even on slow fishing days',
    parentInfo: { parking: 'Paid street parking on Harbor Ave SW; some free spots nearby.', bathrooms: 'Yes — at the park.' },
    tip: 'Try small jigs or shrimp bait near the pilings for rockfish. Bring a headlamp for dawn trips!',
    googleMapsUrl: 'https://www.google.com/maps/search/?api=1&query=Seacrest+Park+Fishing+Pier+West+Seattle+WA',
    wdfwUrl: 'https://wdfw.wa.gov/fishing/regulations',
  },
  {
    id: 'des-moines-pier',
    name: 'Des Moines Marina Fishing Pier',
    city: 'Des Moines',
    emoji: '🚢',
    species: ['Rockfish', 'Perch', 'Flounder', 'Salmon (seasonal)'],
    facilities: ['parking', 'restrooms', 'pier', 'picnic'],
    bestFor: 'Calm, sheltered marina setting — one of the most beginner-friendly saltwater piers around',
    parentInfo: { parking: 'Free parking at the marina.', bathrooms: 'Yes — at the marina.' },
    tip: 'The pier is right next to the marina — very calm water. Great for nervous first-timers!',
    googleMapsUrl: 'https://www.google.com/maps/search/?api=1&query=Des+Moines+Marina+Fishing+Pier+WA',
    wdfwUrl: 'https://wdfw.wa.gov/fishing/regulations',
  },
  {
    id: 'redondo-pier',
    name: 'Redondo Waterfront Park',
    city: 'Des Moines',
    emoji: '🪨',
    species: ['Rockfish', 'Perch', 'Flounder', 'Lingcod'],
    facilities: ['parking', 'restrooms', 'pier'],
    bestFor: 'Less crowded than the bigger piers — good rocky bottom for rockfish near the pilings',
    parentInfo: { parking: 'Free parking at the park.', bathrooms: 'Yes — at the park.' },
    tip: 'Drop a jig straight down next to the pilings — rockfish love hiding there!',
    googleMapsUrl: 'https://www.google.com/maps/search/?api=1&query=Redondo+Waterfront+Park+Des+Moines+WA',
    wdfwUrl: 'https://wdfw.wa.gov/fishing/regulations',
  },
]

const BEACH_SPOTS = [
  {
    id: 'saltwater-sp',
    name: 'Saltwater State Park',
    city: 'Des Moines',
    emoji: '🏝️',
    species: ['Perch', 'Flounder', 'Salmon (seasonal)'],
    facilities: ['parking', 'restrooms', 'picnic'],
    bestFor: 'Beach fishing plus tide pools full of crabs and sea stars — double the fun!',
    parentInfo: { parking: 'Discover Pass required. Pay at the gate or buy at discoverpass.wa.gov.', bathrooms: 'Yes — full restrooms at the park.' },
    tip: 'Cast from the beach at high tide when fish come in closer to shore. Explore tide pools at low tide!',
    googleMapsUrl: 'https://www.google.com/maps/search/?api=1&query=Saltwater+State+Park+Des+Moines+WA',
    wdfwUrl: 'https://wdfw.wa.gov/fishing/regulations',
  },
  {
    id: 'lincoln-park',
    name: 'Lincoln Park',
    city: 'West Seattle',
    emoji: '🌲',
    species: ['Perch', 'Rockfish', 'Cutthroat Trout'],
    facilities: ['parking', 'restrooms', 'playground', 'picnic'],
    bestFor: 'Beautiful forested park with a rocky shoreline and tide pools — a whole adventure in one place',
    parentInfo: { parking: 'Free parking at the main lot off Fauntleroy Way SW.', bathrooms: 'Yes — at the park.' },
    tip: 'Walk the shoreline at low tide and fish from the rocks. Bring good shoes — the rocks can be slippery!',
    googleMapsUrl: 'https://www.google.com/maps/search/?api=1&query=Lincoln+Park+West+Seattle+WA',
    wdfwUrl: 'https://wdfw.wa.gov/fishing/regulations',
  },
  {
    id: 'dash-point-sp',
    name: 'Dash Point State Park',
    city: 'Federal Way',
    emoji: '🏕️',
    species: ['Perch', 'Flounder', 'Rockfish'],
    facilities: ['parking', 'restrooms', 'picnic'],
    bestFor: 'Long sandy beach, great tide pools, and some of the best clamming access in King County',
    parentInfo: { parking: 'Discover Pass required.', bathrooms: 'Yes — at the park.' },
    tip: 'Great for both fishing AND clamming (when the beach is open — always check DOH first!).',
    googleMapsUrl: 'https://www.google.com/maps/search/?api=1&query=Dash+Point+State+Park+Federal+Way+WA',
    wdfwUrl: 'https://wdfw.wa.gov/fishing/regulations',
  },
]

const SHELLFISH_BEACHES = [
  {
    id: 'dash-point-clams',
    name: 'Dash Point State Park',
    city: 'Federal Way',
    emoji: '🦪',
    whatYouMightFind: ['Manila Clams', 'Littleneck Clams', 'Oysters'],
    tip: 'One of the most accessible shellfish beaches near Seattle — but always check DOH before you go!',
    googleMapsUrl: 'https://www.google.com/maps/search/?api=1&query=Dash+Point+State+Park+Federal+Way+WA',
  },
  {
    id: 'seahurst-park',
    name: 'Seahurst Park',
    city: 'Burien',
    emoji: '🌊',
    whatYouMightFind: ['Manila Clams', 'Littleneck Clams'],
    tip: 'Nice beach with good low-tide access — check the DOH map for your section of beach.',
    googleMapsUrl: 'https://www.google.com/maps/search/?api=1&query=Seahurst+Park+Burien+WA',
  },
]

const FACILITY_ICONS = {
  restrooms: { icon: '🚻', label: 'Restrooms' },
  parking:   { icon: '🅿️', label: 'Parking' },
  playground:{ icon: '🛝', label: 'Playground' },
  pier:      { icon: '🎣', label: 'Fishing pier' },
  picnic:    { icon: '🧺', label: 'Picnic area' },
}

function TideBanner() {
  const [tides, setTides] = useState(null)
  const [error, setError] = useState(false)

  useEffect(() => {
    const today = getTodayStr()
    const tomorrow = getTodayStr(1)
    fetch(
      `https://api.tidesandcurrents.noaa.gov/api/prod/datagetter` +
      `?station=${TIDE_STATION}&product=predictions&datum=MLLW` +
      `&time_zone=lst_ldt&units=english&interval=hilo&format=json` +
      `&begin_date=${today}&end_date=${tomorrow}`
    )
      .then(r => r.json())
      .then(data => {
        if (!data.predictions) { setError(true); return }
        const now = new Date()
        const future = data.predictions.filter(p => new Date(p.t) > now)
        setTides(future.slice(0, 2))
      })
      .catch(() => setError(true))
  }, [])

  if (error || !tides) return null

  const next = tides[0]
  const isHigh = next.type === 'H'
  const tip = isHigh
    ? 'Great time for pier fishing — fish come in close to shore at high tide!'
    : 'Good time for tide pools and clamming — low tide reveals the beach!'

  return (
    <div className={`tide-banner tide-banner--${isHigh ? 'high' : 'low'}`}>
      <span className="tide-icon" aria-hidden="true">{isHigh ? '🌊' : '🐚'}</span>
      <div>
        <strong>Next {isHigh ? 'High' : 'Low'} Tide: {fmt12(next.t)}</strong>
        <p>{tip}</p>
      </div>
    </div>
  )
}

function SpotCard({ spot, type }) {
  return (
    <div className="spot-card sound-card">
      <div className={`spot-header spot-header--${type}`}>
        <span className="spot-emoji" aria-hidden="true">{spot.emoji}</span>
        <div className="spot-header-text">
          <h3 className="spot-name">{spot.name}</h3>
          <span className="spot-location">📌 {spot.city}</span>
        </div>
      </div>
      <div className="spot-body">
        <div>
          <p className="spot-section-label">🎣 What you might catch</p>
          <ul className="catch-list">
            {spot.species.map(f => <li key={f}>{f}</li>)}
          </ul>
        </div>
        <div className="spot-best-for">
          <span aria-hidden="true">⭐</span> {spot.bestFor}
        </div>
        <div className="spot-tip">
          💡 <strong>Tip:</strong> {spot.tip}
        </div>
        <div className="spot-facilities">
          {spot.facilities.map(f => (
            <span key={f} className="facility-badge" title={FACILITY_ICONS[f]?.label}>
              {FACILITY_ICONS[f]?.icon}
              <span className="facility-label">{FACILITY_ICONS[f]?.label}</span>
            </span>
          ))}
        </div>
        <div className="spot-parent-info">
          <p>🅿️ {spot.parentInfo.parking}</p>
          <p>🚻 {spot.parentInfo.bathrooms}</p>
        </div>
        <div className="spot-actions">
          <a href={spot.googleMapsUrl} target="_blank" rel="noopener noreferrer" className="spot-btn spot-btn--maps">
            📍 Google Maps
          </a>
          <a href={spot.wdfwUrl} target="_blank" rel="noopener noreferrer" className="spot-btn spot-btn--wdfw">
            📋 WDFW Rules
          </a>
        </div>
      </div>
    </div>
  )
}

export default function PugetSound() {
  return (
    <div className="page sound-page">
      <Helmet>
        <title>Explore the Puget Sound — Go Fish Seattle!</title>
        <meta name="description" content="Kid-friendly guide to saltwater fishing, clamming, and exploring the Puget Sound near Seattle. Piers, beaches, shellfish safety, and live tide info." />
        <meta property="og:title" content="Explore the Puget Sound — Go Fish Seattle!" />
        <meta property="og:description" content="Piers, beach fishing, and clamming near Seattle — plus how to check shellfish safety before you go." />
        <meta property="og:image" content={`${SITE}/og-image.png`} />
        <meta property="og:url" content={`${SITE}/sound`} />
        <meta name="twitter:card" content="summary_large_image" />
      </Helmet>

      {/* Hero */}
      <div className="sound-hero">
        <div className="sound-hero-icon" aria-hidden="true">🌊</div>
        <h1>Explore the Puget Sound</h1>
        <p className="sound-hero-sub">Pier fishing, beach casting, tide pools, and clamming</p>
      </div>

      <div className="sound-content">

        {/* Live tide banner */}
        <TideBanner />

        {/* ── Fishing Piers ── */}
        <section className="sound-section">
          <h2 className="sound-section-title">🎣 Saltwater Fishing Piers</h2>
          <p className="sound-section-sub">No boat needed — just show up and fish! All piers are free to use.</p>
          <div className="spots-grid">
            {PIER_SPOTS.map(s => <SpotCard key={s.id} spot={s} type="pier" />)}
          </div>
        </section>

        {/* ── Beach spots ── */}
        <section className="sound-section">
          <h2 className="sound-section-title">🏖️ Beach &amp; Shore Fishing</h2>
          <p className="sound-section-sub">Fish from the shore and explore tide pools at the same time!</p>
          <div className="spots-grid">
            {BEACH_SPOTS.map(s => <SpotCard key={s.id} spot={s} type="beach" />)}
          </div>
        </section>

        {/* ── Shellfish section ── */}
        <section className="sound-section">
          <h2 className="sound-section-title">🦪 Clamming &amp; Shellfish</h2>
          <p className="sound-section-sub">
            Manila clams, littleneck clams, and oysters live right here in the Puget Sound.
            But you <strong>must check safety before every trip</strong> — shellfish can make you very sick if the beach is closed.
          </p>

          {/* Safety check card */}
          <div className="shellfish-safety-card">
            <h3>⚠️ Check Before Every Trip</h3>
            <p className="safety-intro">
              Shellfish beaches open and close based on water quality. Always check on the same day you plan to go!
            </p>
            <ol className="safety-steps">
              <li>
                <strong>📞 Call the hotline</strong> — the easiest option!
                <a href="tel:18005625632" className="safety-phone">1-800-562-5632</a>
                <span className="safety-note">WA DOH Shellfish Safety Hotline — free, updated regularly</span>
              </li>
              <li>
                <strong>🗺️ Check the DOH map</strong> — look up your beach:
                <a
                  href="https://fortress.wa.gov/doh/shellfish/maps/ShellFishMap.htm"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="safety-link"
                >
                  Open the shellfish safety map →
                </a>
                <div className="map-legend">
                  <span className="legend-item legend-green">🟢 Green = safe to harvest</span>
                  <span className="legend-item legend-red">🔴 Red = closed — do not harvest</span>
                  <span className="legend-item legend-yellow">🟡 Yellow = conditional — check the notes</span>
                </div>
              </li>
              <li>
                <strong>📋 Check WDFW for limits</strong> — how many you can take and any special rules:
                <a
                  href="https://wdfw.wa.gov/fishing/shellfish/clams-mussels"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="safety-link"
                >
                  WDFW shellfish rules →
                </a>
              </li>
            </ol>
            <div className="safety-free-note">
              ⭐ <strong>Kids 14 and under shellfish free</strong> — no license needed to harvest shellfish!
            </div>
          </div>

          {/* Shellfish beach suggestions */}
          <h3 className="shellfish-spots-title">Good spots to try (once you've checked!)</h3>
          <div className="shellfish-spots-grid">
            {SHELLFISH_BEACHES.map(b => (
              <div key={b.id} className="shellfish-spot-card">
                <span className="shellfish-spot-emoji" aria-hidden="true">{b.emoji}</span>
                <div>
                  <p className="shellfish-spot-name">{b.name}</p>
                  <p className="shellfish-spot-city">📌 {b.city}</p>
                  <ul className="shellfish-catch-list">
                    {b.whatYouMightFind.map(f => <li key={f}>{f}</li>)}
                  </ul>
                  <p className="shellfish-spot-tip">💡 {b.tip}</p>
                  <a href={b.googleMapsUrl} target="_blank" rel="noopener noreferrer" className="spot-btn spot-btn--maps">
                    📍 Google Maps
                  </a>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* WDFW disclaimer */}
        <div className="spots-wdfw-note">
          <span aria-hidden="true">⚠️</span>
          <p>
            Saltwater fishing rules and seasons change. Always check{' '}
            <a href="https://wdfw.wa.gov" target="_blank" rel="noopener noreferrer">wdfw.wa.gov</a>{' '}
            with a grown-up before your trip!
          </p>
        </div>

      </div>
    </div>
  )
}
