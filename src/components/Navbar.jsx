import { NavLink, Link } from 'react-router-dom'

export default function Navbar({ favoriteCount }) {
  return (
    <header className="navbar-container">
      <div className="navbar-content">
        <Link to="/" className="navbar-brand">
          <span className="navbar-logo">🍳</span>
          <div className="navbar-title-wrap">
            <h1 className="navbar-title">ספר המתכונים העולמי</h1>
            <span className="navbar-subtitle">מתכונים נבחרים מכל העולם</span>
          </div>
        </Link>

        <nav className="navbar-links" aria-label="ניווט ראשי באתר">
          <NavLink
            to="/"
            end
            className={({ isActive }) =>
              `nav-link ${isActive ? 'nav-link-active' : ''}`
            }
          >
            🏠 דף הבית
          </NavLink>
          <NavLink
            to="/meals"
            className={({ isActive }) =>
              `nav-link ${isActive ? 'nav-link-active' : ''}`
            }
          >
            🍲 כל המתכונים
          </NavLink>
        </nav>

        <div className="navbar-actions">
          <Link
            to="/meals"
            className="navbar-favorites-badge"
            title="צפייה במתכונים מועדפים"
          >
            <span className="star-icon">⭐</span>
            <span className="fav-text">מועדפים:</span>
            <span className="fav-count">{favoriteCount}</span>
          </Link>
        </div>
      </div>
    </header>
  )
}
