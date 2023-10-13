const taskcompleted = (task) => {
  task.completed = true;
};
const taskNotcompleted = (task) => {
  task.completed = false;
};

const allTaskCompleted = (allCompleted) => {
  tasks.filter((task) => task.index !== task.allCompleted);
};


export {taskcompleted, taskNotcompleted, allTaskCompleted}