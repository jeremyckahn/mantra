define([

  'lateralus'

  ,'./model'
  ,'./view'
  ,'text!./template.mustache'

], function (

  Lateralus

  ,Model
  ,View
  ,template

) {
  'use strict';

  var Base = Lateralus.Component;

  var PreviewComponent = Base.extend({
    name: 'preview'
    ,Model: Model
    ,View: View
    ,template: template

    ,lateralusEvents: {
      'rekapi:addActor': function (rekapi, actor) {
        // NOTE: This will need to change to support multiple actors
        actor.context = this.view.$actor[0];
      }
    }
  });

  return PreviewComponent;
});
