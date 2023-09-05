import { createApp } from 'vue'
import App from '@/App.vue'
import router from '@/router'
import axios from "axios";
import { createI18n } from 'vue-i18n'

import en from './locales/en.json';
import tr from './locales/tr.json';

const messages = 
{
  en: en,
  tr: tr
};

const i18n = createI18n({
  locale: 'tr',
  fallbackLocale: 'en',
  messages
  })

import 'bootstrap-icons/font/bootstrap-icons.css';
import 'bootstrap/dist/css/bootstrap.min.css'

axios.defaults.baseURL = "http://localhost:8080/api/v1/";

createApp(App)
.use(router)
.use(i18n)
.mount('#app')
