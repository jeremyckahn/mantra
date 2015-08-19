define([

  'underscore'
  ,'lateralus'

  ,'./model'
  ,'./view'
  ,'text!./template.mustache'

  ,'aenima.component.control-panel'
  ,'aenima.component.export-panel'

], function (

  _
  ,Lateralus

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

    ,provide: {
      /**
       * @return {{
       *   name: string,
       *   fps: number,
       *   vendors: Array.<string>,
       *   //isCentered: boolean,
       *   iterations: boolean|undefined
       * }}
       */
      cssConfigObject: function () {
        //var motionPanelJson = this.motionPanelComponent.toJSON();
        var exportPanelJson = this.exportPanelComponent.toJSON();

        return _.extend(/*motionPanelJson, */exportPanelJson);
      }
    }

    ,initialize: function () {
      this.exportPanelComponent = this.addComponent(ExportPanelComponent, {
        el: this.view.$exportPanel[0]
      }, {
        modelAttributes: {
          cssExportClass: 'mantra'
          ,analyticsUrl: 'FIXME'
          ,enableOrientationControls: false
        }
      });
    }
  });

  return ControlPanelComponent;
});
