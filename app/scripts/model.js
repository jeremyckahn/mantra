define([

  'underscore'
  ,'lateralus'

], function (

  _
  ,Lateralus

) {
  'use strict';

  var MantraModel = Lateralus.Model.extend({

    defaults: {
      ui: {
        exportOrientation: 'first-keyframe'
        ,showPath: true
        ,centerToPath: true
        ,cssSize: 30
        ,selectedVendors: ['w3']
      }
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
    }
  });

  return MantraModel;
});
