define([

  'lateralus'

  ,'./model'
  ,'./view'
  ,'text!./template.mustache'

  ,'aenima.component.export-panel'

], function (

  Lateralus

  ,Model
  ,View
  ,template

  ,ExportPanel

) {
  'use strict';

  var Base = Lateralus.Component;

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
