import Task from '../task/task';

class TaskManager {
  constructor(tasks) {
    this._tasks = tasks;
  }

  remove(id) {
    this._tasks.removeTask(id);
  }

  edit(id, data) {
    const editableTask = this._tasks.find((task) => task === id);

    if (editableTask) {
      editableTask = {
        ...data
      };
    }
  }

  get tasks() {
    return this._tasks;
  }

  renderTools(tasks) {
    return tasks.map((task) => {
      const $deleteButton = document.createElement('button');

      $deleteButton.innerText = 'Delete';
      $deleteButton.addEventListener('click', () => { // TODO: потенциальная ошибка утечки памяти или множественного вызова событий 
        this.remove(task.id);
      });

      return $deleteButton;
    });
  }
}

export default TaskManager;