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
      timelineExport() {
        return this.applyOrientationToExport(
          baseProto.provide.timelineExport.bind(this)
        );
      },

      /**
       * @param {Object} cssOpts Gets passed to Rekapi.DOMRenderer#toString.
       * @return {string}
       */
      cssAnimationString(cssOpts) {
        return this.applyOrientationToExport(
          baseProto.provide.cssAnimationString.bind(this, cssOpts)
        );
      },
    },
    baseProto.provide
  ),

  lateralusEvents: {
    requestClearTimeline() {
      this.removeAllActors();
    },

    /**
     * @param {KeyboardEvent} evt
     */
    userRequestUndo(evt) {
      // Prevent focusing of the previously-modified input element
      evt.preventDefault();

      this.revertToPreviouslyRecordedUndoState();
    },
  },

  /**
   * @param {Function} exportProcessor
   * @return {*}
   */
  applyOrientationToExport(exportProcessor) {
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
  toJSON() {
    const exportData = this.exportTimeline();

    return exportData;
  },

  /**
   * @param {Object} animationData
   * @override
   */
  fromJSON(animationData) {
    this.rekapi.importTimeline(animationData);
  },

  /**
   * @override
   */
  update() {
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
  exportTimeline() {
    const { rekapi } = this;
    const timeline = rekapi.exportTimeline.apply(rekapi, arguments);

    const activeKeyframeProperties = this.collect('activeKeyframeProperties');

    let activeProperties = [];
    if (activeKeyframeProperties.length) {
      activeProperties = _.map(
        activeKeyframeProperties,
        activeKeyframeProperty =>
          activeKeyframeProperty.model.pick('name', 'millisecond')
      );
    }

    _.extend(timeline, { activeProperties });

    return timeline;
  },

  /**
   * @override
   */
  revertToPreviouslyRecordedUndoState() {
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
  removeCurrentTimeline() {
    this.removeAllActors();
  },
});

export default RekapiComponent;
