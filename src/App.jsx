import { useState, useEffect } from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import Navbar from './components/Navbar'
import HomePage from './components/HomePage'
import MealsPage from './components/MealsPage'
import MealDetailPage from './components/MealDetailPage'

const FAVORITES_STORAGE_KEY = 'recipe_explorer_favorites'

// מתכון פיצה איטלקית מסורתית מ-TheMealDB המחליף את הפאייה
const ITALIAN_PIZZA_MEAL = {
  idMeal: '53014',
  strMeal: 'Pizza Express Margherita',
  strCategory: 'Vegetarian',
  strArea: 'Italian',
  strMealThumb: 'https://www.themealdb.com/images/media/meals/x0lk931587671540.jpg',
  strYoutube: 'https://www.youtube.com/watch?v=Mt5lgUZRoUg',
  strInstructions:
    '1 Preheat the oven to 230°C.\r\n\r\n2 Add the sugar and crumble the fresh yeast into warm water.\r\n\r\n3 Allow the mixture to stand for 10 – 15 minutes in a warm place until froth develops on the surface.\r\n\r\n4 Sift the flour and salt into a large mixing bowl, make a well in the middle and pour in the yeast mixture and olive oil.\r\n\r\n5 Lightly flour your hands, and slowly mix the ingredients together until they bind.\r\n\r\n6 Generously dust your surface with flour.\r\n\r\n7 Throw down the dough and begin kneading for 10 minutes until smooth, silky and soft.\r\n\r\n8 Place in a lightly oiled, non-stick baking tray.\r\n\r\n9 Spread the passata on top making sure you go to the edge.\r\n\r\n10 Evenly place the mozzarella on top, season with the oregano and black pepper, then drizzle with a little olive oil.\r\n\r\n11 Cook in the oven for 10 – 12 minutes until the cheese slightly colours.\r\n\r\n12 When ready, place the basil leaf on top and tuck in!',
  strIngredient1: 'Water',
  strMeasure1: '150ml',
  strIngredient2: 'Sugar',
  strMeasure2: '1 tsp',
  strIngredient3: 'Yeast',
  strMeasure3: '15g',
  strIngredient4: 'Plain Flour',
  strMeasure4: '225g',
  strIngredient5: 'Salt',
  strMeasure5: '1 1/2 tsp',
  strIngredient6: 'Olive Oil',
  strMeasure6: 'Drizzle',
  strIngredient7: 'Passata',
  strMeasure7: '80g',
  strIngredient8: 'Mozzarella',
  strMeasure8: '70g',
  strIngredient9: 'Oregano',
  strMeasure9: '1 tsp',
  strIngredient10: 'Basil',
  strMeasure10: 'Leaves',
  strIngredient11: 'Black Pepper',
  strMeasure11: 'Pinch',
}

export default function App() {
  const [meals, setMeals] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [retryKey, setRetryKey] = useState(0)

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
            // החלפת פאייה ספרדית עם פירות ים בפיצה מרגריטה איטלקית אותנטית
            const updatedMeals = data.meals.map((meal) => {
              if (
                (meal.strMeal && meal.strMeal.toLowerCase() === 'paella') ||
                meal.idMeal === '53151'
              ) {
                return ITALIAN_PIZZA_MEAL
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

  const handleRetry = () => {
    setRetryKey((prev) => prev + 1)
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
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>
    </div>
  )
}
