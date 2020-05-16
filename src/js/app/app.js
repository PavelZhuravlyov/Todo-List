
import List from '../list/list';
import Task from '../task/task';
import InputTask from '../input//input';
import Store from '../store/store';

class App {
  constructor(rootBlockId) {
    this.$root = document.getElementById(rootBlockId);

    const $list = document.createElement('div');
    const $itemContainer = document.createElement('div');

    $itemContainer.className = 'input-container';
    $list.className = 'task-list';

    this.$root.appendChild($list);
    this.$root.appendChild($itemContainer);

    this.todo = new List(this.initTasks(), $list);
    this.$input = new InputTask($itemContainer);
  }

  initTasks() {
    const initialTasksData = Store.get('tasks') || [];

    return initialTasksData.map((taskData) => {
      const { name, data } = taskData;
      return new Task(name);
    });
  }

  init() {    
    this.render();
  }

  render() {
    this.$input.render();
    this.$root.appendChild(this.todo.renderList());
  }
}

export default App;