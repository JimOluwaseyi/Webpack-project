let tasks = [];

const generateTaskElement = (task) => {
  const taskElement = document.createElement('li');
  taskElement.classList.add('task');
  taskElement.innerHTML = `
      <div class="left">
        <input type="checkbox"/>
        <span>${task.description}</span>
      </div>
      <div class="right">
        <i class="fa-solid fa-ellipsis-vertical"></i>
      </div>
  `;
  const deleteIcon = taskElement.querySelectorAll(
    '.right .fa-ellipsis-vertical',
  );

  const taskRemoval = (deleteTask) => {
    tasks = tasks.filter((task) => task.index !== deleteTask);
    populateList();
  };

  if (deleteIcon) {
    deleteIcon.forEach((del) => {
      del.addEventListener('click', () => {
        taskRemoval(task.index);
      });
    });
  }

  taskElement.addEventListener('dblclick', (e) => {
    const rightIcon = e.currentTarget.querySelector('.fa-solid');
    if (rightIcon.classList.contains('fa-ellipsis-vertical')) {
      rightIcon.classList.remove('fa-ellipsis-vertical');
      rightIcon.classList.add('fa-trash-can');
      taskElement.style.backgroundColor = '#ffff8752';
    } else {
      rightIcon.classList.remove('fa-trash-can');
      rightIcon.classList.add('fa-ellipsis-vertical');
      taskElement.style.backgroundColor = '';
    }
  });
  return taskElement;
};

const populateList = () => {
  const taskList = document.querySelector('#taskList');
  taskList.innerHTML = '';

  tasks.forEach((task) => {
    const taskElement = generateTaskElement(task);
    taskList.appendChild(taskElement);
  });
};

const addNewTask = (title) => {
  tasks.push({
    description: title,
    completed: false,
    index: tasks.length + 1,
  });
  // console.log(tasks);
};

export { addNewTask, populateList };
