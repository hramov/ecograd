import { FetchDataProvider } from "@/custom/fetch-data.provider";
import { IOrder } from "@/custom/interfaces";

const state = {
  orders: [] as IOrder[],
  order: {} as IOrder,
};

const mutations = {
  setOrders(state: any, orders: IOrder[]) {
    state.orders = orders;
  },
  setOrder(state: any, order: IOrder) {
    state.order = order;
  },
};

const actions = {
  async getOrdersAction({ commit }: any) {
    const fdProvider = new FetchDataProvider();
    commit("setOrders", await fdProvider.get("orders"));
  },
  async getOrderAction({ commit }: any, id: number) {
    const fdProvider = new FetchDataProvider();
    commit("setOrders", await fdProvider.get("orders", id));
  },
  async addOrderUnauthorized(_: any, order: any) {
    const fdProvider = new FetchDataProvider();
    return fdProvider.post("orders/unauthorized", order);
  },
  async addOrder(_: any, order: any) {
    const fdProvider = new FetchDataProvider();
    return {
      order: await fdProvider.post("orders", order),
    };
  },
};

const getters = {
  getOrder: (state: any) => state.order,
  getOrders: (state: any) => state.orders,
};

export default {
  state,
  actions,
  mutations,
  getters,
};