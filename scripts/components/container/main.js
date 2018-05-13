import Lateralus from 'lateralus';
import Model from './model';
import View from './view';
import template from 'text!./template.mustache';
import KeybindingsComponent from '../keybindings/main';
import PreviewComponent from '../preview/main';
import ControlPanel from '../control-panel/main';
import StylieComponent from '../stylie/main';
import HelpComponent from '../help/main';

const Base = Lateralus.Component;

const ContainerComponent = Base.extend({
  name: 'container',
  Model,
  View,
  template,

  lateralusEvents: {
    pauseKeybindings() {
      this.keybindingsComponent.dispose();
    },

    resumeKeybindings() {
      this.initKeybindings();
    },
  },

  initialize() {
    this.initKeybindings();

    this.addComponent(PreviewComponent, {
      el: this.view.$preview[0],
    });

    this.addComponent(ControlPanel, {
      el: this.view.$controlPanel[0],
    });

    this.addComponent(HelpComponent, {
      el: this.view.$help[0],
    });

    this.addComponent(StylieComponent, {
      el: this.view.$stylie[0],
    });
  },

  initKeybindings() {
    this.keybindingsComponent = this.addComponent(KeybindingsComponent);
  },
});

export default ContainerComponent;
