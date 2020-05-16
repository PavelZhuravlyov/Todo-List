import Button from '../button/button';

import './edit-button.css';

const defaultProps = {
  className: 'edit-button',
  innerHTML: `
    <svg class="edit-button-icon" height="512" viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg">
      <g>
        <path d="m384.721 0-323.626 323.627-61.095 188.373 188.374-61.094 323.626-323.627zm84.853
        127.279-42.427 42.427-84.853-84.853 42.426-42.427zm-388.611 232.331 71.427 71.428-32.036 
        10.39-49.782-49.782zm14.501-27.925 225.617-225.618 31.82 31.82-225.618
        225.617zm53.032 53.032 225.618-225.619 31.82 31.82-225.618 225.619zm-88.313 38.965 28.136 28.136-41.642 13.505z"/>
      </g>
    </svg>
  `
};

class EditTaskButton extends Button {
  constructor(data) {
    super({ ...data, ...defaultProps });
  }

  editTaskHandler(handler) {
    super.handleClick(handler);
  }
}

export default EditTaskButton;