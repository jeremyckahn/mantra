import _ from 'underscore';
import Lateralus from 'lateralus';
import Model from './model';
import View from './view';
import template from 'text!./template.mustache';
import AEnimaControlPanelComponent from 'aenima/components/control-panel/main';
import ExportPanelComponent from 'aenima/components/export-panel/main';
import MotionPanelComponent from '../motion-panel/main';
import ManagementPanelComponent from '../management-panel/main';
import InfoPanelComponent from '../info-panel/main';

var Base = AEnimaControlPanelComponent;

var ControlPanelComponent = Base.extend({
  name: 'control-panel',
  Model: Model,
  View: View,
  template: template,

  provide: {
    /**
     * @return {{
     *   name: string,
     *   fps: number,
     *   vendors: Array.<string>,
     *   isCentered: boolean,
     *   iterations: boolean|undefined
     * }}
     */
    cssConfigObject: function() {
      var motionPanelJson = this.motionPanelComponent.toJSON();
      var exportPanelJson = this.exportPanelComponent.toJSON();

      return _.extend(motionPanelJson, exportPanelJson);
    },
  },

  initialize: function() {
    this.exportPanelComponent = this.addComponent(
      ExportPanelComponent,
      {
        el: this.view.$exportPanel[0],
      },
      {
        modelAttributes: {
          cssExportClass: 'mantra',
          analyticsUrl:
            'https://ga-beacon.appspot.com/UA-67487259-1/mantra?pixel',
        },
      }
    );

    this.motionPanelComponent = this.addComponent(
      MotionPanelComponent,
      {
        el: this.view.$motionPanel[0],
      },
      {
        modelAttributes: {
          enablePathToggle: false,
          enableCenterToggle: false,
        },
      }
    );

    this.managementPanelComponent = this.addComponent(
      ManagementPanelComponent,
      {
        el: this.view.$managementPanel[0],
      }
    );

    this.infoPanelComponent = this.addComponent(InfoPanelComponent, {
      el: this.view.$infoPanel[0],
    });
  },
});

export default ControlPanelComponent;
