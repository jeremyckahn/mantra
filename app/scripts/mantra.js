define([

  'lateralus'
  ,'rekapi'

  ,'./model'

  ,'mantra.component.container'

], function (

  Lateralus
  ,Rekapi

  ,MantraModel

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
    this.rekapi = new Rekapi(document.body);
    this.containerComponent = this.addComponent(ContainerComponent);
  }, {
    Model: MantraModel
  });

  return Mantra;
});
