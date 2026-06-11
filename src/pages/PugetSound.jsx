import { Helmet } from 'react-helmet-async'
import './PugetSound.css'

const SITE = 'https://go-fish-seattle.vercel.app'

export default function PugetSound() {
  return (
    <div className="page puget-sound-page">
      <Helmet>
        <title>Explore the Puget Sound — Go Fish Seattle!</title>
        <meta name="description" content="Kid-friendly guide to fishing, clamming, and exploring the Puget Sound near Seattle. Piers, beaches, shellfish safety, and more." />
        <meta property="og:title" content="Explore the Puget Sound — Go Fish Seattle!" />
        <meta property="og:description" content="Kid-friendly guide to fishing, clamming, and exploring the Puget Sound near Seattle." />
        <meta property="og:image" content={`${SITE}/og-image.png`} />
        <meta property="og:url" content={`${SITE}/sound`} />
        <meta name="twitter:card" content="summary_large_image" />
      </Helmet>

      <div className="sound-hero">
        <div className="sound-hero-icon" aria-hidden="true">🌊</div>
        <h1>Explore the Puget Sound</h1>
        <p className="sound-hero-sub">Pier fishing, clamming, oysters, and crabbing</p>
      </div>

      <div className="sound-coming-soon">
        <p className="sound-emoji" aria-hidden="true">🦀</p>
        <h2>Coming Soon!</h2>
        <p>We're building this page now — it'll have pier fishing spots, shellfish safety info, tide charts, and everything you need for a great day on the Sound.</p>
        <div className="sound-teaser">
          <div className="sound-teaser-item">🎣 Saltwater pier spots</div>
          <div className="sound-teaser-item">🦪 Clamming &amp; oysters</div>
          <div className="sound-teaser-item">🌊 Live tide charts</div>
          <div className="sound-teaser-item">⚠️ Shellfish safety info</div>
        </div>
      </div>
    </div>
  )
}
