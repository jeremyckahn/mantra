import Lateralus from 'lateralus';
import Model from './model';
import View from './view';
import template from 'text!./template.mustache';

var Base = Lateralus.Component;

var PreviewComponent = Base.extend({
  name: 'preview',
  Model: Model,
  View: View,
  template: template,

  lateralusEvents: {
    'rekapi:addActor': function(rekapi, actor) {
      // NOTE: This will need to change to support multiple actors
      actor.context = this.view.$actor[0];
    },
  },
});

export default PreviewComponent;
