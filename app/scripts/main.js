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
    ,'jquery-dragon': 'bower_components/jquery-dragon/src/jquery.dragon'
    ,backbone: 'bower_components/backbone/backbone'
    ,underscore: 'bower_components/lodash/lodash'
    ,mustache: 'bower_components/mustache/mustache'
    ,shifty: 'bower_components/shifty/dist/shifty'
    ,rekapi: 'bower_components/rekapi/dist/rekapi'
    ,bezierizer: 'bower_components/bezierizer/dist/bezierizer'
    ,'aenima.constant': 'bower_components/aenima/constant'
    ,'aenima.utils': 'bower_components/aenima/utils'
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
    name: 'mantra.component.rekapi'
    ,location: 'scripts/components/rekapi'
  }, {
    name: 'mantra.component.container'
    ,location: 'scripts/components/container'
  }, {
    name: 'mantra.component.preview'
    ,location: 'scripts/components/preview'
  }, {
    name: 'mantra.component.control-panel'
    ,location: 'scripts/components/control-panel'

  // rekapi-timeline
  }, {
    name: 'rekapi-timeline'
    ,location: 'bower_components/rekapi-timeline/app/scripts'
    ,main: 'rekapi-timeline'
  }, {
    name: 'rekapi-timeline.component.container'
    ,location: 'bower_components/rekapi-timeline/app/scripts/components/container'
  }, {
    name: 'rekapi-timeline.component.timeline'
    ,location: 'bower_components/rekapi-timeline/app/scripts/components/timeline'
  }, {
    name: 'rekapi-timeline.component.control-bar'
    ,location: 'bower_components/rekapi-timeline/app/scripts/components/control-bar'
  }, {
    name: 'rekapi-timeline.component.details'
    ,location: 'bower_components/rekapi-timeline/app/scripts/components/details'
  }, {
    name: 'rekapi-timeline.component.scrubber'
    ,location: 'bower_components/rekapi-timeline/app/scripts/components/scrubber'
  }, {
    name: 'rekapi-timeline.component.scrubber-detail'
    ,location: 'bower_components/rekapi-timeline/app/scripts/components/scrubber-detail'
  }, {
    name: 'rekapi-timeline.component.animation-tracks'
    ,location: 'bower_components/rekapi-timeline/app/scripts/components/animation-tracks'
  }, {
    name: 'rekapi-timeline.component.actor-tracks'
    ,location: 'bower_components/rekapi-timeline/app/scripts/components/actor-tracks'
  }, {
    name: 'rekapi-timeline.component.keyframe-property-track'
    ,location: 'bower_components/rekapi-timeline/app/scripts/components/keyframe-property-track'
  }, {
    name: 'rekapi-timeline.component.keyframe-property'
    ,location: 'bower_components/rekapi-timeline/app/scripts/components/keyframe-property'
  }, {
    name: 'rekapi-timeline.component.keyframe-property-detail'
    ,location: 'bower_components/rekapi-timeline/app/scripts/components/keyframe-property-detail'

  // AEnima
  }, {
    name: 'aenima.mixin'
    ,location: 'bower_components/aenima/mixins'
  }, {
    name: 'aenima.model'
    ,location: 'bower_components/aenima/models'
  }, {
    name: 'aenima.component.shifty'
    ,location: 'bower_components/aenima/components/shifty'
  }, {
    name: 'aenima.component.rekapi'
    ,location: 'bower_components/aenima/components/rekapi'
  }, {
    name: 'aenima.component.control-panel'
    ,location: 'bower_components/aenima/components/control-panel'
  }, {
    name: 'aenima.component.export-panel'
    ,location: 'bower_components/aenima/components/export-panel'
  }, {
    name: 'aenima.component.css-export-panel'
    ,location: 'bower_components/aenima/components/css-export-panel'
  }, {
    name: 'aenima.component.rekapi-export-panel'
    ,location: 'bower_components/aenima/components/rekapi-export-panel'
  }, {
    name: 'aenima.component.bezierizer'
    ,location: 'bower_components/aenima/components/bezierizer'
  }, {
    name: 'aenima.component.curve-selector'
    ,location: 'bower_components/aenima/components/curve-selector'
  }, {
    name: 'aenima.component.motion-panel'
    ,location: 'bower_components/aenima/components/motion-panel'
  }, {
    name: 'aenima.component.management-panel'
    ,location: 'bower_components/aenima/components/management-panel'
  }]
});

require([

  'mantra'

], function (

  Mantra

) {
  window.mantra = new Mantra(document.getElementById('mantra'));
});
