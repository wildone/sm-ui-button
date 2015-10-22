import busy from './behaviors/busy';


class SmHelperButton {
  beforeRegister() {
    this.is = 'sm-helper-button';

    this.properties = {

      icon: String,

      _noIcon: {
        type: Boolean,
        computed: '_computeNoIcon(icon)'
      },

      busy: {
        type: Boolean,
        reflectToAttribute: true
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

  _computeNoIcon(icon) {
    return !this.icon
  }
}

Polymer(SmHelperButton);
