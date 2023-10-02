const addButton = document.getElementById('addButton');
const newTaskInput = document.getElementById('newTask');
const pendingTasksList = document.getElementById('pendingTasks');
const completedTasksList = document.getElementById('completedTasks');

addButton.addEventListener('click', addTask);

function addTask() {
  const taskText = newTaskInput.value.trim();
  if (taskText !== '') {
    const taskItem = document.createElement('li');
    taskItem.innerHTML = `
      <span>${taskText}</span>
      <button class="completeButton">Complete</button>
      <button class="deleteButton">Delete</button>
    `;
    pendingTasksList.appendChild(taskItem);

    const completeButton = taskItem.querySelector('.completeButton');
    completeButton.addEventListener('click', completeTask);

    const deleteButton = taskItem.querySelector('.deleteButton');
    deleteButton.addEventListener('click', deleteTask);

    newTaskInput.value = '';
  }
}

function completeTask(event) {
  const taskItem = event.target.parentElement;
  taskItem.classList.toggle('completed');
  completedTasksList.appendChild(taskItem);
  event.target.textContent = 'Undo';
  event.target.removeEventListener('click', completeTask);
  event.target.addEventListener('click', undoTask);
}

function undoTask(event) {
  const taskItem = event.target.parentElement;
  taskItem.classList.toggle('completed');
  pendingTasksList.appendChild(taskItem);
  event.target.textContent = 'Complete';
  event.target.removeEventListener('click', undoTask);
  event.target.addEventListener('click', completeTask);
}

function deleteTask(event) {
  const taskItem = event.target.parentElement;
  taskItem.remove();
}
