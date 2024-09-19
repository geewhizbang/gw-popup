import { App } from 'vue';
import ToolTip from './lib/components/ToolTip.vue';
import PopUp from './lib/components/PopUp.vue';

export { ToolTip, PopUp };

export default {
  install(app: App) {
    app.component('ToolTip', ToolTip);
    app.component('PopUp', PopUp);
  },
};
