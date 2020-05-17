import EventHandler from '../event-handler/event-handler';
import Button from '../button/button';
import HtmlSanitizer from '../html-sanitizer/html-sanitizer';

const ESC_CODE = 27;

class EditTaskForm {
  constructor(taskData) {
    this.taskData = taskData;
    this.$form = document.createElement('form');

    this.initTools();
    this.initHandlers();
  }

  initTools() {
    this.$cancelEditButton = new Button({
      innerHTML: 'Cancel',
      className: 'btn-small red edit-task-form-button'
    });

    this.$submitEditButton = new Button({
      innerHTML: 'Edit task',
      className: 'btn-small edit-task-form-button',
      type: 'submit'
    });
  }

  initHandlers() {
    const editTaskHandler = this.handleEditTask.bind(this);

    this.$submitEditButton.handleClick(editTaskHandler)
    this.$cancelEditButton.handleClick(this.cancelEdit.bind(this));
    this.$form.addEventListener('submit', editTaskHandler);

    this.handleKeyDown = (event) => {
      if (event.keyCode === ESC_CODE) {
        this.$form.removeEventListener('submit', editTaskHandler);
        return this.cancelEdit();
      }
    }
  }

  initEventClose() {
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

  removeEventsHandlers() {
    this.$cancelEditButton.unBindClick();
    this.$submitEditButton.unBindClick();
    document.removeEventListener('keydown', this.handleKeyDown);
  }

  get formData() {
    const newTaskData = {};
    const inputs = this.$form.getElementsByTagName('input');

    for (const $input of inputs) {
      if ($input.value && $input.value.trim()) {
        newTaskData[$input.name] = HtmlSanitizer.encodeHTML($input.value.trim());
      }
    }

    return newTaskData;
  }

  handleEditTask(event) {
    event.preventDefault();
    const taskData = {
      ...this.taskData,
      ...this.formData
    };

    EventHandler.editTask(taskData);
    this.updateTaskInfo(taskData);
    document.removeEventListener('keydown', this.handleKeyDown);
  }

  initForm() {
    const $input = document.createElement('input');
    $input.value = this.taskData.name;
    $input.name = 'name';

    this.$form.innerHTML = '';

    this.$form.append(
      $input,
      this.$submitEditButton.button,
      this.$cancelEditButton.button
    );
  }

  render() {
    this.initEventClose();
    this.initForm();
    return this.$form;
  }
}

export default EditTaskForm;