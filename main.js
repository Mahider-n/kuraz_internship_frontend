const tasks = [
  { id: 1, title: 'Buy groceries', completed: false },
  { id: 2, title: 'Read a book', completed: true }
];

const taskList = document.getElementById('taskList');
const taskForm = document.getElementById('taskForm');
const taskInput = document.getElementById('taskInput');
const errorMsg = document.getElementById('errorMsg');
const filterButtons = document.querySelectorAll('.filter-btn');

let currentFilter = 'all';

function renderTasks() {
  taskList.innerHTML = '';
  let filteredTasks = tasks;

  if (currentFilter === 'completed') {
    filteredTasks = tasks.filter(t => t.completed);
  } else if (currentFilter === 'pending') {
    filteredTasks = tasks.filter(t => !t.completed);
  }

  if (filteredTasks.length === 0) {
    taskList.innerHTML = '<li style="background:#eee;text-align:center;">No tasks to show</li>';
    return;
  }

  filteredTasks.forEach(task => {
    const li = document.createElement('li');
    li.className = task.completed ? 'completed' : '';

    const span = document.createElement('span');
    span.textContent = task.title;
    span.className = 'task-title';
    span.onclick = () => toggleComplete(task.id);

    const delBtn = document.createElement('button');
    delBtn.textContent = 'Delete';
    delBtn.className = 'delete-btn';
    delBtn.onclick = () => deleteTask(task.id);

    li.appendChild(span);
    li.appendChild(delBtn);

    taskList.appendChild(li);
  });
}

function toggleComplete(id) {
  const task = tasks.find(t => t.id === id);
  if (task) {
    task.completed = !task.completed;
    renderTasks();
  }
}

function deleteTask(id) {
  const index = tasks.findIndex(t => t.id === id);
  if (index !== -1) {
    tasks.splice(index, 1);
    renderTasks();
  }
}

taskForm.addEventListener('submit', e => {
  e.preventDefault();
  const title = taskInput.value.trim();

  if (!title) {
    errorMsg.textContent = 'Task title cannot be empty!';
    return;
  }
  errorMsg.textContent = '';

  const newTask = {
    id: tasks.length ? tasks[tasks.length - 1].id + 1 : 1,
    title,
    completed: false
  };

  tasks.push(newTask);
  taskInput.value = '';
  renderTasks();
});

filterButtons.forEach(btn => {
  btn.addEventListener('click', () => {
    currentFilter = btn.getAttribute('data-filter');
    filterButtons.forEach(b => b.disabled = false);
    btn.disabled = true;
    renderTasks();
  });
});

filterButtons[0].disabled = true;
renderTasks();