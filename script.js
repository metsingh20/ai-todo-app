const todoInput = document.getElementById("todoInput");
const addBtn = document.getElementById("addBtn");
const todoList = document.getElementById("todoList");
const clearCompleted = document.getElementById("clearCompleted");
const languageSelect = document.getElementById("languageSelect");
const charCount = document.getElementById("charCount");

let tasks = [];

// Add Task
addBtn.addEventListener("click", () => {
  const text = todoInput.value.trim();
  if (text === "") return;

  const task = {
    id: Date.now(),
    text,
    completed: false,
    translated: null,
  };

  tasks.push(task);
  todoInput.value = "";
  charCount.textContent = "0";
  renderTasks();
  updateStats();
});

// Update Char Counter
todoInput.addEventListener("input", () => {
  charCount.textContent = todoInput.value.length;
});

// Render All Tasks
function renderTasks(filter = "all") {
  todoList.innerHTML = "";

  let filteredTasks = tasks;
  if (filter === "active") filteredTasks = tasks.filter(t => !t.completed);
  else if (filter === "completed") filteredTasks = tasks.filter(t => t.completed);

  if (filteredTasks.length === 0) {
    document.getElementById("emptyState").style.display = "block";
  } else {
    document.getElementById("emptyState").style.display = "none";
  }

  filteredTasks.forEach(task => {
    const taskEl = document.createElement("div");
    taskEl.className = "todo-item" + (task.completed ? " completed" : "");

    taskEl.innerHTML = `
      <span>${task.translated || task.text}</span>
      <div class="task-actions">
        <button onclick="toggleComplete(${task.id})">✔</button>
        <button onclick="translateTask(${task.id})">🌐</button>
        <button onclick="deleteTask(${task.id})">🗑</button>
      </div>
    `;

    todoList.appendChild(taskEl);
  });
}

// Complete Toggle
function toggleComplete(id) {
  const task = tasks.find(t => t.id === id);
  if (task) {
    task.completed = !task.completed;
    renderTasks(currentFilter);
    updateStats();
  }
}

// Delete Task
function deleteTask(id) {
  tasks = tasks.filter(t => t.id !== id);
  renderTasks(currentFilter);
  updateStats();
}

// Clear Completed
clearCompleted.addEventListener("click", () => {
  tasks = tasks.filter(t => !t.completed);
  renderTasks(currentFilter);
  updateStats();
});

// Filter Buttons
let currentFilter = "all";
document.querySelectorAll(".filter-btn").forEach(btn => {
  btn.addEventListener("click", () => {
    currentFilter = btn.dataset.filter;
    document.querySelectorAll(".filter-btn").forEach(b => b.classList.remove("active"));
    btn.classList.add("active");
    renderTasks(currentFilter);
  });
});

// Translate Task
async function translateTask(id) {
  const task = tasks.find(t => t.id === id);
  if (!task) return;

  const targetLang = languageSelect.value;

  showLoading();
  try {
    const res = await fetch("https://libretranslate.de/translate", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        q: task.text,
        source: "en",
        target: targetLang,
        format: "text"
      })
    });

    const data = await res.json();
    task.translated = data.translatedText;
    renderTasks(currentFilter);
    showNotification(`Translated to ${targetLang.toUpperCase()}`);
  } catch (err) {
    showNotification("Translation failed", true);
  } finally {
    hideLoading();
  }
}

// Stats & Progress
function updateStats() {
  const total = tasks.length;
  const done = tasks.filter(t => t.completed).length;

  document.getElementById("headerTotalTasks").textContent = total;
  document.getElementById("headerCompletedTasks").textContent = done;
  document.getElementById("footerTotalTasks").textContent = total;
  document.getElementById("footerCompletedTasks").textContent = done;

  const percent = total ? Math.round((done / total) * 100) : 0;
  document.getElementById("progressPercentage").textContent = `${percent}%`;
  document.getElementById("progressPath").setAttribute("stroke-dasharray", `${percent}, 100`);
}

// Notification
function showNotification(msg, isError = false) {
  const container = document.getElementById("notificationContainer");
  const note = document.createElement("div");
  note.className = "notification" + (isError ? " error" : "");
  note.textContent = msg;
  container.appendChild(note);
  setTimeout(() => note.remove(), 3000);
}

// Loading Overlay
function showLoading() {
  document.getElementById("loadingOverlay").classList.remove("hidden");
}

function hideLoading() {
  document.getElementById("loadingOverlay").classList.add("hidden");
}

// Initialize
renderTasks();
