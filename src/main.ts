import { createApp } from 'vue';
import { createPinia } from 'pinia';
import App from './App.vue';
import { PopUp, ToolTip, PopupPlugin } from './packagePlugin';
import './packagePlugin/styles/_gwPopup.scss';

const app = createApp(App);
app.use(createPinia());
app.use(PopupPlugin);
app.component('PopUp', PopUp);
app.component('ToolTip', ToolTip);

app.mount('#app');
