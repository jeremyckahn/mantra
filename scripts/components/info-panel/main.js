import Lateralus from 'lateralus';
import Model from './model';
import View from './view';
import template from 'text!./template.mustache';

var Base = Lateralus.Component;

var InfoPanelComponent = Base.extend({
  name: 'info-panel',
  Model: Model,
  View: View,
  template: template,
});

export default InfoPanelComponent;
