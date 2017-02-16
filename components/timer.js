class Timer extends PElement {
  constructor() {
    super();
    this.state.time = new Date();
  }

  get template() {
    return `
     <h1>Timer</h1>
     <p>${this.state.time.toTimeString().split(' ')[0]}</p>
    `;
  }

  connectedCallback() {
    super.connectedCallback();
    setInterval(this.increment.bind(this), 1000);
  }

  increment() {
    this.state.time = new Date();
    this.setState(this.state)
  }
}

customElements.define('wc-timer', Timer);
