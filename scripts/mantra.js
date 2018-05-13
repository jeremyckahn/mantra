import _ from 'underscore';
import Lateralus from 'lateralus';
import Rekapi from 'rekapi';
import MantraModel from './model';
import ShiftyComponent from 'aenima/components/shifty/main';
import RekapiComponent from './components/rekapi/main';
import ContainerComponent from './components/container/main';
import utils from 'aenima/utils';
import constant from './constant';
import '../styles/main.sass';

/**
 * @param {Element} el
 * @extends {Lateralus}
 * @constructor
 */
const Mantra = Lateralus.beget(
  function() {
    Lateralus.apply(this, arguments);
    this.initHacks();
    this.hasInitialized = false;
    this.shiftyComponent = this.addComponent(ShiftyComponent);
    this.rekapiComponent = this.addComponent(RekapiComponent);
    this.rekapi = this.rekapiComponent.rekapi;
    this.containerComponent = this.addComponent(ContainerComponent);
  },
  {
    Model: MantraModel,
  }
);

const fn = Mantra.prototype;

fn.lateralusEvents = {
  rekapiTimelineInitialized() {
    const savedTimelines = this.model.get('savedTimelines');
    const transientTimeline = savedTimelines[constant.TRANSIENT_TIMELINE_NAME];

    if (window.localStorage._export) {
      var _export = window.localStorage._export;
      delete window.localStorage._export;
      this.loadTimeline(JSON.parse(_export));
    } else if (transientTimeline) {
      this.loadTimeline(transientTimeline);
    } else {
      this.emit('setupInitialState');
    }

    this.rekapiComponent.update(0);

    if (!utils.getQueryParam('pause')) {
      this.emit('requestPlay');
    }

    // Necessary for keeping the UI in sync after startup.
    this.saveCurrentTimelineAs(constant.TRANSIENT_TIMELINE_NAME);

    this.emit('savedAnimationListUpdated', this.getSavedTimelineDisplayList());

    this.hasInitialized = true;
  },

  'rekapi:timelineModified': function() {
    if (this.hasInitialized) {
      this.saveCurrentTimelineAs(constant.TRANSIENT_TIMELINE_NAME);
    }
  },

  /**
   * @param {string} timelineName
   */
  userRequestSaveCurrentAnimation(timelineName) {
    this.saveCurrentTimelineAs(timelineName);
  },

  /**
   * @param {string} timelineName
   */
  userRequestLoadAnimation(timelineName) {
    const savedTimelines = this.model.get('savedTimelines');
    const timelineData = savedTimelines[timelineName];
    this.loadTimeline(timelineData);
  },

  resetTimeline() {
    this.model.set({
      isLoadingTimeline: true,
      doPreventUndoRecording: true,
    });

    this.emit('requestClearTimeline');
    this.rekapiComponent.rekapi.addActor();
    this.setupInitialState();
    this.rekapiComponent.update();

    this.model.set({
      isLoadingTimeline: false,
      doPreventUndoRecording: false,
    });
  },

  setupInitialState() {
    this.setupInitialState();
  },

  keyframePropertyDragStart() {
    this.emit('requestRecordUndoState');
  },

  beforeUserUpdatesKeyframeMillisecondInput() {
    this.emit('requestRecordUndoState');
  },

  beforeUserUpdatesKeyframeCurveSelector() {
    this.emit('requestRecordUndoState');
  },

  beforeUserUpdatesKeyframeValueInput() {
    this.emit('requestRecordUndoState');
  },

  'rekapi:beforeAddKeyframeProperty': function() {
    this.emit('requestRecordUndoState');
  },

  'rekapi:beforeRemoveKeyframeProperty': function() {
    this.emit('requestRecordUndoState');
  },

  beginTemporaryTimelineModifications() {
    this.model.set('doPreventUndoRecording', true);
  },

  endTemporaryTimelineModifications() {
    this.model.set('doPreventUndoRecording', false);
  },
};

/**
 * @param {Object} timelineData
 * @param {boolean} preventStackClear
 */
fn.loadTimeline = function(timelineData, preventStackClear) {
  this.model.set('isLoadingTimeline', true);

  this.emit('requestClearTimeline');

  if (!preventStackClear) {
    this.emit('requestClearUndoStack');
  }

  this.emit('loadBezierCurves', timelineData.curves);
  this.emit('requestDeselectAllKeyframes');
  this.rekapiComponent.rekapi.importTimeline(timelineData);
  this.model.set('isLoadingTimeline', false);

  // rekapi:timelineModified events are not triggered during or at the end of
  // importTimeline, so trigger the event explicitly here to update
  // the RekapiTimeline UI
  this.collectOne('rekapiTimeline').trigger(
    'rekapi:timelineModified',
    this.rekapi
  );

  // Also force an update of the timeline scrubber guide since the events
  // that normally trigger it were silenced previously
  this.emit('requestResizeScrubberGuide');
  this.rekapiComponent.update();
};

/**
 * @param {string} timelineName
 */
fn.saveCurrentTimelineAs = function(timelineName) {
  const savedTimelines = this.model.get('savedTimelines');
  savedTimelines[timelineName] = this.rekapiComponent.toJSON();
  this.model.set('savedTimelines', savedTimelines);

  // Force a change event to persist the saved timelines to localStorage.
  this.model.trigger('change');

  if (timelineName !== constant.TRANSIENT_TIMELINE_NAME) {
    this.emit(
      'savedAnimationListUpdated',
      this.getSavedTimelineDisplayList(),
      timelineName
    );
  }
};

/**
 * @return {Array.<string>}
 */
fn.getSavedTimelineDisplayList = function() {
  const rawList = this.model.get('savedTimelines');
  return Object.keys(_.omit(rawList, constant.TRANSIENT_TIMELINE_NAME));
};

fn.setupInitialState = function() {
  this.model.set('doPreventUndoRecording', true);
  this.emit('requestNewCurve');

  const actor = this.collectOne('currentActorModel').attributes;

  actor
    .keyframe(0, {
      translateX: '100px',
      translateY: '100px',
      rotateZ: '0deg',
    })
    .keyframe(1000, {
      translateX: '400px',
      translateY: '100px',
      rotateZ: '0deg',
    });

  this.model.set('doPreventUndoRecording', false);
};

fn.initHacks = function() {
  const hasSafari = navigator.userAgent.match(/safari/i);
  const hasChrome = navigator.userAgent.match(/chrome/i);
  const isFirefox = navigator.userAgent.match(/firefox/i);

  if (hasSafari && !hasChrome) {
    this.$el.addClass('safari');
  } else if (hasChrome) {
    this.$el.addClass('chrome');
  } else if (isFirefox) {
    this.$el.addClass('firefox');
  }
};

export default Mantra;
