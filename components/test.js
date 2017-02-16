const store = Redux.createStore(reducer, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());

class Test extends PElement {
  constructor() {
    super();
    this.state.number = 0;
    store.subscribe(() => this.setState(store.getState()));
  }

  get template() {
    return `
      <h1>Click counter (redux)</h1>
      <h2>${this.state.number}</h2>
    `;
  }

  connectedCallback() {
    this.innerHTML = this.template;
    this.addEventListener('click', this.onClick);
    super.connectedCallback();
  }

  onClick() {
    store.dispatch({
      type: 'INCREMENT'
    })
  }

  mapState(state) {
    this.state.number = state.counter;
  }

  render() {
    this.querySelector('h2').innerHTML = this.state.number;
  }
}

function reducer(state = {
    counter: 0
  }, action) {
  switch (action.type) {
    case 'INCREMENT':
      let counter = state.counter + 1
      return {
        counter
      }
    default:
      return state
  }
}

customElements.define('wc-test', Test);
