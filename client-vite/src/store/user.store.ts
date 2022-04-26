import { defineStore } from 'pinia';
import { ApiManager } from '../api/manager';
import { LSPREFIX } from '../config/constant';

export interface Expert {
	id: number;
	phone: string;
	position: string;
	certificate: string;
	direction: string;
	misc: string;
	user: User;
}

export interface Users {
	admin: Admin[];
	client: Client[];
	expert: Expert[];
}
export interface Client {
	id: number;
	phone: string;
	user: User;
}

export interface Admin {
	id: number;
	user: User;
}

export interface User {
	id: number;
	name: string;
	email: string;
	password: string;
	profile: string;
	admin: Admin | null;
	client: Client | null;
	expert: Expert | null;
}

export interface Login {
	email: string;
	password: string;
}

export interface AccessToken {
	access_token: string;
}

export interface Profile {
	id: number;
	title: string;
}

export interface APIResult {
	error: Error | null;
	status: boolean;
}

export const useUserStore = defineStore('user', {
	state: () => {
		return {
			jwt_token: '' || (localStorage.getItem('token') as string),
			user:
				null ||
				(JSON.parse(localStorage.getItem(LSPREFIX + 'user')!) as User),
			users: {} as Users,
			isLoggedIn: JSON.parse(localStorage.getItem('user') as string)
				? JSON.parse(localStorage.getItem('user') as string).id
				: false,
			profiles: [] as Profile[],
			apiReply: {} as APIResult,
			experts: [] as Expert[],
		};
	},

	actions: {
		async login(data: Login) {
			const result = await ApiManager.post<Login, AccessToken>(
				'user/login',
				data,
			);

			if (!result.data.access_token) {
				return false;
			}
			this.isLoggedIn = true;
			this.jwt_token = result.data.access_token;
			localStorage.setItem(LSPREFIX + 'token', result.data.access_token);
			return true;
		},

		async logout() {
			this.jwt_token = '';
			this.user = {} as User;
			localStorage.setItem(LSPREFIX + 'token', '');
			localStorage.setItem(LSPREFIX + 'user', JSON.stringify(''));
			return true;
		},

		async addUser(data: { user: User; profile: Admin | Client | Expert }) {
			await ApiManager.post<
				{ user: User; profile: Admin | Client | Expert },
				User
			>('user', data);
		},

		async deleteUser(user_id: number) {
			await ApiManager.delete<User>('user/' + user_id);
		},

		async getProfiles() {
			const result = await ApiManager.get<Profile[]>(`user/profile`);
			this.profiles = result.data;
		},

		async getUsers() {
			const result = await ApiManager.get<Users>('user');
			this.users = result.data;
		},

		async getUser() {
			const result = await ApiManager.get<User>('user/info');
			this.user = result.data;
			if (this.user) {
				localStorage.setItem(
					LSPREFIX + 'user',
					JSON.stringify(this.user),
				);
			}
		},

		async getExperts() {
			const result = await ApiManager.get<Expert[]>('user/expert');
			this.experts = result.data;
		},
	},

	getters: {
		isAdmin: (state: any) => state.user?.profile == 'Администратор',
		isClient: (state: any) => state.user?.profile == 'Клиент',
		isExpert: (state: any) => state.user?.profile == 'Эксперт',
		isUser: (state: any) => !!state.user?.id,
		displayedUser: (state: any): string => {
			const user = state.user;
			if (user.name.split(' ').length > 1) {
				const last_name = user.name.split(' ')[0];
				const name = user.name.split(' ')[1];
				const middle_name = user.name.split(' ')[2];
				return (
					last_name +
					' ' +
					name[0].toUpperCase() +
					'. ' +
					middle_name[0].toUpperCase() +
					'.'
				);
			}
			return state.user.name;
		},
	},
});
