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

    ,provide: {
      /**
       * @return {Rekapi.Actor}
       */
      currentActor: function () {
        return this.actor;
      }
    }

    ,initialize: function () {
      this.actor = this.lateralus.rekapi.addActor({
        context: this.view.$actor[0]
      });
    }
  });

  return PreviewComponent;
});
