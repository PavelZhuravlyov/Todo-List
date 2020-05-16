
import List from '../list/list';
import Task from '../task/task';
import InputTask from '../input//input';
import Store from '../store/store';
import HtmlSanitizer from '../html-sanitizer/html-sanitizer';

class App {
  constructor(rootBlockId) {
    this.$root = document.getElementById(rootBlockId);

    const $list = document.createElement('div');
    const $itemContainer = document.createElement('div');

    $itemContainer.className = 'input-container';
    $list.className = 'task-list';

    this.$root.append($list, $itemContainer);

    this.todo = new List(this.initTasks(), $list);
    this.$input = new InputTask($itemContainer);
  }

  initTasks() {
    const initialTasksData = Store.get('tasks') || [];

    return initialTasksData.map((taskData) => {
      const { name, id, data } = taskData;
      return new Task(HtmlSanitizer.encodeHTML(name), { id, ...data });
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