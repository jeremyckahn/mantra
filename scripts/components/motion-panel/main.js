import Lateralus from 'lateralus';
import AEnimaMotionPanel from 'aenima/components/motion-panel/main';
import Model from './model';
import View from './view';
import template from 'text!./template.mustache';

const Base = AEnimaMotionPanel;

const MotionPanelComponent = Base.extend({
  name: 'motion-panel',
  Model: AEnimaMotionPanel.Model,
  View: View,
  template: template,
});

export default MotionPanelComponent;
