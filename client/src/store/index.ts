import { createStore } from "vuex";
import { Router } from "vue-router";

/** Modules */
import expert from './expert.store'
import order from './order.store'
import auth from './auth.store'

export default createStore({
  state: {
    router: {} as Router | null,
    backendUrl: 'http://localhost:5000/api/v2'
  },

  mutations: {
    setRouter(state, router) {
      state.router = router;
    }
  },
  getters: {
    getRouter: (state) => {
      return state.router;
    },
    getBackendUrl: state => state.backendUrl
  },
  modules: {
    expert,
    order,
    auth
  }
});
