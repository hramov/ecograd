import { FetchDataProvider } from '@/custom/fetch-data.provider';

const state = {
	orders: [] as any[],
	order: {} as any,
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
		const result = await FetchDataProvider.get(`order/client`);
		commit('setOrders', result);
		return result;
	},

	async uploadDocsAction({ commit }: any, data: any) {
		const result = await FetchDataProvider.uploadFile(
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
