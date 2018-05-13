import AEnimaManagementPanel from 'aenima/components/management-panel/main';
import View from './view';
import template from 'text!./template.mustache';

const Base = AEnimaManagementPanel;

const ManagementPanelComponent = Base.extend({
  name: 'management-panel',
  View: View,
  template: template,
});

export default ManagementPanelComponent;
