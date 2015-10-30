define([

  'jquery'
  ,'underscore'
  ,'lateralus'
  ,'rekapi'

  ,'aenima.component.rekapi'

], function (

  $
  ,_
  ,Lateralus
  ,Rekapi

  ,AEnimaRekapiComponent

) {
  'use strict';

  var Base = AEnimaRekapiComponent;
  var baseProto = Base.prototype;
  var $doc = $(document.documentElement);

  var RekapiComponent = Base.extend({
    name: 'rekapi'

    ,provide: _.defaults({
      /**
       * @return {Object}
       */
      timelineExport: function () {
        return this.applyOrientationToExport(
          baseProto.provide.timelineExport.bind(this));
      }

      /**
       * @param {Object} cssOpts Gets passed to Rekapi.DOMRenderer#toString.
       * @return {string}
       */
      ,cssAnimationString: function (cssOpts) {
        return this.applyOrientationToExport(
          baseProto.provide.cssAnimationString.bind(this, cssOpts));
      }
    }, baseProto.provide)

    ,lateralusEvents: {
      requestClearTimeline: function () {
        this.removeAllActors();
      }

      /**
       * @param {KeyboardEvent} evt
       */
      ,userRequestUndo: function (evt) {
        // Prevent focusing of the previously-modified input element
        evt.preventDefault();

        this.revertToPreviouslyRecordedUndoState();
      }
    }

    /**
     * @param {Function} exportProcessor
     * @return {*}
     */
    ,applyOrientationToExport: function (exportProcessor) {
      var currentActorModel = this.collectOne('currentActorModel');

      if (!currentActorModel) {
        return exportProcessor.call(this);
      }

      var keyframePropertyCollection =
        currentActorModel.keyframePropertyCollection;
      var needToAccountForOffset =
        this.lateralus.model.getUi('exportOrientation') === 'first-keyframe';
      var keyframeOffsets = {};

      if (needToAccountForOffset) {
        // Apply offset
        ['translateX', 'translateY'].forEach(function (offsetPropertyName) {
          var offsetProperties =
            keyframePropertyCollection.where({ name: offsetPropertyName });

          if (!offsetProperties.length) {
            return;
          }

          var firstPropertyModel = _(offsetProperties)
            .sortBy(function (property) {
              return property.get('millisecond');
            })
            .first();

          keyframeOffsets[offsetPropertyName] =
            parseInt(firstPropertyModel.get('value'));
          var offset = keyframeOffsets[offsetPropertyName];

          offsetProperties.forEach(function (property) {
            property.attributes.value =
              (parseInt(property.attributes.value, 10) - offset) + 'px';
          });
        });
      }

      var exportedAnimation = exportProcessor.call(this);

      // Reverse the offsetting logic from above
      if (needToAccountForOffset) {
        ['translateX', 'translateY'].forEach(function (offsetPropertyName) {
          if (typeof keyframeOffsets[offsetPropertyName] === 'undefined') {
            return;
          }

          var offsetProperties =
            keyframePropertyCollection.where({ name: offsetPropertyName });
          var offset = keyframeOffsets[offsetPropertyName];

          offsetProperties.forEach(function (property) {
            property.attributes.value =
              (parseInt(property.attributes.value, 10) + offset) + 'px';
          });
        });
      }

      return exportedAnimation;
    }

    /**
     * @return {Object}
     */
    ,toJSON: function () {
      var exportData = this.exportTimeline();

      return exportData;
    }

    /**
     * @override
     */
    ,recordUndoState: function () {
      baseProto.recordUndoState.apply(this, arguments);

      var activeKeyframeProperties = this.collect('activeKeyframeProperties');

      var activeProperties = [];
      if (activeKeyframeProperties.length) {
        activeProperties = _.map(activeKeyframeProperties,
            function (activeKeyframeProperty) {
          return activeKeyframeProperty.model.pick('name', 'millisecond');
        });
      }

      _.extend(
        _.last(this.undoStateStack)
        ,{ activeProperties: activeProperties }
      );
    }

    /**
     * @override
     */
    ,revertToPreviouslyRecordedUndoState: function () {
      if (!this.undoStateStack.length) {
        return;
      }

      // Cause all $.fn.dragon drags to end
      $doc.trigger('mouseup');

      var lastUndoState = _.last(this.undoStateStack);
      baseProto.revertToPreviouslyRecordedUndoState.apply(this, arguments);

      lastUndoState.activeProperties.forEach(function (activeProperty) {
        this.emit(
          'activateKeyframePropertyByNameAndMillisecond'
          ,activeProperty
        );
      }, this);
    }
  });

  return RekapiComponent;
});
