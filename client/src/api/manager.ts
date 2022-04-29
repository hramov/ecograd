import axios from 'axios';
import { LSPREFIX } from '../config/constant';

export interface APIReply<T> {
	status: boolean;
	data: T;
	error: Error | null;
}

export class HttpError {
	constructor(
		private readonly statusCode: number,
		private readonly message: string,
	) {}
}

const instance = axios.create({
	baseURL: import.meta.env.VITE_API_URL,
	timeout: 5000,
});

instance.interceptors.response.use(
	function (response) {
		// Any status code that lie within the range of 2xx cause this function to trigger
		// Do something with response data
		return response;
	},
	function (error) {
		// Any status codes that falls outside the range of 2xx cause this function to trigger
		// Do something with response error
		return {
			data: new HttpError(
				error.response.data.statusCode,
				error.response.data.message,
			),
		};
	},
);

export const ApiManager = {
	get: async <T>(url: string): Promise<T> =>
		(
			await instance.get(url, {
				headers: {
					Authorization:
						'Bearer ' + localStorage.getItem(LSPREFIX + 'token') ||
						'',
				},
			})
		).data,
	post: async <T, U>(url: string, data: T): Promise<U> =>
		(
			await instance.post(url, data, {
				headers: {
					Authorization:
						'Bearer ' + localStorage.getItem(LSPREFIX + 'token') ||
						'',
				},
			})
		).data,
	put: async <T, U>(url: string, data: T): Promise<U> =>
		(
			await instance.put(url, data, {
				headers: {
					Authorization:
						'Bearer ' + localStorage.getItem(LSPREFIX + 'token') ||
						'',
				},
			})
		).data,
	delete: async <T>(url: string): Promise<T> =>
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
