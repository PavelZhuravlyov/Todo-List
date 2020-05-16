import Button from '../button/button';

class AddTaskButton extends Button {
  constructor(buttonData) {
    super(buttonData);
  }

  addTaskHandler(handler) {
    super.handleClick(handler);
  }
}

export default AddTaskButton;