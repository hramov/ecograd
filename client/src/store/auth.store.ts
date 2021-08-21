import { FetchDataProvider } from "@/custom/fetch-data.provider";
import { IUser } from "@/custom/interfaces";

import store from "./index";

const state = {
  jwt_token: "" || (localStorage.getItem("jwt_token") as string),
  user: null || (JSON.parse(localStorage.getItem("user")!) as IUser),
  users: [] as IUser[],
  isLoggedIn:
    false || (!!JSON.parse(localStorage.getItem("user")!).id as boolean),
  isAdmin: false,
  uexperts: [],
  uexpert: {}
};

const mutations = {
  setJWT(state: any, token: string) {
    state.jwt_token = token;
  },
  setUser(state: any, data?: IUser) {
    if (!data && localStorage.getItem("user")) {
      state.user = JSON.parse(localStorage.getItem("user")!) as IUser;
      return;
    }
    state.user = data;
  },
  setIsLoggedIn(state: any, data: boolean) {
    state.isLoggedIn = data;
  },
  setIsAdmin(state: any, data: boolean) {
    state.isAdmin = data;
  },
  setUsers(state: any, data: any) {
    state.users = data;
  },
  setUExperts(state: any, data: any) {
    state.uexperts = data;
  },
  setUExpert(state: any, data: any) {
    state.uexpert = data;
  },
};
const actions = {
  async login({ commit }: any, data: any) {
    const router = store.state.router!;
    const fdProvider = new FetchDataProvider();
    const result = await fdProvider.post("auth/login", data);
    if (result) {
      commit("setIsLoggedIn", true);
      commit("setUser", result.user);
      commit("setJWT", result.jwt_token);
      localStorage.setItem("jwt_token", result.jwt_token);
      localStorage.setItem("user", JSON.stringify(result.user));
      document.getElementById("closeBtn")!.click();
      router.push("/");
      return true;
    }
    return false;
  },
  async logout({ commit }: any) {
    const router = store.state.router!;
    localStorage.setItem("jwt_token", "");
    localStorage.setItem("user", JSON.stringify({}));
    commit("setJWT", null);
    commit("setUser", {});
    router.push("/");
    return true;
  },
  async isAdminAction({ commit }: any) {
    const fdProvider = new FetchDataProvider();
    commit("setIsAdmin", await fdProvider.get("auth/check-jwt"));
  },
  async getUsersAction({ commit }: any) {
    const fdProvider = new FetchDataProvider();
    commit("setUsers", await fdProvider.get("users/expert"));
  },
  async getUExpertsAction({ commit }: any) {
    const fdProvider = new FetchDataProvider();
    commit("setUExperts", await fdProvider.get("users/uexpert"));
  },
  async getUExpertAction({ commit }: any, id: number) {
    const fdProvider = new FetchDataProvider();
    commit("setUExpert", await fdProvider.get(`users/${id}`));
  },
};
const getters = {
  getJWT: (state: any) =>
    state.jwt_token || (localStorage.getItem("jwt_token") as string),
  getIsAdmin: (state: any) => state.isAdmin,
  getUser: (state: any) =>
    state.user || JSON.parse(localStorage.getItem("user")!),
  getIsLoggedIn: (state: any) => state.isLoggedIn,
  getUsers: (state: any) => state.users,
  getUExperts: (state: any) => state.uexperts,
  getUExpert: (state: any) => state.uexpert,
};

export default {
  state,
  actions,
  mutations,
  getters,
};
