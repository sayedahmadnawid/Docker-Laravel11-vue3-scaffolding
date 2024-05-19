import '../css/app.css';

import {createApp} from 'vue'
import store from './store/index'
import router from './router/index';
import App from './App.vue'
import i18n from './i18n';

createApp(App)
.use(store)
.use(router)
.use(i18n())
.mount("#app")