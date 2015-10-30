define([

  'lateralus'
  ,'rekapi'

  ,'text!./template.mustache'

  ,'../../constant'

], function (

  Lateralus
  ,Rekapi

  ,template

  ,constant

) {
  'use strict';

  var Base = Lateralus.Component.View;
  var baseProto = Base.prototype;
  var onionSkinRekapi = new Rekapi(document.createElement('div'));

  var PreviewComponentView = Base.extend({
    template: template

    ,lateralusEvents: {
      /**
       * @param {number} timelineDuration
       */
      'change:timelineDuration': function (timelineDuration) {
        if (this.lateralus.model.getUi('showOnionSkin')) {
          this.updateOnionSkinResolutionForTimelineDuration(timelineDuration);
        }
      }

      ,'rekapi:timelineModified': function () {
        var lateralus = this.lateralus;

        if (lateralus.hasInitialized &&
            lateralus.model.getUi('showOnionSkin')) {
          this.updateOnionSkinSegmentPositions();
        }
      }

      ,rekapiTimelineInitialized: function () {
        if (this.lateralus.model.getUi('showOnionSkin')) {
          this.updateOnionSkinSegmentPositions();
        }
      }

      ,userRequestUpdateOnionSkinSetting: function () {
        var showOnionSkin = this.lateralus.model.getUi('showOnionSkin');
        if (showOnionSkin) {
          this.updateOnionSkinResolutionForTimelineDuration(
            this.lateralus.rekapi.getAnimationLength());
          this.updateOnionSkinSegmentPositions();
        }

        this.$onionSkin
          [showOnionSkin ? 'removeClass' : 'addClass']('transparent');
      }
    }

    /**
     * @param {Object} [options] See http://backbonejs.org/#View-constructor
     */
    ,initialize: function () {
      baseProto.initialize.apply(this, arguments);
      this.$actorBaseClone = this.$actor.clone();
      this.$actorBaseClone.removeClass('$actor');

      if (!this.lateralus.model.getUi('showOnionSkin')) {
        this.$onionSkin.addClass('transparent');
      }
    }

    /**
     * @param {number} duration
     */
    ,updateOnionSkinResolutionForTimelineDuration: function (duration) {
      this.$onionSkin.empty();
      var numSegments =
        Math.ceil((duration / 1000) * constant.ONION_SKIN_SEGMENTS_PER_SECOND);

      var i = 0;
      var actorClones = [];
      for (i; i < numSegments; i++) {
        actorClones.push(this.$actorBaseClone.clone());
      }

      this.$onionSkin.append(actorClones);
    }

    ,updateOnionSkinSegmentPositions: function () {
      var rekapi = this.lateralus.rekapi;
      onionSkinRekapi.removeAllActors();
      onionSkinRekapi.importTimeline(rekapi.exportTimeline());
      var rekapiCloneActor =
        onionSkinRekapi.getActor(onionSkinRekapi.getActorIds()[0]);
      var animationLength = rekapi.getAnimationLength();
      var $onionSkinChildren = this.$onionSkin.children();
      var numSegments = $onionSkinChildren.length;

      $onionSkinChildren.each(function (i, el) {
        var millisecond = i / (numSegments - 1) * animationLength;
        rekapiCloneActor.context = el;
        onionSkinRekapi.update(millisecond);
      });
    }
  });

  return PreviewComponentView;
});
