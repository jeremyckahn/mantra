define([

  'underscore'
  ,'mustache'
  ,'lateralus'

  ,'aenima/components/motion-panel/main'

  ,'text!./template.mustache'

], function (

  _
  ,Mustache
  ,Lateralus

  ,AEnimaMotionPanel

  ,template

) {
  'use strict';

  var Base = AEnimaMotionPanel.View;
  var baseProto = Base.prototype;

  var MotionPanelComponentView = Base.extend({
    template: Mustache.render(template, {
      base: AEnimaMotionPanel.template
    })

    ,events: _.extend({
      'click .launch-stylie': function () {
        this.emit('requestOpenStylie');
      }
    }, baseProto.events)

    /**
     * @param {Object} [options] See http://backbonejs.org/#View-constructor
     */
    ,initialize: function () {
      baseProto.initialize.apply(this, arguments);
    }
  });

  return MotionPanelComponentView;
});
