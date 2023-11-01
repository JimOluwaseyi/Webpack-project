import {
  taskcompleted,
  taskNotcompleted,
  allTaskCompleted,
} from './completedTask.js';

let tasks = JSON.parse(localStorage.getItem('task')) || [];

// Function to set localstorage initially beofre getting in to the browser
const saveTaskToLocalStorage = () => {
  localStorage.setItem('task', JSON.stringify(tasks));
};

//  Function for Saving  task
const addNewTask = (title) => {
  if (title.trim() !== '') {
    tasks.push({
      description: title,
      completed: false,
      index: tasks.length + 1,
    });
  }

  saveTaskToLocalStorage();
};

//  Edit task manipulation
const editTask = (taskElement, icon, edit, index) => {
  taskElement.addEventListener('dblclick', () => {
    if (icon.classList.contains('fa-ellipsis-vertical')) {
      icon.classList.remove('fa-ellipsis-vertical');
      icon.classList.add('fa-trash-can');
      taskElement.style.backgroundColor = '#ffff8752';
      edit.contentEditable = true;
      edit.focus();
    } else {
      edit.contentEditable = false;
      icon.classList.remove('fa-trash-can');
      icon.classList.add('fa-ellipsis-vertical');
      taskElement.style.backgroundColor = '';
    }
  });

  edit.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
      edit.contentEditable = false;
      edit.focus();
      icon.classList.remove('fa-trash-can');
      icon.classList.add('fa-ellipsis-vertical');
      taskElement.style.backgroundColor = '';
      const task = tasks.find((task) => task.index === index);
      task.description = edit.textContent;
      saveTaskToLocalStorage();
    }
  });
};
// Function to set up the delete task action

const setupDeleteTask = (taskEle, index) => {
  function taskRemoval(deleteTask) {
    tasks = tasks.filter((task) => task.index !== deleteTask);
    tasks.forEach((task, idx) => {
      task.index = idx + 1;
    });
    taskEle.remove();
    saveTaskToLocalStorage();
  }
  const deleteIcon = taskEle.querySelector('.right .fa-ellipsis-vertical');
  if (deleteIcon) {
    deleteIcon.addEventListener('click', () => {
      taskRemoval(index);
    });
  }
};

// Function for Creating Element to be populated to the page

const generateTaskElement = (task) => {
  const taskElement = document.createElement('li');
  taskElement.classList.add('task');
  taskElement.innerHTML = `
      <div class="left">
        <input type="checkbox" class="checkbox"/>
        <div id="edit">${task.description}</div>
      </div>
      <div class="right">
        <i class="fa-solid fa-ellipsis-vertical"></i>
      </div>
  `;
  const rightIcon = taskElement.querySelector('.fa-solid');
  const edit = taskElement.querySelector('#edit');

  const checkBox = taskElement.querySelector('.checkbox');
  checkBox.checked = task.completed;

  if (task.completed) {
    taskcompleted(task);
    edit.style.textDecoration = 'line-through';
    edit.style.color = 'grey';
  }

  checkBox.addEventListener('click', () => {
    task.completed = checkBox.checked; // Update the task's completed property
    saveTaskToLocalStorage();
    if (checkBox.checked) {
      taskcompleted(task);
      edit.style.textDecoration = 'line-through';
      edit.style.color = 'grey';
    } else {
      taskNotcompleted(task);
      edit.style.textDecoration = '';
      edit.style.color = '';
    }
  });

  setupDeleteTask(taskElement, task.index);
  editTask(taskElement, rightIcon, edit, task.index);
  return taskElement;
};

// Function for Populating Created task to the page
const populateList = () => {
  const taskList = document.querySelector('#taskList');
  taskList.innerHTML = '';
  tasks.forEach((task) => {
    const taskElement = generateTaskElement(task);
    taskList.appendChild(taskElement);
  });
};

//  function for deleting all tasks

const clearBtn = document.querySelector('#clearBtn');

clearBtn.addEventListener('click', () => {
  tasks = allTaskCompleted(tasks);
  populateList();
  saveTaskToLocalStorage();
});

export { addNewTask, populateList };
