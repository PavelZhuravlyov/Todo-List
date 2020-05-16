import EventHandler from '../event/event';
import Button from '../button/button';

const ESC_CODE = 27;

class EditTaskForm {
  constructor(taskData) {
    this.taskData = taskData;
    this.$form = document.createElement('form');

    this.$cancelEditButton = new Button({
      innerHTML: 'Cancel',
      className: 'btn-small red'
    });

    this.$cancelEditButton.handleClick(this.cancelEdit.bind(this));
    this.$form.addEventListener('submit', this.handleEditTask.bind(this));

    this.cancelEditCopy = this.cancelEdit.bind(this);

    this.handleKeyDown = (event) => {
      if (event.keyCode === ESC_CODE) {
        return this.cancelEdit();
      }
    }
  }

  initEvents() {
    document.addEventListener('keydown', this.handleKeyDown);
  }

  updateTaskInfo(taskData) {
    this.taskData = taskData;
  }

  cancelEdit() {
    EventHandler.editTask({
      ...this.taskData,
    });

    document.removeEventListener('keydown', this.handleKeyDown);
  }

  get formData() {
    const newTaskData = {};
    const inputs = this.$form.getElementsByTagName('input');

    for (const $input of inputs) {
      newTaskData[$input.name] = $input.value;
    }

    return newTaskData;
  }

  handleEditTask(event) {
    event.preventDefault();

    EventHandler.editTask({
      ...this.taskData,
      ...this.formData
    });

    this.updateTaskInfo({
      ...this.taskData,
      ...this.formData
    });
  }

  initForm() {
    this.$form.innerHTML = `
      <input autofocus type="text" name="name" value="${ this.taskData.name }" />
      <button type="submit" class="btn-small">Edit task</button>
    `;

    this.$form.appendChild(this.$cancelEditButton.button);
  }

  render() {
    this.initForm();
    this.initEvents();
    return this.$form;
  }
}

export default EditTaskForm;