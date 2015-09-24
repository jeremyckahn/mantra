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

  var RekapiComponent = Base.extend({
    name: 'rekapi'

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
