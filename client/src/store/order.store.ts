import { FetchDataProvider } from '@/custom/fetch-data.provider';
import { IOrder } from '@/custom/interfaces';

const state = {
	orders: [] as IOrder[],
	order: {} as IOrder,
	sections: [],
};

const mutations = {
	setOrders(state: any, orders: IOrder[]) {
		state.orders = orders;
	},
	setOrder(state: any, order: any) {
		state.order = order.data.order;
	},
	setSections(state: any, data: any) {
		state.sections = data;
	},
};

const actions = {
	async getOrdersAction({ commit }: any) {
		commit('setOrders', await FetchDataProvider.get('order'));
	},
	async getOrderAction({ commit }: any, id: number) {
		commit('setOrder', await FetchDataProvider.getByID('order', id));
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
	async getSectionsAction({ commit }: any, type: number) {
		const sections = await FetchDataProvider.get(
			'order/sections-dict/' + type,
		);
		commit('setSections', sections);
	},
};

const getters = {
	getOrder: (state: any) => state.order,
	getOrders: (state: any) => state.orders,
	getSections: (state: any) => state.sections,
};

export default {
	state,
	actions,
	mutations,
	getters,
};
