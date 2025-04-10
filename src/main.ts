import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import "./style.css";

import { createPinia } from "pinia";
import i18n from "@/plugins/i18n";

import Antd from "ant-design-vue";
import 'ant-design-vue/dist/reset.css';

const app = createApp(App);

app.use(createPinia());
app.use(router);
app.use(i18n);
app.use(Antd);

app.mount("#app");
