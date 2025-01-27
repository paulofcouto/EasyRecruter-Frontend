import { createApp } from 'vue';
import App from './App.vue';
import ElementPlus from 'element-plus';
import 'element-plus/dist/index.css';
import router from './router';
import * as ElementPlusIconsVue from '@element-plus/icons-vue';
import axios from 'axios'; 
import VueTheMask from 'vue-the-mask';
import '@fortawesome/fontawesome-free/css/all.css';
import '@fortawesome/fontawesome-free/js/all.js';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL, 
});

const app = createApp(App);

for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component);
}

app.use(ElementPlus);
app.use(router);

app.config.globalProperties.$api = api;

app.use(VueTheMask);

app.mount('#app');
