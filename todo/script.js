document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('task-form');
  const taskInput = document.getElementById('task-input');
  const taskList = document.getElementById('task-list');
  const prioritySelect = document.getElementById('priority');
  const toggleTheme = document.getElementById('toggle-theme');

  // Load saved theme
  loadTheme();

  // Load tasks from localStorage
  loadTasks();

  // Theme toggle
  toggleTheme.addEventListener('click', () => {
    document.body.classList.toggle('dark');
    const isDark = document.body.classList.contains('dark');
    toggleTheme.textContent = isDark ? '☀' : '🌙';
    localStorage.setItem('theme', isDark ? 'dark' : 'light');
  });

  // Add task on form submit
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const taskText = taskInput.value.trim();
    const priority = prioritySelect.value;

    if (!taskText) return;

    const task = { text: taskText, priority };
    saveTask(task);
    displayTask(task);
    taskInput.value = '';
    taskList.classList.remove('hidden');
  });

  function saveTask(task) {
    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    tasks.push(task);
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }

  function loadTasks() {
    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    if (tasks.length > 0) {
      taskList.classList.remove('hidden');
      tasks.forEach(displayTask);
    }
  }

  function loadTheme() {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
      document.body.classList.add('dark');
      toggleTheme.textContent = '☀';
    } else {
      toggleTheme.textContent = '🌙';
    }
  }

  function deleteTask(task) {
    let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    tasks = tasks.filter(t => t.text !== task.text || t.priority !== task.priority);
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }

  function displayTask(task) {
    const li = document.createElement('li');
    li.innerHTML = `
      ${task.text} - ${task.priority.toUpperCase()}
      <button class="delete-btn">✖</button>
    `;
    li.querySelector('.delete-btn').addEventListener('click', () => {
      li.remove();
      deleteTask(task);
    });
    taskList.appendChild(li);
  }
});
