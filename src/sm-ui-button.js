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
        reflectToAttribute: true
      },

      _content: {
        type: String,
        value: ''
      }

    };
  }

  attached() {
    this._content = Polymer.dom(this).innerHTML.trim();
  }
}

Polymer(SmUiButton);
