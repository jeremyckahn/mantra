define([

  'lateralus'

  ,'text!./template.mustache'

  ,'aenima.component.control-panel'

], function (

  Lateralus

  ,template

  ,AEnimaControlPanel

) {
  'use strict';

  var Base = AEnimaControlPanel.View;
  var baseProto = Base.prototype;

  var ControlPanelComponentView = Base.extend({
    template: template

    /**
     * @param {Object} [options] See http://backbonejs.org/#View-constructor
     */
    ,initialize: function () {
      baseProto.initialize.apply(this, arguments);

      // FIXME: For some reason this makes tabs work.  This is isn't necessary
      // in Stylie though.  Strange!
      this.tabsComponent.delegateEvents();
    }
  });

  return ControlPanelComponentView;
});
