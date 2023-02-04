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

const Base = AEnimaControlPanelComponent;

const ControlPanelComponent = Base.extend({
  name: 'control-panel',
  Model,
  View,
  template,

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
    cssConfigObject() {
      const motionPanelJson = this.motionPanelComponent.toJSON();
      const exportPanelJson = this.exportPanelComponent.toJSON();

      return _.extend(motionPanelJson, exportPanelJson);
    },
  },

  initialize() {
    this.exportPanelComponent = this.addComponent(
      ExportPanelComponent,
      {
        el: this.view.$exportPanel[0],
      },
      {
        modelAttributes: {
          cssExportClass: 'mantra',
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
