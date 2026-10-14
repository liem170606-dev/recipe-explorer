import { useParams, Link } from 'react-router-dom'
import {
  translateMealTitle,
  translateCategory,
  translateArea,
  translateInstructions,
  getYoutubeUrl,
  getEnrichedIngredients,
} from '../utils/translations'
import StatusView from './StatusView'

export default function MealDetailPage({
  meals = [],
  loading = false,
  error = null,
  onRetry,
  favorites = [],
  onToggleFavorite,
}) {
  const { id } = useParams()

  if (loading) {
    return (
      <div className="meal-detail-page-container">
        <StatusView type="loading" />
      </div>
    )
  }

  if (error) {
    return (
      <div className="meal-detail-page-container">
        <StatusView type="error" message={error} onRetry={onRetry} />
      </div>
    )
  }

  const meal = meals.find((m) => String(m.idMeal) === String(id))

  if (!meal) {
    return (
      <div className="meal-detail-page-container not-found">
        <span className="not-found-icon">🍽️</span>
        <h2>המתכון המבוקש לא נמצא</h2>
        <p>יתכן שהמתכון הוסר או שהקישור שגוי.</p>
        <Link to="/meals" className="btn btn-primary">
          ⬅️ חזרה לכל המתכונים
        </Link>
      </div>
    )
  }

  const titleInfo = translateMealTitle(meal.strMeal)
  const instructions = translateInstructions(meal)
  const youtubeUrl = getYoutubeUrl(meal)
  const ingredients = getEnrichedIngredients(meal)
  const isFavorite = favorites.includes(meal.idMeal)

  return (
    <article className="meal-detail-page" aria-label={`מתכון עבור ${titleInfo.he}`}>
      {/* סרגל ניווט עליון בדף המתכון */}
      <nav className="detail-top-nav">
        <Link to="/meals" className="back-link">
          <span className="back-arrow">⬅️</span> חזרה לכל המתכונים
        </Link>
        <button
          type="button"
          className={`detail-fav-btn ${isFavorite ? 'favorited' : ''}`}
          onClick={() => onToggleFavorite(meal.idMeal)}
          aria-label={isFavorite ? 'הסר ממועדפים' : 'הוסף למועדפים'}
        >
          {isFavorite ? '★ שמור במועדפים' : '☆ שמור במועדפים'}
        </button>
      </nav>

      {/* כותרת ופרטים ראשיים */}
      <header className="detail-hero">
        <div className="detail-hero-image-wrapper">
          <img
            src={meal.strMealThumb}
            alt={titleInfo.he}
            className="detail-hero-image"
          />
        </div>

        <div className="detail-hero-content">
          <div className="detail-badges">
            {meal.strCategory && (
              <span className="tag category-tag">
                {translateCategory(meal.strCategory)}
              </span>
            )}
            {meal.strArea && (
              <span className="tag area-tag">
                מטבח {translateArea(meal.strArea)}
              </span>
            )}
          </div>

          <h1 className="detail-main-title">{titleInfo.he}</h1>
          {titleInfo.en && titleInfo.en !== titleInfo.he && (
            <p className="detail-original-name">שם מקורי: {titleInfo.en}</p>
          )}

          <p className="detail-intro">
            מתכון אותנטי מעולה מתוך המטבח ה{translateArea(meal.strArea) || 'עולמי'}.
            עקבו אחר רשימת המצרכים ושלבי ההכנה המפורטים להכנת המנה בבית.
          </p>

          {youtubeUrl && (
            <a
              href={youtubeUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="youtube-button"
            >
              <span className="youtube-icon" aria-hidden="true">▶</span>
              צפייה בסרטון הכנה ב-YouTube
            </a>
          )}
        </div>
      </header>

      {/* רשת תוכן: מצרכים והוראות הכנה */}
      <div className="detail-body-grid">
        {/* עמודת מצרכים */}
        <section className="detail-ingredients-section" aria-label="רשימת מצרכים">
          <h2 className="section-heading">
            <span className="icon">🛒</span> מצרכים נדרשים ({ingredients.length})
          </h2>
          <ul className="ingredients-list">
            {ingredients.map((item) => (
              <li key={item.id} className="ingredient-item">
                <span className="ingredient-bullet">✓</span>
                <span className="ingredient-name">{item.name}</span>
                {item.measure && (
                  <span className="ingredient-measure">{item.measure}</span>
                )}
              </li>
            ))}
          </ul>
        </section>

        {/* עמודת הוראות הכנה */}
        <section className="detail-instructions-section" aria-label="הוראות הכנה">
          <h2 className="section-heading">
            <span className="icon">👨‍🍳</span> שלבי הכנה
          </h2>
          <ol className="instructions-steps-list">
            {instructions.map((step, idx) => (
              <li key={`step-${idx + 1}`} className="instruction-step">
                <div className="step-number">{idx + 1}</div>
                <div className="step-content">
                  <p className="step-text">{step}</p>
                </div>
              </li>
            ))}
          </ol>
        </section>
      </div>

      {/* כפתור חזרה תחתון */}
      <footer className="detail-footer-nav">
        <Link to="/meals" className="btn btn-secondary">
          ⬅️ חזרה לקטלוג המתכונים
        </Link>
      </footer>
    </article>
  )
}
