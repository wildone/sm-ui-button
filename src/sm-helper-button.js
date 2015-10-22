import busy from './behaviors/busy';


class SmHelperButton {
  beforeRegister() {
    this.is = 'sm-helper-button';

    this.properties = {
      icon: String,
      hasIcon: Boolean
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

  ready() {
    this.hasIcon = !this.icon
  }
}

Polymer(SmHelperButton);
