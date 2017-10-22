define([

  'lateralus'

  ,'./model'
  ,'./view'
  ,'text!./template.mustache'

], function (

  Lateralus

  ,Model
  ,View
  ,template

) {
  'use strict';

  var Base = Lateralus.Component;

  var StylieComponent = Base.extend({
    name: 'stylie'
    ,Model: Model
    ,View: View
    ,template: template
  });

  return StylieComponent;
});
