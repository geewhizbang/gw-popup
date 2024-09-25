import { createApp } from 'vue';
import { createPinia } from 'pinia';
import App from './App.vue';
import { PopUp, ToolTip } from './packagePlugin';

const app = createApp(App);

app.use(createPinia());
app.component('PopUp', PopUp);
app.component('ToolTip', ToolTip);

app.mount('#app');
