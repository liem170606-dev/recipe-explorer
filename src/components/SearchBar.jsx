export default function SearchBar({
  searchTerm,
  onSearchChange,
  selectedCategory,
  onCategoryChange,
  categories,
  totalResults,
  onReset,
  showOnlyFavorites,
  onToggleShowOnlyFavorites,
  favoritesCount,
}) {
  const hasActiveFilters =
    searchTerm.trim().length > 0 ||
    selectedCategory !== 'ALL' ||
    showOnlyFavorites

  return (
    <section className="search-filter-section" aria-label="חיפוש וסינון מתכונים">
      <div className="search-filter-controls">
        {/* שדה חיפוש טקסטואלי */}
        <div className="search-input-wrapper">
          <span className="search-icon" aria-hidden="true">🔍</span>
          <input
            type="text"
            className="search-input"
            placeholder="חיפוש מתכון לפי שם..."
            value={searchTerm}
            onChange={(e) => onSearchChange(e.target.value)}
            aria-label="חיפוש מתכון לפי שם"
          />
          {searchTerm && (
            <button
              type="button"
              className="clear-search-btn"
              onClick={() => onSearchChange('')}
              aria-label="נקה שדה חיפוש"
              title="נקה חיפוש"
            >
              ✕
            </button>
          )}
        </div>

        {/* תפריט סינון לפי קטגוריה */}
        <div className="category-select-wrapper">
          <label htmlFor="category-select" className="visually-hidden">
            סינון לפי קטגוריה
          </label>
          <select
            id="category-select"
            className="category-select"
            value={selectedCategory}
            onChange={(e) => onCategoryChange(e.target.value)}
          >
            <option value="ALL">כל הקטגוריות</option>
            {categories.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
        </div>

        {/* כפתור סינון מועדפים */}
        <button
          type="button"
          className={`favorites-filter-btn ${showOnlyFavorites ? 'active' : ''}`}
          onClick={onToggleShowOnlyFavorites}
          aria-pressed={showOnlyFavorites}
          title="הצג רק מתכונים שסומנו כמועדפים"
        >
          ★ מועדפים ({favoritesCount})
        </button>

        {/* כפתור איפוס סינונים */}
        {hasActiveFilters && (
          <button
            type="button"
            className="reset-filters-btn"
            onClick={onReset}
            title="איפוס כל הסינונים"
          >
            איפוס סינונים
          </button>
        )}
      </div>

      {/* תצוגת מספר תוצאות */}
      <div className="results-count" aria-live="polite">
        {showOnlyFavorites ? 'מציג מתכונים מועדפים: ' : 'נמצאו '}
        <strong>{totalResults}</strong> מתכונים
      </div>
    </section>
  )
}
