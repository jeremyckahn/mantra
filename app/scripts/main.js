/*global require*/
// jshint maxlen: 120
'use strict';

require.config({
  baseUrl: '/'
  ,shim: {
    bootstrap: {
      deps: ['jquery']
      ,exports: 'jquery'
    }
  }
  ,paths: {
    text: 'bower_components/requirejs-text/text'
    ,jquery: 'bower_components/jquery/dist/jquery'
    ,'jquery-mousewheel': 'bower_components/jquery-mousewheel/jquery.mousewheel'
    ,'jquery-dragon': 'bower_components/jquery-dragon/src/jquery.dragon'
    ,'jquery-cubelet': 'bower_components/jquery-cubelet/dist/jquery.cubelet'
    ,backbone: 'bower_components/backbone/backbone'
    ,underscore: 'bower_components/lodash/lodash'
    ,mustache: 'bower_components/mustache/mustache'
    ,shifty: 'bower_components/shifty/dist/shifty'
    ,rekapi: 'bower_components/rekapi/dist/rekapi'
    ,bezierizer: 'bower_components/bezierizer/dist/bezierizer'
    ,keydrown: 'bower_components/keydrown/dist/keydrown'

    // TODO: Remove xdLocalStorage from Stylie and Mantra once Stylie is
    // integrated into Mantra
    ,xdLocalStorage:
      'bower_components/xdLocalStorage/dist/scripts/xdLocalStorage.min'
  }
  ,packages: [{
    name: 'lateralus'
    ,location: 'bower_components/lateralus/scripts'
    ,main: 'lateralus'
  }, {
    name: 'lateralus.component.tabs'
    ,location: 'bower_components/lateralus-components/tabs'
  }, {
    name: 'mantra'
    ,location: 'scripts'
    ,main: 'mantra'
  }, {
    name: 'rekapi-timeline'
    ,location: 'bower_components/rekapi-timeline/app/scripts'
    ,main: 'rekapi-timeline'
  }, {
    name: 'stylie'
    ,location: 'bower_components/stylie/app/scripts'
    ,main: 'stylie'
  }, {
    name: 'aenima'
    ,location: 'bower_components/aenima'
  }]
});

require([

  'mantra'

], function (

  Mantra

) {
  window.mantra = new Mantra(document.getElementById('mantra'));
});
