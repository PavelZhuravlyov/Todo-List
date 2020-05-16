import Button from '../button/button';

class CompleteTaskButton extends Button {
  constructor(buttonData) {
    super(buttonData);
  }

  completeTaskHandler(handler) {
    super.handleClick(handler);
  }

  updateContent(content) {
    this.button.innerHTML = content;
  }
}

export default CompleteTaskButton;