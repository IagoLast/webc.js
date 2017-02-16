class PElement extends HTMLElement {
  constructor() {
    super();
    this.state = {};
    console.info('constructor');
  }

  get template() {
    return ``;
  }

  get attrs() {
    let attrs = {}
    for (let i = 0; i < this.attributes.length; i++) {
      attrs[this.attributes[i].nodeName] = this.attributes[i].nodeValue;
    }
    return attrs;
  }

  connectedCallback() {
    this.render();
    console.info('connectedCallback', this);
  }

  disconnectedCallback() {
    console.info('disconnectedCallback');
  }

  attributeChangedCallback(attributeName, oldValue, newValue, namespace) {
    console.info('attributeChangedCallback');
  }

  adoptedCallback() {
    console.info('adoptedCallback');
  }

  setState(state) {
    this.state = state;
    this.render();
  }

  render() {
    this.innerHTML = this.template;
  }

}

