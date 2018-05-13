import _ from 'underscore';
import Lateralus from 'lateralus';
import template from 'text!./template.mustache';
import constant from '../../constant';
import 'rekapi-timeline';

var Base = Lateralus.Component.View;
var baseProto = Base.prototype;

var ContainerComponentView = Base.extend({
  template: template,

  className: 'aenima',

  provide: {
    /**
     * @return {RekapiTimeline}
     */
    rekapiTimeline: function() {
      return this.timeline;
    },
  },

  /**
   * @param {Object} [options] See http://backbonejs.org/#View-constructor
   */
  initialize: function() {
    baseProto.initialize.apply(this, arguments);
    this.$el.addClass('loading');
  },

  deferredInitialize: function() {
    this.timeline = this.lateralus.rekapi.createTimeline(this.$timeline[0], {
      supportedProperties: constant.SUPPORTED_PROPERTIES,
      preventValueInputAutoSelect: true,
    });

    // Bridge some events across Lateralus apps
    [
      'rekapi:timelineModified',
      'keyframePropertyDragStart',
      'beforeUserUpdatesKeyframeValueInput',
      'beforeUserUpdatesKeyframeMillisecondInput',
      'beforeUserUpdatesKeyframeCurveSelector',
      'change:timelineDuration',
      'beginTemporaryTimelineModifications',
      'endTemporaryTimelineModifications',
    ].forEach(
      function(event) {
        this.amplify(this.timeline, event);
      }.bind(this)
    );

    [
      'tweenableCurveCreated',
      'activateKeyframePropertyByNameAndMillisecond',
      'requestDeselectAllKeyframes',
      'requestResizeScrubberGuide',
    ].forEach(
      function(event) {
        this.timeline.amplify(this.lateralus, event);
      }.bind(this)
    );

    ['currentActorModel', 'activeKeyframeProperties'].forEach(
      function(provider) {
        this.timeline.shareWith(this.lateralus, provider);
      }.bind(this)
    );

    this.lateralus.rekapi.addActor();
    this.$el.removeClass('loading');
    this.emit('rekapiTimelineInitialized');
  },
});

export default ContainerComponentView;
