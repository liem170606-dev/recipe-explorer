# PRD — ספר מתכונים (Recipe Explorer)

> עמוד אחד. בלי קוד. מגדיר את מהות האפליקציה, קהל היעד והתנהגות המערכת.

## 1. Pitch
אפליקציית Web אינטראקטיבית במבנה Master-Detail לגילוי מתכונים מרחבי העולם, המאפשרת חיפוש, סינון וצפייה ברשימת מצרכים והוראות הכנה מפורטות.

## 2. Who it is for
בשלנים ביתיים, סטודנטים וכל מי שמחפש רעיונות והשראה לארוחה הבאה שלו בצורה מהירה ונוחה.

## 3. Screens
- **List (רשימת מתכונים)** — כרטיסי מנות המציגים תמונת מנה, שם המתכון, קטגוריית המנה (עוף, פסטה, צמחוני וכו') וארץ מוצא.
- **Details (פאנל פרטים)** — תצוגה מורחבת של המנה שנבחרה: תמונה גדולה, רשימת מצרכים וכמויות, הוראות הכנה צעד-אחר-צעד, וקישור לצפייה בסרטון YouTube.

## 4. Must-have features
1. תצוגת גריד/רשימת מתכונים עשירה מבוססת TheMealDB API.
2. פאנל Master-Detail המציג את פרטי המנה שנבחרה (ה-state נשמר ברכיב האב).
3. טיפול מלא בשלושה מצבי רשת: טעינה (Loading), שגיאה (Error) עם אפשרות ניסיון חוזר, ותצוגת מידע.
4. שורת חיפוש טקסטואלית לפי שם המנה וסינון מהיר לפי קטגוריית מנות.
5. שמירת מתכונים מועדפים ב-localStorage ופילטר ייעודי למועדפים.

## 5. Acceptance criteria
- When I open the app, I see a list of meals with thumbnail images, names, and category tags.
- When I click on a meal card, I see its full ingredients list, measurements, and cooking instructions in the detail panel.
- When I type in the search bar or pick a category from the dropdown, I see only the matching meals in real time.
- When the data is being fetched, I see a loading indicator; if the fetch fails, I see an error message and a retry button.
- When I click the favorite star on a recipe, it stays marked as favorite even after refreshing the page.

## 6. Not now
- יצירת מתכונים חדשים ע"י המשתמש ושמירתם בשרת.
- מחשבון ערכים תזונתיים וקלוריות לכל מנה.
- תגובות ודירוג גולשים.

## 7. Data
- **API:** `https://www.themealdb.com/api/json/v1/1/search.php?s=`
- **שדות ברשימה:** `idMeal`, `strMeal`, `strCategory`, `strArea`, `strMealThumb`
- **שדות בפרטים:** `strInstructions`, `strIngredient1..20`, `strMeasure1..20`, `strYoutube`, `strSource`
