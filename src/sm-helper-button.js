class SmHelperButton {
  beforeRegister() {
    this.is = 'sm-helper-button';

    this.properties = {
      icon: String
    };
  }

  get behaviors() {
    return [
      simpla.behaviors.active({
        reflectToAttribute: true
      })
    ];
  }
}

Polymer(SmHelperButton);
