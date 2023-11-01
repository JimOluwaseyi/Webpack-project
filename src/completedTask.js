const taskcompleted = (task) => {
  task.completed = true;
};
const taskNotcompleted = (task) => {
  task.completed = false;
};
const allTaskCompleted = (alltask) => {
  const newTask = alltask.filter((task) => !task.completed);
  newTask.forEach((task, indx) => {
    task.index = indx + 1;
  });
  return newTask;
};

export { taskcompleted, taskNotcompleted, allTaskCompleted };
