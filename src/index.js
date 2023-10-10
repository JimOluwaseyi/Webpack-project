import './style.css';
import { addNewTask, populateList } from './tasks.js';

const initialize = () => {
  const addTaskBtn = document.querySelector('#addTaskBtn');
  const taskInput = document.querySelector('#taskInput');

  addTaskBtn.addEventListener('click', () => {
    addNewTask(taskInput.value);
    populateList();
    taskInput.value = '';
  });

  taskInput.addEventListener('keyup', (e) => {
    if (e.key === 'Enter') {
      addNewTask(e.target.value);
      e.target.value = '';
      populateList();
    }
  });
  populateList();
};

initialize();
