import MealCard from './MealCard'

export default function MealList({
  meals,
  selectedMeal,
  onSelectMeal,
  favorites = [],
  onToggleFavorite,
}) {
  if (!meals || meals.length === 0) {
    return (
      <div className="empty-list-message">
        <p>לא נמצאו מתכונים התואמים לחיפוש או לסינון שנבחרו.</p>
      </div>
    )
  }

  return (
    <section className="meal-list" aria-label="רשימת מתכונים">
      {meals.map((meal) => (
        <MealCard
          key={meal.idMeal}
          meal={meal}
          isSelected={selectedMeal?.idMeal === meal.idMeal}
          onSelectMeal={onSelectMeal}
          isFavorite={favorites.includes(meal.idMeal)}
          onToggleFavorite={onToggleFavorite}
        />
      ))}
    </section>
  )
}
