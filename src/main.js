import { createApp } from 'vue';
import App from './App.vue';
import ElementPlus from 'element-plus';
import 'element-plus/dist/index.css';
import router from './router';
import * as ElementPlusIconsVue from '@element-plus/icons-vue';
import axios from 'axios'; 

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

app.mount('#app');
