import Vue from "vue";
import VueRouter from "vue-router";
import login from "../views/login/login.vue";
import upfile from "../views/upfile/upFile.vue";
import upinspect from "../views/upinspect/upInspect.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "",
    redirect: "/login",
  },
  {
    path: "/upfile",
    component: upfile,
  },
  {
    path: "/upinspect",
    component: upinspect,
  },
  {
    path: "/login",
    component: login,
  },
];

const router = new VueRouter({
  routes,
});

export default router;
const originalRelace = VueRouter.prototype.replace;
VueRouter.prototype.replace = function replace(location) {
  return originalRelace.call(this, location).catch((err) => err);
};
