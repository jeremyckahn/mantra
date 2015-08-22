define([

  'lateralus'

  ,'text!./template.mustache'

  // Silent import
  ,'rekapi-timeline'

], function (

  Lateralus

  ,template

) {
  'use strict';

  var Base = Lateralus.Component.View;
  var baseProto = Base.prototype;

  var ContainerComponentView = Base.extend({
    template: template

    ,className: 'aenima'

    /**
     * @param {Object} [options] See http://backbonejs.org/#View-constructor
     */
    ,initialize: function () {
      baseProto.initialize.apply(this, arguments);
    }

    ,deferredInitialize: function () {
      this.timeline =
        this.lateralus.rekapi.createTimeline(this.$timeline[0]);

      // Bridge some events across Lateralus apps
      [
        'rekapi:timelineModified'
      ].forEach(function (event) {
        this.amplify(this.timeline, event);
      }.bind(this));

      [
        'tweenableCurveCreated'
      ].forEach(function (event) {
        this.timeline.amplify(this.lateralus, event);
      }.bind(this));
    }
  });

  return ContainerComponentView;
});
