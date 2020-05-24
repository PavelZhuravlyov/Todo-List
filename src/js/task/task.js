import DeleteButton from '../delete-button/delete-button';
import EditTaskButton from '../edit-button/edit-button';
import EditTaskForm from '../edit-task-form/edit-task-form';
import ArrowButton from '../arrow-button/arrow-button';
import CompleteTaskButton from '../complete-button/complete-button';
import EventHandler from '../event-handler/event-handler';
import Button from '../button/button';
import events from '../events';

class Task {
  constructor(name, data={}) {
    this.name = name;
    this.data = data;
    this.id = this.data.id || Date.now();
    this.isCompleted = !!this.data.isCompleted;
    this.$task = document.createElement('div');

    this.initComponents();
  }

  get taskClasses() {
    return `task-info ${ this.isCompleted ? 'task-is-completed' : '' }`;
  }

  updateTaskProps({ number }) {
    this.$task.innerHTML = `
      <div class="task-name-holder">
        <div class="task-name">${ this.name }</div>
      </div>
    `;

    this.$task.className = this.taskClasses;
  }

  initComponents() {
    this.$deleteButton = new DeleteButton({
      className: 'delete-task-button'
    });

    this.$editButton = new EditTaskButton();

    this.$completeButton = new CompleteTaskButton({
      innerHTML: this.isCompleted ? 'Uncomplete' : 'Complete',
      className: 'button button-task-complete'
    });

    this.$editForm = new EditTaskForm({
      name: this.name,
      id: this.id
    });

    this.$priorityUpButton = new ArrowButton({
      direction: 1,
      className: 'arrow-task-up'
    });

    this.$priorityDownButton = new ArrowButton({
      direction: -1,
      className: 'arrow-task-down'
    });

    this.$deleteButton.removeHandler(this.removeTaskHandler.bind(this));
    this.$editButton.editTaskHandler(this.editTaskInit.bind(this));
    this.$completeButton.completeTaskHandler(this.completeTask.bind(this));
    this.$priorityUpButton.changePosition(this.changeTaskPriority.bind(this, 1));
    this.$priorityDownButton.changePosition(this.changeTaskPriority.bind(this, -1));
  }

  changeTaskPriority(priorityCount) {
    EventHandler.changeTaskPriority(this.id, priorityCount);
  }

  removeTaskHandler() {
    EventHandler.removeTask(this.id);
    this.$deleteButton.unBindClick();
    this.$editButton.unBindClick();
    this.$completeButton.unBindClick();
    this.$priorityUpButton.unBindClick();
    this.$priorityDownButton.unBindClick();
    this.$editForm.removeEventsHandlers();
  }

  editTaskInit() {
    this.$task.innerHTML = '';
    this.$task.appendChild(this.$editForm.render());
  }

  completeTask() {
    this.isCompleted = !this.isCompleted;
    this.$completeButton.updateContent(this.isCompleted ? 'Uncomplete' : 'Complete');
    EventHandler.completeTask();
  }

  renderPriorityTool(data={}) {
    const { number, isLast } = data;
    const isFirst = number === 1;
    const $arrowContainer = document.createElement('div');

    $arrowContainer.className = 'arrow-buttons';

    if (isFirst && isLast) {
      return '';
    }

    if (isLast) {
      $arrowContainer.append(
        this.$priorityUpButton.button,
      );
    } else if (isFirst) {
      $arrowContainer.append(
        this.$priorityDownButton.button,
      );
    } else {
      $arrowContainer.append(
        this.$priorityUpButton.button,
        this.$priorityDownButton.button,
      );
    }

    return $arrowContainer;
  }

  render(data={}) {
    const $itemContainer = document.createElement('div');
    const $toolsHolder = document.createElement('div');
    const _this = this;
    
    this.updateTaskProps(data);
    $itemContainer.className = 'task';
    $toolsHolder.className = 'task-tools';

    $itemContainer.append(
      this.renderPriorityTool(data)
    );
  
    $toolsHolder.append(
      this.$completeButton.button,
      this.$editButton.button,
      this.$deleteButton.button,
    );

    $itemContainer.append(this.$task, $toolsHolder);

    return $itemContainer;
  }
}

export default Task;