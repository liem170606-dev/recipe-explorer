export interface Meal {
  idMeal: string
  strMeal: string
  strCategory?: string
  strArea?: string
  strInstructions?: string
  strMealThumb?: string
  strYoutube?: string
  strSource?: string
  [key: `strIngredient${number}`]: string | null | undefined
  [key: `strMeasure${number}`]: string | null | undefined
}

export interface MealsApiResponse {
  meals: Meal[] | null
}

export interface TranslatedTitle {
  he: string
  en: string
}

export interface EnrichedIngredient {
  id: string
  name: string
  measure: string
}

export interface StatEntry {
  key: string
  label: string
  count: number
  percentage: number
}

export interface MealStatsSummary {
  totalMeals: number
  totalCategories: number
  totalAreas: number
  categoriesBreakdown: StatEntry[]
  areasBreakdown: StatEntry[]
}
