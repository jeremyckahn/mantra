import Lateralus from 'lateralus';
import template from 'text!./template.mustache';

const Base = Lateralus.Component.View;
const baseProto = Base.prototype;

const InfoPanelComponentView = Base.extend({
  template: template,

  events: {
    'click .help': function() {
      this.emit('userRequestToggleHelpModal');
    },
  },

  /**
   * @param {Object} [options] See http://backbonejs.org/#View-constructor
   */
  initialize: function() {
    baseProto.initialize.apply(this, arguments);
  },
});

export default InfoPanelComponentView;
