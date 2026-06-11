import { Link } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'
import './Home.css'

const sections = [
  {
    to: '/learn',
    emoji: '🎣',
    title: 'Learn to Fish',
    desc: 'Knots, casting, bait — start here!',
    btnClass: 'btn-blue',
  },
  {
    to: '/spots',
    emoji: '📍',
    title: 'Fishing Spots',
    desc: '12 great places near Seattle',
    btnClass: 'btn-green',
  },
  {
    to: '/fish-id',
    emoji: '🐟',
    title: 'Fish ID',
    desc: 'Tap cards to learn about local fish',
    btnClass: 'btn-teal',
  },
  {
    to: '/rules',
    emoji: '📋',
    title: 'Rules for Kids',
    desc: 'Kids 14 and under fish FREE!',
    btnClass: 'btn-orange',
  },
  {
    to: '/weather',
    emoji: '🌤️',
    title: 'Fish Today?',
    desc: 'Live Seattle weather + top spot picks',
    btnClass: 'btn-blue',
  },
  {
    to: '/clams',
    emoji: '🦀',
    title: 'Clams & Shellfish',
    desc: 'Dig clams and find oysters in WA!',
    btnClass: 'btn-orange',
  },
  {
    to: '/parents',
    emoji: '👨‍👩‍👧',
    title: "Parent's Guide",
    desc: 'Real-talk tips for a great first trip',
    btnClass: 'btn-teal',
  },
]

const SITE = 'https://go-fish-seattle.vercel.app'

export default function Home() {
  return (
    <div className="home">
      <Helmet>
        <title>Go Fish Seattle! 🎣 Free Fishing Guide for Seattle Kids</title>
        <meta name="description" content="Free fishing guide for Seattle-area kids ages 8–10. Find 12 kid-friendly spots, learn to cast, ID local fish, and check live weather — no experience needed." />
        <meta property="og:title" content="Go Fish Seattle! 🎣" />
        <meta property="og:description" content="Free fishing guide for Seattle-area kids. 12 spots, fish ID cards, live weather picks, and a parent's guide." />
        <meta property="og:image" content={`${SITE}/og-image.png`} />
        <meta property="og:url" content={SITE} />
        <meta property="og:type" content="website" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Go Fish Seattle! 🎣" />
        <meta name="twitter:description" content="Free fishing guide for Seattle-area kids. 12 spots, fish ID cards, live weather picks, and a parent's guide." />
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
          <p className="hero-sub">
            Learn to fish, find a great spot, and have fun outside!
          </p>
          <Link to="/learn" className="btn btn-yellow hero-cta">
            Start Learning →
          </Link>
        </div>
      </section>

      {/* Section cards */}
      <section className="home-cards page">
        <h2 className="section-heading">What do you want to do?</h2>
        <div className="cards-grid">
          {sections.map(({ to, emoji, title, desc, btnClass }) => (
            <Link key={to} to={to} className={`home-card`}>
              <div className="home-card-emoji" aria-hidden="true">{emoji}</div>
              <h3>{title}</h3>
              <p>{desc}</p>
              <span className={`btn ${btnClass}`}>{title} →</span>
            </Link>
          ))}
        </div>
      </section>

      {/* Fun fact banner */}
      <section className="fun-fact page">
        <div className="fun-fact-inner">
          <span className="fun-fact-icon" aria-hidden="true">⭐</span>
          <p>
            <strong>Did you know?</strong> Kids under 15 don't need a fishing
            license in Washington state — just grab a rod and go!
          </p>
        </div>
      </section>
    </div>
  )
}
