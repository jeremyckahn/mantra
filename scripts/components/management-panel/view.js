import AEnimaManagementPanel from 'aenima/components/management-panel/main';
import _ from 'underscore';
import Mustache from 'mustache';
import template from 'text!./template.mustache';

var Base = AEnimaManagementPanel.View;
var baseProto = Base.prototype;

var ManagementPanelComponentView = Base.extend({
  template: Mustache.render(
    template,
    {},
    {
      base: AEnimaManagementPanel.template,
    }
  ),

  events: _.extend(
    {
      'click .reset': function() {
        this.emit('requestRecordUndoState');
        this.emit('resetTimeline');
      },
    },
    baseProto.events
  ),

  /**
   * @param {Object} [options] See http://backbonejs.org/#View-constructor
   */
  initialize: function() {
    baseProto.initialize.apply(this, arguments);
  },
});

export default ManagementPanelComponentView;
