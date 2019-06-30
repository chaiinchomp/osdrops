import Vue from "vue";
import Router from "vue-router";
import Log from "./views/Log";

Vue.use(Router);

export default new Router({
  mode: "history",
  base: process.env.BASE_URL,
  routes: [
    { path: "/", name: "Log", component: Log, alias: "/log" }
  ]
});
