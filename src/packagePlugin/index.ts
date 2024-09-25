import PopUp from './components/PopUp.vue';
import ToolTip from './components/ToolTip.vue';
import { usePopupStore } from '../pinia/PopupStore';
import type {
  PopupProps,
  PopupShowParams,
  ToolTipRef,
  PopupDirection,
} from './types/popupTypes';

// Import the styles
import './styles/_gwPopup.scss';

export { PopUp, ToolTip, usePopupStore };
export type { PopupProps, PopupShowParams, ToolTipRef, PopupDirection };

export default {
  install: (app: any) => {
    app.component('PopUp', PopUp);
    app.component('ToolTip', ToolTip);
  },
};
