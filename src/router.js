import Vue from "vue";
import Router from "vue-router";
import Log from "./views/Log";
import Tasks from "./views/Tasks";

Vue.use(Router);

export default new Router({
  mode: "history",
  base: process.env.BASE_URL,
  routes: [
    { path: "/", name: "Log", component: Log, alias: "/log" },
    { path: "/tasks", name: "Tasks", component: Tasks }
  ]
});
