import {
  translateMealTitle,
  translateCategory,
  translateArea,
  translateIngredient,
  translateMeasure,
  translateInstructions,
} from '../utils/translations'

export default function MealDetail({
  meal,
  onClose,
  isFavorite,
  onToggleFavorite,
}) {
  if (!meal) {
    return (
      <aside className="meal-detail-panel empty-selection" aria-label="פרטי מתכון">
        <div className="empty-selection-content">
          <span className="empty-icon">🍽️</span>
          <h3>לא נבחר מתכון</h3>
          <p>לחצו על אחד מכרטיסי המנות ברשימה כדי לצפות ברשימת המצרכים ובהוראות ההכנה המלאות.</p>
        </div>
      </aside>
    )
  }

  const titleInfo = translateMealTitle(meal.strMeal)
  const instructions = translateInstructions(meal)

  // חילוץ רשימת המצרכים והכמויות מהשדות של TheMealDB (strIngredient1-20, strMeasure1-20)
  const ingredients = []
  for (let i = 1; i <= 20; i++) {
    const ingredient = meal[`strIngredient${i}`]
    const measure = meal[`strMeasure${i}`]
    if (ingredient && ingredient.trim()) {
      ingredients.push({
        id: i,
        name: ingredient.trim(),
        measure: measure ? measure.trim() : '',
      })
    }
  }

  return (
    <aside className="meal-detail-panel" aria-label={`פרטי ${titleInfo.he}`}>
      <div className="detail-header">
        <div>
          <h2 className="detail-title">{titleInfo.he}</h2>
          {titleInfo.en && titleInfo.en !== titleInfo.he && (
            <p className="detail-en-subtitle">{titleInfo.en}</p>
          )}
          <div className="detail-tags">
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
        </div>
        {onClose && (
          <button
            type="button"
            className="close-button"
            onClick={onClose}
            aria-label="סגור פרטים"
            title="סגור פרטים"
          >
            ✕
          </button>
        )}
      </div>

      <div className="detail-image-container">
        <img
          src={meal.strMealThumb}
          alt={titleInfo.he}
          className="detail-image"
        />
        {onToggleFavorite && (
          <button
            type="button"
            className={`detail-favorite-btn ${isFavorite ? 'favorited' : ''}`}
            onClick={() => onToggleFavorite(meal.idMeal)}
          >
            {isFavorite ? '★ שמור במועדפים' : '☆ הוסף למועדפים'}
          </button>
        )}
      </div>

      <div className="detail-section">
        <h3>מצרכים נדרשים ({ingredients.length})</h3>
        <ul className="ingredients-list">
          {ingredients.map((item) => (
            <li key={item.id} className="ingredient-item">
              <span className="ingredient-name">
                {translateIngredient(item.name)}
              </span>
              {item.measure && (
                <span className="ingredient-measure">
                  {translateMeasure(item.measure)}
                </span>
              )}
            </li>
          ))}
        </ul>
      </div>

      <div className="detail-section">
        <h3>הוראות הכנה</h3>
        <div className="instructions-text">
          {instructions && instructions.length > 0 ? (
            <ol className="instructions-steps-list">
              {instructions.map((step, index) => (
                <li key={index} className="instruction-step">
                  {step}
                </li>
              ))}
            </ol>
          ) : (
            <p>אין הוראות הכנה זמינות למתכון זה.</p>
          )}
        </div>
      </div>

      {meal.strYoutube && (
        <div className="detail-section">
          <a
            href={meal.strYoutube}
            target="_blank"
            rel="noopener noreferrer"
            className="youtube-link-btn"
          >
            ▶ צפייה בסרטון הדרכה ב-YouTube
          </a>
        </div>
      )}
    </aside>
  )
}
