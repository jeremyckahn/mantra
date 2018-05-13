import Lateralus from 'lateralus';
import Model from './model';
import View from './view';
import template from 'text!./template.mustache';

const Base = Lateralus.Component;

const PreviewComponent = Base.extend({
  name: 'preview',
  Model,
  View,
  template,

  lateralusEvents: {
    'rekapi:addActor': function(rekapi, actor) {
      // NOTE: This will need to change to support multiple actors
      actor.context = this.view.$actor[0];
    },
  },
});

export default PreviewComponent;
