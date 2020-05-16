import Task from '../task/task';
import Store from '../store/store';
import events from '../events';

class List {
  constructor(tasks=[], $parentNode=null) {
    this.$root = $parentNode;
    this.tasks = tasks;

    this.initEvents();
  }

  initEvents() {
    document.addEventListener(events.removeTask, (event) => {
      const { detail } = event;
      const { taskId } = detail;

      this.removeTask(taskId);
    });

    document.addEventListener(events.addTask, (event) => {
      const { detail } = event;
      const { taskName } = detail;

      this.addTask({ name: taskName });
    });

    document.addEventListener(events.editTask, (event) => {
      const { detail:newTaskData } = event;
      this.editTask(newTaskData);
    });

    document.addEventListener(events.completeTask, () => {
      this.renderList();
    });

    document.addEventListener(events.changeTaskPriority, (event) => {
      const { detail } = event;
      const { id, priorityCount } = detail;

      this.changeTaskPriority(id, priorityCount);
    });
  }

  addTask(data) {
    const { name, ...restData } = data;

    this.tasks.unshift(new Task(name));
    this.renderList();
  }

  removeTask(id) {
    this.tasks = this.tasks.filter((task) => task.id !== id);
    this.renderList();
  }

  editTask(newTaskData) {
    const { id:taskId, name } = newTaskData;
    const editedTask = this.tasks.find((task) => task.id === taskId);
    const editedTaskIndex = this.tasks.findIndex((task) => task.id === taskId);

    editedTask.name = name;

    this.tasks.splice(editedTaskIndex, 1, editedTask);
    this.renderList();
  }

  saveTasks() {
    const neededTaskData = this.tasks.map((task) => {
      const { id, name, isCompleted, data } = task;

      return {
        id,
        name,
        data: {
          ...data,
          isCompleted,
        }
      }
    });

    Store.save('tasks', JSON.stringify(neededTaskData));
  }

  changeTaskPriority(id, priorityCount) {
    const taskIndex = this.tasks.findIndex((task) => task.id === id);

    if (taskIndex === 0 && priorityCount === 1 ||
        taskIndex === this.tasks.length - 1 && priorityCount === -1) {
      return;
    }

    swap(this.tasks, taskIndex, priorityCount);
    this.renderList();
  }

  renderList() {
    this.saveTasks();
    this.$root.innerHTML = '';

    this.tasks.forEach((task, index) => {
      this.$root.appendChild(task.render({
        number: index + 1
      }));
    });

    return this.$root;
  }
}

function swap(arr, index, direction) {
  const temp = arr[index];

  arr[index] = arr[index - direction];
  arr[index - direction] = temp;
}

export default List;