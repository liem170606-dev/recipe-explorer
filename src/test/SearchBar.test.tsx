import { render, screen, fireEvent } from '@testing-library/react'
import { describe, it, expect, vi } from 'vitest'
import SearchBar from '../components/SearchBar'

describe('רכיב חיפוש וסינון (SearchBar)', () => {
  it('מאפשר הקלדה ומפעיל את פונקציית onSearchChange', () => {
    const handleSearchChange = vi.fn()

    render(
      <SearchBar
        searchTerm=""
        onSearchChange={handleSearchChange}
        selectedCategory="ALL"
        onCategoryChange={() => {}}
        categories={['Beef', 'Pasta', 'Vegetarian']}
        totalResults={10}
        onReset={() => {}}
        showOnlyFavorites={false}
        onToggleShowOnlyFavorites={() => {}}
        favoritesCount={0}
      />
    )

    const input = screen.getByPlaceholderText(/חיפוש מתכון/i)
    fireEvent.change(input, { target: { value: 'פיצה' } })

    expect(handleSearchChange).toHaveBeenCalledWith('פיצה')
  })

  it('מאפשר בחירת קטגוריה ומפעיל את onCategoryChange', () => {
    const handleCategoryChange = vi.fn()

    render(
      <SearchBar
        searchTerm=""
        onSearchChange={() => {}}
        selectedCategory="ALL"
        onCategoryChange={handleCategoryChange}
        categories={['Beef', 'Vegetarian']}
        totalResults={10}
        onReset={() => {}}
        showOnlyFavorites={false}
        onToggleShowOnlyFavorites={() => {}}
        favoritesCount={0}
      />
    )

    const select = screen.getByLabelText(/סינון לפי קטגוריה/i)
    fireEvent.change(select, { target: { value: 'Vegetarian' } })

    expect(handleCategoryChange).toHaveBeenCalledWith('Vegetarian')
  })

  it('מציג כפתור איפוס כאשר יש פילטר פעיל ומאפשר איפוס', () => {
    const handleReset = vi.fn()

    render(
      <SearchBar
        searchTerm="סושי"
        onSearchChange={() => {}}
        selectedCategory="ALL"
        onCategoryChange={() => {}}
        categories={['Vegetarian']}
        totalResults={2}
        onReset={handleReset}
        showOnlyFavorites={false}
        onToggleShowOnlyFavorites={() => {}}
        favoritesCount={0}
      />
    )

    const resetBtn = screen.getByRole('button', { name: /איפוס סינונים/i })
    fireEvent.click(resetBtn)

    expect(handleReset).toHaveBeenCalledTimes(1)
  })
})
