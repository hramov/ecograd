import { FetchDataProvider } from "@/custom/fetch-data.provider";
import { IUser } from "@/custom/interfaces";

import store from "./index";

const state = {
  jwt_token: "" || (localStorage.getItem("token") as string),
  user: null || (JSON.parse(localStorage.getItem("user")!) as IUser),
  users: [] as IUser[],
  isLoggedIn: JSON.parse(localStorage.getItem("user") as string) ? JSON.parse(localStorage.getItem("user") as string).id : false,
  isAdmin: false,
  uexperts: [],
  uexpert: {},
};

const mutations = {
  setJWT(state: any, token: string) {
    state.jwt_token = token;
  },
  setUserForExpert(state: any, data?: IUser) {
    state.uexpert = data;
  },
  setIsLoggedIn(state: any, data: boolean) {
    state.isLoggedIn = data;
  },
  setIsAdmin(state: any, data: any) {
    state.isAdmin = !!data.data;
  },
  setUsers(state: any, data: any) {
    state.users = data;
  },
  setUser(state: any, data: any) {
    state.user = data;
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
    if (result.error != null) {
      return result.error;
    }
    commit("setIsLoggedIn", true);
    commit("setUser", result.data.user);
    commit("setJWT", result.data.token);
    localStorage.setItem("token", result.data.token);
    localStorage.setItem("user", JSON.stringify(result.data.user));
    document.getElementById("closeBtn")!.click();
    router.push("/");
    return true;
  },
  async logout({ commit }: any) {
    const router = store.state.router!;
    localStorage.setItem("token", "");
    localStorage.setItem("user", JSON.stringify(""));
    commit("setJWT", null);
    commit("setUser", {});
    router.push("/");
    return true;
  },
  async getUserForExpertAction({ commit }: any, id: any) {
    const fdProvider = new FetchDataProvider();
    commit("setUserForExpert", await fdProvider.get(`users/${id}`));
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
