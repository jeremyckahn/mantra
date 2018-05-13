import Lateralus from 'lateralus';
import Model from './model';
import View from './view';
import template from 'text!./template.mustache';

const Base = Lateralus.Component;

const InfoPanelComponent = Base.extend({
  name: 'info-panel',
  Model,
  View,
  template,
});

export default InfoPanelComponent;
