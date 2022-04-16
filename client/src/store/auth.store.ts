import { FetchDataProvider } from '@/custom/fetch-data.provider';
import { IUser } from '@/custom/interfaces';

const state = {
	jwt_token: '' || (localStorage.getItem('token') as string),
	user: null || (JSON.parse(localStorage.getItem('user')!) as IUser),
	users: [] as IUser[],
	isLoggedIn: JSON.parse(localStorage.getItem('user') as string)
		? JSON.parse(localStorage.getItem('user') as string).id
		: false,
	uexperts: [],
	uexpert: {},
	profiles: [],
};

const mutations = {
	setJWT(state: any, token: string) {
		state.jwt_token = token;
	},
	setProfiles(state: any, data: any) {
		state.profiles = data;
	},
	setUserForExpert(state: any, data?: IUser) {
		state.uexpert = data;
	},
	setIsLoggedIn(state: any, data: boolean) {
		state.isLoggedIn = data;
	},
	setUsers(state: any, data: any) {
		state.users = data;
	},
	setUser(state: any, data: any) {
		state.user = data;
	},
	setUExperts(state: any, data: any) {
		state.uexperts = data;
	},
	setUExpert(state: any, data: any) {
		state.uexpert = data;
	},
};
const actions = {
	async loginAction({ commit }: any, data: any) {
		const result = await FetchDataProvider.post('user/login', data);
		if (result.error != null) {
			return false;
		}
		commit('setIsLoggedIn', true);
		commit('setJWT', result.access_token);
		localStorage.setItem('token', result.access_token);
		return true;
	},

	async logout({ commit }: any) {
		localStorage.setItem('token', '');
		localStorage.setItem('user', JSON.stringify(''));
		commit('setJWT', null);
		commit('setUser', {});
		return true;
	},

	async addUserAction({ commit }: any, data: any) {
		console.log(data);
		const result = await FetchDataProvider.post(`user`, data, false);
	},

	async getProfilesAction({ commit }: any, id: any) {
		commit('setProfiles', await FetchDataProvider.get(`user/profile`));
	},

	async getUserForExpertAction({ commit }: any, id: any) {
		commit('setUserForExpert', await FetchDataProvider.get(`users/${id}`));
	},

	async getUsersAction({ commit }: any) {
		commit('setUsers', await FetchDataProvider.get('user/all'));
	},

	async getUserAction({ commit }: any) {
		commit('setUser', await FetchDataProvider.get('user/info'));
	},

	async getUExpertsAction({ commit }: any) {
		commit('setUExperts', await FetchDataProvider.get('users/uexpert'));
	},

	async getUExpertAction({ commit }: any, id: number) {
		commit('setUExpert', await FetchDataProvider.get(`users/${id}`));
	},
};
const getters = {
	getJWT: (state: any) =>
		state.jwt_token || (localStorage.getItem('jwt_token') as string),
	getIsAdmin: (state: any) => state.user?.profile?.title == 'Администратор',
	getUser: (state: any) =>
		state.user || JSON.parse(localStorage.getItem('user')!),

	getProfiles: (state: any) => state.profiles,
	getIsLoggedIn: (state: any) => state.isLoggedIn,
	getUsers: (state: any) => state.users,
	getUExperts: (state: any) => state.uexperts,
	getUExpert: (state: any) => state.uexpert,
};

export default {
	state,
	actions,
	mutations,
	getters,
};
