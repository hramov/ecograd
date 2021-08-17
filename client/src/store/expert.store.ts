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
    const fdProvider = new FetchDataProvider()
    commit("setExperts", await fdProvider.get("experts"));
  },
  async getSingleExpertAction({ commit }: any, id: number) {
    const fdProvider = new FetchDataProvider()
    commit("setExpert", await fdProvider.get("experts", id));
  },
  async addExpertAction(_: any, expert: any) {
    const fdProvider = new FetchDataProvider()
    return fdProvider.post("experts", expert);
  },
  async updateExpertAction(_: any, id: any) {
    const fdProvider = new FetchDataProvider()
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
