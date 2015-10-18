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
