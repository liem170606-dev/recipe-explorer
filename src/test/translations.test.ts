import { describe, it, expect } from 'vitest'
import type { Meal } from '../types/meal'
import {
  translateCategory,
  translateArea,
  translateMealTitle,
  translateIngredient,
  translateMeasure,
  translateInstructions,
  getYoutubeUrl,
  getEnrichedIngredients,
  filterMeals,
  computeMealStats,
} from '../utils/translations'

describe('שכבת תרגום, סינון, סטטיסטיקות והעשרה (Translations & Logic Utils)', () => {
  it('מתרגם קטגוריות לעברית כהלכה', () => {
    expect(translateCategory('Dessert')).toBe('קינוחים')
    expect(translateCategory('Vegetarian')).toBe('צמחוני')
    expect(translateCategory('Chicken')).toBe('עוף')
    expect(translateCategory('Seafood')).toBe('דגים ופירות ים')
  })

  it('מתרגם ארצות ומטבחים לעברית', () => {
    expect(translateArea('Italian')).toBe('איטלקי')
    expect(translateArea('Japanese')).toBe('יפני')
    expect(translateArea('Turkish')).toBe('טורקי')
    expect(translateArea('Spanish')).toBe('ספרדי')
  })

  it('מתרגם שמות מנות לעברית אותנטית', () => {
    const pizza = translateMealTitle('Pizza Express Margherita')
    expect(pizza.he).toBe('פיצה מרגריטה איטלקית קלאסית')

    const sushi = translateMealTitle('Sushi')
    expect(sushi.he).toBe('סושי רול קלאסי')

    const falafel = translateMealTitle('Falafel')
    expect(falafel.he).toBe('פלאפל ביתי אסלי')
  })

  it('מתרגם מצרכים לעברית מלאה', () => {
    expect(translateIngredient('passata')).toBe('רוטב עגבניות פאסאטה איטלקי')
    expect(translateIngredient('mozzarella')).toBe('גבינת מוצרלה')
    expect(translateIngredient('basil')).toBe('עלי בזיליקום טריים')
    expect(translateIngredient('oregano')).toBe('אורגנו מיובש')
    expect(translateIngredient('yeast')).toBe('שמרים')
    expect(translateIngredient('salmon')).toBe('סלמון')
  })

  it('מתרגם יחידות מידה וכמויות לעברית', () => {
    expect(translateMeasure('1 tsp')).toBe('1 כפית')
    expect(translateMeasure('1 1/2 tsp')).toBe('1 וחצי כפיות')
    expect(translateMeasure('150ml')).toBe('150 מ״ל')
    expect(translateMeasure('225g')).toBe('225 גרם')
    expect(translateMeasure('pinch')).toBe('קורט')
  })

  it('מספק הוראות הכנה ממוספרות ומפורטות בעברית', () => {
    const pizzaSteps = translateInstructions({ strMeal: 'Pizza Express Margherita' })
    expect(Array.isArray(pizzaSteps)).toBe(true)
    expect(pizzaSteps.length).toBeGreaterThan(0)
    expect(pizzaSteps[0]).toContain('תנור')
  })

  it('מעשיר מצרכים חסרים (כגון סלמון/טונה, אצות נורי ואבוקדו בסושי)', () => {
    const sushiMeal: Partial<Meal> = {
      strMeal: 'Sushi',
      strIngredient1: 'Sushi Rice',
      strMeasure1: '300g',
      strIngredient2: 'Rice Wine',
      strMeasure2: '100ml',
    }
    const ingredients = getEnrichedIngredients(sushiMeal)
    const names = ingredients.map((i) => i.name)

    expect(names.some((n) => n.includes('סלמון') || n.includes('טונה'))).toBe(true)
    expect(names.some((n) => n.includes('אצות נורי'))).toBe(true)
    expect(names.some((n) => n.includes('אבוקדו'))).toBe(true)
  })

  it('מבטיח קישור YouTube פעיל ותקין לכל מתכון', () => {
    const pizzaUrl = getYoutubeUrl({ strMeal: 'Pizza Express Margherita' })
    expect(pizzaUrl).toContain('youtube.com')

    const sushiUrl = getYoutubeUrl({
      strMeal: 'Sushi',
      strYoutube: 'https://www.youtube.com/watch?v=sushi',
    })
    expect(sushiUrl).toContain('youtube.com')
  })

  it('מסנן מתכונים לפי טקסט חיפוש בעברית, קטגוריה ומועדפים (filterMeals)', () => {
    const sampleMeals: Meal[] = [
      {
        idMeal: '53014',
        strMeal: 'Pizza Express Margherita',
        strCategory: 'Vegetarian',
        strArea: 'Italian',
      },
      {
        idMeal: '53065',
        strMeal: 'Sushi',
        strCategory: 'Seafood',
        strArea: 'Japanese',
      },
      {
        idMeal: '52785',
        strMeal: 'Falafel',
        strCategory: 'Vegetarian',
        strArea: 'Egyptian',
      },
    ]

    // סינון לפי שם בעברית
    const byHebrewName = filterMeals(sampleMeals, 'פיצה', 'ALL', false, [])
    expect(byHebrewName).toHaveLength(1)
    expect(byHebrewName[0].idMeal).toBe('53014')

    // סינון לפי קטגוריה
    const byCategory = filterMeals(sampleMeals, '', 'Vegetarian', false, [])
    expect(byCategory).toHaveLength(2)

    // סינון לפי מועדפים בלבד
    const onlyFavs = filterMeals(sampleMeals, '', 'ALL', true, ['53065'])
    expect(onlyFavs).toHaveLength(1)
    expect(onlyFavs[0].strMeal).toBe('Sushi')
  })

  it('מחשב סטטיסטיקות של קטגוריות ומטבחים בצורה מדויקת (computeMealStats)', () => {
    const sampleMeals: Meal[] = [
      { idMeal: '1', strMeal: 'Pizza', strCategory: 'Vegetarian', strArea: 'Italian' },
      { idMeal: '2', strMeal: 'Lasagne', strCategory: 'Pasta', strArea: 'Italian' },
      { idMeal: '3', strMeal: 'Falafel', strCategory: 'Vegetarian', strArea: 'Egyptian' },
    ]

    const stats = computeMealStats(sampleMeals)
    expect(stats.totalMeals).toBe(3)
    expect(stats.totalCategories).toBe(2)
    expect(stats.totalAreas).toBe(2)
    expect(stats.categoriesBreakdown[0].key).toBe('Vegetarian')
    expect(stats.categoriesBreakdown[0].count).toBe(2)
    expect(stats.areasBreakdown[0].key).toBe('Italian')
    expect(stats.areasBreakdown[0].count).toBe(2)
  })
})
