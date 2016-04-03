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

      _content: String

    };
  }

  get behaviors() {
    return [
      busy,
      simpla.behaviors.active({
        reflectToAttribute: true
      })
    ];
  }

  attached() {
    this._content = Polymer.dom(this).innerHTML;
  }
}

Polymer(SmUiButton);
