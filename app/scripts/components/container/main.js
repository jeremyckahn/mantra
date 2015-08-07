define([

  'lateralus'

  ,'./model'
  ,'./view'
  ,'text!./template.mustache'

  ,'mantra.component.preview'
  ,'mantra.component.control-panel'

], function (

  Lateralus

  ,Model
  ,View
  ,template

  ,PreviewComponent
  ,ControlPanel

) {
  'use strict';

  var Base = Lateralus.Component;

  var ContainerComponent = Base.extend({
    name: 'container'
    ,Model: Model
    ,View: View
    ,template: template

    ,initialize: function () {
      this.addComponent(PreviewComponent, {
        el: this.view.$preview[0]
      });

      this.addComponent(ControlPanel, {
        el: this.view.$controlPanel[0]
      });

      this.setupInitialKeyframes();
    }

    ,setupInitialKeyframes: function () {
      this.collectOne('currentActor')
        .keyframe(0, {
          translateX: '0px'
          ,translateY: '0px'
          ,rotate: '0deg'
        })
        .keyframe(1000, {
          translateX: '300px'
          ,translateY: '0px'
          ,rotate: '0deg'
        });
    }
  });

  return ContainerComponent;
});
