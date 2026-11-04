import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { describe, it, expect } from 'vitest'
import Navbar from '../components/Navbar'

describe('רכיב סרגל הניווט (Navbar)', () => {
  it('מרנדר את שם האתר ואת כותרת המשנה כהלכה', () => {
    render(
      <MemoryRouter>
        <Navbar favoriteCount={0} />
      </MemoryRouter>
    )

    expect(screen.getByText('ספר המתכונים העולמי')).toBeInTheDocument()
    expect(screen.getByText('מתכונים נבחרים מכל העולם')).toBeInTheDocument()
  })

  it('מכיל קישורי ניווט תקינים לדף הבית, כל המתכונים, מועדפים והפתעה', () => {
    render(
      <MemoryRouter>
        <Navbar favoriteCount={2} />
      </MemoryRouter>
    )

    const homeLink = screen.getByRole('link', { name: /דף הבית/i })
    expect(homeLink).toHaveAttribute('href', '/')

    const mealsLink = screen.getByRole('link', { name: /כל המתכונים/i })
    expect(mealsLink).toHaveAttribute('href', '/meals')

    const favLink = screen.getByRole('link', { name: /המועדפים שלי/i })
    expect(favLink).toHaveAttribute('href', '/favorites')

    const discoverLink = screen.getByRole('link', { name: /הפתעה וסטטיסטיקות/i })
    expect(discoverLink).toHaveAttribute('href', '/discover')
  })

  it('מציג את כמות המועדפים המעודכנת בתגית המועדפים', () => {
    render(
      <MemoryRouter>
        <Navbar favoriteCount={5} />
      </MemoryRouter>
    )

    expect(screen.getByText('5')).toBeInTheDocument()
  })
})
