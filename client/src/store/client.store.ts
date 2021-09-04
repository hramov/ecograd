import { FetchDataProvider } from "@/custom/fetch-data.provider";
import { IOrder } from "@/custom/interfaces";

const state = {
  orders: [] as IOrder[],
  order: {} as IOrder,
};
const mutations = {
  setOrders(state: any, data: any) {
    state.orders = data;
  },
  setOrder(state: any, data: any) {
    state.order = data;
  },
};

const actions = {
  async getOrdersForClient({ commit }: any) {
    const fd = new FetchDataProvider();
    const result = await fd.get(`orders/client`);
    console.log(result)
    commit("setOrders", result.data.orders);
    return result.data.orders;
  },

  async uploadDocsAction({ commit }: any, data: any) {
    const fd = new FetchDataProvider();
    const result = await fd.uploadFile(
      'orders/upload',
      data.id,
      data.formData,
    );
    return result;
  },
};

const getters = {
  getClientOrders: (state: any) => state.orders,
  getClientOrder: (state: any) => state.order,
};

export default {
  state,
  mutations,
  actions,
  getters,
};
