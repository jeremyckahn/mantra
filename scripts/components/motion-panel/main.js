define([

  'lateralus'

  ,'aenima/components/motion-panel/main'

  ,'./model'
  ,'./view'
  ,'text!./template.mustache'

], function (

  Lateralus

  ,AEnimaMotionPanel

  ,Model
  ,View
  ,template

) {
  'use strict';

  var Base = AEnimaMotionPanel;

  var MotionPanelComponent = Base.extend({
    name: 'motion-panel'
    ,Model: AEnimaMotionPanel.Model
    ,View: View
    ,template: template
  });

  return MotionPanelComponent;
});
