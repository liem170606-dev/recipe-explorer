import { Link } from 'react-router-dom'

export default function NotFoundPage() {
  return (
    <div className="meal-detail-page-container not-found" role="alert">
      <span className="not-found-icon">🧭</span>
      <h2>404 — העמוד המבוקש לא נמצא</h2>
      <p>
        נראה שהגעתם לכתובת שאינה קיימת בספר המתכונים שלנו.
      </p>
      <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', marginTop: '1.25rem', flexWrap: 'wrap' }}>
        <Link to="/" className="btn btn-primary">
          🏠 חזרה לדף הבית
        </Link>
        <Link to="/meals" className="btn btn-secondary">
          🍲 לכל המתכונים
        </Link>
      </div>
    </div>
  )
}
