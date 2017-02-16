class Binding extends PElement {
  constructor() {
    super();
    this.state.text = '';
  }

  get template() {
    return `
      <section>
        <h1>Data binding</h1>
        <input type="text" name="bind" />
        <p>${this.state.text}</p>
      </section>
    `;
  }

  connectedCallback() {
    this.innerHTML = this.template;
    this.querySelector('input').addEventListener('input', this.onChange.bind(this));
  }

  onChange(event) {
    this.state.text = event.target.value
    this.setState(this.state)
  }

  render() {
    this.querySelector('p').innerHTML = this.state.text;
  }
}


customElements.define('wc-binding', Binding);

