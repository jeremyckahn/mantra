import Lateralus from 'lateralus';
import Model from './model';
import View from './view';
import template from 'text!./template.mustache';

const Base = Lateralus.Component;

const StylieComponent = Base.extend({
  name: 'stylie',
  Model: Model,
  View: View,
  template: template,
});

export default StylieComponent;
