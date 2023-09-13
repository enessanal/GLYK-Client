import { createApp } from "vue";
import App from "@/App.vue";
import router from "@/router";
import axios from "axios";
import { createI18n } from "vue-i18n";
import store from "@/store";
import { toast } from 'vue3-toastify';


import en from "./locales/en.json";
import tr from "./locales/tr.json";

const messages = {
  en: en,
  tr: tr,
};

const i18n = createI18n({
  locale: "tr",
  fallbackLocale: "en",
  messages,
});

import "bootstrap-icons/font/bootstrap-icons.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "vue3-toastify/dist/index.css";

axios.defaults.baseURL = "http://localhost:8080/api/v1/";
const app = createApp(App);

app.config.globalProperties.$toast = toast;
app.use(router).use(i18n).use(store).mount("#app");



