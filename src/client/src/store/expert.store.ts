import { FetchDataProvider } from '@/custom/fetch-data.provider';

const state = {
	expert: {} as any,
	experts: [] as any[],
};

const mutations = {
	setExperts(state: any, data: any) {
		state.experts = data;
	},
	setExpert(state: any, data: any) {
		state.expert = data;
	},
};

const actions = {
	async getExpertsAction({ commit }: any) {
		const result = await FetchDataProvider.get('user/expert');
		commit('setExperts', result);
	},
	async getSingleExpertAction({ commit }: any, id: number) {
		commit(
			'setExpert',
			await FetchDataProvider.getByID('common/expert', id),
		);
	},

	async addExpertAction(_: any, data: any) {
		await FetchDataProvider.post('auth/register', data, true);
	},

	async updateExpertAction(_: any, id: any) {
		return FetchDataProvider.patch('experts', id, state.expert);
	},
	async deleteExpertAction(_: any, id: any) {
		return FetchDataProvider.delete('experts', id);
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
