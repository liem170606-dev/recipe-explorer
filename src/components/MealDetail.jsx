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
    <aside className="meal-detail-panel" aria-label={`פרטי ${meal.strMeal}`}>
      <div className="detail-header">
        <div>
          <h2 className="detail-title">{meal.strMeal}</h2>
          <div className="detail-tags">
            {meal.strCategory && (
              <span className="tag category-tag">{meal.strCategory}</span>
            )}
            {meal.strArea && (
              <span className="tag area-tag">{meal.strArea}</span>
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
          alt={meal.strMeal}
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
        <h3>מצרכים ({ingredients.length})</h3>
        <ul className="ingredients-list">
          {ingredients.map((item) => (
            <li key={item.id} className="ingredient-item">
              <span className="ingredient-name">{item.name}</span>
              {item.measure && (
                <span className="ingredient-measure">{item.measure}</span>
              )}
            </li>
          ))}
        </ul>
      </div>

      <div className="detail-section">
        <h3>הוראות הכנה</h3>
        <div className="instructions-text">
          {meal.strInstructions ? (
            meal.strInstructions
              .split(/\r?\n/)
              .filter((line) => line.trim().length > 0)
              .map((paragraph, index) => (
                <p key={index}>{paragraph}</p>
              ))
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
