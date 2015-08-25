define([

  'underscore'
  ,'lateralus'

  ,'aenima.mixin/local-storage-model'

], function (

  _
  ,Lateralus

  ,localStorageMixin

) {
  'use strict';

  var MantraModel = Lateralus.Model.extend({
    localStorageId: 'mantraData'

    ,defaults: {
      ui: {
        exportOrientation: 'first-keyframe'
        ,showPath: true
        ,centerToPath: true
        ,cssSize: 30
        ,selectedVendors: ['w3']
      }
    }

    ,initialize: function () {
      this.mixin(localStorageMixin);
    }

    /**
     * @param {string} name
     * @return {*}
     */
    ,getUi: function (name) {
      return this.get('ui')[name];
    }

    /**
     * @param {string} name
     * @param {*} value
     */
    ,setUi: function (name, value) {
      this.attributes.ui[name] = value;

      // Persist app state to localStorage.
      this.trigger('change');
    }
  });

  return MantraModel;
});
