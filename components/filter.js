class Filter extends PElement {
  constructor() {
    super();
    this.state.elements = ['c', 'c++', 'python', 'java', 'javascript', 'ocaml'];
  }

  get template() {
    return `
      <h1>List filtering</h1>
      <input type="text">
      <div class="items">
        ${this.state.elements.map(element => `<p> ${element} </p> `).join('')}
      </div>
    `;
  }

  connectedCallback() {
    this.innerHTML = this.template;
    this.querySelector('input').addEventListener('input', this.onChange.bind(this));
  }

  render() {
    let query = this.state.query;
    let elements = this.state.elements;
    let filtered = query ? elements.filter(item => item.includes(query)) : elements;
    this.querySelector('div.items').innerHTML = filtered.map(element => `<p> ${element}  </p> `).join('');
  }

  onChange() {
    this.state.query = event.target.value
    this.setState(this.state)
  }
}

customElements.define('wc-filter', Filter);
