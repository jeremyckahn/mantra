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

  var InfoPanelComponent = Base.extend({
    name: 'info-panel'
    ,Model: Model
    ,View: View
    ,template: template
  });

  return InfoPanelComponent;
});
