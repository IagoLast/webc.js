class Image extends PElement {
  constructor() {
    super();
  }

  get template() {
    return `<img width="100" src="${this.attrs.src}" alt="Cute Cat"> `;
  }

  connectedCallback() {
    this.addEventListener('click', this.onClick);
    super.connectedCallback();
  }

  onClick() {
    this.state.counter++;
    this.setState(this.state)
  }
}

customElements.define('wc-image', Image);
