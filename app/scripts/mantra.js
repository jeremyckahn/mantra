define([

  'lateralus'
  ,'rekapi'

  ,'./model'

  ,'mantra.component.rekapi'
  ,'mantra.component.container'

], function (

  Lateralus
  ,Rekapi

  ,MantraModel

  ,RekapiComponent
  ,ContainerComponent

) {
  'use strict';

  /**
   * @param {Element} el
   * @extends {Lateralus}
   * @constructor
   */
  var Mantra = Lateralus.beget(function () {
    Lateralus.apply(this, arguments);
    this.rekapiComponent = this.addComponent(RekapiComponent);
    this.rekapi = this.rekapiComponent.rekapi;
    this.containerComponent = this.addComponent(ContainerComponent);
  }, {
    Model: MantraModel
  });

  return Mantra;
});
