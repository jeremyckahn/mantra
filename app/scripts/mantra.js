define([

  'underscore'
  ,'lateralus'
  ,'rekapi'

  ,'./model'

  ,'aenima.component.shifty'
  ,'mantra.component.rekapi'
  ,'mantra.component.container'

  ,'aenima.utils'

  ,'./constant'

], function (

  _
  ,Lateralus
  ,Rekapi

  ,MantraModel

  ,ShiftyComponent
  ,RekapiComponent
  ,ContainerComponent

  ,utils

  ,constant

) {
  'use strict';

  /**
   * @param {Element} el
   * @extends {Lateralus}
   * @constructor
   */
  var Mantra = Lateralus.beget(function () {
    Lateralus.apply(this, arguments);
    this.hasInitialized = false;
    this.shiftyComponent = this.addComponent(ShiftyComponent);
    this.rekapiComponent = this.addComponent(RekapiComponent);
    this.rekapi = this.rekapiComponent.rekapi;
    this.containerComponent = this.addComponent(ContainerComponent);

    // NOTE: This may not be necessary once Shifty is more fully integrated
    this.emit('requestNewCurve');
  }, {
    Model: MantraModel
  });

  var fn = Mantra.prototype;

  fn.lateralusEvents = {
    rekapiTimelineInitialized: function () {
      var savedTimelines = this.model.get('savedTimelines');
      var transientTimeline = savedTimelines[constant.TRANSIENT_TIMELINE_NAME];

      if (transientTimeline) {
        this.loadTimeline(transientTimeline);
      } else {
        this.setupInitialKeyframes();
      }

      this.rekapiComponent.update(0);

      if (!utils.getQueryParam('pause')) {
        this.emit('requestPlay');
      }

      // Necessary for keeping the UI in sync after startup.
      this.saveCurrentTimelineAs(constant.TRANSIENT_TIMELINE_NAME);

    this.emit(
      'savedAnimationListUpdated'
      ,this.getSavedTimelineDisplayList()
    );

      this.hasInitialized = true;
    }

    ,'rekapi:timelineModified': function () {
      if (this.hasInitialized) {
        this.saveCurrentTimelineAs(constant.TRANSIENT_TIMELINE_NAME);
      }
    }

    /**
     * @param {string} timelineName
     */
    ,userRequestSaveCurrentAnimation: function (timelineName) {
      this.saveCurrentTimelineAs(timelineName);
    }

    /**
     * @param {string} timelineName
     */
    ,userRequestLoadAnimation: function (timelineName) {
      var savedTimelines = this.model.get('savedTimelines');
      var timelineData = savedTimelines[timelineName];
      this.loadTimeline(timelineData);
    }
  };

  /**
   * @param {Object} timelineData
   */
  fn.loadTimeline = function (timelineData) {
    this.emit('requestClearTimeline');

    this.emit('loadBezierCurves', timelineData.bezierCurves);
    this.rekapiComponent.importTimeline(timelineData);

    // rekapi:timelineModified events are not triggered during or at the end of
    // importTimeline, so trigger the event explicitly here to update
    // the RekapiTimeline UI
    this.collectOne('rekapiTimeline')
      .trigger('rekapi:timelineModified', this.rekapi);
  };

  /**
   * @param {string} timelineName
   */
  fn.saveCurrentTimelineAs = function (timelineName) {
    var savedTimelines = this.model.get('savedTimelines');
    savedTimelines[timelineName] = this.rekapiComponent.toJSON();
    this.model.set('savedTimelines', savedTimelines);

    // Force a change event to persist the saved timelines to localStorage.
    this.model.trigger('change');

    if (timelineName !== constant.TRANSIENT_TIMELINE_NAME) {
      this.emit(
        'savedAnimationListUpdated'
        ,this.getSavedTimelineDisplayList()
        ,timelineName
      );
    }
  };

  /**
   * @return {Array.<string>}
   */
  fn.getSavedTimelineDisplayList = function () {
    var rawList = this.model.get('savedTimelines');
    return Object.keys(_.omit(rawList, constant.TRANSIENT_TIMELINE_NAME));
  };

  fn.setupInitialKeyframes = function () {
    this.collectOne('currentActorModel')
      .keyframe(0, {
        translateX: '100px'
        ,translateY: '100px'
        ,rotate: '0deg'
      })
      .keyframe(1000, {
        translateX: '400px'
        ,translateY: '100px'
        ,rotate: '0deg'
      });
  };

  return Mantra;
});
