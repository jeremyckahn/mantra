define([

  'lateralus'

  ,'./model'
  ,'./view'
  ,'text!./template.mustache'

  ,'../keybindings/main'
  ,'../preview/main'
  ,'../control-panel/main'
  ,'../stylie/main'
  ,'../help/main'

], function (

  Lateralus

  ,Model
  ,View
  ,template

  ,KeybindingsComponent
  ,PreviewComponent
  ,ControlPanel
  ,StylieComponent
  ,HelpComponent

) {
  'use strict';

  var Base = Lateralus.Component;

  var ContainerComponent = Base.extend({
    name: 'container'
    ,Model: Model
    ,View: View
    ,template: template

    ,lateralusEvents: {
      pauseKeybindings: function () {
        this.keybindingsComponent.dispose();
      }

      ,resumeKeybindings: function () {
        this.initKeybindings();
      }
    }

    ,initialize: function () {
      this.initKeybindings();

      this.addComponent(PreviewComponent, {
        el: this.view.$preview[0]
      });

      this.addComponent(ControlPanel, {
        el: this.view.$controlPanel[0]
      });

      this.addComponent(HelpComponent, {
        el: this.view.$help[0]
      });

      this.addComponent(StylieComponent, {
        el: this.view.$stylie[0]
      });
    }

    ,initKeybindings: function () {
      this.keybindingsComponent = this.addComponent(KeybindingsComponent);
    }
  });

  return ContainerComponent;
});
