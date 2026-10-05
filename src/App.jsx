import { useState } from 'react'
import Header from './components/Header'
import MealList from './components/MealList'
import initialMeals from './data/meals.json'

export default function App() {
  const [meals] = useState(initialMeals)

  const handleSelectMeal = (meal) => {
    console.log('Selected meal:', meal.strMeal)
  }

  return (
    <div className="app-container">
      <Header />
      <main className="main-content">
        <section className="content-area">
          <h2 className="section-title">מתכונים נבחרים ({meals.length})</h2>
          <MealList
            meals={meals}
            selectedMeal={null}
            onSelectMeal={handleSelectMeal}
          />
        </section>
      </main>
    </div>
  )
}
