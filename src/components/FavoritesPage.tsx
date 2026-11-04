import { Link } from 'react-router-dom'
import type { Meal } from '../types/meal'
import MealList from './MealList'
import StatusView from './StatusView'

export interface FavoritesPageProps {
  meals: Meal[]
  loading: boolean
  error: string | null
  onRetry: () => void
  favorites: string[]
  onToggleFavorite: (mealId: string) => void
  onClearFavorites: () => void
}

export default function FavoritesPage({
  meals = [],
  loading = false,
  error = null,
  onRetry,
  favorites = [],
  onToggleFavorite,
  onClearFavorites,
}: FavoritesPageProps) {
  if (loading) {
    return (
      <div className="favorites-page">
        <StatusView loading={true} />
      </div>
    )
  }

  if (error) {
    return (
      <div className="favorites-page">
        <StatusView loading={false} error={error} onRetry={onRetry} />
      </div>
    )
  }

  const favoriteMeals = meals.filter((meal) => favorites.includes(meal.idMeal))

  return (
    <div className="favorites-page">
      <div className="meals-page-header">
        <div>
          <h2 className="meals-page-title">⭐ המתכונים המועדפים שלי</h2>
          <p className="meals-page-subtitle">
            {favoriteMeals.length > 0
              ? `שמרתם ${favoriteMeals.length} מתכונים אהובים לגישה מהירה בדפדפן`
              : 'עדיין לא שמרתם מתכונים מועדפים'}
          </p>
        </div>

        {favoriteMeals.length > 0 && (
          <button
            type="button"
            className="reset-filters-btn"
            onClick={onClearFavorites}
            title="נקה את כל המועדפים"
          >
            🗑️ נקה את כל המועדפים
          </button>
        )}
      </div>

      {favoriteMeals.length === 0 ? (
        <div className="empty-list-message">
          <span className="empty-list-icon">⭐</span>
          <h3>רשימת המועדפים שלכם ריקה</h3>
          <p>
            לחצו על סמל הכוכב (☆) בכרטיס של כל מתכון או בעמוד המתכון כדי לשמור אותו כאן.
          </p>
          <div style={{ marginTop: '1.25rem' }}>
            <Link to="/meals" className="btn btn-primary">
              🍲 מעבר לכל המתכונים
            </Link>
          </div>
        </div>
      ) : (
        <MealList
          meals={favoriteMeals}
          favorites={favorites}
          onToggleFavorite={onToggleFavorite}
        />
      )}
    </div>
  )
}
