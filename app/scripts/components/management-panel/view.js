define([

  'aenima.component.management-panel'

  ,'underscore'
  ,'mustache'

  ,'text!./template.mustache'

], function (

  AEnimaManagementPanel

  ,_
  ,Mustache

  ,template

) {
  'use strict';

  var Base = AEnimaManagementPanel.View;
  var baseProto = Base.prototype;

  var ManagementPanelComponentView = Base.extend({
    template: Mustache.render(template, {}, {
      base: AEnimaManagementPanel.template
    })

    ,events: _.extend({
      'click .reset': function () {
        this.emit('requestRecordUndoState');
        this.emit('resetTimeline');
      }
    }, baseProto.events)

    /**
     * @param {Object} [options] See http://backbonejs.org/#View-constructor
     */
    ,initialize: function () {
      baseProto.initialize.apply(this, arguments);
    }
  });

  return ManagementPanelComponentView;
});
