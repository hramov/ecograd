import axios from "axios";
import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import Landing from "../views/Landing.vue";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    name: "Landing",
    component: Landing,
  },
  {
    path: "/expertise",
    name: "Expertise",
    component: () => import("../views/Expertise.vue"),
  },
  {
    path: "/login",
    name: "Login",
    component: () => import("../views/Login.vue"),
  },
  {
    path: "/dashboard",
    name: "Dashboard",
    component: () => import("../views/dashboard/Main.vue"),
  },
  {
    path: "/client",
    name: "Client",
    component: () => import("../views/client/Main.vue"),
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

router.beforeEach(async (to, from, next) => {
  if (to.path == "/dashboard" && localStorage.getItem("jwt_token")) {
    const result = await axios.post(
      "http://localhost:5000/api/v1/admin/check-jwt",
      {
        token: localStorage.getItem("jwt_token"),
        role: "admin",
      }
    );
    if (result.data.status) next();
    else next("/");
  } else if (to.path == "/dashboard" && !localStorage.getItem("jwt_token")) {
    next("/");
  } else {
    next();
  }
});

export default router;
