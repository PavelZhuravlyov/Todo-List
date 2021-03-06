import EventHandler from '../event-handler/event-handler';
import AddTaskButton from '../add-button/add-button';
import HtmlSanitizer from '../html-sanitizer/html-sanitizer';

const $addTaskButton = new AddTaskButton({ innerHTML: 'Add task' });
const defaultInputProps = {
  className: 'input-field',
  placeholder: 'Enter task name'
};

class InputTask {
  constructor($root, inputProps={}) {
    this.$root = $root;
    this.inputProps = inputProps;
    this.$form = document.createElement('form');
    this.$input = document.createElement('input');

    this.initProps();
    this.initForm();
    $addTaskButton.addTaskHandler(this.addTaskHandler.bind(this));
  }

  initProps() {
    const inputProps = {
      ...defaultInputProps,
      ...this.inputProps
    };

    for (const prop in inputProps) {
      this.$input[prop] = inputProps[prop];
    }
  }

  initForm() {
    this.$form.addEventListener('submit', (event) => {
      event.preventDefault();
    });

    this.$form.append(this.$input, $addTaskButton.button);
  }

  addTaskHandler() {
    const taskName = HtmlSanitizer.encodeHTML(this.$input.value.trim());

    if (taskName) {
      EventHandler.addTask(taskName);
      this.$input.value = '';
    }
  }

  render() {
    this.$root.append(this.$form);
  }
}

export default InputTask;