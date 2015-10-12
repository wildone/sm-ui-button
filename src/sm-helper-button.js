class SmHelperButton {
  beforeRegister() {
    this.is = 'sm-helper-button';

    this.properties = {
      icon: String
    };

    this.listeners = {
      'tap': 'tapHandler'
    };
  }

  tapHandler() {
    // Do something
  }
}

Polymer(SmHelperButton);
