class Button {
  constructor(buttonData) {
    this.defaultProps = {
      className: 'btn-small'
    };
    this.data = buttonData;
    this.$button = document.createElement('button');
    this.initProps();
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
    this.$button.addEventListener('click', handler, params);
  }

  get button() {
    return this.$button;
  }
}

export default Button;