import { FetchDataProvider } from "@/custom/fetch-data.provider";
import { IExpert } from "@/custom/interfaces";

const state = {
  expert: {} as IExpert,
  experts: [] as IExpert[],
};

const mutations = {
  setExperts(state: any, data: IExpert[]) {
    state.experts = data;
  },
  setExpert(state: any, data: IExpert) {
    state.expert = data;
  },
};

const actions = {
  async getExpertsAction({ commit }: any) {
    const fdProvider = new FetchDataProvider();
    commit("setExperts", await fdProvider.get("experts"));
  },
  async getSingleExpertAction({ commit }: any, id: number) {
    const fdProvider = new FetchDataProvider();
    commit("setExpert", await fdProvider.get("experts", id));
  },

  async addExpertAction(_: any, data: any) {
    const fdProvider = new FetchDataProvider();
    await fdProvider.post("experts", data.expert);
    await fdProvider.post("users/add-role", {
      roleid: 2,
      userid: data.expert.userid,
    });
    if (data.formData) await fdProvider.patch(`users/image`, data.expert.userid, data.formData);
  },

  async updateExpertAction(_: any, id: any) {
    const fdProvider = new FetchDataProvider();
    return fdProvider.patch("experts", id, state.expert);
  },
};

const getters = {
  getExperts: (state: any) => state.experts,
  getExpert: (state: any) => state.expert,
};

export default {
  state,
  actions,
  mutations,
  getters,
};
