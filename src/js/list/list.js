import Task from '../task/task';
import Store from '../store/store';
import ListEventsHandlers from '../list-events-handler/list-events-handler';
import events from '../events';

class List {
  constructor(tasks=[], $parentNode=null) {
    this.$root = $parentNode;
    this.tasks = tasks;

    this.initEventsHandlers();
  }

  initEventsHandlers() {
    new ListEventsHandlers(this).initHandlers();
  }

  addTask(data) {
    const { name, ...restData } = data;

    this.tasks.unshift(new Task(name, restData));
    this.renderList();
  }

  removeTask(id) {
    this.tasks = this.tasks.filter((task) => task.id !== id);
    this.renderList();
  }

  editTask(newTaskData) {
    const { id:taskId, name } = newTaskData;
    let editedTaskIndex;
    const editedTask = this.tasks.find((task, index) => {
      if (task.id === taskId) {
        editedTaskIndex = index;
        return true;
      }
    });

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

    if (this.tasks.length) {
      this.tasks.forEach((task, index) => {
        this.$root.appendChild(task.render({
          number: index + 1,
          isLast: index === this.tasks.length - 1
        }));
      });
    } else {
      this.$root.innerHTML = `
        <div class="empty-message">Your Todo List is empty</div>
      `;
    }

    return this.$root;
  }
}

function swap(arr, index, direction) {
  const temp = arr[index];

  arr[index] = arr[index - direction];
  arr[index - direction] = temp;
}

export default List;