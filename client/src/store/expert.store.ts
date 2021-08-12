import { FetchDataProvider } from "@/custom/fetch-data.provider";
import { IExpert } from "@/custom/interfaces";

const state = {
    expert: {} as IExpert,
    experts: [] as IExpert[],
}

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
    commit("setExperts", await FetchDataProvider.get("experts"));
  },
  async getSingleExpertAction({ commit }: any, id: number) {
    commit("setExpert", await FetchDataProvider.get("experts", id));
  },
  async addExpertAction(_: any, expert: any) {
    return FetchDataProvider.post("experts", expert);
  },
  async updateExpertAction(_: any, id: any) {
    return FetchDataProvider.patch("experts", id, state.expert);
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
