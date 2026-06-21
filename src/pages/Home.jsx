import { Link } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'
import { Mountain, Waves, BookOpen, ClipboardList, CloudSun, Users } from 'lucide-react'
import './Home.css'

const SITE = 'https://go-fish-seattle.vercel.app'

const adventures = [
  {
    to: '/lakes',
    Icon: Mountain,
    title: 'Lakes & Rivers',
    desc: '22 spots across King County — trout, perch, bass, and salmon',
    cta: 'Find a spot',
    cls: 'door--lakes',
  },
  {
    to: '/sound',
    Icon: Waves,
    title: 'Puget Sound',
    desc: 'Pier fishing, clamming, tide pools, and saltwater adventure',
    cta: 'Explore the Sound',
    cls: 'door--sound',
  },
]

const secondaryLinks = [
  { to: '/learn',   Icon: BookOpen,     label: 'Learn to Fish' },
  { to: '/rules',   Icon: ClipboardList,label: 'Rules for Kids' },
  { to: '/weather', Icon: CloudSun,     label: 'Fish Today?' },
  { to: '/parents', Icon: Users,        label: "Parent's Guide" },
]

export default function Home() {
  return (
    <div className="home">
      <Helmet>
        <title>Go Fish Seattle! — Free Fishing Guide for Seattle Families</title>
        <meta name="description" content="Free fishing guide for Seattle-area families. Find 22 kid-friendly freshwater spots, explore the Puget Sound, learn to cast, and check live weather — no experience needed." />
        <meta property="og:title" content="Go Fish Seattle!" />
        <meta property="og:description" content="Free fishing guide for Seattle-area families. Lakes, rivers, Puget Sound piers — plus fish ID, live weather picks, and a parent's guide." />
        <meta property="og:image" content={`${SITE}/og-image.png`} />
        <meta property="og:url" content={SITE} />
        <meta property="og:type" content="website" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Go Fish Seattle!" />
        <meta name="twitter:description" content="Free fishing guide for Seattle-area families. Lakes, rivers, Puget Sound piers — plus fish ID, live weather picks, and a parent's guide." />
        <meta name="twitter:image" content={`${SITE}/og-image.png`} />
      </Helmet>

      {/* Hero */}
      <section className="hero">
        <div className="hero-texture" aria-hidden="true" />
        <div className="hero-content">
          <p className="hero-eyebrow">Pacific Northwest Fishing Guide</p>
          <h1 className="hero-title">Go Fish<br />Seattle.</h1>
          <p className="hero-sub">Pick your adventure.</p>
        </div>
      </section>

      {/* Adventure doors */}
      <section className="adventure-section">
        <div className="adventure-doors">
          {adventures.map(a => (
            <Link key={a.to} to={a.to} className={`adventure-door ${a.cls}`}>
              <a.Icon size={32} strokeWidth={1.5} className="door-icon" aria-hidden="true" />
              <h2 className="door-title">{a.title}</h2>
              <p className="door-desc">{a.desc}</p>
              <span className="door-cta">{a.cta} →</span>
            </Link>
          ))}
        </div>

        {/* Secondary links */}
        <div className="secondary-links">
          {secondaryLinks.map(l => (
            <Link key={l.to} to={l.to} className="secondary-link">
              <l.Icon size={15} strokeWidth={1.75} aria-hidden="true" />
              {l.label}
            </Link>
          ))}
        </div>
      </section>

      {/* Fun fact */}
      <section className="fun-fact page">
        <div className="fun-fact-inner">
          <span className="fun-fact-rule" aria-hidden="true" />
          <p>
            <strong>Kids 14 and under fish free in Washington State</strong> — no license needed.
            Grab a rod and head out.
          </p>
        </div>
      </section>
    </div>
  )
}
