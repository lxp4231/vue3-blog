import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
// 引入全局样式
import 'highlight.js/styles/monokai.css';
import "ant-design-vue/dist/antd.css";
import "./assets/css/main.scss";
import VueMarkdownIt from 'vue3-markdown-it';
// 引入antd
import Antd from "ant-design-vue";

const app = createApp(App);
app
  .use(store)
  .use(router)
  .use(Antd)
  .use(VueMarkdownIt)
  .mount("#app");
