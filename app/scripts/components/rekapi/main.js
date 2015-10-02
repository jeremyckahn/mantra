define([

  'underscore'
  ,'lateralus'
  ,'rekapi'

  ,'aenima.component.rekapi'

], function (

  _
  ,Lateralus
  ,Rekapi

  ,AEnimaRekapiComponent

) {
  'use strict';

  var Base = AEnimaRekapiComponent;
  var baseProto = Base.prototype;

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
  });

  return RekapiComponent;
});
