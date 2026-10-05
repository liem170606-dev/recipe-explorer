import { useState } from 'react'
import Header from './components/Header'
import MealList from './components/MealList'
import MealDetail from './components/MealDetail'
import initialMeals from './data/meals.json'

export default function App() {
  const [meals] = useState(initialMeals)
  const [selectedMeal, setSelectedMeal] = useState(null)

  const handleSelectMeal = (meal) => {
    setSelectedMeal(meal)
  }

  const handleCloseDetail = () => {
    setSelectedMeal(null)
  }

  return (
    <div className="app-container">
      <Header />
      <main className="main-content">
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
      </main>
    </div>
  )
}
