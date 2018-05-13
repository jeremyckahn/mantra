import AEnimaManagementPanel from 'aenima/components/management-panel/main';
import View from './view';
import template from 'text!./template.mustache';

var Base = AEnimaManagementPanel;

var ManagementPanelComponent = Base.extend({
  name: 'management-panel',
  View: View,
  template: template,
});

export default ManagementPanelComponent;
