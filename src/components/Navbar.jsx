import { Link, useLocation } from 'react-router-dom'
import {
  Home, Mountain, Waves, BookOpen, Fish,
  ClipboardList, CloudSun, Users
} from 'lucide-react'
import './Navbar.css'

const links = [
  { to: '/',        label: 'Home',    Icon: Home },
  { to: '/lakes',   label: 'Lakes',   Icon: Mountain },
  { to: '/sound',   label: 'Sound',   Icon: Waves },
  { to: '/learn',   label: 'Learn',   Icon: BookOpen },
  { to: '/fish-id', label: 'Fish ID', Icon: Fish },
  { to: '/rules',   label: 'Rules',   Icon: ClipboardList },
  { to: '/weather', label: 'Today?',  Icon: CloudSun },
  { to: '/parents', label: 'Parents', Icon: Users },
]

export default function Navbar() {
  const { pathname } = useLocation()

  return (
    <nav className="navbar">
      <Link to="/" className="navbar-logo">
        Go Fish Seattle
      </Link>
      <ul className="navbar-links">
        {links.map(({ to, label, Icon }) => (
          <li key={to}>
            <Link to={to} className={pathname === to ? 'active' : ''}>
              <Icon size={14} strokeWidth={1.75} aria-hidden="true" />
              {label}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  )
}
