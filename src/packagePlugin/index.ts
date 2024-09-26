import PopUp from './components/PopUp.vue';
import ToolTip from './components/ToolTip.vue';
import { usePopupManager } from './pinia/PopupManager';
import { PopupPlugin } from './plugins/popupPlugin';
import type { PopupManagerType } from './types/popupTypes';
import './styles/_gwPopup.scss';

import type {
  PopupProps,
  PopupShowParams,
  ToolTipRef,
  PopupDirection,
} from './types/popupTypes';

export { PopUp, ToolTip, usePopupManager, PopupPlugin };
export type {
  PopupProps,
  PopupShowParams,
  ToolTipRef,
  PopupDirection,
  PopupManagerType,
};
