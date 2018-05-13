import Lateralus from 'lateralus';
import Model from './model';
import View from './view';
import template from 'text!./template.mustache';

const Base = Lateralus.Component;

const StylieComponent = Base.extend({
  name: 'stylie',
  Model,
  View,
  template,
});

export default StylieComponent;
