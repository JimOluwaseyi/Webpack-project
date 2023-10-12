import './style.css';

const checkboxList = document.getElementById('checkboxList');
const tasks = [
  {
    description: 'Fix my Brake',
    completed: false,
    index: 1,
  },
  {
    description: 'Clean my Kitchen',
    completed: false,
    index: 2,
  },
  {
    description: 'Fix my Mirror',
    completed: false,
    index: 3,
  },
  {
    description: 'Wash my Car',
    completed: false,
    index: 4,
  },
];

const taskIteration = () => {
  checkboxList.innerHTML = '';
  tasks.forEach((task) => {
    const listItem = document.createElement('li');
    listItem.innerText = task.description;
    const checkBox = document.createElement('input');
    checkBox.type = 'checkbox';
    const ulContainer = document.createElement('div');
    ulContainer.className = 'ulContainer';
    const ul = document.createElement('ul');
    ul.className = 'gap';
    const icon = document.createElement('i');
    icon.className = 'fa-solid fa-ellipsis-vertical';
    ul.append(checkBox, listItem);
    ulContainer.append(ul, icon);
    checkboxList.append(ulContainer);
  });
};
taskIteration();
