import _ from 'underscore';
import Lateralus from 'lateralus';
import template from 'text!./template.mustache';
import ModalComponent from 'aenima/components/modal/main';
import aenimaUtils from 'aenima/utils';

const Base = ModalComponent.View;
const baseProto = Base.prototype;

const HelpComponentView = Base.extend({
  template,

  lateralusEvents: _.extend(
    {
      userRequestToggleHelpModal() {
        this.hidableView.toggle();
      },

      requestQuickCloseHelp() {
        this.hidableView.quickHide();
      },
    },
    baseProto.lateralusEvents
  ),

  /**
   * @param {Object} [options] See http://backbonejs.org/#View-constructor
   */
  initialize() {
    baseProto.initialize.apply(this, arguments);
  },

  /**
   * @override
   */
  getTemplateRenderData() {
    return _.extend(baseProto.getTemplateRenderData.apply(this, arguments), {
      metaKey: aenimaUtils.isMac() ? '⌘' : 'Ctrl',
    });
  },
});

export default HelpComponentView;
