import { Link } from 'react-router-dom'
import {
  translateMealTitle,
  translateCategory,
  translateArea,
} from '../utils/translations'

export default function MealCard({
  meal,
  isFavorite,
  onToggleFavorite,
}) {
  const titleInfo = translateMealTitle(meal.strMeal)

  return (
    <Link
      to={`/meals/${meal.idMeal}`}
      className="meal-card"
      title={`צפייה במתכון ${titleInfo.he}`}
    >
      <div className="meal-card-image-wrapper">
        <img
          src={meal.strMealThumb}
          alt={titleInfo.he}
          className="meal-card-image"
          loading="lazy"
        />
        {onToggleFavorite && (
          <button
            type="button"
            className={`favorite-btn ${isFavorite ? 'favorited' : ''}`}
            onClick={(e) => {
              e.preventDefault()
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
        <h3 className="meal-card-title">{titleInfo.he}</h3>
        {titleInfo.en && titleInfo.en !== titleInfo.he && (
          <span className="meal-card-en-title">{titleInfo.en}</span>
        )}
        <div className="meal-card-tags">
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
    </Link>
  )
}
