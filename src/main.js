import { createApp } from 'vue'
import App from '@/App.vue'
import router from '@/router'
import axios from "axios";
import { createI18n } from 'vue-i18n'

const i18n = createI18n({
    // something vue-i18n options here ...
  })

import 'bootstrap-icons/font/bootstrap-icons.css';
import 'bootstrap/dist/css/bootstrap.min.css'

axios.defaults.baseURL = "http://localhost:8080/api/v1/";

createApp(App)
.use(router)
.use(i18n)
.mount('#app')
