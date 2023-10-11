let tasks = JSON.parse(localStorage.getItem("task")) || [];

const setupDeleteTask = (taskEle, index) => {
  const deleteIcon = taskEle.querySelectorAll(".right .fa-ellipsis-vertical");
  if (deleteIcon) {
    deleteIcon.forEach((del) => {
      del.addEventListener("click", () => {
        taskRemoval(index);
      });
    });
  }
};


const editTask = (taskElement, icon, edit) => {
  taskElement.addEventListener("dblclick", () => {
    if (icon.classList.contains("fa-ellipsis-vertical")) {
      icon.classList.remove("fa-ellipsis-vertical");
      icon.classList.add("fa-trash-can");
      taskElement.style.backgroundColor = "#ffff8752";
      edit.contentEditable = true;
      edit.focus();
    } else {
      icon.classList.remove("fa-trash-can");
      icon.classList.add("fa-ellipsis-vertical");
      taskElement.style.backgroundColor = "";
    }
  });

  edit.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
      edit.contentEditable = false;
      icon.classList.remove("fa-trash-can");
      icon.classList.add("fa-ellipsis-vertical");
      taskElement.style.backgroundColor = "";
    }
  });
};

const generateTaskElement = (task) => {
  const taskElement = document.createElement("li");
  taskElement.classList.add("task");
  taskElement.innerHTML = `
      <div class="left">
        <input type="checkbox" class="checkbox"/>
        <div id="edit">${task.description}</div>
      </div>
      <div class="right">
        <i class="fa-solid fa-ellipsis-vertical"></i>
      </div>
  `;
  const rightIcon = taskElement.querySelector(".fa-solid");
  const edit = taskElement.querySelector("#edit");
  setupDeleteTask(taskElement, task.index);
  editTask(taskElement, rightIcon, edit);

  return taskElement;
};

const populateList = () => {
  const taskList = document.querySelector("#taskList");
  taskList.innerHTML = "";
  tasks.forEach((task) => {
    const taskElement = generateTaskElement(task);
    taskList.appendChild(taskElement);
  });
};

const taskRemoval = (deleteTask) => {
  tasks = tasks.filter((task) => task.index !== deleteTask);
  tasks.forEach((task, idx) => {
    task.index = idx + 1;
    console.log(task);
  });
  populateList();
};

const addNewTask = (title) => {
  tasks.push({
    description: title,
    completed: false,
    index: tasks.length + 1,
  });
  console.log(tasks);
  localStorage.setItem("task", JSON.stringify(tasks))
};

export { addNewTask, populateList };
