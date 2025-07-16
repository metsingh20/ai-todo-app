# Developer Guide – AI To-Do App

## 📁 Project Structure

ai-todo-app/
├── index.html # Main HTML structure
├── style.css # Styling and animations
├── script.js # JavaScript logic (add, complete, translate)
├── PRD.md # Product planning document
├── USER_GUIDE.md # How to use the app
└── DEV_GUIDE.md # How the app was built


---

## 🛠️ Tech Stack

- **Frontend:** HTML5, CSS3, JavaScript (No frameworks)
- **Translation API:** [LibreTranslate](https://libretranslate.de)
- **AI Tools:** Claude Code, ChatGPT
- **Version Control:** Git + GitHub
- **Deployment:** Vercel

---

## 🔍 Key Features and Code Summary

| Feature              | Code Location    | Description |
|----------------------|------------------|-------------|
| Add Task             | `addBtn` click   | Adds task to list with timestamp ID |
| Mark Complete        | `toggleComplete()` | Toggles task `completed` property |
| Filter Tasks         | `.filter-btn` buttons | Filters tasks by type |
| Translate Task       | `translateTask()` | Uses LibreTranslate API to convert text |
| Progress Stats       | `updateStats()`  | Tracks and shows total/completed tasks |
| Notifications        | `showNotification()` | Temporary popup messages |
| Character Counter    | `charCount` span | Live count of input characters |

---

## 🤖 How AI Was Used

- **Claude Code**: Helped generate app layout (HTML & CSS)
- **ChatGPT**: Assisted with:
  - JavaScript logic (rendering, filtering)
  - API integration for translation
  - Error handling, UX enhancements
- **LibreTranslate API**: Used to translate tasks on-the-fly

---

## 🚀 Running the Project

### Locally
1. Clone the repository:
   ```bash
   git clone https://github.com/YOUR_USERNAME/ai-todo-app
   cd ai-todo-app
