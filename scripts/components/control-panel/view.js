import Lateralus from 'lateralus';
import template from 'text!./template.mustache';
import AEnimaControlPanel from 'aenima/components/control-panel/main';

const Base = AEnimaControlPanel.View;
const baseProto = Base.prototype;

const ControlPanelComponentView = Base.extend({
  template: template,

  lateralusEvents: {
    setupInitialState: function() {
      this.tabsComponent.selectTab(this.$infoTab);
    },
  },

  /**
   * @param {Object} [options] See http://backbonejs.org/#View-constructor
   */
  initialize: function() {
    baseProto.initialize.apply(this, arguments);
  },
});

export default ControlPanelComponentView;
