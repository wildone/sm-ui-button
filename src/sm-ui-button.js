import busy from './behaviors/busy';


class SmUiButton {
  beforeRegister() {
    this.is = 'sm-ui-button';

    this.extends = 'button';

    this.properties = {

      icon: {
        type: String,
        value: ''
      }

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
}

Polymer(SmUiButton);
