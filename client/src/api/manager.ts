import axios from 'axios';
import { LSPREFIX } from '../config/constant';

export interface APIReply<T> {
	status: boolean;
	data: T;
	error: Error | null;
}

axios.interceptors.request.use(
	function (config) {
		return config;
	},
	function (error) {
		return Promise.reject(error);
	},
);

axios.interceptors.response.use(
	function (response) {
		return response;
	},
	function (error) {
		// if (error.data) {
		// 	store.commit('addMessages', error.data.messages);
		// } else {
		// 	store.commit(
		// 		'addMessageError',
		// 		'Ошибка при получении данных с сервера',
		// 	);
		// }
		return Promise.reject(error);
	},
);

const instance = axios.create({
	baseURL: import.meta.env.VITE_API_URL,
	timeout: 5000,
});

export const ApiManager = {
	get: async <T>(url: string): Promise<APIReply<T>> =>
		(
			await instance.get(url, {
				headers: {
					Authorization:
						'Bearer ' + localStorage.getItem(LSPREFIX + 'token') ||
						'',
				},
			})
		).data,
	post: async <T, U>(url: string, data: T): Promise<APIReply<U>> =>
		(
			await instance.post(url, data, {
				headers: {
					Authorization:
						'Bearer ' + localStorage.getItem(LSPREFIX + 'token') ||
						'',
				},
			})
		).data,
	put: async <T, U>(url: string, data: T): Promise<APIReply<U>> =>
		(
			await instance.put(url, data, {
				headers: {
					Authorization:
						'Bearer ' + localStorage.getItem(LSPREFIX + 'token') ||
						'',
				},
			})
		).data,
	delete: async <T>(url: string): Promise<APIReply<T>> =>
		(
			await instance.delete(url, {
				headers: {
					Authorization:
						'Bearer ' + localStorage.getItem(LSPREFIX + 'token') ||
						'',
				},
			})
		).data,
};
