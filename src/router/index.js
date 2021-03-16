import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    redirect: "/log"
  },
  {
    path: "/reg",
    name: "Register",
    component: () => import("../views/Register.vue")
  },
  {
    path: "/log",
    name: "Login",
    component: () => import("../views/Login.vue")
  },
  {
    path: "/user",
    name: "User",
    component: () => import("../views/User.vue")
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

export default router;
