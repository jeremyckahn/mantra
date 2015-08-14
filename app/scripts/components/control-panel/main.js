define([

  'lateralus'

  ,'./model'
  ,'./view'
  ,'text!./template.mustache'

  ,'aenima.component.control-panel'
  ,'aenima.component.export-panel'

], function (

  Lateralus

  ,Model
  ,View
  ,template

  ,AEnimaControlPanel
  ,ExportPanel

) {
  'use strict';

  var Base = AEnimaControlPanel;

  var ControlPanelComponent = Base.extend({
    name: 'control-panel'
    ,Model: Model
    ,View: View
    ,template: template

    ,initialize: function () {
      this.addComponent(ExportPanel, {
        el: this.view.$exportPanel[0]
      });
    }
  });

  return ControlPanelComponent;
});
