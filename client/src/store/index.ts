import { IExpert } from "./../custom/interfaces";
import axios from "axios";
import { createStore } from "vuex";

export default createStore({
  state: {
    jwt_token: "",
    router: null,
    orders: {},
    user: {},
    experts: [],
    order: {},
    expert: {
      id: 0,
      name: "",
      last_name: "",
      second_name: "",
      image_url: "",
      email: "",
      phone: "",
      position: "",
      birth_date: "",
      cert: "",
      direction: "",
      misc: "",
      created_at: new Date(),
    },
  },
  mutations: {
    setJWT(state, token) {
      state.jwt_token = token;
    },
    setRouter(state, router) {
      state.router = router;
    },
    setOrders(state, orders) {
      state.orders = orders;
    },
    setOrder(state, order) {
      state.order = order
    },
    setUser(state, data) {
      state.user = data;
    },
    setExperts(state, data) {
      state.experts = data;
    },
    setExpert(state, data) {
      state.expert = data;
    },
  },
  actions: {
    async getOrdersAction({ commit }): Promise<boolean> {
      const result = await axios.get(
        "http://localhost:5000/api/v1/admin/orders",
        {
          headers: {
            Authorization: `Bearer ${this.state.jwt_token}`,
          },
        }
      );
      if (result.data.status) {
        commit("setOrders", result.data.data);
        return true;
      }
      return false;
    },
    async getSingleExpertAction({ commit }, id: number) {
      const result = await axios.get(
        `http://localhost:5000/api/v1/experts/${id}`,
        {
          headers: {
            Authorization: `Bearer ${this.state.jwt_token}`,
          },
        }
      );
      if (result.data.status) commit("setExpert", result.data.data);
    },

    async updateExpertAction(id: any): Promise<boolean> {
      const expert: IExpert = this.state.expert;
      const result = await axios.put(
        `http://localhost:5000/api/v1/experts/${expert.id}`,
        {
          expert: expert,
        },
        {
          headers: {
            Authorization: `Bearer ${this.state.jwt_token}`,
          },
        }
      );
      return result.data.status;
    },

    async getExpertsAction({ commit }) {
      const result = await axios.get("http://localhost:5000/api/v1/experts", {
        headers: {
          Authorization: `Bearer ${this.state.jwt_token}`,
        },
      });
      if (result.data.status) commit("setExperts", result.data.data);
    },
  },
  getters: {
    getJWT: (state) => {
      if (!state.jwt_token && localStorage.getItem("jwt_token")) {
        const result = axios
          .post("http://localhost:5000/api/v1/admin/check-jwt", {
            token: localStorage.getItem("jwt_token"),
          })
          .then((res) => {
            if (res.data.status) {
              state.jwt_token = localStorage.getItem("jwt_token")!;
              return state.jwt_token;
            }
          })
          .catch(() => {
            state.jwt_token = "";
            localStorage.setItem("jwt_token", "");
            localStorage.setItem('user', '')
          });
      }
      return state.jwt_token;
    },
    getRouter: (state) => {
      return state.router;
    },
    getOrders: (state) => state.orders,
    getUser: (state) => {
      if (
        localStorage.getItem("user") &&
        state.jwt_token
      ) {
        state.user = JSON.parse(localStorage.getItem("user")!);
        return state.user;
      }
      localStorage.setItem("user", "[]");
      state.user = {};
      return state.user;
    },
    getExperts: (state) => state.experts,
    getExpert: (state) => state.expert,
    getOrder: state => state.order
  },
});
