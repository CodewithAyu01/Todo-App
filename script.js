const taskInput = document.getElementById('task-input');
const addBtn = document.getElementById('add-btn');
const taskList = document.getElementById('task-list');
const modal = document.getElementById('delete-modal');
const progressFill = document.getElementById('progress-fill');
const progressText = document.getElementById('progress-text');

let taskToDelete = null;

// Add task
addBtn.addEventListener('click', addTask);
taskInput.addEventListener('keypress', function(e) {
  if (e.key === 'Enter') addTask();
});

function addTask() {
  const taskText = taskInput.value.trim();
  if (!taskText) return;

  const li = document.createElement('li');
  li.innerHTML = `
    <span>${taskText}</span>
    <div class="action-buttons">
      <div class="icon-btn edit-btn"><i class='bx bx-pencil'></i></div>
      <div class="icon-btn delete-btn"><i class='bx bx-trash'></i></div>
    </div>
  `;

  taskList.appendChild(li);
  taskInput.value = '';

  // Complete task on click
  li.querySelector('span').addEventListener('click', () => {
    li.classList.toggle('completed');
    updateProgress(); // update whenever a task is marked/unmarked
  });

  // Edit task
  li.querySelector('.edit-btn').addEventListener('click', () => {
    const newTask = prompt('Edit your task:', li.querySelector('span').innerText);
    if (newTask !== null && newTask.trim() !== '') {
      li.querySelector('span').innerText = newTask.trim();
    }
  });

  // Delete task
  li.querySelector('.delete-btn').addEventListener('click', () => {
    taskToDelete = li;
    modal.style.display = 'flex';
  });

  updateProgress(); // update after adding new task
}

// Modal buttons
document.getElementById('confirm-yes').addEventListener('click', () => {
  if (taskToDelete) {
    taskToDelete.remove();
    taskToDelete = null;
    updateProgress(); // update after deleting a task
  }
  modal.style.display = 'none';
});
document.getElementById('confirm-no').addEventListener('click', () => {
  taskToDelete = null;
  modal.style.display = 'none';
});

// Update progress
function updateProgress() {
  const tasks = taskList.querySelectorAll('li');
  const completed = taskList.querySelectorAll('li.completed');
  const total = tasks.length;
  const done = completed.length;

  // calculate percentage
  const percentage = total === 0 ? 0 : (done / total) * 100;

  // fill the progress bar
  progressFill.style.width = percentage + '%';

  // update counter text
  progressText.innerText = `${done} of ${total} tasks completed`;
}
