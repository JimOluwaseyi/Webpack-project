const taskcompleted = (task) => {
  task.completed = true;
};
const taskNotcompleted = (task) => {
  task.completed = false;
};
const allTaskCompleted = (alltask) => alltask.filter((task) => !task.completed);

export { taskcompleted, taskNotcompleted, allTaskCompleted };