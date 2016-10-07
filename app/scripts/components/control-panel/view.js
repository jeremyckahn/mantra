define([

  'lodash'
  ,'lateralus'

  ,'text!./template.mustache'

  ,'aenima/components/control-panel/main'

], function (

  _
  ,Lateralus

  ,template

  ,AEnimaControlPanel

) {
  'use strict';

  var Base = AEnimaControlPanel.View;
  var baseProto = Base.prototype;

  var ControlPanelComponentView = Base.extend({
    template: template

    ,lateralusEvents: {
      setupInitialState: function () {
        this.tabsComponent.selectTab(this.$infoTab);
      }
    }

    /**
     * @param {Object} [options] See http://backbonejs.org/#View-constructor
     */
    ,initialize: function () {
      baseProto.initialize.apply(this, arguments);
    }

    /**
     * @override
     */
    ,getTemplateRenderData: function () {
      return _.extend({
        showUserPanel: this.lateralus.model.get('hasApi')
      }, baseProto.getTemplateRenderData.apply(this, arguments));
    }
  });

  return ControlPanelComponentView;
});
