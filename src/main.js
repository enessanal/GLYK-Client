import { createApp } from 'vue'
import App from '@/App.vue'
import router from '@/router'
import axios from "axios";
import 'bootstrap-icons/font/bootstrap-icons.css';
import 'bootstrap/dist/css/bootstrap.min.css'

axios.defaults.baseURL = "http://localhost:8080/api/v1/";

createApp(App).use(router).mount('#app')
