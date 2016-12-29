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
    text: 'node_modules/requirejs-text/text'
    ,jquery: 'node_modules/jquery/dist/jquery'
    ,'jquery-mousewheel': 'node_modules/jquery-mousewheel/jquery.mousewheel'
    ,'jquery-dragon': 'node_modules/jquery-dragon/src/jquery.dragon'
    ,'jquery-cubelet': 'node_modules/jquery-cubelet/dist/jquery.cubelet'
    ,backbone: 'node_modules/backbone/backbone'
    ,underscore: 'node_modules/lodash/index'
    ,mustache: 'node_modules/mustache/mustache'
    ,shifty: 'node_modules/shifty/dist/shifty'
    ,rekapi: 'node_modules/rekapi/dist/rekapi'
    ,bezierizer: 'node_modules/bezierizer/dist/bezierizer'
    ,keydrown: 'node_modules/keydrown/dist/keydrown'
  }
  ,packages: [{
    name: 'lateralus'
    ,location: 'node_modules/lateralus/scripts'
    ,main: 'lateralus'
  }, {
    name: 'lateralus.component.tabs'
    ,location: 'node_modules/lateralus-components/tabs'
  }, {
    name: 'mantra'
    ,location: 'scripts'
    ,main: 'mantra'
  }, {
    name: 'rekapi-timeline'
    ,location: 'node_modules/rekapi-timeline/app/scripts'
    ,main: 'rekapi-timeline'
  }, {
    name: 'stylie'
    ,location: 'node_modules/@jeremyckahn/stylie/app/scripts'
    ,main: 'stylie'
  }, {
    name: 'aenima'
    ,location: 'node_modules/aenima'
  }]
});

require([

  'mantra'

], function (

  Mantra

) {
  window.mantra = new Mantra(document.getElementById('mantra'));
});
