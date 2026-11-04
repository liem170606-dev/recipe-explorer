import { useState, useMemo } from 'react'
import { Link } from 'react-router-dom'
import type { Meal } from '../types/meal'
import {
  translateMealTitle,
  translateCategory,
  translateArea,
  computeMealStats,
} from '../utils/translations'
import StatusView from './StatusView'

export interface DiscoverPageProps {
  meals: Meal[]
  loading: boolean
  error: string | null
  onRetry: () => void
  favorites: string[]
  onToggleFavorite: (mealId: string) => void
}

export default function DiscoverPage({
  meals = [],
  loading = false,
  error = null,
  onRetry,
  favorites = [],
  onToggleFavorite,
}: DiscoverPageProps) {
  const [randomIndex, setRandomIndex] = useState<number>(0)

  const stats = useMemo(() => computeMealStats(meals), [meals])

  if (loading) {
    return (
      <div className="discover-page">
        <StatusView loading={true} />
      </div>
    )
  }

  if (error) {
    return (
      <div className="discover-page">
        <StatusView loading={false} error={error} onRetry={onRetry} />
      </div>
    )
  }

  const safeIndex = meals.length > 0 ? randomIndex % meals.length : 0
  const spotlightMeal: Meal | undefined = meals[safeIndex]

  const handlePickRandom = () => {
    if (meals.length <= 1) return
    let nextIndex = Math.floor(Math.random() * meals.length)
    if (nextIndex === safeIndex) {
      nextIndex = (safeIndex + 1) % meals.length
    }
    setRandomIndex(nextIndex)
  }

  const spotlightTitle = spotlightMeal
    ? translateMealTitle(spotlightMeal.strMeal)
    : { he: '', en: '' }
  const isSpotlightFav = spotlightMeal
    ? favorites.includes(spotlightMeal.idMeal)
    : false

  return (
    <div className="discover-page">
      <div className="meals-page-header">
        <div>
          <h2 className="meals-page-title">🎲 הפתעה קולינרית וסטטיסטיקות</h2>
          <p className="meals-page-subtitle">
            מתלבטים מה לבשל היום? הגרילו מתכון בהפתעה או צפו בנתוני המאגר הקולינרי
          </p>
        </div>
      </div>

      {/* מחולל מתכון אקראי */}
      {spotlightMeal && (
        <section className="discover-random-section" aria-label="הגרלת מתכון אקראי">
          <div className="discover-random-header">
            <div>
              <span className="hero-badge">✨ מתכון בהפתעה</span>
              <h3 className="section-title" style={{ marginBottom: '0.25rem' }}>
                מה מבשלים היום?
              </h3>
              <p className="section-subtitle">
                לחצו על הכפתור כדי להגריל מנה חדשה מתוך המאגר
              </p>
            </div>
            <button
              type="button"
              className="btn btn-primary"
              onClick={handlePickRandom}
            >
              🎲 הגרל מתכון אחר
            </button>
          </div>

          <div className="discover-spotlight-card">
            <img
              src={spotlightMeal.strMealThumb}
              alt={spotlightTitle.he}
              className="discover-spotlight-image"
            />
            <div className="discover-spotlight-content">
              <div className="detail-badges">
                {spotlightMeal.strCategory && (
                  <span className="tag category-tag">
                    {translateCategory(spotlightMeal.strCategory)}
                  </span>
                )}
                {spotlightMeal.strArea && (
                  <span className="tag area-tag">
                    מטבח {translateArea(spotlightMeal.strArea)}
                  </span>
                )}
              </div>

              <h4 className="discover-spotlight-title">{spotlightTitle.he}</h4>
              {spotlightTitle.en && spotlightTitle.en !== spotlightTitle.he && (
                <p className="detail-original-name">שם מקורי: {spotlightTitle.en}</p>
              )}

              <div className="discover-spotlight-actions">
                <Link
                  to={`/meals/${spotlightMeal.idMeal}`}
                  className="btn btn-primary"
                >
                  📖 לצפייה במתכון המלא
                </Link>
                <button
                  type="button"
                  className={`detail-fav-btn ${isSpotlightFav ? 'favorited' : ''}`}
                  onClick={() => onToggleFavorite(spotlightMeal.idMeal)}
                >
                  {isSpotlightFav ? '★ שמור במועדפים' : '☆ הוסף למועדפים'}
                </button>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* כרטיסי סיכום נתונים */}
      <section className="discover-stats-summary" aria-label="סיכום נתוני האתר">
        <div className="stat-card">
          <span className="stat-number">{stats.totalMeals}</span>
          <span className="stat-label">סה״כ מתכונים במאגר</span>
        </div>
        <div className="stat-card">
          <span className="stat-number">{stats.totalCategories}</span>
          <span className="stat-label">קטגוריות קולינריות</span>
        </div>
        <div className="stat-card">
          <span className="stat-number">{stats.totalAreas}</span>
          <span className="stat-label">מטבחים ומדינות</span>
        </div>
        <div className="stat-card">
          <span className="stat-number">{favorites.length}</span>
          <span className="stat-label">מתכונים במועדפים שלך</span>
        </div>
      </section>

      {/* פילוח לפי קטגוריות ומטבחים */}
      <div className="discover-breakdown-grid">
        <section className="discover-breakdown-card" aria-label="התפלגות לפי קטגוריות">
          <h3 className="section-heading">📊 התפלגות לפי קטגוריה</h3>
          <ul className="stats-bars-list">
            {stats.categoriesBreakdown.map((item) => (
              <li key={item.key} className="stats-bar-item">
                <div className="stats-bar-info">
                  <span className="stats-bar-label">{item.label}</span>
                  <span className="stats-bar-count">
                    {item.count} מתכונים ({item.percentage}%)
                  </span>
                </div>
                <div className="stats-bar-track">
                  <div
                    className="stats-bar-fill category-fill"
                    style={{ width: `${Math.max(item.percentage, 6)}%` }}
                  />
                </div>
              </li>
            ))}
          </ul>
        </section>

        <section className="discover-breakdown-card" aria-label="התפלגות לפי מטבח">
          <h3 className="section-heading">🌍 התפלגות לפי מטבח בעולם</h3>
          <ul className="stats-bars-list">
            {stats.areasBreakdown.map((item) => (
              <li key={item.key} className="stats-bar-item">
                <div className="stats-bar-info">
                  <span className="stats-bar-label">מטבח {item.label}</span>
                  <span className="stats-bar-count">
                    {item.count} מתכונים ({item.percentage}%)
                  </span>
                </div>
                <div className="stats-bar-track">
                  <div
                    className="stats-bar-fill area-fill"
                    style={{ width: `${Math.max(item.percentage, 6)}%` }}
                  />
                </div>
              </li>
            ))}
          </ul>
        </section>
      </div>
    </div>
  )
}
