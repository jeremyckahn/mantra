define([
  'aenima/components/management-panel/main',

  './view',
  'text!./template.mustache',
], function(AEnimaManagementPanel, View, template) {
  'use strict';

  var Base = AEnimaManagementPanel;

  var ManagementPanelComponent = Base.extend({
    name: 'management-panel',
    View: View,
    template: template,
  });

  return ManagementPanelComponent;
});
