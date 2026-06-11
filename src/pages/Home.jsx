import { Link } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'
import './Home.css'

const SITE = 'https://go-fish-seattle.vercel.app'

const adventures = [
  {
    to: '/lakes',
    icon: '🏞️',
    title: 'Fish in Lakes & Rivers',
    desc: '20+ spots near Seattle — trout, perch, bass, and salmon',
    cta: 'Find a spot →',
    cls: 'door--lakes',
  },
  {
    to: '/sound',
    icon: '🌊',
    title: 'Explore the Puget Sound',
    desc: 'Pier fishing, clamming, oysters, and crabbing',
    cta: 'Explore the Sound →',
    cls: 'door--sound',
  },
]

const secondaryLinks = [
  { to: '/learn',   icon: '📚', label: 'Learn to Fish' },
  { to: '/rules',   icon: '📋', label: 'Rules for Kids' },
  { to: '/weather', icon: '🌤️', label: 'Fish Today?' },
  { to: '/parents', icon: '👨‍👩‍👧', label: "Parent's Guide" },
]

export default function Home() {
  return (
    <div className="home">
      <Helmet>
        <title>Go Fish Seattle! 🎣 Free Fishing Guide for Seattle Kids</title>
        <meta name="description" content="Free fishing guide for Seattle-area kids ages 8–10. Find 20+ kid-friendly spots, explore the Puget Sound, learn to cast, and check live weather — no experience needed." />
        <meta property="og:title" content="Go Fish Seattle! 🎣" />
        <meta property="og:description" content="Free fishing guide for Seattle-area kids. Lakes, rivers, Puget Sound piers — plus fish ID, live weather picks, and a parent's guide." />
        <meta property="og:image" content={`${SITE}/og-image.png`} />
        <meta property="og:url" content={SITE} />
        <meta property="og:type" content="website" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Go Fish Seattle! 🎣" />
        <meta name="twitter:description" content="Free fishing guide for Seattle-area kids. Lakes, rivers, Puget Sound piers — plus fish ID, live weather picks, and a parent's guide." />
        <meta name="twitter:image" content={`${SITE}/og-image.png`} />
      </Helmet>

      {/* Hero */}
      <section className="hero">
        <div className="hero-waves" aria-hidden="true">
          <div className="wave wave1" />
          <div className="wave wave2" />
        </div>
        <div className="hero-content">
          <div className="hero-fish" aria-hidden="true">🎣</div>
          <h1 className="hero-title">Go Fish Seattle!</h1>
          <p className="hero-sub">Pick your adventure:</p>
        </div>
      </section>

      {/* Two adventure doors */}
      <section className="adventure-section">
        <div className="adventure-doors">
          {adventures.map(a => (
            <Link key={a.to} to={a.to} className={`adventure-door ${a.cls}`}>
              <span className="door-icon" aria-hidden="true">{a.icon}</span>
              <h2 className="door-title">{a.title}</h2>
              <p className="door-desc">{a.desc}</p>
              <span className="door-cta">{a.cta}</span>
            </Link>
          ))}
        </div>

        {/* Secondary links */}
        <div className="secondary-links">
          {secondaryLinks.map(l => (
            <Link key={l.to} to={l.to} className="secondary-link">
              <span aria-hidden="true">{l.icon}</span>
              {l.label}
            </Link>
          ))}
        </div>
      </section>

      {/* Fun fact banner */}
      <section className="fun-fact page">
        <div className="fun-fact-inner">
          <span className="fun-fact-icon" aria-hidden="true">⭐</span>
          <p>
            <strong>Did you know?</strong> Kids 14 and under fish free in
            Washington state — no license needed. Just grab a rod and go!
          </p>
        </div>
      </section>
    </div>
  )
}
