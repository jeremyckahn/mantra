define([

  'jquery'
  ,'underscore'
  ,'lateralus'

  ,'text!./template.mustache'

  ,'stylie'

  ,'aenima/components/hidable/main'

], function (

  $
  ,_
  ,Lateralus

  ,template

  ,Stylie

  ,HidableComponent

) {
  'use strict';

  var Base = Lateralus.Component.View;
  var baseProto = Base.prototype;
  var $body = $(document.body);

  var StylieComponentView = Base.extend({
    template: template

    ,lateralusEvents: {
      requestOpenStylie: function () {
        this.wasPlaying = this.collectOne('isPlaying');
        this.emit('requestQuickCloseHelp');
        this.emit('requestPause');
        this.emit('pauseKeybindings');

        var customCurves = this.collectOne('customCurves');
        this.emit('quarantineCustomCurves');

        this.stylie = new Stylie(this.$stylieRoot[0], {
          isEmbedded: true
          ,embeddedImgRoot: 'node_modules/stylie/app/'
        });

        // This has to be _.deferred so as to overwrite the custom curves set
        // by Stylie's deferredInitialize method
        _.defer(function () {
          customCurves.forEach(function (customCurve) {
            this.stylie.trigger('setCustomCurve', customCurve);
          }.bind(this));

        }.bind(this));

        $body.on('keydown', this.escapeHandler);
        this.hidableView.quickFadeIn();

        // Force the focus away from anything in background so that it cannot
        // be selected once Stylie is opened.
        //
        // This feels like a dirty hack, but I couldn't find a better solution.
        this.$('button').focus();
        $(document.activeElement).blur();
      }

      ,requestCloseStylie: function () {
        $body.off('keydown', this.escapeHandler);
        this.stylie.emit('requestPause');

        var customCurves = this.collectOne('customCurves');

        // Ensure that that there are no null reference errors to custom curves
        // due the a mismatch in the number of custom curves set by Stylie
        // versus Mantra
        this.emit('unquarantineCustomCurves');

        // Backfill any custom curves from Stylie into Manta
        customCurves.forEach(function (customCurve) {
          this.emit('setCustomCurve', customCurve);
        }.bind(this));

        this.hidableView.quickHide(function () {
          this.stylie.dispose();
          this.emit('resumeKeybindings');


          if (this.wasPlaying) {
            this.emit('requestPlay');
          }
        }.bind(this));
      }
    }

    ,events: {
      'click .cancel': function () {
        this.emit('requestCloseStylie');
      }

      ,'click .confirm': function () {
        this.emit('requestRecordUndoState');
        this.lateralus.loadTimeline(
          this.stylie.exportTimelineForMantra(),
          true
        );

        this.emit('requestCloseStylie');
      }
    }

    /**
     * @param {Object} [options] See http://backbonejs.org/#View-constructor
     */
    ,initialize: function () {
      baseProto.initialize.apply(this, arguments);

      this.hidableView = this.addSubview(HidableComponent.View, {
        el: this.el
        ,startHidden: true
      });

      this.escapeHandler = function (evt) {
        if (evt.target === document.body &&
          evt.which === 27 // 27 === escape key
        ) {
          this.emit('requestCloseStylie');
        }
      }.bind(this);
    }
  });

  return StylieComponentView;
});
