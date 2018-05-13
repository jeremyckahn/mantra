import $ from 'jquery';
import _ from 'underscore';
import Lateralus from 'lateralus';
import Rekapi from 'rekapi';
import AEnimaRekapiComponent from 'aenima/components/rekapi/main';

const Base = AEnimaRekapiComponent;
const baseProto = Base.prototype;

const RekapiComponent = Base.extend({
  name: 'rekapi',

  provide: _.defaults(
    {
      /**
       * @return {Object}
       */
      timelineExport: function() {
        return this.applyOrientationToExport(
          baseProto.provide.timelineExport.bind(this)
        );
      },

      /**
       * @param {Object} cssOpts Gets passed to Rekapi.DOMRenderer#toString.
       * @return {string}
       */
      cssAnimationString: function(cssOpts) {
        return this.applyOrientationToExport(
          baseProto.provide.cssAnimationString.bind(this, cssOpts)
        );
      },
    },
    baseProto.provide
  ),

  lateralusEvents: {
    requestClearTimeline: function() {
      this.removeAllActors();
    },

    /**
     * @param {KeyboardEvent} evt
     */
    userRequestUndo: function(evt) {
      // Prevent focusing of the previously-modified input element
      evt.preventDefault();

      this.revertToPreviouslyRecordedUndoState();
    },
  },

  /**
   * @param {Function} exportProcessor
   * @return {*}
   */
  applyOrientationToExport: function(exportProcessor) {
    const currentActorModel = this.collectOne('currentActorModel');

    if (!currentActorModel) {
      return exportProcessor.call(this);
    }

    const keyframePropertyCollection =
      currentActorModel.keyframePropertyCollection;
    const needToAccountForOffset =
      this.lateralus.model.getUi('exportOrientation') === 'first-keyframe';
    const keyframeOffsets = {};

    if (needToAccountForOffset) {
      // Apply offset
      ['translateX', 'translateY'].forEach(offsetPropertyName => {
        const offsetProperties = keyframePropertyCollection.where({
          name: offsetPropertyName,
        });

        if (!offsetProperties.length) {
          return;
        }

        const firstPropertyModel = _(offsetProperties)
          .sortBy(property => property.get('millisecond'))
          .first();

        keyframeOffsets[offsetPropertyName] = parseInt(
          firstPropertyModel.get('value')
        );
        const offset = keyframeOffsets[offsetPropertyName];

        offsetProperties.forEach(property => {
          property.attributes.value =
            parseInt(property.attributes.value, 10) - offset + 'px';
        });
      });
    }

    const exportedAnimation = exportProcessor.call(this);

    // Reverse the offsetting logic from above
    if (needToAccountForOffset) {
      ['translateX', 'translateY'].forEach(offsetPropertyName => {
        if (typeof keyframeOffsets[offsetPropertyName] === 'undefined') {
          return;
        }

        const offsetProperties = keyframePropertyCollection.where({
          name: offsetPropertyName,
        });
        const offset = keyframeOffsets[offsetPropertyName];

        offsetProperties.forEach(property => {
          property.attributes.value =
            parseInt(property.attributes.value, 10) + offset + 'px';
        });
      });
    }

    return exportedAnimation;
  },

  /**
   * @return {Object}
   * @override
   */
  toJSON: function() {
    const exportData = this.exportTimeline();

    return exportData;
  },

  /**
   * @param {Object} animationData
   * @override
   */
  fromJSON: function(animationData) {
    this.rekapi.importTimeline(animationData);
  },

  /**
   * @override
   */
  update: function() {
    // If no arguments were provided, this is a re-render and all retained
    // styles should be removed
    if (arguments.length === 0) {
      this.emit('requestResetRenderedActorState');
    }

    const { rekapi } = this;
    rekapi.update.apply(rekapi, arguments);
  },

  /**
   * @override
   */
  exportTimeline: function() {
    const { rekapi } = this;
    const timeline = rekapi.exportTimeline.apply(rekapi, arguments);

    const activeKeyframeProperties = this.collect('activeKeyframeProperties');

    let activeProperties = [];
    if (activeKeyframeProperties.length) {
      activeProperties = _.map(activeKeyframeProperties, activeKeyframeProperty => activeKeyframeProperty.model.pick('name', 'millisecond'));
    }

    _.extend(timeline, { activeProperties: activeProperties });

    return timeline;
  },

  /**
   * @override
   */
  revertToPreviouslyRecordedUndoState: function() {
    if (!this.undoStateStack.length) {
      return;
    }

    const lastUndoState = JSON.parse(_.last(this.undoStateStack));
    baseProto.revertToPreviouslyRecordedUndoState.apply(this, arguments);

    lastUndoState.activeProperties.forEach(function(activeProperty) {
      this.emit('activateKeyframePropertyByNameAndMillisecond', activeProperty);
    }, this);

    this.emit('requestResizeScrubberGuide');
  },

  /**
   * @override
   */
  removeCurrentTimeline: function() {
    this.removeAllActors();
  },
});

export default RekapiComponent;
