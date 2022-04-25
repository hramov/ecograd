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
			user: null || (JSON.parse(localStorage.getItem('user')!) as User),
			users: [] as any[],
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

			if (!result.access_token) {
				return false;
			}
			this.isLoggedIn = true;
			this.jwt_token = result.access_token;
			localStorage.setItem(LSPREFIX + 'token', result.access_token);
			return true;
		},

		async logout() {
			localStorage.setItem(LSPREFIX + 'token', '');
			localStorage.setItem('user', JSON.stringify(''));
			this.jwt_token = '';
			this.user = {} as User;
			return true;
		},

		async addUser(data: User) {
			await ApiManager.post<User, User>('user', data);
		},

		async deleteUser(user_id: number) {
			await ApiManager.delete<User>('user/' + user_id);
		},

		async getProfiles() {
			const result = await ApiManager.get<Profile[]>(`user/profile`);
			this.profiles = result.data;
		},

		async getUsers() {
			const result = await ApiManager.get<User[]>('user');
			this.users = result.data;
		},

		async getUser() {
			const result = await ApiManager.get<User>('user/info');
			this.user = result.data;
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
	},
});
