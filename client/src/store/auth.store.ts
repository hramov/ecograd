import { FetchDataProvider } from "@/custom/fetch-data.provider";
import { IUser } from "@/custom/interfaces";

import store from "./index";

const state = {
  jwt_token: "" || (localStorage.getItem("jwt_token") as string),
  user: null || (JSON.parse(localStorage.getItem("user")!) as IUser),
  isLoggedIn:
    false || (!!JSON.parse(localStorage.getItem("user")!).id as boolean),
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
};
const getters = {
  getJWT: (state: any) =>
    state.jwt_token || (localStorage.getItem("jwt_token") as string),

  // getValidJWT: async (state: any) => {
  //   if (localStorage.getItem("user")) {
  //     const fdProvider = new FetchDataProvider()
  //     const result = await fdProvider.post("auth/check-jwt", {
  //       userid: JSON.parse(localStorage.getItem("user") as string).id,
  //     });
  //     if (result.error) {
  //       state.jwt_token = "";
  //       localStorage.setItem("jwt_token", "");
  //     }
  //   }
  // },

  getUser: (state: any) =>
    state.user || JSON.parse(localStorage.getItem("user")!),
  getIsLoggedIn: (state: any) => state.isLoggedIn,
};

export default {
  state,
  actions,
  mutations,
  getters,
};
