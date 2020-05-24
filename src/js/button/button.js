class Button {
  constructor(buttonData) {
    this.defaultProps = {
      className: 'button'
    };
    this.data = buttonData;
    this.$button = document.createElement('button');
    this.initProps();

    this.handlers = {};
  }

  initProps() {
    const buttonProps = {
      ...this.defaultProps,
      ...this.data
    };

    for (const prop in buttonProps) {
      this.$button[prop] = buttonProps[prop];
    }
  }

  handleClick(handler, params={}) {
    this.handlers.click = handler;
    this.$button.addEventListener('click', handler, params);
  }

  unBindClick(handler) {
    this.$button.removeEventListener('click', this.handlers.click);
    delete this.handlers.click;
  }

  get button() {
    return this.$button;
  }
}

export default Button;