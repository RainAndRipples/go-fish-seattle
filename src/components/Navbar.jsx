import { Link, useLocation } from 'react-router-dom'
import './Navbar.css'

const links = [
  { to: '/',        label: '🏠 Home' },
  { to: '/lakes',   label: '🏞️ Lakes' },
  { to: '/sound',   label: '🌊 Sound' },
  { to: '/learn',   label: '📚 Learn' },
  { to: '/fish-id', label: '🐟 Fish ID' },
  { to: '/rules',   label: '📋 Rules' },
  { to: '/weather', label: '🌤️ Today?' },
  { to: '/parents', label: '👨‍👩‍👧 Parents' },
]

export default function Navbar() {
  const { pathname } = useLocation()

  return (
    <nav className="navbar">
      <Link to="/" className="navbar-logo">🎣 Go Fish Seattle!</Link>
      <ul className="navbar-links">
        {links.map(({ to, label }) => (
          <li key={to}>
            <Link to={to} className={pathname === to ? 'active' : ''}>
              {label}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  )
}
