export default function MealCard({
  meal,
  isSelected,
  onSelectMeal,
  isFavorite,
  onToggleFavorite,
}) {
  return (
    <article
      className={`meal-card ${isSelected ? 'selected' : ''}`}
      onClick={() => onSelectMeal(meal)}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          onSelectMeal(meal)
        }
      }}
    >
      <div className="meal-card-image-wrapper">
        <img
          src={meal.strMealThumb}
          alt={meal.strMeal}
          className="meal-card-image"
          loading="lazy"
        />
        {onToggleFavorite && (
          <button
            type="button"
            className={`favorite-btn ${isFavorite ? 'favorited' : ''}`}
            onClick={(e) => {
              e.stopPropagation()
              onToggleFavorite(meal.idMeal)
            }}
            aria-label={isFavorite ? 'הסר ממועדפים' : 'הוסף למועדפים'}
            title={isFavorite ? 'הסר ממועדפים' : 'הוסף למועדפים'}
          >
            {isFavorite ? '★' : '☆'}
          </button>
        )}
      </div>
      <div className="meal-card-content">
        <h3 className="meal-card-title">{meal.strMeal}</h3>
        <div className="meal-card-tags">
          {meal.strCategory && (
            <span className="tag category-tag">{meal.strCategory}</span>
          )}
          {meal.strArea && (
            <span className="tag area-tag">{meal.strArea}</span>
          )}
        </div>
      </div>
    </article>
  )
}
