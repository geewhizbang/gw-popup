import { App } from 'vue';
import { createPinia } from 'pinia';
import { usePopupManager } from '../pinia/PopupManager';

export const PopupPlugin = {
  install(app: App) {
    const pinia = createPinia();
    app.use(pinia);
    const popupManager = usePopupManager(pinia);
    app.provide('popupManager', popupManager);
  },
};
