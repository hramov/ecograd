import { FetchDataProvider } from '@/custom/fetch-data.provider';
import { IExpert } from '@/custom/interfaces';

const state = {
	expert: {} as IExpert,
	experts: [] as IExpert[],
};

const mutations = {
	setExperts(state: any, data: any) {
		state.experts = data.experts;
	},
	setExpert(state: any, data: IExpert) {
		state.expert = data;
	},
};

const actions = {
	async getExpertsAction({ commit }: any) {
		// commit('setExperts', await FetchDataProvider.get('common/expert'));
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
