define([

  'lateralus'

  ,'./model'
  ,'./view'
  ,'text!./template.mustache'

  ,'rekapi-timeline'

], function (

  Lateralus

  ,Model
  ,View
  ,template


) {
  'use strict';

  var Base = Lateralus.Component;

  var ContainerComponent = Base.extend({
    name: 'container'
    ,Model: Model
    ,View: View
    ,template: template

    ,initialize: function () {
      this.timeline =
        this.lateralus.rekapi.createTimeline(this.view.$timeline[0]);
    }
  });

  return ContainerComponent;
});
