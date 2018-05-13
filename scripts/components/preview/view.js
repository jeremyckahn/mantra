import Lateralus from 'lateralus';
import { Rekapi } from 'rekapi';
import template from 'text!./template.mustache';
import constant from '../../constant';

const Base = Lateralus.Component.View;
const baseProto = Base.prototype;
const onionSkinRekapi = new Rekapi(document.createElement('div'));

const PreviewComponentView = Base.extend({
  template,

  lateralusEvents: {
    /**
     * @param {number} timelineDuration
     */
    'change:timelineDuration': function(timelineDuration) {
      if (this.lateralus.model.getUi('showOnionSkin')) {
        this.updateOnionSkinResolutionForTimelineDuration(timelineDuration);
      }
    },

    'rekapi:timelineModified': function() {
      const lateralus = this.lateralus;

      if (lateralus.hasInitialized && lateralus.model.getUi('showOnionSkin')) {
        this.updateOnionSkinSegmentPositions();
      }
    },

    rekapiTimelineInitialized() {
      if (this.lateralus.model.getUi('showOnionSkin')) {
        this.updateOnionSkinSegmentPositions();
      }
    },

    userRequestUpdateOnionSkinSetting() {
      const showOnionSkin = this.lateralus.model.getUi('showOnionSkin');
      if (showOnionSkin) {
        this.updateOnionSkinResolutionForTimelineDuration(
          this.lateralus.rekapi.getAnimationLength()
        );
        this.updateOnionSkinSegmentPositions();
      }

      this.$onionSkin[showOnionSkin ? 'removeClass' : 'addClass'](
        'transparent'
      );
    },

    requestResetRenderedActorState() {
      this.$actor.removeAttr('style');
    },
  },

  /**
   * @param {Object} [options] See http://backbonejs.org/#View-constructor
   */
  initialize() {
    baseProto.initialize.apply(this, arguments);
    this.$actorBaseClone = this.$actor.clone();
    this.$actorBaseClone.removeClass('$actor');

    if (!this.lateralus.model.getUi('showOnionSkin')) {
      this.$onionSkin.addClass('transparent');
    }
  },

  /**
   * @param {number} duration
   */
  updateOnionSkinResolutionForTimelineDuration(duration) {
    if (duration > constant.ONION_SKIN_DURATION_LIMIT) {
      return;
    }

    this.$onionSkin.empty();
    const numSegments = Math.ceil(
      duration / 1000 * constant.ONION_SKIN_SEGMENTS_PER_SECOND
    );

    let i = 0;
    const actorClones = [];
    for (i; i < numSegments; i++) {
      actorClones.push(this.$actorBaseClone.clone());
    }

    this.$onionSkin.append(actorClones);
  },

  updateOnionSkinSegmentPositions() {
    const rekapi = this.lateralus.rekapi;
    onionSkinRekapi.removeAllActors();
    onionSkinRekapi.importTimeline(rekapi.exportTimeline());
    const rekapiCloneActor = onionSkinRekapi.getActor(
      onionSkinRekapi.getActorIds()[0]
    );
    const animationLength = rekapi.getAnimationLength();
    const $onionSkinChildren = this.$onionSkin.children();
    const numSegments = $onionSkinChildren.length;

    $onionSkinChildren.each((i, el) => {
      const millisecond = i / (numSegments - 1) * animationLength;
      rekapiCloneActor.context = el;
      onionSkinRekapi.update(millisecond);
    });
  },
});

export default PreviewComponentView;
