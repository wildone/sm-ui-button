const BUSY_HEIGHT_FACTOR = 0.5;

class SmUiButton {
  beforeRegister() {
    this.is = 'sm-ui-button';

    this.extends = 'button';

    this.properties = {

      icon: {
        type: String,
        value: ''
      },

      active: {
        type: Boolean,
        reflectToAttribute: true,
        notify: true,
        value: false
      },

      busy: {
        type: Boolean,
        observer: '_busyChanged',
        reflectToAttribute: true
      },

      _content: {
        type: String,
        value: ''
      }

    };
  }

  _busyChanged(busy) {
    if (busy) {
      this.customStyle['--spinkit-element-color'] = getComputedStyle(this).color;
      this.updateStyles();
    }
  }

  attached() {
    this._content = Polymer.dom(this).innerHTML.trim();
  }
}

Polymer(SmUiButton);
