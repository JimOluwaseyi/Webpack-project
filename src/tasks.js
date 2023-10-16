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

  const rightIcon = taskElement.querySelector('.fa-solid');
  const edit = taskElement.querySelector('#edit');
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

export { addNewTask, populateList };
