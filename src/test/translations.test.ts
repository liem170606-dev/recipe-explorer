import { describe, it, expect } from 'vitest'
import {
  translateCategory,
  translateArea,
  translateMealTitle,
  translateIngredient,
  translateMeasure,
  translateInstructions,
  getYoutubeUrl,
  getEnrichedIngredients,
} from '../utils/translations'

describe('שכבת תרגום והעשרה (Translations Utils)', () => {
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
    const sushiMeal = {
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

    const sushiUrl = getYoutubeUrl({ strMeal: 'Sushi', strYoutube: 'https://www.youtube.com/watch?v=sushi' })
    expect(sushiUrl).toContain('youtube.com')
  })
})
