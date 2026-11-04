import { useState, useMemo } from 'react'
import type { Meal } from '../types/meal'
import SearchBar from './SearchBar'
import MealList from './MealList'
import StatusView from './StatusView'
import { filterMeals } from '../utils/translations'

export interface MealsPageProps {
  meals: Meal[]
  loading: boolean
  error: string | null
  onRetry: () => void
  favorites: string[]
  onToggleFavorite: (mealId: string) => void
}

export default function MealsPage({
  meals = [],
  loading = false,
  error = null,
  onRetry,
  favorites = [],
  onToggleFavorite,
}: MealsPageProps) {
  const [searchTerm, setSearchTerm] = useState<string>('')
  const [selectedCategory, setSelectedCategory] = useState<string>('ALL')
  const [showOnlyFavorites, setShowOnlyFavorites] = useState<boolean>(false)

  // חילוץ רשימת הקטגוריות
  const categories = useMemo<string[]>(() => {
    const categorySet = new Set<string>()
    meals.forEach((meal) => {
      if (meal.strCategory && meal.strCategory.trim()) {
        categorySet.add(meal.strCategory.trim())
      }
    })
    return Array.from(categorySet).sort()
  }, [meals])

  // סינון המנות באמצעות פונקציית העזר המשותפת
  const filteredMeals = useMemo<Meal[]>(() => {
    return filterMeals(
      meals,
      searchTerm,
      selectedCategory,
      showOnlyFavorites,
      favorites
    )
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

      {loading && <StatusView loading={true} />}

      {error && !loading && (
        <StatusView loading={false} error={error} onRetry={onRetry} />
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
