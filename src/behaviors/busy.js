import Spinner from 'spin.js';

const easings = simpla._constants.easings,
      OFFSET_FACTOR = 1.4,
      HEIGHT_PERCENTAGE = 0.8,
      RADIUS_FACTOR = 0.2,
      LENGTH_FACTOR = 0.6,
      WIDTH_LIMIT = 7,
      SMALL_WIDTH = 2,
      BIG_WIDTH = 3,
      LINES = 12,
      OPEN_DURATION = 200,
      CLOSE_DURATION = 180,
      WARNING_MSG = 'busy cannot be called before element is attached';

export default {

  properties: {
    busy: {
      type: Boolean,
      observer: '_busyChanged',
      reflectToAttribute: true
    }
  },

  get _spinnerOpts() {
    const height = parseFloat(this._buttonHeight) * HEIGHT_PERCENTAGE,
          radius = height * RADIUS_FACTOR,
          length = radius * LENGTH_FACTOR,
          width = radius < WIDTH_LIMIT ? SMALL_WIDTH : BIG_WIDTH,
          left = parseFloat(this._buttonHeight) * OFFSET_FACTOR / 2 + 'px',
          color = this._buttonColor,
          lines = LINES,
          zIndex = '';

    return { color, lines, radius, length, width, left, zIndex };
  },

  get _buttonPaddingLeft() {
    if (!this.__buttonPaddingLeft) {
      this.__buttonPaddingLeft = window.getComputedStyle(this).paddingLeft;
    }

    return this.__buttonPaddingLeft;
  },

  get _buttonHeight() {
    if (!this.__buttonHeight) {
      this.__buttonHeight = window.getComputedStyle(this).height;
    }

    return this.__buttonHeight;
  },

  get _buttonColor() {
    if (!this.__buttonColor) {
      this.__buttonColor = window.getComputedStyle(this).color;
    }

    return this.__buttonColor;
  },

  get _busyAnimation() {
    const START_PADDING = this._buttonPaddingLeft,
          END_PADDING = this.offsetHeight * OFFSET_FACTOR + 'px';

    return {
      target: this,
      frames: [
        { paddingLeft: START_PADDING },
        { paddingLeft: END_PADDING }
      ],
      opts: {
        open: {
          easing: easings.easeOutBack,
          fill: 'both',
          duration: OPEN_DURATION
        },
        close: {
          easing: easings.easeOutCubic,
          fill: 'both',
          duration: CLOSE_DURATION
        }
      }
    }
  },

  /**
   * Observer of busy property. Triggers _stopBusy and _goBusy animations depending
   * 	on busy state. To trigger _stopBusy, wasBusy must be true
   * @param  {Boolean} busy    If currently busy
   * @param  {Boolean} wasBusy If was busy
   * @return {undefined}
   */
  _busyChanged(busy, wasBusy) {
    let isReady = this._spinner && window.getComputedStyle(this).height;

    if (!isReady) {
      console.warn(WARNING_MSG);
      return;
    }

    if (busy) {
      this._goBusy()
    } else if (wasBusy) {
      this._stopBusy();
    }
  },

  _goBusy() {
    let { target, frames, opts } = this._busyAnimation;

    Object.assign(this._spinner.opts, this._spinnerOpts);

    this.animate(frames, opts.open);
    this._spinner.spin(this);
  },

  _stopBusy() {
    let { target, frames, opts } = this._busyAnimation;

    this.animate(frames.reverse(), opts.close);
    this._spinner.stop();
  },

  attached() {
    let spinner = new Spinner();
    this._spinner = spinner;
  },
}
