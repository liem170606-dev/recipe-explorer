import { useState, useEffect } from 'react'
import { Routes, Route } from 'react-router-dom'
import type { Meal, MealsApiResponse } from './types/meal'
import Navbar from './components/Navbar'
import HomePage from './components/HomePage'
import MealsPage from './components/MealsPage'
import MealDetailPage from './components/MealDetailPage'
import FavoritesPage from './components/FavoritesPage'
import DiscoverPage from './components/DiscoverPage'
import NotFoundPage from './components/NotFoundPage'

const FAVORITES_STORAGE_KEY = 'recipe_explorer_favorites'
const MEALS_SEARCH_API_URL = 'https://www.themealdb.com/api/json/v1/1/search.php?s='
const PIZZA_LOOKUP_API_URL = 'https://www.themealdb.com/api/json/v1/1/lookup.php?i=53014'

export default function App() {
  const [meals, setMeals] = useState<Meal[]>([])
  const [loading, setLoading] = useState<boolean>(true)
  const [error, setError] = useState<string | null>(null)
  const [retryKey, setRetryKey] = useState<number>(0)

  // טעינת מועדפים מ-localStorage
  const [favorites, setFavorites] = useState<string[]>(() => {
    try {
      const stored = localStorage.getItem(FAVORITES_STORAGE_KEY)
      if (!stored) return []
      const parsed: unknown = JSON.parse(stored)
      return Array.isArray(parsed)
        ? parsed.filter((item): item is string => typeof item === 'string')
        : []
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

  // משיכת נתונים מ-TheMealDB API בלבד (כולל שליפת פיצה מרגריטה מ-API להחלפת הפאייה)
  useEffect(() => {
    let isMounted = true

    async function fetchMeals() {
      setLoading(true)
      setError(null)

      try {
        const [searchResponse, pizzaResponse] = await Promise.all([
          fetch(MEALS_SEARCH_API_URL),
          fetch(PIZZA_LOOKUP_API_URL).catch(() => null),
        ])

        if (!searchResponse.ok) {
          throw new Error(`שגיאת שרת (${searchResponse.status}): לא ניתן לקבל נתונים כעת`)
        }

        const data = (await searchResponse.json()) as MealsApiResponse
        let pizzaMealFromApi: Meal | null = null

        if (pizzaResponse && pizzaResponse.ok) {
          const pizzaData = (await pizzaResponse.json()) as MealsApiResponse
          if (pizzaData.meals && pizzaData.meals.length > 0) {
            pizzaMealFromApi = pizzaData.meals[0]
          }
        }

        if (isMounted) {
          if (data && Array.isArray(data.meals)) {
            const updatedMeals = data.meals.map((meal) => {
              const isPaella =
                (meal.strMeal && meal.strMeal.toLowerCase() === 'paella') ||
                meal.idMeal === '53151'
              if (isPaella && pizzaMealFromApi) {
                return pizzaMealFromApi
              }
              return meal
            })
            setMeals(updatedMeals)
          } else {
            setMeals([])
          }
        }
      } catch (err) {
        if (isMounted) {
          const message =
            err instanceof Error
              ? err.message
              : 'אירעה תקלה בהתחברות לשרת המתכונים. אנא ודאו שאתם מחוברים לאינטרנט ונסו שוב.'
          setError(message)
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

  const handleRetry = () => {
    setRetryKey((prev) => prev + 1)
  }

  const handleToggleFavorite = (mealId: string) => {
    setFavorites((prevFavorites) => {
      if (prevFavorites.includes(mealId)) {
        return prevFavorites.filter((id) => id !== mealId)
      } else {
        return [...prevFavorites, mealId]
      }
    })
  }

  const handleClearFavorites = () => {
    setFavorites([])
  }

  return (
    <div className="app-container">
      <Navbar favoriteCount={favorites.length} />
      <main className="main-content">
        <Routes>
          <Route path="/" element={<HomePage meals={meals} />} />
          <Route
            path="/meals"
            element={
              <MealsPage
                meals={meals}
                loading={loading}
                error={error}
                onRetry={handleRetry}
                favorites={favorites}
                onToggleFavorite={handleToggleFavorite}
              />
            }
          />
          <Route
            path="/meals/:id"
            element={
              <MealDetailPage
                meals={meals}
                loading={loading}
                error={error}
                onRetry={handleRetry}
                favorites={favorites}
                onToggleFavorite={handleToggleFavorite}
              />
            }
          />
          <Route
            path="/favorites"
            element={
              <FavoritesPage
                meals={meals}
                loading={loading}
                error={error}
                onRetry={handleRetry}
                favorites={favorites}
                onToggleFavorite={handleToggleFavorite}
                onClearFavorites={handleClearFavorites}
              />
            }
          />
          <Route
            path="/discover"
            element={
              <DiscoverPage
                meals={meals}
                loading={loading}
                error={error}
                onRetry={handleRetry}
                favorites={favorites}
                onToggleFavorite={handleToggleFavorite}
              />
            }
          />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </main>
    </div>
  )
}
