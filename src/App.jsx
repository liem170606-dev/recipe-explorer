import { useState, useEffect, useMemo } from 'react'
import Header from './components/Header'
import MealList from './components/MealList'
import MealDetail from './components/MealDetail'
import StatusView from './components/StatusView'
import SearchBar from './components/SearchBar'
import { translateMealTitle } from './utils/translations'

const FAVORITES_STORAGE_KEY = 'recipe_explorer_favorites'

export default function App() {
  const [meals, setMeals] = useState([])
  const [selectedMeal, setSelectedMeal] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [retryKey, setRetryKey] = useState(0)

  // מצבי חיפוש וסינון
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('ALL')
  const [showOnlyFavorites, setShowOnlyFavorites] = useState(false)

  // טעינת מועדפים מ-localStorage (בונוס)
  const [favorites, setFavorites] = useState(() => {
    try {
      const stored = localStorage.getItem(FAVORITES_STORAGE_KEY)
      return stored ? JSON.parse(stored) : []
    } catch {
      return []
    }
  })

  // שמירה אוטומטית ב-localStorage
  useEffect(() => {
    try {
      localStorage.setItem(FAVORITES_STORAGE_KEY, JSON.stringify(favorites))
    } catch (err) {
      console.error('Failed to save favorites to localStorage:', err)
    }
  }, [favorites])

  // משיכת נתונים מ-TheMealDB
  useEffect(() => {
    let isMounted = true

    async function fetchMeals() {
      setLoading(true)
      setError(null)

      try {
        const response = await fetch('https://www.themealdb.com/api/json/v1/1/search.php?s=')
        if (!response.ok) {
          throw new Error(`שגיאת שרת (${response.status}): לא ניתן לקבל נתונים כעת`)
        }

        const data = await response.json()

        if (isMounted) {
          if (data && Array.isArray(data.meals)) {
            setMeals(data.meals)
          } else {
            setMeals([])
          }
        }
      } catch (err) {
        if (isMounted) {
          setError(
            err.message ||
            'אירעה תקלה בהתחברות לשרת המתכונים. אנא ודאו שאתם מחוברים לאינטרנט ונסו שוב.'
          )
        }
      } finally {
        if (isMounted) {
          setLoading(false)
        }
      }
    }

    fetchMeals()

    return () => {
      isMounted = false
    }
  }, [retryKey])

  // חילוץ רשימת הקטגוריות הייחודיות
  const categories = useMemo(() => {
    const categorySet = new Set()
    meals.forEach((meal) => {
      if (meal.strCategory && meal.strCategory.trim()) {
        categorySet.add(meal.strCategory.trim())
      }
    })
    return Array.from(categorySet).sort()
  }, [meals])

  // סינון המנות לפי חיפוש דו-לשוני (עברית ואנגלית), קטגוריה ומועדפים
  const filteredMeals = useMemo(() => {
    return meals.filter((meal) => {
      const query = searchTerm.toLowerCase().trim()
      const titleInfo = translateMealTitle(meal.strMeal)
      const matchesSearch = query
        ? (meal.strMeal && meal.strMeal.toLowerCase().includes(query)) ||
          (titleInfo.he && titleInfo.he.toLowerCase().includes(query)) ||
          (titleInfo.en && titleInfo.en.toLowerCase().includes(query))
        : true

      const matchesCategory =
        selectedCategory === 'ALL' || meal.strCategory === selectedCategory

      const matchesFavorites =
        !showOnlyFavorites || favorites.includes(meal.idMeal)

      return matchesSearch && matchesCategory && matchesFavorites
    })
  }, [meals, searchTerm, selectedCategory, showOnlyFavorites, favorites])

  const handleSelectMeal = (meal) => {
    setSelectedMeal(meal)
  }

  const handleCloseDetail = () => {
    setSelectedMeal(null)
  }

  const handleRetry = () => {
    setRetryKey((prev) => prev + 1)
  }

  const handleResetFilters = () => {
    setSearchTerm('')
    setSelectedCategory('ALL')
    setShowOnlyFavorites(false)
  }

  const handleToggleFavorite = (mealId) => {
    setFavorites((prevFavorites) => {
      if (prevFavorites.includes(mealId)) {
        return prevFavorites.filter((id) => id !== mealId)
      } else {
        return [...prevFavorites, mealId]
      }
    })
  }

  const handleToggleShowOnlyFavorites = () => {
    setShowOnlyFavorites((prev) => !prev)
  }

  return (
    <div className="app-container">
      <Header />
      <main className="main-content">
        <StatusView
          loading={loading}
          error={error}
          onRetry={handleRetry}
        />

        {!loading && !error && (
          <>
            <SearchBar
              searchTerm={searchTerm}
              onSearchChange={setSearchTerm}
              selectedCategory={selectedCategory}
              onCategoryChange={setSelectedCategory}
              categories={categories}
              totalResults={filteredMeals.length}
              onReset={handleResetFilters}
              showOnlyFavorites={showOnlyFavorites}
              onToggleShowOnlyFavorites={handleToggleShowOnlyFavorites}
              favoritesCount={favorites.length}
            />

            <div className="master-detail-layout">
              <section className="list-column">
                <MealList
                  meals={filteredMeals}
                  selectedMeal={selectedMeal}
                  onSelectMeal={handleSelectMeal}
                  favorites={favorites}
                  onToggleFavorite={handleToggleFavorite}
                />
              </section>

              <section className="detail-column">
                <MealDetail
                  meal={selectedMeal}
                  onClose={selectedMeal ? handleCloseDetail : null}
                  isFavorite={selectedMeal ? favorites.includes(selectedMeal.idMeal) : false}
                  onToggleFavorite={handleToggleFavorite}
                />
              </section>
            </div>
          </>
        )}
      </main>
    </div>
  )
}
