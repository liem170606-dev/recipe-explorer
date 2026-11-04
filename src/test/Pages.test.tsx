import { render, screen } from '@testing-library/react'
import { MemoryRouter, Routes, Route } from 'react-router-dom'
import { describe, it, expect } from 'vitest'
import type { Meal } from '../types/meal'
import MealDetailPage from '../components/MealDetailPage'
import FavoritesPage from '../components/FavoritesPage'
import DiscoverPage from '../components/DiscoverPage'
import NotFoundPage from '../components/NotFoundPage'

const mockMeals: Meal[] = [
  {
    idMeal: '53014',
    strMeal: 'Pizza Express Margherita',
    strCategory: 'Vegetarian',
    strArea: 'Italian',
    strMealThumb: 'https://example.com/pizza.jpg',
    strIngredient1: 'Mozzarella',
    strMeasure1: '70g',
  },
  {
    idMeal: '53065',
    strMeal: 'Sushi',
    strCategory: 'Seafood',
    strArea: 'Japanese',
    strMealThumb: 'https://example.com/sushi.jpg',
    strIngredient1: 'Sushi Rice',
    strMeasure1: '300g',
  },
]

describe('בדיקות עמודים וניתוב (MealDetailPage, FavoritesPage, DiscoverPage, NotFoundPage)', () => {
  it('MealDetailPage שולף את ה-id מהכתובת עם useParams ומציג את פרטי המתכון', () => {
    render(
      <MemoryRouter initialEntries={['/meals/53014']}>
        <Routes>
          <Route
            path="/meals/:id"
            element={
              <MealDetailPage
                meals={mockMeals}
                loading={false}
                error={null}
                onRetry={() => {}}
                favorites={['53014']}
                onToggleFavorite={() => {}}
              />
            }
          />
        </Routes>
      </MemoryRouter>
    )

    expect(
      screen.getByRole('heading', { name: 'פיצה מרגריטה איטלקית קלאסית' })
    ).toBeInTheDocument()
    expect(screen.getByText('גבינת מוצרלה')).toBeInTheDocument()
  })

  it('FavoritesPage מציג את המתכונים המועדפים שנשמרו', () => {
    render(
      <MemoryRouter>
        <FavoritesPage
          meals={mockMeals}
          loading={false}
          error={null}
          onRetry={() => {}}
          favorites={['53065']}
          onToggleFavorite={() => {}}
          onClearFavorites={() => {}}
        />
      </MemoryRouter>
    )

    expect(screen.getByText('סושי רול קלאסי')).toBeInTheDocument()
    expect(
      screen.queryByText('פיצה מרגריטה איטלקית קלאסית')
    ).not.toBeInTheDocument()
  })

  it('DiscoverPage מציג את מחולל המתכון האקראי ואת נתוני הסטטיסטיקות', () => {
    render(
      <MemoryRouter>
        <DiscoverPage
          meals={mockMeals}
          loading={false}
          error={null}
          onRetry={() => {}}
          favorites={[]}
          onToggleFavorite={() => {}}
        />
      </MemoryRouter>
    )

    expect(
      screen.getByRole('button', { name: /הגרל מתכון אחר/i })
    ).toBeInTheDocument()
    expect(screen.getByText(/התפלגות לפי קטגוריה/i)).toBeInTheDocument()
    expect(screen.getByText(/התפלגות לפי מטבח בעולם/i)).toBeInTheDocument()
  })

  it('NotFoundPage מציג הודעת 404 וקישור חזרה לדף הבית', () => {
    render(
      <MemoryRouter>
        <NotFoundPage />
      </MemoryRouter>
    )

    expect(screen.getByText(/404 — העמוד המבוקש לא נמצא/i)).toBeInTheDocument()
    expect(
      screen.getByRole('link', { name: /חזרה לדף הבית/i })
    ).toHaveAttribute('href', '/')
  })
})
