import Vue from "vue";
import "./plugins/vuetify";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import Tabs from "vue-tabs-component";

Vue.config.productionTip = false;

Vue.use(Tabs);

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
