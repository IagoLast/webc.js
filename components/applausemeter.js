class ApplauseMeter extends PElement {
  constructor() {
    super();
    // Web Audio API
    this.audioContext = new AudioContext();
    this.analyser = this.audioContext.createAnalyser();
    this.analyser.fftSize = 256;
  }

  get template() {
    return `
      <h1>Audio Level</h1>
      <canvas width="800" height="300"> </canvas>
    `;
  }

  connectedCallback() {
    super.connectedCallback();
    this.canvas = this.querySelector('canvas');
    this.canvasCtx = this.canvas.getContext('2d');
    this.getUserAudio()
      .then(this.connectStreamWithAudioAnalyser.bind(this))
      .then(this.drawLoop.bind(this));
  }

  getUserAudio() {
    return navigator.mediaDevices.getUserMedia({
      audio: true,
      video: false
    });
  }

  connectStreamWithAudioAnalyser(stream) {
    let source = this.audioContext.createMediaStreamSource(stream);
    source.connect(this.analyser);
  }

  drawLoop() {
    requestAnimationFrame(this.drawLoop.bind(this));

    let bufferLength = this.analyser.frequencyBinCount;
    let dataArray = new Uint8Array(bufferLength);
    let barWidth = (this.canvas.width / bufferLength);
    let x = 0;

    this._clearCanvas();

    this.analyser.getByteFrequencyData(dataArray);
    for (let i = 0; i < bufferLength; i++) {
      this._drawbar(x, barWidth, dataArray[i]);
      x += barWidth + 1;
    }
  };

  _clearCanvas() {
    this.canvasCtx.fillStyle = '#f0f0f0';
    this.canvasCtx.fillRect(0, 0, this.canvas.width, this.canvas.width);
  }

  _drawbar(x, barWidth, barHeight) {
    this.canvasCtx.fillStyle = 'green';
    this.canvasCtx.fillRect(x, this.canvas.height - barHeight, barWidth, barHeight);
    x += barWidth + 1;
  }


}

customElements.define('wc-applausemeter', ApplauseMeter);

