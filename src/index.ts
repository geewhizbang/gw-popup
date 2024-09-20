import { App } from 'vue';
import ToolTip from './components/ToolTip.vue';
import PopUp from './components/PopUp.vue';

export { ToolTip, PopUp };
export * from './types/popupTypes'; // Export types

const GWPopup = {
  install(app: App) {
    app.component('ToolTip', ToolTip);
    app.component('PopUp', PopUp);
  },
};

export default GWPopup;
