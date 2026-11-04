# PRD — ספר מתכונים (Recipe Explorer)

> עמוד אחד. בלי קוד. מגדיר את מהות האפליקציה, קהל היעד והתנהגות המערכת.
> למסמך מבנה הרכיבים וזרימת המידע המלא ראו: [docs/architecture.md](docs/architecture.md).

## 1. Pitch
אפליקציית Web אינטראקטיבית מרובת-עמודים ב-**React + TypeScript + React Router** לגילוי מתכונים מרחבי העולם, המאפשרת חיפוש דו-לשוני, סינון, צפייה בדף מתכון ייעודי, ניהול עמוד מועדפים והגרלת מתכון אקראי עם סטטיסטיקות חיות.

## 2. Who it is for
בשלנים ביתיים, סטודנטים וכל מי שמחפש רעיונות והשראה לארוחה הבאה שלו בצורה מהירה, נגישה ונוחה בעברית.

## 3. Screens (נתיבי ניווט עם React Router)
- **Home (`/` — דף הבית)** — דף נחיתה והסבר על האפליקציה: יתרונות המערכת, כרטיסי מנות מומלצות, וכפתורי כניסה לקטלוג ולדף ההפתעה.
- **Meals Catalog (`/meals` — קטלוג מתכונים)** — גריד מלא של כרטיסי מנות עם חיפוש דו-לשוני, סינון קטגוריות ופילטר מועדפים.
- **Meal Details (`/meals/:id` — דף מתכון ייעודי)** — דף נפרד ועצמאי של המנה שנבחרה (`useParams`): תמונה גדולה, רשימת מצרכים וכמויות בעברית, שלבי הכנה ממוספרים, קישור ל-YouTube וכפתור חזרה לקטלוג.
- **Favorites (`/favorites` — עמוד המועדפים שלי)** — עמוד ייעודי המרכז את כל המתכונים שהמשתמש שמר ב-`localStorage`, עם אפשרות הסרה פרטנית או ניקוי מרוכז.
- **Discover & Statistics (`/discover` — הפתעה קולינרית וסטטיסטיקות)** — עמוד אינטראקטיבי הכולל מחולל מתכון אקראי ("מה מבשלים היום?") ולוח סטטיסטיקות חי המתפלג לפי קטגוריות ומטבחים בעולם.
- **Not Found (`*` — עמוד 404)** — עמוד שגיאה ידידותי לכתובת שאינה קיימת עם קישורי חזרה לדף הבית ולקטלוג.

## 4. Must-have features
1. קוד TypeScript מלא ומוקפד (`interface` לכל המידע מה-API ול-Props של כל רכיב, ללא `any`).
2. ניתוב מלא באמצעות React Router בין 5 עמודי תוכן + עמוד 404 וסרגל ניווט עליון קבוע (`Navbar` עם `NavLink`).
3. משיכת נתונים חיה ב-100% מ-TheMealDB API באמצעות `fetch` בתוך `useEffect`.
4. טיפול מלא בשלושה מצבי רשת: טעינה (Loading), שגיאה (Error) עם אפשרות ניסיון חוזר, ותצוגת מידע.
5. שורת חיפוש טקסטואלית דו-לשונית (עברית/אנגלית) וסינון מהיר לפי קטגוריית מנות.
6. שמירת מתכונים מועדפים ב-`localStorage` ומערך בדיקות יחידה ורכיבים עם Vitest ו-Vitest UI.

## 5. Acceptance criteria
- When I open the app (`/`), I see a welcoming home screen with feature highlights and CTA buttons to `/meals` and `/discover`.
- When I navigate to `/meals`, I see a full grid of meals with search and category filtering capabilities.
- When I click on any meal card, I am routed to `/meals/:id` (read via `useParams`) showing a dedicated full-page view with ingredients, steps, and video.
- When I navigate to `/favorites`, I see all my saved favorite meals persisted in `localStorage`, and I can remove individual meals or clear the list.
- When I navigate to `/discover`, I can roll a random recipe and view live category and cuisine breakdown charts calculated from the API data.
- When I navigate to an unknown URL, I see a dedicated 404 page (`NotFoundPage`) with links back to the app.

## 6. Not now
- יצירת מתכונים חדשים ע"י המשתמש ושמירתם בשרת.
- מחשבון ערכים תזונתיים וקלוריות לכל מנה.
- תגובות ודירוג גולשים.

## 7. Data
- **API ראשי:** `https://www.themealdb.com/api/json/v1/1/search.php?s=`
- **API משלים (שליפת מנה לפי מזהה):** `https://www.themealdb.com/api/json/v1/1/lookup.php?i=53014`
- **שדות ברשימה:** `idMeal`, `strMeal`, `strCategory`, `strArea`, `strMealThumb`
- **שדות בפרטים:** `strInstructions`, `strIngredient1..20`, `strMeasure1..20`, `strYoutube`, `strSource`
