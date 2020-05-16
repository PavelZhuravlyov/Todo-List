import { nanoid } from 'nanoid';

import DeleteButton from '../delete-button/delete-button';
import EditTaskButton from '../edit-button/edit-button';
import EditTaskForm from '../edit-task-form/edit-task-form';
import ArrowButton from '../arrow-button/arrow-button';
import CompleteTaskButton from '../complete-button/complete-button';
import EventHandler from '../event/event';
import events from '../events';
import Button from '../button/button';

class Task {
  constructor(name, data={}) {
    this.name = name;
    this.data = data;
    this.id = nanoid();
    this.isCompleted = this.data.isCompleted || false;
    this.$task = document.createElement('div');

    this.initComponents();
  }

  get taskClasses() {
    return `task-info ${ this.isCompleted ? 'task-is-completed' : '' }`;
  }

  updateTaskProps({ number }) {
    this.$task.innerHTML = `
      <div class="task-name-holder">
        <div class="task-index">${ number })</div>
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
      className: 'button-task-complete btn-small'
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

  render(data={}) {
    const $itemContainer = document.createElement('div');
    const $toolsHolder = document.createElement('div');
    const $arrowContainer = document.createElement('div');
    
    this.updateTaskProps(data);
    $itemContainer.className = 'task';
    $toolsHolder.className = 'task-tools';
    $arrowContainer.className = 'arrow-buttons';

    $arrowContainer.append(
      this.$priorityUpButton.button,
      this.$priorityDownButton.button,
    );
    
    $toolsHolder.append(
      $arrowContainer,
      this.$completeButton.button,
      this.$editButton.button,
      this.$deleteButton.button,
    );

    $itemContainer.append(this.$task, $toolsHolder);

    return $itemContainer;
  }
}

export default Task;