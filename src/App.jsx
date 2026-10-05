import { useState, useEffect } from 'react'
import Header from './components/Header'
import MealList from './components/MealList'
import MealDetail from './components/MealDetail'
import StatusView from './components/StatusView'

export default function App() {
  const [meals, setMeals] = useState([])
  const [selectedMeal, setSelectedMeal] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [retryKey, setRetryKey] = useState(0)

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

  const handleSelectMeal = (meal) => {
    setSelectedMeal(meal)
  }

  const handleCloseDetail = () => {
    setSelectedMeal(null)
  }

  const handleRetry = () => {
    setRetryKey((prev) => prev + 1)
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
          <div className="master-detail-layout">
            <section className="list-column">
              <h2 className="section-title">מתכונים זמינים ({meals.length})</h2>
              <MealList
                meals={meals}
                selectedMeal={selectedMeal}
                onSelectMeal={handleSelectMeal}
              />
            </section>

            <section className="detail-column">
              <MealDetail
                meal={selectedMeal}
                onClose={selectedMeal ? handleCloseDetail : null}
              />
            </section>
          </div>
        )}
      </main>
    </div>
  )
}
