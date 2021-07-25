import axios from "axios";
import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import { useStore } from "vuex";
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
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/Expertise.vue"),
  },
  {
    path: "/login",
    name: "Login",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/Login.vue"),
  },
  {
    path: "/dashboard",
    name: "Dashboard",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/dashboard/Main.vue"),
  },
  {
    path: "/client",
    name: "Client",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/client/Main.vue"),
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

router.beforeEach(async (to, from, next) => {
  const store = useStore();
  if (to.path == "/dashboard" && localStorage.getItem("jwt_token")) {
    const result = await axios.post(
      "http://localhost:5000/api/v1/admin/check-jwt",
      {
        token: localStorage.getItem("jwt_token"),
      }
    );
    const allowed = result.data.status;
    if (allowed) {
      next();
    }
  } else if (to.path == "/dashboard" && !localStorage.getItem("jwt_token")) {
    next("/");
  } else {
    next();
  }
});

export default router;
