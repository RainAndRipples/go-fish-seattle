import { Link } from 'react-router-dom'
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
    desc: '6 great places near Seattle',
    btnClass: 'btn-green',
  },
  {
    to: '/fish-id',
    emoji: '🐟',
    title: 'Fish ID',
    desc: 'Flip cards for local fish',
    btnClass: 'btn-teal',
  },
  {
    to: '/rules',
    emoji: '📋',
    title: 'Rules for Kids',
    desc: 'No license needed if you\'re under 15!',
    btnClass: 'btn-orange',
  },
]

export default function Home() {
  return (
    <div className="home">
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
