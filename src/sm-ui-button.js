import busy from './behaviors/busy';

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

      _content: {
        type: String,
        value: ''
      }

    };
  }

  get behaviors() {
    return [
      busy
    ];
  }

  attached() {
    this._content = Polymer.dom(this).innerHTML;
  }
}

Polymer(SmUiButton);
