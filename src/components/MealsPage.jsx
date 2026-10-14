import { useState, useMemo } from 'react'
import SearchBar from './SearchBar'
import MealList from './MealList'
import StatusView from './StatusView'
import { translateMealTitle } from '../utils/translations'

export default function MealsPage({
  meals = [],
  loading = false,
  error = null,
  onRetry,
  favorites = [],
  onToggleFavorite,
}) {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('ALL')
  const [showOnlyFavorites, setShowOnlyFavorites] = useState(false)

  // חילוץ רשימת הקטגוריות
  const categories = useMemo(() => {
    const categorySet = new Set()
    meals.forEach((meal) => {
      if (meal.strCategory && meal.strCategory.trim()) {
        categorySet.add(meal.strCategory.trim())
      }
    })
    return Array.from(categorySet).sort()
  }, [meals])

  // סינון המנות
  const filteredMeals = useMemo(() => {
    return meals.filter((meal) => {
      const query = searchTerm.toLowerCase().trim()
      const titleInfo = translateMealTitle(meal.strMeal)

      // חיפוש חופשי דו-לשוני
      const matchesSearch =
        !query ||
        (meal.strMeal && meal.strMeal.toLowerCase().includes(query)) ||
        (titleInfo.he && titleInfo.he.toLowerCase().includes(query)) ||
        (meal.strCategory && meal.strCategory.toLowerCase().includes(query))

      // סינון לפי קטגוריה
      const matchesCategory =
        selectedCategory === 'ALL' || meal.strCategory === selectedCategory

      // סינון לפי מועדפים בלבד
      const matchesFavorites = !showOnlyFavorites || favorites.includes(meal.idMeal)

      return matchesSearch && matchesCategory && matchesFavorites
    })
  }, [meals, searchTerm, selectedCategory, showOnlyFavorites, favorites])

  const handleResetFilters = () => {
    setSearchTerm('')
    setSelectedCategory('ALL')
    setShowOnlyFavorites(false)
  }

  return (
    <div className="meals-page">
      <div className="meals-page-header">
        <h2 className="meals-page-title">ספר המתכונים</h2>
        <p className="meals-page-subtitle">
          חפשו וסננו מתוך {meals.length} מתכונים אותנטיים מרחבי העולם
        </p>
      </div>

      <SearchBar
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
        selectedCategory={selectedCategory}
        onCategoryChange={setSelectedCategory}
        categories={categories}
        totalResults={filteredMeals.length}
        onReset={handleResetFilters}
        showOnlyFavorites={showOnlyFavorites}
        onToggleShowOnlyFavorites={() => setShowOnlyFavorites((prev) => !prev)}
        favoritesCount={favorites.length}
      />

      {loading && <StatusView type="loading" />}

      {error && !loading && (
        <StatusView type="error" message={error} onRetry={onRetry} />
      )}

      {!loading && !error && (
        <MealList
          meals={filteredMeals}
          favorites={favorites}
          onToggleFavorite={onToggleFavorite}
        />
      )}
    </div>
  )
}
