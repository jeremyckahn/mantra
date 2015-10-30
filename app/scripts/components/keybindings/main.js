
define([

  'underscore'
  ,'lateralus'
  ,'keydrown'

  ,'aenima.component.keybindings'

], function (

  _
  ,Lateralus
  ,kd

  ,AEnimaKeybindings

) {
  'use strict';

  var Base = AEnimaKeybindings;

  var KeybindingsComponent = Base.extend({
    name: 'keybindings'

    /**
     * @override
     */
    ,keyPressEventMap: {
      SPACE: 'userRequestTogglePreviewPlayback'
    }

    /**
     * @override
     */
    ,metaKeyPressEventMap: {
      Z: 'userRequestUndo'
    }

    /**
     * @override
     */
    ,keyUpEventMap: {
      O: 'userRequestUpdateOnionSkinSettingViaKeybinding'
    }
  });

  return KeybindingsComponent;
});
