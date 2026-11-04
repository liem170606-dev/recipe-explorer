import { render, screen, fireEvent } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { describe, it, expect, vi } from 'vitest'
import MealCard from '../components/MealCard'

describe('רכיב כרטיס מתכון (MealCard)', () => {
  const mockMeal = {
    idMeal: '53014',
    strMeal: 'Pizza Express Margherita',
    strCategory: 'Vegetarian',
    strArea: 'Italian',
    strMealThumb: 'https://example.com/pizza.jpg',
  }

  it('מרנדר את שם המנה המתורגם, תגית קטגוריה וארץ מוצא', () => {
    render(
      <MemoryRouter>
        <MealCard meal={mockMeal} isFavorite={false} onToggleFavorite={() => {}} />
      </MemoryRouter>
    )

    expect(screen.getByText('פיצה מרגריטה איטלקית קלאסית')).toBeInTheDocument()
    expect(screen.getByText('צמחוני')).toBeInTheDocument()
    expect(screen.getByText('מטבח איטלקי')).toBeInTheDocument()
    expect(screen.getByRole('link')).toHaveAttribute('href', '/meals/53014')
  })

  it('לחיצה על כפתור המועדפים מפעילה את פונקציית הקולבק עם מזהה המנה', () => {
    const handleToggleFavorite = vi.fn()

    render(
      <MemoryRouter>
        <MealCard
          meal={mockMeal}
          isFavorite={false}
          onToggleFavorite={handleToggleFavorite}
        />
      </MemoryRouter>
    )

    const favoriteButton = screen.getByRole('button', { name: /הוסף למועדפים/i })
    fireEvent.click(favoriteButton)

    expect(handleToggleFavorite).toHaveBeenCalledTimes(1)
    expect(handleToggleFavorite).toHaveBeenCalledWith('53014')
  })
})
