import { IExpert, IOrder, IUser } from "./../custom/interfaces";
import { createStore } from "vuex";
import { FetchDataProvider } from "@/custom/fetch-data.provider";
import { Router } from "vue-router";

/** Modules */
import expert from './expert.store'
import order from './order.store'

export default createStore({
  state: {
    jwt_token: "" as string,
    router: {} as Router | null,
    user: {} as IUser,
    backendUrl: 'http://localhost:5000/api/v2'
  },

  mutations: {
    setJWT(state, token) {
      state.jwt_token = token;
    },
    setRouter(state, router) {
      state.router = router;
    },
    setUser(state, data) {
      state.user = data;
    }
  },

  actions: {
    async getOrdersAction({ commit }) {
      commit("setOrders", await FetchDataProvider.get("orders"));
    }
  },
  getters: {
    getJWT: (state) =>
      state.jwt_token
        ? state.jwt_token
        : (localStorage.getItem("jwt_token") as string),

    getValidJWT: async (state) => {
      const result = await FetchDataProvider.post("auth/check-jwt", {
        userid: JSON.parse(localStorage.getItem("user") as string).id,
      });

      if (result.error) {
        state.jwt_token = "";
        localStorage.setItem("jwt_token", "");
      }
    },
    getRouter: (state) => {
      return state.router;
    },
    getUser: (state, getters) => {
      if (localStorage.getItem("user") && getters.getJWT) {
        state.user = JSON.parse(localStorage.getItem("user")!);
        return state.user;
      }
      localStorage.setItem("user", "");
      state.user = {} as IUser;
      return state.user;
    },
    getBackendUrl: state => state.backendUrl
  },
  modules: {
    expert,
    order,
  }
});
