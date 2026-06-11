import { Link } from 'react-router-dom'
import './Footer.css'

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-inner">
        <p className="footer-brand">🎣 Go Fish Seattle!</p>
        <nav className="footer-links" aria-label="Footer links">
          <a href="https://fishhunt.wa.gov" target="_blank" rel="noopener noreferrer">
            🎫 Get a License (fishhunt.wa.gov)
          </a>
          <a href="https://wdfw.wa.gov" target="_blank" rel="noopener noreferrer">
            📋 WDFW Rules
          </a>
          <a href="https://fortress.wa.gov/doh/biotoxin/biotoxin.aspx" target="_blank" rel="noopener noreferrer">
            🦪 Shellfish Safety Map
          </a>
          <Link to="/clams">Clams &amp; Shellfish</Link>
        </nav>
        <p className="footer-note">
          Kids 14 and under fish free in WA! 🐟 Rules and licenses at{' '}
          <a href="https://fishhunt.wa.gov" target="_blank" rel="noopener noreferrer">fishhunt.wa.gov</a>
        </p>
      </div>
    </footer>
  )
}
