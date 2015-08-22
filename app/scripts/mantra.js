define([

  'lateralus'
  ,'rekapi'

  ,'./model'

  ,'aenima.component.shifty'
  ,'mantra.component.rekapi'
  ,'mantra.component.container'

], function (

  Lateralus
  ,Rekapi

  ,MantraModel

  ,ShiftyComponent
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
    this.shiftyComponent = this.addComponent(ShiftyComponent);
    this.rekapiComponent = this.addComponent(RekapiComponent);
    this.rekapi = this.rekapiComponent.rekapi;
    this.containerComponent = this.addComponent(ContainerComponent);

    // NOTE: This may not be necessary once Shifty is more fully integrated
    this.emit('requestNewCurve');
  }, {
    Model: MantraModel
  });

  return Mantra;
});
