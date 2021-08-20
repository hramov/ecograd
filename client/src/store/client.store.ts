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
  async getOrdersForClient({ commit }: any, clientid: number) {
    const fd = new FetchDataProvider();
    const orders = await fd.get(`orders/client/${clientid}`);
    commit("setOrders", orders);
    return orders;
  },

  async uploadDocsAction({ commit }: any, data: any) {
    const fd = new FetchDataProvider();
    const result = await fd.patch(
      `orders/upload`,
      data.id,
      data.formData,
      true
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
