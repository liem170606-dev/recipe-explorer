import type { Meal } from '../types/meal'
import MealCard from './MealCard'

export interface MealListProps {
  meals: Meal[]
  favorites?: string[]
  onToggleFavorite?: (mealId: string) => void
}

export default function MealList({
  meals,
  favorites = [],
  onToggleFavorite,
}: MealListProps) {
  if (!meals || meals.length === 0) {
    return (
      <div className="empty-list-message">
        <span className="empty-list-icon">🔍</span>
        <h3>לא נמצאו מתכונים</h3>
        <p>נסו לשנות את מונח החיפוש או לבחור קטגוריה אחרת.</p>
      </div>
    )
  }

  return (
    <section className="meal-list" aria-label="רשימת מתכונים">
      {meals.map((meal) => (
        <MealCard
          key={meal.idMeal}
          meal={meal}
          isFavorite={favorites.includes(meal.idMeal)}
          onToggleFavorite={onToggleFavorite}
        />
      ))}
    </section>
  )
}
