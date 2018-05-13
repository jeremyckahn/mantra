import _ from 'underscore';
import Lateralus from 'lateralus';
import template from 'text!./template.mustache';
import constant from '../../constant';
import 'rekapi-timeline';

const Base = Lateralus.Component.View;
const baseProto = Base.prototype;

const ContainerComponentView = Base.extend({
  template,

  className: 'aenima',

  provide: {
    /**
     * @return {RekapiTimeline}
     */
    rekapiTimeline() {
      return this.timeline;
    },
  },

  /**
   * @param {Object} [options] See http://backbonejs.org/#View-constructor
   */
  initialize() {
    baseProto.initialize.apply(this, arguments);
    this.$el.addClass('loading');
  },

  deferredInitialize() {
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
      event => {
        this.amplify(this.timeline, event);
      }
    );

    [
      'tweenableCurveCreated',
      'activateKeyframePropertyByNameAndMillisecond',
      'requestDeselectAllKeyframes',
      'requestResizeScrubberGuide',
    ].forEach(
      event => {
        this.timeline.amplify(this.lateralus, event);
      }
    );

    ['currentActorModel', 'activeKeyframeProperties'].forEach(
      provider => {
        this.timeline.shareWith(this.lateralus, provider);
      }
    );

    this.lateralus.rekapi.addActor();
    this.$el.removeClass('loading');
    this.emit('rekapiTimelineInitialized');
  },
});

export default ContainerComponentView;
