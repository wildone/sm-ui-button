import busy from './behaviors/busy';


class SmUiButton {
  beforeRegister() {
    this.is = 'sm-ui-button';

    this.properties = {

      icon: String,

      _noIcon: {
        type: Boolean,
        computed: '_computeNoIcon(icon)',
        value: true
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
    return !icon
  }
}

Polymer(SmUiButton);
