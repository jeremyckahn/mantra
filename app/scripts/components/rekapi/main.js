define([

  'lateralus'

  ,'aenima.component.rekapi'

], function (

  Lateralus

  ,AEnimaRekapiComponent

) {
  'use strict';

  var Base = AEnimaRekapiComponent;

  var RekapiComponent = Base.extend({
    name: 'rekapi'
  });

  return RekapiComponent;
});
