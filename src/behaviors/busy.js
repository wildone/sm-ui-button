import Spinner from 'spin.js';
const easings = simpla.constants.easings;

export default {
  observers: [
    '_toggleBusy(busy)'
  ],

  _toggleBusy(busy) {
    if (busy) {
      this._goBusy();
    } else {
      this._stopBusy();
    }
  },

  created() {
    // Init the spinner
    this._spinner = new Spinner();
  },

  _initSpinner() {
    let height,
        radius,
        width,
        offset,
        opts;

    height = parseFloat(window.getComputedStyle(this).height);
    offset = height * 1.4 / 2 + 'px';

  	// If the button is tall we can afford some padding
    if (height > 32) {
      height *= 0.8;
    }

    radius = height * 0.2,
  	length = radius * 0.6,
  	width = radius < 7 ? 2 : 3;

    opts = {
      color: window.getComputedStyle(this).color,
      lines: 12,
      radius: radius,
      length: length,
      width: width,
      left: offset,
      zIndex: ''
    }

    Object.assign(this._spinner.opts, opts);
  },

  get _buttonPadding() {
    return this.__buttonPadding || (this.__buttonPadding = window.getComputedStyle(this).paddingLeft);
  },

  get _busyAnimation() {

    return {
      target: this,
      frames: [
        { 'padding-left': this._buttonPadding },
        { 'padding-left': this.offsetHeight * 1.4 }
      ],
      opts: {
        open: {
          easing: easings.easeOutBack,
          fill: 'both',
          duration: 200
        },
        close: {
          easing: easings.easeOutCubic,
          fill: 'both',
          duration: 180
        }
      }
    }
  },

  _goBusy() {
    let { target, frames, opts } = this._busyAnimation;
    this._initSpinner();
    this.animate(frames, opts.open);
    this._spinner.spin(this);
  },

  _stopBusy() {
    let { target, frames, opts } = this._busyAnimation;
    this._spinner.stop();
    this.animate(frames.reverse(), opts.close);

  }




}
