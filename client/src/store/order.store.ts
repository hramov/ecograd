import { FetchDataProvider } from '@/custom/fetch-data.provider';
import { IOrder } from '@/custom/interfaces';

const state = {
	orders: [] as IOrder[],
	order: {} as IOrder,
};

const mutations = {
	setOrders(state: any, orders: IOrder[]) {
		state.orders = orders;
	},
	setOrder(state: any, order: any) {
		state.order = order.data.order;
	},
};

const actions = {
	async getOrdersAction({ commit }: any) {
		commit('setOrders', await FetchDataProvider.get('orders'));
	},
	async getOrderAction({ commit }: any, id: number) {
		commit('setOrder', await FetchDataProvider.getByID('orders', id));
		return true;
	},
	async addOrderUnauthorized(_: any, order: any) {
		return FetchDataProvider.post('orders/unauth', order);
	},
	async addOrder(_: any, order: any) {
		return {
			order: await FetchDataProvider.post('orders/', order),
		};
	},
	async getWorkAction(_: any, order_id: any) {
		return FetchDataProvider.patch('orders/expert', order_id, null);
	},
	async deleteOrderDocsAction(_: any, order_id: any) {
		return FetchDataProvider.patch('orders/delete', order_id, null);
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
