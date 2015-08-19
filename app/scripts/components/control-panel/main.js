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

  ,AEnimaControlPanelComponent
  ,ExportPanelComponent

) {
  'use strict';

  var Base = AEnimaControlPanelComponent;

  var ControlPanelComponent = Base.extend({
    name: 'control-panel'
    ,Model: Model
    ,View: View
    ,template: template

    ,initialize: function () {
      this.addComponent(ExportPanelComponent, {
        el: this.view.$exportPanel[0]
      }, {
        modelAttributes: {
          cssExportClass: 'stylie'
          ,analyticsUrl:
            'https://ga-beacon.appspot.com/UA-42910121-1/stylie?pixel'
        }
      });
    }
  });

  return ControlPanelComponent;
});
