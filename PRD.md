# PRD — ספר מתכונים (Recipe Explorer)

> עמוד אחד. בלי קוד. מגדיר את מהות האפליקציה, קהל היעד והתנהגות המערכת.

## 1. Pitch
אפליקציית Web אינטראקטיבית מרובת-עמודים (React Router) לגילוי מתכונים מרחבי העולם, המאפשרת חיפוש, סינון וצפייה בדף מתכון ייעודי עם מצרכים והוראות הכנה מפורטות.

## 2. Who it is for
בשלנים ביתיים, סטודנטים וכל מי שמחפש רעיונות והשראה לארוחה הבאה שלו בצורה מהירה, נגישה ונוחה.

## 3. Screens (נתיבי ניווט עם React Router)
- **Home (`/` — דף הבית)** — דף נחיתה והסבר על האפליקציה: יתרונות המערכת, כרטיסי מנות מומלצות, וכפתור כניסה מרכזי לקטלוג.
- **Meals Catalog (`/meals` — קטלוג מתכונים)** — גריד מלא של כרטיסי מנות עם חיפוש דו-לשוני, סינון קטגוריות ופילטר מועדפים.
- **Meal Details (`/meals/:id` — דף מתכון ייעודי)** — דף נפרד ועצמאי של המנה שנבחרה: תמונה גדולה, רשימת מצרכים וכמויות בעברית, שלבי הכנה ממוספרים, קישור ל-YouTube וכפתור חזרה לקטלוג.

## 4. Must-have features
1. ניתוב מלא באמצעות React Router עם 3 מסכים נפרדים וסרגל ניווט עליון קבוע (Navbar).
2. משיכת נתונים חיה מ-TheMealDB API עם החלפה למנות אותנטיות (פיצה מרגריטה איטלקית).
3. טיפול מלא בשלושה מצבי רשת: טעינה (Loading), שגיאה (Error) עם אפשרות ניסיון חוזר, ותצוגת מידע.
4. שורת חיפוש טקסטואלית דו-לשונית (עברית/אנגלית) וסינון מהיר לפי קטגוריית מנות.
5. שמירת מתכונים מועדפים ב-localStorage ופילטר ייעודי למועדפים.

## 5. Acceptance criteria
- When I open the app (`/`), I see a welcoming home screen with feature highlights and a CTA button to enter the recipes catalog.
- When I navigate to `/meals`, I see a full grid of meals with search and filtering capabilities.
- When I click on any meal card, I am routed to `/meals/:id` showing a dedicated full-page view with ingredients, steps, and video.
- When I click the back button on a recipe page, I am taken back to the meals catalog.
- When I toggle the favorite star on any recipe, it updates across the app and persists in `localStorage` across page refreshes.

## 6. Not now
- יצירת מתכונים חדשים ע"י המשתמש ושמירתם בשרת.
- מחשבון ערכים תזונתיים וקלוריות לכל מנה.
- תגובות ודירוג גולשים.

## 7. Data
- **API:** `https://www.themealdb.com/api/json/v1/1/search.php?s=`
- **שדות ברשימה:** `idMeal`, `strMeal`, `strCategory`, `strArea`, `strMealThumb`
- **שדות בפרטים:** `strInstructions`, `strIngredient1..20`, `strMeasure1..20`, `strYoutube`, `strSource`
