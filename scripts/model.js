import _ from 'underscore';
import Lateralus from 'lateralus';
import PersistedModel from 'aenima/models/persisted-model';

var Base = PersistedModel;
var baseProto = Base.prototype;

var MantraModel = Base.extend({
  localStorageId: 'mantraData',

  defaults: {
    savedTimelines: {},

    // TODO: Move doPreventUndoRecording and isLoadingTimeline to the .set in
    // initialize?
    doPreventUndoRecording: false,
    isLoadingTimeline: false,
    ui: {
      exportOrientation: 'first-keyframe',
      showPath: true,
      centerToPath: true,
      showOnionSkin: false,
      cssSize: 30,
      selectedVendors: ['w3'],
    },
  },

  initialize: function() {
    baseProto.initialize.apply(this, arguments);

    this.set({
      env: window.env || {},
    });
  },
});

export default MantraModel;
