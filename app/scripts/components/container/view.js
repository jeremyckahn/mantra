define([

  'underscore'
  ,'lateralus'

  ,'text!./template.mustache'

  ,'../../constant'

  // Silent import
  ,'rekapi-timeline'

], function (

  _
  ,Lateralus

  ,template

  ,constant

) {
  'use strict';

  var Base = Lateralus.Component.View;
  var baseProto = Base.prototype;

  var ContainerComponentView = Base.extend({
    template: template

    ,className: 'aenima'

    ,provide: {
      /**
       * @return {RekapiTimeline}
       */
      rekapiTimeline: function () {
        return this.timeline;
      }

      /**
       * @return {RekapiTimeline.ActorModel}
       */
      ,currentActorModel: function () {
        return this.timeline.collectOne('currentActorModel');
      }
    }

    ,lateralusEvents: {
      requestClearTimeline: function () {
        var rekapi = this.lateralus.rekapi;

        // Each actor must be removed individually so the rekapi:removeActor
        // event is fired
        _.each(rekapi.getAllActors(), function (actor) {
          rekapi.removeActor(actor);
        }, this);
      }
    }

    /**
     * @param {Object} [options] See http://backbonejs.org/#View-constructor
     */
    ,initialize: function () {
      baseProto.initialize.apply(this, arguments);
      this.$el.addClass('loading');
    }

    ,deferredInitialize: function () {
      this.timeline =
        this.lateralus.rekapi.createTimeline(this.$timeline[0], {
          supportedProperties: constant.SUPPORTED_PROPERTIES
        });

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

      this.lateralus.rekapi.addActor();
      this.$el.removeClass('loading');
      this.emit('rekapiTimelineInitialized');
    }
  });

  return ContainerComponentView;
});
