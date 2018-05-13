import _ from 'underscore';
import Lateralus from 'lateralus';
import kd from 'keydrown';
import AEnimaKeybindings from 'aenima/components/keybindings/main';

const Base = AEnimaKeybindings;

const KeybindingsComponent = Base.extend({
  name: 'keybindings',

  /**
   * @override
   */
  keyPressEventMap: {
    SPACE: 'userRequestTogglePreviewPlayback',
    H: 'userRequestToggleHelpModal',
    T: 'requestOpenStylie',
    ESC: 'userRequestCloseModal',
  },

  /**
   * @override
   */
  metaKeyPressEventMap: {
    Z: 'userRequestUndo',
  },

  /**
   * @override
   */
  keyUpEventMap: {
    O: 'userRequestUpdateOnionSkinSettingViaKeybinding',
  },
});

export default KeybindingsComponent;
