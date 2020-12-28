import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import axios from "axios";
import BootstrapVue from "bootstrap-vue";

import "bootstrap/dist/css/bootstrap.css";
import "bootstrap-vue/dist/bootstrap-vue.css";

const base = axios.create({
  baseURL: "http://localhost:3000/api/v1" // replace on production env
});

import store from "./store/index";

Vue.config.productionTip = false;

Vue.use(BootstrapVue);

Vue.prototype.$http = base;

new Vue({
  store,
  router,
  render: h => h(App)
}).$mount("#app");
