import { Link } from 'react-router-dom'
import { translateMealTitle, translateCategory, translateArea } from '../utils/translations'

export default function HomePage({ meals = [] }) {
  // בחירת 3 מתכונים בולטים לתצוגה מקדימה בדף הבית
  const featuredMeals = meals.filter((m) => {
    const key = (m.strMeal || '').toLowerCase()
    return (
      key.includes('pizza') ||
      key.includes('sushi') ||
      key.includes('falafel') ||
      key.includes('hummus')
    )
  }).slice(0, 3)

  return (
    <div className="home-page">
      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-content">
          <span className="hero-badge">✨ מסע קולינרי בינלאומי</span>
          <h1 className="hero-title">
            גלו מתכונים מובחרים <br />
            <span className="hero-highlight">מרחבי העולם כולו</span>
          </h1>
          <p className="hero-description">
            ברוכים הבאים ל<strong>ספר המתכונים העולמי</strong>! כאן תמצאו מגוון עשיר של מנות אותנטיות
            מהמטבח האיטלקי, היפני, הים-תיכוני, האמריקאי ועוד.
            כל מתכון כולל רשימת מצרכים מדויקת עם כמויות, שלבי הכנה ברורים בעברית,
            וסרטון הדרכה ישיר מ-YouTube.
          </p>
          <div className="hero-buttons">
            <Link to="/meals" className="btn btn-primary btn-large">
              🍲 כניסה לכל המתכונים
            </Link>
          </div>
        </div>

        <div className="hero-stats">
          <div className="stat-card">
            <span className="stat-number">25+</span>
            <span className="stat-label">מתכונים בינלאומיים</span>
          </div>
          <div className="stat-card">
            <span className="stat-number">100%</span>
            <span className="stat-label">תרגום מלא לעברית</span>
          </div>
          <div className="stat-card">
            <span className="stat-number">15+</span>
            <span className="stat-label">מטבחים ותרבויות</span>
          </div>
          <div className="stat-card">
            <span className="stat-number">⭐</span>
            <span className="stat-label">שמירת מועדפים מקומית</span>
          </div>
        </div>
      </section>

      {/* Feature Highlights */}
      <section className="features-section">
        <h2 className="section-title">למה לבשל איתנו?</h2>
        <div className="features-grid">
          <div className="feature-item">
            <div className="feature-icon">🌍</div>
            <h3 className="feature-title">מטבחים מכל העולם</h3>
            <p className="feature-text">
              פיצה איטלקית פריכה, סושי יפני קלאסי, פלאפל אסלי, מרקים עשירים וקינוחים מפנקים.
            </p>
          </div>

          <div className="feature-item">
            <div className="feature-icon">📖</div>
            <h3 className="feature-title">הוראות שלב-אחר-שלב</h3>
            <p className="feature-text">
              שלבי הכנה ממוספרים, ברורים ומדויקים בעברית שמותאמים לבשלנים ביתיים.
            </p>
          </div>

          <div className="feature-item">
            <div className="feature-icon">🎥</div>
            <h3 className="feature-title">סרטוני וידאו ביוטיוב</h3>
            <p className="feature-text">
              לכל מתכון מצורף קישור ישיר לווידאו הדרכה מקצועי שמראה בדיוק איך להכין את המנה.
            </p>
          </div>

          <div className="feature-item">
            <div className="feature-icon">⭐</div>
            <h3 className="feature-title">שמירת מתכונים מועדפים</h3>
            <p className="feature-text">
              סמנו את המתכונים שאהבתם בכוכב — הם יישמרו בדפדפן שלכם לגישה מהירה גם לאחר רענון.
            </p>
          </div>
        </div>
      </section>

      {/* Featured Meals Preview */}
      {featuredMeals.length > 0 && (
        <section className="featured-meals-section">
          <div className="section-header">
            <div>
              <h2 className="section-title">טעימה קטנה מהתפריט</h2>
              <p className="section-subtitle">מנות אהובות ומומלצות שתוכלו להכין כבר היום</p>
            </div>
            <Link to="/meals" className="btn btn-secondary">
              צפייה בכל המתכונים ⬅️
            </Link>
          </div>

          <div className="featured-grid">
            {featuredMeals.map((meal) => {
              const titleInfo = translateMealTitle(meal.strMeal)
              return (
                <Link
                  key={meal.idMeal}
                  to={`/meals/${meal.idMeal}`}
                  className="featured-card"
                  title={`מעבר למתכון ${titleInfo.he}`}
                >
                  <div className="featured-image-wrap">
                    <img
                      src={meal.strMealThumb}
                      alt={titleInfo.he}
                      className="featured-image"
                      loading="lazy"
                    />
                    <span className="featured-tag">
                      {translateArea(meal.strArea)}
                    </span>
                  </div>
                  <div className="featured-info">
                    <span className="featured-cat">
                      {translateCategory(meal.strCategory)}
                    </span>
                    <h3 className="featured-name">{titleInfo.he}</h3>
                    <span className="featured-arrow">למתכון המלא 👈</span>
                  </div>
                </Link>
              )
            })}
          </div>
        </section>
      )}

      {/* Bottom CTA Banner */}
      <section className="bottom-cta-banner">
        <h2>מוכנים להתחיל לבשל?</h2>
        <p>מעל 25 מתכונים נהדרים מחכים לכם עם כל הפרטים והסרטונים.</p>
        <Link to="/meals" className="btn btn-primary btn-large">
          קדימה, בואו נבשל! 👨‍🍳
        </Link>
      </section>
    </div>
  )
}
