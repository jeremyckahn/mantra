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

  var ControlPanelComponent = Base.extend({
    name: 'control-panel'
    ,Model: Model
    ,View: View
    ,template: template
  });

  return ControlPanelComponent;
});
