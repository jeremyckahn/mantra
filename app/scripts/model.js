define([

  'underscore'
  ,'lateralus'

  ,'aenima.model/persisted-model'

], function (

  _
  ,Lateralus

  ,PersistedModel

) {
  'use strict';

  var Base = PersistedModel;
  var baseProto = Base.prototype;

  var MantraModel = Base.extend({
    localStorageId: 'mantraData'

    ,defaults: {
      savedTimelines: {}
      ,ui: {
        exportOrientation: 'first-keyframe'
        ,showPath: true
        ,centerToPath: true
        ,cssSize: 30
        ,selectedVendors: ['w3']
      }
    }

    ,initialize: function () {
      baseProto.initialize.apply(this, arguments);
    }
  });

  return MantraModel;
});
