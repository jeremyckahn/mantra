import _ from 'underscore';
import Mustache from 'mustache';
import Lateralus from 'lateralus';
import AEnimaMotionPanel from 'aenima/components/motion-panel/main';
import template from 'text!./template.mustache';

const Base = AEnimaMotionPanel.View;
const baseProto = Base.prototype;

const MotionPanelComponentView = Base.extend({
  template: Mustache.render(template, {
    base: AEnimaMotionPanel.template,
  }),

  events: _.extend(
    {
      'click .launch-stylie': function() {
        this.emit('requestOpenStylie');
      },
    },
    baseProto.events
  ),

  /**
   * @param {Object} [options] See http://backbonejs.org/#View-constructor
   */
  initialize() {
    baseProto.initialize.apply(this, arguments);
  },
});

export default MotionPanelComponentView;
